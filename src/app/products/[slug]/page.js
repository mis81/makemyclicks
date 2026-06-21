'use client'
import { use } from 'react'
import Link from 'next/link'
const PRODUCTS = [
  { id:'MMC-ST-0089', name:'Instinct Print House x Grace Beswick Unisex Tee', price:230, compare_price:300, image_main_url:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', slug:'instinct-print-house-tee', tags:'Art Print', desc:'A premium unisex art-print tee from the Instinct Print House x Grace Beswick collaboration. Made from 240 GSM pure cotton for an oversized, relaxed fit.' },
  { id:'MMC-ST-0087', name:'Big & Tall Oversized Unisex T-Shirt', price:230, compare_price:546, image_main_url:'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', slug:'big-tall-oversized-tee', tags:'Bestseller', desc:'Oversized fit for every body type. Modelled at 6ft 4in wearing Large. 240 GSM pure cotton. Daily wear essential.' },
  { id:'MMC-ST-0082', name:'Veirdo Oversized Tee 240 GSM Pure Cotton', price:230, compare_price:740, image_main_url:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', slug:'veirdo-240gsm-tee', tags:'Top Pick', desc:'Veirdo oversized tee made from 240 GSM pure cotton. Heavy-weight, breathable, and built for everyday wear.' },
  { id:'MMC-ST-0085', name:'Premium Terry Cotton Oversized T-Shirt 240 GSM', price:230, compare_price:452, image_main_url:'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', slug:'premium-terry-cotton-tee', tags:'New In', desc:'Premium terry cotton fabric at 240 GSM. Soft feel, oversized fit. Your go-to daily tee.' },
]
export default function ProductPage({ params }) {
  const { slug } = use(params)
  const p = PRODUCTS.find(x => x.slug === slug) || PRODUCTS[0]
  const off = Math.round(((p.compare_price - p.price) / p.compare_price) * 100)
  return (
    <div style={{maxWidth:'1400px',margin:'0 auto',padding:'60px 40px'}}>
      <div style={{marginBottom:'32px'}}>
        <Link href="/" style={{color:'var(--muted)',textDecoration:'none',fontSize:'12px'}}>Home</Link>
        <span style={{color:'var(--muted2)',margin:'0 8px'}}>/</span>
        <Link href="/products" style={{color:'var(--muted)',textDecoration:'none',fontSize:'12px'}}>Products</Link>
        <span style={{color:'var(--muted2)',margin:'0 8px'}}>/</span>
        <span style={{color:'var(--fog)',fontSize:'12px'}}>{p.name}</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--border)',border:'1px solid var(--border)'}}>
        <div style={{background:'var(--ink2)',overflow:'hidden',aspectRatio:'3/4'}}>
          <img src={p.image_main_url} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        </div>
        <div style={{background:'var(--ink)',padding:'60px 48px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <span style={{fontSize:'10px',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'16px',display:'block'}}>{p.tags}</span>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(24px,2.5vw,36px)',fontWeight:700,color:'var(--fog)',letterSpacing:'-.02em',marginBottom:'24px',lineHeight:1.1}}>{p.name}</h1>
          <div style={{display:'flex',alignItems:'baseline',gap:'12px',marginBottom:'24px'}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',fontWeight:700,color:'var(--fog)'}}>Rs.{p.price}</span>
            <span style={{fontSize:'14px',color:'var(--muted)',textDecoration:'line-through'}}>Rs.{p.compare_price}</span>
            <span style={{fontSize:'11px',fontWeight:600,color:'var(--gold)'}}>{off}% off</span>
          </div>
          <p style={{fontSize:'14px',color:'var(--muted)',lineHeight:1.8,marginBottom:'36px',fontWeight:300}}>{p.desc}</p>
          <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
            {['XS','S','M','L','XL','XXL'].map(s=>(
              <button key={s} style={{width:'48px',height:'48px',border:'1px solid var(--border)',background:'transparent',color:'var(--muted)',fontSize:'12px',fontWeight:600,cursor:'pointer',transition:'all .2s',fontFamily:"'Inter',sans-serif"}}
                onMouseEnter={e=>{e.target.style.borderColor='var(--fog)';e.target.style.color='var(--fog)'}}
                onMouseLeave={e=>{e.target.style.borderColor='var(--border)';e.target.style.color='var(--muted)'}}>{s}</button>
            ))}
          </div>
          <button style={{width:'100%',background:'var(--fog)',color:'var(--ink)',border:'none',padding:'16px',fontSize:'11px',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',cursor:'pointer',fontFamily:"'Inter',sans-serif",marginBottom:'12px',transition:'background .2s'}}
            onMouseEnter={e=>e.target.style.background='var(--gold)'}
            onMouseLeave={e=>e.target.style.background='var(--fog)'}>Add to bag</button>
          <div style={{marginTop:'32px',paddingTop:'24px',borderTop:'1px solid var(--border)',display:'flex',flexDirection:'column',gap:'10px'}}>
            {['240 GSM pure cotton fabric','Oversized unisex fit','Machine washable','Free delivery above Rs.499'].map((f,i)=>(
              <div key={i} style={{fontSize:'12px',color:'var(--muted)',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{color:'var(--gold)'}}>✓</span>{f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
