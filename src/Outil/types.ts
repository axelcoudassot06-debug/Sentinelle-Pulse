export type ConfidenceLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type AlertStatus = 'pending' | 'reviewed' | 'confirmed' | 'false_positive';
export type ZoneId = 'sudan' | 'gaza' | 'ukraine' | 'sahel' | 'drc' | 'myanmar' | 'yemen' | 'haiti';

export interface Alert {
  id: string;
  timestamp: string;
  zone: ZoneId;
  score: number;
  text: string;
  source: string;
  url: string;
  confidence: ConfidenceLevel;
  status: AlertStatus;
  geoloc: string;
  burstRatio: number;
  triggers: string[];
  sourceType: 'social' | 'press';
}

export interface Zone {
  id: ZoneId;
  name: string;
  flag: string;
  keywords: {
    strong: string[];
    medium: string[];
    weak: string[];
    negative: string[];
    boost: string[];
  };
  cities: string[];
  color: string;
}

export interface ScoringResult {
  score: number;
  triggers: string[];
  confidence: ConfidenceLevel;
}

export interface BurstDetection {
  isBurst: boolean;
  ratio: number;
  volume10min: number;
  baseline: number;
}

export interface DashboardStats {
  totalAlerts: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  hotZone: ZoneId | null;
  averageScore: number;
}

export interface FeedItem {
  id: string;
  text: string;
  source: string;
  url: string;
  timestamp: string;
  zone: ZoneId;
  sourceType?: 'social' | 'press';
}

export type SourceFilter = 'all' | 'social' | 'press';
