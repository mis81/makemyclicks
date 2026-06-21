'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  useEffect(() => {
    const load = () => setCart(JSON.parse(localStorage.getItem('mmc_cart') || '[]'))
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

  async function handleCheckout() {
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      })
      const order = await res.json()
      if (order.error) { alert('Error: ' + order.error); return; }
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'MakeMyClicks',
        description: 'Premium Everyday Wear',
        image: 'https://i.ibb.co/GQVGR3M2/Chat-GPT-Image-Jun-21-2026-01-38-57-PM.png',
        order_id: order.id,
        handler: function(response) {
          localStorage.removeItem('mmc_cart')
          window.dispatchEvent(new Event('mmc_cart_update'))
          window.location.href = '/order-success'
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#c9a96e' },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch(err) {
      alert('Payment failed. Please try again.')
    }
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)
  const savings = cart.reduce((s, i) => s + ((i.compare_price || i.price) - i.price) * i.qty, 0)
  const freeDelivery = total >= 499

  return (
    <>
      {/* Backdrop */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 200,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
        backdropFilter: open ? 'blur(6px)' : 'none',
      }}/>

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '440px',
        background: 'var(--ink)',
        borderLeft: '1px solid var(--border)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        zIndex: 201,
        display: 'flex', flexDirection: 'column',
        boxShadow: open ? '-20px 0 60px rgba(0,0,0,0.6)' : 'none',
      }}>

        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--ink2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: 'var(--fog)', letterSpacing: '-.01em' }}>
              Your Bag
            </div>
            {count > 0 && (
              <div style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>
                {count}
              </div>
            )}
          </div>
          <button onClick={() => setOpen(false)} style={{
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--muted)', width: '34px', height: '34px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', transition: 'all .2s', borderRadius: '2px',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fog)'; e.currentTarget.style.color = 'var(--fog)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
            ✕
          </button>
        </div>

        {/* Free delivery progress bar */}
        {cart.length > 0 && (
          <div style={{ padding: '14px 28px', background: 'var(--ink2)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: freeDelivery ? '#2d6a4f' : 'var(--muted)', fontWeight: 500 }}>
                {freeDelivery ? '✓ Free delivery unlocked!' : `Add Rs.${499 - total} more for free delivery`}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Rs.499</span>
            </div>
            <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px' }}>
              <div style={{
                height: '100%',
                width: Math.min((total / 499) * 100, 100) + '%',
                background: freeDelivery ? '#2d6a4f' : 'var(--gold)',
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }}/>
            </div>
          </div>
        )}

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '20px', padding: '40px' }}>
              <div style={{ width: '80px', height: '80px', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" fill="none" stroke="var(--muted)" strokeWidth="1" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: 'var(--fog)', marginBottom: '8px' }}>Your bag is empty</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>Add something worth wearing</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'var(--fog)', color: 'var(--ink)', border: 'none', padding: '12px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                Browse products
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={item.id} style={{
                display: 'flex', gap: '14px',
                padding: '16px 28px',
                borderBottom: '1px solid var(--border2)',
                transition: 'background .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--ink2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {/* Image */}
                <div style={{ width: '80px', height: '90px', flexShrink: 0, overflow: 'hidden', background: 'var(--ink3)', border: '1px solid var(--border)' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: 'var(--fog)', fontWeight: 400, lineHeight: 1.4, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', fontWeight: 700, color: 'var(--gold)' }}>
                      Rs.{(item.price * item.qty).toLocaleString()}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Rs.{item.price} each</span>
                  </div>
                  {/* Qty controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', overflow: 'hidden' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{
                        width: '32px', height: '32px', background: 'var(--ink2)',
                        border: 'none', color: 'var(--fog)', cursor: 'pointer',
                        fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background .2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--ink3)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--ink2)'}>−</button>
                      <span style={{ width: '36px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--fog)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, 1)} style={{
                        width: '32px', height: '32px', background: 'var(--ink2)',
                        border: 'none', color: 'var(--fog)', cursor: 'pointer',
                        fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background .2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--ink3)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--ink2)'}>+</button>
                    </div>
                    <button onClick={() => remove(item.id)} style={{
                      background: 'none', border: 'none', color: 'var(--muted)',
                      cursor: 'pointer', fontSize: '11px', letterSpacing: '.08em',
                      textTransform: 'uppercase', fontFamily: "'Inter',sans-serif",
                      transition: 'color .2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--ink2)' }}>

            {/* Coupon */}
            <div style={{ padding: '16px 28px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                  style={{
                    flex: 1, background: 'var(--ink)', border: '1px solid var(--border)',
                    color: 'var(--fog)', padding: '10px 14px', fontSize: '12px',
                    fontFamily: "'Inter',sans-serif", outline: 'none', letterSpacing: '.04em',
                  }}
                />
                <button
                  onClick={() => { if (coupon) setCouponApplied(true) }}
                  style={{
                    background: 'transparent', border: '1px solid var(--border)',
                    color: 'var(--muted)', padding: '10px 16px', fontSize: '11px',
                    fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                  Apply
                </button>
              </div>
            </div>

            {/* Price summary */}
            <div style={{ padding: '16px 28px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--muted)' }}>Subtotal ({count} items)</span>
                <span style={{ color: 'var(--fog)' }}>Rs.{total.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--muted)' }}>You save</span>
                  <span style={{ color: '#2d6a4f', fontWeight: 600 }}>− Rs.{savings.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--muted)' }}>Delivery</span>
                <span style={{ color: freeDelivery ? '#2d6a4f' : 'var(--fog)', fontWeight: 500 }}>
                  {freeDelivery ? 'FREE' : 'Rs.49'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fog)', letterSpacing: '.02em' }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: 'var(--fog)' }}>
                  Rs.{(total + (freeDelivery ? 0 : 49)).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment methods */}
            <div style={{ padding: '12px 28px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted2)', marginBottom: '10px' }}>
                Accepted payments
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['UPI', 'Card', 'COD', 'EMI', 'NetBanking'].map(p => (
                  <div key={p} style={{
                    padding: '5px 10px', background: 'var(--ink)',
                    border: '1px solid var(--border)',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '.06em',
                    color: 'var(--muted)', borderRadius: '2px',
                  }}>{p}</div>
                ))}
              </div>
            </div>

            {/* Checkout button */}
            <div style={{ padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={handleCheckout} style={{
                width: '100%', background: 'var(--fog)', color: 'var(--ink)',
                border: 'none', padding: '16px', fontSize: '12px', fontWeight: 700,
                letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer',
                fontFamily: "'Inter',sans-serif", transition: 'background .2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--fog)'}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Secure Checkout — Rs.{(total + (freeDelivery ? 0 : 49)).toLocaleString()}
              </button>
              <button onClick={() => setOpen(false)} style={{
                width: '100%', background: 'transparent', color: 'var(--muted)',
                border: '1px solid var(--border)', padding: '12px', fontSize: '11px',
                fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fog)'; e.currentTarget.style.color = 'var(--fog)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
