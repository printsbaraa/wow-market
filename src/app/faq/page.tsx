"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const { isRTL } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qAr: "ما هي مناطق التوصيل المشمولة في الزرقاء؟",
      qEn: "Which areas in Zarqa are covered for delivery?",
      aAr: "نقوم بتوصيل كافة احتياجات البقالة والتموين إلى مناطق الزرقاء الجديدة بالكامل، مدينة الشرق، شارع الكرامة، شارع 36، والمناطق السكنية المحيطة بها.",
      aEn: "We deliver across all of New Zarqa, Madinat Al Sharq, Al-Karama Street, 36th Street, and surrounding neighborhoods."
    },
    {
      qAr: "كم تبلغ أجرة التوصيل؟",
      qEn: "How much is the delivery fee?",
      aAr: "أجرة التوصيل الثابتة داخل الزرقاء الجديدة ومدينة الشرق هي دينار واحد فقط (1.000 د.أ)، والتوصيل مجاني لجميع الطلبات التي تتجاوز قيمتها 20 ديناراً أردنياً.",
      aEn: "Standard flat delivery rate is 1.000 JOD for New Zarqa and Madinat Al Sharq. Orders above 20.000 JOD enjoy free delivery."
    },
    {
      qAr: "ما هي ساعات العمل والتوصيل اليومية؟",
      qEn: "What are your operating and delivery hours?",
      aAr: "نستقبلكم في المتجر ونلبي طلبات التوصيل يومياً من الساعة 8:00 صباحاً وحتى 11:55 مساءً طوال أيام الأسبوع.",
      aEn: "Our store and delivery service operate daily from 8:00 AM to 11:55 PM, seven days a week."
    },
    {
      qAr: "ما هي طرق الدفع المتوفرة عند الاستلام؟",
      qEn: "What payment methods are available?",
      aAr: "يمكنكم الدفع نقداً عند استلام الطلب من المندوب (كاش)، أو الدفع عبر نظام التحويل الفوري كليك (CliQ) عند وصول المندوب لباب منزلك.",
      aEn: "You can pay with Cash on Delivery or via instantaneous Jordan CliQ transfer upon receipt."
    },
    {
      qAr: "كيف أضمن جودة الخضار والفواكه والألبان؟",
      qEn: "How do you guarantee produce and dairy freshness?",
      aAr: "نقوم بفرز الخضار والفواكه يدوياً حبة حبة في الصباح الباكر، وتأتي منتجات الألبان والبيض من مزارع معتمدة ومبردة بدرجات حرارة مثالية حتى وصولها إليكم.",
      aEn: "All produce is hand-inspected each morning, and our dairy products and eggs are chilled at ideal temperatures until delivery."
    },
    {
      qAr: "هل واو ماركت متجر حقيقي أم مستودع سحابي؟",
      qEn: "Is WoW Market a real physical store or a dark store?",
      aAr: "واو ماركت هو سوبرماركت حي حقيقي متكامل تأسس عام 2017 في الزرقاء الجديدة على شارع الكرامة، ويمكنكم دائماً زيارتنا أو الطلب أونلاين.",
      aEn: "WoW Market is a real, physical community supermarket established in 2017 on Al-Karama Street in New Zarqa."
    }
  ];

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-foreground">
            {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>
          <p className="text-sm text-muted">
            {isRTL ? "إجابات عن أكثر الأسئلة تكراراً حول الطلب والتوصيل في واو ماركت" : "Everything you need to know about shopping and delivery"}
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-border shadow-subtle overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 font-extrabold text-foreground text-sm hover:text-primary transition-colors"
                >
                  <span>{isRTL ? faq.qAr : faq.qEn}</span>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-muted leading-relaxed border-t border-border/50">
                    {isRTL ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
