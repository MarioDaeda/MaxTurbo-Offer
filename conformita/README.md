# Kit di conformità: Preparatore AI Learnis (BOZZA)

> **Bozza non legale, da rivedere con un consulente.** Questi documenti sono un punto di partenza per il lavoro del legale di Learnis e del nostro, non un parere. La classificazione AI Act e la base giuridica vanno confermate prima del pilota. Fonti verificate il 12 ottobre 2026.

## Il kit

| File | Cosa contiene | Per chi |
|---|---|---|
| [01_Informativa_corsisti_14plus.md](01_Informativa_corsisti_14plus.md) | Informativa in linguaggio semplice per corsisti dai 14 anni, con il consenso all'uso dell'AI | Corsista |
| [02_Informativa_e_consenso_genitori.md](02_Informativa_e_consenso_genitori.md) | Informativa e consenso per i genitori: sotto i 14 anni, report alla famiglia, prova gratuita | Genitori |
| [03_Registro_trattamenti.md](03_Registro_trattamenti.md) | Registro dei trattamenti (art. 30 GDPR), sei trattamenti | Learnis e responsabile |
| [04_Schema_DPIA.md](04_Schema_DPIA.md) | Valutazione d'impatto (art. 35 GDPR) precompilata con rischi e misure | Learnis, legale, DPO |
| [05_Checklist_AI_Act.md](05_Checklist_AI_Act.md) | Classificazione del sistema e obblighi AI Act, con le date aggiornate al Digital Omnibus | Legale, team tecnico |
| [06_Regole_di_comportamento_AI.md](06_Regole_di_comportamento_AI.md) | Cosa l'AI può e non può fare, con i casi di prova | Team tecnico, Preparatori |

## Compliance check

### Sintesi

**Si può procedere, a condizioni.** Il pilota è realizzabile in regola se rispetta quattro cose:
1. Parte dai 14 anni.
2. Tiene i dati in UE.
3. Lascia ogni decisione sul percorso al tutor.
4. Ha una valutazione d'impatto (DPIA) prima di iniziare.

Il punto più delicato è l'AI Act. Il sistema adatta le risposte al profilo AMOS del corsista e segnala chi rischia di mollare: questo potrebbe essere letto come "valutare i risultati di apprendimento per orientare il percorso" (Allegato III, punto 3b) con profilazione. In quel caso sarebbe ad alto rischio senza possibilità di deroga. Lo schema è progettato per restarne fuori, ma il giudizio spetta al legale.

### Norme applicabili

| Norma | Perché si applica | Cosa chiede |
|---|---|---|
| GDPR (Reg. UE 2016/679) | Dati personali di corsisti, in gran parte minorenni | Base giuridica, informativa, registro, DPIA, contratto col responsabile (art. 28), sicurezza, diritti |
| D.Lgs. 196/2003, art. 2-quinquies | Servizio digitale offerto a minori in Italia | Consenso valido dai 14 anni; sotto, di chi ha la responsabilità genitoriale; informazioni chiare per il minore |
| Legge 132/2025, art. 4, comma 4 | Uso di un sistema di AI da parte di minori | Sotto i 14 anni serve l'autorizzazione dei genitori; dai 14 il minore consente da solo se le informazioni sono comprensibili e accessibili |
| AI Act (Reg. UE 2024/1689), art. 50 | Il corsista dialoga con un'AI | Dirgli che parla con un'AI. In vigore dal 2 agosto 2026 |
| AI Act, art. 4 | Learnis e i Preparatori useranno il sistema | Alfabetizzazione AI del personale; ammorbidita dal Digital Omnibus |
| AI Act, art. 5(1)(f) | Contesto educativo | Vietato riconoscere le emozioni da dati biometrici: niente analisi emotiva della voce |
| AI Act, art. 6 e Allegato III, punto 3 | Sistema usato in un ente di formazione | Valutare se è ad alto rischio. Se lo è, gli obblighi valgono dal 2 dicembre 2027 (Reg. UE 2026/1744, Digital Omnibus) |
| Codice del consumo e norme sulla pubblicità ai minori | Prova gratuita promossa sui social a ragazzi dai 14 anni | Pubblicità chiara, nessuna pressione sui minori, consenso separato per il marketing |

### Requisiti

