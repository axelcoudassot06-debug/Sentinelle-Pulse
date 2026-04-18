import Link from 'next/link';
import { articles, categories } from '@/lib/data';
import { Clock, Zap } from 'lucide-react';
import styles from './FlashSection.module.css';

const catColors: Record<string,string> = {
  geopolitique: '#7C3AED', defense: '#DC2626', economie: '#059669', osint: '#0891B2',
};
const catBg: Record<string,string> = {
  geopolitique: 'linear-gradient(135deg,#1e0a3c,#4c1d95)',
  defense:      'linear-gradient(135deg,#1c0202,#991b1b)',
  economie:     'linear-gradient(135deg,#022c22,#047857)',
  osint:        'linear-gradient(135deg,#020f1c,#075985)',
};

export default function FlashSection() {
  // 3 most recent trending articles
  const flashArticles = [...articles]
    .filter(a => a.trending)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Zap size={12} />
          BULLETIN STRATÉGIQUE
        </div>
        <span className={styles.sub}>Les analyses prioritaires du moment</span>
        <Link href="/archives" className={styles.viewAll}>Toutes les analyses →</Link>
      </div>

      <div className={styles.grid}>
        {flashArticles.map((article, i) => {
          const cat = categories.find(c => c.id === article.category);
          const color = catColors[article.category];
          const bg    = catBg[article.category];
          const date  = new Date(article.date).toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
          return (
            <Link key={article.id} href={`/article/${article.id}`} className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
              {/* Gradient top */}
              <div className={styles.thumb} style={{ background: bg }}>
                <div className={styles.thumbDots} />
                <div className={styles.thumbGlow} style={{ background: color }} />
                <div className={styles.thumbInner}>
                  <span className={styles.flashBadge}>
                    <span className={styles.flashDot} />
                    FLASH
                  </span>
                  <p className={styles.thumbTitle}>{article.title}</p>
                </div>
                <div className={styles.thumbBar} style={{ background: color }} />
              </div>

              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={styles.catBadge} style={{ color, borderColor:`${color}50` }}>
                    {cat?.name}
                  </span>
                  <span className={styles.metaRight}>
                    <Clock size={11} /> {article.readTime} min · {date}
                  </span>
                </div>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt.substring(0, 100)}…</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
