import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import HeroSlider from '@/components/HeroSlider'

const FALLBACK = [
  { id:'MMC-ST-0089', name:'Instinct Print House x Grace Beswick Unisex Tee', price:230, compare_price:300, image_main_url:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', slug:'instinct-print-house-tee', tags:'Art Print' },
  { id:'MMC-ST-0087', name:'Big & Tall Oversized Unisex T-Shirt', price:230, compare_price:546, image_main_url:'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', slug:'big-tall-oversized-tee', tags:'Bestseller' },
  { id:'MMC-ST-0082', name:'Veirdo Oversized Tee 240 GSM Pure Cotton', price:230, compare_price:740, image_main_url:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', slug:'veirdo-240gsm-tee', tags:'Top Pick' },
  { id:'MMC-ST-0085', name:'Premium Terry Cotton Oversized T-Shirt 240 GSM', price:230, compare_price:452, image_main_url:'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', slug:'premium-terry-cotton-tee', tags:'New In' },
]

const CATS = [
  { label:'T-Shirts', name:'Oversized Tees', sub:'4 styles', img:FALLBACK[2].image_main_url, href:'/products?cat=oversized' },
  { label:'Mousepads', name:'Desk Pads', sub:'4 designs', img:'https://i.ibb.co/4ZNBQygw/Non-Slip-Gaming-Mouse-Pad-Materials-100-smooth.jpg', href:'/mousepads' },
  { label:'Machines', name:'DTF Printers', sub:'3 models', img:'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg', href:'/machines' },
  { label:'Corporate', name:'Gift Hampers', sub:'Custom orders', img:'https://i.ibb.co/cSqwqQvN/Luxury-Gift-Hampers-India-s-Favourite-Online.jpg', href:'/corporate' },
]

const MARQUEE = ['240 GSM Cotton','Premium Quality','Oversized Fit','Rs.230 Only','Free Delivery','New Arrivals','Daily Wear','Art Prints']

export default async function HomePage() {
  let products = FALLBACK
  try {
    const { data } = await supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
    if (data && data.length) products = data
  } catch(e) {}

  return (
    <>
      <HeroSlider />

      <div className="marquee">
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i} className="marquee-item"><span className="marquee-star">✦</span>{t}</span>
          ))}
        </div>
      </div>

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

      <div className="full-banner">
        <img src="https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg" alt="New Season" />
        <div className="full-banner-overlay">
          <div className="full-banner-content">
            <div className="full-banner-label">New Season</div>
            <div className="full-banner-title">NEW<br />VIBES</div>
            <div className="full-banner-sub">Discover everything new. 240 GSM cotton that moves with you.</div>
            <Link href="/products" className="btn-primary">Explore Collection</Link>
          </div>
        </div>
      </div>

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

      <div style={{ background: 'var(--cream)' }}>
        <div className="section-wrap">
          <div className="section-rule">
            <div>
              <p className="section-eyebrow">New arrivals</p>
              <h2 className="section-heading">BEST OF<br />MAKEMYCLICKS</h2>
            </div>
            <Link href="/products" className="section-link">View all →</Link>
          </div>
          <div className="products-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </>
  )
}
