'use client'
import { useState } from 'react'
import Link from 'next/link'
import WishlistButton from '@/components/WishlistButton'

const FILTERS = ['All', 'Oversized', 'Art Print', 'Bestseller', 'Premium', 'New In']

export default function TshirtGrid({ products }) {
  const [active, setActive] = useState('All')
  const [added, setAdded] = useState(null)
  const [selectedSize, setSelectedSize] = useState({})

  const filtered = active === 'All'
    ? products
    : products.filter(p =>
        p.tags === active ||
        (p.fit && p.fit.toLowerCase().includes(active.toLowerCase()))
      )

  function addToCart(p, e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({
      id: p.id, name: p.name, price: p.price,
      compare_price: p.compare_price, img: p.image_main_url,
      slug: p.slug, qty: 1,
    })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    window.dispatchEvent(new Event('mmc_open_cart'))
    setAdded(p.id)
    setTimeout(() => setAdded(null), 2000)
  }

  return (
    <div id="products" style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '8px' }}>All styles</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', letterSpacing: '0.02em', color: 'var(--ink)', lineHeight: 0.95 }}>T-SHIRTS</h2>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{filtered.length} styles</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{
            padding: '8px 20px',
            background: active === f ? 'var(--ink)' : 'transparent',
            color: active === f ? 'var(--white)' : 'var(--muted)',
            border: active === f ? '1px solid var(--ink)' : '1px solid var(--border)',
            cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', transition: 'all 0.2s',
          }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
        {filtered.map(p => {
          const off = p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0
          const isAdded = added === p.id
          const sizes = p.sizes || ['S', 'M', 'L', 'XL', 'XXL']
          return (
            <div key={p.id} style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--white)', transition: 'background 0.2s', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}>
              <Link href={'/products/' + p.slug} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--cream2)' }}>
                  <img src={p.image_main_url} alt={p.name} loading="lazy"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  {p.tags && (
                    <span style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, padding: '5px 10px', background: p.tags === 'Bestseller' ? 'var(--rose)' : 'var(--ink)', color: '#ffffff' }}>
                      {p.tags}
                    </span>
                  )}
                  <WishlistButton productId={p.id} />
                </div>
              </Link>
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  {p.gsm && <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>{p.gsm}</span>}
                  {p.fit && <><span style={{ fontSize: '9px', color: 'var(--border2)' }}>·</span><span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>{p.fit}</span></>}
                </div>
                <Link href={'/products/' + p.slug} style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '13px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.5, marginBottom: '10px', textDecoration: 'none' }}>
                  {p.name}
                </Link>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  {sizes.slice(0, 5).map(sz => (
                    <button key={sz} onClick={() => setSelectedSize(prev => ({ ...prev, [p.id]: sz }))} style={{ padding: '3px 8px', fontSize: '9px', letterSpacing: '0.06em', background: selectedSize[p.id] === sz ? 'var(--ink)' : 'transparent', color: selectedSize[p.id] === sz ? '#fff' : 'var(--muted)', border: selectedSize[p.id] === sz ? '1px solid var(--ink)' : '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                      {sz}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px', marginTop: 'auto' }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.02em', color: 'var(--ink)' }}>Rs.{p.price}</span>
                  {p.compare_price && <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price}</span>}
                  {off > 0 && <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rose)' }}>{off}% off</span>}
                </div>
                <button onClick={(e) => addToCart(p, e)} style={{ width: '100%', background: isAdded ? 'var(--rose)' : 'transparent', border: isAdded ? '1px solid var(--rose)' : '1px solid var(--border)', color: isAdded ? '#ffffff' : 'var(--muted)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '11px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { if (!isAdded) { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--ink)' } }}
                  onMouseLeave={e => { if (!isAdded) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' } }}>
                  {isAdded ? '✓ Added to bag' : 'Add to bag'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
