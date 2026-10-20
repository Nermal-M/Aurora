"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Pill from "@/components/ui/Pill";
import { updatesData } from "@/data/updates";
import { Calendar, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Updates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeUpdateIndex, setActiveUpdateIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin updates section and fade through updates
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${updatesData.length * 100}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(
            updatesData.length - 1,
            Math.floor(self.progress * updatesData.length)
          );
          setActiveUpdateIndex((prev) => (prev === idx ? prev : idx));
        },
      });

      // Theme toggle for body
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "updates"),
        onEnterBack: () => document.body.setAttribute("data-theme", "updates"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentUpdate = updatesData[activeUpdateIndex];

  return (
    <section
      id="updates"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-16 bg-space-900 border-t border-space-700/60 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Giant Section Number */}
      <div
        className="absolute top-12 right-12 font-mono text-[clamp(6rem,18vw,18rem)] font-extrabold text-space-700/20 select-none pointer-events-none -z-10"
        aria-hidden="true"
      >
        // 05
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between min-h-[85vh]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Pill label="MISSION: DISPATCHES // UPDATES" variant="violet" />
            <h2 className="font-space font-extrabold text-4xl md:text-7xl uppercase tracking-tight text-bone">
              OUTREACH & <span className="text-stroke-bone">WORKSHOPS</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-dust">
            <span>DISPATCH</span>
            <span className="text-aurora-violet font-bold">0{activeUpdateIndex + 1}</span>
            <span>/</span>
            <span>0{updatesData.length}</span>
          </div>
        </div>

        {/* Narrative Presentation: Story Left, Wireframe Photo Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8">
          {/* Left: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-aurora-violet uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>{currentUpdate.category}</span>
            </div>

            <h3 className="font-space font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-bone">
              {currentUpdate.title}
            </h3>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-dust">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-solar" />
                {currentUpdate.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-mars" />
                {currentUpdate.location}
              </span>
            </div>

            <p className="font-mono text-sm md:text-base text-dust/90 leading-relaxed max-w-xl">
              {currentUpdate.description}
            </p>

            <div className="pt-4">
              <button
                type="button"
                className="px-6 py-3 border-2 border-bone hard-shadow font-mono text-xs font-bold uppercase tracking-widest text-space-900 transition-colors"
                style={{ backgroundColor: currentUpdate.tagColor }}
              >
                Inspect Workshop Archive
              </button>
            </div>
          </div>

          {/* Right: Wireframe Photo Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] p-3 bg-space-800 border-2 border-bone hard-shadow select-none">
              <div className="relative w-full h-full bg-space-900 overflow-hidden">
                <Image
                  src={currentUpdate.imageUrl}
                  alt={currentUpdate.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-dust uppercase tracking-wider">
                <span>PSG iTech ROBOTICS</span>
                <span className="text-solar">DISPATCH {currentUpdate.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Timeline Indicators */}
        <div className="flex items-center justify-between pt-6 border-t border-space-700/60 font-mono text-xs text-dust">
          <div className="flex items-center gap-3">
            {updatesData.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 transition-all duration-300 ${
                  activeUpdateIndex === idx ? "w-8 bg-aurora-violet" : "w-2 bg-space-700"
                }`}
              />
            ))}
          </div>
          <div>SCROLL TO ADVANCE DISPATCH ARCHIVE</div>
        </div>
      </div>
    </section>
  );
}
