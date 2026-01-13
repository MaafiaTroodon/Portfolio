"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const resumes = [
  { label: "Data Analyst Resume", file: "Data_Analyst _Resume.pdf" },
  { label: "Software Resume", file: "Software_Resume.pdf" },
  { label: "General resume", file: "general_resume.pdf" },
];

export function ResumeSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % resumes.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [resumes.length]);

  const handleDownload = () => {
    const activeResume = resumes[activeIndex];
    const src = `/${activeResume.file}`;
    window.open(encodeURI(src), "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8"
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-8">
        Resume
      </h2>
      <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
        View my resume below or download it as a PDF.
      </p>
      
      <div className="w-full max-w-4xl mx-auto bg-muted rounded-lg overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={resumes[activeIndex].file}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <iframe
              src={encodeURI(`/${resumes[activeIndex].file}`)}
              className="w-full h-[800px] border-0"
              title={resumes[activeIndex].label}
              allowFullScreen
              suppressHydrationWarning
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {resumes.map((resume, index) => (
          <button
            key={resume.file}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full border px-4 py-2 text-sm transition-all ${
              index === activeIndex
                ? "border-primary text-primary bg-primary/10"
                : "border-white/10 text-muted-foreground hover:text-primary hover:border-primary/40"
            }`}
          >
            {resume.label}
          </button>
        ))}
      </div>
      
      <Button
        size="lg"
        onClick={handleDownload}
        className="btn-gradient px-8 py-6 text-lg"
      >
        <span>Download Resume</span>
        <Download className="ml-2 h-6 w-6" />
      </Button>
    </motion.div>
  );
}
