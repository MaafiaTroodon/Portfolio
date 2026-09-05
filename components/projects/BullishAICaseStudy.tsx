"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BellRing,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CloudCog,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Mail,
  PlayCircle,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { Badge } from "@/components/ui/badge";
import {
  bullishAiCaseStudyMedia,
  bullishAiHeroMedia,
  bullishAiHeroTags,
  bullishAiScreeningMedia,
  bullishAiStages,
  type BullishAiMedia,
} from "@/lib/bullishai-case-study";
import type { CaseStudyMedia, MediaItem } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const liveUrl = "https://bullishai.netlify.app/";
const githubUrl = "https://github.com/MaafiaTroodon/BullishAI";
const demoUrl = "https://youtu.be/EM9nBk9edVA";

function StageSection({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section
      id={`stage-${number}`}
      data-bullish-stage={number}
      aria-labelledby={`stage-${number}-title`}
      className="mb-8 scroll-mt-36 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-black/20 backdrop-blur-md sm:p-8 lg:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-[5rem_minmax(0,1fr)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/30 bg-violet-400/10 font-semibold text-violet-200 shadow-lg shadow-violet-950/40">
          {number}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">{eyebrow}</p>
          <h3 id={`stage-${number}-title`} className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h3>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300 sm:text-base">
          <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-violet-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MediaPreview({ item, onOpen, className }: { item: BullishAiMedia; onOpen: (item: BullishAiMedia) => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`Enlarge ${item.title}`}
      className={cn(
        "group w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 text-left shadow-2xl shadow-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        className,
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(max-width: 1024px) 94vw, 72vw"
        loading="lazy"
        className="h-auto w-full bg-[#0c172c] object-contain transition duration-300 group-hover:scale-[1.005]"
      />
      <span className="block border-t border-white/10 bg-slate-950 px-4 py-4 sm:px-5">
        <span className="block text-sm font-semibold text-white">{item.title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-slate-300">{item.caption}</span>
      </span>
    </button>
  );
}

function CaseStudyCarousel({
  items,
  label,
  onOpen,
  priority = false,
}: {
  items: MediaItem[];
  label: string;
  onOpen: (item: CaseStudyMedia) => void;
  priority?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const showPrevious = useCallback(() => setActiveIndex((current) => (current - 1 + items.length) % items.length), [items.length]);
  const showNext = useCallback(() => setActiveIndex((current) => (current + 1) % items.length), [items.length]);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setTimeout(showNext, 3000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, items.length, showNext]);

  const activeItem = items[activeIndex];
  const imageSizes = "(max-width: 1024px) 94vw, 78vw";
  const nearbyItems = items.length > 1
    ? [...new Set([(activeIndex + 1) % items.length, (activeIndex - 1 + items.length) % items.length])]
        .filter((index) => index !== activeIndex)
        .map((index) => items[index])
    : [];

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      data-active-index={activeIndex}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
        if (Math.abs(distance) > 45) {
          if (distance > 0) showPrevious();
          else showNext();
        }
        touchStartX.current = null;
      }}
      className="relative overflow-hidden rounded-[1.75rem] border border-violet-300/20 bg-slate-950 shadow-2xl shadow-violet-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
    >
      <div className="relative h-[22rem] w-full sm:h-auto sm:aspect-[16/9] lg:min-h-[34rem]">
        <Image src={activeItem.src} alt="" aria-hidden="true" fill sizes={imageSizes} className="scale-110 object-cover opacity-25 blur-3xl" />
        <div className="absolute inset-0 bg-slate-950/25" />
        <button type="button" onClick={() => onOpen(activeItem)} aria-label={`Enlarge ${activeItem.title}`} className="absolute inset-4 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 sm:inset-6">
          <Image
            key={activeItem.src}
            src={activeItem.src}
            alt={activeItem.alt}
            fill
            priority={priority && activeIndex === 0}
            sizes={imageSizes}
            className="object-contain"
          />
        </button>
        <div aria-hidden="true" data-carousel-preload className="pointer-events-none absolute inset-0 opacity-0">
          {nearbyItems.map((item) => (
            <Image key={`preload-${item.src}`} src={item.src} alt="" fill sizes={imageSizes} className="object-contain" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent px-5 pb-14 pt-24 sm:px-8">
          <p className="text-sm font-semibold text-white sm:text-base">{activeItem.title}</p>
          <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-200 sm:text-sm">{activeItem.caption}</p>
        </div>
        <button type="button" onClick={showPrevious} aria-label="Show previous image" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white shadow-lg backdrop-blur hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 sm:left-5">
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button type="button" onClick={showNext} aria-label="Show next image" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white shadow-lg backdrop-blur hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 sm:right-5">
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 backdrop-blur" aria-label="Choose image">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-label={`Show image ${index + 1}: ${item.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <span aria-hidden="true" className={cn("h-2.5 rounded-full border border-white/40 transition-all", index === activeIndex ? "w-5 bg-violet-300" : "w-2.5 bg-white/50")} />
          </button>
        ))}
      </div>
    </section>
  );
}

const bullishCandles = [
  { open: 83, close: 74, high: 68, low: 91, gain: "+1.2%" },
  { open: 78, close: 66, high: 59, low: 85, gain: "+2.8%" },
  { open: 70, close: 62, high: 54, low: 77, gain: "+4.1%" },
  { open: 65, close: 51, high: 44, low: 72, gain: "+6.5%" },
  { open: 56, close: 47, high: 38, low: 63, gain: "+8.9%" },
  { open: 51, close: 39, high: 31, low: 58, gain: "+11.4%" },
  { open: 43, close: 32, high: 24, low: 50, gain: "+14.7%" },
  { open: 36, close: 22, high: 14, low: 43, gain: "+18.6%" },
];

function GreenCandlestickChart() {
  const [activeCandle, setActiveCandle] = useState(bullishCandles.length - 1);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-emerald-300/15 bg-emerald-950/20 p-3" aria-label="Interactive illustrative bullish candlestick chart">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-300">Illustrative trend</span>
        <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">{bullishCandles[activeCandle].gain}</span>
      </div>
      <svg viewBox="0 0 320 108" role="img" aria-label="Green candlesticks rising from lower left to upper right" className="mt-2 h-28 w-full overflow-visible">
        <defs>
          <linearGradient id="bullish-chart-glow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.42" />
          </linearGradient>
          <filter id="bullish-candle-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#34d399" floodOpacity="0.55" />
          </filter>
        </defs>
        {[24, 52, 80].map((y) => <line key={y} x1="4" x2="316" y1={y} y2={y} stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="4 7" />)}
        <motion.path
          d="M 10 96 C 72 92, 112 76, 155 63 S 246 34, 312 9 L 312 106 L 10 106 Z"
          fill="url(#bullish-chart-glow)"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {bullishCandles.map((candle, index) => {
          const x = 28 + index * 37;
          const bodyY = Math.min(candle.open, candle.close);
          const bodyHeight = Math.max(7, Math.abs(candle.open - candle.close));
          const selected = index === activeCandle;
          return (
            <motion.g
              key={x}
              tabIndex={0}
              role="button"
              aria-label={`Candle ${index + 1}, illustrative gain ${candle.gain}`}
              onMouseEnter={() => setActiveCandle(index)}
              onFocus={() => setActiveCandle(index)}
              onClick={() => setActiveCandle(index)}
              initial={reduceMotion ? false : { opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.09, duration: 0.55, ease: "easeOut" }}
              className="cursor-pointer outline-none"
            >
              <line x1={x} x2={x} y1={candle.high} y2={candle.low} stroke={selected ? "#a7f3d0" : "#34d399"} strokeWidth={selected ? 2.5 : 2} />
              <rect x={x - 7} y={bodyY} width="14" height={bodyHeight} rx="2" fill={selected ? "#6ee7b7" : "#10b981"} filter={selected ? "url(#bullish-candle-shadow)" : undefined} />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

function ProductWalkthrough() {
  return (
    <section aria-labelledby="walkthrough-heading" className="overflow-hidden rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-slate-950 to-violet-950/70 p-5 shadow-2xl sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Product Walkthrough</p>
      <h2 id="walkthrough-heading" className="mt-3 text-3xl sm:text-4xl">See BullishAI in action</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-300">For a closer look at how the platform works as a complete product, I recorded a walkthrough covering the BullishAI interface, market tools, portfolio experience, and AI-powered analysis.</p>
      <div className="mt-7 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <iframe src="https://www.youtube-nocookie.com/embed/EM9nBk9edVA" title="BullishAI product deep-dive video" className="h-full w-full border-0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
      <div className="mt-5 flex flex-wrap gap-3"><a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-100 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">Watch on YouTube <ExternalLink aria-hidden="true" className="h-4 w-4" /></a><a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-100 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">Explore Live BullishAI <ExternalLink aria-hidden="true" className="h-4 w-4" /></a></div>
    </section>
  );
}

function Flow({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item, index) => (
        <div key={item} className="contents">
          <div className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-4 text-center text-sm font-semibold text-slate-100">{item}</div>
          {index < items.length - 1 ? <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-violet-300" /> : null}
        </div>
      ))}
    </div>
  );
}

function ExternalActions({ includeBack = false }: { includeBack?: boolean }) {
  const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-100 transition hover:border-violet-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-gradient min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"><span>Live Project</span><ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={secondary}><Github aria-hidden="true" className="h-4 w-4" /> GitHub</a>
      <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={secondary}><PlayCircle aria-hidden="true" className="h-4 w-4" /> Watch Demo</a>
      {includeBack ? <Link href="/#projects" className={secondary}><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to Projects</Link> : null}
    </div>
  );
}

export function BullishAICaseStudy() {
  const [activeMedia, setActiveMedia] = useState<CaseStudyMedia | null>(null);
  const [activeStage, setActiveStage] = useState("01");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bullish-stage]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const stage = visible[0]?.target.getAttribute("data-bullish-stage");
      if (stage) setActiveStage(stage);
    }, { rootMargin: "-22% 0px -62% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeLink = document.querySelector<HTMLElement>(`[data-bullish-stage-link="${activeStage}"]`);
    const mobileNav = activeLink?.closest("nav");
    if (!activeLink || !mobileNav || window.innerWidth >= 1024) return;
    mobileNav.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      left: activeLink.offsetLeft - (mobileNav.clientWidth - activeLink.offsetWidth) / 2,
    });
  }, [activeStage]);

  return (
    <div className="content-backdrop min-h-screen">
      <div aria-hidden="true" className="fixed inset-x-0 top-16 z-50 h-1 origin-left bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-300 transition-transform duration-150 motion-reduce:transition-none" style={{ transform: `scaleX(${progress})` }} />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8">
        <header>
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to Portfolio</Link>
          <div className="relative mt-6 overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-[#081326] via-slate-950 to-violet-950/80 p-5 shadow-2xl shadow-violet-950/40 sm:mt-8 sm:rounded-[2rem] sm:p-10 lg:p-14">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="relative grid gap-9 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">Independent Engineering Project</p>
                <h1 className="mt-4 text-balance text-5xl leading-tight sm:text-6xl lg:text-7xl">BullishAI</h1>
                <p className="mt-5 max-w-4xl text-balance text-xl font-medium leading-8 text-amber-100 sm:text-2xl">AI-Powered Market Research &amp; Portfolio Analytics Platform</p>
                <p className="mt-6 max-w-4xl text-balance text-2xl font-semibold leading-9 text-white sm:text-3xl">Building a financial research platform meant solving much more than displaying stock prices.</p>
                <p className="mt-5 max-w-4xl leading-8 text-slate-300">BullishAI started as a way for me to explore financial markets through software and gradually grew into a full-stack platform spanning live market data, external APIs, portfolio analytics, background jobs, authentication, databases, screeners, and AI-assisted research.</p>
                <div className="mt-7"><ExternalActions /></div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
                <GreenCandlestickChart />
                <p className="text-sm font-semibold text-slate-100">System breadth</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Product design · frontend · APIs · data normalization · AI context · persistence · background work · deployment</p>
                <div className="mt-5 flex flex-wrap gap-2">{bullishAiHeroTags.map((tag) => <Badge key={tag} variant="secondary" className="border border-white/10 bg-white/5 text-slate-200">{tag}</Badge>)}</div>
              </div>
            </div>
          </div>
        </header>

        <Reveal className="mt-12">
          <ProductWalkthrough />
        </Reveal>

        <Reveal className="mt-16">
          <section aria-labelledby="product-tour-heading">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Product Tour</p>
            <h2 id="product-tour-heading" className="mt-3 text-3xl sm:text-4xl">One product, several connected views</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">The interface brings market context, regional stock exploration, and research tools into the same product. Pause, navigate manually, or open any screen at full size.</p>
            <div className="mt-8"><CaseStudyCarousel items={bullishAiHeroMedia} label="BullishAI product tour" onOpen={setActiveMedia} priority /></div>
          </section>
        </Reveal>

        <Reveal className="mt-20">
          <section aria-labelledby="system-glance-heading" className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">System at a Glance</p>
            <h2 id="system-glance-heading" className="mt-3 text-3xl sm:text-4xl">A full-stack system behind the screens</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [Layers3, "Frontend", "Next.js 16.1.1 · React · TypeScript · Tailwind"],
                [Server, "Application", "App Router · API routes · server-side integrations"],
                [RefreshCw, "Market Data", "Multi-provider quotes, charts, news, caching, and fallback"],
                [BrainCircuit, "AI", "Groq/Llama with structured market context"],
                [Database, "Persistence", "Neon PostgreSQL · direct SQL · Prisma for auth/watchlists"],
                [ShieldCheck, "Authentication", "Better Auth · email/password · server sessions"],
                [CloudCog, "Background", "Inngest schedules for alerts, summaries, and dividend workflows"],
                [Mail, "Delivery & Client Data", "Resend email · SWR cache and refresh"],
              ].map(([Icon, title, description]) => (
                <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-violet-300" />
                  <h3 className="mt-4 font-sans text-base font-semibold text-white">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{String(description)}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <section aria-labelledby="engineering-story-heading" className="mt-24">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Engineering Case Study</p>
            <h2 id="engineering-story-heading" className="mt-3 text-3xl sm:text-5xl">How BullishAI became a system</h2>
            <p className="mt-5 leading-relaxed text-slate-300">Twelve stages covering the product decisions, data pipelines, application architecture, reliability work, and lessons behind the finished experience.</p>
          </div>

          <nav aria-label="BullishAI case study stages" className="sticky top-[4.25rem] z-30 -mx-4 mb-8 overflow-x-auto border-y border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur lg:hidden">
            <ol className="flex w-max gap-2">{bullishAiStages.map(([number, title]) => <li key={number}><a href={`#stage-${number}`} data-bullish-stage-link={number} aria-current={activeStage === number ? "step" : undefined} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300", activeStage === number ? "border-violet-300/50 bg-violet-400/15 text-violet-100" : "border-white/10 bg-white/[0.03] text-slate-400")}><span>{number}</span><span>{title}</span></a></li>)}</ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <nav aria-label="BullishAI case study stage progress" className="sticky top-28 rounded-2xl border border-white/10 bg-slate-950/80 p-3 backdrop-blur">
                <ol className="space-y-1">{bullishAiStages.map(([number, title]) => { const current = activeStage === number; const completed = Number(number) < Number(activeStage); return <li key={number}><a href={`#stage-${number}`} aria-current={current ? "step" : undefined} className={cn("flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300", current ? "bg-violet-400/15 text-violet-100" : "text-slate-400 hover:bg-white/5 hover:text-slate-100")}><span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px]", current ? "border-violet-300/60 bg-violet-300/10" : completed ? "border-emerald-300/40 text-emerald-200" : "border-white/15")}>{completed ? "✓" : number}</span><span>{title}</span></a></li>; })}</ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <StageSection number="01" eyebrow="The Product Idea" title="From a stock dashboard to a full research platform">
                <div className="grid gap-7 lg:grid-cols-2">
                  <div className="space-y-5 leading-8 text-slate-300">
                    <p>I wanted one place for the market information I kept checking across different sources. The first version focused on prices and charts; each useful addition made the next system problem visible.</p>
                    <p>Watchlists needed reliable quotes. Portfolio values needed current prices without losing cost basis. AI answers needed fresh, structured context. Alerts needed work to continue when no browser was open. BullishAI grew by following those dependencies.</p>
                  </div>
                  <div className="rounded-2xl border border-violet-300/20 bg-violet-400/[0.06] p-6">
                    <p className="text-sm font-semibold text-violet-200">How the scope evolved</p>
                    <Flow items={["Prices & charts", "Market discovery", "Portfolio state", "AI-assisted research", "Background monitoring"]} className="mt-5" />
                  </div>
                </div>
              </StageSection>

              <StageSection number="02" eyebrow="Full-Stack Architecture" title="Clear boundaries between interface, services, and state">
                <p className="max-w-3xl leading-8 text-slate-300">The browser owns interaction and presentation. Next.js API routes keep credentials and provider differences on the server, assemble AI context, and coordinate authenticated data. PostgreSQL holds durable user state while background functions handle scheduled work.</p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-[#071123]/90 p-5 sm:p-7">
                  <Flow items={["USER", "NEXT.JS / REACT UI", "APP & API ROUTES"]} />
                  <div className="my-4 grid gap-3 md:grid-cols-3">
                    {["MARKET DATA\nNormalization + fallback", "AI LAYER\nContext + routing", "USER DATA\nPortfolio + watchlists"].map((item) => { const [title, detail] = item.split("\n"); return <div key={title} className="rounded-xl border border-violet-300/20 bg-violet-400/[0.06] p-4 text-center"><p className="text-sm font-semibold text-white">{title}</p><p className="mt-2 text-xs text-slate-400">{detail}</p></div>; })}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-center text-sm"><span className="font-semibold text-violet-200">Inngest</span><span className="block text-slate-400">alerts · recurring jobs</span></div><div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-center text-sm"><span className="font-semibold text-violet-200">Resend</span><span className="block text-slate-400">transactional email</span></div></div>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="font-semibold text-white">Client responsibilities</p><p className="mt-3 text-sm leading-7 text-slate-400">Rendering, charts, search, watchlist interaction, portfolio controls, AI conversations, and SWR-managed refresh state.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="font-semibold text-white">Server responsibilities</p><p className="mt-3 text-sm leading-7 text-slate-400">Provider calls, credentials, normalization, database transactions, authenticated state, model requests, jobs, and email.</p></div>
                </div>
              </StageSection>

              <StageSection number="03" eyebrow="Market Data" title="One market view, many data providers">
                <p className="max-w-3xl leading-8 text-slate-300">Financial APIs differ in coverage, rate limits, response shapes, time ranges, and missing fields. The UI therefore asks BullishAI for a quote or chart—not a particular vendor response.</p>
                <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="rounded-2xl border border-violet-300/20 bg-violet-400/[0.055] p-6">
                    <p className="text-sm font-semibold text-violet-200">Chart request fallback</p>
                    <Flow items={["Chart request", "Yahoo Finance", "Twelve Data", "FMP / Tiingo", "Normalized OHLCV", "Chart"]} className="mt-5" />
                    <p className="mt-4 text-xs leading-6 text-slate-400">Short ranges stop after Yahoo or Twelve Data. Longer ranges can continue to Financial Modeling Prep and Tiingo.</p>
                  </div>
                  <BulletList items={[
                    "Quote requests use a prioritized Finnhub → Twelve Data → Alpha Vantage fallback and can return a short-lived stale cache when every provider is temporarily unavailable.",
                    "Chart requests use Yahoo Finance first, retry with backoff, then fall through to providers appropriate for the requested time range.",
                    "A separate comprehensive-quote path queries Yahoo, Google Finance, Finnhub, Twelve Data, Alpha Vantage, and FMP in parallel, then fills missing fields from successful responses.",
                    "Provider source metadata travels with the normalized result so failures do not become invisible.",
                  ]} />
                </div>
              </StageSection>

              <StageSection number="04" eyebrow="Normalization" title="The rest of the product should not speak seven API dialects">
                <p className="leading-8 text-slate-300">One provider returns compact keys, another returns named properties, and timestamps arrive in different formats. The server translates those responses before a chart or feature consumes them.</p>
                <div className="mt-7 grid gap-5 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#071123] p-6 font-mono text-sm">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">Normalized candle</p>
                    <div className="mt-5 space-y-2 text-slate-300"><p><span className="text-blue-300">timestamp</span> → UTC milliseconds</p><p><span className="text-blue-300">open</span> → number</p><p><span className="text-blue-300">high / low</span> → number</p><p><span className="text-blue-300">close</span> → number</p><p><span className="text-blue-300">volume</span> → number or null</p></div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                    <p className="font-semibold text-white">Comprehensive quote</p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">The aggregation layer selects the first successful quote and fills optional values—market cap, P/E, 52-week range, volume, and session fields—from other successful providers when available. It improves completeness without pretending providers always agree.</p>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6"><p className="font-semibold text-white">News follows the same principle</p><p className="mt-3 text-sm leading-7 text-slate-400">Yahoo Finance, Yahoo Finance Canada, Finnhub, and Alpha Vantage are retrieved in parallel where configured. Results are deduplicated by URL, sorted newest first, and supplemented with general market news when too few symbol-specific stories are available. A Financial Post function remains a placeholder and is not treated as an active source.</p></div>
              </StageSection>

              <StageSection number="05" eyebrow="Market Discovery" title="Turning many signals into views a person can scan">
                <p className="max-w-3xl leading-8 text-slate-300">BullishAI combines regional market views, movers, sectors, unusual volume, earnings context, heatmaps, and focused screens. These are research and discovery tools—not promises about future performance.</p>
                <div className="mt-8"><MediaPreview item={bullishAiCaseStudyMedia.heatmap} onOpen={setActiveMedia} /></div>
                <div className="mt-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">From market data to screened ideas</p>
                  <h4 className="mt-2 text-2xl">Different ways BullishAI explores the market</h4>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">Recommendation, value, and stable-growth views reuse normalized market and company information but organize it around different questions.</p>
                  <div className="mt-6"><CaseStudyCarousel items={bullishAiScreeningMedia} label="BullishAI screening examples" onOpen={setActiveMedia} /></div>
                </div>
              </StageSection>

              <StageSection number="06" eyebrow="AI Research Pipeline" title="The model does not fetch market data by itself">
                <div className="mb-8"><MediaPreview item={bullishAiCaseStudyMedia.aiAnalysis} onOpen={setActiveMedia} /></div>
                <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <p className="leading-8 text-slate-300">The application detects the kind of question, extracts tickers when relevant, retrieves live application data, and assembles a structured context object before asking the model to respond.</p>
                    <p className="mt-4 leading-8 text-slate-300">This is retrieval-augmented context assembly, not a vector database. It grounds the request with prices, fundamentals, news, holdings, indices, movers, sectors, screeners, unusual volume, and calendar data when those fields are available.</p>
                  </div>
                  <Flow items={["USER QUESTION", "INTENT + TICKER DETECTION", "LIVE DATA RETRIEVAL", "STRUCTURED CONTEXT", "MODEL ROUTER", "CONTEXT-AWARE RESPONSE"]} />
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Prices & fundamentals", "News", "Holdings", "Market indices", "Movers & sectors", "Screeners & calendar"].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-sm text-slate-300">{item}</div>)}</div>
              </StageSection>

              <StageSection number="07" eyebrow="Model Routing & Fallbacks" title="Separate what is active from what is experimental">
                <div className="grid gap-5 md:grid-cols-3">
                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.055] p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Active / primary</p><h4 className="mt-3 font-sans text-lg font-semibold text-white">Groq · Llama 3.3 70B</h4><p className="mt-3 text-sm leading-7 text-slate-400">The current route sends production AI requests through Groq using <span className="font-mono text-slate-300">llama-3.3-70b-versatile</span>, with timeouts and graceful service responses.</p></div>
                  <div className="rounded-2xl border border-blue-300/20 bg-blue-400/[0.055] p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Integrated, not default</p><h4 className="mt-3 font-sans text-lg font-semibold text-white">Gemini 1.5 Flash</h4><p className="mt-3 text-sm leading-7 text-slate-400">Gemini integration and news summarization code exist, but the current main router resolves its model branches through Groq rather than selecting Gemini for normal production requests.</p></div>
                  <div className="rounded-2xl border border-amber-200/20 bg-amber-200/[0.045] p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Optional / experimental</p><h4 className="mt-3 font-sans text-lg font-semibold text-white">Local PyTorch / Ollama</h4><p className="mt-3 text-sm leading-7 text-slate-400">Local inference, multi-model, and finance Q&amp;A knowledge-base paths remain experiments controlled by configuration. They are not presented as a deployed production model.</p></div>
                </div>
                <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-400/[0.055] p-6"><p className="flex items-center gap-2 font-semibold text-white"><ShieldCheck aria-hidden="true" className="h-5 w-5 text-violet-300" /> Why the AI is not a trading oracle</p><p className="mt-3 text-sm leading-7 text-slate-300">Prompts instruct the model to use supplied context for numbers, acknowledge missing information, add risk notes, and distinguish research from personalized advice. BullishAI is an educational software project, not a regulated adviser or brokerage.</p></div>
              </StageSection>

              <StageSection number="08" eyebrow="Portfolio Engine" title="Live value without rewriting cost basis">
                <p className="max-w-3xl leading-8 text-slate-300">BullishAI includes a paper portfolio and tracking system. Positions and trades preserve shares, average purchase price, cost basis, and realized return; fresh quotes calculate current market value and unrealized return.</p>
                <div className="mt-8"><MediaPreview item={bullishAiCaseStudyMedia.portfolio} onOpen={setActiveMedia} /></div>
                <div className="mt-8 rounded-2xl border border-white/10 bg-[#071123]/90 p-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center"><p className="font-semibold text-white">Stored positions</p><p className="mt-2 text-xs text-slate-400">shares · average price · cost basis</p></div><ArrowRight aria-hidden="true" className="mx-auto hidden h-5 w-5 text-violet-300 md:block" />
                    <div className="rounded-xl border border-violet-300/20 bg-violet-400/[0.06] p-4 text-center"><p className="font-semibold text-white">Mark to market</p><p className="mt-2 text-xs text-slate-400">shares × latest quote</p></div><ArrowRight aria-hidden="true" className="mx-auto hidden h-5 w-5 text-violet-300 md:block" />
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center"><p className="font-semibold text-white">Portfolio snapshot</p><p className="mt-2 text-xs text-slate-400">value · return · historical chart</p></div>
                  </div>
                </div>
                <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div><h4 className="text-2xl">From totals to individual positions</h4><p className="mt-4 leading-8 text-slate-300">A position’s purchase history does not change when the market moves. BullishAI keeps average price and cost separate, then combines the stored share quantity with the latest available quote to calculate current market value.</p></div><MediaPreview item={bullishAiCaseStudyMedia.holdings} onOpen={setActiveMedia} /></div>
              </StageSection>

              <StageSection number="09" eyebrow="Authentication, Data & User State" title="One PostgreSQL database, two access patterns">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Auth", "User · Session · Account"],
                    ["Monitoring", "Watchlist · Watchlist Item · Alert"],
                    ["Portfolio", "Portfolio · Position · Trade · Wallet Transaction · Snapshot"],
                    ["Market events", "Security · Corporate Action · Dividend Payout · FX Rate"],
                  ].map(([title, detail]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="text-sm font-semibold text-violet-200">{title}</p><p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p></div>)}
                </div>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><h4 className="font-sans text-lg font-semibold text-white">Prisma where it remains useful</h4><p className="mt-3 text-sm leading-7 text-slate-400">Better Auth uses the Prisma adapter for PostgreSQL-backed email/password accounts and server-side sessions. Current watchlist API routes also use the Prisma client.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><h4 className="font-sans text-lg font-semibold text-white">Direct PostgreSQL for portfolio operations</h4><p className="mt-3 text-sm leading-7 text-slate-400">Portfolio, wallet, trades, positions, snapshots, and dividend workflows use parameterized SQL through a shared <span className="font-mono text-slate-300">pg</span> pool, including transactions and row locks for atomic trades.</p></div>
                </div>
              </StageSection>

              <StageSection number="10" eyebrow="Watchlists, Alerts & Background Jobs" title="Useful work continues after the page closes">
                <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"><MediaPreview item={bullishAiCaseStudyMedia.watchlist} onOpen={setActiveMedia} /><div><p className="leading-8 text-slate-300">The main watchlist screen currently keeps its symbols and starred state in local storage while retrieving current quotes through SWR. Separate database-backed watchlist and alert models support server-side monitoring workflows.</p><p className="mt-4 text-sm leading-7 text-slate-400">That mixed architecture reflects the project’s evolution; it is more accurate than claiming every watchlist interaction already uses one persistence path.</p></div></div>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-violet-300/20 bg-violet-400/[0.055] p-6"><p className="flex items-center gap-2 font-semibold text-white"><BellRing aria-hidden="true" className="h-5 w-5 text-violet-300" /> Price alerts</p><Flow items={["Inngest: every minute", "Load active alerts", "Finnhub → Twelve Data", "Evaluate above / below / % move", "Resend email", "Mark notified"]} className="mt-5" /></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><p className="flex items-center gap-2 font-semibold text-white"><Mail aria-hidden="true" className="h-5 w-5 text-violet-300" /> Scheduled workflows</p><BulletList items={["A daily summary gathers up to ten watched symbols, identifies the largest moves, and sends an email through Resend.", "Dividend-oriented Inngest functions ingest corporate actions, snapshot eligible holdings, and process pending payouts through direct SQL.", "The dividend infrastructure is substantial, but it is described as an evolving subsystem rather than a finished brokerage feature."]} /></div>
                </div>
              </StageSection>

              <StageSection number="11" eyebrow="Reliability, Debugging & Deployment" title="The difficult work lives between features">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    [RefreshCw, "Multi-provider data", "Different APIs return different fields, limits, time ranges, failures, and symbol conventions."],
                    [Database, "Data consistency", "Charts, watchlists, portfolio valuation, and AI context must agree on prices, symbols, and timestamps."],
                    [Bot, "AI context", "The system must supply current facts and degrade clearly when a provider or model cannot respond."],
                    [CircleDollarSign, "Portfolio valuation", "Live prices change market value while purchase price and cost basis must remain stable."],
                  ].map(([Icon, title, detail]) => <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><Icon aria-hidden="true" className="h-5 w-5 text-violet-300" /><h4 className="mt-4 font-sans text-lg font-semibold text-white">{String(title)}</h4><p className="mt-3 text-sm leading-7 text-slate-400">{String(detail)}</p></div>)}
                </div>
                <div className="mt-7 rounded-2xl border border-white/10 bg-[#071123]/90 p-6"><p className="flex items-center gap-2 font-semibold text-white"><CloudCog aria-hidden="true" className="h-5 w-5 text-violet-300" /> Deployed on Netlify</p><p className="mt-3 text-sm leading-7 text-slate-400">The current repository builds Next.js through Netlify’s Next.js plugin. Serverless deployment made environment configuration, database connection reuse, authenticated base URLs, API timeouts, and graceful provider failure part of the engineering work—not afterthoughts.</p></div>
              </StageSection>

              <StageSection number="12" eyebrow="Reflection" title="What building BullishAI taught me">
                <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-5 leading-8 text-slate-300"><p>The biggest lesson was that a useful product is a network of contracts. A chart depends on normalized candles. An AI answer depends on retrieved context. A portfolio total depends on stored transactions and current prices. Reliability comes from respecting every boundary between them.</p><p>BullishAI gave me room to work across product thinking, UI, API design, external integrations, data modeling, authentication, financial calculations, background processing, deployment, and the debugging required to make those pieces behave like one application.</p></div>
                  <div className="rounded-2xl border border-violet-300/20 bg-violet-400/[0.055] p-6"><p className="flex items-center gap-2 font-semibold text-white"><Sparkles aria-hidden="true" className="h-5 w-5 text-violet-300" /> The enduring principle</p><p className="mt-4 text-lg leading-8 text-amber-100">The hard part was not drawing a stock chart. It was making several imperfect systems behave like one understandable product.</p></div>
                </div>
                <p className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-slate-400">BullishAI is an educational and research software project. It does not execute real brokerage orders or provide personalized financial advice.</p>
              </StageSection>
            </div>
          </div>
        </section>

        <Reveal className="mt-16">
          <section aria-labelledby="next-step-heading" className="rounded-[2rem] border border-violet-300/20 bg-gradient-to-r from-slate-950 via-violet-950/70 to-slate-950 p-7 text-center shadow-2xl sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Explore the Project</p>
            <h2 id="next-step-heading" className="mt-3 text-3xl sm:text-4xl">See the system beyond the case study</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">Open the live product, inspect the source, watch the full walkthrough, or return to the portfolio projects.</p>
            <div className="mt-7 flex justify-center"><ExternalActions includeBack /></div>
          </section>
        </Reveal>
      </div>

      {activeMedia ? <ImageLightbox item={activeMedia} onClose={() => setActiveMedia(null)} /> : null}
    </div>
  );
}
