const { createClient } = require('@supabase/supabase-js')
const https = require('https')
const fs = require('fs')
const path = require('path')

require('dotenv').config({ path: '.env.local' })

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey
)

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not set — using anon key (uploads may fail due to RLS)')
} else {
  console.log('🔑 Using service role key\n')
}

// ── Product images (database update) ──────────────────────────────────────────
const PRODUCT_IMAGES = [
  { sku: 'MMC-ST-0089', file: 'tshirt-instinct.jpg', url: 'https://i.ibb.co/qM9t0Gsm/Instinct-Print-House-x-Grace-Beswick-Art-Unisex.jpg' },
  { sku: 'MMC-ST-0087', file: 'tshirt-bigtall.jpg',  url: 'https://i.ibb.co/Rk1YMRS9/Model-Height-6-4-Wearing-Large-Big-Tall-1.jpg' },
  { sku: 'MMC-ST-0082', file: 'tshirt-veirdo.jpg',   url: 'https://i.ibb.co/zWTVdZzN/Veirdo-Men-s-Oversized-T-Shirt-240-GSM-Pure.jpg' },
  { sku: 'MMC-ST-0085', file: 'tshirt-premium.jpg',  url: 'https://i.ibb.co/NnW32DBX/Premium-Fabric-240-GSM-Terry-Cotton-for-a-soft-1.jpg' },
  { sku: 'MMC-MP-001',  file: 'mousepad-gaming.jpg', url: 'https://i.ibb.co/4ZNBQygw/Non-Slip-Gaming-Mouse-Pad-Materials-100-smooth.jpg' },
  { sku: 'MMC-MP-002',  file: 'mousepad-stock.jpg',  url: 'https://i.ibb.co/cKZhYCXV/Stock-Market-Chart-Muster-Quadratisches-Mauspad.jpg' },
  { sku: 'MMC-MP-003',  file: 'mousepad-xl.jpg',     url: 'https://i.ibb.co/PZbt6kZc/Level-Up-Your-Gaming-Workspace-Upgrade-your.jpg' },
  { sku: 'MMC-MP-004',  file: 'mousepad-aesthetic.jpg', url: 'https://i.ibb.co/KjgfFVMx/Elevate-Your-Workspace-Premium-Aesthetic-Desk.jpg' },
  { sku: 'MMC-MCH-001', file: 'machine-dtf.jpg',     url: 'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg' },
  { sku: 'MMC-MCH-002', file: 'machine-uv.jpg',      url: 'https://i.ibb.co/fYrjYmYY/Imprimante-UV-DTF-A3-populaire-rouleau-de-30cm.jpg' },
  { sku: 'MMC-MCH-003', file: 'machine-complete.jpg',url: 'https://i.ibb.co/Z6yPBfwc/A3-DTF-inkjet-printer-set-heat-transfer-t-shirt.jpg' },
]

// ── Hero / banner images (source-code replacement across all src/ files) ──────
const HERO_IMAGES = [
  { file: 'hero-fabric.jpg',      url: 'https://i.ibb.co/Fbx6Rc7r/Chat-GPT-Image-Jun-22-2026-04-37-11-PM.png' },
  { file: 'hero-tshirt1.jpg',     url: 'https://i.ibb.co/DDyZpqW2/Chat-GPT-Image-Jun-22-2026-02-24-08-PM.png' },
  { file: 'hero-tshirt2.jpg',     url: 'https://i.ibb.co/21cNQk46/Chat-GPT-Image-Jun-22-2026-02-18-53-PM.png' },
  { file: 'mousepad-hero1.jpg',   url: 'https://i.ibb.co/vxR7r7GS/Chat-GPT-Image-Jun-22-2026-03-55-19-PM.png' },
  { file: 'mousepad-hero2.jpg',   url: 'https://i.ibb.co/jKr6Yxr/Chat-GPT-Image-Jun-22-2026-03-58-55-PM.png' },
  { file: 'machine-factory.jpg',  url: 'https://i.ibb.co/N2QLf1Sq/Chat-GPT-Image-Jun-22-2026-03-42-39-PM.png' },
  { file: 'machine-gears.jpg',    url: 'https://i.ibb.co/d4Fgvv9D/Chat-GPT-Image-Jun-22-2026-03-43-24-PM.png' },
  { file: 'corporate-1.jpg',      url: 'https://i.ibb.co/gL17T3X3/995154848928107194.jpg' },
  { file: 'corporate-2.jpg',      url: 'https://i.ibb.co/jP1Vbgfq/download-1.jpg' },
  { file: 'logo.png',             url: 'https://i.ibb.co/GQVGR3M2/Chat-GPT-Image-Jun-21-2026-01-38-57-PM.png' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    function fetch(targetUrl) {
      https.get(targetUrl, response => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          fetch(response.headers.location)
        } else {
          response.pipe(file)
          file.on('finish', () => { file.close(); resolve(filepath) })
        }
      }).on('error', reject)
    }
    fetch(url)
  })
}

