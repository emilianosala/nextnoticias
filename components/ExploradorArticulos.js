'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cargarArticulos,
  setCategoriaActual,
} from '@/lib/store/articulosSlice';
import { alternarFavorito } from '@/lib/store/favoritosSlice';

import Image from 'next/image';
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

export default function ExploradorArticulos() {
  const dispatch = useDispatch();
  const { items, estado, error, categoriaActual } = useSelector(
    (s) => s.articulos
  );
  const favoritos = useSelector((s) => s.favoritos.ids);

  // Cargar al montar o cuando cambia la categoría
  useEffect(() => {
    dispatch(cargarArticulos(categoriaActual));
  }, [dispatch, categoriaActual]);

  const cantidad = items.length;

  const tituloCategoria = useMemo(() => {
    return categoriaActual === 'todas'
      ? 'Todas las categorías'
      : `Categoría: ${categoriaActual}`;
  }, [categoriaActual]);

  return (
    <div>
      {/* Filtro controlado por Redux */}
      <div
        style={{
          margin: '0 0 16px',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
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

      {/* Estados */}
      {estado === 'cargando' && <p>Cargando artículos…</p>}
      {estado === 'error' && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {/* Grid */}
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
              <Link href={`/noticia/${art.slug}`} style={{ display: 'block' }}>
                <ImagenConFallback
                  src={art.imagenPortada}
                  alt={art.titulo}
                  width={800}
                  height={450}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={70}
                  priority={index === 0}
                />
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
                <h3
                  style={{
                    margin: '.25rem 0 .5rem',
                    fontSize: '1.1rem',
                    lineHeight: 1.35,
                  }}
                >
                  <Link href={`/noticia/${art.slug}`}>{art.titulo}</Link>
                </h3>
                <p style={{ margin: 0, color: '#374151' }}>{art.resumen}</p>

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

      {estado === 'listo' && items.length === 0 && (
        <p>No se encontraron artículos para esta categoría.</p>
      )}
      <p style={{ marginTop: 16, color: '#6b7280' }}>{tituloCategoria}</p>
    </div>
  );
}
