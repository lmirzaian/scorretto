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
  onDrawRound: () => void;
  onAssignPoint: (team: TeamId) => void;
  onNullRound: () => void;
  onNextRound: () => void;
  onDrawCard: (team: TeamId) => void;
  onDiscardCard: (team: TeamId, cardId: string) => void;
}

export function GameScreen(props: GameScreenProps) {
  const hasRound = props.currentLevel && props.currentCategory && props.currentRoundType;

  return (
    <main className="container">
      <Scoreboard
        teamAName={props.teamAName}
        teamBName={props.teamBName}
        teamAScore={props.teamAScore}
        teamBScore={props.teamBScore}
        targetScore={props.targetScore}
        currentRoundNumber={props.currentRoundNumber}
      />
      <section className="card">
        <p className="label">Inizia</p>
        <h2>{props.startingTeam === 'A' ? props.teamAName : props.teamBName}</h2>
        <button onClick={props.onDrawRound}>Estrai round</button>
      </section>

      {hasRound ? (
        <>
          <div className="cards-grid">
            <RoundCard title="Livello di correttezza" value={props.currentLevel!.name} subtitle={props.currentLevel!.description} />
            <RoundCard title="Categoria" value={props.currentCategory!.label} subtitle={`Pack: ${props.currentCategory!.pack}`} />
            <RoundCard title="Tipo round" value={props.currentRoundType!.name} subtitle={props.currentRoundType!.prompt} />
          </div>
          <section className="card">
            <p className="label">Istruzioni</p>
            <p>{props.currentRoundType!.instruction}</p>
          </section>
          <Timer runningKey={props.timerKey} seconds={10} />
          <div className="actions">
            <button onClick={() => props.onAssignPoint('A')}>Punto {props.teamAName}</button>
            <button onClick={() => props.onAssignPoint('B')}>Punto {props.teamBName}</button>
            <button className="secondary" onClick={props.onNullRound}>Round nullo / ripeti</button>
            <button className="secondary" onClick={props.onNextRound}>Prossimo round</button>
          </div>
        </>
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
