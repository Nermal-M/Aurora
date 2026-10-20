"use client";

import React, { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger on window resize / orientation change
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
