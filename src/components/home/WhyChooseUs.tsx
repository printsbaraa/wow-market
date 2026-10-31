"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Calendar,
  Store,
  CheckCircle,
  Truck,
  Sparkles,
  HeartHandshake
} from "lucide-react";

export function WhyChooseUs() {
  const { t, isRTL } = useLanguage();

  const reasons = [
    {
      icon: Calendar,
      titleAr: "في خدمتكم منذ 2017",
      titleEn: "Serving Zarqa Since 2017",
      descAr: "بدأنا كسوبرماركت عائلي على شارع الكرامة ونكبر يومياً بثقة أهالي الزرقاء الجديدة ومدينة الشرق.",
      descEn: "Started as a family supermarket on Al-Karama St, growing daily with community trust.",
    },
    {
      icon: Store,
      titleAr: "سوبرماركت الحي الحقيقي",
      titleEn: "A Real Neighborhood Supermarket",
      descAr: "لسنا مستودعاً مجهولاً أو متجراً مظلماً، بل متجركم الفعلي الذي يمكنكم زيارته أو الطلب منه بكل راحة.",
      descEn: "Not a dark store or anonymous warehouse, but your real local supermarket you can visit and trust.",
    },
    {
      icon: Sparkles,
      titleAr: "خضار وألبان طازجة يومياً",
      titleEn: "Fresh Produce & Dairy Daily",
      descAr: "انتقاء يومي صباحي للفواكه والخضار والبيض والألبان البلدية لضمان أعلى معايير الجودة.",
      descEn: "Fresh morning selection of vegetables, fruits, eggs and local dairy products.",
    },
    {
      icon: Truck,
      titleAr: "توصيل مباشر حتى باب بيتك",
      titleEn: "Direct Doorstep Delivery",
      descAr: "خدمة توصيل سريعة ودقيقة تغطي كافة أحياء الزرقاء الجديدة من 8:00 صباحاً وحتى 11:55 مساءً.",
      descEn: "Fast delivery covering New Zarqa and Madinat Al Sharq from 8:00 AM to 11:55 PM daily.",
    },
    {
      icon: CheckCircle,
      titleAr: "23 قسماً وتنوع شامل",
      titleEn: "23 Complete Aisles & Brands",
      descAr: "أقسام متكاملة تضم أشهر العلامات التجارية المحلية والعالمية (المراعي، العلالي، أمريكان جاردن، فاين، فيري).",
      descEn: "Everything under one roof with trusted brands like Almarai, American Garden, and Al Alali.",
    },
    {
      icon: HeartHandshake,
      titleAr: "تعامل شفاف وأسعار عادلة",
      titleEn: "Transparent Prices & Genuine Care",
      descAr: "أسعار واضحة بالدينار الأردني، ودفع كاش أو كليك عند الاستلام بكل سهولة ومصداقية.",
      descEn: "Honest transparent JOD pricing, with convenient cash or CliQ on delivery options.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light text-primary text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRTL ? "هويتنا وقيمنا" : "Our Heritage & Values"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            {t("whyChooseTitle")}
          </h2>
          <p className="text-sm sm:text-base text-muted mt-2">
            {t("whyChooseSubtitle")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-border hover:border-primary/40 transition-all shadow-subtle hover:shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-5 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-foreground text-base sm:text-lg mb-2">
                    {isRTL ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {isRTL ? item.descAr : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
