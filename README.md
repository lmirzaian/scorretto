# Non si può più dire niente

## Sprint 7

Sprint 7 introduce la **Modalità test serata** per raccogliere feedback rapido sui round e capire cosa tenere, modificare o scartare in vista di una possibile versione cartacea.

### Novità principali
- Toggle `Modalità test serata` nel setup stanza offline.
- Feedback rapido post-round (risata 1-5, verdetti categoria/contesto/carta, note opzionali).
- Feedback salvato nello storico round e persistito in `localStorage`.
- Sezione `Report test serata` con riepilogo partita e risata media.
- Accesso al report da partita in corso, home (se esiste partita salvata) e schermata vittoria.
- Pulsante `Cancella feedback serata` (cancella solo feedback/note).

### Come si usa
1. Attiva Modalità test serata nel setup.
2. Gioca normalmente.
3. Dopo l’assegnazione punto, compila (o salta) il feedback rapido.
4. Apri `Report test serata` per leggere risultati e note.

### Test manuale Sprint 7
Seguire i 23 step richiesti dallo sprint (setup, almeno 5 round, feedback salvato/saltato, report, refresh, vittoria).

## Avvio app
```bash
npm install
npm run dev
npm run build
```
