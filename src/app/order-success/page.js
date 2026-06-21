import Link from 'next/link'
export default function OrderSuccess() {
  return (
    <div style={{maxWidth:'600px',margin:'0 auto',padding:'100px 40px',textAlign:'center'}}>
      <div style={{width:'80px',height:'80px',background:'var(--ink2)',border:'1px solid var(--border)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 32px',fontSize:'32px'}}>✓</div>
      <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'36px',fontWeight:700,color:'var(--fog)',marginBottom:'16px',letterSpacing:'-.02em'}}>Order Confirmed!</h1>
      <p style={{fontSize:'14px',color:'var(--muted)',lineHeight:1.8,marginBottom:'40px',fontWeight:300}}>Thank you for shopping with MakeMyClicks. Your order has been placed successfully. You will receive a confirmation email shortly.</p>
      <Link href="/products" style={{background:'var(--fog)',color:'var(--ink)',padding:'15px 34px',fontSize:'11px',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',textDecoration:'none',display:'inline-block',transition:'background .2s'}}>
        Continue Shopping
      </Link>
    </div>
  )
}
