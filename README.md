# Non si può più dire niente — MVP

Prototype mobile-first pass-and-play di un party game a squadre, pensato per una singola serata tra amici usando un solo telefono/tablet.

## Stack
- React + TypeScript + Vite
- CSS semplice (senza librerie UI pesanti)
- Dati gioco separati in file TypeScript in `src/data`

## Avvio locale
```bash
npm install
npm run dev
```
Apri poi l'URL mostrato da Vite (di default `http://localhost:5173`).

## Regole principali implementate
1. **Home** con titolo, descrizione e pulsante “Nuova partita”.
2. **Setup** con nomi squadra A/B e punteggio obiettivo (default 10).
3. **Round screen** con:
   - scoreboard,
   - numero round,
   - squadra che inizia,
   - estrazione casuale di livello + categoria + tipo round,
   - istruzioni specifiche del tipo round.
4. **Timer 10 secondi** per supportare il ritmo del turno.
5. **Assegnazione punto** a Squadra A/B o **Round nullo / ripeti**.
6. **Carte speciali**:
   - pesca manuale per entrambe le squadre,
   - pesca automatica per la squadra perdente quando assegni un punto,
   - massimo 3 carte per squadra,
   - possibilità di scartare una carta usata.
7. **Fine partita** quando una squadra raggiunge il target, con schermata vittoria e reset.

## Struttura principale
- `src/types/game.ts`: tipi e stato gioco.
- `src/data/*`: livelli, categorie, tipi round, carte speciali (espandibili per future espansioni/pack).
- `src/components/*`: componenti UI riutilizzabili.
- `src/App.tsx`: orchestrazione stato globale e flussi di gioco.

## Sviluppi futuri suggeriti
- Bilanciamento round types e gestione avanzata effetti carte.
- Modalità multiplayer online e sincronizzazione stato.
- Pacchetti/espansioni caricabili dinamicamente.
- Storico partite, statistiche, timer per entrambi i giocatori.
- Moderazione contenuti e “mood packs” configurabili.
