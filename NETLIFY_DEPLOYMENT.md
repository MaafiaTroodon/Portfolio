# Netlify Deployment Guide

## 🚀 Deployment Steps

### 1. Environment Variables (CRITICAL)

Go to your Netlify project settings and add these environment variables:

**Site Settings → Environment Variables → Add variable**

```
DATABASE_URL = postgresql://neondb_owner:npg_ba7oVg9PjWwv@ep-odd-cloud-ahlos5c2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

RESEND_API_KEY = re_19seyv5J_26Q2hrTpPvV1Rrn6gQZfzStj

EMAIL_FROM = Malhar <onboarding@resend.dev>

EMAIL_TO = ml575444@dal.ca
```

### 2. Build Settings (Already Configured)

- **Build command:** `pnpm run build`
- **Publish directory:** `.next`
- **Node version:** `20`

### 3. Database Setup

Make sure you've run the SQL script in your Neon database:

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

### 4. Deploy

Once you click "Deploy portfoliomalhar" on Netlify, it will:
1. Connect to your GitHub repository
2. Install dependencies with `pnpm install`
3. Build your Next.js app
4. Deploy to `https://portfoliomalhar.netlify.app`

### 5. Test Your Site

After deployment:
- ✅ Visit `https://portfoliomalhar.netlify.app`
- ✅ Test the contact form
- ✅ Check your email at ml575444@dal.ca
- ✅ Verify scroll animations work smoothly

## 📝 Important Notes

### Resend Email Setup
- You're using the free dev domain `onboarding@resend.dev`
- To send from your own domain later, verify it in Resend dashboard
- Update `EMAIL_FROM` in Netlify environment variables when ready

### Neon Database
- Database connections are persistent (already set up)
- All contact form submissions are stored in `contact_messages` table
- You can query them from Neon SQL editor

### Performance
- Netlify automatically optimizes Next.js builds
- Images are optimized via `next/image`
- Static pages are pre-rendered
- API routes run as serverless functions

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all environment variables are set
- Verify database table exists

### Contact Form Not Working
- Check Resend API key is valid
- Verify EMAIL_TO is correct
- Check database connection in Neon dashboard

### Images Not Loading
- Verify images are in `public/photos/` directory
- Check `next.config.js` has correct domains
- Ensure image paths are correct (no leading slash issues)

## ✅ Deployment Checklist

- [ ] Environment variables added in Netlify
- [ ] Database table created in Neon
- [ ] Build completes successfully
- [ ] Site loads at custom domain
- [ ] Contact form sends emails
- [ ] Scroll animations work
- [ ] All images display correctly

## 🎉 Success!

Your portfolio will be live at:
**https://portfoliomalhar.netlify.app**

