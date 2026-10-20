"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { navItems } from "@/data/site";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";

export default function Nav() {
  const { scrollTo } = useLenis();
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const viewportCenter = window.innerHeight * 0.45;
          for (const item of navItems) {
            const el = document.getElementById(item.id);
            if (el) {
              const targetEl = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
              const rect = targetEl.getBoundingClientRect();
              if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                setActiveSection((prev) => (prev === item.id ? prev : item.id));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: 0, duration: 1.2 });
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto flex items-center justify-between gap-2 md:gap-6 px-4 md:px-6 py-2.5 rounded-full bg-space-900/85 backdrop-blur-xl border border-bone/20 shadow-2xl transition-all duration-300 hover:border-mars/50"
        >
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 text-bone group"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-bone/30 group-hover:border-mars transition-colors">
              <Image
                src="/images/logo-aurora.png"
                alt="PSG Team Aurora Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <span className="font-space font-bold tracking-wider text-sm md:text-base hidden sm:inline-block">
              AURORA<span className="text-mars">.</span>
            </span>
          </a>

          {/* Desktop Links with Sliding Highlight */}
          <div className="hidden lg:flex items-center gap-1 relative font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-200 uppercase tracking-wider ${
                    isActive ? "text-white font-semibold" : "text-dust hover:text-bone"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-mars rounded-full -z-10 shadow-sm animate-in fade-in zoom-in-95 duration-200" />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#sponsors"
              onClick={(e) => handleNavClick(e, "#sponsors")}
              className="px-3 md:px-4 py-1.5 rounded-full bg-bone text-space-900 font-mono text-xs uppercase tracking-wider font-bold hover:bg-solar transition-colors duration-200 flex items-center gap-1"
            >
              <span>Sponsor Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full lg:hidden text-bone hover:text-mars transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-space-900/98 backdrop-blur-2xl flex flex-col justify-center items-center px-8 lg:hidden animate-in fade-in duration-300"
        >
          <div className="flex flex-col gap-5 text-center font-space text-2xl uppercase tracking-wider">
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`transition-colors duration-200 ${
                  activeSection === item.id ? "text-mars font-bold" : "text-bone hover:text-solar"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-6 border-t border-space-700">
              <a
                href="#sponsors"
                onClick={(e) => handleNavClick(e, "#sponsors")}
                className="inline-block px-8 py-3 bg-mars text-white font-mono text-sm uppercase tracking-widest font-bold"
              >
                Become a Sponsor
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
