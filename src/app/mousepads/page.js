'use client'
import { useState } from 'react'
import Link from 'next/link'

const MOUSEPADS = [
  {
    id: 'MMC-MP-001',
    name: 'Non-Slip Gaming Mousepad — Smooth Surface',
    price: 349,
    compare_price: 699,
    image_main_url: 'https://i.ibb.co/4ZNBQygw/Non-Slip-Gaming-Mouse-Pad-Materials-100-smooth.jpg',
    slug: 'non-slip-gaming-mousepad',
    tags: 'Bestseller',
    desc: '100% smooth surface with non-slip rubber base. Perfect for gaming and daily office use.',
    sizes: ['Small 25x20cm', 'Medium 35x25cm', 'Large 45x40cm', 'XL 80x40cm'],
  },
  {
    id: 'MMC-MP-002',
    name: 'Stock Market Chart Desk Mousepad',
    price: 399,
    compare_price: 799,
    image_main_url: 'https://i.ibb.co/cKZhYCXV/Stock-Market-Chart-Muster-Quadratisches-Mauspad.jpg',
    slug: 'stock-market-chart-mousepad',
    tags: 'New In',
    desc: 'Square desk pad with stock market chart print. Premium stitched edges. Ideal for traders and professionals.',
    sizes: ['Medium 35x35cm', 'Large 45x45cm'],
  },
  {
    id: 'MMC-MP-003',
    name: 'Gaming Workspace Upgrade XL Pad',
    price: 549,
    compare_price: 999,
    image_main_url: 'https://i.ibb.co/PZbt6kZc/Level-Up-Your-Gaming-Workspace-Upgrade-your.jpg',
    slug: 'gaming-workspace-xl-mousepad',
    tags: 'Top Pick',
    desc: 'Level up your gaming workspace. Full desk coverage with anti-fray stitched edges and RGB-compatible surface.',
    sizes: ['Large 45x40cm', 'XL 80x40cm', 'XXL 90x45cm'],
  },
  {
    id: 'MMC-MP-004',
    name: 'Premium Aesthetic Desk Pad',
    price: 449,
    compare_price: 899,
    image_main_url: 'https://i.ibb.co/KjgfFVMx/Elevate-Your-Workspace-Premium-Aesthetic-Desk.jpg',
    slug: 'premium-aesthetic-desk-pad',
    tags: 'Art Print',
    desc: 'Elevate your workspace with this premium aesthetic desk pad. Soft top, non-slip base, stitched edges.',
    sizes: ['Medium 35x25cm', 'Large 45x40cm', 'XL 80x40cm'],
  },
]

export default function MousepadsPage() {
  const [selected, setSelected] = useState(null)

  function addToCart(p, e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    setSelected(p.id)
    setTimeout(() => setSelected(null), 2000)
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>

      {/* Breadcrumb */}
      <div style={{ marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '12px' }}>Home</Link>
        <span style={{ color: 'var(--muted2)' }}>/</span>
        <span style={{ color: 'var(--fog)', fontSize: '12px' }}>Mousepads</span>
      </div>

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>Precision surfaces</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.02em' }}>Mousepads</h1>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{MOUSEPADS.length} products</p>
      </div>

      {/* Features strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '48px' }}>
        {[
          {
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
              </svg>
            ),
            title: 'Precision Surface',
            desc: 'Smooth glide for gaming and office use'
          },
          {
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
            ),
            title: 'Non-Slip Base',
            desc: 'Rubber grip holds firm on any surface'
          },
          {
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            ),
            title: 'Stitched Edges',
            desc: 'Anti-fray reinforced border for long life'
          },
          {
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            ),
            title: 'Free Delivery',
            desc: 'On all orders above Rs.499'
          },
        ].map((f, i) => (
          <div key={i} style={{ padding: '28px', background: 'var(--ink2)' }}>
            <div style={{ width: '34px', height: '34px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--gold)' }}>
              {f.icon}
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fog)', fontWeight: 600, marginBottom: '6px' }}>{f.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
        {MOUSEPADS.map(p => {
          const off = Math.round(((p.compare_price - p.price) / p.compare_price) * 100)
          const added = selected === p.id
          return (
            <div key={p.id} style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--ink)', transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--ink2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}>
              <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--ink3)' }}>
                <img src={p.image_main_url} alt={p.name} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                <span style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, padding: '5px 10px', background: p.tags === 'Bestseller' ? 'var(--gold)' : 'var(--ink)', color: p.tags === 'Bestseller' ? 'var(--ink)' : 'var(--fog)' }}>{p.tags}</span>
              </div>
              <div style={{ padding: '18px' }}>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--fog)', lineHeight: 1.5, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '19px', fontWeight: 700, color: 'var(--fog)' }}>Rs.{p.price}</span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--gold)' }}>{off}% off</span>
                </div>
                <button
                  onClick={(e) => addToCart(p, e)}
                  style={{ width: '100%', background: added ? 'var(--gold)' : 'transparent', border: '1px solid var(--border)', color: added ? 'var(--ink)' : 'var(--muted)', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', padding: '11px', transition: 'all .2s' }}
                  onMouseEnter={e => { if (!added) { e.target.style.background = 'var(--fog)'; e.target.style.color = 'var(--ink)'; e.target.style.borderColor = 'var(--fog)' } }}
                  onMouseLeave={e => { if (!added) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--muted)'; e.target.style.borderColor = 'var(--border)' } }}>
                  {added ? '✓ Added to bag' : 'Add to bag'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
