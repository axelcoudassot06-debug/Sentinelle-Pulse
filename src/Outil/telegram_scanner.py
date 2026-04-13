#!/usr/bin/env python3
"""
SENTINELLE PULSE - Telegram Real-Time Scanner v3.0
Surveillance 350+ sources Telegram/X en temps réel
Détection conflits 30-120min AVANT presse
"""

import asyncio
import json
import sqlite3
import time
import logging
import os
import sys
from datetime import datetime, timedelta
from collections import defaultdict, deque
from dataclasses import dataclass, asdict
from typing import Dict, List, Optional, Tuple
from pathlib import Path

try:
    from telethon import TelegramClient
    from telethon.errors import SessionPasswordNeededError
    TELETHON_AVAILABLE = True
except ImportError:
    TELETHON_AVAILABLE = False
    print("⚠️ Telethon non installé. Exécute: pip install telethon")

import requests

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('sentinelle.log')
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class Alert:
    timestamp: str
    zone: str
    score: int
    text: str
    source: str
    url: str
    confidence: str
    geoloc: str
    burst_ratio: float
    triggers: List[str]
    source_type: str = "telegram"

@dataclass
class Post:
    id: str
    text: str
    source: str
    source_username: str
    url: str
    timestamp: str
    zone: str
    source_type: str = "telegram"

class Config:
    API_ID = os.getenv('TELEGRAM_API_ID', '')
    API_HASH = os.getenv('TELEGRAM_API_HASH', '')
    SESSION_NAME = 'sentinelle_session'
    
    DISCORD_WEBHOOK = os.getenv('DISCORD_WEBHOOK', '')
    TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
    
    DB_PATH = 'sentinelle.db'
    KEYWORDS_PATH = 'keywords.json'
    SOURCES_PATH = 'sources.json'
    
    SCAN_INTERVAL = 30
    BURST_THRESHOLD = 3.0
    MAX_POSTS_PER_CHANNEL = 100

