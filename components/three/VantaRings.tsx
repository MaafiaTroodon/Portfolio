"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };
type RingsFactory = (options: Record<string, unknown>) => VantaEffect;

export function VantaRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      import("three"),
      import("vanta/dist/vanta.rings.min.js"),
    ])
      .then(([THREE, ringsModule]) => {
        if (cancelled || !containerRef.current) return;
        const createRings = ringsModule.default as unknown as RingsFactory;
        vantaEffect.current = createRings({
          el: containerRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scaleMobile: 1,
          color: 0x1e40af,
          backgroundColor: 0x0a0f1c,
          color2: 0x3b82f6,
          minDistance: 140,
          rotationX: 0.3,
          scale: 0.7,
        });
      })
      .catch((error) => console.error("Vanta error:", error));

    return () => {
      cancelled = true;
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />;
}
