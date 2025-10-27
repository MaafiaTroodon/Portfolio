"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { Lenis as ReactLenis } from "@studio-freight/lenis";
import { ThreeScene } from "@/three/Scene";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
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
      <ReactLenis
        root
        options={{
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        }}
      >
        <ThreeScene />
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}

