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
            className="preloader"
          >
            <motion.div
              initial={{ rotate: -8, scale: 0.94, opacity: 0.4 }}
              animate={{ rotate: 8, scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse" }}
              className="preloader-mark"
            >
              WONDERLUST
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="container">
        <nav className="app-nav">
          <strong className="brand">Wonderlust</strong>
          <div className="nav-links">
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
    <Link href={href} className={`nav-link${active ? " nav-link-active" : ""}`}>
      {children}
    </Link>
  );
}
