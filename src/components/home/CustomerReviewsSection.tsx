"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { REVIEWS, STORE_STATS } from "@/data/reviews";
import { Star, ExternalLink, ShieldCheck } from "lucide-react";

export function CustomerReviewsSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{isRTL ? "ثقة مجتمع الزرقاء" : "Community Trust"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              {t("reviewsTitle")}
            </h2>
            <p className="text-sm text-muted mt-1 max-w-xl">
              {t("reviewsSubtitle")}
            </p>
          </div>

          {/* Rating Summary Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={STORE_STATS.googleMaps.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-white border border-border px-4 py-2.5 rounded-2xl shadow-subtle hover:border-primary/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
                ★
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-foreground text-sm">4.3</span>
                  <span className="text-xs text-muted">/ 5.0</span>
                </div>
                <p className="text-[11px] text-muted">
                  Google Maps ({STORE_STATS.googleMaps.reviewCount.toLocaleString()})
                </p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted" />
            </a>

            <a
              href={STORE_STATS.talabat.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-white border border-border px-4 py-2.5 rounded-2xl shadow-subtle hover:border-primary/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FFF0E6] flex items-center justify-center text-[#FF5A00] font-bold">
                ★
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-foreground text-sm">4.4</span>
                  <span className="text-xs text-muted">/ 5.0</span>
                </div>
                <p className="text-[11px] text-muted">
                  Talabat ({STORE_STATS.talabat.reviewCount})
                </p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted" />
            </a>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 border border-border shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cream border border-border text-muted">
                    {review.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic mb-6">
                  &ldquo;{isRTL ? review.commentAr : review.commentEn}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center text-xs">
                    {review.authorName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-foreground">
                      {review.authorName}
                    </h5>
                    <span className="text-[10px] text-muted">{review.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-primary font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isRTL ? "مشتري موثق" : "Verified"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
