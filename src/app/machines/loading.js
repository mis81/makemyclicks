import { SkeletonGrid } from '@/components/Skeleton'
export default function Loading() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>
      <div style={{ height: '60px', background: 'var(--ink3)', marginBottom: '48px', borderRadius: '2px', width: '260px' }} />
      <SkeletonGrid count={3} />
    </div>
  )
}
