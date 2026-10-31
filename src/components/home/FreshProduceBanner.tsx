"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export function FreshProduceBanner() {
  const { isRTL } = useLanguage();

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#105B34] to-[#168447] text-white p-8 sm:p-12 lg:p-16 shadow-card">
          
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-primary-accent text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRTL ? "جودة طازجة كل صباح" : "Fresh Farm Harvest Daily"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {isRTL
                ? "خضار، فواكه، وألبان بلدية مختارة حبة حبة"
                : "Handpicked Fruits, Vegetables & Fresh Baladi Dairy"}
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {isRTL
                ? "نفرز الخضار والفواكه يومياً من مزارع الأردن الطيبة لنضمن وصولها إلى مطبخك طازجة وكأنك اخترتها بنفسك من رفوف المتجر."
                : "Inspected daily from local Jordan Valley farms and certified dairies to guarantee freshness right on your family dining table."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2 text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-accent" />
                <span>{isRTL ? "خيار وبندورة بلدية" : "Local Baladi Produce"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-accent" />
                <span>{isRTL ? "بيض مائدة طازج" : "Fresh Table Eggs"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-accent" />
                <span>{isRTL ? "خبز ساخن يومياً" : "Daily Hot Bakery"}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/category/fruits-and-vegetables"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-primary font-black text-sm hover:bg-cream transition-all shadow-md"
              >
                <span>{isRTL ? "تصفح قسم الخضار والفواكه" : "Explore Fresh Produce"}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>

          {/* Decorative imagery overlay */}
          <div className="hidden lg:block absolute -end-10 -bottom-10 w-96 h-96 opacity-40 mix-blend-luminosity pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
              alt="Fresh vegetables and fruits"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