class Keywords:
    def __init__(self, config_path: str = Config.KEYWORDS_PATH):
        self.zones = {}
        self.transversal = {}
        self.all_keywords = []
        self.load(config_path)
    
    def load(self, path: str):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.zones = data.get('zones', {})
                self.transversal = data.get('transversal', {})
                
                self.all_keywords = []
                for zone, cats in self.zones.items():
                    for cat, kws in cats.items():
                        if isinstance(kws, list):
                            self.all_keywords.extend(kws)
                
                logger.info(f"✅ {len(self.all_keywords)} keywords chargés depuis {path}")
        except FileNotFoundError:
            logger.warning(f"⚠️ {path} non trouvé, création keywords par défaut")
            self.create_default_keywords()
    
    def create_default_keywords(self):
        self.zones = {
            "sudan": {
                "strong": ["الفاشر", "حصار الفاشر", "RSF الفاشر", "قصف الفاشر", "El Fasher siege", "RSF El Fasher"],
                "medium": ["دارفور", "جنينة", "الخرطوم", "RSF", "SAF"],
                "weak": ["قصف", "اشتباك", "نزوح", "مجزرة", "حصار"],
                "negative": ["دارفور كافيه", "مجزرة أسعار"],
                "boost": ["war crime", "eyewitness", "UNHCR", "MSF", "genocide"]
            },
            "gaza": {
                "strong": ["غزة قصف", "رفح مجزرة", "خان يونس قصف", "hospital bombing"],
                "medium": ["غزة", "رفح", "خان يونس", "IDF", "حماس"],
                "weak": ["قصف", "مجزرة", "حصار", "نزوح"],
                "negative": ["غزة كافيه", "غزة مطعم"],
                "boost": ["UNRWA", "war crime", "ICRC", "civilians killed"]
            },
            "ukraine": {
                "strong": ["шахед", "Shahed attack", "Kharkiv strike", "Bucha massacre"],
                "medium": ["Харьков", "Одесса", "Киев", "ЗСУ", "ВСУ"],
                "weak": ["обстрел", "бомбардировка", "авиаудар"],
                "negative": ["war thunder", "игра"],
                "boost": ["HIMARS", "war crime", "civilian infrastructure"]
            },
            "sahel": {
                "strong": ["JNIM", "ISGS", "embuscade FAMa", "EEI Mali"],
                "medium": ["Mopti", "Gao", "FAMa", "Barkhane"],
                "weak": ["attaque jihadiste", "milice"],
                "negative": ["djihad prix"],
                "boost": ["village brûlé", "déplacés", "UN peacekeeping"]
            }
        }
        
        self.transversal = {
            "en": {
                "hospital": {"negative": ["hospital day", "veterinary"]},
                "war": {"negative": ["price war", "trade war", "war thunder"]}
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
                    triggers.append(f"NEGATIVE:{keyword}")
        
        for lang, cats in self.transversal.items():
            for cat_name, cat_data in cats.items():
                if "negative" in cat_data:
                    for kw in cat_data["negative"]:
                        if kw.lower() in text_lower:
                            score -= 4
        
        return max(0, score), triggers
    
    def detect_zone(self, text: str) -> Optional[str]:
        text_lower = text.lower()
        zone_scores = defaultdict(int)
        
        for zone, cats in self.zones.items():
            for cat, kws in cats.items():
                if isinstance(kws, list):
                    for kw in kws:
                        if kw.lower() in text_lower:
                            zone_scores[zone] += 1
        
        if zone_scores:
            return max(zone_scores, key=zone_scores.get)
        return None

class Sources:
    def __init__(self, config_path: str = Config.SOURCES_PATH):
        self.telegram = {}
        self.twitter = {}
        self.rss = []
        self.hashtags = []
        self.load(config_path)
    
    def load(self, path: str):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.telegram = data.get('telegram', {})
                self.twitter = data.get('twitter', {})
                self.rss = data.get('rss', [])
                self.hashtags = data.get('hashtags', [])
                
                total_channels = sum(
                    len(ch) for cat in self.telegram.values() 
                    for ch in cat.values()
                )
                logger.info(f"✅ Sources chargées: {total_channels} channels Telegram, {len(self.rss)} RSS")
        except FileNotFoundError:
            logger.warning(f"⚠️ {path} non trouvé")
            self.create_default_sources()
    
    def create_default_sources(self):
        self.telegram = {
            "sudan": {
                "rsf": ["RSFSudan", "HemetiOfficial", "RapidSupport_FC"],
                "military": ["SudanArmedForces", "SAF_News"],
                "darfur": ["AlFasherNow", "DarfurWitness", "ElFasherLive"],
                "live": ["SudanLive", "SudanWarMap", "SudanBreaking"]
            },
            "gaza": {
                "eyewitness": ["GazaLive", "RafahNow", "GazaEyewitness"],
                "resistance": ["qassam12", "AlQassamBrigades"]
            },
            "ukraine": {
                "frontlines": ["rybar", "mil_in_ua", "DeepStateUA"]
            }
        }
        self.rss = []
    
    def get_all_telegram_channels(self) -> List[Tuple[str, str]]:
        channels = []
        for zone, categories in self.telegram.items():
            for cat_name, channel_list in categories.items():
                for channel in channel_list:
                    channels.append((zone, channel))
        return channels

class Database:
    def __init__(self, db_path: str = Config.DB_PATH):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.init_tables()
    
    def init_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                zone TEXT,
                score INTEGER,
                text TEXT,
                source TEXT,
                url TEXT,
                confidence TEXT,
                geoloc TEXT,
                burst_ratio REAL,
                triggers TEXT,
                source_type TEXT,
                status TEXT DEFAULT 'pending'
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                zone TEXT,
                text TEXT,
                source TEXT,
                source_username TEXT,
                url TEXT,
                source_type TEXT,
                scored INTEGER DEFAULT 0
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS stats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                zone TEXT,
                posts_count INTEGER,
                alerts_count INTEGER,
                burst_detected INTEGER
            )
        ''')
        self.conn.commit()
    
    def save_alert(self, alert: Alert):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO alerts (timestamp, zone, score, text, source, url, confidence, geoloc, burst_ratio, triggers, source_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            alert.timestamp, alert.zone, alert.score, alert.text, alert.source,
            alert.url, alert.confidence, alert.geoloc, alert.burst_ratio,
            json.dumps(alert.triggers), alert.source_type
        ))
        self.conn.commit()
        return cursor.lastrowid
    
    def save_post(self, post: Post):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO posts (timestamp, zone, text, source, source_username, url, source_type, scored)
            VALUES (?, ?, ?, ?, ?, ?, ?, 0)
        ''', (post.timestamp, post.zone, post.text, post.source, post.source_username, post.url, post.source_type))
        self.conn.commit()
    
    def get_recent_alerts(self, hours: int = 24) -> List[Alert]:
        since = (datetime.now() - timedelta(hours=hours)).isoformat()
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM alerts WHERE timestamp > ? ORDER BY timestamp DESC LIMIT 100', (since,))
        rows = cursor.fetchall()
        
        alerts = []
        for row in rows:
            alerts.append(Alert(
                timestamp=row[1], zone=row[2], score=row[3], text=row[4],
                source=row[5], url=row[6], confidence=row[7], geoloc=row[8],
                burst_ratio=row[9], triggers=json.loads(row[10]), source_type=row[11]
            ))
        return alerts
    
    def close(self):
        self.conn.close()

