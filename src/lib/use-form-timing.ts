"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a function reporting how many milliseconds the form has been open.
 * It's sent with the submission so the server can spot bots that fill and
 * submit faster than a person could. Started in an effect, not during render,
 * so it measures time actually on screen.
 */
export function useFormTiming(): () => number | undefined {
  const openedAt = useRef<number | null>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  return useCallback(() => (openedAt.current === null ? undefined : Date.now() - openedAt.current), []);
}
