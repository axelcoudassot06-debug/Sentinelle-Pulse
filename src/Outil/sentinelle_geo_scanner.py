#!/usr/bin/env python3
"""
SENTINELLE PULSE + GEOSENTINEL - Integrated OSINT Scanner v1.0
Fusion du scanner Telegram avec le tracking flights/vessels et OSINT avancé
"""

import asyncio
import json
import sqlite3
import time
import logging
import os
import sys
import re
import ssl
import tempfile
import threading
from datetime import datetime, timedelta
from collections import defaultdict, deque
from dataclasses import dataclass, asdict
from typing import Dict, List, Optional, Tuple
from pathlib import Path

import requests
from requests.auth import HTTPBasicAuth

try:
    from telethon import TelegramClient
    from telethon.errors import SessionPasswordNeededError
    TELETHON_AVAILABLE = True
except ImportError:
    TELETHON_AVAILABLE = False

try:
    import socks
    import socket
    SOCKS_AVAILABLE = True
except ImportError:
    SOCKS_AVAILABLE = False

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('sentinelle_geo.log')
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
    source_type: str
    extra_data: dict = None

@dataclass
class FlightAlert:
    icao24: str
    callsign: str
    lat: float
    lon: float
    alt: int
    type: str
    zone: str = ""
    threat_level: str = "LOW"

@dataclass
class VesselAlert:
    mmsi: str
    name: str
    lat: float
    lon: float
    type: str
    country: str
    zone: str = ""
    threat_level: str = "LOW"

class Config:
    TELEGRAM_API_ID = os.getenv('TELEGRAM_API_ID', '')
    TELEGRAM_API_HASH = os.getenv('TELEGRAM_API_HASH', '')
    TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
    DISCORD_WEBHOOK = os.getenv('DISCORD_WEBHOOK', '')
    
    AIS_API_KEY = os.getenv('AIS_API_KEY', '')
    
    TOR_PROXY = os.getenv('TOR_PROXY', '127.0.0.1:9050')
    
    DB_PATH = 'sentinelle_geo.db'
    SOURCES_PATH = 'sources.json'
    
    SCAN_INTERVAL = 60
    BURST_THRESHOLD = 3.0

ZONE_COORDINATES = {
    "sudan": {"lat": 15.5, "lon": 32.5, "radius_km": 500},
    "gaza": {"lat": 31.5, "lon": 34.3, "radius_km": 50},
    "ukraine": {"lat": 48.5, "lon": 32.0, "radius_km": 800},
    "sahel": {"lat": 15.0, "lon": 2.0, "radius_km": 1000},
    "drc": {"lat": -1.5, "lon": 29.0, "radius_km": 400},
    "myanmar": {"lat": 17.0, "lon": 96.0, "radius_km": 300},
    "yemen": {"lat": 15.5, "lon": 48.0, "radius_km": 300},
    "haiti": {"lat": 19.0, "lon": -72.5, "radius_km": 100},
}

FLIGHT_ZONES = {
    "sudan": {"radius_nm": 400},
    "gaza": {"radius_nm": 200},
    "ukraine": {"radius_nm": 500},
    "sahel": {"radius_nm": 600},
    "drc": {"radius_nm": 300},
}

VESSEL_ZONES = {
    "red_sea": {"lat": 22.0, "lon": 38.0, "radius_km": 400, "zones": ["yemen", "sudan"]},
    "mediterranean": {"lat": 35.0, "lon": 25.0, "radius_km": 500, "zones": ["gaza"]},
    "black_sea": {"lat": 44.0, "lon": 34.0, "radius_km": 400, "zones": ["ukraine"]},
    "horn_africa": {"lat": 10.0, "lon": 50.0, "radius_km": 500, "zones": ["yemen"]},
}

