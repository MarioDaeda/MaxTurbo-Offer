# Progetti GitHub da cui prendere ispirazione

Analisi di licenze e stack rispetto ai vincoli della proposta Learnis Mind.

## Sintesi

Il riuso migliore è in tre repository, ognuno copre una parte diversa della proposta. Nessuno si può inserire in Learnis Mind così com'è: sono tutte web app complete, quindi si prendono moduli e pattern, non il prodotto. Il materiale più utile per addestrare e testare il tutor sta nei dataset di ricerca, non nei repository delle app.

Un modo per vederla: stiamo assemblando un'auto.

- **DeepTutor** è il progetto dell'intero motore.
- **OpenTutor** è il pacchetto di sensori sul cruscotto.
- **Open TutorAI** è il sistema di gestione flotta che permette a un manager di vedere ogni guidatore.

| Repository | Licenza | Sezioni della proposta | Cosa prendere | Verdetto |
|---|---|---|---|---|
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Apache 2.0 | III.3, V.1 (AI Preparatore) | Architettura, memoria verificabile, persona | Da studiare, non da forkare |
| [zijinz456/OpenTutor](https://github.com/zijinz456/OpenTutor) | MIT | III.4, IV.5 (scienza dell'apprendimento, abbandono) | Algoritmi FSRS, BKT, segnali di abbandono | Prendere gli algoritmi, non la struttura |
| [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | BSD-3-Clause | Cruscotto tutor | Modello dati per ruoli, revisione umana | Riferimento per il modello dati |

---

## 1. HKUDS/DeepTutor: riferimento architetturale per l'AI Preparatore (sezioni III.3 e V.1)

- **Licenza:** Apache License 2.0, quindi riuso commerciale consentito con attribuzione.
- **Memoria verificabile:** sistema a tre livelli basato su file, leggibile, curabile e verificabile. Non è un vector store nascosto, per scelta. Poiché L2 cita L1 e L3 cita L2, ogni elemento del profilo è tracciabile. È il pattern più solido per la promessa "il tutor vede tutto" e per rispondere a una richiesta di accesso GDPR (General Data Protection Regulation) di un genitore.
- **Persona:** ogni Partner ha il proprio `SOUL.md`, scelta del modello, canali, policy sugli strumenti e libreria assegnata. È un template pronto per codificare la voce del Preparatore Learnis e le fasi ALCUORE.
- **Multi-utente:** con l'autenticazione attiva, un unico albero `data/` ospita fianco a fianco un workspace admin, workspace isolati per utente e workspace partner.
- **API headless:** una release ha aggiunto un'API HTTP/SSE per i TutorBot (SSE = Server-Sent Events). È la strada per stare dietro l'app di Dieffetech invece di sostituirla.
- **Attenzione:**
  - È enorme: la sola riscrittura era di circa 200k righe.
  - Esegue per impostazione predefinita codice generato dal modello in ogni configurazione di deploy. Per un prodotto usato da minori va disattivato.
- **Verdetto:** da leggere, non da forkare.

## 2. zijinz456/OpenTutor: livello di scienza dell'apprendimento e rilevamento dell'abbandono (sezioni III.4 e IV.5)

- **Licenza:** MIT, e il codice è abbastanza piccolo da poterlo leggere.
- **Moduli da riprendere:** il backend ha moduli separati per lo scheduler FSRS con flashcard e per BKT, selezione della difficoltà e carico cognitivo.
  - FSRS = Free Spaced Repetition Scheduler.
  - BKT = Bayesian Knowledge Tracing.
- **Segnali di abbandono:** il tutor adatta la profondità in base a segnali comportamentali (rilevamento della fatica, pattern di errore, brevità dei messaggi). La roadmap prevede rilevamento a 12 segnali, tracciamento degli interventi e rilevamento della deriva. È il codice esistente più vicino al KPI "segnalazione quando la pratica cala".
- **Limite:** è pensato per una beta pubblica locale a utente singolo; la modalità SaaS multi-utente o classe è fuori scope. Prendere gli algoritmi, non la struttura.

## 3. Open-TutorAi/open-tutor-ai-CE: modello dati per tutor e ruoli (cruscotto tutor)

- **Licenza:** BSD-3-Clause.
- **Modello dati:** è l'unico con un modello di dominio per studenti, docenti, classi e corsi.
- **Revisione umana:** ha un modulo `governance/` per la governance HITL e la valutazione degli LLM (HITL = human-in-the-loop). Corrisponde direttamente a "il Preparatore approva i contenuti".
- **Modello open-core:** questa edizione pubblica è la base di una Enterprise Edition proprietaria. Le parti migliori dello sviluppo futuro probabilmente finiranno nella versione a pagamento.

## Da scartare per questo progetto

- **llamatutor, TeachGPT, JasonZhu314/AI-Tutor:** troppo sottili o pensati per un singolo sviluppatore.
- **Repository psicometrici (Concerto, bigfive-web):** bassa priorità. La proposta esclude esplicitamente valutazioni e diagnosi, e Learnis profila già con AMOS. L'unica idea riutilizzabile è il pattern di bigfive-web che genera il testo del report a partire dai punteggi, utile per il report alla famiglia.

---

## Materiale per addestramento e valutazione (vale più delle app)

### SocraticLM / SocraTeach (NeurIPS 2024)

- 35K dialoghi didattici multi-turno in stile socratico, basati su problemi matematici fondamentali, con sei tipi di studenti simulati con stati cognitivi diversi.
- Due elementi valgono più dei dati stessi:
  1. **Pipeline multi-agente "Dean-Teacher-Student"**, replicabile in italiano sulle fasi ALCUORE. Fornisce dialoghi sintetici prima che il pilota ne produca di reali.
  2. **Sistema di valutazione su cinque dimensioni pedagogiche**, una rubrica pronta per il test set da 100 casi.
- Codice: [github.com/Ljyustc/SocraticLM](https://github.com/Ljyustc/SocraticLM)

### "Discerning minds or generic tutors?" (arXiv 2508.06583)

- Ogni turno dello studente è etichettato con uno di quattro stati cognitivi: **corretto, errato, comprensione, confusione**.
- Include set di addestramento accoppiati per l'ottimizzazione basata sulle preferenze.
- Questi quattro stati sono uno schema naturale per gli alert del cruscotto tutor.

---

## Due lacune della proposta emerse da questa ricerca

1. **La funzione foto → mappa concettuale richiede un modello di visione**, oppure un passaggio OCR (optical character recognition) separato.
2. **"Integrato in Learnis Mind" non si può comprare.** Tutti e tre i repository presuppongono di essere l'app. L'integrazione va messa a budget come lavoro su misura dietro un'API (Application Programming Interface).

## Domanda critica

Nessuno di questi repository risolve la parte davvero difficile: trasformare il metodo ALCUORE in materiale che un modello possa recuperare e imitare. **Chi in Learnis scrive e valida quei contenuti, e quante ore del loro tempo prevede il pilota di 90 giorni?**

---

## Fonti

- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor)
- [OpenTutor](https://github.com/zijinz456/OpenTutor)
- [Open TutorAI CE](https://github.com/Open-TutorAi/open-tutor-ai-CE)
- [SocraticLM (NeurIPS 2024)](https://neurips.cc/virtual/2024/poster/93477)
- [Discerning minds or generic tutors? (arXiv)](https://arxiv.org/pdf/2508.06583)
