'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AlertTriangle, Activity, Radio, Shield, Clock, MapPin, Filter, Play, Pause, RefreshCw, Zap, Target, TrendingUp, ExternalLink, Globe, Rss, MessageCircle, Twitter, Database } from 'lucide-react';
import { Alert, ZoneId, ConfidenceLevel, FeedItem, DashboardStats, SourceFilter } from './types';
import { scorePost, extractGeoloc, getAllZones, ZONES } from './keywords';
import { BurstDetector } from './burstDetector';
import styles from './SentinellePulse.module.css';
import sourcesData from './sources.json';

type SourceType = 'social' | 'press';

const SOCIAL_SOURCES = ['X/Twitter', 'Telegram', 'Facebook', 'Instagram', 'TikTok', 'YouTube', 'Discord', 'Reddit', 'OSINT'];

function getSourceType(source: string): SourceType {
  const lowerSource = source.toLowerCase();
  for (const social of SOCIAL_SOURCES) {
    if (lowerSource.includes(social.toLowerCase())) return 'social';
  }
  return 'press';
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function padZero(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
}

function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  
  if (diffMin < 1) return 'À l\'instant';
  if (diffMin < 60) return `Il y a ${diffMin}min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH}h`;
  return `Il y a ${diffH / 24 | 0}j`;
}

function getConfidenceColor(confidence: ConfidenceLevel): string {
  switch (confidence) {
    case 'CRITICAL': return 'var(--alert-critical)';
    case 'HIGH': return 'var(--alert-high)';
    case 'MEDIUM': return 'var(--alert-medium)';
    default: return 'var(--alert-low)';
  }
}

function getConfidenceBgColor(confidence: ConfidenceLevel): string {
  switch (confidence) {
    case 'CRITICAL': return 'var(--alert-critical-bg)';
    case 'HIGH': return 'var(--alert-high-bg)';
    case 'MEDIUM': return 'var(--alert-medium-bg)';
    default: return 'var(--alert-low-bg)';
  }
}

interface RealFeedItem {
  id: string;
  text: string;
  source: string;
  url: string;
  timestamp: string;
  sourceType: SourceType;
  zone?: ZoneId;
}

async function fetchRealFeeds(): Promise<Alert[]> {
  try {
    const response = await fetch('/api/feed');
    const data = await response.json();
    
    if (data.success && data.items) {
      if (data.source === 'database') {
        return data.items.map((item: any) => ({
          id: item.id || generateId(),
          timestamp: item.timestamp,
          zone: item.zone as ZoneId,
          score: item.score || 5,
          text: item.text,
          source: item.source,
          url: item.url,
          confidence: (item.confidence || 'MEDIUM') as ConfidenceLevel,
          status: 'pending' as const,
          geoloc: '',
          burstRatio: 1.0,
          triggers: [],
          sourceType: 'social' as const
        }));
      }
      
      return data.items.map((item: any) => ({
        ...item,
        sourceType: 'press' as SourceType,
        zone: item.zone || 'sudan'
      }));
    }
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
  }
  return [];
}

