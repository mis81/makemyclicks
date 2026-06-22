'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import WishlistButton from '@/components/WishlistButton'

export default function ProductCard({ product: p }) {
  const off = p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0

  function addToCart(e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, compare_price: p.compare_price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    window.dispatchEvent(new Event('mmc_open_cart'))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      style={{
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--white)',
        cursor: 'pointer',
        display: 'block',
      }}
    >
      <Link href={'/products/' + p.slug} style={{ textDecoration: 'none', display: 'block' }}>
        {/* Image container */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--cream2)' }}>
          <motion.img
            src={p.image_main_url}
            alt={p.name}
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Badge */}
          {p.tags && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                position: 'absolute', top: '14px', left: '14px',
                fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
                fontWeight: 700, padding: '5px 10px',
                background: p.tags === 'Bestseller' ? 'var(--rose)' : 'var(--ink)',
                color: '#ffffff',
              }}
            >
              {p.tags}
            </motion.span>
          )}

          {/* Wishlist button */}
          <WishlistButton productId={p.id} />

          {/* Quick add overlay on hover */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '12px',
              background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={addToCart}
              style={{
                width: '100%', background: 'rgba(245,240,232,0.95)',
                border: 'none', color: 'var(--ink)',
                padding: '10px', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              }}
            >
              Quick Add
            </motion.button>
          </motion.div>
        </div>

        {/* Info */}
        <div style={{ padding: '18px' }}>
          <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.5, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {p.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: 'var(--ink)' }}>Rs.{p.price}</span>
            {p.compare_price && <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price}</span>}
            {off > 0 && <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rose)' }}>{off}% off</span>}
          </div>

          <motion.button
            whileHover={{ backgroundColor: 'var(--ink)', color: '#ffffff', borderColor: 'var(--ink)' }}
            whileTap={{ scale: 0.97 }}
            onClick={addToCart}
            transition={{ duration: 0.15 }}
            style={{
              width: '100%', background: 'transparent',
              border: '1px solid var(--border)', color: 'var(--muted)',
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '11px',
            }}
          >
            Add to bag
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}
