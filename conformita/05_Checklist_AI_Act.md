# Checklist AI Act: Preparatore AI

> **Bozza non legale, da rivedere con un consulente.** Analisi sul Regolamento (UE) 2024/1689 come modificato dal Regolamento (UE) 2026/1744 (Digital Omnibus), in vigore dal 27 luglio 2026. Testi consultati il 12 ottobre 2026.

## 1. Le date che contano

| Obbligo | Da quando | Ci riguarda? |
|---|---|---|
| Pratiche vietate (art. 5) | 2 febbraio 2025 | Sì: niente riconoscimento delle emozioni nell'istruzione |
| Alfabetizzazione AI (art. 4) | 2 febbraio 2025, attenuato dall'Omnibus | Sì: formazione dei Preparatori |
| Trasparenza: dire che si parla con un'AI (art. 50(1)) | 2 agosto 2026 | Sì, già in vigore |
| Marcatura dei contenuti generati (art. 50(2)) | 2 agosto 2026; proroga al 2 dicembre 2026 per i sistemi già sul mercato | Marginale: le mappe sono generate, ma per uso personale del corsista |
| Sistemi ad alto rischio dell'Allegato III | 2 dicembre 2027 (prima era il 2 agosto 2026) | **Da valutare**, vedi sotto |

## 2. Ruoli

| Soggetto | Ruolo AI Act | Perché |
|---|---|---|
| [Proponente] | Fornitore (provider) | Sviluppa il sistema e lo mette in servizio con il proprio nome, o con quello di Learnis se il contratto lo prevede: va deciso |
| Learnis (Genio Net / centri) | Deployer (utilizzatore) | Usa il sistema nella propria attività di formazione |
| Fornitore del modello open-weight | Fornitore di modello per finalità generali | I suoi obblighi (art. 53) non passano a noi, salvo modifiche sostanziali al modello |

**Attenzione:** se Learnis mette il proprio marchio sul sistema, potrebbe diventare fornitore (art. 25). Da chiarire nel contratto.

## 3. Il sistema è ad alto rischio?

L'Allegato III, punto 3, indica come ad alto rischio, nell'istruzione e nella formazione professionale "a tutti i livelli":

| Caso | Il Preparatore AI lo fa? |
|---|---|
| (a) Decidere l'accesso o l'ammissione a un istituto | No |
| (b) Valutare i risultati di apprendimento, anche quando servono a orientare il percorso | **Zona grigia**: il cruscotto mostra precisione negli esercizi e rischio abbandono, e il tutor li usa per decidere gli interventi |
| (c) Valutare il livello di istruzione adeguato | No |
| (d) Sorvegliare comportamenti vietati durante le prove | No |

Learnis Mind è un corso in un centro di formazione: è prudente considerarlo un "istituto di istruzione e formazione professionale", anche se privato.

### La deroga dell'art. 6(3) e il limite della profilazione

Un sistema dell'Allegato III non è ad alto rischio se non influenza in modo rilevante le decisioni e svolge un compito procedurale ristretto, migliora un'attività umana già compiuta, rileva scostamenti senza sostituire la valutazione umana, o svolge un compito preparatorio. **Però** l'art. 6(3) dice che è *sempre* ad alto rischio se fa profilazione delle persone.

Il design della proposta per restare fuori dall'alto rischio:

| Scelta di design | Effetto |
|---|---|
| L'AI generativa fa solo dialogo didattico e mappe: non dà voti e non valuta risultati | Non è un sistema di valutazione (punto 3b) |
| Le segnalazioni di abbandono usano regole trasparenti scritte da noi ([segnali.js](../verifica-github/moduli/segnali.js)), non un modello addestrato | Probabilmente non sono un "sistema di AI" secondo le linee guida della Commissione sulla definizione (febbraio 2025), che escludono l'elaborazione di dati con regole semplici. **Da confermare** |
| Le segnalazioni sono un compito preparatorio: il tutor decide se e come intervenire | Rientra nella deroga 6(3)(d), se non c'è profilazione |
| Il profilo AMOS adatta solo tono ed esempi delle spiegazioni, non il percorso | Riduce, ma non esclude, il rischio che sia "profilazione". **Punto principale da sottoporre al legale** |

**Conclusione provvisoria:** ragionevolmente non ad alto rischio per il pilota, a patto che il profilo AMOS non orienti il percorso e che le segnalazioni restino regole trasparenti. Se il legale ritiene che ci sia profilazione ai sensi dell'art. 6(3), il sistema è ad alto rischio e dal 2 dicembre 2027 servono gestione del rischio, qualità dei dati, documentazione tecnica, registrazione, sorveglianza umana, accuratezza e robustezza, marcatura CE. In questo caso conviene progettare il rollout per quegli obblighi fin da subito.

Se si conclude che non è ad alto rischio, la valutazione va documentata prima della messa in servizio (art. 6(4)). **Da verificare** se l'Omnibus ha tolto o cambiato l'obbligo di registrazione collegato (art. 49(2)).

## 4. Checklist

### Già nel design della proposta
- [ ] Banner fisso "Stai parlando con un'intelligenza artificiale", anche nella prova gratuita (art. 50(1))
- [ ] Nessun riconoscimento delle emozioni dalla voce o dal volto (art. 5(1)(f)); l'input vocale serve solo a trascrivere
- [ ] L'AI non dà voti, non decide percorsi, non fa diagnosi
- [ ] Il tutor può vedere, correggere e ignorare ogni segnalazione (sorveglianza umana)
- [ ] Le segnalazioni mostrano sempre i motivi, non solo un numero

### Da fare prima del pilota
- [ ] Parere legale sulla classificazione (sezione 3) e sul ruolo di fornitore o deployer
- [ ] Documento di valutazione art. 6(4), se si conclude "non alto rischio"
- [ ] Formazione dei Preparatori su cosa fa il sistema e sui suoi limiti (art. 4)
- [ ] Set di 100 casi valutato dai Preparatori e soglia minima di qualità per andare in produzione
- [ ] Registro delle versioni del sistema e dei materiali usati dal RAG

### Da fare prima del rollout
- [ ] Rivedere la classificazione con la scala nazionale e l'integrazione in Learnis Mind
- [ ] Se si fa fine-tuning: documentare dati, consensi e valutazione (anche per la DPIA)
- [ ] Aggiornare l'analisi se l'uso cambia (per esempio report usati per decisioni sul percorso)
