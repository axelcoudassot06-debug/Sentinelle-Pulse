import { Metadata } from 'next';
import { articles, categories } from '@/lib/data';

export const siteConfig = {
  name: 'Sentinelle Pulse',
  description: "Sentinelle Pulse — Magazine d'analyse géopolitique, défense nationale, OSINT et économie mondiale. Décryptages experts, données chiffrées 2025-2026, chronologies stratégiques. Renseignement, guerre hybride, intelligence économique.",
  url: 'https://sentinelle-pulse.com',
  ogImage: '/api/og',
};

export function generateMetadata(): Metadata {
  return {
    title: {
      default: `${siteConfig.name} | Actualité stratégique`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'géopolitique', 'défense nationale', 'OSINT', 'économie mondiale',
      'renseignement', 'analyse stratégique', 'sécurité internationale',
      'intelligence économique', 'guerre hybride', 'cybersécurité',
      'Sentinelle Pulse', 'magazine géopolitique français',
      'actualité géopolitique 2026', 'analyse défense France',
      'espionnage', 'géopolitique France',
    ],
    authors: [{ name: 'Sentinelle Pulse' }],
    creator: 'Sentinelle Pulse',
    publisher: 'Sentinelle Pulse',
    metadataBase: new URL(siteConfig.url),
    category: 'news',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: '@sentinellepulse',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateCategoryMetadata(category: string): Metadata {
  const cat = categories.find(c => c.id === category);
  if (!cat) return {};
  
  return {
    title: `${cat.name} | ${siteConfig.name}`,
    description: `Découvrez toutes les actualités et analyses sur ${cat.name.toLowerCase()}. ${siteConfig.name} vous propose une couverture complète.`,
    keywords: [cat.name.toLowerCase(), 'actualités', 'analyse', 'news'],
  };
}

export function generateArticleSchema(article: typeof articles[0]) {
  const cleanContent = article.content
    .replace(/<[^>]*>/g, '')
    .replace(/[`#*|<>]/g, '')
    .trim()
    .substring(0, 500);

  const keywords = article.title
    .split(/[\s—–\-·]+/)
    .filter((w: string) => w.length > 4)
    .join(', ');

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [
      {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/api/og?id=${article.id}`,
        width: 1200,
        height: 630,
      },
    ],
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    articleBody: cleanContent,
    keywords,
    wordCount: article.content.split(/\s+/).length,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: 'Analyste stratégique',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/article/${article.id}`,
    },
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-content'],
    },
  };
}

export function generateFAQSchema(article: typeof articles[0]) {
  const lines = article.content.split('\n');
  const faqs: { q: string; a: string }[] = [];
  for (let i = 0; i < lines.length && faqs.length < 5; i++) {
    const match = lines[i].match(/^## (.+)/);
    if (match) {
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        const para = lines[j].trim();
        if (para && !para.startsWith('#') && !para.startsWith('|') && !para.startsWith('<') && para.length > 30) {
          faqs.push({
            q: match[1].trim(),
            a: para.replace(/\*\*/g, '').substring(0, 250),
          });
          break;
        }
      }
    }
  }
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function generateBreadcrumbSchema(article: typeof articles[0], categoryName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: categoryName, item: `${siteConfig.url}/${article.category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${siteConfig.url}/article/${article.id}` },
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      'https://twitter.com/sentinellepulse',
      'https://linkedin.com/company/sentinellepulse',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-1-00-00-00-00',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
  };
}
