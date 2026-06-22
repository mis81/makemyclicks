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
          background: 'linear-gradient(to right, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.4) 55%, rgba(10,10,10,0.1) 100%)',
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
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '12px',
          }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>🏠</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Collections</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 500 }}>New Arrivals</span>
          </div>

          {/* Giant page title like Kreo */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(64px,8vw,120px)',
            lineHeight: 0.88,
            letterSpacing: '0.01em',
            color: '#ffffff',
            margin: 0,
          }}>
            WEAR IT<br />
            <span style={{ color: 'var(--rose)' }}>YOUR WAY</span>
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

      {/* ── MARQUEE ── */}
      <div className="marquee">
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i} className="marquee-item"><span className="marquee-star">✦</span>{t}</span>
          ))}
        </div>
      </div>

      {/* ── CATEGORY STRIP ── */}
      <div className="cat-strip">
        <div className="cat-strip-inner">
          {CATS.map((c,i) => (
            <Link key={i} href={c.href} className="cat-strip-item">
              <img src={c.img} alt={c.name} className="cat-strip-img" />
              <div className="cat-strip-info">
                <div className="cat-strip-label">{c.label}</div>
                <div className="cat-strip-name">{c.name}</div>
                <div className="cat-strip-sub">{c.sub}</div>
              </div>
              <span className="cat-strip-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FULL WIDTH BANNER ── */}
      <div className="full-banner">
        <img src="https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg" alt="New Season" />
        <div className="full-banner-overlay">
          <div className="full-banner-content">
            <div className="full-banner-label">New Season</div>
            <div className="full-banner-title">NEW<br />VIBES</div>
            <div className="full-banner-sub">Discover everything new. 240 GSM cotton that moves with you.</div>
            <Link href="/tshirts" className="btn-primary">Explore Collection</Link>
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
          <div className="section-rule">
            <div>
              <p className="section-eyebrow">New arrivals</p>
              <h2 className="section-heading">BEST OF<br />MAKEMYCLICKS</h2>
            </div>
            <Link href="/tshirts" className="section-link">View all →</Link>
          </div>
          <div className="products-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
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
