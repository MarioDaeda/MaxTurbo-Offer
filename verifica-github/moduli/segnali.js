/*
 * Segnali di abbandono: stima, da dati di comportamento, quali corsisti stanno smettendo
 * di praticare il metodo, e spiega al tutor perché.
 *
 * Ispirato ai segnali comportamentali di OpenTutor (zijinz456/OpenTutor, MIT,
 * apps/api/services/cognitive_load.py): durata delle sessioni, errori, serie di errori,
 * richieste di aiuto. OpenTutor però misura il sovraccarico dentro una conversazione;
 * qui misuriamo il calo di pratica tra una settimana e l'altra, che è il KPI del pilota.
 *
 * Nessuna AI e nessun dato inviato altrove: regole trasparenti, ogni punteggio ha i suoi motivi.
 * Pesi e soglie sono ipotesi da tarare sui dati del pilota.
 */
(function (root) {
  "use strict";

  const FSRS = typeof module !== "undefined" && module.exports ? require("./fsrs.js") : root.FSRS;
  const GIORNO_MS = 86400000;

  const PESI = {
    inattivita: 0.30,      // giorni dall'ultima sessione
    calo_frequenza: 0.20,  // sessioni negli ultimi 7 giorni rispetto ai 7 precedenti
    sessioni_brevi: 0.15,  // durata recente rispetto alla sua abitudine
    errori: 0.10,          // precisione recente sotto l'obiettivo
    ripassi_saltati: 0.15, // schede scadute che rischia di aver dimenticato (FSRS)
    richieste_aiuto: 0.10, // quante volte si blocca e chiede aiuto
  };
  const SOGLIE = { alto: 0.55, medio: 0.30 };
  const OBIETTIVO_PRECISIONE = 0.7;

  const limita01 = (x) => Math.min(Math.max(x, 0), 1);
  const mediana = (xs) => {
    if (!xs.length) return 0;
    const o = [...xs].sort((a, b) => a - b);
    const m = Math.floor(o.length / 2);
    return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
  };

  /**
   * corsista = {
   *   nome,
   *   sessioni: [{ data (ms), minuti, domande, corrette, aiuti }],
   *   schede:   [schede FSRS]
   * }
   * Restituisce { punteggio 0–1, livello, segnali, motivi[], azione }.
   */
  function valuta(corsista, ora = Date.now()) {
    const sessioni = [...(corsista.sessioni || [])].sort((a, b) => a.data - b.data);
    const ultimi7 = sessioni.filter((s) => ora - s.data <= 7 * GIORNO_MS);
    const precedenti7 = sessioni.filter((s) => ora - s.data > 7 * GIORNO_MS && ora - s.data <= 14 * GIORNO_MS);
    const segnali = {};
    const motivi = [];

    // 1. Inattività: 0 fino a 1 giorno, 1 da 7 giorni in su
    const ultima = sessioni.length ? sessioni[sessioni.length - 1].data : null;
    const giorniFermo = ultima == null ? 14 : (ora - ultima) / GIORNO_MS;
    segnali.inattivita = limita01((giorniFermo - 1) / 6);
    if (giorniFermo >= 3) motivi.push(ultima == null ? "Non ha mai usato il Preparatore AI" : `Nessuna sessione da ${Math.floor(giorniFermo)} giorni`);

    // 2. Calo di frequenza rispetto alla settimana prima
    segnali.calo_frequenza = precedenti7.length ? limita01(1 - ultimi7.length / precedenti7.length) : 0;
    if (segnali.calo_frequenza >= 0.5) motivi.push(`Sessioni scese da ${precedenti7.length} a ${ultimi7.length} in una settimana`);

    // 3. Sessioni più brevi della sua abitudine (ultime 3 contro le precedenti)
    const recenti = sessioni.slice(-3).map((s) => s.minuti);
    const abitudine = sessioni.slice(0, -3).map((s) => s.minuti);
    if (abitudine.length >= 2 && recenti.length) {
      const base = mediana(abitudine);
      segnali.sessioni_brevi = base > 0 ? limita01(1 - mediana(recenti) / base) : 0;
      if (segnali.sessioni_brevi >= 0.4) motivi.push(`Sessioni accorciate: ${Math.round(mediana(recenti))} min contro i suoi soliti ${Math.round(base)}`);
    } else {
      segnali.sessioni_brevi = 0;
    }

    // 4. Precisione recente sotto l'obiettivo
    const domande = ultimi7.reduce((t, s) => t + (s.domande || 0), 0);
    const corrette = ultimi7.reduce((t, s) => t + (s.corrette || 0), 0);
    if (domande >= 5) {
      const precisione = corrette / domande;
      segnali.errori = limita01(1 - precisione / OBIETTIVO_PRECISIONE);
      if (precisione < 0.5) motivi.push(`Risponde bene solo al ${Math.round(precisione * 100)}% delle domande`);
    } else {
      segnali.errori = 0;
    }

    // 5. Ripassi saltati: schede scadute che probabilmente ha dimenticato
    const costo = FSRS.costoOblio(corsista.schede || [], ora);
    segnali.ripassi_saltati = limita01(costo / 4);
    if (costo >= 1.5) motivi.push(`Ripassi in ritardo: rischia di aver dimenticato circa ${Math.round(costo)} concetti`);

    // 6. Richieste di aiuto per sessione
    const aiuti = ultimi7.reduce((t, s) => t + (s.aiuti || 0), 0);
    segnali.richieste_aiuto = ultimi7.length ? limita01(aiuti / ultimi7.length / 3) : 0;
    if (segnali.richieste_aiuto >= 0.6) motivi.push("Si blocca spesso e chiede aiuto");

    let punteggio = 0;
    for (const [nome, peso] of Object.entries(PESI)) punteggio += segnali[nome] * peso;
    punteggio = Math.round(limita01(punteggio) * 100) / 100;

    let livello = punteggio >= SOGLIE.alto ? "alto" : punteggio >= SOGLIE.medio ? "medio" : "basso";
    // Un solo segnale molto forte basta a non lasciare il corsista in "basso", anche se il
    // punteggio pesato resta basso: chi sbaglia quasi sempre, si blocca di continuo o ha
    // dimezzato le sessioni è il prossimo a mollare.
    if (livello === "basso" && (segnali.errori >= 0.6 || segnali.richieste_aiuto >= 0.8 || segnali.sessioni_brevi >= 0.5)) livello = "medio";
    // Chi non ha mai iniziato va contattato subito.
    if (!sessioni.length) livello = "alto";
    const azione = sessioni.length
      ? azioneSuggerita(livello, segnali)
      : "Presentargli il Preparatore AI nella prossima sessione e fare insieme il primo esercizio.";
    return { nome: corsista.nome, punteggio, livello, segnali, motivi, azione };
  }

  function azioneSuggerita(livello, s) {
    if (livello === "basso") return "Nessuna azione: sta praticando con regolarità.";
    if (s.inattivita >= 0.6) return "Un messaggio personale del tutor entro 24 ore, con un compito breve per ripartire.";
    if (s.errori >= 0.5 || s.richieste_aiuto >= 0.6) return "Nella prossima sessione riprendere la tecnica su cui sbaglia, con un esempio guidato.";
    if (s.sessioni_brevi >= 0.5) return "Chiedergli cosa è cambiato: le sessioni sono molto più corte del solito.";
    if (s.ripassi_saltati >= 0.5) return "Proporre un ripasso di 10 minuti sui concetti più a rischio.";
    return "Tenere d'occhio: chiedere nella prossima sessione come sta andando lo studio a casa.";
  }

  const RANGO = { alto: 0, medio: 1, basso: 2 };
  /** Ordina dal più a rischio: prima per livello, poi per punteggio. */
  function confronta(a, b) {
    return RANGO[a.livello] - RANGO[b.livello] || b.punteggio - a.punteggio;
  }

  function classifica(corsisti, ora = Date.now()) {
    return corsisti.map((c) => valuta(c, ora)).sort(confronta);
  }

  const Segnali = { PESI, SOGLIE, valuta, classifica, confronta };
  if (typeof module !== "undefined" && module.exports) module.exports = Segnali;
  else root.Segnali = Segnali;
})(typeof globalThis !== "undefined" ? globalThis : this);
