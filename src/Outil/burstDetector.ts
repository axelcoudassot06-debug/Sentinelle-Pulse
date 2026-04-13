import { ZoneId, BurstDetection } from './types';

interface TimeStampedPost {
  timestamp: number;
  text: string;
}

export class BurstDetector {
  private buffers: Map<ZoneId, TimeStampedPost[]> = new Map();
  private volumes10min: Map<ZoneId, number> = new Map();
  private baseline1h: Map<ZoneId, number> = new Map();
  private readonly maxBufferSize = 200;
  private readonly burstThreshold = 3.0;

  constructor() {
    const zones: ZoneId[] = ['sudan', 'gaza', 'ukraine', 'sahel', 'drc', 'myanmar', 'yemen', 'haiti'];
    for (const zone of zones) {
      this.buffers.set(zone, []);
      this.volumes10min.set(zone, 0);
      this.baseline1h.set(zone, 0.5);
    }
  }

  addPost(zone: ZoneId, text: string): BurstDetection {
    const now = Date.now();
    const buffer = this.buffers.get(zone) || [];
    
    buffer.push({ timestamp: now, text });
    
    if (buffer.length > this.maxBufferSize) {
      buffer.shift();
    }
    
    this.buffers.set(zone, buffer);
    
    const tenMinutesAgo = now - 600000;
    const recent = buffer.filter(p => p.timestamp > tenMinutesAgo);
    this.volumes10min.set(zone, recent.length);
    
    const oneHourAgo = now - 3600000;
    const hourData = buffer.filter(p => p.timestamp > oneHourAgo);
    const baseline = Math.max(hourData.length / 6, 0.5);
    this.baseline1h.set(zone, baseline);
    
    const ratio = this.volumes10min.get(zone)! / this.baseline1h.get(zone)!;
    const isBurst = ratio > this.burstThreshold;
    
    return {
      isBurst,
      ratio,
      volume10min: this.volumes10min.get(zone)!,
      baseline: this.baseline1h.get(zone)!
    };
  }

  getVolume(zone: ZoneId): number {
    return this.volumes10min.get(zone) || 0;
  }

  getRatio(zone: ZoneId): number {
    const vol = this.volumes10min.get(zone) || 0;
    const baseline = this.baseline1h.get(zone) || 1;
    return vol / baseline;
  }

  reset(zone?: ZoneId): void {
    if (zone) {
      this.buffers.set(zone, []);
      this.volumes10min.set(zone, 0);
      this.baseline1h.set(zone, 0.5);
    } else {
      const zones: ZoneId[] = ['sudan', 'gaza', 'ukraine', 'sahel', 'drc', 'myanmar', 'yemen', 'haiti'];
      for (const z of zones) {
        this.buffers.set(z, []);
        this.volumes10min.set(z, 0);
        this.baseline1h.set(z, 0.5);
      }
    }
  }
}
