"use client";

import React, { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "mars" | "teal" | "solar" | "bone" | "dark";
  className?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "mars",
  className = "",
  target,
  rel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btnRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const variantClasses = {
    mars: "bg-mars text-white border-2 border-bone hard-shadow hover:bg-mars/90",
    teal: "bg-aurora-teal text-space-900 border-2 border-bone hard-shadow hover:bg-aurora-teal/90 font-bold",
    solar: "bg-solar text-space-900 border-2 border-bone hard-shadow hover:bg-solar/90 font-bold",
    bone: "bg-bone text-space-900 border-2 border-space-900 hard-shadow-black hover:bg-bone/90 font-bold",
    dark: "bg-space-800 text-bone border-2 border-space-700 hard-shadow hover:border-aurora-teal/60",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-none text-sm uppercase tracking-wider font-mono font-semibold cursor-pointer select-none transition-all duration-150 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={btnRef as any}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as any}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
