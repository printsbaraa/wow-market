"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Heart,
  Eye,
  Check,
  Star,
  Sparkles
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const { isRTL, locale, t } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useStore();

  const [isAdded, setIsAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className={`group relative bg-white rounded-3xl border border-border p-3.5 flex flex-col justify-between product-card overflow-hidden shadow-subtle ${className}`}
    >
      {/* Top Badges & Actions */}
      <div className="relative">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F7F9F8] mb-3 border border-border/40">
          <img
            src={product.image}
            alt={isRTL ? product.nameAr : product.nameEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 start-2.5 flex flex-col gap-1.5 z-10">
            {product.isFresh && (
              <span className="inline-flex items-center gap-1 bg-primary text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                {isRTL ? "طازج يومياً" : "Fresh"}
              </span>
            )}
            {product.isBestSeller && !product.isFresh && (
              <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                ★ {isRTL ? "الأكثر طلباً" : "Top Seller"}
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="bg-danger text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                {isRTL ? "عرض خاص" : "Sale"}
              </span>
            )}
          </div>

          {/* Floating Actions (Wishlist & Quick View) */}
          <div className="absolute top-2.5 end-2.5 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                inWishlist
                  ? "bg-danger text-white"
                  : "bg-white/90 backdrop-blur-md text-muted hover:text-danger hover:bg-white"
              }`}
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              aria-label="Toggle Wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
            </button>

            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-muted hover:text-primary hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm"
              title={t("quickView")}
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand & Size Meta */}
        <div className="flex items-center justify-between text-[11px] text-muted mb-1">
          <span className="font-semibold text-primary/80 uppercase tracking-wider truncate max-w-[120px]">
            {product.brand}
          </span>
          <span className="bg-muted-bg px-2 py-0.5 rounded-md font-medium">
            {product.size}
          </span>
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.id}`} className="block group-hover:text-primary transition-colors">
          <h3 className="font-bold text-foreground text-sm line-clamp-2 h-10 leading-snug">
            {isRTL ? product.nameAr : product.nameEn}
          </h3>
        </Link>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div className="mt-3 pt-3 border-t border-border/60">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-primary font-sans">
                {formatPrice(product.price, locale)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted line-through font-sans">
                  {formatPrice(product.originalPrice, locale)}
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md font-semibold">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Add to Cart Button (React Bits quick add pattern) */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full h-10 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
            !product.inStock
              ? "bg-muted-bg text-muted cursor-not-allowed"
              : isAdded
              ? "bg-primary text-white scale-[0.98]"
              : "bg-primary-light text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>{t("addedToCart")}</span>
            </>
          ) : !product.inStock ? (
            <span>{t("outOfStock")}</span>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{t("addToCart")}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
