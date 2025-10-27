"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: 1,
    title: "Project A",
    description: "A sophisticated web application built with React and modern frameworks.",
    tags: ["React", "Next.js", "Tailwind", "Node.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/MaafiaTroodon",
  },
  {
    id: 2,
    title: "Project B",
    description: "Interactive 3D experience using Three.js and GSAP animations.",
    tags: ["Three.js", "R3F", "GSAP", "TypeScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/MaafiaTroodon",
  },
  {
    id: 3,
    title: "Project C",
    description: "Full-stack application with API integration and modern UI design.",
    tags: ["React", "API", "PostgreSQL", "Express"],
    liveUrl: "#",
    githubUrl: "https://github.com/MaafiaTroodon",
  },
  {
    id: 4,
    title: "Project D",
    description: "Portfolio website with smooth animations and responsive design.",
    tags: ["Next.js", "Framer Motion", "GSAP", "Tailwind"],
    liveUrl: "#",
    githubUrl: "https://github.com/MaafiaTroodon",
  },
];

export function ProjectsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (typeof window !== "undefined") {
        ScrollTrigger.batch(".project-card", {
          onEnter: (elements) => {
            gsap.from(elements, {
              opacity: 0,
              y: 50,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
          start: "top 85%",
        });
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="project-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

