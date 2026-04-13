'use client';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  LineChart, Line, Area, AreaChart,
} from 'recharts';
import { ArticleChart, KPI } from '@/lib/chartData';
import { TrendingUp, TrendingDown, Minus, Clock, MapPin } from 'lucide-react';

// ── KPI Dashboard ──────────────────────────────────────────────────────
function KPICard({ kpi }: { kpi: KPI }) {
  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
  const trendColor = kpi.trend === 'up' ? '#10b981' : kpi.trend === 'down' ? '#ef4444' : '#6b7280';

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: 3, background: trendColor, opacity: 0.8,
        borderRadius: '0 12px 12px 0',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <TrendIcon size={13} color={trendColor} />
        <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)' }}>
          {kpi.label}
        </span>
      </div>
      <div style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: '#f1f5f9', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {kpi.value}
      </div>
      {kpi.sub && (
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>
          {kpi.sub}
        </div>
      )}
    </div>
  );
}

// ── Bar Chart ──────────────────────────────────────────────────────────
function ArticleBarChart({ data }: { data: NonNullable<ArticleChart['barChart']> }) {
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; flag?: string }; value: number }> }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
      <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px' }}>
        <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.875rem' }}>
          {d.payload.flag} {d.payload.label}
        </div>
        <div style={{ color: '#10b981', fontWeight: 700, fontSize: '1.125rem', marginTop: 2 }}>
          {d.value} {data.unit}
        </div>
      </div>
    );
  };

  return (
    <div style={{ margin: '40px 0' }}>
      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 3, height: 14, background: '#DC2626', borderRadius: 2, display: 'inline-block' }} />
        {data.title}
      </h4>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data.data} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            interval={0}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          {data.unit.includes('%') && <ReferenceLine y={3.5} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Objectif 3,5%', fill: '#f59e0b', fontSize: 10 }} />}
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color ?? '#DC2626'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Line / Area Chart ──────────────────────────────────────────────────
function ArticleLineChart({ data }: { data: NonNullable<ArticleChart['lineChart']> }) {
  return (
    <div style={{ margin: '40px 0' }}>
      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 3, height: 14, background: '#059669', borderRadius: 2, display: 'inline-block' }} />
        {data.title}
      </h4>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data.data} margin={{ top: 5, right: 20, bottom: 5, left: 30 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="year" tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => v.toLocaleString('fr-FR')} />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
            labelStyle={{ color: '#f1f5f9', fontWeight: 600 }}
            itemStyle={{ color: '#10b981' }}
            formatter={(v) => [`${Number(v).toLocaleString('fr-FR')} ${data.unit}`, ''] as [string, string]}
          />
          <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={2.5} fill="url(#lineGrad)" dot={{ fill: '#059669', r: 4 }} activeDot={{ r: 6 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────
function ArticleTimeline({ data }: { data: NonNullable<ArticleChart['timeline']> }) {
  const typeConfig = {
    milestone: { color: '#7C3AED', icon: '⬡' },
    event:     { color: '#0891B2', icon: '◆' },
    warning:   { color: '#DC2626', icon: '▲' },
  };

  return (
    <div style={{ margin: '40px 0' }}>
      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Clock size={13} color="#6b7280" />
        {data.title}
      </h4>
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: 'linear-gradient(to bottom, #7C3AED, rgba(124,58,237,0.1))', borderRadius: 2 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {data.events.map((evt, i) => {
            const cfg = typeConfig[evt.type ?? 'event'];
            return (
              <div key={i} style={{ display: 'flex', gap: 20, position: 'relative', paddingBottom: 28 }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: -21, top: 3,
                  width: 16, height: 16, borderRadius: '50%',
                  background: cfg.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, color: 'white', flexShrink: 0,
                  boxShadow: `0 0 10px ${cfg.color}60`,
                }}>•</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                      {evt.date}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0' }}>
                      {evt.title}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                    {evt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Map placeholder ────────────────────────────────────────────────────
function ArticleMap({ regions, title }: { regions: string[]; title: string }) {
  return (
    <div style={{
      margin: '40px 0',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '24px',
    }}>
      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <MapPin size={13} color="#6b7280" />
        {title}
      </h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {regions.map(r => (
          <span key={r} style={{
            padding: '4px 12px', borderRadius: 4,
            background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)',
            color: '#fca5a5', fontSize: '0.75rem', fontWeight: 600,
            fontFamily: 'var(--font-mono)',
          }}>{r}</span>
        ))}
      </div>
      <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: 12, margin: '12px 0 0' }}>
        Zones de friction stratégique analysées dans cet article
      </p>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────
export default function ArticleCharts({ chart }: { chart: ArticleChart }) {
  return (
    <div className="article-charts" style={{ color: '#e2e8f0' }}>
      {/* KPI Dashboard */}
      {chart.kpis && chart.kpis.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
          gap: 12,
          margin: '32px 0 40px',
        }}>
          {chart.kpis.map((kpi, i) => <KPICard key={i} kpi={kpi} />)}
        </div>
      )}

      {/* Bar Chart */}
      {chart.barChart && <ArticleBarChart data={chart.barChart} />}

      {/* Line Chart */}
      {chart.lineChart && <ArticleLineChart data={chart.lineChart} />}

      {/* Timeline */}
      {chart.timeline && <ArticleTimeline data={chart.timeline} />}

      {/* Map */}
      {chart.mapRegions && chart.mapTitle && (
        <ArticleMap regions={chart.mapRegions} title={chart.mapTitle} />
      )}
    </div>
  );
}
