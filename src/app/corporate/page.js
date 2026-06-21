'use client'
import Link from 'next/link'
import { useState } from 'react'

const PACKAGES = [
  {
    id: 'CORP-001',
    name: 'Executive Gift Hamper',
    price: 1499,
    compare_price: 2999,
    moq: '25 units minimum',
    image_main_url: 'https://i.ibb.co/cSqwqQvN/Luxury-Gift-Hampers-India-s-Favourite-Online.jpg',
    slug: 'executive-gift-hamper',
    tags: 'Premium',
    desc: 'Curated luxury hamper for executives. Includes premium tee, mousepad, and branded packaging.',
    includes: ['240 GSM Premium Tee', 'Desk Mousepad', 'Custom Box', 'Branded Card'],
  },
  {
    id: 'CORP-002',
    name: 'Corporate Impression Kit',
    price: 999,
    compare_price: 1799,
    moq: '50 units minimum',
    image_main_url: 'https://i.ibb.co/JTn1vVK/Make-every-corporate-gesture-unforgettable-with-1.jpg',
    slug: 'corporate-impression-kit',
    tags: 'Bestseller',
    desc: 'Make every corporate gesture unforgettable. Premium tee with your company logo printed.',
    includes: ['Custom Logo Tee', 'Thank You Card', 'Eco Packaging'],
  },
  {
    id: 'CORP-003',
    name: 'Premium Corporate Bundle',
    price: 1299,
    compare_price: 2499,
    moq: '100 units minimum',
    image_main_url: 'https://i.ibb.co/Txts9Gp9/Make-a-lasting-impression-with-premium-corporate.jpg',
    slug: 'premium-corporate-bundle',
    tags: 'Top Pick',
    desc: 'Make a lasting impression with premium corporate gifting. Full branding on all items.',
    includes: ['Branded Oversized Tee', 'XL Desk Pad', 'Gift Box', 'Custom Tag', 'Tissue Wrap'],
  },
]

const PROCESS = [
  { step: '01', title: 'Choose a package', desc: 'Select from our curated corporate gift packages or request a custom bundle.' },
  { step: '02', title: 'Share your branding', desc: 'Send us your logo, brand colors, and any custom message or artwork.' },
  { step: '03', title: 'We produce', desc: 'Our team prints, packs, and quality-checks every unit before dispatch.' },
  { step: '04', title: 'Delivered to you', desc: 'Pan-India delivery in 7 business days. Bulk delivery to one or multiple locations.' },
]

