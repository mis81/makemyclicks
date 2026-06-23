'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SlidingNav from '@/components/SlidingNav'
import { useWishlist } from '@/hooks/useWishlist'
import AnimatedLogo from '@/components/AnimatedLogo'

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const pathname = usePathname()

  const isHome = pathname === '/'
  const { wishlist } = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
      setCartCount(cart.reduce((s, i) => s + i.qty, 0))
    }
    update()
    window.addEventListener('mmc_cart_update', update)
    return () => window.removeEventListener('mmc_cart_update', update)
  }, [])

  const isTransparent = false

  return (
    <>
      {!isTransparent && (
        <div className="ticker">
          <div className="ticker-track">
            {[...Array(2)].map((_, i) =>
              ['Free delivery above Rs.499', '240 GSM pure cotton', '7-day returns', 'COD available', 'New drop SS 2025'].map((t, j) => (
                <span key={i + '-' + j} className="ticker-item">
                  <span className="ticker-dot">◆</span>{t}
                </span>
              ))
            )}
          </div>
        </div>
      )}

      <nav style={{
        position: 'sticky',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: isTransparent
          ? 'transparent'
          : 'rgba(245,240,232,0.96)',
        backdropFilter: isTransparent ? 'none' : 'blur(20px)',
        borderBottom: isTransparent ? 'none' : '1px solid var(--border)',
        transition: 'background 0.4s ease, border 0.4s ease',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 40px', height: '72px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '24px',
        }}>

          {/* Logo */}
          <AnimatedLogo isTransparent={isTransparent} />

          {/* Center nav */}
          <div style={{
            position: 'absolute', left: '50%',
            transform: 'translateX(-50%)',
          }}>
            <SlidingNav transparent={isTransparent} />
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>

            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', transition: 'width 0.3s', width: searchOpen ? '180px' : '32px' }}>
              <input
                type="text" placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && query.trim()) window.location.href = '/products?q=' + encodeURIComponent(query)
                  if (e.key === 'Escape') setSearchOpen(false)
                }}
                style={{
                  background: isTransparent ? 'rgba(255,255,255,0.15)' : 'var(--cream2)',
                  border: '1px solid ' + (isTransparent ? 'rgba(255,255,255,0.3)' : 'var(--border)'),
                  color: isTransparent ? '#ffffff' : 'var(--ink)',
                  padding: '6px 10px', fontSize: '12px',
                  fontFamily: "'Inter', sans-serif", outline: 'none',
                  width: '140px',
                  opacity: searchOpen ? 1 : 0,
                  transition: 'opacity 0.2s',
                }}
              />
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: isTransparent ? 'rgba(255,255,255,0.8)' : 'var(--muted)',
                  padding: '8px', flexShrink: 0,
                  transition: 'color 0.4s ease',
                }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
                </svg>
              </button>
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: isTransparent ? 'rgba(255,255,255,0.8)' : 'var(--muted)',
              padding: '8px', transition: 'color 0.4s ease',
              position: 'relative', display: 'flex', alignItems: 'center',
              textDecoration: 'none',
            }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  background: 'var(--rose)', color: '#fff',
                  fontSize: '9px', fontWeight: 700,
                  borderRadius: '50%', width: '15px', height: '15px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => window.dispatchEvent(new Event('mmc_open_cart'))}
              data-cursor="cart"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: isTransparent ? 'rgba(255,255,255,0.8)' : 'var(--muted)',
                padding: '8px', position: 'relative',
                transition: 'color 0.4s ease',
              }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  background: 'var(--rose)', color: '#fff',
                  fontSize: '9px', fontWeight: 700,
                  borderRadius: '50%', width: '15px', height: '15px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'none', border: 'none', cursor: 'pointer',
                color: isTransparent ? 'rgba(255,255,255,0.8)' : 'var(--muted)',
                padding: '8px',
              }}
              className="mobile-menu-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {[
              { label: 'Home', href: '/' },
              { label: 'T-Shirts', href: '/tshirts' },
              { label: 'Collections', href: '/collections' },
              { label: 'Mousepads', href: '/mousepads' },
              { label: 'Corporate Gifting', href: '/corporate' },
              { label: 'Raw Materials', href: '/products?cat=raw-materials' },
              { label: 'Machines', href: '/machines' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
