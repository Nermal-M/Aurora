"use client";

import React, { useEffect, useRef, useState } from "react";
import Pill from "@/components/ui/Pill";
import { roverSpecs } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Crosshair, ShieldCheck, Cpu } from "lucide-react";

export default function RoverSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin Rover Specs Section and cycle through the 5 HUD callouts
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(
            roverSpecs.length - 1,
            Math.floor(self.progress * roverSpecs.length)
          );
          setActiveSpecIndex((prev) => (prev === idx ? prev : idx));
        },
      });

      // Theme toggle for body
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "rover"),
        onEnterBack: () => document.body.setAttribute("data-theme", "rover"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeSpec = roverSpecs[activeSpecIndex];

  return (
    <section
      id="specs"
      ref={containerRef}
      className="relative min-h-screen py-20 px-6 md:px-16 bg-black/90 border-t border-space-700/60 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Giant Section Number */}
      <div
        className="absolute top-12 right-12 font-mono text-[clamp(6rem,18vw,18rem)] font-extrabold text-space-700/20 select-none pointer-events-none -z-10"
        aria-hidden="true"
      >
        // 02
      </div>

      {/* Top Header & HUD Telemetry */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Pill label="MISSION: ROVER TARUSH // SPECS" variant="teal" />
          <h2 className="font-space font-extrabold text-3xl md:text-6xl uppercase tracking-tight text-bone mt-2">
            TARUSH <span className="text-stroke-bone">SPECIFICATION</span>{" "}
            <span className="text-aurora-teal">MATRIX</span>
          </h2>
        </div>

        {/* Side Rail Progress Counter */}
        <div className="flex items-center gap-3 bg-space-800/80 px-4 py-2 border border-aurora-teal/40 font-mono text-sm">
          <span className="text-aurora-teal font-bold">{activeSpec.index}</span>
          <span className="text-dust">/</span>
          <span className="text-dust">05</span>
          <span className="w-2 h-2 rounded-full bg-aurora-teal animate-ping ml-2" />
        </div>
      </div>

      {/* Center 3D Clearance & Overlay Frame */}
      <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[50vh]">
        {/* Left Side: Active Telemetry Spec Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 bg-space-900/90 border-2 border-aurora-teal hard-shadow-teal backdrop-blur-xl">
            <div className="flex items-center justify-between font-mono text-xs text-aurora-teal tracking-widest uppercase mb-3">
              <span className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" />
                SYSTEM // {activeSpec.tag}
              </span>
              <span>INDEX: {activeSpec.index}</span>
            </div>

            <h3 className="font-space font-bold text-2xl md:text-3xl uppercase tracking-tight text-bone">
              {activeSpec.title}
            </h3>

            <p className="font-mono text-xs uppercase tracking-wider text-solar mt-1">
              {activeSpec.subtitle}
            </p>

            <p className="font-mono text-xs md:text-sm text-dust/90 leading-relaxed mt-4">
              {activeSpec.description}
            </p>

            {/* Spec Sub-Telemetry Indicators */}
            <div className="mt-6 pt-4 border-t border-space-700 flex items-center justify-between font-mono text-[11px] text-dust">
              <span className="flex items-center gap-1 text-aurora-teal">
                <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED ANALOG TESTED
              </span>
              <span>BUS: 24V DC</span>
            </div>
          </div>
        </div>

        {/* Center: Open Space for Centered 3D Rover Canvas */}
        <div className="hidden lg:block lg:col-span-4" />

        {/* Right Side: Step Selector List */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {roverSpecs.map((spec, idx) => {
            const isCurrent = activeSpecIndex === idx;
            return (
              <div
                key={spec.id}
                className={`p-3 border font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between ${
                  isCurrent
                    ? "bg-aurora-teal/15 border-aurora-teal text-bone font-semibold translate-x-2"
                    : "bg-space-900/50 border-space-700/60 text-dust hover:text-bone hover:border-space-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={isCurrent ? "text-aurora-teal" : "text-dust"}>{spec.index}</span>
                  <span className="truncate max-w-[160px]">{spec.title}</span>
                </div>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-aurora-teal" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG Connecting Overlay HUD Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[5] opacity-40 hidden md:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="30%"
          y1="50%"
          x2="50%"
          y2="50%"
          stroke="var(--aurora-teal)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx="50%" cy="50%" r="5" fill="none" stroke="var(--aurora-teal)" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="2" fill="var(--solar)" />
      </svg>

      {/* Bottom Status Feed */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-space-700/60 font-mono text-xs text-dust">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-aurora-teal animate-pulse" />
          <span>ROVER PLATFORM: TARUSH MK-IV // ALL NODES NOMINAL</span>
        </div>
        <div>ORIENTATION: 3-AXIS ORBITAL SCRUB</div>
      </div>
    </section>
  );
}
