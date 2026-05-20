import type { SpecialCard } from '../types/game';

export const specialCardsDeck: SpecialCard[] = [
  { id: 'scaricabarile', name: 'Scaricabarile', description: 'Se la difesa va male, puoi annullare la perdita del punto.', pack: 'base', cardType: 'jolly' },
  { id: 'interrogazione-doppia', name: 'Interrogazione doppia', description: 'Due giocatori della tua squadra partecipano insieme al round.', pack: 'base', cardType: 'jolly' },
  { id: 'avvocato', name: 'Avvocato difensore', description: 'Un compagno può intervenire per salvarti durante un processo.', pack: 'base', cardType: 'jolly' },
  { id: 'suggerimento', name: 'Suggerimento da casa', description: 'La squadra può suggerire una parola chiave prima della risposta.', pack: 'base', cardType: 'jolly' },
  { id: 'obiezione', name: 'Obiezione!', description: 'Puoi interrompere una difesa avversaria una volta.', pack: 'base', cardType: 'jolly' },
  { id: 'dissocio', name: 'Mi dissocio', description: 'Puoi fare una battuta più audace iniziando con “mi dissocio”.', pack: 'base', cardType: 'jolly' },
  { id: 'statistica', name: 'Falla sembrare una statistica', description: 'Bonus aggravante riuscito: +1 se il tavolo lo conferma.', pack: 'base', cardType: 'aggravante' },
  { id: 'comunicato', name: 'Dilla come un comunicato ufficiale', description: 'Bonus aggravante riuscito: +1 se reggi il tono fino alla fine.', pack: 'base', cardType: 'aggravante' },
];
