'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ListaComentarios = dynamic(() => import('@/components/Comentarios'), {
  ssr: false,
  loading: () => <p>Cargando comentarios…</p>,
});

export default function ToggleComentarios({ slug }) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <section>
      <h2 style={{ marginBottom: '1vw' }}>Comentarios</h2>
      {mostrar ? (
        <button onClick={() => setMostrar(false)}>Ocultar comentarios</button>
      ) : (
        <button onClick={() => setMostrar(true)}>Mostrar comentarios</button>
      )}
      {mostrar && (
        <>
          <ListaComentarios slug={slug} />
        </>
      )}
    </section>
  );
}
