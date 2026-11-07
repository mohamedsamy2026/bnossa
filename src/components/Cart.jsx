import { useEffect } from 'react'
import { useI18n } from '../context/LangContext'
import { useCart } from '../context/CartContext'
import { cartOrderLink } from '../utils/whatsapp'
import { Icon, Qty } from './ui'

export default function Cart() {
  const { t, lang, money } = useI18n()
  const { lines, open, setOpen, count, total, setQty, remove, clear } = useCart()

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [setOpen])

  const orderAll = () => window.open(cartOrderLink(lang, lines), '_blank', 'noopener')

  return (
    <>
      {count > 0 && !open && (
        <button onClick={() => setOpen(true)} aria-label={t('cart.open')}
          className="fixed bottom-5 end-5 z-30 flex items-center gap-2 rounded-full bg-wine px-4 py-3 text-white shadow-lift md:hidden">
          <Icon name="bag" className="h-5 w-5" /><span className="text-sm font-medium">{count}</span>
        </button>
      )}
      <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-wine/40 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside role="dialog" aria-label={t('cart.title')}
          className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-rose/60 px-5 py-4">
            <h2 className="font-display text-3xl text-wine">{t('cart.title')}</h2>
            <button onClick={() => setOpen(false)} aria-label={t('cart.close')} className="rounded-full p-2 text-wine hover:bg-blush"><Icon name="close" /></button>
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center text-wine">
              <Icon name="bag" className="h-12 w-12 opacity-60" />
              <p className="text-lg font-medium">{t('cart.empty')}</p>
              <p className="text-sm text-ink/70">{t('cart.emptyHint')}</p>
            </div>
          ) : (
            <>
              <ul className="flex-1 space-y-3 overflow-y-auto p-4">
                {lines.map(({ p, qty }) => (
                  <li key={p.id} className="flex gap-3 rounded-2xl bg-white/80 p-3 shadow-soft">
                    <img src={p.images[0]} alt="" className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-wine">{p.name[lang]}</p>
                        <button onClick={() => remove(p.id)} aria-label={t('cart.remove')} className="text-ink/50 hover:text-wine"><Icon name="trash" className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <Qty value={qty} onChange={(n) => setQty(p.id, n)} small />
                        <span className="text-sm font-semibold text-wine">{money(p.price * qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-rose/60 p-4">
                <div className="flex items-center justify-between text-wine">
                  <span>{t('cart.total')}</span><span className="text-xl font-semibold">{money(total)}</span>
                </div>
                <button onClick={orderAll} className="flex w-full items-center justify-center gap-2 rounded-full bg-mauve px-5 py-3 font-medium text-white shadow-soft transition hover:bg-wine">
                  <Icon name="whatsapp" className="h-5 w-5" />{t('cart.orderAll')}
                </button>
                <button onClick={clear} className="w-full text-sm text-ink/60 hover:text-wine">{t('cart.clear')}</button>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  )
}
