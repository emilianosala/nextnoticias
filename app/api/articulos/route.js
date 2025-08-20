export const revalidate = 60; // cache ISR del response 60s

import { NextResponse } from 'next/server';
import { articulos } from '@/data/articulos';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cat = searchParams.get('cat');

  const lista =
    cat && cat !== 'todas'
      ? articulos.filter((a) => a.categoria === cat)
      : articulos;

  const ordenada = [...lista].sort(
    (a, b) => +new Date(b.fechaPublicacion) - +new Date(a.fechaPublicacion)
  );

  // Extra: añade headers explícitos (opcional, pero ayuda a CDNs/proxies)
  const res = NextResponse.json(ordenada);
  res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  return res;
}
