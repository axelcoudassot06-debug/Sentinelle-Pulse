import { MetadataRoute } from 'next';
import { articles } from '@/lib/data';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    '',
    '/economie',
    '/geopolitique',
    '/defense',
    '/osint',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/article/${article.id}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
