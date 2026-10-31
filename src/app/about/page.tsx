"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { STORE_STATS } from "@/data/reviews";
import {
  Calendar,
  Store,
  MapPin,
  Star,
  ExternalLink,
  ShieldCheck,
  Truck,
  Heart,
  Sparkles,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light text-primary text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRTL ? "قصتنا منذ عام 2017" : "Our Heritage Since 2017"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            {isRTL ? "واو ماركت — سوبرماركت حيكم الحقيقي" : "WoW Market — Your Real Neighborhood Grocer"}
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            {isRTL
              ? "لسنا مستودعاً أو متجراً مظلماً، بل سوبرماركت عائلتكم في الزرقاء الجديدة الذي تعرفونه وتثقون به، والآن يصلكم حتى عتبة الباب."
              : "We are not a warehouse or dark store. We are your real neighborhood supermarket in New Zarqa, now delivering straight to your doorstep."}
          </p>
        </div>

        {/* Main Story Grid */}
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-5">
            <h2 className="text-2xl font-black text-foreground">
              {isRTL ? "من شارع الكرامة إلى قلوب أهالي الزرقاء" : "From Al-Karama Street to the Zarqa Community"}
            </h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {isRTL
                ? "تأسس واو ماركت في عام 2017 كمتجر بقالة عائلي يهدف إلى توفير احتياجات المنزل اليومية بأعلى جودة وأسعار عادلة. عبر السنوات، تطور المتجر بفضل ثقة زبائننا الكرام ليصبح أحد أبرز معالم التسوق في الزرقاء الجديدة ومدينة الشرق."
                : "Founded in 2017 on Al-Karama Street, WoW Market began as a family-run grocery committed to providing quality daily essentials at honest prices. Over the years, it has become a cherished staple of New Zarqa and Madinat Al Sharq."}
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {isRTL
                ? "واليوم، يضم واو ماركت 23 قسماً متكاملاً تشمل الخضار والفواكه الطازجة المفرزة يومياً، الألبان والبيض البلدي، المخبوزات، أشهر العلامات الغذائية، وأقسام المنظفات والعناية الشخصية."
                : "Today, WoW Market features 23 full aisles including fresh daily produce, certified farm dairy and eggs, hot bakery, everyday pantry staples, and household cleaning supplies."}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>{isRTL ? "سجل رسمي موثق" : "Verified Business"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span>{isRTL ? "توصيل للزرقاء الجديدة" : "Local Home Delivery"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{isRTL ? "تقييم 4.3 على خرائط جوجل" : "4.3 Rating on Google"}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-floating border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
                alt="WoW Market Aisle"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Community Ratings Section */}
        <div className="bg-[#FAFBF9] rounded-3xl border border-border p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl font-black text-foreground">
              {isRTL ? "أرقامنا الحقيقية وتقييمات زبائننا" : "Verified Customer Ratings"}
            </h3>
            <p className="text-xs text-muted">
              {isRTL
                ? "بيانات منشورة وموثقة من واقع خرائط جوجل وتطبيق طلبات الأردن"
                : "Verified public figures from Google Maps and Talabat Jordan"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href={STORE_STATS.googleMaps.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-6 rounded-2xl border border-border hover:border-primary/40 transition-colors shadow-subtle flex items-center justify-between group"
            >
              <div>
                <span className="text-xs text-muted font-bold block mb-1">Google Maps</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-foreground">4.3</span>
                  <span className="text-xs text-amber-500">★★★★★</span>
                </div>
                <span className="text-xs text-muted">
                  {STORE_STATS.googleMaps.reviewCount.toLocaleString()} {isRTL ? "مراجعة محلية" : "reviews"}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
            </a>

            <a
              href={STORE_STATS.talabat.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-6 rounded-2xl border border-border hover:border-primary/40 transition-colors shadow-subtle flex items-center justify-between group"
            >
              <div>
                <span className="text-xs text-muted font-bold block mb-1">Talabat</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-foreground">4.4</span>
                  <span className="text-xs text-amber-500">★★★★★</span>
                </div>
                <span className="text-xs text-muted">
                  {STORE_STATS.talabat.reviewCount} {isRTL ? "تقييم زبون" : "ratings"}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-base shadow-md shadow-primary/20 transition-all"
          >
            <span>{isRTL ? "ابدأ التسوق من واو ماركت الآن" : "Start Shopping at WoW Market"}</span>
            {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </Link>
        </div>

      </div>
    </div>
  );
}
