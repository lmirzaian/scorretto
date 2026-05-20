import type { RoundType } from '../types/game';

export const roundTypes: RoundType[] = [
  {
    id: 'classico', name: 'Gioco Classico', kind: 'classic', description: 'Botta e risposta rapido a tavolo.',
    setupText: 'I due giocatori si alternano: 10 secondi a testa.',
    activePlayerInstruction: 'Dì un luogo comune sulla categoria estratta.',
    opponentInstruction: 'Ascolta, valuta blocchi/ripetizioni e preparati al giudizio.',
    successCondition: 'Resti fluido e fai ridere il tavolo.', failureCondition: 'Ti blocchi, ripeti o cala il ritmo comico.',
    suggestedTimerSeconds: 10, allowsInterruption: false, allowsDefense: false, allowsSteal: false,
  },
  ...[
    ['interrogazione', 'Interrogazione scolastica', 'Interrogato alla lavagna, con professore ostile.'],
    ['conferenza', 'Conferenza stampa', 'Portavoce ufficiale sotto domande scomode.'],
    ['talk-show', 'Talk show', 'Panel acceso con possibili interruzioni.'],
    ['processo', 'Processo in tribunale', 'Accusa, obiezioni e difesa finale.'],
    ['riunione', 'Riunione aziendale', 'Corporateese estremo sotto pressione KPI.'],
    ['tavolo-tecnico', 'Tavolo tecnico istituzionale', 'Versione istituzionale del luogo comune.'],
    ['cena-famiglia', 'Cena di famiglia', 'Parente che giudica e peggiora la scena.'],
  ].map(([id, name, description]) => ({
    id, name, description, kind: 'context' as const,
    setupText: 'Fase performance, intervento avversario e difesa guidata.',
    activePlayerInstruction: 'Presenta il luogo comune nel ruolo del contesto.',
    opponentInstruction: 'Intervieni con domanda/obiezione coerente col contesto.',
    successCondition: 'Difesa credibile e comica fino al giudizio del tavolo.',
    failureCondition: 'Incoerenza, blocco o perdita della spinta comica.',
    suggestedTimerSeconds: 15, allowsInterruption: true, allowsDefense: true, allowsSteal: id === 'talk-show',
  })),
];
