import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ErrorBoundary from '../ErrorBoundary';

const FloatingObject = ({ position, scale, color, speed }) => {
  const meshRef = useRef();
  const initialPosition = position;
  let time = 0;

  useFrame(() => {
    if (meshRef.current) {
      time += speed;
      meshRef.current.position.y = initialPosition[1] + Math.sin(time) * 0.5;
      meshRef.current.position.x = initialPosition[0] + Math.cos(time * 0.7) * 0.3;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry />
      <meshPhongMaterial
        color={color}
        wireframe={false}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const FloatingObjectsScene = () => {
  const objects = [
    { position: [-3, 2, -2], scale: 0.8, color: '#06b6d4', speed: 0.03 },
    { position: [3, 1, -1], scale: 1, color: '#0ea5e9', speed: 0.02 },
    { position: [0, -2, 0], scale: 0.6, color: '#06b6d4', speed: 0.025 },
    { position: [-2, -1, 1], scale: 0.7, color: '#0891b2', speed: 0.035 },
    { position: [2, 2, -2], scale: 0.9, color: '#0ea5e9', speed: 0.02 },
  ];

  return (
    <>
      {objects.map((obj, index) => (
        <FloatingObject key={index} {...obj} />
      ))}
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <ambientLight intensity={0.4} />
    </>
  );
};

const FloatingObjectsFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="text-center">
      <p className="text-gray-400 mb-2">Loading 3D objects...</p>
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
);

const FloatingObjects = () => {
  return (
    <ErrorBoundary>
      <div className="w-full h-full relative" style={{ minHeight: '500px' }}>
        <Suspense fallback={<FloatingObjectsFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 8] }} 
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
                console.error('Failed to initialize WebGL for floating objects');
              }
            }}
          >
            <FloatingObjectsScene />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default FloatingObjects;
