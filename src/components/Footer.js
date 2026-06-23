'use client'
import Link from 'next/link'
import AnimatedLogo from '@/components/AnimatedLogo'
export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div style={{ position: 'relative', paddingBottom: '10px' }}>
            <AnimatedLogo isTransparent={false} />
          </div>
          <p className="footer-desc">Premium everyday wear. 240 GSM cotton, oversized fits, priced for everyone.</p>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Shop</div>
          <ul>
            <li><Link href="/products">New arrivals</Link></li>
            <li><Link href="/products?cat=oversized">Oversized tees</Link></li>
            <li><Link href="/products?cat=art">Art prints</Link></li>
            <li><Link href="/products?cat=tall">Big & tall</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Help</div>
          <ul>
            <li><Link href="/size-guide">Size guide</Link></li>
            <li><Link href="/track">Track order</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 MakeMyClicks — All rights reserved</p>
        <div className="footer-bottom-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
