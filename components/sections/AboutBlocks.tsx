"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const bio = `
Hey, I'm Malhar, a computer science student at Dalhousie University and a developer who loves turning ideas into things that actually work. I enjoy building projects that make life a little easier (or at least a bit cooler), whether that's a clean-looking website, a smart backend system, or something that just makes people go, "Wait, you built that?"

I'm the kind of person who learns best by doing, breaking stuff, fixing it, and figuring out how to make it better. Outside of school, you'll probably find me debugging with music blasting, brainstorming random startup ideas with friends, or working on projects that solve real-life problems in creative ways.

At heart, I love technology because it lets me build useful things that help people, not just code for the sake of code. My goal is simple: keep learning, keep building, and have fun doing it.
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
    company: "Dalhousie University ITS – Halifax, NS",
    duration: "September 2025 – Present",
    logo: "/photos/dalhousieLogo1.png",
    bullets: [
      "Provide IT and AV support across classrooms and lecture halls, including troubleshooting computers, touchscreens, microphones, and networked systems.",
      "Deliver quick and reliable solutions to ensure a smooth teaching experience for faculty and students.",
      "Document procedures, track assets, and recommend workflow improvements for long-term efficiency.",
      "Strengthened teamwork, customer service, and communication skills through on-site and hybrid collaboration."
    ],
  },
  {
    role: "Community Safety Team (CST)",
    company: "Dalhousie Residence Services – Halifax, NS",
    duration: "September 2025 – Present",
    logo: "/photos/dalhousieLogo1.png",
    bullets: [
      "Promote a safe, inclusive, and welcoming residence environment for students living on campus.",
      "Provide first aid and respond to incidents while maintaining adherence to safety and community protocols.",
      "Collaborate with Residence Life staff to resolve concerns, support students, and foster positive community engagement."
    ],
  },
  {
    role: "Backend Team Lead Intern",
    company: "Worship Streaming Platform – Remote",
    duration: "May 2025 – Present",
    logo: "/photos/worshiplogo.png",
    bullets: [
      "Lead backend development for a cloud-based streaming platform designed to connect churches with their communities.",
      "Work in agile sprints to design and maintain scalable APIs using Java, Spring Boot, MongoDB, and AWS.",
      "Implemented Power BI dashboards to visualize user engagement and monitor system performance.",
      "Collaborate with cross-functional teams to ensure reliability, scalability, and smooth feature delivery."
    ],
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

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {experience.map((exp, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-300"
            >
              <Card className="hover:shadow-2xl transition-all duration-500 hover:border-primary/50 border-2 h-full flex flex-col">
                <CardHeader className="space-y-3">
                  <div className="flex items-start gap-3">
                    {exp.logo && (
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} Logo`}
                        className="h-12 w-12 object-contain flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{exp.role}</CardTitle>
                      <CardDescription className="text-sm">{exp.company}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit text-xs">{exp.duration}</Badge>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    {exp.bullets?.map((bullet, i) => (
                      <li key={i} className="text-muted-foreground">{bullet}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
