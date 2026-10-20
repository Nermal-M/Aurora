"use client";

import React, { useEffect, useRef } from "react";
import Pill from "@/components/ui/Pill";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftWordRef = useRef<HTMLSpanElement>(null);
  const rightWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Interactive Starfield Canvas (Hero only per spec)
    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    const renderStars = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(243, 237, 228, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });
      animationFrameId = requestAnimationFrame(renderStars);
    };

    renderStars();

    // 2. GSAP Animations: Staggered Hero Character Reveal
    const ctxGsap = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll(".hero-char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.2,
          }
        );
      }

      // 3. Scroll Split: "AU" moves left, "RORA" moves right as you scroll down
      if (leftWordRef.current && rightWordRef.current && containerRef.current) {
        gsap.to(leftWordRef.current, {
          xPercent: -45,
          opacity: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        gsap.to(rightWordRef.current, {
          xPercent: 45,
          opacity: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // Theme toggle for body
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "hero"),
        onEnterBack: () => document.body.setAttribute("data-theme", "hero"),
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      ctxGsap.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 bg-dotted-grid overflow-hidden select-none"
    >
      {/* Canvas Starfield */}
      <canvas
        ref={starsCanvasRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-70"
      />

      {/* Top Mission Identifier */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Pill label="MISSION 06 // DESCENT TO MARS" variant="mars" />
          <span className="hidden md:inline-block font-mono text-xs text-dust tracking-widest uppercase">
            TARUSH AUTONOMOUS ROVER
          </span>
        </div>
        <div className="font-mono text-xs text-dust/80 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-aurora-teal animate-ping" />
          <span>PSG iTech // ROBOTICS COLLECTIVE</span>
        </div>
      </div>

      {/* Main Center Headline: Giant Staggered Wordmark with Scroll Split */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-12">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-solar mb-3">
          [ PSG iTech / Mars Rover Team ]
        </p>

        <h1
          className="font-space font-extrabold text-[clamp(4.2rem,17vw,16rem)] leading-[0.88] tracking-tighter text-bone flex items-center justify-center select-none"
          aria-label="AURORA"
        >
          {/* Left word half: AU */}
          <span ref={leftWordRef} className="inline-flex will-change-transform">
            <span className="overflow-hidden inline-block">
              <span className="hero-char inline-block">A</span>
            </span>
            <span className="overflow-hidden inline-block">
              <span className="hero-char inline-block text-stroke-bone">U</span>
            </span>
          </span>

          {/* Right word half: RORA */}
          <span ref={rightWordRef} className="inline-flex will-change-transform">
            <span className="overflow-hidden inline-block">
              <span className="hero-char inline-block">R</span>
            </span>
            <span className="overflow-hidden inline-block">
              <span className="hero-char inline-block text-stroke-bone">O</span>
            </span>
            <span className="overflow-hidden inline-block">
              <span className="hero-char inline-block">R</span>
            </span>
            <span className="overflow-hidden inline-block text-mars">
              <span className="hero-char inline-block">A</span>
            </span>
          </span>
        </h1>

        <p className="font-mono text-sm md:text-base text-dust max-w-xl mt-6 tracking-wide leading-relaxed">
          Pioneering the next generation of autonomous extraterrestrial robotics for the International Rover Challenge and analog Mars expeditions.
        </p>
      </div>
    </section>
  );
}
