# Non si può più dire niente

## Sprint 6

Sprint 6 amplia in modo strutturato i contenuti mantenendo il gioco **offline, mobile-first, a squadre**.

### Contenuti categoria
Pacchetti presenti:
- Province italiane
- Religioni *(delicato, disattivato di default)*
- Famiglia
- Italia
- Professioni
- Vita sociale

Ogni pacchetto definisce: `id`, `name`, `description`, `tone`, `enabledByDefault`, `warning?`, `categories[]`.
Ogni categoria definisce: `id`, `label`, `packId`, `tags`, `sensitivity`, `notes?`.

### Pacchetti delicati
`Religioni` resta `tone: hot`, `enabledByDefault: false`, con warning esplicito sul consenso del tavolo.

### Round / contesti
- Gioco Classico
- Interrogazione scolastica
- Conferenza stampa
- Talk show
- Processo in tribunale
- Riunione aziendale
- Tavolo tecnico istituzionale
- Cena di famiglia
- Podcast motivazionale
- Comizio politico
- Riunione di condominio
- Colloquio di lavoro
- Terapia di coppia
- Consiglio comunale
- Aperitivo dopo il terzo spritz
- Servizio del telegiornale
- Documentario serio
- Dibattito universitario
- Telefonata con la mamma
- Gruppo WhatsApp infuocato

Ogni round type include anche `weight` per bilanciare l’estrazione.

### Carte speciali
Mazzo esteso con:
- Jolly (es. Scaricabarile, Cambio contesto, Inversione dei ruoli, ecc.)
- Aggravanti (es. Falla sembrare una statistica, Da post LinkedIn, Da slide ministeriale, ecc.)

Ogni carta ora include metadati (`effectText`, `timing`) e `weight`.

### Bilanciamento
- Estrazione round type pesata (`Gioco Classico` più frequente).
- Anti-ripetizione immediata categoria.
- Anti-ripetizione immediata round type (eccetto classico).

### UI setup / mazzi
Nel setup è disponibile un riepilogo con:
- pacchetti categorie e conteggio;
- pacchetti attivi;
- totale categorie pescabili;
- contesti disponibili;
- numero jolly;
- numero aggravanti.

## Test manuale Sprint 6
1. Avvia app.
2. Crea stanza offline.
3. Attiva/disattiva pacchetti.
4. Verifica totale categorie pescabili.
5. Inizia partita.
6. Estrai almeno 15 round.
7. Verifica che il Gioco Classico esca spesso ma non sempre.
8. Verifica comparsa contesti.
9. Verifica anti-ripetizione categoria consecutiva.
10. Usa jolly.
11. Usa aggravanti.
12. Assegna bonus aggravante.
13. Controlla storico round.
14. Ricarica e verifica localStorage.
15. Arriva alla vittoria.
16. Controlla regressioni.

## Avvio app
```bash
npm install
npm run dev
npm run build
```
