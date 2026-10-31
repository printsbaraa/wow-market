"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { STORE_STATS } from "@/data/reviews";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ExternalLink,
  ShieldCheck,
  Heart,
  Truck
} from "lucide-react";

export function Footer() {
  const { t, isRTL } = useLanguage();
  const { categories } = useStore();

  const featuredCats = categories.slice(0, 8);

  return (
    <footer className="bg-[#122318] text-white/90 pt-16 pb-24 lg:pb-12 border-t border-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary-accent flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {isRTL ? "توصيل للزرقاء الجديدة" : "Local New Zarqa Delivery"}
              </h4>
              <p className="text-xs text-white/60">
                {isRTL ? "مباشرة من المتجر إلى باب منزلك" : "Directly from the store to your door"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary-accent flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {isRTL ? "تقييم 4.3 على خرائط جوجل" : "4.3 Rating on Google Maps"}
              </h4>
              <p className="text-xs text-white/60">
                {isRTL ? "أكثر من 2,032 رأي حقيقي وموثق" : "2,032+ verified local reviews"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary-accent flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {isRTL ? "سوبرماركت الحي منذ 2017" : "Neighborhood Store Since 2017"}
              </h4>
              <p className="text-xs text-white/60">
                {isRTL ? "سوبرماركت حقيقي عائلي وموثوق" : "Real community supermarket"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary-accent flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {isRTL ? "ساعات العمل الرسمية" : "Working Hours"}
              </h4>
              <p className="text-xs text-white/60">
                {isRTL ? "يومياً 8:00 ص – 11:55 م" : "Daily 8:00 AM – 11:55 PM"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand & Story */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-xl shadow-md">
                W
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {isRTL ? "واو ماركت | WoW Market" : "WoW Market | واو ماركت"}
                </h3>
                <span className="text-xs text-primary-accent font-medium">
                  {isRTL ? "سوبرماركت حيكم — تأسس عام 2017" : "Your Neighborhood Supermarket — Est. 2017"}
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-md">
              {isRTL
                ? "لسنا مستودعاً أو متجراً مظلماً، نحن سوبرماركت حيكم الحقيقي في الزرقاء الجديدة على شارع الكرامة. نوفر لك كافة مستلزمات الأسرة من خضار وفواكه طازجة، مواد غذائية، ألبان، ومستلزمات منزلية مع خدمة التوصيل السريع."
                : "We are not a warehouse or dark store. We are your trusted neighborhood supermarket on Al-Karama Street in New Zarqa, now delivering fresh produce, pantry essentials, and household goods right to your doorstep."}
            </p>

            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-accent mt-0.5 flex-shrink-0" />
                <span>
                  {isRTL
                    ? "الزرقاء، الزرقاء الجديدة، مدينة الشرق، شارع الكرامة"
                    : "New Zarqa, Madinat Al Sharq, Al-Karama St, Zarqa, Jordan"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-accent flex-shrink-0" />
                <a href="tel:+962796767613" className="hover:text-white transition-colors" dir="ltr">
                  +962 7 9676 7613
                </a>
              </div>
            </div>

            {/* Official Social & Review Channels */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={STORE_STATS.googleMaps.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 rounded-xl border border-white/10 transition-colors"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Google Maps (4.3 ★)</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </a>

              <a
                href={STORE_STATS.talabat.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF5A00]/20 hover:bg-[#FF5A00]/30 text-white text-xs px-3 py-2 rounded-xl border border-[#FF5A00]/30 transition-colors"
              >
                <span>Talabat (4.4 ★)</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </a>

              <a
                href="https://www.facebook.com/Wow.Market1/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-white text-xs px-3 py-2 rounded-xl border border-[#1877F2]/30 transition-colors"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t("footerQuickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t("navHome")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  {t("navShopAll")}
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors">
                  {t("navOffers")}
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  {t("navWishlist")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t("navAbout")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t("navContact")}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-primary-accent/90 hover:text-white transition-colors font-medium">
                  {t("navAdmin")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {isRTL ? "أبرز الأقسام" : "Top Aisles"}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {featuredCats.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors truncate block"
                  >
                    {isRTL ? cat.nameAr : cat.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t("footerCustomerService")}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {isRTL ? "مناطق التغطية والتوصيل" : "Delivery Zones"}
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70">
              <p className="font-semibold text-white mb-1">
                {isRTL ? "خدمة العملاء والطلبات:" : "Customer Assistance:"}
              </p>
              <p className="text-primary-accent font-bold" dir="ltr">
                +962 7 9676 7613
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            {t("footerAllRights")}
          </p>
          <p className="flex items-center gap-1.5">
            <span>{isRTL ? "صنع بكل فخر لأهالي الزرقاء" : "Proudly serving the New Zarqa community"}</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </p>
        </div>

      </div>
    </footer>
  );
}
