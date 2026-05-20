interface VictoryScreenProps {
  winnerName: string;
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  rounds: number;
  onRestart: () => void;
}

export function VictoryScreen(props: VictoryScreenProps) {
  return (
    <section className="container">
      <article className="card victory">
        <p className="label">Partita conclusa</p>
        <h1>Vince {props.winnerName} 🎉</h1>
        <p>Punteggio finale: {props.teamAName} {props.teamAScore} - {props.teamBScore} {props.teamBName}</p>
        <p>Round giocati: {props.rounds}</p>
        <button onClick={props.onRestart}>Nuova partita</button>
      </article>
    </section>
  );
}
