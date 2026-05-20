interface RoundCardProps {
  title: string;
  value: string;
  subtitle?: string;
  tone?: 'light' | 'mid' | 'hard';
}

export function RoundCard({ title, value, subtitle, tone }: RoundCardProps) {
  return (
    <article className={`card round-card ${tone ? `tone-${tone}` : ''}`}>
      <p className="label">{title}</p>
      <h3>{value}</h3>
      {subtitle ? <p>{subtitle}</p> : null}
    </article>
  );
}
