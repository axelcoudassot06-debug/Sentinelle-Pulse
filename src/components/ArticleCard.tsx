import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Article, categories } from '@/lib/data';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const categoryConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  economie:    { color: '#059669', bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)', label: 'Économie', icon: '📈' },
  geopolitique:{ color: '#7C3AED', bg: 'linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #4c1d95 100%)', label: 'Géopolitique', icon: '🌐' },
  defense:     { color: '#DC2626', bg: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)', label: 'Défense', icon: '🛡️' },
  osint:       { color: '#0891B2', bg: 'linear-gradient(135deg, #082f49 0%, #0c4a6e 50%, #075985 100%)', label: 'OSINT', icon: '🔍' },
};

export default function ArticleCard({ article, featured }: ArticleCardProps) {
  const category = categories.find(c => c.id === article.category);
  const config = categoryConfig[article.category] ?? categoryConfig.defense;

  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/article/${article.id}`} className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {/* Gradient thumbnail — no random stock photos */}
      <div className={styles.thumbnail} style={{ background: config.bg }}>
        <div className={styles.thumbnailInner}>
          <span className={styles.seriesTag}>{article.series ?? 'SP'} · N°{article.id}</span>
          <div className={styles.thumbnailTitle}>{article.title}</div>
          <span className={styles.thumbnailLabel}>{config.label}</span>
        </div>
        <div className={styles.thumbnailAccent} style={{ background: config.color }} />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.categoryBadge} style={{ color: config.color, borderColor: `${config.color}40` }}>
            {category?.name}
          </span>
          <span className={styles.readTime}>
            <Clock size={11} />
            {article.readTime} min
          </span>
        </div>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.meta}>
          <span className={styles.author}>{article.author.split(' ').slice(0, 2).join(' ')}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
