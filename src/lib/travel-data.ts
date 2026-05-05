import type { ContinentProgress, Destination, TravelStats } from "@/types/travel";
import { supabase } from "@/lib/supabase/client";

export const demoDestinations: Destination[] = [
  {
    id: "1",
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    lat: 35.0116,
    lng: 135.7681,
    spotlight: "Temple trails and late-night ramen corners.",
    heroSummary: "A quiet cultural loop through temples, tea houses, rail-side food alleys, and soft evening walks.",
    plannedMiles: "6.8k",
    curatedStays: 8,
    bestFor: "Culture reset",
    tripLength: "6 days",
    budget: "$2.4k - $3.1k",
    highlights: ["Fushimi Inari at sunrise", "Private tea room tasting", "Gion evening walk"],
    timeline: [
      { time: "Day 1", title: "Arrive near Higashiyama", description: "Check into a ryokan-style stay and walk the old lanes before dinner." },
      { time: "Day 2", title: "Temple circuit", description: "Start early at Kiyomizu-dera, then move through quieter garden stops." },
      { time: "Day 4", title: "Food note", description: "Book a compact ramen crawl with a late dessert stop near Pontocho." },
    ],
    savedPlans: ["Reserve tea tasting", "Pin Nishiki Market lunch route", "Add Arashiyama morning train"],
  },
  {
    id: "2",
    slug: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    lat: 38.7223,
    lng: -9.1393,
    spotlight: "Sunset miradouros and tram-window city views.",
    heroSummary: "A warm city break built around viewpoints, design-forward stays, seafood, and neighborhood wandering.",
    plannedMiles: "3.4k",
    curatedStays: 6,
    bestFor: "Slow city break",
    tripLength: "4 days",
    budget: "$1.6k - $2.2k",
    highlights: ["Alfama photo walk", "Belém pastry stop", "Tagus sunset sail"],
    timeline: [
      { time: "Day 1", title: "Settle in Chiado", description: "Drop bags, grab coffee, and walk downhill toward Praça do Comércio." },
      { time: "Day 2", title: "Viewpoint day", description: "Link three miradouros with tram rides and a late seafood reservation." },
      { time: "Day 3", title: "Belém and design shops", description: "Pair the monastery stop with ceramics, tiles, and a relaxed river walk." },
    ],
    savedPlans: ["Book tile workshop", "Save seafood shortlist", "Add Sintra weather backup"],
  },
  {
    id: "3",
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    lat: -33.9249,
    lng: 18.4241,
    spotlight: "Ocean drives, vineyards, and mountain air.",
    heroSummary: "A high-contrast itinerary with coastal roads, mountain views, food markets, and a vineyard day.",
    plannedMiles: "8.1k",
    curatedStays: 7,
    bestFor: "Scenic adventure",
    tripLength: "7 days",
    budget: "$2.8k - $3.8k",
    highlights: ["Chapman's Peak drive", "Table Mountain window", "Stellenbosch tasting day"],
    timeline: [
      { time: "Day 1", title: "Waterfront arrival", description: "Ease in with a harbor walk and sunset dinner reservation." },
      { time: "Day 3", title: "Mountain weather window", description: "Watch conditions and take the cableway when visibility opens." },
      { time: "Day 5", title: "Vineyard loop", description: "Reserve two tastings and leave room for a long lunch." },
    ],
    savedPlans: ["Track Table Mountain visibility", "Reserve vineyard driver", "Save beach picnic route"],
  },
  {
    id: "4",
    slug: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    continent: "Europe",
    lat: 64.1466,
    lng: -21.9426,
    spotlight: "Thermal lagoons, lava fields, and midnight-sun road trips.",
    heroSummary: "A clean northern route through geothermal water, dramatic roads, and compact Nordic dining.",
    plannedMiles: "4.9k",
    curatedStays: 5,
    bestFor: "Nature recharge",
    tripLength: "5 days",
    budget: "$2.6k - $3.4k",
    highlights: ["Sky Lagoon evening", "Golden Circle route", "Lava field photo stop"],
    timeline: [
      { time: "Day 1", title: "Lagoon landing", description: "Recover from the flight with a timed lagoon booking and early dinner." },
      { time: "Day 2", title: "Golden Circle drive", description: "Keep the day flexible for light, weather, and waterfall stops." },
      { time: "Day 4", title: "City texture", description: "Spend the afternoon on local design stores and a tasting menu." },
    ],
    savedPlans: ["Rent compact SUV", "Save storm backup list", "Pin bakery breakfast stop"],
  },
  {
    id: "5",
    slug: "marrakesh",
    name: "Marrakesh",
    country: "Morocco",
    continent: "Africa",
    lat: 31.6295,
    lng: -7.9811,
    spotlight: "Courtyard riads, spice markets, and desert-edge evenings.",
    heroSummary: "A textured city stay focused on riads, markets, rooftop dinners, and one desert-edge escape.",
    plannedMiles: "4.2k",
    curatedStays: 9,
    bestFor: "Sensory escape",
    tripLength: "5 days",
    budget: "$1.9k - $2.7k",
    highlights: ["Riad courtyard stay", "Souk guide morning", "Agafay sunset dinner"],
    timeline: [
      { time: "Day 1", title: "Medina arrival", description: "Transfer directly to the riad and keep the first walk short." },
      { time: "Day 2", title: "Souk with context", description: "Use a local guide for craft stops, spices, and navigation." },
      { time: "Day 4", title: "Desert-edge dinner", description: "Book a calm sunset experience outside the city." },
    ],
    savedPlans: ["Message riad pickup", "Reserve hammam slot", "Save rooftop dinner options"],
  },
  {
    id: "6",
    slug: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    continent: "Oceania",
    lat: -45.0312,
    lng: 168.6626,
    spotlight: "Alpine lake views with a little adrenaline built in.",
    heroSummary: "A polished outdoor itinerary balancing lakefront calm, alpine drives, and one high-adrenaline moment.",
    plannedMiles: "9.7k",
    curatedStays: 6,
    bestFor: "Outdoor luxury",
    tripLength: "8 days",
    budget: "$3.5k - $4.8k",
    highlights: ["Lake Wakatipu cruise", "Milford Sound day", "Shotover canyon ride"],
    timeline: [
      { time: "Day 1", title: "Lakefront base", description: "Choose a stay within walking distance of the lake and dinner spots." },
      { time: "Day 3", title: "Milford day", description: "Leave early and treat weather as the main planning variable." },
      { time: "Day 6", title: "Adventure slot", description: "Hold one day for canyon, heli, or slower winery alternatives." },
    ],
    savedPlans: ["Book lake-view stay", "Track Milford weather", "Compare canyon activities"],
  },
];

const allContinents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"];

export async function getDestinations(): Promise<Destination[]> {
  const { data, error } = await supabase.from("destinations").select("*");
  if (error || !data) return demoDestinations;
  return data.map((row) => {
    const fallback = demoDestinations.find((destination) => destination.name === row.name);
    return {
      ...(fallback ?? demoDestinations[0]),
      id: row.id,
      slug: row.slug ?? fallback?.slug ?? String(row.name).toLowerCase().replaceAll(" ", "-"),
      name: row.name,
      country: row.country,
      continent: row.continent,
      lat: row.lat,
      lng: row.lng,
      spotlight: row.spotlight,
    };
  });
}

export function getDestinationBySlug(slug?: string | null) {
  if (!slug) return demoDestinations[0];
  return demoDestinations.find((destination) => destination.slug === slug || destination.id === slug) ?? demoDestinations[0];
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
