"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useRef, useState, Suspense } from "react";
import type Lenis from "lenis";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/three/Scene").then((mod) => ({ default: mod.ThreeScene })), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Dynamic import for Lenis to avoid SSR issues
    import("lenis").then((LenisModule) => {
      const Lenis = LenisModule.default;
      
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="portfolio-theme"
    >
      {mounted && typeof window !== "undefined" && (
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      )}
      {children}
    </ThemeProvider>
  );
}

