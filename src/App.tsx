import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { GameSetup } from './components/GameSetup';
import { GameScreen } from './components/GameScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { getActiveCategories } from './data/categoryPacks';
import { levels } from './data/levels';
import { roundTypes } from './data/roundTypes';
import type { GameState, RoundFeedback, RoundFlowPhase, TeamId } from './types/game';
import { pickRandom, pickRandomNoImmediateRepeat, pickRandomWeighted } from './utils/random';

const STORAGE_KEY = 'nspdn-sprint7';
const initialState: GameState = { roomName: '', testModeEnabled: true, createdAt: new Date().toISOString(), activePackIds: [], pendingFeedbackRound: null, teamAName: 'Squadra A', teamBName: 'Squadra B', teamAScore: 0, teamBScore: 0, targetScore: 10, teamAPlayers: ['Giocatore A1'], teamBPlayers: ['Giocatore B1'], playerIndexA: 0, playerIndexB: 0, currentRoundNumber: 1, currentLevel: null, currentCategory: null, currentRoundType: null, teamASpecialCards: [], teamBSpecialCards: [], usedCardThisRoundA: [], usedCardThisRoundB: [], usedCardTypeA: false, usedCardTypeB: false, lastRoundWinner: null, startingTeam: 'A', gamePhase: 'home', roundPhase: 'ready', roundHistory: [], lastCategoryId: undefined, lastRoundTypeId: undefined };

export default function App() {
  const [state, setState] = useState<GameState>(() => { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : initialState; });
  const [timerKey, setTimerKey] = useState(0);
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

  const assignPoint = (team: TeamId | null, bonusA = 0, bonusB = 0) => setState((prev) => {
    const next = { ...prev, lastRoundWinner: team, teamAScore: prev.teamAScore + (team === 'A' ? 1 : 0) + bonusA, teamBScore: prev.teamBScore + (team === 'B' ? 1 : 0) + bonusB, roundPhase: 'roundSummary' as RoundFlowPhase, pendingFeedbackRound: prev.testModeEnabled ? prev.currentRoundNumber : null };
    next.roundHistory = [...prev.roundHistory, { roundNumber: prev.currentRoundNumber, activeTeam: prev.startingTeam, activePlayer, opponentPlayer, level: prev.currentLevel?.name || '-', category: prev.currentCategory?.label || '-', categoryPack: prev.currentCategory?.pack || '-', roundType: prev.currentRoundType?.name || '-', kind: prev.currentRoundType?.kind || 'classic', winner: team, points: { A: team === 'A' ? 1 : 0, B: team === 'B' ? 1 : 0 }, bonus: { A: bonusA, B: bonusB }, usedCardsA: prev.usedCardThisRoundA, usedCardsB: prev.usedCardThisRoundB, finalPhase: 'roundSummary' }];
    if (next.teamAScore >= next.targetScore || next.teamBScore >= next.targetScore) next.gamePhase = 'victory';
    return next;
  });

  const saveFeedback = (feedback: RoundFeedback) => setState((prev) => ({ ...prev, pendingFeedbackRound: null, roundHistory: prev.roundHistory.map((r) => r.roundNumber === feedback.roundNumber ? { ...r, feedback } : r) }));
  const clearFeedback = () => setState((prev) => ({ ...prev, roundHistory: prev.roundHistory.map((r) => ({ ...r, feedback: undefined })) }));

  if (state.gamePhase === 'setup') return <section className="container"><GameSetup onStart={(roomName, a, b, target, packs, pa, pb, testModeEnabled) => setState({ ...initialState, createdAt: new Date().toISOString(), roomName, activePackIds: packs, testModeEnabled, gamePhase: 'playing', teamAName: a, teamBName: b, targetScore: target, teamAPlayers: pa, teamBPlayers: pb })} /></section>;
  if (state.gamePhase === 'victory') return <VictoryScreen {...state} winnerName={winnerName} rounds={state.currentRoundNumber} onRestart={() => { localStorage.removeItem(STORAGE_KEY); setState(initialState); }} onOpenReport={() => setState((p) => ({ ...p, gamePhase: 'testReport' }))} />;
  if (state.gamePhase === 'home') return <section className="container"><article className="card hero"><p className="label">Verbale non ufficiale</p><h1>Non si può più dire niente</h1><button onClick={() => setState((p) => ({ ...p, gamePhase: 'setup' }))}>Nuova partita</button>{state.roundHistory.length ? <button className="secondary" onClick={() => setState((p) => ({ ...p, gamePhase: 'testReport' }))}>Report test serata</button> : null}</article></section>;

  return <GameScreen {...state} activeTeam={activeTeam} activePlayer={activePlayer} opponentPlayer={opponentPlayer} timerKey={timerKey} onDrawRound={() => { const activeCategories = getActiveCategories(state.activePackIds); if (!activeCategories.length) return; setState((p) => { const category = pickRandomNoImmediateRepeat(activeCategories, (c) => c.id, p.lastCategoryId); const roundTypePool = roundTypes.filter((rt) => rt.id === 'classico' || rt.id !== p.lastRoundTypeId); const roundType = pickRandomWeighted(roundTypePool.length ? roundTypePool : roundTypes, (rt) => rt.weight); return { ...p, currentLevel: pickRandom(levels), currentCategory: category, currentRoundType: roundType, lastCategoryId: category.id, lastRoundTypeId: roundType.id, roundPhase: 'extracted', lastRoundWinner: null, usedCardThisRoundA: [], usedCardThisRoundB: [], usedCardTypeA: false, usedCardTypeB: false }; }); setTimerKey((k) => k + 1); }} onAdvancePhase={nextPhase} onUseCard={(team, cardId) => setState(prev=>{const src=team==='A'?prev.teamASpecialCards:prev.teamBSpecialCards;const card=src.find(c=>c.id===cardId);if(!card)return prev;return {...prev,teamASpecialCards:team==='A'?src.filter(c=>c.id!==cardId):prev.teamASpecialCards,teamBSpecialCards:team==='B'?src.filter(c=>c.id!==cardId):prev.teamBSpecialCards,usedCardThisRoundA:team==='A'?[...prev.usedCardThisRoundA,card.name]:prev.usedCardThisRoundA,usedCardThisRoundB:team==='B'?[...prev.usedCardThisRoundB,card.name]:prev.usedCardThisRoundB,usedCardTypeA:team==='A'?true:prev.usedCardTypeA,usedCardTypeB:team==='B'?true:prev.usedCardTypeB}})} onAssignJudgement={assignPoint} onSaveFeedback={saveFeedback} onSkipFeedback={() => setState((p) => ({ ...p, pendingFeedbackRound: null }))} onNextRound={() => setState((p) => ({ ...p, currentRoundNumber: p.currentRoundNumber + 1, startingTeam: p.startingTeam === 'A' ? 'B' : 'A', playerIndexA: p.playerIndexA + 1, playerIndexB: p.playerIndexB + 1, currentLevel: null, currentCategory: null, currentRoundType: null, lastRoundWinner: null, roundPhase: 'ready' }))} onOpenReport={() => setState((p) => ({ ...p, gamePhase: 'testReport' }))} onBackToGame={() => setState((p) => ({ ...p, gamePhase: p.teamAScore >= p.targetScore || p.teamBScore >= p.targetScore ? 'victory' : 'playing' }))} onClearFeedback={clearFeedback} />;
}
