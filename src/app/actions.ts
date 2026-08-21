"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/**
 * Contact form server action.
 * Sends the inquiry via Resend when RESEND_API_KEY is configured; otherwise
 * falls back to a working stub that logs the inquiry server-side so the form
 * is functional in development before credentials are added.
 */
export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !mobile || !subject || !message) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "vishaladml1@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  // Stub fallback — keeps the form functional without credentials.
  if (!apiKey) {
    console.info("[contact] inquiry received (stub — no RESEND_API_KEY):", {
      name,
      email,
      mobile,
      subject,
    });
    return {
      status: "success",
      message: "Thanks — your inquiry has been received. We'll be in touch shortly.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Vishal Transport Website <${from}>`,
      to,
      replyTo: email,
      subject: `New inquiry — ${subject}`,
      html: `
        <h2>New website inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mobile:</strong> ${escapeHtml(mobile)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: "Something went wrong sending your inquiry. Please call or email us instead.",
      };
    }

    return {
      status: "success",
      message: "Thanks — your inquiry has been sent. We'll be in touch shortly.",
    };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please call or email us instead.",
    };
  }
}
