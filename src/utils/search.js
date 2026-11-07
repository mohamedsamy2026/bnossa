import { products, categories } from '../data/products'

const DIAC = /[\u064B-\u065F\u0670\u0640]/g
export const norm = (s = '') =>
  String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(DIAC, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim()

const stem = (w) => {
  if (/^[\u0600-\u06FF]+$/.test(w)) return w.length > 4 ? w.replace(/^ال/, '') : w
  return w.length > 3 ? w.replace(/s$/, '') : w
}
const words = (s) => norm(s).split(' ').filter(Boolean).map(stem)

function lev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    prev = cur
  }
  return prev[b.length]
}

function tokenScore(tok, ws) {
  let best = 0
  const maxD = tok.length >= 7 ? 2 : tok.length >= 4 ? 1 : 0
  for (const w of ws) {
    if (w === tok) return 1
    if (w.startsWith(tok)) best = Math.max(best, 0.8)
    else if (tok.length >= 3 && w.includes(tok)) best = Math.max(best, 0.6)
    else if (maxD && lev(tok, w, maxD) <= maxD) best = Math.max(best, 0.4)
  }
  return best
}

const index = products.map((p) => {
  const cat = categories.find((c) => c.id === p.cat)
  return {
    p,
    name: words(`${p.name.ar} ${p.name.fr}`),
    tags: words(p.tags.join(' ')),
    cat: words(`${cat?.name.ar} ${cat?.name.fr}`),
    desc: words(`${p.desc.ar} ${p.desc.fr}`),
  }
})

// بحث ذكي: عربي/فرنساوي، بيتجاهل التشكيل والهمزات، ويتحمل أخطاء الكتابة
export function searchProducts(query) {
  const toks = words(query)
  if (!toks.length) return products
  return index
    .map((e) => {
      let total = 0
      for (const t of toks) {
        const s = Math.max(
          tokenScore(t, e.name) * 5, tokenScore(t, e.tags) * 3,
          tokenScore(t, e.cat) * 2, tokenScore(t, e.desc),
        )
        if (!s) return { p: e.p, score: 0 }
        total += s
      }
      return { p: e.p, score: total }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p)
}
