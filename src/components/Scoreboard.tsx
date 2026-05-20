interface ScoreboardProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  targetScore: number;
  currentRoundNumber: number;
}

export function Scoreboard(props: ScoreboardProps) {
  const { teamAName, teamBName, teamAScore, teamBScore, targetScore, currentRoundNumber } = props;

  return (
    <section className="card scoreboard">
      <div>
        <p className="label">Round</p>
        <h2>#{currentRoundNumber}</h2>
      </div>
      <div className="scores">
        <p><strong>{teamAName}</strong>: {teamAScore}</p>
        <p><strong>{teamBName}</strong>: {teamBScore}</p>
      </div>
      <p className="label">Obiettivo: {targetScore} punti</p>
    </section>
  );
}
