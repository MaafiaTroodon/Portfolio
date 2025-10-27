"use client";

import { useEffect, useRef, useState } from "react";
import { VantaRings } from "@/components/three/VantaRings";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const lenisRef = useRef<{ raf: (time: number) => void; destroy: () => void } | null>(null);

  useEffect(() => {
    setMounted(true);
    
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
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {typeof window !== "undefined" && <VantaRings />}
      {children}
    </>
  );
}

