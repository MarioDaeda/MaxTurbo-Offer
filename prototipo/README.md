# Prototipo: prova gratuita e copilota del tutor

Simulazione cliccabile della Fase 0 della proposta. **Non c'è nessuna AI**: ogni risposta del Preparatore AI è scritta in anticipo in [`data/scenario.js`](data/scenario.js). Serve a far vedere a Learnis, nella prima riunione, come funzionerà l'esperienza, prima di spendere un euro sul modello.

## Come aprirlo

Dalla cartella della repo:

```bash
python3 -m http.server 8765
```

Poi apri <http://localhost:8765/prototipo/>. Funziona anche con un doppio clic su `index.html`, ma alcuni browser bloccano i file locali: il server è più affidabile. Serve la connessione internet solo per i font.

## Le quattro viste

| Vista | Cosa mostra | Sezione della proposta |
|---|---|---|
| **Prova gratuita** | Domanda sull'età, pagina già pronta, dialogo socratico sulle sette fasi ALCUORE, la pagina che si evidenzia e la mappa che si costruisce a ogni risposta giusta, chiamata finale alla demo | IV.4 bonus vendite, III.2 valore prima della firma |
| **Copilota del tutor** | Profilo, compiti e blocchi della settimana di una corsista; bozza della sessione da 60 minuti che il tutor modifica e approva; preparazione da 60 a 20 minuti | III.4, KPI tempo di preparazione |
| **Cruscotto del tutor** | Sei corsisti ordinati per rischio di abbandono, con motivi in chiaro, azione suggerita e ripassi in ritardo. Calcolato davvero da [`segnali.js`](../verifica-github/moduli/segnali.js) e [`fsrs.js`](../verifica-github/moduli/fsrs.js) | IV.5 KPI uso a 30 e 60 giorni |
| **Report alla famiglia** | Email settimanale: giorni di studio, minuti, tecniche usate, ripassi, nota del Preparatore. Senza conversazioni | III.3, conformità |

## Copione della demo (10 minuti)

1. **Apri la prova gratuita.** «Questa è la pagina che un genitore trova da un post sui social o in una demo online.» Fai notare la striscia "Stai parlando con un'intelligenza artificiale": è l'obbligo dell'AI Act in vigore da agosto.
2. **Scegli "Ho 14 anni o più" e poi "Inizia con la pagina".** La pagina è già pronta: la prova punta sul dialogo con il metodo, non sul caricamento di foto.
3. **Al passo Lettura scegli prima la risposta sbagliata** ("Di come le piante respirano"). «Non dà la soluzione: fa un'altra domanda. È la differenza con ChatGPT, e con StudIA.»
4. **Prosegui fino alla fine.** Mostra la pagina che si evidenzia, la mappa che cresce e le lettere ALCUORE che si accendono. «È il loro metodo, non un chatbot generico.»
5. **Clicca "Prenota la demo gratuita".** «Qui la prova diventa un appuntamento: è il KPI "demo prenotate grazie alla prova".»
6. **Passa al Copilota del tutor e clicca "Prepara la bozza".** «Il tutor oggi passa un'ora non pagata a prepararsi. Qui rivede e approva in pochi minuti.» Modifica un blocco e togli una spunta: decide il tutor.
7. **Cruscotto.** «Marco si è fermato da 8 giorni, Tommaso non ha mai iniziato: oggi nessuno se ne accorge prima della sessione successiva.» Apri "Come è calcolato": sono regole leggibili, non una scatola nera.
8. **Report alla famiglia.** «Il genitore vede l'abitudine allo studio, non le chat del figlio.»

## Segnaposto da sostituire in discovery

| Cosa | Dove | Con cosa |
|---|---|---|
| Pagina sulla fotosintesi | `data/scenario.js`, `pagina` | Una pagina vera scelta con i Preparatori, con il permesso dell'editore se serve |
| Dialogo e risposte | `data/scenario.js`, `passi` | Dialoghi scritti o approvati dai Preparatori di Rimini: diventano i primi casi del set di valutazione |
| Nomi delle fasi ALCUORE e tecniche | `data/scenario.js` | Materiali ufficiali Learnis Mind |
| Profilo di Giulia | `data/scenario.js`, `corsisti` | Struttura vera del profilo AMOS (senza dati reali) |
| Corsisti e sessioni | `data/scenario.js`, `corsisti` | Dati anonimi o simulati concordati con Learnis |
| Bozza della sessione | `data/scenario.js`, `bozzaSessione` | Una sessione vera preparata da un Preparatore, per confronto |
| Pesi e soglie del rischio | `verifica-github/moduli/segnali.js` | Taratura sui dati del pilota |
| Tempo di preparazione 20 minuti | `data/scenario.js` | Misura reale nel pilota |

## Dove si collegherà l'AI

Le risposte stanno tutte in `data/scenario.js`, così il passaggio al modello vero tocca un solo punto: al posto della risposta scritta, la richiesta al Preparatore AI con lo stesso contesto (pagina, fase ALCUORE, risposta del corsista). Le stesse domande del file diventano casi di prova da far valutare ai Preparatori.
