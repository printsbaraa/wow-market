"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { UserPlus, ArrowLeft, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { isRTL } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("الزرقاء الجديدة - شارع الكرامة");
  const [streetAddress, setStreetAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name,
      email,
      phone,
      area,
      streetAddress,
      password,
    });
    router.push("/profile");
  };

  return (
    <div className="py-16 bg-background min-h-[75vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-border shadow-card space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md shadow-primary/20">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-foreground">
              {isRTL ? "إنشاء حساب جديد" : "Create Account"}
            </h1>
            <p className="text-xs text-muted">
              {isRTL ? "انضم لعائلة واو ماركت وسهّل تجربة تسوقك في الزرقاء" : "Join WoW Market for fast local checkout"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isRTL ? "الاسم الكامل" : "Full Name"} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أحمد الخلايلة"
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isRTL ? "رقم الهاتف (أردني)" : "Phone Number"} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0796767613"
                dir="ltr"
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isRTL ? "البريد الإلكتروني" : "Email Address"} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@zarqa.jo"
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isRTL ? "المنطقة / الحي" : "Area"} *
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="الزرقاء الجديدة - شارع الكرامة">الزرقاء الجديدة - شارع الكرامة</option>
                <option value="الزرقاء الجديدة - شارع 36">الزرقاء الجديدة - شارع 36</option>
                <option value="مدينة الشرق">مدينة الشرق</option>
                <option value="حي معصوم">حي معصوم</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isRTL ? "العنوان التفصيلي" : "Street Address"} *
              </label>
              <input
                type="text"
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder={isRTL ? "اسم الشارع، رقم البناية، الطابق" : "Street name, building"}
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isRTL ? "كلمة المرور" : "Password"} *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all mt-4"
            >
              <span>{isRTL ? "تسجيل الحساب" : "Create Account"}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="text-center text-xs text-muted pt-2 border-t border-border">
            <span>{isRTL ? "لديك حساب بالفعل؟" : "Already have an account?"} </span>
            <Link href="/login" className="text-primary font-bold hover:underline">
              {isRTL ? "تسجيل الدخول" : "Sign In"}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
