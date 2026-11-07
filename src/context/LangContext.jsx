import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations } from '../config/translations'
import { SITE } from '../config/site'

const Ctx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('bnossa-lang') || 'ar') // الافتراضي: عربي
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try { localStorage.setItem('bnossa-lang', lang) } catch { /* ignore */ }
  }, [lang, dir])

  const t = useCallback((key) => key.split('.').reduce((o, k) => (o ? o[k] : undefined), translations[lang]) ?? key, [lang])
  const money = useCallback((n) => `${n} ${SITE.currency[lang]}`, [lang])
  const toggle = () => setLang((l) => (l === 'ar' ? 'fr' : 'ar'))

  return <Ctx.Provider value={{ lang, dir, t, money, toggle }}>{children}</Ctx.Provider>
}
export const useI18n = () => useContext(Ctx)
