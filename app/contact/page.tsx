"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/sections/ContactForm";

export default function ContactPage() {
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
          Get In Touch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Have a question or want to work together? Send me a message and I&apos;ll get back to you
          as soon as possible.
        </motion.p>

        <ContactForm />
      </div>
    </motion.div>
  );
}

