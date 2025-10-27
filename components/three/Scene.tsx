"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "./Stars";

export function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Stars />
      </Canvas>
    </div>
  );
}

