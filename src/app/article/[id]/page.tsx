import { getArticleById, articles, categories } from '@/lib/data';
import { getArticleChart } from '@/lib/chartData';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ClientArticleWrapper from './ClientArticleWrapper';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo';
import ShareButtons from '@/components/ShareButtons';
import ProfessionalContentRenderer from '@/components/ProfessionalContentRenderer';
import ClientChartsWrapper from '@/components/ClientChartsWrapper';
import ClientMobileFeatures from './ClientMobileFeatures';

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

  const keywords = [
    ...article.title.split(/[\s—–\-·]+/).filter((w: string) => w.length > 4),
    article.category,
    'Sentinelle Pulse',
    'analyse géopolitique',
    'renseignement',
  ];

  return {
    title: `${article.title} | Sentinelle Pulse`,
    description: `${article.excerpt} Analyse approfondie, données chiffrées, chronologie.`,
    keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author],
      section: article.category,
      tags: keywords,
      images: [{ url: `${siteConfig.url}/og-image.jpg`, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: article.title,
      description: article.excerpt,
      images: [`${siteConfig.url}/og-image.jpg`],
      creator: '@sentinellepulse',
    },
    alternates: { canonical: `${siteConfig.url}/article/${article.id}` },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large' as const,
    },
  };
}

const categoryColors: Record<string, string> = {
  economie: '#059669',
  geopolitique: '#7C3AED',
  defense: '#DC2626',
  osint: '#0891B2',
};

