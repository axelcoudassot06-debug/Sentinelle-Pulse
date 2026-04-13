import { Metadata } from 'next';
import { articles, categories } from '@/lib/data';

export const siteConfig = {
  name: 'Sentinelle Pulse',
  description: 'Votre source d\'information sur l\'économie, la géopolitique, la défense et l\'OSINT. Analyses approfondies et actualité en temps réel.',
  url: 'https://sentinelle-pulse.vercel.app',
  ogImage: '/og-image.jpg',
};

export function generateMetadata(): Metadata {
  return {
    title: {
      default: `${siteConfig.name} | Actualité stratégique`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ['actualités', 'économie', 'géopolitique', 'défense', 'OSINT', 'analyse', 'stratégie', 'news'],
    authors: [{ name: 'Sentinelle Pulse' }],
    creator: 'Sentinelle Pulse',
    publisher: 'Sentinelle Pulse',
    metadataBase: new URL(siteConfig.url),
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
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: `${siteConfig.url}/logo.png`,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    wordCount: article.content.split(/\s+/).length,
    author: {
      '@type': 'Person',
      name: article.author,
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
