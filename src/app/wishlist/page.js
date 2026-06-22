'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useWishlist } from '@/hooks/useWishlist'
import WishlistButton from '@/components/WishlistButton'
import { supabase } from '@/lib/supabase'

export default function WishlistPage() {
  const { wishlist, toggle } = useWishlist()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!wishlist.length) { setLoading(false); return }
    supabase
      .from('products')
      .select('*')
      .in('id', wishlist)
      .then(({ data }) => {
        setProducts(data || [])
        setLoading(false)
      })
  }, [wishlist])

  function addToCart(p) {
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    window.dispatchEvent(new Event('mmc_open_cart'))
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '8px' }}>Saved items</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,4vw,56px)', color: 'var(--ink)', lineHeight: 0.95 }}>
            MY WISHLIST
            {wishlist.length > 0 && (
              <span style={{ fontSize: '20px', color: 'var(--muted)', marginLeft: '16px' }}>
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </h1>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--muted)' }}>Loading...</div>
        ) : wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🤍</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: 'var(--ink)', marginBottom: '12px' }}>Your wishlist is empty</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>Save items you love by clicking the heart icon</p>
            <Link href="/tshirts" style={{ background: 'var(--ink)', color: '#fff', padding: '14px 32px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
            {products.map(p => {
              const off = p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0
              return (
                <div key={p.id} style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--white)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--cream2)' }}>
                    <Link href={'/products/' + p.slug}>
                      <img src={p.image_main_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </Link>
                    <WishlistButton productId={p.id} />
                  </div>
                  <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Link href={'/products/' + p.slug} style={{ fontSize: '13px', color: 'var(--ink)', textDecoration: 'none', lineHeight: 1.5, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {p.name}
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px', marginTop: 'auto' }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: 'var(--ink)' }}>Rs.{p.price}</span>
                      {p.compare_price && <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price}</span>}
                      {off > 0 && <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rose)' }}>{off}% off</span>}
                    </div>
                    <button onClick={() => addToCart(p)} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '11px', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--ink)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                      Add to bag
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
