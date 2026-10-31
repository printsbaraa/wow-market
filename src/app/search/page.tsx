"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Search, Sparkles, Filter } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { products } = useStore();
  const { isRTL, t } = useLanguage();

  const [inputVal, setInputVal] = useState(query);

  const searchResults = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.nameAr.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.descriptionAr.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q)
        );
      })
    : [];

  const popularSearches = [
    { ar: "حليب", en: "Milk" },
    { ar: "صلصة", en: "Sauce" },
    { ar: "بيض", en: "Eggs" },
    { ar: "خيار", en: "Cucumber" },
    { ar: "أمريكان جاردن", en: "American Garden" },
    { ar: "المراعي", en: "Almarai" },
    { ar: "طماطم", en: "Tomatoes" },
  ];

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-4">
            {isRTL ? "البحث في منتجات واو ماركت" : "Search WoW Market Products"}
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/search?q=${encodeURIComponent(inputVal.trim())}`;
            }}
            className="relative"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full h-13 px-5 pr-12 pl-12 rounded-2xl bg-white border border-border shadow-card text-foreground focus:outline-none focus:ring-4 focus:ring-primary/15 text-sm"
            />
            <Search className={`w-5 h-5 text-muted absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"}`} />
            <button
              type="submit"
              className={`absolute top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark ${isRTL ? "left-2" : "right-2"}`}
            >
              {isRTL ? "بحث" : "Search"}
            </button>
          </form>

          {/* Quick pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-muted">
            <span>{isRTL ? "عمليات بحث شائعة:" : "Popular:"}</span>
            {popularSearches.map((tag, idx) => (
              <Link
                key={idx}
                href={`/search?q=${encodeURIComponent(tag.ar)}`}
                className="bg-white px-2.5 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {isRTL ? tag.ar : tag.en}
              </Link>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted">
            {query.trim() ? (
              <>
                {isRTL ? "نتائج البحث عن:" : "Search results for:"}{" "}
                <strong className="text-foreground text-base">&ldquo;{query}&rdquo;</strong>{" "}
                ({searchResults.length} {t("products")})
              </>
            ) : (
              isRTL ? "اكتب كلمة للبحث في تشكيلة المتجر" : "Type a keyword to search catalog"
            )}
          </p>
        </div>

        {/* Grid or Empty */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query.trim() ? (
          <div className="bg-white rounded-3xl border border-border p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-muted-bg flex items-center justify-center mx-auto text-muted">
              <Search className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="text-lg font-black text-foreground">
              {isRTL ? "لم نجد أي نتائج مطابقة" : "No results found"}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {isRTL
                ? "تأكد من كتابة اسم المنتج بشكل صحيح أو تصفح الأقسام الكاملة للعثور على المنتج المطلوب."
                : "Check your spelling or explore our catalog aisles."}
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold"
            >
              {t("navShopAll")}
            </Link>
          </div>
        ) : null}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
