"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import type { Destination } from "@/types/travel";

function Earth({ destinations, onPinSelect }: { destinations: Destination[]; onPinSelect: (d: Destination) => void }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#5f7dff",
        metalness: 0.15,
        roughness: 0.6,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.18;
  });

  return (
    <group>
      <mesh ref={mesh} material={material}>
        <sphereGeometry args={[1.55, 64, 64]} />
      </mesh>
      {destinations.map((destination) => {
        const phi = ((90 - destination.lat) * Math.PI) / 180;
        const theta = ((destination.lng + 180) * Math.PI) / 180;
        const radius = 1.64;
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        return (
          <mesh
            key={destination.id}
            position={[x, y, z]}
            onClick={(event) => {
              event.stopPropagation();
              onPinSelect(destination);
            }}
          >
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#6adfff" emissive="#2ecdf2" emissiveIntensity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

export function GlobeView({ destinations }: { destinations: Destination[] }) {
  const [selected, setSelected] = useState<Destination | null>(null);
  const router = useRouter();

  return (
    <div
      className="glass"
      style={{
        borderRadius: "var(--radius-lg)",
        minHeight: "66vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 0.4, 4.8], fov: 38 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 3, 3]} intensity={16} />
        <Earth destinations={destinations} onPinSelect={setSelected} />
        <OrbitControls enablePan={false} minDistance={2.3} maxDistance={8} />
      </Canvas>
      {selected ? (
        <div
          className="glass"
          style={{
            position: "absolute",
            bottom: 18,
            left: 18,
            right: 18,
            borderRadius: "var(--radius-md)",
            padding: "0.8rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div>
            <strong>
              {selected.name}, {selected.country}
            </strong>
            <p style={{ margin: "0.3rem 0 0", color: "var(--text-soft)", fontSize: 14 }}>{selected.spotlight}</p>
          </div>
          <button
            onClick={() => router.push("/travel-log")}
            style={{
              background: "linear-gradient(120deg, #59d9ff, #7590ff)",
              border: 0,
              color: "#06203a",
              borderRadius: 999,
              padding: "0.55rem 1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Open Log
          </button>
        </div>
      ) : null}
    </div>
  );
}
