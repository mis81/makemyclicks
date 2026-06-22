import { supabase } from '@/lib/supabase'

export default async function TestPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('name, price, tags')
    .limit(5)

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Supabase Connection Test</h1>
      {error ? (
        <div style={{ color: 'red' }}>
          ❌ ERROR: {error.message}
        </div>
      ) : (
        <div style={{ color: 'green' }}>
          ✅ Connected! Found {products?.length} products:
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
