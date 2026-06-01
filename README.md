# Wordle Calcio — Teaser embeddabile

Mini-Wordle di Universo Sportivo da inserire dentro gli articoli via iframe.
Layout orizzontale e compatto. A fine partita mostra una call-to-action verso la pagina dei quiz completi.

---

## 🚀 Deploy su Vercel (passo passo)

### 1. Carica su GitHub
- Crea un nuovo repository su GitHub (es. `universo-wordle-teaser`)
- Carica tutti i file di questa cartella (puoi trascinarli nell'interfaccia web di GitHub, **escludi** `node_modules` e `dist`)

### 2. Collega Vercel
- Vai su [vercel.com](https://vercel.com) → **Add New** → **Project**
- Importa il repository appena creato
- Vercel rileva automaticamente Vite — lascia tutto com'è e premi **Deploy**

### 3. Ottieni l'URL
Dopo il deploy avrai un URL tipo `https://universo-wordle-teaser.vercel.app`

---

## 📌 Come inserirlo in un articolo WordPress

Aggiungi un blocco **HTML personalizzato** nell'articolo e incolla:

```html
<iframe
  src="https://universo-wordle-teaser.vercel.app"
  style="width:100%; max-width:660px; height:560px; border:none; display:block; margin:0 auto;"
  loading="lazy"
  title="Wordle Calcio - Universo Sportivo">
</iframe>
```

**Note sull'altezza:**
- Su **desktop** griglia e tastiera sono affiancate → `420px` basta
- Su **mobile** la tastiera si sposta automaticamente sotto la griglia → servono ~`560px`
- Consiglio: usa `height:560px` così va bene su entrambi (su desktop avanza un po' di spazio sotto, innocuo)
- Il box ha `max-width:660px` e si centra da solo

---

## ⚙️ Personalizzazioni rapide

Tutto è in `src/App.jsx`:

| Cosa | Dove | Valore attuale |
|------|------|----------------|
| Link pagina quiz | `QUIZ_URL` (riga ~10) | `https://universosportivo.com/quiz-calcio/` |
| Testo invito | sezione "CALL TO ACTION" | "Vuoi giocare ancora?..." |
| Tentativi | costante `MAX` | `6` |
| Pool giocatori | array `POOL` | 311 cognomi Serie A (4-7 lettere) |

### Parola del giorno
È **uguale per tutti gli embed** e cambia ogni giorno (basata sulla data).
Tutti gli articoli che contengono l'iframe mostrano lo stesso cognome nello stesso giorno.

---

## 🛠 Sviluppo locale (opzionale)

```bash
npm install
npm run dev      # apre su localhost:5173
npm run build    # genera la cartella dist/
```

---

## 📁 Struttura

```
wordle-teaser/
├── index.html          # entry point (sfondo trasparente per iframe)
├── package.json
├── vite.config.js
├── vercel.json         # headers per permettere l'embed su universosportivo.com
├── src/
│   ├── main.jsx        # bootstrap React
│   └── App.jsx         # tutto il gioco + pool + CTA
└── README.md
```