class BurstDetector:
    def __init__(self):
        self.buffers: Dict[str, deque] = defaultdict(lambda: deque(maxlen=200))
        self.baselines: Dict[str, float] = defaultdict(lambda: 0.5)
    
    def add(self, zone: str, text: str) -> Tuple[bool, float]:
        now = time.time()
        self.buffers[zone].append((now, text))
        
        recent = [(t, _) for t, _ in self.buffers[zone] if now - t < 600]
        baseline = max(len([t for t, _ in self.buffers[zone] if now - t < 3600]) / 6, 0.5)
        self.baselines[zone] = baseline
        
        volume_10min = len(recent)
        ratio = volume_10min / baseline
        
        return ratio > Config.BURST_THRESHOLD, ratio

class TelegramScanner:
    def __init__(self, api_id: str, api_hash: str, keywords: Keywords, sources: Sources, db: Database):
        self.api_id = api_id
        self.api_hash = api_hash
        self.keywords = keywords
        self.sources = sources
        self.db = db
        self.burst = BurstDetector()
        self.client = None
        self.running = False
    
    async def connect(self):
        if not TELETHON_AVAILABLE:
            logger.error("❌ Telethon non disponible")
            return False
        
        try:
            self.client = TelegramClient(Config.SESSION_NAME, self.api_id, self.api_hash)
            await self.client.start()
            
            if not await self.client.is_user_authorized():
                logger.error("❌ Non autorisé. Vérifie tes credentials ou crée un fichier de session")
                return False
            
            me = await self.client.get_me()
            logger.info(f"✅ Connecté à Telegram: {me.username}")
            return True
        except Exception as e:
            logger.error(f"❌ Erreur connexion: {e}")
            return False
    
    async def scan_channel(self, channel_username: str, zone: str) -> List[Post]:
        posts = []
        
        try:
            entity = await self.client.get_entity(channel_username)
            
            async for message in self.client.iter_messages(entity, limit=Config.MAX_POSTS_PER_CHANNEL):
                if message.text and message.text.strip():
                    post = Post(
                        id=str(message.id),
                        text=message.text[:1000],
                        source=channel_username,
                        source_username=channel_username,
                        url=f"https://t.me/{channel_username}/{message.id}",
                        timestamp=message.date.isoformat() if message.date else datetime.now().isoformat(),
                        zone=zone,
                        source_type="telegram"
                    )
                    posts.append(post)
                    
        except Exception as e:
            logger.warning(f"⚠️ Erreur scan {channel_username}: {e}")
        
        return posts
    
    async def scan_all_channels(self) -> List[Post]:
        all_posts = []
        channels = self.sources.get_all_telegram_channels()
        
        logger.info(f"🔍 Scan de {len(channels)} channels...")
        
        for i, (zone, channel) in enumerate(channels):
            try:
                posts = await self.scan_channel(channel, zone)
                all_posts.extend(posts)
                
                if (i + 1) % 10 == 0:
                    logger.info(f"   Progression: {i+1}/{len(channels)} channels")
                    
            except Exception as e:
                logger.warning(f"⚠️ {channel}: {e}")
            
            await asyncio.sleep(0.5)
        
        logger.info(f"✅ {len(all_posts)} posts collectés")
        return all_posts
    
    def process_posts(self, posts: List[Post]) -> List[Alert]:
        alerts = []
        
        for post in posts:
            score, triggers = self.keywords.score(post.text, post.zone)
            
            if not post.zone:
                detected_zone = self.keywords.detect_zone(post.text)
                if detected_zone:
                    post.zone = detected_zone
            
            if score < 5:
                continue
            
            is_burst, burst_ratio = self.burst.add(post.zone or "unknown", post.text)
            
            total_score = score + (10 if is_burst else 0)
            
            if total_score < 8:
                continue
            
            confidence = "CRITICAL" if total_score >= 18 else "HIGH" if total_score >= 12 else "MEDIUM"
            
            alert = Alert(
                timestamp=post.timestamp,
                zone=post.zone or "unknown",
                score=total_score,
                text=post.text[:500],
                source=post.source,
                url=post.url,
                confidence=confidence,
                geoloc=self.extract_geoloc(post.text, post.zone or ""),
                burst_ratio=burst_ratio,
                triggers=triggers[:10],
                source_type="telegram"
            )
            
            alerts.append(alert)
            self.db.save_alert(alert)
        
        return alerts
    
    def extract_geoloc(self, text: str, zone: str) -> str:
        cities = {
            "sudan": ["الفاشر", "دارفور", "جنينة", "الخرطوم", "أم درمان"],
            "gaza": ["غزة", "رفح", "خان يونس", "دير البلح"],
            "ukraine": ["Харьков", "Одесса", "Киев", "Запорожье"]
        }
        
        for city in cities.get(zone, []):
            if city in text:
                return city
        return ""
    
    async def run(self):
        self.running = True
        
        if not await self.connect():
            logger.error("❌ Connexion Telegram échouée")
            return
        
        cycle = 0
        while self.running:
            cycle += 1
            logger.info(f"\n📡 Cycle #{cycle} - {datetime.now().strftime('%H:%M:%S')}")
            
            posts = await self.scan_all_channels()
            alerts = self.process_posts(posts)
            
            for alert in alerts:
                self.print_alert(alert)
                await self.send_notification(alert)
            
            logger.info(f"   📊 Résumé: {len(posts)} posts, {len(alerts)} alertes")
            
            await asyncio.sleep(Config.SCAN_INTERVAL)
    
    def print_alert(self, alert: Alert):
        emoji = "🚨" if alert.confidence == "CRITICAL" else "🔴" if alert.confidence == "HIGH" else "🟡"
        
        print(f"\n{'='*60}")
        print(f"{emoji} [{alert.confidence}] {alert.zone.upper()}")
        print(f"⏰ {alert.timestamp[:19]} | 📊 Score: {alert.score}")
        print(f"💥 Burst: x{alert.burst_ratio:.1f}" if alert.burst_ratio > 1 else "")
        print(f"📢 @{alert.source}")
        print(f"🔗 {alert.url}")
        print(f"📄 {alert.text[:200]}...")
        if alert.triggers:
            print(f"🏷️  Triggers: {', '.join(alert.triggers[:5])}")
        print(f"{'='*60}\n")
    
    async def send_notification(self, alert: Alert):
        if Config.DISCORD_WEBHOOK:
            await self.send_discord(alert)
        
        if Config.TELEGRAM_BOT_TOKEN:
            await self.send_telegram_bot(alert)
    
    async def send_discord(self, alert: Alert):
        color = 0xDC2626 if alert.confidence == "CRITICAL" else 0xF97316 if alert.confidence == "HIGH" else 0xEAB308
        
        embed = {
            "title": f"🚨 [{alert.confidence}] {alert.zone.upper()}",
            "description": alert.text[:300],
            "color": color,
            "fields": [
                {"name": "Score", "value": str(alert.score), "inline": True},
                {"name": "Source", "value": f"@{alert.source}", "inline": True},
                {"name": "Burst", "value": f"x{alert.burst_ratio:.1f}", "inline": True},
                {"name": "URL", "value": alert.url}
            ],
            "footer": {"text": "Sentinelle Pulse - OSINT"},
            "timestamp": alert.timestamp
        }
        
        try:
            requests.post(Config.DISCORD_WEBHOOK, json={"embeds": [embed]}, timeout=10)
        except Exception as e:
            logger.warning(f"⚠️ Discord: {e}")
    
    async def send_telegram_bot(self, alert: Alert):
        emoji = "🚨" if alert.confidence == "CRITICAL" else "🔴" else "🟡"
        text = f"""
{emoji} *[{alert.confidence}]* **{alert.zone.upper()}**

📢 @{alert.source}
⏰ {alert.timestamp[:16]}
📊 Score: {alert.score} ({alert.burst_ratio:.1f}x burst)

{alert.text[:300]}

🔗 [Voir le post]({alert.url})
"""
        
        try:
            requests.post(
                f"https://api.telegram.org/bot{Config.TELEGRAM_BOT_TOKEN}/sendMessage",
                json={"chat_id": "@SentinellePulse", "text": text, "parse_mode": "Markdown"},
                timeout=10
            )
        except Exception as e:
            logger.warning(f"⚠️ Telegram Bot: {e}")
    
    def stop(self):
        self.running = False
        if self.client:
            self.client.disconnect()

