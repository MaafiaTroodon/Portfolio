# Resume and Contact Form Setup

## ✅ Completed Changes

### 1. Project Images Fixed
- ✅ FlexBeats: `/photos/flexbeats.png`
- ✅ Urban SWAT Platformer: `/photos/game%20scene%201.png` (moved to position #2)
- ✅ Apple Website Clone: `/photos/appleClone.png` (moved to position #3)
- ✅ Chem-AR: `/photos/chemar.png`
- ✅ QuickTutor: `/photos/storedetails.png`
- ✅ Interactive Portfolio: `/photos/interactiveportfolio.png`

### 2. Resume Section Enhanced
- ✅ Embedded PDF viewer (800px height)
- ✅ Download button still available
- ✅ Zoom/search features available in browser's built-in PDF viewer

### 3. Contact Form with Email + Database
- ✅ Resend email integration configured
- ✅ Neon Postgres database configured
- ✅ Double honeypot protection (`honeypot` and `website` fields)
- ✅ Email sends to: ml575444@dal.ca
- ✅ All submissions stored in database

### 4. Environment Variables
Created `.env.local` with:
```env
DATABASE_URL=postgresql://neondb_owner:npg_ba7oVg9PjWwv@ep-odd-cloud-ahlos5c2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

RESEND_API_KEY=re_19seyv5J_26Q2hrTpPvV1Rrn6gQZfzStj
EMAIL_FROM="Malhar <onboarding@resend.dev>"
EMAIL_TO=ml575444@dal.ca
```

## 🔧 Database Setup Required

**You need to run this SQL in your Neon database console:**

Open `database-setup.sql` and copy/paste into the Neon SQL editor, or run:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
```

## 📝 How It Works

1. **Contact Form Submission:**
   - Validates input using Zod schema
   - Checks double honeypot (if filled, treats as spam silently)
   - Stores in Neon Postgres database
   - Sends email via Resend to your dal.ca address

2. **Resume Viewer:**
   - PDF loads inline with iframe
   - Browser provides zoom, search, navigation controls
   - Download button available below viewer

3. **Project Cards:**
   - All 6 projects display with proper images
   - Reordered: FlexBeats #1, Urban SWAT #2, Apple #3, Chem-AR #4, QuickTutor #5, Interactive Portfolio #6
   - Each has GitHub and Live (where applicable) icons with hover animations

## 🚀 Next Steps

1. Run the SQL script in Neon database
2. Restart the dev server: `pnpm dev -p 3500`
3. Test the contact form
4. Check your email (ml575444@dal.ca) for test submission

