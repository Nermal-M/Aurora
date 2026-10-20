"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false, // We drive via GSAP ticker per spec
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    // Ensure ScrollTrigger calculates accurate pin offsets after layout stabilization
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    let resolvedTarget: string | number | HTMLElement = target;

    if (typeof target === "number") {
      resolvedTarget = target;
    } else if (typeof target === "string" && target.startsWith("#")) {
      const cleanId = target.slice(1);
      if (cleanId === "hero" || cleanId === "") {
        resolvedTarget = 0;
      } else {
        const el = document.getElementById(cleanId);
        if (el) {
          // 1. Check for dedicated pin trigger by ID
          const pinSt = ScrollTrigger.getById(`${cleanId}-pin`);
          if (pinSt && typeof pinSt.start === "number") {
            resolvedTarget = pinSt.start + (options?.offset ?? 0);
          } else {
            // 2. Check for any trigger that pins this element
            const allTriggers = ScrollTrigger.getAll();
            const pinningTrigger = allTriggers.find(
              (s) => (s.trigger === el || s.pin === el) && s.pin
            );
            if (pinningTrigger && typeof pinningTrigger.start === "number") {
              resolvedTarget = pinningTrigger.start + (options?.offset ?? 0);
            } else {
              // 3. For unpinned elements or elements inside pin-spacers
              const spacer = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
              const currentScroll = lenisRef.current?.scroll ?? window.scrollY;
              resolvedTarget = spacer.getBoundingClientRect().top + currentScroll + (options?.offset ?? 0);
            }
          }
        }
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(resolvedTarget, {
        offset: typeof resolvedTarget === "number" ? 0 : (options?.offset ?? 0),
        duration: options?.duration ?? 1.2,
      });
    } else if (typeof resolvedTarget === "number") {
      window.scrollTo({ top: resolvedTarget, behavior: "smooth" });
    } else if (typeof target === "string" && target.startsWith("#")) {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
