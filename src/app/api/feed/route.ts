import { NextResponse } from 'next/server';
import { existsSync } from 'fs';
import { join } from 'path';
import sourcesData from '@/Outil/sources.json';
import { ZoneId } from '@/Outil/types';

const RSS_FEEDS = sourcesData.rss;

async function fetchRSSFeed(feedUrl: string, feedName: string): Promise<any[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'SentinellePulse/1.0 RSS Reader',
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    return parseRSS(xml, feedName, feedUrl);
  } catch (error) {
    return [];
  }
}

function parseRSS(xml: string, sourceName: string, sourceUrl: string): any[] {
  const items: any[] = [];
  
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    const getTag = (tag: string): string => {
      const tagRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
      const tagMatch = itemXml.match(tagRegex);
      return tagMatch ? tagMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    };

    const title = getTag('title');
    const description = getTag('description');
    const link = getTag('link');
    const pubDate = getTag('pubDate');

    if (title) {
      items.push({
        id: Buffer.from(`${sourceName}-${title}-${Date.now()}`).toString('base64').slice(0, 20),
        text: `${title} ${description}`.slice(0, 500),
        source: sourceName,
        url: link || sourceUrl,
        timestamp: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        sourceType: 'press' as const,
      });
    }
  }

  return items;
}

function getDBAlerts(): any[] {
  try {
    const dbPaths = [
      join(process.cwd(), 'src', 'Outil', 'sentinelle_multi.db'),
      join(process.cwd(), 'src', 'Outil', 'sentinelle_ultimate.db'),
      join(process.cwd(), 'src', 'Outil', 'sentinelle_fast.db'),
    ];
    
    let dbPath = null;
    for (const path of dbPaths) {
      if (existsSync(path)) {
        dbPath = path;
        break;
      }
    }
    
    if (!dbPath) {
      return [];
    }
    
    const sqlite3 = require('better-sqlite3');
    const db = sqlite3(dbPath);
    
    const rows = db.prepare('SELECT * FROM alerts ORDER BY id DESC LIMIT 100').all();
    
    db.close();
    
    return rows.map((row: any) => ({
      id: `db_${row.id}`,
      text: row.text,
      source: row.source,
      url: row.url,
      timestamp: row.timestamp,
      sourceType: row.platform === 'twitter' ? 'social' : 'social',
      zone: row.zone,
      score: row.score,
      confidence: row.confidence,
      platform: row.platform || 'telegram',
      isFromDB: true
    }));
  } catch (error) {
    console.error('Error reading DB:', error);
    return [];
  }
}

export async function GET() {
  const dbAlerts = getDBAlerts();
  
  if (dbAlerts.length > 0) {
    return NextResponse.json({
      success: true,
      source: 'database',
      count: dbAlerts.length,
      timestamp: new Date().toISOString(),
      items: dbAlerts
    });
  }
  
  const allItems: any[] = [];

  const fetchPromises = RSS_FEEDS.map(feed => 
    fetchRSSFeed(feed.url, feed.name).then(items => 
      items.map(item => ({ ...item, zone: feed.zone as ZoneId }))
    )
  );

  try {
    const results = await Promise.allSettled(fetchPromises);
    
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
      }
    }

    allItems.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      success: true,
      source: 'rss',
      count: allItems.length,
      timestamp: new Date().toISOString(),
      items: allItems.slice(0, 100)
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch feeds',
      items: []
    }, { status: 500 });
  }
}
