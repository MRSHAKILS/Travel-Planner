"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const land = "#e9eed8";
  const dry = "#eadfbd";
  const green = "#d7ead5";
  const ice = "#f6f7ef";

  drawLand(
    [
      [-168, 71],
      [-141, 70],
      [-126, 57],
      [-123, 48],
      [-117, 32],
      [-96, 24],
      [-82, 26],
      [-66, 45],
      [-53, 50],
      [-66, 59],
      [-95, 70],
      [-130, 72],
    ],
    land,
  );
  drawLand(
    [
      [-73, 83],
      [-18, 80],
      [-16, 70],
      [-40, 61],
      [-52, 65],
      [-62, 75],
    ],
    ice,
  );
  drawLand(
    [
      [-116, 31],
      [-102, 22],
      [-91, 17],
      [-83, 9],
      [-79, 8],
      [-86, 18],
      [-98, 26],
    ],
    dry,
  );
  drawLand(
    [
      [-80, 11],
      [-63, 8],
      [-50, -1],
      [-35, -9],
      [-39, -23],
      [-51, -35],
      [-58, -54],
      [-70, -47],
      [-76, -24],
      [-82, -4],
    ],
    green,
  );
  drawLand(
    [
      [-10, 36],
      [0, 51],
      [16, 58],
      [31, 56],
      [41, 45],
      [28, 37],
      [11, 36],
      [2, 42],
    ],
    land,
  );
  drawLand(
    [
      [-17, 33],
      [10, 37],
      [31, 31],
      [51, 12],
      [43, -12],
      [30, -35],
      [18, -35],
      [8, -18],
      [-7, 5],
      [-16, 18],
    ],
    dry,
  );
  drawLand(
    [
      [31, 56],
      [59, 68],
      [105, 73],
      [142, 61],
      [164, 51],
      [142, 36],
      [122, 22],
      [105, 18],
      [88, 7],
      [73, 19],
      [61, 30],
      [45, 38],
    ],
    land,
  );
  drawLand(
    [
      [44, 29],
      [58, 25],
      [67, 13],
      [55, 10],
      [46, 18],
    ],
    dry,
  );
  drawLand(
    [
      [68, 24],
      [89, 23],
      [79, 8],
      [72, 6],
    ],
    green,
  );
  drawLand(
    [
      [95, 20],
      [121, 20],
      [118, 2],
      [106, -7],
      [96, 6],
    ],
    green,
  );
  drawLand(
    [
      [129, 45],
      [146, 44],
      [145, 31],
      [132, 32],
    ],
    green,
  );
  drawLand(
    [
      [112, -12],
      [154, -18],
      [146, -43],
      [118, -36],
    ],
    dry,
  );
  drawLand(
    [
      [167, -34],
      [178, -38],
      [173, -46],
      [166, -44],
    ],
    green,
  );
  drawLand(
    [
      [-180, -66],
      [-120, -72],
      [-40, -68],
      [40, -73],
      [120, -67],
      [180, -70],
      [180, -90],
      [-180, -90],
    ],
    ice,
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function DestinationPin({
  destination,
  active,
  onSelect,
}: {
  destination: Destination;
  active: boolean;
  onSelect: (destination: Destination) => void;
}) {
  const position = toVector(destination.lat, destination.lng, 1.72);

  return (
    <group position={position}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect(destination);
        }}
      >
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect(destination);
        }}
      >
        <sphereGeometry args={[active ? 0.055 : 0.04, 20, 20]} />
        <meshStandardMaterial
          color={active ? "#26314d" : "#ef775a"}
          emissive={active ? "#26314d" : "#ef775a"}
          emissiveIntensity={active ? 0.35 : 0.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[active ? 0.11 : 0.075, 20, 20]} />
        <meshBasicMaterial color={active ? "#26314d" : "#ef775a"} transparent opacity={active ? 0.2 : 0.16} />
      </mesh>
      {active ? (
        <Html position={[0.14, 0.12, 0]} center distanceFactor={9} zIndexRange={[20, 0]}>
          <div className="map-pin-label">
            <strong>{destination.name}</strong>
            <span>{destination.country}</span>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function getFocusQuaternion(destination: Destination) {
  const target = toVector(destination.lat, destination.lng, 1).normalize();
  return new THREE.Quaternion().setFromUnitVectors(target, new THREE.Vector3(0, 0, 1));
}

function Earth({
  destinations,
  focusedDestination,
  onPinSelect,
}: {
  destinations: Destination[];
  focusedDestination: Destination | null;
  onPinSelect: (d: Destination) => void;
}) {
  const globe = useRef<THREE.Group>(null);
  const introElapsed = useRef(0);
  const earthTexture = useMemo(() => createEarthTexture(), []);
  const focusQuaternion = useMemo(
    () => (focusedDestination ? getFocusQuaternion(focusedDestination) : null),
    [focusedDestination],
  );

  useFrame((_, delta) => {
    if (!globe.current) return;
    introElapsed.current += delta;
    if (introElapsed.current < 2.2) {
      globe.current.rotation.y += delta * 0.22;
    } else if (focusQuaternion) {
      globe.current.quaternion.slerp(focusQuaternion, 1 - Math.pow(0.04, delta));
    } else {
      globe.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={globe}>
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
        <DestinationPin
          key={destination.id}
          destination={destination}
          active={destination.id === focusedDestination?.id}
          onSelect={onPinSelect}
        />
      ))}
    </group>
  );
}

export function GlobeView({ destinations }: { destinations: Destination[] }) {
  const [selected, setSelected] = useState<Destination | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const router = useRouter();
  const selectDestination = useCallback((destination: Destination, source: "auto" | "manual" = "manual") => {
    setSelected(destination);
    window.localStorage.setItem("wonderlust:selectedDestination", destination.slug);
    window.dispatchEvent(new CustomEvent("wonderlust:destination-change", { detail: destination.slug }));
    if (source === "manual") setAutoPlay(false);
  }, []);
  const featured = selected ?? destinations[0] ?? null;

  useEffect(() => {
    const savedSlug = window.localStorage.getItem("wonderlust:selectedDestination");
    const savedDestination = destinations.find((destination) => destination.slug === savedSlug);
    const timer = window.setTimeout(() => {
      const destination = savedDestination ?? destinations[0];
      if (destination) selectDestination(destination, "auto");
    }, 2300);
    return () => window.clearTimeout(timer);
  }, [destinations, selectDestination]);

  useEffect(() => {
    if (!autoPlay || destinations.length < 2) return;
    const timer = window.setInterval(() => {
      setSelected((current) => {
        const currentIndex = Math.max(
          0,
          destinations.findIndex((destination) => destination.id === current?.id),
        );
        const next = destinations[(currentIndex + 1) % destinations.length];
        window.localStorage.setItem("wonderlust:selectedDestination", next.slug);
        window.dispatchEvent(new CustomEvent("wonderlust:destination-change", { detail: next.slug }));
        return next;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [autoPlay, destinations]);

  return (
    <section className="globe-stage" aria-label="Interactive destination globe">
      <div className="globe-canvas-panel">
        <div className="globe-kicker">
          <span>Live atlas</span>
          <strong>{destinations.length} pins</strong>
        </div>
        <Canvas
          dpr={[1, 1.7]}
          camera={{ position: [0, 0.02, 6.15], fov: 30 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.32} />
          <directionalLight position={[3, 3, 5]} intensity={2.15} color="#ffffff" />
          <directionalLight position={[-4, -1, -3]} intensity={0.6} color="#ef775a" />
          <Earth destinations={destinations} focusedDestination={selected} onPinSelect={selectDestination} />
          <OrbitControls enablePan={false} minDistance={4.8} maxDistance={8.2} rotateSpeed={0.65} />
        </Canvas>
      </div>

      {featured ? (
        <aside className="destination-panel" aria-label="Selected destination details">
          <div className="featured-destination">
            <p className="panel-eyebrow">{featured.continent}</p>
            <h2>
              {featured.name}, {featured.country}
            </h2>
            <p>{featured.heroSummary}</p>
            <button className="primary-button" onClick={() => router.push(`/travel-log?destination=${featured.slug}`)}>
              Open Travel Log
            </button>
          </div>

          <div className="route-stats" aria-label="Trip snapshot">
            <span>
              <strong>{featured.plannedMiles}</strong>
              planned miles
            </span>
            <span>
              <strong>{featured.curatedStays}</strong>
              curated stays
            </span>
          </div>

          <div className="carousel-status">
            <span>{autoPlay ? "Auto touring destinations" : "Manual selection"}</span>
            <button onClick={() => setAutoPlay((value) => !value)}>{autoPlay ? "Pause" : "Resume"}</button>
          </div>

          <div className="destination-stack">
            {destinations.map((destination) => (
              <button
                key={destination.id}
                className={`destination-card${destination.id === featured.id ? " destination-card-active" : ""}`}
                onClick={() => selectDestination(destination)}
              >
                <span>
                  <strong>
                    {destination.name}, {destination.country}
                  </strong>
                  <small>{destination.spotlight}</small>
                </span>
                <em>{destination.continent}</em>
              </button>
            ))}
          </div>
        </aside>
      ) : null}
    </section>
  );
}
