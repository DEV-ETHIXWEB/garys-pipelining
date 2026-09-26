import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Text-input honeypot. It sits off-screen and out of the tab order, so real
 * visitors and screen-reader users never meet it, but bots that fill every
 * input they find will populate it, and the API drops the submission
 * silently. (The older hidden checkbox stays too, this catches a different
 * class of bot.) The odd field name avoids browser autofill heuristics.
 */
export function HoneypotField(props: UseFormRegisterReturn) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
