"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ChevronRight, Clock, CheckCircle2, Truck, XCircle, ArrowLeft, ArrowRight } from "lucide-react";

export default function OrdersPage() {
  const { orders } = useStore();
  const { isRTL, locale, t } = useLanguage();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isRTL ? "تم التسليم بنجاح" : "Delivered"}</span>
          </span>
        );
      case "out_for_delivery":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
            <Truck className="w-3.5 h-3.5" />
            <span>{isRTL ? "مع المندوب للتوصيل" : "Out for Delivery"}</span>
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>{isRTL ? "مؤكد وجارٍ التجهيز" : "Processing"}</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" />
            <span>{isRTL ? "ملغي" : "Cancelled"}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>{isRTL ? "قيد المراجعة" : "Pending Confirmation"}</span>
          </span>
        );
    }
  };

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-primary" />
            <span>{t("navOrders")}</span>
          </h1>
          <p className="text-xs text-muted mt-1">
            {isRTL
              ? "سجل وتتبع طلباتك المباشرة من سوبرماركت واو ماركت"
              : "Track your direct grocery orders from WoW Market"}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-border p-12 text-center max-w-md mx-auto space-y-4 shadow-subtle">
            <div className="w-16 h-16 rounded-3xl bg-muted-bg flex items-center justify-center mx-auto text-muted">
              <ShoppingBag className="w-8 h-8 opacity-30 text-primary" />
            </div>
            <h3 className="text-base font-black text-foreground">
              {isRTL ? "لا توجد طلبات سابقة حتى الآن" : "No orders found"}
            </h3>
            <p className="text-xs text-muted">
              {isRTL
                ? "ابدأ بتسوق الخضار والمواد التموينية وستظهر طلباتك هنا."
                : "Browse our supermarket catalog to place your first order."}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-primary text-white font-bold text-xs"
              >
                <span>{t("startShopping")}</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-border p-5 sm:p-6 shadow-subtle hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-foreground text-sm">
                        {order.orderNumber}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-[11px] text-muted">
                      {new Date(order.createdAt).toLocaleDateString(locale === "ar" ? "ar-JO" : "en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="text-start sm:text-end">
                    <span className="text-xs text-muted block">{t("total")}</span>
                    <span className="text-base font-black text-primary font-sans">
                      {formatPrice(order.total, locale)}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 overflow-x-auto max-w-lg">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <span key={idx} className="bg-muted-bg px-2.5 py-1 rounded-xl text-foreground font-medium truncate max-w-[140px]">
                        {item.quantity}× {isRTL ? item.product.nameAr : item.product.nameEn}
                      </span>
                    ))}
                    {order.items.length > 4 && (
                      <span className="text-muted text-[11px] font-bold">
                        +{order.items.length - 4} {isRTL ? "أخرى" : "more"}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{isRTL ? "عرض تفاصيل الطلب والفاتورة" : "View Order Details"}</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
