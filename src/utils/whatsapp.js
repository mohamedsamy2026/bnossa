import { SITE, waLink } from '../config/site'

const L = {
  ar: { hi: 'مرحبًا b Nossa 👋', one: 'عايز أطلب المنتج ده:', many: 'عايز أطلب المنتجات دي:', qty: 'الكمية', price: 'السعر', total: 'الإجمالي', thanks: 'برجاء تأكيد الطلب وتفاصيل التوصيل 🌸' },
  fr: { hi: 'Bonjour b Nossa 👋', one: 'Je souhaite commander ce produit :', many: 'Je souhaite commander ces produits :', qty: 'Quantité', price: 'Prix', total: 'Total', thanks: 'Merci de confirmer ma commande et la livraison 🌸' },
}
const cur = (lang) => SITE.currency[lang]

export function productOrderLink(lang, p, qty) {
  const l = L[lang]
  const text = [l.hi, '', l.one, `• ${p.name[lang]}`, `${l.qty}: ${qty}`, `${l.price}: ${p.price} ${cur(lang)}`,
    `${l.total}: ${p.price * qty} ${cur(lang)}`, '', l.thanks].join('\n')
  return waLink(text)
}

export function cartOrderLink(lang, lines) {
  const l = L[lang]
  const total = lines.reduce((s, { p, qty }) => s + p.price * qty, 0)
  const body = lines.map(({ p, qty }, i) => `${i + 1}) ${p.name[lang]} × ${qty} = ${p.price * qty} ${cur(lang)}`)
  return waLink([l.hi, '', l.many, ...body, '', `${l.total}: ${total} ${cur(lang)}`, '', l.thanks].join('\n'))
}

export function subscribeLink(lang, phone) {
  const t = lang === 'ar'
    ? `مرحبًا b Nossa 👋\nعايزة أستلم العروض والجديد على واتساب.${phone ? `\nرقمي: ${phone}` : ''}`
    : `Bonjour b Nossa 👋\nJe souhaite recevoir vos offres et nouveautés sur WhatsApp.${phone ? `\nMon numéro : ${phone}` : ''}`
  return waLink(t)
}
