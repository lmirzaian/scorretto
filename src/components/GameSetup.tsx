import { useState } from 'react';

interface GameSetupProps {
  onStart: (teamAName: string, teamBName: string, targetScore: number) => void;
}

export function GameSetup({ onStart }: GameSetupProps) {
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');
  const [targetScore, setTargetScore] = useState(10);

  return (
    <section className="card setup">
      <h2>Setup partita</h2>
      <p className="muted">Compila il verbale e scegli quando finisce la dignità.</p>
      <div className="cards-grid two-cols">
        <article className="team-specials">
          <p className="label">Squadra A</p>
          <label>Nome squadra
            <input placeholder="Squadra A" value={teamAName} onChange={(e) => setTeamAName(e.target.value)} />
          </label>
        </article>
        <article className="team-specials">
          <p className="label">Squadra B</p>
          <label>Nome squadra
            <input placeholder="Squadra B" value={teamBName} onChange={(e) => setTeamBName(e.target.value)} />
          </label>
        </article>
      </div>
      <label>Punti per vincere
        <input type="number" min={3} max={30} value={targetScore} onChange={(e) => setTargetScore(Number(e.target.value))} />
      </label>
      <button onClick={() => onStart(teamAName.trim() || 'Squadra A', teamBName.trim() || 'Squadra B', Math.max(1, targetScore))}>Inizia partita</button>
    </section>
  );
}
