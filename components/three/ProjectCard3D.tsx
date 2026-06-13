'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Card3DInner({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <RoundedBox ref={meshRef} args={[3.5, 2, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? '#7c3aed' : '#1a1a2a'}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </RoundedBox>
    </Float>
  );
}

export default function ProjectCard3D({ hovered }: { hovered: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent', pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={hovered ? '#7c3aed' : '#ffffff'} />
      <Card3DInner hovered={hovered} />
    </Canvas>
  );
}
