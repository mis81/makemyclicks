import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerGrid, StaggerItem } from '@/components/animations/StaggerGrid'

const FALLBACK = [
  { id:'MMC-ST-0089', name:'Instinct Print House x Grace Beswick Unisex Tee', price:230, compare_price:300, image_main_url:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', slug:'instinct-print-house-tee', tags:'Art Print' },
  { id:'MMC-ST-0087', name:'Big & Tall Oversized Unisex T-Shirt', price:230, compare_price:546, image_main_url:'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', slug:'big-tall-oversized-tee', tags:'Bestseller' },
  { id:'MMC-ST-0082', name:'Veirdo Oversized Tee 240 GSM Pure Cotton', price:230, compare_price:740, image_main_url:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', slug:'veirdo-240gsm-tee', tags:'Top Pick' },
  { id:'MMC-ST-0085', name:'Premium Terry Cotton Oversized T-Shirt 240 GSM', price:230, compare_price:452, image_main_url:'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', slug:'premium-terry-cotton-tee', tags:'New In' },
]

const CATS = [
  { label:'T-Shirts', name:'Oversized Tees', sub:'4 styles', img:FALLBACK[2].image_main_url, href:'/tshirts' },
  { label:'Mousepads', name:'Desk Pads', sub:'4 designs', img:'https://i.ibb.co/4ZNBQygw/Non-Slip-Gaming-Mouse-Pad-Materials-100-smooth.jpg', href:'/mousepads' },
  { label:'Machines', name:'DTF Printers', sub:'3 models', img:'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg', href:'/machines' },
  { label:'Corporate', name:'Gift Hampers', sub:'Custom orders', img:'https://abhbsihvzfxgmogknvwm.supabase.co/storage/v1/object/public/product-images/corporate-1.jpg', href:'/corporate' },
]

const MARQUEE = ['240 GSM Cotton','Premium Quality','Oversized Fit','Rs.230 Only','Free Delivery','New Arrivals','Daily Wear','Art Prints']

export default async function HomePage() {
  let products = FALLBACK
  try {
    if (supabase) {
      const { data } = await supabase
        .from('products')
        .select('*, categories(name, slug)')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(4)
      if (data && data.length) {
        products = data
      } else {
        const { data: all } = await supabase
          .from('products')
          .select('*, categories(name, slug)')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(4)
        if (all && all.length) products = all
      }
    }
  } catch(e) { console.error('Supabase error:', e) }

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '480px',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <img
          src="https://abhbsihvzfxgmogknvwm.supabase.co/storage/v1/object/public/product-images/hero-fabric.jpg"
          alt="Premium fabric"
          loading="eager"
          fetchPriority="high"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: '20% center',
            display: 'block',
          }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(15,10,20,0.65) 45%, rgba(15,10,20,0.15) 100%)',
        }} />

        {/* Content — left aligned like Kreo */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 40px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '48px',
        }}>
          {/* Breadcrumb — absolute top-left */}
          <div style={{
            position: 'absolute',
            top: '28px',
            left: '40px',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.04em' }}>Collections</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em' }}>New Arrivals</span>
          </div>

          {/* Giant page title like Kreo */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(72px,9vw,130px)',
            lineHeight: 0.85,
            letterSpacing: '0.01em',
            color: '#ffffff',
            marginBottom: '20px',
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
          }}>
            WEAR IT<br />
            YOUR<br />
            <span style={{ color: 'var(--rose)' }}>WAY</span>
          </h1>
        </div>

        {/* Right side product mosaic */}
        <div style={{
          position: 'absolute',
          right: '40px', top: '50%',
          transform: 'translateY(-50%)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          width: '480px',
          height: '380px',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '-8px',
            background: 'var(--rose)',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '6px 14px',
            zIndex: 10,
            transform: 'rotate(2deg)',
            boxShadow: '0 4px 16px rgba(201,116,138,0.4)',
          }}>
            NEW DROP ✦
          </div>
          {[
            'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg',
            'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg',
            'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg',
            'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg',
          ].map((img, i) => (
            <div key={i} style={{
              borderRadius: '8px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <img src={img} alt="product" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: '72px',
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.04em' }}>
              11 products
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'T-Shirts', 'Mousepads', 'Machines'].map(f => (
                <a key={f} href={
                  f === 'All' ? '/' :
                  f === 'T-Shirts' ? '/tshirts' :
                  f === 'Mousepads' ? '/mousepads' :
                  '/machines'
                } style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '4px 12px',
                  background: f === 'All' ? 'var(--ink)' : 'transparent',
                  color: f === 'All' ? '#ffffff' : 'var(--muted)',
                  border: '1px solid',
                  borderColor: f === 'All' ? 'var(--ink)' : 'var(--border)',
                  transition: 'all 0.2s',
                }}>
                  {f}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
            <span style={{ letterSpacing: '0.04em' }}>Sort by:</span>
            <select style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--ink)',
              fontSize: '12px',
              padding: '4px 10px',
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              outline: 'none',
            }}>
              <option>Featured ●</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>New Arrivals</option>
              <option>Bestsellers</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <FadeIn delay={0.1}>
        <div className="marquee">
          <div className="marquee-track">
            {[...MARQUEE,...MARQUEE].map((t,i) => (
              <span key={i} className="marquee-item"><span className="marquee-star">✦</span>{t}</span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── CATEGORY STRIP ── */}
      <div className="cat-strip">
        <StaggerGrid className="cat-strip-inner">
          {CATS.map((c,i) => (
            <StaggerItem key={i}>
              <Link href={c.href} className="cat-strip-item">
                <img src={c.img} alt={c.name} className="cat-strip-img" />
                <div className="cat-strip-info">
                  <div className="cat-strip-label">{c.label}</div>
                  <div className="cat-strip-name">{c.name}</div>
                  <div className="cat-strip-sub">{c.sub}</div>
                </div>
                <span className="cat-strip-arrow">→</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* ── FULL WIDTH BANNER ── */}
      <div className="full-banner" data-cursor="explore">
        <img src="https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg" alt="New Season" />
        <div className="full-banner-overlay">
          <div className="full-banner-content">
            <div className="full-banner-label">New Season</div>
            <div className="full-banner-title">NEW<br />VIBES</div>
            <div className="full-banner-sub">Discover everything new. 240 GSM cotton that moves with you.</div>
            <Link href="/tshirts" className="btn-primary" data-cursor="shop">Explore Collection</Link>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="features-wrap">
        <div className="features-grid">
          {[
            { title:'Fast Delivery', desc:'Quick & safe delivery above Rs.499', icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
            { title:'Easy Returns', desc:'Within 7 days — no questions asked', icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-4.73"/></svg> },
            { title:'Quality Assured', desc:'240 GSM pure cotton guaranteed', icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
            { title:'Secure Payment', desc:'100% secure checkout via Razorpay', icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
          ].map((f,i) => (
            <div key={i} className="feat-cell">
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div style={{ background: 'var(--cream)' }}>
        <div className="section-wrap">
          <FadeIn delay={0.2}>
            <div className="section-rule">
              <div>
                <p className="section-eyebrow">New arrivals</p>
                <h2 className="section-heading">BEST OF<br />MAKEMYCLICKS</h2>
              </div>
              <Link href="/tshirts" className="section-link">View all →</Link>
            </div>
          </FadeIn>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
            {products.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>

      <style>{`
        .hero-cta-primary {
          background: #ffffff;
          color: var(--ink);
          padding: 15px 36px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s, color 0.2s;
        }
        .hero-cta-primary:hover { background: var(--rose); color: #fff; }

        .hero-cta-ghost {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .hero-cta-ghost:hover { color: #fff; }

        .mosaic-tile {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          display: block;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .mosaic-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s;
          filter: grayscale(15%);
        }
        .mosaic-tile:hover .mosaic-img {
          transform: scale(1.06);
          filter: grayscale(0%);
        }
        .mosaic-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%);
          display: flex; align-items: flex-end;
          padding: 12px;
          opacity: 0; transition: opacity 0.3s;
        }
        .mosaic-tile:hover .mosaic-overlay { opacity: 1; }
        .mosaic-tag {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          font-weight: 500;
        }

        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }
      `}</style>
    </>
  )
}
