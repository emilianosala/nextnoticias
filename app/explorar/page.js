export const metadata = { title: 'Explorar | Next Noticias' };

import ExploradorArticulos from '@/components/ExploradorArticulos';

export default function PaginaExplorar() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Explorar (CSR con API + Redux)</h1>
      <p style={{ color: '#6b7280' }}>
        Esta vista usa un Client Component que consulta{' '}
        <code>/api/articulos</code> y guarda los datos en Redux Toolkit.
      </p>
      <hr style={{ margin: '1rem 0 2rem' }} />
      <section>
        <ExploradorArticulos />
      </section>
    </main>
  );
}
