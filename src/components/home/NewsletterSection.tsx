"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Check, BellRing } from "lucide-react";

export function NewsletterSection() {
  const { t, isRTL } = useLanguage();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setError(isRTL ? "يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح" : "Please enter a valid email or phone");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmailOrPhone("");
  };

  return (
    <section className="py-16 sm:py-20 bg-cream/70 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-primary/20">
          <BellRing className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          {t("newsletterTitle")}
        </h2>
        <p className="text-sm text-muted mt-2 max-w-lg mx-auto">
          {t("newsletterSubtitle")}
        </p>

        {submitted ? (
          <div className="mt-8 p-4 rounded-2xl bg-primary-light border border-primary/20 max-w-md mx-auto flex items-center justify-center gap-2 text-primary font-bold text-sm">
            <Check className="w-5 h-5" />
            <span>
              {isRTL
                ? "شكراً لاشتراكك! سنوافيك بكل جديد أولاً بأول."
                : "Thank you for subscribing! We'll keep you updated."}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  className="w-full h-12 px-4 rounded-2xl bg-white border border-border text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-7 rounded-2xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm transition-all shadow-md shadow-primary/20"
              >
                {t("newsletterBtn")}
              </button>
            </div>
            {error && <p className="text-xs text-danger mt-2">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
