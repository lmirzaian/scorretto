# Non si può più dire niente — MVP offline

Web app **React + TypeScript + Vite** per giocare in locale a una partita party-game con stanza offline, setup squadre, round contestuali, carte speciali, storico e report test serata.

## Avvio

```bash
npm install
npm run dev
```

Build produzione:

```bash
npm run build
```

## Feature MVP

- Stanza offline locale con **nuova stanza**, **riprendi**, **cancella** (persistenza `localStorage`).
- Setup completo: nome stanza, squadre, giocatori, target score, pacchetti categorie.
- Pacchetti inclusi: Province italiane, Religioni (off di default + warning), Famiglia, Italia, Professioni, Vita sociale, Ufficio, Sport, Social network.
- Round con: livello correttezza, categoria da pacchetti attivi, tipo round, no ripetizione immediata categoria.
- Tipi round principali: classico, interrogazione, conferenza stampa, talk show, processo, riunione aziendale, tavolo tecnico istituzionale, cena di famiglia.
- Rotazione automatica giocatori e alternanza squadra attiva.
- Timer (avvia/pausa/reset).
- Punteggio con punto A/B, round nullo, bonus A/B, schermata vittoria.
- Carte speciali jolly/aggravanti (max 3 per squadra, max 1 uso per round).
- Storico round completo.
- Modalità test serata con feedback post-round.
- Report test serata con export JSON e copia testuale.
