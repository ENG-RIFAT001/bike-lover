import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bikelover.com.bd';

  const staticRoutes = [
    '',
    '/bikes',
    '/brand/yamaha',
    '/brand/honda',
    '/brand/suzuki',
    '/brand/tvs',
    '/brand/bajaj',
    '/used-bikes-bangladesh',
    '/yamaha-used-bikes',
    '/honda-used-bikes',
    '/bike-buying-guide',
    '/bike-selling-guide',
    '/registration-transfer-guide',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
