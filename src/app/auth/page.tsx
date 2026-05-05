"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";

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
    <div className="container page">
      <section className="auth-card">
        <h1 style={{ marginTop: 0 }}>Sign In</h1>
        <p style={{ color: "var(--text-soft)" }}>Use your email to receive a secure magic link.</p>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.8rem" }}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="auth-input"
          />
          <button type="submit" className="primary-button">
            Send Magic Link
          </button>
        </form>
        {status ? <p style={{ marginBottom: 0, color: "var(--text-soft)" }}>{status}</p> : null}
      </section>
    </div>
  );
}
