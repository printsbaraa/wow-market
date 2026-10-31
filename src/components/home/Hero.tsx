"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { STORE_STATS } from "@/data/reviews";
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  Sparkles,
  ShieldCheck,
  Star,
  MapPin,
  Clock
} from "lucide-react";

export function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7F4] via-[#FAFBF8] to-[#FAFBF8] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-border/50">
      {/* Subtle organic background patterns */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-light/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            
            {/* Heritage Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>{t("heroBadge")}</span>
              <span className="text-muted/60">•</span>
              <span className="text-muted font-normal">{isRTL ? "الزرقاء الجديدة" : "New Zarqa"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.15]">
              {t("heroTitle")}
            </h1>

            {/* Subtitle / Brand Positioning */}
            <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
              {t("heroSubtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-extrabold text-base transition-all shadow-md shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 group"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t("heroShopNow")}</span>
                {isRTL ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>

              <a
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-muted-bg text-foreground font-bold text-base border border-border shadow-subtle transition-colors"
              >
                <span>{t("heroExploreCategories")}</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-border/70 text-xs text-muted">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <p className="font-bold text-foreground">{isRTL ? "توصيل حيوي" : "Direct Delivery"}</p>
                  <p className="text-[11px]">{isRTL ? "الزرقاء الجديدة ومدينة الشرق" : "New Zarqa & Madinat Al Sharq"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <p className="font-bold text-foreground">{isRTL ? "ساعات يومية" : "Daily Hours"}</p>
                  <p className="text-[11px]">{isRTL ? "8:00 ص – 11:55 م" : "8:00 AM – 11:55 PM"}</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-emerald-600" />
                </div>
                <div className="text-start">
                  <p className="font-bold text-foreground">4.3 / 5.0</p>
                  <p className="text-[11px]">{isRTL ? "2,032+ تقييم حقيقي" : "2,032+ Real Reviews"}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Visual Showcase (React Bits Hero composition) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Grocery Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-floating border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
                  alt="WoW Market Fresh Grocery"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-primary-accent font-bold mb-1">
                    {isRTL ? "سوبرماركت الحي الحقيقي" : "Authentic Neighborhood Supermarket"}
                  </span>
                  <p className="text-base sm:text-lg font-black leading-tight">
                    {isRTL ? "لسنا مجرد مستودع أو متجر مظلم، بل متجركم المعروف" : "Not a dark store. Your trusted local grocer."}
                  </p>
                </div>
              </div>

              {/* Floating Product Badge 1 */}
              <div className="absolute -top-4 -start-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-floating border border-border flex items-center gap-3 animate-pulse-subtle">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary font-bold">
                  🌿
                </div>
                <div className="text-xs">
                  <p className="font-bold text-foreground">{isRTL ? "خضار وفواكه طازجة" : "Fresh Farm Produce"}</p>
                  <p className="text-primary font-extrabold">{isRTL ? "فرز يومي صباحي" : "Inspected Daily"}</p>
                </div>
              </div>

              {/* Floating Review Badge 2 */}
              <div className="absolute -bottom-6 -end-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-floating border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-foreground">{isRTL ? "تقييم Google Maps" : "Google Maps Rating"}</p>
                  <p className="text-muted font-medium">4.3 / 5 ★ ({STORE_STATS.googleMaps.reviewCount.toLocaleString()})</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
