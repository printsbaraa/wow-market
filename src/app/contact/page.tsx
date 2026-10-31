"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { STORE_STATS } from "@/data/reviews";
import {
  Phone,
  Clock,
  MapPin,
  Mail,
  Send,
  Check,
  ExternalLink,
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {t("navContact")}
          </h1>
          <p className="text-sm text-muted">
            {isRTL
              ? "نحن هنا لخدمتكم يومياً في الزرقاء الجديدة. يسعدنا استقبال اتصالاتكم وملاحظاتكم."
              : "We are here to assist you daily in New Zarqa. Reach out via phone or message."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-3xl p-6 border border-border shadow-subtle flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-sm mb-1">
                  {isRTL ? "هاتف الطلبات وخدمة العملاء" : "Customer Service & Orders"}
                </h3>
                <a
                  href="tel:+962796767613"
                  className="text-primary font-black text-base hover:underline block"
                  dir="ltr"
                >
                  +962 7 9676 7613
                </a>
                <span className="text-[11px] text-muted">
                  {isRTL ? "متاح أيضاً عبر واتساب" : "WhatsApp available"}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-border shadow-subtle flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-sm mb-1">
                  {isRTL ? "ساعات العمل الرسمية" : "Store Operating Hours"}
                </h3>
                <p className="text-foreground font-bold text-sm">
                  {STORE_STATS.workingHoursAr}
                </p>
                <span className="text-[11px] text-muted">
                  {isRTL ? "طيلة أيام الأسبوع بدون انقطاع" : "7 days a week"}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-border shadow-subtle flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-sm mb-1">
                  {isRTL ? "موقع المتجر في الزرقاء" : "Store Address"}
                </h3>
                <p className="text-foreground text-xs leading-relaxed">
                  {STORE_STATS.locationAr}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={STORE_STATS.googleMaps.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{isRTL ? "فتح على خرائط جوجل" : "Open in Google Maps"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-foreground">
                  {isRTL ? "أرسل لنا رسالة أو استفسار" : "Send Us a Message"}
                </h2>
                <p className="text-xs text-muted">
                  {isRTL ? "سيقوم فريق المتجر بمراجعة رسالتك والتواصل معك فوراً" : "Our branch team will get back to you shortly"}
                </p>
              </div>

              {sent ? (
                <div className="p-6 rounded-2xl bg-primary-light border border-primary/20 text-center space-y-2">
                  <Check className="w-8 h-8 text-primary mx-auto" />
                  <h4 className="font-black text-primary text-base">
                    {isRTL ? "تم استلام رسالتك بنجاح!" : "Message Sent Successfully!"}
                  </h4>
                  <p className="text-xs text-foreground/80">
                    {isRTL ? "شكراً لتواصلك مع واو ماركت. سنتصل بك قريباً." : "Thank you for contacting WoW Market."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        {t("fullName")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        {t("phone")} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        dir="ltr"
                        className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      {isRTL ? "نص الرسالة أو الطلب" : "Your Message"} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isRTL ? "اكتب استفسارك، اقتراحك، أو ملاحظتك بخصوص المنتجات والتوصيل..." : "Type your inquiry..."}
                      className="w-full p-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isRTL ? "إرسال الرسالة" : "Send Message"}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
