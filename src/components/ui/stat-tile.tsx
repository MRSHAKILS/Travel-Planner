import { GlassCard } from "@/components/ui/glass-card";

export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <GlassCard style={{ minHeight: 120, display: "grid", gap: 8 }}>
      <span style={{ color: "var(--text-soft)", fontSize: 13 }}>{label}</span>
      <strong style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>{value}</strong>
    </GlassCard>
  );
}
