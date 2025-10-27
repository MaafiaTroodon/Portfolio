"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const bio = `
I am a software developer based in Halifax, Nova Scotia, currently pursuing a Bachelor of Computer Science at Dalhousie University while working in technology support and backend development.

My work focuses on building modern, responsive web applications with attention to user experience and system performance. I specialize in backend development using Java and Spring Boot, and have experience with React, Three.js, Tailwind CSS, SQL, and MongoDB.

With a background in IT support and academic projects, I bring a strong understanding of networking, cybersecurity, and system troubleshooting. I aim to create reliable, efficient, and thoughtfully designed software solutions that align with both user needs and technical best practices.
`;

const education = [
  {
    institution: "Dalhousie University",
    location: "Halifax, Nova Scotia, Canada",
    degree: "Bachelor of Computer Science (Co-op)",
    duration: "Expected Graduation: Winter 2027",
    logo: "https://www.dal.ca/etc/designs/dalhousie/clientlibs/images/shield.svg",
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
                        <Image 
                          src={edu.logo} 
                          alt={`${edu.institution} Logo`}
                          width={64}
                          height={64}
                          className="object-contain"
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
