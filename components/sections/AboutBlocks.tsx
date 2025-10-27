"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const bio = `
I'm Malhar, a software developer based in Halifax, Nova Scotia, currently pursuing a Bachelor of Computer Science at Dalhousie University while working in technology support and backend development.

I love creating things that are useful, efficient, and genuinely help people. Whether it's a website that feels great to use or a project that solves a real-world problem, I enjoy bringing ideas to life through code.

I'm most at home working with Java and Spring Boot on the backend, but I also enjoy experimenting with React, Three.js, Tailwind CSS, and a mix of other tools to make interactive and visually engaging projects.

Outside of school and work, I like learning new tech, brainstorming startup ideas, and collaborating on creative projects that push my skills a bit further each time. My goal is to keep building, keep improving, and have fun while doing it.
`;

const education = [
  {
    institution: "Dalhousie University",
    location: "Halifax, Nova Scotia, Canada",
    degree: "Bachelor of Computer Science (Co-op)",
    duration: "Expected Graduation: Winter 2027",
    logo: "/photos/dalhousieLogo1.png",
    highlights: [
      "Coursework in Software Engineering, Cybersecurity & Defence Systems, and Game Design & Development",
      "Core studies in Operating Systems, Networks and Communications, and Database Management",
      "Proficiency in C, Java, Python, and SQL across multiple programming paradigms",
      "Experienced in Spring Boot, RESTful API development, and backend architecture",
      "Exposure to web development, cloud computing, and scalable API integration"
    ],
    address: "6050 University Avenue, Halifax, NS B3H 1W5",
    description: "Dalhousie University is a leading Canadian research institution recognized for its innovation and experiential learning. The Bachelor of Computer Science program blends theory with practical experience, emphasizing modern software engineering, cybersecurity, and intelligent systems."
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

        <div className="grid gap-6">
          {education.map((edu, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-300"
            >
              <Card className="hover:shadow-2xl transition-all duration-500 hover:border-primary/50 border-2">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {edu.logo && (
                        <img 
                          src={edu.logo} 
                          alt={`${edu.institution} Logo`}
                          className="h-16 w-16 object-contain"
                        />
                      )}
                      <div>
                        <CardTitle className="text-2xl mb-2">{edu.institution}</CardTitle>
                        <CardDescription className="text-sm">{edu.location}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">{edu.duration}</Badge>
                  </div>
                  <CardDescription className="text-base font-semibold text-primary">
                    {edu.degree}
                  </CardDescription>
                  {edu.address && (
                    <p className="text-xs text-muted-foreground">{edu.address}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                  <div>
                    <p className="text-sm font-semibold mb-2">Highlights:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {edu.highlights?.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-300"
            >
              <Card className="hover:shadow-2xl transition-all duration-500 hover:border-primary/50 border-2">
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
