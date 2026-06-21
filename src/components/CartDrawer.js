'use client'
import { useState, useEffect } from 'react'

const FREE_THRESHOLD = 499

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [coupon, setCoupon] = useState('')
  const [couponMsg, setCouponMsg] = useState(null)
  const [summaryOpen, setSummaryOpen] = useState(false)

  useEffect(() => {
    const load = () => setCart(JSON.parse(localStorage.getItem('mmc_cart') || '[]'))
    const openCart = () => { load(); setOpen(true) }
    load()
    window.addEventListener('mmc_cart_update', load)
    window.addEventListener('mmc_open_cart', openCart)
    return () => {
      window.removeEventListener('mmc_cart_update', load)
      window.removeEventListener('mmc_open_cart', openCart)
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

  function applyCoupon() {
    if (!coupon.trim()) return
    if (coupon.trim().toUpperCase() === 'MMC10') {
      setCouponMsg({ ok: true, text: 'Coupon applied! 10% off on checkout.' })
    } else {
      setCouponMsg({ ok: false, text: 'Invalid coupon code.' })
    }
    setTimeout(() => setCouponMsg(null), 3000)
  }

  async function handleCheckout() {
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      })
      const order = await res.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'MakeMyClicks',
        description: 'Premium Everyday Wear',
        image: 'https://i.ibb.co/GQVGR3M2/Chat-GPT-Image-Jun-21-2026-01-38-57-PM.png',
        order_id: order.id,
        handler: function(response) {
          alert('Payment successful! Order ID: ' + response.razorpay_order_id)
          localStorage.removeItem('mmc_cart')
          window.dispatchEvent(new Event('mmc_cart_update'))
          window.location.href = '/order-success'
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#c9a96e'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch(err) {
      alert('Payment failed. Please try again.')
    }
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)
  const shipping = subtotal >= FREE_THRESHOLD ? 0 : FREE_THRESHOLD - subtotal > 0 ? 49 : 0
  const total = subtotal + shipping
  const deliveryPct = Math.min((subtotal / FREE_THRESHOLD) * 100, 100)
  const toFree = FREE_THRESHOLD - subtotal

  return (
    <>
      {/* Scrim */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)',
        zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.35s', backdropFilter: open ? 'blur(4px)' : 'none',
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
        background: 'var(--ink2)', borderLeft: '1px solid var(--border)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        zIndex: 201, display: 'flex', flexDirection: 'column',
        boxShadow: open ? '-12px 0 60px rgba(0,0,0,0.6)' : 'none',
      }}>

        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.01em' }}>Your bag</div>
            {count > 0 && <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{count} item{count > 1 ? 's' : ''}</div>}
          </div>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fog)'; e.currentTarget.style.color = 'var(--fog)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>✕</button>
        </div>

        {/* Free delivery progress bar */}
        {cart.length > 0 && (
          <div style={{ padding: '12px 24px', background: 'var(--ink)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              {subtotal >= FREE_THRESHOLD ? (
                <span style={{ fontSize: '11px', color: '#2d6a4f', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✓</span> Free delivery unlocked!
                </span>
              ) : (
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  Add <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Rs.{toFree}</span> more for free delivery
                </span>
              )}
              <span style={{ fontSize: '10px', color: 'var(--muted2)' }}>Rs.{FREE_THRESHOLD}</span>
            </div>
            <div style={{ height: '4px', background: 'var(--ink3)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: deliveryPct + '%', background: subtotal >= FREE_THRESHOLD ? '#2d6a4f' : 'var(--gold)', borderRadius: '2px', transition: 'width 0.4s ease' }} />
            </div>
          </div>
        )}

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '16px', background: 'var(--ink2)', padding: '60px 40px' }}>
              <svg width="44" height="44" fill="none" stroke="var(--muted)" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.7, fontWeight: 300 }}>Your bag is empty.<br />Add something worth wearing.</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '14px', padding: '14px 24px', background: 'var(--ink)', alignItems: 'flex-start' }}>
              <img src={item.img} alt={item.name} style={{ width: '68px', height: '76px', objectFit: 'cover', flexShrink: 0, background: 'var(--ink3)' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', color: 'var(--fog)', fontWeight: 400, lineHeight: 1.5, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '15px', color: 'var(--gold)', fontWeight: 700, marginBottom: '10px' }}>Rs.{(item.price * item.qty).toLocaleString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ width: '26px', height: '26px', background: 'var(--ink2)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ fontSize: '12px', color: 'var(--fog)', minWidth: '22px', textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} style={{ width: '26px', height: '26px', background: 'var(--ink2)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  <button onClick={() => remove(item.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '10px', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif", transition: 'color .2s' }}
                    onMouseEnter={e => e.target.style.color = '#c0392b'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--ink2)', flexShrink: 0 }}>

            {/* Coupon */}
            <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                  style={{ flex: 1, background: 'var(--ink)', border: '1px solid var(--border)', color: 'var(--fog)', padding: '10px 14px', fontSize: '12px', fontFamily: "'Inter',sans-serif", outline: 'none', letterSpacing: '.04em' }}
                />
                <button onClick={applyCoupon} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', padding: '10px 16px', fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all .2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                  Apply
                </button>
              </div>
              {couponMsg && (
                <div style={{ marginTop: '8px', fontSize: '11px', color: couponMsg.ok ? '#2d6a4f' : '#c0392b', fontWeight: 500 }}>
                  {couponMsg.ok ? '✓ ' : '✕ '}{couponMsg.text}
                </div>
              )}
            </div>

            {/* Order summary — collapsible */}
            <div style={{ borderBottom: '1px solid var(--border)' }}>
              <button onClick={() => setSummaryOpen(!summaryOpen)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif' " }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Order total</span>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: 'var(--fog)' }}>Rs.{total.toLocaleString()}</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', transition: 'transform .2s', display: 'inline-block', transform: summaryOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
              </button>

              {summaryOpen && (
                <div style={{ padding: '0 24px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)' }}>
                    <span>Subtotal</span>
                    <span>Rs.{subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)' }}>
                    <span>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#2d6a4f' : 'var(--muted)' }}>{shipping === 0 ? 'FREE' : `Rs.${shipping}`}</span>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--fog)', fontWeight: 600 }}>
                    <span>Total</span>
                    <span>Rs.{total.toLocaleString()}</span>
                  </div>
                  {shipping === 0 && (
                    <div style={{ fontSize: '10px', color: '#2d6a4f', fontWeight: 500 }}>✓ Free delivery on this order</div>
                  )}
                </div>
              )}
            </div>

            {/* Checkout button */}
            <div style={{ padding: '16px 24px 12px' }}>
              <button onClick={handleCheckout} style={{ width: '100%', background: 'var(--fog)', color: 'var(--ink)', border: 'none', padding: '15px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter',sans-serif", marginBottom: '10px', transition: 'background .2s' }}
                onMouseEnter={e => e.target.style.background = 'var(--gold)'}
                onMouseLeave={e => e.target.style.background = 'var(--fog)'}>
                Checkout — Rs.{total.toLocaleString()}
              </button>

              {/* Payment modes */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '14px' }}>
                {[['UPI','#5f259f'],['Card','#1a1f71'],['COD','#2d6a4f'],['EMI','#c9a96e']].map(([name, color]) => (
                  <span key={name} style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.06em', color, border: `1px solid ${color}30`, padding: '3px 8px', background: `${color}10` }}>{name}</span>
                ))}
              </div>

              {/* Trust strip */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                {[
                  { icon: '↩', label: '7-day returns' },
                  { icon: '🔒', label: 'Secure checkout' },
                  { icon: '📦', label: 'COD available' },
                ].map(t => (
                  <div key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                    <span style={{ fontSize: '14px' }}>{t.icon}</span>
                    <span style={{ fontSize: '9px', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase', textAlign: 'center' }}>{t.label}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setOpen(false)} style={{ width: '100%', background: 'transparent', color: 'var(--muted)', border: 'none', padding: '12px 0 0', fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter',sans-serif", marginTop: '8px', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--fog)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
                Continue shopping →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
