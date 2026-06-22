'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const TSHIRTS = [
  {
    id: 'MMC-ST-0089',
    name: 'Instinct Print House × Grace Beswick Unisex Tee',
    price: 230,
    compare_price: 300,
    image_main_url: 'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg',
    slug: 'instinct-print-house-tee',
    tags: 'Art Print',
    cat: 'art',
    desc: 'Unique collab art print tee. Unisex oversized fit.',
    gsm: '240 GSM',
    fit: 'Oversized',
  },
  {
    id: 'MMC-ST-0087',
    name: 'Big & Tall Oversized Unisex T-Shirt',
    price: 230,
    compare_price: 546,
    image_main_url: 'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg',
    slug: 'big-tall-oversized-tee',
    tags: 'Bestseller',
    cat: 'oversized',
    desc: 'Inclusive sizing for every body. Modelled at 6ft 4in.',
    gsm: '240 GSM',
    fit: 'Oversized',
  },
  {
    id: 'MMC-ST-0082',
    name: 'Veirdo Oversized Tee — 240 GSM Pure Cotton',
    price: 230,
    compare_price: 740,
    image_main_url: 'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg',
    slug: 'veirdo-240gsm-tee',
    tags: 'Top Pick',
    cat: 'oversized',
    desc: 'Premium 240 GSM pure cotton. Daily wear essential.',
    gsm: '240 GSM',
    fit: 'Oversized',
  },
  {
    id: 'MMC-ST-0085',
    name: 'Premium Terry Cotton Oversized T-Shirt 240 GSM',
    price: 230,
    compare_price: 452,
    image_main_url: 'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg',
    slug: 'premium-terry-cotton-tee',
    tags: 'New In',
    cat: 'premium',
    desc: 'Terry cotton 240 GSM. Soft, breathable, premium feel.',
    gsm: '240 GSM',
    fit: 'Oversized',
  },
]

const FILTERS = ['All', 'Oversized', 'Art Print', 'Bestseller', 'Premium']

const HERO_SLIDES = [
  {
    img: 'https://i.ibb.co/DDyZpqW2/Chat-GPT-Image-Jun-22-2026-02-24-08-PM.png',
    eyebrow: 'New Collection',
    line1: 'WEAR YOUR',
    line2: 'STYLE',
    sub: '240 GSM pure cotton. Oversized cuts engineered for real bodies. One price — Rs.230.',
    cta: 'Shop Now',
    bgWord: 'STYLE',
  },
  {
    img: 'https://i.ibb.co/21cNQk46/Chat-GPT-Image-Jun-22-2026-02-18-53-PM.png',
    eyebrow: 'Limited Edition',
    line1: 'WEAR YOUR',
    line2: 'ESSENCE',
    sub: 'T-shirts that define you. Premium cotton crafted for comfort. Made for every mood.',
    cta: 'Explore Collection',
    bgWord: 'ESSENCE',
  },
]

