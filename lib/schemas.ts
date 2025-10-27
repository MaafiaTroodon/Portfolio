import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(200),
  subject: z.string().min(2, "Subject must be at least 2 characters").max(200, "Subject is too long"),
  message: z.string().min(5, "Message must be at least 5 characters").max(5000, "Message is too long"),
  honeypot: z.string().optional(), // Spam protection
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

