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
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="preloader"
          >
            <motion.div
              layoutId="brand-shell"
              initial={{ y: 18, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -320, x: -420, scale: 0.46, opacity: 0.95 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="preloader-card"
            >
              <motion.strong layoutId="brand-text">Wonderlust</motion.strong>
              <span>Building your travel atlas</span>
              <i />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="container">
        <nav className="app-nav">
          <motion.strong layoutId="brand-text" className="brand">
            Wonderlust
          </motion.strong>
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
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <strong>Wonderlust</strong>
            <p>
              A portfolio travel product showing a Three.js globe, typed demo data, Supabase-ready workflows,
              destination planning, and responsive product UI.
            </p>
          </div>
          <div>
            <span>Developer</span>
            <strong>Shakil Ahmed</strong>
            <p>Built as a polished frontend case study for recruiters and portfolio review.</p>
          </div>
          <div>
            <span>Research Sources</span>
            <a href="https://www.lonelyplanet.com/best-in-travel" target="_blank" rel="noreferrer">
              Lonely Planet Best in Travel
            </a>
            <a href="https://www.nationalgeographic.com/travel/article/best-of-the-world-2026" target="_blank" rel="noreferrer">
              National Geographic Best of the World
            </a>
          </div>
        </div>
      </footer>
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
