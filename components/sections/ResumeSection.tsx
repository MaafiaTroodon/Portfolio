"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ResumeSection() {
  const handleDownload = () => {
    window.open("/resume.pdf", "_blank");
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
        <iframe
          src="/resume.pdf"
          className="w-full h-[800px] border-0"
          title="Resume PDF Viewer"
        />
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

