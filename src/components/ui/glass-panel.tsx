import { GlassCard } from "@/components/ui/glass-card";

export function GlassPanel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard>
      {title ? <h2 style={{ marginTop: 0 }}>{title}</h2> : null}
      {children}
    </GlassCard>
  );
}