class FlightTracker:
    def __init__(self):
        self.cache = {}
        self.last_update = 0
        self.cache_duration = 30
    
    def fetch_flights(self, lat: float, lon: float, radius_nm: int) -> List[FlightAlert]:
        now = time.time()
        if now - self.last_update < self.cache_duration:
            return self.filter_flights_by_zone(lat, lon, radius_nm)
        
        all_flights = {}
        
        regions = [
            ("https://api.adsb.one/v2/point/40/-100/4000", "americas"),
            ("https://api.adsb.one/v2/point/50/10/3000", "europe"),
            ("https://api.adsb.one/v2/point/25/80/3000", "asia"),
            ("https://api.adsb.one/v2/point/5/20/3500", "africa"),
            ("https://api.adsb.one/v2/point/60/90/4000", "russia"),
        ]
        
        for url, _ in regions:
            try:
                response = requests.get(url, timeout=15)
                if response.status_code == 200:
                    data = response.json()
                    for ac in data.get('ac', []):
                        if ac.get('lat') is None or ac.get('lon') is None:
                            continue
                        
                        hex_code = ac.get('hex', '').upper()
                        if hex_code in all_flights:
                            continue
                        
                        callsign = (ac.get('flight', '') or '').strip() or ac.get('r', '') or hex_code
                        
                        mil_prefixes = ['RCH', 'SPAR', 'SAM', 'AF1', 'MAGMA', 'ASCOT', 'BAF', 'GAF',
                                      'PLF', 'DUKE', 'NAVY', 'COBRA', 'VIPER', 'REACH', 'EVAC', 'NATO']
                        mil_types = ['C17', 'C130', 'C5', 'KC135', 'KC10', 'F15', 'F16', 'F18',
                                    'F22', 'F35', 'B52', 'B1', 'B2', 'E3', 'E6', 'P8', 'V22', 'A10']
                        
                        is_mil = any(callsign.upper().startswith(p) for p in mil_prefixes)
                        is_mil = is_mil or any(t in (ac.get('t', '') or '').upper() for t in mil_types)
                        
                        f_type = "military" if is_mil else "commercial"
                        if not callsign.strip():
                            f_type = "unknown"
                        
                        all_flights[hex_code] = FlightAlert(
                            icao24=hex_code.lower(),
                            callsign=callsign,
                            lat=ac.get('lat'),
                            lon=ac.get('lon'),
                            alt=int(ac.get('alt_baro') or ac.get('alt_geom') or 0),
                            type=f_type
                        )
            except Exception as e:
                logger.warning(f"ADSB region error: {e}")
        
        self.cache = all_flights
        self.last_update = now
        
        return self.filter_flights_by_zone(lat, lon, radius_nm)
    
    def filter_flights_by_zone(self, lat: float, lon: float, radius_nm: int) -> List[FlightAlert]:
        nm_to_km = 1.852
        radius_km = radius_nm * nm_to_km
        
        filtered = []
        for flight in self.cache.values():
            distance = self.haversine(lat, lon, flight.lat, flight.lon)
            if distance <= radius_km:
                flight.zone = "detected"
                filtered.append(flight)
        
        return filtered
    
    def haversine(self, lat1, lon1, lat2, lon2):
        R = 6371
        dlat = abs(lat2 - lat1) * 3.14159 / 180
        dlon = abs(lon2 - lon1) * 3.14159 / 180
        a = (dlat/2)**2 + (3.14159/180*lat1)*(3.14159/180*lat2)*(dlon/2)**2
        return R * 2 * (a**0.5)

