"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  ShieldCheck,
  Percent,
  Layers,
  Phone
} from "lucide-react";

export function Navbar() {
  const { t, isRTL, locale } = useLanguage();
  const { itemCount, subtotal, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();
  const { categories, products } = useStore();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search preview when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const searchResultsPreview = searchQuery.trim().length > 1
    ? products
        .filter((p) =>
          p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border transition-all">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-muted-bg rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-lg tracking-tighter">W</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-accent mb-2"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight font-sans">
                    {isRTL ? "واو ماركت" : "WoW Market"}
                  </span>
                  <span className="text-[10px] font-bold uppercase bg-primary-light text-primary px-1.5 py-0.5 rounded-full">
                    2017
                  </span>
                </div>
                <span className="text-[11px] text-muted font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" />
                  {isRTL ? "الزرقاء الجديدة — شارع الكرامة" : "New Zarqa — Al-Karama St"}
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={t("searchPlaceholder")}
                className="w-full h-11 pr-11 pl-11 rounded-2xl bg-[#F4F7F5] border border-transparent focus:border-primary/40 focus:bg-white text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
              />
              <Search className={`w-4 h-4 text-muted absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"}`} />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-1/2 -translate-y-1/2 p-1 text-muted hover:text-foreground ${isRTL ? "left-3" : "right-3"}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Search Preview Dropdown */}
            {isSearchFocused && searchResultsPreview.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-floating border border-border overflow-hidden z-50">
                <div className="p-2 border-b border-border/60 bg-cream/40 text-xs font-semibold text-muted flex items-center justify-between">
                  <span>{isRTL ? "منتجات مطابقة" : "Matching Products"}</span>
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="text-primary hover:underline"
                  >
                    {t("viewAll")} ({searchResultsPreview.length})
                  </Link>
                </div>
                <div className="divide-y divide-border/50 max-h-80 overflow-y-auto">
                  {searchResultsPreview.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.id}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-3 p-3 hover:bg-muted-bg transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.nameAr}
                        className="w-11 h-11 rounded-xl object-cover bg-white border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {isRTL ? item.nameAr : item.nameEn}
                        </p>
                        <p className="text-xs text-muted flex items-center gap-2">
                          <span>{item.brand}</span>
                          <span>•</span>
                          <span>{item.size}</span>
                        </p>
                      </div>
                      <span className="text-sm font-bold text-primary font-sans">
                        {formatPrice(item.price, locale)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Badge Shortcut */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 text-xs font-bold border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{t("navAdmin")}</span>
              </Link>
            )}

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-2xl text-foreground hover:bg-muted-bg transition-colors"
              title={t("navWishlist")}
            >
              <Heart className="w-5 h-5 text-muted hover:text-danger transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 -right-0.5 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / Login */}
            <Link
              href={user ? "/profile" : "/login"}
              className="p-2.5 rounded-2xl text-foreground hover:bg-muted-bg transition-colors flex items-center gap-2"
              title={user ? user.name : t("navAccount")}
            >
              <User className="w-5 h-5 text-muted hover:text-primary transition-colors" />
              {user && (
                <span className="hidden xl:inline text-xs font-semibold text-foreground truncate max-w-[100px]">
                  {user.name.split(" ")[0]}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-3.5 py-2 sm:py-2.5 rounded-2xl transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-foreground text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-primary">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-sm tracking-tight font-sans">
                {subtotal > 0 ? formatPrice(subtotal, locale) : (isRTL ? "السلة" : "Cart")}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full h-10 pr-10 pl-10 rounded-xl bg-[#F4F7F5] border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className={`w-4 h-4 text-muted absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-3" : "left-3"}`} />
          </form>
        </div>
      </div>

      {/* Sub Navigation Bar (Categories, Quick Links) */}
      <div className="hidden lg:block border-t border-border/60 bg-[#FAFBF9]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 text-sm font-medium">
            
            {/* Category Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors py-2"
              >
                <Layers className="w-4 h-4" />
                <span>{t("allCategories")} (23)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {isCategoryMenuOpen && (
                <div
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                  className="absolute top-full mt-1 w-[720px] bg-white rounded-3xl shadow-floating border border-border p-6 grid grid-cols-3 gap-4 z-50 animate-fadeIn"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-muted-bg transition-colors group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.nameAr}
                        className="w-10 h-10 rounded-xl object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {isRTL ? cat.nameAr : cat.nameEn}
                        </p>
                        <p className="text-[11px] text-muted">
                          {cat.itemCount} {t("products")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Nav Links */}
            <nav className="flex items-center gap-7 text-foreground/80">
              <Link href="/" className="hover:text-primary transition-colors font-semibold">
                {t("navHome")}
              </Link>
              <Link href="/shop" className="hover:text-primary transition-colors">
                {t("navShopAll")}
              </Link>
              <Link href="/offers" className="hover:text-primary text-gold font-semibold flex items-center gap-1.5 transition-colors">
                <Percent className="w-3.5 h-3.5 text-gold" />
                <span>{t("navOffers")}</span>
              </Link>
              <Link href="/category/fruits-and-vegetables" className="hover:text-primary transition-colors">
                {isRTL ? "خضار وفواكه طازجة" : "Fresh Produce"}
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                {t("navAbout")}
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                {t("navContact")}
              </Link>
            </nav>

            {/* Quick Delivery Badge */}
            <div className="flex items-center gap-2 text-xs text-muted font-medium bg-cream px-3 py-1 rounded-full border border-border/60">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{isRTL ? "توصيل حيوي للزرقاء الجديدة" : "Direct New Zarqa Delivery"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-5 shadow-2xl animate-slide-up">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold p-2.5 rounded-xl hover:bg-muted-bg"
            >
              {t("navHome")}
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold p-2.5 rounded-xl hover:bg-muted-bg"
            >
              {t("navShopAll")}
            </Link>
            <Link
              href="/offers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold p-2.5 rounded-xl text-gold hover:bg-muted-bg flex items-center gap-2"
            >
              <Percent className="w-4 h-4" />
              <span>{t("navOffers")}</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold p-2.5 rounded-xl hover:bg-muted-bg"
            >
              {t("navAbout")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold p-2.5 rounded-xl hover:bg-muted-bg"
            >
              {t("navContact")}
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold p-2.5 rounded-xl text-primary bg-primary-light flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t("navAdmin")}</span>
            </Link>
          </nav>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
              {t("allCategories")} (23)
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs p-2 rounded-lg bg-muted-bg hover:bg-primary-light hover:text-primary font-medium truncate"
                >
                  {isRTL ? cat.nameAr : cat.nameEn}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
