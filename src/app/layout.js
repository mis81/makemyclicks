import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import PageTransition from '@/components/PageTransition'
export const metadata = {
  title: 'MakeMyClicks — Premium Everyday Wear',
  description: '240 GSM pure cotton oversized tees. Built for everyday comfort.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