class VesselTracker:
    def __init__(self):
        self.vessels = {}
        self.ws_thread = None
        self.running = False
        self.lock = threading.Lock()
    
    def start(self, api_key: str):
        if self.running:
            return
        
        self.running = True
        self.api_key = api_key
        
        if api_key:
            self.ws_thread = threading.Thread(target=self._run_websocket, daemon=True)
            self.ws_thread.start()
            logger.info("Vessel tracker: AISstream.io WebSocket started")
        else:
            logger.warning("Vessel tracker: No AIS API key, using mock data")
    
    def _run_websocket(self):
        try:
            import websockets
            import asyncio
        except ImportError:
            logger.error("websockets not installed. Run: pip install websockets")
            return
        
        async def connect():
            try:
                async with websockets.connect("wss://stream.aisstream.io/v0/stream") as ws:
                    subscribe = {"APIKey": self.api_key, "BoundingBoxes": [[[-90, -180], [90, 180]]]}
                    await ws.send(json.dumps(subscribe))
                    
                    async for msg in ws:
                        try:
                            data = json.loads(msg)
                            if "Message" in data and "PositionReport" in data["Message"]:
                                pos = data["Message"]["PositionReport"]
                                meta = data.get("MetaData", {})
                                mmsi = str(meta.get("MMSI", ""))
                                
                                with self.lock:
                                    self.vessels[mmsi] = {
                                        "mmsi": mmsi,
                                        "name": meta.get("ShipName", "UNKNOWN").strip(),
                                        "lat": pos.get("Latitude", 0),
                                        "lon": pos.get("Longitude", 0),
                                        "speed": pos.get("Sog", 0),
                                        "heading": pos.get("TrueHeading", 0),
                                        "country": self._get_country(mmsi[:3]),
                                    }
                        except:
                            continue
            except Exception as e:
                logger.error(f"AIS WebSocket error: {e}")
                time.sleep(5)
        
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        while self.running:
            try:
                loop.run_until_complete(connect())
            except:
                time.sleep(5)
    
    def _get_country(self, mid: str) -> str:
        country_map = {
            '203': 'ES', '205': 'BE', '211': 'DE', '219': 'DK', '224': 'ES',
            '225': 'ES', '232': 'GB', '236': 'GI', '237': 'GR', '240': 'GR',
            '247': 'IT', '250': 'IE', '255': 'PT', '257': 'NO', '261': 'PL',
            '303': 'US', '338': 'US', '366': 'US', '367': 'US', '368': 'US',
            '369': 'US', '412': 'CN', '413': 'CN', '414': 'CN', '419': 'IN',
            '422': 'IR', '423': 'AZ', '431': 'JP', '432': 'JP', '440': 'KR',
            '441': 'KR', '447': 'KW', '450': 'LB', '457': 'MN', '470': 'AE',
            '471': 'AE', '477': 'HK', '503': 'AU', '525': 'ID', '563': 'SG',
            '564': 'SG', '565': 'SG', '566': 'SG', '573': 'SG', '601': 'ZA',
            '603': 'AO', '636': 'LR', '655': 'MW', '664': 'SC', '273': 'RU',
            '274': 'MK', 'START': 'UA', '209': 'CY', 'Dry': 'MT',
        }
        return country_map.get(mid, "--")
    
    def get_vessels_in_zone(self, lat: float, lon: float, radius_km: int, zones: List[str]) -> List[VesselAlert]:
        results = []
        
        if not self.api_key:
            return self._mock_vessels(lat, lon, radius_km)
        
        with self.lock:
            vessels = list(self.vessels.values())
        
        for v in vessels:
            if v.get('lat') == 0:
                continue
            
            distance = self._haversine(lat, lon, v['lat'], v['lon'])
            if distance <= radius_km:
                results.append(VesselAlert(
                    mmsi=v['mmsi'],
                    name=v['name'],
                    lat=v['lat'],
                    lon=v['lon'],
                    type="vessel",
                    country=v['country'],
                    zone=", ".join(zones) if zones else "detected"
                ))
        
        return results[:100]
    
    def _mock_vessels(self, lat: float, lon: float, radius_km: int) -> List[VesselAlert]:
        import random
        random.seed(int(lat * 100 + lon))
        
        vessels = []
        for _ in range(random.randint(5, 15)):
            vessels.append(VesselAlert(
                mmsi=f"{random.randint(200000000, 999999999)}",
                name=f"MOCK-{random.randint(100, 999)}",
                lat=lat + random.uniform(-2, 2),
                lon=lon + random.uniform(-2, 2),
                type="cargo",
                country=random.choice(["CN", "US", "PA", "LR", "MT", "HK"]),
                zone="detected"
            ))
        return vessels
    
    def _haversine(self, lat1, lon1, lat2, lon2):
        R = 6371
        dlat = abs(lat2 - lat1) * 3.14159 / 180
        dlon = abs(lon2 - lon1) * 3.14159 / 180
        a = (dlat/2)**2 + (3.14159/180*lat1)*(3.14159/180*lat2)*(dlon/2)**2
        return R * 2 * (a**0.5)
    
    def stop(self):
        self.running = False

