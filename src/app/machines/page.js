'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const HERO_SLIDES = [
  {
    img: 'https://i.ibb.co/N2QLf1Sq/Chat-GPT-Image-Jun-22-2026-03-42-39-PM.png',
    eyebrow: 'DTF & UV Printing Equipment',
    line1: 'PRINTING',
    line2: 'MACHINES',
    sub: 'Professional DTF and UV printing machines for garment and surface printing. Trade and retail pricing available.',
    cta: 'Shop Machines',
    position: 'center center',
  },
  {
    img: 'https://i.ibb.co/d4Fgvv9D/Chat-GPT-Image-Jun-22-2026-03-43-24-PM.png',
    eyebrow: 'Industrial Grade Equipment',
    line1: 'BUILT TO',
    line2: 'PERFORM',
    sub: 'High precision DTF printers. 1440 DPI resolution. Complete setup with RIP software included.',
    cta: 'View Specs',
    position: 'center center',
  },
]

const MACHINES = [
  {
    id: 'MMC-MCH-001',
    name: 'A3 DTF Inkjet Printer — Heat Transfer T-Shirt Set',
    price: 84999,
    compare_price: 124999,
    image_main_url: 'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg',
    slug: 'a3-dtf-inkjet-printer',
    tags: 'Bestseller',
    desc: 'Professional A3 DTF inkjet printer set for heat transfer printing on t-shirts and garments.',
    specs: ['Print Width: A3 (297mm)', 'Resolution: 1440 DPI', 'Ink Type: DTF Pigment', 'Includes: Shaker + Oven'],
  },
  {
    id: 'MMC-MCH-002',
    name: 'UV DTF A3 Printer — 30cm Roll Popular Model',
    price: 94999,
    compare_price: 149999,
    image_main_url: 'https://i.ibb.co/fYrjYmYY/Imprimante-UV-DTF-A3-populaire-rouleau-de-30cm.jpg',
    slug: 'uv-dtf-a3-printer-30cm',
    tags: 'New In',
    desc: 'Popular UV DTF A3 printer with 30cm roll capability. Print on glass, metal, wood and more.',
    specs: ['Print Width: 30cm Roll', 'UV Curing: Built-in LED', 'Substrate: Multi-surface', 'Resolution: 2400 DPI'],
  },
  {
    id: 'MMC-MCH-003',
    name: 'A3 DTF Complete Production Set',
    price: 109999,
    compare_price: 174999,
    image_main_url: 'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg',
    slug: 'a3-dtf-complete-set',
    tags: 'Top Pick',
    desc: 'Complete DTF production setup. Ideal for small to mid-scale garment printing businesses.',
    specs: ['Full DTF Workflow', 'Auto Powder Shaker', 'Heat Press Included', 'RIP Software License'],
  },
]

