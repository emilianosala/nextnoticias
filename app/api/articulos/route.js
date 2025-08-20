import { NextResponse } from 'next/server';
import { articulos } from '@/data/articulos';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cat = searchParams.get('cat');

  const lista =
    cat && cat !== 'todas'
      ? articulos.filter((a) => a.categoria === cat)
      : articulos;

  // Orden descendente por fecha
  const ordenada = [...lista].sort(
    (a, b) => +new Date(b.fechaPublicacion) - +new Date(a.fechaPublicacion)
  );

  return NextResponse.json(ordenada);
}
