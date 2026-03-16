import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Article, categories } from '@/lib/data';
import styles from './Hero.module.css';

interface HeroProps {
  article: Article;
}

const categoryColors: Record<string, string> = {
  economie: '#059669',
  geopolitique: '#7C3AED',
  defense: '#DC2626',
  osint: '#0891B2',
};

export default function Hero({ article }: HeroProps) {
  const category = categories.find(c => c.id === article.category);
  const color = categoryColors[article.category];

  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Link href={`/article/${article.id}`} className={styles.hero}>
      <img src={article.image} alt={article.title} className={styles.heroImage} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span 
          className={styles.heroCategory}
          style={{ backgroundColor: color, color: 'white' }}
        >
          {category?.name}
        </span>
        <h1 className={styles.heroTitle}>{article.title}</h1>
        <p className={styles.heroExcerpt}>{article.excerpt}</p>
        <div className={styles.heroMeta}>
          <span><Calendar size={14} /> {formattedDate}</span>
          <span><Clock size={14} /> {article.readTime} min de lecture</span>
        </div>
      </div>
    </Link>
  );
}
