import { NextResponse } from 'next/server';
import { comentarios } from '@/data/comentarios';

export async function GET(_req, { params }) {
  const lista = comentarios.filter((c) => c.slug === params.slug);
  return NextResponse.json(lista);
}
