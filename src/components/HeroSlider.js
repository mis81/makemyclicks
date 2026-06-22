'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const SLIDES = [
  {
    badge: 'SS 2025 Collection',
    line1: 'WEAR IT',
    line2: 'YOUR WAY',
    sub: '240 GSM pure cotton. Oversized cuts engineered for real bodies.',
    cta: 'Shop Now',
    ctaHref: '/products',
    img: 'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg',
    bgWord: 'COTTON',
  },
  {
    badge: 'Bestseller',
    line1: 'BIG &',
    line2: 'TALL',
    sub: 'Oversized fits for every body. Wear Large at 6ft 4in — no compromise.',
    cta: 'Shop Big & Tall',
    ctaHref: '/products?cat=tall',
    img: 'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg',
    bgWord: 'OVERSIZE',
  },
  {
    badge: 'Limited Edition',
    line1: 'ART MEETS',
    line2: 'WEAR',
    sub: 'Instinct Print House collab. Unique prints you will not find anywhere else.',
    cta: 'Shop Art Prints',
    ctaHref: '/products?cat=art',
    img: 'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg',
    bgWord: 'ARTISAN',
  },
  {
    badge: 'Premium Fabric',
    line1: 'PURE',
    line2: 'PREMIUM',
    sub: 'Terry cotton 240 GSM. Soft, breathable, built to last a lifetime.',
    cta: 'Shop Premium',
    ctaHref: '/products?cat=premium',
    img: 'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg',
    bgWord: 'PREMIUM',
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
    setTimeout(() => { setCurrent(idx); setAnimating(false) }, 500)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  useEffect(() => {
    setProgress(0)
    const t = setTimeout(() => setProgress(100), 80)
    return () => clearTimeout(t)
  }, [current])

  const s = SLIDES[current]

  return (
    <div className="hero">
      <div className="hero-slide">
        {SLIDES.map((slide, i) => (
          <img key={i} src={slide.img} alt={slide.line1}
            className={`hero-bg-img ${i === current ? 'active' : ''}`} />
        ))}
        <div className="hero-bg-overlay" />

        <div className="hero-giant-text"
          style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.5s' }}>
          {s.bgWord}
        </div>

        <div className="hero-content">
          <div className="hero-text" style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(16px)' : 'translateY(0)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}>
            <div className="hero-eyebrow">{s.badge}</div>
            <h1 className="hero-headline">
              {s.line1}<br /><em>{s.line2}</em>
            </h1>
            <p className="hero-body">{s.sub}</p>
            <div className="hero-ctas">
              <Link href={s.ctaHref} className="btn-primary">{s.cta}</Link>
              <Link href="/collections" className="btn-ghost">All collections</Link>
            </div>
          </div>
          <div className="hero-counter">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>
        </div>

        <button className="hero-arrow hero-arrow-left" onClick={prev}>←</button>
        <button className="hero-arrow hero-arrow-right" onClick={next}>→</button>

        <div className="hero-nav-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)}>
              <div className="hero-dot-inner" />
            </button>
          ))}
        </div>

        <div className="hero-progress">
          <div className="hero-progress-bar" style={{ width: progress + '%', transition: progress === 100 ? 'width 5s linear' : 'none' }} />
        </div>
      </div>
    </div>
  )
}
