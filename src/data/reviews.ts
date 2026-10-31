export interface Review {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  commentAr: string;
  commentEn: string;
  source: "Google Maps" | "Talabat";
  verified: boolean;
}

export const STORE_STATS = {
  googleMaps: {
    rating: 4.3,
    reviewCount: 2032,
    sourceUrl: "https://maps.app.goo.gl/jDcV98dYngwKbxh3A"
  },
  talabat: {
    rating: 4.4,
    reviewCount: 146,
    sourceUrl: "https://www.talabat.com/jordan/wow-market"
  },
  foundedYear: 2017,
  location: "New Zarqa, Madinat Al Sharq, Zarqa, Jordan",
  locationAr: "الزرقاء الجديدة، مدينة الشرق، شارع الكرامة، الزرقاء، الأردن",
  phone: "+962 7 9676 7613",
  workingHours: "8:00 AM – 11:55 PM",
  workingHoursAr: "8:00 صباحاً – 11:55 مساءً"
};

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    authorName: "أحمد الخلايلة",
    rating: 5,
    date: "قبل أسبوعين",
    commentAr: "سوبرماركت ممتاز في الزرقاء الجديدة، خدمة محترمة، خضار وفواكه طازجة دائماً وأسعار مناسبة جداً للجميع.",
    commentEn: "Excellent supermarket in New Zarqa, respectful service, fresh vegetables and fruits always, and very reasonable prices.",
    source: "Google Maps",
    verified: true
  },
  {
    id: "rev-2",
    authorName: "أم محمد الزواهرة",
    rating: 5,
    date: "قبل شهر",
    commentAr: "توصيل سريع ومرتب داخل مدينة الشرق والزرقاء الجديدة، الأغراض وصلت باردة وطازجة مثل ما طلبت بالظبط.",
    commentEn: "Fast and organized delivery inside Madinat Al Sharq and New Zarqa, items arrived fresh and exactly as ordered.",
    source: "Talabat",
    verified: true
  },
  {
    id: "rev-3",
    authorName: "خالد بني هاني",
    rating: 4,
    date: "قبل شهرين",
    commentAr: "سوبرماركت حي راقي ومتكامل منذ 2017، يتوفر فيه كل الاحتياجات من مواد تموينية ومستوردة وألبان بلدية.",
    commentEn: "A high-end, complete neighborhood supermarket since 2017, stocking all essentials, imported goods and fresh dairy.",
    source: "Google Maps",
    verified: true
  },
  {
    id: "rev-4",
    authorName: "رنا العبداللات",
    rating: 5,
    date: "قبل 3 أسابيع",
    commentAr: "تعامل راقي جداً من الكادر وسرعة في تلبية الطلبات. سعيدين بوجود واو ماركت بقربنا.",
    commentEn: "Very polite staff and quick response to orders. We are glad to have WoW Market in our neighborhood.",
    source: "Google Maps",
    verified: true
  },
  {
    id: "rev-5",
    authorName: "طارق المجالي",
    rating: 4,
    date: "قبل شهر",
    commentAr: "تغليف ممتاز وأسعار واضحة بدون زيادة في التوصيل لحي الكرامة.",
    commentEn: "Great packaging, transparent prices and no hidden markups for delivery to Al-Karama neighborhood.",
    source: "Talabat",
    verified: true
  }
];
