"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Home, Layers, Search, Heart, ShoppingBag } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide on admin route
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border px-3 py-2 shadow-floating">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/" ? "text-primary font-bold" : "text-muted hover:text-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t("navHome")}</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/shop" ? "text-primary font-bold" : "text-muted hover:text-foreground"
          }`}
        >
          <Layers className="w-5 h-5" />
          <span>{t("navCategories")}</span>
        </Link>

        <Link
          href="/search"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/search" ? "text-primary font-bold" : "text-muted hover:text-foreground"
          }`}
        >
          <Search className="w-5 h-5" />
          <span>{t("searchPlaceholder").slice(0, 5)}</span>
        </Link>

        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/wishlist" ? "text-primary font-bold" : "text-muted hover:text-foreground"
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-danger text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>{t("navWishlist")}</span>
        </Link>

        <button
          onClick={openCart}
          className="relative flex flex-col items-center gap-1 text-[11px] font-medium text-primary"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-foreground text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {itemCount}
              </span>
            )}
          </div>
          <span className="font-bold">{t("navCart")}</span>
        </button>
      </div>
    </div>
  );
}
