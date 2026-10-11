# Riepilogo della notte: branch `prime-bozze`

Cinque consegne, ognuna in un commit separato su `prime-bozze`. `main` non è stato toccato, `README.md` neanche, e niente è stato pubblicato o mandato a remoto.

## Cosa trovi

| Consegna | Dove | In una riga |
|---|---|---|
| Revisione critica | [revisione/README_revisione.md](revisione/README_revisione.md) | Copia del README con 28 proposte in stile conflitto git, da accettare o rifiutare una per una |
| Verifica dei repository | [verifica-github/Verifica_Repository.md](verifica-github/Verifica_Repository.md) | 24 affermazioni controllate sul codice; tre correzioni importanti; moduli FSRS e segnali di abbandono con 11 test |
| Kit di conformità | [conformita/](conformita/README.md) | Compliance check, informative per corsisti e genitori, registro, DPIA, checklist AI Act, regole di comportamento dell'AI |
| Prototipo | [prototipo/](prototipo/README.md) | Simulazione cliccabile senza AI: prova gratuita, copilota del tutor, cruscotto, report alla famiglia, più il copione della demo |
| Presentazione | [presentazione/offerta-learnis.html](presentazione/offerta-learnis.html) | L'offerta nello stile Learnis, in 13 sezioni nell'ordine di una riunione di vendita, con calcolatore del valore e modalità a slide |

## Come aprire prototipo e presentazione

Dalla cartella della repo:

```bash
python3 -m http.server 8765
```

Poi apri:
- prototipo: <http://localhost:8765/prototipo/>
- presentazione: <http://localhost:8765/presentazione/offerta-learnis.html>

Nella presentazione le frecce ← → passano da una sezione all'altra, e il bottone "Modalità presentazione" dà una sezione per schermata.

## Le scoperte più importanti

1. **Il README si contraddice sul valore.** Le sezioni I e II mettono al centro l'acquisizione di corsisti. La III invece ragiona ancora sull'uso del corsista e su un'integrazione nell'app che nel pilota non c'è (V.1 dice web app separata). Le proposte R-09, R-10 e R-12–R-15 lo sistemano.
2. **La scadenza AI Act è cambiata.** Il rinvio dell'alto rischio al 2 dicembre 2027 non è più "proposto": è legge (Regolamento UE 2026/1744, in vigore dal 27 luglio 2026). Proposta R-19.
3. **Nel rollout non esistono "ricavi dei follow-up".** Il follow-up è incluso nel corso, quindi la garanzia implicita in IV.5 va riscritta. Proposta R-21.
4. **Il dataset SocraTeach non è usabile commercialmente** (CC BY-NC 4.0). Si può riprenderne il metodo, non i dati.
5. **Open TutorAI CE non ha il modello dati per studenti e classi** che il documento gli attribuisce: le cartelle sono vuote.
6. **OpenTutor ha un difetto in FSRS**: "Bene" e "Facile" danno la stessa difficoltà. Il nostro `fsrs.js` è scritto dalle formule ufficiali.
7. **Rischio AI Act principale.** Se il profilo AMOS orienta il percorso, il sistema potrebbe essere ad alto rischio senza deroga (profilazione, art. 6(3)). Il design proposto lo evita, ma serve il parere di un legale.

## Decisioni che spettano a te

Le 7 proposte marcate **DA DECIDERE** nella revisione:

| ID | Decisione |
|---|---|
| R-08 | Prezzo del rollout: solo 30 € a corsista (circa l'1% del valore) o anche 150 € per ogni iscrizione in più |
| R-16, R-17 | Spostare la prova gratuita dai bonus al cuore dell'offerta (stack da 53.000 a 61.000 €) |
| R-20 | Dare un valore in € ai bonus (oggi non ce l'hanno) e togliere il dataset contato due volte |
| R-21 | Cosa succede se i KPI arrivano nei 30 giorni extra della garanzia |
| R-22 | Soglie di partenza dei KPI (proposte: 10 demo dalla prova, 7 su 10 la provano in demo, 50% di uso a 30 giorni e 30% a 60) |
| R-23 | Nome dell'offerta: due nomi attuali sono deboli; proposto un nome per la prova gratuita |

Da chiarire anche:
- il nome del proponente (oggi `[Proponente]` ovunque);
- chi è il titolare del trattamento: Genio Net, il centro di Rimini o entrambi.

## Come la presentazione usa la revisione

La presentazione parte dal README attuale. Dove la revisione ha trovato un errore oggettivo, usa già la versione corretta:

| Proposte | Cosa cambia |
|---|---|
| R-05, R-09 | Il risultato parla di iscritti |
| R-10, R-14, R-15 | Web app nel pilota |
| R-18 | Discovery entro novembre, KPI ad aprile |
| R-19 | Date AI Act |
| R-21 (solo la parte oggettiva) | Garanzia implicita senza "ricavi dei follow-up" |
| R-24 | App riservata agli iscritti |
| R-26 | Domanda sul margine |

Le proposte DA DECIDERE restano come nel README:
- prezzo del rollout a 30 €;
- stack a 53.000 €;
- KPI senza soglie.

In copertina ho usato un titolo neutro al posto dei nomi MAGIC.

## Cosa non è stato fatto

- **AI.** Nessuna AI collegata al prototipo, come richiesto. Tutte le risposte stanno in `prototipo/data/scenario.js`.
- **Materiali del metodo.** Sono segnaposto marcati. La lista di cosa sostituire è in [prototipo/README.md](prototipo/README.md).
- **Kit di conformità.** È una bozza e non è un parere legale.
- **Pubblicazione.** La presentazione non è pubblicata come artifact, perché porta lo stile di un cliente reale. Se vuoi un link condivisibile, dimmelo.
- **File non committato.** `.claude/launch.json` serve solo ad aprire l'anteprima nell'app.
