import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useI18n } from '../context/LangContext'
import { useCart } from '../context/CartContext'
import { getCategory, getProduct, products } from '../data/products'
import { productOrderLink } from '../utils/whatsapp'
import ProductCard from '../components/ProductCard'
import { Icon, Qty, SectionTitle } from '../components/ui'

export default function Product() {
  const { id } = useParams()
  const { t, lang, money } = useI18n()
  const { add, setOpen } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const p = getProduct(id)

  if (!p) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-wine">
        <p className="mb-4 text-xl">{t('product.notFound')}</p>
        <Link to="/shop" className="rounded-full bg-mauve px-6 py-2.5 text-white hover:bg-wine">{t('product.back')}</Link>
      </div>
    )
  }

  const related = [...products.filter((x) => x.id !== p.id && x.cat === p.cat), ...products.filter((x) => x.id !== p.id && x.cat !== p.cat)].slice(0, 3)
  const multi = p.images.length > 1

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-mauve hover:text-wine">
        <Icon name="arrow" className="h-4 w-4 rotate-180" />{t('product.back')}
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] bg-blush shadow-soft">
          {multi ? (
            <Swiper modules={[Navigation, Pagination]} loop navigation pagination={{ clickable: true }}>
              {p.images.map((src, i) => <SwiperSlide key={i}><img src={src} alt={p.name[lang]} className="aspect-[4/5] w-full object-cover" /></SwiperSlide>)}
            </Swiper>
          ) : (
            <img src={p.images[0]} alt={p.name[lang]} className="aspect-[4/5] w-full object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-5 text-wine">
          <span className="w-fit rounded-full bg-blush px-4 py-1 text-sm">{getCategory(p.cat)?.name[lang]}</span>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">{p.name[lang]}</h1>
          <p className="text-2xl font-semibold">{money(p.price)}</p>
          <p className="max-w-xl leading-loose text-ink/90">{p.desc[lang]}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm">{t('product.qty')}</span><Qty value={qty} onChange={setQty} />
            <span className="ms-auto text-sm">{t('product.total')}: <b className="text-lg">{money(p.price * qty)}</b></span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => window.open(productOrderLink(lang, p, qty), '_blank', 'noopener')}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-mauve px-6 py-3.5 font-medium text-white shadow-soft transition hover:bg-wine">
              <Icon name="whatsapp" className="h-5 w-5" />{t('product.order')}
            </button>
            <button onClick={() => { add(p.id, qty); setAdded(true); setTimeout(() => setAdded(false), 1400); setOpen(true) }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blush px-6 py-3.5 font-medium text-wine transition hover:bg-rose">
              <Icon name={added ? 'check' : 'bag'} className="h-5 w-5" />{added ? t('product.added') : t('product.add')}
            </button>
          </div>
          <p className="text-sm text-ink/70">{t('product.orderNote')}</p>
        </div>
      </div>
      <div className="pt-16">
        <SectionTitle>{t('product.related')}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
      </div>
    </div>
  )
}
