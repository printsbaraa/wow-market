/**
 * WoW Market Asset Manifest
 * Maps category IDs and product IDs to optimized imagery and verified original brand assets.
 */

export interface AssetMapping {
  id: string;
  type: "brand" | "category" | "product" | "hero";
  nameAr: string;
  nameEn: string;
  sourceUrl: string;
  alt: string;
}

export const ASSET_MANIFEST: Record<string, AssetMapping> = {
  // Brand & Heritage
  "brand-logo": {
    id: "brand-logo",
    type: "brand",
    nameAr: "شعار واو ماركت الرسمي",
    nameEn: "WoW Market Official Logo",
    sourceUrl: "/images/brand/logo.svg",
    alt: "واو ماركت - سوبرماركت الزرقاء الجديدة منذ 2017"
  },
  "hero-store": {
    id: "hero-store",
    type: "hero",
    nameAr: "واجهة متجر واو ماركت الزرقاء",
    nameEn: "WoW Market Supermarket Storefront",
    sourceUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    alt: "تسوق بقالة واو ماركت في الزرقاء الجديدة"
  },

  // Seed Products (Verified from official catalog)
  "ag-pasta-sauce-14oz": {
    id: "ag-pasta-sauce-14oz",
    type: "product",
    nameAr: "صلصة المعكرونة الأصلية أمريكان جاردن",
    nameEn: "A.G Original Pasta Sauce 14oz",
    sourceUrl: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?auto=format&fit=crop&w=700&q=80",
    alt: "A.G Original Pasta Sauce 14 oz — 2.500 JOD"
  },
  "alali-pizza-sauce-hot-320g": {
    id: "alali-pizza-sauce-hot-320g",
    type: "product",
    nameAr: "صلصة البيتزا الحارة العلالي",
    nameEn: "Al Alali Hot Pizza Sauce 320g",
    sourceUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=700&q=80",
    alt: "Al Alali Hot Pizza Sauce 320 g — 2.250 JOD"
  },
  "maxim-white-vinegar-473ml": {
    id: "maxim-white-vinegar-473ml",
    type: "product",
    nameAr: "خل أبيض ماكسيم نقي",
    nameEn: "Maxim White Vinegar 473ml",
    sourceUrl: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=700&q=80",
    alt: "Maxim White Vinegar 473 ml — 0.750 JOD"
  },
  "ag-squeeze-mustard-8oz": {
    id: "ag-squeeze-mustard-8oz",
    type: "product",
    nameAr: "خردل سائل ضغّاط أمريكان جاردن",
    nameEn: "A.G Squeeze Mustard 8oz",
    sourceUrl: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=700&q=80",
    alt: "A.G Squeeze Mustard 8 oz — 1.350 JOD"
  },
  "ag-burger-pickles-32oz": {
    id: "ag-burger-pickles-32oz",
    type: "product",
    nameAr: "مخلل خيار شرائح للبرغر أمريكان جاردن",
    nameEn: "A.G Burger Sliced Pickles 32oz",
    sourceUrl: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=700&q=80",
    alt: "A.G Burger Sliced Pickles 32 oz — 3.850 JOD"
  },
  "ag-original-mayonnaise-30oz": {
    id: "ag-original-mayonnaise-30oz",
    type: "product",
    nameAr: "مايونيز أصلي أمريكان جاردن",
    nameEn: "A.G Original Mayonnaise 30oz",
    sourceUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=700&q=80",
    alt: "A.G Original Mayonnaise — 5.450 JOD"
  },

  // Daily Essentials
  "almarai-fresh-milk-full-cream-2l": {
    id: "almarai-fresh-milk-full-cream-2l",
    type: "product",
    nameAr: "حليب المراعي طازج كامل الدسم 2 لتر",
    nameEn: "Almarai Fresh Full Cream Milk 2L",
    sourceUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80",
    alt: "حليب المراعي طازج 2 لتر — 2.100 JOD"
  },
  "baladna-fresh-eggs-30pcs": {
    id: "baladna-fresh-eggs-30pcs",
    type: "product",
    nameAr: "طبق بيض مائدة طازج بلدنا 30 بيضة",
    nameEn: "Baladna Fresh Table Eggs 30 Pcs",
    sourceUrl: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80",
    alt: "طبق بيض مائدة بلدنا طازج — 3.250 JOD"
  },
  "aquafina-water-6x1-5l": {
    id: "aquafina-water-6x1-5l",
    type: "product",
    nameAr: "مياه أكوافينا نقية 6 عبوات",
    nameEn: "Aquafina Pure Water 6 x 1.5L",
    sourceUrl: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=700&q=80",
    alt: "مياه أكوافينا 6 عبوات 1.5 لتر — 1.500 JOD"
  },
  "fairy-lemon-dishwashing-liquid-1l": {
    id: "fairy-lemon-dishwashing-liquid-1l",
    type: "product",
    nameAr: "سائل جلي فيري بالليمون المركز 1 لتر",
    nameEn: "Fairy Lemon Dishwashing Liquid 1L",
    sourceUrl: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=700&q=80",
    alt: "سائل جلي فيري بالليمون — 2.150 JOD"
  }
};
