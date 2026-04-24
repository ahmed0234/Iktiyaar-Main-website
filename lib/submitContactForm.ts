// Replace your existing mock submitContactForm with this.
// Place this in ContactForm.tsx (or a shared lib/api.ts file).
//
// Set this in your frontend .env.local:
//   NEXT_PUBLIC_API_URL=https://your-vercel-backend.vercel.app

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  phone: string;
  website?: string;
  message: string;
}

export async function submitContactFormData(
  data: ContactFormData,
): Promise<{ ok: true }> {
  const response = await fetch(`https://ikhtiyaarbackend.vercel.app/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    // Surface the server's message when available, otherwise fall back to a generic one
    const message =
      json?.message ??
      (response.status >= 500
        ? "Server error. Please try again in a moment."
        : "Something went wrong. Please check your details and try again.");

    throw new Error(message);
  }

  return { ok: true };
}
