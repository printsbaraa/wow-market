"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/utils";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  CheckCircle,
  Sparkles
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    isCartOpen,
    closeCart,
  } = useCart();
  const { t, isRTL, locale } = useLanguage();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 20.000;
  const progressToFree = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className={`fixed inset-y-0 ${isRTL ? "left-0" : "right-0"} max-w-full flex`}>
        <div className="w-screen max-w-md bg-white shadow-floating flex flex-col justify-between border-l border-border animate-slide-up sm:animate-none">
          
          {/* Header */}
          <div className="p-5 border-b border-border flex items-center justify-between bg-surface">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-base">
                  {t("cartTitle")}
                </h3>
                <span className="text-xs text-muted">
                  {items.length} {t("products")}
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-muted-bg transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Progress Bar (React Bits Pro ecommerce-11 pattern) */}
          <div className="px-5 py-3.5 bg-cream/70 border-b border-border text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-foreground">
                <Truck className="w-4 h-4 text-primary" />
                {subtotal >= freeDeliveryThreshold ? (
                  <span className="text-primary font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {isRTL ? "توصيل مجاني مفعّل للزرقاء الجديدة!" : "Free delivery unlocked for New Zarqa!"}
                  </span>
                ) : (
                  <span>
                    {isRTL
                      ? `أضف ${formatPrice(amountNeededForFree, locale)} لتحصل على توصيل مجاني`
                      : `Add ${formatPrice(amountNeededForFree, locale)} for free delivery`}
                  </span>
                )}
              </span>
              <span className="text-muted font-bold">{progressToFree}%</span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${progressToFree}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-border/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-muted-bg flex items-center justify-center text-muted">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base">
                    {t("emptyCartTitle")}
                  </h4>
                  <p className="text-xs text-muted max-w-xs mt-1">
                    {t("emptyCartDesc")}
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
                >
                  {t("startShopping")}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-3.5 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.nameAr}
                    className="w-16 h-16 rounded-2xl object-cover bg-white border border-border flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs sm:text-sm font-bold text-foreground truncate">
                      {isRTL ? item.product.nameAr : item.product.nameEn}
                    </h5>
                    <p className="text-[11px] text-muted mb-2">
                      {item.product.brand} • {item.product.size}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#F2F5F3] px-2 py-1 rounded-xl border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-primary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black w-5 text-center font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-end">
                        <span className="text-xs sm:text-sm font-extrabold text-primary font-sans">
                          {formatPrice(item.product.price * item.quantity, locale)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-muted hover:text-danger rounded-xl transition-colors self-start"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-border bg-[#FAFBF9] space-y-3">
              <div className="space-y-1.5 text-xs text-muted">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span className="font-bold text-foreground font-sans">
                    {formatPrice(subtotal, locale)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t("deliveryFee")}</span>
                  <span className="font-bold text-foreground font-sans">
                    {deliveryFee === 0 ? (
                      <span className="text-primary font-bold">{isRTL ? "مجاني" : "FREE"}</span>
                    ) : (
                      formatPrice(deliveryFee, locale)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-foreground pt-2 border-t border-border">
                  <span>{t("total")}</span>
                  <span className="text-primary font-sans">
                    {formatPrice(total, locale)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="col-span-1 flex items-center justify-center p-3 rounded-2xl bg-muted-bg hover:bg-border text-foreground font-bold text-xs transition-colors"
                >
                  {isRTL ? "السلة" : "Cart"}
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="col-span-3 flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30"
                >
                  <span>{t("proceedToCheckout")}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted pt-1">
                <button
                  onClick={clearCart}
                  className="text-muted hover:text-danger hover:underline transition-colors"
                >
                  {isRTL ? "إفراغ السلة بالكامل" : "Empty Cart"}
                </button>
                <span className="flex items-center gap-1 text-primary">
                  <Sparkles className="w-3 h-3" />
                  {isRTL ? "دفع عند الاستلام أو كليك" : "Cash / CliQ on Delivery"}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
