"use client";
import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Object3D } from "three";
import clsx from "clsx";

export type ViewerPreset = "front" | "side" | "top";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="px-3 py-1 rounded-full bg-black/70 text-white text-xs">
        Loading {Math.round(progress)}%
      </div>
    </Html>
  );
}

function Model({ src }: { src: string }) {
  const gltf = useGLTF(src, true);
  const scene = (gltf as unknown as { scene: Object3D }).scene;
  return <primitive object={scene} dispose={null} />;
}

function FallbackPrimitive() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9CA3AF" />
    </mesh>
  );
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode; onError?: () => void }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError?.();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function CameraTweener({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();
  const desired = useMemo(() => ({ x: target[0], y: target[1], z: target[2] }), [target]);
  useFrame(() => {
    camera.position.x += (desired.x - camera.position.x) * 0.08;
    camera.position.y += (desired.y - camera.position.y) * 0.08;
    camera.position.z += (desired.z - camera.position.z) * 0.08;
    camera.updateProjectionMatrix();
  });
  return null;
}

export default function GLBViewer({
  src,
  autorotate = true,
  initialPreset = "front",
}: {
  src: string;
  autorotate?: boolean;
  initialPreset?: ViewerPreset;
}) {
  const [preset, setPreset] = useState<ViewerPreset>(initialPreset);
  const [failed, setFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const presets: Record<ViewerPreset, [number, number, number]> = {
    front: [2.2, 1.2, 2.2],
    side: [-2.0, 1.2, 2.2],
    top: [0.0, 4.0, 0.0],
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // Fullscreen failed
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[80vh] sm:h-[85vh] lg:h-[90vh] min-h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-slate-900/80 dark:to-slate-800/60 ring-2 ring-black/10 dark:ring-white/10 shadow-2xl"
    >
      <Canvas shadows camera={{ position: presets[preset], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Suspense fallback={<Loader />}>
          <ErrorBoundary onError={() => setFailed(true)}>
            {!failed ? <Model src={src} /> : <FallbackPrimitive />}
          </ErrorBoundary>
        </Suspense>
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} autoRotate={autorotate} autoRotateSpeed={0.4} />
        <CameraTweener target={presets[preset]} />
      </Canvas>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {(["front", "side", "top"] as ViewerPreset[]).map((p) => (
          <button
            key={p}
            onClick={() => setPreset(p)}
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-200",
              preset === p 
                ? "bg-accent text-white shadow-lg scale-105" 
                : "bg-white/90 dark:bg-slate-800/90 text-brand-900 dark:text-white hover:scale-105 shadow-md"
            )}
            aria-label={`View ${p}`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Fullscreen button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-full backdrop-blur-md bg-white/90 dark:bg-slate-800/90 hover:scale-105 transition-all duration-200 shadow-lg"
          aria-label="Toggle fullscreen"
          title="Fullscreen"
        >
          {isFullscreen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-900 dark:text-white">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-900 dark:text-white">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
      </div>

      {/* Info label */}
      <div className="absolute top-4 left-4">
        <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/90 dark:bg-slate-800/90 text-xs font-medium text-brand-900 dark:text-white shadow-md">
          🖱️ Drag to rotate • 🔍 Scroll to zoom
        </div>
      </div>
    </div>
  );
}
