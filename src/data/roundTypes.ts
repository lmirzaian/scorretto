import type { RoundType } from '../types/game';

export const roundTypes: RoundType[] = [
  { id: 'classico', name: 'Gioco Classico', prompt: 'Botta e risposta rapido', instruction: 'Alternatevi: 10 secondi a testa per dire un luogo comune sulla categoria.', isClassic: true },
  { id: 'interrogazione', name: 'Interrogazione scolastica', prompt: 'Prof contro studente', instruction: 'Un giocatore risponde “alla lavagna”, l’avversario incalza come professore.', isClassic: false },
  { id: 'conferenza', name: 'Conferenza stampa', prompt: 'Domande dei giornalisti', instruction: 'Parla in stile ufficiale; l’avversario fa domande pungenti dal pubblico.', isClassic: false },
  { id: 'talk-show', name: 'Talk show', prompt: 'Panel acceso', instruction: 'Difendi la tua tesi comica mentre l’avversario interrompe da opinionista.', isClassic: false },
  { id: 'processo', name: 'Processo in tribunale', prompt: 'Arringa e obiezioni', instruction: 'Uno difende la battuta, l’altro attacca da pubblico ministero.', isClassic: false },
  { id: 'riunione', name: 'Riunione aziendale', prompt: 'Sinergie improbabili', instruction: 'Trasforma il luogo comune in proposta “strategica”, sotto pressione dell’avversario.', isClassic: false },
  { id: 'tavolo-tecnico', name: 'Tavolo tecnico istituzionale', prompt: 'Tono istituzionale', instruction: 'Usa linguaggio formale: se reggi il personaggio e fai ridere, hai vantaggio.', isClassic: false },
  { id: 'cena-famiglia', name: 'Cena di famiglia', prompt: 'Parenti invadenti', instruction: 'Difendi la tua battuta mentre l’avversario impersona il parente polemico.', isClassic: false },
];
