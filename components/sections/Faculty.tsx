"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Pill from "@/components/ui/Pill";
import { teamEditions } from "@/data/team";
import { GraduationCap, Award, Shield } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Faculty() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const currentEdition = teamEditions[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant Title Parallax Rise behind cards
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { yPercent: 40, opacity: 0.1 },
          {
            yPercent: -15,
            opacity: 0.35,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // Theme toggle for body
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "team"),
        onEnterBack: () => document.body.setAttribute("data-theme", "team"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-16 bg-space-900 border-t border-space-700/60 overflow-hidden"
    >
      {/* Giant Background "THE TEAM" Title Rising Behind Cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden">
        <h2
          ref={titleRef}
          className="font-space font-extrabold text-[clamp(6rem,22vw,22rem)] text-transparent bg-clip-text bg-gradient-to-b from-mars/30 via-mars-deep/20 to-transparent leading-none whitespace-nowrap will-change-transform"
        >
          THE TEAM
        </h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Header & Team 6.0 Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <Pill label="MISSION: LEADERSHIP // FACULTY" variant="mars" />
            <h2 className="font-space font-extrabold text-4xl md:text-7xl uppercase tracking-tight text-bone">
              FACULTY & <span className="text-stroke-bone">ADVISORY</span>{" "}
              <span className="text-mars">BOARD</span>
            </h2>
          </div>

          {/* Team Edition Pill Badge */}
          <div className="p-4 bg-space-800 border-2 border-bone hard-shadow flex flex-col">
            <div className="flex items-center gap-2 font-mono text-xs text-solar font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-mars" />
              <span>EDITION {currentEdition.edition}</span>
            </div>
            <div className="font-mono text-[11px] text-dust mt-1">
              ACADEMIC YEAR: {currentEdition.academicYear}
            </div>
          </div>
        </div>

        {/* Pyramid Faculty Cards (Top Faculty Incharge, Followed by Advisors) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {currentEdition.faculty.map((member, idx) => (
            <div
              key={idx}
              className={`p-6 bg-space-800/90 backdrop-blur-md border-2 border-bone hard-shadow flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-2 ${
                idx === 0 ? "md:border-mars md:hard-shadow-mars md:-translate-y-4" : ""
              }`}
            >
              <div>
                {/* Faculty Portrait Frame */}
                <div className="relative w-full aspect-[4/5] bg-space-900 border border-bone/30 mb-5 overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-space-900/90 border border-bone/40 font-mono text-[10px] text-solar uppercase tracking-widest">
                    {member.role}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-mars font-bold uppercase tracking-wider mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>{member.department}</span>
                </div>

                <h3 className="font-space font-extrabold text-2xl text-bone uppercase">
                  {member.name}
                </h3>

                <p className="font-mono text-xs text-dust uppercase tracking-wider mt-1">
                  {member.designation}
                </p>

                <p className="font-mono text-xs text-dust/90 leading-relaxed mt-4 pt-4 border-t border-space-700/60">
                  {member.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-space-700 flex items-center justify-between font-mono text-[11px] text-dust">
                <span>PSG iTech</span>
                <span className="text-aurora-teal">ADVISORY COUNCIL</span>
              </div>
            </div>
          ))}
        </div>

        {/* Student Leadership Row */}
        <div className="pt-12 border-t border-space-700/80">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="w-5 h-5 text-solar" />
            <h3 className="font-space font-bold text-2xl md:text-3xl uppercase tracking-tight text-bone">
              STUDENT EXECUTIVE LEADERSHIP
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentEdition.studentLeadership.map((leader, lIdx) => (
              <div
                key={lIdx}
                className="p-4 bg-space-800/80 border border-space-700 flex flex-col gap-3 group hover:border-mars transition-colors"
              >
                <div className="relative w-full aspect-square bg-space-900 overflow-hidden border border-bone/20">
                  <Image
                    src={leader.imageUrl}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 220px"
                  />
                </div>
                <div>
                  <h4 className="font-space font-bold text-base md:text-lg text-bone uppercase">
                    {leader.name}
                  </h4>
                  <p className="font-mono text-xs text-mars font-semibold uppercase tracking-wider">
                    {leader.role}
                  </p>
                  <p className="font-mono text-[11px] text-dust mt-0.5">{leader.subsystem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
