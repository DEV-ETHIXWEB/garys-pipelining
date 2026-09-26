// Best-effort, in-memory sliding-window limiter. It resets whenever the
// serverless function instance recycles and isn't shared across regions or
// concurrent instances, so it's a speed bump against casual abuse, not a
// durable defense. If this endpoint ever needs to withstand a real attack,
// swap this for Upstash Redis or Vercel KV without changing the call site.
//
// Each bucket remembers its own window, so callers can mix short (10 minute)
// and long (24 hour) limits without the cleanup sweep for one evicting the other.
type Bucket = { count: number; windowStart: number; windowMs: number };

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5000;

function sweep(now: number) {
  if (buckets.size < MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > bucket.windowMs) buckets.delete(key);
  }
}

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function checkRateLimit(key: string, opts?: { windowMs?: number; max?: number }): RateLimitResult {
  const windowMs = opts?.windowMs ?? 60_000;
  const max = opts?.max ?? 5;
  const now = Date.now();

  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart > bucket.windowMs) {
    buckets.set(key, { count: 1, windowStart: now, windowMs });
    return { allowed: true };
  }

  if (bucket.count >= max) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.windowStart + bucket.windowMs - now) / 1000)) };
  }

  bucket.count += 1;
  return { allowed: true };
}

/** Give back one use of a bucket, e.g. when the guarded action failed and shouldn't count. */
export function refundRateLimit(key: string): void {
  const bucket = buckets.get(key);
  if (bucket && bucket.count > 0) bucket.count -= 1;
}

// Shared client-IP extraction so every caller (rate limiting, Turnstile
// verification, logging) agrees on the same value instead of re-deriving it.
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
