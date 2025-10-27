"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { VANTA: any; THREE: any; }
}

export function VantaRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  // Load scripts
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load THREE.js
    if (!window.THREE) {
      const threeScript = document.createElement("script");
      threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      threeScript.async = true;
      threeScript.onload = () => {
        // Load Vanta after THREE is ready
        const vantaScript = document.createElement("script");
        vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js";
        vantaScript.async = true;
        vantaScript.onload = () => {
          setIsReady(true);
        };
        document.head.appendChild(vantaScript);
      };
      document.head.appendChild(threeScript);
    } else {
      setIsReady(true);
    }
  }, []);

  // Initialize Vanta when ready
  useEffect(() => {
    if (!isReady || !containerRef.current || !window.VANTA || !window.THREE) return;

    const initVanta = () => {
      try {
        vantaEffect.current = window.VANTA.RINGS({
          el: containerRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scaleMobile: 1.00,
          color: 0x1e40af, // Deep royal blue
          backgroundColor: 0x0a0f1c, // Very dark navy
          color2: 0x3b82f6, // Softer blue
          minDistance: 140.00,
          rotationX: 0.30,
          scale: 0.7, // Make it smaller and more subtle
        });
      } catch (error) {
        console.error("Vanta error:", error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current && typeof vantaEffect.current.destroy === "function") {
        vantaEffect.current.destroy();
      }
    };
  }, [isReady]);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}
