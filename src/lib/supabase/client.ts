import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Keep dev startup stable even when env vars are missing.
  // Data helpers can fallback to local demo data.
  console.warn("Supabase env vars are missing. Falling back to demo mode.");
}

export const supabase = createClient(supabaseUrl ?? "https://example.supabase.co", supabaseAnonKey ?? "demo-key");
