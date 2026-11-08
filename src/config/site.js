// ===== إعدادات الموقع: غيّري الأرقام والروابط من هنا فقط =====
export const SITE = {
  brand: 'b Nossa',
  // رقم الواتساب (الطلبات). الرقم المحلي + كود الدولة (مصر = 20)
  whatsapp: { countryCode: '20', number: '01115083459' },
  // رقم التليفون (للاتصال) منفصل عن الواتساب — غيّريه لو اختلف
  phone: { countryCode: '20', number: '01115083459' },
  currency: { ar: 'ج.م', fr: 'EGP' },
  // سيبيها فاضية لحد ما تحطي الروابط
  socials: { youtube: '', tiktok: 'https://vm.tiktok.com/ZS9f2dqd4gSkX-Hiodd/', instagram: '' },
}

export const toIntl = (cc, n) => cc + String(n).replace(/\D/g, '').replace(/^0+/, '')
export const waLink = (text) =>
  `https://wa.me/${toIntl(SITE.whatsapp.countryCode, SITE.whatsapp.number)}?text=${encodeURIComponent(text)}`
export const telLink = () => `tel:+${toIntl(SITE.phone.countryCode, SITE.phone.number)}`
