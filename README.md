# Non si può più dire niente

Party game pass-and-play a squadre, pensato per serate tra amici: ironia, improvvisazione e round veloci.

## Sprint 3: pacchetti categorie attivabili

In questo sprint il database categorie è stato ristrutturato in **pacchetti (deck)** selezionabili prima della partita, senza toccare la logica principale già funzionante (setup, 2 squadre, timer, punti, carte speciali, vittoria).

### Pacchetti implementati

1. **Province italiane** (default attivo)
2. **Religioni** (default disattivo, pacchetto delicato)
3. **Famiglia** (default attivo)
4. **Italia** (default attivo)
5. **Professioni** (default attivo)

## Nuova selezione pacchetti nel setup

Nella schermata “Nuova partita” trovi la sezione **Pacchetti categorie** con:
- nome;
- descrizione;
- numero categorie;
- tono (`light` / `medium` / `hot`);
- warning (se presente);
- toggle attivo/disattivo.

Regole:
- i pacchetti con `enabledByDefault: true` partono già selezionati;
- **Religioni** parte disattivato;
- se attivi un pacchetto con warning, appare il box:
  - “Patto del tavolo: questo pacchetto può essere delicato. Usatelo solo se tutti sono d’accordo.”

## Nota sul pacchetto delicato “Religioni”

Il pacchetto è pensato per un contesto adulto tra amici, ma nell’MVP contiene solo **etichette giocabili neutrali o contestuali** (nessun insulto hardcoded, slur o attacco diretto).

Warning mostrato nel setup:
> Pacchetto delicato: usatelo solo se il tavolo è d’accordo. La battuta resta responsabilità del tavolo.

## Estrazione categorie

Durante la partita, la categoria viene pescata **solo dai pacchetti attivi**.

- Se nessun pacchetto è attivo, non puoi iniziare e compare:
  - `Seleziona almeno un pacchetto categorie.`
- Nella card round viene mostrato anche il **pacchetto di provenienza** della categoria.

## Sensitivity (base dati pronta per sprint futuri)

Ogni `CategoryItem` include `sensitivity` (`low | medium | high`) per supportare in futuro filtri di correttezza (es. Aperitivo/Cena/Nessun testimone).

In Sprint 3 non è ancora attivo il filtro automatico.

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

## Test manuale Sprint 3

1. Avviare app.
2. Andare su Nuova partita.
3. Verificare che **Famiglia, Italia, Professioni, Province italiane** siano attivi di default.
4. Verificare che **Religioni** sia disattivato di default.
5. Attivare/disattivare pacchetti.
6. Iniziare partita.
7. Estrarre più round.
8. Verificare che le categorie escano solo dai pacchetti attivi.
9. Verificare che venga mostrato il nome del pacchetto della categoria.
10. Verificare che con nessun pacchetto attivo non si possa iniziare.
11. Verificare che punteggio, timer, carte speciali e vittoria funzionino ancora.
