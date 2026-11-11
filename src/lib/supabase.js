import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
export const configured = Boolean(url && key)
export const supabase = configured ? createClient(url,key, { auth: { persistSession: true, autoRefreshToken: true } }) : null
export const check = (result) => { if (result.error) throw result.error; return result.data }
export async function uploadImage(file, group='products', fixedPath=null) {
  if (!supabase) throw new Error('Supabase not configured')
  // Invisible on-device compression, preserving alpha where needed.
  const { default: compress } = await import('browser-image-compression')
  const logo = group === 'logos'
  const blob = await compress(file, { maxSizeMB: logo ? 0.35 : 0.45, maxWidthOrHeight: group==='hero' ? 1800 : group==='products' ? 1600 : 1200, useWebWorker: true, fileType: 'image/webp', initialQuality: 0.82 })
  const path = fixedPath || `${group}/${crypto.randomUUID()}.webp`
  check(await supabase.storage.from('store-images').upload(path, blob, {contentType:'image/webp',upsert:Boolean(fixedPath)}))
  return { url: supabase.storage.from('store-images').getPublicUrl(path).data.publicUrl, path }
}
export async function removeImage(path) { if(path) check(await supabase.storage.from('store-images').remove([path])) }
export async function logOrder(mode, lines) {
  if(!supabase || !lines.length) return
  const id = crypto.randomUUID()
  // Best effort: don't block WhatsApp navigation on analytics failure.
  try { check(await supabase.rpc('record_order_attempt', {p_id:id,p_mode:mode,p_items:lines.map(({p,qty})=>({id:p.id,qty}))})) } catch(e) { console.warn('Order analytics unavailable',e) }
}
