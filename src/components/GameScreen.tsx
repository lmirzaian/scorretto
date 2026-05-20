import { useMemo, useState } from 'react';
import { RoundCard } from './RoundCard';
import { Scoreboard } from './Scoreboard';
import { Timer } from './Timer';
import type { Category, GameState, Level, RoundFeedback, RoundType, TeamId } from '../types/game';

interface Props extends Pick<GameState, 'gamePhase'|'roomName'|'createdAt'|'activePackIds'|'pendingFeedbackRound'|'teamAName'|'teamBName'|'teamAScore'|'teamBScore'|'targetScore'|'currentRoundNumber'|'teamASpecialCards'|'teamBSpecialCards'|'lastRoundWinner'|'roundHistory'|'roundPhase'|'usedCardTypeA'|'usedCardTypeB'> {
  currentLevel: Level | null; currentCategory: Category | null; currentRoundType: RoundType | null;
  activeTeam: TeamId; activePlayer: string; opponentPlayer: string; timerKey: number;
  onDrawRound: () => void; onAdvancePhase: () => void; onUseCard: (team: TeamId, cardId: string) => void;
  onAssignJudgement: (winner: TeamId | null, bonusA?: number, bonusB?: number) => void; onNextRound: () => void;
  onSaveFeedback: (feedback: RoundFeedback) => void; onSkipFeedback: () => void; onOpenReport:()=>void; onBackToGame:()=>void; onClearFeedback:()=>void;
}

export function GameScreen(props: Props) {
  const [feedback, setFeedback] = useState<Partial<RoundFeedback>>({});
  const hasRound = props.currentRoundType && props.currentCategory && props.currentLevel;
  const laughter = props.roundHistory.map((r) => r.feedback?.laughterScore).filter(Boolean) as number[];
  const avg = laughter.length ? (laughter.reduce((a,b)=>a+b,0)/laughter.length).toFixed(1) : '-';
  const notes = useMemo(()=>props.roundHistory.filter(r=>r.feedback?.notes?.trim()),[props.roundHistory]);

  const reportPayload = {
    roomName: props.roomName,
    rounds: props.roundHistory.length,
    avgLaughter: avg,
    notes: notes.map((r) => ({ round: r.roundNumber, note: r.feedback?.notes })),
    history: props.roundHistory,
  };
  const copyReport = async () => {
    const txt = `Report test serata\nStanza: ${props.roomName}\nRound: ${props.roundHistory.length}\nRisata media: ${avg}\nNote: ${notes.map((n)=>`#${n.roundNumber} ${n.feedback?.notes}`).join(' | ')}`;
    await navigator.clipboard.writeText(txt);
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(reportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `report-test-serata-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
  };


  if (props.gamePhase === 'testReport') return <main className='container'><section className='card'><h2>Report test serata</h2><p>Stanza: {props.roomName || 'Senza nome'}</p><p>Round: {props.roundHistory.length}</p><p>Risata media: {avg} / 5 su {laughter.length} round valutati</p><p>Punteggio: {props.teamAName} {props.teamAScore} - {props.teamBScore} {props.teamBName}</p><p>Pacchetti attivi: {props.activePackIds.join(', ') || '-'}</p><p>Creata il: {new Date(props.createdAt).toLocaleString()}</p><h3>Note raccolte</h3>{notes.map(r=><p key={r.roundNumber}>Round {r.roundNumber}: {r.feedback?.notes}</p>)}<button className='secondary' onClick={exportJson}>Esporta JSON</button><button className='secondary' onClick={copyReport}>Copia report testuale</button><button className='secondary' onClick={props.onBackToGame}>Torna al gioco</button><button className='secondary' onClick={props.onClearFeedback}>Cancella feedback serata</button></section></main>;

  return <main className="container">
    <Scoreboard {...props} />
    <section className="card"><button className='secondary' onClick={props.onOpenReport}>Apri report test serata</button><p>Giocatore attivo: <strong>{props.activePlayer}</strong> · Avversario: <strong>{props.opponentPlayer}</strong></p><button onClick={props.onDrawRound}>Estrai round</button>{hasRound ? <button className="secondary" onClick={props.onAdvancePhase}>Avanza fase</button> : null}</section>
    {hasRound ? <><div className='cards-grid'><RoundCard title='Categoria' value={props.currentCategory!.label} subtitle={`Pack: ${props.currentCategory!.pack}`} /><RoundCard title='Livello' value={props.currentLevel!.name} subtitle={props.currentLevel!.description} /><RoundCard title='Tipo round' value={props.currentRoundType!.name} subtitle={props.currentRoundType!.description} /></div><Timer runningKey={props.timerKey} seconds={props.currentRoundType!.suggestedTimerSeconds} /><section className='card'><h3>Giudizio del tavolo</h3><button onClick={()=>props.onAssignJudgement('A')}>Punto a {props.teamAName}</button><button onClick={()=>props.onAssignJudgement('B')}>Punto a {props.teamBName}</button><button className='secondary' onClick={()=>props.onAssignJudgement(null)}>Round nullo</button></section></> : null}
    {props.pendingFeedbackRound ? <section className='card'><h3>Com’è andato questo round?</h3><p className='muted'>Il tavolo ha riso o ha fatto finta?</p><input type='number' min={1} max={5} placeholder='Risata 1-5' onChange={e=>setFeedback(f=>({...f,laughterScore:Number(e.target.value) as 1|2|3|4|5}))} /><input placeholder='Categoria verdict (works/weak/edit/remove)' onChange={e=>setFeedback(f=>({...f,categoryVerdict:e.target.value as RoundFeedback['categoryVerdict']}))} /><input placeholder='Contesto verdict (works/confusing/tooLong/revise)' onChange={e=>setFeedback(f=>({...f,roundTypeVerdict:e.target.value as RoundFeedback['roundTypeVerdict']}))} /><input placeholder='Carta verdict (useful/useless/tooStrong/unclear)' onChange={e=>setFeedback(f=>({...f,specialCardVerdict:e.target.value as RoundFeedback['specialCardVerdict']}))} /><textarea placeholder='Annota prima che la vergogna rimuova il ricordo.' onChange={e=>setFeedback(f=>({...f,notes:e.target.value}))} /><button onClick={()=>props.onSaveFeedback({roundNumber:props.pendingFeedbackRound!,createdAt:new Date().toISOString(),...feedback})}>Salva feedback</button><button className='secondary' onClick={props.onSkipFeedback}>Salta feedback</button></section> : null}
    {props.lastRoundWinner !== null ? <section className="card"><p>Vince il round: {props.lastRoundWinner === 'A' ? props.teamAName : props.teamBName}</p><button onClick={props.onNextRound}>Prossimo round</button></section> : null}
  </main>;
}
