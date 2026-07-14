"use client";

import { useId, useState, cloneElement, type ReactElement } from "react";
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CircleCheck, MoreHorizontal } from "lucide-react";
import { services } from "@/lib/content/services";
import { ServiceIcon } from "@/components/ui/service-icon";
import { submitEstimateForm } from "@/lib/web3forms";
import { siteConfig } from "@/lib/site-config";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  address: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  commercialProperty: z.boolean().optional(),
  smsConsent: z.boolean().optional(),
  botcheck: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export function EstimateForm({ defaultService }: { defaultService?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService ?? "", commercialProperty: false, smsConsent: false, botcheck: false },
  });

  const selectedService = useWatch({ control, name: "service" });
  const serviceGroupId = useId();
  const otherServiceInputId = useId();
  const messageFieldId = useId();

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submitEstimateForm(values);
    } catch {
      setError("We couldn't send your request automatically. Please call us instead, we'd rather hear from you than lose the message.");
    }
  }

  if (isSubmitSuccessful && !error) {
    return (
      <div className="grid place-items-center gap-4 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <CircleCheck className="h-6 w-6" />
        </span>
        <h3 className="text-3xl tracking-tight text-ink">Thank you.</h3>
        <p className="max-w-sm text-muted-foreground">
          We&rsquo;ve received your request and will reach out within the hour during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <input
        type="checkbox"
        {...register("botcheck")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <h3 className="text-center text-2xl tracking-tight text-ink sm:text-left md:text-3xl" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        Request your free estimate
      </h3>
      <p className="-mt-2 text-center text-sm text-muted-foreground sm:text-left">Typical response within 1 business hour.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Jane Smith"
            className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
        <Field label="Phone" required error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(206) 555-0123"
            className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </Field>

      <Field label="Address">
        <input
          {...register("address")}
          placeholder="123 Main St, City"
          className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </Field>

      <div>
        <FieldLabel id={serviceGroupId}>Service needed</FieldLabel>
        {!showOtherInput && <input type="hidden" {...register("service")} />}
        <div role="group" aria-labelledby={serviceGroupId} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {services.map((s) => {
            const active = !showOtherInput && selectedService === s.name;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setShowOtherInput(false);
                  setValue("service", s.name, { shouldValidate: true, shouldDirty: true });
                }}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center text-xs font-medium leading-tight transition-colors ${
                  active
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-background text-foreground hover:border-border-strong"
                }`}
              >
                <ServiceIcon name={s.icon} className="h-5 w-5" strokeWidth={1.6} />
                {s.name}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={showOtherInput}
            onClick={() => {
              setShowOtherInput(true);
              setValue("service", "", { shouldValidate: true, shouldDirty: true });
            }}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center text-xs font-medium leading-tight transition-colors ${
              showOtherInput
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-background text-foreground hover:border-border-strong"
            }`}
          >
            <MoreHorizontal className="h-5 w-5" strokeWidth={1.6} />
            Other
          </button>
        </div>
        {showOtherInput && (
          <>
            <label htmlFor={otherServiceInputId} className="sr-only">
              Describe the service you need
            </label>
            <input
              {...register("service")}
              id={otherServiceInputId}
              autoFocus
              placeholder="Tell us what you need"
              className="mt-3 w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </>
        )}
      </div>

      <div>
        <FieldLabel htmlFor={messageFieldId}>Describe the issue</FieldLabel>
        <textarea
          {...register("message")}
          id={messageFieldId}
          rows={4}
          placeholder="Slow drain, backup, recurring clog, recent inspection report…"
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid gap-3">
        <CheckboxField
          {...register("commercialProperty")}
          label="Commercial property?"
          hint="Let us know if this is for a business or rental, so we can route it to the right crew."
        />
        <CheckboxField
          {...register("smsConsent")}
          label="Communication consent"
          hint={`By checking this box, you agree to receive calls and texts from ${siteConfig.shortName} about this request, including appointment confirmations and updates. Consent isn't required to use our services. Message and data rates may apply.`}
        />
      </div>

      {error && <p className="text-sm text-emergency">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-2 w-full justify-center text-base disabled:opacity-60 sm:w-fit">
        {isSubmitting ? "Sending…" : "Send my request"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your service request. We never share your info.
      </p>
    </form>
  );
}

function FieldLabel({
  children,
  required,
  htmlFor,
  id,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  id?: string;
}) {
  return (
    <label id={id} htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
      {children}
      {required && <span className="text-destructive"> *</span>}
    </label>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactElement<{ id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean }>;
}) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div>
      <FieldLabel htmlFor={inputId} required={required}>
        {label}
      </FieldLabel>
      {cloneElement(children, {
        id: inputId,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-emergency">
          {error}
        </p>
      )}
    </div>
  );
}

function CheckboxField({
  label,
  hint,
  name,
  onChange,
  onBlur,
  ref,
}: {
  label: string;
  hint?: string;
} & UseFormRegisterReturn) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-primary outline-none focus:ring-2 focus:ring-primary/20"
      />
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{hint}</span>}
      </span>
    </label>
  );
}
