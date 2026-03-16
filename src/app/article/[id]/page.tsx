import { getArticleById, articles, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ClientArticleWrapper from './ClientArticleWrapper';
import { generateArticleSchema, siteConfig } from '@/lib/seo';
import ShareButtons from '@/components/ShareButtons';
import CommentsSection from '@/components/CommentsSection';
import { getCommentsByArticleId } from '@/lib/comments';
import React from 'react';

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

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Section header (##)
    if (line.startsWith('## ')) {
      elements.push(
        <div key={key++} style={{ marginTop: '48px', marginBottom: '20px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '2px solid var(--accent-primary)'
          }}>
            {line.replace('## ', '')}
          </h2>
        </div>
      );
      continue;
    }
    
    // Subsection (###)
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} style={{ 
          fontSize: '1.35rem', 
          fontWeight: 600, 
          marginTop: '32px',
          marginBottom: '16px',
          color: 'var(--text-primary)'
        }}>
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }
    
    // Sub-subsection (####)
    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={key++} style={{ 
          fontSize: '1.15rem', 
          fontWeight: 600, 
          marginTop: '24px',
          marginBottom: '12px',
          color: 'var(--text-secondary)'
        }}>
          {line.replace('#### ', '')}
        </h4>
      );
      continue;
    }
    
    // Regular paragraph
    elements.push(
      <p key={key++} style={{ 
        marginBottom: '20px', 
        lineHeight: 1.85,
        color: 'var(--text-primary)'
      }}>
        {line}
      </p>
    );
  }
  
  return <div style={{ fontSize: '1.125rem' }}>{elements}</div>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  
  if (!article) {
    notFound();
  }
  
  const category = categories.find(c => c.id === article.category);
  const color = categoryColors[article.category];
  const articleSchema = generateArticleSchema(article);
  const comments = getCommentsByArticleId(id);
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: category?.name || '', item: `${siteConfig.url}/${article.category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${siteConfig.url}/article/${article.id}` },
    ],
  };
  
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
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
        <header style={{ 
          background: 'var(--background)',
          borderBottom: '1px solid var(--border)',
          padding: '32px 0'
        }}>
          <div className="container" style={{ maxWidth: '900px', padding: '0 24px' }}>
            <Link href="/" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              marginBottom: '32px'
            }}>
              <ArrowLeft size={16} />
              Accueil
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <Link 
                href={`/${article.category}`}
                style={{ 
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  backgroundColor: `${color}15`,
                  color: color,
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
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              lineHeight: 1.15,
              marginBottom: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)'
            }}>
              {article.title}
            </h1>
            
            <div style={{ 
              display: 'flex', 
              gap: '24px',
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} />
                {formattedDate}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} />
                {article.readTime} min
              </span>
              <span>
                Par <strong style={{ color: 'var(--text-primary)' }}>{article.author}</strong>
              </span>
            </div>
          </div>
        </header>
        
        <div style={{ width: '100%', height: '450px', overflow: 'hidden' }}>
          <img 
            src={article.image} 
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ maxWidth: '780px', padding: '56px 24px' }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--accent-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.125rem'
              }}>
                AC
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>{article.author}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Fondateur & Directeur
                </div>
              </div>
            </div>
            <ShareButtons title={article.title} url={`/article/${article.id}`} />
          </div>
          
          <ContentRenderer content={article.content} />
          
          {relatedArticles.length > 0 && (
            <div style={{ marginTop: '72px', paddingTop: '48px', borderTop: '3px solid var(--accent-primary)' }}>
              <h3 style={{ marginBottom: '28px', fontSize: '1.375rem', fontWeight: 700 }}>Articles liés</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '24px'
              }}>
                {relatedArticles.map(related => (
                  <Link 
                    key={related.id} 
                    href={`/article/${related.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{
                      background: 'var(--surface)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}>
                      <div style={{ height: '140px', overflow: 'hidden' }}>
                        <img 
                          src={related.image} 
                          alt={related.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '18px' }}>
                        <span style={{ 
                          fontSize: '0.6875rem',
                          textTransform: 'uppercase',
                          color: categoryColors[related.category],
                          fontWeight: 600,
                          letterSpacing: '0.5px'
                        }}>
                          {categories.find(c => c.id === related.category)?.name}
                        </span>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          marginTop: '10px',
                          fontWeight: 600,
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {related.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <CommentsSection comments={comments} />
        </div>
      </article>
    </>
  );
}
