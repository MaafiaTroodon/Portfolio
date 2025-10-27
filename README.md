# Portfolio - Malhar Datta Mahajan

A production-quality personal portfolio website built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme**: next-themes (dark mode default)
- **Animations**: Framer Motion, GSAP ScrollTrigger
- **Smooth Scrolling**: Lenis
- **3D**: Three.js (react-three-fiber)
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner

## 📁 Project Structure

```
/app
  /(site)
    /page.tsx           # Home
    /about/page.tsx     # About
    /projects/page.tsx  # Projects
    /resume/page.tsx    # Resume
    /contact/page.tsx   # Contact
  /api/contact/route.ts # Contact API
/components
  /ui/*                 # shadcn components
  /layout/*             # Navbar, Footer
  /sections/*           # Page sections
  /shared/*             # Shared components
/three
  /Scene.tsx            # Three.js scene
  /effects/*            # 3D effects
/lib
  /utils.ts             # Utilities
  /schemas.ts           # Zod schemas
  /mail.ts              # Email integration
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
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy

The project is configured for Vercel deployment with:
- Automatic builds
- Preview deployments
- Edge runtime support

### Environment Variables

Add these to your Vercel project settings:

```env
# Optional: For email functionality (see /lib/mail.ts)
RESEND_API_KEY=your_api_key_here

# Optional: For database (see commented examples in /lib/mail.ts)
DATABASE_URL=your_database_url_here
```

## 🎨 Features

- **Dark Mode**: Default theme with light mode toggle
- **Smooth Animations**: Framer Motion + GSAP ScrollTrigger
- **3D Background**: Three.js particle system
- **Responsive**: Mobile-first design
- **Accessible**: ARIA labels, keyboard navigation, focus management
- **Fast**: Optimized images, lazy loading, code splitting
- **Command Palette**: ⌘K / Ctrl+K for quick navigation

## 📝 Contact Form

The contact form (`/contact`) includes:
- Client & server-side validation
- Honeypot spam protection
- Rate limiting placeholder
- Success/error notifications

### Email Integration

To enable email sending:

1. Get API key from [Resend](https://resend.com)
2. Add `RESEND_API_KEY` to environment variables
3. Uncomment email code in `/lib/mail.ts`

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
