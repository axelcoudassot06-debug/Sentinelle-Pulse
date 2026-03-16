import { getArticleById, articles, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import ClientArticleWrapper from './ClientArticleWrapper';
import { generateArticleSchema, siteConfig } from '@/lib/seo';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) return { title: 'Article non trouvé' };
  
  return {
    title: `${article.title} | Sentinelle Pulse`,
    description: article.excerpt,
    authors: [article.author],
    publishedTime: article.date,
    modifiedTime: article.date,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
    alternates: {
      canonical: `${siteConfig.url}/article/${article.id}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  economie: '#059669',
  geopolitique: '#7C3AED',
  defense: '#DC2626',
  osint: '#0891B2',
};

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  
  if (!article) {
    notFound();
  }
  
  const category = categories.find(c => c.id === article.category);
  const color = categoryColors[article.category];
  const articleSchema = generateArticleSchema(article);
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category?.name || '',
        item: `${siteConfig.url}/${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${siteConfig.url}/article/${article.id}`,
      },
    ],
  };
  
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <article>
        <div className="container" style={{ paddingTop: '32px' }}>
          <Link href="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            fontSize: '0.875rem'
          }}>
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link 
              href={`/${article.category}`}
              style={{ 
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                backgroundColor: `${color}20`,
                color,
                transition: 'transform var(--transition)',
              }}
            >
              {category?.name}
            </Link>
            
            <ClientArticleWrapper 
              articleTitle={article.title}
              articleContent={article.content}
            />
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', 
            lineHeight: 1.2,
            marginBottom: '24px'
          }}>
            {article.title}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            gap: '24px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            fontSize: '0.875rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} />
              {formattedDate}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} />
              {article.readTime} min de lecture
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Par <strong style={{ color: 'var(--text-primary)' }}>{article.author}</strong>
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Share2 size={16} />
              </button>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Bookmark size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ 
          width: '100%',
          maxHeight: '500px',
          overflow: 'hidden',
          marginBottom: '48px'
        }}>
          <img 
            src={article.image} 
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ 
            fontSize: '1.125rem', 
            lineHeight: 1.8,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap'
          }}>
            <p style={{ marginBottom: '24px', fontWeight: 500, fontSize: '1.25rem' }}>
              {article.excerpt}
            </p>
            <div style={{ marginBottom: '24px' }}>
              {article.content}
            </div>
          </div>
          
          <div style={{ 
            marginTop: '32px', 
            padding: '20px', 
            background: 'var(--surface)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              background: 'var(--accent-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.25rem'
            }}>
              {article.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{article.author}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Journaliste chez Sentinelle Pulse
              </div>
            </div>
          </div>
          
          {relatedArticles.length > 0 && (
            <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '24px' }}>Articles liés</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                {relatedArticles.map(related => (
                  <Link 
                    key={related.id} 
                    href={`/article/${related.id}`}
                    style={{ 
                      display: 'block',
                      padding: '16px',
                      background: 'var(--surface)',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      transition: 'transform var(--transition), box-shadow var(--transition)'
                    }}
                    className="card-hover"
                  >
                    <span style={{ 
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: categoryColors[related.category],
                      fontWeight: 600
                    }}>
                      {categories.find(c => c.id === related.category)?.name}
                    </span>
                    <h4 style={{ 
                      fontSize: '1rem', 
                      marginTop: '8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {related.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
