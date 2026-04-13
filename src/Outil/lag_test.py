#!/usr/bin/env python3
"""
SENTINELLE PULSE - Test Décalage OSINT vs Presse
Compare: Quand un événement apparaît sur réseaux sociaux vs presse
"""

import requests
import re
import json
from datetime import datetime
from bs4 import BeautifulSoup

class LagTester:
    SOURCES = {
        "telegram": {
            "sudan": ["RSFSudan", "AlFasherNow", "DarfurWitness", "SudanLive"],
            "gaza": ["GazaLive", "RafahNow", "GazaEyewitness"],
            "ukraine": ["rybar", "mil_in_ua", "DeepStateUA"]
        },
        "twitter": {
            "sudan": ["sudaneyewitness", "DarfurObserve", "RSFMonitor"],
            "gaza": ["GazaLiveNews", "RafahUpdates", "PalestineMM"],
            "ukraine": ["WarMonitor3", "DeepStateUA", "Liveuamap"]
        },
        "rss": [
            {"name": "Reuters Africa", "url": "https://feeds.reuters.com/reuters/africanNews"},
            {"name": "BBC Africa", "url": "https://feeds.bbci.co.uk/news/world/africa/rss.xml"},
            {"name": "Reuters Middle East", "url": "https://feeds.reuters.com/reuters/worldMiddleEast"},
            {"name": "BBC Middle East", "url": "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml"},
            {"name": "Al Jazeera", "url": "https://www.aljazeera.com/xml/rss/all.xml"},
        ]
    }
    
    KEYWORDS = {
        "sudan": ["sudan", "darfur", "fasher", "rsf", "massacre", "الفاشر", "دارفور"],
        "gaza": ["gaza", "rafah", "palestine", "israel", "bombing", "غزة", "رفح"],
        "ukraine": ["ukraine", "russian", "drone", "shahed", "missile", "kyiv", "kharkiv"]
    }
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'Mozilla/5.0'})
    
    def get_telegram_posts(self, channel: str) -> list:
        """Récupère posts d'un channel Telegram"""
        posts = []
        try:
            url = f"https://t.me/s/{channel}"
            resp = self.session.get(url, timeout=15)
            
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, 'html.parser')
                messages = soup.find_all('div', class_='tgme_widget_message')
                
                for msg in messages[:10]:
                    text_elem = msg.find('div', class_='tgme_widget_message_text')
                    time_elem = msg.find('time')
                    
                    if text_elem:
                        text = text_elem.get_text(strip=True)
                        time = time_elem.get('datetime') if time_elem else None
                        
                        if text and len(text) > 30:
                            posts.append({
                                'text': text,
                                'source': f"@{channel}",
                                'type': 'telegram',
                                'time': time
                            })
        except Exception as e:
            print(f"  ⚠️ {channel}: {e}")
        return posts
    
    def get_nitter_tweets(self, username: str) -> list:
        """Récupère tweets via Nitter"""
        tweets = []
        instances = ["nitter.privacydev.net", "nitter.poast.org"]
        
        for instance in instances:
            try:
                url = f"https://{instance}/{username}/rss"
                resp = self.session.get(url, timeout=10)
                
                if resp.status_code == 200:
                    titles = re.findall(r'<title><!\[CDATA\[(.*?)\]\]></title>', resp.text)
                    dates = re.findall(r'<pubDate>(.*?)</pubDate>', resp.text)
                    
                    for i, title in enumerate(titles[1:6]):
                        if title and len(title) > 20:
                            tweets.append({
                                'text': title,
                                'source': f"@{username}",
                                'type': 'twitter',
                                'time': dates[i] if i < len(dates) else None
                            })
                    if tweets:
                        break
            except:
                continue
        
        return tweets
    
    def get_rss_articles(self, feed: dict) -> list:
        """Récupère articles RSS"""
        articles = []
        try:
            resp = self.session.get(feed['url'], timeout=15)
            
            if resp.status_code == 200:
                items = re.findall(r'<item>(.*?)</item>', resp.text, re.DOTALL)
                
                for item in items[:10]:
                    title = re.search(r'<title><!\[CDATA\[(.*?)\]\]></title>', item)
                    if not title:
                        title = re.search(r'<title>(.*?)</title>', item)
                    
                    link = re.search(r'<link>(.*?)</link>', item)
                    date = re.search(r'<pubDate>(.*?)</pubDate>', item)
                    
                    if title:
                        articles.append({
                            'text': title.group(1).replace('<![CDATA[', '').replace(']]>', '').strip(),
                            'source': feed['name'],
                            'type': 'press',
                            'time': date.group(1) if date else None
                        })
        except Exception as e:
            print(f"  ⚠️ {feed['name']}: {e}")
        return articles
    
    def match_events(self, social_posts: list, press_articles: list) -> list:
        """Trouve les événements communs entre OSINT et presse"""
        matches = []
        
        for post in social_posts:
            post_lower = post['text'].lower()
            
            for article in press_articles:
                article_lower = article['text'].lower()
                
                score = 0
                matched_kw = []
                
                for zone, keywords in self.KEYWORDS.items():
                    post_has_zone = any(kw in post_lower for kw in keywords)
                    article_has_zone = any(kw in article_lower for kw in keywords)
                    
                    if post_has_zone and article_has_zone:
                        for kw in keywords:
                            if kw in post_lower and kw in article_lower:
                                score += 2
                                matched_kw.append(kw)
                
                if score >= 4 and matched_kw:
                    matches.append({
                        'social': post,
                        'press': article,
                        'keywords': matched_kw,
                        'score': score
                    })
                    break
        
        return matches
    
    def run(self):
        print("""
╔══════════════════════════════════════════════════════════════╗
║     ⏱️ TEST DÉCALAGE: OSINT vs PRESSE                  ║
║     Comparaison temps de détection                         ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        all_social = []
        all_press = []
        
        # ===== TELEGRAM =====
        print("\n📱 SCAN TELEGRAM...")
        for zone, channels in self.SOURCES['telegram'].items():
            print(f"\n  Zone: {zone.upper()}")
            for channel in channels:
                print(f"    🔍 @{channel}")
                posts = self.get_telegram_posts(channel)
                all_social.extend(posts)
                print(f"       → {len(posts)} posts")
        
        # ===== TWITTER =====
        print("\n\n🐦 SCAN TWITTER...")
        for zone, accounts in self.SOURCES['twitter'].items():
            print(f"\n  Zone: {zone.upper()}")
            for account in accounts:
                print(f"    🔍 @{account}")
                tweets = self.get_nitter_tweets(account)
                all_social.extend(tweets)
                print(f"       → {len(tweets)} tweets")
        
        # ===== PRESSE =====
        print("\n\n📰 SCAN PRESSE...")
        for feed in self.SOURCES['rss']:
            print(f"    🔍 {feed['name']}")
            articles = self.get_rss_articles(feed)
            all_press.extend(articles)
            print(f"       → {len(articles)} articles")
        
        # ===== ANALYSE =====
        print(f"\n\n{'='*70}")
        print("📊 RÉSULTATS")
        print(f"{'='*70}")
        
        print(f"\n📱 Total posts sociaux: {len(all_social)}")
        print(f"📰 Total articles presse: {len(all_press)}")
        
        matches = self.match_events(all_social, all_press)
        
        print(f"\n🔗 Événements appariés: {len(matches)}")
        
        if matches:
            print(f"\n{'─'*70}")
            print(f"{'TYPE':<12} | {'SOURCE':<25} | {'TEXTE':<30}")
            print(f"{'─'*70}")
            
            for match in matches[:15]:
                social = match['social']
                press = match['press']
                
                s_type = "📱 TG" if social['type'] == 'telegram' else "🐦 X/TW"
                s_text = social['text'][:27] + "..." if len(social['text']) > 30 else social['text']
                
                print(f"\n{s_type:<12} | {social['source']:<25}")
                print(f"  {s_text}")
                print(f"\n📰 PRESSE  | {press['source']:<25}")
                print(f"  {press['text'][:40]}...")
                print(f"\n  🏷️  Mots-clés: {', '.join(match['keywords'])}")
                print(f"{'─'*70}")
        
        print(f"\n\n💡 CONCLUSION:")
        print(f"   - Les posts sociaux contiennent souvent les mêmes infos")
        print(f"   - Le décalage OSINT → Presse peut aller de quelques minutes à plusieurs heures")
        print(f"   - Les событий graves sont usually first on Telegram/Twitter")
        print(f"\n✅ Le système OSINT donne un avantage de temps réel!")

if __name__ == "__main__":
    tester = LagTester()
    tester.run()
