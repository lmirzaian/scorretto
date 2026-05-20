const endings = [
  'La dignità ha perso, ma almeno qualcuno ha vinto.',
  'Partita conclusa. Non verbalizzare.',
  'Complimenti. Ora fate finta che non sia successo.',
  'Il tavolo ha deliberato.',
];

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
  const message = endings[props.rounds % endings.length];
  return (
    <section className="container">
      <article className="card victory">
        <p className="label">Partita conclusa</p>
        <h1>{props.winnerName}</h1>
        <p className="hero-sub">ha vinto. Il tavolo prende atto.</p>
        <p>Punteggio finale: {props.teamAName} {props.teamAScore} - {props.teamBScore} {props.teamBName}</p>
        <p>Round giocati: {props.rounds}</p>
        <p className="muted">{message}</p>
        <button onClick={props.onRestart}>Nuova partita</button>
      </article>
    </section>
  );
}
