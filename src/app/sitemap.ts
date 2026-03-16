import { MetadataRoute } from 'next';
import { articles, categories } from '@/lib/data';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    { route: '', priority: 1, freq: 'daily' as const },
    { route: '/economie', priority: 0.9, freq: 'daily' as const },
    { route: '/geopolitique', priority: 0.9, freq: 'daily' as const },
    { route: '/defense', priority: 0.9, freq: 'daily' as const },
    { route: '/osint', priority: 0.9, freq: 'daily' as const },
    { route: '/search', priority: 0.7, freq: 'weekly' as const },
  ].map(({ route, priority, freq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/article/${article.id}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
