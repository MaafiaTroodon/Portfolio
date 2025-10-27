import { ContactFormData } from "./schemas";

/**
 * Example: Send email using Resend
 * 
 * Uncomment and configure to enable email sending:
 * 
 * import { Resend } from "resend";
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * 
 * export async function sendContactEmail(data: ContactFormData) {
 *   const { data: response, error } = await resend.emails.send({
 *     from: "Portfolio Contact <onboarding@resend.dev>",
 *     to: ["ml575444@dal.ca"],
 *     subject: `Portfolio Contact: ${data.subject}`,
 *     html: `
 *       <h2>New Contact Form Submission</h2>
 *       <p><strong>Name:</strong> ${data.name}</p>
 *       <p><strong>Email:</strong> ${data.email}</p>
 *       <p><strong>Subject:</strong> ${data.subject}</p>
 *       <p><strong>Message:</strong></p>
 *       <p>${data.message.replace(/\n/g, '<br>')}</p>
 *     `,
 *   });
 * 
 *   if (error) throw new Error("Failed to send email");
 *   return response;
 * }
 */

// Placeholder for now
export async function sendContactEmail(data: ContactFormData) {
  // Email sending disabled by default
  console.log("Email would be sent to:", data.email);
  return { id: "placeholder" };
}

