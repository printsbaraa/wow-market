"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlistProducts, wishlistCount } = useWishlist();
  const { isRTL, t } = useLanguage();

  return (
    <div className="py-10 bg-background min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Heart className="w-7 h-7 text-danger fill-danger" />
            <span>{t("navWishlist")}</span>
            <span className="text-sm font-bold text-muted bg-muted-bg px-2.5 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          </h1>
          <p className="text-xs text-muted mt-1">
            {isRTL
              ? "منتجاتك المفضلة والمحفوظة لسهولة إضافتها لسلة التسوق في أي وقت"
              : "Your saved favorites for easy reordering and quick cart addition"}
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-border p-12 text-center max-w-md mx-auto space-y-4 shadow-subtle">
            <div className="w-16 h-16 rounded-3xl bg-muted-bg flex items-center justify-center mx-auto text-muted">
              <Heart className="w-8 h-8 opacity-30 text-danger" />
            </div>
            <h3 className="text-base font-black text-foreground">
              {isRTL ? "قائمة المفضلة فارغة حالياً" : "Your wishlist is empty"}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {isRTL
                ? "اضغط على رمز القلب عند أي منتج لحفظه في قائمتك المفضلة والرجوع إليه لاحقاً."
                : "Click the heart icon on any product to save it here for later."}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-xs"
              >
                <span>{t("startShopping")}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
