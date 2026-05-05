export type Destination = {
  id: string;
  slug: string;
  name: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
  spotlight: string;
  heroSummary: string;
  plannedMiles: string;
  curatedStays: number;
  bestFor: string;
  tripLength: string;
  budget: string;
  highlights: string[];
  timeline: TripTimelineEntry[];
  savedPlans: string[];
};

export type TripTimelineEntry = {
  time: string;
  title: string;
  description: string;
};

export type TripLogEntry = {
  id: string;
  destinationId: string;
  visitedAt: string;
  notes?: string;
};

export type TravelStats = {
  trips: number;
  countries: number;
  continents: number;
  wineBottles: number;
};

export type ContinentProgress = {
  continent: string;
  visited: boolean;
};

export type UserProfile = {
  id: string;
  email: string;
  displayName: string | null;
};
