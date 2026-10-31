"use client";

import React, { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProductCard } from "@/components/product/ProductCard";
import { BRANDS } from "@/data/brands";
import { formatPrice } from "@/lib/utils";
import {
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Sparkles
} from "lucide-react";

export default function ShopPage() {
  const { products, categories } = useStore();
  const { t, isRTL, locale } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(15);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== "all" && p.categoryId !== selectedCategory) return false;
        if (selectedBrand !== "all" && p.brandId !== selectedBrand) return false;
        if (p.price > maxPrice) return false;
        if (onlyInStock && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "name") return a.nameAr.localeCompare(b.nameAr);
        return 0; // default
      });
  }, [products, selectedCategory, selectedBrand, maxPrice, onlyInStock, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setMaxPrice(15);
    setOnlyInStock(false);
    setSortBy("default");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    maxPrice < 15 ||
    onlyInStock;

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRTL ? "تشكيلة السوبرماركت الكاملة" : "Supermarket Catalog"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {t("navShopAll")}
          </h1>
          <p className="text-sm text-muted mt-1">
            {isRTL
              ? "تسوق أكثر من 23 قسماً غذائياً واستهلاكياً بأسعار السوق العادلة والتوصيل للزرقاء الجديدة"
              : "Browse 23 aisles of fresh groceries, pantry staples, and household essentials"}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar (React Bits Pro ecommerce-2 discipline) */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-border shadow-subtle space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2 font-black text-foreground text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>{isRTL ? "تصفية المنتجات" : "Filters"}</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t("clearFilters")}</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
                  {t("filterByCategory")}
                </h4>
                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-start px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedCategory === "all"
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-muted-bg"
                    }`}
                  >
                    {isRTL ? "جميع الأقسام" : "All Categories"} ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-start px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? "bg-primary text-white font-bold"
                          : "text-foreground hover:bg-muted-bg"
                      }`}
                    >
                      <span className="truncate">{isRTL ? cat.nameAr : cat.nameEn}</span>
                      <span className="text-[10px] opacity-75">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="pt-4 border-t border-border">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
                  {t("filterByBrand")}
                </h4>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedBrand("all")}
                    className={`w-full text-start px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedBrand === "all"
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-muted-bg"
                    }`}
                  >
                    {isRTL ? "جميع الماركات" : "All Brands"}
                  </button>
                  {BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`w-full text-start px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        selectedBrand === brand.id
                          ? "bg-primary text-white font-bold"
                          : "text-foreground hover:bg-muted-bg"
                      }`}
                    >
                      {brand.name} ({isRTL ? brand.nameAr : brand.country})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-muted">
                    {t("filterByPrice")}
                  </h4>
                  <span className="text-xs font-black text-primary font-sans">
                    {formatPrice(maxPrice, locale)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15"
                  step="0.25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-4 border-t border-border">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-foreground">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <span>{isRTL ? "المتوفر في المخزن فقط" : "In Stock Only"}</span>
                </label>
              </div>

            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            
            {/* Top Toolbar (Sort & Mobile Filter Trigger) */}
            <div className="bg-white rounded-2xl border border-border p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-subtle">
              <div className="text-xs text-muted font-medium">
                {t("showingProducts")}{" "}
                <strong className="text-foreground font-black">{filteredProducts.length}</strong>{" "}
                {t("of")} {products.length} {t("products")}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted-bg text-foreground text-xs font-bold border border-border"
                >
                  <Filter className="w-3.5 h-3.5 text-primary" />
                  <span>{isRTL ? "فلاتر" : "Filters"}</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-muted hidden sm:inline">{t("sortBy")}:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-muted-bg text-foreground font-bold text-xs rounded-xl px-3 py-1.5 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="default">{t("sortDefault")}</option>
                    <option value="price-asc">{t("sortPriceLowHigh")}</option>
                    <option value="price-desc">{t("sortPriceHighLow")}</option>
                    <option value="rating">{t("sortBestRating")}</option>
                    <option value="name">{t("sortNameAZ")}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-border p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-muted-bg flex items-center justify-center mx-auto text-muted">
                  <Search className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-base font-extrabold text-foreground">
                  {isRTL ? "لم يتم العثور على منتجات مطابقة" : "No matching products found"}
                </h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  {isRTL
                    ? "جرّب تغيير خيارات التصفية أو زيادة نطاق السعر للعثور على ما تبحث عنه."
                    : "Try adjusting your filter options or price range to find products."}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all"
                >
                  {t("clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-y-auto">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative min-h-screen flex items-end">
            <div className="w-full bg-white rounded-t-3xl p-6 space-y-6 shadow-floating z-10 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-black text-foreground text-base">
                  {isRTL ? "تصفية المنتجات" : "Filters"}
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-muted hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div>
                <h4 className="text-xs font-bold text-muted mb-2">{t("filterByCategory")}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`p-2 text-xs rounded-xl font-bold ${
                      selectedCategory === "all" ? "bg-primary text-white" : "bg-muted-bg text-foreground"
                    }`}
                  >
                    {isRTL ? "الكل" : "All"}
                  </button>
                  {categories.slice(0, 10).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 text-xs rounded-xl font-medium truncate ${
                        selectedCategory === cat.id ? "bg-primary text-white font-bold" : "bg-muted-bg text-foreground"
                      }`}
                    >
                      {isRTL ? cat.nameAr : cat.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold text-muted">{t("filterByPrice")}</span>
                  <span className="font-black text-primary font-sans">{formatPrice(maxPrice, locale)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15"
                  step="0.25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-2xl bg-primary text-white font-black text-sm"
                >
                  {isRTL ? "عرض النتائج" : "Show Results"} ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