class DarkWebScanner:
    def __init__(self, tor_proxy: str = "127.0.0.1:9050"):
        self.tor_proxy = tor_proxy
        self.session = self._create_session()
    
    def _create_session(self) -> requests.Session:
        session = requests.Session()
        
        if SOCKS_AVAILABLE:
            try:
                host, port = self.tor_proxy.split(':')
                session.proxies = {
                    'http': f'socks5://{self.tor_proxy}',
                    'https': f'socks5://{self.tor_proxy}'
                }
                logger.info(f"DarkWeb scanner: TOR via {self.tor_proxy}")
            except:
                logger.warning("DarkWeb scanner: TOR proxy invalid")
        else:
            logger.warning("DarkWeb scanner: PySocks not installed, dark web search unavailable")
        
        return session
    
    def search_ahmia(self, query: str, max_results: int = 10) -> List[Dict]:
        results = []
        
        try:
            url = f"https://ahmia.fi/search/?q={requests.utils.quote(query)}"
            headers = {'User-Agent': 'Mozilla/5.0'}
            
            response = self.session.get(url, timeout=30, headers=headers)
            
            if response.status_code == 200:
                links = re.findall(r'href="(http[^\"]+\.onion[^\"]*)"', response.text)
                titles = re.findall(r'<a[^>]*class="result__title"[^>]*>([^<]+)', response.text)
                
                for i, link in enumerate(links[:max_results]):
                    results.append({
                        "title": titles[i] if i < len(titles) else "Unknown",
                        "url": link,
                        "source": "ahmia"
                    })
        except Exception as e:
            logger.warning(f"Ahmia search error: {e}")
        
        return results
    
    def search_torch(self, query: str, max_results: int = 10) -> List[Dict]:
        results = []
        
        try:
            url = f"http://xmh57jrzrnw6insl.onion/cgi-bin/omega/p5/p5.cgi?BOOL=&MODE=META&META=100_1& FILTER=&q={requests.utils.quote(query)}"
            headers = {'User-Agent': 'Mozilla/5.0'}
            
            response = self.session.get(url, timeout=30, headers=headers)
            
            if response.status_code == 200:
                links = re.findall(r'<a[^>]*href="(http[^\"]+\.onion[^\"]*)"[^>]*>', response.text)
                
                for link in links[:max_results]:
                    results.append({
                        "title": link.split('/')[-1][:50],
                        "url": link,
                        "source": "torch"
                    })
        except Exception as e:
            logger.warning(f"Torch search error: {e}")
        
        return results

class OSINTScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def search_duckduckgo(self, query: str, max_results: int = 20) -> List[Dict]:
        results = []
        
        try:
            url = f"https://html.duckduckgo.com/html/?q={requests.utils.quote(query)}"
            response = self.session.get(url, timeout=15)
            
            if response.status_code == 200:
                titles = re.findall(r'<a[^>]*class="result__a"[^>]*>([^<]+)', response.text)
                links = re.findall(r'<a[^>]*class="result__a"[^>]*href="([^"]+)"', response.text)
                snippets = re.findall(r'<a[^>]*class="result__snippet"[^>]*>([^<]+)', response.text)
                
                for i in range(min(len(titles), max_results)):
                    results.append({
                        "title": titles[i].strip(),
                        "url": links[i] if i < len(links) else "",
                        "snippet": snippets[i].strip() if i < len(snippets) else "",
                        "source": "duckduckgo"
                    })
        except Exception as e:
            logger.warning(f"DuckDuckGo search error: {e}")
        
        return results
    
    def google_dork(self, target: str, dork_type: str = "site") -> List[Dict]:
        dorks = {
            "site": f'site:t.me {target}',
            "site_twitter": f'site:twitter.com OR site:x.com {target}',
            "site_reddit": f'site:reddit.com {target}',
            "site_github": f'site:github.com {target}',
            "intitle": f'intitle:"{target}"',
            "filetype": f'filetype:pdf {target}',
            "cache": f'cache:{target}',
        }
        
        query = dorks.get(dork_type, dorks["site"])
        return self.search_duckduckgo(query, max_results=15)
    
    def scrape_telegram_channel(self, channel_username: str, limit: int = 20) -> List[Dict]:
        results = []
        
        try:
            url = f"https://t.me/s/{channel_username}"
            response = self.session.get(url, timeout=15)
            
            if response.status_code == 200:
                posts = re.findall(r'<div class="tgme_widget_message_text[^>]*>(.*?)</div>', 
                                   response.text, re.DOTALL)
                times = re.findall(r'<time[^>]*datetime="([^"]+)"', response.text)
                
                for i, post in enumerate(posts[:limit]):
                    clean_text = re.sub(r'<[^>]+>', '', post).strip()
                    if clean_text:
                        results.append({
                            "text": clean_text[:500],
                            "time": times[i] if i < len(times) else "",
                            "source": f"@{channel_username}"
                        })
        except Exception as e:
            logger.warning(f"Telegram scrape error for {channel_username}: {e}")
        
        return results

