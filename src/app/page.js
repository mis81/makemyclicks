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
  { name:'Oversized Tees', sub:'4 styles', img:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', href:'/products?cat=oversized' },
  { name:'Art Prints', sub:'Limited edition', img:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', href:'/products?cat=art' },
  { name:'Mousepads', sub:'4 designs', img:'https://i.ibb.co/4ZNBQygw/Non-Slip-Gaming-Mouse-Pad-Materials-100-smooth.jpg', href:'/mousepads' },
  { name:'Corporate Gifting', sub:'Bulk orders', img:'https://i.ibb.co/KjgfFVMx/Elevate-Your-Workspace-Premium-Aesthetic-Desk.jpg', href:'/corporate' },
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
      <HeroSlider />

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
