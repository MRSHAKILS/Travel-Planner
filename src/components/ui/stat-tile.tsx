export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="stat-tile">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </article>
  );
}
