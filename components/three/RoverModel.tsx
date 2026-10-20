"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { roverMotionRef } from "./useRoverScroll";

// Procedural Fallback Mars Rover (Tarush) with 6 wheels, chassis, mast, and solar array
function ProceduralRover() {
  return (
    <group>
      {/* Main Chassis Box */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.5, 1.6]} />
        <meshStandardMaterial color="#2E3344" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Top Solar Panel Array */}
      <mesh position={[0, 0.28, 0]} receiveShadow>
        <boxGeometry args={[1.3, 0.05, 1.5]} />
        <meshStandardMaterial color="#172A45" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Science & Autonomy Sensor Mast */}
      <group position={[0.4, 0.4, 0.6]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
          <meshStandardMaterial color="#8A92A6" metalness={0.8} />
        </mesh>
        {/* Stereo Depth Camera Head */}
        <mesh position={[0, 0.8, 0.08]} castShadow>
          <boxGeometry args={[0.3, 0.12, 0.16]} />
          <meshStandardMaterial color="#E2552B" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* UHF High Gain Antenna */}
      <group position={[-0.45, 0.4, -0.6]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.0, 8]} />
          <meshStandardMaterial color="#2EE6C5" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#FFC93C" metalness={0.9} />
        </mesh>
      </group>

      {/* Six Articulated Rocker-Bogie Wheels */}
      {[
        [-0.75, -0.35, 0.6],
        [0.75, -0.35, 0.6],
        [-0.8, -0.35, 0],
        [0.8, -0.35, 0],
        [-0.75, -0.35, -0.6],
        [0.75, -0.35, -0.6],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.2, 24]} />
            <meshStandardMaterial color="#111319" roughness={0.8} metalness={0.4} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.22, 16]} />
            <meshStandardMaterial color="#E2552B" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Real GLB Loaded Rover with Auto-Centering and Normalization
function RealGLBRover({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  // Clone scene and auto-center/scale
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Center geometry around origin
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Normalize scale so largest dimension is ~2.8 units
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2.8 / maxDim;
      clone.scale.set(scale, scale, scale);
    }

    // Traverse and apply vertex colors and PBR material properties
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const geom = mesh.geometry;
        if (geom && geom.attributes.position) {
          const pos = geom.attributes.position;
          const count = pos.count;
          const colors = new Float32Array(count * 3);

          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const absX = Math.abs(x);

            // 1. Robotic Claw Gripper (Mars Red/Orange)
            if (z > 0.32 && y > 0.20 && absX < 0.12) {
              if (z > 0.35 && y < 0.37) {
                // Vibrant Mars Rust / Orange Claw Fingers
                colors[i * 3] = 0.94;
                colors[i * 3 + 1] = 0.28;
                colors[i * 3 + 2] = 0.12;
              } else {
                // Gold / Anodized Bronze Wrist Ring
                colors[i * 3] = 0.94;
                colors[i * 3 + 1] = 0.74;
                colors[i * 3 + 2] = 0.22;
              }
            }
            // 2. Wheels: Tires vs Rims/Hubs
            else if (y < -0.15 && absX > 0.16) {
              if (absX > 0.24) {
                // Dark Durable Tire Rubber
                colors[i * 3] = 0.20;
                colors[i * 3 + 1] = 0.22;
                colors[i * 3 + 2] = 0.25;
              } else if (absX > 0.185) {
                // Machined Aluminum Wheel Rim
                colors[i * 3] = 0.82;
                colors[i * 3 + 1] = 0.86;
                colors[i * 3 + 2] = 0.92;
              } else {
                // Wheel axle / hub joint
                colors[i * 3] = 0.45;
                colors[i * 3 + 1] = 0.48;
                colors[i * 3 + 2] = 0.55;
              }
            }
            // 3. Antenna Mast (Back-right vertical cylinder)
            else if (y > 0.14 && z < -0.13 && x > 0.13) {
              if (y > 0.32) {
                // Mast Sensor Head (Aurora Teal glow)
                colors[i * 3] = 0.18;
                colors[i * 3 + 1] = 0.92;
                colors[i * 3 + 2] = 0.78;
              } else {
                // Brushed Mast Tube
                colors[i * 3] = 0.85;
                colors[i * 3 + 1] = 0.88;
                colors[i * 3 + 2] = 0.94;
              }
            }
            // 4. Robotic Arm Links & Actuators
            else if (y > 0.12) {
              if (absX < 0.04 && z > 0.05 && z < 0.25) {
                // Metallic Hydraulic / Actuator Cylinders
                colors[i * 3] = 0.80;
                colors[i * 3 + 1] = 0.83;
                colors[i * 3 + 2] = 0.88;
              } else {
                // Dark Space Titanium Structural Arm
                colors[i * 3] = 0.38;
                colors[i * 3 + 1] = 0.41;
                colors[i * 3 + 2] = 0.48;
              }
            }
            // 5. Red Safety Accent Rings on Frame Struts
            else if (
              (y > -0.12 && y < -0.08 && absX > 0.14) ||
              (y > 0.02 && y < 0.05 && absX > 0.18 && z > 0.15)
            ) {
              // Mars Red Warning Bands on Legs
              colors[i * 3] = 0.92;
              colors[i * 3 + 1] = 0.22;
              colors[i * 3 + 2] = 0.12;
            }
            // 6. Central Electronics Deck & Payload Bay
            else if (y > 0.01 && absX < 0.22 && z > -0.22 && z < 0.22) {
              // High-tech Matte Carbon Payload Deck
              colors[i * 3] = 0.16;
              colors[i * 3 + 1] = 0.18;
              colors[i * 3 + 2] = 0.24;
            }
            // 7. Lower Wires & Electronics
            else if (y < 0.0 && y > -0.15 && absX < 0.12 && z > -0.15 && z < 0.15) {
              // Harness Wires (technical dark with orange wiring accents)
              if (i % 5 === 0) {
                colors[i * 3] = 0.90;
                colors[i * 3 + 1] = 0.25;
                colors[i * 3 + 2] = 0.10;
              } else {
                colors[i * 3] = 0.18;
                colors[i * 3 + 1] = 0.20;
                colors[i * 3 + 2] = 0.24;
              }
            }
            // 8. Main Aerospace Chassis Tubing & Rocker-Bogie Frame
            else {
              colors[i * 3] = 0.62;
              colors[i * 3 + 1] = 0.66;
              colors[i * 3 + 2] = 0.74;
            }
          }

          geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
          geom.attributes.color.needsUpdate = true;
        }

        // Apply high-quality MeshStandardMaterial with vertexColors
        mesh.material = new THREE.MeshStandardMaterial({
          vertexColors: true,
          roughness: 0.45,
          metalness: 0.55,
        });
      }
    });

    return clone;
  }, [scene]);

  return <primitive object={clonedScene} />;
}

