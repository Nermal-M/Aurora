"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { challengesData } from "@/data/challenges";
import Pill from "@/components/ui/Pill";
import { Trophy, Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

export default function Challenges() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal Scroll Animation on Desktop
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          if (!trackRef.current || !containerRef.current) return;

          const trackWidth = trackRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const distanceToScroll = Math.max(0, trackWidth - windowWidth + 200);
          const pinDuration = Math.min(2600, Math.max(1600, distanceToScroll));

          gsap.to(trackRef.current, {
            x: -distanceToScroll,
            ease: "none",
            scrollTrigger: {
              id: "challenges-pin",
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${pinDuration}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const total = challengesData.length;
                const idx = Math.min(total - 1, Math.round(self.progress * (total - 1)));
                setActiveCardIndex((prev) => (prev === idx ? prev : idx));
              },
            },
          });
        },
      });

      // 2. Signature Theme Switch to Mars Rust (#E2552B) on Enter
      ScrollTrigger.create({
        id: "challenges-theme",
        trigger: containerRef.current,
        start: "top center",
        end: () => `+=3200`,
        onEnter: () => document.body.setAttribute("data-theme", "challenges"),
        onEnterBack: () => document.body.setAttribute("data-theme", "challenges"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSlide = (direction: "prev" | "next") => {
    const nextIdx =
      direction === "next"
        ? Math.min(challengesData.length - 1, activeCardIndex + 1)
        : Math.max(0, activeCardIndex - 1);

    setActiveCardIndex(nextIdx);

    const pinSt = ScrollTrigger.getById("challenges-pin");
    if (pinSt) {
      const stepDistance = (pinSt.end - pinSt.start) / (challengesData.length - 1);
      const targetY = pinSt.start + nextIdx * stepDistance;
      scrollTo(targetY, { duration: 0.6 });
    } else if (trackRef.current) {
      trackRef.current.scrollBy({
        left: direction === "next" ? 380 : -380,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="challenges"
      ref={containerRef}
      className="relative min-h-screen bg-mars text-space-900 overflow-hidden select-none border-y-4 border-space-900"
    >
      {/* Background Technical Black Grid */}
      <div className="absolute inset-0 bg-black-grid pointer-events-none opacity-25 -z-10" />

      {/* Pinned Viewport Container */}
      <div className="relative h-screen max-h-screen flex flex-col justify-between pt-16 md:pt-20 pb-3 md:pb-4 px-4 sm:px-8 md:px-12 z-20">
        {/* Top Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-none border-2 border-space-900 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest bg-space-900 text-bone shadow-[2px_2px_0px_#07080D]">
              <Trophy className="w-3 h-3 text-solar" />
              <span>MISSION: COMPETITIONS // GLOBAL TRACK RECORD</span>
            </div>
            <h2 className="font-space font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tighter text-space-900 mt-1 leading-none">
              GLOBAL <span className="text-stroke-black">CHALLENGES</span>
            </h2>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-2">
            <div className="font-mono text-xs text-space-900 font-bold uppercase tracking-widest flex items-center gap-2 bg-bone px-3 py-1.5 border-2 border-space-900 shadow-[2px_2px_0px_#07080D]">
              <span>
                MISSION {String(activeCardIndex + 1).padStart(2, "0")} / {challengesData.length}
              </span>
              <span>//</span>
              <span className="text-mars-deep">2020 - 2025</span>
            </div>

            {/* Prev / Next Carousel Buttons */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                id="challenge-prev-btn"
                type="button"
                onClick={() => handleSlide("prev")}
                disabled={activeCardIndex === 0}
                aria-label="Previous Challenge"
                className="p-1.5 bg-space-900 text-bone hover:bg-bone hover:text-space-900 border-2 border-space-900 shadow-[2px_2px_0px_#07080D] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="challenge-next-btn"
                type="button"
                onClick={() => handleSlide("next")}
                disabled={activeCardIndex >= challengesData.length - 1}
                aria-label="Next Challenge"
                className="p-1.5 bg-space-900 text-bone hover:bg-bone hover:text-space-900 border-2 border-space-900 shadow-[2px_2px_0px_#07080D] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Card Track (Desktop) / Scroll Track (Mobile) */}
        <div className="my-auto py-2 overflow-visible">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-5 lg:gap-6 w-full lg:w-max items-stretch lg:items-center will-change-transform"
          >
            {challengesData.map((challenge, idx) => (
              <div
                key={challenge.id}
                className={`w-full lg:w-[380px] bg-bone border-4 border-space-900 hard-shadow-black p-3.5 md:p-4 flex flex-col justify-between shrink-0 transition-all duration-200 hover:-translate-y-1 select-none ${
                  idx === activeCardIndex ? "ring-2 ring-solar" : ""
                }`}
              >
                {/* Top Cassette Bar */}
                <div className="flex items-center justify-between pb-1.5 border-b-2 border-space-900 font-mono text-[11px] font-bold uppercase tracking-widest text-space-900">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-mars-deep" />
                    CHALLENGE // {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-mars-deep">{challenge.year}</span>
                </div>

                {/* Hero Number (Rank in Solar Type) */}
                <div className="my-2 flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-dust font-bold block mb-0.5">
                      GLOBAL RANK
                    </span>
                    <span className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-solar text-stroke-black tracking-tight leading-none drop-shadow-[2px_2px_0px_#07080D]">
                      {challenge.rankDisplay}
                    </span>
                  </div>

                  {/* Challenge Logo / Mars render */}
                  <div className="relative w-12 h-12 md:w-14 md:h-14 bg-space-900 border-2 border-space-900 p-1.5 overflow-hidden shadow-[2px_2px_0px_#07080D]">
                    <Image
                      src={challenge.imageUrl}
                      alt={challenge.title}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                </div>

                {/* Challenge Details */}
                <div>
                  <h3 className="font-space font-bold text-lg md:text-xl uppercase tracking-tight text-space-900 leading-snug">
                    {challenge.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-1 font-mono text-[11px] text-space-900/80">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-mars" />
                      {challenge.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-mars" />
                      {challenge.location}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] md:text-xs text-space-900/85 mt-1.5 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {challenge.description}
                  </p>
                </div>

                {/* Bottom Cassette Stamp */}
                <div className="mt-2.5 pt-1.5 border-t-2 border-space-900 flex items-center justify-between font-mono text-[10px] font-bold text-space-900">
                  <span className="uppercase">PSG TEAM AURORA</span>
                  <span className="text-mars-deep uppercase">{challenge.rank}</span>
                </div>
              </div>
            ))}

            {/* End of Track: "BACK OUR ROVER" CTA Card */}
            <div className="w-full lg:w-[320px] bg-space-900 text-bone border-4 border-bone hard-shadow p-4 md:p-5 flex flex-col justify-between shrink-0 select-none">
              <div>
                <span className="font-mono text-[10px] text-solar tracking-widest uppercase font-bold">
                  MISSION PARTNERSHIPS
                </span>
                <h3 className="font-space font-extrabold text-xl md:text-2xl uppercase mt-1 leading-snug">
                  BACK OUR EXPEDITION
                </h3>
                <p className="font-mono text-[11px] md:text-xs text-dust mt-2.5 leading-relaxed">
                  Join our consortium of aerospace industry sponsors and technology providers powering Tarush on international analog proving grounds.
                </p>
              </div>

              <div className="mt-5">
                <a
                  href="#sponsors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#sponsors");
                  }}
                  className="inline-flex items-center justify-between w-full p-2.5 bg-solar text-space-900 font-mono text-xs font-bold uppercase tracking-widest border-2 border-bone hard-shadow hover:bg-bone transition-colors"
                >
                  <span>BECOME A SPONSOR</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 pt-2 border-t-2 border-space-900 z-20 font-mono text-[10px] md:text-[11px] font-bold text-space-900 shrink-0">
          <div>GLOBAL MISSION TIMELINE // 12 EXPEDITIONS</div>
          <div>IRC • ERC • IRDC • ISRO • CAT</div>
        </div>
      </div>
    </section>
  );
}
