import { articles } from '@/lib/data';
import { siteConfig } from '@/lib/seo';

// Google News sitemap — shows articles published in the last 2 days
// but we include last 30 days to maximize coverage
export async function GET() {
  const baseUrl = siteConfig.url;

  const recentArticles = articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50); // Google News accepts max 1000, we take most recent 50

  const categoryLabels: Record<string, string> = {
    geopolitique: 'Géopolitique',
    defense: 'Défense',
    economie: 'Économie',
    osint: 'OSINT',
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${recentArticles.map(article => `  <url>
    <loc>${baseUrl}/article/${article.id}</loc>
    <news:news>
      <news:publication>
        <news:name>Sentinelle Pulse</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.date).toISOString()}</news:publication_date>
      <news:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      <news:keywords>${[
        article.category,
        categoryLabels[article.category] || '',
        'géopolitique',
        'analyse stratégique',
        'Sentinelle Pulse',
      ].filter(Boolean).join(', ')}</news:keywords>
    </news:news>
    <image:image>
      <image:loc>${baseUrl}/api/og?id=${article.id}</image:loc>
      <image:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
