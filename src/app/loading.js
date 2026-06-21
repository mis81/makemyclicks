export default function Loading() {
  return (
    <div style={{ width: '100%', height: '88vh', background: 'var(--ink2)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)', animation: 'shimmer 2s infinite' }} />
      <div style={{ position: 'absolute', bottom: '32px', left: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '120px', height: '28px', background: 'rgba(201,169,110,0.2)', borderRadius: '2px' }} />
        <div style={{ width: '340px', height: '80px', background: 'rgba(245,244,240,0.06)', borderRadius: '2px' }} />
        <div style={{ width: '260px', height: '16px', background: 'rgba(245,244,240,0.04)', borderRadius: '2px' }} />
        <div style={{ width: '160px', height: '44px', background: 'rgba(245,244,240,0.08)', borderRadius: '2px' }} />
      </div>
    </div>
  )
}
