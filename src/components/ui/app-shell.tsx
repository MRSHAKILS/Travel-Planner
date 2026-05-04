"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="mesh-overlay" />
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(3, 10, 18, 0.96)",
              display: "grid",
              placeItems: "center",
              zIndex: 90,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0.3 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="glass"
              style={{ borderRadius: 18, padding: "1rem 1.4rem", letterSpacing: "0.2em" }}
            >
              WONDERLUST
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="container" style={{ paddingTop: "1rem", position: "relative", zIndex: 2 }}>
        <nav
          className="glass"
          style={{
            borderRadius: 20,
            padding: "0.8rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <strong style={{ letterSpacing: "0.08em" }}>WONDERLUST</strong>
          <div style={{ display: "flex", gap: "0.8rem", color: "var(--text-soft)" }}>
            <NavLink href="/" active={pathname === "/"}>
              Globe
            </NavLink>
            <NavLink href="/travel-log" active={pathname === "/travel-log"}>
              Travel Log
            </NavLink>
            <NavLink href="/auth" active={pathname === "/auth"}>
              Auth
            </NavLink>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: active ? "var(--text-strong)" : "var(--text-soft)",
        borderBottom: active ? "1px solid rgba(138, 214, 255, 0.7)" : "1px solid transparent",
        paddingBottom: "2px",
      }}
    >
      {children}
    </Link>
  );
}
