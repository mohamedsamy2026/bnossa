import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { categories as initialCategories, products as initialProducts } from '../data/products'
import { applySettings, SITE } from '../config/site'
import { useI18n } from './LangContext'
import { configured, supabase, check } from '../lib/supabase'
const Context = createContext(null)
const defaults = { whatsapp_cc:SITE.whatsapp.countryCode,whatsapp_number:SITE.whatsapp.number,phone_cc:SITE.phone.countryCode,phone_number:SITE.phone.number,logo_url:'',hero_url:'',imported:false }
export function StoreProvider({children}) {
  const [categories,setCategories]=useState(configured?[]:initialCategories)
  const [products,setProducts]=useState(configured?[]:initialProducts)
  const [faqs,setFaqs]=useState([])
  const [socials,setSocials]=useState([])
  const [settings,setSettings]=useState(defaults)
  const [loading,setLoading]=useState(configured)
  const [error,setError]=useState('')
  const refresh=useCallback(async()=>{
    if(!configured)return
    try {
      const [c,p,f,s,opts] = await Promise.all([
        supabase.from('store_categories').select('*').order('sort_order'),
        supabase.from('store_products').select('*').order('sort_order'),
        supabase.from('store_faqs').select('*').order('sort_order'),
        supabase.from('store_socials').select('*').order('sort_order'),
        supabase.from('store_settings').select('*').eq('id',1).single(),
      ])
      const cat=check(c),prod=check(p)
      setCategories(cat.map(x=>({id:x.id,img:x.image_url,name:{ar:x.name_ar,fr:x.name_fr||x.name_ar},image_path:x.image_path})))
      setProducts(prod.map(x=>({id:x.id,cat:x.category_id,price:Number(x.price),images:[x.image_url].filter(Boolean),name:{ar:x.name_ar,fr:x.name_fr||x.name_ar},desc:{ar:x.desc_ar,fr:x.desc_fr||x.desc_ar},tags:x.tags||[],image_path:x.image_path})))
      setFaqs(check(f));setSocials(check(s));setSettings(check(opts));applySettings(check(opts));setError('')
    } catch(e){setError(e.message||'Database unavailable')}finally{setLoading(false)}
  },[])
  useEffect(()=>{refresh()},[refresh])
  const value={categories,products,faqs,socials,settings,refresh,loading,error,configured,getProduct:id=>products.find(x=>x.id===id),getCategory:id=>categories.find(x=>x.id===id)}
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export const useStore=()=>useContext(Context)
