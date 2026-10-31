"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
  } = useCart();
  const { t, isRTL, locale } = useLanguage();

  const freeDeliveryThreshold = 20.000;
  const progressToFree = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="py-24 bg-background min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-white border border-border flex items-center justify-center mx-auto text-muted shadow-subtle">
            <ShoppingBag className="w-10 h-10 opacity-40 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground">
            {t("emptyCartTitle")}
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            {t("emptyCartDesc")}
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm shadow-md shadow-primary/20 transition-all"
            >
              <span>{t("startShopping")}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            {t("cartTitle")} ({items.length})
          </h1>
          <p className="text-xs text-muted mt-1">
            {isRTL
              ? "تحقق من كميات ومحتويات سلتك قبل التوجه لخطوة إتمام الطلب والتوصيل"
              : "Review your shopping cart items before proceeding to checkout"}
          </p>
        </div>

        {/* Free Shipping Progress Alert */}
        <div className="bg-white rounded-3xl p-5 border border-border shadow-subtle mb-8">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              {subtotal >= freeDeliveryThreshold ? (
                <span className="text-primary font-black">
                  {isRTL ? "مبروك! حصلت على توصيل مجاني داخل الزرقاء الجديدة 🚚" : "Congratulations! Free delivery in New Zarqa unlocked 🚚"}
                </span>
              ) : (
                <span>
                  {isRTL
                    ? `أضف بقيمة ${formatPrice(amountNeeded, locale)} إضافية لتستمتع بالتوصيل المجاني`
                    : `Add ${formatPrice(amountNeeded, locale)} more for free delivery`}
                </span>
              )}
            </div>
            <span className="text-muted font-black">{progressToFree}%</span>
          </div>
          <div className="w-full h-2.5 bg-muted-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Cart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle divide-y divide-border/60">
              {items.map((item) => (
                <div key={item.product.id} className="py-5 first:pt-0 last:pb-0 flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.nameAr}
                    className="w-20 h-20 rounded-2xl object-cover bg-white border border-border flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-primary uppercase">
                          {item.product.brand}
                        </span>
                        <h3 className="font-extrabold text-foreground text-sm sm:text-base leading-snug line-clamp-1">
                          {isRTL ? item.product.nameAr : item.product.nameEn}
                        </h3>
                        <p className="text-xs text-muted mt-0.5">
                          {item.product.size}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-muted hover:text-danger rounded-xl transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity selector */}
                      <div className="flex items-center gap-2.5 bg-[#F2F5F3] px-3 py-1 rounded-xl border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-black text-xs sm:text-sm w-6 text-center font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price per item / total item */}
                      <div className="text-end">
                        <span className="text-sm sm:text-base font-black text-primary font-sans">
                          {formatPrice(item.product.price * item.quantity, locale)}
                        </span>
                        <span className="block text-[10px] text-muted font-sans">
                          ({formatPrice(item.product.price, locale)} / {isRTL ? "قطعة" : "unit"})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-2">
              <Link
                href="/shop"
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                <span>{isRTL ? "متابعة التسوق وإضافة منتجات" : "Continue Shopping"}</span>
              </Link>

              <button
                onClick={clearCart}
                className="text-xs text-muted hover:text-danger hover:underline"
              >
                {isRTL ? "إفراغ السلة بالكامل" : "Clear All"}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-5 sticky top-24">
              <h2 className="font-black text-foreground text-base pb-3 border-b border-border">
                {isRTL ? "ملخص الطلب" : "Order Summary"}
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-muted">
                  <span>{t("subtotal")}</span>
                  <span className="font-bold text-foreground font-sans">
                    {formatPrice(subtotal, locale)}
                  </span>
                </div>

                <div className="flex justify-between text-muted">
                  <span>{t("deliveryFee")}</span>
                  <span className="font-bold text-foreground font-sans">
                    {deliveryFee === 0 ? (
                      <span className="text-primary font-black">{isRTL ? "مجاني" : "FREE"}</span>
                    ) : (
                      formatPrice(deliveryFee, locale)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-border flex justify-between text-base font-black text-foreground">
                  <span>{t("total")}</span>
                  <span className="text-primary font-sans">
                    {formatPrice(total, locale)}
                  </span>
                </div>
              </div>

              {/* Delivery notice */}
              <div className="p-3.5 rounded-2xl bg-cream border border-border text-xs text-foreground space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isRTL ? "طلب مباشر ومضمون" : "Direct Supermarket Dispatch"}</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {isRTL
                    ? "التوصيل يتم داخل الزرقاء الجديدة ومدينة الشرق. سيتصل بك فريقنا لتأكيد تجهيز الطلب."
                    : "Delivering to New Zarqa & Madinat Al Sharq. Our dispatch team will confirm your order."}
                </p>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full h-13 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all"
              >
                <span>{t("proceedToCheckout")}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
