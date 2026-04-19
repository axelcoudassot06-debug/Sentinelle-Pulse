import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 900; // 15 min ISR

interface TickerItem { tag: string; text: string; }

const FEEDS = [
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml',       tag: 'GÉO',   max: 2 },
  { url: 'https://rss.lefigaro.fr/lefigaro/international',     tag: 'GÉO',   max: 1 },
  { url: 'https://www.opex360.com/feed/',                      tag: 'DEF',   max: 2 },
  { url: 'https://feeds.bbci.co.uk/news/business/rss.xml',     tag: 'ÉCO',   max: 2 },
  { url: 'https://feeds.feedburner.com/TheHackersNews',        tag: 'CYBER', max: 2 },
];

// Handles both CDATA-wrapped titles and plain-text titles
const TITLE_RE = /<item[\s\S]*?<title>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/title>/g;

function parseItems(xml: string, tag: string, max: number): TickerItem[] {
  const items: TickerItem[] = [];
  TITLE_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TITLE_RE.exec(xml)) !== null && items.length < max) {
    const raw = (m[1] ?? m[2] ?? '').trim();
    if (raw.length > 10) {
      items.push({
        tag,
        text: raw
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&#039;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/\s+/g, ' '),
      });
    }
  }
  return items;
}

export async function GET() {
  const bucket: TickerItem[] = [];

  await Promise.allSettled(
    FEEDS.map(async ({ url, tag, max }) => {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Sentinelle-Pulse/2.0 (+https://sentinelle-pulse.vercel.app)' },
          signal: AbortSignal.timeout(4000),
        });
        if (!res.ok) return;
        const xml = await res.text();
        bucket.push(...parseItems(xml, tag, max));
      } catch {
        // feed unreachable or timeout — skip silently, fallback used client-side
      }
    })
  );

  // Shuffle to mix categories, cap at 10 items
  const items = bucket.sort(() => Math.random() - 0.5).slice(0, 10);

  return NextResponse.json(
    { items, ts: Date.now() },
    {
      headers: {
        'Cache-Control': 's-maxage=900, stale-while-revalidate=1800',
      },
    }
  );
}
