import { ImageResponse } from 'next/og';
import { getArticleById } from '@/lib/data';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const categoryColors: Record<string, string> = {
  economie:    '#059669',
  geopolitique:'#7C3AED',
  defense:     '#DC2626',
  osint:       '#0891B2',
};

const categoryBg: Record<string, string> = {
  economie:    'linear-gradient(135deg, #022c22, #064e3b, #047857)',
  geopolitique:'linear-gradient(135deg, #1e0a3c, #2e1065, #4c1d95)',
  defense:     'linear-gradient(135deg, #1c0202, #450a0a, #991b1b)',
  osint:       'linear-gradient(135deg, #020f1c, #082f49, #075985)',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // Default OG image for homepage / category pages
  if (!id) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
            fontFamily: 'serif',
          }}
        >
          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(196,30,58,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }} />

          {/* Glow */}
          <div style={{
            position: 'absolute', top: -100, right: -100,
            width: 500, height: 500, borderRadius: '50%',
            background: 'rgba(196,30,58,0.2)', filter: 'blur(100px)',
            display: 'flex',
          }} />

          {/* Logo mark */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 80, height: 80, borderRadius: 16,
            background: 'linear-gradient(135deg, #C41E3A, #8B0020)',
            marginBottom: 32, boxShadow: '0 0 40px rgba(196,30,58,0.5)',
          }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: 'white', display: 'flex' }}>SP</div>
          </div>

          <div style={{
            fontSize: 56, fontWeight: 900, color: 'white',
            letterSpacing: '0.15em', marginBottom: 8, display: 'flex',
          }}>
            SENTINELLE
          </div>
          <div style={{
            fontSize: 24, fontWeight: 300, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.5em', marginBottom: 40, display: 'flex',
          }}>
            PULSE
          </div>

          <div style={{
            fontSize: 18, color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.1em', display: 'flex',
          }}>
            INTELLIGENCE · GÉOPOLITIQUE · STRATÉGIE
          </div>

          {/* Bottom bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
            background: 'linear-gradient(90deg, #C41E3A, #7C3AED, #0891B2, #059669)',
            display: 'flex',
          }} />
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const article = getArticleById(id);
  if (!article) {
    return new Response('Not found', { status: 404 });
  }

  const color  = categoryColors[article.category] ?? '#C41E3A';
  const bgGrad = categoryBg[article.category]     ?? categoryBg.geopolitique;

  const titleWords = article.title.split(' ');
  const line1 = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
  const line2 = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          background: bgGrad,
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Dot grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          display: 'flex',
        }} />

        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 480, height: 480, borderRadius: '50%',
          background: color, opacity: 0.12, filter: 'blur(80px)',
          display: 'flex',
        }} />

        {/* Header bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '32px 48px', position: 'relative', zIndex: 1,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8,
              background: 'linear-gradient(135deg, #C41E3A, #8B0020)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: 'white', display: 'flex' }}>SP</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: 16, fontWeight: 800, letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.9)', display: 'flex',
              }}>
                SENTINELLE PULSE
              </div>
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em', display: 'flex',
              }}>
                Intelligence · Géopolitique
              </div>
            </div>
          </div>

          {/* Category badge */}
          <div style={{
            padding: '6px 16px', borderRadius: 4,
            border: `1px solid ${color}60`,
            background: 'rgba(255,255,255,0.06)',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
            color: color, textTransform: 'uppercase' as const,
            display: 'flex',
          }}>
            {article.category.toUpperCase()}
          </div>
        </div>

        {/* Title */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '0 48px 32px',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            fontSize: article.title.length > 60 ? 40 : 52,
            fontWeight: 800, color: 'rgba(255,255,255,0.96)',
            lineHeight: 1.15, letterSpacing: '-0.02em',
            display: 'flex', flexDirection: 'column',
          }}>
            <span style={{ display: 'flex' }}>{line1}</span>
            <span style={{ display: 'flex' }}>{line2}</span>
          </div>

          {/* Excerpt */}
          <div style={{
            marginTop: 24, fontSize: 20,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.5, display: 'flex',
            maxWidth: '85%',
          }}>
            {article.excerpt.substring(0, 120)}…
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 48px', borderTop: '1px solid rgba(255,255,255,0.08)',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            fontSize: 15, color: 'rgba(255,255,255,0.4)',
            display: 'flex', gap: 20,
          }}>
            <span style={{ display: 'flex' }}>✍ {article.author}</span>
            <span style={{ display: 'flex' }}>⏱ {article.readTime} min</span>
          </div>
          <div style={{
            fontSize: 14, fontWeight: 700,
            color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em',
            display: 'flex',
          }}>
            sentinelle-pulse.com
          </div>
        </div>

        {/* Bottom accent line */}
        <div style={{
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          display: 'flex',
        }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
