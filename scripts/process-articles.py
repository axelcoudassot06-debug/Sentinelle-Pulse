#!/usr/bin/env python3
"""
Sentinelle Pulse — Article Processing Script
Usage: python3 scripts/process-articles.py [path/to/articles.json]
Output: src/lib/data.ts (regenerated)

Add new articles to your articles.json then run this script.
The script handles:
  - PDF footer injection removal
  - Spaced-letter header fixing (e.g. "S I T U A T I O N" → "SITUATION")
  - QUOTE tag extension to closing »
  - DATA tag stripping from body (shown in KPI dashboard instead)
  - French guillemet spacing
"""
import json, re, sys, os

INPUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '../../../sentinelle-export/articles.json')
OUTPUT = os.path.join(os.path.dirname(__file__), '../src/lib/data.ts')

FOOTER_PATTERNS = [
    re.compile(r'Axel Coudassot-Berducou\s+\|\s+linkedin\.com/company/sentinelle-pulse\s+Page\s+\d+[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝ &|\-]+'),
    re.compile(r'Axel Coudassot-Berducou\s+Sentinelle Pulse\s+—[^l]*?linkedin\.com/company/sentinelle-pulse\s+'),
    re.compile(r'Axel Coudassot-Berducou\s+\|\s+linkedin\.com/company/sentinelle-pulse\s+Page\s+\d+'),
]

def fix_group(group):
    parts = group.split(' ')
    if all(len(p) <= 2 for p in parts if p):
        return ''.join(parts)
    return group

def fix_content_headers(content):
    lines = content.split('\n')
    result = []
    for line in lines:
        m = re.match(r'^(#{1,4}) (.+)$', line)
        if m:
            prefix, body = m.group(1), m.group(2)
            if re.search(r'(?<![A-Za-z])[A-Z] [A-Z]', body):
                groups = re.split(r'  +', body)
                body = ' '.join(fix_group(g) for g in groups)
            result.append(f'{prefix} {body}')
        else:
            result.append(line)
    return '\n'.join(result)

def strip_pdf_footers(content):
    for pat in FOOTER_PATTERNS:
        content = pat.sub('', content)
    return content

def fix_quotes(content):
    def extend_quote(m):
        inner = m.group(1)
        after = m.group(2)
        if inner.rstrip().endswith('»'):
            return m.group(0)
        line_part = after.split('\n')[0][:400]
        if '»' in line_part:
            idx = line_part.index('»') + 1
            tail = after[:idx]
            rest = after[idx:]
            join = ' ' if (inner and tail and inner[-1].isalpha() and tail[0].isalpha()) else ''
            return f'<QUOTE>{inner}{join}{tail}</QUOTE>{rest}'
        return m.group(0)
    return re.sub(r'<QUOTE>(.*?)</QUOTE>(.{0,400})', extend_quote, content, flags=re.DOTALL)

def strip_data(content):
    content = re.sub(r'^(\s*<DATA>[^<]*<\/DATA>\s*)+', '', content)
    content = re.sub(r'<DATA>.*?<\/DATA>', '', content)
    return content

def fix_guillemet_spacing(text):
    text = re.sub(r'«([^\s»])', r'« \1', text)
    text = re.sub(r'([^\s«])»', r'\1 »', text)
    return text

def clean_excerpt(text):
    for pat in [r'<DATA>.*?</DATA>', r'<ALERT>.*?</ALERT>', r'<QUOTE>.*?</QUOTE>', r'<[^>]+>']:
        text = re.sub(pat, '', text, flags=re.DOTALL)
    return re.sub(r'\s+', ' ', text).strip()[:300]

def esc(s):
    return s.replace('\\','\\\\').replace('`','\\`').replace('${','\\${')

print(f"Reading {INPUT}...")
with open(INPUT) as f:
    articles = json.load(f)

cleaned = []
for a in articles:
    content = a.get('content', '')
    content = strip_pdf_footers(content)
    content = fix_content_headers(content)
    content = fix_quotes(content)
    content = strip_data(content)
    content = fix_guillemet_spacing(content)
    excerpt = clean_excerpt(a.get('excerpt', '') or content)
    cleaned.append({
        'id': str(a['id']), 'title': a.get('title',''), 'excerpt': excerpt,
        'content': content, 'category': a.get('category','geopolitique'),
        'author': a.get('author','Axel Coudassot-Berducou'), 'date': a.get('date','2026-01-01'),
        'readTime': int(a.get('readTime', 8)), 'series': a.get('series','Sentinelle Pulse'),
        'featured': a.get('featured', False), 'trending': a.get('trending', False),
    })

ts = [
    '// AUTO-GENERATED — run scripts/process-articles.py to regenerate\n\n',
    'export interface Article { id:string; title:string; excerpt:string; content:string; category:string; author:string; date:string; readTime:number; series:string; featured:boolean; trending:boolean; }\n\n',
    'export const articles: Article[] = [\n',
]
for a in cleaned:
    ts.append(f"  {{ id:'{esc(a['id'])}', title:`{esc(a['title'])}`, excerpt:`{esc(a['excerpt'])}`, content:`{esc(a['content'])}`, category:'{esc(a['category'])}', author:`{esc(a['author'])}`, date:'{esc(a['date'])}', readTime:{a['readTime']}, series:`{esc(a['series'])}`, featured:{str(a['featured']).lower()}, trending:{str(a['trending']).lower()} }},\n")
ts.append('''];\n
export const categories=[
  {id:'economie',    name:'Économie',      description:'Marchés, finance, macroéconomie mondiale'},
  {id:'geopolitique',name:'Géopolitique',  description:'Relations internationales, tensions régionales'},
  {id:'defense',     name:'Défense',       description:'Industrie militaire, conflits, armements'},
  {id:'osint',       name:'OSINT',         description:'Renseignement open-source, cybersécurité, IA'},
];
export function getArticleById(id:string){return articles.find(a=>a.id===id);}
export function getFeaturedArticle(){return articles.find(a=>a.featured)??articles[0];}
export function getTrendingArticles(limit=4){return articles.filter(a=>a.trending).slice(0,limit);}
export function getArticlesByCategory(category:string){return articles.filter(a=>a.category===category);}
export function searchArticles(query:string){
  const q=query.toLowerCase();
  return articles.filter(a=>a.title.toLowerCase().includes(q)||a.excerpt.toLowerCase().includes(q)||a.content.toLowerCase().includes(q));
}
''')

output = ''.join(ts)
with open(OUTPUT, 'w') as f:
    f.write(output)
print(f"✓ {len(cleaned)} articles written to {OUTPUT} ({len(output):,} chars)")