| # | Requisito | Stato | Cosa fare |
|---|---|---|---|
| 1 | Titolare e responsabile individuati | Da definire | Capire se il titolare è Genio Net, ogni centro o entrambi (contitolarità). Il proponente è responsabile ex art. 28 |
| 2 | Base giuridica per ogni trattamento | Bozza nel registro | Confermare: contratto per il servizio al corsista, consenso per l'addestramento, legittimo interesse per i KPI |
| 3 | Informativa comprensibile a un quattordicenne | Bozza (01) | Farla leggere a 3–4 corsisti veri prima del pilota |
| 4 | Consenso dei genitori sotto i 14 anni | Bozza (02) | Nel pilota si parte dai 14 anni, ma la prova gratuita può arrivare anche a ragazzi più giovani |
| 5 | DPIA prima del pilota | Schema (04) | Obbligatoria: minori, tecnologia nuova, valutazione sistematica |
| 6 | Contratto art. 28 con il proponente e i sub-responsabili | Da fare | Includere hosting UE, divieto di addestrare su dati senza consenso, cancellazione a fine contratto |
| 7 | Trasparenza AI (art. 50) | Previsto nel design | Banner fisso "Stai parlando con un'AI", anche nella prova gratuita |
| 8 | Classificazione AI Act documentata | Analisi (05) | Parere del legale; se si sceglie "non alto rischio", documentarlo (art. 6(4)) |
| 9 | Nessuna decisione automatizzata significativa (art. 22 GDPR) | Previsto nel design | Il tutor approva ogni scelta sul percorso; le segnalazioni sono suggerimenti |
| 10 | Niente dati sanitari (DSA, BES) | Previsto nel design | L'AI non chiede né registra diagnosi; le regole lo impongono (06) |
| 11 | Scheda privacy dell'app aggiornata | Da fare al rollout | Oggi Learnis Mind dichiara "Data Not Collected": con l'AI integrata cambia |
| 12 | Uso dei profili AMOS | Da verificare | Consenso per adattare le risposte; licenza dell'editore dei questionari per qualunque uso nell'addestramento |

### Rischi

| Rischio | Gravità | Mitigazione |
|---|---|---|
| Classificazione ad alto rischio (Allegato III 3b con profilazione) | Alta | L'AI non dà voti e non decide percorsi; le segnalazioni usano regole trasparenti, non un modello; parere legale prima del pilota |
| Il ragazzo racconta problemi personali, di salute o familiari | Alta | Regola di rinvio al tutor, nessuna memorizzazione nel profilo, procedura per i casi gravi (06) |
| L'AI fa i compiti al posto del corsista | Media | Regole di comportamento verificate su casi di prova prima di ogni rilascio |
| Prova gratuita usata da under 14 senza consenso | Media | Nessun account e nessun salvataggio nella prova; età dichiarata all'ingresso; informativa per i genitori |
| Dati dei dialoghi usati per addestrare senza consenso | Media | Consenso separato, facoltativo e revocabile; anonimizzazione e approvazione del tutor |
| Fornitore del modello fuori UE | Media | Modello open-weight su server UE; se si usa un'API commerciale, contratto con server UE e niente addestramento sui dati |
| Testo dei libri di scuola caricato in foto | Bassa | Uso didattico per il singolo corsista, nessuna ripubblicazione; da confermare col legale |

### Azioni consigliate, in ordine

1. Parere del legale sulla classificazione AI Act (05) e su chi è titolare.
2. DPIA completata e firmata prima di coinvolgere i corsisti (04).
3. Contratto art. 28 tra Learnis e proponente.
4. Test delle informative con corsisti veri e loro genitori.
5. Verifica della licenza AMOS presso l'editore.

### Approvazioni

| Chi | Perché | Stato |
|---|---|---|
| Learnis Italia (direzione) | Titolare del trattamento, sceglie la tecnologia | Da avviare |
| Legale di Learnis | Classificazione AI Act, informative, contratto | Da avviare |
| DPO di Learnis, se nominato | Parere sulla DPIA (art. 35(2)) | Da verificare se esiste |
| Garante etico Learnis | Coerenza col codice etico | Da avviare |
| Riccardo Venturini | Uso dei profili AMOS nelle risposte | Da avviare |

### Da far approfondire a un consulente

- Se il cruscotto con le segnalazioni rientra nell'Allegato III, punto 3b, e se conta come "profilazione" ai sensi dell'art. 6(3).
- Se e come l'Omnibus ha cambiato la registrazione dei sistemi che si dichiarano non ad alto rischio (art. 6(4) e art. 49(2)). Va controllato nel testo del Regolamento 2026/1744.
- La contitolarità tra Genio Net e i centri.
- Lo status dei punteggi AMOS su ansia e resilienza: sono dati sulla salute?
