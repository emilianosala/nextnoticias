import { NextResponse } from 'next/server';
import { obtenerArticuloPorSlug } from '@/lib/articulos';

export async function GET(_req, { params }) {
  const articulo = await obtenerArticuloPorSlug(params.slug);
  if (!articulo)
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(articulo);
}
