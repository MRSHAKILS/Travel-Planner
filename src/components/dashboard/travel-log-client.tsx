"use client";

import { useState, useTransition } from "react";
import { buildContinentChart, toggleVisitedContinent } from "@/lib/travel-data";
import type { ContinentProgress, Destination, TravelStats } from "@/types/travel";
import { GlassPanel } from "@/components/ui/glass-panel";
import { StatTile } from "@/components/ui/stat-tile";

export function TravelLogClient({
  userId,
  initialStats,
  initialProgress,
  selectedDestination,
}: {
  userId: string;
  initialStats: TravelStats;
  initialProgress: ContinentProgress[];
  selectedDestination: Destination;
}) {
  const [progress, setProgress] = useState(initialProgress);
  const [pending, startTransition] = useTransition();
  const chart = buildContinentChart(progress);
  const visitedPercent = Math.round((chart.visited / progress.length) * 100);

  return (
    <div className="dashboard-grid">
      <section className="trip-summary-grid">
        <article className="trip-hero panel">
          <p className="panel-eyebrow">{selectedDestination.continent} itinerary</p>
          <h2>
            {selectedDestination.name}, {selectedDestination.country}
          </h2>
          <p>{selectedDestination.heroSummary}</p>
          <div className="trip-meta">
            <span>
              <strong>{selectedDestination.tripLength}</strong>
              trip length
            </span>
            <span>
              <strong>{selectedDestination.budget}</strong>
              budget range
            </span>
            <span>
              <strong>{selectedDestination.bestFor}</strong>
              best for
            </span>
          </div>
        </article>

        <article className="panel">
          <h2 className="panel-title">Trip Highlights</h2>
          <div className="highlight-list">
            {selectedDestination.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="stat-grid">
        <StatTile label="Trips Logged" value={initialStats.trips} />
        <StatTile label="Countries" value={initialStats.countries} />
        <StatTile label="Continents Visited" value={initialStats.continents} />
        <StatTile label="Wine Bottles" value={initialStats.wineBottles} />
      </section>

      <section className="content-grid">
        <GlassPanel title="Demo Timeline">
          <div className="timeline-list">
            {selectedDestination.timeline.map((item) => (
              <article key={`${item.time}-${item.title}`} className="timeline-item">
                <span>{item.time}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel title="Saved Plans">
          <div className="saved-plan-list">
            {selectedDestination.savedPlans.map((plan) => (
              <label key={plan} className="check-row">
                <input type="checkbox" defaultChecked />
                <span>{plan}</span>
              </label>
            ))}
          </div>
        </GlassPanel>
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

      <section className="case-study-panel panel">
        <p className="panel-eyebrow">Portfolio case study</p>
        <h2>Built to show product thinking, not just visual polish.</h2>
        <p>
          Wonderlust combines a Three.js globe, typed destination data, responsive dashboard layouts, Supabase-ready
          persistence, and accessible interaction states. The demo content is local-first so recruiters can review the
          product without needing an account or backend setup.
        </p>
      </section>
    </div>
  );
}
