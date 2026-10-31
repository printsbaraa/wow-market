"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Flame } from "lucide-react";

export function BestSellersCarousel() {
  const { t, isRTL } = useLanguage();
  const { products } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const bestSellers = products.filter((p) => p.isBestSeller);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{isRTL ? "الأعلى طلباً في الزرقاء الجديدة" : "New Zarqa's Top Favorites"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              {t("bestSellersTitle")}
            </h2>
            <p className="text-sm text-muted mt-1">
              {t("bestSellersSubtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-foreground hover:bg-muted-bg hover:text-primary transition-colors shadow-subtle"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-foreground hover:bg-muted-bg hover:text-primary transition-colors shadow-subtle"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="min-w-[240px] sm:min-w-[270px] max-w-[280px] snap-start flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
