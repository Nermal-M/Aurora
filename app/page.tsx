"use client";

import React from "react";
import Preloader from "@/components/sections/Preloader";
import Nav from "@/components/ui/Nav";
import RoverCanvas from "@/components/three/RoverCanvas";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Subsystems from "@/components/sections/Subsystems";
import Faculty from "@/components/sections/Faculty";
import Challenges from "@/components/sections/Challenges";
import Updates from "@/components/sections/Updates";
import Sponsors from "@/components/sections/Sponsors";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-space-900 text-bone overflow-x-hidden">
      {/* 7.0 Preloader: real asset loader simulation with clip-path wipe */}
      <Preloader />

      {/* 7.1 Floating Pill Navigation */}
      <Nav />

      {/* Persistent Fixed 3D Canvas (Tarush Rover) */}
      <RoverCanvas />

      {/* Scrollytelling Sections in Order */}
      <div className="relative z-10 w-full">
        {/* 7.2 Hero (Home) */}
        <Hero />

        {/* 7.3 About (Pinned Story, Word Reveal, Photo & Stats) */}
        <About />

        {/* 7.4 Subsystems (Fan-Out into Asterix Stacked Deck & Roster Modal) */}
        <Subsystems />

        {/* 7.5 Faculty & Leadership (Pyramid Layout & Team 6.0) */}
        <Faculty />

        {/* 7.6 Challenges (SIGNATURE SECTION: Mars Rust Wipe & Horizontal Cassettes) */}
        <Challenges />

        {/* 7.7 Updates (Story Briefings & Workshops) */}
        <Updates />

        {/* 7.8 Sponsors (Curved Marquee, Tier Pills & Magnetic CTAs) */}
        <Sponsors />

        {/* 7.9 Footer & Closing Horizon Scene (3-Dune Parallax & Rover Parking) */}
        <Footer />
      </div>
    </main>
  );
}
