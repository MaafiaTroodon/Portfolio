"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { VantaRings } from "@/components/three/VantaRings";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const useNativeScroll = pathname === "/experience/portucana";
  const lenisRef = useRef<{ raf: (time: number) => void; destroy: () => void } | null>(null);
  const frameRef = useRef<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    if (mediaQuery.matches || useNativeScroll) return;
    
    // Dynamic import for Lenis to avoid SSR issues
    import("lenis").then((LenisModule) => {
      const Lenis = LenisModule.default;
      
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical" as const,
        gestureOrientation: "vertical" as const,
        smoothWheel: true,
        wheelMultiplier: 1,
        infinite: false,
      });

      function raf(time: number) {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
        }
        frameRef.current = requestAnimationFrame(raf);
      }

      frameRef.current = requestAnimationFrame(raf);
    });
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [useNativeScroll]);

  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      {mounted && !reduceMotion && <VantaRings />}
      {children}
    </>
  );
}