class Database:
    def __init__(self, db_path: str = Config.DB_PATH):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.init_tables()
    
    def init_tables(self):
        cursor = self.conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT, zone TEXT, score INTEGER, text TEXT,
                source TEXT, url TEXT, confidence TEXT, geoloc TEXT,
                burst_ratio REAL, triggers TEXT, source_type TEXT,
                extra_data TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS flight_alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT, icao24 TEXT, callsign TEXT,
                lat REAL, lon REAL, alt INTEGER, flight_type TEXT,
                zone TEXT, threat_level TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS vessel_alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT, mmsi TEXT, name TEXT,
                lat REAL, lon REAL, vessel_type TEXT, country TEXT,
                zone TEXT, threat_level TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS darkweb_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT, query TEXT, title TEXT,
                url TEXT, source TEXT
            )
        ''')
        
        self.conn.commit()
    
    def save_alert(self, alert: Alert):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO alerts (timestamp, zone, score, text, source, url, confidence,
                geoloc, burst_ratio, triggers, source_type, extra_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            alert.timestamp, alert.zone, alert.score, alert.text, alert.source,
            alert.url, alert.confidence, alert.geoloc, alert.burst_ratio,
            json.dumps(alert.triggers), alert.source_type,
            json.dumps(alert.extra_data or {})
        ))
        self.conn.commit()
    
    def save_flight_alert(self, flight: FlightAlert):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO flight_alerts (timestamp, icao24, callsign, lat, lon, alt, flight_type, zone, threat_level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            datetime.now().isoformat(), flight.icao24, flight.callsign,
            flight.lat, flight.lon, flight.alt, flight.type, flight.zone, flight.threat_level
        ))
        self.conn.commit()
    
    def save_vessel_alert(self, vessel: VesselAlert):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO vessel_alerts (timestamp, mmsi, name, lat, lon, vessel_type, country, zone, threat_level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            datetime.now().isoformat(), vessel.mmsi, vessel.name,
            vessel.lat, vessel.lon, vessel.type, vessel.country, vessel.zone, vessel.threat_level
        ))
        self.conn.commit()
    
    def close(self):
        self.conn.close()

class SentinelleGeoScanner:
    def __init__(self):
        self.db = Database()
        self.flight_tracker = FlightTracker()
        self.vessel_tracker = VesselTracker()
        self.darkweb_scanner = DarkWebScanner(Config.TOR_PROXY)
        self.osint_scraper = OSINTScraper()
        self.burst_detector = defaultdict(lambda: deque(maxlen=200))
        self.baselines = defaultdict(lambda: 0.5)
        self.running = False
        self.telegram_client = None
        
        self._load_keywords()
        self._load_sources()
    
    def _load_keywords(self):
        try:
            with open('keywords.json', 'r', encoding='utf-8') as f:
                self.keywords = json.load(f)
        except:
            self.keywords = {
                "sudan": {"strong": ["الفاشر", "RSF الفاشر", "El Fasher siege"], "medium": ["دارفور", "الخرطوم"], "weak": ["قصف", "مجزرة"]},
                "gaza": {"strong": ["غزة قصف", "رفح مجزرة"], "medium": ["غزة", "IDF"], "weak": ["قصف", "حصار"]},
                "ukraine": {"strong": ["шахед", "Shahed attack"], "medium": ["Харьков", "Одесса"], "weak": ["обстрел"]},
                "sahel": {"strong": ["JNIM", "ISGS"], "medium": ["Mopti", "FAMa"], "weak": ["attaque"]},
                "drc": {"strong": ["M23", "Rwanda DRC"], "medium": ["Goma", "Beni"], "weak": ["combats"]},
                "yemen": {"strong": ["Houthi attack"], "medium": ["Sanaa", "Hodeida"], "weak": ["قصف"]},
            }
        logger.info(f"Keywords loaded: {sum(len(v) for k in self.keywords.values() for v in k.values() if isinstance(v, list))}")
    
    def _load_sources(self):
        try:
            with open(Config.SOURCES_PATH, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.telegram_channels = data.get('telegram', {})
                self.rss_feeds = data.get('rss', [])
        except Exception as e:
            logger.warning(f"Sources load error: {e}")
            self.telegram_channels = {}
            self.rss_feeds = []
        
        logger.info(f"Sources loaded: {sum(len(c) for z in self.telegram_channels.values() for c in z.values())} channels")
    
    def score_text(self, text: str, zone: str = None) -> Tuple[int, List[str]]:
        text_lower = text.lower()
        score = 0
        triggers = []
        
        zones_to_check = [zone] if zone else list(self.keywords.keys())
        
        for z in zones_to_check:
            if z not in self.keywords:
                continue
            
            kw = self.keywords[z]
            
            for keyword in kw.get("strong", []):
                if keyword.lower() in text_lower:
                    score += 8
                    triggers.append(f"[STRONG] {keyword}")
            
            for keyword in kw.get("medium", []):
                if keyword.lower() in text_lower:
                    score += 4
                    triggers.append(keyword)
            
            for keyword in kw.get("weak", []):
                if keyword.lower() in text_lower:
                    score += 1
                    triggers.append(keyword)
        
        return max(0, score), triggers
    
    def check_burst(self, zone: str) -> Tuple[bool, float]:
        now = time.time()
        
        recent = len([t for t in self.burst_detector[zone] if now - t < 600])
        baseline = max(len([t for t in self.burst_detector[zone] if now - t < 3600]) / 6, 0.5)
        
        self.baselines[zone] = baseline
        self.burst_detector[zone].append(now)
        
        ratio = recent / baseline if baseline > 0 else 0
        return ratio > Config.BURST_THRESHOLD, ratio
    
    async def scan_telegram_channel(self, channel: str, zone: str) -> List[Alert]:
        alerts = []
        
        if not TELETHON_AVAILABLE:
            scraped = self.osint_scraper.scrape_telegram_channel(channel, limit=10)
            for post in scraped:
                score, triggers = self.score_text(post['text'], zone)
                
                if score >= 5:
                    is_burst, burst_ratio = self.check_burst(zone)
                    total_score = score + (10 if is_burst else 0)
                    
                    if total_score >= 8:
                        confidence = "CRITICAL" if total_score >= 18 else "HIGH" if total_score >= 12 else "MEDIUM"
                        
                        alert = Alert(
                            timestamp=post.get('time', datetime.now().isoformat()),
                            zone=zone,
                            score=total_score,
                            text=post['text'][:500],
                            source=post['source'],
                            url=f"https://t.me/{channel}",
                            confidence=confidence,
                            geoloc="",
                            burst_ratio=burst_ratio,
                            triggers=triggers[:5],
                            source_type="telegram_web"
                        )
                        alerts.append(alert)
                        self.db.save_alert(alert)
            return alerts
        
        if not self.telegram_client:
            return alerts
        
        try:
            entity = await self.telegram_client.get_entity(channel)
            
            async for message in self.telegram_client.iter_messages(entity, limit=50):
                if not message.text:
                    continue
                
                score, triggers = self.score_text(message.text, zone)
                
                if score >= 5:
                    is_burst, burst_ratio = self.check_burst(zone)
                    total_score = score + (10 if is_burst else 0)
                    
                    if total_score >= 8:
                        confidence = "CRITICAL" if total_score >= 18 else "HIGH" if total_score >= 12 else "MEDIUM"
                        
                        alert = Alert(
                            timestamp=message.date.isoformat() if message.date else datetime.now().isoformat(),
                            zone=zone,
                            score=total_score,
                            text=message.text[:500],
                            source=f"@{channel}",
                            url=f"https://t.me/{channel}/{message.id}",
                            confidence=confidence,
                            geoloc="",
                            burst_ratio=burst_ratio,
                            triggers=triggers[:5],
                            source_type="telegram"
                        )
                        alerts.append(alert)
                        self.db.save_alert(alert)
        
        except Exception as e:
            logger.warning(f"Telegram scan error {channel}: {e}")
        
        return alerts
    
    def scan_rss(self) -> List[Alert]:
        alerts = []
        
        for feed in self.rss_feeds[:20]:
            try:
                response = requests.get(feed['url'], timeout=10)
                
                items = re.findall(r'<item>(.*?)</item>', response.text, re.DOTALL)
                
                for item in items[:10]:
                    title_match = re.search(r'<title>(.*?)</title>', item)
                    desc_match = re.search(r'<description>(.*?)</description>', item)
                    link_match = re.search(r'<link>(.*?)</link>', item)
                    
                    if not title_match:
                        continue
                    
                    title = re.sub(r'<[^>]+>', '', title_match.group(1)).strip()
                    desc = re.sub(r'<[^>]+>', '', desc_match.group(1)).strip() if desc_match else ""
                    text = f"{title} {desc}"
                    
                    zone = feed.get('zone', '')
                    score, triggers = self.score_text(text, zone)
                    
                    if score >= 5:
                        is_burst, burst_ratio = self.check_burst(zone or "global")
                        total_score = score + (10 if is_burst else 0)
                        
                        if total_score >= 8:
                            confidence = "CRITICAL" if total_score >= 18 else "HIGH" if total_score >= 12 else "MEDIUM"
                            
                            alert = Alert(
                                timestamp=datetime.now().isoformat(),
                                zone=zone or "global",
                                score=total_score,
                                text=text[:500],
                                source=feed['name'],
                                url=link_match.group(1).strip() if link_match else feed['url'],
                                confidence=confidence,
                                geoloc="",
                                burst_ratio=burst_ratio,
                                triggers=triggers[:5],
                                source_type="rss"
                            )
                            alerts.append(alert)
                            self.db.save_alert(alert)
            
            except Exception as e:
                logger.warning(f"RSS scan error {feed['name']}: {e}")
        
        return alerts
    
    def scan_flights(self) -> List[FlightAlert]:
        all_alerts = []
        
        for zone, config in FLIGHT_ZONES.items():
            coords = ZONE_COORDINATES.get(zone, {})
            if not coords:
                continue
            
            lat, lon = coords['lat'], coords['lon']
            radius = config['radius_nm']
            
            flights = self.flight_tracker.fetch_flights(lat, lon, radius)
            
            for flight in flights:
                if flight.type == "military":
                    flight.threat_level = "HIGH"
                    flight.zone = zone
                    all_alerts.append(flight)
                    self.db.save_flight_alert(flight)
                elif flight.type == "commercial":
                    if "MILITARY" in flight.callsign.upper() or any(p in flight.callsign.upper() for p in ['RCH', 'EVAC', 'REACH']):
                        flight.threat_level = "MEDIUM"
                        flight.zone = zone
                        all_alerts.append(flight)
                        self.db.save_flight_alert(flight)
        
        return all_alerts
    
    def scan_vessels(self) -> List[VesselAlert]:
        all_alerts = []
        
        for region, config in VESSEL_ZONES.items():
            vessels = self.vessel_tracker.get_vessels_in_zone(
                config['lat'], config['lon'], config['radius_km'], config['zones']
            )
            
            for vessel in vessels:
                vessel.threat_level = self._assess_vessel_threat(vessel)
                vessel.zone = ", ".join(config['zones'])
                all_alerts.append(vessel)
                self.db.save_vessel_alert(vessel)
        
        return all_alerts
    
    def _assess_vessel_threat(self, vessel: VesselAlert) -> str:
        suspicious_countries = ['IR', 'RU', 'CN', 'KP', 'SY']
        
        if vessel.country in suspicious_countries:
            return "HIGH"
        
        if vessel.type in ["tanker", "military"]:
            return "MEDIUM"
        
        return "LOW"
    
    def scan_darkweb(self, keywords: List[str]) -> List[Dict]:
        results = []
        
        for kw in keywords:
            ahmia_results = self.darkweb_scanner.search_ahmia(kw, max_results=5)
            torch_results = self.darkweb_scanner.search_torch(kw, max_results=5)
            
            results.extend(ahmia_results)
            results.extend(torch_results)
        
        return results[:20]
    
    def scan_osint(self, query: str) -> Dict:
        results = {
            "query": query,
            "telegram": [],
            "twitter": [],
            "news": [],
            "dorks": []
        }
        
        telegram_results = self.osint_scraper.scrape_telegram_channel(query, limit=10)
        results["telegram"] = telegram_results
        
        ddg_results = self.osint_scraper.search_duckduckgo(query, max_results=15)
        results["news"] = ddg_results
        
        for dork_type in ["site_twitter", "site_reddit"]:
            dork_results = self.osint_scraper.google_dork(query, dork_type)
            results["dorks"].extend(dork_results)
        
        results["dorks"] = results["dorks"][:20]
        
        return results
    
    async def run(self):
        self.running = True
        
        if TELETHON_AVAILABLE and Config.TELEGRAM_API_ID and Config.TELEGRAM_API_HASH:
            self.telegram_client = TelegramClient(
                'sentinelle_session', Config.TELEGRAM_API_ID, Config.TELEGRAM_API_HASH
            )
            await self.telegram_client.start()
            me = await self.telegram_client.get_me()
            logger.info(f"Telegram connected: {me.username}")
        
        self.vessel_tracker.start(Config.AIS_API_KEY)
        
        cycle = 0
        while self.running:
            cycle += 1
            logger.info(f"\n{'='*60}")
            logger.info(f"CYCLE #{cycle} - {datetime.now().strftime('%H:%M:%S')}")
            
            telegram_alerts = []
            for zone, categories in self.telegram_channels.items():
                for cat_name, channels in categories.items():
                    for channel in channels[:5]:
                        alerts = await self.scan_telegram_channel(channel, zone)
                        telegram_alerts.extend(alerts)
                        await asyncio.sleep(0.3)
            
            rss_alerts = self.scan_rss()
            
            logger.info(f"OSINT: {len(telegram_alerts)} Telegram + {len(rss_alerts)} RSS alerts")
            
            flight_alerts = self.scan_flights()
            vessel_alerts = self.scan_vessels()
            
            logger.info(f"GEOSPATIAL: {len(flight_alerts)} flights + {len(vessel_alerts)} vessels detected")
            
            if flight_alerts:
                for f in flight_alerts[:5]:
                    logger.info(f"  ✈️  {f.callsign} ({f.type}) - ALT: {f.alt}ft - {f.icao24}")
            
            if vessel_alerts:
                for v in vessel_alerts[:5]:
                    logger.info(f"  🚢 {v.name} ({v.country}) - {v.lat:.2f}, {v.lon:.2f}")
            
            logger.info(f"{'='*60}")
            
            await asyncio.sleep(Config.SCAN_INTERVAL)
    
    def stop(self):
        self.running = False
        if self.telegram_client:
            self.telegram_client.disconnect()
        self.vessel_tracker.stop()
        self.db.close()

async def main():
    print("""
╔══════════════════════════════════════════════════════════════╗
║   🚨 SENTINELLE PULSE + GEOSENTINEL v1.0                  ║
║   Integrated OSINT + Geospatial Scanner                      ║
╠══════════════════════════════════════════════════════════════╣
║  Features:                                                   ║
║  • Telegram/OSINT Scanner (350+ channels)                   ║
║  • Flight Tracking (ADSB.one)                               ║
║  • Vessel Tracking (AISstream.io)                          ║
║  • Dark Web Search (TOR/Ahmia)                              ║
║  • Google Dorking + OSINT Scraping                          ║
╚══════════════════════════════════════════════════════════════╝
    """)
    
    scanner = SentinelleGeoScanner()
    
    try:
        await scanner.run()
    except KeyboardInterrupt:
        logger.info("\nArrêt...")
        scanner.stop()

if __name__ == "__main__":
    asyncio.run(main())
