"use client";

import { motion } from "framer-motion";
import { AboutBlocks } from "@/components/sections/AboutBlocks";

export default function AboutPage() {
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
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h1>
        <AboutBlocks />
      </div>
    </motion.div>
  );
}

