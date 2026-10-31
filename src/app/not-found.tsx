"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  const { isRTL, t } = useLanguage();

  return (
    <div className="py-24 bg-background min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center space-y-5">
        <span className="text-6xl font-black text-primary font-mono block">404</span>
        <h1 className="text-2xl font-black text-foreground">
          {isRTL ? "الصفحة المطلوبة غير موجودة" : "Page Not Found"}
        </h1>
        <p className="text-xs text-muted leading-relaxed">
          {isRTL
            ? "يبدو أن الرابط الذي طلبته غير صحيح أو تم نقله. يمكنك العودة للصفحة الرئيسية أو تصفح تشكيلة السوبرماركت."
            : "The page you are looking for does not exist or has been moved."}
        </p>

        <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-xs shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{t("navHome")}</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-muted-bg text-foreground font-bold text-xs border border-border shadow-subtle transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t("navShopAll")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