export default function RoverModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [loadError, setLoadError] = React.useState(false);

  // Pre-allocate reusable objects to avoid GC pressure during scroll
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetRot = useMemo(() => new THREE.Euler(), []);
  const scaleVec = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Master Scroll-Driven Animation Mapping
    // 0.00 -> 0.18: Hero Section (Turntable + Mouse Parallax)
    // 0.18 -> 0.40: About Section (Translate Right, Ghost Opacity)
    // 0.40 -> 0.60: Subsystems & Faculty (Deck camera framing)
    // 0.60 -> 0.82: Challenges Section (Hidden behind Mars Rust Wipe)
    // 0.82 -> 0.92: Updates & Sponsors (Faint background ghost)
    // 0.92 -> 1.00: Footer (Drive onto horizon from left and park)

    const p = Math.max(0, Math.min(1, roverMotionRef.current.progress));
    const mouseX = roverMotionRef.current.mouseX;
    const mouseY = roverMotionRef.current.mouseY;

    targetPos.set(0, 0, 0);
    targetRot.set(0, 0, 0);
    let targetScale = 1.0;

    if (p < 0.18) {
      // HERO: Centered, rising out of the dark, slow turntable + mouse tilt
      const heroP = p / 0.18;
      targetPos.set(0, -0.2 + heroP * 0.2, 0);
      targetRot.set(
        mouseY * 0.3 + 0.1,
        state.clock.getElapsedTime() * 0.15 + mouseX * 0.4,
        0
      );
      targetScale = 1.15;
    } else if (p < 0.40) {
      // ABOUT: Shifts to the right, scales down, ghost appearance
      const aboutP = (p - 0.18) / 0.22;
      targetPos.set(1.4 * aboutP, -0.1, -0.8 * aboutP);
      targetRot.set(0.1, Math.PI * 0.35 + aboutP * 0.8, -0.05);
      targetScale = 0.9 - aboutP * 0.2;
    } else if (p < 0.60) {
      // SUBSYSTEMS & FACULTY: Camera framing
      const subP = (p - 0.40) / 0.20;
      targetPos.set(-0.8 + subP * 0.3, 0.1, -0.5);
      targetRot.set(0.15, Math.PI * 0.8 + subP * 0.6, 0);
      targetScale = 0.95;
    } else if (p < 0.82) {
      // CHALLENGES: Hidden / shifted off-camera behind Mars rust wipe
      targetPos.set(0, -8.0, -10.0);
      targetScale = 0.01;
    } else if (p < 0.92) {
      // UPDATES & SPONSORS: Faint background ghost
      const teamP = (p - 0.82) / 0.10;
      targetPos.set(1.2, 0.1, -1.8);
      targetRot.set(0.1, Math.PI * 0.2 + teamP * 0.5, 0);
      targetScale = 0.7;
    } else {
      // FOOTER: Drives in from left onto Mars horizon dune and stops
      const footerP = (p - 0.92) / 0.08;
      const xDrive = -3.5 + Math.min(footerP, 1.0) * 3.5;
      targetPos.set(xDrive, -0.65, 0.2);
      targetRot.set(0.05, Math.PI * 0.45, 0);
      targetScale = 0.9;
    }

    // Responsive, delta-aware smooth interpolation (no laggy dragging or pause)
    const dampFactor = 1 - Math.exp(-12 * Math.min(delta, 0.1));
    groupRef.current.position.lerp(targetPos, dampFactor);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.x, dampFactor);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.y, dampFactor);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.z, dampFactor);
    scaleVec.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleVec, dampFactor);
  });

  return (
    <group ref={groupRef}>
      {loadError ? (
        <ProceduralRover />
      ) : (
        <React.Suspense fallback={<ProceduralRover />}>
          <RealGLBRover url="/models/tarush.glb" />
        </React.Suspense>
      )}

      {/* Subtle Contact Ground Shadow Plane */}
      <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}

// Preload the Draco-compressed Tarush GLB model
if (typeof window !== "undefined") {
  useGLTF.preload("/models/tarush.glb");
}
