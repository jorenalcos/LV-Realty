import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ExperienceSceneProps {
  progressRef: React.MutableRefObject<number>;
}

/* -------------------------------------------------------------------------- */
/* CAMERA                                                                     */
/* -------------------------------------------------------------------------- */

function CameraController({
  progressRef,
}: ExperienceSceneProps) {
  const { camera, size } = useThree();

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const targetMouse = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;

      targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
    };
  }, []);

  useEffect(() => {
    const isMobile = size.width < 768;

    if (isMobile) {
      camera.position.set(7, 2.5, 17);
    } else {
      camera.position.set(8.5, 3.2, 16);
    }
  }, [camera, size.width]);

  useFrame((_, delta) => {
    const progress = progressRef.current;

    /* -------------------------------------------------------------- */
    /* Mouse smoothing                                                */
    /* -------------------------------------------------------------- */

    mouse.current.x = THREE.MathUtils.damp(
      mouse.current.x,
      targetMouse.current.x,
      4,
      delta,
    );

    mouse.current.y = THREE.MathUtils.damp(
      mouse.current.y,
      targetMouse.current.y,
      4,
      delta,
    );

    /* -------------------------------------------------------------- */
    /* Camera target                                                  */
    /* -------------------------------------------------------------- */

    const baseX = 8.5;
    const baseY = 3.2;
    const baseZ = 16;

    /*
     * Scroll changes the camera slightly.
     */
    const scrollX = Math.sin(progress * Math.PI) * 1.2;

    const scrollY = Math.sin(progress * Math.PI) * 0.5;

    /*
     * Mouse adds subtle parallax.
     */
    const mouseX = mouse.current.x * 0.55;
    const mouseY = mouse.current.y * 0.3;

    const targetX = baseX + scrollX + mouseX;

    const targetY = baseY + scrollY + mouseY;

    const targetZ = baseZ - Math.sin(progress * Math.PI) * 1.2;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetX,
      4,
      delta,
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY,
      4,
      delta,
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      4,
      delta,
    );

    camera.lookAt(1.5, 0, 0);
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/* BUILDING                                                                   */
/* -------------------------------------------------------------------------- */

function Building({
  progressRef,
}: ExperienceSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const progress = progressRef.current;
    const time = state.clock.getElapsedTime();

    /* -------------------------------------------------------------- */
    /* Scroll-driven rotation                                         */
    /* -------------------------------------------------------------- */

    const targetRotation = progress * Math.PI * 0.65;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation,
      3.5,
      delta,
    );

    /* -------------------------------------------------------------- */
    /* Vertical movement                                              */
    /* -------------------------------------------------------------- */

    const targetY = -0.2 + Math.sin(progress * Math.PI) * 0.3;

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      3.5,
      delta,
    );

    /* -------------------------------------------------------------- */
    /* Subtle idle movement                                           */
    /* -------------------------------------------------------------- */

    const idleRotation = Math.sin(time * 0.25) * 0.012;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      idleRotation,
      2,
      delta,
    );
  });

  return (
    <group
      ref={groupRef}
      position={[2.8, -0.2, 0]}
      scale={0.72}
    >
      {/* Main building */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.5, 7, 3]} />

        <meshStandardMaterial
          color="#181818"
          metalness={0.7}
          roughness={0.24}
        />
      </mesh>

      {/* Left volume */}
      <mesh position={[-2.6, -0.5, 0]}>
        <boxGeometry args={[0.8, 5.5, 2.8]} />

        <meshStandardMaterial
          color="#222222"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Right volume */}
      <mesh position={[2.6, 0.5, 0]}>
        <boxGeometry args={[0.8, 6, 2.6]} />

        <meshStandardMaterial
          color="#222222"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Gold vertical frames */}
      <mesh position={[-2.3, 0, 1.55]}>
        <boxGeometry args={[0.08, 7.3, 0.08]} />

        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[2.3, 0, 1.55]}>
        <boxGeometry args={[0.08, 7.3, 0.08]} />

        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Top frame */}
      <mesh position={[0, 3.55, 1.55]}>
        <boxGeometry args={[4.7, 0.08, 0.08]} />

        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Windows */}
      {Array.from({ length: 35 }).map((_, index) => {
        const floor = Math.floor(index / 5);
        const column = index % 5;

        return (
          <mesh
            key={`window-${index}`}
            position={[
              -1.35 + column * 0.675,
              -2.55 + floor * 0.85,
              1.57,
            ]}
          >
            <boxGeometry
              args={[0.42, 0.48, 0.05]}
            />

            <meshStandardMaterial
              color="#e7d58d"
              emissive="#d4af37"
              emissiveIntensity={1.15}
              metalness={0.3}
              roughness={0.15}
            />
          </mesh>
        );
      })}

      {/* Entrance */}
      <mesh position={[0, -2.35, 1.62]}>
        <boxGeometry args={[0.95, 1.7, 0.08]} />

        <meshStandardMaterial
          color="#080808"
          emissive="#6f5710"
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      {/* Entrance frames */}
      <mesh position={[-0.5, -1.5, 1.67]}>
        <boxGeometry args={[0.05, 1.8, 0.05]} />

        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0.5, -1.5, 1.67]}>
        <boxGeometry args={[0.05, 1.8, 0.05]} />

        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.65, 0]}>
        <boxGeometry args={[4.8, 0.25, 3.3]} />

        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Roof panel */}
      <mesh position={[0, 3.82, 0]}>
        <boxGeometry args={[3.2, 0.08, 2.5]} />

        <meshStandardMaterial
          color="#f2d675"
          emissive="#d4af37"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Balcony elements */}
      {Array.from({ length: 5 }).map((_, index) => (
        <mesh
          key={`balcony-${index}`}
          position={[
            0,
            -1.8 + index * 0.85,
            1.72,
          ]}
        >
          <boxGeometry
            args={[3.8, 0.045, 0.45]}
          />

          <meshStandardMaterial
            color="#303030"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* GROUND                                                                     */
/* -------------------------------------------------------------------------- */

function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3.6, 0]}
    >
      <planeGeometry args={[40, 40]} />

      <meshStandardMaterial
        color="#050505"
        metalness={0.5}
        roughness={0.7}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* LIGHTING                                                                   */
/* -------------------------------------------------------------------------- */

function Lighting() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[5, 10, 8]}
        intensity={4}
        color="#fff4d0"
      />

      <pointLight
        position={[-6, 3, 5]}
        intensity={35}
        distance={20}
        color="#d4af37"
      />

      <pointLight
        position={[8, 2, 2]}
        intensity={25}
        distance={18}
        color="#fff1c1"
      />

      <pointLight
        position={[0, 4, -6]}
        intensity={15}
        distance={15}
        color="#6f5710"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE                                                                      */
/* -------------------------------------------------------------------------- */

function Scene({
  progressRef,
}: ExperienceSceneProps) {
  return (
    <>
      <CameraController
        progressRef={progressRef}
      />

      <Lighting />

      <Building
        progressRef={progressRef}
      />

      <Ground />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* CANVAS                                                                     */
/* -------------------------------------------------------------------------- */

export default function ExperienceScene({
  progressRef,
}: ExperienceSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [8.5, 3.2, 16],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <Scene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}