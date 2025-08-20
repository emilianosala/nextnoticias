'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function BarraFiltro({
  categoriaSeleccionada,
  categoriasDisponibles,
}) {
  //Permite navegar por la página programáticamente.
  //Lo uso para actualizar la URL con la categoría seleccionada como query param.
  const router = useRouter();
  //Permite acceder a la ruta actual sin query params.
  //Lo uso para mantener esa parte de la URL y reconstruirla con los query params que necesite.
  const pathname = usePathname();
  //Al ser un client component necesito usar el hook useSearchParams en lugar de la prop "searchParams".
  //Este hook devuelve un objeto de solo lectura con los query params de la URL.
  //Lo uso para saber qué categoría está activa en la URL y mostrar el filtro correctamente.
  const searchParams = useSearchParams();

  // Función para manejar el cambio de categoría
  function manejarCambioCategoria(evento) {
    //Obtengo el valor actual del campo select y lo guardo en nuevaCategoria
    const nuevaCategoria = evento.target.value;
    //Creo una copia editable de searchParams
    const params = new URLSearchParams(searchParams);

    //Actualizo el query param "cat" según la categoría seleccionada
    //Si la categoría es "todas", elimino el parámetro "cat" de la URL
    if (nuevaCategoria === 'todas') {
      params.delete('cat');
    } else {
      params.set('cat', nuevaCategoria);
    }

    //Construyo la URL de destino con los nuevos query params
    const queryString = params.toString();
    const urlDestino = queryString ? `${pathname}?${queryString}` : pathname;

    //Navego a la URL construida sin recargar y sin perder el scroll
    router.replace(urlDestino, { scroll: false });
  }

  return (
    <div
      style={{
        margin: '1rem 0',
        padding: '1rem',
        background: '#f5f5f5',
        borderRadius: 8,
        textAlign: 'center',
      }}
    >
      <label>
        Categoría:{' '}
        <select value={categoriaSeleccionada} onChange={manejarCambioCategoria}>
          {categoriasDisponibles.map((nombreCategoria) => (
            <option key={nombreCategoria} value={nombreCategoria}>
              {nombreCategoria}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
