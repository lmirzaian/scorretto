# Non si può più dire niente

## Sprint 5

Sprint 5 introduce un **motore round avanzato** con distinzione netta fra:
- **Gioco Classico** (`kind: classic`)
- **Round Contesto** (`kind: context`)

### Novità principali
- Modello round type esteso (`description`, `setupText`, istruzioni attivo/avversario, condizioni, timer suggerito, flag interruzione/difesa/furto).
- Macchina a stati round: `ready → extracted → performance → opponentIntervention → defense → judging → roundSummary` (con percorso ridotto per il classico).
- UI round con: fase corrente, microcopy teatrale, istruzioni attore/avversario, avanzamento fase.
- Sezione dedicata **Gioco Classico** con timer 10s e supporto alternanza al tavolo.
- Sezione dedicata **Round Contesto** per i contesti: interrogazione, conferenza stampa, talk show, processo, riunione aziendale, tavolo tecnico istituzionale, cena di famiglia.
- Ruolo squadra attiva esplicito e alternanza A/B ad ogni round.
- Carte speciali durante il round: massimo 1 uso per squadra/round, scarto immediato e registrazione nello storico.
- Distinzione carte: **Jolly** e **Aggravante**.
- Giudizio del tavolo con: punto A/B, round nullo, bonus +1 A/B.
- Storico round migliorato e collassabile con metadati completi del round.
- Persistenza partita con `localStorage`.

## Regole Sprint 5 (sintesi)
- L’app guida i turni e il ritmo scenico.
- Nessun backend, multiplayer online, login, pagamenti, database remoto.
- Contenuti hardcoded non offensivi: la battuta resta responsabilità del tavolo.

## Test manuale Sprint 5
1. Avviare app.
2. Creare o riprendere stanza offline.
3. Inserire giocatori.
4. Iniziare partita.
5. Estrarre un round Gioco Classico.
6. Verificare timer e pulsanti punto.
7. Estrarre un round Contesto.
8. Verificare fasi performance/intervento/difesa/giudizio.
9. Usare una carta Jolly.
10. Usare una carta Aggravante.
11. Assegnare punto e bonus.
12. Verificare storico round.
13. Ricaricare pagina e verificare salvataggio.
14. Arrivare alla vittoria finale.

## Avvio app
```bash
npm install
npm run dev
npm run build
```
