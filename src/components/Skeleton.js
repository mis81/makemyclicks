export function SkeletonCard() {
  return (
    <div style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--ink)' }}>
      <div style={{ aspectRatio: '3/4', background: 'var(--ink3)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)', animation: 'shimmer 1.8s infinite' }} />
      </div>
      <div style={{ padding: '18px' }}>
        <div style={{ height: '12px', background: 'var(--ink3)', marginBottom: '8px', borderRadius: '2px', width: '80%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)', animation: 'shimmer 1.8s infinite' }} />
        </div>
        <div style={{ height: '12px', background: 'var(--ink3)', marginBottom: '16px', borderRadius: '2px', width: '55%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)', animation: 'shimmer 1.8s infinite 0.2s' }} />
        </div>
        <div style={{ height: '20px', background: 'var(--ink3)', marginBottom: '14px', borderRadius: '2px', width: '35%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)', animation: 'shimmer 1.8s infinite 0.4s' }} />
        </div>
        <div style={{ height: '38px', background: 'var(--ink3)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)', animation: 'shimmer 1.8s infinite 0.6s' }} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 4 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}
