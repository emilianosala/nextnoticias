export const metadata = { title: 'Explorar | Next Noticias' };
import ExploradorArticulos from '@/components/ExploradorArticulos';
import { articulos as data } from '@/data/articulos';

export default function PaginaExplorar() {
  const articulosIniciales = [...data].sort(
    (a, b) => +new Date(b.fechaPublicacion) - +new Date(a.fechaPublicacion)
  );

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Explorar (CSR con API + Redux)</h1>
      <p style={{ color: '#6b7280' }}>
        Primera carga renderizada en el servidor; cambios de categoría via Redux
        + /api.
      </p>
      <hr style={{ margin: '1rem 0 2rem' }} />

      <ExploradorArticulos
        articulosIniciales={articulosIniciales}
        categoriaInicial="todas"
      />
    </main>
  );
}
