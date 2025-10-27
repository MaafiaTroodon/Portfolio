"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProjectsGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2"
    >
      {projects.map((project) => (
        <motion.div 
          key={project.id} 
          variants={item}
          whileHover={{ scale: 1.02 }}
          className="transform transition-all duration-300"
        >
          <Card className="group hover:shadow-2xl transition-all duration-500 h-full flex flex-col hover:border-primary/50 border-2">
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors text-xl">
                {project.title}
              </CardTitle>
              <CardDescription className="text-base">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-all duration-300 hover:scale-105"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
