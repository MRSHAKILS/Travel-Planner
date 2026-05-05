"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { Destination } from "@/types/travel";

function toVector(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, "#dff8f6");
  ocean.addColorStop(0.48, "#9edbd8");
  ocean.addColorStop(1, "#7cc6c3");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.34)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const project = (lng: number, lat: number) => [
    ((lng + 180) / 360) * canvas.width,
    ((90 - lat) / 180) * canvas.height,
  ];

  const drawLand = (points: Array<[number, number]>, color: string) => {
    ctx.beginPath();
    points.forEach(([lng, lat], index) => {
      const [x, y] = project(lng, lat);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(38, 49, 77, 0.18)";
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();
  };

  drawLand(
    [
      [-167, 66],
      [-135, 72],
      [-95, 56],
      [-78, 30],
      [-94, 15],
      [-122, 22],
      [-146, 48],
    ],
    "#eff5df",
  );
  drawLand(
    [
      [-82, 11],
      [-51, 5],
      [-37, -21],
      [-55, -56],
      [-75, -30],
    ],
    "#d6ead6",
  );
  drawLand(
    [
      [-12, 36],
      [30, 58],
      [72, 50],
      [62, 22],
      [28, 4],
      [-7, 22],
    ],
    "#f0ead3",
  );
  drawLand(
    [
      [-18, 31],
      [34, 32],
      [50, 4],
      [28, -35],
      [5, -34],
      [-16, 5],
    ],
    "#eadfbe",
  );
  drawLand(
    [
      [45, 55],
      [110, 66],
      [150, 45],
      [135, 6],
      [78, 10],
      [48, 30],
    ],
    "#e3eed9",
  );
  drawLand(
    [
      [112, -12],
      [154, -18],
      [146, -43],
      [118, -36],
    ],
    "#f2dfbd",
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function DestinationPin({
  destination,
  onSelect,
}: {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}) {
  const position = toVector(destination.lat, destination.lng, 1.72);

  return (
    <group position={position}>
      <mesh onClick={(event) => {
        event.stopPropagation();
        onSelect(destination);
      }}>
        <sphereGeometry args={[0.04, 20, 20]} />
        <meshStandardMaterial color="#ef775a" emissive="#ef775a" emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshBasicMaterial color="#ef775a" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function Earth({ destinations, onPinSelect }: { destinations: Destination[]; onPinSelect: (d: Destination) => void }) {
  const globe = useRef<THREE.Group>(null);
  const earthTexture = useMemo(() => createEarthTexture(), []);

  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={globe} rotation={[0.08, -0.55, -0.08]}>
      <mesh>
        <sphereGeometry args={[1.66, 96, 96]} />
        <meshStandardMaterial map={earthTexture} roughness={0.72} metalness={0.02} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.675, 48, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.77, 64, 64]} />
        <meshBasicMaterial color="#77d6d1" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      {destinations.map((destination) => (
        <DestinationPin key={destination.id} destination={destination} onSelect={onPinSelect} />
      ))}
    </group>
  );
}

export function GlobeView({ destinations }: { destinations: Destination[] }) {
  const [selected, setSelected] = useState<Destination | null>(destinations[0] ?? null);
  const router = useRouter();

  return (
    <section className="globe-stage" aria-label="Interactive destination globe">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.16, 5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 3, 5]} intensity={2.1} color="#ffffff" />
        <directionalLight position={[-4, -1, -3]} intensity={0.55} color="#ef775a" />
        <Earth destinations={destinations} onPinSelect={setSelected} />
        <OrbitControls enablePan={false} minDistance={3.1} maxDistance={7} rotateSpeed={0.65} />
      </Canvas>

      {selected ? (
        <div className="destination-dock">
          <div>
            <strong className="dock-title">
              {selected.name}, {selected.country}
            </strong>
            <p className="dock-copy">{selected.spotlight}</p>
          </div>
          <button className="primary-button" onClick={() => router.push("/travel-log")}>
            Open Log
          </button>
        </div>
      ) : null}
    </section>
  );
}
