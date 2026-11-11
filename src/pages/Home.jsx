import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useI18n } from "../context/LangContext";
import { SITE, waLink, telLink } from "../config/site";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import {
  Branch,
  Flowers,
  Heart,
  Icon,
  SectionTitle,
  Yarn,
} from "../components/ui";
import heroImg from "../assets/p4.jpg";
import aboutImg from "../assets/p3.jpg";

function Hero() {
  const { t } = useI18n();
  const {settings}=useStore();
  return (
    <section className="relative overflow-hidden">
      <Branch className="absolute -start-6 top-10 hidden h-64 opacity-80 lg:block" />
      <div className="mx-auto grid max-w-7xl items-stretch md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-10 text-center text-wine md:px-10 md:py-14">
          <p className="font-display text-3xl sm:text-4xl">
            {t("hero.kicker")}
          </p>
          <h1 className="my-2 flex items-center gap-2" aria-label="b Nossa">
            <span
              className="font-brand text-7xl leading-none sm:text-8xl"
              dir="ltr"
            >
              b Nossa
            </span>
            <Heart className="h-8 w-8" />
          </h1>
          <p className="text-xl font-medium sm:text-2xl">{t("hero.sub")}</p>
          <p className="mt-4 max-w-sm leading-relaxed text-ink/90">
            {t("hero.text")}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {/* زر التسوق */}
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mauve px-8 py-3 font-medium text-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-wine"
            >
              {t("hero.cta")}
              <Icon name="arrow" className="h-5 w-5" />
            </Link>

            {/* زر الطلب حسب الرغبة */}
            <a
              href={waLink("مرحباً، أريد طلب منتج كروشيه بتصميم خاص حسب رغبتي 🌸")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-mauve bg-transparent px-7 py-3 font-medium text-wine transition-all duration-300 hover:-translate-y-1 hover:bg-mauve hover:text-white"
            >
              <Heart className="h-5 w-5" />
              {t("hero.customOrder")}
            </a>
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden md:min-h-[460px] md:rounded-ss-[55%_70%] md:rounded-es-[38%_30%]">
          <img
            src={settings.hero_url || heroImg}
            alt="b Nossa"
            className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose/20 to-transparent" />
          <Flowers className="absolute -end-2 top-0 h-48 w-40 sm:h-64 sm:w-52" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { t } = useI18n();
  const items = [
    ["diamond", "quality"],
    ["heart", "love"],
    ["gift", "gift"],
    ["truck", "delivery"],
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8 mt-2">
      <ul className="grid grid-cols-2 gap-y-4 rounded-[2rem] bg-blush/70 px-4 py-4 text-wine md:grid-cols-4 md:rounded-full">
        {items.map(([icon, k], i) => (
          <li
            key={k}
            className={`flex items-center justify-center gap-3 text-sm font-bold ${i > 0 ? "md:border-s md:border-wine/30" : ""}`}
          >
            <Icon name={icon} className="h-7 w-7" />
            {t(`features.${k}`)}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Collection() {
  const { t, lang } = useI18n();
  const {categories}=useStore();

  const whatsappMessage =
    "مرحباً، أريد طلب منتج كروشيه بتصميم خاص حسب رغبتي 🌸";

  const whatsappLink = waLink(whatsappMessage);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-8">
      <SectionTitle>{t("collection.title")}</SectionTitle>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/shop?cat=${c.id}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-blush shadow-soft"
          >
            <img
              src={c.img}
              alt={c.name[lang]}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 [@media(hover:hover)]:group-hover:scale-105"
            />

            <span className="absolute bottom-3 start-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-cream/95 px-5 py-2 text-sm text-wine rtl:translate-x-1/2">
              {c.name[lang]}
              <Icon name="arrow" className="h-4 w-4" />
            </span>
          </Link>
        ))}

        {/* Custom Order Card */}
        <div className="relative flex aspect-[4/3] min-w-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl bg-rose/60 p-2 text-center text-wine shadow-soft sm:gap-4 sm:p-4">
          <p className="font-display text-xl font-bold leading-tight min-[400px]:text-2xl sm:text-3xl sm:leading-snug lg:text-4xl">
            {t("collection.ctaText")}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center justify-center rounded-full bg-wine px-3 py-1.5 text-center text-[10px] font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-mauve hover:shadow-lg min-[400px]:text-xs sm:mt-3 sm:px-8 sm:py-3 sm:text-base"
          >
            {t("collection.cta")}
          </a>

          <Yarn
            tail
            className="absolute bottom-2 end-3 hidden h-10 w-auto opacity-70 sm:block"
          />
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { t, lang, dir } = useI18n();
  const {categories,products}=useStore();
  const [cat, setCat] = useState("all");
  const list = useMemo(
    () => (cat === "all" ? products : products.filter((p) => p.cat === cat)),
    [cat],
  );
  const loop = list.length > 4;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ===== التحكم في وقف/تشغيل الحركة التلقائية =====
  const swiperRef = useRef(null);
  const wrapRef = useRef(null);
  const state = useRef({ hover: false, lock: false });

  const sync = () => {
    const a = swiperRef.current?.autoplay;
    if (!a) return;
    state.current.hover || state.current.lock ? a.stop() : a.start();
  };

  // الضغط في أي مكان برا السلايدر يكمّل الحركة (مهم للموبايل)
  useEffect(() => {
    const outside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        state.current.lock = false;
        sync();
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);

  const chip = (on) =>
    `rounded-full px-5 py-2 text-sm transition ${on ? "bg-mauve text-white shadow-soft" : "bg-blush text-wine hover:bg-rose"}`;

  return (
    <section
      id="products"
      className="mx-auto max-w-7xl scroll-mt-4 px-4 pt-16 sm:px-8"
    >
      <SectionTitle>{t("products.title")}</SectionTitle>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button className={chip(cat === "all")} onClick={() => setCat("all")}>
          {t("products.all")}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={chip(cat === c.id)}
            onClick={() => setCat(c.id)}
          >
            {c.name[lang]}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="rounded-3xl bg-blush/60 p-10 text-center text-wine">
          {t("products.empty")}
        </p>
      ) : (
        <div
          ref={wrapRef}
          onPointerOver={(e) => {
            // الـ hover يوقف الحركة بس لما الماوس على كارت منتج (مش على الأسهم)
            if (e.pointerType === "mouse" && e.target.closest("article")) {
              state.current.hover = true;
              sync();
            }
          }}
          onPointerOut={(e) => {
            if (
              e.pointerType === "mouse" &&
              !e.relatedTarget?.closest?.("article")
            ) {
              state.current.hover = false;
              state.current.lock = false;
              sync();
            }
          }}
          onPointerDownCapture={(e) => {
            if (e.target.closest("article")) {
              // ضغط جوه المنتج (+ / − / أي زر) → وقف
              state.current.lock = true;
            } else if (
              e.target.closest(
                ".swiper-button-prev, .swiper-button-next, .swiper-pagination",
              )
            ) {
              // ضغط على السهمين أو النقط → كمّل الحركة
              state.current.lock = false;
              state.current.hover = false;
            }
            sync();
          }}
          onFocusCapture={(e) => {
            if (e.target.closest("article")) {
              state.current.lock = true;
              sync();
            }
          }}
          onBlurCapture={(e) => {
            if (!wrapRef.current?.contains(e.relatedTarget)) {
              state.current.lock = false;
              sync();
            }
          }}
        >
          <Swiper
            key={`${lang}-${cat}`}
            dir={dir}
            observer={true}
            observeParents={true}
            onSwiper={(s) => {
              swiperRef.current = s;
              state.current = { hover: false, lock: false };
            }}
            modules={[Navigation, Pagination, A11y, Autoplay]}
            loop={loop}
            navigation={loop}
            pagination={{ clickable: true }}
            autoplay={
              loop && !reduceMotion
                ? { delay: 3000, disableOnInteraction: false }
                : false
            }
            speed={400}
            spaceBetween={20}
            slidesPerView={1}
            className="!pb-12 !px-1"
            breakpoints={{
              430: { slidesPerView: 2 },
              750: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {list.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto !min-w-0 pb-2">
                <ProductCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}

function About() {
  const { t } = useI18n();
  const icons = ["leaf", "heart", "diamond"];
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl scroll-mt-4 px-4 pt-20 sm:px-8"
    >
      <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.3fr_0.7fr]">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full shadow-soft ring-8 ring-blush/70">
          <img
            src={aboutImg}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <Flowers className="absolute -start-2 top-0 h-32 w-28" />
        </div>
        <div className="text-wine">
          <h2 className="flex items-center gap-2 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("about.title")}
            <Heart className="h-4 w-4 shrink-0 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </h2>
          <p className="mt-4 max-w-md leading-loose text-ink/90">
            {t("about.text")}
          </p>
          <Link
            to="/#how"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-mauve px-6 py-2.5 text-sm text-white shadow-soft transition hover:bg-wine"
          >
            {t("about.more")}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="space-y-5 text-wine md:border-s md:border-wine/30 md:ps-8">
          {t("about.points").map((txt, i) => (
            <li key={txt} className="flex items-center gap-3">
              <Icon name={icons[i]} className="h-9 w-9 shrink-0" />
              {txt}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function How() {
  const { t } = useI18n();
  return (
    <section
      id="how"
      className="mx-auto max-w-7xl scroll-mt-4 px-4 pt-20 sm:px-8"
    >
      <SectionTitle>{t("how.title")}</SectionTitle>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t("how.steps").map((s, i) => (
          <li
            key={s.t}
            className="relative rounded-3xl bg-white/70 p-6 text-center shadow-soft ring-1 ring-rose/50"
          >
            <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-mauve font-medium text-white">
              {i + 1}
            </span>
            <h3 className="font-medium text-wine">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Why() {
  const { t } = useI18n();
  const icons = ["diamond", "sparkle", "gift", "whatsapp"];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-8">
      <SectionTitle>{t("why.title")}</SectionTitle>
      <div className="grid gap-4 rounded-[2rem] bg-rose/50 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {t("why.items").map((it, i) => (
          <div key={it.t} className="flex gap-3 text-wine">
            <Icon name={icons[i]} className="mt-1 h-8 w-8 shrink-0" />
            <div>
              <h3 className="font-medium">{it.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/80">{it.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const { t, lang } = useI18n();
  const {faqs,settings}=useStore();
  const items = settings.imported ? faqs.map(x=>({q:lang==='fr'?(x.question_fr||x.question_ar):x.question_ar,a:lang==='fr'?(x.answer_fr||x.answer_ar):x.answer_ar})) : t("faq.items");
  return (
    <section className="mx-auto max-w-3xl px-4 pt-20 sm:px-8">
      <SectionTitle>{t("faq.title")}</SectionTitle>
      <div className="space-y-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="group rounded-2xl bg-white/70 px-5 py-4 shadow-soft ring-1 ring-rose/50 open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-wine [&::-webkit-details-marker]:hidden">
              {it.q}
              <Icon
                name="chevron"
                className="h-5 w-5 shrink-0 transition group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 leading-relaxed text-ink/85">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useI18n();
  const { lang } = useI18n();
  const {settings}=useStore();
  const hello = waLink(
    lang === "fr" ? "Bonjour b Nossa 👋" : "مرحبًا b Nossa 👋",
  );
  return (
    <section
      id="contact"
      className="mx-auto max-w-4xl scroll-mt-4 px-4 pt-20 sm:px-8"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-blush/80 px-6 py-10 text-center text-wine shadow-soft">
        <Branch className="absolute -start-3 bottom-0 hidden h-44 opacity-70 sm:block" />
        <Branch
          flip
          className="absolute -end-3 bottom-0 hidden h-44 opacity-70 sm:block"
        />
        <h2 className="font-display text-4xl sm:text-5xl">
          {t("contact.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/85">{t("contact.text")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={hello}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-mauve px-6 py-3 font-medium text-white shadow-soft transition hover:bg-wine"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            {t("contact.whatsapp")}
          </a>
          <a
            href={telLink()}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-wine shadow-soft transition hover:bg-cream"
          >
            <Icon name="phone" className="h-5 w-5" />
            <span dir="ltr">{settings.phone_number}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Collection />
      <Products />
      <About />
      <How />
      <Why />
      <Faq />
      <Contact />
    </>
  );
}