const categoryBg: Record<string, string> = {
  economie:    'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%)',
  geopolitique:'linear-gradient(135deg, #1e0a3c 0%, #2e1065 50%, #4c1d95 100%)',
  defense:     'linear-gradient(135deg, #1c0202 0%, #450a0a 50%, #991b1b 100%)',
  osint:       'linear-gradient(135deg, #020f1c 0%, #082f49 50%, #075985 100%)',
};

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  const category = categories.find(c => c.id === article.category);
  const color = categoryColors[article.category];
  const bg = categoryBg[article.category];
  const chart = getArticleChart(id);
  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema(article, category?.name || '');
  const faqSchema = generateFAQSchema(article);
  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ClientMobileFeatures color={color} />

      <article>
        {/* ── Hero gradient banner ── */}
        <div style={{
          width: '100%',
          minHeight: 320,
          background: bg,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          {/* Texture */}
          <div style={{ position:'absolute',inset:0, backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
          {/* Glow */}
          <div style={{ position:'absolute',top:-80,right:-80,width:360,height:360,borderRadius:'50%',background:color,opacity:0.07,filter:'blur(80px)' }} />

          <div className="container" style={{ maxWidth:900, padding:'48px 24px 40px', position:'relative', zIndex:1 }}>
            {/* Breadcrumb */}
            <Link href="/" style={{ display:'inline-flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.4)',fontSize:'0.8rem',marginBottom:28,textDecoration:'none' }}>
              <ArrowLeft size={14} /> Accueil
            </Link>

            {/* Category + series + AI */}
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:18,flexWrap:'wrap' }}>
              <Link href={`/${article.category}`} style={{
                display:'inline-block',padding:'5px 14px',borderRadius:4,
                fontSize:'0.7rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',
                border:`1px solid ${color}60`,color,background:'rgba(255,255,255,0.05)',textDecoration:'none',
              }}>
                {category?.name}
              </Link>
              <span style={{ fontSize:'0.7rem',fontWeight:600,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.08em' }}>
                {article.series} · N°{article.id}
              </span>
              <ClientArticleWrapper articleTitle={article.title} articleContent={article.content} />
            </div>

            {/* Title */}
            <h1 style={{
              fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:800,
              color:'rgba(255,255,255,0.95)',lineHeight:1.15,marginBottom:20,
              fontFamily:'var(--font-heading)',letterSpacing:'-0.02em',
            }}>
              {article.title}
            </h1>

            {/* Meta */}
            <div style={{ display:'flex',gap:20,color:'rgba(255,255,255,0.4)',fontSize:'0.825rem',flexWrap:'wrap',alignItems:'center' }}>
              <span style={{ display:'flex',alignItems:'center',gap:6 }}><Calendar size={13}/>{formattedDate}</span>
              <span style={{ display:'flex',alignItems:'center',gap:6 }}><Clock size={13}/>{article.readTime} min de lecture</span>
              <span style={{ display:'flex',alignItems:'center',gap:6 }}><BookOpen size={13}/>{article.author}</span>
            </div>
          </div>

          {/* Accent bar */}
          <div style={{ height:4,background:color,opacity:0.7 }} />
        </div>

        {/* ── Main layout ── */}
        <div className="container" style={{ maxWidth:1200,padding:'0 24px' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 300px',gap:56,alignItems:'start',padding:'56px 0 80px' }}>

            {/* ── Content column ── */}
            <div>
              {/* Author + share strip */}
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:40,paddingBottom:24,borderBottom:'1px solid var(--border)' }}>
                <div style={{ display:'flex',alignItems:'center',gap:12 }}>
                  <div style={{ width:44,height:44,borderRadius:'50%',background:bg,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:'0.9rem',flexShrink:0 }}>
                    AC
                  </div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:'0.9375rem' }}>{article.author}</div>
                    <div style={{ fontSize:'0.775rem',color:'var(--text-secondary)' }}>Fondateur & Directeur, Sentinelle Pulse</div>
                  </div>
                </div>
                <ShareButtons title={article.title} url={`/article/${article.id}`} />
              </div>

              {/* Excerpt lead */}
              <p style={{ fontSize:'1.2rem',fontWeight:500,lineHeight:1.65,color:'var(--text-secondary)',marginBottom:36,fontStyle:'italic',borderLeft:`3px solid ${color}`,paddingLeft:20 }}>
                {article.excerpt}
              </p>

              {/* Charts (KPI, bar, line, timeline, map) */}
              {chart && (
                <ClientChartsWrapper chart={chart} />
              )}

              {/* Article body */}
              <ProfessionalContentRenderer content={article.content} />
            </div>

            {/* ── Sidebar ── */}
            <aside style={{ position:'sticky',top:24 }}>
              {/* Article info card */}
              <div style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',marginBottom:24 }}>
                <div style={{ background:bg,padding:'16px 20px' }}>
                  <div style={{ fontSize:'0.65rem',fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.1em' }}>Analyse stratégique</div>
                  <div style={{ fontSize:'0.95rem',fontWeight:700,color:'rgba(255,255,255,0.9)',marginTop:4,lineHeight:1.3 }}>{article.title}</div>
                </div>
                <div style={{ padding:'16px 20px',display:'flex',flexDirection:'column',gap:12 }}>
                  {[
                    { label:'Série', value:`${article.series} · Sentinelle Pulse` },
                    { label:'Catégorie', value:category?.name ?? '' },
                    { label:'Date', value:formattedDate },
                    { label:'Lecture', value:`${article.readTime} min` },
                    { label:'Auteur', value:article.author },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display:'flex',justifyContent:'space-between',gap:8,fontSize:'0.8rem' }}>
                      <span style={{ color:'var(--text-secondary)',fontWeight:500 }}>{label}</span>
                      <span style={{ fontWeight:600,color:'var(--text-primary)',textAlign:'right',maxWidth:'60%' }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'12px 20px',borderTop:'1px solid var(--border)' }}>
                  <Link href={`/${article.category}`} style={{
                    display:'block',textAlign:'center',padding:'9px',borderRadius:6,
                    background:`${color}15`,color,fontSize:'0.8rem',fontWeight:700,
                    textDecoration:'none',border:`1px solid ${color}30`,
                  }}>
                    Tous les articles {category?.name}
                  </Link>
                </div>
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div>
                  <h3 style={{ fontSize:'0.7rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-secondary)',marginBottom:14 }}>
                    Dans la même série
                  </h3>
                  <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                    {relatedArticles.map(r => (
                      <Link key={r.id} href={`/article/${r.id}`} style={{ textDecoration:'none',color:'inherit' }}>
                        <div style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden' }}>
                          {/* mini gradient thumbnail */}
                          <div style={{ height:52,background:categoryBg[r.category],display:'flex',alignItems:'flex-end',padding:'8px 12px' }}>
                            <span style={{ fontSize:'0.6rem',color:'rgba(255,255,255,0.4)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em' }}>
                              {r.series} · N°{r.id}
                            </span>
                          </div>
                          <div style={{ padding:'10px 12px' }}>
                            <div style={{ fontSize:'0.8rem',fontWeight:600,color:'var(--text-primary)',lineHeight:1.35,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>
                              {r.title}
                            </div>
                            <div style={{ fontSize:'0.7rem',color:'var(--text-secondary)',marginTop:4 }}>{r.readTime} min</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      {/* ── Responsive sidebar collapse ── */}
      <style>{`
        @media (max-width: 900px) {
          article > div.container > div {
            grid-template-columns: 1fr !important;
          }
          article > div.container > div > aside {
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </>
  );
}

