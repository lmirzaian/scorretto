import { RoundCard } from './RoundCard';
import { Scoreboard } from './Scoreboard';
import { Timer } from './Timer';
import type { Category, GameState, Level, RoundFlowPhase, RoundType, TeamId } from '../types/game';

interface Props extends Pick<GameState, 'teamAName'|'teamBName'|'teamAScore'|'teamBScore'|'targetScore'|'currentRoundNumber'|'teamASpecialCards'|'teamBSpecialCards'|'lastRoundWinner'|'roundHistory'|'roundPhase'|'usedCardTypeA'|'usedCardTypeB'|'usedCardThisRoundA'|'usedCardThisRoundB'> {
  currentLevel: Level | null; currentCategory: Category | null; currentRoundType: RoundType | null;
  activeTeam: TeamId; activePlayer: string; opponentPlayer: string; timerKey: number;
  onDrawRound: () => void; onAdvancePhase: () => void; onUseCard: (team: TeamId, cardId: string) => void;
  onAssignJudgement: (winner: TeamId | null, bonusA?: number, bonusB?: number) => void; onNextRound: () => void;
}

const phaseCopy: Record<RoundFlowPhase, string> = { ready: 'Fase 0: pronti a rovinare il clima.', extracted: 'Fase 1: dì la cosa che non andava detta.', performance: 'Dieci secondi per rovinare il clima.', opponentIntervention: 'Ora l’avversario può peggiorare la tua serata.', defense: 'Difenditi. Male, ma con convinzione.', judging: 'Il tavolo giudica. La risata è una prova ammissibile.', roundSummary: 'Verbale round chiuso.' };

export function GameScreen(props: Props) {
  const hasRound = props.currentRoundType && props.currentCategory && props.currentLevel;
  const classic = props.currentRoundType?.kind === 'classic';
  return <main className="container">
    <Scoreboard {...props} />
    <section className="card"><p className="label">Squadra attiva: {props.activeTeam === 'A' ? props.teamAName : props.teamBName}</p><p>Giocatore attivo: <strong>{props.activePlayer}</strong> · Avversario: <strong>{props.opponentPlayer}</strong></p><p className="muted">{phaseCopy[props.roundPhase]}</p><button onClick={props.onDrawRound}>Estrai round</button>{hasRound ? <button className="secondary" onClick={props.onAdvancePhase}>Avanza fase</button> : null}</section>
    {hasRound ? <>
      <div className="cards-grid"><RoundCard title="Categoria" value={props.currentCategory!.label} subtitle={`Pack: ${props.currentCategory!.pack}`} /><RoundCard title="Livello" value={props.currentLevel!.name} subtitle={props.currentLevel!.description} /><RoundCard title="Tipo round" value={props.currentRoundType!.name} subtitle={props.currentRoundType!.description} /></div>
      <section className="card"><h3>{classic ? 'Gioco Classico' : `Round Contesto: ${props.currentRoundType!.name}`}</h3><p>{props.currentRoundType!.setupText}</p><p><strong>Attivo:</strong> {props.currentRoundType!.activePlayerInstruction}</p><p><strong>Avversario:</strong> {props.currentRoundType!.opponentInstruction}</p><p className="muted">Vinci se: {props.currentRoundType!.successCondition}. Perdi se: {props.currentRoundType!.failureCondition}.</p>{classic ? <><p>Tocca a {props.activePlayer} / {props.opponentPlayer}</p><button className="secondary">Tocca a {props.activePlayer}</button><button className="secondary">Tocca a {props.opponentPlayer}</button></> : null}</section>
      <Timer runningKey={props.timerKey} seconds={props.currentRoundType!.suggestedTimerSeconds} />
      <section className="card"><h3>Carte speciali disponibili</h3><div className="cards-grid two-cols">{([{team:'A',name:props.teamAName,cards:props.teamASpecialCards,used:props.usedCardTypeA},{team:'B',name:props.teamBName,cards:props.teamBSpecialCards,used:props.usedCardTypeB}] as const).map(s=><div key={s.team} className="team-specials"><p className="label">{s.name}</p><p className="muted">{s.used?'1/1 usata nel round':'0/1 usata nel round'}</p>{s.cards.map(c=><article key={c.id} className="special-card"><strong>{c.name}</strong><p>{c.cardType}</p><p>{c.description}</p><button disabled={s.used} onClick={()=>props.onUseCard(s.team,c.id)}>Usa carta</button></article>)}</div>)}</div></section>
      <section className="card"><h3>Giudizio del tavolo</h3><button onClick={()=>props.onAssignJudgement('A')}>Punto a {props.teamAName}</button><button onClick={()=>props.onAssignJudgement('B')}>Punto a {props.teamBName}</button><button className="secondary" onClick={()=>props.onAssignJudgement(null)}>Round nullo</button><button className="secondary" onClick={()=>props.onAssignJudgement(null,1,0)}>+1 bonus {props.teamAName}</button><button className="secondary" onClick={()=>props.onAssignJudgement(null,0,1)}>+1 bonus {props.teamBName}</button></section>
    </> : null}
    {props.lastRoundWinner !== null ? <section className="card"><p>Vince il round: {props.lastRoundWinner === 'A' ? props.teamAName : props.teamBName}</p><button onClick={props.onNextRound}>Prossimo round</button></section> : null}
    <section className="card"><details><summary>Storico round</summary>{props.roundHistory.map((r)=><p key={r.roundNumber}>#{r.roundNumber} · {r.roundType} ({r.kind}) · attiva {r.activeTeam} · {r.activePlayer} vs {r.opponentPlayer} · cat {r.category}/{r.categoryPack} · vincitore {r.winner ?? 'nullo'} · punti A:{r.points.A} B:{r.points.B} · bonus A:{r.bonus.A} B:{r.bonus.B} · carte A[{r.usedCardsA.join(', ')||'-'}] B[{r.usedCardsB.join(', ')||'-'}]</p>)}</details></section>
  </main>;
}
