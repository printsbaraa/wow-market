"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Clock, Truck, ShieldCheck } from "lucide-react";

export function DeliveryZoneSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-cream/50 border-t border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>{isRTL ? "خدمة التوصيل المنزلي" : "Local Home Delivery"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              {t("deliveryTitle")}
            </h2>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {isRTL
                ? "يغطي فريق التوصيل في واو ماركت منطقة الزرقاء الجديدة ومدينة الشرق وأحياء شارع الكرامة ومحيطها. يتم تحضير طلباتكم وتغليفها بعناية من المتجر وإرسالها مباشرة مع مندوبينا المعتمدين."
                : "WoW Market delivery team directly covers New Zarqa, Madinat Al Sharq, Al-Karama Street and surrounding neighborhoods. Every order is freshly handpicked and carefully packaged."}
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-foreground">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>
                  <strong>{isRTL ? "منطقة التغطية المعتمدة:" : "Verified Delivery Zone:"}</strong>{" "}
                  {isRTL ? "الزرقاء الجديدة، مدينة الشرق، شارع الكرامة والمناطق المجاورة" : "New Zarqa, Madinat Al Sharq, Al-Karama St & surrounding areas"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>
                  <strong>{isRTL ? "مواعيد التوصيل:" : "Operating Hours:"}</strong>{" "}
                  {isRTL ? "يومياً من الساعة 8:00 صباحاً وحتى 11:55 مساءً" : "Daily from 8:00 AM to 11:55 PM"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>
                  <strong>{isRTL ? "هاتف التنسيق والطلبات:" : "Order Hotline:"}</strong>{" "}
                  <a href="tel:+962796767613" className="text-primary font-bold hover:underline" dir="ltr">
                    +962 7 9676 7613
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F4F7F5] rounded-3xl p-6 sm:p-8 border border-border text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center mx-auto shadow-md shadow-primary/20">
              <Truck className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-extrabold text-foreground text-lg">
                {isRTL ? "أجرة توصيل رمزية" : "Flat Local Rate"}
              </h3>
              <p className="text-2xl font-black text-primary font-sans mt-1">
                1.000 {isRTL ? "د.أ" : "JOD"}
              </p>
              <p className="text-xs text-muted mt-1">
                {isRTL
                  ? "سعر ثابت للتوصيل في الزرقاء الجديدة، ومجاني للطلبات من 20 دينار وأكثر"
                  : "Flat rate for New Zarqa, free delivery on orders 20+ JOD"}
              </p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-border text-[11px] text-muted flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{isRTL ? "تأكيد الطلب يتم هاتفياً قبل خروج السائق" : "Order is confirmed by phone prior to dispatch"}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
