'use client';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cargarArticulos,
  setCategoriaActual,
} from '@/lib/store/articulosSlice';
import { alternarFavorito } from '@/lib/store/favoritosSlice';
import Link from 'next/link';
import ImagenConFallback from './ImagenConFallback';

const CATEGORIAS = [
  'todas',
  'transporte',
  'clima',
  'deportes',
  'economia',
  'politica',
  'tecnologia',
  'ciencia',
  'cultura',
  'salud',
  'negocios',
];

// Skeleton con la misma grilla/alto que las tarjetas reales (evita saltos)
function GridSkeleton() {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2vw',
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <li
          key={i}
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          {/* Reservo alto 16:9 para la imagen */}
          <div
            style={{ aspectRatio: '16 / 9', width: '100%', background: '#eee' }}
          />
          <div style={{ padding: '1rem' }}>
            <div
              style={{
                height: 14,
                width: 120,
                background: '#eee',
                borderRadius: 6,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                height: 20,
                width: '80%',
                background: '#eee',
                borderRadius: 6,
                marginBottom: 10,
              }}
            />
            <div
              style={{
                height: 14,
                width: '95%',
                background: '#eee',
                borderRadius: 6,
                marginBottom: 6,
              }}
            />
            <div
              style={{
                height: 14,
                width: '88%',
                background: '#eee',
                borderRadius: 6,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ExploradorArticulos() {
  const dispatch = useDispatch();
  const { items, estado, error, categoriaActual } = useSelector(
    (s) => s.articulos
  );
  const favoritos = useSelector((s) => s.favoritos.ids);

  // ⬇️ Estado local para coordinar con el SSR skeleton
  const [ssrSkeletonActivo, setSsrSkeletonActivo] = useState(true);

  // Carga inicial y cuando cambia categoría
  useEffect(() => {
    dispatch(cargarArticulos(categoriaActual));
  }, [dispatch, categoriaActual]);

  // Mostrar/ocultar SSR skeleton según estado de Redux
  useEffect(() => {
    const el = document.getElementById('skeleton-explorar');
    if (!el) {
      setSsrSkeletonActivo(false); // no existe (p. ej. navegación interna directa)
      return;
    }
    if (estado === 'inicial' || estado === 'cargando') {
      el.style.display = ''; // visible
      el.setAttribute('aria-hidden', 'true');
      setSsrSkeletonActivo(true);
    } else {
      el.style.display = 'none'; // oculto (ya no ocupa lugar)
      setSsrSkeletonActivo(false);
    }
  }, [estado]);

  const cantidad = items.length;
  const tituloCategoria = useMemo(
    () =>
      categoriaActual === 'todas'
        ? 'Todas las categorías'
        : `Categoría: ${categoriaActual}`,
    [categoriaActual]
  );

  return (
    <div>
      {/* Filtro con altura mínima */}
      <div
        style={{
          minHeight: 56,
          margin: '0 0 16px',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <label>
          Categoría:{' '}
          <select
            value={categoriaActual}
            onChange={(e) => dispatch(setCategoriaActual(e.target.value))}
          >
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <span style={{ color: '#6b7280' }}>({cantidad} resultados)</span>
      </div>

      {/* ⚠️ SOLO skeleton cliente si el SSR ya no está activo */}
      {estado === 'cargando' && !ssrSkeletonActivo && <GridSkeleton />}
      {estado === 'error' && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {/* Grid real solo cuando no está cargando */}
      {estado !== 'cargando' && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2vw',
          }}
        >
          {items.map((art, index) => {
            const esFavorito = favoritos.includes(art.id);
            return (
              <li
                key={art.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#fff',
                }}
              >
                <Link
                  href={`/noticia/${art.slug}`}
                  style={{ display: 'block' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 9',
                    }}
                  >
                    <ImagenConFallback
                      src={art.imagenPortada}
                      alt={art.titulo}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={70}
                      priority={index === 0}
                      style={{ objectFit: 'cover' }}
                      placeholder="blur"
                      // base64 1x1 transparente válida (la tuya estaba truncada)
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/atbqUMAAAAASUVORK5CYII="
                    />
                  </div>
                </Link>

                <div style={{ padding: '1rem' }}>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '.9rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        border: '1px solid #e5e7eb',
                        borderRadius: 999,
                        textTransform: 'capitalize',
                        color: '#374151',
                      }}
                    >
                      {art.categoria}
                    </span>{' '}
                    · {new Date(art.fechaPublicacion).toLocaleDateString()}
                  </p>

                  {/* alturas reservadas */}
                  <h3
                    style={{
                      margin: '.25rem 0 .5rem',
                      fontSize: '1.1rem',
                      lineHeight: 1.35,
                      minHeight: '2.7rem',
                    }}
                  >
                    <Link href={`/noticia/${art.slug}`}>{art.titulo}</Link>
                  </h3>
                  <p
                    style={{ margin: 0, color: '#374151', minHeight: '3.6rem' }}
                  >
                    {art.resumen}
                  </p>

                  <div style={{ marginTop: 12 }}>
                    <button
                      onClick={() => dispatch(alternarFavorito(art.id))}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 8,
                        border: '1px solid #e5e7eb',
                        background: esFavorito ? '#fde68a' : '#f9fafb',
                        cursor: 'pointer',
                      }}
                      aria-pressed={esFavorito}
                    >
                      {esFavorito ? '★ Guardado' : '☆ Guardar'}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {estado === 'listo' && items.length === 0 && (
        <p>No se encontraron artículos para esta categoría.</p>
      )}
      <p style={{ marginTop: 16, color: '#6b7280' }}>{tituloCategoria}</p>
    </div>
  );
}
