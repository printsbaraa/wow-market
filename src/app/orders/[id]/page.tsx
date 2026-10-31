"use client";

import React from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Phone,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck
} from "lucide-react";

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { orders } = useStore();
  const { isRTL, locale, t } = useLanguage();

  const order = orders.find((o) => o.id === id || o.orderNumber === id);

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold mb-4">{isRTL ? "الطلب غير موجود" : "Order Not Found"}</h2>
        <Link href="/orders" className="text-primary hover:underline font-bold">
          {isRTL ? "العودة لسجل الطلبات" : "Back to Orders"}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isRTL ? "العودة لجميع الطلبات" : "Back to all orders"}</span>
          </Link>
        </div>

        {/* Receipt Container */}
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-card space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  {isRTL ? "فاتورة طلب سوبرماركت" : "Supermarket Receipt"}
                </span>
                <span className="text-xs bg-primary-light text-primary font-extrabold px-2.5 py-0.5 rounded-full">
                  {order.status}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground font-mono">
                {order.orderNumber}
              </h1>
              <p className="text-xs text-muted mt-1">
                {new Date(order.createdAt).toLocaleString(locale === "ar" ? "ar-JO" : "en-US")}
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-muted-bg text-foreground hover:bg-border text-xs font-bold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{isRTL ? "طباعة الفاتورة" : "Print Receipt"}</span>
            </button>
          </div>

          {/* Delivery & Customer Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#FAFBF9] border border-border text-xs">
            <div className="space-y-2">
              <h4 className="font-black text-foreground flex items-center gap-1.5 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{isRTL ? "عنوان التوصيل بالزرقاء" : "Delivery Address"}</span>
              </h4>
              <p className="font-bold text-foreground">{order.customerName}</p>
              <p className="text-muted">{order.area}</p>
              <p className="text-muted">{order.streetAddress}</p>
              {order.deliveryNotes && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  {order.deliveryNotes}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-foreground flex items-center gap-1.5 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>{isRTL ? "الاتصال والدفع" : "Contact & Payment"}</span>
              </h4>
              <p className="text-muted">
                {isRTL ? "هاتف المستلم:" : "Recipient phone:"}{" "}
                <strong className="text-foreground font-mono" dir="ltr">{order.customerPhone}</strong>
              </p>
              <p className="text-muted">
                {isRTL ? "طريقة الدفع:" : "Payment method:"}{" "}
                <strong className="text-foreground">
                  {order.paymentMethod === "cash_on_delivery" ? t("cashOnDelivery") : t("clicPay")}
                </strong>
              </p>
              <div className="pt-1 flex items-center gap-1 text-primary font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isRTL ? "متابعة من فرع الزرقاء الجديدة" : "Dispatched from New Zarqa Branch"}</span>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <h3 className="font-black text-foreground text-base mb-4">
              {isRTL ? "الأصناف والمشتريات" : "Purchased Items"}
            </h3>
            <div className="divide-y divide-border/60">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.nameAr}
                      className="w-12 h-12 rounded-xl object-cover bg-muted-bg border border-border flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-foreground">
                        {isRTL ? item.product.nameAr : item.product.nameEn}
                      </h4>
                      <p className="text-muted text-[11px]">
                        {item.product.brand} • {item.product.size}
                      </p>
                    </div>
                  </div>

                  <div className="text-end">
                    <span className="font-black text-primary text-sm font-sans block">
                      {formatPrice(item.unitPrice * item.quantity, locale)}
                    </span>
                    <span className="text-[11px] text-muted font-sans">
                      {item.quantity} × {formatPrice(item.unitPrice, locale)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="pt-6 border-t border-border flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-muted">
                <span>{t("subtotal")}</span>
                <span className="font-bold text-foreground font-sans">{formatPrice(order.subtotal, locale)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>{t("deliveryFee")}</span>
                <span className="font-bold text-foreground font-sans">
                  {order.deliveryFee === 0 ? (isRTL ? "مجاني" : "FREE") : formatPrice(order.deliveryFee, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between text-base font-black text-foreground">
                <span>{t("total")}</span>
                <span className="text-primary font-sans">{formatPrice(order.total, locale)}</span>
              </div>
            </div>
          </div>

          {/* Need help note */}
          <div className="p-4 rounded-2xl bg-cream border border-border text-center text-xs text-muted">
            <p>
              {isRTL
                ? "لأي استفسار بخصوص هذا الطلب، يرجى التواصل هاتفياً أو عبر واتساب مع المتجر على الرقم:"
                : "For any inquiries regarding this order, please reach our store hotline at:"}{" "}
              <strong className="text-primary font-bold font-mono" dir="ltr">+962 7 9676 7613</strong>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
