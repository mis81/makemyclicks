'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const HERO_SLIDES = [
  {
    img: 'https://i.ibb.co/gL17T3X3/995154848928107194.jpg',
    eyebrow: 'Premium Corporate Gifts',
    line1: 'MAKE EVERY',
    line2: 'GESTURE COUNT',
    sub: 'Curated corporate gift hampers for your team, clients and events. Minimum 25 units.',
    cta: 'Get a Quote',
    position: 'center center',
  },
  {
    img: 'https://i.ibb.co/jP1Vbgfq/download-1.jpg',
    eyebrow: 'Bulk & Custom Orders',
    line1: 'GIFTING DONE',
    line2: 'RIGHT',
    sub: 'Premium hampers with custom branding. Your logo, our quality. Pan-India delivery.',
    cta: 'Enquire Now',
    position: 'center center',
  },
]

const PACKAGES = [
  {
    name: 'Starter Pack',
    moq: '25 units minimum',
    price: 'Rs.999',
    originalPrice: 'Rs.1,799',
    img: 'https://i.ibb.co/jP1Vbgfq/download-1.jpg',
    tag: 'Popular',
    includes: ['240 GSM Premium Tee', 'Thank You Card', 'Eco Kraft Box'],
    color: false,
  },
  {
    name: 'Executive Pack',
    moq: '50 units minimum',
    price: 'Rs.1,499',
    originalPrice: 'Rs.2,999',
    img: 'https://i.ibb.co/gL17T3X3/995154848928107194.jpg',
    tag: 'Bestseller',
    includes: ['240 GSM Premium Tee', 'Branded Mug', 'Desk Pad', 'Premium Box', 'Ribbon & Card'],
    color: true,
  },
  {
    name: 'Luxury Pack',
    moq: '100 units minimum',
    price: 'Rs.2,499',
    originalPrice: 'Rs.4,999',
    img: 'https://i.ibb.co/jP1Vbgfq/download-1.jpg',
    tag: 'Premium',
    includes: ['240 GSM Custom Tee', 'Premium Hamper Box', 'Branded Mug', 'Notebook & Pen', 'Custom Tissue', 'Gold Ribbon & Tag'],
    color: false,
  },
]

const PROCESS = [
  { num: '01', title: 'Choose Package', desc: 'Pick from our curated gift packages or request a fully custom bundle.' },
  { num: '02', title: 'Share Branding', desc: 'Send your logo, colors, and any custom message or artwork.' },
  { num: '03', title: 'We Produce', desc: 'Our team prints, packs and quality-checks every unit before dispatch.' },
  { num: '04', title: 'Delivered', desc: 'Pan-India bulk delivery in 7 business days to one or multiple locations.' },
]

