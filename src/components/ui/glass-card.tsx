import type { CSSProperties } from "react";

export function GlassCard({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <article className="panel" style={style}>
      {children}
    </article>
  );
}
