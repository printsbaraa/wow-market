"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileText } from "lucide-react";

export default function TermsPage() {
  const { isRTL } = useLanguage();

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-card space-y-6 text-foreground">
          
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black">
                {isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
              </h1>
              <p className="text-xs text-muted">
                {isRTL ? "شروط التسوق والطلب — واو ماركت (الزرقاء، الأردن)" : "Terms of service — WoW Market (Zarqa, Jordan)"}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
            <h3 className="font-black text-foreground text-base">
              {isRTL ? "1. طبيعة الطلب والتأكيد" : "1. Order Confirmation"}
            </h3>
            <p>
              {isRTL
                ? "يعد إرسال الطلب عبر الموقع بمثابة طلب شراء يخضع لتأكيد توفر المنتجات في فرع الزرقاء الجديدة. سيقوم المتجر بالتواصل هاتفياً أو عبر رسالة واتساب مع العميل لتأكيد الطلب وتحديد الوقت المقدر لوصول المندوب."
                : "Placing an order online constitutes a purchase request subject to real-time store inventory in New Zarqa. Our team verifies orders prior to dispatch."}
            </p>

            <h3 className="font-black text-foreground text-base pt-2">
              {isRTL ? "2. الأسعار والعملة الرسمية" : "2. Pricing & Currency"}
            </h3>
            <p>
              {isRTL
                ? "جميع الأسعار المعروضة على الموقع هي بالدينار الأردني (د.أ / JOD). نحرص على مطابقة الأسعار المنشورة مع أسعار الرفوف في المتجر."
                : "All prices are listed in Jordanian Dinar (JOD) and reflect genuine in-store shelf pricing."}
            </p>

            <h3 className="font-black text-foreground text-base pt-2">
              {isRTL ? "3. سياسة التبديل والاسترجاع" : "3. Returns & Replacements"}
            </h3>
            <p>
              {isRTL
                ? "يحق للعميل فحص الخضار والفواكه والمواد التموينية عند استلامها من المندوب. في حال وجود أي صنف غير مطابق أو تالف، يتم استبداله فوراً أو خصمه من الفاتورة الإجمالية."
                : "Customers may inspect grocery and produce items upon delivery. Any damaged or incorrect item will be replaced or deducted on the spot."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
