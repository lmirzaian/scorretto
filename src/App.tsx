import { useMemo, useState } from 'react';
import './styles.css';
import { GameSetup } from './components/GameSetup';
import { GameScreen } from './components/GameScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { categories } from './data/categories';
import { levels } from './data/levels';
import { roundTypes } from './data/roundTypes';
import { specialCardsDeck } from './data/specialCards';
import type { GameState, TeamId } from './types/game';
import { pickRandom } from './utils/random';

const initialState: GameState = {
  teamAName: 'Squadra A', teamBName: 'Squadra B', teamAScore: 0, teamBScore: 0, targetScore: 10,
  currentRoundNumber: 1, currentLevel: null, currentCategory: null, currentRoundType: null,
  teamASpecialCards: [], teamBSpecialCards: [], lastRoundWinner: null, startingTeam: 'A', gamePhase: 'home',
};

export default function App() {
  const [state, setState] = useState<GameState>(initialState);
  const [timerKey, setTimerKey] = useState(0);

  const winnerName = useMemo(() => state.teamAScore >= state.targetScore ? state.teamAName : state.teamBScore >= state.targetScore ? state.teamBName : '', [state]);

  const drawCard = (team: TeamId) => setState((prev) => {
    const key = team === 'A' ? 'teamASpecialCards' : 'teamBSpecialCards';
    if (prev[key].length >= 3) return prev;
    return { ...prev, [key]: [...prev[key], pickRandom(specialCardsDeck)] };
  });

  const discardCard = (team: TeamId, cardId: string) => setState((prev) => {
    const key = team === 'A' ? 'teamASpecialCards' : 'teamBSpecialCards';
    return { ...prev, [key]: prev[key].filter((card) => card.id !== cardId) };
  });

  const assignPoint = (team: TeamId) => setState((prev) => {
    const next = { ...prev, lastRoundWinner: team };
    if (team === 'A') next.teamAScore += 1;
    if (team === 'B') next.teamBScore += 1;
    const loser = team === 'A' ? 'B' : 'A';
    const loserKey = loser === 'A' ? 'teamASpecialCards' : 'teamBSpecialCards';
    if (next[loserKey].length < 3) next[loserKey] = [...next[loserKey], pickRandom(specialCardsDeck)];
    if (next.teamAScore >= next.targetScore || next.teamBScore >= next.targetScore) next.gamePhase = 'victory';
    return next;
  });

  if (state.gamePhase === 'home') {
    return <section className="container"><article className="card hero"><p className="label">Verbale non ufficiale</p><h1>Non si può più dire niente</h1><p className="hero-sub">Il party game dei luoghi comuni, delle pessime difese e delle brutte compagnie.</p><p>Due squadre, un timer spietato, carte speciali e argomentazioni discutibili da improvvisare in pochi secondi.</p><button onClick={() => setState((p) => ({ ...p, gamePhase: 'setup' }))}>Nuova partita</button><p className="muted tiny">Giocare responsabilmente. Ridere non costituisce approvazione ufficiale.</p></article></section>;
  }

  if (state.gamePhase === 'setup') return <section className="container"><GameSetup onStart={(a, b, target) => setState({ ...initialState, gamePhase: 'playing', teamAName: a, teamBName: b, targetScore: target })} /></section>;
  if (state.gamePhase === 'victory') return <VictoryScreen winnerName={winnerName} teamAName={state.teamAName} teamBName={state.teamBName} teamAScore={state.teamAScore} teamBScore={state.teamBScore} rounds={state.currentRoundNumber} onRestart={() => setState(initialState)} />;

  return <GameScreen {...state} teamACards={state.teamASpecialCards} teamBCards={state.teamBSpecialCards} timerKey={timerKey}
    onDrawRound={() => { setState((prev) => ({ ...prev, currentLevel: pickRandom(levels), currentCategory: pickRandom(categories), currentRoundType: pickRandom(roundTypes) })); setTimerKey((k) => k + 1); }}
    onAssignPoint={assignPoint}
    onNullRound={() => { setState((prev) => ({ ...prev, currentLevel: null, currentCategory: null, currentRoundType: null })); setTimerKey((k) => k + 1); }}
    onNextRound={() => setState((prev) => ({ ...prev, currentRoundNumber: prev.currentRoundNumber + 1, startingTeam: prev.startingTeam === 'A' ? 'B' : 'A', currentLevel: null, currentCategory: null, currentRoundType: null, lastRoundWinner: null }))}
    onDrawCard={drawCard}
    onDiscardCard={discardCard}
  />;
}
