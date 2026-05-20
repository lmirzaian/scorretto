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
      <p className="muted">Carta speciale pescata: usala male. Limite massimo: 3 per squadra.</p>
      <div className="cards-grid two-cols">
        {[{ name: teamAName, team: 'A' as TeamId, cards: teamACards }, { name: teamBName, team: 'B' as TeamId, cards: teamBCards }].map((slot) => (
          <div className="team-specials" key={slot.team}>
            <div className="team-specials-header">
              <p className="label">{slot.name}</p>
              <p>{slot.cards.length}/3</p>
            </div>
            <button className="secondary" onClick={() => onDraw(slot.team)}>Pesca per {slot.name}</button>
            {slot.cards.length === 0 ? <p className="muted">Nessuna carta.</p> : null}
            {slot.cards.map((card) => (
              <article className="special-card" key={`${slot.team}-${card.id}`}>
                <strong>{card.name}</strong>
                <p>{card.description}</p>
                <p className="muted">Effetto: {card.description}</p>
                <button onClick={() => onDiscard(slot.team, card.id)}>Usa / Scarta</button>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
