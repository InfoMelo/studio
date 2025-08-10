
import { MetadataRoute } from 'next'
import { getArticles } from '@/app/admin/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://websitersmeloy.web.app';

  // Get all articles for dynamic routes
  const articles = await getArticles();
  const articleUrls = articles.map(article => ({
    url: `${baseUrl}/articles/${article.docId}`,
    lastModified: new Date(article.createdAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/facilities`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
        url: `${baseUrl}/doctors`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9,
    },
    {
        url: `${baseUrl}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${baseUrl}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 0.6,
    }
  ];

  return [...staticUrls, ...articleUrls];
}

    