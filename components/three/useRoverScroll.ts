"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export interface RoverMotionState {
  progress: number;
  mouseX: number;
  mouseY: number;
}

export const roverMotionRef: { current: RoverMotionState } = {
  current: {
    progress: 0,
    mouseX: 0,
    mouseY: 0,
  },
};

export function useRoverScroll() {
  useEffect(() => {
    // Mouse Parallax tracking - writes directly to ref to prevent React re-renders
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      roverMotionRef.current.mouseX = x;
      roverMotionRef.current.mouseY = y;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Master Scroll Progress Tracker across full page - zero React re-renders
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        roverMotionRef.current.progress = self.progress;
      },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trigger.kill();
    };
  }, []);

  return roverMotionRef;
}
