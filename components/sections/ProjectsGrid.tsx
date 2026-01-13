"use client";

import { useEffect, useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, PlayCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip";
import { Stagger, Item } from "@/components/motion/Stagger";

const projects = [
  {
    id: 1,
    title: "FlexBeats — Music Streaming Web App",
    role: "Full-Stack Developer (React, Redux) • Jan 2025 – Apr 2025",
    description: "A modern Spotify-style web app with global audio controls, lyrics view, location-aware charts, and fast search. Integrated multiple music endpoints and synchronized playback across routes with Redux state.",
    tags: ["React 18", "Redux Toolkit", "Tailwind", "ShazamCore API", "Spotify API"],
    techStack: "React 18, Redux Toolkit, Tailwind, ShazamCore API, Spotify API.",
    liveUrl: "https://flexbeatsx.netlify.app",
    githubUrl: "https://github.com/MaafiaTroodon/FlexBeats",
    image: "/photos/flexbeats.png",
  },
  {
    id: 2,
    title: "Urban SWAT Platformer — 3D Action Game",
    role: "Game Designer & Developer",
    description: "A third-person action-platformer where a SWAT operative battles vampires across multi-level arenas with moving platforms and checkpoints. Implemented enemy AI, health/lives HUD, camera follow, and portal-gated progression.",
    tags: ["Unity 2022 LTS", "C#", "Rigidbody physics", "URP/HDRP"],
    techStack: "Unity 2022 LTS, C#, Rigidbody physics, URP/HDRP.",
    liveUrl: "https://maafiatroodon.itch.io/urban-swat-platformer",
    githubUrl: "https://github.com/MaafiaTroodon/UrbanSWAT-Platformer",
    image: "/photos/game%20scene%201.png",
  },
  {
    id: 3,
    title: "Apple Website Clone — 3D Product Showcase",
    role: "Frontend Developer • Feb 2025 – Mar 2025",
    description: "A polished, iPhone-15-inspired product site with 3D device models, section reveals, and smooth scroll choreography. Built lightweight model viewers, page micro-interactions, and performance-friendly animations.",
    tags: ["React", "Three.js (R3F)", "GSAP", "Tailwind", "Vite"],
    techStack: "React, Three.js (R3F), GSAP, Tailwind, Vite.",
    liveUrl: "https://malhar999clone.netlify.app/",
    githubUrl: "https://github.com/MaafiaTroodon/Apple_Website_Clone",
    image: "/photos/appleClone.png",
  },
  {
    id: 4,
    title: "Chem-AR — Molecular AR Viewer",
    role: "Junior Software Developer (React/WebXR) • Sept 2024 – Dec 2024",
    description: "Course project for CSCI 2691 delivered in agile sprints with Jira. Built a web AR tool to load, render, and manipulate molecular structures (ball-and-stick) with scene controls and example datasets.",
    tags: ["Node.js", "Express", "Three.js", "AR.js/WebXR", "Supabase"],
    techStack: "Node.js, Express, Three.js, AR.js/WebXR, Supabase.",
    liveUrl: "https://chem-ar-production.up.railway.app/",
    githubUrl: "https://github.com/MaafiaTroodon/chem-ar",
    image: "/photos/chemar.png",
  },
  {
    id: 5,
    title: "QuickTutor — Educational & E-commerce Android App",
    role: "Software Engineer (Android, Java)",
    description: "Mobile app blending tutor discovery and a simple store. Implemented role-based access (student/tutor/admin), product search/details, and location mapping via Google Maps. Wrote tests for UI flows and refactored code.",
    tags: ["Android Studio", "Java", "JUnit/Espresso", "Google Maps API"],
    techStack: "Android Studio, Java, JUnit/Espresso, Google Maps API.",
    liveUrl: null,
    githubUrl: "https://github.com/MaafiaTroodon/QuickTutor",
    image: "/photos/storedetails.png",
  },
  {
    id: 6,
    title: "Interactive Portfolio — Dynamic Personal Site",
    role: "Full-Stack Developer",
    description: "A React-based interactive portfolio that integrates a Node/Express backend for dynamic content fetching. Features include a live theme switcher, skill filtering, project retrieval from API, and real-time weather display.",
    tags: ["React.js", "Express.js", "CSS3", "HTML5", "Netlify"],
    techStack: "React.js, Express.js, CSS3, HTML5, Netlify.",
    liveUrl: "https://fancy-lollipop-fcb73b.netlify.app/",
    githubUrl: "https://github.com/MaafiaTroodon/interactive-portfolio",
    image: "/photos/interactiveportfolio.png",
  },
];

const bullishImages = ["/photos/BullishAI1.png", "/photos/BullishAI2.png", "/photos/BullishAI3.png"];
const bullishTechStack = "Next.js 15, React 18, TypeScript, Tailwind CSS, Node.js, PostgreSQL (Neon), Prisma, SQL, REST APIs, AI (Groq/Gemini), financial market APIs, Netlify, Git/GitHub.";
const bullishTechTags = bullishTechStack.split(",").map((tag) => tag.trim());


function ProjectLinks({ github, live, demo }: { github?: string; live?: string; demo?: string }) {
  const base = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur transition-transform duration-200 hover:scale-110 hover:rotate-3 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50";
  
  return (
    <div className="flex gap-3">
      {github && (
        <Tooltip content="View GitHub">
          <a href={github} target="_blank" rel="noopener noreferrer" className={base} aria-label="View GitHub">
            <Github className="h-5 w-5" />
          </a>
        </Tooltip>
      )}
      {live && (
        <Tooltip content="Open Live Demo">
          <a href={live} target="_blank" rel="noopener noreferrer" className={base} aria-label="Open Live Demo">
            <ExternalLink className="h-5 w-5" />
          </a>
        </Tooltip>
      )}
      {demo && (
        <Tooltip content="Watch Demo">
          <a href={demo} target="_blank" rel="noopener noreferrer" className={base} aria-label="Watch Demo">
            <PlayCircle className="h-5 w-5" />
          </a>
        </Tooltip>
      )}
    </div>
  );
}

function FeaturedBullishAI() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % bullishImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [bullishImages.length]);

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
    >
      <Card className="overflow-hidden border-2 transition-all duration-500 hover:border-primary/50">
        <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs uppercase tracking-wide">Featured</Badge>
              <span className="text-xs text-muted-foreground">AI + Analytics</span>
            </div>
            <CardTitle className="text-2xl mb-2">BullishAI — AI-Powered Market Research & Analytics Platform</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mb-4">
              Architected and built a full-stack platform integrating frontend dashboards with backend services to ingest, process, and serve large-scale financial datasets.
            </CardDescription>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside mb-4">
              <li>Designed SQL-backed data models and aggregation pipelines to efficiently query, normalize, and transform multi-source market data into structured insights.</li>
              <li>Implemented analytics and signal-generation workflows, including basic ML-driven scoring and trend detection, to surface actionable patterns from raw data.</li>
              <li>Optimized API and data-fetch pipelines, improving aggregation performance and responsiveness by ~30% while preserving data accuracy and reliability.</li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-4">
              {bullishTechTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <ProjectLinks
              live="https://bullishai.netlify.app/"
              github="https://github.com/MaafiaTroodon/BullishAI"
              demo="https://www.youtube.com/watch?v=d9bEno_9TNU"
            />
          </div>
          <div className="relative bg-muted h-64 md:h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={bullishImages[activeIndex]}
                src={bullishImages[activeIndex]}
                alt="BullishAI project screenshot"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 px-3 py-1">
              {bullishImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show BullishAI slide ${index + 1}`}
                  className={`h-1.5 w-6 rounded-full transition-colors ${index === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function ProjectsGrid() {
  return (
    <div className="space-y-8">
      <FeaturedBullishAI />
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
                    <img 
                      src={project.image} 
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              <p className="text-xs text-muted-foreground mt-3">
                Tech Stack: {project.techStack}
              </p>
            </CardHeader>
                <CardFooter className="mt-auto">
                  <ProjectLinks github={project.githubUrl} live={project.liveUrl || undefined} />
                </CardFooter>
              </Card>
            </motion.div>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
