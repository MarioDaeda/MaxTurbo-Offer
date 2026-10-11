# Valutazione d'impatto (DPIA): Preparatore AI, pilota di Rimini

> **Bozza non legale, da rivedere con un consulente.** Schema precompilato secondo l'art. 35(7) GDPR. La DPIA va completata, discussa con il DPO se nominato e firmata dal titolare **prima** che i corsisti usino il sistema.

## 1. Serve una DPIA?

Sì. Il trattamento soddisfa almeno tre dei criteri delle linee guida europee sulla DPIA (WP248), e ne bastano due:

| Criterio | Presente? |
|---|---|
| Interessati vulnerabili (minori) | Sì |
| Uso innovativo di tecnologia (AI generativa) | Sì |
| Valutazione o punteggio (rischio abbandono, adattamento al profilo) | Sì |
| Monitoraggio sistematico (frequenza e durata dello studio) | In parte |
| Dati su larga scala | No nel pilota (un centro), sì al rollout |

Da verificare anche nell'elenco del Garante delle tipologie di trattamento soggette a DPIA (provvedimento n. 467 dell'11 ottobre 2018), che include i trattamenti con tecnologie innovative e quelli su interessati vulnerabili.

## 2. Descrizione del trattamento

| Voce | Contenuto |
|---|---|
| Contesto | Pilota di 90 giorni nel centro Learnis di Rimini: 4 Preparatori attivi, i loro corsisti dai 14 anni, più la prova gratuita per i non iscritti |
| Componenti | Web app per il corsista (dialogo, mappe, ripassi); cruscotto per il tutor (progressi, segnalazioni, bozza della sessione); report alla famiglia; prova gratuita senza account |
| Modello | Open-weight su server UE, con recupero dai materiali del metodo (RAG). Nessun addestramento sui dati dei corsisti nel pilota |
| Flussi | Corsista → web app → server UE → risposta. Server → cruscotto del tutor. Server → email del report al genitore |
| Trattamenti | T1–T6 del [registro](03_Registro_trattamenti.md) |

## 3. Necessità e proporzionalità

| Domanda | Risposta proposta |
|---|---|
| Lo scopo si potrebbe raggiungere con meno dati? | Sì in parte: la prova gratuita non salva nulla; i report alla famiglia non contengono conversazioni; voce e foto non si conservano |
| I dati sono pertinenti? | Si raccolgono solo i dati di studio; quelli sanitari e familiari sono esclusi per regola |
| La conservazione è limitata? | Conversazioni cancellate [12 mesi] dopo il percorso; prova gratuita non conservata |
| Gli interessati sono informati in modo comprensibile? | Informativa scritta per un quattordicenne, da testare con corsisti veri (01) |
| I diritti si possono esercitare? | Email dedicata; esportazione e cancellazione dal cruscotto amministratore |
| C'è un intervento umano? | Sì: il tutor decide percorso e interventi; l'AI non dà voti |

## 4. Rischi per i corsisti

Probabilità e gravità sono stime iniziali, da discutere.

| # | Rischio | Probabilità | Gravità | Misure | Rischio residuo |
|---|---|---|---|---|---|
| R1 | Il ragazzo condivide problemi di salute, familiari o di sicurezza personale | Media | Alta | Rinvio al tutor e ai numeri di aiuto; il messaggio non entra nel profilo; avviso al tutor per i casi gravi; procedura scritta concordata con Learnis | Medio |
| R2 | L'AI dà informazioni sbagliate o spiegazioni fuorvianti | Media | Media | Risposte basate sui materiali del metodo con fonte; set di 100 casi valutato dai Preparatori prima del pilota; tasto "segnala" | Basso |
| R3 | Il corsista si sente giudicato o etichettato dalle segnalazioni | Bassa | Media | Le segnalazioni le vede solo il tutor; mai mostrate al corsista o alla famiglia come "punteggio" | Basso |
| R4 | Accesso non autorizzato alle conversazioni | Bassa | Alta | Cifratura, accessi per ruolo, registro degli accessi, test di sicurezza | Basso |
| R5 | Uso dei dati per scopi diversi (marketing, addestramento) | Bassa | Alta | Consensi separati; contratto art. 28 con divieto di riuso; dataset di proprietà Learnis | Basso |
| R6 | Il minore sotto i 14 anni usa la prova senza consenso | Media | Bassa | Prova senza account e senza salvataggi; dichiarazione di età; genitore presente sotto i 14 | Basso |
| R7 | Dipendenza dall'AI: il corsista smette di ragionare da solo | Media | Media | Regola fissa di guida con domande, mai soluzioni; KPI sull'uso del metodo, non sul tempo passato in app | Basso |
| R8 | Profilazione che incide sul percorso senza controllo umano | Bassa | Alta | Nessuna decisione automatica; profilo AMOS usato solo con consenso e solo per il tono delle spiegazioni | Basso |

## 5. Misure tecniche e organizzative

- Server e backup in UE; nessun trasferimento extra UE.
- Modello open-weight sotto il controllo del responsabile; nessuna API esterna che conservi i dati.
- Pseudonimizzazione dei dati per le analisi dei KPI.
- Regole di comportamento verificate a ogni rilascio ([06](06_Regole_di_comportamento_AI.md)).
- Formazione di mezza giornata ai Preparatori, anche su privacy e casi sensibili.
- Procedura di data breach: il responsabile avvisa il titolare entro 24 ore, il titolare valuta la notifica al Garante entro 72 ore.

## 6. Parere e firma

| Ruolo | Nome | Parere | Data |
|---|---|---|---|
| DPO (se nominato) | | | |
| Titolare | | | |
| Responsabile ([Proponente]) | | | |

Revisione prevista: a fine pilota e prima del rollout, quando cambiano scala e integrazione nell'app.
