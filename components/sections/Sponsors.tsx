"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Pill from "@/components/ui/Pill";
import MagneticButton from "@/components/ui/MagneticButton";
import { sponsorsData, sponsorshipTiers } from "@/data/sponsors";
import { siteConfig } from "@/data/site";
import { Mail, Sparkles, HeartHandshake } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Sponsors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Endless Marquee with Scroll Velocity Acceleration
      if (marqueeRef.current) {
        const marqueeInner = marqueeRef.current.querySelector(".marquee-inner");
        if (marqueeInner) {
          const tl = gsap.to(marqueeInner, {
            xPercent: -50,
            repeat: -1,
            duration: 25,
            ease: "none",
          });

          // Accelerate on scroll with reusable quickTo
          const setTimeScale = gsap.quickTo(tl, "timeScale", { duration: 0.3, ease: "power1.out" });

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const velocity = Math.min(4, Math.abs(self.getVelocity() / 300));
              setTimeScale(1 + velocity);
            },
          });
        }
      }

      // Theme toggle for body
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "sponsors"),
        onEnterBack: () => document.body.setAttribute("data-theme", "sponsors"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Double array for seamless loop
  const marqueeSponsors = [...sponsorsData, ...sponsorsData, ...sponsorsData];

  return (
    <section
      id="sponsors"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-16 bg-space-800 border-t border-space-700/60 overflow-hidden"
    >
      {/* Background Giant Section Number */}
      <div
        className="absolute top-12 right-12 font-mono text-[clamp(6rem,18vw,18rem)] font-extrabold text-space-700/20 select-none pointer-events-none -z-10"
        aria-hidden="true"
      >
        // 06
      </div>

      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16">
          <Pill label="MISSION: PARTNERS // SPONSORS" variant="solar" />
          <h2 className="font-space font-extrabold text-4xl md:text-7xl uppercase tracking-tight text-bone">
            MISSION <span className="text-stroke-bone">PARTNERS</span> &{" "}
            <span className="text-solar">BACKERS</span>
          </h2>
          <p className="font-mono text-xs md:text-sm text-dust max-w-xl">
            We are powered by leading industry software, precision engineering tools, and hardware partnerships that turn student designs into Martian reality.
          </p>
        </div>

        {/* Curved / Infinite Running Sponsor Marquee Band */}
        <div
          ref={marqueeRef}
          className="relative w-full overflow-hidden py-10 my-8 border-y-2 border-bone/20 bg-space-900/60 [transform:rotate(-1.5deg)] select-none shadow-2xl"
        >
          <div className="marquee-inner flex items-center gap-10 w-max will-change-transform">
            {marqueeSponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 px-8 py-4 bg-space-800 border-2 border-bone hard-shadow shrink-0 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative w-32 h-16 bg-white/5 border border-bone/20 p-2 overflow-hidden flex items-center justify-center">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain p-1.5 filter brightness-110 contrast-125"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-space font-bold text-xl uppercase text-bone">
                    {sponsor.name}
                  </span>
                  <span className="font-mono text-[10px] text-solar font-semibold uppercase tracking-widest">
                    {sponsor.tierLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Grid Cards Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          {sponsorsData.map((sponsor, sIdx) => (
            <div
              key={sIdx}
              className="p-6 bg-space-900/80 border border-space-700 flex flex-col justify-between group hover:border-solar transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-dust mb-4">
                  <span className="text-solar font-bold uppercase">{sponsor.tierLabel}</span>
                  <span>INDEX // 0{sIdx + 1}</span>
                </div>
                <h3 className="font-space font-bold text-2xl text-bone uppercase mb-2">
                  {sponsor.name}
                </h3>
                <p className="font-mono text-xs text-dust/90 leading-relaxed">
                  {sponsor.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-space-700/60 font-mono text-[11px] text-solar/80 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> OFFICIAL TECHNOLOGY PARTNER
              </div>
            </div>
          ))}
        </div>

        {/* "Become a Sponsor" Action Banner with Magnetic Buttons */}
        <div className="mt-12 p-8 md:p-12 bg-space-900 border-2 border-bone hard-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs text-mars font-bold uppercase tracking-widest mb-2">
              <HeartHandshake className="w-4 h-4" />
              <span>SPONSORSHIP DOSSIER</span>
            </div>
            <h3 className="font-space font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-bone">
              FUEL OUR <span className="text-mars">DESCENT.</span>
            </h3>
            <p className="font-mono text-xs md:text-sm text-dust mt-3 leading-relaxed">
              Support student robotics, sponsor critical mission components, or provide telemetry equipment. In return, showcase your brand on an international planetary analog stage.
            </p>
          </div>

          {/* Magnetic CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <MagneticButton
              href={`mailto:${siteConfig.socialLinks.email}`}
              variant="mars"
              className="w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 mr-1.5" />
              <span>Mail Us</span>
            </MagneticButton>

            <MagneticButton
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="bone"
              className="w-full sm:w-auto"
            >
              <LinkedinIcon className="w-4 h-4 mr-1.5" />
              <span>LinkedIn</span>
            </MagneticButton>

            <MagneticButton
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variant="teal"
              className="w-full sm:w-auto"
            >
              <InstagramIcon className="w-4 h-4 mr-1.5" />
              <span>Instagram</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
