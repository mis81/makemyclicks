'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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

export default function TshirtHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animating, setAnimating] = useState(false)

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

  const s = HERO_SLIDES[currentSlide]

  return (
    <div style={{ padding: '16px 40px 0', background: 'var(--cream)' }}>
      <div style={{
        position: 'relative', width: '100%', height: '520px',
        overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--border)',
      }}>
        {HERO_SLIDES.map((slide, i) => (
          <img key={i} src={slide.img} alt={slide.line2}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%',
              display: 'block', position: 'absolute', inset: 0,
              opacity: i === currentSlide ? 1 : 0, transition: 'opacity 0.6s ease',
            }} />
        ))}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.3) 45%, rgba(10,10,10,0.0) 100%)',
        }} />

        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(100px,16vw,220px)', lineHeight: 0.85,
          letterSpacing: '-0.02em', color: 'rgba(10,10,10,0.06)',
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          opacity: animating ? 0 : 1, transition: 'opacity 0.4s',
        }}>{s.bgWord}</div>

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
            <div style={{
              fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--rose)', fontWeight: 600, marginBottom: '14px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--rose)', display: 'inline-block' }} />
              {s.eyebrow}
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(48px,5.5vw,80px)', lineHeight: 0.9,
              letterSpacing: '0.01em', color: '#ffffff', marginBottom: '16px',
            }}>
              {s.line1}<br /><span style={{ color: 'var(--rose)' }}>{s.line2}</span>
            </h1>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '24px', fontWeight: 300, maxWidth: '360px' }}>
              {s.sub}
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="#products" style={{
                background: 'var(--white)', color: 'var(--ink)',
                padding: '12px 28px', fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s',
              }}
                onMouseEnter={e => { e.target.style.background = 'var(--rose)'; e.target.style.color = '#ffffff' }}
                onMouseLeave={e => { e.target.style.background = 'var(--white)'; e.target.style.color = 'var(--ink)' }}>
                {s.cta}
              </a>
              <Link href="/collections" style={{
                fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = '#ffffff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                All Collections →
              </Link>
            </div>
          </div>
        </div>

        <button onClick={() => goSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', zIndex: 3, borderRadius: '4px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>←</button>
        <button onClick={() => goSlide((currentSlide + 1) % HERO_SLIDES.length)}
          style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', zIndex: 3, borderRadius: '4px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>→</button>

        <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} style={{
              width: i === currentSlide ? '28px' : '8px', height: '3px',
              background: i === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.35)',
              border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease', borderRadius: '2px',
            }} />
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '13px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', zIndex: 3 }}>
          {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}
