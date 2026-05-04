"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("Sending magic link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
    });
    setStatus(error ? error.message : "Magic link sent. Check your inbox.");
  }

  return (
    <div className="container" style={{ padding: "1.8rem 0 2.4rem" }}>
      <GlassCard style={{ maxWidth: 560, margin: "0 auto", padding: "1.2rem" }}>
        <h1 style={{ marginTop: 0 }}>Sign In</h1>
        <p style={{ color: "var(--text-soft)" }}>Use your email to receive a secure magic link.</p>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.8rem" }}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{
              borderRadius: 12,
              border: "1px solid rgba(173, 209, 255, 0.45)",
              background: "rgba(7, 21, 36, 0.6)",
              color: "var(--text-strong)",
              padding: "0.7rem 0.8rem",
            }}
          />
          <button
            type="submit"
            style={{
              borderRadius: 999,
              border: 0,
              padding: "0.65rem 1rem",
              background: "linear-gradient(120deg, #59d9ff, #7590ff)",
              color: "#082642",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Send Magic Link
          </button>
        </form>
        {status ? <p style={{ marginBottom: 0, color: "var(--text-soft)" }}>{status}</p> : null}
      </GlassCard>
    </div>
  );
}
