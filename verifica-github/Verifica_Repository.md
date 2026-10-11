# Verifica dei repository di ispirazione

*Verifica del 12 ottobre 2026 su [src/Progetti_GitHub_Ispirazione.md](../src/Progetti_GitHub_Ispirazione.md). Ho clonato i repository (ultima versione di `main`) e letto codice, licenze e README. Il loro codice non l'ho eseguito.*

## Sintesi

Le licenze dichiarate sono tutte corrette. Su tre punti il documento va però corretto, perché cambiano cosa possiamo riusare:

1. **Il dataset SocraTeach non si può usare in un prodotto commerciale.** Il codice di SocraticLM è Apache 2.0, ma i dati e i pesi del modello sono CC BY-NC 4.0, cioè solo per uso non commerciale. Possiamo copiarne il metodo (la pipeline a tre agenti e la rubrica di valutazione), non i 35.000 dialoghi.
2. **Open TutorAI CE non ha il modello dati per studenti, docenti, classi e corsi.** Lo promette il README, ma nel codice le cartelle `learning/classrooms`, `courses`, `learners` e `teachers` sono vuote, e il database non ha tabelle per classi o corsi. Anche la "governance HITL" si riduce a un archivio di valutazioni (voto e commento) sulle risposte. Come riferimento per il cruscotto tutor vale poco.
3. **Il rilevamento di OpenTutor misura un'altra cosa.** I suoi 12 segnali stimano il sovraccarico dentro una conversazione (sessione lunga, messaggi brevi, errori in serie), non il calo di pratica da una settimana all'altra, che è il nostro KPI. Inoltre uno dei segnali chiama un modello linguistico. Lo usiamo come ispirazione: il modulo [`moduli/segnali.js`](moduli/segnali.js) è scritto da noi sul nostro caso.

C'è poi un difetto nel codice di OpenTutor che conviene conoscere: il suo FSRS combina la formula di FSRS-5 per la difficoltà iniziale con i pesi di FSRS-4. Il risultato è che le risposte "Bene" e "Facile" portano entrambe alla difficoltà minima. Per questo non l'ho copiato: [`moduli/fsrs.js`](moduli/fsrs.js) implementa FSRS-4.5 dalle formule pubbliche, con i suoi test.

## Esito per ogni affermazione

| # | Affermazione del documento | Esito | Prova |
|---|---|---|---|
| 1 | DeepTutor è Apache 2.0, riuso commerciale con attribuzione | Confermato | `LICENSE`, `pyproject.toml`: `license = "Apache-2.0"` |
| 2 | DeepTutor ha una memoria a tre livelli leggibile e verificabile, con L2 che cita L1 e L3 che cita L2 | Confermato | README: «L1 traces, L2 surface summaries, and L3 synthesis»; Memory Graph che collega L2 alle prove L1; `deeptutor/services/memory/store.py` |
| 3 | Non è un vector store nascosto, è basata su file | Confermato | I livelli L2/L3 sono documenti Markdown (`PROFILE.md`, `SUMMARY.md`) in `store.py` |
| 4 | Ogni Partner ha `SOUL.md`, modello, canali, policy degli strumenti e libreria | Confermato | README, sezione Partners: «Each partner has a `SOUL.md`, model selection, channels, tool policy, and assigned library» |
| 5 | Con l'autenticazione attiva, un unico albero `data/` con workspace isolati per utente | Confermato | Release v1.3.8 «optional multi-user deployments with isolated user workspaces»; sezione Multi-User del README |
| 6 | Esiste un'API HTTP/SSE per i TutorBot | Confermato | Release v1.4.1 «an HTTP/SSE API for TutorBots»; `deeptutor/api/routers/partners.py` (HTTP / SSE / WebSocket) |
| 7 | La riscrittura era di circa 200k righe | Confermato, ma superato | Release v1.0.0-beta.1 (aprile 2026) «~200k lines». Oggi il repository conta circa 790.000 righe (500k Python, 290k TypeScript): è quattro volte più grande |
| 8 | Esegue codice generato dal modello per impostazione predefinita | Confermato, con una precisazione | Lo strumento `exec` si attiva quando c'è un backend sandbox; il ripiego su subprocess è attivo di default (`sandbox_allow_subprocess: true`). Si spegne con `DEEPTUTOR_SANDBOX_ALLOW_SUBPROCESS=0` e senza configurare runner o bubblewrap |
| 9 | OpenTutor è MIT | Confermato | `LICENSE`: MIT, © 2026 Zijin Zhang |
| 10 | OpenTutor è abbastanza piccolo da poterlo leggere | Parziale | Circa 107.000 righe (72k Python). I moduli che ci interessano invece sono piccoli: `fsrs.py` 304 righe, `cognitive_load.py` 488 righe |
| 11 | Moduli separati per FSRS, BKT, scelta della difficoltà e carico cognitivo | Confermato | `services/spaced_repetition/fsrs.py`, BKT in `services/loom_mastery.py`, `services/cognitive_load.py`, test `test_difficulty_selector.py` |
| 12 | Segnali di abbandono: fatica, errori, brevità dei messaggi | Parziale | I segnali esistono, ma misurano il sovraccarico nella conversazione, non l'abbandono tra una settimana e l'altra. Il segnale 8 usa un LLM |
| 13 | La roadmap prevede 12 segnali, interventi e deriva | Superato | Nella roadmap ora è segnato come fatto: «Cognitive load — 12-signal detection, intervention tracking, drift detection» |
| 14 | OpenTutor è per beta locale a utente singolo, senza multi-utente | Confermato | README: «local single-user public beta», «Multi-user SaaS/classroom mode is out of scope»; autenticazione spenta di default |
| 15 | Open TutorAI CE è BSD-3-Clause | Confermato | `LICENSE`: BSD a 3 clausole, © 2023-2025 Mohamed El hajji |
| 16 | È l'unico con un modello di dominio per studenti, docenti, classi e corsi | **Smentito** | Le cartelle `learning/classrooms`, `courses`, `learners`, `teachers` contengono solo `__init__.py` vuoti. Tabelle del database: `users`, `chats`, `supports`, `feedbacks`, `files`, `knowledge_*`, `model_configs`, `app_configs`. Il ruolo dell'utente è un campo di testo libero |
| 17 | Ha un modulo `governance/` per HITL e valutazione degli LLM | Parziale | Esiste, ma sono 113 righe: salvataggio e lettura di feedback con voto. Nessun flusso di revisione o approvazione da parte del docente |
| 18 | Modello open-core con Enterprise Edition proprietaria | Confermato | README: «foundation for a proprietary Enterprise Edition (EE)» |
| 19 | SocraTeach: 35K dialoghi socratici multi-turno, problemi di matematica, sei tipi di studente | Confermato | `data/SocraTeach_multi.json`: 35.151 dialoghi su 10.273 problemi (in stile GSM8K), campo `user_type` da (1) a (6). Lingua: inglese |
| 20 | Il codice è su github.com/Ljyustc/SocraticLM | Confermato | Il repository contiene dataset, fine-tuning ed esecuzione della valutazione |
| 21 | La pipeline "Dean-Teacher-Student" è replicabile | Parziale | Nel repository non c'è il codice di generazione dei dialoghi: c'è solo nel paper. Va riscritta da zero |
| 22 | Licenza dei dati SocraTeach (non indicata nel documento) | **Attenzione** | `LICENSE/DATA_LICENSE` e `WEIGHT_DIFF_LICENSE`: CC BY-NC 4.0, uso non commerciale. Il codice è Apache 2.0 |
| 23 | Il paper arXiv 2508.06583 etichetta ogni turno con quattro stati: corretto, errato, comprensione, confusione | Confermato | Etichette «accurate, erroneous, comprehension, confusion» (benchmark GuideEval) |
| 24 | Include set di addestramento accoppiati per l'ottimizzazione delle preferenze | Confermato | 8.648 coppie accurato/errato e 16.993 comprensione/confusione, usate per DPO. Nel testo non ho trovato un link ai dati né una licenza: disponibilità da verificare |