export default function MachinesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [added, setAdded] = useState(null)

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

  function addToCart(p, e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
    window.dispatchEvent(new Event('mmc_open_cart'))
    setAdded(p.id)
    setTimeout(() => setAdded(null), 2000)
  }

  const s = HERO_SLIDES[currentSlide]

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ── KREO STYLE CONTAINED HERO BANNER ── */}
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
            <img key={i} src={slide.img} alt={slide.line1}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: slide.position,
                display: 'block',
                opacity: i === currentSlide ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }} />
          ))}

          {/* Dark overlay — left heavy for text */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.15) 100%)',
          }} />

          {/* Rose glow accent */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 75% 50%, rgba(201,116,138,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          {/* Content */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            padding: '0 56px',
            display: 'flex', alignItems: 'center',
          }}>
            <div style={{
              maxWidth: '520px',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(12px)' : 'translateY(0)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}>
              {/* Eyebrow */}
              <div style={{
                fontSize: '10px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--rose)',
                fontWeight: 600, marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ width: '24px', height: '1px', background: 'var(--rose)', display: 'inline-block' }} />
                {s.eyebrow}
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(56px,6vw,88px)',
                lineHeight: 0.88, letterSpacing: '0.02em',
                color: '#ffffff', marginBottom: '20px',
              }}>
                {s.line1}<br />
                <span style={{ color: 'var(--rose)' }}>{s.line2}</span>
              </h1>

              {/* Sub */}
              <p style={{
                fontSize: '14px', color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8, marginBottom: '32px',
                fontWeight: 300, maxWidth: '400px',
              }}>
                {s.sub}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="#machines" style={{
                  background: 'var(--white)', color: 'var(--ink)',
                  padding: '13px 28px', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-block',
                  transition: 'background 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.target.style.background = 'var(--rose)'; e.target.style.color = '#fff' }}
                  onMouseLeave={e => { e.target.style.background = 'var(--white)'; e.target.style.color = 'var(--ink)' }}>
                  {s.cta}
                </a>
                <a href="#machines" style={{
                  fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                  View all →
                </a>
              </div>
            </div>
          </div>

          {/* Left Arrow */}
          <button onClick={() => goSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px', zIndex: 3,
              borderRadius: '4px', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--rose)'; e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
            ←
          </button>

          {/* Right Arrow */}
          <button onClick={() => goSlide((currentSlide + 1) % HERO_SLIDES.length)}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px', zIndex: 3,
              borderRadius: '4px', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--rose)'; e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
            →
          </button>

          {/* Dots */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '50%',
            transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3,
          }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)} style={{
                width: i === currentSlide ? '28px' : '8px', height: '3px',
                background: i === currentSlide ? 'var(--rose)' : 'rgba(255,255,255,0.3)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s ease', borderRadius: '2px',
              }} />
            ))}
          </div>

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: '20px', right: '24px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '12px', letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.35)', zIndex: 3,
          }}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* ── SPECS STRIP ── */}
      <div style={{ background: 'var(--ink)', margin: '0 40px', borderRadius: '0 0 12px 12px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderLeft: '1px solid var(--border-dark)',
        }}>
          {[
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, title: 'DTF & UV Printing', desc: 'Latest inkjet technology' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: '1 Year Warranty', desc: 'Full parts and labour' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Training Included', desc: 'On-site setup support' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: 'Pan-India Delivery', desc: 'Safe freight shipping' },
          ].map((f, i) => (
            <div key={i} style={{
              borderRight: '1px solid var(--border-dark)',
              padding: '24px 24px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '36px', height: '36px', flexShrink: 0,
                border: '1px solid var(--border-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--rose)',
              }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '3px' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MACHINES GRID ── */}
      <div id="machines" style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '48px', paddingBottom: '16px', borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '8px' }}>Available now</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', letterSpacing: '0.02em', color: 'var(--ink)', lineHeight: 0.95 }}>
              ALL MACHINES
            </h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{MACHINES.length} products</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {MACHINES.map(p => {
            const off = Math.round(((p.compare_price - p.price) / p.compare_price) * 100)
            const isAdded = added === p.id
            return (
              <div key={p.id} style={{
                background: 'var(--white)', display: 'flex',
                flexDirection: 'column', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}>

                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--cream2)' }}>
                  <img src={p.image_main_url} alt={p.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <span style={{
                    position: 'absolute', top: '14px', left: '14px',
                    fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
                    fontWeight: 700, padding: '5px 10px',
                    background: p.tags === 'Bestseller' ? 'var(--rose)' : 'var(--ink)',
                    color: '#ffffff',
                  }}>{p.tags}</span>
                </div>

                {/* Info */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4, marginBottom: '10px' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 300 }}>{p.desc}</div>

                  {/* Specs */}
                  <div style={{ marginBottom: '20px' }}>
                    {p.specs.map((spec, i) => (
                      <div key={i} style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <span style={{ color: 'var(--rose)', fontSize: '8px' }}>◆</span>{spec}
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', letterSpacing: '0.02em', color: 'var(--ink)' }}>
                        Rs.{p.price.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price.toLocaleString()}</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rose)' }}>{off}% off</span>
                    </div>

                    <button onClick={(e) => addToCart(p, e)} style={{
                      width: '100%',
                      background: isAdded ? 'var(--rose)' : 'transparent',
                      border: isAdded ? '1px solid var(--rose)' : '1px solid var(--border)',
                      color: isAdded ? '#ffffff' : 'var(--muted)',
                      cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                      fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em',
                      textTransform: 'uppercase', padding: '12px', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { if (!isAdded) { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--ink)' } }}
                      onMouseLeave={e => { if (!isAdded) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' } }}>
                      {isAdded ? '✓ Added to bag' : 'Add to bag'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── BOTTOM CTA BANNER ── */}
      <div style={{
        position: 'relative', margin: '0 40px 40px',
        height: '320px', overflow: 'hidden',
        borderRadius: '12px', border: '1px solid var(--border)',
      }}>
        <img src="https://i.ibb.co/N2QLf1Sq/Chat-GPT-Image-Jun-22-2026-03-42-39-PM.png"
          alt="Machines"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 50%, transparent 100%)',
          display: 'flex', alignItems: 'center',
          padding: '0 56px',
        }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '12px' }}>Need help choosing?</p>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,4vw,56px)', lineHeight: 0.9, color: '#ffffff', marginBottom: '20px' }}>
              TALK TO OUR<br />EXPERTS
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '28px', fontWeight: 300 }}>
              Get personalized recommendations for your printing business.
            </p>
            <Link href="/contact" style={{
              background: 'var(--white)', color: 'var(--ink)',
              padding: '13px 28px', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-block',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => { e.target.style.background = 'var(--rose)'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.background = 'var(--white)'; e.target.style.color = 'var(--ink)' }}>
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
