'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PAYMENT_ICONS = [
  { name: 'UPI', color: '#5f259f' },
  { name: 'Card', color: '#1a1f71' },
  { name: 'COD', color: '#2d6a4f' },
  { name: 'EMI', color: '#c9a96e' },
]

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const load = () => {
      setCart(JSON.parse(localStorage.getItem('mmc_cart') || '[]'))
    }
    load()
    window.addEventListener('mmc_cart_update', load)
    window.addEventListener('mmc_open_cart', () => { load(); setOpen(true) })
    return () => {
      window.removeEventListener('mmc_cart_update', load)
      window.removeEventListener('mmc_open_cart', () => {})
    }
  }, [])

  function remove(id) {
    const updated = cart.filter(i => i.id !== id)
    setCart(updated)
    localStorage.setItem('mmc_cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('mmc_cart_update'))
  }

  function updateQty(id, delta) {
    const updated = cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    setCart(updated)
    localStorage.setItem('mmc_cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('mmc_cart_update'))
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      {/* Scrim */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.35s',
        backdropFilter: open ? 'blur(4px)' : 'none',
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
        background: 'var(--ink2)', borderLeft: '1px solid var(--border)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        zIndex: 201, display: 'flex', flexDirection: 'column',
        boxShadow: open ? '-8px 0 48px rgba(0,0,0,0.5)' : 'none',
      }}>

        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.01em' }}>Your bag</div>
            {count > 0 && <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{count} item{count > 1 ? 's' : ''}</div>}
          </div>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'all .2s' }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--fog)'; e.target.style.color = 'var(--fog)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', background: 'var(--ink2)', padding: '40px' }}>
              <svg width="40" height="40" fill="none" stroke="var(--muted)" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6, fontWeight: 300 }}>Your bag is empty.<br />Add something worth wearing.</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '14px', padding: '16px', background: 'var(--ink)' }}>
              <img src={item.img} alt={item.name} style={{ width: '72px', height: '80px', objectFit: 'cover', flexShrink: 0, background: 'var(--ink3)' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', color: 'var(--fog)', fontWeight: 400, lineHeight: 1.5, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '16px', color: 'var(--gold)', fontWeight: 700, marginBottom: '10px' }}>Rs.{(item.price * item.qty).toLocaleString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ width: '26px', height: '26px', background: 'var(--ink2)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>−</button>
                  <span style={{ fontSize: '13px', color: 'var(--fog)', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} style={{ width: '26px', height: '26px', background: 'var(--ink2)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>+</button>
                  <button onClick={() => remove(item.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif", transition: 'color .2s' }}
                    onMouseEnter={e => e.target.style.color = '#c0392b'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)' }}>
            {/* Payment options */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>Payment options</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {PAYMENT_ICONS.map(p => (
                  <div key={p.name} style={{ flex: 1, padding: '8px 4px', background: 'var(--ink)', border: '1px solid var(--border)', textAlign: 'center', fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: p.color }}>
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Subtotal</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', fontWeight: 700, color: 'var(--fog)' }}>Rs.{total.toLocaleString()}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '16px' }}>
              {total >= 499 ? '✓ Free delivery included' : `Add Rs.${499 - total} more for free delivery`}
            </div>
            <button style={{ width: '100%', background: 'var(--fog)', color: 'var(--ink)', border: 'none', padding: '15px', fontSize: '11px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter',sans-serif", marginBottom: '10px', transition: 'background .2s' }}
              onMouseEnter={e => e.target.style.background = 'var(--gold)'}
              onMouseLeave={e => e.target.style.background = 'var(--fog)'}>
              Checkout — Rs.{total.toLocaleString()}
            </button>
            <button onClick={() => setOpen(false)} style={{ width: '100%', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', padding: '12px', fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all .2s' }}>
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
