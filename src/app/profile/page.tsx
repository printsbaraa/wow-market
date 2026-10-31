"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { User, MapPin, Phone, Mail, ShoppingBag, Heart, LogOut, Check, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile, isAdmin } = useAuth();
  const { isRTL, t } = useLanguage();
  const { orders } = useStore();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [area, setArea] = useState(user?.area || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold mb-4">{isRTL ? "يرجى تسجيل الدخول أولاً" : "Please log in"}</h2>
        <Link href="/login" className="px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold">
          {isRTL ? "تسجيل الدخول" : "Sign In"}
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, area, streetAddress });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-3xl bg-primary-light text-primary flex items-center justify-center font-black text-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-foreground">{user.name}</h1>
                {isAdmin && (
                  <span className="bg-amber-500/10 text-amber-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-500/20">
                    مدير المتجر
                  </span>
                )}
              </div>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl bg-amber-500/15 text-amber-800 text-xs font-bold hover:bg-amber-500/25 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{t("navAdmin")}</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-muted-bg hover:bg-danger-light text-muted hover:text-danger text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>{isRTL ? "تسجيل الخروج" : "Logout"}</span>
            </button>
          </div>
        </div>

        {/* Quick Tabs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/orders"
            className="bg-white p-5 rounded-3xl border border-border hover:border-primary/40 transition-colors shadow-subtle flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-foreground text-sm">{t("navOrders")}</h4>
              <p className="text-xs text-muted">{orders.length} {isRTL ? "طلب مسجل" : "orders"}</p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white p-5 rounded-3xl border border-border hover:border-primary/40 transition-colors shadow-subtle flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-2xl bg-danger-light text-danger flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-foreground text-sm">{t("navWishlist")}</h4>
              <p className="text-xs text-muted">{isRTL ? "المنتجات المحفوظة" : "Saved items"}</p>
            </div>
          </Link>

          <div className="bg-white p-5 rounded-3xl border border-border shadow-subtle flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-foreground text-sm">{isRTL ? "منطقة التوصيل" : "Delivery Area"}</h4>
              <p className="text-xs text-muted truncate max-w-[140px]">{user.area}</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-subtle">
          <h2 className="text-base font-black text-foreground pb-4 border-b border-border mb-6">
            {isRTL ? "معلومات الحساب والعنوان بالزرقاء" : "Account & Address Details"}
          </h2>

          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  dir="ltr"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {t("area")}
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {t("streetAddress")}
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-xs flex items-center gap-2 shadow-md shadow-primary/20 transition-all"
              >
                {saved ? <Check className="w-4 h-4" /> : null}
                <span>{saved ? (isRTL ? "تم حفظ التعديلات!" : "Saved!") : (isRTL ? "حفظ التعديلات" : "Save Changes")}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
