"use client";

import React, { useEffect, useRef, useState } from "react";
import Pill from "@/components/ui/Pill";
import { recruitmentResultsData, totalRecruits } from "@/data/results";
import { Users, Cpu, Zap, Microscope, Wrench, Radio, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Results() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<string>("all");

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-4 h-4" />;
      case "Zap":
        return <Zap className="w-4 h-4" />;
      case "Microscope":
        return <Microscope className="w-4 h-4" />;
      case "Wrench":
        return <Wrench className="w-4 h-4" />;
      case "Radio":
        return <Radio className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation
      const counters = containerRef.current?.querySelectorAll(".recruit-count");
      if (counters) {
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target") || "0", 10);
          gsap.fromTo(
            counter,
            { textContent: "0" },
            {
              textContent: target,
              duration: 1.8,
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
        onEnter: () => document.body.setAttribute("data-theme", "results"),
        onEnterBack: () => document.body.setAttribute("data-theme", "results"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filtered members list
  const filteredDepartments =
    selectedDeptId === "all"
      ? recruitmentResultsData
      : recruitmentResultsData.filter((d) => d.id === selectedDeptId);

  return (
    <section
      id="results"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-16 bg-space-800 border-t border-space-700/60 overflow-hidden"
    >
      {/* Background Giant Section Number */}
      <div
        className="absolute top-12 right-12 font-mono text-[clamp(6rem,18vw,18rem)] font-extrabold text-space-700/20 select-none pointer-events-none -z-10"
        aria-hidden="true"
      >
        // 07
      </div>

      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[85vh]">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-12">
          <Pill label="MISSION: RECRUITS // ROSTER" variant="solar" />
          <h2 className="font-space font-extrabold text-4xl md:text-7xl uppercase tracking-tight text-bone">
            2026 RECRUITMENT <span className="text-stroke-bone">RESULTS</span>
          </h2>
          <p className="font-mono text-xs md:text-sm text-dust max-w-xl">
            Meet the 24 newly inducted engineers selected across high-competition technical screening and hands-on rover trials.
          </p>
        </div>

        {/* Counter Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {recruitmentResultsData.map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setSelectedDeptId(dept.id)}
              className={`p-4 bg-space-900 border text-left flex flex-col justify-between transition-all duration-200 select-none cursor-pointer ${
                selectedDeptId === dept.id
                  ? "border-solar bg-space-900 hard-shadow -translate-y-1"
                  : "border-space-700 hover:border-bone/60"
              }`}
            >
              <div className="flex items-center justify-between text-dust mb-3">
                <span className="p-1.5 border border-bone/20 rounded-none text-bone">
                  {getDeptIcon(dept.iconName)}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-dust">
                  {dept.shortName}
                </span>
              </div>
              <div>
                <div className="font-space font-extrabold text-4xl text-bone">
                  <span className="recruit-count" data-target={dept.count}>
                    {dept.count}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-dust uppercase tracking-wider mt-1">
                  NEW RECRUITS
                </div>
              </div>
            </button>
          ))}

          {/* Total Recruits Card */}
          <button
            type="button"
            onClick={() => setSelectedDeptId("all")}
            className={`p-4 bg-solar text-space-900 border-2 border-bone text-left flex flex-col justify-between hard-shadow select-none cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${
              selectedDeptId === "all" ? "ring-2 ring-mars -translate-y-1" : ""
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-mars-deep" />
              <span>TOTAL</span>
            </div>
            <div>
              <div className="font-space font-extrabold text-5xl tracking-tight text-space-900">
                <span className="recruit-count" data-target={totalRecruits}>
                  {totalRecruits}
                </span>
              </div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-space-900 mt-1">
                INDUCTED CREW
              </div>
            </div>
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <span className="text-dust uppercase tracking-wider mr-2">FILTER:</span>
          <button
            type="button"
            onClick={() => setSelectedDeptId("all")}
            className={`px-3 py-1.5 uppercase font-semibold transition-colors ${
              selectedDeptId === "all"
                ? "bg-bone text-space-900"
                : "bg-space-900 text-dust border border-space-700 hover:text-bone"
            }`}
          >
            All Departments ({totalRecruits})
          </button>
          {recruitmentResultsData.map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setSelectedDeptId(dept.id)}
              className={`px-3 py-1.5 uppercase font-semibold transition-colors flex items-center gap-1.5 ${
                selectedDeptId === dept.id
                  ? "bg-solar text-space-900"
                  : "bg-space-900 text-dust border border-space-700 hover:text-bone"
              }`}
            >
              <span>{dept.name}</span>
              <span className="opacity-70">({dept.count})</span>
            </button>
          ))}
        </div>

        {/* Staggered Roster Cards */}
        <div className="space-y-8 my-4">
          {filteredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="p-6 md:p-8 bg-space-900 border-2 border-bone hard-shadow select-none"
            >
              <div className="flex items-center justify-between pb-4 border-b border-space-700 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 border border-bone/30 text-solar">
                    {getDeptIcon(dept.iconName)}
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-2xl uppercase tracking-tight text-bone">
                      {dept.name}
                    </h3>
                    <p className="font-mono text-xs text-solar">
                      {dept.count} INDUCTED MEMBERS
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-dust uppercase tracking-widest hidden sm:inline">
                  DIVISION // {dept.id.toUpperCase()}
                </span>
              </div>

              {/* Grid of Recruited Members */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dept.members.map((member, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 bg-space-800 border border-space-700 flex items-center justify-between group hover:border-solar transition-colors"
                  >
                    <div>
                      <h4 className="font-space font-semibold text-base text-bone uppercase group-hover:text-solar transition-colors">
                        {member.name}
                      </h4>
                      <p className="font-mono text-xs text-dust">{member.department}</p>
                    </div>
                    <span className="px-2 py-1 bg-space-900 border border-space-700 font-mono text-[10px] text-solar font-semibold uppercase">
                      {member.degree}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Info */}
        <div className="pt-8 border-t border-space-700/60 flex items-center justify-between font-mono text-xs text-dust">
          <div>PSG iTech // OFFICIALLY VALIDATED RECRUITMENT LOG</div>
          <div>DESCENT TO MARS // IRC 2026 CYCLE</div>
        </div>
      </div>
    </section>
  );
}
