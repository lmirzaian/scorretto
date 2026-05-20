import type { SpecialCard, TeamId } from '../types/game';

interface SpecialCardsPanelProps {
  teamAName: string;
  teamBName: string;
  teamACards: SpecialCard[];
  teamBCards: SpecialCard[];
  onDraw: (team: TeamId) => void;
  onDiscard: (team: TeamId, cardId: string) => void;
}

export function SpecialCardsPanel({ teamAName, teamBName, teamACards, teamBCards, onDraw, onDiscard }: SpecialCardsPanelProps) {
  return (
    <section className="card">
      <h3>Carte speciali</h3>
      <div className="special-actions">
        <button onClick={() => onDraw('A')}>Pesca carta speciale per {teamAName}</button>
        <button onClick={() => onDraw('B')}>Pesca carta speciale per {teamBName}</button>
      </div>
      <div className="cards-grid">
        {[{ name: teamAName, team: 'A' as TeamId, cards: teamACards }, { name: teamBName, team: 'B' as TeamId, cards: teamBCards }].map((slot) => (
          <div key={slot.team}>
            <p className="label">Carte speciali {slot.name} ({slot.cards.length}/3)</p>
            {slot.cards.length === 0 ? <p className="muted">Nessuna carta.</p> : null}
            {slot.cards.map((card) => (
              <article className="special-card" key={`${slot.team}-${card.id}`}>
                <strong>{card.name}</strong>
                <p>{card.description}</p>
                <button onClick={() => onDiscard(slot.team, card.id)}>Scarta</button>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
