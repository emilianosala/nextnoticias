import Link from 'next/link';

export default function NoticiaNoEncontrada() {
  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Noticia no encontrada</h1>
      <p>La nota que buscás no existe o fue movida.</p>
      <p>
        <Link href="/">← Volver al inicio</Link>
      </p>
    </main>
  );
}
