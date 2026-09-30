import { useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

function LuxuryBuilding() {
  const group = useRef<THREE.Group>(null);
  const entrance = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!entrance.current) return;

    gsap.fromTo(
      entrance.current.position,
      {
        x: 3,
        y: -0.5,
      },
      {
        x: 0,
        y: 0,
        duration: 2,
        delay: 0.3,
        ease: "power4.out",
      },
    );

    gsap.fromTo(
      entrance.current.scale,
      {
        x: 0.75,
        y: 0.75,
        z: 0.75,
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 2,
        delay: 0.3,
        ease: "power3.out",
      },
    );
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Idle movement
    const idleRotation = time * 0.05;

    // Mouse interaction
    const targetRotationY = idleRotation + mouseX * 0.25;
    const targetRotationX = mouseY * 0.12;
    const targetRotationZ = -mouseX * 0.04;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotationY,
      0.035,
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotationX,
      0.035,
    );

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetRotationZ,
      0.035,
    );

    // Floating
    group.current.position.y = 0.6 + Math.sin(time * 0.7) * 0.06;

    // Subtle mouse parallax
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      4.0 + mouseX * 0.25,
      0.025,
    );
  });

  return (
    <group ref={entrance}>
      <group
        ref={group}
        position={[4.0, 0.6, 0]}
        scale={1.25}
      >
        {/* MAIN BUILDING */}
        <mesh>
          <boxGeometry args={[3.2, 6.5, 2.4]} />

          <meshPhysicalMaterial
            color="#191917"
            metalness={0.72}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* GLASS PANELS */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = -1.3 + i * 0.52;

          return (
            <mesh
              key={`glass-${i}`}
              position={[x, 0, 1.23]}
            >
              <boxGeometry args={[0.45, 6.2, 0.035]} />

              <meshPhysicalMaterial
                color="#35352f"
                metalness={0.85}
                roughness={0.06}
                clearcoat={1}
                clearcoatRoughness={0.05}
              />
            </mesh>
          );
        })}

        {/* GOLD VERTICAL STRUCTURE */}
        {Array.from({ length: 7 }).map((_, i) => {
          const x = -1.6 + i * 0.53;

          return (
            <mesh
              key={`column-${i}`}
              position={[x, 0, 1.3]}
            >
              <boxGeometry args={[0.055, 6.8, 0.09]} />

              <meshStandardMaterial
                color="#d4af37"
                metalness={1}
                roughness={0.12}
                emissive="#4a3807"
                emissiveIntensity={0.35}
              />
            </mesh>
          );
        })}

        {/* FLOOR LINES */}
        {Array.from({ length: 13 }).map((_, i) => {
          const y = -3 + i * 0.5;

          return (
            <mesh
              key={`floor-${i}`}
              position={[0, y, 1.32]}
            >
              <boxGeometry args={[3.35, 0.035, 0.08]} />

              <meshStandardMaterial
                color="#e0bd43"
                metalness={1}
                roughness={0.12}
              />
            </mesh>
          );
        })}

        {/* SIDE FRAME */}
        <mesh position={[-1.63, 0, 0]}>
          <boxGeometry args={[0.08, 6.8, 2.5]} />

          <meshStandardMaterial
            color="#b38d20"
            metalness={1}
            roughness={0.15}
          />
        </mesh>

        <mesh position={[1.63, 0, 0]}>
          <boxGeometry args={[0.08, 6.8, 2.5]} />

          <meshStandardMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.15}
          />
        </mesh>

        {/* ROOF */}
        <mesh position={[0, 3.42, 0]}>
          <boxGeometry args={[3.55, 0.16, 2.7]} />

          <meshStandardMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.12}
          />
        </mesh>

        {/* ROOFTOP STRUCTURE */}
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[1.2, 1.25, 0.8]} />

          <meshPhysicalMaterial
            color="#1b1b18"
            metalness={0.8}
            roughness={0.1}
            clearcoat={1}
          />
        </mesh>

        <mesh position={[0, 4.1, 0.42]}>
          <boxGeometry args={[1.05, 1.1, 0.04]} />

          <meshStandardMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.1}
          />
        </mesh>

        {/* BASE */}
        <mesh position={[0, -3.35, 0]}>
          <boxGeometry args={[3.8, 0.2, 3]} />

          <meshStandardMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.14}
          />
        </mesh>
      </group>
    </group>

  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.9} />

      <directionalLight
        position={[6, 8, 7]}
        intensity={5}
      />

      <directionalLight
        position={[-5, 4, 4]}
        intensity={3}
      />

      <pointLight
        position={[4, 2, 5]}
        color="#f2d675"
        intensity={90}
        distance={18}
      />

      <pointLight
        position={[-3, 4, 3]}
        color="#fff4d0"
        intensity={40}
        distance={14}
      />
    </>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[7.5, 2.5, 12]}
        fov={36}
      />

      <SceneLights />

      <LuxuryBuilding />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Scene />
    </Canvas>
  );
}