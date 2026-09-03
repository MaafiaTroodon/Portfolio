"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText, FolderKanban, MapPin } from "lucide-react";

const skills = [
  "Software Engineering",
  "Full-Stack Development",
  "Systems Analysis",
  "Power Platform",
  "Microsoft 365",
  "Data & Automation",
  "React / Next.js",
  "Java / Spring Boot",
];

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : 0.6 },
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section className="content-backdrop relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-20 pt-24">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.p {...enter(0.05)} className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-violet-300 sm:text-sm">
          Computer Science Co-op · Dalhousie University
        </motion.p>
        <motion.h1 {...enter(0.12)} className="text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
          Malhar Datta Mahajan
        </motion.h1>
        <motion.p {...enter(0.24)} className="mx-auto mt-6 max-w-4xl text-xl font-medium leading-relaxed text-slate-200 md:text-2xl">
          Software Developer <span aria-hidden="true">•</span> Systems &amp; Data Analyst <span aria-hidden="true">•</span> IT Support
        </motion.p>
        <motion.p {...enter(0.3)} className="mt-3 inline-flex items-center gap-2 text-sm text-slate-400">
          <MapPin aria-hidden="true" className="h-4 w-4" /> Halifax, Nova Scotia, Canada
        </motion.p>

        <motion.div {...enter(0.4)} className="mx-auto mb-11 mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full border border-violet-200/15 bg-slate-950/55 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-sm backdrop-blur sm:text-sm">
              {skill}
            </span>
          ))}
        </motion.div>

        <motion.div {...enter(0.52)} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={() => scrollTo("projects")} className="btn-gradient min-h-12 min-w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            <span>View Projects</span><FolderKanban aria-hidden="true" className="ml-2 h-5 w-5" />
          </button>
          <button type="button" onClick={() => scrollTo("resume")} className="inline-flex min-h-12 min-w-44 items-center justify-center rounded-lg border border-violet-300/40 bg-slate-950/55 px-6 py-3 text-sm font-medium text-slate-100 backdrop-blur transition hover:border-violet-300 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
            <FileText aria-hidden="true" className="mr-2 h-5 w-5" /> Resume
          </button>
        </motion.div>

        <motion.button {...enter(0.72)} type="button" onClick={() => scrollTo("about")} className="absolute bottom-7 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" aria-label="Scroll to About Me">
          <ArrowDown aria-hidden="true" className="h-7 w-7 motion-safe:animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