class RSSScanner:
    def __init__(self, sources: Sources, keywords: Keywords, db: Database):
        self.sources = sources
        self.keywords = keywords
        self.db = db
        self.burst = BurstDetector()
    
    def scan(self) -> List[Alert]:
        alerts = []
        
        for feed in self.sources.rss:
            try:
                response = requests.get(feed['url'], timeout=15)
                items = self.parse_rss(response.text)
                
                for item in items:
                    score, triggers = self.keywords.score(item['title'] + ' ' + item.get('description', ''))
                    
                    if score < 5:
                        continue
                    
                    zone = feed.get('zone', self.keywords.detect_zone(item['title']))
                    
                    is_burst, burst_ratio = self.burst.add(zone or "global", item['title'])
                    total_score = score + (10 if is_burst else 0)
                    
                    if total_score < 8:
                        continue
                    
                    confidence = "CRITICAL" if total_score >= 18 else "HIGH" if total_score >= 12 else "MEDIUM"
                    
                    alert = Alert(
                        timestamp=item['pubDate'],
                        zone=zone or "global",
                        score=total_score,
                        text=f"{item['title']} {item.get('description', '')}"[:500],
                        source=feed['name'],
                        url=item.get('link', feed['url']),
                        confidence=confidence,
                        geoloc="",
                        burst_ratio=burst_ratio,
                        triggers=triggers[:10],
                        source_type="rss"
                    )
                    
                    alerts.append(alert)
                    self.db.save_alert(alert)
                    
            except Exception as e:
                logger.warning(f"⚠️ RSS {feed['name']}: {e}")
        
        return alerts
    
    def parse_rss(self, xml: str) -> List[Dict]:
        import re
        items = []
        
        item_pattern = re.compile(r'<item>(.*?)</item>', re.DOTALL)
        for item_match in item_pattern.finditer(xml):
            item_xml = item_match.group(1)
            
            get_tag = lambda tag: (
                re.search(f'<{tag}[^>]*>(.*?)</{tag}>', item_xml, re.DOTALL) or
                re.search(f'<{tag}>(.*?)</{tag}>', item_xml, re.DOTALL)
            )
            
            title_match = get_tag('title')
            desc_match = get_tag('description')
            link_match = get_tag('link')
            pub_match = get_tag('pubDate')
            
            if title_match:
                items.append({
                    'title': re.sub(r'<[^>]+>', '', title_match.group(1)).strip()[:500],
                    'description': re.sub(r'<[^>]+>', '', desc_match.group(1)).strip()[:500] if desc_match else '',
                    'link': link_match.group(1).strip() if link_match else '',
                    'pubDate': pub_match.group(1).strip() if pub_match else datetime.now().isoformat()
                })
        
        return items

