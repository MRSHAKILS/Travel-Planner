import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  // Keep dev startup stable even when env vars are missing.
  // Data helpers can fallback to local demo data.
  console.warn("Supabase env vars are missing. Falling back to demo mode.");
}

export const supabase = createClient(supabaseUrl ?? "https://example.supabase.co", supabasePublishableKey ?? "demo-key");
