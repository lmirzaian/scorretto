import type { SpecialCard } from '../types/game';

export const specialCardsDeck: SpecialCard[] = [
  { id: 'scaricabarile', name: 'Scaricabarile', description: 'Se la difesa va male, puoi annullare la perdita del punto.', pack: 'base' },
  { id: 'interrogazione-doppia', name: 'Interrogazione doppia', description: 'Due giocatori della tua squadra partecipano insieme al round.', pack: 'base' },
  { id: 'avvocato', name: 'Avvocato difensore', description: 'Un compagno può intervenire per salvarti durante un processo.', pack: 'base' },
  { id: 'suggerimento', name: 'Suggerimento da casa', description: 'La squadra può suggerire una parola chiave prima della risposta.', pack: 'base' },
  { id: 'obiezione', name: 'Obiezione!', description: 'Puoi interrompere una difesa avversaria una volta.', pack: 'base' },
  { id: 'dissocio', name: 'Mi dissocio', description: 'Puoi fare una battuta più audace iniziando con “mi dissocio”.', pack: 'base' },
  { id: 'statistica', name: 'Falla sembrare una statistica', description: 'Se la trasformi in dato finto comico, ottieni +1 bonus narrativo.', pack: 'base' },
  { id: 'comunicato', name: 'Dilla come un comunicato ufficiale', description: 'Mantieni tono istituzionale e strappa risate per effetto bonus.', pack: 'base' },
];
