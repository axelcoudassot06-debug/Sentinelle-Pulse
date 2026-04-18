import type { Metadata } from 'next';
import { siteConfig } from '@/lib/seo';
import { articles } from '@/lib/data';
import { Shield, BookOpen, Target, Database, RefreshCw, Globe, Cpu, FileText } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'À propos — Mission & Méthodologie | Sentinelle Pulse',
  description: 'Sentinelle Pulse : magazine d\'analyse géopolitique, défense, économie et OSINT fondé par Axel Coudassot-Berducou. Indépendant, sourcé, chiffres 2025-2026.',
  keywords: ['Axel Coudassot-Berducou', 'Sentinelle Pulse', 'analyste indépendant', 'géopolitique', 'renseignement', 'OSINT', 'analyse stratégique', 'défense'],
  alternates: { canonical: `${siteConfig.url}/a-propos` },
};

const PILLARS = [
  { color: '#7C3AED', label: 'Géopolitique', id: 'geopolitique',
    desc: 'Relations internationales, conflits, alliances, diplomatie et équilibres de puissance.' },
  { color: '#DC2626', label: 'Défense',       id: 'defense',
    desc: 'Capacités militaires, réarmement, cyberdéfense et sécurité nationale.' },
  { color: '#059669', label: 'Économie',      id: 'economie',
    desc: 'Marchés financiers, politiques monétaires, intelligence économique et sanctions.' },
  { color: '#0891B2', label: 'OSINT',         id: 'osint',
    desc: 'Renseignement en sources ouvertes, investigation numérique et veille stratégique.' },
];

const METHODO = [
  { icon: <Globe size={20} />,     title: 'Sources primaires',
    desc: "Chaque analyse s'appuie sur des sources officielles, rapports institutionnels et données chiffrées vérifiables." },
  { icon: <RefreshCw size={20} />, title: 'Recoupement',
    desc: 'Les faits sont recoupés sur au moins deux sources indépendantes avant publication.' },
  { icon: <Database size={20} />,  title: 'Données actualisées',
    desc: 'Chiffres 2025-2026 mis à jour systématiquement. Chaque analyse précise la date des données utilisées.' },
  { icon: <Target size={20} />,    title: 'Indépendance éditoriale',
    desc: 'Aucun financement publicitaire ou partisan. Sentinelle Pulse est entièrement indépendant.' },
];

const STACK = ['Next.js 16', 'TypeScript', 'Open Data', 'SIPRI', 'FMI / Banque Mondiale', 'OSINT public', 'CSS Modules'];

export default function AboutPage() {
  const totalMinutes = articles.reduce((s, a) => s + a.readTime, 0);

  return (
    <div>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>
              <Shield size={12} />
              À PROPOS · SENTINELLE PULSE
            </div>
            <h1 className={styles.heroTitle}>Intelligence stratégique, <br />données vérifiées</h1>
            <p className={styles.heroSub}>
              Magazine d'analyse géopolitique, défense, économie et OSINT. 150 analyses publiées,
              entièrement indépendant, chiffres 2025-2026.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <strong>{articles.length}</strong>
                <span>analyses publiées</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <strong>4</strong>
                <span>domaines couverts</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <strong>{Math.round(totalMinutes / 60)}h</strong>
                <span>de contenu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Author ── */}
      <div className={styles.section}>
        <div className="container">
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>
              <BookOpen size={13} />
              LE FONDATEUR
            </div>
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>AC</div>
              <div className={styles.authorBody}>
                <h2 className={styles.authorName}>Axel Coudassot-Berducou</h2>
                <p className={styles.authorRole}>Analyste indépendant en géopolitique & intelligence stratégique</p>
                <p className={styles.authorBio}>
                  Sentinelle Pulse est né d'une conviction : les dynamiques mondiales qui façonnent
                  notre quotidien méritent une analyse rigoureuse, accessible et sans compromis éditorial.
                </p>
                <p className={styles.authorBio}>
                  Chaque analyse s'appuie sur des sources primaires, des chiffres actualisés et
                  une mise en perspective scénarios-chronologie-acteurs clés, pour donner au lecteur
                  les outils intellectuels nécessaires à sa propre compréhension du monde.
                </p>
                <p className={styles.authorBio}>
                  Le site couvre quatre piliers interdépendants — géopolitique, défense, économie et OSINT —
                  avec l'exigence de neutralité analytique et d'indépendance éditoriale totale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 pillars ── */}
      <div className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>
              <Target size={13} />
              LES 4 PILIERS ÉDITORIAUX
            </div>
            <h2 className={styles.sectionTitle}>Ce que nous couvrons</h2>
            <div className={styles.pillarsGrid}>
              {PILLARS.map(p => (
                <div key={p.id} className={styles.pillarCard} style={{ borderTopColor: p.color }}>
                  <div className={styles.pillarDot} style={{ background: p.color }} />
                  <div>
                    <h3 className={styles.pillarLabel} style={{ color: p.color }}>{p.label}</h3>
                    <p className={styles.pillarDesc}>{p.desc}</p>
                    <span className={styles.pillarCount}>
                      {articles.filter(a => a.category === p.id).length} analyses publiées
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Methodology ── */}
      <div className={styles.section}>
        <div className="container">
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>
              <FileText size={13} />
              MÉTHODOLOGIE
            </div>
            <h2 className={styles.sectionTitle}>Comment nous travaillons</h2>
            <div className={styles.methodoGrid}>
              {METHODO.map(m => (
                <div key={m.title} className={styles.methodoCard}>
                  <div className={styles.methodoIcon}>{m.icon}</div>
                  <h3 className={styles.methodoTitle}>{m.title}</h3>
                  <p className={styles.methodoDesc}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stack ── */}
      <div className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>
              <Cpu size={13} />
              STACK TECHNIQUE & SOURCES
            </div>
            <h2 className={styles.sectionTitle}>Technologies & données</h2>
            <div className={styles.stackList}>
              {STACK.map(s => (
                <span key={s} className={styles.stackBadge}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
