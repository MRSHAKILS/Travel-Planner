"use client";

import { useState, useTransition } from "react";
import { buildContinentChart, toggleVisitedContinent } from "@/lib/travel-data";
import type { ContinentProgress, TravelStats } from "@/types/travel";
import { GlassPanel } from "@/components/ui/glass-panel";
import { StatTile } from "@/components/ui/stat-tile";

export function TravelLogClient({
  userId,
  initialStats,
  initialProgress,
}: {
  userId: string;
  initialStats: TravelStats;
  initialProgress: ContinentProgress[];
}) {
  const [progress, setProgress] = useState(initialProgress);
  const [pending, startTransition] = useTransition();
  const chart = buildContinentChart(progress);
  const visitedPercent = Math.round((chart.visited / progress.length) * 100);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        <StatTile label="Trips Logged" value={initialStats.trips} />
        <StatTile label="Countries" value={initialStats.countries} />
        <StatTile label="Continents Visited" value={initialStats.continents} />
        <StatTile label="Wine Bottles" value={initialStats.wineBottles} />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1rem" }}>
        <GlassPanel title="Continents Checklist">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
            {progress.map((item) => (
              <label
                key={item.continent}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  background: "rgba(0,0,0,0.12)",
                  borderRadius: 12,
                  padding: "0.5rem 0.7rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.visited}
                  onChange={(event) => {
                    const visited = event.target.checked;
                    setProgress((prev) => prev.map((p) => (p.continent === item.continent ? { ...p, visited } : p)));
                    startTransition(() => {
                      toggleVisitedContinent(userId, item.continent, visited);
                    });
                  }}
                />
                <span>{item.continent}</span>
              </label>
            ))}
          </div>
          <p style={{ color: "var(--text-soft)", marginBottom: 0 }}>
            {pending ? "Syncing updates..." : "Progress is synced to your account."}
          </p>
        </GlassPanel>

        <GlassPanel title="Coverage">
          <div
            aria-label="Donut chart"
            style={{
              width: 170,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              margin: "0.5rem auto 0",
              background: `conic-gradient(#65dbff ${visitedPercent}%, rgba(255,255,255,0.12) ${visitedPercent}% 100%)`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                width: 110,
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                background: "rgba(4, 18, 33, 0.9)",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
              }}
            >
              {visitedPercent}%
            </div>
          </div>
          <p style={{ textAlign: "center", color: "var(--text-soft)" }}>
            {chart.visited} visited / {chart.remaining} remaining
          </p>
        </GlassPanel>
      </section>
    </div>
  );
}
