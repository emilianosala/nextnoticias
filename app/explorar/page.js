export const metadata = { title: 'Explorar | Next Noticias' };

import ExploradorArticulos from '@/components/ExploradorArticulos';

function GridSkeletonSSR() {
  return (
    <ul
      id="skeleton-explorar"
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

export default function PaginaExplorar() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Explorar (CSR con API + Redux)</h1>
      <p style={{ color: '#6b7280' }}>
        Lista cliente con Redux + fetch a <code>/api/articulos</code>.
      </p>
      <hr style={{ margin: '1rem 0 2rem' }} />

      {/* Skeleton server para el primer paint */}
      <GridSkeletonSSR />

      {/* Componente cliente que luego lo oculta y renderiza la grilla real */}
      <ExploradorArticulos />
    </main>
  );
}
