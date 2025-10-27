"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function RingsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create rings
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.TorusGeometry(1 + i * 0.15, 0.02, 8, 100);
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x9333ea : 0x3b82f6,
        transparent: true,
        opacity: 0.3 + (i * 0.03),
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.random() * Math.PI * 2;
      ring.rotation.y = Math.random() * Math.PI * 2;
      ring.rotation.z = Math.random() * Math.PI * 2;
      scene.add(ring);
      rings.push(ring);
    }

    // Animation
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      rings.forEach((ring, i) => {
        ring.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
        ring.rotation.y += 0.002 * (i % 3 === 0 ? 1 : -1);
        ring.rotation.z += 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}

