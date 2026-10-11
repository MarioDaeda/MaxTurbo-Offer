// Test dei moduli: node --test verifica-github/moduli/
const test = require("node:test");
const assert = require("node:assert/strict");
const FSRS = require("./fsrs.js");
const Segnali = require("./segnali.js");

const G = FSRS.GIORNO_MS;
const T0 = Date.UTC(2026, 9, 1);

test("ricordabilità: 100% subito, 90% dopo un intervallo pari alla stabilità", () => {
  assert.equal(FSRS.ricordabilita(0, 5), 1);
  assert.ok(Math.abs(FSRS.ricordabilita(5, 5) - 0.9) < 1e-9);
  assert.equal(FSRS.intervallo(10), 10);
});

test("difficoltà iniziale: diversa per ogni voto e dentro 1–10 (il difetto di OpenTutor non c'è)", () => {
  const d = [1, 2, 3, 4].map((v) => FSRS.difficoltaIniziale(v));
  assert.ok(d[0] > d[1] && d[1] > d[2] && d[2] > d[3], `ordine atteso decrescente: ${d}`);
  d.forEach((x) => assert.ok(x >= 1 && x <= 10));
});

test("primo ripasso: Facile > Bene > Difficile > Di nuovo in stabilità", () => {
  const s = [1, 2, 3, 4].map((v) => FSRS.rivedi(FSRS.nuovaScheda("x"), v, T0).stabilita);
  assert.ok(s[3] > s[2] && s[2] > s[1] && s[1] > s[0]);
});

test("ripassi riusciti allungano l'intervallo; dimenticare lo accorcia e non aumenta la stabilità", () => {
  let c = FSRS.rivedi(FSRS.nuovaScheda("x"), 3, T0);
  const intervalli = [];
  let t = T0;
  for (let i = 0; i < 4; i++) {
    t = c.scadenza;
    c = FSRS.rivedi(c, 3, t);
    intervalli.push(Math.round((c.scadenza - t) / G));
  }
  for (let i = 1; i < intervalli.length; i++) assert.ok(intervalli[i] > intervalli[i - 1], `${intervalli}`);
  const prima = c.stabilita;
  const dopo = FSRS.rivedi(c, 1, c.scadenza);
  assert.ok(dopo.stabilita <= prima);
  assert.equal(dopo.stato, "riapprendimento");
  assert.equal(dopo.dimenticanze, 1);
  assert.equal(Math.round((dopo.scadenza - c.scadenza) / G), 1);
});

test("rivedi non modifica la scheda originale e rifiuta voti non validi", () => {
  const nuova = FSRS.nuovaScheda("x");
  FSRS.rivedi(nuova, 3, T0);
  assert.equal(nuova.ripetizioni, 0);
  assert.throws(() => FSRS.rivedi(nuova, 5, T0), RangeError);
});

test("costo dell'oblio: zero se nulla è scaduto, cresce con il ritardo", () => {
  const c = FSRS.rivedi(FSRS.nuovaScheda("x"), 3, T0);
  assert.equal(FSRS.costoOblio([c], T0 + G), 0);
  const poco = FSRS.costoOblio([c], c.scadenza + 1 * G);
  const tanto = FSRS.costoOblio([c], c.scadenza + 20 * G);
  assert.ok(tanto > poco && poco > 0);
  assert.equal(FSRS.daRipassare([c], c.scadenza + G).length, 1);
});

function corsista(nome, giorniSessioni, extra = {}) {
  const ora = T0 + 30 * G;
  return {
    nome,
    ora,
    sessioni: giorniSessioni.map((g, i) => ({
      data: ora - g * G,
      minuti: extra.minuti ? extra.minuti[i] : 25,
      domande: 6,
      corrette: extra.corrette ?? 5,
      aiuti: extra.aiuti ?? 0,
    })),
    schede: extra.schede || [],
  };
}

test("segnali: chi pratica ogni giorno è a rischio basso, senza motivi", () => {
  const c = corsista("Attivo", [13, 12, 10, 9, 7, 6, 5, 3, 2, 1, 0.5]);
  const r = Segnali.valuta(c, c.ora);
  assert.equal(r.livello, "basso");
  assert.deepEqual(r.motivi, []);
});

test("segnali: chi si è fermato da una settimana dopo aver calato è a rischio alto, con i motivi", () => {
  const c = corsista("Fermo", [13, 12, 11, 10, 9, 8], { minuti: [30, 30, 30, 10, 8, 6] });
  const r = Segnali.valuta(c, c.ora);
  assert.equal(r.livello, "alto");
  assert.ok(r.motivi.some((m) => m.startsWith("Nessuna sessione da 8 giorni")), r.motivi.join(" | "));
  assert.ok(r.motivi.some((m) => m.startsWith("Sessioni accorciate")));
  assert.match(r.azione, /messaggio personale/);
});

test("segnali: tanti errori e richieste di aiuto alzano il rischio anche se pratica", () => {
  const c = corsista("In difficoltà", [12, 9, 6, 4, 2, 1], { corrette: 1, aiuti: 3 });
  const r = Segnali.valuta(c, c.ora);
  assert.notEqual(r.livello, "basso");
  assert.ok(r.motivi.some((m) => m.includes("Risponde bene solo")));
  assert.match(r.azione, /esempio guidato/);
});

test("segnali: chi non ha mai iniziato è a rischio alto; chi ha dimezzato le sessioni almeno medio", () => {
  const mai = corsista("Mai", []);
  assert.equal(Segnali.valuta(mai, mai.ora).livello, "alto");
  const corte = corsista("Corte", [13, 11, 9, 5, 3, 1], { minuti: [35, 32, 34, 14, 11, 9] });
  const r = Segnali.valuta(corte, corte.ora);
  assert.equal(r.livello, "medio");
  assert.match(r.azione, /più corte/);
});

test("classifica: il più a rischio viene per primo", () => {
  const a = corsista("Attivo", [6, 5, 3, 2, 1, 0.5]);
  const b = corsista("Fermo", [13, 12, 11, 10]);
  const ordine = Segnali.classifica([a, b], a.ora).map((r) => r.nome);
  assert.deepEqual(ordine, ["Fermo", "Attivo"]);
});
