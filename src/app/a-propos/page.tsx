import type { Metadata } from 'next';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'À propos | Sentinelle Pulse',
  description: 'Découvrez Sentinelle Pulse, votre source d\'analyse stratégique sur l\'économie, la géopolitique, la défense et l\'OSINT. Fondé par Axel Coudassot-Berduou.',
  alternates: {
    canonical: `${siteConfig.url}/a-propos`,
  },
};

export default function AboutPage() {
  return (
    <div className="container" style={{ maxWidth: '800px', padding: '48px 24px' }}>
      <h1 style={{ 
        fontSize: 'clamp(2rem, 5vw, 3rem)', 
        marginBottom: '16px',
        lineHeight: 1.2
      }}>
        À propos de Sentinelle Pulse
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: 'var(--text-secondary)',
        marginBottom: '48px',
        lineHeight: 1.6
      }}>
        Votre source d'analyse stratégique sur l'économie, la géopolitique, la défense et l'OSINT.
      </p>

      <div style={{ 
        background: 'var(--surface)', 
        borderRadius: '16px', 
        padding: '32px',
        marginBottom: '48px',
        border: '1px solid var(--border)'
      }}>
        <h2 style={{ marginBottom: '24px' }}>Le fondateur</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'var(--accent-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            AC
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ marginBottom: '8px' }}>Axel Coudassot-Berduou</h3>
            <p style={{ 
              color: 'var(--accent-primary)', 
              fontWeight: 600, 
              marginBottom: '16px' 
            }}>
              Fondateur & Directeur
            </p>
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6 
            }}>
              Analyste indépendant spécialisé dans les enjeux stratégiques. 
              Sentinelle Pulse est né d'une conviction : décrypter les dynamiques 
              mondiales pour mieux les comprendre.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Notre mission</h2>
        <p style={{ 
          fontSize: '1.125rem', 
          lineHeight: 1.8, 
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}>
          Sentinelle Pulse est un média d'analyse stratégique qui couvre quatre piliers fondamentaux :
        </p>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { 
              title: 'Économie', 
              desc: 'Analyse des marchés, des politiques monétaires et des tendances économiques mondiales.',
              color: '#059669'
            },
            { 
              title: 'Géopolitique', 
              desc: 'Suivi des relations internationales, des conflits et des alliances stratégiques.',
              color: '#7C3AED'
            },
            { 
              title: 'Défense', 
              desc: 'Couverture des questions de sécurité, de défense et des capacités militaires.',
              color: '#DC2626'
            },
            { 
              title: 'OSINT', 
              desc: 'Renseignement en sources ouvertes et analyse des données publiques.',
              color: '#0891B2'
            }
          ].map((item) => (
            <div key={item.title} style={{
              padding: '20px',
              background: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              borderLeft: `4px solid ${item.color}`
            }}>
              <h3 style={{ 
                color: item.color, 
                marginBottom: '8px',
                fontSize: '1.125rem'
              }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        background: 'var(--surface)', 
        borderRadius: '16px', 
        padding: '32px',
        border: '1px solid var(--border)'
      }}>
        <h2 style={{ marginBottom: '16px' }}>Contactez-nous</h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '24px',
          lineHeight: 1.6
        }}>
          Vous avez une question, une suggestion ou souhaitez collaborer ? 
          N'hésitez pas à nous contacter.
        </p>
        <a 
          href="mailto:contact@sentinellepulse.com"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--accent-primary)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Envoyer un email
        </a>
      </div>
    </div>
  );
}