export default function SentinellePulse() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [realFeeds, setRealFeeds] = useState<Alert[]>([]);
  const [lastFetch, setLastFetch] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<ZoneId | 'all'>('all');
  const [selectedConfidence, setSelectedConfidence] = useState<ConfidenceLevel | 'all'>('all');
  const [selectedSource, setSelectedSource] = useState<SourceFilter>('all');
  const [dataSource, setDataSource] = useState<'database' | 'rss'>('rss');
  const [stats, setStats] = useState<DashboardStats>({
    totalAlerts: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    hotZone: null,
    averageScore: 0
  });
  const [zoneVolumes, setZoneVolumes] = useState<Map<ZoneId, number>>(new Map());
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLastUpdate(new Date().toISOString());
  }, []);
  
  const burstDetectorRef = useRef(new BurstDetector());
  const simulationRef = useRef<NodeJS.Timeout | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const processPost = useCallback((post: FeedItem): Alert | null => {
    const scoring = scorePost(post.text, post.zone);
    if (scoring.score < 6) return null;
    
    const burst = burstDetectorRef.current.addPost(post.zone, post.text);
    const burstBonus = burst.isBurst ? 10 : 0;
    const totalScore = scoring.score + burstBonus;
    
    if (totalScore < 8) return null;
    
    let confidence: ConfidenceLevel;
    if (totalScore >= 18) confidence = 'CRITICAL';
    else if (totalScore >= 12) confidence = 'HIGH';
    else if (totalScore >= 8) confidence = 'MEDIUM';
    else confidence = 'LOW';
    
    const alert: Alert = {
      id: generateId(),
      timestamp: post.timestamp,
      zone: post.zone,
      score: totalScore,
      text: post.text,
      source: post.source,
      url: post.url,
      confidence,
      status: 'pending',
      geoloc: extractGeoloc(post.text, post.zone),
      burstRatio: burst.ratio,
      triggers: scoring.triggers,
      sourceType: post.sourceType || 'social'
    };
    
    return alert;
  }, []);

  const fetchFeeds = useCallback(async () => {
    setIsLoading(true);
    const feeds = await fetchRealFeeds();
    setRealFeeds(feeds);
    setLastFetch(new Date().toISOString());
    setIsLoading(false);
    return feeds;
  }, []);

  const loadFromDatabase = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/feed');
      const data = await response.json();
      
      if (data.success && data.items) {
        setDataSource(data.source || 'rss');
        
        const alerts: Alert[] = data.items.map((item: any) => ({
          id: item.id || generateId(),
          timestamp: item.timestamp,
          zone: item.zone as ZoneId,
          score: item.score || 5,
          text: item.text,
          source: item.source,
          url: item.url,
          confidence: (item.confidence || 'MEDIUM') as ConfidenceLevel,
          status: 'pending' as const,
          geoloc: '',
          burstRatio: 1.0,
          triggers: [],
          sourceType: 'social' as const
        }));
        
        setAlerts(alerts);
        setLastUpdate(new Date().toISOString());
        setLastFetch(new Date().toISOString());
      }
    } catch (error) {
      console.error('Failed to load from database:', error);
    }
    setIsLoading(false);
  }, []);

  const runSimulation = useCallback(async () => {
    if (realFeeds.length === 0) {
      await fetchFeeds();
    }
    
    const newAlerts: Alert[] = [];
    
    for (const post of realFeeds) {
      const alert = processPost(post as FeedItem);
      if (alert) {
        newAlerts.push(alert);
      }
    }
    
    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 49));
      setLastUpdate(new Date().toISOString());
    }
    
    const volumes = new Map<ZoneId, number>();
    const zones: ZoneId[] = ['sudan', 'gaza', 'ukraine', 'sahel', 'drc', 'myanmar', 'yemen', 'haiti'];
    for (const zone of zones) {
      volumes.set(zone, burstDetectorRef.current.getVolume(zone));
    }
    setZoneVolumes(volumes);
  }, [processPost, realFeeds, fetchFeeds]);

  const startSimulation = useCallback(() => {
    if (simulationRef.current) return;
    setIsRunning(true);
    simulationRef.current = setInterval(runSimulation, 2000);
  }, [runSimulation]);

  const stopSimulation = useCallback(() => {
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
    burstDetectorRef.current.reset();
    setZoneVolumes(new Map());
  }, []);

  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const filtered = alerts.filter(alert => {
      if (selectedZone !== 'all' && alert.zone !== selectedZone) return false;
      if (selectedConfidence !== 'all' && alert.confidence !== selectedConfidence) return false;
      if (selectedSource !== 'all' && alert.sourceType !== selectedSource) return false;
      return true;
    });
    
    const criticalCount = filtered.filter(a => a.confidence === 'CRITICAL').length;
    const highCount = filtered.filter(a => a.confidence === 'HIGH').length;
    const mediumCount = filtered.filter(a => a.confidence === 'MEDIUM').length;
    
    const zoneCounts = new Map<ZoneId, number>();
    for (const alert of filtered) {
      zoneCounts.set(alert.zone, (zoneCounts.get(alert.zone) || 0) + 1);
    }
    
    let hotZone: ZoneId | null = null;
    let maxCount = 0;
    for (const [zone, count] of zoneCounts) {
      if (count > maxCount) {
        maxCount = count;
        hotZone = zone;
      }
    }
    
    const avgScore = filtered.length > 0 
      ? filtered.reduce((sum, a) => sum + a.score, 0) / filtered.length 
      : 0;
    
    setStats({
      totalAlerts: filtered.length,
      criticalCount,
      highCount,
      mediumCount,
      hotZone,
      averageScore: Math.round(avgScore * 10) / 10
    });
  }, [alerts, selectedZone, selectedConfidence]);

  const filteredAlerts = alerts.filter(alert => {
    if (selectedZone !== 'all' && alert.zone !== selectedZone) return false;
    if (selectedConfidence !== 'all' && alert.confidence !== selectedConfidence) return false;
    if (selectedSource !== 'all' && alert.sourceType !== selectedSource) return false;
    return true;
  });

  const zones = getAllZones();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Shield className={styles.logoIcon} />
            <div>
              <h1>Sentinelle Pulse</h1>
              <p className={styles.subtitle}>Veille Conflits Temps Réel</p>
            </div>
          </div>
          <div className={styles.status}>
            <div className={styles.statusIndicator}>
              <Radio className={`${styles.pulseIcon} ${isRunning ? styles.active : ''}`} />
              <span>{isRunning ? 'En surveillance' : 'En pause'}</span>
              {isLoading && <span className={styles.loadingBadge}>Chargement...</span>}
            </div>
            <div className={styles.lastUpdate}>
              <Clock size={14} />
              <span>{formatTime(lastUpdate)}</span>
            </div>
            {lastFetch && (
              <div className={styles.lastFetch}>
                <Rss size={14} />
                <span>RSS: {formatTime(lastFetch)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.totalAlerts}</div>
          <div className={styles.statLabel}>Alertes 24h</div>
        </div>
        <div className={`${styles.stat} ${styles.critical}`}>
          <div className={styles.statValue}>{stats.criticalCount}</div>
          <div className={styles.statLabel}>Critiques</div>
        </div>
        <div className={`${styles.stat} ${styles.high}`}>
          <div className={styles.statValue}>{stats.highCount}</div>
          <div className={styles.statLabel}>Hautes</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.mediumCount}</div>
          <div className={styles.statLabel}>Moyennes</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>
            {stats.hotZone ? `${ZONES[stats.hotZone].flag} ${ZONES[stats.hotZone].name}` : '-'}
          </div>
          <div className={styles.statLabel}>Zone chaude</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.averageScore || '-'}</div>
          <div className={styles.statLabel}>Score moyen</div>
        </div>
      </div>

      <div className={styles.main}>
        <aside className={styles.sidebar}>
          <div className={styles.controls}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => {
                if (isRunning) {
                  stopSimulation();
                } else {
                  loadFromDatabase();
                }
              }}
            >
              {isLoading ? <RefreshCw size={18} className={styles.spinning} /> : isRunning ? <Pause size={18} /> : <Database size={18} />}
              {isRunning ? 'Arrêter' : 'Charger DB'}
            </button>
            <button className={styles.btn} onClick={clearAlerts}>
              <RefreshCw size={18} />
              Reset
            </button>
          </div>
          
          <div className={styles.realSources}>
            <h3>
              <Globe size={16} />
              Sources Réelles
            </h3>
            <div className={styles.sourceCount}>
              <span className={styles.sourceIcon}><MessageCircle size={14} /></span>
              <span>Telegram: {Object.values(sourcesData.telegram).flat().flat().length} channels</span>
            </div>
            <div className={styles.sourceCount}>
              <span className={styles.sourceIcon}><Twitter size={14} /></span>
              <span>X/Twitter: {sourcesData.twitter.sudan.length + sourcesData.twitter.gaza.length + sourcesData.twitter.ukraine.length} comptes</span>
            </div>
            <div className={styles.sourceCount}>
              <span className={styles.sourceIcon}><Rss size={14} /></span>
              <span>RSS: {sourcesData.rss.length} flux</span>
            </div>
            <button className={styles.btn} onClick={fetchFeeds} disabled={isLoading}>
              <Rss size={16} />
              Actualiser RSS
            </button>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterHeader}>
              <Filter size={16} />
              <span>Filtres</span>
            </div>
            <div className={styles.filterGroup}>
              <label>Zone</label>
              <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value as ZoneId | 'all')}>
                <option value="all">Toutes les zones</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.id}>
                    {zone.flag} {zone.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Confiance</label>
              <select value={selectedConfidence} onChange={(e) => setSelectedConfidence(e.target.value as ConfidenceLevel | 'all')}>
                <option value="all">Tous</option>
                <option value="CRITICAL">Critique</option>
                <option value="HIGH">Haute</option>
                <option value="MEDIUM">Moyenne</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Sources</label>
              <select value={selectedSource} onChange={(e) => setSelectedSource(e.target.value as SourceFilter)}>
                <option value="social">🌐 Réseaux sociaux (OSINT)</option>
                <option value="all">📰 Tous</option>
                <option value="press">📺 Presse</option>
              </select>
            </div>
          </div>

          <div className={styles.zonesMonitor}>
            <h3>
              <Activity size={16} />
              Zones
            </h3>
            <div className={styles.zonesList}>
              {zones.map(zone => (
                <div key={zone.id} className={styles.zoneItem}>
                  <div className={styles.zoneInfo}>
                    <span className={styles.zoneFlag}>{zone.flag}</span>
                    <span className={styles.zoneName}>{zone.name}</span>
                  </div>
                  <div className={styles.zoneStats}>
                    <span className={styles.volumeBadge}>
                      {zoneVolumes.get(zone.id) || 0}
                    </span>
                    <div className={styles.burstBar}>
                      <div 
                        className={styles.burstFill}
                        style={{ 
                          width: `${Math.min((burstDetectorRef.current.getRatio(zone.id) / 3) * 100, 100)}%`,
                          backgroundColor: zone.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.legend}>
            <h4>Légende</h4>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: 'var(--alert-critical)' }} />
              <span>CRITIQUE (score ≥15)</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: 'var(--alert-high)' }} />
              <span>HAUTE (score 10-14)</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: 'var(--alert-medium)' }} />
              <span>MOYENNE (score 8-9)</span>
            </div>
          </div>
        </aside>

        <main className={styles.feed} ref={feedRef}>
          <div className={styles.feedHeader}>
            <h2>
              <Zap size={20} />
              Flux d'alertes
            </h2>
            <span className={styles.feedCount}>{filteredAlerts.length} alertes</span>
          </div>
          
          {filteredAlerts.length === 0 ? (
            <div className={styles.emptyState}>
              <Database size={48} />
              <h3>Scanner actif</h3>
              <p>
                {isLoading 
                  ? 'Chargement des alertes depuis la base de données...'
                  : 'Cliquez sur "Charger DB" pour afficher les alertes du scanner Telegram'}
              </p>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={loadFromDatabase}>
                <Database size={18} />
                Charger alertes
              </button>
              <div className={styles.monitoredAccounts}>
                <h4>📱 Scanner Telegram actif :</h4>
                <div className={styles.accountGroup}>
                  <strong>🇸🇩 Soudan:</strong>
                  <span>@RSFSudan, @AlFasherNow</span>
                </div>
                <div className={styles.accountGroup}>
                  <strong>🇺🇦 Ukraine:</strong>
                  <span>@rybar, @wartranslated</span>
                </div>
                <p className={styles.scannerStatus}>
                  💡 Le scanner Python tourne en arrière-plan<br/>
                  Scan toutes les 60 secondes
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.alertsList}>
              {filteredAlerts.map((alert, index) => (
                <div 
                  key={alert.id} 
                  className={styles.alertCard}
                  style={{ 
                    borderLeftColor: getConfidenceColor(alert.confidence),
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className={styles.alertHeader}>
                    <div className={styles.alertMeta}>
                      <span className={styles.alertZone}>
                        {ZONES[alert.zone].flag} {ZONES[alert.zone].name}
                      </span>
                      <span 
                        className={`${styles.sourceTypeBadge} ${styles.socialBadge}`}
                      >
                        {(alert as any).platform === 'twitter' ? '🐦 Twitter' : '📱 Telegram'}
                      </span>
                      <span 
                        className={styles.alertConfidence}
                        style={{ 
                          backgroundColor: getConfidenceBgColor(alert.confidence),
                          color: getConfidenceColor(alert.confidence)
                        }}
                      >
                        {alert.confidence}
                      </span>
                      {alert.burstRatio > 3 && (
                        <span className={styles.burstBadge}>
                          <TrendingUp size={12} />
                          Burst x{alert.burstRatio.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className={styles.alertTime}>
                      <Clock size={12} />
                      {mounted ? formatTimeAgo(alert.timestamp) : formatTime(alert.timestamp)}
                    </div>
                  </div>
                  
                  <p className={styles.alertText}>{alert.text}</p>
                  
                  <div className={styles.alertFooter}>
                    <div className={styles.alertSources}>
                      <a 
                        href={alert.url !== '#' ? alert.url : `https://www.google.com/search?q=${encodeURIComponent(alert.text.substring(0, 50))}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.sourceLink}
                      >
                        <span className={styles.source}>{alert.source}</span>
                        <ExternalLink size={12} />
                      </a>
                      {alert.geoloc && (
                        <span className={styles.geoloc}>
                          <MapPin size={12} />
                          {alert.geoloc}
                        </span>
                      )}
                    </div>
                    <div className={styles.alertActions}>
                      <a 
                        href={alert.url !== '#' ? alert.url : `https://www.google.com/search?q=${encodeURIComponent(alert.text.substring(0, 50))}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.verifyBtn}
                      >
                        Vérifier
                        <ExternalLink size={12} />
                      </a>
                      <div className={styles.alertScore}>
                        <span className={styles.scoreValue}>{alert.score}</span>
                        <span className={styles.scoreLabel}>pts</span>
                      </div>
                    </div>
                  </div>
                  
                  {alert.triggers.length > 0 && (
                    <div className={styles.triggers}>
                      {alert.triggers.slice(0, 5).map((trigger, i) => (
                        <span key={i} className={styles.trigger}>{trigger}</span>
                      ))}
                      {alert.triggers.length > 5 && (
                        <span className={styles.triggerMore}>+{alert.triggers.length - 5}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
