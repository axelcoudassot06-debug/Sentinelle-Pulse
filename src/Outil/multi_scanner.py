#!/usr/bin/env python3
"""
SENTINELLE PULSE - Scanner Multi-Plateforme
Telegram + Twitter/X via Nitter + Instagram (simulé)
"""

import sqlite3
import time
import requests
import re
from datetime import datetime
from collections import defaultdict
from bs4 import BeautifulSoup

class MultiScanner:
    CHANNELS = {
        "sudan": [
            "RSFSudan", "AlFasherNow", "ElFasherLive", "SudanLive", "SudanWarMap",
            "SudanWarMonitor", "SudanBreaking", "SudanTribune", "DarfurWitness"
        ],
        "gaza": [
            "GazaLive", "GazaBreaking", "RafahNow", "GazaEyewitness", "KhanYounisLive",
            "qassam12", "AlQassamBrigades", "ShehabAgency", "PalToday", "QudsN"
        ],
        "ukraine": [
            "rybar", "wartranslated", "DeepStateUA", "mil_in_ua", "ZSU_updates",
            "GeneralStaffUA", "mod_russia", "AndrewPerpetua"
        ],
        "sahel": [
            "FAMaOfficial", "MaliActuLive", "JNIMMedia", "ISGSahel",
            "BurkinaFasoLive", "NigerLiveNews"
        ],
        "drc": ["M23RDC", "ADFUpdates", "GomaLive", "NordKivuLive"],
        "myanmar": ["myanmararmy", "NUG_DPR", "PDFMyanmar", "ArakanArmy"],
        "yemen": ["AnsarAllahMedia", "AlMasirahTV", "SabaNews"],
        "haiti": ["G9Family", "HaitiPolice", "PortauPrinceUpdates"],
        "ethiopia": ["ENDFUpdates", "TigrayWar", "AmharaRegion"],
        "mexico": ["CDN_Carteles", "LosZetas", "SinaloaCartel"],
        "israel": ["IDFSpokesperson", "ArabicIDF", "IsraelMFA"],
        "iraq": ["HashdAlShabi", "ISIS_Iraq", "KurdistanGov"],
        "libya": ["GNA_Libya", "LNA_Media"],
        "syria": ["SANA_News", "syriagov", "ISIS_Syria"]
    }
    
    TWITTER_ACCOUNTS = {
        "sudan": ["sudaneyewitness", "DarfurObserve", "RSFMonitor", "ElFasherLive", "SudanWarMonitor"],
        "gaza": ["GazaLiveNews", "RafahUpdates", "PalestineMM", "QudsNen", "SuppressedNws"],
        "ukraine": ["WarMonitor3", "oryxspioenkop", "NOELreports", "DeepStateUA", "Liveuamap", "AndrewPerpetua"],
        "sahel": ["SahelConflict", "MaliWatch", "BurkinaWatch", "JNIM_Monitor"],
        "drc": ["DRCConflict", "KivuConflict", "M23Watch", "GomaUpdates"],
        "global": ["ConflictNews", "WarConflictNews", "GlobalConflictAlert", "ACLED"]
    }
    
    NITTER_INSTANCES = [
        "nitter.privacydev.net",
        "nitter.poast.org",
        "nitter.united-states.xyzdns.xyz",
        "nitter.kavin.rocks",
        "nitter.1d4.us",
        "nitter.esmailelbob.xyz"
    ]
    
    KEYWORDS = {
        "critical": [
            "massacre", "war crime", "genocide", "ethnic cleansing",
            "civilians killed", "children killed", "hospital bombing",
            "المجزرة", "حصار", "war crimes", "eyewitness",
            "مستشفى", "hospital strike", "massacre confirmed"
        ],
        "high": [
            "attack", "strike", "bombing", "shelling", "killed",
            "wounded", "dead", "conflict", "war", "military",
            "invasion", "assault", "besieged"
        ],
        "medium": [
            "tension", "crisis", "clashes", "fighting",
            "displaced", "refugees", "humanitarian"
        ],
        "negative": [
            "cafe", "restaurant", "hotel", "tourism", "vacation",
            "gaming", "game", "beach", "price", "sale", "shopping"
        ]
    }
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'Mozilla/5.0'})
        self.db = self.init_db()
        self.cycle_count = 0
    
    def init_db(self):
        db = sqlite3.connect('sentinelle_multi.db')
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
        db.execute('''
            CREATE TABLE IF NOT EXISTS stats (
                id INTEGER PRIMARY KEY,
                timestamp TEXT,
                platform TEXT,
                items_found INTEGER,
                alerts INTEGER
            )
        ''')
        db.commit()
        return db
    
    def scrape_telegram(self, channel: str) -> list:
        posts = []
        try:
            url = f'https://t.me/s/{channel}'
            r = self.session.get(url, timeout=10)
            
            if r.status_code == 200:
                soup = BeautifulSoup(r.text, 'html.parser')
                for msg in soup.find_all('div', class_='tgme_widget_message')[:15]:
                    text_elem = msg.find('div', class_='tgme_widget_message_text')
                    link_elem = msg.find('a', class_='tgme_widget_message_date')
                    
                    if text_elem:
                        text = text_elem.get_text(strip=True)
                        url = link_elem.get('href') if link_elem else f't.me/{channel}'
                        
                        if len(text) > 20:
                            posts.append({
                                'text': text,
                                'url': url,
                                'source': f'@{channel}',
                                'platform': 'telegram'
                            })
        except:
            pass
        return posts
    
    def scrape_nitter(self, username: str) -> list:
        tweets = []
        
        for instance in self.NITTER_INSTANCES:
            try:
                url = f'https://{instance}/{username}/rss'
                r = self.session.get(url, timeout=8)
                
                if r.status_code == 200:
                    titles = re.findall(r'<title><!\[CDATA\[(.*?)\]\]></title>', r.text)
                    links = re.findall(r'<link>(https?://[^<]+)</link>', r.text)
                    dates = re.findall(r'<pubDate>(.*?)</pubDate>', r.text)
                    
                    for i, title in enumerate(titles[1:11]):
                        if title and len(title) > 10:
                            tweets.append({
                                'text': title,
                                'url': links[i+1] if i+1 < len(links) else f'https://twitter.com/{username}',
                                'source': f'@{username}',
                                'platform': 'twitter'
                            })
                    if tweets:
                        break
            except:
                continue
        
        return tweets
    
    def score(self, text: str) -> tuple:
        text_lower = text.lower()
        score = 0
        triggers = []
        
        for kw in self.KEYWORDS["critical"]:
            if kw.lower() in text_lower:
                score += 10
                triggers.append(kw)
        
        for kw in self.KEYWORDS["high"]:
            if kw.lower() in text_lower:
                score += 4
                triggers.append(kw)
        
        for kw in self.KEYWORDS["medium"]:
            if kw.lower() in text_lower:
                score += 2
                triggers.append(kw)
        
        for neg in self.KEYWORDS["negative"]:
            if neg.lower() in text_lower:
                score -= 5
        
        return max(0, score), list(set(triggers))
    
    def detect_zone(self, text: str) -> str:
        text_lower = text.lower()
        zones = {
            "sudan": ["sudan", "sudanese", "darfur", "fasher", "khartoum", "rsf", "الفاشر", "دارفور"],
            "gaza": ["gaza", "palestine", "rafah", "israel", "غلزة", "رفح"],
            "ukraine": ["ukraine", "russian", "kyiv", "kharkiv", "zsu", "putin"],
            "sahel": ["mali", "niger", "burkina", "sahel", "jnim"],
            "drc": ["congo", "drc", "goma", "kivu", "m23", "beni"],
            "myanmar": ["myanmar", "burma", "rohingya", "arakan"],
            "yemen": ["yemen", "houthis", "sanaa", "aden"],
            "haiti": ["haiti", "port-au-prince", "gang"],
            "ethiopia": ["ethiopia", "tigray", "amhara"],
            "mexico": ["mexico", "cartel", "narco"]
        }
        
        scores = {}
        for zone, keywords in zones.items():
            for kw in keywords:
                if kw in text_lower:
                    scores[zone] = scores.get(zone, 0) + 1
        
        return max(scores, key=scores.get) if scores else "global"
    
    def run(self):
        print("""
╔══════════════════════════════════════════════════════════════╗
║  🚨 SENTINELLE PULSE - MULTI-PLATFORM SCANNER        ║
║  Telegram + Twitter/X + RSS                           ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        while True:
            self.cycle_count += 1
            print(f"\n📡 CYCLE #{self.cycle_count} - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
            all_posts = []
            tg_count = 0
            tw_count = 0
            
            # ===== TELEGRAM =====
            print("\n📱 Scanning Telegram...")
            for zone, channels in self.CHANNELS.items():
                for channel in channels:
                    print(f"  🔍 @{channel}", end=" ")
                    posts = self.scrape_telegram(channel)
                    tg_count += len(posts)
                    
                    for post in posts:
                        post['zone'] = zone
                        all_posts.append(post)
                    
                    print(f"({len(posts)})" if posts else "")
                    time.sleep(0.3)
            
            # ===== TWITTER/X =====
            print("\n🐦 Scanning Twitter/X via Nitter...")
            for zone, accounts in self.TWITTER_ACCOUNTS.items():
                for account in accounts:
                    print(f"  🔍 @{account}", end=" ")
                    tweets = self.scrape_nitter(account)
                    tw_count += len(tweets)
                    
                    for tweet in tweets:
                        tweet['zone'] = zone
                        all_posts.append(tweet)
                    
                    print(f"({len(tweets)})" if tweets else "")
                    time.sleep(0.5)
            
            # ===== ANALYSE =====
            print(f"\n🔍 Analyse de {len(all_posts)} posts...")
            alerts = []
            
            for post in all_posts:
                score, triggers = self.score(post['text'])
                
                if score >= 4:
                    zone = self.detect_zone(post['text'])
                    confidence = "CRITICAL" if score >= 15 else "HIGH" if score >= 8 else "MEDIUM"
                    
                    alert = {
                        'timestamp': datetime.now().isoformat(),
                        'zone': zone,
                        'score': score,
                        'text': post['text'][:300],
                        'source': post['source'],
                        'url': post['url'],
                        'confidence': confidence,
                        'platform': post['platform']
                    }
                    
                    alerts.append(alert)
                    self.db.execute('''
                        INSERT INTO alerts VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (alert['timestamp'], alert['zone'], alert['score'], 
                          alert['text'], alert['source'], alert['url'],
                          alert['confidence'], alert['platform']))
            
            self.db.commit()
            
            # Stats
            self.db.execute('''
                INSERT INTO stats VALUES (NULL, ?, ?, ?, ?)
            ''', (datetime.now().isoformat(), 'telegram', tg_count, len([a for a in alerts if a['platform']=='telegram'])))
            self.db.execute('''
                INSERT INTO stats VALUES (NULL, ?, ?, ?, ?)
            ''', (datetime.now().isoformat(), 'twitter', tw_count, len([a for a in alerts if a['platform']=='twitter'])))
            self.db.commit()
            
            # Affichage
            print(f"\n{'='*60}")
            print(f"📊 RÉSULTATS")
            print(f"   Telegram: {tg_count} posts | {len([a for a in alerts if a['platform']=='telegram'])} alertes")
            print(f"   Twitter: {tw_count} tweets | {len([a for a in alerts if a['platform']=='twitter'])} alertes")
            print(f"   TOTAL alertes: {len(alerts)}")
            
            # Alertes critiques
            critical = [a for a in alerts if a['confidence'] in ['CRITICAL', 'HIGH']]
            if critical:
                print(f"\n🚨 ALERTES CRITIQUES/HIGH:")
                for alert in critical[:5]:
                    emoji = "🚨" if alert['confidence'] == "CRITICAL" else "🔴"
                    icon = "📱" if alert['platform'] == 'telegram' else "🐦"
                    print(f"\n   {emoji} {icon} [{alert['confidence']}] {alert['zone'].upper()}")
                    print(f"      {alert['source']}: {alert['text'][:80]}...")
            
            print(f"\n⏰ Prochain scan: 90s")
            time.sleep(90)

if __name__ == "__main__":
    MultiScanner().run()