function contentType(filename) {
  if (filename.endsWith('.png')) return 'image/png'
  if (filename.endsWith('.webp')) return 'image/webp'
  return 'image/jpeg'
}

// Walk src/ and return all .js files
function walkSrc(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkSrc(full, results)
    else if (entry.name.endsWith('.js') || entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) results.push(full)
  }
  return results
}

// Replace every occurrence of oldUrl with newUrl across all src/ files
function replaceInSrc(oldUrl, newUrl) {
  const srcDir = path.join(__dirname, '..', 'src')
  const files = walkSrc(srcDir)
  let count = 0
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    if (content.includes(oldUrl)) {
      fs.writeFileSync(file, content.split(oldUrl).join(newUrl), 'utf8')
      console.log(`    ↳ updated ${path.relative(path.join(__dirname, '..'), file)}`)
      count++
    }
  }
  return count
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function uploadAndUpdate(file, url, mode, sku) {
  const tmpDir = path.join(__dirname, 'tmp-images')
  const tmpPath = path.join(tmpDir, file)

  // 1. Download
  await downloadImage(url, tmpPath)
  console.log('  ✓ Downloaded')

  // 2. Upload
  const fileBuffer = fs.readFileSync(tmpPath)
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(file, fileBuffer, { contentType: contentType(file), upsert: true })

  if (uploadError) { console.log('  ✗ Upload error:', uploadError.message); fs.unlinkSync(tmpPath); return }
  console.log('  ✓ Uploaded to Supabase Storage')

  // 3. Public URL
  const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(file)
  const publicUrl = urlData.publicUrl
  console.log('  ✓ URL:', publicUrl)

  // 4a. DB update (product images)
  if (mode === 'db') {
    const { error } = await supabase.from('products').update({ image_main_url: publicUrl }).eq('sku', sku)
    if (error) console.log('  ✗ DB error:', error.message)
    else console.log('  ✓ Database updated!')
  }

  // 4b. Source-code replacement (hero images)
  if (mode === 'src') {
    const count = replaceInSrc(url, publicUrl)
    if (count === 0) console.log('  ⚠ URL not found in any src/ file — may already be replaced')
    else console.log(`  ✓ Replaced in ${count} file(s)`)
  }

  fs.unlinkSync(tmpPath)
}

async function run() {
  const tmpDir = path.join(__dirname, 'tmp-images')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)

  console.log('═══════════════════════════════════════')
  console.log('  PRODUCT IMAGES  (database update)')
  console.log('═══════════════════════════════════════')
  for (const img of PRODUCT_IMAGES) {
    console.log(`\nProcessing: ${img.sku} — ${img.file}`)
    try { await uploadAndUpdate(img.file, img.url, 'db', img.sku) }
    catch(e) { console.log('  ✗', e.message) }
  }

  console.log('\n═══════════════════════════════════════')
  console.log('  HERO / BANNER IMAGES  (src replace)')
  console.log('═══════════════════════════════════════')
  for (const img of HERO_IMAGES) {
    console.log(`\nProcessing: ${img.file}`)
    try { await uploadAndUpdate(img.file, img.url, 'src') }
    catch(e) { console.log('  ✗', e.message) }
  }

  try { fs.rmdirSync(tmpDir) } catch(e) {}
  console.log('\n✅ All done! Every image now served from Supabase Storage.')
}

run()
