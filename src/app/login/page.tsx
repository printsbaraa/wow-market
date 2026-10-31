"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, User, Lock, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { isRTL } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (email === "admin@wowmarket.net") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } else {
      setError(res.error || "خطأ في تسجيل الدخول");
    }
  };

  const fillDemoAdmin = () => {
    setEmail("admin@wowmarket.net");
    setPassword("admin123");
  };

  const fillDemoCustomer = () => {
    setEmail("customer@zarqa.jo");
    setPassword("123456");
  };

  return (
    <div className="py-16 bg-background min-h-[75vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-border shadow-card space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md shadow-primary/20">
              <User className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-foreground">
              {isRTL ? "تسجيل الدخول" : "Sign In"}
            </h1>
            <p className="text-xs text-muted">
              {isRTL ? "سجّل دخولك لمتابعة طلباتك أو إدارة المتجر" : "Access your account and order history"}
            </p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="bg-cream p-3 rounded-2xl border border-border space-y-2 text-xs">
            <span className="font-bold text-foreground block text-center">
              {isRTL ? "⚡ تجربة سريعة بنقرة واحدة:" : "⚡ Quick Demo Access:"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="py-1.5 px-2 bg-amber-500/15 text-amber-800 rounded-xl font-bold hover:bg-amber-500/25 transition-colors border border-amber-500/20 text-center"
              >
                {isRTL ? "دخول كمدير متجر" : "Store Admin Demo"}
              </button>
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="py-1.5 px-2 bg-primary-light text-primary rounded-xl font-bold hover:bg-primary-light/80 transition-colors border border-primary/20 text-center"
              >
                {isRTL ? "دخول كعميل زرقاء" : "Zarqa Customer Demo"}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-danger-light text-danger text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {isRTL ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@zarqa.jo"
                className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {isRTL ? "كلمة المرور" : "Password"}
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
              disabled={loading}
              className="w-full h-12 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all disabled:opacity-50"
            >
              <span>{loading ? "..." : (isRTL ? "دخول" : "Sign In")}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="text-center text-xs text-muted pt-2 border-t border-border">
            <span>{isRTL ? "ليس لديك حساب؟" : "Don't have an account?"} </span>
            <Link href="/register" className="text-primary font-bold hover:underline">
              {isRTL ? "إنشاء حساب جديد" : "Register now"}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
