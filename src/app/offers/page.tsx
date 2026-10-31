"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Percent, Sparkles, Tag, ShieldAlert } from "lucide-react";

export default function OffersPage() {
  const { products } = useStore();
  const { t, isRTL } = useLanguage();

  // Products with verified verified promo or featured value
  const promotionalProducts = products.filter(
    (p) => p.isFeatured || (p.originalPrice && p.originalPrice > p.price)
  );

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 text-white p-8 sm:p-12 mb-10 shadow-card relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
              <Percent className="w-3.5 h-3.5" />
              <span>{isRTL ? "عروض حقيقية معتمدة" : "Verified Promotional Offers"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isRTL ? "عروض وتوفير واو ماركت" : "WoW Market Verified Deals"}
            </h1>
            <p className="text-sm text-white/90 leading-relaxed">
              {isRTL
                ? "نوفر لكم أسعاراً تنافسية وعروضاً معتمدة على السلع الأساسية والمواد التموينية والخضار الطازجة بدون أي أسعار وهمية."
                : "Honest supermarket value on pantry staples and fresh farm essentials with transparent pricing."}
            </p>
          </div>
        </div>

        {/* Notice on Authenticity */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 text-xs text-amber-800 flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            {isRTL
              ? "ملاحظة: تخضع جميع العروض للتوفر اليومي في الفرع بالزرقاء الجديدة، ويتم التأكيد المسبق قبل التوصيل."
              : "Notice: All promotional items are subject to in-store availability at our New Zarqa branch."}
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {promotionalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
