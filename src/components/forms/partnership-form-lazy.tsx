import dynamic from "next/dynamic";

// Splits react-hook-form + zod out of the page's main JS chunk (SSR stays on, no visual change).
export const PartnershipForm = dynamic(() => import("./partnership-form").then((m) => m.PartnershipForm));
