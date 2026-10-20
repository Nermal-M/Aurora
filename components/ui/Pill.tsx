import React from "react";

interface PillProps {
  label: string;
  variant?: "mars" | "teal" | "solar" | "bone" | "violet";
  className?: string;
}

export default function Pill({ label, variant = "mars", className = "" }: PillProps) {
  const variantStyles = {
    mars: "border-mars/50 text-mars bg-mars/10",
    teal: "border-aurora-teal/50 text-aurora-teal bg-aurora-teal/10",
    solar: "border-solar/50 text-solar bg-solar/10",
    bone: "border-bone/40 text-bone bg-bone/10",
    violet: "border-aurora-violet/50 text-aurora-violet bg-aurora-violet/10",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs tracking-widest uppercase font-mono backdrop-blur-md ${variantStyles[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      <span>{label}</span>
    </div>
  );
}
