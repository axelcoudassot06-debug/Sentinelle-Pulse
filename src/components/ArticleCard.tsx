import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Article, categories } from '@/lib/data';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  economie: '#059669',
  geopolitique: '#7C3AED',
  defense: '#DC2626',
  osint: '#0891B2',
};

export default function ArticleCard({ article, featured }: ArticleCardProps) {
  const category = categories.find(c => c.id === article.category);
  const color = categoryColors[article.category];

  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Link href={`/article/${article.id}`} className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.imageWrapper}>
        <img src={article.image} alt={article.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <span 
          className={styles.categoryBadge}
          style={{ backgroundColor: `${color}20`, color }}
        >
          {category?.name}
        </span>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.meta}>
          <span className={styles.date}>
            <Calendar size={12} />
            {formattedDate}
          </span>
          <span className={styles.readTime}>
            <Clock size={12} />
            {article.readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
