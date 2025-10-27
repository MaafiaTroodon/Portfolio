"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip";
import { Stagger, Item } from "@/components/motion/Stagger";

const projects = [
  {
    id: 1,
    title: "FlexBeats — Music Streaming Web App",
    role: "Full-Stack Developer (React, Redux) • Jan 2025 – Apr 2025",
    description: "A modern Spotify-style web app with global audio controls, lyrics view, location-aware charts, and fast search. Integrated multiple music endpoints and synchronized playback across routes with Redux state.",
    tags: ["React 18", "Redux Toolkit", "Tailwind", "ShazamCore API", "Spotify API"],
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
    liveUrl: "https://fancy-lollipop-fcb73b.netlify.app/",
    githubUrl: "https://github.com/MaafiaTroodon/interactive-portfolio",
    image: "/photos/interactiveportfolio.png",
  },
];


function ProjectLinks({ github, live }: { github?: string; live?: string }) {
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
    </div>
  );
}

export function ProjectsGrid() {
  return (
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
              </CardHeader>
              <CardFooter className="mt-auto">
                <ProjectLinks github={project.githubUrl} live={project.liveUrl || undefined} />
              </CardFooter>
            </Card>
          </motion.div>
        </Item>
      ))}
    </Stagger>
  );
}
