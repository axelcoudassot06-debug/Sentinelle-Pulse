#!/usr/bin/env python3
"""
SENTINELLE PULSE - Web Scanner (GRATUIT)
Scan Twitter/X via Nitter + Telegram via web scraping
"""

import json
import sqlite3
import time
import requests
import re
from datetime import datetime
from collections import defaultdict
from dataclasses import dataclass
from typing import List, Dict
from bs4 import BeautifulSoup

@dataclass
class Alert:
    timestamp: str
    zone: str
    score: int
    text: str
    source: str
    url: str
    confidence: str
    triggers: List[str]

class Config:
    DB_PATH = 'sentinelle_web.db'
    SCAN_INTERVAL = 120
    BURST_THRESHOLD = 3.0

class Keywords:
    ZONE_KEYWORDS = {
        "sudan": {
            "keywords": ["sudan", "sudanese", "darfur", "el fasher", "elfasher", "khartoum", "rsf", "saf", "الفاشر", "دارفور", "hemedti"],
            "negative": ["cafe", "coffee", "restaurant", "safari", "tourism", "travel"],
            "boost": ["massacre", "war crime", "siege", "massacre", "attack", "killed", "dead", "displaced", "eyewitness", "breaking"]
        },
        "gaza": {
            "keywords": ["gaza", "palestine", "palestinian", "israel", "rafah", "khan yunis", "غلزة", "رفح", "خان يونس", "hamas", "idf"],
            "negative": ["beach", "restaurant", "cafe", "hotel", "vacation", "tourism", "real estate"],
            "boost": ["bombing", "strike", "massacre", "hospital", "children", "dead", "killed", "displaced", "breaking", "ceasefire"]
        },
        "ukraine": {
            "keywords": ["ukraine", "russian", "kyiv", "kharkiv", "odesa", "zsu", "vsu", "putin", "zelensky", "шахед", "shahed"],
            "negative": ["game", "gaming", "war thunder", "warzone", "fantasy", "fiction"],
            "boost": ["missile", "drone", "attack", "killed", "civilian", "infrastructure", "breaking"]
        },
        "sahel": {
            "keywords": ["mali", "niger", "burkina", "sahel", "jnim", "isgs", "fama", "fama"],
            "negative": ["prize", "award", "festival", "music"],
            "boost": ["attack", "jihadist", "massacre", "village", "killed", "displaced"]
        }
    }
    
    def detect_zone(self, text: str) -> str:
        text_lower = text.lower()
        scores = {}
        
        for zone, data in self.ZONE_KEYWORDS.items():
            score = 0
            for kw in data["keywords"]:
                if kw in text_lower:
                    score += 1
            for neg in data["negative"]:
                if neg in text_lower:
                    score -= 2
            if score > 0:
                scores[zone] = score
        
        if scores:
            return max(scores, key=scores.get)
        return "global"
    
    def score(self, text: str) -> tuple:
        text_lower = text.lower()
        score = 0
        triggers = []
        zone = self.detect_zone(text)
        
        if zone in self.ZONE_KEYWORDS:
            data = self.ZONE_KEYWORDS[zone]
            
            for kw in data["keywords"]:
                if kw in text_lower:
                    score += 2
                    triggers.append(kw)
            
            for neg in data["negative"]:
                if neg in text_lower:
                    score -= 4
                    triggers.append(f"NEG:{neg}")
            
            for boost in data["boost"]:
                if boost in text_lower:
                    score += 3
                    triggers.append(boost)
        
        return max(0, score), list(set(triggers)), zone

