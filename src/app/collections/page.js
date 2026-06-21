'use client'
import Link from 'next/link'
const COLLECTIONS = [
  { name:'Oversized Tees', desc:'240 GSM pure cotton. Built for real bodies.', img:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', href:'/products?cat=oversized', count:'4 styles' },
  { name:'Art Prints', desc:'Unique collab prints you will not find anywhere else.', img:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', href:'/products?cat=art', count:'Limited edition' },
  { name:'Big & Tall', desc:'Inclusive sizing. Wear Large at 6ft 4in.', img:'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', href:'/products?cat=tall', count:'Inclusive sizing' },
  { name:'Premium Cotton', desc:'Terry cotton 240 GSM. Soft, breathable, built to last.', img:'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', href:'/products?cat=premium', count:'240 GSM quality' },
  { name:'Mousepads', desc:'Precision surfaces for every workspace.', img:'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg', href:'/products?cat=mousepads', count:'Coming soon' },
  { name:'Corporate Gifting', desc:'Bulk orders with custom branding for your team.', img:'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg', href:'/corporate', count:'Custom orders' },
  { name:'Raw Materials', desc:'240 GSM cotton fabric rolls. Buy by the metre.', img:'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg', href:'/products?cat=raw-materials', count:'Wholesale' },
  { name:'Machines', desc:'Garment machinery and equipment.', img:'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg', href:'/products?cat=machines', count:'Trade only' },
]
export default function CollectionsPage() {
  return (
    <div style={{maxWidth:'1400px',margin:'0 auto',padding:'60px 40px'}}>
      <div style={{borderBottom:'1px solid var(--border)',paddingBottom:'20px',marginBottom:'48px'}}>
        <p style={{fontSize:'10px',letterSpacing:'.18em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'6px'}}>Browse all</p>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,3vw,40px)',fontWeight:700,color:'var(--fog)',letterSpacing:'-.02em'}}>Collections</h1>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'var(--border)',border:'1px solid var(--border)'}}>
        {COLLECTIONS.map((c,i) => (
          <Link key={i} href={c.href} style={{display:'block',position:'relative',overflow:'hidden',background:'var(--ink2)',textDecoration:'none',aspectRatio:'3/4'}}>
            <img src={c.img} alt={c.name} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.6,display:'block',transition:'transform .5s,opacity .3s'}}
              onMouseEnter={e=>{e.target.style.transform='scale(1.04)';e.target.style.opacity='.85'}}
              onMouseLeave={e=>{e.target.style.transform='scale(1)';e.target.style.opacity='.6'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,10,.9) 0%,transparent 55%)',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'20px'}}>
              <div style={{fontSize:'11px',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'6px'}}>{c.count}</div>
              <div style={{fontSize:'14px',letterSpacing:'.06em',textTransform:'uppercase',color:'var(--fog)',fontWeight:600,marginBottom:'6px'}}>{c.name}</div>
              <div style={{fontSize:'12px',color:'var(--muted)',lineHeight:1.5,fontWeight:300}}>{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
