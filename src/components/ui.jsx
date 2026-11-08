import { useI18n } from '../context/LangContext'

const stroke = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 8V7a3 3 0 0 1 6 0v1" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  diamond: <><path d="M6 4h12l3 5-9 11L3 9l3-5Z" /><path d="M3 9h18M9 4 7 9l5 11 5-11-2-5" /></>,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12M12 8C10 8 8 7 8 5.500S9.500 3 12 8c2.500-5 4-3 4 -1.500S14 8 12 8Z" /></>,
  truck: <><path d="M2 6h11v10H2zM13 9h4l3 3v4h-7" /><circle cx="6" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /></>,
  leaf: <><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19 14 10" /></>,
  sparkle: <path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800L12 3Z" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 5 5 9-10" />,
  phone: <path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  whatsapp: <><path d="M4 20l1.200-4A8.500 8.500 0 1 1 8.200 18.800L4 20Z" /><path d="M9 8.500c0 3.500 3 6.500 6.500 6.500l1-1.500-2-1-1 .8a4.500 4.500 0 0 1-2-2l.8-1-1-2L9 8.500Z" /></>,
  instagram: <><rect x="3.500" y="3.500" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r=".6" /></>,
  youtube: <><rect x="2.500" y="5.500" width="19" height="13" rx="4" /><path d="m10 9.500 5 2.500-5 2.500v-5Z" /></>,
}
const TIKTOK = 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'

export function Icon({ name, className = 'h-5 w-5' }) {
  if (name === 'tiktok')
    return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d={TIKTOK} /></svg>
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      className={`${className} ${name === 'arrow' ? 'rtl:-scale-x-100' : ''}`} aria-hidden="true">
      {stroke[name]}
    </svg>
  )
}

export function Heart({ className = 'h-5 w-5' }) {
  return <Icon name="heart" className={className} />
}

export function Yarn({ className = 'h-10 w-auto', tail = false }) {
  return (
    <svg viewBox={tail ? '0 0 150 64' : '0 0 64 64'} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="27" />
      <path d="M8 38C22 20 44 20 57 36M7 28C22 11 46 13 58 27M12 50C27 32 45 34 54 48M22 7c-9 15-7 38 8 50M42 7c9 15 7 37-5 50" />
      {tail && <path d="M58 46c14 6 20-10 36-6s26 8 40-6" />}
    </svg>
  )
}

export function Branch({ className = '', flip = false }) {
  return (
    <svg viewBox="0 0 90 220" fill="none" stroke="#B98790" strokeWidth="1.4" strokeLinecap="round"
      className={`pointer-events-none ${className}`} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <path d="M40 215C38 150 44 80 56 8" />
      {[[40, 190, -1], [41, 150, 1], [43, 112, -1], [47, 76, 1], [51, 42, -1]].map(([x, y, s], i) => (
        <path key={i} fill="#EBC8C8" fillOpacity=".5"
          d={`M${x} ${y}C${x + s * 34} ${y - 4} ${x + s * 38} ${y - 30} ${x + s * 30} ${y - 40}C${x + s * 8} ${y - 36} ${x - 2} ${y - 18} ${x} ${y}Z`} />
      ))}
    </svg>
  )
}

export function Flowers({ className = '' }) {
  const spots = [[20, 30], [50, 14], [78, 38], [38, 62], [64, 76], [16, 88], [92, 80], [46, 104], [78, 112], [28, 128]]
  return (
    <svg viewBox="0 0 120 150" className={`pointer-events-none ${className}`} aria-hidden="true">
      <g stroke="#C9B28F" strokeWidth="1" fill="none" opacity=".7">
        <path d="M60 150C58 110 40 70 20 30M60 150C62 100 70 60 78 38M60 150C56 120 50 90 38 62M60 150C66 120 78 100 92 80" />
      </g>
      {spots.map(([x, y], i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={x} cy={y - 5} rx="3.2" ry="5" fill="#fff" stroke="#EAD9D2" strokeWidth=".5" transform={`rotate(${a} ${x} ${y})`} />
          ))}
          <circle cx={x} cy={y} r="2" fill="#E2C275" />
        </g>
      ))}
    </svg>
  )
}

export function Qty({ value, onChange, small = false }) {
  const { t } = useI18n()
  const b = `flex ${small ? 'h-8 w-8' : 'h-9 w-9'} items-center justify-center rounded-full bg-blush text-wine transition hover:bg-rose disabled:opacity-40`
  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={t('product.qty')} onClick={(e) => e.stopPropagation()}>
      <button type="button" className={b} onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label="−"><Icon name="minus" className="h-4 w-4" /></button>
      <span className="min-w-6 text-center font-medium tabular-nums text-wine">{value}</span>
      <button type="button" className={b} onClick={() => onChange(Math.min(99, value + 1))} aria-label="+"><Icon name="plus" className="h-4 w-4" /></button>
    </div>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <div className={`mb-8 flex flex-col items-center ${className}`}>
      <div className="flex w-full items-center justify-center gap-4 sm:gap-6">
        <span className="h-px w-12 bg-wine/40 sm:w-32 md:w-48" />
        <h2 className="font-display text-4xl text-wine sm:text-5xl">{children}</h2>
        <span className="h-px w-12 bg-wine/40 sm:w-32 md:w-48" />
      </div>
      <Heart className="mt-1 h-5 w-5 text-wine" />
    </div>
  )
}
