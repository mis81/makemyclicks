export default function OrderSuccess() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '36px', fontWeight: 700, color: 'var(--fog)', marginBottom: '16px' }}>
        Order Confirmed!
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '32px' }}>
        Thank you for shopping with MakeMyClicks. Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>
      <a href="/products" style={{ background: 'var(--fog)', color: 'var(--ink)', padding: '15px 34px', fontSize: '11px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
        Continue Shopping
      </a>
    </div>
  )
}
