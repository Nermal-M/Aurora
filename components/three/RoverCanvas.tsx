"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import RoverModel from "./RoverModel";
import { useRoverScroll } from "./useRoverScroll";
import Image from "next/image";

export default function RoverCanvas() {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  useRoverScroll();

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Show static poster fallback if reduced-motion is requested
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 select-none">
        <div className="relative w-[500px] h-[500px] max-w-full">
          <Image
            src="/images/rover-poster.png"
            alt="Tarush Mars Rover"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0.4, 3.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <Lights />
        <RoverModel />
      </Canvas>
    </div>
  );
}
