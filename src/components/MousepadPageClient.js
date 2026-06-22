'use client'
import { useState, useEffect } from 'react'

const HERO_SLIDES = [
  { img: 'https://abhbsihvzfxgmogknvwm.supabase.co/storage/v1/object/public/product-images/mousepad-hero1.jpg', eyebrow: 'For the Serious Gamer', line1: 'PRECISION', line2: 'SURFACES', sub: 'Non-slip gaming mousepads engineered for maximum precision. Smooth glide. Stitched edges. Built to last.', cta: 'Shop Gaming', position: 'center center' },
  { img: 'https://abhbsihvzfxgmogknvwm.supabase.co/storage/v1/object/public/product-images/mousepad-hero2.jpg', eyebrow: 'Aesthetic Workspace', line1: 'DESK PADS', line2: 'REDEFINED', sub: 'Japanese art-inspired XL desk pads. Premium fabric surface. Transform your workspace into a work of art.', cta: 'Shop Art Pads', position: 'center center' },
]

const FILTERS = ['All', 'Gaming', 'Art Print', 'Desk Pad', 'XL Size']

export default function MousepadPageClient({ products }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [active, setActive] = useState('All')
  const [added, setAdded] = useState(null)
  const [selectedSize, setSelectedSize] = useState({})

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => { setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length); setAnimating(false) }, 400)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  function goSlide(idx) {
    setAnimating(true)
    setTimeout(() => { setCurrentSlide(idx); setAnimating(false) }, 400)
  }

  function addToCart(p, e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, compare_price: p.compare_price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    window.dispatchEvent(new Event('mmc_open_cart'))
    setAdded(p.id)
    setTimeout(() => setAdded(null), 2000)
  }

  const s = HERO_SLIDES[currentSlide]

  return (
    <div style={{ background: 'var(--cream)' }}>
      <div style={{ padding: '16px 40px 0', background: 'var(--cream)' }}>
        <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--border)' }}>
          {HERO_SLIDES.map((slide, i) => (
            <img key={i} src={slide.img} alt={slide.line1} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: slide.position, display: 'block', opacity: i === currentSlide ? 1 : 0, transition: 'opacity 0.6s ease' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: currentSlide === 0 ? 'linear-gradient(to right, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.05) 100%)' : 'linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.0) 100%)', transition: 'background 0.6s' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, padding: '0 56px', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '520px', opacity: animating ? 0 : 1, transform: animating ? 'translateY(12px)' : 'translateY(0)', transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '24px', height: '1px', background: 'var(--rose)', display: 'inline-block' }} />{s.eyebrow}
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px,6vw,88px)', lineHeight: 0.88, letterSpacing: '0.02em', color: '#ffffff', marginBottom: '20px' }}>
                {s.line1}<br /><span style={{ color: 'var(--rose)' }}>{s.line2}</span>
              </h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px', fontWeight: 300, maxWidth: '400px' }}>{s.sub}</p>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="#products" style={{ background: 'var(--white)', color: 'var(--ink)', padding: '13px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.target.style.background = 'var(--rose)'; e.target.style.color = '#fff' }}
                  onMouseLeave={e => { e.target.style.background = 'var(--white)'; e.target.style.color = 'var(--ink)' }}>{s.cta}</a>
                <a href="#products" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>View all →</a>
              </div>
            </div>
          </div>
          <button onClick={() => goSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', zIndex: 3, borderRadius: '4px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--rose)'; e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>←</button>
          <button onClick={() => goSlide((currentSlide + 1) % HERO_SLIDES.length)}
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', zIndex: 3, borderRadius: '4px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--rose)'; e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>→</button>
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)} style={{ width: i === currentSlide ? '28px' : '8px', height: '3px', background: i === currentSlide ? 'var(--rose)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease', borderRadius: '2px' }} />
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '24px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', zIndex: 3 }}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--ink)', margin: '0 40px', borderRadius: '0 0 12px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid var(--border-dark)' }}>
          {[
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>, title: 'Precision Surface', desc: 'Smooth glide for gaming & office' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, title: 'Non-Slip Base', desc: 'Rubber grip holds firm always' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: 'Stitched Edges', desc: 'Anti-fray reinforced border' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: 'Free Delivery', desc: 'On all orders above Rs.499' },
          ].map((f, i) => (
            <div key={i} style={{ borderRight: '1px solid var(--border-dark)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '34px', height: '34px', flexShrink: 0, border: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rose)' }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="products" style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '8px' }}>Precision surfaces</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', letterSpacing: '0.02em', color: 'var(--ink)', lineHeight: 0.95 }}>ALL MOUSEPADS</h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{products.length} products</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{ padding: '8px 20px', background: active === f ? 'var(--ink)' : 'transparent', color: active === f ? 'var(--white)' : 'var(--muted)', border: active === f ? '1px solid var(--ink)' : '1px solid var(--border)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s' }}
              onMouseEnter={e => { if (active !== f) { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)' } }}
              onMouseLeave={e => { if (active !== f) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' } }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
          {products.map(p => {
            const off = p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0
            const isAdded = added === p.id
            const sizes = (p.sizes && Array.isArray(p.sizes) ? p.sizes : ['Small', 'Medium', 'Large', 'XL'])
            return (
              <div key={p.id} style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--white)', transition: 'background 0.2s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}>
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--cream2)' }}>
                  <img src={p.image_main_url} alt={p.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  {p.tags && <span style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, padding: '5px 10px', background: p.tags === 'Bestseller' ? 'var(--rose)' : 'var(--ink)', color: '#ffffff' }}>{p.tags}</span>}
                </div>
                <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.5, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {sizes.slice(0, 3).map(sz => (
                      <button key={sz} onClick={() => setSelectedSize(prev => ({ ...prev, [p.id]: sz }))} style={{ padding: '3px 8px', fontSize: '9px', letterSpacing: '0.06em', background: selectedSize[p.id] === sz ? 'var(--ink)' : 'transparent', color: selectedSize[p.id] === sz ? '#fff' : 'var(--muted)', border: selectedSize[p.id] === sz ? '1px solid var(--ink)' : '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                        {typeof sz === 'string' ? sz.split(' ')[0] : sz}
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

      <div style={{ position: 'relative', margin: '0 40px 40px', height: '300px', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <img src="https://abhbsihvzfxgmogknvwm.supabase.co/storage/v1/object/public/product-images/mousepad-hero2.jpg" alt="Aesthetic Desk Pads"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)', display: 'flex', alignItems: 'center', padding: '0 56px' }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '12px' }}>Aesthetic workspace</p>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,4vw,56px)', lineHeight: 0.9, color: '#ffffff', marginBottom: '20px' }}>ELEVATE YOUR<br />WORKSPACE</div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '260px', marginBottom: '24px', fontWeight: 300 }}>Art-inspired desk pads that transform any setup into a masterpiece.</p>
            <a href="#products" style={{ background: 'var(--white)', color: 'var(--ink)', padding: '12px 24px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.target.style.background = 'var(--rose)'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.background = 'var(--white)'; e.target.style.color = 'var(--ink)' }}>
              Shop Desk Pads →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
