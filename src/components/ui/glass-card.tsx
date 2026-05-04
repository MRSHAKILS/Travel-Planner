export function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <article className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1rem", ...style }}>
      {children}
    </article>
  );
}
