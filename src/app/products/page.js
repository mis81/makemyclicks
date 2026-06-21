'use client'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'

const ALL_PRODUCTS = [
  { id:'MMC-ST-0089', name:'Instinct Print House x Grace Beswick Unisex Tee', price:230, compare_price:300, image_main_url:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', slug:'instinct-print-house-tee', tags:'Art Print', cat:'art' },
  { id:'MMC-ST-0087', name:'Big & Tall Oversized Unisex T-Shirt', price:230, compare_price:546, image_main_url:'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', slug:'big-tall-oversized-tee', tags:'Bestseller', cat:'tall' },
  { id:'MMC-ST-0082', name:'Veirdo Oversized Tee 240 GSM Pure Cotton', price:230, compare_price:740, image_main_url:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', slug:'veirdo-240gsm-tee', tags:'Top Pick', cat:'oversized' },
  { id:'MMC-ST-0085', name:'Premium Terry Cotton Oversized T-Shirt 240 GSM', price:230, compare_price:452, image_main_url:'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', slug:'premium-terry-cotton-tee', tags:'New In', cat:'premium' },
]

const FILTERS = ['All', 'Oversized', 'Art Print', 'Big & Tall', 'Premium']

export default function ProductsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.tags === active || p.cat === active.toLowerCase())
  return (
    <div style={{maxWidth:'1400px',margin:'0 auto',padding:'60px 40px'}}>
      <div style={{borderBottom:'1px solid var(--border)',paddingBottom:'20px',marginBottom:'40px',display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
        <div>
          <p style={{fontSize:'10px',letterSpacing:'.18em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'6px'}}>Browse</p>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,3vw,40px)',fontWeight:700,color:'var(--fog)',letterSpacing:'-.02em'}}>All Products</h1>
        </div>
        <p style={{fontSize:'12px',color:'var(--muted)'}}>{filtered.length} items</p>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'40px',flexWrap:'wrap'}}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{
            padding:'8px 20px',fontSize:'11px',letterSpacing:'.08em',textTransform:'uppercase',
            fontWeight:600,cursor:'pointer',fontFamily:"'Inter',sans-serif",
            background: active===f ? 'var(--fog)' : 'transparent',
            color: active===f ? 'var(--ink)' : 'var(--muted)',
            border: active===f ? '1px solid var(--fog)' : '1px solid var(--border)',
            transition:'all .2s'
          }}>{f}</button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
