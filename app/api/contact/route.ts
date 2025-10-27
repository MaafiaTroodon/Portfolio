export const runtime = "edge";

import { NextResponse } from "next/server";
import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(200),
  message: z.string().min(5).max(5000),
  honeypot: z.string().optional(),
  website: z.string().optional(),
});

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    // Honeypot trap — if filled, treat as spam and pretend success
    if (parsed.data.honeypot || parsed.data.website) return NextResponse.json({ ok: true });

    const { name, email, subject, message } = parsed.data;

    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0] || null;
    const ua = req.headers.get("user-agent") || null;

    // Try to store in Neon (table may not exist yet)
    try {
      const sql = neon(process.env.DATABASE_URL!);
      await sql`
        INSERT INTO contact_messages (name, email, subject, message, ip, user_agent)
        VALUES (${name}, ${email}, ${subject}, ${message}, ${ip}, ${ua});
      `;
    } catch (dbError: unknown) {
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      console.warn("Database error (table may not exist):", errorMessage);
      // Continue to send email even if DB fails
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 8px">New contact form submission</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Subject:</b> ${escapeHtml(subject)}</p>
        <p><b>Message:</b><br>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="color:#666"><small>IP: ${ip ?? "-"} | UA: ${ua ?? "-"}</small></p>
      </div>
    `;

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `Contact: ${subject} — ${name}`,
      reply_to: email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("Contact API error:", e);
    const errorMessage = e instanceof Error ? e.message : "Server error. Please check server logs.";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
