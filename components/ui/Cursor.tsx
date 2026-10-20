"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable for fine pointers (mouse) and devices supporting hover
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    cursor.style.display = "block";
    follower.style.display = "block";

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });

    const fXTo = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3.out" });
    const fYTo = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      fXTo(e.clientX);
      fYTo(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(follower, {
        scale: 2.2,
        backgroundColor: "rgba(226, 85, 43, 0.25)",
        borderColor: "var(--mars)",
        duration: 0.2,
      });
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: "var(--solar)",
        duration: 0.2,
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "var(--aurora-teal)",
        duration: 0.2,
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "var(--bone)",
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, .interactive-hover");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    // Observer for dynamically added interactive elements
    const observer = new MutationObserver(() => {
      const dynamicElements = document.querySelectorAll("a, button, [role='button'], input, .interactive-hover");
      dynamicElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-bone pointer-events-none z-[9999] hidden"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-aurora-teal/60 pointer-events-none z-[9998] hidden transition-colors duration-150"
      />
    </>
  );
}
