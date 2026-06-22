import { supabase } from '@/lib/supabase'
import MousepadPageClient from '@/components/MousepadPageClient'

const FALLBACK_MOUSEPADS = [
  { id: 'MMC-MP-001', name: 'Non-Slip Gaming Mousepad — Smooth Surface', price: 349, compare_price: 699, image_main_url: 'https://i.ibb.co/4ZNBQygw/Non-Slip-Gaming-Mouse-Pad-Materials-100-smooth.jpg', slug: 'non-slip-gaming-mousepad', tags: 'Bestseller', sizes: ['Small 25×20cm', 'Medium 35×25cm', 'Large 45×40cm', 'XL 80×40cm'] },
  { id: 'MMC-MP-002', name: 'Stock Market Chart Desk Mousepad', price: 399, compare_price: 799, image_main_url: 'https://i.ibb.co/cKZhYCXV/Stock-Market-Chart-Muster-Quadratisches-Mauspad.jpg', slug: 'stock-market-chart-mousepad', tags: 'New In', sizes: ['Medium 35×35cm', 'Large 45×45cm'] },
  { id: 'MMC-MP-003', name: 'Gaming Workspace Upgrade XL Pad', price: 549, compare_price: 999, image_main_url: 'https://i.ibb.co/PZbt6kZc/Level-Up-Your-Gaming-Workspace-Upgrade-your.jpg', slug: 'gaming-workspace-xl-mousepad', tags: 'Top Pick', sizes: ['Large 45×40cm', 'XL 80×40cm', 'XXL 90×45cm'] },
  { id: 'MMC-MP-004', name: 'Premium Aesthetic Desk Pad', price: 449, compare_price: 899, image_main_url: 'https://i.ibb.co/KjgfFVMx/Elevate-Your-Workspace-Premium-Aesthetic-Desk.jpg', slug: 'premium-aesthetic-desk-pad', tags: 'Art Print', sizes: ['Medium 35×25cm', 'Large 45×40cm', 'XL 80×40cm'] },
]

export default async function MousepadsPage() {
  let products = FALLBACK_MOUSEPADS
  try {
    if (supabase) {
      const { data: catData } = await supabase.from('categories').select('id').eq('slug', 'mousepads').single()
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
  } catch(e) { console.error('Supabase mousepads error:', e) }

  return <MousepadPageClient products={products} />
}
