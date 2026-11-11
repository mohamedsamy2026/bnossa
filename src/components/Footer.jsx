import { useState } from 'react'
import { useI18n } from '../context/LangContext'
import { subscribeLink } from '../utils/whatsapp'
import plate from '../assets/logo-plate.webp'
import { useStore } from '../context/StoreContext'
import { Branch, Icon } from './ui'
import { Socials } from './Header'

export default function Footer() {
  const { t, lang } = useI18n()
  const {settings}=useStore()
  const [phone, setPhone] = useState('')
  const submit = (e) => {
    e.preventDefault()
    window.open(subscribeLink(lang, phone.trim()), '_blank', 'noopener')
    setPhone('')
  }
  return (
    <footer className="relative mt-16">
      <div className="relative overflow-hidden bg-[#B9858D] text-white">
        <Branch className="absolute -start-4 bottom-0 hidden h-40 opacity-70 sm:block" />
        <Branch flip className="absolute -end-4 bottom-0 hidden h-40 opacity-70 sm:block" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-4">
            <Icon name="mail" className="hidden h-14 w-14 sm:block" />
            <div>
              <p className="font-display text-3xl mb-2">{t('subscribe.title')}</p>
              <p className="max-w-xs text-sm text-white/90">{t('subscribe.text')}</p>
            </div>
          </div>
          <form onSubmit={submit} className="flex w-full min-w-0 max-w-xl items-center gap-1.5 justify-self-center rounded-full bg-cream p-1.5 lg:max-w-lg">
            <input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('subscribe.placeholder')} dir="ltr"
              className="w-0 min-w-0 flex-1 bg-transparent px-2 text-xs text-ink outline-none sm:px-4 sm:text-sm placeholder:text-ink/50" aria-label={t('subscribe.placeholder')} />
            <button className="flex shrink-0 items-center gap-1 rounded-full bg-blush px-3 py-2.5 text-xs font-medium text-wine transition hover:bg-rose sm:gap-2 sm:px-5 sm:text-sm">
              {t('subscribe.button')}<Icon name="whatsapp" className="h-4 w-4" />
            </button>
          </form>
          <Socials className="justify-self-center lg:justify-self-end" size="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 bg-cream px-6 py-4 text-sm text-wine sm:flex-row sm:px-10">
        <img src={settings.logo_url || plate} alt="Nossa" className="h-10 w-auto" />
        <p className="text-center font-bold">© {new Date().getFullYear()} b Nossa — {t('footer.rights')}</p>
      </div>
    </footer>
  )
}
