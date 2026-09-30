# Scheda corpo libero

App Angular per la scheda di allenamento a corpo libero, 5 sedute a settimana, con tre livelli (base, intermedio, avanzato).

## Sviluppo

```bash
npm install
npm start
```

## Media mancanti

Gli esercizi senza immagine nel database esterno leggono due frame da `public/assets/exercises/<slug>/0.jpg` e `1.jpg`. Il percorso esatto è mostrato nella card al posto dell'immagine.

## Deploy

Push su `main`: il workflow `.github/workflows/deploy.yml` pubblica su GitHub Pages. Impostazioni repo: Pages > Source: GitHub Actions.
