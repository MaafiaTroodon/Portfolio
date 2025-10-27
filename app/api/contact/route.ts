import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check honeypot
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Log the submission (for now)
    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Add rate limiting here
    // TODO: Connect to Resend or email service
    // TODO: Optionally save to database (Neon Postgres example commented in /lib/mail.ts)

    // Example: Uncomment to send email
    // await sendContactEmail(data);

    return NextResponse.json({ ok: true, message: "Message received successfully" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

