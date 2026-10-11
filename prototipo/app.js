/* Prototipo del Preparatore AI: tutta la logica dell'interfaccia. Nessuna AI: legge data/scenario.js. */
(function () {
  "use strict";

  const S = window.Scenario;
  const F = window.FSRS;
  const Seg = window.Segnali;
  const $ = (sel, el = document) => el.querySelector(sel);
  const crea = (tag, attrs = {}, ...figli) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    for (const f of figli) if (f != null) el.append(f);
    return el;
  };
  const movimentoRidotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const attesa = (ms) => new Promise((r) => setTimeout(r, movimentoRidotto ? 0 : ms));
  const CORSISTI = S.corsisti(F);
  const ORA = S.ora;
  const G = F.GIORNO_MS;

  // ================================================================ schede
  const viste = ["prova", "copilota", "cruscotto", "report"];
  function mostraVista(nome) {
    if (!viste.includes(nome)) nome = "prova";
    for (const v of viste) $("#vista-" + v).hidden = v !== nome;
    document.querySelectorAll(".scheda").forEach((b) => {
      if (b.dataset.vista === nome) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    if (location.hash.slice(1) !== nome) history.replaceState(null, "", "#" + nome);
  }
  document.querySelectorAll(".scheda").forEach((b) => b.addEventListener("click", () => mostraVista(b.dataset.vista)));
  window.addEventListener("hashchange", () => mostraVista(location.hash.slice(1)));

  // ================================================================ PROVA GRATUITA
  const FASI = ["Approccio", "Lettura", "Comprensione", "Unire i puntini", "Organizzazione", "Ricordo", "Esposizione"];
  let passo = 0;
  let nodiVisibili = new Set();
  let risposteDate = 0;

  document.querySelectorAll("[data-eta]").forEach((b) =>
    b.addEventListener("click", () => {
      const sotto14 = b.dataset.eta === "13";
      $("#nota-eta").textContent = sotto14
        ? "Sotto i 14 anni la prova si fa con un genitore accanto: è lui o lei a decidere se continuare."
        : "Perfetto. Carica la foto di una pagina che devi studiare, oppure prova con la nostra.";
      $("#carica").hidden = false;
      $("#eta").disabled = true;
      $("#carica .bottone").focus();
    })
  );

  $("#foto").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const box = $("#foto-utente");
    box.replaceChildren(
      crea("img", { src: URL.createObjectURL(file), alt: "La foto che hai caricato" }),
      crea("p", { text: "Questa è la tua foto. Nella simulazione il Preparatore lavora sulla pagina d'esempio qui sotto: con l'AI attiva leggerebbe la tua." })
    );
    box.hidden = false;
    avviaProva();
  });
  $("#esempio").addEventListener("click", avviaProva);

  function avviaProva() {
    $("#ingresso").hidden = true;
    $("#lavoro").hidden = false;
    disegnaLibro();
    ricomincia();
  }

  function disegnaLibro() {
    const p = S.pagina;
    const libro = $("#libro");
    libro.replaceChildren(crea("p", { class: "materia", text: p.materia }), crea("h3", { text: p.titolo }));
    for (const par of p.paragrafi) {
      const el = crea("p");
      for (const pezzo of par) el.append(typeof pezzo === "string" ? pezzo : crea("mark", { id: pezzo.id, text: pezzo.t }));
      libro.append(el);
    }
    libro.append(crea("p", { class: "formula", text: p.formula }), crea("p", { class: "nota", text: p.nota }));
  }

  function ricomincia() {
    passo = 0;
    risposteDate = 0;
    nodiVisibili = new Set();
    $("#chat").replaceChildren();
    $("#opzioni").replaceChildren();
    document.querySelectorAll(".libro mark").forEach((m) => m.classList.remove("acceso"));
    const finale = $(".finale");
    if (finale) finale.remove();
    $("#obiettivo").hidden = true;
    disegnaMappa([]);
    aggiornaAlcuore();
    mostraPasso();
  }

  function aggiornaAlcuore(finito = false) {
    const fase = finito ? FASI.length : FASI.indexOf(S.passi[passo].fase);
    $("#alcuore").replaceChildren(
      ...FASI.map((nome, i) => {
        const li = crea("li", { class: i < fase ? "fatta" : i === fase ? "attiva" : "", title: nome }, nome[0], crea("small", { text: nome }));
        if (i === fase) li.setAttribute("aria-current", "step");
        return li;
      })
    );
  }

  function messaggio(chi, testo, extra = {}) {
    const m = crea("div", { class: `msg ${chi}${extra.esito ? " esito-" + extra.esito : ""}` });
    if (extra.fase) m.append(crea("span", { class: "fase", text: extra.fase }));
    m.append(testo);
    $("#chat").append(m);
    const chat = $("#chat");
    chat.scrollTop = chat.scrollHeight;
    if (window.matchMedia("(max-width: 760px)").matches) m.scrollIntoView({ block: "nearest", behavior: movimentoRidotto ? "auto" : "smooth" });
  }

  async function mostraPasso() {
    const p = S.passi[passo];
    $("#opzioni").replaceChildren();
    await attesa(350);
    messaggio("ai", p.ai, { fase: p.fase });
    $("#opzioni").replaceChildren(
      ...p.opzioni.map((o) => crea("button", { class: "opzione", text: o.testo, onclick: (e) => scegli(o, e.currentTarget) }))
    );
  }

  async function scegli(opzione, bottone) {
    risposteDate += 1;
    document.querySelectorAll(".opzione").forEach((b) => (b.disabled = true));
    messaggio("io", opzione.testo);
    await attesa(650);
    messaggio("ai", opzione.risposta, { esito: opzione.esito === "giusta" ? null : opzione.esito });

    if (opzione.esito !== "giusta") {
      // la risposta sbagliata resta barrata, le altre tornano cliccabili
      document.querySelectorAll(".opzione").forEach((b) => (b.disabled = b === bottone || b.dataset.esclusa === "1"));
      bottone.dataset.esclusa = "1";
      return;
    }

    const p = S.passi[passo];
    if (opzione.obiettivo) {
      $("#obiettivo").textContent = "Obiettivo: " + opzione.obiettivo;
      $("#obiettivo").hidden = false;
    }
    p.evidenzia.forEach((id) => {
      const m = document.getElementById(id);
      if (m) m.classList.add("acceso");
    });
    if (p.mostra.length) {
      disegnaMappa(p.mostra);
      const nomi = p.mostra.map((id) => S.nodi[id].testo).join(", ");
      const vai = crea("button", { class: "vai-mappa", text: "Guarda la mappa", onclick: () => $(".mappa").scrollIntoView({ behavior: movimentoRidotto ? "auto" : "smooth" }) });
      $("#chat").append(crea("p", { class: "aggiunto" }, `Aggiunto alla mappa: ${nomi}. `, vai));
    }

    passo += 1;
    if (passo < S.passi.length) {
      aggiornaAlcuore();
      await attesa(500);
      mostraPasso();
    } else {
      aggiornaAlcuore(true);
      $("#opzioni").replaceChildren();
      mostraFinale();
    }
  }

  function mostraFinale() {
    const minuti = Math.max(10, Math.round(risposteDate * 1.6));
    const conferma = crea("div", { class: "conferma", hidden: "" },
      crea("p", { text: "Nel pilota qui il genitore lascia un recapito e sceglie un orario per la demo, online o in sede. Nel prototipo non viene inviato nulla." })
    );
    const box = crea("div", { class: "finale" },
      crea("h3", { text: "Mappa completata" }),
      crea("p", { text: `Hai costruito la mappa della fotosintesi in circa ${minuti} minuti, usando tutte e sette le fasi del metodo ALCUORE. Domani ti arriva un ripasso di 3 minuti.` }),
      crea("p", { text: "Con il percorso completo un Preparatore Personale ti segue su tutte le materie, e il Preparatore AI ti accompagna ogni sera." }),
      crea("div", { class: "azioni" },
        crea("button", { class: "bottone", text: "Prenota la demo gratuita", onclick: () => { conferma.hidden = false; conferma.focus(); } }),
        crea("button", { class: "bottone secondario", text: "Ricomincia la prova", onclick: ricomincia })
      ),
      conferma
    );
    conferma.setAttribute("tabindex", "-1");
    $(".dialogo").append(box);
  }

  // ---------------------------------------------------------------- mappa SVG
  const NS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs = {}) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  function disegnaMappa(nuovi) {
    const root = $("#svg-mappa");
    nuovi.forEach((id) => nodiVisibili.add(id));
    root.replaceChildren();
    if (!nodiVisibili.size) {
      const t = svg("text", { x: 320, y: 220, "text-anchor": "middle", class: "mappa-vuota" });
      t.textContent = "La mappa comparirà qui, un ramo alla volta.";
      root.append(t);
      return;
    }
    const linee = svg("g");
    const gruppi = svg("g");
    root.append(linee, gruppi);
    for (const id of nodiVisibili) {
      const n = S.nodi[id];
      if (n.padre && nodiVisibili.has(n.padre)) {
        const p = S.nodi[n.padre];
        const mx = (n.x + p.x) / 2;
        linee.append(svg("path", { class: "linea", d: `M${p.x},${p.y} Q${mx},${p.y} ${n.x},${n.y}` }));
      }
    }
    for (const id of nodiVisibili) {
      const n = S.nodi[id];
      const g = svg("g", { class: `nodo ${n.tipo}${nuovi.includes(id) ? " nuovo" : ""}` });
      const rect = svg("rect", { rx: n.tipo === "centro" ? 4 : 3 });
      const t1 = svg("text", { x: n.x, y: n.sotto ? n.y - 3 : n.y + 5, "text-anchor": "middle", class: "t1" });
      t1.textContent = n.testo;
      g.append(rect, t1);
      if (n.sotto) {
        const t2 = svg("text", { x: n.x, y: n.y + 14, "text-anchor": "middle", class: "t2" });
        t2.textContent = n.sotto;
        g.append(t2);
      }
      gruppi.append(g);
      const box = g.getBBox();
      const px = n.tipo === "centro" ? 16 : 10;
      const py = n.tipo === "centro" ? 10 : 6;
      rect.setAttribute("x", box.x - px);
      rect.setAttribute("y", box.y - py);
      rect.setAttribute("width", box.width + px * 2);
      rect.setAttribute("height", box.height + py * 2);
    }
  }

  // ================================================================ COPILOTA
  const giulia = CORSISTI.find((c) => c.id === S.bozzaSessione.corsista);

  function disegnaSchedaCorsista() {
    const pr = giulia.profilo;
    const dl = crea("dl", { class: "profilo" });
    [["Stile", pr.stile], ["Strategia", pr.strategia], ["Obiettivo", pr.obiettivo]].forEach(([k, v]) => dl.append(crea("dt", { text: k }), crea("dd", { text: v })));
    $("#scheda-corsista").replaceChildren(
      crea("div", { class: "corsista-testa" }, crea("h2", { text: giulia.nome }), crea("span", { text: `${giulia.eta} anni, ${giulia.classe}` })),
      crea("div", { class: "blocco-info" }, crea("h3", { text: "Profilo di studio" }), dl, crea("p", { class: "segnaposto", text: pr.nota })),
      crea("div", { class: "blocco-info" }, crea("h3", { text: "Compiti della settimana" }), crea("ul", {}, ...giulia.settimana.compiti.map((c) => crea("li", { text: c })))),
      crea("div", { class: "blocco-info" }, crea("h3", { text: "Cosa è successo nei dialoghi" }), crea("ul", {}, ...giulia.settimana.blocchi.map((c) => crea("li", { text: c }))))
    );
  }

  function disegnaTempo(preparata) {
    const b = S.bozzaSessione;
    const righe = [crea("span", { text: "Senza copilota" }), crea("div", { class: "barra" }, crea("div", { class: "riempi", style: "width:100%" }))];
    if (preparata) {
      const riempi = crea("div", { class: "riempi dopo", style: "width:100%" });
      righe.push(crea("span", { text: "Con il copilota" }), crea("div", { class: "barra" }, riempi));
      requestAnimationFrame(() => requestAnimationFrame(() => (riempi.style.width = `${(b.tempoDopo / b.tempoPrima) * 100}%`)));
    }
    $("#tempo").replaceChildren(
      crea("p", { text: preparata ? `Preparazione: da ${b.tempoPrima} a circa ${b.tempoDopo} minuti (obiettivo del pilota)` : `Oggi preparare una sessione richiede circa ${b.tempoPrima} minuti, non pagati.` }),
      crea("div", { class: "barra-tempo" }, ...righe)
    );
  }

  function preparaBozza() {
    const b = S.bozzaSessione;
    $("#prepara").hidden = true;
    disegnaTempo(true);
    const approvata = crea("p", { class: "approvata", hidden: "", tabindex: "-1" });
    const blocchi = b.blocchi.map((x, i) =>
      crea("div", { class: "sessione-blocco" },
        crea("div", { class: "min", text: String(x.min) }, crea("small", { text: "min" })),
        crea("div", {},
          crea("h3", { text: x.titolo }),
          crea("p", { contenteditable: "true", "aria-label": `Modifica: ${x.titolo}`, text: x.testo })
        ),
        crea("label", {}, crea("input", { type: "checkbox", checked: "", "data-blocco": String(i) }), "Tengo")
      )
    );
    $("#bozza").replaceChildren(
      crea("h2", { text: `Bozza per ${giulia.nome}, ${b.durata} minuti` }),
      crea("p", { text: b.obiettivo }),
      crea("div", { class: "perche" }, crea("h3", { text: "Perché questa bozza" }), crea("ul", {}, ...b.perche.map((p) => crea("li", { text: p })))),
      ...blocchi,
      crea("button", {
        class: "bottone", text: "Approva la bozza", onclick: () => {
          const tenuti = document.querySelectorAll("#bozza input[type=checkbox]:checked").length;
          approvata.textContent = `Bozza approvata con ${tenuti} blocchi su ${b.blocchi.length}. La ritrovi nella sessione di giovedì; i compiti per casa arrivano a Giulia nell'app.`;
          approvata.hidden = false;
          approvata.focus();
        },
      }),
      approvata
    );
    $("#bozza").hidden = false;
  }
  $("#prepara").addEventListener("click", preparaBozza);

  // ================================================================ CRUSCOTTO
  const NOMI_SEGNALI = {
    inattivita: "Giorni senza pratica",
    calo_frequenza: "Calo di sessioni",
    sessioni_brevi: "Sessioni più corte",
    errori: "Errori",
    ripassi_saltati: "Ripassi in ritardo",
    richieste_aiuto: "Richieste di aiuto",
  };

  function disegnaCruscotto() {
    const risultati = CORSISTI.map((c) => ({ c, r: Seg.valuta(c, ORA) })).sort((a, b) => Seg.confronta(a.r, b.r));
    const alti = risultati.filter((x) => x.r.livello === "alto").length;
    const medi = risultati.filter((x) => x.r.livello === "medio").length;
    $("#riepilogo").textContent = `${alti} ${alti === 1 ? "corsista da contattare" : "corsisti da contattare"} oggi, ${medi} da tenere d'occhio. Su ${risultati.length} corsisti seguiti.`;

    $("#elenco-corsisti").replaceChildren(
      ...risultati.map(({ c, r }) => {
        const ripassi = F.daRipassare(c.schede, ORA);
        const segnali = crea("div", { class: "segnali" });
        for (const [k, v] of Object.entries(r.segnali)) {
          segnali.append(crea("span", { text: NOMI_SEGNALI[k] }), crea("div", { class: "b" }, crea("span", { style: `width:${Math.round(v * 100)}%` })), crea("span", { text: v.toFixed(2) }));
        }
        return crea("li", { class: `riga ${r.livello}` },
          crea("div", {},
            crea("h2", { text: c.nome }),
            crea("p", { class: "classe", text: `${c.eta} anni, ${c.classe}` })
          ),
          crea("div", { class: `livello ${r.livello}` },
            `Rischio ${r.livello}`,
            crea("div", { class: "punteggio", role: "img", "aria-label": `Punteggio ${r.punteggio} su 1` }, crea("span", { style: `width:${Math.round(r.punteggio * 100)}%` }))
          ),
          crea("div", {},
            r.motivi.length ? crea("ul", { class: "motivi" }, ...r.motivi.map((m) => crea("li", { text: m }))) : null,
            crea("p", { class: "azione", text: r.azione }),
            crea("p", {
              class: "ripassi",
              text: ripassi.length ? `Ripassi da fare: ${ripassi.map((s) => s.titolo).join(", ")}` : c.schede.length ? "Nessun ripasso in ritardo" : "Nessun ripasso pianificato",
            }),
            crea("details", { class: "dettagli" }, crea("summary", { text: "Come è calcolato" }), segnali)
          )
        );
      })
    );
  }

  // ================================================================ REPORT
  function disegnaReport() {
    const c = giulia;
    const giorniNomi = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
    const giorni = [];
    for (let i = 6; i >= 0; i--) {
      const inizio = new Date(ORA - i * G);
      inizio.setHours(0, 0, 0, 0);
      const fine = inizio.getTime() + G;
      const si = c.sessioni.some((s) => s.data >= inizio.getTime() && s.data < fine);
      giorni.push(crea("div", { class: "g" + (si ? " si" : ""), title: si ? "Ha studiato" : "Nessuna sessione" }, giorniNomi[inizio.getDay()]));
    }
    const ultimaSett = c.sessioni.filter((s) => ORA - s.data <= 7 * G);
    const minuti = ultimaSett.reduce((t, s) => t + s.minuti, 0);
    const ripassiFatti = c.schede.reduce((t, s) => t + (s.ultimoRipasso && ORA - s.ultimoRipasso <= 7 * G ? 1 : 0), 0);
    const inRitardo = F.daRipassare(c.schede, ORA).length;
    const tec = c.settimana.tecniche;
    const max = Math.max(...Object.values(tec));
    const righeTec = [];
    for (const [nome, n] of Object.entries(tec)) {
      righeTec.push(crea("span", { text: nome }), crea("div", { class: "b" }, crea("span", { style: `width:${(n / max) * 100}%` })), crea("span", { text: String(n) }));
    }

    $("#email").replaceChildren(
      crea("div", { class: "email-testa" },
        crea("p", { text: "Learnis, centro di Rimini · report settimanale" }),
        crea("h2", { text: "La settimana di Giulia" })
      ),
      crea("div", { class: "email-corpo" },
        crea("p", { text: "Buongiorno, ecco come è andata la settimana di studio di Giulia con il metodo." }),
        crea("section", {},
          crea("h3", { text: "Quando ha studiato" }),
          crea("div", { class: "settimana", role: "img", "aria-label": `Ha studiato ${ultimaSett.length} giorni su 7` }, ...giorni),
          crea("div", { class: "cifre" },
            crea("div", {}, crea("strong", { text: String(ultimaSett.length) }), "sessioni"),
            crea("div", {}, crea("strong", { text: String(minuti) }), "minuti in tutto"),
            crea("div", {}, crea("strong", { text: String(ripassiFatti) }), "ripassi fatti"),
            crea("div", {}, crea("strong", { text: String(inRitardo) }), "ripassi in ritardo")
          )
        ),
        crea("section", {}, crea("h3", { text: "Tecniche del metodo usate" }), crea("div", { class: "tecniche" }, ...righeTec)),
        crea("section", {},
          crea("h3", { text: "Dal suo Preparatore" }),
          crea("p", { class: "nota-tutor", text: "Giulia questa settimana ha fatto tre mappe da sola, la settimana scorsa nessuna. Sulle due fasi della fotosintesi ha ancora qualche dubbio: lo riprendiamo giovedì, prima della verifica di venerdì." }),
          crea("p", { class: "segnaposto", text: "Nota d'esempio: nel pilota la scrive o la approva il Preparatore." })
        )
      ),
      crea("p", { class: "email-piede", text: "Il report mostra solo l'abitudine allo studio. Le conversazioni di Giulia con il Preparatore AI non sono incluse. Per domande sui dati scrivete a [email privacy Learnis]." })
    );
  }

  // ================================================================ avvio
  disegnaSchedaCorsista();
  disegnaTempo(false);
  disegnaCruscotto();
  disegnaReport();
  mostraVista(location.hash.slice(1) || "prova");
})();