class NitterScanner:
    """Scan Twitter via Nitter instances (RSS-like)"""
    
    NITTER_INSTANCES = [
        "nitter.privacydev.net",
        "nitter.poast.org",
        "nitter.lacontreinfo.fr",
        "nitter.united-states.xyzdns.xyz",
    ]
    
    ACCOUNTS = {
        "sudan": [
            "sudaneyewitness", "DarfurObserve", "RSFMonitor", "ElFasherLive",
            "SudanWarMonitor", "KordofanWatch"
        ],
        "gaza": [
            "GazaLiveNews", "RafahUpdates", "PalestineMM", "QudsNen",
            "EyeOnPalestine", "SuppressedNws"
        ],
        "ukraine": [
            "WarMonitor3", "oryxspioenkop", "NOELreports",
            "TheStudyofWar", "DeepStateUA", "Liveuamap"
        ]
    }
    
    def __init__(self, keywords):
        self.keywords = keywords
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'Mozilla/5.0'})
    
    def get_rss_url(self, instance: str, username: str) -> str:
        return f"https://{instance}/{username}/rss"
    
    def scan_account(self, username: str, zone: str) -> List[Dict]:
        tweets = []
        
        for instance in self.NITTER_INSTANCES:
            try:
                url = self.get_rss_url(instance, username)
                resp = self.session.get(url, timeout=10)
                
                if resp.status_code == 200:
                    tweets = self.parse_rss(resp.text, username)
                    if tweets:
                        return tweets
            except:
                continue
        
        return tweets
    
    def parse_rss(self, xml: str, username: str) -> List[Dict]:
        tweets = []
        
        titles = re.findall(r'<title><!\[CDATA\[(.*?)\]\]></title>', xml)
        links = re.findall(r'<link>(https?://[^<]+)</link>', xml)
        dates = re.findall(r'<pubDate>(.*?)</pubDate>', xml)
        
        for i, title in enumerate(titles[1:], 0):
            if title and not title.startswith(username):
                tweets.append({
                    'text': title,
                    'url': links[i+1] if i+1 < len(links) else f"https://twitter.com/{username}",
                    'date': dates[i] if i < len(dates) else "",
                    'source': f"@{username}",
                    'zone': zone
                })
        
        return tweets
    
    def scan_all(self) -> List[Dict]:
        all_tweets = []
        
        for zone, accounts in self.ACCOUNTS.items():
            for account in accounts:
                tweets = self.scan_account(account, zone)
                all_tweets.extend(tweets)
                time.sleep(1)
        
        return all_tweets

class TelegramScraper:
    """Scrape Telegram via web.telegram.org (pas d'API requise)"""
    
    CHANNELS = {
        "sudan": ["RSFSudan", "AlFasherNow", "DarfurWitness", "SudanLive", "SudanWarMap"],
        "gaza": ["GazaLive", "RafahNow", "GazaEyewitness", "ShehabAgency"],
        "ukraine": ["rybar", "mil_in_ua", "DeepStateUA", "wartranslated"]
    }
    
    def __init__(self, keywords):
        self.keywords = keywords
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def scrape_channel(self, channel: str, zone: str) -> List[Dict]:
        messages = []
        
        try:
            url = f"https://t.me/s/{channel}"
            resp = self.session.get(url, timeout=15)
            
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, 'html.parser')
                
                posts = soup.find_all('div', class_='tgme_widget_message')
                
                for post in posts[:20]:
                    try:
                        text_elem = post.find('div', class_='tgme_widget_message_text')
                        if text_elem:
                            text = text_elem.get_text(strip=True)
                            
                            date_elem = post.find('time')
                            date = date_elem.get('datetime') if date_elem else ""
                            
                            link = post.find('a', class_='tgme_widget_message_date')
                            message_url = link.get('href') if link else f"https://t.me/{channel}"
                            
                            if text and len(text) > 20:
                                messages.append({
                                    'text': text,
                                    'url': message_url,
                                    'date': date,
                                    'source': f"@{channel}",
                                    'zone': zone
                                })
                    except:
                        continue
                        
        except Exception as e:
            print(f"  ⚠️ {channel}: {e}")
        
        return messages
    
    def scan_all(self) -> List[Dict]:
        all_messages = []
        
        for zone, channels in self.CHANNELS.items():
            for channel in channels:
                print(f"  🔍 @{channel}")
                messages = self.scrape_channel(channel, zone)
                all_messages.extend(messages)
                time.sleep(2)
        
        return all_messages

