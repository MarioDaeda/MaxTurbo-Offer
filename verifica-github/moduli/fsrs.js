/*
 * FSRS-4.5 (Free Spaced Repetition Scheduler): calcola quando ripassare una scheda.
 *
 * Implementazione scritta da zero sulle formule pubbliche di FSRS-4.5
 * (open-spaced-repetition, licenza MIT: https://github.com/open-spaced-repetition/fsrs4.5).
 * Il modulo di OpenTutor (zijinz456/OpenTutor, MIT) è stato letto ma non copiato:
 * mescola la formula FSRS-5 della difficoltà iniziale con i pesi di FSRS-4, e così
 * le risposte "Bene" e "Facile" finiscono entrambe alla difficoltà minima.
 *
 * Nessuna AI: solo aritmetica. Funziona nel browser (window.FSRS) e in Node (require).
 *
 * Voti: 1 = Di nuovo (non ricordato), 2 = Difficile, 3 = Bene, 4 = Facile.
 * Tempi in millisecondi (Date.now()), intervalli in giorni.
 */
(function (root) {
  "use strict";

  // Pesi predefiniti di FSRS-4.5 (ottimizzati sul dataset pubblico di Anki)
  const PESI = [
    0.4872, 1.4003, 3.7145, 13.8206, // w0–w3: stabilità iniziale per voto
    5.1618, 1.2298, 0.8975, 0.031,   // w4–w7: difficoltà
    1.6474, 0.1367, 1.0461,          // w8–w10: stabilità dopo un ricordo
    2.1072, 0.0793, 0.3246, 1.587,   // w11–w14: stabilità dopo un oblio
    0.2272, 2.8755,                  // w15: penalità "Difficile", w16: bonus "Facile"
  ];

  const DECADIMENTO = -0.5;
  const FATTORE = 19 / 81; // con questo fattore R(S) = 90%
  const GIORNO_MS = 86400000;
  const RITENZIONE_OBIETTIVO = 0.9;

  const limita = (x, min, max) => Math.min(Math.max(x, min), max);

  /** Probabilità di ricordare dopo `giorni`, data la stabilità `s` (in giorni). */
  function ricordabilita(giorni, s) {
    if (s <= 0) return 0;
    return Math.pow(1 + (FATTORE * giorni) / s, DECADIMENTO);
  }

  /** Giorni da attendere perché la ricordabilità scenda alla ritenzione voluta. */
  function intervallo(s, ritenzione = RITENZIONE_OBIETTIVO) {
    const giorni = (s / FATTORE) * (Math.pow(ritenzione, 1 / DECADIMENTO) - 1);
    return limita(Math.round(giorni), 1, 36500);
  }

  function stabilitaIniziale(voto, w = PESI) {
    return Math.max(w[voto - 1], 0.1);
  }

  function difficoltaIniziale(voto, w = PESI) {
    return limita(w[4] - (voto - 3) * w[5], 1, 10);
  }

  function difficoltaSuccessiva(d, voto, w = PESI) {
    const dopo = d - w[6] * (voto - 3);
    // ritorno verso la media: evita che una scheda resti per sempre "difficilissima"
    return limita(w[7] * difficoltaIniziale(3, w) + (1 - w[7]) * dopo, 1, 10);
  }

  function stabilitaDopoRicordo(d, s, r, voto, w = PESI) {
    const penalita = voto === 2 ? w[15] : 1;
    const bonus = voto === 4 ? w[16] : 1;
    return s * (1 + Math.exp(w[8]) * (11 - d) * Math.pow(s, -w[9]) * (Math.exp((1 - r) * w[10]) - 1) * penalita * bonus);
  }

  function stabilitaDopoOblio(d, s, r, w = PESI) {
    const nuova = w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) * Math.exp((1 - r) * w[14]);
    // dimenticare non può rendere il ricordo più stabile di prima
    return Math.max(Math.min(nuova, s), 0.1);
  }

  /** Scheda nuova, mai ripassata. */
  function nuovaScheda(id, titolo) {
    return {
      id, titolo,
      stato: "nuova",            // nuova | apprendimento | ripasso | riapprendimento
      difficolta: 0,
      stabilita: 0,
      ripetizioni: 0,
      dimenticanze: 0,
      ultimoRipasso: null,
      scadenza: null,
    };
  }

  /** Registra un ripasso e restituisce la scheda aggiornata (non modifica l'originale). */
  function rivedi(scheda, voto, ora = Date.now()) {
    if (![1, 2, 3, 4].includes(voto)) throw new RangeError("Il voto deve essere 1, 2, 3 o 4");
    const s = { ...scheda };
    const giorni = s.ultimoRipasso == null ? 0 : Math.max((ora - s.ultimoRipasso) / GIORNO_MS, 0);

    if (s.ripetizioni === 0) {
      s.difficolta = difficoltaIniziale(voto);
      s.stabilita = stabilitaIniziale(voto);
      s.stato = voto < 3 ? "apprendimento" : "ripasso";
    } else {
      const r = ricordabilita(giorni, s.stabilita);
      const d = s.difficolta;
      s.difficolta = difficoltaSuccessiva(d, voto);
      if (voto === 1) {
        s.stabilita = stabilitaDopoOblio(d, s.stabilita, r);
        s.dimenticanze += 1;
        s.stato = "riapprendimento";
      } else {
        s.stabilita = stabilitaDopoRicordo(d, s.stabilita, r, voto);
        s.stato = "ripasso";
      }
    }

    s.ripetizioni += 1;
    s.ultimoRipasso = ora;
    const giorniAttesa = voto === 1 || s.stato === "apprendimento" ? 1 : intervallo(s.stabilita);
    s.scadenza = ora + giorniAttesa * GIORNO_MS;
    return s;
  }

  /** Quante schede scadute il corsista rischia di aver dimenticato (somma di 1 − R). */
  function costoOblio(schede, ora = Date.now()) {
    let totale = 0;
    for (const s of schede) {
      if (s.scadenza == null || s.scadenza > ora || s.stabilita <= 0) continue;
      const giorni = (ora - s.ultimoRipasso) / GIORNO_MS;
      totale += 1 - ricordabilita(giorni, s.stabilita);
    }
    return Math.round(totale * 100) / 100;
  }

  /** Schede da ripassare adesso, le più a rischio per prime. */
  function daRipassare(schede, ora = Date.now()) {
    return schede
      .filter((s) => s.scadenza != null && s.scadenza <= ora)
      .map((s) => ({ ...s, ricordo: ricordabilita((ora - s.ultimoRipasso) / GIORNO_MS, s.stabilita) }))
      .sort((a, b) => a.ricordo - b.ricordo);
  }

  const FSRS = {
    PESI, GIORNO_MS, ricordabilita, intervallo, nuovaScheda, rivedi, costoOblio, daRipassare,
    difficoltaIniziale, difficoltaSuccessiva, stabilitaIniziale,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = FSRS;
  else root.FSRS = FSRS;
})(typeof globalThis !== "undefined" ? globalThis : this);
