import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { GameSetup } from './components/GameSetup';
import { GameScreen } from './components/GameScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { getActiveCategories } from './data/categoryPacks';
import { levels } from './data/levels';
import { roundTypes } from './data/roundTypes';
import { specialCardsDeck } from './data/specialCards';
import type { GameState, RoundFlowPhase, TeamId } from './types/game';
import { pickRandom } from './utils/random';

const STORAGE_KEY = 'nspdn-sprint5';
const initialState: GameState = { teamAName: 'Squadra A', teamBName: 'Squadra B', teamAScore: 0, teamBScore: 0, targetScore: 10, teamAPlayers: ['Giocatore A1'], teamBPlayers: ['Giocatore B1'], playerIndexA: 0, playerIndexB: 0, currentRoundNumber: 1, currentLevel: null, currentCategory: null, currentRoundType: null, teamASpecialCards: [], teamBSpecialCards: [], usedCardThisRoundA: [], usedCardThisRoundB: [], usedCardTypeA: false, usedCardTypeB: false, lastRoundWinner: null, startingTeam: 'A', gamePhase: 'home', roundPhase: 'ready', roundHistory: [] };

export default function App() {
  const [state, setState] = useState<GameState>(() => { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : initialState; });
  const [timerKey, setTimerKey] = useState(0);
  const [activePackIds, setActivePackIds] = useState<string[]>([]);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state]);

  const winnerName = useMemo(() => state.teamAScore >= state.targetScore ? state.teamAName : state.teamBScore >= state.targetScore ? state.teamBName : '', [state]);
  const activeTeam = state.startingTeam;
  const activePlayer = activeTeam === 'A' ? state.teamAPlayers[state.playerIndexA % state.teamAPlayers.length] : state.teamBPlayers[state.playerIndexB % state.teamBPlayers.length];
  const opponentPlayer = activeTeam === 'A' ? state.teamBPlayers[state.playerIndexB % state.teamBPlayers.length] : state.teamAPlayers[state.playerIndexA % state.teamAPlayers.length];

  const nextPhase = () => setState((prev) => {
    const rt = prev.currentRoundType;
    const seq: RoundFlowPhase[] = rt?.kind === 'context' ? ['extracted', 'performance', 'opponentIntervention', 'defense', 'judging', 'roundSummary'] : ['extracted', 'performance', 'judging', 'roundSummary'];
    const i = seq.indexOf(prev.roundPhase);
    return { ...prev, roundPhase: i >= 0 && i < seq.length - 1 ? seq[i + 1] : prev.roundPhase };
  });

  const useCard = (team: TeamId, cardId: string) => setState((prev) => {
    const used = team === 'A' ? prev.usedCardTypeA : prev.usedCardTypeB; if (used) return prev;
    const source = team === 'A' ? prev.teamASpecialCards : prev.teamBSpecialCards; const card = source.find((c) => c.id === cardId); if (!card) return prev;
    return { ...prev, teamASpecialCards: team === 'A' ? source.filter((c) => c.id !== cardId) : prev.teamASpecialCards, teamBSpecialCards: team === 'B' ? source.filter((c) => c.id !== cardId) : prev.teamBSpecialCards, usedCardTypeA: team === 'A' ? true : prev.usedCardTypeA, usedCardTypeB: team === 'B' ? true : prev.usedCardTypeB, usedCardThisRoundA: team === 'A' ? [...prev.usedCardThisRoundA, card.name] : prev.usedCardThisRoundA, usedCardThisRoundB: team === 'B' ? [...prev.usedCardThisRoundB, card.name] : prev.usedCardThisRoundB };
  });

  const assignPoint = (team: TeamId | null, bonusA = 0, bonusB = 0) => setState((prev) => {
    const next = { ...prev, lastRoundWinner: team, teamAScore: prev.teamAScore + (team === 'A' ? 1 : 0) + bonusA, teamBScore: prev.teamBScore + (team === 'B' ? 1 : 0) + bonusB, roundPhase: 'roundSummary' as RoundFlowPhase };
    if (team && next[team === 'A' ? 'teamBSpecialCards' : 'teamASpecialCards'].length < 3) { const loser = team === 'A' ? 'teamBSpecialCards' : 'teamASpecialCards'; next[loser] = [...next[loser], pickRandom(specialCardsDeck)]; }
    next.roundHistory = [...prev.roundHistory, { roundNumber: prev.currentRoundNumber, activeTeam: prev.startingTeam, activePlayer, opponentPlayer, level: prev.currentLevel?.name || '-', category: prev.currentCategory?.label || '-', categoryPack: prev.currentCategory?.pack || '-', roundType: prev.currentRoundType?.name || '-', kind: prev.currentRoundType?.kind || 'classic', winner: team, points: { A: team === 'A' ? 1 : 0, B: team === 'B' ? 1 : 0 }, bonus: { A: bonusA, B: bonusB }, usedCardsA: prev.usedCardThisRoundA, usedCardsB: prev.usedCardThisRoundB, finalPhase: 'roundSummary' }];
    if (next.teamAScore >= next.targetScore || next.teamBScore >= next.targetScore) next.gamePhase = 'victory';
    return next;
  });

  if (state.gamePhase === 'setup') return <section className="container"><GameSetup onStart={(a, b, target, packs, pa, pb) => { setActivePackIds(packs); setState({ ...initialState, gamePhase: 'playing', teamAName: a, teamBName: b, targetScore: target, teamAPlayers: pa, teamBPlayers: pb }); }} /></section>;
  if (state.gamePhase === 'victory') return <VictoryScreen winnerName={winnerName} teamAName={state.teamAName} teamBName={state.teamBName} teamAScore={state.teamAScore} teamBScore={state.teamBScore} rounds={state.currentRoundNumber} onRestart={() => { setActivePackIds([]); localStorage.removeItem(STORAGE_KEY); setState(initialState); }} />;
  if (state.gamePhase === 'home') return <section className="container"><article className="card hero"><p className="label">Verbale non ufficiale</p><h1>Non si può più dire niente</h1><button onClick={() => setState((p) => ({ ...p, gamePhase: 'setup' }))}>Nuova partita</button></article></section>;

  return <GameScreen {...state} activeTeam={activeTeam} activePlayer={activePlayer} opponentPlayer={opponentPlayer} timerKey={timerKey} onDrawRound={() => { const activeCategories = getActiveCategories(activePackIds); if (!activeCategories.length) return; setState((p) => ({ ...p, currentLevel: pickRandom(levels), currentCategory: pickRandom(activeCategories), currentRoundType: pickRandom(roundTypes), roundPhase: 'extracted', lastRoundWinner: null, usedCardThisRoundA: [], usedCardThisRoundB: [], usedCardTypeA: false, usedCardTypeB: false })); setTimerKey((k) => k + 1); }} onAdvancePhase={nextPhase} onUseCard={useCard} onAssignJudgement={assignPoint} onNextRound={() => setState((p) => ({ ...p, currentRoundNumber: p.currentRoundNumber + 1, startingTeam: p.startingTeam === 'A' ? 'B' : 'A', playerIndexA: p.playerIndexA + 1, playerIndexB: p.playerIndexB + 1, currentLevel: null, currentCategory: null, currentRoundType: null, lastRoundWinner: null, roundPhase: 'ready' }))} />;
}
