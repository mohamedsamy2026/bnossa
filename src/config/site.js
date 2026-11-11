// ===== إعدادات الموقع: غيّري الأرقام والروابط من هنا فقط =====
export const SITE = {
  brand: 'b Nossa',
  // رقم الواتساب (الطلبات). الرقم المحلي + كود الدولة (مصر = 20)
  whatsapp: { countryCode: '212', number: '' },
  // رقم التليفون (للاتصال) منفصل عن الواتساب — غيّريه لو اختلف
  phone: { countryCode: '212', number: '' },
  currency: { ar: 'د.م.', fr: 'MAD' },
  // سيبيها فاضية لحد ما تحطي الروابط
  socials: { youtube: '', tiktok: 'https://vm.tiktok.com/ZS9f2dqd4gSkX-Hiodd/', instagram: '' },
}

export const applySettings = (s) => { if(!s)return; SITE.whatsapp={countryCode:s.whatsapp_cc,number:s.whatsapp_number}; SITE.phone={countryCode:s.phone_cc,number:s.phone_number} }
export const toIntl = (cc, n) => cc + String(n).replace(/\D/g, '').replace(/^0+/, '')
export const waLink = (text) =>
  `https://wa.me/${toIntl(SITE.whatsapp.countryCode, SITE.whatsapp.number)}?text=${encodeURIComponent(text)}`
export const telLink = () => `tel:+${toIntl(SITE.phone.countryCode, SITE.phone.number)}`