## Cosa cambia per la proposta

| Dove | Prima | Dopo la verifica |
|---|---|---|
| Valutazione del Preparatore AI (set da 100 casi) | Usare la rubrica a cinque dimensioni di SocraticLM | Resta valido: la rubrica è un'idea, non un dato. Le quattro etichette di GuideEval diventano gli stati del cruscotto |
| Dialoghi sintetici prima del pilota | Replicare la pipeline Dean-Teacher-Student in italiano | Resta valido, ma il codice va scritto da zero e i dialoghi SocraTeach non vanno usati per addestrare un prodotto commerciale |
| Cruscotto tutor | Partire dal modello dati di Open TutorAI CE | Il modello dati va progettato da noi; Open TutorAI non lo offre. Per i ruoli (tutor, corsista, famiglia, istruttore) bastano poche tabelle |
| Segnalazione "la pratica cala" | Riprendere i segnali di OpenTutor | Fatto, adattati al nostro KPI: [`moduli/segnali.js`](moduli/segnali.js) |
| Ripassi pianificati | Riprendere FSRS da OpenTutor | Fatto, ma reimplementato senza il difetto: [`moduli/fsrs.js`](moduli/fsrs.js) |
| DeepTutor come riferimento architetturale | Da leggere, non da forkare | Confermato, a maggior ragione: è quattro volte più grande di quanto scritto |

## Moduli estratti

I due moduli sono JavaScript puro, senza dipendenze e senza AI. Funzionano sia nel browser sia in Node, e il prototipo li usa per il cruscotto del tutor.

- **[`moduli/fsrs.js`](moduli/fsrs.js)**: scheduler dei ripassi FSRS-4.5, con i pesi ufficiali. Calcola quando ripassare ogni concetto e quanti concetti un corsista rischia di aver dimenticato (`costoOblio`).
- **[`moduli/segnali.js`](moduli/segnali.js)**: punteggio di rischio abbandono da 0 a 1. Usa sei segnali con pesi espliciti:
  - giorni senza pratica
  - calo di sessioni rispetto alla settimana prima
  - sessioni più corte del solito
  - precisione
  - ripassi in ritardo (da FSRS)
  - richieste di aiuto

  Ogni punteggio arriva con i motivi in italiano e un'azione suggerita al tutor. Pesi e soglie sono ipotesi da tarare con i dati del pilota.
- **[`moduli/moduli.test.js`](moduli/moduli.test.js)**: 11 test, tutti verdi.

```bash
node --test verifica-github/moduli/moduli.test.js
```

## Attribuzioni

- FSRS-4.5: formule e pesi di [open-spaced-repetition/fsrs4.5](https://github.com/open-spaced-repetition/fsrs4.5), licenza MIT.
- Segnali comportamentali: ispirati a [zijinz456/OpenTutor](https://github.com/zijinz456/OpenTutor), `apps/api/services/cognitive_load.py`, licenza MIT. Nessuna riga copiata.
- SocraticLM e GuideEval: citati come riferimento metodologico; nessun dato incluso.
