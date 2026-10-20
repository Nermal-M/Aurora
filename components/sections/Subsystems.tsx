"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Pill from "@/components/ui/Pill";
import { subsystemsData, Subsystem } from "@/data/subsystems";
import {
  Wrench,
  Zap,
  Microscope,
  Cpu,
  Radio,
  Globe,
  X,
  Users,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Subsystems() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedWrapperRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const depthRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem | null>(null);

  const totalCards = subsystemsData.length;
  const LAYER_DEPTH = 750; // px spacing in Z between 3D layers

  const getSubsystemIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Wrench":
        return <Wrench className={className} />;
      case "Zap":
        return <Zap className={className} />;
      case "Microscope":
        return <Microscope className={className} />;
      case "Cpu":
        return <Cpu className={className} />;
      case "Radio":
        return <Radio className={className} />;
      case "Globe":
        return <Globe className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  // Jump directly to any deck via smooth scroll
  const jumpToDeck = (targetIdx: number) => {
    if (!sectionRef.current) return;
    const st = ScrollTrigger.getById("subsystems-depth-dive");
    if (!st) return;
    const targetScroll = st.start + (targetIdx / (totalCards - 1)) * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (
      !sectionRef.current ||
      !pinnedWrapperRef.current ||
      !tunnelRef.current ||
      cards.length === 0
    )
      return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // DESKTOP: Full 3D Depth-Dive Tunnel Scroll
        "(min-width: 1024px)": () => {
          // Position all cards at their initial Z depths
          cards.forEach((card, i) => {
            gsap.set(card, {
              x: 0,
              y: 0,
              z: -i * LAYER_DEPTH,
              scale: i === 0 ? 1 : Math.max(0.68, 1 - i * 0.08),
              opacity: i === 0 ? 1 : Math.max(0.18, 0.9 - i * 0.16),
              filter: i === 0 ? "blur(0px)" : `blur(${Math.min(i * 1.5, 4.5)}px)`,
              zIndex: totalCards - i,
              pointerEvents: i === 0 ? "auto" : "none",
            });
          });

          // Master ScrollTrigger timeline: scrolling plunges viewer forward through 3D layers
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "subsystems-depth-dive",
              trigger: sectionRef.current,
              pin: pinnedWrapperRef.current,
              start: "top top",
              end: `+=${(totalCards - 1) * 130}%`,
              pinSpacing: true,
              scrub: 0.6,
              anticipatePin: 1,
              onUpdate: (self) => {
                const floatProgress = self.progress * (totalCards - 1);
                const rounded = Math.min(
                  totalCards - 1,
                  Math.max(0, Math.round(floatProgress))
                );
                setActiveIndex((prev) => (prev === rounded ? prev : rounded));
                if (depthRef.current) {
                  const zMm = Math.round(floatProgress * LAYER_DEPTH);
                  depthRef.current.textContent = `Depth Field Active • Z: -${zMm.toLocaleString()}mm`;
                }
              },
            },
          });

          // Build sequential dive steps (0 -> 1 -> 2 -> 3 -> 4 -> 5)
          for (let step = 0; step < totalCards - 1; step++) {
            cards.forEach((card, i) => {
              if (i <= step) {
                // Card has already been passed: fly forward past camera & dissolve
                tl.to(
                  card,
                  {
                    z: 500,
                    scale: 2.2,
                    opacity: 0,
                    filter: "blur(14px)",
                    duration: 1,
                    ease: "power2.inOut",
                    onStart: () => {
                      card.style.pointerEvents = "none";
                    },
                  },
                  step
                );
              } else if (i === step + 1) {
                // This card emerges into the front focal position (z=0)
                tl.to(
                  card,
                  {
                    z: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power2.inOut",
                    onStart: () => {
                      card.style.pointerEvents = "auto";
                      card.style.zIndex = "40";
                    },
                  },
                  step
                );
              } else {
                // Background cards: advance one plane forward
                const distAhead = i - step - 1;
                tl.to(
                  card,
                  {
                    z: -distAhead * LAYER_DEPTH,
                    scale: Math.max(0.68, 1 - distAhead * 0.08),
                    opacity: Math.max(0.18, 0.9 - distAhead * 0.16),
                    filter: `blur(${Math.min(distAhead * 1.5, 4.5)}px)`,
                    duration: 1,
                    ease: "power2.inOut",
                  },
                  step
                );
              }
            });
          }
        },

        // MOBILE / TABLET: Responsive vertical flow without pinning
        "(max-width: 1023px)": () => {
          cards.forEach((card) => {
            gsap.set(card, {
              x: 0,
              y: 0,
              z: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              position: "relative",
            });
          });
        },
      });

      // Section theme toggle
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "subsystems"),
        onEnterBack: () => document.body.setAttribute("data-theme", "subsystems"),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [totalCards]);

  const activeSubsystem = subsystemsData[activeIndex] || subsystemsData[0];

  return (
    <section
      id="subsystems"
      ref={sectionRef}
      className="relative w-full bg-space-900 border-t border-space-700/60 select-none overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedWrapperRef}
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden"
      >
        {/* ————— TOP HUD: Header & Depth Gauge ————— */}
        <header className="relative z-30 px-6 md:px-12 pt-20 pb-2 shrink-0">
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-space-700/60 pb-3">
            <div className="flex flex-col gap-1">
              <Pill label="MISSION: SUBSYSTEMS // ARCHITECTURAL DEPTH" variant="solar" />
              <h2 className="font-space font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-bone leading-none mt-0.5">
                DEPTH <span className="text-stroke-bone">LAYER</span>{" "}
                <span className="text-solar">DESCENT</span>
              </h2>
              <p className="font-mono text-[11px] sm:text-xs text-dust max-w-xl">
                Scroll to dive through 6 subsystem layers. Each deck floats in a deeper plane — descend to inspect.
              </p>
            </div>

            {/* Depth Gauge HUD + Quick Deck Buttons */}
            <div className="flex items-center gap-4 font-mono text-xs shrink-0">
              {/* Quick Teleport Dots */}
              <div className="hidden sm:flex items-center gap-1.5 bg-space-800/80 border border-space-700 px-2 py-1.5">
                <span className="text-dust text-[10px] uppercase mr-1">DECKS:</span>
                {subsystemsData.map((deck, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={deck.id}
                      type="button"
                      onClick={() => jumpToDeck(idx)}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase transition-all duration-300 cursor-pointer border ${
                        isActive
                          ? "text-space-900 border-bone shadow-[0_0_12px_rgba(255,201,60,0.4)]"
                          : "text-dust border-transparent hover:text-bone hover:border-space-700 bg-space-900/60"
                      }`}
                      style={{
                        backgroundColor: isActive ? deck.accentHex : undefined,
                      }}
                      title={`Jump to ${deck.name}`}
                    >
                      0{idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Surface to Deep Vertical Gauge */}
              <div className="flex items-center gap-3 bg-space-800/80 border border-space-700 px-3 py-2">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-dust text-[8px]">SURF</span>
                  <div className="w-1.5 h-12 bg-space-700 relative overflow-hidden rounded-full">
                    <div
                      className="absolute top-0 left-0 w-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        height: `${((activeIndex + 1) / totalCards) * 100}%`,
                        backgroundColor: activeSubsystem.accentHex,
                      }}
                    />
                  </div>
                  <span className="text-dust text-[8px]">DEEP</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-dust text-[9px] uppercase tracking-wider">ACTIVE LAYER</span>
                  <span
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{ color: activeSubsystem.accentHex }}
                  >
                    DECK 0{activeIndex + 1} // {activeSubsystem.shortName}
                  </span>
                  <span className="text-dust text-[9px] mt-0.5">
                    {activeSubsystem.members.length} CREW • {activeSubsystem.statusBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ————— 3D PERSPECTIVE TUNNEL VIEWPORT ————— */}
        <div
          ref={tunnelRef}
          className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 md:px-12 py-2"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 48%" }}
        >
          {/* Decorative Converging Perspective Rails */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Top-left guide ray */}
            <div
              className="absolute top-0 left-0 w-px bg-gradient-to-b from-space-700/50 via-space-700/20 to-transparent"
              style={{ height: "100%", transform: "rotate(16deg)", transformOrigin: "top left" }}
            />
            {/* Top-right guide ray */}
            <div
              className="absolute top-0 right-0 w-px bg-gradient-to-b from-space-700/50 via-space-700/20 to-transparent"
              style={{ height: "100%", transform: "rotate(-16deg)", transformOrigin: "top right" }}
            />
            {/* Bottom-left */}
            <div
              className="absolute bottom-0 left-0 w-px bg-gradient-to-t from-space-700/40 to-transparent"
              style={{ height: "65%", transform: "rotate(-16deg)", transformOrigin: "bottom left" }}
            />
            {/* Bottom-right */}
            <div
              className="absolute bottom-0 right-0 w-px bg-gradient-to-t from-space-700/40 to-transparent"
              style={{ height: "65%", transform: "rotate(16deg)", transformOrigin: "bottom right" }}
            />

            {/* Vanishing Point Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
              <div className="absolute top-1/2 left-0 w-full h-px bg-space-700/40" />
              <div className="absolute top-0 left-1/2 w-px h-full bg-space-700/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-solar/40 animate-ping" />
            </div>
          </div>

          {/* ————— 3D DEPTH STACKED CARDS CONTAINER ————— */}
          <div
            className="relative w-full max-w-3xl min-h-[460px] sm:min-h-[490px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {subsystemsData.map((deck, idx) => {
              const isCurrent = idx === activeIndex;

              return (
                <div
                  key={deck.id}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  onClick={() => {
                    if (!isCurrent) {
                      jumpToDeck(idx);
                    }
                  }}
                  className={`depth-card absolute inset-0 transition-shadow duration-300 ${
                    !isCurrent ? "cursor-pointer hover:brightness-125" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, filter",
                  }}
                  title={!isCurrent ? `Click to descend to ${deck.name}` : undefined}
                >
                  {/* Outer Cyber Panel Frame */}
                  <div
                    className={`relative w-full h-full bg-space-900 border-2 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                      isCurrent
                        ? "border-bone hard-shadow"
                        : "border-space-700/80 shadow-xl"
                    }`}
                    style={{
                      boxShadow: isCurrent
                        ? `4px 4px 0px ${deck.accentHex}, 0 0 45px ${deck.accentHex}20`
                        : `2px 2px 0px ${deck.accentHex}40`,
                    }}
                  >
                    {/* Top Accent Strip */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: deck.accentHex }}
                    />

                    {/* Corner Reticles */}
                    <div
                      className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
                      style={{ borderColor: deck.accentHex }}
                    />
                    <div
                      className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
                      style={{ borderColor: deck.accentHex }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
                      style={{ borderColor: deck.accentHex }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
                      style={{ borderColor: deck.accentHex }}
                    />

                    {/* Card Content Top Section */}
                    <div>
                      {/* Telemetry Header Line */}
                      <div className="flex items-center justify-between font-mono text-xs tracking-widest uppercase mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 border font-bold text-[10px]"
                            style={{
                              borderColor: deck.accentHex,
                              color: deck.accentHex,
                              backgroundColor: `${deck.accentHex}18`,
                            }}
                          >
                            {deck.deckNumber}
                          </span>
                          <span className="text-dust font-bold text-[11px]">
                            LAYER 0{idx + 1}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-dust font-bold text-[11px]">{deck.deckIndex}</span>
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: deck.accentHex }}
                          />
                        </div>
                      </div>

                      {/* Icon + Title + Tagline */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div
                          className="p-2.5 border-2 bg-space-900 shrink-0"
                          style={{ color: deck.accentHex, borderColor: deck.accentHex }}
                        >
                          {getSubsystemIcon(deck.iconName, "w-6 h-6")}
                        </div>
                        <div>
                          <h3 className="font-space font-extrabold text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-bone leading-tight">
                            {deck.name}
                          </h3>
                          <p
                            className="font-mono text-[11px] sm:text-xs uppercase tracking-wider mt-0.5 font-semibold"
                            style={{ color: deck.accentHex }}
                          >
                            {deck.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-mono text-[11px] sm:text-xs text-dust/90 leading-relaxed mb-3 line-clamp-2">
                        {deck.description}
                      </p>

                      {/* Capabilities Chips */}
                      <div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-dust uppercase mb-1.5">
                          <Layers className="w-3 h-3" style={{ color: deck.accentHex }} />
                          <span>CORE ARCHITECTURAL CAPABILITIES</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {deck.capabilities.map((cap, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2 py-0.5 bg-space-900 border border-space-700 font-mono text-[10px] text-bone"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Content Bottom Section */}
                    <div className="mt-3 pt-3 border-t border-space-700/60 flex flex-col gap-3">
                      {/* Specs Telemetry Strip */}
                      <div className="grid grid-cols-3 gap-2 p-2 bg-space-900/80 border border-space-700/80">
                        {deck.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex flex-col">
                            <span className="font-mono text-[9px] text-dust uppercase">
                              {spec.label}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-bone">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Crew strip + Roster trigger */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="flex -space-x-1.5">
                            {deck.members.slice(0, 3).map((member, mIdx) => (
                              <div
                                key={mIdx}
                                className="relative w-7 h-7 border border-bone bg-space-900 overflow-hidden"
                              >
                                <Image
                                  src={member.imageUrl}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                  sizes="28px"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="font-mono text-[11px] text-dust">
                            <span className="font-bold text-bone">{deck.members.length}</span> CREW
                            MEMBERS
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubsystem(deck);
                          }}
                          className="px-3.5 py-1.5 bg-bone text-space-900 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-solar transition-colors cursor-pointer"
                        >
                          <Users className="w-3.5 h-3.5" />
                          INSPECT ROSTER
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ————— BOTTOM HUD: Perspective Depth Telemetry ————— */}
        <footer className="relative z-30 px-6 md:px-12 pb-5 shrink-0">
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-space-700/60 pt-3">
            {/* Left Telemetry HUD (matching reference video "PERSPECTIVE VIEWPORT // Depth Field Active") */}
            <div className="font-mono">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-bone tracking-widest uppercase">
                  PERSPECTIVE VIEWPORT
                </span>
                <span className="text-[10px] text-dust/60 hidden sm:inline">// 3D DEPTH DIVE</span>
              </div>
              <div
                ref={depthRef}
                className="text-[11px] text-solar font-semibold tracking-wider mt-0.5 uppercase"
              >
                Depth Field Active • Z: -0mm
              </div>
              <div className="text-[9px] text-dust tracking-widest uppercase mt-0.5">
                FOCUS: {activeSubsystem.deckNumber} // {activeSubsystem.name}
              </div>
            </div>

            {/* Right Telemetry: Depth Indicator Bar */}
            <div className="flex items-center gap-4 font-mono text-xs">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-dust uppercase tracking-wider">
                  LAYER DESCENT: 0{activeIndex + 1} / 06
                </span>
                {/* 6 Depth segments */}
                <div className="flex items-center gap-1.5">
                  {subsystemsData.map((deck, idx) => (
                    <button
                      key={deck.id}
                      type="button"
                      onClick={() => jumpToDeck(idx)}
                      className="h-2 transition-all duration-300 cursor-pointer"
                      style={{
                        width: idx === activeIndex ? "28px" : "10px",
                        backgroundColor: idx <= activeIndex ? deck.accentHex : "#1F2438",
                      }}
                      title={`Jump to ${deck.name}`}
                    />
                  ))}
                </div>
              </div>

              <div
                className="w-8 h-8 rounded-full border border-space-700 flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  color: activeSubsystem.accentHex,
                  borderColor: activeSubsystem.accentHex,
                }}
              >
                0{activeIndex + 1}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ═══════════ Full Roster & Subsystem Telemetry Modal ═══════════ */}
      {selectedSubsystem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-space-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-space-800 border-2 border-bone hard-shadow p-6 md:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-space-700">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                  <span
                    className="px-2 py-0.5 border font-bold"
                    style={{
                      borderColor: selectedSubsystem.accentHex,
                      color: selectedSubsystem.accentHex,
                      backgroundColor: `${selectedSubsystem.accentHex}15`,
                    }}
                  >
                    {selectedSubsystem.deckNumber}
                  </span>
                  <span className="text-dust font-bold">{selectedSubsystem.deckIndex}</span>
                  <span className="text-dust">// {selectedSubsystem.statusBadge}</span>
                </div>
                <h3 className="font-space font-extrabold text-2xl sm:text-4xl uppercase text-bone">
                  {selectedSubsystem.name}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-solar mt-1 font-semibold">
                  {selectedSubsystem.tagline}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubsystem(null)}
                className="p-2 border border-bone/40 hover:border-mars hover:text-mars text-bone transition-colors cursor-pointer"
                aria-label="Close roster modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Crew Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
              {selectedSubsystem.members.map((member, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 bg-space-900 border border-space-700 flex flex-col gap-3 group hover:border-solar transition-colors"
                >
                  <div className="relative w-full aspect-square bg-space-800 overflow-hidden border border-bone/20">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-lg text-bone uppercase">
                      {member.name}
                    </h4>
                    {member.role && (
                      <p className="font-mono text-xs text-dust uppercase tracking-wider">
                        {member.role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-space-700 flex justify-between items-center font-mono text-xs">
              <span className="text-dust">
                TOTAL PERSONNEL: {selectedSubsystem.members.length} ACTIVE MEMBERS
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubsystem(null)}
                className="px-6 py-2 bg-bone text-space-900 font-mono text-xs uppercase tracking-wider font-bold hover:bg-solar transition-colors cursor-pointer"
              >
                Close Deck
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