class WebScanner:
    def __init__(self):
        self.keywords = Keywords()
        self.telegram = TelegramScraper(self.keywords)
        self.nitter = NitterScanner(self.keywords)
        self.db = Database()
        self.burst = defaultdict(list)
    
    def process_item(self, item: Dict) -> Alert:
        score, triggers, zone = self.keywords.score(item['text'])
        
        if score < 3:
            return None
        
        self.burst[zone].append(time.time())
        recent = [t for t in self.burst[zone] if time.time() - t < 600]
        burst_ratio = len(recent) / max(len(self.burst[zone]) / 10, 1)
        
        total_score = score + (10 if burst_ratio > Config.BURST_THRESHOLD else 0)
        
        if total_score < 5:
            return None
        
        confidence = "HIGH" if total_score >= 15 else "MEDIUM" if total_score >= 10 else "LOW"
        
        return Alert(
            timestamp=item['date'] or datetime.now().isoformat(),
            zone=zone,
            score=total_score,
            text=item['text'][:500],
            source=item['source'],
            url=item['url'],
            confidence=confidence,
            triggers=triggers[:5]
        )
    
    def scan(self) -> List[Alert]:
        all_alerts = []
        
        print("\n📱 Scan Telegram...")
        tg_items = self.telegram.scan_all()
        print(f"   → {len(tg_items)} messages collectés")
        
        print("\n🐦 Scan Twitter via Nitter...")
        tw_items = self.nitter.scan_all()
        print(f"   → {len(tw_items)} tweets collectés")
        
        all_items = tg_items + tw_items
        
        print(f"\n🔍 Analyse de {len(all_items)} items...")
        
        for item in all_items:
            alert = self.process_item(item)
            if alert:
                all_alerts.append(alert)
                self.db.save_alert(alert)
        
        return all_alerts
    
    def run(self):
        print("""
╔══════════════════════════════════════════════════════════════╗
║     🚨 SENTINELLE PULSE - Web Scanner (GRATUIT)        ║
║     Twitter via Nitter + Telegram via web scraping       ║
╠══════════════════════════════════════════════════════════════╣
║  Zones: Sudan 🇸🇩 | Gaza 🇵🇸 | Ukraine 🇺🇦 | Sahel 🌍  ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        cycle = 0
        while True:
            cycle += 1
            print(f"\n{'='*60}")
            print(f"📡 Cycle #{cycle} - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
            alerts = self.scan()
            
            print(f"\n{'='*60}")
            print(f"📊 RÉSULTATS: {len(alerts)} alertes")
            
            for alert in alerts[:10]:
                emoji = "🚨" if alert.confidence == "HIGH" else "⚠️"
                print(f"\n{emoji} [{alert.confidence}] {alert.zone.upper()}")
                print(f"   📢 {alert.source}")
                print(f"   📄 {alert.text[:150]}...")
            
            if len(alerts) > 10:
                print(f"\n   ... et {len(alerts) - 10} autres")
            
            print(f"\n⏰ Prochain scan dans {Config.SCAN_INTERVAL}s...")
            time.sleep(Config.SCAN_INTERVAL)

class Database:
    def __init__(self):
        self.conn = sqlite3.connect(Config.DB_PATH, check_same_thread=False)
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY,
                timestamp TEXT,
                zone TEXT,
                score INTEGER,
                text TEXT,
                source TEXT,
                url TEXT,
                confidence TEXT,
                triggers TEXT
            )
        ''')
        self.conn.commit()
    
    def save_alert(self, alert: Alert):
        self.conn.execute('''
            INSERT INTO alerts VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (alert.timestamp, alert.zone, alert.score, alert.text,
              alert.source, alert.url, alert.confidence, ','.join(alert.triggers)))
        self.conn.commit()

def main():
    scanner = WebScanner()
    try:
        scanner.run()
    except KeyboardInterrupt:
        print("\n⏹️ Arrêté")
    except Exception as e:
        print(f"\n❌ Erreur: {e}")

if __name__ == "__main__":
    main()
