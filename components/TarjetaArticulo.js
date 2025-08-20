import Image from 'next/image';
import Link from 'next/link';
import estilos from './TarjetaArticulo.module.css';
import ImagenConFallback from './ImagenConFallback';

export default function TarjetaArticulo({ articulo, prioritaria = false }) {
  // Desestructuro las propiedades del objeto artículo pasado como prop
  const { slug, titulo, resumen, imagenPortada, fechaPublicacion, categoria } =
    articulo;

  return (
    <article className={estilos.contenedorTarjeta}>
      <Link href={`/noticia/${slug}`} className={estilos.media}>
        {/* Uso el componente ImagenConFallback */}
        <ImagenConFallback
          src={imagenPortada}
          alt={titulo}
          width={800}
          height={450}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={prioritaria}
          quality={70}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
        />
        {/* Fin uso del componente ImagenConFallback */}
      </Link>

      <div className={estilos.cuerpo}>
        <p className={estilos.meta}>
          <span className={estilos.categoria}>{categoria}</span>
          <span> · {new Date(fechaPublicacion).toLocaleDateString()}</span>
        </p>
        <h3 className={estilos.titulo}>
          <Link href={`/noticia/${slug}`}>{titulo}</Link>
        </h3>
        <p className={estilos.resumen}>{resumen}</p>
      </div>
    </article>
  );
}
