import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import p4 from '../assets/p4.jpg'

// ===== بيانات مؤقتة: الصور والأسماء والأسعار هتتغير بعدين =====
export const categories = [
  { id: 'clutches', img: p3, name: { ar: 'كلتش', fr: 'Pochettes' } },
  { id: 'handbags', img: p4, name: { ar: 'شنط يد', fr: 'Sacs à main' } },
  { id: 'shoulder', img: p2, name: { ar: 'شنط كتف', fr: 'Sacs bandoulière' } },
  { id: 'pouches', img: p1, name: { ar: 'بوتش', fr: 'Trousses' } },
  { id: 'accessories', img: p4, name: { ar: 'إكسسوارات', fr: 'Accessoires' } },
]

export const products = [
  { id: 'black-bronze', cat: 'clutches', price: 450, images: [p1],
    name: { ar: 'كلتش أسود برونزي', fr: 'Pochette noir bronze' },
    desc: { ar: 'كلتش كروشيه بخيط لامع بلمسات برونزية، بيد علوية مريحة. مناسب للخروجات والمناسبات.', fr: 'Pochette au crochet en fil brillant à reflets bronze, avec anse supérieure. Idéale pour sortir ou pour une occasion.' },
    tags: ['شنطه', 'حقيبه', 'كلتش', 'اسود', 'bag', 'sac', 'pochette', 'noir', 'black'] },
  { id: 'navy-chain', cat: 'shoulder', price: 520, images: [p2],
    name: { ar: 'شنطة كتف كحلي بسلسلة', fr: 'Sac bandoulière bleu nuit à chaîne' },
    desc: { ar: 'شنطة كتف بخيط كحلي لامع وسلسلة ذهبية قابلة للإزالة. خفيفة وأنيقة لكل يوم.', fr: 'Sac bandoulière en fil bleu nuit brillant avec chaîne dorée amovible. Léger et élégant au quotidien.' },
    tags: ['شنطه', 'كتف', 'سلسله', 'كحلي', 'ازرق', 'bag', 'sac', 'chaine', 'bleu', 'navy'] },
  { id: 'chocolate', cat: 'handbags', price: 480, images: [p3],
    name: { ar: 'شنطة يد شوكولاتة', fr: 'Sac à main chocolat' },
    desc: { ar: 'شنطة يد بنية دافئة بخيط لامع وبيد مدمجة. لون كلاسيكي يليق بأي إطلالة.', fr: 'Sac à main marron chaleureux en fil brillant, anse intégrée. Une couleur classique qui va avec tout.' },
    tags: ['شنطه', 'يد', 'بني', 'شوكولاته', 'bag', 'sac', 'marron', 'chocolat', 'brown'] },
  { id: 'powder-pink', cat: 'handbags', price: 500, images: [p4],
    name: { ar: 'شنطة يد وردي هادي', fr: 'Sac à main rose poudré' },
    desc: { ar: 'شنطة يد وردي ناعم بلمعة هادية، مصنوعة يدويًا بغرزة مميزة. هدية جميلة.', fr: 'Sac à main rose poudré à l’éclat doux, fait main avec un point soigné. Un joli cadeau.' },
    tags: ['شنطه', 'يد', 'وردي', 'بينك', 'هديه', 'bag', 'sac', 'rose', 'pink', 'cadeau'] },
  { id: 'mini-pouch', cat: 'pouches', price: 300, images: [p4],
    name: { ar: 'بوتش صغير وردي', fr: 'Petite trousse rose' },
    desc: { ar: 'بوتش كروشيه صغير للأغراض الصغيرة، بنفس الخيط الوردي الناعم.', fr: 'Petite trousse au crochet pour vos essentiels, dans le même fil rose doux.' },
    tags: ['بوتش', 'صغير', 'محفظه', 'pouch', 'trousse', 'pochette', 'mini', 'rose'] },
  { id: 'black-purse', cat: 'accessories', price: 250, images: [p1],
    name: { ar: 'محفظة كروشيه سوداء', fr: 'Porte-monnaie noir au crochet' },
    desc: { ar: 'محفظة صغيرة سوداء بلمسة برونزية، عملية وتتحط في أي شنطة.', fr: 'Petit porte-monnaie noir aux reflets bronze, pratique et facile à glisser dans un sac.' },
    tags: ['محفظه', 'اكسسوار', 'اسود', 'purse', 'wallet', 'accessoire', 'noir', 'black'] },
]

export const getProduct = (id) => products.find((p) => p.id === id)
export const getCategory = (id) => categories.find((c) => c.id === id)
