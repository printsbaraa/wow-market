"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, ArrowLeft, Sparkles, ChevronRight } from "lucide-react";

export function CategoryShowcase() {
  const { t, isRTL } = useLanguage();
  const { categories } = useStore();

  // Featured 8 categories for homepage prominence
  const featuredCategories = categories.filter((c) => c.featured).slice(0, 8);

  return (
    <section id="categories" className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRTL ? "أقسام المتجر المتكاملة" : "Complete Supermarket Aisles"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              {t("categoryShowcaseTitle")}
            </h2>
            <p className="text-sm text-muted mt-1.5 max-w-xl">
              {t("categoryShowcaseSubtitle")}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-dark group"
          >
            <span>{isRTL ? "عرض جميع الأقسام (23 قسماً)" : "Browse all 23 aisles"}</span>
            {isRTL ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative bg-white rounded-3xl border border-border p-3 sm:p-4 category-card-hover flex flex-col justify-between overflow-hidden shadow-subtle"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F2F5F3] mb-3">
                <img
                  src={category.image}
                  alt={isRTL ? category.nameAr : category.nameEn}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                    {isRTL ? category.nameAr : category.nameEn}
                  </h3>
                  <ChevronRight className={`w-4 h-4 text-muted group-hover:text-primary transition-transform ${isRTL ? "rotate-180" : ""}`} />
                </div>
                <p className="text-xs text-muted">
                  {category.itemCount} {t("products")}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
