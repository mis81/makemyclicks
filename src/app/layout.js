import './globals.css'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import PageTransition from '@/components/PageTransition'
import CustomCursor from '@/components/CustomCursor'
export const metadata = {
  title: 'MakeMyClicks — Premium Everyday Wear',
  description: '240 GSM pure cotton oversized tees. Built for everyday comfort.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  other: {
    'link': '<link rel="preload" as="image" href="https://abhbsihvzfxgmogknvwm.supabase.co/storage/v1/object/public/product-images/hero-fabric.jpg"/>',
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <PageTransition>
          <main style={{ paddingTop: 0 }}>{children}</main>
        </PageTransition>
        <Footer />
        <CartDrawer />
        <CustomCursor />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive"/>
      </body>
    </html>
  )
}
