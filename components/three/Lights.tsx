"use client";

import React from "react";

export default function Lights() {
  return (
    <>
      {/* Ambient soft space light */}
      <ambientLight intensity={0.8} color="#FFFFFF" />

      {/* Main Studio Key Light: Neutral Crisp Light to render true materials */}
      <directionalLight
        position={[6, 9, 6]}
        intensity={2.6}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Side Fill Light: Warm Mars Atmosphere Accent */}
      <directionalLight position={[-5, 3, 4]} intensity={1.4} color="#E2552B" />

      {/* High-Contrast Rim Light: Aurora Teal Cybernetic Edge */}
      <directionalLight position={[-6, 5, -5]} intensity={2.2} color="#2EE6C5" />

      {/* Top Solar Highlight: Telemetry Gold */}
      <directionalLight position={[0, 7, 1]} intensity={1.2} color="#FFC93C" />

      {/* Subtle Ground Bounce: Martian Terrain Warm Glow */}
      <directionalLight position={[0, -5, 0]} intensity={0.5} color="#7A1F12" />
    </>
  );
}
