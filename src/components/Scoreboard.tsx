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
  const leader = teamAScore === teamBScore ? null : teamAScore > teamBScore ? 'A' : 'B';

  return (
    <section className="card scoreboard">
      <div className="scoreboard-meta">
        <p className="label">Il tavolo giudica</p>
        <p>Round <strong>#{currentRoundNumber}</strong> · Obiettivo <strong>{targetScore}</strong></p>
      </div>
      <div className="team-score-grid">
        <article className={`team-score ${leader === 'A' ? 'leading' : ''}`}>
          <p className="label">Squadra A</p>
          <h3>{teamAName}</h3>
          <p className="big-score">{teamAScore}</p>
          <p className="status-text">{leader === 'A' ? 'In vantaggio' : 'In rincorsa'}</p>
        </article>
        <article className={`team-score ${leader === 'B' ? 'leading' : ''}`}>
          <p className="label">Squadra B</p>
          <h3>{teamBName}</h3>
          <p className="big-score">{teamBScore}</p>
          <p className="status-text">{leader === 'B' ? 'In vantaggio' : 'In rincorsa'}</p>
        </article>
      </div>
    </section>
  );
}
