'use client';

import { useEffect, useState } from 'react';

export default function Comentarios({ slug }) {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let vivo = true;
    fetch(`/api/articulos/${slug}/comentarios`)
      .then((r) => r.json())
      .then((data) => {
        if (vivo) setLista(data);
      })
      .finally(() => {
        if (vivo) setCargando(false);
      });
    return () => {
      vivo = false;
    };
  }, [slug]);

  if (cargando) return <p>Cargando…</p>;
  if (!lista.length) return <p>No hay comentarios todavía.</p>;

  return (
    <ul
      style={{
        paddingLeft: 0,
        listStyle: 'none',
        display: 'grid',
        gap: '.75rem',
      }}
    >
      {lista.map((c) => (
        <li
          key={c.id}
          style={{
            border: '1px solid #eee',
            borderRadius: 8,
            padding: '0.75rem 1rem',
          }}
        >
          <strong>{c.usuario}</strong>{' '}
          <small>— {new Date(c.fechaCreacion).toLocaleString()}</small>
          <p style={{ margin: '.5rem 0 0' }}>{c.mensaje}</p>
        </li>
      ))}
    </ul>
  );
}
