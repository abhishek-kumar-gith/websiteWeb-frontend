import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '../ErrorBoundary';

const ParticleField = ({ count = 5000 }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      // Generate random positions in a sphere
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 2.4; // x
        positions[i + 1] = (Math.random() - 0.5) * 2.4; // y
        positions[i + 2] = (Math.random() - 0.5) * 2.4; // z
      }
      ref.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.0001;
      ref.current.rotation.y -= 0.0001;
    }
  });

  return (
    <group>
      <Points ref={ref} stride={3} frustumCulled={false}>
        <PointMaterial
          color="#06b6d4"
          size={0.002}
          sizeAttenuation={true}
          transparent
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const ParticlesFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="text-center">
      <p className="text-gray-400 mb-2">Loading particles...</p>
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
);

const Particles = () => {
  return (
    <ErrorBoundary>
      <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
        <Suspense fallback={<ParticlesFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 1.5] }} 
            className="absolute inset-0 w-full h-full"
            gl={{ 
              antialias: true,
              precision: 'highp',
              failIfMajorPerformanceCaveat: false,
              alpha: true,
              powerPreference: 'high-performance'
            }}
            onCreated={(state) => {
              if (!state.gl) {
                console.error('Failed to initialize WebGL for particles');
              }
            }}
          >
            <ParticleField count={5000} />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Particles;
