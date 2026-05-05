import type { ContinentProgress, Destination, TravelStats } from "@/types/travel";
import { supabase } from "@/lib/supabase/client";

const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    lat: 35.0116,
    lng: 135.7681,
    spotlight: "Temple trails and late-night ramen corners.",
  },
  {
    id: "2",
    name: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    lat: 38.7223,
    lng: -9.1393,
    spotlight: "Sunset miradouros and tram-window city views.",
  },
  {
    id: "3",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    lat: -33.9249,
    lng: 18.4241,
    spotlight: "Ocean drives, vineyards, and mountain air.",
  },
  {
    id: "4",
    name: "Reykjavik",
    country: "Iceland",
    continent: "Europe",
    lat: 64.1466,
    lng: -21.9426,
    spotlight: "Thermal lagoons, lava fields, and midnight-sun road trips.",
  },
  {
    id: "5",
    name: "Marrakesh",
    country: "Morocco",
    continent: "Africa",
    lat: 31.6295,
    lng: -7.9811,
    spotlight: "Courtyard riads, spice markets, and desert-edge evenings.",
  },
  {
    id: "6",
    name: "Queenstown",
    country: "New Zealand",
    continent: "Oceania",
    lat: -45.0312,
    lng: 168.6626,
    spotlight: "Alpine lake views with a little adrenaline built in.",
  },
];

const allContinents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"];

export async function getDestinations(): Promise<Destination[]> {
  const { data, error } = await supabase.from("destinations").select("*");
  if (error || !data) return mockDestinations;
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    continent: row.continent,
    lat: row.lat,
    lng: row.lng,
    spotlight: row.spotlight,
  }));
}

export async function getContinentProgress(userId: string): Promise<ContinentProgress[]> {
  const { data, error } = await supabase.from("continent_progress").select("*").eq("user_id", userId);
  if (error || !data) {
    return allContinents.map((continent, idx) => ({ continent, visited: idx < 3 }));
  }

  return allContinents.map((continent) => ({
    continent,
    visited: Boolean(data.find((entry) => entry.continent === continent)?.visited),
  }));
}

export async function toggleVisitedContinent(userId: string, continent: string, visited: boolean): Promise<void> {
  await supabase.from("continent_progress").upsert({ user_id: userId, continent, visited });
}

export async function getUserTravelStats(userId: string): Promise<TravelStats> {
  const { data, error } = await supabase.from("travel_stats").select("*").eq("user_id", userId).single();
  if (error || !data) {
    return { trips: 24, countries: 16, continents: 3, wineBottles: 39 };
  }
  return {
    trips: data.trips ?? 0,
    countries: data.countries ?? 0,
    continents: data.continents ?? 0,
    wineBottles: data.wine_bottles ?? 0,
  };
}

export function buildContinentChart(progress: ContinentProgress[]) {
  const visited = progress.filter((c) => c.visited).length;
  const remaining = progress.length - visited;
  return { visited, remaining };
}