def main():
    print("""
╔══════════════════════════════════════════════════════════════╗
║           🚨 SENTINELLE PULSE v3.0                          ║
║        OSINT Conflict Early Warning System                   ║
║        Détection 30-120min AVANT presse                     ║
╠══════════════════════════════════════════════════════════════╣
║  Zones: Sudan 🇸🇩 | Gaza 🇵🇸 | Ukraine 🇺🇦 | Sahel 🌍        ║
╚══════════════════════════════════════════════════════════════╝
    """)
    
    if not Config.API_ID or not Config.API_HASH:
        print("❌ Configuration requise:")
        print("   1. Crée un compte sur https://my.telegram.org")
        print("   2. Exporte tes variables:")
        print("      export TELEGRAM_API_ID=123456")
        print("      export TELEGRAM_API_HASH=your_hash_here")
        print("      export DISCORD_WEBHOOK=https://discord.com/api/webhooks/...")
        print("\n   3. Installe Telethon: pip install telethon requests")
        sys.exit(1)
    
    logger.info("🚀 Initialisation...")
    
    keywords = Keywords()
    sources = Sources()
    db = Database()
    
    logger.info(f"📡 {len(sources.get_all_telegram_channels())} channels Telegram configurés")
    logger.info(f"📰 {len(sources.rss)} flux RSS configurés")
    logger.info(f"🏷️  {len(keywords.all_keywords)} keywords actifs")
    
    scanner = TelegramScanner(Config.API_ID, Config.API_HASH, keywords, sources, db)
    
    try:
        asyncio.run(scanner.run())
    except KeyboardInterrupt:
        logger.info("\n⏹️ Arrêt...")
        scanner.stop()
        db.close()

if __name__ == "__main__":
    main()
