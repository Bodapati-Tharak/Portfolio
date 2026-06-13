'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Particle field component
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#7c3aed"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating geometric shapes
function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
  distort = 0.3,
}: {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'box' | 'octahedron';
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.4;
    }
  });

  const GeoComponent = () => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[1, 0.3, 16, 100]} />;
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.2]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <GeoComponent />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={geometry === 'box'}
        />
      </mesh>
    </Float>
  );
}

// Grid / ground plane
function GridPlane() {
  return (
    <gridHelper
      args={[50, 50, '#1a1a2a', '#1a1a2a']}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Main glowing orb
function CentralOrb() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      const t = state.clock.getElapsedTime();
      sphereRef.current.scale.setScalar(1 + Math.sin(t) * 0.05);
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c3aed"
        transparent
        opacity={0.12}
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={1}
      />
    </Sphere>
  );
}

// Mouse-tracking camera controller
function CameraController({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  useFrame((state) => {
    state.camera.position.x += (mousePosition.x * 2 - state.camera.position.x) * 0.05;
    state.camera.position.y += (-mousePosition.y * 1 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

interface HeroSceneProps {
  mousePosition: { x: number; y: number };
}

export default function HeroScene({ mousePosition }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <CameraController mousePosition={mousePosition} />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#7c3aed" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a78bfa" />
      <spotLight position={[0, 10, 0]} intensity={0.4} color="#8b5cf6" angle={0.3} />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Particle field */}
      <ParticleField />

      {/* Central orb */}
      <CentralOrb />

      {/* Floating shapes */}
      <FloatingShape position={[-5, 2, -3]} geometry="torus" color="#7c3aed" speed={0.8} />
      <FloatingShape position={[5, -1, -4]} geometry="octahedron" color="#8b5cf6" speed={1.2} />
      <FloatingShape position={[3, 3, -2]} geometry="box" color="#6d28d9" speed={0.6} distort={0.2} />
      <FloatingShape position={[-4, -2, -3]} geometry="sphere" color="#a78bfa" speed={1} distort={0.5} />
      <FloatingShape position={[0, 4, -5]} geometry="torus" color="#7c3aed" speed={0.5} />

      {/* Grid */}
      <GridPlane />

      {/* Environment */}
      <Environment preset="night" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#06060a', 15, 40]} />
    </Canvas>
  );
}
