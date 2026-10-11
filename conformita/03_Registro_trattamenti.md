# Registro dei trattamenti: Preparatore AI (art. 30 GDPR)

> **Bozza non legale, da rivedere con un consulente.** Sei trattamenti legati al pilota. Le basi giuridiche sono proposte da confermare; i campi tra parentesi quadre vanno completati.

## Dati comuni

| Voce | Contenuto |
|---|---|
| Titolare | [Genio Net / centro Learnis di Rimini / contitolarità: da confermare], [sede], [email] |
| DPO | [Se nominato] |
| Responsabile (art. 28) | [Proponente], [sede], [email]: sviluppo e gestione del sistema |
| Sub-responsabili | [Fornitore cloud con data center UE]; [eventuale fornitore del modello, solo con server UE e divieto di addestramento] |
| Trasferimenti extra UE | Nessuno previsto. Se cambia: decisione di adeguatezza o clausole contrattuali tipo, più valutazione d'impatto del trasferimento |
| Misure di sicurezza (art. 32) | Cifratura in transito (TLS) e a riposo; accessi nominativi per ruolo (corsista, tutor, istruttore, amministratore); registro degli accessi; backup cifrati in UE; pseudonimizzazione per le analisi; test di sicurezza prima del pilota |

## Trattamenti

### T1. Preparatore AI per il corsista

| Voce | Contenuto |
|---|---|
| Finalità | Aiutare il corsista ad applicare il metodo tra le sessioni: dialogo guidato, mappe concettuali, ripassi |
| Interessati | Corsisti dai 14 anni (nel pilota) |
| Categorie di dati | Anagrafica essenziale, corso e centro; testo, voce e foto inviati; storico degli esercizi e dei ripassi |
| Dati particolari | Non richiesti. Il sistema invita a non inserirli e non li salva nel profilo (vedi 06) |
| Base giuridica | Esecuzione del contratto del corso (art. 6(1)(b)); per l'uso di un sistema di AI da parte del minore, consenso ai sensi della Legge 132/2025, art. 4 |
| Destinatari | Preparatore Personale del corsista; responsabile per la gestione tecnica |
| Conservazione | Conversazioni: [12 mesi] dopo la fine del percorso. Voce: trascritta e cancellata subito. Foto: cancellata dopo l'elaborazione, salvo che il corsista la salvi nella sua mappa |

### T2. Cruscotto del tutor e segnalazioni

| Voce | Contenuto |
|---|---|
| Finalità | Mostrare al Preparatore Personale i progressi e segnalare chi sta smettendo di praticare, con i motivi |
| Interessati | Corsisti; Preparatori (dati di accesso) |
| Categorie di dati | Frequenza e durata delle sessioni, precisione negli esercizi, ripassi in ritardo, richieste di aiuto |
| Logica | Regole trasparenti e documentate (punteggio con sei segnali e motivi in chiaro); nessuna decisione automatica: il tutor decide se e come intervenire (art. 22 non applicabile, da confermare) |
| Base giuridica | Esecuzione del contratto (il follow-up è incluso nel corso) |
| Destinatari | Preparatore Personale; istruttore che lo affianca |
| Conservazione | Come T1 |

### T3. Profilo di studio (AMOS) per adattare le risposte

| Voce | Contenuto |
|---|---|
| Finalità | Adattare spiegazioni ed esercizi al modo di studiare del corsista |
| Categorie di dati | Risultati dei questionari AMOS già raccolti dal Preparatore (stili cognitivi, strategie, motivazione, convinzioni sull'intelligenza; ansia e resilienza da valutare) |
| Base giuridica | Consenso specifico e facoltativo (art. 6(1)(a)). **Da verificare** se i punteggi su ansia e resilienza sono dati relativi alla salute (art. 9): in quel caso escluderli o usare il consenso esplicito |
| Destinatari | Nessuno oltre al sistema e al Preparatore |
| Conservazione | Come T1; cancellazione immediata alla revoca del consenso |

### T4. Report alla famiglia

| Voce | Contenuto |
|---|---|
| Finalità | Informare i genitori dei corsisti minorenni sui progressi |
| Interessati | Corsisti minorenni; genitori (email) |
| Categorie di dati | Indicatori aggregati di studio; mai il testo delle conversazioni |
| Base giuridica | Esecuzione del contratto stipulato dal genitore; legittimo interesse da valutare per i corsisti maggiorenni (solo su loro richiesta) |
| Conservazione | Report inviati: [24 mesi] |

### T5. Prova gratuita (non iscritti)

| Voce | Contenuto |
|---|---|
| Finalità | Far provare il metodo con l'AI a chi non è iscritto, per portarlo a una demo |
| Interessati | Ragazzi dai 14 anni e genitori; sotto i 14 solo con genitore presente |
| Categorie di dati | Foto di una pagina e dialogo, **non salvati**; età dichiarata; contatti del genitore solo se chiede la demo |
| Base giuridica | Misure precontrattuali su richiesta dell'interessato (art. 6(1)(b)) per la prova e la demo; consenso separato per il marketing |
| Conservazione | Dialogo e foto: solo per la durata della sessione. Contatti per la demo: [6 mesi] se non si iscrive |
| Statistiche | Solo conteggi anonimi (prove avviate, completate, demo richieste) per il KPI del pilota |

### T6. Misurazione dei KPI e miglioramento del sistema

| Voce | Contenuto |
|---|---|
| Finalità | (a) misurare i KPI del pilota; (b) migliorare il Preparatore AI e, dopo il pilota, addestrarlo sui dialoghi |
| Categorie di dati | (a) indicatori pseudonimizzati; (b) dialoghi anonimizzati e approvati dal tutor |
| Base giuridica | (a) Legittimo interesse di Learnis a valutare il servizio, con bilanciamento documentato; (b) consenso specifico e facoltativo (dal corsista dai 14 anni, dal genitore sotto) |
| Conservazione | (a) Fino al report finale del pilota, poi solo aggregati; (b) fino alla revoca del consenso |
| Note | Nessun dialogo esce dal controllo di Learnis: il dataset resta di proprietà Learnis |
