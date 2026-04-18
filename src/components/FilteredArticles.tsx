'use client';

import { useState } from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '@/lib/data';
import styles from './FilteredArticles.module.css';

const TABS = [
  { id: 'all',          label: 'Tous',         color: '' },
  { id: 'geopolitique', label: 'Géopolitique',  color: '#7C3AED' },
  { id: 'defense',      label: 'Défense',       color: '#DC2626' },
  { id: 'economie',     label: 'Économie',      color: '#059669' },
  { id: 'osint',        label: 'OSINT',         color: '#0891B2' },
];

interface Props {
  articles: Article[];
  excludeId?: string;
}

const PER_PAGE = 12;

export default function FilteredArticles({ articles, excludeId }: Props) {
  const [active, setActive] = useState('all');
  const [page, setPage]     = useState(1);

  const filtered = articles
    .filter(a => a.id !== excludeId)
    .filter(a => active === 'all' || a.category === active);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < filtered.length;

  const handleTab = (id: string) => {
    setActive(id);
    setPage(1);
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className={styles.tabs} role="tablist">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
            style={active === tab.id && tab.color ? { '--tab-color': tab.color } as React.CSSProperties : {}}
            onClick={() => handleTab(tab.id)}
          >
            {tab.color && (
              <span
                className={styles.tabDot}
                style={{ background: tab.color, opacity: active === tab.id ? 1 : 0.4 }}
              />
            )}
            {tab.label}
            {active === tab.id && (
              <span className={styles.tabCount}>
                {articles.filter(a => a.id !== excludeId && (tab.id === 'all' || a.category === tab.id)).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {paginated.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className={styles.loadMore}>
          <button className={styles.loadBtn} onClick={() => setPage(p => p + 1)}>
            Charger plus d'analyses
            <span className={styles.loadCount}>
              ({filtered.length - paginated.length} restantes)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
