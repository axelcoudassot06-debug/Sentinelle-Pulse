#!/usr/bin/env python3
"""
SENTINELLE PULSE - Scanner RAPIDE
Version optimisée - scan 4 channels Telegram en 30s
"""

import sqlite3
import time
import requests
from datetime import datetime
from collections import defaultdict
from dataclasses import dataclass
from bs4 import BeautifulSoup

@dataclass
class Alert:
    zone: str
    score: int
    text: str
    source: str
    url: str
    confidence: str

class FastScanner:
    # ONLY working channels - prioritize by zone
    CHANNELS = [
        ('sudan', 'RSFSudan'),
        ('sudan', 'AlFasherNow'),
        ('ukraine', 'rybar'),
        ('ukraine', 'wartranslated'),
    ]
    
    KEYWORDS = {
        'sudan': {
            'high': ['الفاشر', 'El Fasher', 'RSF', 'Darfur', 'جنينة', 'حصار', 'مجزرة', 'war crime'],
            'medium': ['Sudan', 'Khartoum', 'military', 'attack', 'killed'],
            'negative': ['cafe', 'coffee', 'restaurant', 'hotel', 'tourism']
        },
        'ukraine': {
            'high': ['Shahed', 'shahed', 'missile', 'drone', 'attack', 'Kharkiv', 'Odesa', 'Kyiv'],
            'medium': ['Ukraine', 'Russian', 'ZSU', 'military', 'strike'],
            'negative': ['game', 'gaming', 'war thunder']
        }
    }
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'Mozilla/5.0'})
        self.burst = defaultdict(list)
    
    def scrape(self, channel: str) -> list:
        posts = []
        try:
            url = f'https://t.me/s/{channel}'
            r = self.session.get(url, timeout=10)
            soup = BeautifulSoup(r.text, 'html.parser')
            
            for msg in soup.find_all('div', class_='tgme_widget_message')[:15]:
                text_elem = msg.find('div', class_='tgme_widget_message_text')
                link = msg.find('a', class_='tgme_widget_message_date')
                
                if text_elem:
                    text = text_elem.get_text(strip=True)
                    href = link.get('href') if link else f't.me/{channel}'
                    
                    if len(text) > 20:
                        posts.append({'text': text, 'url': href, 'source': f'@{channel}'})
        except Exception as e:
            print(f"  ⚠️ {channel}: {e}")
        return posts
    
    def score(self, text: str, zone: str) -> int:
        text_lower = text.lower()
        score = 0
        
        if zone in self.KEYWORDS:
            for kw in self.KEYWORDS[zone]['high']:
                if kw.lower() in text_lower:
                    score += 5
            for kw in self.KEYWORDS[zone]['medium']:
                if kw.lower() in text_lower:
                    score += 2
            for neg in self.KEYWORDS[zone]['negative']:
                if neg in text_lower:
                    score -= 4
        
        return max(0, score)
    
    def run(self):
        print("""
╔══════════════════════════════════════════════════════════════╗
║     🚨 SENTINELLE PULSE - Scanner RAPIDE               ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        db = sqlite3.connect('sentinelle_fast.db')
        db.execute('''
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY,
                timestamp TEXT,
                zone TEXT,
                score INTEGER,
                text TEXT,
                source TEXT,
                url TEXT,
                confidence TEXT
            )
        ''')
        db.commit()
        
        cycle = 0
        while True:
            cycle += 1
            print(f"\n📡 Cycle #{cycle} - {datetime.now().strftime('%H:%M:%S')}")
            
            all_alerts = []
            
            for zone, channel in self.CHANNELS:
                print(f"  🔍 @{channel}...", end=" ")
                posts = self.scrape(channel)
                print(f"{len(posts)} posts")
                
                for post in posts:
                    score = self.score(post['text'], zone)
                    
                    if score >= 4:
                        confidence = 'HIGH' if score >= 8 else 'MEDIUM'
                        alert = {
                            'zone': zone,
                            'score': score,
                            'text': post['text'][:200],
                            'source': post['source'],
                            'url': post['url'],
                            'confidence': confidence,
                            'timestamp': datetime.now().isoformat()
                        }
                        all_alerts.append(alert)
                        
                        db.execute('''
                            INSERT INTO alerts VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)
                        ''', (alert['timestamp'], alert['zone'], alert['score'], 
                              alert['text'], alert['source'], alert['url'], alert['confidence']))
            
            db.commit()
            
            print(f"\n  ✅ Trouvé: {len(all_alerts)} alertes")
            
            for a in all_alerts[:5]:
                emoji = '🚨' if a['confidence'] == 'HIGH' else '⚠️'
                print(f"\n  {emoji} [{a['confidence']}] {a['zone'].upper()}")
                print(f"     {a['text'][:80]}...")
            
            if len(all_alerts) > 5:
                print(f"\n     ... et {len(all_alerts) - 5} autres")
            
            print(f"\n  ⏰ Prochain scan: 60s")
            time.sleep(60)

if __name__ == "__main__":
    FastScanner().run()
