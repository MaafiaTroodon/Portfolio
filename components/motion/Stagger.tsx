"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Item({ 
  children, 
  y = 20, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  y?: number; 
  delay?: number; 
}) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReduced) return <>{children}</>;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1], 
            delay 
          } 
        },
      }}
    >
      {children}
    </motion.div>
  );
}

