'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
      setCartCount(cart.reduce((s, i) => s + i.qty, 0))
    }
    update()
    window.addEventListener('mmc_cart_update', update)
    return () => window.removeEventListener('mmc_cart_update', update)
  }, [])

  const LINKS = [
    { label: 'Home', href: '/' },
    { label: 'New Arrivals', href: '/products' },
    { label: 'Collections', href: '/collections' },
    { label: 'Mousepads', href: '/mousepads' },
    { label: 'Corporate Gifting', href: '/corporate' },
    { label: 'Raw Materials', href: '/products?cat=raw-materials' },
    { label: 'Machines', href: '/machines' },
  ]

  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) =>
            ['Free delivery above Rs.499', '240 GSM pure cotton', '7-day returns', 'COD available', 'New drop SS 2025'].map((t, j) => (
              <span key={i+'-'+j} className="ticker-item"><span className="ticker-dot">◆</span>{t}</span>
            ))
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img
              src="https://i.ibb.co/GQVGR3M2/Chat-GPT-Image-Jun-21-2026-01-38-57-PM.png"
              alt="MakeMyClicks Logo"
              width={44}
              height={44}
              style={{ objectFit: 'contain', borderRadius: '8px' }}
            />
            <span className="logo-text">Make<em>My</em>Clicks</span>
          </Link>

          <ul className="nav-links">
            {LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{ borderBottomColor: pathname === l.href ? 'var(--gold)' : 'transparent', color: pathname === l.href ? 'var(--fog)' : '' }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <div className={'search-wrap' + (searchOpen ? ' open' : '')}>
              <input className="search-input" type="text" placeholder="Search tees…"
                value={query} onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && query.trim()) window.location.href = '/products?q=' + encodeURIComponent(query)
                  if (e.key === 'Escape') setSearchOpen(false)
                }} />
              <button className="nav-icon search-toggle" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
                </svg>
              </button>
            </div>

            <Link href="/account" className="nav-icon" aria-label="Account">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            <button className="nav-icon cart-icon" aria-label="Cart"
              onClick={() => window.dispatchEvent(new Event('mmc_open_cart'))}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-pip">{cartCount}</span>}
            </button>

            <button className="nav-icon mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
