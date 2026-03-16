import { articles, getFeaturedArticle, getTrendingArticles } from '@/lib/data';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Newsletter from '@/components/Newsletter';
import styles from './page.module.css';

export default function Home() {
  const featured = getFeaturedArticle();
  const trending = getTrendingArticles();
  const otherArticles = articles.filter(a => a.id !== featured?.id);

  return (
    <div className="container">
      {featured && <Hero article={featured} />}

      <div className={styles.mainGrid}>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Derniers articles</h2>
            <div className={styles.articlesGrid}>
              {otherArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tendances</h2>
            <div className={styles.trendingList}>
              {trending.map((article, index) => (
                <a key={article.id} href={`/article/${article.id}`} className={styles.trendingItem}>
                  <span className={styles.trendingNumber}>{index + 1}</span>
                  <div>
                    <span className={styles.trendingCategory}>{article.category}</span>
                    <h4 className={styles.trendingTitle}>{article.title}</h4>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <Newsletter />
        </aside>
      </div>
    </div>
  );
}
