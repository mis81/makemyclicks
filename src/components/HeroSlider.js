'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const SLIDES = [
  {
    badge: 'New Collection',
    title: 'WEAR IT',
    titleAccent: 'YOUR WAY',
    sub: '240 GSM pure cotton oversized tees. Built for everyday comfort.',
    cta: 'Shop Now',
    ctaHref: '/products',
    img: 'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg',
    align: 'left',
  },
  {
    badge: 'Bestseller',
    title: 'BIG &',
    titleAccent: 'TALL',
    sub: 'Oversized fits for every body type. Wear Large at 6ft 4in.',
    cta: 'Shop Big & Tall',
    ctaHref: '/products?cat=tall',
    img: 'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg',
    align: 'left',
  },
  {
    badge: 'Art Print',
    title: 'ART MEETS',
    titleAccent: 'WEAR',
    sub: "Instinct Print House collab. Unique prints you won't find anywhere else.",
    cta: 'Shop Art Prints',
    ctaHref: '/products?cat=art',
    img: 'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg',
    align: 'right',
  },
  {
    badge: 'Premium',
    title: 'PURE',
    titleAccent: 'PREMIUM',
    sub: 'Terry cotton 240 GSM. Soft, breathable, built to last.',
    cta: 'Shop Premium',
    ctaHref: '/products?cat=premium',
    img: 'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg',
    align: 'left',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setProgress(0)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 500)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  useEffect(() => {
    setProgress(0)
    const t = setTimeout(() => setProgress(100), 50)
    return () => clearTimeout(t)
  }, [current])

  const s = SLIDES[current]

  return (
    <div style={{ padding: '16px 40px 24px', background: 'var(--ink)' }}>
    <div style={{ position: 'relative', width: '100%', height: '480px', overflow: 'hidden', background: 'var(--ink2)', borderRadius: '16px' }}>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: animating ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}>
        <img
          src={s.img}
          alt={s.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: animating ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 5s ease, opacity 0.5s ease',
          }}
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.1) 100%)' }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1400px', margin: '0 auto',
        padding: '0 40px', height: '100%',
        display: 'flex', alignItems: 'center',
        justifyContent: s.align === 'right' ? 'flex-end' : 'flex-start',
      }}>
        <div style={{
          maxWidth: '560px',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
        }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold)', color: 'var(--ink)', fontSize: '10px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '6px 14px', marginBottom: '28px' }}>
            {s.badge}
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,4.5vw,68px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--fog)', marginBottom: '20px' }}>
            {s.title}<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{s.titleAccent}</em>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: '15px', color: 'rgba(245,244,240,0.6)', lineHeight: 1.8, marginBottom: '40px', fontWeight: 300, maxWidth: '400px' }}>
            {s.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href={s.ctaHref} style={{ background: 'var(--fog)', color: 'var(--ink)', padding: '15px 36px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}
              onMouseEnter={e => e.target.style.background = 'var(--gold)'}
              onMouseLeave={e => e.target.style.background = 'var(--fog)'}>
              {s.cta}
            </Link>
            <Link href="/collections" style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(245,244,240,0.5)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--fog)'}
              onMouseLeave={e => e.target.style.color = 'rgba(245,244,240,0.5)'}>
              All collections →
            </Link>
          </div>
        </div>
      </div>

      {/* Left arrow */}
      <button onClick={prev} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,10,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', backdropFilter: 'blur(8px)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.3)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.5)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}>
        ←
      </button>

      {/* Right arrow */}
      <button onClick={next} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,10,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', backdropFilter: 'blur(8px)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.3)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.5)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}>
        →
      </button>

      {/* Dots + progress */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', alignItems: 'center', zIndex: 2 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: i === current ? '32px' : '8px', height: '3px', background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.3)', transition: 'width 0.3s ease, background 0.3s ease', borderRadius: '2px' }} />
          </button>
        ))}
      </div>

      {/* Progress bar at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 3 }}>
        <div style={{ height: '100%', background: 'var(--gold)', width: progress + '%', transition: progress === 100 ? 'width 5s linear' : 'none' }} />
      </div>

      {/* Slide counter */}
      <div style={{ position: 'absolute', bottom: '32px', right: '40px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '.1em', zIndex: 2 }}>
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>
    </div>
    </div>
  )
}
