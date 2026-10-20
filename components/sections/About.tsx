"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Pill from "@/components/ui/Pill";
import { aboutStats } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbed Word-by-Word Reveal
      if (textRef.current) {
        const words = textRef.current.querySelectorAll(".about-word");

        gsap.fromTo(
          words,
          { opacity: 0.15, color: "var(--dust)" },
          {
            opacity: 1,
            color: "var(--bone)",
            stagger: 0.05,
            scrollTrigger: {
              id: "about-pin",
              trigger: containerRef.current,
              start: "top top",
              end: "+=180%",
              scrub: 0.6,
              pin: true,
            },
          }
        );
      }

      // 2. Photo Tilt to Flat Rotation & Scale Animation
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { rotate: -8, scale: 0.9, y: 40 },
          {
            rotate: 0,
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=160%",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Count-up Stats Trigger
      const counters = statsRef.current?.querySelectorAll(".stat-counter");
      if (counters) {
        counters.forEach((counter) => {
          const targetValue = parseInt(counter.getAttribute("data-target") || "0", 10);
          gsap.fromTo(
            counter,
            { textContent: "0" },
            {
              textContent: targetValue,
              duration: 2.0,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // Theme toggle for body
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "about"),
        onEnterBack: () => document.body.setAttribute("data-theme", "about"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const storyText =
    "PSG Team Aurora is an elite undergraduate aerospace robotics team from PSG Institute of Technology and Applied Research (PSG iTech), active since 2019. We engineer Tarush — an advanced autonomous Mars rover purpose-built for the International Rover Challenge and analog surface expeditions. Combining custom rocker-bogie mechanics, distributed power electronics, ROS 2 SLAM navigation, and autonomous biochemical soil assay payloads, our engineers bridge theoretical robotics with planetary analog exploration.";

  const words = storyText.split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen pt-20 pb-6 px-6 md:px-12 bg-space-900 border-t border-space-700/60 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Giant Section Number */}
      <div
        className="absolute top-12 right-12 font-mono text-[clamp(6rem,18vw,18rem)] font-extrabold text-space-700/20 select-none pointer-events-none -z-10"
        aria-hidden="true"
      >
        // 01
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full">
        {/* Section Header */}
        <div className="flex flex-col gap-2 shrink-0">
          <Pill label="MISSION: ABOUT // ORIGIN" variant="mars" />
          <h2 className="font-space font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-bone leading-none mt-1">
            DESIGNED FOR <span className="text-stroke-bone">UNEXPLORED</span>{" "}
            <span className="text-mars">TERRAINS.</span>
          </h2>
        </div>

        {/* Content Grid: Pinned Story + Tilted Team Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
          {/* Left: Scrubbed Text Reveal */}
          <div className="lg:col-span-7">
            <p
              ref={textRef}
              className="font-space font-medium text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-tight select-none"
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className="about-word inline-block mr-1.5 opacity-20 text-dust transition-colors will-change-[opacity,color]"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* Right: Neo-Brutalist Frame Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={photoRef}
              className="relative w-full max-w-sm aspect-[4/3] p-2 bg-space-800 border-2 border-bone hard-shadow select-none will-change-transform"
            >
              <div className="relative w-full h-full overflow-hidden bg-space-900">
                <Image
                  src="/images/team-photo.jpg"
                  alt="PSG Team Aurora Mars Rover Engineers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-dust tracking-wider uppercase">
                <span>TEAM AURORA // COIMBATORE</span>
                <span className="text-solar">IRC EXPEDITION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stat Counters */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-space-700/80 shrink-0"
        >
          {aboutStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="font-space font-extrabold text-3xl md:text-5xl text-bone tracking-tight flex items-baseline leading-none">
                {stat.suffix ? (
                  <>
                    <span className="stat-counter" data-target={stat.numberValue}>
                      {stat.numberValue}
                    </span>
                    <span className="text-solar ml-1">{stat.suffix}</span>
                  </>
                ) : (
                  <span>{stat.value}</span>
                )}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-mars font-semibold mt-1">
                {stat.label}
              </div>
              <div className="font-mono text-[10px] text-dust mt-0.5">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
