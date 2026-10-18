# Analisi costi — Preparatore AI per Learnis

*15 ottobre 2026 · Orizzonte: discovery + pilota di 90 giorni + 12 mesi · Due soci, studenti Unibo (Ingegneria e Scienze Informatiche)*

Prompt usato: [`prompts/analisi_costi.md`](../prompts/analisi_costi.md). Le cifre con fonte sono verificate alla data indicata; quelle marcate **(stima)** vanno confermate con un preventivo.

## Indice

- [In breve](#in-breve)
- [1. Tabella riassuntiva (15 mesi)](#1-tabella-riassuntiva-15-mesi)
- [2. Voci di costo nel dettaglio](#2-voci-di-costo-nel-dettaglio)
  - [2.1 Legale e burocratico](#21-legale-e-burocratico)
  - [2.2 Abbonamenti e AI per lo sviluppo](#22-abbonamenti-e-ai-per-lo-sviluppo)
  - [2.3 Infrastruttura di produzione](#23-infrastruttura-di-produzione)
  - [2.4 Materiale e trasferte](#24-materiale-e-trasferte)
  - [2.5 Tempo dei soci (stima)](#25-tempo-dei-soci-stima)
- [3. Tagli e vantaggi, in ordine di risparmio](#3-tagli-e-vantaggi-in-ordine-di-risparmio)
  - [Docenti e strutture Unibo da contattare](#docenti-e-strutture-unibo-da-contattare)
  - [Bandi e agevolazioni](#bandi-e-agevolazioni)
- [4. Flusso di cassa (scenario realistico, senza INPS)](#4-flusso-di-cassa-scenario-realistico-senza-inps)
- [5. Rischi e costi nascosti](#5-rischi-e-costi-nascosti)
- [6. Domande da fare](#6-domande-da-fare)
- [Fonti](#fonti)

## In breve

- Il progetto costa poco da costruire e far girare: in 15 mesi, **circa 5.000 € nello scenario minimo e circa 11.000 € in quello realistico**, contro 12.000 € fissi del pilota (24.000 € con il bonus).
- **Il rischio più grande è l'INPS**: se i due soci lavorano nella SRL in modo abituale, può scattare l'iscrizione alla gestione commercianti, circa 4.500 € l'anno a testa **(stima)**. Da sola vale 9.000 € e va chiarita con il commercialista *prima* di costituire.
- **Il taglio più grande è sull'infrastruttura**: per il pilota usare un'API pay-per-token in UE con modelli open-weight (meno di 50 €/mese) invece di una GPU dedicata (circa 1.000 €/mese).
- **Il vantaggio più grande da studenti Unibo**: i docenti di ALMA AI e CIRSFID per il parere su AI Act e minori, Almacube per incubazione e crediti cloud, e lo status di startup innovativa per esenzioni e bandi.

## 1. Tabella riassuntiva (15 mesi)

| Categoria | Minimo | Realistico | Prudente |
|---|---:|---:|---:|
| Costituzione società | 900 € (SRLS) | 1.200 € (SRLS) | 3.500 € (SRL ordinaria) |
| Gestione societaria e commercialista | 2.300 € | 3.300 € | 5.000 € |
| INPS soci | 0 € | 0 € | 11.000 € |
| Legale, privacy, AI Act | 300 € | 1.500 € | 4.000 € |
| Assicurazioni | 0 € | 1.300 € | 2.500 € |
| Abbonamenti AI e strumenti di sviluppo | 700 € | 2.000 € | 3.300 € |
| Infrastruttura di produzione | 500 € | 1.000 € | 7.000 € |
| Materiale e trasferte | 200 € | 400 € | 1.000 € |
| Registrazione software (per startup innovativa) | 0 € | 300 € | 300 € |
| **Totale** | **circa 5.000 €** | **circa 11.000 €** | **circa 37.600 €** |
| Imposte sull'utile (IRES 24% + IRAP 3,9%) | sull'utile | sull'utile | sull'utile |

Lo scenario prudente presuppone INPS dovuto per entrambi, SRL ordinaria con notaio pieno, GPU dedicata nei mesi di rollout e un avvocato a pagamento.

## 2. Voci di costo nel dettaglio

### 2.1 Legale e burocratico

| Voce | Una tantum | Ricorrente | Note e fonte |
|---|---:|---:|---|
| Imposta di registro | 200 € | — | Misura fissa ([Money.it](https://www.money.it/quanto-costa-aprire-una-srl-e-le-differenze-con-srls)) |
| Notaio SRLS (modello standard) | 0–350 € + IVA | — | Con l'atto tipizzato l'onorario è nullo o ridotto ([NotaioOnline](https://notaionline.it/guida/costo-costituzione-srl-notaio/)) |
| Notaio SRL ordinaria | 1.500–3.000 € + IVA | — | Fino a 4.400 € secondo [NotaioOnline](https://notaionline.it/calcolo-notaio/costituzione-societa/) |
| Bolli e diritti di segreteria | circa 250 € | — | Le fonti divergono tra 90 e 150 € di diritti camerali più bolli |
| Capitale sociale | da 1 € (SRLS) | — | Consiglio: versare 2.000–5.000 € per coprire i costi prima del primo incasso |
| Tassa vidimazione libri sociali | — | 309,87 €/anno | [Money.it](https://www.money.it/quanto-costa-aprire-una-srl-e-le-differenze-con-srls) |
| Diritto annuale CCIAA | — | circa 150 €/anno **(stima)** | Maggiorazione del 20% nel triennio 2026–2028 ([PartitaIVA.it](https://www.partitaiva.it/costi-srl-costituzione-gestione-imposte-commercialista)); **zero se startup innovativa** |
| Deposito bilancio | — | circa 100 €/anno **(stima)** | |
| PEC | — | 10–30 €/anno | Obbligatoria |
| Firma digitale (2 soci) | 100 € | rinnovo triennale | Obbligatoria per l'amministratore |
| Commercialista | — | 1.800–3.000 €/anno | Online 130–260 €/mese, tradizionale 2.000–4.000 € ([Fiscozen](https://www.fiscozen.it/guide/quanto-costa-un-commercialista-al-mese/), [Moneyfarm](https://blog.moneyfarm.com/it/finanza-personale/quanto-costa-un-commercialista/)) |
| INPS gestione commercianti | — | circa 4.500 €/anno a socio **(stima)** | Dovuta solo se il socio lavora nella società in modo abituale e prevalente ([PensioniOggi](https://www.pensionioggi.it/esperto-risponde/previdenza/soci-e-amministratori-di-srl-quando-scatta-l-obbligo-di-iscrizione-all-inps-873), [Fiscomania](https://fiscomania.com/contribuzione-inps-del-socio-amministratore-di-srl)) |
| Contratto con Learnis | 0–800 € | — | Da far rivedere; con garanzia e quota a KPI conviene un testo scritto bene |
| DPA, nomina a responsabile del trattamento | incluso sopra | — | Learnis è titolare, noi responsabili |
| DPIA | 0 € per noi | — | È un obbligo del titolare (Learnis); noi forniamo la scheda tecnica |
| Parere AI Act e minori | 0–2.500 € | — | 0 € se ottenuto da docenti Unibo (vedi sezione 3) |
| Privacy policy e termini d'uso della web app | 0–500 € | — | |
| RC professionale | — | 800–1.500 €/anno | Massimale 250.000 € ([Moneyside](https://www.moneyside.app/it/learn/assicurazioni/assicurazione-rc-consulenti)) |
| Polizza cyber | — | 300–750 €/anno | Trattiamo dati di minori: consigliata ([Il Sole 24 Ore](https://ntplusfisco.ilsole24ore.com/art/studi-scudo-anti-hacker-e-boom-le-cyber-polizze-ACMGTol)) |

**SRLS o SRL?** Per due soci e un primo contratto da 12–24.000 €, la SRLS basta e costa un terzo. Si può trasformare in SRL ordinaria quando entra un investitore. Il limite della SRLS è lo statuto standard non modificabile: niente clausole su vesting, prelazione o uscita del socio. Per questo serve comunque un **patto parasociale** tra voi due (chi possiede il codice, cosa succede se uno lascia): costa poco e evita il problema più comune tra soci.

### 2.2 Abbonamenti e AI per lo sviluppo

| Strumento | Prezzo | Vantaggio studenti |
|---|---|---|
| Claude Pro / Max 5x / Max 20x | 20 / 100 / 200 $ al mese ([NoCode MBA](https://www.nocode.mba/articles/claude-pricing-2026)); Max 5x circa 105 € IVA inclusa ([GPTPrompts](https://gptprompts.ai/it/prezzi-claude)) | Nessuno sconto studenti trovato |
| ChatGPT Plus | circa 20 $ al mese, 18–23 € ([Tech Insider](https://tech-insider.org/chatgpt-plus-vs-claude-pro-vs-perplexity-pro-2026/)) | |
| Cursor Pro | circa 20 $ al mese (fonte secondaria) | Offerte studenti segnalate, da verificare ([BuildMVPFast](https://www.buildmvpfast.com/blog/student-developer-perks-free-ai-tools-copilot-cursor-2026)) |
| GitHub Copilot Student | gratis | Nuove iscrizioni forse sospese da aprile 2026: le fonti non concordano ([Layer3Labs](https://www.layer3labs.io/guides/github-copilot-student)) |
| GitHub Student Developer Pack | gratis | GitHub Pro, 100 $ di crediti Azure; il credito DigitalOcean è finito il 31 luglio 2026 ([Capital & Compute](https://capitalandcompute.net/blog/github-student-developer-pack-2026/)) |
| Microsoft 365 | gratis | Con l'account @studio.unibo.it ([Unibo](https://www.unibo.it/it/studiare/vivere-luniversita-e-la-citta/agevolazioni-per-computer-tablet-e-software/microsoft-office-365)) |
| Azure Dev Tools for Teaching | gratis | Per studenti Unibo |
| Figma, Notion, Linear | piano gratuito o Education | Bastano i piani gratuiti per due persone |

**Consiglio**: un solo abbonamento di punta per lo sviluppo agentico (Claude Max 5x, circa 105 €/mese) usato da chi scrive più codice, e un piano da 20 € per l'altro. Non pagate tre assistenti che fanno la stessa cosa. Scenario realistico: circa 130 €/mese, circa 2.000 € in 15 mesi.

Attenzione: le licenze Education (Microsoft 365, Copilot Student, JetBrains) sono di norma **per uso non commerciale**. Usatele per studiare e prototipare; per il lavoro fatturato a Learnis servono gli account a pagamento o i programmi startup (sezione 3).

### 2.3 Infrastruttura di produzione

Ipotesi di carico **(stima)**: 15 corsisti, 30 scambi a settimana ciascuno, circa 3.000 token in ingresso (domanda + materiali RAG) e 500 in uscita per scambio; 4 tutor con il copilota, più pesante. In tutto circa 10–15 milioni di token al mese nel pilota.

| Opzione | Costo mensile pilota | Note |
|---|---:|---|
| **API pay-per-token in UE (consigliata per il pilota)** | **5–30 €** | Scaleway Generative APIs, a Parigi: Mistral Small 0,15 €/M token in ingresso e 0,35 € in uscita; Llama 3.3 70B 0,90 €/M; primo milione gratis ([Scaleway](https://scaleway.com/en/pricing/model-as-a-service)). Modelli open-weight, dati in UE, coerente con la proposta |
| GPU dedicata L40S 48 GB, 24/7 | circa 1.020 € | Scaleway da 1,40 €/ora ([Scaleway](https://www.scaleway.com/l40s-gpu-instance)); OVHcloud circa 1,80 $/ora ([ComputePrices](https://computeprices.com/compare/ovhcloud-vs-scaleway)) |
| GPU a ore solo per fine-tuning LoRA e valutazione | 20–60 € una tantum | 10–40 ore di L40S |
| Hosting web app + database Postgres con pgvector | 10–25 € | VPS europea o piano gratuito/base di un database gestito in UE |
| Dominio + email | 2–15 € | Dominio circa 15 €/anno; email professionale 0–7 € a utente |
| Monitoraggio, log, backup | 0–10 € | Piani gratuiti |

Costo per corsista: circa **0,10–0,50 € al mese** con API, contro i 30 € di canone di rollout. Il margine è quasi tutto nostro anche a scala.

Quando passare alla GPU dedicata: solo quando il costo delle API supera circa 1.000 €/mese, cioè con qualche migliaio di corsisti attivi, o se Learnis chiede un'istanza isolata. In quel caso il costo va scritto nel prezzo di rollout.

Serve un **DPA con il provider** (Scaleway lo offre di serie) e la verifica che il provider non usi i dati per addestrare: va dichiarato a Learnis.

### 2.4 Materiale e trasferte

| Voce | Costo | Note |
|---|---:|---|
| Computer | 0 € | Usate i vostri; nessuna GPU locale necessaria |
| Treno Cesena–Rimini | circa 4 € a tratta **(stima)** | Una visita a settimana in due per 13 settimane: circa 200 € |
| Materiale per formare i tutor | 0–100 € | Guida in PDF e video registrati |
| Telefono di test (iOS/Android) | 0 € | Usate i vostri |

### 2.5 Tempo dei soci (stima)

| Fase | Ore totali (due soci) con AI | Senza AI |
|---|---:|---:|
| Discovery e demo (2 settimane) | 60–80 | 120 |
| Costruzione pilota (MVP web app, RAG, cruscotto) | 150–250 | 400–500 |
| Esercizio pilota (90 giorni: supporto, affiancamento tutor, misure) | 150–200 | 200–250 |
| Report KPI e proposta di rollout | 30–40 | 60 |
| **Totale** | **circa 400–570 ore** | **circa 800–930 ore** |

Con 12.000 € fissi e circa 500 ore, il compenso effettivo è circa 24 €/ora prima di tasse e costi; con il bonus sale a circa 48 €/ora. Il tempo è il costo vero del progetto: va protetto con un perimetro scritto nel contratto (cosa è incluso nel pilota e cosa no).

## 3. Tagli e vantaggi, in ordine di risparmio

| # | Azione | Risparmio | Facilità | Primo passo |
|---|---|---:|---|---|
| 1 | Chiarire l'INPS prima di costituire: chi è amministratore, chi lavora "in modo abituale e prevalente", ed eventuali riduzioni per nuovi iscritti | fino a 9.000 €/anno | Media | Prima domanda al commercialista (sezione 6) |
| 2 | API pay-per-token in UE invece di GPU dedicata nel pilota | circa 1.000 €/mese | Facile | Account Scaleway, test con Mistral Small e Llama 70B sui 100 casi |
| 3 | Parere su AI Act, minori e GDPR da docenti Unibo | 1.500–4.000 € | Media | Email a ALMA AI/CIRSFID (sotto) |
| 4 | Startup innovativa: niente diritto annuale, bolli e diritti di segreteria per 5 anni, accesso a bandi | 500–1.000 € + bandi | Media | Registrare il software o documentare il 15% di spesa in R&S |
| 5 | Incubazione Almacube: coworking, mentoring, rete Confindustria, e affiliazione utile per i crediti cloud | servizi di migliaia di € | Media | Candidatura all'Ignition Program |
| 6 | Crediti cloud per startup | 1.000–5.000 $ subito | Facile | Microsoft for Startups (accesso senza VC), AWS Activate Founders, Google for Startups Start |
| 7 | DPIA a carico di Learnis (è il titolare) | 1.000–3.000 € | Facile | Scriverlo nel contratto e nel DPA |
| 8 | SRLS invece di SRL ordinaria | 1.500–3.000 € | Facile | Notaio con atto standard |
| 9 | Un solo abbonamento AI di punta + uno base | circa 1.000 € | Facile | Decidere chi fa cosa |
| 10 | Commercialista online o convenzionato con Almacube | 500–1.500 €/anno | Facile | Chiedere 3 preventivi |
| 11 | Tesi o tirocinio curriculare sul progetto | crediti formativi + supervisione gratuita | Media | Proporre a un relatore il tema "valutazione di tutor LLM per minori" |
| 12 | Anticipo del 50% alla firma | elimina il fabbisogno di cassa | Facile | Nella proposta: 6.000 € alla firma, 6.000 € a 45 giorni |

### Docenti e strutture Unibo da contattare

- **ALMA AI** (istituto Unibo per l'AI centrata sull'uomo, oltre 500 ricercatori) e **CIRSFID**: Antonino Rotolo, Giuseppe Contissa e Federico Galli hanno scritto un commentario sull'AI Act e sulla Legge 132/2025, che è esattamente la norma sul consenso dei minori citata nella proposta. Giusella Finocchiaro e Giovanni Sartor lavorano su diritto dei dati e AI ([Unibo](https://www.unibo.it/sitoweb/federico.galli7/download/CV-Galli-IT.pdf), [ALMA AI](https://centri.unibo.it/alma-ai/it/agenda/ai-act-etica-diritto-e-informatica-a-confronto/conferenza-ai-act-11-dicembre-2023.pdf/@@download/file/Conferenza%20AI%20Act%2011%20dicembre%202023.pdf)). Un caso concreto (tutor AI per minori in Italia) è materiale interessante per loro: chiedete un incontro, non una consulenza gratuita. Un docente non può firmare un parere legale come un avvocato, ma può indicarvi la classificazione e a chi rivolgervi.
- **Docenti del vostro corso a Cesena** su NLP, machine learning e sicurezza: per il metodo di valutazione dei modelli (set di 100 casi) e per la tesi.
- **Almacube**: incubatore di Unibo con Confindustria Emilia e, dal 2026, Fondazione Golinelli; percorso Ignition poi Incubation ([Unibo StartUp Day](https://site.unibo.it/startupdayunibo/en/attendants-1/startupper), [Unibo Magazine](https://magazine.unibo.it/en/articles/startup-day-2026-awards-13-student-entrepreneurial-teams)).
- **StartUp Day Unibo** (giugno, con ART-ER): premi e visibilità per team di studenti.
- **Great-ER**: incubazione gratuita da 20.000 € di servizi, ma per progetti deep-tech; probabilmente non è il vostro caso ([Unibo Magazine](https://magazine.unibo.it/en/articles/launching-201cgreat-er-free-programme-for-deep-tech-startups-and-spin-offs)).

Non ho trovato una clinica legale Unibo per startup; esistono modelli simili altrove (Bocconi B4i). Vale una domanda ad Almacube.

### Bandi e agevolazioni

| Misura | Cosa dà | Stato | Fonte |
|---|---|---|---|
| Bando Regione Emilia-Romagna startup innovative | Fondo perduto per startup che usano AI e digitale; spese di consulenza, attrezzature e personale | Edizione 2025 chiusa il 30/01/2026 (5 M€); la 2026 non risulta ancora pubblicata | [FESR Emilia-Romagna](https://fesr.regione.emilia-romagna.it/opportunita/2024/bando-per-il-sostegno-allo-sviluppo-delle-startup-innovative/presentazione-domanda/bando.pdf), [BI-REX](https://bi-rex.it/wp-content/uploads/2025/11/Bando-START-UP-innovative_RER_2025_scheda-sintetica.pdf) |
| Smart&Start Italia (Invitalia) | Prestito a tasso zero per piani da 100.000 € a 1,5 M€, parte convertibile a fondo perduto | Aperto nel 2026; troppo grande per il pilota, utile per il rollout | [PartitaIVA.it](https://www.partitaiva.it/smartstart-italia-2026/) |
| Startup innovativa | Esenzione da diritto annuale, bolli e diritti di segreteria per 5 anni | Requisito da soddisfare: software registrato, 15% di R&S o personale qualificato | [Unioncamere](https://sni.unioncamere.it/sites/default/files/approfondimento/documenti/Scheda%20Teseo_startup%20innovative.pdf) |
| Microsoft for Startups | Da 1.000 $ a 5.000 $ di crediti Azure senza investitori, più strumenti | Aperto | [Gupta](https://guptadeepak.com/startup-offers/guides/microsoft-for-startups) |
| AWS Activate / Google for Startups | 1.000–5.000 $ / circa 2.000 $ al livello base; molto di più con affiliazione a un incubatore | Aperto | [Fin.ai](https://fin.ai/learn/startup-credit-programs) |

Per i crediti cloud servono un'email sul dominio aziendale e un sito vero: le richieste da Gmail vengono spesso rifiutate. Nota: i crediti sono su AWS, Azure e Google, mentre la proposta punta su provider europei. Azure e Google hanno regioni in UE (anche Milano); usare i crediti lì è accettabile se Learnis è d'accordo e il DPA lo copre.

La procedura online di costituzione della startup innovativa senza notaio, citata da alcune fonti camerali, è stata annullata dal Consiglio di Stato nel 2021: oggi serve il notaio. Da verificare con il commercialista.

## 4. Flusso di cassa (scenario realistico, senza INPS)

| Periodo | Uscite | Entrate | Saldo cumulato |
|---|---:|---:|---:|
| Mese 0: costituzione SRLS, firma digitale, PEC, primo mese strumenti | circa 1.500 € | capitale versato 3.000 € | +1.500 € |
| Mese 1: discovery e demo gratuita | circa 200 € | 0 € | +1.300 € |
| Mese 2: firma pilota, legale, assicurazioni | circa 2.800 € | 6.000 € (50% alla firma, se negoziato) | +4.500 € |
| Mesi 3–5: pilota | circa 600 €/mese | 6.000 € a metà pilota | +8.700 € |
| Mese 5: fine pilota, report KPI | — | 0–12.000 € di bonus (pagamento a 30–60 giorni) | +8.700 / +20.700 € |
| Mesi 6–15: rollout o fermo | circa 450 €/mese | 30 € a corsista | dipende dal rollout |

Senza anticipo, se Learnis paga a fine pilota bisogna anticipare circa **6.000 €** (capitale o finanziamento soci). Con l'anticipo del 50% il progetto si autofinanzia dal mese 2. A fine anno restano da pagare IRES e IRAP sull'utile e il saldo del commercialista.

## 5. Rischi e costi nascosti

- **INPS commercianti**: vedi sopra. È la voce che può cambiare il conto da positivo a pari.
- **Il bonus a KPI può non arrivare**: pianificate tutto sui 12.000 € fissi.
- **Garanzia "altri 30 giorni gratis"**: un mese di lavoro non pagato, circa 100–150 ore.
- **Licenze Education usate per lavoro commerciale**: violano i termini d'uso.
- **Dati di minori**: un incidente senza polizza cyber e senza DPA scritto ricade sulla società.
- **Diritti sul codice e sul dataset**: la proposta dice che il dataset è di Learnis; scrivete nel contratto che il codice e la piattaforma restano vostri, con licenza d'uso a Learnis, altrimenti il rollout può essere rifatto da altri.
- **Integrazione con Dieffetech** al rollout: costo esterno non nostro, ma va scritto chi lo paga.
- **Uscita di un socio**: senza patto parasociale, il codice è conteso.
- **Fine degli studi**: le licenze studenti scadono con la laurea.
- **Prezzi delle API**: fissare a contratto una soglia di consumo oltre la quale il costo è a carico di Learnis.

## 6. Domande da fare

**Al commercialista**
1. Con due soci che sviluppano software per la società, siamo obbligati all'iscrizione INPS commercianti? Conviene che solo uno sia amministratore? Ci sono riduzioni per nuovi iscritti nel 2026?
2. SRLS o SRL ordinaria per noi? E startup innovativa subito, iscrivendo direttamente la società nella sezione speciale per avere le esenzioni dall'inizio?
3. Come ci paghiamo: compenso amministratore, utili, o niente il primo anno?
4. Qual è il suo canone annuo tutto incluso, bilancio compreso?
5. Possiamo usare il credito d'imposta R&S per le ore di sviluppo e valutazione dei modelli?

**Ai docenti (ALMA AI, CIRSFID, corso di laurea)**
1. Un tutor AI che non dà voti né decide percorsi, usato da minori dai 14 anni, rientra nell'alto rischio dell'AI Act (istruzione)?
2. Come va raccolto il consenso secondo la Legge 132/2025 in una web app?
3. Sareste interessati a seguire una tesi o un tirocinio sulla valutazione del sistema?
4. A quale avvocato o studio consigliate di rivolgerci per la verifica finale?

**A Learnis**
1. Accettate un anticipo del 50% alla firma del pilota?
2. Fate voi la DPIA come titolare, con la nostra scheda tecnica?
3. Avete già un DPO o un consulente privacy?
4. Chi paga eventuali costi Dieffetech al rollout?
5. Accettate che codice e piattaforma restino nostri, con licenza d'uso a voi e dataset di vostra proprietà?

## Fonti

- [Money.it: costi SRL e SRLS](https://www.money.it/quanto-costa-aprire-una-srl-e-le-differenze-con-srls)
- [NotaioOnline: calcolo costi costituzione](https://notaionline.it/calcolo-notaio/costituzione-societa/)
- [NotaioOnline: costo notaio SRL](https://notaionline.it/guida/costo-costituzione-srl-notaio/)
- [PartitaIVA.it: costi SRL 2026](https://www.partitaiva.it/costi-srl-costituzione-gestione-imposte-commercialista)
- [Fiscozen: costo commercialista](https://www.fiscozen.it/guide/quanto-costa-un-commercialista-al-mese/)
- [Moneyfarm: costo commercialista 2026](https://blog.moneyfarm.com/it/finanza-personale/quanto-costa-un-commercialista/)
- [PensioniOggi: soci SRL e INPS](https://www.pensionioggi.it/esperto-risponde/previdenza/soci-e-amministratori-di-srl-quando-scatta-l-obbligo-di-iscrizione-all-inps-873)
- [Fiscomania: contribuzione socio amministratore](https://fiscomania.com/contribuzione-inps-del-socio-amministratore-di-srl)
- [Unioncamere: scheda startup innovative](https://sni.unioncamere.it/sites/default/files/approfondimento/documenti/Scheda%20Teseo_startup%20innovative.pdf)
- [Camera di Commercio di Trapani: startup innovative](https://www.tp.camcom.it/print/pdf/node/6157)
- [FESR Emilia-Romagna: bando startup innovative](https://fesr.regione.emilia-romagna.it/opportunita/2024/bando-per-il-sostegno-allo-sviluppo-delle-startup-innovative/presentazione-domanda/bando.pdf)
- [BI-REX: scheda bando 2025](https://bi-rex.it/wp-content/uploads/2025/11/Bando-START-UP-innovative_RER_2025_scheda-sintetica.pdf)
- [PartitaIVA.it: Smart&Start Italia 2026](https://www.partitaiva.it/smartstart-italia-2026/)
- [Unibo StartUp Day: startupper](https://site.unibo.it/startupdayunibo/en/attendants-1/startupper)
- [Unibo Magazine: StartUp Day 2026](https://magazine.unibo.it/en/articles/startup-day-2026-awards-13-student-entrepreneurial-teams)
- [Unibo Magazine: Great-ER](https://magazine.unibo.it/en/articles/launching-201cgreat-er-free-programme-for-deep-tech-startups-and-spin-offs)
- [Unibo: Microsoft Office 365 per studenti](https://www.unibo.it/it/studiare/vivere-luniversita-e-la-citta/agevolazioni-per-computer-tablet-e-software/microsoft-office-365)
- [CV Federico Galli, Unibo](https://www.unibo.it/sitoweb/federico.galli7/download/CV-Galli-IT.pdf)
- [ALMA AI: conferenza AI Act](https://centri.unibo.it/alma-ai/it/agenda/ai-act-etica-diritto-e-informatica-a-confronto/conferenza-ai-act-11-dicembre-2023.pdf/@@download/file/Conferenza%20AI%20Act%2011%20dicembre%202023.pdf)
- [Scaleway: prezzi Generative APIs](https://scaleway.com/en/pricing/model-as-a-service)
- [Scaleway: GPU L40S](https://www.scaleway.com/l40s-gpu-instance)
- [ComputePrices: OVHcloud vs Scaleway](https://computeprices.com/compare/ovhcloud-vs-scaleway)
- [NoCode MBA: prezzi Claude 2026](https://www.nocode.mba/articles/claude-pricing-2026)
- [GPTPrompts: prezzi Claude in euro](https://gptprompts.ai/it/prezzi-claude)
- [Tech Insider: ChatGPT Plus vs Claude Pro](https://tech-insider.org/chatgpt-plus-vs-claude-pro-vs-perplexity-pro-2026/)
- [Layer3Labs: GitHub Copilot Student](https://www.layer3labs.io/guides/github-copilot-student)
- [Capital & Compute: GitHub Student Developer Pack 2026](https://capitalandcompute.net/blog/github-student-developer-pack-2026/)
- [BuildMVPFast: student perks 2026](https://www.buildmvpfast.com/blog/student-developer-perks-free-ai-tools-copilot-cursor-2026)
- [Fin.ai: programmi crediti startup 2026](https://fin.ai/learn/startup-credit-programs)
- [Gupta: Microsoft for Startups](https://guptadeepak.com/startup-offers/guides/microsoft-for-startups)
- [Moneyside: RC consulenti](https://www.moneyside.app/it/learn/assicurazioni/assicurazione-rc-consulenti)
- [Il Sole 24 Ore: polizze cyber](https://ntplusfisco.ilsole24ore.com/art/studi-scudo-anti-hacker-e-boom-le-cyber-polizze-ACMGTol)
