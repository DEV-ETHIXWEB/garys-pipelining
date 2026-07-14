"use client";

import { useId, useRef, useState, cloneElement, type ReactElement } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CircleCheck, Upload, X } from "lucide-react";
import { submitPartnershipForm } from "@/lib/web3forms";

const industries = [
  "General Contractor",
  "Property Manager",
  "Commercial Developer",
  "HOA",
  "Restoration Company",
  "Municipal / Government",
  "Builder",
  "Plumbing Company",
  "Industrial Facility",
  "Healthcare Facility",
  "Education",
  "Retail Center",
  "Other",
];

const projectTypeOptions = [
  "New construction",
  "Renovation / remodel",
  "Emergency repairs",
  "Ongoing maintenance",
  "Excavation",
  "Municipal / utility",
];

const annualProjectRanges = ["1–5", "6–20", "21–50", "50+"];
const contactMethods = ["Phone", "Email", "Text"];

const ALLOWED_FILE_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".dwg"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const schema = z.object({
  companyName: z.string().min(2, "Enter your company name"),
  contactPerson: z.string().min(2, "Enter a contact name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  companyWebsite: z.string().optional().or(z.literal("")),
  industry: z.string().min(1, "Select your industry"),
  projectTypes: z.array(z.string()).optional(),
  estimatedAnnualProjects: z.string().optional(),
  preferredContactMethod: z.string().min(1, "Select a preferred contact method"),
  message: z.string().optional(),
  botcheck: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export function PartnershipForm() {
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectTypes: [], preferredContactMethod: "", botcheck: false },
  });

  const selectedProjectTypes = useWatch({ control, name: "projectTypes" }) ?? [];
  const selectedContactMethod = useWatch({ control, name: "preferredContactMethod" });
  const industryGroupId = useId();
  const projectTypesGroupId = useId();
  const contactMethodGroupId = useId();
  const messageFieldId = useId();

  function handleFileChange(selected: File | null) {
    if (!selected) {
      setFile(null);
      setFileError(null);
      return;
    }
    const extension = selected.name.slice(selected.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_FILE_EXTENSIONS.includes(extension)) {
      setFileError(`That file type isn't supported. Please upload one of: ${ALLOWED_FILE_EXTENSIONS.join(", ")}.`);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setFileError("That file is too large. Please upload something under 10 MB.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFileError(null);
    setFile(selected);
  }

  function toggleProjectType(type: string) {
    const next = selectedProjectTypes.includes(type)
      ? selectedProjectTypes.filter((t) => t !== type)
      : [...selectedProjectTypes, type];
    setValue("projectTypes", next, { shouldDirty: true });
  }

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submitPartnershipForm({ ...values, projectTypes: values.projectTypes?.join(", ") }, file);
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
        <h3 className="text-3xl tracking-tight text-ink">Request received.</h3>
        <p className="max-w-sm text-muted-foreground">
          Thank you for your interest in partnering with Gary&rsquo;s. A member of our team will reach out within one
          business day.
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
      <h3 id="partnership-form" className="scroll-mt-28 text-center text-2xl tracking-tight text-ink sm:text-left md:text-3xl" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        Submit a partnership request
      </h3>
      <p className="-mt-2 text-center text-sm text-muted-foreground sm:text-left">We typically respond within one business day.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" required error={errors.companyName?.message}>
          <input
            {...register("companyName")}
            placeholder="Acme Construction Co."
            className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
        <Field label="Contact person" required error={errors.contactPerson?.message}>
          <input
            {...register("contactPerson")}
            placeholder="Jane Smith"
            className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" required error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@company.com"
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

      <Field label="Company website">
        <input
          {...register("companyWebsite")}
          placeholder="www.yourcompany.com"
          className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </Field>

      <div>
        <FieldLabel id={industryGroupId} htmlFor={`${industryGroupId}-select`} required>
          Industry
        </FieldLabel>
        <select
          {...register("industry")}
          id={`${industryGroupId}-select`}
          aria-invalid={Boolean(errors.industry)}
          defaultValue=""
          className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="" disabled>
            Select your industry
          </option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {errors.industry?.message && <p className="mt-1.5 text-xs text-emergency">{errors.industry.message}</p>}
      </div>

      <div>
        <FieldLabel id={projectTypesGroupId}>Project types</FieldLabel>
        <div role="group" aria-labelledby={projectTypesGroupId} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {projectTypeOptions.map((type) => {
            const active = selectedProjectTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                aria-pressed={active}
                onClick={() => toggleProjectType(type)}
                className={`rounded-2xl border p-3 text-center text-xs font-medium leading-tight transition-colors ${
                  active
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-background text-foreground hover:border-border-strong"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={`${industryGroupId}-annual`}>Estimated annual projects</FieldLabel>
          <select
            {...register("estimatedAnnualProjects")}
            id={`${industryGroupId}-annual`}
            defaultValue=""
            className="w-full rounded-full border border-border bg-background px-5 py-3.5 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Select a range
            </option>
            {annualProjectRanges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel id={contactMethodGroupId} required>
            Preferred contact method
          </FieldLabel>
          {!selectedContactMethod && <input type="hidden" {...register("preferredContactMethod")} />}
          <div role="group" aria-labelledby={contactMethodGroupId} className="grid grid-cols-3 gap-3">
            {contactMethods.map((method) => {
              const active = selectedContactMethod === method;
              return (
                <button
                  key={method}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setValue("preferredContactMethod", method, { shouldValidate: true, shouldDirty: true })}
                  className={`rounded-2xl border p-3 text-center text-xs font-medium leading-tight transition-colors ${
                    active
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border bg-background text-foreground hover:border-border-strong"
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>
          {errors.preferredContactMethod?.message && (
            <p className="mt-1.5 text-xs text-emergency">{errors.preferredContactMethod.message}</p>
          )}
        </div>
      </div>

      <div>
        <FieldLabel htmlFor={messageFieldId}>Message</FieldLabel>
        <textarea
          {...register("message")}
          id={messageFieldId}
          rows={4}
          placeholder="Tell us about your company and the kind of projects you'd like support on…"
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <FieldLabel htmlFor={`${industryGroupId}-file`}>Upload plans (optional)</FieldLabel>
        <input
          ref={fileInputRef}
          id={`${industryGroupId}-file`}
          type="file"
          accept={ALLOWED_FILE_EXTENSIONS.join(",")}
          className="sr-only"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3.5">
            <span className="truncate text-sm text-foreground">{file.name}</span>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setFileError(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              aria-label="Remove uploaded file"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border-strong bg-background px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Upload className="h-4 w-4" /> Choose a file
          </button>
        )}
        {fileError && <p className="mt-1.5 text-xs text-emergency">{fileError}</p>}
        <p className="mt-1.5 text-xs text-muted-foreground">PDF, JPG, PNG, or DWG, up to 10 MB.</p>
      </div>

      {error && <p className="text-sm text-emergency">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-2 w-full justify-center text-base disabled:opacity-60 sm:w-fit">
        {isSubmitting ? "Sending…" : "Submit partnership request"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your partnership inquiry. We never share your info.
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
