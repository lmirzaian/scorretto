import { RoundCard } from './RoundCard';
import { Scoreboard } from './Scoreboard';
import { Timer } from './Timer';
import { SpecialCardsPanel } from './SpecialCardsPanel';
import type { Category, Level, RoundType, SpecialCard, TeamId } from '../types/game';

interface GameScreenProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  targetScore: number;
  currentRoundNumber: number;
  currentLevel: Level | null;
  currentCategory: Category | null;
  currentRoundType: RoundType | null;
  startingTeam: TeamId;
  teamACards: SpecialCard[];
  teamBCards: SpecialCard[];
  timerKey: number;
  lastRoundWinner: TeamId | null;
  onDrawRound: () => void;
  onAssignPoint: (team: TeamId) => void;
  onNullRound: () => void;
  onNextRound: () => void;
  onDrawCard: (team: TeamId) => void;
  onDiscardCard: (team: TeamId, cardId: string) => void;
}

export function GameScreen(props: GameScreenProps) {
  const hasRound = props.currentLevel && props.currentCategory && props.currentRoundType;
  const tone = props.currentLevel?.name === 'Aperitivo' ? 'light' : props.currentLevel?.name === 'Cena tra amici' ? 'mid' : 'hard';

  return (
    <main className="container">
      <Scoreboard {...props} />
      <section className="card">
        <p className="label">La difesa può peggiorare la situazione</p>
        <h2>Inizia: {props.startingTeam === 'A' ? props.teamAName : props.teamBName}</h2>
        <button onClick={props.onDrawRound}>Estrai il prossimo disastro</button>
      </section>

      {hasRound ? (
        <>
          <div className="cards-grid">
            <RoundCard title="Livello" value={props.currentLevel!.name} subtitle={props.currentLevel!.description} tone={tone} />
            <RoundCard title="Categoria" value={props.currentCategory!.label} subtitle={`Pack: ${props.currentCategory!.pack}`} />
            <RoundCard title="Tipo round" value={props.currentRoundType!.name} subtitle={props.currentRoundType!.prompt} />
          </div>
          <section className="card">
            <p className="label">Non verbalizzare</p>
            <p>{props.currentRoundType!.instruction}</p>
          </section>
          <Timer runningKey={props.timerKey} seconds={10} />
          <div className="actions">
            <button onClick={() => props.onAssignPoint('A')}>Punto a {props.teamAName}</button>
            <button onClick={() => props.onAssignPoint('B')}>Punto a {props.teamBName}</button>
            <button className="secondary" onClick={props.onNullRound}>Round nullo</button>
          </div>
        </>
      ) : null}

      {props.lastRoundWinner ? (
        <section className="card round-summary">
          <p className="label">Fine round</p>
          <h3>Vince il round: {props.lastRoundWinner === 'A' ? props.teamAName : props.teamBName}</h3>
          <p className="muted">La squadra perdente pesca una carta speciale (se sotto il limite).</p>
          <button className="secondary" onClick={props.onNextRound}>Prossimo round</button>
        </section>
      ) : null}

      <SpecialCardsPanel
        teamAName={props.teamAName}
        teamBName={props.teamBName}
        teamACards={props.teamACards}
        teamBCards={props.teamBCards}
        onDraw={props.onDrawCard}
        onDiscard={props.onDiscardCard}
      />
    </main>
  );
}
