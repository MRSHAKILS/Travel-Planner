"use client";

import { useMemo, useState } from "react";

type TravelMood = "culture" | "nature" | "food" | "road-trip";

type SuggestedPlace = {
  name: string;
  country: string;
  source: string;
  moods: TravelMood[];
  bestFor: string;
  plan: string[];
};

const suggestedPlaces: SuggestedPlace[] = [
  {
    name: "Jaffna",
    country: "Sri Lanka",
    source: "Lonely Planet 2026",
    moods: ["culture", "food"],
    bestFor: "temples, Tamil cuisine, and a slower northern Sri Lanka route",
    plan: ["Base near the fort", "Add a market breakfast walk", "Reserve a lagoon sunset drive"],
  },
  {
    name: "Sardinia",
    country: "Italy",
    source: "Lonely Planet 2026",
    moods: ["nature", "food"],
    bestFor: "wild beaches, island identity, and long coastal drives",
    plan: ["Start in Cagliari", "Split nights between coast and interior", "Add a low-key agriturismo dinner"],
  },
  {
    name: "Route 66",
    country: "USA",
    source: "National Geographic 2026",
    moods: ["road-trip", "culture"],
    bestFor: "classic Americana, roadside design, and an easy portfolio-friendly itinerary",
    plan: ["Pick a 5-day segment", "Save neon motel stops", "Build a photo checklist by state"],
  },
  {
    name: "Jeju-do",
    country: "South Korea",
    source: "Lonely Planet 2026",
    moods: ["nature", "food"],
    bestFor: "volcanic landscapes, seafood, and calm island loops",
    plan: ["Rent a car for the east coast", "Add sunrise at Seongsan Ilchulbong", "Save haenyeo food stops"],
  },
  {
    name: "Basque Country",
    country: "Spain",
    source: "National Geographic 2026",
    moods: ["culture", "food"],
    bestFor: "design cities, pintxos, coastlines, and strong culinary storytelling",
    plan: ["Start in Bilbao", "Add San Sebastian food crawl", "Keep one coastal hiking day open"],
  },
  {
    name: "Dolomites",
    country: "Italy",
    source: "National Geographic 2026",
    moods: ["nature", "road-trip"],
    bestFor: "alpine roads, lakes, and high-impact photography",
    plan: ["Base near Cortina", "Watch weather for Lago di Braies", "Add one cable-car viewpoint"],
  },
];

const moodLabels: Record<TravelMood, string> = {
  culture: "Culture",
  nature: "Nature",
  food: "Food",
  "road-trip": "Road Trip",
};

export function TravelPlanner() {
  const [selectedMood, setSelectedMood] = useState<TravelMood>("culture");
  const matches = useMemo(
    () => suggestedPlaces.filter((place) => place.moods.includes(selectedMood)).slice(0, 3),
    [selectedMood],
  );

  return (
    <section className="planner-section" aria-labelledby="planner-title">
      <div className="planner-copy">
        <p className="eyebrow">Smart Suggestions</p>
        <h2 id="planner-title">Ask Wonderlust what kind of trip fits your mood.</h2>
        <p>
          Choose a travel style and get a recruiter-friendly demo recommendation using curated 2026 destination lists.
        </p>
      </div>

      <div className="planner-panel">
        <div className="mood-tabs" aria-label="Travel preference">
          {(Object.keys(moodLabels) as TravelMood[]).map((mood) => (
            <button
              key={mood}
              className={`mood-tab${selectedMood === mood ? " mood-tab-active" : ""}`}
              onClick={() => setSelectedMood(mood)}
            >
              {moodLabels[mood]}
            </button>
          ))}
        </div>

        <div className="suggestion-grid">
          {matches.map((place) => (
            <article key={`${place.name}-${place.country}`} className="suggestion-card">
              <span>{place.source}</span>
              <h3>
                {place.name}, {place.country}
              </h3>
              <p>{place.bestFor}</p>
              <ul>
                {place.plan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
