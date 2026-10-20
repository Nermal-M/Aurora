"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig, navItems } from "@/data/site";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dunesBackRef = useRef<SVGPathElement>(null);
  const dunesMidRef = useRef<SVGPathElement>(null);
  const dunesFrontRef = useRef<SVGPathElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3-Layered Mars Dune Parallax at Different Speeds
      if (containerRef.current) {
        if (dunesBackRef.current) {
          gsap.to(dunesBackRef.current, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
        }

        if (dunesMidRef.current) {
          gsap.to(dunesMidRef.current, {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
        }

        if (dunesFrontRef.current) {
          gsap.to(dunesFrontRef.current, {
            yPercent: -35,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
        }

        // Half-hidden giant AURORA wordmark rising behind dunes
        if (wordmarkRef.current) {
          gsap.fromTo(
            wordmarkRef.current,
            { yPercent: 40, opacity: 0.2 },
            {
              yPercent: 0,
              opacity: 0.6,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.6,
              },
            }
          );
        }
      }

      // Theme toggle for body
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.body.setAttribute("data-theme", "footer"),
        onEnterBack: () => document.body.setAttribute("data-theme", "footer"),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(0, { duration: 1.5 });
  };

  return (
    <footer
      id="footer"
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-space-900 via-[#1A0A06] to-[#3B0E07] text-bone overflow-hidden flex flex-col justify-between pt-24 select-none"
    >
      {/* Subtle Shooting Star Animation Streaks */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-60">
        <div className="absolute top-1/4 left-1/3 w-32 h-[1px] bg-gradient-to-r from-transparent via-solar to-transparent rotate-[-35deg] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-48 h-[1px] bg-gradient-to-r from-transparent via-bone to-transparent rotate-[-30deg] animate-pulse delay-500" />
      </div>

      {/* Top Footer Navigation & Details */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-mars-deep/60">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-bone/30">
                <Image
                  src="/images/logo-aurora.png"
                  alt="PSG Team Aurora Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-space font-extrabold text-2xl uppercase tracking-wider text-bone">
                PSG TEAM AURORA
              </span>
            </div>

            <p className="font-mono text-xs md:text-sm text-dust max-w-sm leading-relaxed">
              Undergraduate Mars Rover Robotics Collective of PSG Institute of Technology and Applied Research, Coimbatore.
            </p>

            <div className="flex items-start gap-2 font-mono text-xs text-dust/80 mt-2">
              <MapPin className="w-4 h-4 text-mars shrink-0 mt-0.5" />
              <span>{siteConfig.address}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs">
            <span className="text-solar uppercase tracking-widest font-bold mb-2">
              MISSION DIRECTORY
            </span>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className="text-dust hover:text-bone uppercase tracking-wider transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Socials & Back To Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-6 font-mono text-xs">
            <div className="flex flex-col md:items-end gap-3">
              <span className="text-solar uppercase tracking-widest font-bold">
                COMMUNICATIONS LINK
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${siteConfig.socialLinks.email}`}
                  className="p-2.5 bg-space-800 border border-bone/30 hover:border-mars hover:text-mars transition-colors"
                  aria-label="Email Team Aurora"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-space-800 border border-bone/30 hover:border-mars hover:text-mars transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-space-800 border border-bone/30 hover:border-mars hover:text-mars transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBackToTop}
              className="flex items-center gap-2 px-4 py-2 bg-bone text-space-900 font-bold uppercase tracking-widest hard-shadow-black hover:bg-solar transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mars Horizon Parallax Dune Landscape Scene */}
      <div className="relative w-full h-[360px] md:h-[480px] overflow-hidden flex items-end">
        {/* Giant Half-Hidden AURORA Wordmark Rising Behind Dunes */}
        <div
          ref={wordmarkRef}
          className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none select-none z-[1] will-change-transform"
        >
          <span className="font-space font-extrabold text-[clamp(6rem,22vw,24rem)] text-transparent bg-clip-text bg-gradient-to-t from-mars/20 to-mars text-stroke-mars leading-none tracking-tighter opacity-70">
            AURORA
          </span>
        </div>

        {/* Dune Layer 1: Furthest Rust Horizon */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-[2]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            ref={dunesBackRef}
            d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,240C840,245,960,203,1080,181.3C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            fill="#5E140B"
            opacity="0.8"
          />
        </svg>

        {/* Dune Layer 2: Midground Mars Dune */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-[3]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            ref={dunesMidRef}
            d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,240C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill="#3B0C06"
          />
        </svg>

        {/* Dune Layer 3: Foreground Dune Ridge (Tarush Rover parks here) */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-[4]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            ref={dunesFrontRef}
            d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,261.3C672,267,768,245,864,240C960,235,1056,245,1152,256C1248,267,1344,277,1392,282.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#120402"
          />
        </svg>

        {/* Bottom Horizon Strip & Copyright */}
        <div className="relative z-10 w-full bg-[#120402] py-4 px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-dust/70">
          <div>
            © {new Date().getFullYear()} PSG TEAM AURORA. ALL RIGHTS RESERVED.
          </div>
          <div>
            DESCENT TO MARS // PSG INSTITUTE OF TECHNOLOGY AND APPLIED RESEARCH
          </div>
        </div>
      </div>
    </footer>
  );
}
