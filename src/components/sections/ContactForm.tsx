"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { submitInquiry, type ContactState } from "@/app/actions";
import { contact } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { easing } from "@/lib/motion";

const initialState: ContactState = { status: "idle", message: "" };

// text-base (16px) prevents iOS from zooming on focus.
const fieldClass =
  "mt-3 w-full border-b border-hair bg-transparent pb-4 pt-1.5 text-base outline-none transition-colors focus:border-acc";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="mt-4 sm:col-span-2">
      <Button type="submit" arrow className="w-full sm:w-auto">
        {pending ? "Sending…" : "Submit Inquiry"}
      </Button>
    </div>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitInquiry, initialState);

  return (
    <form action={formAction} className="grid gap-6 sm:grid-cols-2 sm:gap-7">
      {contact.fields.map((field) => (
        <div key={field.name}>
          <label className="text-idx text-[11px] text-ink-muted" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            inputMode={field.inputMode}
            autoComplete={field.autoComplete}
            required
            placeholder={field.placeholder}
            className={fieldClass}
          />
        </div>
      ))}

      <div className="sm:col-span-2">
        <label className="text-idx text-[11px] text-ink-muted" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          placeholder="Tell us what you need..."
          className={`${fieldClass} resize-none`}
        />
      </div>

      <SubmitButton />

      {/* The live region is always mounted. A container that only appears
          alongside its message is never announced — screen readers watch an
          existing region for changes, they do not announce a new one. */}
      <div role="status" aria-live="polite" className="min-h-[1.25rem] sm:col-span-2">
        <AnimatePresence mode="wait">
          {state.status !== "idle" && (
            <motion.p
              key={state.message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easing.gentle }}
              className={`text-sm ${state.status === "error" ? "text-danger" : "text-acc"}`}
            >
              {/* Status is never colour-only: the word carries it too. */}
              <span className="font-semibold">
                {state.status === "error" ? "Error: " : "Sent: "}
              </span>
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
