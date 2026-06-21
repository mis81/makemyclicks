'use client'
import Link from 'next/link'
export default function ProductCard({ product: p }) {
  const off = p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0
  function addToCart(e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    window.dispatchEvent(new Event('mmc_open_cart'))
  }
  return (
    <Link href={'/products/' + p.slug} className="product-card">
      <div className="prod-img">
        <img src={p.image_main_url} alt={p.name} loading="lazy" />
        {p.tags && <span className={'prod-badge' + (p.tags === 'Bestseller' ? ' gold' : '')}>{p.tags}</span>}
        <button className="prod-wish" onClick={e => { e.preventDefault() }} aria-label="Wishlist">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="prod-info">
        <div className="prod-name">{p.name}</div>
        <div className="prod-price-row">
          <span className="prod-price">Rs.{p.price}</span>
          {p.compare_price && <span className="prod-mrp">Rs.{p.compare_price}</span>}
          {off > 0 && <span className="prod-off">{off}% off</span>}
        </div>
        <button className="prod-add" onClick={addToCart}>Add to bag</button>
      </div>
    </Link>
  )
}
