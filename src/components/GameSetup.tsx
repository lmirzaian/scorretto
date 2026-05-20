import { useState } from 'react';

interface GameSetupProps {
  onStart: (teamAName: string, teamBName: string, targetScore: number) => void;
}

export function GameSetup({ onStart }: GameSetupProps) {
  const [teamAName, setTeamAName] = useState('Squadra A');
  const [teamBName, setTeamBName] = useState('Squadra B');
  const [targetScore, setTargetScore] = useState(10);

  return (
    <section className="card setup">
      <h2>Setup partita</h2>
      <label>Nome Squadra A
        <input value={teamAName} onChange={(e) => setTeamAName(e.target.value)} />
      </label>
      <label>Nome Squadra B
        <input value={teamBName} onChange={(e) => setTeamBName(e.target.value)} />
      </label>
      <label>Punti per vincere
        <input type="number" min={3} max={30} value={targetScore} onChange={(e) => setTargetScore(Number(e.target.value))} />
      </label>
      <button onClick={() => onStart(teamAName.trim() || 'Squadra A', teamBName.trim() || 'Squadra B', Math.max(1, targetScore))}>Inizia partita</button>
    </section>
  );
}
