interface RoundCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export function RoundCard({ title, value, subtitle }: RoundCardProps) {
  return (
    <article className="card round-card">
      <p className="label">{title}</p>
      <h3>{value}</h3>
      {subtitle ? <p>{subtitle}</p> : null}
    </article>
  );
}