export default function CorporatePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', qty: '', message: '' })
  const [sent, setSent] = useState(false)

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

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (supabase) {
        await supabase.from('corporate_enquiries').insert([{
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          quantity: parseInt(form.qty) || 0,
          message: form.message,
          status: 'new',
        }])
      }
    } catch(err) { console.error('Supabase corporate error:', err) }
    setSent(true)
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

          {/* Dark overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.3) 45%, rgba(10,10,10,0.0) 100%)',
          }} />

          {/* Content */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            maxWidth: '100%', padding: '0 56px',
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
                fontSize: 'clamp(48px,5.5vw,80px)',
                lineHeight: 0.9, letterSpacing: '0.01em',
                color: '#ffffff', marginBottom: '16px',
              }}>
                {s.line1}<br />
                <span style={{ color: 'var(--rose)' }}>{s.line2}</span>
              </h1>

              {/* Sub */}
              <p style={{
                fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7, marginBottom: '28px',
                fontWeight: 300, maxWidth: '380px',
              }}>
                {s.sub}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="#enquiry" style={{
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
                <a href="#packages" style={{
                  fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  View packages →
                </a>
              </div>
            </div>
          </div>

          {/* Left Arrow */}
          <button onClick={() => goSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px', zIndex: 3,
              borderRadius: '4px', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,116,138,0.8)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
            ←
          </button>

          {/* Right Arrow */}
          <button onClick={() => goSlide((currentSlide + 1) % HERO_SLIDES.length)}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)', width: '40px', height: '40px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px', zIndex: 3,
              borderRadius: '4px', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,116,138,0.8)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
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
                background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.35)',
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
            color: 'rgba(255,255,255,0.4)', zIndex: 3,
          }}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ background: 'var(--ink)', margin: '0 40px', borderRadius: '0 0 12px 12px', marginBottom: '0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderLeft: '1px solid var(--border-dark)',
        }}>
          {[
            { num: '500+', label: 'Corporate Clients' },
            { num: '25+', label: 'Min. Units' },
            { num: '7', label: 'Days Turnaround' },
            { num: '100%', label: 'Cotton Quality' },
          ].map((s, i) => (
            <div key={i} style={{
              borderRight: '1px solid var(--border-dark)',
              padding: '24px 28px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '32px', color: '#ffffff',
                letterSpacing: '0.02em', marginBottom: '4px',
              }}>{s.num}</div>
              <div style={{
                fontSize: '10px', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div id="packages" style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '48px', paddingBottom: '16px', borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '8px' }}>Choose your package</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', letterSpacing: '0.02em', color: 'var(--ink)', lineHeight: 0.95 }}>
              GIFT PACKAGES
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {PACKAGES.map((p, i) => (
            <div key={i} style={{
              background: 'var(--white)',
              display: 'flex', flexDirection: 'column',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}>

              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--cream2)' }}>
                <img src={p.img} alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                <span style={{
                  position: 'absolute', top: '14px', left: '14px',
                  fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
                  fontWeight: 700, padding: '5px 10px',
                  background: p.color ? 'var(--rose)' : 'var(--ink)',
                  color: 'var(--white)',
                }}>{p.tag}</span>
              </div>

              {/* Info */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>{p.moq}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.02em', color: 'var(--ink)', marginBottom: '16px' }}>{p.name}</div>

                {/* Includes */}
                <div style={{ marginBottom: '20px', flex: 1 }}>
                  {p.includes.map((item, j) => (
                    <div key={j} style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--rose)', fontSize: '10px' }}>✦</span>{item}
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: 'var(--ink)' }}>{p.price}</span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>{p.originalPrice}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rose)' }}>per unit</span>
                </div>

                <a href="#enquiry" style={{
                  display: 'block', textAlign: 'center',
                  background: 'transparent', border: '1px solid var(--border)',
                  color: 'var(--muted)', padding: '12px',
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.target.style.background = 'var(--ink)'; e.target.style.color = '#fff'; e.target.style.borderColor = 'var(--ink)' }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--muted)'; e.target.style.borderColor = 'var(--border)' }}>
                  Get a quote →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div style={{ background: 'var(--ink)', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '64px 40px' }}>
          <div style={{ marginBottom: '48px', paddingBottom: '16px', borderBottom: '1px solid var(--border-dark)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '8px' }}>How it works</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', letterSpacing: '0.02em', color: '#ffffff', lineHeight: 0.95 }}>THE PROCESS</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border-dark)', border: '1px solid var(--border-dark)' }}>
            {PROCESS.map((s, i) => (
              <div key={i} style={{ padding: '32px 28px', background: 'var(--ink2)' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: 'var(--rose)', letterSpacing: '0.02em', marginBottom: '16px', opacity: 0.6 }}>{s.num}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '10px' }}>{s.title}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ENQUIRY FORM ── */}
      <div id="enquiry" style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {/* Left info */}
          <div style={{ padding: '56px 48px', background: 'var(--ink)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '16px' }}>Get in touch</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', letterSpacing: '0.02em', color: '#ffffff', lineHeight: 0.95, marginBottom: '20px' }}>
              REQUEST<br />A QUOTE
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '36px', fontWeight: 300 }}>
              Tell us about your requirements and we will get back to you within 24 hours with a custom quote.
            </p>
            {[
              '→ Minimum 25 units per order',
              '→ 7 business days production',
              '→ Custom logo & branding included',
              '→ Pan-India bulk delivery',
              '→ COD available for bulk orders',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <span style={{ color: 'var(--rose)', flexShrink: 0 }}>→</span>{item.slice(2)}
              </div>
            ))}
          </div>

          {/* Right form */}
          <div style={{ padding: '56px 48px', background: 'var(--white)' }}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: 'var(--ink)' }}>Thank You!</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>We have received your enquiry.<br />Our team will contact you within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { key: 'name', label: 'Your Name', type: 'text' },
                  { key: 'company', label: 'Company Name', type: 'text' },
                  { key: 'email', label: 'Email Address', type: 'email' },
                  { key: 'phone', label: 'Phone Number', type: 'tel' },
                  { key: 'qty', label: 'Quantity Required', type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px', fontWeight: 600 }}>{field.label}</label>
                    <input type={field.type} required
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ width: '100%', background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink)', padding: '10px 14px', fontSize: '13px', fontFamily: "'Inter',sans-serif", outline: 'none' }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px', fontWeight: 600 }}>Message</label>
                  <textarea rows={3} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: '100%', background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink)', padding: '10px 14px', fontSize: '13px', fontFamily: "'Inter',sans-serif", outline: 'none', resize: 'vertical' }} />
                </div>
                <button type="submit" style={{
                  background: 'var(--ink)', color: 'var(--white)',
                  border: 'none', padding: '15px', fontSize: '11px',
                  fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                  marginTop: '8px', transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.target.style.background = 'var(--rose)'}
                  onMouseLeave={e => e.target.style.background = 'var(--ink)'}>
                  Submit Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
