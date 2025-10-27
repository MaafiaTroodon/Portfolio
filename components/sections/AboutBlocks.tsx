"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const bio = `
I'm a software developer based in Halifax, Nova Scotia, currently pursuing my studies 
while working in technology support and backend development. I'm passionate about 
building modern web applications with a focus on user experience and performance.
`;

const education = [
  {
    institution: "Dalhousie University",
    degree: "Computer Science",
    duration: "2023 - Present",
    description: "Pursuing degree with focus on software engineering and web development",
  },
];

const experience = [
  {
    role: "Classroom Technology Support",
    company: "Dalhousie ITS",
    duration: "Sept 2025 - Present",
    description: "Supporting faculty and students with classroom technology solutions",
  },
  {
    role: "Backend Team Lead",
    company: "Worship",
    duration: "May 2025 - Present",
    description: "Leading backend development for web applications and APIs",
  },
];

export function AboutBlocks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (typeof window !== "undefined") {
        ScrollTrigger.batch(".animate-in-view", {
          onEnter: (elements) => {
            gsap.from(elements, {
              opacity: 0,
              y: 50,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
          start: "top 80%",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="space-y-12">
      {/* Bio */}
      <motion.div
        className="animate-in-view"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed">
          {bio}
        </p>
      </motion.div>

      {/* Education */}
      <div className="space-y-6">
        <motion.div
          className="animate-in-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Education
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="animate-in-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{edu.institution}</CardTitle>
                    <Badge variant="secondary">{edu.duration}</Badge>
                  </div>
                  <CardDescription className="text-base font-medium">{edu.degree}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="space-y-6">
        <motion.div
          className="animate-in-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Work Experience
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="animate-in-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{exp.role}</CardTitle>
                    <Badge variant="secondary">{exp.duration}</Badge>
                  </div>
                  <CardDescription className="text-base font-medium">{exp.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

