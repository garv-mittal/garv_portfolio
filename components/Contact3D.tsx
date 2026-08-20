'use client';
import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Torus, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function MinimalRings() {
  const { viewport } = useThree();
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  
  // Base scaling to fit viewport elegantly
  const isMobile = viewport.width < 5;
  const baseScale = isMobile ? viewport.width * 0.45 : 1;
  const positionY = isMobile ? 1.5 : 0.5;

  useFrame((state) => {
    if (!ring1.current || !ring2.current || !ring3.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow, independent rotations for a serene, aerospace feel
    ring1.current.rotation.x = time * 0.1;
    ring1.current.rotation.y = time * 0.05;
    
    ring2.current.rotation.x = time * -0.05;
    ring2.current.rotation.z = time * 0.08;
    
    ring3.current.rotation.y = time * -0.12;
    ring3.current.rotation.z = time * -0.04;
  });

  return (
    <group position={[0, positionY, 0]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Torus ref={ring1} args={[2.5 * baseScale, 0.005, 16, 100]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </Torus>
        <Torus ref={ring2} args={[3.2 * baseScale, 0.005, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </Torus>
        <Torus ref={ring3} args={[1.8 * baseScale, 0.005, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </Torus>
      </Float>
    </group>
  );
}

export default function Contact3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-difference opacity-80 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <MinimalRings />
        <Sparkles count={50} scale={10} size={1} speed={0.2} opacity={0.2} color="#ffffff" />
      </Canvas>
    </div>
  );
}
