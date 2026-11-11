import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useI18n } from '../context/LangContext'
import { useStore } from '../context/StoreContext'
import { searchProducts } from '../utils/search'
import ProductCard from '../components/ProductCard'
import { SectionTitle } from '../components/ui'

export default function Shop() {
  const { t, lang } = useI18n()
  const {categories,products}=useStore()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || 'all'

  const list = useMemo(() => searchProducts(q,products,categories).filter((p) => cat === 'all' || p.cat === cat), [q, cat, products, categories])
  const pick = (id) => {
    const next = new URLSearchParams(params)
    id === 'all' ? next.delete('cat') : next.set('cat', id)
    setParams(next)
  }
  const chip = (on) => `rounded-full px-5 py-2 text-sm transition ${on ? 'bg-mauve text-white shadow-soft' : 'bg-blush text-wine hover:bg-rose'}`

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <SectionTitle>{t('shop.title')}</SectionTitle>
      {q && <p className="mb-4 text-center text-wine">{t('shop.searchFor')} «{q}»</p>}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button className={chip(cat === 'all')} onClick={() => pick('all')}>{t('products.all')}</button>
        {categories.map((c) => <button key={c.id} className={chip(cat === c.id)} onClick={() => pick(c.id)}>{c.name[lang]}</button>)}
      </div>
      <p className="mb-4 text-sm text-ink/70">{list.length} {t('shop.results')}</p>
      {list.length === 0 ? (
        <div className="rounded-3xl bg-blush/60 p-10 text-center text-wine">
          <p>{t('shop.empty')}</p>
          <Link to="/shop" className="mt-4 inline-block rounded-full bg-mauve px-6 py-2.5 text-sm text-white hover:bg-wine">{t('shop.reset')}</Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </section>
  )
}
