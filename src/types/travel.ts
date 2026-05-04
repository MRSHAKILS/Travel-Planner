export type Destination = {
  id: string;
  name: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
  spotlight: string;
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
