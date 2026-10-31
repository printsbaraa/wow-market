export interface Brand {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  featured?: boolean;
}

export const BRANDS: Brand[] = [
  { id: "american-garden", name: "American Garden", nameAr: "أمريكان جاردن", country: "USA", featured: true },
  { id: "al-alali", name: "Al Alali", nameAr: "العلالي", country: "Saudi Arabia", featured: true },
  { id: "maxim", name: "Maxim", nameAr: "ماكسيم", country: "Jordan", featured: true },
  { id: "almarai", name: "Almarai", nameAr: "المراعي", country: "Saudi Arabia", featured: true },
  { id: "aquafina", name: "Aquafina", nameAr: "أكوافينا", country: "Jordan", featured: true },
  { id: "al-rabie", name: "Al Rabie", nameAr: "الربيع", country: "Saudi Arabia", featured: true },
  { id: "barbican", name: "Barbican", nameAr: "باربيكان", country: "UAE", featured: true },
  { id: "red-bull", name: "Red Bull", nameAr: "ريد بول", country: "Austria", featured: true },
  { id: "kdd", name: "KDD", nameAr: "كي دي دي", country: "Kuwait", featured: true },
  { id: "tang", name: "Tang", nameAr: "تانج", country: "USA", featured: true },
  { id: "rani", name: "Rani", nameAr: "راني", country: "Saudi Arabia", featured: true },
  { id: "ultra", name: "Ultra", nameAr: "ألترا", country: "Jordan", featured: false },
  { id: "baladna", name: "Baladna", nameAr: "بلدنا", country: "Jordan", featured: true },
  { id: "heinz", name: "Heinz", nameAr: "هاينز", country: "USA", featured: true },
  { id: "lipton", name: "Lipton", nameAr: "ليبتون", country: "UK", featured: true },
  { id: "nutella", name: "Nutella", nameAr: "نوتيلا", country: "Italy", featured: true },
  { id: "fairy", name: "Fairy", nameAr: "فيري", country: "UK", featured: true },
  { id: "tide", name: "Tide", nameAr: "تايد", country: "USA", featured: true },
  { id: "pampers", name: "Pampers", nameAr: "بامبرز", country: "USA", featured: true },
  { id: "fine", name: "Fine", nameAr: "فاين", country: "Jordan", featured: true }
];
