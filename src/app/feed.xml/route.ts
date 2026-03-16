import { articles } from '@/lib/data';
import { siteConfig } from '@/lib/seo';

export async function GET() {
  const baseUrl = siteConfig.url;
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name}</title>
    <description>${siteConfig.description}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <copyright>© ${new Date().getFullYear()} ${siteConfig.name}</copyright>
    ${articles.slice(0, 20).map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/article/${article.id}</link>
      <guid isPermaLink="true">${baseUrl}/article/${article.id}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <author>${article.author}</author>
      <category>${article.category}</category>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
