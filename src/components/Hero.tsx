import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { Article, categories } from '@/lib/data';
import styles from './Hero.module.css';

interface HeroProps {
  article: Article;
}

const categoryConfig: Record<string, { color: string; bg: string }> = {
  economie:    { color: '#10b981', bg: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #065f46 70%, #047857 100%)' },
  geopolitique:{ color: '#a78bfa', bg: 'linear-gradient(135deg, #1e0a3c 0%, #2e1065 40%, #3b0764 70%, #4c1d95 100%)' },
  defense:     { color: '#f87171', bg: 'linear-gradient(135deg, #1c0202 0%, #450a0a 40%, #7f1d1d 70%, #991b1b 100%)' },
  osint:       { color: '#38bdf8', bg: 'linear-gradient(135deg, #020f1c 0%, #082f49 40%, #0c4a6e 70%, #075985 100%)' },
};

export default function Hero({ article }: HeroProps) {
  const category = categories.find(c => c.id === article.category);
  const config = categoryConfig[article.category] ?? categoryConfig.defense;

  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/article/${article.id}`} className={styles.hero} style={{ background: config.bg }}>
      {/* Subtle grid overlay for texture */}
      <div className={styles.gridOverlay} />

      {/* Decorative blobs */}
      <div className={styles.blob1} style={{ background: config.color }} />
      <div className={styles.blob2} style={{ background: config.color }} />

      <div className={styles.heroContent}>
        <div className={styles.topRow}>
          <span className={styles.heroCategory} style={{ color: config.color, borderColor: `${config.color}50` }}>
            {category?.name}
          </span>
          <span className={styles.seriesTag}>{article.series ?? 'SP'} · N°{article.id}</span>
        </div>

        <h1 className={styles.heroTitle}>{article.title}</h1>
        <p className={styles.heroExcerpt}>{article.excerpt}</p>

        <div className={styles.heroFooter}>
          <div className={styles.heroMeta}>
            <span className={styles.author}>{article.author}</span>
            <span className={styles.dot}>·</span>
            <span>{formattedDate}</span>
            <span className={styles.dot}>·</span>
            <Clock size={13} />
            <span>{article.readTime} min</span>
          </div>
          <span className={styles.readLink}>
            Lire l&apos;analyse <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className={styles.accentBar} style={{ background: config.color }} />
    </Link>
  );
}
