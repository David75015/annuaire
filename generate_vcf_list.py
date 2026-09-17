#!/usr/bin/env python3
"""
Génère sources/vcf-list.json à partir des fichiers présents dans le dossier documents/.

Usage:
  python3 generate_vcf_list.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).parent
DOCS = ROOT / 'documents'
OUT = ROOT / 'sources' / 'vcf-list.json'

def main():
    files = []
    if DOCS.exists() and DOCS.is_dir():
        for p in sorted(DOCS.iterdir()):
            if p.is_file() and p.suffix.lower() == '.vcf':
                files.append(p.name)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"files": files}, ensure_ascii=False, indent=2))
    print(f'Wrote {len(files)} file(s) to {OUT}')

if __name__ == '__main__':
    main()
