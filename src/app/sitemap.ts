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

  const articlePages = articles.map((article) => {
    const date = new Date(article.date);
    const ageInDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
    const priority = ageInDays < 30 ? 0.95 : ageInDays < 90 ? 0.85 : 0.75;
    return {
      url: `${baseUrl}/article/${article.id}`,
      lastModified: date,
      changeFrequency: 'weekly' as const,
      priority,
    };
  });

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
