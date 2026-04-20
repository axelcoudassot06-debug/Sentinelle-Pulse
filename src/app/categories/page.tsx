import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Catégories — Sentinelle Pulse',
  description: 'Explorez les 4 piliers éditoriaux de Sentinelle Pulse : Géopolitique, Défense, Économie, OSINT.',
};

const CATS = [
  {
    id: 'geopolitique',
    label: 'Géopolitique',
    desc: 'Conflits, alliances, puissances et relations internationales',
    href: '/geopolitique',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg, #1e0a3c, #2e1065, #4c1d95)',
    num: '01',
  },
  {
    id: 'defense',
    label: 'Défense',
    desc: 'Armement, stratégie militaire, OTAN et sécurité nationale',
    href: '/defense',
    color: '#DC2626',
    bg: 'linear-gradient(135deg, #1c0202, #450a0a, #991b1b)',
    num: '02',
  },
  {
    id: 'economie',
    label: 'Économie',
    desc: 'Marchés, sanctions, politique monétaire et flux de capitaux',
    href: '/economie',
    color: '#059669',
    bg: 'linear-gradient(135deg, #022c22, #064e3b, #047857)',
    num: '03',
  },
  {
    id: 'osint',
    label: 'OSINT & Cyber',
    desc: 'Renseignement open-source, cybersécurité et intelligence numérique',
    href: '/osint',
    color: '#0891B2',
    bg: 'linear-gradient(135deg, #020f1c, #082f49, #075985)',
    num: '04',
  },
];

export default function CategoriesPage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'var(--accent-primary)',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Sentinelle Pulse
        </p>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 700,
          marginBottom: 8,
        }}>
          Catégories
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {articles.length} analyses réparties en 4 piliers éditoriaux
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {CATS.map(cat => {
          const count = articles.filter(a => a.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={cat.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: cat.bg,
                borderRadius: 14,
                padding: '28px 24px 22px',
                textDecoration: 'none',
                color: 'inherit',
                border: `1px solid ${cat.color}22`,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 160,
              }}
            >
              {/* Accent top bar */}
              <span style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 3,
                background: cat.color,
                opacity: 0.8,
              }} />

              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: `${cat.color}cc`,
                  marginBottom: 10,
                }}>
                  {cat.num} —
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}>
                  {cat.label}
                </h2>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.5,
                }}>
                  {cat.desc}
                </p>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                paddingTop: 14,
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: cat.color,
                  fontWeight: 700,
                }}>
                  {count} analyse{count !== 1 ? 's' : ''}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em',
                }}>
                  Accéder →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
