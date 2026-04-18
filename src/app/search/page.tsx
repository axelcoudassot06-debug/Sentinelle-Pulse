'use client';

import { useState, useEffect, useRef } from 'react';
import { articles } from '@/lib/data';
import { Article } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';
import { Search, X, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

const CATEGORIES = [
  { id: 'geopolitique', label: 'Géopolitique', color: '#7C3AED' },
  { id: 'defense',      label: 'Défense',      color: '#DC2626' },
  { id: 'economie',     label: 'Économie',      color: '#059669' },
  { id: 'osint',        label: 'OSINT',         color: '#0891B2' },
];

export default function SearchPage() {
  const [query, setQuery]         = useState('');
  const [results, setResults]     = useState<Article[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      const q = query.toLowerCase().trim();
      const found = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.series ?? '').toLowerCase().includes(q)
      );
      setResults(found);
      setHasSearched(true);
    }, 280);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  const clear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  return (
    <div>
      {/* Search hero */}
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}><Search size={12} />RECHERCHE</div>
            <h1 className={styles.heroTitle}>Rechercher une analyse</h1>
            <p className={styles.heroSub}>{articles.length} analyses — géopolitique, défense, économie, OSINT</p>

            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                ref={inputRef}
                type="search"
                className={styles.searchInput}
                placeholder="Ex : Corée du Nord, OTAN, IA, Taïwan…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button className={styles.clearBtn} onClick={clear} aria-label="Effacer">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {hasSearched && (
          <div className={styles.resultsSection}>
            <p className={styles.resultsCount}>
              {results.length} résultat{results.length !== 1 ? 's' : ''} pour «&nbsp;{query}&nbsp;»
            </p>
            {results.length > 0 ? (
              <div className={styles.grid}>
                {results.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <Search size={28} className={styles.emptyIcon} />
                <p className={styles.emptyTitle}>Aucun résultat pour «&nbsp;{query}&nbsp;»</p>
                <p className={styles.emptySub}>Essayez avec un autre terme ou parcourez une catégorie ci-dessous</p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className={styles.categoriesSection}>
            <div className={styles.categoriesHeader}>
              <LayoutGrid size={13} />
              <span>Parcourir par catégorie</span>
            </div>
            <div className={styles.categoriesGrid}>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.id}
                  href={`/${cat.id}`}
                  className={styles.catCard}
                  style={{ '--cat-color': cat.color } as React.CSSProperties}
                >
                  <span className={styles.catDot} style={{ background: cat.color }} />
                  <div>
                    <span className={styles.catLabel}>{cat.label}</span>
                    <span className={styles.catCount}>
                      {articles.filter(a => a.category === cat.id).length} analyses
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
