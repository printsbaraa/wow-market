"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/utils";
import {
  ChevronRight,
  ShoppingBag,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Barcode,
  Globe,
  Tag
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { products, getProductById } = useStore();
  const { isRTL, locale, t } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(id) || products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-black mb-4">{isRTL ? "المنتج غير موجود" : "Product Not Found"}</h2>
        <Link href="/shop" className="text-primary font-bold hover:underline">
          {isRTL ? "العودة للتسوق" : "Back to catalog"}
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8 overflow-hidden">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("navHome")}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isRTL ? "rotate-180" : ""}`} />
          <Link href="/shop" className="hover:text-primary transition-colors">
            {t("navShopAll")}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isRTL ? "rotate-180" : ""}`} />
          <Link href={`/category/${product.categorySlug}`} className="hover:text-primary transition-colors truncate">
            {product.categorySlug}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isRTL ? "rotate-180" : ""}`} />
          <span className="text-foreground font-bold truncate">
            {isRTL ? product.nameAr : product.nameEn}
          </span>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-card mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left/Image Area */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full rounded-3xl bg-[#F7F9F8] border border-border/80 overflow-hidden flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={isRTL ? product.nameAr : product.nameEn}
                  className="max-h-96 w-full object-contain"
                />

                {product.isFresh && (
                  <span className="absolute top-4 start-4 bg-primary text-white text-xs font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRTL ? "طازج يومياً" : "Daily Fresh"}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right/Details Area */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & Reviews */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-extrabold text-primary uppercase tracking-wider bg-primary-light px-2.5 py-1 rounded-lg">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl font-bold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-muted font-normal">({product.reviewCount} {isRTL ? "تقييم" : "reviews"})</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-3">
                  {isRTL ? product.nameAr : product.nameEn}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-3xl font-black text-primary font-sans">
                    {formatPrice(product.price, locale)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-muted line-through font-sans">
                      {formatPrice(product.originalPrice, locale)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {isRTL ? product.descriptionAr : product.descriptionEn}
                </p>

                {/* Specifications Sheet (React Bits Pro ecommerce-8 pattern) */}
                <div className="bg-[#FAFBF9] rounded-2xl border border-border p-4 mb-6">
                  <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
                    {isRTL ? "المواصفات وتفاصيل العبوة" : "Specifications"}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-muted block text-[11px]">{t("size")}</span>
                      <strong className="text-foreground">{product.size}</strong>
                    </div>
                    {product.origin && (
                      <div>
                        <span className="text-muted block text-[11px]">{t("countryOfOrigin")}</span>
                        <strong className="text-foreground">{product.origin}</strong>
                      </div>
                    )}
                    {product.barcode && (
                      <div>
                        <span className="text-muted block text-[11px]">الباركود الدولي</span>
                        <strong className="text-foreground font-mono">{product.barcode}</strong>
                      </div>
                    )}
                    <div>
                      <span className="text-muted block text-[11px]">حالة التوفر</span>
                      <strong className={product.inStock ? "text-primary" : "text-danger"}>
                        {product.inStock ? t("inStock") : t("outOfStock")}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-3 bg-[#F2F5F3] px-4 py-2.5 rounded-2xl border border-border w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-base w-8 text-center font-sans">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 h-12 w-full rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      added
                        ? "bg-primary text-white"
                        : "bg-primary hover:bg-primary-dark text-white shadow-primary/20 hover:shadow-lg"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>{t("addedToCart")}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>{t("addToCart")}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`h-12 w-12 rounded-2xl border flex items-center justify-center transition-all ${
                      inWishlist
                        ? "bg-danger text-white border-danger"
                        : "border-border text-muted hover:text-danger bg-white"
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-white" : ""}`} />
                  </button>
                </div>

                {/* Delivery Guarantee Note */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary-light/50 border border-primary/20 text-xs text-foreground">
                  <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>
                    {isRTL
                      ? "توصيل للزرقاء الجديدة ومدينة الشرق (يومياً من 8:00 ص حتى 11:55 م) — الدفع نقداً أو كليك عند الاستلام"
                      : "Delivery in New Zarqa & Madinat Al Sharq (Daily 8:00 AM – 11:55 PM) — Pay Cash or CliQ on delivery"}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground mb-6">
              {isRTL ? "منتجات مشابهة قد تهمك" : "Related Products"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
