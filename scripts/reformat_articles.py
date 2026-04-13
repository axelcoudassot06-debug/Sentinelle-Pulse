#!/usr/bin/env python3
"""
Reformats all articles in data.ts using Claude API.
Saves progress to progress.json so it can be resumed if interrupted.
"""

import os, re, json, time, sys
import anthropic

API_KEY = os.environ.get("ANTHROPIC_API_KEY")
if not API_KEY:
    print("ERROR: ANTHROPIC_API_KEY not set")
    sys.exit(1)

client = anthropic.Anthropic(api_key=API_KEY)

DATA_TS   = "/Users/axel/Desktop/sentinelle-pulse-new/src/lib/data.ts"
CHARTS_TS = "/Users/axel/Desktop/sentinelle-pulse-new/src/lib/chartData.ts"
PROGRESS  = "/Users/axel/Desktop/sentinelle-pulse-new/scripts/progress.json"

# ─── Parsing helpers ───────────────────────────────────────────────────────────

def load_progress():
    if os.path.exists(PROGRESS):
        with open(PROGRESS) as f:
            return json.load(f)
    return {}

def save_progress(prog):
    with open(PROGRESS, "w") as f:
        json.dump(prog, f, ensure_ascii=False, indent=2)

def extract_articles(src):
    """Return list of (id, start_char, end_char, raw_block) for all articles."""
    articles = []
    # Match article boundaries: { id:'N', title:` — the title backtick makes it unique
    pattern = re.compile(r"\{ id:'(\d+)', title:`")
    matches = list(pattern.finditer(src))
    for i, m in enumerate(matches):
        aid = m.group(1)
        start = m.start()
        end = matches[i+1].start() if i+1 < len(matches) else len(src)
        articles.append((aid, start, end, src[start:end]))
    return articles

def get_content_field(block):
    """Extract the raw string between content:` and `, category:"""
    m = re.search(r"content:`([\s\S]*?)`, category:", block)
    return m.group(1) if m else ""

def get_excerpt_field(block):
    m = re.search(r"excerpt:`([\s\S]*?)`, content:", block)
    return m.group(1) if m else ""

def get_title_field(block):
    m = re.search(r"title:`([\s\S]*?)`, excerpt:", block)
    return m.group(1) if m else ""

def get_category_field(block):
    m = re.search(r"category:'(\w+)'", block)
    return m.group(1) if m else ""

# ─── Claude API call ────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """Tu es un éditeur web expert. Tu reformates des articles analytiques extraits de PDFs pour un site Next.js.

RÈGLES STRICTES :
- Ne change JAMAIS le contenu factuel, les données chiffrées, les références [1][2][3]
- Ne change JAMAIS le sens ou les conclusions analytiques
- Supprime les artefacts PDF : lignes "Sentinelle Pulse — OSINT... | Mars 2026", "Sources : EIA · ..." en bas, les chiffres KPI qui doublonnent au début (ils sont déjà dans les cards)
- Réécris en prose fluide, sans tirets parasites (—) inutiles au milieu des phrases
- Utilise des virgules, deux-points, ou reformule plutôt que des em-dashes
- Garde les em-dashes UNIQUEMENT dans les titres de section (ex: "ÉVALUATION — SITE PAR SITE")

STRUCTURE À PRODUIRE (Markdown enrichi) :

1. INTRODUCTION : 2-3 paragraphes de prose fluide. Commence directement par le contenu (pas de titre).

2. SECTIONS : ## TITRE EN MAJUSCULES pour chaque grande partie, ### sous-titre si besoin

3. TABLEAUX : Markdown table bien formaté — UNE donnée par cellule, pas de cellules fusionnées
   Format :
   | Col1 | Col2 | Col3 |
   | --- | --- | --- |
   | val1 | val2 | val3 |

4. OBJECTION/RÉPONSE : Quand tu vois une section "Objection" ou "Réfutation" ou "⚡", utilise :
   <DEBATE>
   « Texte de l'objection/idée reçue ici »
   |||
   Réponse analytique ici, en prose claire.
   </DEBATE>

5. CITATIONS FORTES : Pour les "PRINCIPE DIRECTEUR" ou conclusions importantes :
   <QUOTE>La phrase clé ici, courte et percutante.</QUOTE>

6. CONCLUSION : 1-2 paragraphes de synthèse avant les sources

7. SOURCES :
   ## SOURCES
   - [1] Source...
   - [2] Source...

RETOURNE UNIQUEMENT UN JSON valide avec cette structure :
{
  "content": "le contenu reformaté complet",
  "excerpt": "résumé de 2 phrases maximum, sans balises, texte brut",
  "timeline": [
    {"date": "2020", "title": "Titre court", "description": "Description courte", "type": "milestone|event|warning"}
  ],
  "barChart": {
    "title": "Titre du graphique",
    "unit": "unité (%, Md$, Mb/j, etc.)",
    "data": [
      {"label": "Étiquette", "value": 42, "color": "#couleur"}
    ]
  }
}

Pour timeline : inclure 4-7 événements clés mentionnés dans l'article, du plus ancien au plus récent.
Pour barChart : inclure SEULEMENT si l'article contient des données comparatives claires (classements, parts de marché, volumes). Sinon mettre null.
type "warning" = événement négatif/crise, "milestone" = événement positif/accord, "event" = neutre.
Couleurs barChart : rouge #ef4444, orange #f59e0b, vert #059669, gris #6b7280, bleu #0891b2.
"""

def reformat_article(article_id, title, category, raw_content):
    user_msg = f"""Article ID: {article_id}
