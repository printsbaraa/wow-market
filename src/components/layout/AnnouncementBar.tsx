"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { Phone, Clock, Globe } from "lucide-react";

export function AnnouncementBar() {
  const { locale, toggleLocale, isRTL } = useLanguage();
  const { settings } = useStore();

  const announcement = isRTL ? settings.announcementAr : settings.announcementEn;

  return (
    <aside aria-label="Store Announcement" className="bg-primary-dark text-white text-xs sm:text-sm py-2 px-4 transition-colors border-b border-primary-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Message */}
        <div className="flex items-center gap-2 overflow-hidden text-center sm:text-start">
          <span className="inline-block animate-pulse text-primary-accent">●</span>
          <p className="font-medium tracking-wide truncate max-w-xl">
            {announcement}
          </p>
        </div>

        {/* Right: Phone, Hours & Language Toggle */}
        <div className="flex items-center gap-4 text-xs text-primary-100 flex-shrink-0">
          <a
            href={`tel:${settings.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            dir="ltr"
          >
            <Phone className="w-3.5 h-3.5 text-primary-accent" />
            <span>+962 7 9676 7613</span>
          </a>

          <div className="hidden md:flex items-center gap-1.5 text-primary-200">
            <Clock className="w-3.5 h-3.5 text-primary-accent" />
            <span>{isRTL ? "8:00 ص – 11:55 م" : "8:00 AM – 11:55 PM"}</span>
          </div>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded-full transition-all font-medium border border-white/15"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-primary-accent" />
            <span>{locale === "ar" ? "English" : "العربية"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
