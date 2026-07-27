"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { submitInquiry, type ContactState } from "@/app/actions";
import { contact } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { easing } from "@/lib/motion";

const initialState: ContactState = { status: "idle", message: "" };

const fieldClass =
  "mt-3 w-full border-b border-hair bg-transparent pb-3 outline-none transition-colors focus:border-acc";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="mt-2 sm:col-span-2">
      <Button type="submit" arrow>
        {pending ? "Sending…" : "Submit Inquiry"}
      </Button>
    </div>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitInquiry, initialState);

  return (
    <form action={formAction} className="grid gap-7 sm:grid-cols-2">
      {contact.fields.map((field) => (
        <div key={field.name} className={field.name === "message" ? "sm:col-span-2" : ""}>
          <label className="text-idx text-[11px] text-ink-muted" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
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

      <AnimatePresence>
        {state.status !== "idle" && (
          <motion.p
            key={state.message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easing.gentle }}
            className="text-sm sm:col-span-2"
            style={{ color: state.status === "error" ? "#e07a5f" : "var(--acc)" }}
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
