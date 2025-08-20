// app/sitemap.js
import { articulos } from '@/data/articulos';

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'http://localhost:3000';

  const urlsArticulos = articulos.map((articulo) => ({
    url: `${baseUrl}/noticia/${articulo.slug}`,
    lastModified: articulo.fechaPublicacion,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    ...urlsArticulos,
  ];
}
