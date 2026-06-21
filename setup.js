const fs = require('fs')
const path = require('path')

const files = {}

// ── globals.css ──────────────────────────────────────────────
files['src/app/globals.css'] = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0a0a0a;--ink2:#141414;--ink3:#1e1e1e;
  --fog:#f5f4f0;--fog2:#e8e6df;
  --gold:#c9a96e;--gold-dim:#a07c45;
  --muted:#888880;--muted2:#555550;
  --border:#2a2a2a;--border2:#222222;
  --white:#ffffff;--red:#c0392b;--green:#2d6a4f;
}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--ink);color:var(--fog);-webkit-font-smoothing:antialiased;overflow-x:hidden}
.ticker{background:var(--ink2);border-bottom:1px solid var(--border);height:34px;overflow:hidden;display:flex;align-items:center}
.ticker-track{display:flex;white-space:nowrap;animation:ticker 28s linear infinite}
.ticker-item{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:0 40px;display:flex;align-items:center;gap:10px}
.ticker-dot{color:var(--gold);font-size:7px}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.navbar{position:sticky;top:0;z-index:100;background:rgba(10,10,10,0.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
.nav-inner{max-width:1400px;margin:0 auto;padding:0 40px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
.logo-img{width:40px;height:40px;object-fit:contain;border-radius:6px}
.logo-text{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--fog);letter-spacing:-.02em;line-height:1}
.logo-text em{color:var(--gold);font-style:normal}
.nav-links{display:flex;gap:28px;list-style:none;position:absolute;left:50%;transform:translateX(-50%)}
.nav-links a{font-size:12px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted);text-decoration:none;font-weight:500;transition:color .2s;padding-bottom:2px;border-bottom:1px solid transparent}
.nav-links a:hover{color:var(--fog);border-bottom-color:var(--gold)}
.nav-right{display:flex;align-items:center;gap:6px;flex-shrink:0}
.nav-icon{background:none;border:none;cursor:pointer;color:var(--muted);padding:8px;transition:color .2s;position:relative;display:flex;align-items:center;justify-content:center;text-decoration:none}
.nav-icon:hover{color:var(--fog)}
.cart-pip{position:absolute;top:2px;right:2px;background:var(--gold);color:var(--ink);font-size:9px;font-weight:700;border-radius:50%;width:15px;height:15px;display:flex;align-items:center;justify-content:center}
.search-wrap{display:flex;align-items:center;overflow:hidden;transition:width .3s;width:32px}
.search-wrap.open{width:180px}
.search-input{background:var(--ink3);border:1px solid var(--border);color:var(--fog);font-size:12px;font-family:'Inter',sans-serif;padding:6px 10px;outline:none;width:140px;opacity:0;transition:opacity .2s;letter-spacing:.03em}
.search-wrap.open .search-input{opacity:1}
.mobile-menu-btn{display:none}
.mobile-menu{display:flex;flex-direction:column;border-top:1px solid var(--border);padding:8px 0}
.mobile-link{padding:14px 24px;font-size:13px;font-weight:500;color:var(--muted);text-decoration:none;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--border2);transition:color .2s}
.mobile-link:hover{color:var(--gold)}
.hero{display:grid;grid-template-columns:1fr 1fr;min-height:88vh;border-bottom:1px solid var(--border)}
.hero-left{display:flex;flex-direction:column;justify-content:center;padding:80px 64px 80px 40px;border-right:1px solid var(--border)}
.hero-eyebrow{display:flex;align-items:center;gap:12px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:28px}
.hero-eyebrow::before{content:'';width:32px;height:1px;background:var(--gold)}
.hero-headline{font-family:'Playfair Display',serif;font-size:clamp(52px,5.5vw,82px);font-weight:900;line-height:.95;letter-spacing:-.03em;color:var(--fog);margin-bottom:28px}
.hero-headline em{font-style:italic;color:var(--gold)}
.hero-body{font-size:14px;line-height:1.8;color:var(--muted);max-width:360px;margin-bottom:44px;font-weight:300}
.hero-ctas{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:56px}
.btn-primary{background:var(--fog);color:var(--ink);border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:15px 34px;text-decoration:none;display:inline-block;transition:background .2s}
.btn-primary:hover{background:var(--gold)}
.btn-ghost{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-decoration:none;font-weight:500;display:flex;align-items:center;gap:8px;background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;transition:color .2s}
.btn-ghost:hover{color:var(--fog)}
.btn-ghost::after{content:'→';transition:transform .2s}
.btn-ghost:hover::after{transform:translateX(4px)}
.hero-stats{display:flex;gap:36px;padding-top:36px;border-top:1px solid var(--border)}
.stat-num{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--fog);letter-spacing:-.02em}
.stat-label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:3px}
.hero-right{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
.hero-tile{position:relative;overflow:hidden;cursor:pointer;border-right:1px solid var(--border);border-bottom:1px solid var(--border);display:block;text-decoration:none}
.hero-tile:nth-child(2){border-right:none}
.hero-tile:nth-child(3){border-bottom:none}
.hero-tile:nth-child(4){border-right:none;border-bottom:none}
.hero-tile img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.25,.46,.45,.94)}
.hero-tile:hover img{transform:scale(1.05)}
.tile-hover{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,.85) 0%,transparent 55%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:18px}
.hero-tile:hover .tile-hover{opacity:1}
.tile-label{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--fog);font-weight:500}
.marquee{background:var(--gold);border-top:1px solid var(--border);border-bottom:1px solid var(--border);height:38px;overflow:hidden;display:flex;align-items:center}
.marquee-track{display:flex;white-space:nowrap;animation:ticker 20s linear infinite}
.marquee-item{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);font-weight:600;padding:0 28px;display:flex;align-items:center;gap:14px}
.marquee-star{color:rgba(10,10,10,.35);font-size:14px}
.section-wrap{max-width:1400px;margin:0 auto;padding:72px 40px}
.section-rule{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:44px;padding-bottom:18px;border-bottom:1px solid var(--border)}
.section-eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);font-weight:500;margin-bottom:6px}
.section-heading{font-family:'Playfair Display',serif;font-size:clamp(26px,2.8vw,36px);font-weight:700;color:var(--fog);letter-spacing:-.02em}
.section-link{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;font-weight:500;display:flex;align-items:center;gap:6px;transition:color .2s}
.section-link:hover{color:var(--gold)}
.cats-grid{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:280px 280px;gap:1px;background:var(--border);border:1px solid var(--border)}
.cat-cell{background:var(--ink2);overflow:hidden;position:relative;cursor:pointer;display:block;text-decoration:none}
.cat-cell:first-child{grid-row:1/3}
.cat-cell img{width:100%;height:100%;object-fit:cover;opacity:.65;display:block;transition:opacity .3s,transform .5s cubic-bezier(.25,.46,.45,.94)}
.cat-cell:hover img{opacity:.85;transform:scale(1.04)}
.cat-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,.82) 0%,rgba(10,10,10,.05) 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.cat-name{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--fog);font-weight:500;margin-bottom:4px}
.cat-sub{font-size:11px;color:var(--muted)}
.cat-arrow{position:absolute;top:14px;right:14px;width:30px;height:30px;border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);font-size:13px;opacity:0;transition:all .2s}
.cat-cell:hover .cat-arrow{opacity:1;color:var(--gold);border-color:var(--gold)}
.products-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--border);border-left:1px solid var(--border)}
.product-card{border-right:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--ink);transition:background .2s;text-decoration:none;display:block}
.product-card:hover{background:var(--ink2)}
.prod-img{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--ink3)}
.prod-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.25,.46,.45,.94)}
.product-card:hover .prod-img img{transform:scale(1.05)}
.prod-badge{position:absolute;top:14px;left:14px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;padding:5px 10px;background:var(--ink);color:var(--fog)}
.prod-badge.gold{background:var(--gold);color:var(--ink)}
.prod-wish{position:absolute;top:10px;right:10px;width:32px;height:32px;background:rgba(10,10,10,.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--muted);transition:all .2s}
.prod-wish:hover{background:var(--ink);color:var(--fog)}
.prod-info{padding:18px}
.prod-name{font-size:13px;font-weight:400;color:var(--fog);line-height:1.5;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;letter-spacing:.01em}
.prod-price-row{display:flex;align-items:baseline;gap:10px;margin-bottom:14px}
.prod-price{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:var(--fog)}
.prod-mrp{font-size:12px;color:var(--muted);text-decoration:line-through}
.prod-off{font-size:10px;font-weight:600;color:var(--gold);letter-spacing:.06em}
.prod-add{width:100%;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer;font-family:'Inter',sans-serif;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:11px;transition:all .2s}
.prod-add:hover{background:var(--fog);color:var(--ink);border-color:var(--fog)}
.features-wrap{border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.features-grid{max-width:1400px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid var(--border)}
.feat-cell{border-right:1px solid var(--border);padding:30px 28px}
.feat-icon{width:34px;height:34px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:var(--gold)}
.feat-title{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--fog);font-weight:600;margin-bottom:6px}
.feat-desc{font-size:12px;color:var(--muted);line-height:1.6;font-weight:300}
footer{border-top:1px solid var(--border)}
.footer-top{max-width:1400px;margin:0 auto;padding:56px 40px 44px;display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr;gap:48px;border-bottom:1px solid var(--border)}
.footer-logo{display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:14px}
.footer-logo-text{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--fog);letter-spacing:-.02em}
.footer-logo-text em{color:var(--gold);font-style:normal}
.footer-desc{font-size:13px;color:var(--muted);line-height:1.7;max-width:240px;font-weight:300}
.footer-col-title{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted2);font-weight:600;margin-bottom:18px}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:11px}
.footer-col a{font-size:13px;color:var(--muted);text-decoration:none;font-weight:300;transition:color .2s}
.footer-col a:hover{color:var(--gold)}
.footer-bottom{max-width:1400px;margin:0 auto;padding:18px 40px;display:flex;align-items:center;justify-content:space-between}
.footer-bottom p{font-size:11px;color:var(--muted2);letter-spacing:.04em}
.footer-bottom-links{display:flex;gap:20px}
.footer-bottom-links a{font-size:11px;color:var(--muted2);text-decoration:none;transition:color .2s}
.footer-bottom-links a:hover{color:var(--muted)}
@media(max-width:1100px){.nav-links{display:none}.mobile-menu-btn{display:flex}.products-grid{grid-template-columns:repeat(2,1fr)}.hero{grid-template-columns:1fr}.hero-right{display:none}.footer-top{grid-template-columns:1fr 1fr;gap:28px}.features-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.nav-inner{padding:0 16px}.hero-left{padding:48px 20px}.section-wrap{padding:48px 16px}.cats-grid{grid-template-columns:1fr;grid-template-rows:auto}.cat-cell:first-child{grid-row:auto}.products-grid{grid-template-columns:repeat(2,1fr)}.features-grid{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr;padding:36px 16px}.footer-bottom{flex-direction:column;gap:10px;padding:16px;text-align:center}}
`

// ── layout.js ──────────────────────────────────────────────
files['src/app/layout.js'] = `
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export const metadata = { title: 'MakeMyClicks — Premium Everyday Wear', description: '240 GSM pure cotton oversized tees.' }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
`

// ── supabase.js ─────────────────────────────────────────────
files['src/lib/supabase.js'] = `
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseKey)
`

// ── Navbar.js ───────────────────────────────────────────────
files['src/components/Navbar.js'] = `
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')

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
    { label: 'Men', href: '/products?cat=men' },
    { label: 'Women', href: '/products?cat=women' },
    { label: 'Oversized', href: '/products?cat=oversized' },
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
            <img src="/logo.png" alt="MakeMyClicks" className="logo-img"
              onError={e => { e.target.style.display='none' }} />
            <span className="logo-text">Make<em>My</em>Clicks</span>
          </Link>

          <ul className="nav-links">
            {LINKS.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
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

            <Link href="/cart" className="nav-icon cart-icon" aria-label="Cart" style={{position:'relative'}}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-pip">{cartCount}</span>}
            </Link>

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
`

// ── Footer.js ───────────────────────────────────────────────
files['src/components/Footer.js'] = `
import Link from 'next/link'
export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link href="/" className="footer-logo">
            <img src="/logo.png" alt="logo" width={32} height={32} style={{objectFit:'contain',borderRadius:4}} onError={e=>e.target.style.display='none'} />
            <span className="footer-logo-text">Make<em>My</em>Clicks</span>
          </Link>
          <p className="footer-desc">Premium everyday wear. 240 GSM cotton, oversized fits, priced for everyone.</p>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Shop</div>
          <ul>
            <li><Link href="/products">New arrivals</Link></li>
            <li><Link href="/products?cat=oversized">Oversized tees</Link></li>
            <li><Link href="/products?cat=art">Art prints</Link></li>
            <li><Link href="/products?cat=tall">Big & tall</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Help</div>
          <ul>
            <li><Link href="/size-guide">Size guide</Link></li>
            <li><Link href="/track">Track order</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 MakeMyClicks — All rights reserved</p>
        <div className="footer-bottom-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
`

// ── ProductCard.js ──────────────────────────────────────────
files['src/components/ProductCard.js'] = `
'use client'
import Link from 'next/link'
export default function ProductCard({ product: p }) {
  const off = p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0
  function addToCart(e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('mmc_cart') || '[]')
    const idx = cart.findIndex(i => i.id === p.id)
    if (idx > -1) cart[idx].qty++
    else cart.push({ id: p.id, name: p.name, price: p.price, img: p.image_main_url, slug: p.slug, qty: 1 })
    localStorage.setItem('mmc_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('mmc_cart_update'))
  }
  return (
    <Link href={'/products/' + p.slug} className="product-card">
      <div className="prod-img">
        <img src={p.image_main_url} alt={p.name} loading="lazy" />
        {p.tags && <span className={'prod-badge' + (p.tags === 'Bestseller' ? ' gold' : '')}>{p.tags}</span>}
        <button className="prod-wish" onClick={e => { e.preventDefault() }} aria-label="Wishlist">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="prod-info">
        <div className="prod-name">{p.name}</div>
        <div className="prod-price-row">
          <span className="prod-price">Rs.{p.price}</span>
          {p.compare_price && <span className="prod-mrp">Rs.{p.compare_price}</span>}
          {off > 0 && <span className="prod-off">{off}% off</span>}
        </div>
        <button className="prod-add" onClick={addToCart}>Add to bag</button>
      </div>
    </Link>
  )
}
`

// ── page.js (homepage) ──────────────────────────────────────
files['src/app/page.js'] = `
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

const FALLBACK = [
  { id:'MMC-ST-0089', name:'Instinct Print House x Grace Beswick Unisex Tee', price:230, compare_price:300, image_main_url:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', slug:'instinct-print-house-tee', tags:'Art Print' },
  { id:'MMC-ST-0087', name:'Big & Tall Oversized Unisex T-Shirt', price:230, compare_price:546, image_main_url:'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', slug:'big-tall-oversized-tee', tags:'Bestseller' },
  { id:'MMC-ST-0082', name:'Veirdo Oversized Tee 240 GSM Pure Cotton', price:230, compare_price:740, image_main_url:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', slug:'veirdo-240gsm-tee', tags:'Top Pick' },
  { id:'MMC-ST-0085', name:'Premium Terry Cotton Oversized T-Shirt 240 GSM', price:230, compare_price:452, image_main_url:'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', slug:'premium-terry-cotton-tee', tags:'New In' },
]
const CATS = [
  { name:'Oversized Tees', sub:'4 styles', img:FALLBACK[2].image_main_url, href:'/products?cat=oversized' },
  { name:'Art Prints', sub:'Limited edition', img:FALLBACK[0].image_main_url, href:'/products?cat=art' },
  { name:'Big & Tall', sub:'Inclusive sizing', img:FALLBACK[1].image_main_url, href:'/products?cat=tall' },
  { name:'Premium Cotton', sub:'240 GSM quality', img:FALLBACK[3].image_main_url, href:'/products?cat=premium' },
]
const MARQUEE = ['240 GSM Cotton','Premium Quality','Oversized Fit','Daily Wear','Rs.230 Only','Free Delivery','New Arrivals']

export default async function HomePage() {
  let products = FALLBACK
  try {
    const { data } = await supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
    if (data && data.length) products = data
  } catch(e) {}

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">SS 2025 Collection</p>
          <h1 className="hero-headline">Cotton<br/>that <em>actually</em><br/>fits.</h1>
          <p className="hero-body">240 GSM pure cotton. Oversized cuts for real bodies. Four styles, one price — Rs.230.</p>
          <div className="hero-ctas">
            <Link href="/products" className="btn-primary">Shop the drop</Link>
            <Link href="/collections" className="btn-ghost">View collections</Link>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">240</div><div className="stat-label">GSM Cotton</div></div>
            <div><div className="stat-num">4</div><div className="stat-label">Styles</div></div>
            <div><div className="stat-num">230</div><div className="stat-label">Flat price Rs.</div></div>
          </div>
        </div>
        <div className="hero-right">
          {products.slice(0,4).map((p,i) => (
            <Link href={'/products/' + p.slug} key={p.id} className="hero-tile">
              <img src={p.image_main_url} alt={p.name} />
              <div className="tile-hover"><span className="tile-label">{p.tags || p.name.split(' ').slice(0,2).join(' ')}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i} className="marquee-item"><span className="marquee-star">✦</span>{t}</span>
          ))}
        </div>
      </div>

      <section>
        <div className="section-wrap">
          <div className="section-rule">
            <div><p className="section-eyebrow">Shop by collection</p><h2 className="section-heading">Curated styles</h2></div>
            <Link href="/collections" className="section-link">All collections →</Link>
          </div>
          <div className="cats-grid">
            {CATS.map((c,i) => (
              <Link href={c.href} key={i} className="cat-cell">
                <img src={c.img} alt={c.name} />
                <div className="cat-overlay"><div className="cat-name">{c.name}</div><div className="cat-sub">{c.sub}</div></div>
                <div className="cat-arrow">↗</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="features-wrap">
        <div className="features-grid">
          {[
            {title:'Free delivery',desc:'On orders above Rs.499. Pan-India in 3-5 days.'},
            {title:'7-day returns',desc:'Not the right fit? Return it, no questions asked.'},
            {title:'Secure checkout',desc:'UPI, cards, wallets — all encrypted and safe.'},
            {title:'COD available',desc:'Pay when it arrives. No upfront commitment.'},
          ].map((f,i) => (
            <div key={i} className="feat-cell">
              <div className="feat-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="section-wrap">
          <div className="section-rule">
            <div><p className="section-eyebrow">New arrivals</p><h2 className="section-heading">The full range</h2></div>
            <Link href="/products" className="section-link">All products →</Link>
          </div>
          <div className="products-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
`

// ── Write all files ─────────────────────────────────────────
let created = 0
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath)
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  fs.writeFileSync(fullPath, content.trimStart(), 'utf8')
  console.log('✓ Created: ' + filePath)
  created++
}
console.log('\n✅ Done! ' + created + ' files created.')
console.log('👉 Run: npm run dev')
