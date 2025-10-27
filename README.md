# Portfolio - Malhar Datta Mahajan

A production-quality personal portfolio website built with Next.js 15, TypeScript, and modern web technologies.

🌐 **Live Site**: [https://portfoliomalhar.netlify.app/](https://portfoliomalhar.netlify.app/)

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion + ScrollTrigger
- **Smooth Scrolling**: Lenis
- **Background**: Vanta.js Rings
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner
- **Database**: Neon Postgres
- **Email**: Resend
- **Deployment**: Netlify

## 📁 Project Structure

```
/app
  /page.tsx             # Single-page application (Home, About, Projects, Resume, Contact)
  /api/contact/route.ts # Contact API with Neon Postgres + Resend
/components
  /ui/*                 # shadcn components (Button, Card, Input, etc.)
  /layout/*             # Navbar, Footer
  /sections/*           # HomeHero, AboutBlocks, ProjectsGrid, ResumeSection, ContactForm
  /motion/*             # Reveal, Stagger - scroll animations
  /three/*              # VantaRings - animated background
/lib
  /utils.ts             # Utilities
  /schemas.ts           # Zod schemas
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
pnpm type-check

# Run tests
pnpm test
```

The development server will start at `http://localhost:3500` (or custom port specified)

## 🌐 Deployment

### Netlify (Current)

✅ **Live Deployment**: [https://portfoliomalhar.netlify.app/](https://portfoliomalhar.netlify.app/)

The project is deployed on Netlify with:
- Automatic deployments from GitHub main branch
- Edge runtime support for API routes
- Environment variables configured

### Environment Variables

Add these to your Netlify project settings:

```env
# Neon Postgres Database
DATABASE_URL=your_neon_postgres_url

# Resend Email Service
RESEND_API_KEY=your_resend_api_key

# Email Configuration
EMAIL_FROM=Your Name <onboarding@resend.dev>
EMAIL_TO=your-email@example.com

# Node Version
NODE_VERSION=20
```

**Note**: Before deploying, create the database table by running the SQL in `database-setup.sql` in your Neon SQL console.

## 🎨 Features

- **Single-Page Application**: Smooth scroll navigation between sections
- **Animated Background**: Vanta.js Rings effect with royal color scheme
- **Smooth Scrolling**: Lenis for buttery smooth page transitions
- **Scroll Animations**: Framer Motion reveal effects on sections
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: ARIA labels, keyboard navigation, focus management
- **Contact Form**: Integrated with Neon Postgres + Resend email
- **Live Resume Viewer**: Inline PDF viewer with download option
- **Performance**: Optimized images, lazy loading, code splitting

## 📝 Contact Form

The contact form (integrated in the Contact section) includes:
- ✅ Client & server-side validation with Zod
- ✅ Honeypot spam protection
- ✅ Database storage in Neon Postgres
- ✅ Email notifications via Resend
- ✅ Success/error toast notifications with custom styling

### Setup

1. Get API key from [Resend](https://resend.com)
2. Create database table using `database-setup.sql`
3. Add environment variables to Netlify
4. Submit the form to test!

## 🧪 Testing

Basic Playwright tests included. Run with:

```bash
pnpm test
```

## 🎯 Performance

- Lighthouse target: ≥95 (all metrics)
- Images optimized with Next.js `<Image>`
- Font optimization
- Code splitting
- Lazy loading
- Reduced motion support

## 🔧 Development

### Linting & Formatting

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check

# Lint
pnpm lint
```

### Adding New Pages

1. Create route in `/app`
2. Add navigation link in `/components/layout/Navbar.tsx`
3. Add to Command Palette in `/components/shared/CommandK.tsx`

## 📄 License

MIT - see [LICENSE](./LICENSE)

## 👤 Author

**Malhar Datta Mahajan**

- Location: Halifax, NS
- Email: ml575444@dal.ca
- LinkedIn: [linkedin.com/in/malhar-mahajan-24a93214a](https://linkedin.com/in/malhar-mahajan-24a93214a)
- GitHub: [github.com/MaafiaTroodon](https://github.com/MaafiaTroodon)
