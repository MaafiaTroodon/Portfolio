import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  honeypot: z.string().max(0).optional(), // Spam protection
});

export type ContactFormData = z.infer<typeof contactSchema>;