export default function TshirtsPage() {
  const [active, setActive] = useState('All')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [addedId, setAddedId] = useState(null)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)
        setAnimating(false)
      }, 400)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  function goSlide(idx) {
    setAnimating(true)
    setTimeout(() => { setCurrentSlide(idx); setAnimating(false) }, 400)
  }

  const filtered = active === 'All'
    ? TSHIRTS
    : TSHIRTS.filter(p => p.tags === active || p.cat === active.toLowerCase())

  function addToCart(p, e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, compare_price: p.compare_price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    window.dispatchEvent(new Event('mmc_open_cart'))
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 2000)
  }

  const s = HERO_SLIDES[currentSlide]

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ── HERO BANNER (contained, Kreo-style) ── */}
      <div style={{ padding: '16px 40px 0', background: 'var(--cream)' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
          borderRadius: '16px',
          border: '1px solid var(--border)',
        }}>
          {/* Background images */}
          {HERO_SLIDES.map((slide, i) => (
            <img key={i} src={slide.img} alt={slide.line2}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                objectPosition: 'center top',
                opacity: i === currentSlide ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }} />
          ))}

          {/* Overlay gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.3) 45%, rgba(10,10,10,0.0) 100%)',
          }} />

          {/* Giant watermark word */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(100px,16vw,220px)',
            lineHeight: 0.85, letterSpacing: '-0.02em',
            color: 'rgba(10,10,10,0.06)',
            whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
            opacity: animating ? 0 : 1,
            transition: 'opacity 0.4s',
          }}>
            {s.bgWord}
          </div>

          {/* Content */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            maxWidth: '1400px', margin: '0 auto', padding: '0 40px',
            display: 'flex', alignItems: 'flex-end', paddingBottom: '48px',
          }}>
            <div style={{
              maxWidth: '520px',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(12px)' : 'translateY(0)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}>
              {/* Eyebrow */}
              <div style={{
                fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--rose)', fontWeight: 600, marginBottom: '14px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ width: '24px', height: '1px', background: 'var(--rose)', display: 'inline-block' }} />
                {s.eyebrow}
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(48px,5.5vw,80px)',
                lineHeight: 0.9, letterSpacing: '0.01em',
                color: '#ffffff', marginBottom: '16px',
              }}>
                {s.line1}<br />
                <span style={{ color: 'var(--rose)' }}>{s.line2}</span>
              </h1>

              {/* Sub */}
              <p style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.8, marginBottom: '24px',
                fontWeight: 300, maxWidth: '360px',
              }}>
                {s.sub}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="#products" style={{
                  background: 'var(--white)', color: 'var(--ink)',
                  padding: '12px 28px', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-block',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => { e.target.style.background = 'var(--rose)'; e.target.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.target.style.background = 'var(--white)'; e.target.style.color = 'var(--ink)' }}>
                  {s.cta}
                </a>
                <Link href="/collections" style={{
                  fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  All Collections →
                </Link>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button onClick={() => goSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', zIndex: 3, transition: 'all 0.2s', borderRadius: '4px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
            ←
          </button>
          <button onClick={() => goSlide((currentSlide + 1) % HERO_SLIDES.length)}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', zIndex: 3, transition: 'all 0.2s', borderRadius: '4px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
            →
          </button>

          {/* Dots */}
          <div style={{
            position: 'absolute', bottom: '16px', left: '50%',
            transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3,
          }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)}
                style={{
                  width: i === currentSlide ? '28px' : '8px',
                  height: '3px', background: i === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.35)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease', borderRadius: '2px',
                }} />
            ))}
          </div>

          {/* Slide counter */}
          <div style={{
            position: 'absolute', bottom: '20px', right: '20px',
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '13px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', zIndex: 3,
          }}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* ── FEATURES STRIP ── */}
      <div style={{ background: 'var(--ink)', borderBottom: '1px solid var(--border-dark)', marginTop: '16px' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 40px',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderLeft: '1px solid var(--border-dark)',
        }}>
          {[
            { icon: '◈', title: '240 GSM Cotton', desc: 'Premium pure cotton fabric' },
            { icon: '◈', title: 'Oversized Fit', desc: 'True oversized cut for all bodies' },
            { icon: '◈', title: 'Rs.230 Flat', desc: 'One price for all styles' },
            { icon: '◈', title: 'Free Delivery', desc: 'On orders above Rs.499' },
          ].map((f, i) => (
            <div key={i} style={{
              borderRight: '1px solid var(--border-dark)',
              padding: '22px 24px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <span style={{ color: 'var(--rose)', fontSize: '18px', flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS SECTION ── */}
      <div id="products" style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>

        {/* Section header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '8px' }}>
              All styles
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(32px,3.5vw,48px)', letterSpacing: '0.02em',
              color: 'var(--ink)', lineHeight: 0.95,
            }}>
              T-SHIRTS
            </h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{filtered.length} styles</p>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              padding: '8px 20px',
              background: active === f ? 'var(--ink)' : 'transparent',
              color: active === f ? 'var(--white)' : 'var(--muted)',
              border: active === f ? '1px solid var(--ink)' : '1px solid var(--border)',
              cursor: 'pointer', fontFamily: "'Inter',sans-serif",
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { if (active !== f) { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)' } }}
              onMouseLeave={e => { if (active !== f) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' } }}>
              {f}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderTop: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
        }}>
          {filtered.map(p => {
            const off = Math.round(((p.compare_price - p.price) / p.compare_price) * 100)
            const isAdded = addedId === p.id
            return (
              <div key={p.id} style={{
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                background: 'var(--white)', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}>

                {/* Image */}
                <Link href={'/products/' + p.slug} style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--cream2)' }}>
                    <img src={p.image_main_url} alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    <span style={{
                      position: 'absolute', top: '14px', left: '14px',
                      fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
                      fontWeight: 700, padding: '5px 10px',
                      background: p.tags === 'Bestseller' ? 'var(--rose)' : 'var(--ink)',
                      color: 'var(--white)',
                    }}>{p.tags}</span>
                    <button style={{
                      position: 'absolute', top: '10px', right: '10px',
                      width: '32px', height: '32px',
                      background: 'rgba(245,240,232,0.9)',
                      border: '1px solid var(--border)', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: 'var(--muted)', transition: 'all 0.2s',
                    }}
                      onClick={e => e.preventDefault()}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--rose)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,240,232,0.9)'; e.currentTarget.style.color = 'var(--muted)' }}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>
                </Link>

                {/* Info */}
                <div style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>{p.gsm}</span>
                    <span style={{ fontSize: '9px', color: 'var(--border2)' }}>·</span>
                    <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>{p.fit}</span>
                  </div>

                  <Link href={'/products/' + p.slug} style={{
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    fontSize: '13px', fontWeight: 400,
                    color: 'var(--ink)', lineHeight: 1.5, marginBottom: '10px',
                    textDecoration: 'none',
                  }}>{p.name}</Link>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', letterSpacing: '0.02em', color: 'var(--ink)' }}>Rs.{p.price}</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rose)' }}>{off}% off</span>
                  </div>

                  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {['S','M','L','XL','XXL'].map(sz => (
                      <button key={sz} style={{
                        width: '32px', height: '28px',
                        background: 'transparent', border: '1px solid var(--border)',
                        color: 'var(--muted)', fontSize: '10px', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s',
                        fontFamily: "'Inter',sans-serif",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                        {sz}
                      </button>
                    ))}
                  </div>

                  <button onClick={(e) => addToCart(p, e)} style={{
                    width: '100%',
                    background: isAdded ? 'var(--rose)' : 'transparent',
                    color: isAdded ? 'var(--white)' : 'var(--muted)',
                    border: isAdded ? '1px solid var(--rose)' : '1px solid var(--border)',
                    cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase', padding: '11px', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { if (!isAdded) { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--ink)' } }}
                    onMouseLeave={e => { if (!isAdded) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' } }}>
                    {isAdded ? '✓ Added to bag' : 'Add to bag'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── BOTTOM BANNER ── */}
      <div style={{
        position: 'relative', width: '100%', height: '400px',
        overflow: 'hidden', borderTop: '1px solid var(--border)',
      }}>
        <img src="https://i.ibb.co/21cNQk46/Chat-GPT-Image-Jun-22-2026-02-18-53-PM.png"
          alt="Collection"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(245,240,232,0.92) 0%, rgba(245,240,232,0.5) 45%, transparent 100%)',
          display: 'flex', alignItems: 'center',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', width: '100%' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '12px' }}>Wear Your Essence</p>
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(48px,6vw,80px)',
              lineHeight: 0.88, color: 'var(--ink)', marginBottom: '20px',
            }}>
              PREMIUM<br />COTTON TEES
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '300px', marginBottom: '28px', fontWeight: 300 }}>
              Crafted for comfort. Made for every mood. Rs.230 flat price.
            </p>
            <a href="#products" style={{
              background: 'var(--ink)', color: 'var(--white)',
              padding: '14px 32px', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-block',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.target.style.background = 'var(--rose)'}
              onMouseLeave={e => e.target.style.background = 'var(--ink)'}>
              Shop All Tees
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
