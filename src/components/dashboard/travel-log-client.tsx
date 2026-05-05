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
    <div className="dashboard-grid">
      <section className="stat-grid">
        <StatTile label="Trips Logged" value={initialStats.trips} />
        <StatTile label="Countries" value={initialStats.countries} />
        <StatTile label="Continents Visited" value={initialStats.continents} />
        <StatTile label="Wine Bottles" value={initialStats.wineBottles} />
      </section>

      <section className="content-grid">
        <GlassPanel title="Continents Checklist">
          <div className="checklist-grid">
            {progress.map((item) => (
              <label
                key={item.continent}
                className="check-row"
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
          <p className="sync-note">{pending ? "Syncing updates..." : "Progress is synced to your account."}</p>
        </GlassPanel>

        <GlassPanel title="Coverage">
          <div
            aria-label="Donut chart"
            className="donut"
            style={{ background: `conic-gradient(var(--accent-sea) ${visitedPercent}%, #efe9dc ${visitedPercent}% 100%)` }}
          >
            <div className="donut-center">{visitedPercent}%</div>
          </div>
          <p className="chart-caption">
            {chart.visited} visited / {chart.remaining} remaining
          </p>
        </GlassPanel>
      </section>
    </div>
  );
}
