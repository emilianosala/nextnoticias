export default function LoadingApp() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem' }}>
      <div
        style={{
          height: 36,
          width: '60%',
          background: '#eee',
          borderRadius: 8,
          margin: '0 auto 24px',
        }}
      />

      {/* Barra de filtro */}
      <div
        style={{
          height: 56,
          width: '100%',
          background: '#f5f5f5',
          borderRadius: 8,
          marginBottom: 24,
        }}
      />

      {/* Grid de tarjetas (skeleton) */}
      <div
        style={{
          display: 'grid',
          gap: '2vw',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #eee',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '100%', height: 180, background: '#eee' }} />
            <div style={{ padding: '1rem' }}>
              <div
                style={{
                  height: 14,
                  width: 120,
                  background: '#eee',
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  height: 20,
                  width: '80%',
                  background: '#eee',
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  height: 14,
                  width: '95%',
                  background: '#eee',
                  borderRadius: 6,
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  height: 14,
                  width: '88%',
                  background: '#eee',
                  borderRadius: 6,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
