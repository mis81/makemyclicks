'use client'
import { useState } from 'react'
import Link from 'next/link'

const MACHINES = [
  {
    id: 'MMC-MCH-001',
    name: 'A3 DTF Inkjet Printer — Heat Transfer T-Shirt Set',
    price: 84999,
    compare_price: 124999,
    image_main_url: 'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg',
    slug: 'a3-dtf-inkjet-printer',
    tags: 'Bestseller',
    desc: 'Professional A3 DTF inkjet printer set for heat transfer printing on t-shirts and garments. Complete set with RIP software.',
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
    desc: 'Popular UV DTF A3 printer with 30cm roll capability. Print on glass, metal, wood, leather and more.',
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
  const [added, setAdded] = useState(null)

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

  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '380px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', overflow: 'hidden', background: 'var(--ink2)' }}>
        <img src="https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg" alt="Machines" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '80px 40px', width: '100%' }}>
          <p style={{ fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--gold)', display: 'inline-block' }}></span>
            DTF & UV Printing Equipment
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,5vw,68px)', fontWeight: 900, color: 'var(--fog)', letterSpacing: '-.03em', lineHeight: .95, marginBottom: '20px' }}>
            Printing<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Machines</em>
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '440px', fontWeight: 300 }}>
            Professional DTF and UV printing machines for garment and surface printing. Trade and retail pricing available.
          </p>
        </div>
      </div>

      {/* Specs strip */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid var(--border)' }}>
          {[
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, title: 'DTF & UV printing', desc: 'Latest inkjet technology' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: '1 year warranty', desc: 'Full parts and labour' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Training included', desc: 'On-site setup support' },
            { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: 'Pan-India delivery', desc: 'Safe freight shipping' },
          ].map((f, i) => (
            <div key={i} style={{ borderRight: '1px solid var(--border)', padding: '28px' }}>
              <div style={{ width: '34px', height: '34px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: 'var(--gold)' }}>{f.icon}</div>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fog)', fontWeight: 600, marginBottom: '4px' }}>{f.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>Available now</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,2.5vw,34px)', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.02em' }}>All machines</h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{MACHINES.length} products</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {MACHINES.map(p => {
            const off = Math.round(((p.compare_price - p.price) / p.compare_price) * 100)
            const isAdded = added === p.id
            return (
              <div key={p.id} style={{ background: 'var(--ink)', display: 'flex', flexDirection: 'column', transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--ink2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--ink3)' }}>
                  <img src={p.image_main_url} alt={p.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, padding: '5px 10px', background: p.tags === 'Bestseller' ? 'var(--gold)' : 'var(--ink)', color: p.tags === 'Bestseller' ? 'var(--ink)' : 'var(--fog)' }}>{p.tags}</span>
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--fog)', lineHeight: 1.4, marginBottom: '10px' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 300 }}>{p.desc}</div>
                  <div style={{ marginBottom: '20px' }}>
                    {p.specs.map((s, i) => (
                      <div key={i} style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '8px' }}>◆</span>{s}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: 'var(--fog)' }}>Rs.{p.price.toLocaleString()}</span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>Rs.{p.compare_price.toLocaleString()}</span>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--gold)' }}>{off}% off</span>
                    </div>
                    <button onClick={(e) => addToCart(p, e)}
                      style={{ width: '100%', background: isAdded ? 'var(--gold)' : 'transparent', border: '1px solid var(--border)', color: isAdded ? 'var(--ink)' : 'var(--muted)', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', padding: '12px', transition: 'all .2s' }}
                      onMouseEnter={e => { if (!isAdded) { e.target.style.background = 'var(--fog)'; e.target.style.color = 'var(--ink)'; e.target.style.borderColor = 'var(--fog)' } }}
                      onMouseLeave={e => { if (!isAdded) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--muted)'; e.target.style.borderColor = 'var(--border)' } }}>
                      {isAdded ? '✓ Added — view bag' : 'Add to bag'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
