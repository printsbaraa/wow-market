"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export function FeaturedProducts() {
  const { t, isRTL } = useLanguage();
  const { products } = useStore();

  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", labelAr: "الكل", labelEn: "All Items" },
    { id: "fresh", labelAr: "طازج يومياً", labelEn: "Daily Fresh" },
    { id: "appetizers", labelAr: "الصلصات والمقبلات", labelEn: "Sauces & Condiments" },
    { id: "dairy-eggs", labelAr: "ألبان وبيض", labelEn: "Dairy & Eggs" },
    { id: "beverages", labelAr: "المشروبات", labelEn: "Beverages" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return p.isFeatured;
    if (activeTab === "fresh") return p.isFresh;
    return p.categoryId === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-cream/40 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRTL ? "خيارات أسبوعية منتقاة" : "Handpicked Weekly Deals"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              {t("featuredProductsTitle")}
            </h2>
            <p className="text-sm text-muted mt-1 max-w-xl">
              {t("featuredProductsSubtitle")}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-dark group"
          >
            <span>{isRTL ? "تسوق كل المنتجات" : "Shop All Catalog"}</span>
            {isRTL ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </div>

        {/* Filter Tabs (React Bits ecommerce-6 pattern) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-muted hover:text-foreground border border-border"
              }`}
            >
              {isRTL ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
