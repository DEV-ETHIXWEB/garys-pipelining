export type EstimateFormPayload = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  service?: string;
  message?: string;
  commercialProperty?: boolean;
  smsConsent?: boolean;
};

export async function submitEstimateForm(payload: EstimateFormPayload) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: "New estimate request from the Gary's Pipelining website",
      from_name: payload.name,
      ...payload,
    }),
  });

  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong submitting the form.");
  }
  return data;
}

export type PartnershipFormPayload = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  companyWebsite?: string;
  industry: string;
  projectTypes?: string;
  estimatedAnnualProjects?: string;
  preferredContactMethod: string;
  message?: string;
};

export async function submitPartnershipForm(payload: PartnershipFormPayload, file?: File | null) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const formData = new FormData();
  formData.append("access_key", accessKey ?? "");
  formData.append("subject", "New contractor partnership request from the Gary's Pipelining website");
  formData.append("from_name", payload.companyName);
  for (const [key, value] of Object.entries(payload)) {
    if (value) formData.append(key, value);
  }
  if (file) formData.append("attachment", file);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong submitting the form.");
  }
  return data;
}
