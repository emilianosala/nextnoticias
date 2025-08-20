//Este archivo es un acceso directo a los datos para usar desde server components
//En /noticia/[slug]/page.js uso este acceso, aunque también dejo un API endpoint disponible (/api/articulos/[slug])
import { articulos } from '@/data/articulos';

export async function obtenerArticuloPorSlug(slug) {
  //Verifica si el slug pasado como argumento existe en la lista de artículos
  return articulos.find((articulo) => articulo.slug === slug) || null;
}

export async function obtenerTodosLosSlugs() {
  //Devuelve una lista de todos los slugs de los artículos
  return articulos.map((a) => a.slug);
}
