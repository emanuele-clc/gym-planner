# Scheda corpo libero

App Angular per un programma di allenamento a corpo libero: 5 sedute a settimana, 3 livelli (base, intermedio, avanzato), immagini per ogni esercizio, registrazione delle serie e timer di recupero. Pensata per il telefono.

**Sito:** https://emanuele-clc.github.io/gym-planner/

## Funzioni

- Settimana: Push, Pull, Gambe + core, Upper, Gambe + core (lunedì, martedì, mercoledì, venerdì, sabato)
- Cambio livello: variante dell'esercizio, serie, ripetizioni e recupero si aggiornano
- Immagini a due frame per ogni esercizio
- Registrazione delle ripetizioni per serie, salvata nel browser (localStorage)
- Timer di recupero per esercizio
- Storico delle sedute
- Guida: serie settimanali per muscolo, progressione, recupero, alimentazione

## Installazione sul telefono

- Android (Chrome): menu ⋮ > Aggiungi a schermata Home
- iPhone (Safari): Condividi > Aggiungi alla schermata Home

## Stack

- Angular (componenti standalone, signals)
- Tailwind CSS
- TypeScript strict

## Sviluppo

```bash
npm install
npm start
```

## Media

- Foto: [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (Unlicense)
- Illustrazioni: Exercise data by [RepDB](https://repdb.co) (repdb.co), licenza free tier con attribuzione

Le immagini sono caricate direttamente dai repository originali. In `public/assets/exercises/` si possono aggiungere file propri; se un'immagine non si carica, la card mostra il percorso atteso.

## Deploy

Ogni push su `main` avvia `.github/workflows/deploy.yml`, che compila e pubblica su GitHub Pages.

Impostazione richiesta: Settings > Pages > Source: **GitHub Actions**.
