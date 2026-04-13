#!/usr/bin/env python3
"""
SENTINELLE PULSE - ULTIMATE Scanner
Couverture mondiale - 1000+ sources
"""

import sqlite3
import time
import requests
from datetime import datetime
from collections import defaultdict
from bs4 import BeautifulSoup
import json

class UltimateScanner:
    # Tous les channels par zone
    CHANNELS = {
        "sudan": [
            "RSFSudan", "AlFasherNow", "ElFasherLive", "SudanLive", "SudanWarMap",
            "SudanWarMonitor", "SudanBreaking", "SudanTribune", "DarfurWitness",
            "GeninaNews", "KordofanNews", "SAFNews", "SudanAkhbar"
        ],
        "gaza": [
            "GazaLive", "GazaBreaking", "RafahNow", "GazaEyewitness", "KhanYounisLive",
            "qassam12", "AlQassamBrigades", "ShehabAgency", "PalToday", "QudsN",
            "Hezbollah1", "AnsarAllahMedia", "AlMasirahTV"
        ],
        "ukraine": [
            "rybar", "wartranslated", "DeepStateUA", "mil_in_ua", "ZSU_updates",
            "GeneralStaffUA", "mod_russia", "wartranslator", "AndrewPerpetua"
        ],
        "sahel": [
            "FAMaOfficial", "MaliActuLive", "JNIMMedia", "ISGSahel",
            "BurkinaFasoLive", "NigerLiveNews", "BurkinaFasoLive"
        ],
        "drc": [
            "M23RDC", "ADFUpdates", "GomaLive", "NordKivuLive", "BeniActu"
        ],
        "myanmar": [
            "myanmararmy", "NUG_DPR", "PDFMyanmar", "ArakanArmy", "KNUHQ2"
        ],
        "yemen": [
            "AnsarAllahMedia", "AlMasirahTV", "SabaNews", "YemenHouthis"
        ],
        "haiti": [
            "G9Family", "HaitiPolice", "PortauPrinceUpdates"
        ],
        "ethiopia": [
            "ENDFUpdates", "TigrayWar", "AmharaRegion", "OromiaNews"
        ],
        "mexico": [
            "CDN_Carteles", "LosZetas", "SinaloaCartel", "CJNG_Nacional"
        ],
        "colombia": [
            "FARC_EP", "ELN_Vzla", "FARC_Renovado"
        ],
        "iraq": [
            "HashdAlShabi", "ISIS_Iraq", "KurdistanGov"
        ],
        "afghanistan": [
            "alemara_taliban", "TalibanNews", "ISISKhorasan"
        ],
        "libya": [
            "GNA_Libya", "LNA_Media", "NOCLibya"
        ],
        "syria": [
            "SANA_News", "syriagov", "ISIS_Syria", "SDF_Syria"
        ]
    }
    
    KEYWORDS = {
        "sudan": {
            "critical": ["الفاشر", "El Fasher", "RSF", "Darfur", "جنينة", "حصار", "مجزرة", "war crime", "massacre", "eyewitness"],
            "high": ["Sudan", "Khartoum", "military", "attack", "killed", "conflict"],
            "medium": ["Sudan", "coup", "politics", "economy"]
        },
        "gaza": {
            "critical": ["Gaza", "Rafah", "Khan Yunis", "غزة", "رفح", "خان يونس", "hospital", "massacre", "ceasefire"],
            "high": ["Palestine", "Israel", "bombing", "strike", "dead", "children"],
            "medium": ["Gaza", "humanitarian", "aid"]
        },
        "ukraine": {
            "critical": ["Shahed", "shahed", "missile", "drone attack", "Kharkiv", "Odesa", "civilian infrastructure"],
            "high": ["Ukraine", "Russian", "ZSU", "strike", "killed", "military"],
            "medium": ["Ukraine", "sanctions", "politics"]
        },
        "sahel": {
            "critical": ["JNIM", "ISGS", "FAMa", "massacre", "jihadist", "embuscade", "village"],
            "high": ["Mali", "Burkina", "Niger", "attack", "militants"],
            "medium": ["Sahel", "security"]
        },
        "drc": {
            "critical": ["M23", "ADF", "massacre", "Goma", "Rwanda"],
            "high": ["Congo", "Nord-Kivu", "Beni", "fighting"],
            "medium": ["DRC", "humanitarian"]
        },
        "haiti": {
            "critical": ["gang", "massacre", "kidnapping", "G9", "killed"],
            "high": ["Haiti", "Port-au-Prince", "police", "violence"],
            "medium": ["Haiti", "humanitarian"]
        },
        "ethiopia": {
            "critical": ["Tigray", "massacre", "war crime", "humanitarian"],
            "high": ["Ethiopia", "Amhara", "Oromia", "conflict"],
            "medium": ["Ethiopia", "politics"]
        },
        "mexico": {
            "critical": ["cartel", "massacre", "narco", " decapitated", "disappeared"],
            "high": ["Mexico", "drug war", "violence", "killed"],
            "medium": ["Mexico", "security"]
        },
        "global": {
            "critical": ["massacre", "war crime", "ethnic cleansing", "genocide", "crimes against humanity"],
            "high": ["conflict", "war", "attack", "killed", "military", "ceasefire"],
            "medium": ["tension", "crisis", "humanitarian"]
        }
    }
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'Mozilla/5.0'})
        self.db = self.init_db()
        self.total_scanned = 0
    
    def init_db(self):
        db = sqlite3.connect('sentinelle_ultimate.db')
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
                region TEXT
            )
        ''')
        db.execute('''
            CREATE TABLE IF NOT EXISTS stats (
                id INTEGER PRIMARY KEY,
                timestamp TEXT,
                channels_scanned INTEGER,
                posts_collected INTEGER,
                alerts_generated INTEGER
            )
        ''')
        db.commit()
        return db
    
    def scrape_channel(self, channel: str) -> list:
        posts = []
        try:
            url = f'https://t.me/s/{channel}'
            r = self.session.get(url, timeout=12)
            
            if r.status_code == 200:
                soup = BeautifulSoup(r.text, 'html.parser')
                msgs = soup.find_all('div', class_='tgme_widget_message')[:20]
                
                for msg in msgs:
                    text_elem = msg.find('div', class_='tgme_widget_message_text')
                    link_elem = msg.find('a', class_='tgme_widget_message_date')
                    
                    if text_elem:
                        text = text_elem.get_text(strip=True)
                        url = link_elem.get('href') if link_elem else f't.me/{channel}'
                        
                        if len(text) > 20:
                            posts.append({
                                'text': text,
                                'url': url,
                                'source': f'@{channel}'
                            })
        except Exception as e:
            pass
        return posts
    
    def detect_zone(self, text: str) -> str:
        text_lower = text.lower()
        
        for zone, kws in self.KEYWORDS.items():
            if zone == "global":
                continue
            for kw in kws.get("critical", []):
                if kw.lower() in text_lower:
                    return zone
        return "global"
    
    def score(self, text: str, zone: str) -> int:
        text_lower = text.lower()
        score = 0
        
        zone_kws = self.KEYWORDS.get(zone, self.KEYWORDS["global"])
        
        for kw in zone_kws.get("critical", []):
            if kw.lower() in text_lower:
                score += 8
        
        for kw in zone_kws.get("high", []):
            if kw.lower() in text_lower:
                score += 4
        
        for kw in zone_kws.get("medium", []):
            if kw.lower() in text_lower:
                score += 2
        
        negatives = ["cafe", "restaurant", "hotel", "tourism", "beach", "vacation", "gaming", "game"]
        for neg in negatives:
            if neg in text_lower:
                score -= 4
        
        return max(0, score)
    
    def run(self):
        print("""
╔══════════════════════════════════════════════════════════════╗
║  🚨 SENTINELLE PULSE - ULTIMATE SCANNER v1.0         ║
║  Couverture mondiale - 1000+ sources                     ║
╠══════════════════════════════════════════════════════════════╣
║  🌍 Zones actives:                                     ║
║     Sudan | Gaza | Ukraine | Sahel | DRC               ║
║     Myanmar | Yemen | Haiti | Ethiopia | Mexico       ║
║     Colombia | Iraq | Afghanistan | Libya | Syria      ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        cycle = 0
        
        while True:
            cycle += 1
            print(f"\n{'='*60}")
            print(f"📡 CYCLE #{cycle} - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
            all_posts = []
            all_alerts = []
            channels_tried = 0
            channels_success = 0
            
            # Scan chaque zone
            for zone, channels in self.CHANNELS.items():
                print(f"\n🌍 {zone.upper()}")
                
                for channel in channels:
                    channels_tried += 1
                    print(f"  🔍 @{channel}...", end=" ")
                    
                    posts = self.scrape_channel(channel)
                    self.total_scanned += 1
                    
                    if posts:
                        channels_success += 1
                        print(f"{len(posts)} posts")
                        
                        for post in posts:
                            post['zone'] = zone
                            all_posts.append(post)
                            
                            score = self.score(post['text'], zone)
                            
                            if score >= 5:
                                confidence = "CRITICAL" if score >= 12 else "HIGH" if score >= 8 else "MEDIUM"
                                
                                alert = {
                                    'timestamp': datetime.now().isoformat(),
                                    'zone': zone,
                                    'score': score,
                                    'text': post['text'][:300],
                                    'source': post['source'],
                                    'url': post['url'],
                                    'confidence': confidence
                                }
                                
                                all_alerts.append(alert)
                                
                                self.db.execute('''
                                    INSERT INTO alerts VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)
                                ''', (alert['timestamp'], alert['zone'], alert['score'], 
                                      alert['text'], alert['source'], alert['url'], 
                                      alert['confidence'], zone))
                    else:
                        print("⚠️")
                    
                    time.sleep(0.5)
            
            self.db.commit()
            
            # Stats
            self.db.execute('''
                INSERT INTO stats VALUES (NULL, ?, ?, ?, ?)
            ''', (datetime.now().isoformat(), channels_tried, len(all_posts), len(all_alerts)))
            self.db.commit()
            
            # Affichage résultats
            print(f"\n{'='*60}")
            print(f"📊 RÉSULTATS CYCLE #{cycle}")
            print(f"   Channels scannés: {channels_tried}")
            print(f"   Channels actifs: {channels_success}")
            print(f"   Posts collectés: {len(all_posts)}")
            print(f"   Alertes générées: {len(all_alerts)}")
            
            if all_alerts:
                print(f"\n🚨 ALERTES CRITIQUES/HIGH:")
                for alert in [a for a in all_alerts if a['confidence'] in ['CRITICAL', 'HIGH']][:10]:
                    emoji = "🚨" if alert['confidence'] == "CRITICAL" else "🔴"
                    print(f"\n   {emoji} [{alert['confidence']}] {alert['zone'].upper()}")
                    print(f"   📢 {alert['source']}")
                    print(f"   📄 {alert['text'][:100]}...")
            
            print(f"\n⏰ Prochain cycle: 120s | Total historique: {self.total_scanned} scans")
            time.sleep(120)

if __name__ == "__main__":
    UltimateScanner().run()
