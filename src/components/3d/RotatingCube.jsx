import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ErrorBoundary from '../ErrorBoundary';

const RotatingCubeContent = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} />
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial
          color="#06b6d4"
          wireframe={false}
          emissive="#0891b2"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 2.5]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhongMaterial
          color="#0ea5e9"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <ambientLight intensity={0.4} />
    </>
  );
};

const RotatingCubeFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="text-center">
      <p className="text-gray-400 mb-2">Loading 3D...</p>
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
);

const RotatingCube = () => {
  return (
    <ErrorBoundary>
      <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
        <Suspense fallback={<RotatingCubeFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 5] }} 
            className="w-full h-full"
            gl={{ 
              antialias: true,
              precision: 'highp',
              failIfMajorPerformanceCaveat: false,
              alpha: true,
              powerPreference: 'high-performance'
            }}
            onCreated={(state) => {
              if (!state.gl) {
                console.error('Failed to initialize WebGL');
              }
            }}
          >
            <RotatingCubeContent />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default RotatingCube;
