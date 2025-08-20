import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { obtenerArticuloPorSlug, obtenerTodosLosSlugs } from '@/lib/articulos';
import ToggleComentarios from '@/components/ToggleComentarios';
import ImagenConFallback from '@/components/ImagenConFallback';

const URL_SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }) {
  const articulo = await obtenerArticuloPorSlug(params.slug);
  if (!articulo) return { title: 'Noticia no encontrada' };

  const urlCanonica = `${URL_SITIO}/noticia/${articulo.slug}`;
  const imagenOG = articulo.imagenPortada;

  return {
    title: articulo.titulo,
    description: articulo.resumen,
    alternates: { canonical: urlCanonica },
    openGraph: {
      type: 'article',
      title: articulo.titulo,
      description: articulo.resumen,
      url: urlCanonica,
      siteName: 'Next Noticias',
      images: [
        {
          url: imagenOG,
          width: 1200,
          height: 630,
          alt: articulo.titulo,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: articulo.titulo,
      description: articulo.resumen,
      images: [imagenOG],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await obtenerTodosLosSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PaginaNoticia({ params }) {
  const articulo = await obtenerArticuloPorSlug(params.slug);
  if (!articulo) return notFound();

  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <Link href="/">← Volver</Link>
      </nav>

      <h1>{articulo.titulo}</h1>
      <p>
        <small>
          {new Date(articulo.fechaPublicacion).toLocaleString()} —{' '}
          {articulo.autor} — {articulo.categoria}
        </small>
      </p>

      <div style={{ margin: '1rem 0' }}>
        <ImagenConFallback
          src={articulo.imagenPortada}
          alt={articulo.titulo}
          width={820}
          height={460}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
        />
      </div>

      <article dangerouslySetInnerHTML={{ __html: articulo.contenido }} />

      <hr style={{ margin: '2rem 0' }} />

      <ToggleComentarios slug={params.slug} />
    </main>
  );
}
