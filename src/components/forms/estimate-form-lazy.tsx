import dynamic from "next/dynamic";

// Splits react-hook-form + zod out of the page's main JS chunk (SSR stays on, no visual change).
export const EstimateForm = dynamic(() => import("./estimate-form").then((m) => m.EstimateForm));
