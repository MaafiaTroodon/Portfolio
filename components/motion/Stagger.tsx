"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? false : "hidden"}
      whileInView={prefersReduced ? undefined : "show"}
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
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : undefined}
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
