"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  const { isRTL } = useLanguage();

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-card space-y-6 text-foreground">
          
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black">
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </h1>
              <p className="text-xs text-muted">
                {isRTL ? "آخر تحديث: أكتوبر 2026 — واو ماركت، الزرقاء، الأردن" : "Last updated: October 2026 — WoW Market, Zarqa, Jordan"}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
            <h3 className="font-black text-foreground text-base">
              {isRTL ? "1. جمع المعلومات واستخدامها" : "1. Information Collection"}
            </h3>
            <p>
              {isRTL
                ? "يلتزم واو ماركت بحماية خصوصية عملائه وزواره في الزرقاء والأردن. لا نجمع سوى البيانات الأساسية الضرورية لإتمام عمليات التوصيل، وتشمل: الاسم، رقم الهاتف الأردني، وعنوان التوصيل التفصيلي في الزرقاء الجديدة ومدينة الشرق."
                : "WoW Market is committed to safeguarding customer privacy. We collect only necessary contact and address details required for local delivery."}
            </p>

            <h3 className="font-black text-foreground text-base pt-2">
              {isRTL ? "2. حماية بيانات الاتصال" : "2. Contact Data Protection"}
            </h3>
            <p>
              {isRTL
                ? "يقتصر استخدام أرقام الهواتف على التواصل المباشر لتأكيد وتنسيق موعد خروج المندوب، ولا يتم بيع أو مشاركة بياناتكم مع أي طرف ثالث لأغراض تسويقية غير مصرح بها."
                : "Phone numbers are strictly utilized to coordinate order dispatch and delivery confirmation with our drivers."}
            </p>

            <h3 className="font-black text-foreground text-base pt-2">
              {isRTL ? "3. أمان المعاملات" : "3. Transaction Security"}
            </h3>
            <p>
              {isRTL
                ? "نظراً لأن الدفع يتم نقداً أو عبر كليك عند الاستلام المباشر، فإننا لا نقوم بتخزين أو طلب أي بيانات بطاقات ائتمانية حساسة على موقعنا."
                : "Because payments occur via Cash on Delivery or Jordanian CliQ upon arrival, no credit card numbers are stored on our servers."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
