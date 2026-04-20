import { getArticlesByCategory, categories } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';
import { siteConfig } from '@/lib/seo';

const categoryId = 'economie';
const cat = categories.find(c => c.id === categoryId)!;

const ACCENT  = '#059669';
const IMG_URL = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80&auto=format&fit=crop';
const IMG_POS = 'center 40%';
const DESC    = 'Marchés · Sanctions · Banques centrales · Commerce international';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata() {
  return {
    title: `${cat.name} | Sentinelle Pulse`,
    description: `Analyses économiques approfondies : sanctions, marchés financiers, intelligence économique, commerce international, banques centrales. Données chiffrées 2025-2026.`,
    keywords: ['économie mondiale', 'finance internationale', 'marchés financiers', 'intelligence économique', 'sanctions économiques', 'commerce international', 'banques centrales', 'géopolitique économique'],
    alternates: {
      canonical: `${siteConfig.url}/${categoryId}`,
    },
    openGraph: {
      title: `${cat.name} | Sentinelle Pulse`,
      description: `Analyses économiques approfondies : sanctions, marchés financiers, intelligence économique, commerce international.`,
      type: 'website' as const,
      images: [{ url: `${siteConfig.url}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${cat.name} | Sentinelle Pulse`,
      description: `Analyses économiques approfondies : sanctions, marchés financiers, intelligence économique.`,
      images: [`${siteConfig.url}/og-image.jpg`],
      creator: '@sentinellepulse',
    },
  };
}

export default async function CategoryPage() {
  const articles = getArticlesByCategory(categoryId);

  return (
    <>
      {/* ── Hero Banner ───────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '260px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_URL}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: IMG_POS,
          }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom,
            rgba(0,0,0,0.1) 0%,
            rgba(2,10,6,0.72) 55%,
            rgba(2,10,6,0.97) 100%)`,
        }} />
        {/* Left vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%)',
        }} />
        {/* Accent line bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: ACCENT,
          opacity: 0.75,
        }} />

        {/* Text */}
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 60, paddingBottom: 36 }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            color: ACCENT,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            03 — Sentinelle Pulse
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.97)',
            marginBottom: 12,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}>
            {cat.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', margin: 0 }}>
              {DESC}
            </p>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: ACCENT,
              background: `${ACCENT}1a`,
              border: `1px solid ${ACCENT}44`,
              padding: '3px 10px',
              borderRadius: 3,
            }}>
              {articles.length} analyse{articles.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── Articles grid ─────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        {articles.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>
            Aucun article dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </>
  );
}
