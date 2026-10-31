"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useStore, Order } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Search,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Eye,
  Upload,
  Link as LinkIcon,
  X,
  Image as ImageIcon
} from "lucide-react";

export default function AdminPage() {
  const { user, isAdmin, login } = useAuth();
  const {
    products,
    categories,
    orders,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateSettings,
  } = useStore();
  const { isRTL, locale } = useLanguage();

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "categories" | "settings">("overview");
  
  // Product management modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState("");

  // Product Form state
  const [prodNameAr, setProdNameAr] = useState("");
  const [prodNameEn, setProdNameEn] = useState("");
  const [prodBrand, setProdBrand] = useState("American Garden");
  const [prodCategory, setProdCategory] = useState("appetizers");
  const [prodSize, setProdSize] = useState("500g");
  const [prodPrice, setProdPrice] = useState("2.500");
  const [prodStock, setProdStock] = useState("50");
  const [prodImage, setProdImage] = useState("https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=700&q=80");
  const [prodDescAr, setProdDescAr] = useState("منتج عالي الجودة متوفر في واو ماركت الزرقاء الجديدة.");
  const [prodDescEn, setProdDescEn] = useState("High quality grocery product available at WoW Market.");
  const [prodFeatured, setProdFeatured] = useState(true);
  const [imageMode, setImageMode] = useState<"file" | "url">("file");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert(isRTL ? "يرجى اختيار صورة بنمط JPG أو PNG أو WebP" : "Please select a JPG, PNG, or WebP image");
        return;
      }
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProdImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Settings form
  const [announcementAr, setAnnouncementAr] = useState(settings.announcementAr);
  const [announcementEn, setAnnouncementEn] = useState(settings.announcementEn);
  const [deliveryFeeVal, setDeliveryFeeVal] = useState(settings.deliveryFee.toString());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const completedOrdersCount = orders.filter((o) => o.status === "delivered").length;
  const lowStockCount = products.filter((p) => p.stockCount <= 20).length;

  // Gatekeeper: if not admin
  if (!isAdmin) {
    return (
      <div className="py-20 bg-background min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center space-y-6 bg-white p-8 rounded-3xl border border-border shadow-card">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {isRTL ? "لوحة الإدارة مقفلة" : "Admin Panel Access"}
            </h1>
            <p className="text-xs text-muted mt-1.5 leading-relaxed">
              {isRTL
                ? "هذه الصفحة مخصصة لمدير متجر واو ماركت. يمكنك تسجيل الدخول باستخدام الحساب التجريبي المخصص للإدارة."
                : "This panel is restricted to store administrators. Use demo admin credentials to enter."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-border text-xs text-start space-y-1">
            <p className="text-muted">البريد: <strong className="text-foreground font-mono">admin@wowmarket.net</strong></p>
            <p className="text-muted">كلمة المرور: <strong className="text-foreground font-mono">admin123</strong></p>
          </div>

          <button
            onClick={() => login("admin@wowmarket.net", "admin123")}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{isRTL ? "تسجيل الدخول الفوري كمدير متجر" : "One-Click Admin Login"}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  // Open edit modal
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProdNameAr(p.nameAr);
    setProdNameEn(p.nameEn);
    setProdBrand(p.brand);
    setProdCategory(p.categoryId);
    setProdSize(p.size);
    setProdPrice(p.price.toString());
    setProdStock(p.stockCount.toString());
    setProdImage(p.image);
    if (p.image && p.image.startsWith("data:")) {
      setImageMode("file");
      setUploadedFileName("صورة مرفوعة (JPG/PNG)");
    } else {
      setImageMode("url");
      setUploadedFileName("");
    }
    setProdDescAr(p.descriptionAr);
    setProdDescEn(p.descriptionEn);
    setProdFeatured(!!p.isFeatured);
    setIsAddModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProdNameAr("");
    setProdNameEn("");
    setProdBrand("American Garden");
    setProdCategory("appetizers");
    setProdSize("500g");
    setProdPrice("2.500");
    setProdStock("50");
    setProdImage("https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=700&q=80");
    setImageMode("file");
    setUploadedFileName("");
    setProdDescAr("منتج عالي الجودة متوفر في واو ماركت الزرقاء الجديدة.");
    setProdDescEn("High quality grocery product available at WoW Market.");
    setProdFeatured(false);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        nameAr: prodNameAr,
        nameEn: prodNameEn,
        brand: prodBrand,
        categoryId: prodCategory,
        size: prodSize,
        price: parseFloat(prodPrice),
        stockCount: parseInt(prodStock),
        image: prodImage,
        descriptionAr: prodDescAr,
        descriptionEn: prodDescEn,
        isFeatured: prodFeatured,
      });
    } else {
      addProduct({
        nameAr: prodNameAr,
        nameEn: prodNameEn,
        brand: prodBrand,
        brandId: prodBrand.toLowerCase().replace(/\s+/g, "-"),
        categoryId: prodCategory,
        categorySlug: prodCategory,
        subcategoryId: "general",
        size: prodSize,
        price: parseFloat(prodPrice),
        inStock: true,
        stockCount: parseInt(prodStock),
        rating: 5.0,
        reviewCount: 1,
        descriptionAr: prodDescAr,
        descriptionEn: prodDescEn,
        image: prodImage,
        isFeatured: prodFeatured,
        origin: "Jordan",
      });
    }
    setIsAddModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      announcementAr,
      announcementEn,
      deliveryFee: parseFloat(deliveryFeeVal) || 1.0,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 1500);
  };

  const filteredAdminProducts = products.filter(
    (p) =>
      p.nameAr.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-subtle">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl font-black text-foreground">
                {isRTL ? "لوحة الإدارة — واو ماركت" : "Store Admin Dashboard — WoW Market"}
              </h1>
            </div>
            <p className="text-xs text-muted mt-1">
              {isRTL ? "التحكم في المنتجات، الطلبات، المخزون، والأسعار في فرع الزرقاء الجديدة" : "Control products, orders, inventory and prices for New Zarqa branch"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-muted-bg text-foreground text-xs font-bold hover:bg-border transition-colors"
            >
              {isRTL ? "معاينة المتجر كزبون" : "Storefront Preview"}
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border text-xs sm:text-sm font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-muted hover:text-foreground border border-border"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{isRTL ? "نظرة عامة ومؤشرات" : "Overview & Metrics"}</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap ${
              activeTab === "products"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-muted hover:text-foreground border border-border"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{isRTL ? "إدارة المنتجات" : "Products"} ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-muted hover:text-foreground border border-border"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isRTL ? "إدارة الطلبات" : "Orders"} ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-muted hover:text-foreground border border-border"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isRTL ? "الأقسام والماركات" : "Categories & Brands"} (23)</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-muted hover:text-foreground border border-border"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isRTL ? "إعدادات المتجر والتوصيل" : "Store Settings"}</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-3xl border border-border shadow-subtle">
                <span className="text-xs text-muted block mb-1 font-bold">{isRTL ? "إجمالي المبيعات" : "Total Revenue"}</span>
                <span className="text-2xl font-black text-primary font-sans">{formatPrice(totalRevenue, locale)}</span>
                <span className="text-[11px] text-muted block mt-1">{orders.length} {isRTL ? "طلب مسجل" : "orders"}</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-border shadow-subtle">
                <span className="text-xs text-muted block mb-1 font-bold">{isRTL ? "طلبات قيد المتابعة" : "Pending Orders"}</span>
                <span className="text-2xl font-black text-amber-600 font-sans">{pendingOrdersCount}</span>
                <span className="text-[11px] text-muted block mt-1">{isRTL ? "بانتظار التأكيد أو التوصيل" : "Needs dispatch"}</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-border shadow-subtle">
                <span className="text-xs text-muted block mb-1 font-bold">{isRTL ? "إجمالي المنتجات" : "Total Products"}</span>
                <span className="text-2xl font-black text-foreground font-sans">{products.length}</span>
                <span className="text-[11px] text-muted block mt-1">23 {isRTL ? "قسماً متكاملاً" : "aisles"}</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-border shadow-subtle">
                <span className="text-xs text-muted block mb-1 font-bold">{isRTL ? "تنبيه المخزون المنخفض" : "Low Stock Alerts"}</span>
                <span className="text-2xl font-black text-danger font-sans">{lowStockCount}</span>
                <span className="text-[11px] text-muted block mt-1">{isRTL ? "أقل من 20 قطعة" : "Below 20 units"}</span>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-black text-foreground text-base">
                  {isRTL ? "أحدث الطلبات الواردة" : "Latest Incoming Orders"}
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  {isRTL ? "عرض كل الطلبات" : "View All"}
                </button>
              </div>

              <div className="divide-y divide-border/60">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-foreground">{order.orderNumber}</span>
                        <span className="text-muted">• {order.customerName}</span>
                      </div>
                      <span className="text-[11px] text-muted">{order.area} — {order.items.length} {isRTL ? "صنف" : "items"}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-black text-primary font-sans">{formatPrice(order.total, locale)}</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                        className="bg-muted-bg text-foreground font-bold text-[11px] rounded-lg px-2 py-1 border border-border"
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="confirmed">تم التأكيد</option>
                        <option value="out_for_delivery">مع المندوب</option>
                        <option value="delivered">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === "products" && (
          <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={isRTL ? "بحث في المنتجات بالاسم أو الماركة..." : "Search products..."}
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full h-11 pr-10 pl-10 rounded-2xl bg-muted-bg border border-border text-xs focus:outline-none"
                />
                <Search className={`w-4 h-4 text-muted absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-3.5" : "left-3.5"}`} />
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{isRTL ? "إضافة منتج جديد" : "Add Product"}</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-border text-muted font-bold text-[11px] uppercase tracking-wider">
                    <th className="pb-3 text-start">المنتج</th>
                    <th className="pb-3 text-start">الماركة</th>
                    <th className="pb-3 text-start">السعر (د.أ)</th>
                    <th className="pb-3 text-start">المخزون</th>
                    <th className="pb-3 text-start">مميز</th>
                    <th className="pb-3 text-end">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-muted-bg/50">
                      <td className="py-3 text-start">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.image}
                            alt={p.nameAr}
                            className="w-10 h-10 rounded-xl object-cover border border-border flex-shrink-0"
                          />
                          <div className="truncate max-w-xs">
                            <span className="font-bold text-foreground block truncate">{p.nameAr}</span>
                            <span className="text-[10px] text-muted">{p.size}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 text-start font-medium text-foreground">{p.brand}</td>
                      <td className="py-3 text-start font-black text-primary font-sans">{formatPrice(p.price, locale)}</td>
                      <td className="py-3 text-start">
                        <span className={`font-mono font-bold ${p.stockCount <= 20 ? "text-danger" : "text-foreground"}`}>
                          {p.stockCount}
                        </span>
                      </td>
                      <td className="py-3 text-start">
                        {p.isFeatured ? (
                          <span className="text-[10px] bg-primary-light text-primary font-bold px-2 py-0.5 rounded-md">
                            نعم
                          </span>
                        ) : (
                          <span className="text-[10px] text-muted">لا</span>
                        )}
                      </td>
                      <td className="py-3 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-muted-bg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger-light transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGER */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-6">
            <h3 className="font-black text-foreground text-base pb-3 border-b border-border">
              {isRTL ? "طلبات الزبائن في الزرقاء الجديدة" : "Customer Orders"} ({orders.length})
            </h3>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl bg-[#FAFBF9] border border-border space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                    <div>
                      <span className="font-mono font-black text-sm text-foreground">{order.orderNumber}</span>
                      <p className="text-[11px] text-muted">{order.customerName} • {order.customerPhone}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-black text-primary font-sans text-sm">
                        {formatPrice(order.total, locale)}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                        className="bg-white text-foreground font-black text-xs rounded-xl px-3 py-1.5 border border-border shadow-sm"
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="confirmed">تم التأكيد</option>
                        <option value="out_for_delivery">مع المندوب</option>
                        <option value="delivered">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted">
                    <div>
                      <strong>العنوان:</strong> {order.area} — {order.streetAddress}
                    </div>
                    <div>
                      <strong>طريقة الدفع:</strong> {order.paymentMethod === "cash_on_delivery" ? "كاش عند الاستلام" : "كليك (CliQ)"}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {order.items.map((i, idx) => (
                      <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-border text-[11px]">
                        {i.quantity}× {i.product.nameAr}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORIES & BRANDS */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-subtle space-y-4">
              <h3 className="font-black text-foreground text-base pb-3 border-b border-border">
                {isRTL ? "أقسام المتجر المعتمدة (23 قسماً)" : "Store Aisles (23)"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categories.map((c) => (
                  <div key={c.id} className="p-3 rounded-2xl bg-muted-bg/60 border border-border flex items-center gap-2.5">
                    <img src={c.image} alt={c.nameAr} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="truncate">
                      <span className="font-bold text-foreground text-xs block truncate">{c.nameAr}</span>
                      <span className="text-[10px] text-muted">{c.itemCount} منتج</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STORE & DELIVERY SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl border border-border p-8 shadow-subtle max-w-2xl space-y-6">
            <h3 className="font-black text-foreground text-base pb-3 border-b border-border">
              {isRTL ? "إعدادات المتجر والشريط الإعلاني" : "Store & Delivery Configuration"}
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">
                  نص الإعلان العلوي (بالعربية)
                </label>
                <input
                  type="text"
                  value={announcementAr}
                  onChange={(e) => setAnnouncementAr(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  Top Announcement (English)
                </label>
                <input
                  type="text"
                  value={announcementEn}
                  onChange={(e) => setAnnouncementEn(e.target.value)}
                  dir="ltr"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">
                    أجرة التوصيل للزرقاء الجديدة (د.أ)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={deliveryFeeVal}
                    onChange={(e) => setDeliveryFeeVal(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-muted-bg border border-border focus:outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">
                    هاتف الفرع
                  </label>
                  <input
                    type="text"
                    disabled
                    value={settings.phone}
                    className="w-full h-11 px-3.5 rounded-xl bg-muted-bg/50 border border-border text-muted font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  {settingsSaved ? <CheckCircle2 className="w-4 h-4" /> : null}
                  <span>{settingsSaved ? "تم الحفظ بنجاح!" : "حفظ التعديلات"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-border z-10 space-y-4">
              <h3 className="font-black text-foreground text-base pb-3 border-b border-border">
                {editingProduct ? "تعديل بيانات المنتج" : "إضافة منتج جديد للسوبرماركت"}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">الاسم بالعربية *</label>
                    <input
                      type="text"
                      required
                      value={prodNameAr}
                      onChange={(e) => setProdNameAr(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted-bg border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Name in English *</label>
                    <input
                      type="text"
                      required
                      value={prodNameEn}
                      onChange={(e) => setProdNameEn(e.target.value)}
                      dir="ltr"
                      className="w-full h-10 px-3 rounded-xl bg-muted-bg border border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold mb-1">الماركة *</label>
                    <input
                      type="text"
                      required
                      value={prodBrand}
                      onChange={(e) => setProdBrand(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted-bg border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">الحجم / الوزن *</label>
                    <input
                      type="text"
                      required
                      value={prodSize}
                      onChange={(e) => setProdSize(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted-bg border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">السعر بالدينار *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted-bg border border-border font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">القسم</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted-bg border border-border"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.nameAr}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">كمية المخزون</label>
                    <input
                      type="number"
                      value={prodStock}
                      onChange={(e) => setProdStock(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted-bg border border-border font-sans"
                    />
                  </div>
                </div>

                {/* Dual Image Selection Section (File Upload JPG/PNG OR URL) */}
                <div className="space-y-2.5 pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-foreground">
                      {isRTL ? "صورة المنتج *" : "Product Image *"}
                    </label>

                    {/* Toggle Selector */}
                    <div className="flex items-center gap-1 bg-muted-bg p-1 rounded-xl border border-border">
                      <button
                        type="button"
                        onClick={() => setImageMode("file")}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                          imageMode === "file"
                            ? "bg-primary text-white shadow-sm"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isRTL ? "رفع صورة (JPG / PNG)" : "Upload (JPG/PNG)"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImageMode("url")}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                          imageMode === "url"
                            ? "bg-primary text-white shadow-sm"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>{isRTL ? "رابط إنترنت (URL)" : "Image URL"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Option 1: File Upload JPG/PNG */}
                  {imageMode === "file" ? (
                    <div>
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border hover:border-primary/60 rounded-2xl cursor-pointer bg-muted-bg/40 hover:bg-muted-bg transition-all p-3 text-center">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center space-y-1.5">
                          <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                            <Upload className="w-4 h-4" />
                          </div>
                          <p className="text-xs font-bold text-foreground">
                            {uploadedFileName
                              ? uploadedFileName
                              : (isRTL ? "اضغط لاختيار صورة من جهازك (JPG أو PNG)" : "Click to select JPG or PNG from device")}
                          </p>
                          <span className="text-[10px] text-muted">
                            {isRTL ? "يدعم أنماط JPG, JPEG, PNG, WebP بجودة عالية" : "Supports JPG, JPEG, PNG, WebP"}
                          </span>
                        </div>
                      </label>
                    </div>
                  ) : (
                    /* Option 2: Direct URL Input */
                    <div className="space-y-1">
                      <div className="relative">
                        <input
                          type="url"
                          value={prodImage.startsWith("data:") ? "" : prodImage}
                          onChange={(e) => {
                            setProdImage(e.target.value);
                            setUploadedFileName("");
                          }}
                          placeholder="https://example.com/product.jpg"
                          dir="ltr"
                          className="w-full h-10 px-3 pr-8 rounded-xl bg-muted-bg border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <LinkIcon className="w-3.5 h-3.5 text-muted absolute top-1/2 -translate-y-1/2 right-2.5 pointer-events-none" />
                      </div>
                      <p className="text-[10px] text-muted">
                        {isRTL ? "يمكنك لصق أي رابط صورة مباشر ينتهي بـ jpg أو png" : "Paste any direct image URL"}
                      </p>
                    </div>
                  )}

                  {/* Active Image Live Preview */}
                  {prodImage && (
                    <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-cream/80 border border-border">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-border flex-shrink-0">
                        <img
                          src={prodImage}
                          alt="Product Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=700&q=80";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-start">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-[11px] font-bold text-foreground">
                            {isRTL ? "معاينة الصورة المعتمدة للمنتج" : "Image Preview Active"}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted truncate mt-0.5" dir="ltr">
                          {uploadedFileName || (prodImage.length > 40 ? `${prodImage.slice(0, 40)}...` : prodImage)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setProdImage("");
                          setUploadedFileName("");
                        }}
                        className="p-1 rounded-lg text-muted hover:text-danger hover:bg-danger-light transition-colors"
                        title={isRTL ? "إزالة الصورة" : "Remove"}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={prodFeatured}
                    onChange={(e) => setProdFeatured(e.target.checked)}
                    className="accent-primary"
                  />
                  <label htmlFor="featured" className="font-bold cursor-pointer">
                    عرض المنتج في قسم المنتجات المميزة بالصفحة الرئيسية
                  </label>
                </div>

                <div className="pt-3 flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-muted-bg font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white font-bold"
                  >
                    {editingProduct ? "تحديث المنتج" : "إضافة المنتج"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
