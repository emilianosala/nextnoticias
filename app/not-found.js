import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>❌ Página no encontrada</h1>
      <p>La página que buscas no existe o fue eliminada.</p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Volver a inicio
      </Link>
    </div>
  );
}
