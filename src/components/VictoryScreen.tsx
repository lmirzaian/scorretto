interface VictoryScreenProps {
  winnerName: string;
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  rounds: number;
  onRestart: () => void;
  onOpenReport: () => void;
}

export function VictoryScreen(props: VictoryScreenProps) {
  return (
    <section className="container">
      <article className="card victory">
        <p className="label">Partita conclusa</p>
        <h1>{props.winnerName}</h1>
        <p>Punteggio finale: {props.teamAName} {props.teamAScore} - {props.teamBScore} {props.teamBName}</p>
        <p>Round giocati: {props.rounds}</p>
        <h3>Vuoi salvare il danno?</h3>
        <button className='secondary' onClick={props.onOpenReport}>Apri report test serata</button>
        <button onClick={props.onRestart}>Nuova partita</button>
      </article>
    </section>
  );
}
