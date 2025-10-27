"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

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

export function AboutBlocks() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {/* Bio */}
      <motion.div variants={item}>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed">
          {bio}
        </p>
      </motion.div>

      {/* Education */}
      <div className="space-y-6">
        <motion.div variants={item}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Education
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <motion.div key={index} variants={item}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{edu.institution}</CardTitle>
                    <Badge variant="secondary">{edu.duration}</Badge>
                  </div>
                  <CardDescription className="text-base font-medium">
                    {edu.degree}
                  </CardDescription>
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
        <motion.div variants={item}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Work Experience
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {experience.map((exp, index) => (
            <motion.div key={index} variants={item}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{exp.role}</CardTitle>
                    <Badge variant="secondary">{exp.duration}</Badge>
                  </div>
                  <CardDescription className="text-base font-medium">
                    {exp.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
