#!/usr/bin/env python3
"""
SENTINELLE PULSE - RSS Scanner (SANS credentials Telegram)
Fonctionne IMMÉDIATEMENT - scan les flux RSS publics
"""

import json
import sqlite3
import time
import requests
import re
from datetime import datetime
from collections import defaultdict, deque
from dataclasses import dataclass
from typing import List, Dict, Tuple

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
    DB_PATH = 'sentinelle_rss.db'
    SCAN_INTERVAL = 60
    BURST_THRESHOLD = 3.0

class Keywords:
    def __init__(self):
        self.zones = {
            "sudan": {
                "strong": ["الفاشر", "El Fasher", "RSF", "Darfur", "جنينة", "حصار"],
                "medium": ["Sudan", "Khartoum", "military", "civilians"],
                "weak": ["conflict", "attack", "killed", "dead"],
                "negative": ["cafe", "restaurant", "hotel", "tourism"],
                "boost": ["massacre", "war crime", "humanitarian", "UN", "eyewitness"]
            },
            "gaza": {
                "strong": ["Gaza", "Rafah", "Khan Yunis", "غزة", "رفح", "خان يونس"],
                "medium": ["Palestine", "Israel", "ceasefire", "humanitarian"],
                "weak": ["strike", "bombing", "casualties", "displaced"],
                "negative": ["beach", "restaurant", "cafe", "hotel"],
                "boost": ["hospital", "children", "UNRWA", "genocide", "war crime"]
            },
            "ukraine": {
                "strong": ["Kharkiv", "Odesa", "Kyiv", "Shahed", "шахед", "missile"],
                "medium": ["Ukraine", "Russian", "drone", "attack", "ZSU"],
                "weak": ["strike", "bombardment", "infrastructure"],
                "negative": ["game", "gaming", "war thunder", "warzone"],
                "boost": ["civilian", "hospital", "war crime", "HIMARS"]
            },
            "sahel": {
                "strong": ["JNIM", "ISGS", "FAMa", "Mopti", "Gao", "jihadist"],
                "medium": ["Mali", "Burkina", "Niger", "Barkhane"],
                "weak": ["attack", "militants", "security"],
                "negative": ["prize", "award", "festival"],
                "boost": ["massacre", "village", "displaced", "peacekeeping"]
            },
            "drc": {
                "strong": ["M23", "Goma", "Kivu", "RDC", "ADF"],
                "medium": ["Congo", "Beni", "Ituri", "Rwanda"],
                "weak": ["fighting", "violence", "displaced"],
                "negative": ["restaurant", "hotel"],
                "boost": ["massacre", "massacre", "humanitarian"]
            }
        }
        
        self.all_keywords = []
        for zone, cats in self.zones.items():
            for cat, kws in cats.items():
                if isinstance(kws, list):
                    self.all_keywords.extend(kws)
    
    def score(self, text: str, zone: str = None) -> Tuple[int, List[str]]:
        text_lower = text.lower()
        score = 0
        triggers = []
        
        if zone and zone in self.zones:
            kw = self.zones[zone]
            for kw_list, weight in [
                (kw.get("strong", []), 8),
                (kw.get("medium", []), 4),
                (kw.get("weak", []), 1),
                (kw.get("boost", []), 3)
            ]:
                for keyword in kw_list:
                    if keyword.lower() in text_lower:
                        score += weight
                        triggers.append(keyword)
            
            for keyword in kw.get("negative", []):
                if keyword.lower() in text_lower:
                    score -= 6
        
        return max(0, score), triggers
    
    def detect_zone(self, text: str) -> str:
        text_lower = text.lower()
        zone_scores = defaultdict(int)
        
        zone_keywords = {
            "sudan": ["sudan", "sudanese", "darfur", "el fasher", "khartoum", "الفاشر"],
            "gaza": ["gaza", "palestine", "palestinian", "israel", "rafah", "غزة"],
            "ukraine": ["ukraine", "russian", "kyiv", "kharkiv", "odesa", "zsu"],
            "sahel": ["mali", "niger", "burkina", "sahel", "jnim", "fama"],
            "drc": ["congo", "drc", "goma", "kivu", "m23", "beni"]
        }
        
        for zone, keywords in zone_keywords.items():
            for kw in keywords:
                if kw in text_lower:
                    zone_scores[zone] += 1
        
        if zone_scores:
            return max(zone_scores, key=zone_scores.get)
        return "global"

