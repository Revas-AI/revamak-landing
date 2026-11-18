"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Layer configuration
const LAYER_SIZES = [16, 12, 8, 4, 1];
const LAYER_RADII = [2.1, 1.6, 1.1, 0.55, 0];
const LAYER_X = [-3.2, -1.6, 0, 1.5, 3.0];
const LAYER_COLORS = [0x4a4a51, 0x6e6c67, 0xb9b5ab, 0xeeece6];
const EMBER = 0xd2572b;

interface ModelProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

function NeuralNetworkModel({ mouseX, mouseY, scrollProgress }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulsesRef = useRef<THREE.Mesh[]>([]);

  // Generate node positions for each layer
  const layers = useMemo(() => {
    const result: THREE.Vector3[][] = [];

    for (let l = 0; l < LAYER_SIZES.length; l++) {
      const pts: THREE.Vector3[] = [];
      const count = LAYER_SIZES[l];
      const radius = LAYER_RADII[l];
      const x = LAYER_X[l];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const y = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        pts.push(new THREE.Vector3(x, y, z));
      }
      result.push(pts);
    }
    return result;
  }, []);

  // Generate edge vertices
  const edgeVertices = useMemo(() => {
    const verts: number[] = [];
    for (let l = 0; l < layers.length - 1; l++) {
      layers[l].forEach((a) => {
        layers[l + 1].forEach((b) => {
          verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
        });
      });
    }
    return new Float32Array(verts);
  }, [layers]);

  // Initialize pulses with deterministic values
  const pulseData = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      pathIndices: layers.map((layer) => i % layer.length),
      progress: (i * 0.04) % 1,
      speed: 0.3 + (i % 5) * 0.04,
    }))
  );

  // Animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate based on mouse position
      const targetRotationY = mouseX * 0.4;
      const targetRotationX = -mouseY * 0.3;

      // Add scroll-based pull back
      const scrollZ = scrollProgress * 3;

      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.position.z = -scrollZ;
    }

    // Animate pulses
    pulsesRef.current.forEach((pulse, i) => {
      if (!pulse) return;
      const data = pulseData.current[i];
      data.progress += delta * data.speed;

      if (data.progress >= 1) {
        data.progress = 0;
        // Rotate path indices
        data.pathIndices = data.pathIndices.map((idx, l) =>
          (idx + 1) % layers[l].length
        );
      }

      // Interpolate position along path
      const totalSegments = layers.length - 1;
      const segment = Math.floor(data.progress * totalSegments);
      const segmentProgress = (data.progress * totalSegments) % 1;

      if (segment < totalSegments) {
        const startLayer = layers[segment];
        const endLayer = layers[segment + 1];
        const start = startLayer[data.pathIndices[segment] % startLayer.length];
        const end = endLayer[data.pathIndices[segment + 1] % endLayer.length];
        pulse.position.lerpVectors(start, end, segmentProgress);
        pulse.visible = true;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {/* Nodes */}
      {layers.map((layer, layerIdx) =>
        layer.map((pos, nodeIdx) => {
          const isOutput = layerIdx === layers.length - 1;
          const color = isOutput ? EMBER : LAYER_COLORS[Math.min(layerIdx, LAYER_COLORS.length - 1)];

          return (
            <mesh key={`${layerIdx}-${nodeIdx}`} position={pos}>
              <sphereGeometry args={[isOutput ? 0.18 : 0.09, 20, 20]} />
              <meshStandardMaterial
                color={color}
                roughness={isOutput ? 0.3 : 0.45}
                metalness={0.1}
                emissive={isOutput ? EMBER : 0x000000}
                emissiveIntensity={isOutput ? 0.9 : 0}
              />
            </mesh>
          );
        })
      )}

      {/* Output node halo */}
      <mesh position={layers[4][0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color={EMBER}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgeVertices, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={0x3a3a3f} transparent opacity={0.25} />
      </lineSegments>

      {/* Pulses */}
      {pulseData.current.map((_, i) => (
        <mesh
          key={`pulse-${i}`}
          ref={(el) => {
            if (el) pulsesRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={EMBER} />
        </mesh>
      ))}
    </group>
  );
}

export function NeuralNetwork3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      // Calculate scroll progress within hero section
      const heroHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / heroHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <NeuralNetworkModel
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}

// Fallback SVG for when WebGL is not available
export function NeuralNetworkFallback() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
      <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
        {/* Layer 1 - 16 nodes */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const x = 60 + Math.cos(angle) * 80;
          const y = 150 + Math.sin(angle) * 80;
          return <circle key={`l1-${i}`} cx={x} cy={y} r={4} fill="#4a4a51" />;
        })}
        {/* Layer 2 - 12 nodes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = 140 + Math.cos(angle) * 60;
          const y = 150 + Math.sin(angle) * 60;
          return <circle key={`l2-${i}`} cx={x} cy={y} r={4} fill="#6e6c67" />;
        })}
        {/* Layer 3 - 8 nodes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 220 + Math.cos(angle) * 40;
          const y = 150 + Math.sin(angle) * 40;
          return <circle key={`l3-${i}`} cx={x} cy={y} r={4} fill="#b9b5ab" />;
        })}
        {/* Layer 4 - 4 nodes */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = 300 + Math.cos(angle) * 20;
          const y = 150 + Math.sin(angle) * 20;
          return <circle key={`l4-${i}`} cx={x} cy={y} r={4} fill="#eeece6" />;
        })}
        {/* Output node */}
        <circle cx={360} cy={150} r={12} fill="#D2572B" />
        <circle cx={360} cy={150} r={20} fill="#D2572B" opacity={0.2} />
      </svg>
    </div>
  );
}