export default function CorporatePage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', qty: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      {/* Hero banner */}
      <div style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', overflow: 'hidden', background: 'var(--ink2)' }}>
        <img
          src="https://i.ibb.co/Txts9Gp9/Make-a-lasting-impression-with-premium-corporate.jpg"
          alt="Corporate Gifting"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '80px 40px', width: '100%' }}>
          <p style={{ fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--gold)', display: 'inline-block' }}></span>
            Bulk & Custom Orders
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,5vw,72px)', fontWeight: 900, color: 'var(--fog)', letterSpacing: '-.03em', lineHeight: .95, marginBottom: '20px' }}>
            Corporate<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Gifting</em>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '480px', fontWeight: 300, marginBottom: '36px' }}>
            Premium branded gifts for your team, clients, and events. Minimum 25 units. Your logo, our quality.
          </p>
          <a href="#packages" style={{ display: 'inline-block', background: 'var(--fog)', color: 'var(--ink)', padding: '15px 34px', fontSize: '11px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
            View packages
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid var(--border)' }}>
          {[
            { num: '500+', label: 'Corporate clients' },
            { num: '25+', label: 'Minimum units' },
            { num: '7', label: 'Days turnaround' },
            { num: '100%', label: 'Cotton quality' },
          ].map((s, i) => (
            <div key={i} style={{ borderRight: '1px solid var(--border)', padding: '36px 28px' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '36px', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.02em', marginBottom: '6px' }}>{s.num}</div>
              <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div id="packages" style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>Choose your package</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,2.5vw,34px)', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.02em' }}>Gift packages</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '80px' }}>
          {PACKAGES.map(p => {
            const off = Math.round(((p.compare_price - p.price) / p.compare_price) * 100)
            return (
              <div key={p.id} style={{ background: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--ink3)' }}>
                  <img src={p.image_main_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, padding: '5px 10px', background: p.tags === 'Bestseller' ? 'var(--gold)' : 'var(--ink)', color: p.tags === 'Bestseller' ? 'var(--ink)' : 'var(--fog)' }}>{p.tags}</span>
                </div>
                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>{p.moq}</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--fog)', lineHeight: 1.4, marginBottom: '12px' }}>{p.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '20px', fontWeight: 300 }}>{p.desc}</div>
                  <div style={{ marginBottom: '24px' }}>
                    {p.includes.map((item, i) => (
                      <div key={i} style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '10px' }}>✦</span>{item}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: 'var(--fog)' }}>Rs.{p.price}</span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price}</span>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--gold)' }}>{off}% off</span>
                    </div>
                    <a href="#enquiry" style={{ display: 'block', textAlign: 'center', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', padding: '12px', fontSize: '10px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .2s' }}
                      onMouseEnter={e => { e.target.style.background = 'var(--fog)'; e.target.style.color = 'var(--ink)'; e.target.style.borderColor = 'var(--fog)' }}
                      onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--muted)'; e.target.style.borderColor = 'var(--border)' }}>
                      Get a quote
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Process */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>How it works</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,2.5vw,34px)', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.02em' }}>The process</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '80px' }}>
          {PROCESS.map((s, i) => (
            <div key={i} style={{ padding: '32px', background: 'var(--ink2)' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 700, color: 'var(--border)', letterSpacing: '-.02em', marginBottom: '16px' }}>{s.step}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fog)', letterSpacing: '.06em', marginBottom: '10px', textTransform: 'uppercase' }}>{s.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Enquiry form */}
        <div id="enquiry" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '48px', background: 'var(--ink2)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>Get in touch</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.02em', marginBottom: '16px' }}>Request a quote</h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '32px', fontWeight: 300 }}>Tell us about your requirements and we will get back to you within 24 hours with a custom quote.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: '→', text: 'Minimum 25 units per order' },
                { icon: '→', text: '7 business days production time' },
                { icon: '→', text: 'Custom logo and branding included' },
                { icon: '→', text: 'Pan-India bulk delivery' },
              ].map((item, i) => (
                <div key={i} style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '48px', background: 'var(--ink)' }}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: 'var(--fog)' }}>Thank you</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>We have received your enquiry.<br />Our team will contact you within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { key: 'name', label: 'Your name', type: 'text', required: true },
                  { key: 'company', label: 'Company name', type: 'text', required: true },
                  { key: 'email', label: 'Email address', type: 'email', required: true },
                  { key: 'phone', label: 'Phone number', type: 'tel', required: true },
                  { key: 'qty', label: 'Quantity required', type: 'number', required: true },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>{field.label}</label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ width: '100%', background: 'var(--ink2)', border: '1px solid var(--border)', color: 'var(--fog)', padding: '10px 14px', fontSize: '13px', fontFamily: "'Inter',sans-serif", outline: 'none' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>Message (optional)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: '100%', background: 'var(--ink2)', border: '1px solid var(--border)', color: 'var(--fog)', padding: '10px 14px', fontSize: '13px', fontFamily: "'Inter',sans-serif", outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <button type="submit" style={{ background: 'var(--fog)', color: 'var(--ink)', border: 'none', padding: '14px', fontSize: '11px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter',sans-serif", marginTop: '8px', transition: 'background .2s' }}
                  onMouseEnter={e => e.target.style.background = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.background = 'var(--fog)'}>
                  Submit enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
