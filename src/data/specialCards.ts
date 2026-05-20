import type { SpecialCard } from '../types/game';

const jolly = (id: string, name: string, timing: SpecialCard['timing'], effectText: string, weight = 10): SpecialCard => ({
  id, name, description: `Carta jolly: ${name}.`, effectText, timing, pack: 'base', cardType: 'jolly', maxUsesPerRound: 1, weight,
});
const aggravante = (id: string, name: string, timing: SpecialCard['timing'], effectText: string, weight = 10): SpecialCard => ({
  id, name, description: `Carta aggravante: ${name}.`, effectText, timing, pack: 'base', cardType: 'aggravante', bonusAvailable: true, weight,
});

export const specialCardsDeck: SpecialCard[] = [
  jolly('scaricabarile', 'Scaricabarile', 'judging', 'Se la difesa crolla, chiedi annullamento del punto avversario.', 4),
  jolly('interrogazione-doppia', 'Interrogazione doppia', 'beforeRound', 'Giocate il round in coppia, uno apre e uno chiude.', 6),
  jolly('avvocato-difensore', 'Avvocato difensore', 'duringRound', 'Un compagno interviene con una mini difesa.', 6),
  ...['Suggerimento da casa','Obiezione!','Cambio contesto','Mi dissocio','Testimone ostile','Due contro uno','Rilancio obbligatorio','Assist involontario','Chiamata da casa','Inversione dei ruoli','Cambio categoria','Ultima parola','Ricorso al tavolo','Immunità diplomatica','Microfono rubato','Domanda scomoda','Peggiora tu','Salvataggio in corner','Colpo basso autorizzato','Rinvio a giudizio','Silenzio stampa','Consulente esterno'].map((n, i) => jolly(`jolly-${i}`, n, i % 4 === 0 ? 'beforeRound' : i % 4 === 1 ? 'duringRound' : i % 4 === 2 ? 'afterRound' : 'judging', 'Applica l’effetto dichiarato dal nome in modo concordato dal tavolo.', i % 7 === 0 ? 4 : i % 9 === 0 ? 2 : 10)),
  aggravante('statistica', 'Falla sembrare una statistica', 'duringRound', 'Bonus se reggi tono pseudo-analitico fino a fine turno.', 10),
  aggravante('comunicato', 'Dilla come un comunicato ufficiale', 'duringRound', 'Bonus se mantieni lessico istituzionale.', 10),
  ...['Non voglio generalizzare, ma…','Con affetto','Peggiorala all’ultimo','Finto complimento','Tono istituzionale','Da zio al pranzo di Natale','Da persona che poi dice “scherzavo”','Da gruppo WhatsApp','Da bar alle 2 di notte','Da presentazione PowerPoint','Da titolo di giornale','Da ricerca scientifica discutibile','Da confessionale','Da post LinkedIn','Da recensione Google','Da proposta politica','Da manuale di sopravvivenza','Da documentario di Piero Angela','Da televendita','Da messaggio vocale','Da cartello passivo-aggressivo','Da frase motivazionale','Da commento sotto un articolo','Da oroscopo','Da comunicazione HR','Da verbale di condominio','Da bugiardino','Da slide ministeriale'].map((n, i) => aggravante(`aggravante-${i}`, n, i % 3 === 0 ? 'beforeRound' : i % 3 === 1 ? 'duringRound' : 'judging', 'Se integri il vincolo fino al giudizio, puoi richiedere +1 bonus.', i % 8 === 0 ? 4 : 10)),
];
