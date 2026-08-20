'use client';
import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function ResponsiveGeometry() {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  
  // Responsive scale based on viewport width
  // Mobile devices typically have viewport.width < 5 in this camera setup
  const isMobile = viewport.width < 5;
  const baseScale = isMobile ? viewport.width * 0.45 : 2;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Interactive mouse tracking
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = time * -0.1;
      wireframeRef.current.rotation.y = time * -0.05;
      wireframeRef.current.position.x += (targetX - wireframeRef.current.position.x) * 0.05;
      wireframeRef.current.position.y += (targetY - wireframeRef.current.position.y) * 0.05;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} scale={baseScale}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial 
            color="#ffffff" 
            distort={0.4} 
            speed={2} 
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh ref={wireframeRef} scale={baseScale * 1.15}>
           <icosahedronGeometry args={[1, 2]} />
           <meshBasicMaterial 
             color="#ffffff" 
             wireframe 
             transparent 
             opacity={0.15} 
           />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-difference opacity-90">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ResponsiveGeometry />
        <Sparkles count={100} scale={12} size={1.5} speed={0.4} opacity={0.3} color="#ffffff" />
      </Canvas>
    </div>
  );
}
