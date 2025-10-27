"use client";

import { motion, useInView } from "framer-motion";
import { PropsWithChildren, useRef, useState, useEffect } from "react";

type Props = PropsWithChildren<{
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}>;

export default function Reveal({ children, delay = 0, y = 16, once = true, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const variants = {
    hidden: { opacity: 0, y },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1], 
        delay 
      } 
    },
  };

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

