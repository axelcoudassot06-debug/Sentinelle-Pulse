import { getArticleById, articles, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ClientArticleWrapper from './ClientArticleWrapper';
import { generateArticleSchema, siteConfig } from '@/lib/seo';
import ShareButtons from '@/components/ShareButtons';
import CommentsSection from '@/components/CommentsSection';
import { getCommentsByArticleId } from '@/lib/comments';

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
  const sections = content.split('■ ');
  
  return (
    <div style={{ lineHeight: 1.9 }}>
      {sections.map((section, index) => {
        if (!section.trim()) return null;
        
        const lines = section.split('\n');
        const title = lines[0].trim();
        const rest = lines.slice(1).join('\n');
        
        if (index === 0) {
          return (
            <div key={index}>
              {title && (
                <p style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 500, 
                  color: 'var(--text-secondary)',
                  marginBottom: '32px',
                  borderLeft: '3px solid var(--accent-primary)',
                  paddingLeft: '20px'
                }}>
                  {title}
                </p>
              )}
              {rest && (
                <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
                  {rest.split('\n\n').map((para, pIndex) => {
                    if (para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.')) {
                      return (
                        <div key={pIndex} style={{ marginBottom: '24px' }}>
                          {para.split('\n').map((line, lIndex) => (
                            <p key={lIndex} style={{ marginBottom: '8px' }}>
                              {line}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    if (para.startsWith('-') || para.startsWith('•')) {
                      const items = para.split('\n').filter(l => l.trim());
                      return (
                        <ul key={pIndex} style={{ 
                          marginBottom: '24px', 
                          paddingLeft: '24px',
                          listStyle: 'none'
                        }}>
                          {items.map((item, i) => (
                            <li key={i} style={{ 
                              marginBottom: '12px',
                              position: 'relative',
                              paddingLeft: '20px'
                            }}>
                              <span style={{ 
                                position: 'absolute', 
                                left: 0, 
                                color: 'var(--accent-primary)' 
                              }}>▸</span>
                              {item.replace(/^[‑•]\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIndex} style={{ marginBottom: '20px' }}>
                        {para}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
        
        const hasSubSections = rest.includes('\n1.') || rest.includes('\n2.') || rest.includes('\n3.');
        
        return (
          <div key={index} style={{ 
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700,
              marginBottom: '24px',
              color: 'var(--text-primary)'
            }}>
              {title}
            </h2>
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
              {rest.split('\n\n').map((para, pIndex) => {
                if (para.match(/^\d+\.\s/) || para.match(/^\d+\.\d+/)) {
                  return (
                    <div key={pIndex} style={{ marginBottom: '24px' }}>
                      {para.split('\n').map((line, lIndex) => {
                        if (line.match(/^\d+\.\s/) && !line.match(/\.\d+/)) {
                          return (
                            <h3 key={lIndex} style={{ 
                              fontSize: '1.125rem', 
                              fontWeight: 600, 
                              marginTop: '24px',
                              marginBottom: '12px',
                              color: 'var(--text-primary)'
                            }}>
                              {line}
                            </h3>
                          );
                        }
                        if (line.match(/^\d+\.\d+\s/)) {
                          return (
                            <p key={lIndex} style={{ 
                              marginBottom: '8px',
                              paddingLeft: '16px',
                              borderLeft: '2px solid var(--border)'
                            }}>
                              {line}
                            </p>
                          );
                        }
                        return (
                          <p key={lIndex} style={{ marginBottom: '8px' }}>
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  );
                }
                if (para.startsWith('-') || para.startsWith('•')) {
                  const items = para.split('\n').filter(l => l.trim());
                  return (
                    <ul key={pIndex} style={{ 
                      marginBottom: '24px', 
                      paddingLeft: '24px',
                      listStyle: 'none'
                    }}>
                      {items.map((item, i) => (
                        <li key={i} style={{ 
                          marginBottom: '12px',
                          position: 'relative',
                          paddingLeft: '20px'
                        }}>
                          <span style={{ 
                            position: 'absolute', 
                            left: 0, 
                            color: 'var(--accent-primary)' 
                          }}>▸</span>
                          {item.replace(/^[‑•]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={pIndex} style={{ marginBottom: '20px' }}>
                    {para}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
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
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ padding: '24px 16px', maxWidth: '900px' }}>
            <Link href="/" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              marginBottom: '32px'
            }}>
              <ArrowLeft size={16} />
              Retour à l'accueil
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
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
                  backgroundColor: `${color}15`,
                  color,
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
              marginBottom: '24px',
              fontWeight: 800
            }}>
              {article.title}
            </h1>
            
            <div style={{ 
              display: 'flex', 
              gap: '24px',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
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
                {article.readTime} min de lecture
              </span>
              <span>
                Par <strong style={{ color: 'var(--text-primary)' }}>{article.author}</strong>
              </span>
            </div>
          </div>
        </div>
        
        <div style={{ 
          width: '100%',
          height: '400px',
          overflow: 'hidden'
        }}>
          <img 
            src={article.image} 
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ maxWidth: '800px', padding: '48px 24px' }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                fontSize: '1rem'
              }}>
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{article.author}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Fondateur &amp; Directeur
                </div>
              </div>
            </div>
            <ShareButtons title={article.title} url={`/article/${article.id}`} />
          </div>
          
          <ContentRenderer content={article.content} />
          
          {relatedArticles.length > 0 && (
            <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '3px solid var(--accent-primary)' }}>
              <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Articles liés</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '20px'
              }}>
                {relatedArticles.map(related => (
                  <Link 
                    key={related.id} 
                    href={`/article/${related.id}`}
                    style={{ 
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <div style={{
                      background: 'var(--surface)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      transition: 'transform var(--transition), box-shadow var(--transition)'
                    }}>
                      <div style={{ height: '120px', overflow: 'hidden' }}>
                        <img 
                          src={related.image} 
                          alt={related.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '16px' }}>
                        <span style={{ 
                          fontSize: '0.6875rem',
                          textTransform: 'uppercase',
                          color: categoryColors[related.category],
                          fontWeight: 600
                        }}>
                          {categories.find(c => c.id === related.category)?.name}
                        </span>
                        <h4 style={{ 
                          fontSize: '0.9375rem', 
                          marginTop: '8px',
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
