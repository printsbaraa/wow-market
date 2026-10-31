"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import {
  X,
  ShoppingBag,
  Heart,
  Star,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useStore();
  const { isRTL, locale, t } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addItem(quickViewProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-floating border border-border overflow-hidden animate-slide-up z-10">
          
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-muted hover:text-foreground hover:bg-white flex items-center justify-center transition-all shadow-sm border border-border"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image */}
            <div className="relative bg-[#F5F8F6] p-8 flex items-center justify-center border-b md:border-b-0 md:border-e border-border">
              <img
                src={quickViewProduct.image}
                alt={isRTL ? quickViewProduct.nameAr : quickViewProduct.nameEn}
                className="max-h-72 w-full object-contain rounded-2xl"
              />
              {quickViewProduct.isFresh && (
                <span className="absolute top-4 start-4 inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  {isRTL ? "طازج يومياً" : "Daily Fresh"}
                </span>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs text-muted mb-2">
                  <span className="font-bold text-primary uppercase">
                    {quickViewProduct.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold">{quickViewProduct.rating}</span>
                    <span>({quickViewProduct.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-foreground mb-2 leading-tight">
                  {isRTL ? quickViewProduct.nameAr : quickViewProduct.nameEn}
                </h3>

                <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                  {isRTL ? quickViewProduct.descriptionAr : quickViewProduct.descriptionEn}
                </p>

                {/* Meta Attributes */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-muted-bg p-2.5 rounded-xl">
                    <span className="text-muted block text-[10px]">{t("size")}</span>
                    <span className="font-bold text-foreground">{quickViewProduct.size}</span>
                  </div>
                  {quickViewProduct.origin && (
                    <div className="bg-muted-bg p-2.5 rounded-xl">
                      <span className="text-muted block text-[10px]">{t("countryOfOrigin")}</span>
                      <span className="font-bold text-foreground">{quickViewProduct.origin}</span>
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pt-2 border-t border-border">
                  <span className="text-2xl font-black text-primary font-sans">
                    {formatPrice(quickViewProduct.price, locale)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-muted line-through font-sans">
                      {formatPrice(quickViewProduct.originalPrice, locale)}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions & Quantity */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center gap-3 bg-[#F2F5F3] px-3 py-2 rounded-2xl border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-sm w-6 text-center font-sans">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!quickViewProduct.inStock}
                    className={`flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      added
                        ? "bg-primary text-white"
                        : "bg-primary hover:bg-primary-dark text-white shadow-primary/20"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t("addedToCart")}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t("addToCart")}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                      inWishlist
                        ? "bg-danger text-white border-danger"
                        : "border-border text-muted hover:text-danger bg-white"
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-white" : ""}`} />
                  </button>
                </div>

                <div className="text-center pt-1">
                  <Link
                    href={`/product/${quickViewProduct.id}`}
                    onClick={closeQuickView}
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isRTL ? "عرض تفاصيل المنتج كاملة" : "View Full Product Page"}</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