class RSSScanner:
    FEEDS = [
        {"name": "Reuters Africa", "url": "https://feeds.reuters.com/reuters/africanNews", "zone": "sudan"},
        {"name": "Reuters World", "url": "https://feeds.reuters.com/reuters/worldNews", "zone": "global"},
        {"name": "BBC Africa", "url": "https://feeds.bbci.co.uk/news/world/africa/rss.xml", "zone": "sudan"},
        {"name": "BBC Middle East", "url": "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml", "zone": "gaza"},
        {"name": "Al Jazeera", "url": "https://www.aljazeera.com/xml/rss/all.xml", "zone": "global"},
        {"name": "France24", "url": "https://www.france24.com/fr/rss", "zone": "global"},
        {"name": "UN News", "url": "https://news.un.org/feed/subscribe/en/news.rss", "zone": "global"},
        {"name": "Le Monde", "url": "https://www.lemonde.fr/international/rss_full.xml", "zone": "global"},
        {"name": "Amnesty", "url": "https://www.amnesty.org/en/feed/", "zone": "global"},
    ]
    
    def __init__(self):
        self.keywords = Keywords()
        self.burst = defaultdict(lambda: deque(maxlen=50))
        self.db = Database()
        self.last_items = []
    
    def parse_rss(self, xml: str) -> List[Dict]:
        items = []
        item_pattern = re.compile(r'<item>(.*?)</item>', re.DOTALL)
        
        for item_match in item_pattern.finditer(xml):
            item_xml = item_match.group(1)
            
            def get_tag(tag):
                patterns = [
                    re.compile(f'<{tag}[^>]*>(.*?)</{tag}>', re.DOTALL),
                    re.compile(f'<{tag}>(.*?)</{tag}>', re.DOTALL)
                ]
                for p in patterns:
                    m = p.search(item_xml)
                    if m:
                        return re.sub(r'<[^>]+>', '', m.group(1)).strip()[:500]
                return ''
            
            title = get_tag('title')
            if title:
                items.append({
                    'title': title,
                    'description': get_tag('description'),
                    'link': get_tag('link'),
                    'pubDate': get_tag('pubDate')
                })
        
        return items
    
    def scan(self) -> List[Alert]:
        all_alerts = []
        
        for feed in self.FEEDS:
            try:
                resp = requests.get(feed['url'], timeout=15, headers={'User-Agent': 'SentinellePulse/1.0'})
                if resp.status_code != 200:
                    continue
                
                items = self.parse_rss(resp.text)
                
                for item in items:
                    text = f"{item['title']} {item['description']}"
                    
                    zone = self.keywords.detect_zone(text)
                    if zone == "global":
                        zone = feed['zone']
                    
                    score, triggers = self.keywords.score(text, zone)
                    
                    if score < 4:
                        continue
                    
                    self.burst[zone].append(time.time())
                    recent = [t for t in self.burst[zone] if time.time() - t < 600]
                    burst_ratio = len(recent) / max(len(self.burst[zone]) / 10, 1)
                    
                    total_score = score + (10 if burst_ratio > Config.BURST_THRESHOLD else 0)
                    
                    if total_score < 6:
                        continue
                    
                    confidence = "HIGH" if total_score >= 12 else "MEDIUM" if total_score >= 8 else "LOW"
                    
                    alert = Alert(
                        timestamp=item['pubDate'] or datetime.now().isoformat(),
                        zone=zone,
                        score=total_score,
                        text=text[:500],
                        source=feed['name'],
                        url=item['link'] or feed['url'],
                        confidence=confidence,
                        triggers=triggers[:5]
                    )
                    
                    all_alerts.append(alert)
                    self.db.save_alert(alert)
                    
            except Exception as e:
                print(f"⚠️ {feed['name']}: {e}")
        
        return all_alerts
    
    def run(self):
        print("""
╔══════════════════════════════════════════════════════════════╗
║         🚨 SENTINELLE PULSE - RSS Scanner                 ║
║         Flux temps réel - SANS credentials                 ║
╠══════════════════════════════════════════════════════════════╣
║  Sources: Reuters, BBC, Al Jazeera, France24, UN, Le Monde ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        cycle = 0
        while True:
            cycle += 1
            print(f"\n📡 Scan #{cycle} - {datetime.now().strftime('%H:%M:%S')}")
            
            alerts = self.scan()
            
            for alert in alerts:
                emoji = "🔴" if alert.confidence == "HIGH" else "🟡"
                print(f"\n{emoji} [{alert.confidence}] {alert.zone.upper()}")
                print(f"   📢 {alert.source}")
                print(f"   📊 Score: {alert.score}")
                print(f"   📄 {alert.text[:150]}...")
                if alert.triggers:
                    print(f"   🏷️  {', '.join(alert.triggers[:3])}")
            
            print(f"\n   ✅ {len(alerts)} alertes | Total DB: {self.db.count_alerts()} entrées")
            
            time.sleep(Config.SCAN_INTERVAL)

class Database:
    def __init__(self):
        self.conn = sqlite3.connect(Config.DB_PATH, check_same_thread=False)
        self.init()
    
    def init(self):
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
    
    def count_alerts(self) -> int:
        c = self.conn.execute('SELECT COUNT(*) FROM alerts')
        return c.fetchone()[0]

def main():
    scanner = RSSScanner()
    try:
        scanner.run()
    except KeyboardInterrupt:
        print("\n⏹️ Arrêté")
        scanner.db.conn.close()

if __name__ == "__main__":
    main()
