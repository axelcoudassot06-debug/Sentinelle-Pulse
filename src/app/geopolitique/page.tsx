import { getArticlesByCategory, categories } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';

const categoryId = 'geopolitique';
const cat = categories.find(c => c.id === categoryId)!;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata() {
  return {
    title: `${cat.name} | Sentinelle Pulse`,
    description: `Articles sur l'actualité ${cat.name.toLowerCase()}`,
  };
}

export default async function CategoryPage() {
  const articles = getArticlesByCategory(categoryId);

  return (
    <div className="container">
      <div style={{ padding: '48px 0' }}>
        <h1 style={{ marginBottom: '8px' }}>{cat.name}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          {articles.length} article{articles.length !== 1 ? 's' : ''} dans cette catégorie
        </p>
        
        {articles.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>
            Aucun article dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
