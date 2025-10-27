"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export default function ResumePage() {
  const handleDownload = () => {
    // This would download the actual resume file
    window.open("/resume.pdf", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
        >
          Resume
        </motion.h1>

        <div className="flex justify-center mb-8">
          <Button size="lg" onClick={handleDownload} className="group">
            <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            Download PDF
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border rounded-lg p-8 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Resume Preview</h3>
            <p className="text-muted-foreground mb-4">
              Click the button above to download the full resume as a PDF.
            </p>
            <iframe
              src="/resume.pdf"
              className="w-full h-[800px] border rounded-lg"
              title="Resume Preview"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

