"""Controlla README_revisione.md: marcatori bilanciati e, scegliendo sempre ATTUALE, il file torna identico al README.

Uso: python3 revisione/verifica_conflitti.py [--proposte FILE_USCITA]
Con --proposte scrive anche la versione con tutte le proposte accettate.
"""
import re
import sys
from pathlib import Path

QUI = Path(__file__).resolve().parent
REV = (QUI / "README_revisione.md").read_text(encoding="utf-8")
README = (QUI.parent / "README.md").read_text(encoding="utf-8")

corpo = re.sub(r"<!-- INIZIO GUIDA.*?<!-- FINE GUIDA ALLA REVISIONE -->\n\n", "", REV, flags=re.S)

attuale, proposta = [], []
stato = None  # None | "attuale" | "proposta"
blocchi = 0
for n, riga in enumerate(corpo.split("\n"), 1):
    if riga.startswith("<<<<<<< "):
        assert stato is None, f"riga {n}: <<<<<<< dentro un altro blocco"
        stato = "attuale"
        blocchi += 1
    elif riga == "=======":
        assert stato == "attuale", f"riga {n}: ======= fuori posto"
        stato = "proposta"
    elif riga.startswith(">>>>>>> "):
        assert stato == "proposta", f"riga {n}: >>>>>>> fuori posto"
        stato = None
    elif stato == "attuale":
        attuale.append(riga)
    elif stato == "proposta":
        proposta.append(riga)
    else:
        attuale.append(riga)
        proposta.append(riga)

assert stato is None, "file finito dentro un blocco aperto"
assert "\n".join(attuale) == README, "scegliendo sempre ATTUALE il file non coincide con README.md"
print(f"OK: {blocchi} blocchi bilanciati; scegliendo ATTUALE si riottiene README.md")

if "--proposte" in sys.argv:
    dest = Path(sys.argv[sys.argv.index("--proposte") + 1])
    dest.write_text("\n".join(proposta), encoding="utf-8")
    print(f"Versione con tutte le proposte accettate: {dest}")
