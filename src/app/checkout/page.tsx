"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useStore, Order } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  Phone,
  MapPin,
  CheckCircle2,
  Banknote,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { t, isRTL, locale } = useLanguage();
  const { user } = useAuth();
  const { placeOrder } = useStore();

  const [fullName, setFullName] = useState(user?.name || "عمر خالد");
  const [phone, setPhone] = useState(user?.phone || "0796767613");
  const [area, setArea] = useState(user?.area || "الزرقاء الجديدة - شارع الكرامة");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "بناية 12، بجانب مسجد عمر");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash_on_delivery" | "cliq">("cash_on_delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const areasInZarqa = [
    "الزرقاء الجديدة - شارع الكرامة",
    "الزرقاء الجديدة - شارع 36",
    "الزرقاء الجديدة - شارع 16",
    "الزرقاء الجديدة - حي الفلاح",
    "مدينة الشرق - المرحلة الأولى",
    "مدينة الشرق - المرحلة الثانية",
    "حي معصوم / الزرقاء الجديدة",
  ];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !streetAddress.trim()) {
      setErrorMsg(isRTL ? "يرجى تعبئة كافة الحقول المطلوبة للتوصيل" : "Please fill in all required delivery fields");
      return;
    }

    if (items.length === 0) {
      setErrorMsg(isRTL ? "سلة التسوق فارغة" : "Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    setTimeout(() => {
      const order = placeOrder({
        customerName: fullName,
        customerPhone: phone,
        customerEmail: user?.email,
        area: area,
        streetAddress: streetAddress,
        deliveryNotes: deliveryNotes,
        paymentMethod: paymentMethod,
        items: items.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          unitPrice: i.product.price,
        })),
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
      });

      // Clear cart
      clearCart();
      setIsSubmitting(false);
      setConfirmedOrder(order);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 700);
  };

  // SUCCESS VIEW
  if (confirmedOrder) {
    return (
      <div className="py-20 bg-background min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-card space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full">
                {isRTL ? "تم إرسال الطلب بنجاح" : "Order Placed Successfully"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                {t("orderSuccessTitle")}
              </h1>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {t("orderSuccessDesc")}
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="bg-[#FAFBF9] rounded-2xl p-5 border border-border text-start space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted">{t("orderNumber")}</span>
                <span className="font-mono font-black text-foreground text-sm">
                  {confirmedOrder.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("fullName")}</span>
                <span className="font-bold text-foreground">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("phone")}</span>
                <span className="font-bold text-foreground" dir="ltr">{confirmedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("area")}</span>
                <span className="font-bold text-foreground">{confirmedOrder.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("paymentMethod")}</span>
                <span className="font-bold text-foreground">
                  {confirmedOrder.paymentMethod === "cash_on_delivery" ? t("cashOnDelivery") : t("clicPay")}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-sm font-black text-foreground">
                <span>{t("total")}</span>
                <span className="text-primary font-sans">
                  {formatPrice(confirmedOrder.total, locale)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition-all shadow-md"
              >
                {t("backToHome")}
              </Link>
              <Link
                href={`/orders/${confirmedOrder.id}`}
                className="flex-1 py-3.5 rounded-2xl bg-muted-bg hover:bg-border text-foreground font-bold text-xs transition-colors"
              >
                {isRTL ? "متابعة تفاصيل الطلب" : "Track Order Status"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART CHECK
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-3">{t("emptyCartTitle")}</h2>
        <Link href="/shop" className="text-primary font-bold hover:underline">
          {t("startShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            {t("checkoutTitle")}
          </h1>
          <p className="text-xs text-muted mt-1">
            {isRTL
              ? "توصيل للزرقاء الجديدة ومدينة الشرق — الدفع عند الاستلام نقداً أو كليك"
              : "Delivery to New Zarqa & Madinat Al Sharq — Cash or CliQ upon delivery"}
          </p>
        </div>

        {/* Form & Summary Grid */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Customer & Address Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delivery Verification Notice */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">
                {t("deliveryNotice")}
              </p>
            </div>

            {/* Recipient Details */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-4">
              <h2 className="text-base font-black text-foreground flex items-center gap-2 pb-3 border-b border-border">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t("customerInfo")}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {t("fullName")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {t("phone")} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {t("area")} *
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                >
                  {areasInZarqa.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {t("streetAddress")} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isRTL ? "اسم الشارع، رقم العمارة، الطابق أو علامة مميزة" : "Street name, building number, floor"}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {t("deliveryNotes")}
                </label>
                <textarea
                  rows={2}
                  placeholder={isRTL ? "مثال: الرجاء الرن على الجرس، أو تسليم الطلب للحارس..." : "e.g., Please ring the bell or leave with concierge"}
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-4">
              <h2 className="text-base font-black text-foreground flex items-center gap-2 pb-3 border-b border-border">
                <Banknote className="w-4 h-4 text-primary" />
                <span>{t("paymentMethod")}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod("cash_on_delivery")}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === "cash_on_delivery"
                      ? "border-primary bg-primary-light/40 shadow-sm"
                      : "border-border hover:bg-muted-bg"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cash_on_delivery"}
                    onChange={() => setPaymentMethod("cash_on_delivery")}
                    className="accent-primary"
                  />
                  <div>
                    <span className="text-xs font-black text-foreground block">
                      {t("cashOnDelivery")}
                    </span>
                    <span className="text-[11px] text-muted">
                      {isRTL ? "الدفع نقداً عند استلام الأغراض" : "Pay with cash at your door"}
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("cliq")}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === "cliq"
                      ? "border-primary bg-primary-light/40 shadow-sm"
                      : "border-border hover:bg-muted-bg"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cliq"}
                    onChange={() => setPaymentMethod("cliq")}
                    className="accent-primary"
                  />
                  <div>
                    <span className="text-xs font-black text-foreground block">
                      {t("clicPay")}
                    </span>
                    <span className="text-[11px] text-muted">
                      {isRTL ? "تحويل كليك عبر البنك الأردني" : "Direct CliQ transfer upon receipt"}
                    </span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right: Order Summary Breakdown */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-5 sticky top-24">
              <h2 className="font-black text-foreground text-base pb-3 border-b border-border">
                {isRTL ? "المنتجات المطلوبة" : "Ordered Items"} ({items.length})
              </h2>

              <div className="max-h-60 overflow-y-auto divide-y divide-border/60 pr-1 space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-10 h-10 rounded-xl object-cover bg-muted-bg border border-border flex-shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-bold text-foreground truncate">
                          {isRTL ? item.product.nameAr : item.product.nameEn}
                        </p>
                        <p className="text-[11px] text-muted">
                          {item.quantity} × {formatPrice(item.product.price, locale)}
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-primary font-sans flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity, locale)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border space-y-2.5 text-xs">
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

              {errorMsg && (
                <div className="p-3 bg-danger-light text-danger text-xs font-bold rounded-xl text-center">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{isRTL ? "جارٍ إرسال الطلب..." : "Submitting Order..."}</span>
                ) : (
                  <>
                    <span>{t("placeOrder")}</span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-muted flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>{isRTL ? "طلبك محمي ومؤكد بالكامل من سوبرماركت واو ماركت" : "Verified direct supermarket dispatch"}</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