Titre: {title}
Catégorie: {category}

Contenu brut à reformater:
---
{raw_content}
---

Reformate cet article selon les instructions. Retourne UNIQUEMENT le JSON demandé, sans markdown code block."""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=8000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_msg}]
    )

    text = response.content[0].text.strip()
    # Remove possible ```json ... ``` wrapper
    text = re.sub(r'^```json\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return json.loads(text)

# ─── chartData helpers ──────────────────────────────────────────────────────────

def load_chart_data(src):
    """Extract the charts record from chartData.ts as a string."""
    m = re.search(r"const charts: Record<string, ArticleChart> = \{([\s\S]*)\};?\s*export default", src)
    if not m:
        m = re.search(r"const charts: Record<string, ArticleChart> = (\{[\s\S]*\})\s*;?\s*export default", src)
    return m

def update_chart_for_article(charts_src, article_id, kpis_block, timeline_data, bar_data):
    """Update or add timeline/barChart for an article in chartData.ts source."""
    # Find the article's block in chartData
    # Pattern: '1': { ... },
    pat = re.compile(r"'%s': \{([\s\S]*?)\}," % re.escape(article_id))
    m = pat.search(charts_src)
    if not m:
        return charts_src  # Article not in chartData, skip

    block = m.group(0)
    inner = m.group(1)

    # Build new additions
    additions = ""

    if timeline_data:
        events_js = []
        for e in timeline_data:
            t = e.get("type", "event")
            events_js.append(
                f"        {{ date: '{e['date']}', title: `{e['title']}`, description: `{e['description']}`, type: '{t}' }}"
            )
        additions += f"""    timeline: {{
      title: 'Chronologie',
      events: [
{chr(10).join(events_js)},
      ],
    }},
"""

    if bar_data:
        data_items = []
        for d in bar_data.get("data", []):
            color = d.get("color", "#6b7280")
            data_items.append(
                f"        {{ label: '{d['label']}', value: {d['value']}, color: '{color}' }}"
            )
        additions += f"""    barChart: {{
      title: `{bar_data['title']}`,
      unit: '{bar_data['unit']}',
      data: [
{chr(10).join(data_items)},
      ],
    }},
"""

    if not additions:
        return charts_src

    # Remove existing timeline/barChart from this block if present
    inner_clean = re.sub(r'\s*timeline:[\s\S]*?\},\s*\},', '', inner)
    inner_clean = re.sub(r'\s*barChart:[\s\S]*?\},\s*\},', '', inner_clean)

    new_block = f"'{article_id}': {{{inner_clean}\n{additions}  }},"
    return charts_src[:m.start()] + new_block + charts_src[m.end():]

# ─── Main ────────────────────────────────────────────────────────────────────────

def main():
    with open(DATA_TS, "r", encoding="utf-8") as f:
        data_src = f.read()
    with open(CHARTS_TS, "r", encoding="utf-8") as f:
        charts_src = f.read()

    articles = extract_articles(data_src)
    progress = load_progress()

    # Skip article 1 (already done)
    to_process = [(aid, s, e, blk) for aid, s, e, blk in articles if aid != "1"]

    print(f"Total articles to process: {len(to_process)}")

    for idx, (aid, start, end, block) in enumerate(to_process):
        if aid in progress and progress[aid].get("done"):
            print(f"[{idx+1}/{len(to_process)}] Article {aid} — already done, skipping")
            continue

        title    = get_title_field(block)
        raw      = get_content_field(block)
        category = get_category_field(block)

        print(f"[{idx+1}/{len(to_process)}] Article {aid}: {title[:60]}...")

        try:
            result = reformat_article(aid, title, category, raw)
        except Exception as e:
            print(f"  ERROR: {e}")
            time.sleep(5)
            continue

        new_content = result.get("content", raw)
        new_excerpt = result.get("excerpt", "")
        timeline    = result.get("timeline") or []
        bar_data    = result.get("barChart")

        # Update data_src: replace content and excerpt
        new_block = block
        # Replace content field
        new_block = re.sub(
            r"(content:`)[\s\S]*?(`, category:)",
            lambda m: m.group(1) + new_content + m.group(2),
            new_block, count=1
        )
        # Replace excerpt field
        if new_excerpt:
            new_block = re.sub(
                r"(excerpt:`)[\s\S]*?(`, content:)",
                lambda m: m.group(1) + new_excerpt + m.group(2),
                new_block, count=1
            )

        data_src = data_src[:start] + new_block + data_src[end:]

        # Reparse positions after modification (length may have changed)
        articles = extract_articles(data_src)
        to_process_new = [(a, s, e, b) for a, s, e, b in articles if a != "1"]
        # Update remaining articles positions
        for j in range(idx+1, len(to_process)):
            old_aid = to_process[j][0]
            for a, s, e, b in to_process_new:
                if a == old_aid:
                    to_process[j] = (a, s, e, b)
                    break

        # Update chartData
        charts_src = update_chart_for_article(charts_src, aid, None, timeline, bar_data)

        # Save files
        with open(DATA_TS, "w", encoding="utf-8") as f:
            f.write(data_src)
        with open(CHARTS_TS, "w", encoding="utf-8") as f:
            f.write(charts_src)

        progress[aid] = {"done": True, "title": title[:60]}
        save_progress(progress)
        print(f"  ✓ Done")

        # Rate limit pause
        time.sleep(1.5)

    print("\n✅ All articles processed!")

if __name__ == "__main__":
    main()
