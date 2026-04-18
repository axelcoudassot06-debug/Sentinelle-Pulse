import { articles, getFeaturedArticle, getTrendingArticles } from '@/lib/data';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import FlashSection from '@/components/FlashSection';
import FilteredArticles from '@/components/FilteredArticles';
import EditorialCalendar from '@/components/EditorialCalendar';
import Newsletter from '@/components/Newsletter';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const featured  = getFeaturedArticle();
  const trending  = getTrendingArticles();

  return (
    <div>
      <StatsBar />
      <div className="container">
        {featured && <Hero article={featured} />}
        <FlashSection />

        <div className={styles.mainGrid}>
          {/* ── LEFT — main content ── */}
          <div className={styles.content}>
            <FilteredArticles articles={articles} excludeId={featured?.id} />
          </div>

          {/* ── RIGHT — sidebar ── */}
          <aside className={styles.sidebar}>
            {/* Trending */}
            <div className={styles.sideSection}>
              <div className={styles.sideSectionHeader}>
                <TrendingUp size={13} />
                <h2 className={styles.sideSectionTitle}>Tendances</h2>
              </div>
              <div className={styles.trendingList}>
                {trending.map((article, index) => (
                  <Link key={article.id} href={`/article/${article.id}`} className={styles.trendingItem}>
                    <span className={styles.trendingNumber}>{index + 1}</span>
                    <div className={styles.trendingBody}>
                      <span className={styles.trendingCategory}>{article.category}</span>
                      <h4 className={styles.trendingTitle}>{article.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <Newsletter />

            {/* Editorial calendar */}
            <EditorialCalendar />
          </aside>
        </div>
      </div>
    </div>
  );
}
