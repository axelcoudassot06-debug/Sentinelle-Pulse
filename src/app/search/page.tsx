'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { articles } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';
import { Search, Loader2 } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<typeof articles>([]);

  useEffect(() => {
    if (query) {
      const q = query.toLowerCase();
      const filtered = articles.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url);
    const q = searchQuery.toLowerCase();
    const filtered = articles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q)
    );
    setResults(filtered);
  };

  return (
    <div style={{ padding: '48px 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Recherche</h1>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '32px' }}>
        <div style={{ position: 'relative' }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)'
            }} 
          />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 16px 16px 48px',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              background: 'var(--surface)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>
      </form>

      {query && (
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {results.length} résultat{results.length !== 1 ? 's' : ''} pour &quot;{query}&quot;
        </p>
      )}

      {results.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {results.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : query ? (
        <p style={{ color: 'var(--text-secondary)' }}>
          Aucun résultat trouvé pour votre recherche.
        </p>
      ) : null}
    </div>
  );
}

function SearchLoading() {
  return (
    <div style={{ 
      padding: '48px 0', 
      maxWidth: '800px', 
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      color: 'var(--text-secondary)'
    }}>
      <Loader2 size={24} className="animate-spin" />
      Chargement...
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container">
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
