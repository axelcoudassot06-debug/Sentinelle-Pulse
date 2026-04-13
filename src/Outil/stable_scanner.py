#!/usr/bin/env python3
"""
SENTINELLE PULSE - Scanner STABLE
Telegram (fiable) + RSS (fiable)
"""

import sqlite3
import time
import requests
import re
from datetime import datetime
from bs4 import BeautifulSoup

class StableScanner:
    CHANNELS = {
        "sudan": ["RSFSudan", "AlFasherNow", "SudanLive", "SudanWarMap", "SudanBreaking", "DarfurWitness"],
        "gaza": ["GazaLive", "GazaBreaking", "RafahNow", "qassam12", "AlQassamBrigades", "ShehabAgency"],
        "ukraine": ["rybar", "wartranslated", "DeepStateUA", "mil_in_ua", "ZSU_updates"],
        "sahel": ["FAMaOfficial", "MaliActuLive", "JNIMMedia", "BurkinaFasoLive"],
        "drc": ["M23RDC", "ADFUpdates", "GomaLive"],
        "myanmar": ["myanmararmy", "NUG_DPR", "ArakanArmy"],
        "yemen": ["AnsarAllahMedia", "AlMasirahTV"],
        "haiti": ["G9Family", "HaitiPolice"],
        "ethiopia": ["ENDFUpdates", "TigrayWar"],
        "mexico": ["CDN_Carteles", "SinaloaCartel"]
    }
    
    RSS_FEEDS = [
        ("Reuters Africa", "https://feeds.reuters.com/reuters/africanNews"),
        ("BBC Africa", "https://feeds.bbci.co.uk/news/world/africa/rss.xml"),
        ("Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml"),
        ("BBC Middle East", "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml"),
    ]
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'Mozilla/5.0'})
        self.db = self.init_db()
    
    def init_db(self):
        db = sqlite3.connect('sentinelle_stable.db')
        db.execute('''
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY,
                timestamp TEXT,
                zone TEXT,
                score INTEGER,
                text TEXT,
                source TEXT,
                url TEXT,
                confidence TEXT,
                platform TEXT
            )
        ''')
        db.commit()
        return db
    
    def scrape_telegram(self, channel: str) -> list:
        posts = []
        try:
            url = f'https://t.me/s/{channel}'
            r = self.session.get(url, timeout=15)
            
            if r.status_code == 200:
                soup = BeautifulSoup(r.text, 'html.parser')
                for msg in soup.find_all('div', class_='tgme_widget_message')[:20]:
                    text_elem = msg.find('div', class_='tgme_widget_message_text')
                    link_elem = msg.find('a', class_='tgme_widget_message_date')
                    
                    if text_elem:
                        text = text_elem.get_text(strip=True)
                        url = link_elem.get('href') if link_elem else f't.me/{channel}'
                        
                        if len(text) > 30:
                            posts.append({
                                'text': text,
                                'url': url,
                                'source': f'@{channel}',
                                'platform': 'telegram'
                            })
        except Exception as e:
            pass
        return posts
    
    def fetch_rss(self, name: str, url: str) -> list:
        articles = []
        try:
            r = self.session.get(url, timeout=15)
            if r.status_code == 200:
                items = re.findall(r'<item>(.*?)</item>', r.text, re.DOTALL)[:10]
                for item in items:
                    title = re.search(r'<title>(.*?)</title>', item)
                    link = re.search(r'<link>(.*?)</link>', item)
                    if title:
                        articles.append({
                            'text': title.group(1),
                            'url': link.group(1) if link else url,
                            'source': name,
                            'platform': 'rss'
                        })
        except:
            pass
        return articles
    
    def score(self, text: str) -> int:
        text_lower = text.lower()
        score = 0
        
        critical = ["massacre", "war crime", "killed", "attack", "strike", "bombing", "المجزرة", "حصار", "eyewitness"]
        high = ["conflict", "war", "military", "invasion", "besieged", "dead", "wounded"]
        medium = ["tension", "crisis", "clashes"]
        negative = ["cafe", "restaurant", "hotel", "tourism", "gaming", "vacation"]
        
        for kw in critical:
            if kw in text_lower: score += 8
        for kw in high:
            if kw in text_lower: score += 4
        for kw in medium:
            if kw in text_lower: score += 2
        for kw in negative:
            if kw in text_lower: score -= 4
        
        return max(0, score)
    
    def detect_zone(self, text: str) -> str:
        text_lower = text.lower()
        zones = {
            "sudan": ["sudan", "darfur", "rsf", "fasher", "khartoum"],
            "gaza": ["gaza", "palestine", "rafah", "israel"],
            "ukraine": ["ukraine", "russian", "kyiv", "kharkiv", "zsu"],
            "sahel": ["mali", "niger", "burkina", "jnim"],
            "drc": ["congo", "drc", "goma", "m23"],
            "haiti": ["haiti", "gang"],
            "ethiopia": ["ethiopia", "tigray"]
        }
        
        for zone, kws in zones.items():
            for kw in kws:
                if kw in text_lower:
                    return zone
        return "global"
    
    def run(self):
        print("""
╔══════════════════════════════════════════════════════════════╗
║  🚨 SENTINELLE PULSE - STABLE SCANNER              ║
║  Telegram + RSS - Couverture mondiale                 ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        cycle = 0
        while True:
            cycle += 1
            print(f"\n📡 Cycle #{cycle} - {datetime.now().strftime('%H:%M:%S')}")
            
            all_items = []
            tg_count = 0
            rss_count = 0
            
            # TELEGRAM
            print("\n📱 Telegram...")
            for zone, channels in self.CHANNELS.items():
                for channel in channels:
                    posts = self.scrape_telegram(channel)
                    tg_count += len(posts)
                    for p in posts:
                        p['zone'] = zone
                        all_items.append(p)
                    print(f"  @{channel}: {len(posts)} posts")
                    time.sleep(0.5)
            
            # RSS
            print("\n📰 RSS...")
            for name, url in self.RSS_FEEDS:
                articles = self.fetch_rss(name, url)
                rss_count += len(articles)
                for a in articles:
                    a['zone'] = self.detect_zone(a['text'])
                    all_items.append(a)
                print(f"  {name}: {len(articles)} articles")
            
            # Analyse
            print(f"\n🔍 Analyse: {len(all_items)} items")
            alerts = []
            
            for item in all_items:
                score = self.score(item['text'])
                if score >= 4:
                    zone = item.get('zone', 'global')
                    conf = "CRITICAL" if score >= 12 else "HIGH" if score >= 8 else "MEDIUM"
                    
                    alert = (
                        datetime.now().isoformat(), zone, score, item['text'][:300],
                        item['source'], item['url'], conf, item['platform']
                    )
                    
                    alerts.append(alert)
                    self.db.execute('''
                        INSERT INTO alerts VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', alert)
            
            self.db.commit()
            
            print(f"\n✅ Résultats:")
            print(f"   Telegram: {tg_count} posts")
            print(f"   RSS: {rss_count} articles")
            print(f"   Alertes: {len(alerts)}")
            
            # Affichage alertes HIGH
            for alert in [a for a in alerts if a[6] in ['CRITICAL', 'HIGH']][:5]:
                emoji = "🚨" if alert[6] == "CRITICAL" else "🔴"
                icon = "📱" if alert[7] == "telegram" else "📰"
                print(f"\n   {emoji} {icon} [{alert[6]}] {alert[1].upper()}")
                print(f"      {alert[4]}: {alert[3][:80]}...")
            
            print(f"\n⏰ Prochain: 60s")
            time.sleep(60)

if __name__ == "__main__":
    StableScanner().run()
