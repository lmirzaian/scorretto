# Non si può più dire niente

Party game pass-and-play a squadre, pensato per serate tra amici: ironia, improvvisazione e round veloci.

## Sprint 2: miglioramenti introdotti

- Restyling completo mobile-first con atmosfera “verbale censurato / party game scorretto”.
- Landing screen con titolo/sottotitolo, descrizione e disclaimer ironico.
- Setup partita più leggibile con card separate per Squadra A e B.
- Scoreboard scenografica con highlight della squadra in vantaggio.
- Carte round più chiare e differenziazione visiva dei livelli (Aperitivo / Cena tra amici / Nessun testimone).
- Timer migliorato con comandi Avvia, Pausa e Reset + stato urgente sotto i 4 secondi.
- Pulsanti round/punti più grandi e chiari.
- Pannello carte speciali separato per squadra, mini-card con effetto e azione “Usa / Scarta”.
- Sezione “Fine round” con vincitore e call-to-action “Prossimo round”.
- Schermata vittoria migliorata con messaggio ironico casuale.

## Avvio app

1. Installa dipendenze:
   ```bash
   npm install
   ```
2. Avvia in sviluppo:
   ```bash
   npm run dev
   ```
3. Build produzione:
   ```bash
   npm run build
   ```

## Test manuale consigliato

1. Avviare app.
2. Creare partita (anche con campi nome vuoti per verificare fallback Squadra A/B).
3. Estrarre round (livello/categoria/tipo).
4. Usare timer (avvio, pausa, reset, countdown urgente).
5. Assegnare punto a una squadra o fare round nullo.
6. Verificare pesca/scarto carte speciali (limite max 3).
7. Proseguire fino alla schermata vittoria.

## Sprint 3 (idee)

- Database strutturato di categorie, contesti, aggravanti e jolly.
- Pacchetti tematici attivabili/disattivabili.
- Bilanciamento statistico dei contenuti per evitare ripetizioni.
