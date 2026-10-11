/*
 * Scenario della simulazione: tutte le "risposte dell'AI" del prototipo stanno qui.
 * Nessun modello è collegato. Quando si collegherà il Preparatore AI vero, questo file
 * diventerà l'insieme di casi di prova: stesse domande, risposte valutate dai Preparatori.
 *
 * SEGNAPOSTO: testi, nomi dei corsisti, profili e materiali del metodo sono inventati
 * per la demo. Vanno sostituiti con materiali approvati da Learnis in discovery.
 */
(function (root) {
  "use strict";

  // ---------------------------------------------------------------- Pagina d'esempio
  const pagina = {
    materia: "Scienze · primo anno di scuola superiore",
    titolo: "La fotosintesi",
    nota: "Testo d'esempio scritto per la demo, non tratto da un libro di testo.",
    paragrafi: [
      [
        "La ",
        { id: "t-def", t: "fotosintesi è il processo con cui le piante, le alghe e alcuni batteri trasformano l'energia della luce in energia chimica" },
        ". Avviene soprattutto nelle foglie, all'interno di piccoli organuli chiamati ",
        { id: "t-dove", t: "cloroplasti, che contengono un pigmento verde, la clorofilla" },
        ".",
      ],
      [
        "Per svolgere la fotosintesi la pianta ha bisogno di ",
        { id: "t-serve", t: "luce, acqua, assorbita dalle radici, e anidride carbonica, che entra dalle foglie attraverso gli stomi" },
        ". Da queste sostanze produce ",
        { id: "t-produce", t: "glucosio, che usa come fonte di energia e per crescere, e ossigeno, che rilascia nell'aria" },
        ".",
      ],
      [
        "Il processo si divide in ",
        { id: "t-fasi", t: "due fasi. Nella fase luminosa la clorofilla cattura la luce e l'acqua viene scissa, liberando ossigeno. Nella fase oscura, o ciclo di Calvin, l'anidride carbonica viene usata per costruire il glucosio" },
        "; questa seconda fase non ha bisogno direttamente della luce.",
      ],
      [
        { id: "t-conta", t: "Quasi tutto l'ossigeno dell'atmosfera e quasi tutta l'energia che arriva agli esseri viventi attraverso le catene alimentari derivano dalla fotosintesi" },
        ".",
      ],
    ],
    formula: "6 CO₂ + 6 H₂O + luce → C₆H₁₂O₆ + 6 O₂",
  };

  // ---------------------------------------------------------------- Nodi della mappa (viewBox 640 × 440)
  const nodi = {
    centro:   { x: 320, y: 220, testo: "Fotosintesi", sotto: "luce → energia chimica", tipo: "centro" },
    dove:     { x: 120, y: 80,  testo: "Dove", tipo: "ramo", padre: "centro" },
    clorop:   { x: 40,  y: 160, testo: "cloroplasti", tipo: "foglia", padre: "dove" },
    cloro:    { x: 150, y: 20,  testo: "clorofilla", tipo: "foglia", padre: "dove" },
    serve:    { x: 120, y: 330, testo: "Cosa serve", tipo: "ramo", padre: "centro" },
    luce:     { x: 30,  y: 270, testo: "luce", tipo: "foglia", padre: "serve" },
    acqua:    { x: 40,  y: 410, testo: "acqua", tipo: "foglia", padre: "serve" },
    co2:      { x: 190, y: 415, testo: "CO₂", tipo: "foglia", padre: "serve" },
    produce:  { x: 520, y: 330, testo: "Cosa produce", tipo: "ramo", padre: "centro" },
    glucosio: { x: 600, y: 270, testo: "glucosio", tipo: "foglia", padre: "produce" },
    ossigeno: { x: 560, y: 415, testo: "ossigeno", tipo: "foglia", padre: "produce" },
    fasi:     { x: 520, y: 80,  testo: "Due fasi", tipo: "ramo", padre: "centro" },
    lumin:    { x: 585, y: 150, testo: "luminosa", sotto: "luce + acqua → O₂", tipo: "foglia", padre: "fasi" },
    calvin:   { x: 470, y: 18,  testo: "ciclo di Calvin", sotto: "CO₂ → glucosio", tipo: "foglia", padre: "fasi" },
    conta:    { x: 320, y: 345, testo: "Perché conta", tipo: "ramo", padre: "centro" },
    noi:      { x: 320, y: 415, testo: "ossigeno e cibo per noi", sotto: "catene alimentari", tipo: "foglia", padre: "conta" },
    memo:     { x: 170, y: 240, testo: "memo: LAC", sotto: "Luce · Acqua · CO₂", tipo: "memo", padre: "serve" },
  };

  // ---------------------------------------------------------------- Dialogo socratico, una fase ALCUORE per passo
  // esito: "giusta" fa avanzare; "quasi" e "no" ricevono una domanda guida e restano da riprovare.
  const passi = [
    {
      fase: "Approccio",
      ai: "Ciao! Sono il Preparatore AI: un'intelligenza artificiale, non una persona. Ti aiuto a studiare questa pagina con il metodo, ma il lavoro lo fai tu. Prima di leggere: a cosa ti serve questa pagina?",
      opzioni: [
        { testo: "Venerdì ho la verifica di scienze", esito: "giusta", risposta: "Allora l'obiettivo è saperla spiegare a voce e ricordarla venerdì. Ci vogliono circa 15 minuti: partiamo." , obiettivo: "Verifica di venerdì: saperla spiegare a voce" },
        { testo: "Devo solo leggerla per domani", esito: "giusta", risposta: "Bene: puntiamo a capire i concetti chiave, così domani in classe sei già avanti.", obiettivo: "Capire i concetti chiave per domani" },
      ],
      mostra: [],
      evidenzia: [],
    },
    {
      fase: "Lettura",
      ai: "Non leggere ancora tutto. Guarda solo il titolo, le parti evidenziabili e la formula in fondo. Secondo te, di cosa parla la pagina, in una frase?",
      opzioni: [
        { testo: "Di come le piante respirano", esito: "quasi", risposta: "Ci sei vicino, ma la respirazione è un altro processo. Guarda la formula: cosa entra a sinistra della freccia e cosa esce a destra?" },
        { testo: "Di come le piante trasformano la luce in energia", esito: "giusta", risposta: "Esatto: questa è l'idea centrale, la mettiamo al centro della mappa." },
        { testo: "Delle foglie", esito: "no", risposta: "Le foglie ci sono, ma sono il luogo, non l'argomento. Rileggi il titolo: che processo nomina?" },
      ],
      mostra: ["centro"],
      evidenzia: ["t-def"],
    },
    {
      fase: "Comprensione",
      ai: "Ora leggi il primo paragrafo. Dove avviene la fotosintesi, precisamente?",
      opzioni: [
        { testo: "Nelle radici", esito: "no", risposta: "Le radici c'entrano, ma per un altro motivo che vedremo tra poco. Cerca nel primo paragrafo la parola che indica un organulo." },
        { testo: "Nei cloroplasti delle foglie, grazie alla clorofilla", esito: "giusta", risposta: "Giusto. Primo ramo: dove. Nota che la clorofilla è anche il motivo per cui le foglie sono verdi." },
        { testo: "In tutta la pianta allo stesso modo", esito: "quasi", risposta: "Il testo dice «soprattutto»: c'è un posto preciso. Quale?" },
      ],
      mostra: ["dove", "clorop", "cloro"],
      evidenzia: ["t-dove"],
    },
    {
      fase: "Comprensione",
      ai: "Secondo paragrafo: dividi le sostanze in due gruppi. Cosa serve alla pianta e cosa produce?",
      opzioni: [
        { testo: "Serve ossigeno, produce anidride carbonica", esito: "no", risposta: "È il contrario: quello è ciò che facciamo noi quando respiriamo. Riguarda la formula: cosa sta prima della freccia?" },
        { testo: "Serve luce e glucosio, produce acqua", esito: "quasi", risposta: "La luce sì. Ma il glucosio la pianta lo costruisce, non lo prende. Cosa assorbe dalle radici?" },
        { testo: "Serve luce, acqua e CO₂; produce glucosio e ossigeno", esito: "giusta", risposta: "Perfetto, due rami in un colpo: cosa serve e cosa produce." },
      ],
      mostra: ["serve", "luce", "acqua", "co2", "produce", "glucosio", "ossigeno"],
      evidenzia: ["t-serve", "t-produce"],
    },
    {
      fase: "Unire i puntini",
      ai: "Collega con qualcosa che conosci già: perché senza piante noi avremmo un problema serio?",
      opzioni: [
        { testo: "Perché fanno ombra d'estate", esito: "no", risposta: "Vero, ma non c'entra con questa pagina. Pensa a cosa rilasciano nell'aria e a cosa mangiamo." },
        { testo: "Perché producono l'ossigeno che respiriamo e l'energia che arriva nel cibo", esito: "giusta", risposta: "Questo è il collegamento che fa ricordare: la fotosintesi è all'inizio di ogni catena alimentare." },
      ],
      mostra: ["conta", "noi"],
      evidenzia: ["t-conta"],
    },
    {
      fase: "Organizzazione",
      ai: "Ultimo paragrafo: il processo ha due fasi. Come le chiami nella mappa?",
      opzioni: [
        { testo: "Fase del giorno e fase della notte", esito: "quasi", risposta: "Il nome inganna: la fase oscura non avviene per forza di notte, semplicemente non usa direttamente la luce. Come la chiama il testo?" },
        { testo: "Fase luminosa e ciclo di Calvin", esito: "giusta", risposta: "Giusto. Per ognuna scrivi cosa entra e cosa esce: così la formula si spiega da sola." },
      ],
      mostra: ["fasi", "lumin", "calvin"],
      evidenzia: ["t-fasi"],
    },
    {
      fase: "Ricordo",
      ai: "Per ricordare cosa serve alla pianta, prova un aiuto per la memoria con le iniziali di luce, acqua e anidride carbonica. Quale ti resta più in testa?",
      opzioni: [
        { testo: "LAC: Luce, Acqua, CO₂", esito: "giusta", risposta: "Lo aggiungiamo alla mappa. Ripetilo ad alta voce due volte: domani te lo richiedo." },
        { testo: "Ne invento uno mio", esito: "giusta", risposta: "Ancora meglio: le associazioni che inventi tu si ricordano di più. Per ora segno LAC, poi lo cambi tu." },
      ],
      mostra: ["memo"],
      evidenzia: [],
    },
    {
      fase: "Esposizione",
      ai: "Ultima prova: copri la pagina e spiega la fotosintesi in 30 secondi guardando solo la mappa. Com'è andata?",
      opzioni: [
        { testo: "Ci sono riuscito", esito: "giusta", risposta: "Ottimo lavoro. Domani ti propongo un ripasso di 3 minuti, e venerdì sarai pronto." },
        { testo: "Mi sono bloccato sulle due fasi", esito: "giusta", risposta: "È la parte più difficile, succede a tanti. Rileggi solo il ramo «Due fasi» e riprova. Il tuo Preparatore lo vedrà e lo riprenderete insieme in sessione." },
      ],
      mostra: [],
      evidenzia: [],
    },
  ];

  // ---------------------------------------------------------------- Corsisti (cruscotto e copilota)
  const G = 86400000;
  const ora = Date.now();
  const fa = (giorni) => ora - giorni * G;

  // Sessioni: [giorni fa, minuti, domande, corrette, richieste di aiuto]
  const sess = (righe) => righe.map(([g, minuti, domande, corrette, aiuti]) => ({ data: fa(g), minuti, domande, corrette, aiuti }));

  // Schede di ripasso: ogni scheda ha la storia dei voti [giorni fa, voto]
  function schede(F, elenco) {
    return elenco.map(([titolo, storia], i) => {
      let s = F.nuovaScheda("s" + i, titolo);
      for (const [g, voto] of storia) s = F.rivedi(s, voto, fa(g));
      return s;
    });
  }

  function corsisti(F) {
    return [
      {
        id: "giulia", nome: "Giulia R.", eta: 15, classe: "1ª liceo scientifico",
        profilo: {
          stile: "Visivo: capisce meglio con schemi e colori",
          strategia: "Rilegge molto, fa poche mappe",
          obiettivo: "Verifica di scienze venerdì: punta al 7",
          nota: "Profilo d'esempio, non un profilo AMOS reale",
        },
        sessioni: sess([[13, 22, 6, 5, 0], [11, 25, 8, 6, 1], [9, 20, 6, 5, 0], [6, 24, 7, 6, 0], [4, 18, 6, 4, 1], [2, 26, 8, 7, 0], [1, 21, 6, 5, 0]]),
        schede: schede(F, [["Fotosintesi: cosa serve", [[9, 3], [4, 3]]], ["Fotosintesi: due fasi", [[9, 2], [6, 1], [2, 2]]], ["Cellula vegetale", [[12, 3], [8, 3]]]]),
        settimana: {
          compiti: ["Scienze: fotosintesi, pag. 112–115", "Italiano: analisi del testo", "Storia: le rivoluzioni industriali"],
          blocchi: [
            "Ha confuso la fase oscura con «la fase di notte» due volte",
            "Ripasso «due fasi» dimenticato una volta (FSRS: voto 1)",
            "Mappe fatte da sola: 3, contro 0 della settimana prima",
          ],
          tecniche: { "Mappe concettuali": 5, "Memoria (acronimi)": 3, "Lettura strategica": 4, "Esposizione": 2 },
        },
      },
      {
        id: "marco", nome: "Marco T.", eta: 16, classe: "2ª ITIS",
        sessioni: sess([[13, 30, 6, 5, 0], [12, 28, 6, 5, 0], [11, 30, 6, 4, 0], [10, 12, 4, 3, 0], [9, 9, 4, 2, 0], [8, 7, 3, 2, 0]]),
        schede: schede(F, [["Equazioni di primo grado", [[13, 3], [10, 3]]], ["Moto rettilineo", [[12, 2], [9, 3]]], ["Lessico tecnico", [[11, 3]]]]),
      },
      {
        id: "sara", nome: "Sara L.", eta: 14, classe: "1ª liceo linguistico",
        sessioni: sess([[12, 20, 6, 2, 2], [9, 25, 8, 2, 3], [6, 22, 7, 2, 3], [4, 24, 6, 1, 2], [2, 20, 6, 1, 3], [1, 18, 6, 2, 2]]),
        schede: schede(F, [["Verbi irregolari inglesi", [[9, 1], [6, 1], [2, 2]]], ["Analisi logica", [[6, 2], [1, 1]]]]),
      },
      {
        id: "davide", nome: "Davide P.", eta: 17, classe: "4ª liceo classico",
        sessioni: sess([[13, 35, 8, 7, 0], [11, 32, 8, 7, 0], [9, 34, 8, 6, 0], [5, 14, 5, 4, 0], [3, 11, 5, 4, 1], [1, 9, 5, 4, 0]]),
        schede: schede(F, [["Aoristo greco", [[20, 3], [14, 3]]], ["Filosofia: Platone", [[25, 3], [18, 2]]], ["Lessico latino", [[16, 3]]]]),
      },
      {
        id: "elena", nome: "Elena B.", eta: 15, classe: "2ª liceo scienze umane",
        sessioni: sess([[13, 20, 6, 5, 0], [10, 22, 6, 5, 0], [7, 25, 6, 6, 0], [5, 21, 6, 5, 0], [3, 24, 6, 5, 0], [1, 23, 6, 6, 0], [0.3, 15, 4, 4, 0]]),
        schede: schede(F, [["Pedagogia: Comenio", [[7, 3], [1, 4]]], ["Psicologia: memoria", [[5, 3]]]]),
      },
      {
        id: "tommaso", nome: "Tommaso F.", eta: 16, classe: "3ª istituto tecnico",
        sessioni: [],
        schede: [],
      },
    ];
  }

  // ---------------------------------------------------------------- Bozza di sessione del copilota (per Giulia)
  const bozzaSessione = {
    corsista: "giulia",
    durata: 60,
    obiettivo: "Arrivare alla verifica di venerdì sapendo spiegare la fotosintesi, in particolare le due fasi.",
    blocchi: [
      { min: 5,  titolo: "Riscaldamento", testo: "Giulia spiega la mappa della fotosintesi in 30 secondi, senza guardare la pagina." },
      { min: 15, titolo: "Riprendere la fase oscura", testo: "Ha confuso «fase oscura» con «di notte» due volte: chiederle cosa entra e cosa esce in ogni fase, poi farle correggere da sola il ramo della mappa." },
      { min: 25, titolo: "Esercizio guidato", testo: "Pagina 116 del libro: costruisce la mappa sulla respirazione cellulare e la confronta con quella della fotosintesi (fase Unire i puntini)." },
      { min: 10, titolo: "Prova di esposizione", testo: "Simulazione dell'interrogazione: 2 minuti di spiegazione, il tutor fa due domande." },
      { min: 5,  titolo: "Compito per casa", testo: "Ripasso «due fasi» giovedì sera (già pianificato), più una mappa di storia fatta da sola." },
    ],
    perche: [
      "Profilo visivo: lavorare sulle mappe, non sulla rilettura",
      "Errore ripetuto sulle due fasi, visto nei dialoghi della settimana",
      "Verifica tra 4 giorni: priorità a esposizione e ripasso",
    ],
    tempoPrima: 60,
    tempoDopo: 20,
  };

  root.Scenario = { pagina, nodi, passi, corsisti, bozzaSessione, ora };
})(typeof globalThis !== "undefined" ? globalThis : this);
