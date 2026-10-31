"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronRight, ArrowLeft, ArrowRight, Sparkles, Filter } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { categories, products } = useStore();
  const { isRTL, t } = useLanguage();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const category = categories.find((c) => c.slug === slug || c.id === slug);

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{isRTL ? "القسم غير موجود" : "Category Not Found"}</h2>
        <Link href="/shop" className="text-primary hover:underline font-bold">
          {isRTL ? "العودة للتسوق" : "Back to Shop"}
        </Link>
      </div>
    );
  }

  // Filter products belonging to this category
  const categoryProducts = products.filter((p) => {
    const matchesCategory = p.categoryId === category.id || p.categorySlug === category.slug;
    if (!matchesCategory) return false;
    if (selectedSubcategory !== "all" && p.subcategoryId !== selectedSubcategory) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("navHome")}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
          <Link href="/shop" className="hover:text-primary transition-colors">
            {t("navShopAll")}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
          <span className="text-foreground font-bold truncate">
            {isRTL ? category.nameAr : category.nameEn}
          </span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-10 bg-white border border-border shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-7 p-6 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{category.itemCount} {t("products")}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                {isRTL ? category.nameAr : category.nameEn}
              </h1>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                {isRTL ? category.descriptionAr : category.descriptionEn}
              </p>
            </div>

            <div className="md:col-span-5 h-48 sm:h-64 relative overflow-hidden">
              <img
                src={category.image}
                alt={isRTL ? category.nameAr : category.nameEn}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-${isRTL ? "l" : "r"} from-white via-transparent to-transparent`} />
            </div>
          </div>
        </div>

        {/* Subcategories Tabs */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <button
              onClick={() => setSelectedSubcategory("all")}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedSubcategory === "all"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-muted hover:text-foreground border border-border"
              }`}
            >
              {isRTL ? "الكل" : "All Items"}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedSubcategory === sub.id
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-muted hover:text-foreground border border-border"
                }`}
              >
                {isRTL ? sub.nameAr : sub.nameEn}
              </button>
            ))}
          </div>
        )}

        {/* Toolbar & Sort */}
        <div className="bg-white rounded-2xl border border-border p-3.5 mb-6 flex items-center justify-between shadow-subtle">
          <span className="text-xs text-muted font-medium">
            {t("showingProducts")} <strong className="text-foreground">{categoryProducts.length}</strong> {t("products")}
          </span>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted hidden sm:inline">{t("sortBy")}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-muted-bg text-foreground font-bold text-xs rounded-xl px-3 py-1.5 border border-border focus:outline-none"
            >
              <option value="default">{t("sortDefault")}</option>
              <option value="price-asc">{t("sortPriceLowHigh")}</option>
              <option value="price-desc">{t("sortPriceHighLow")}</option>
              <option value="rating">{t("sortBestRating")}</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-border p-12 text-center space-y-4">
            <p className="text-sm text-muted">
              {isRTL
                ? "يتم تحديث وإضافة منتجات جديدة لهذا القسم باستمرار."
                : "Products for this section are being updated continuously."}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold"
            >
              <span>{isRTL ? "تصفح باقي الأقسام" : "Browse other aisles"}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
