import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "../context/LangContext";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { logOrder } from "../lib/supabase";
import { productOrderLink } from "../utils/whatsapp";
import { Icon, Qty } from "./ui";

export default function ProductCard({ p }) {
  const { t, lang, money } = useI18n();
  const { add } = useCart();
  const {getCategory}=useStore();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const go = () => nav(`/product/${p.id}`);
  const hoverOnly = "[@media(hover:hover)]";

  const addToCart = (e) => {
    e.stopPropagation();
    add(p.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  const order = (e) => {
    e.stopPropagation();
    window.open(productOrderLink(lang, p, qty), "_blank", "noopener");
    logOrder("direct",[{p,qty}]);
  };

  return (
    <article
      onClick={go}
      className="group relative flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[28px] bg-white/75 shadow-soft ring-1 ring-rose/50 transition hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-blush">
        <img
          src={p.images[0]}
          alt={p.name[lang]}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-700 ${hoverOnly}:group-hover:scale-105`}
        />
        <span className="absolute start-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs text-wine">
          {getCategory(p.cat)?.name[lang]}
        </span>
        {/* تفاصيل كاملة عند الـ hover — على الكمبيوتر فقط */}
        <div
          className={`pointer-events-none absolute inset-0 hidden flex-col justify-end gap-2 bg-gradient-to-t from-wine/95 via-wine/70 to-transparent p-5 text-cream opacity-0 transition duration-300 ${hoverOnly}:flex ${hoverOnly}:group-hover:opacity-100`}
        >
          <h3 className="text-lg font-medium">{p.name[lang]}</h3>
          <p className="text-sm leading-relaxed text-cream/90">
            {p.desc[lang]}
          </p>
          <p className="font-medium">{money(p.price)}</p>
          <span className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4">
            {t("product.readMore")}
            <Icon name="arrow" className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="break-words font-medium text-wine">{p.name[lang]}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink/75">
            {p.desc[lang]}
          </p>
          <Link
            to={`/product/${p.id}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-1.5 inline-flex items-center gap-1 text-sm text-mauve hover:text-wine"
          >
            {t("product.readMore")}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <p className="text-lg font-semibold text-wine">{money(p.price)}</p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <Qty value={qty} onChange={setQty} small />
          <button
            onClick={addToCart}
            aria-label={t("product.add")}
            title={t("product.add")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-wine transition hover:bg-rose"
          >
            <Icon name={added ? "check" : "bag"} className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={order}
          className="flex items-center justify-center gap-2 rounded-full bg-mauve px-4 py-2.5 text-sm font-medium text-white shadow-soft transition hover:bg-wine"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          {t("product.order")}
        </button>
      </div>
    </article>
  );
}
