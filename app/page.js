import estilos from './page.module.css';
import TarjetaArticulo from '@/components/TarjetaArticulo';
import BarraFiltro from '@/components/BarraFiltro';
import { articulos as articulosData } from '@/data/articulos';

// Si los datos vinieran de una API externa o base de datos podría agregar alguna de estas líneas:
// export const revalidate = 0; (los datos se regeneran en cada request)
// export const revalidate = 60; (en este caso se regeneraría como máximo cada 60 seg, pero puedo poner la cantidad que quiera)
// Pero como los datos son locales (/data/articulos.js) no hace falta.

export default async function PaginaInicio({ searchParams }) {
  const params = await searchParams;

  // Si en la URL hay un parámetro "cat", se usa su valor; de lo contrario, se usa "todas"
  const categoriaSeleccionada = params?.cat || 'todas';

  // Creo una copia del arreglo de artículos y ordeno los artículos de la copia por fecha de publicación
  // (de más nuevos a más viejos)
  const articulosOrdenados = [...articulosData].sort(
    (articuloMasReciente, articuloMasAntiguo) =>
      +new Date(articuloMasAntiguo.fechaPublicacion) -
      +new Date(articuloMasReciente.fechaPublicacion)
  );

  // Creo un arreglo con las categorías disponibles, agregando "todas" al principio
  const categoriasDisponibles = [
    'todas',
    ...new Set(articulosOrdenados.map((articulo) => articulo.categoria)),
  ];

  // Filtro los artículos según la categoría seleccionada
  const articulosFiltrados =
    categoriaSeleccionada === 'todas'
      ? articulosOrdenados
      : articulosOrdenados.filter(
          (articulo) => articulo.categoria === categoriaSeleccionada
        );

  return (
    <div className={estilos.pagina}>
      <h1 className={estilos.titulo}>Bienvenido a Next Noticias</h1>

      {/* ------- Componente filtro ------- */}
      <BarraFiltro
        categoriaSeleccionada={categoriaSeleccionada}
        categoriasDisponibles={categoriasDisponibles}
      />
      {/* ------- Fin componente filtro ------- */}

      <div className={estilos.subtitulo}>Últimas noticias</div>
      <ul className={estilos.listaArticulos}>
        {/* Mapeo los artículos filtrados */}
        {articulosFiltrados.map((articulo) => (
          <li key={articulo.id}>
            <TarjetaArticulo articulo={articulo} />
          </li>
        ))}
        {/* Fin mapeo */}
      </ul>
    </div>
  );
}
