import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'

const Ctx = createContext(null)
const KEY = 'bnossa-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const api = useMemo(() => {
    const lines = items.map((i) => ({ p: getProduct(i.id), qty: i.qty })).filter((l) => l.p)
    return {
      lines, open, setOpen,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.p.price * l.qty, 0),
      add: (id, qty = 1) => setItems((cur) => cur.some((i) => i.id === id)
        ? cur.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...cur, { id, qty }]),
      setQty: (id, qty) => setItems((cur) => cur.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))),
      remove: (id) => setItems((cur) => cur.filter((i) => i.id !== id)),
      clear: () => setItems([]),
    }
  }, [items, open])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
export const useCart = () => useContext(Ctx)
