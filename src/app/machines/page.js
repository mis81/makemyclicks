import { supabase } from '@/lib/supabase'
import MachinePageClient from '@/components/MachinePageClient'

const FALLBACK_MACHINES = [
  { id: 'MMC-MCH-001', name: 'A3 DTF Inkjet Printer — Heat Transfer T-Shirt Set', price: 84999, compare_price: 124999, image_main_url: 'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg', slug: 'a3-dtf-inkjet-printer', tags: 'Bestseller', specs: ['Print Width: A3 (297mm)', 'Resolution: 1440 DPI', 'Ink Type: DTF Pigment', 'Includes: Shaker + Oven'] },
  { id: 'MMC-MCH-002', name: 'UV DTF A3 Printer — 30cm Roll Popular Model', price: 94999, compare_price: 149999, image_main_url: 'https://i.ibb.co/fYrjYmYY/Imprimante-UV-DTF-A3-populaire-rouleau-de-30cm.jpg', slug: 'uv-dtf-a3-printer-30cm', tags: 'New In', specs: ['Print Width: 30cm Roll', 'UV Curing: Built-in LED', 'Substrate: Multi-surface', 'Resolution: 2400 DPI'] },
  { id: 'MMC-MCH-003', name: 'A3 DTF Complete Production Set', price: 109999, compare_price: 174999, image_main_url: 'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg', slug: 'a3-dtf-complete-set', tags: 'Top Pick', specs: ['Full DTF Workflow', 'Auto Powder Shaker', 'Heat Press Included', 'RIP Software License'] },
]

export default async function MachinesPage() {
  let machines = FALLBACK_MACHINES
  try {
    if (supabase) {
      const { data: catData } = await supabase.from('categories').select('id').eq('slug', 'machines').single()
      if (catData) {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('category_id', catData.id)
          .order('created_at', { ascending: false })
        if (data && data.length) machines = data
      }
    }
  } catch(e) { console.error('Supabase machines error:', e) }

  return <MachinePageClient machines={machines} />
}
