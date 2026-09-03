"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, Item } from "@/components/motion/Stagger";
import Image from "next/image";
import { MediaCarousel } from "@/components/shared/MediaCarousel";
import { bullishAiMedia } from "@/lib/portfolio-data";

const projects = [
  {
    id: 1,
    title: "FlexBeats — Music Streaming Web App",
    role: "Full-Stack Developer (React, Redux) • Jan 2025 – Apr 2025",
    description: "A modern Spotify-style web app with global audio controls, lyrics view, location-aware charts, and fast search. Integrated multiple music endpoints and synchronized playback across routes with Redux state.",
    tags: ["React 18", "Redux Toolkit", "Tailwind", "ShazamCore API", "Spotify API"],
    liveUrl: "https://flexbeatsx.netlify.app",
    liveLabel: "Live Demo",
    githubUrl: "https://github.com/MaafiaTroodon/FlexBeats",
    image: "/photos/flexbeats.png",
  },
  {
    id: 2,
    title: "Urban SWAT Platformer — 3D Action Game",
    role: "Game Designer & Developer",
    description: "A third-person action-platformer where a SWAT operative battles vampires across multi-level arenas with moving platforms and checkpoints. Implemented enemy AI, health/lives HUD, camera follow, and portal-gated progression.",
    tags: ["Unity 2022 LTS", "C#", "Rigidbody physics", "URP/HDRP"],
    liveUrl: "https://maafiatroodon.itch.io/urban-swat-platformer",
    liveLabel: "Play on itch.io",
    githubUrl: "https://github.com/MaafiaTroodon/UrbanSWAT-Platformer",
    image: "/photos/game%20scene%201.png",
  },
  {
    id: 3,
    title: "Apple Website Clone — 3D Product Showcase",
    role: "Frontend Developer • Feb 2025 – Mar 2025",
    description: "A polished, iPhone-15-inspired product site with 3D device models, section reveals, and smooth scroll choreography. Built lightweight model viewers, page micro-interactions, and performance-friendly animations.",
    tags: ["React", "Three.js (R3F)", "GSAP", "Tailwind", "Vite"],
    liveUrl: "https://malhar999clone.netlify.app/",
    liveLabel: "Live Demo",
    githubUrl: "https://github.com/MaafiaTroodon/Apple_Website_Clone",
    image: "/photos/appleClone.png",
  },
  {
    id: 4,
    title: "Chem-AR — Molecular AR Viewer",
    role: "Junior Software Developer (React/WebXR) • Sept 2024 – Dec 2024",
    description: "Course project for CSCI 2691 delivered in agile sprints with Jira. Built a web AR tool to load, render, and manipulate molecular structures (ball-and-stick) with scene controls and example datasets.",
    tags: ["Node.js", "Express", "Three.js", "AR.js/WebXR", "Supabase"],
    liveUrl: "https://chem-ar-production.up.railway.app/",
    liveLabel: "Live Demo",
    githubUrl: "https://github.com/MaafiaTroodon/chem-ar",
    image: "/photos/chemar.png",
  },
  {
    id: 5,
    title: "QuickTutor — Educational & E-commerce Android App",
    role: "Software Engineer (Android, Java)",
    description: "Mobile app blending tutor discovery and a simple store. Implemented role-based access (student/tutor/admin), product search/details, and location mapping via Google Maps. Wrote tests for UI flows and refactored code.",
    tags: ["Android Studio", "Java", "JUnit/Espresso", "Google Maps API"],
    liveUrl: null,
    liveLabel: null,
    githubUrl: "https://github.com/MaafiaTroodon/QuickTutor",
    image: "/photos/storedetails.png",
  },
  {
    id: 6,
    title: "Interactive Portfolio — Dynamic Personal Site",
    role: "Full-Stack Developer",
    description: "A React-based interactive portfolio that integrates a Node/Express backend for dynamic content fetching. Features include a live theme switcher, skill filtering, project retrieval from API, and real-time weather display.",
    tags: ["React.js", "Express.js", "CSS3", "HTML5", "Netlify"],
    liveUrl: "https://fancy-lollipop-fcb73b.netlify.app/",
    liveLabel: "Live Demo",
    githubUrl: "https://github.com/MaafiaTroodon/interactive-portfolio",
    image: "/photos/interactiveportfolio.png",
  },
];


function ProjectLinks({ github, live, liveLabel = "Live Demo" }: { github?: string; live?: string; liveLabel?: string | null }) {
  const base = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-100 backdrop-blur transition hover:border-violet-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  return (
    <div className="flex flex-wrap gap-3">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className={base} aria-label="View project on GitHub (opens in a new tab)">
          <Github aria-hidden="true" className="h-4 w-4" /> GitHub
        </a>
      )}
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer" className={base} aria-label={`${liveLabel} (opens in a new tab)`}>
          <ExternalLink aria-hidden="true" className="h-4 w-4" /> {liveLabel}
        </a>
      )}
    </div>
  );
}

export function ProjectsGrid() {
  return (
    <div className="space-y-6">
      <article className="overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-violet-950/70 shadow-2xl shadow-violet-950/30 backdrop-blur">
        <div className="border-b border-white/10 bg-slate-900/45 p-3 sm:p-5 lg:p-6">
          <MediaCarousel items={bullishAiMedia} label="BullishAI project screenshots" variant="wide-compact" />
        </div>

        <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Featured independent project</p>
            <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">BullishAI</h3>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              An ambitious software project for exploring full-stack engineering through financial data, external APIs,
              databases, analytics, and AI-assisted workflows. It complements my professional systems work with deeper
              independent product and engineering experimentation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Full-Stack Engineering", "Financial Data", "APIs", "Databases", "Analytics", "AI-Assisted Systems"].map((tag) => (
                <Badge key={tag} variant="secondary" className="border border-white/10 bg-white/5 text-slate-200">{tag}</Badge>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3" aria-label="BullishAI project links">
              <a href="https://bullishai.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn-gradient min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" aria-label="Open the BullishAI live project in a new tab">
                <span>Live Project</span><ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
              <a href="https://github.com/MaafiaTroodon/BullishAI" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-100 transition hover:border-violet-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" aria-label="View BullishAI on GitHub in a new tab">
                <Github aria-hidden="true" className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.youtube.com/watch?v=d9bEno_9TNU" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-100 transition hover:border-violet-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" aria-label="Watch the BullishAI video demo in a new tab">
                <PlayCircle aria-hidden="true" className="h-4 w-4" /> Watch Demo
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold text-violet-200">Engineering focus</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <li>Designing clear boundaries between data ingestion, application logic, and presentation.</li>
              <li>Working with market-oriented data and analytics across a full-stack system.</li>
              <li>Evaluating where AI-assisted features add practical value to the user experience.</li>
            </ul>
          </div>
        </div>
      </article>

      <Stagger className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
        <Item key={project.id} delay={index * 0.02}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <Card className="group hover:shadow-2xl transition-all duration-500 h-full flex flex-col hover:border-primary/50 border-2 overflow-hidden">
              {project.image && (
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors text-xl mb-2">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  {project.role}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardHeader>
              <CardFooter className="mt-auto">
                <ProjectLinks github={project.githubUrl} live={project.liveUrl || undefined} liveLabel={project.liveLabel} />
              </CardFooter>
            </Card>
          </motion.div>
        </Item>
        ))}
      </Stagger>
    </div>
  );
}
