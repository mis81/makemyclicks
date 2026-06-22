import { supabase } from '@/lib/supabase'
import TshirtHero from '@/components/TshirtHero'
import TshirtGrid from '@/components/TshirtGrid'

const FALLBACK_TSHIRTS = [
  { id: 'MMC-ST-0089', name: 'Instinct Print House × Grace Beswick Unisex Tee', price: 230, compare_price: 300, image_main_url: 'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', slug: 'instinct-print-house-tee', tags: 'Art Print', gsm: '240 GSM', fit: 'Oversized' },
  { id: 'MMC-ST-0087', name: 'Big & Tall Oversized Unisex T-Shirt', price: 230, compare_price: 546, image_main_url: 'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', slug: 'big-tall-oversized-tee', tags: 'Bestseller', gsm: '240 GSM', fit: 'Oversized' },
  { id: 'MMC-ST-0082', name: 'Veirdo Oversized Tee — 240 GSM Pure Cotton', price: 230, compare_price: 740, image_main_url: 'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', slug: 'veirdo-240gsm-tee', tags: 'Top Pick', gsm: '240 GSM', fit: 'Oversized' },
  { id: 'MMC-ST-0085', name: 'Premium Terry Cotton Oversized T-Shirt 240 GSM', price: 230, compare_price: 452, image_main_url: 'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', slug: 'premium-terry-cotton-tee', tags: 'New In', gsm: '240 GSM', fit: 'Oversized' },
]

export default async function TshirtsPage() {
  let products = FALLBACK_TSHIRTS
  try {
    if (supabase) {
      const { data: catData } = await supabase.from('categories').select('id').eq('slug', 'tshirts').single()
      if (catData) {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('category_id', catData.id)
          .order('created_at', { ascending: false })
        if (data && data.length) products = data
      }
    }
  } catch(e) { console.error('Supabase tshirts error:', e) }

  return (
    <div style={{ background: 'var(--cream)' }}>
      <TshirtHero />

      <div style={{ background: 'var(--ink)', borderBottom: '1px solid var(--border-dark)', marginTop: '16px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid var(--border-dark)' }}>
          {[
            { icon: '◈', title: '240 GSM Cotton', desc: 'Premium pure cotton fabric' },
            { icon: '◈', title: 'Oversized Fit', desc: 'True oversized cut for all bodies' },
            { icon: '◈', title: 'Rs.230 Flat', desc: 'One price for all styles' },
            { icon: '◈', title: 'Free Delivery', desc: 'On orders above Rs.499' },
          ].map((f, i) => (
            <div key={i} style={{ borderRight: '1px solid var(--border-dark)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: 'var(--rose)', fontSize: '18px', flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TshirtGrid products={products} />

      <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
        <img src="https://i.ibb.co/21cNQk46/Chat-GPT-Image-Jun-22-2026-02-18-53-PM.png" alt="Collection"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(245,240,232,0.92) 0%, rgba(245,240,232,0.5) 45%, transparent 100%)', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', width: '100%' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '12px' }}>Wear Your Essence</p>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(48px,6vw,80px)', lineHeight: 0.88, color: 'var(--ink)', marginBottom: '20px' }}>
              PREMIUM<br />COTTON TEES
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '300px', marginBottom: '28px', fontWeight: 300 }}>
              Crafted for comfort. Made for every mood. Rs.230 flat price.
            </p>
            <a href="#products" className="tshirt-bottom-cta" style={{
              background: 'var(--ink)', color: 'var(--white)',
              padding: '14px 32px', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s',
            }}>
              Shop All Tees
            </a>
          </div>
        </div>
      </div>

      <style>{`.tshirt-bottom-cta:hover { background: var(--rose) !important; color: #ffffff !important; }`}</style>
    </div>
  )
}
