import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../context/LangContext'
import { useCart } from '../context/CartContext'
import { SITE } from '../config/site'
import { categories } from '../data/products'
import { searchProducts } from '../utils/search'
import { Icon, Yarn } from './ui'

export function Socials({ className = '', size = 'h-5 w-5' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {['tiktok', 'instagram', 'pinterest', 'youtube'].map((n) => {
        const url = SITE.socials[n]
        return url
          ? <a key={n} href={url} target="_blank" rel="noopener noreferrer" aria-label={n} className="transition hover:opacity-70"><Icon name={n} className={size} /></a>
          : <span key={n} aria-hidden="true"><Icon name={n} className={size} /></span>
      })}
    </div>
  )
}

function TopBar() {
  const { t } = useI18n()
  return (
    <div className="bg-blush/80 text-xs text-wine sm:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-8">
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="flex items-center gap-1.5"><Icon name="heart" className="h-4 w-4" />{t('topbar.love')}</span>
          <span className="hidden items-center gap-1.5 sm:flex"><Icon name="sparkle" className="h-4 w-4" />{t('topbar.creations')}</span>
          <span className="flex items-center gap-1.5"><Icon name="truck" className="h-4 w-4" />{t('topbar.delivery')}</span>
        </div>
        <Socials className="text-wine" size="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
    </div>
  )
}

function SearchBox({ className = '' }) {
  const { t, lang, money } = useI18n()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const results = useMemo(() => (q.trim() ? searchProducts(q) : []), [q])

  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    setOpen(false)
    nav(`/shop?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={submit} role="search" className="flex items-center gap-2 rounded-full bg-blush px-4 py-2.5 ring-1 ring-rose/60 focus-within:ring-2 focus-within:ring-mauve">
        <button type="submit" aria-label={t('search.placeholder')} className="text-wine"><Icon name="search" /></button>
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)}
          placeholder={t('search.placeholder')} className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/50" />
      </form>
      {open && q.trim() && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-lift ring-1 ring-rose/50">
          {results.length === 0 && <p className="px-3 py-3 text-sm text-ink/70">{t('search.none')}</p>}
          {results.slice(0, 5).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} onClick={() => { setOpen(false); setQ('') }}
              className="flex items-center gap-3 rounded-xl p-2 hover:bg-blush">
              <img src={p.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-wine">{p.name[lang]}</span>
                <span className="text-xs text-ink/70">{money(p.price)}</span></span>
            </Link>
          ))}
          {results.length > 5 && (
            <button onClick={submit} className="mt-1 w-full rounded-xl px-3 py-2 text-sm font-medium text-mauve hover:bg-blush">{t('search.all')}</button>
          )}
        </div>
      )}
    </div>
  )
}

export function Logo({ className = '' }) {
  const { t } = useI18n()
  return (
    <Link to="/" aria-label="b Nossa" className={`flex flex-col items-center leading-none text-wine ${className}`}>
      <span className="flex items-center gap-2">
        <span className="font-brand text-5xl sm:text-6xl" dir="ltr">b Nossa</span>
        <Yarn tail className="hidden h-11 w-auto sm:block" />
        <Yarn className="h-9 w-auto sm:hidden" />
      </span>
      <span className="mt-1 flex items-center gap-1 text-xs sm:text-sm">{t('tagline')} <Icon name="heart" className="h-3.5 w-3.5" /></span>
    </Link>
  )
}

export default function Header() {
  const { t, toggle, lang } = useI18n()
  const { count, setOpen } = useCart()
  const { pathname } = useLocation()
  const [menu, setMenu] = useState(false)
  useEffect(() => setMenu(false), [pathname])

  const pill = (active) =>
    `rounded-full px-5 py-2 text-sm transition ${active ? 'bg-mauve text-white shadow-soft' : 'text-wine hover:bg-blush'}`

  const links = (
    <>
      <NavLink to="/" end className={({ isActive }) => pill(isActive)}>{t('nav.home')}</NavLink>
      <div className="group relative">
        <NavLink to="/shop" className={({ isActive }) => `${pill(isActive)} inline-flex items-center gap-1`}>
          {t('nav.shop')}<Icon name="chevron" className="h-4 w-4" />
        </NavLink>
        <div className="invisible absolute start-0 top-full z-40 min-w-48 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 max-md:static max-md:visible max-md:pt-1 max-md:opacity-100">
          <div className="rounded-2xl bg-white p-2 shadow-lift ring-1 ring-rose/50 max-md:shadow-none max-md:ring-0">
            <Link to="/shop" className="block rounded-xl px-3 py-2 text-sm text-wine hover:bg-blush">{t('nav.all')}</Link>
            {categories.map((c) => (
              <Link key={c.id} to={`/shop?cat=${c.id}`} className="block rounded-xl px-3 py-2 text-sm text-wine hover:bg-blush">{c.name[lang]}</Link>
            ))}
          </div>
        </div>
      </div>
      <Link to="/#about" className={pill(false)}>{t('nav.about')}</Link>
      <Link to="/#how" className={pill(false)}>{t('nav.how')}</Link>
      <Link to="/#contact" className={pill(false)}>{t('nav.contact')}</Link>
    </>
  )

  return (
    <header className="relative z-40">
      <TopBar />
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 pb-2 pt-4 sm:px-8">
        <div className="flex items-center">
          <SearchBox className="hidden w-full max-w-64 md:block" />
          <button className="rounded-full p-2 text-wine md:hidden" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label={t('nav.menu')}>
            <Icon name={menu ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
        <Logo />
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button onClick={toggle} className="flex items-center gap-1.5 rounded-full bg-blush px-3 py-2 text-sm text-wine ring-1 ring-rose/60 transition hover:bg-rose" lang={lang === 'ar' ? 'fr' : 'ar'}>
            <Icon name="globe" className="h-4 w-4" />{t('langName')}
          </button>
          <button onClick={() => setOpen(true)} className="relative rounded-full p-2 text-wine" aria-label={t('cart.open')}>
            <Icon name="bag" className="h-7 w-7" />
            <span className="absolute -end-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-wine px-1 text-[11px] font-medium text-white">{count}</span>
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden"><SearchBox /></div>
      <nav className="mx-auto hidden max-w-7xl items-center justify-center gap-1 px-8 pb-4 md:flex">{links}</nav>
      {menu && <nav className="mx-4 mb-3 flex flex-col items-start gap-1 rounded-3xl bg-white/80 p-3 shadow-soft md:hidden">{links}</nav>}
    </header>
  )
}
