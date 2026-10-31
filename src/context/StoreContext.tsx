"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS as INITIAL_PRODUCTS } from "@/data/products";
import { Category, CATEGORIES as INITIAL_CATEGORIES } from "@/data/categories";

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  area: string;
  streetAddress: string;
  deliveryNotes?: string;
  paymentMethod: "cash_on_delivery" | "cliq";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "pending" | "confirmed" | "out_for_delivery" | "delivered" | "cancelled";
  createdAt: string;
}

export interface SiteSettings {
  announcementAr: string;
  announcementEn: string;
  phone: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  isStoreOpen: boolean;
  addressAr: string;
  addressEn: string;
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: SiteSettings;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  getProductById: (id: string) => Product | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "WOW-8491",
    customerName: "عمر خالد الزواهرة",
    customerPhone: "0796767613",
    customerEmail: "omar@zarqa.jo",
    area: "الزرقاء الجديدة - شارع الكرامة",
    streetAddress: "بناية 12، بجانب مسجد عمر بن الخطاب",
    deliveryNotes: "الرجاء الاتصال قبل الوصول",
    paymentMethod: "cash_on_delivery",
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        unitPrice: 2.500
      },
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 1,
        unitPrice: 2.100
      }
    ],
    subtotal: 7.100,
    deliveryFee: 1.000,
    total: 8.100,
    status: "delivered",
    createdAt: "2026-10-30T14:20:00Z"
  },
  {
    id: "ord-102",
    orderNumber: "WOW-8492",
    customerName: "سارة محمود",
    customerPhone: "0788991122",
    area: "مدينة الشرق",
    streetAddress: "عمارة الياسمين، الطابق 2، شقة 4",
    paymentMethod: "cliq",
    items: [
      {
        product: INITIAL_PRODUCTS[7],
        quantity: 1,
        unitPrice: 3.250
      },
      {
        product: INITIAL_PRODUCTS[14],
        quantity: 2,
        unitPrice: 0.650
      }
    ],
    subtotal: 4.550,
    deliveryFee: 1.000,
    total: 5.550,
    status: "out_for_delivery",
    createdAt: "2026-10-31T11:15:00Z"
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [settings, setSettings] = useState<SiteSettings>({
    announcementAr: "🚚 تسوّق احتياجاتك اليومية — التوصيل السريع للزرقاء الجديدة ومدينة الشرق (من 8:00 ص حتى 11:55 م)",
    announcementEn: "🚚 Daily Essentials Delivery — Fast delivery in New Zarqa & Madinat Al Sharq (8:00 AM – 11:55 PM)",
    phone: "+962 7 9676 7613",
    deliveryFee: 1.000,
    freeDeliveryThreshold: 20.000,
    isStoreOpen: true,
    addressAr: "الزرقاء الجديدة، مدينة الشرق، شارع الكرامة، الزرقاء، الأردن",
    addressEn: "New Zarqa, Madinat Al Sharq, Al-Karama St, Zarqa, Jordan",
  });

  // Load products & orders from localStorage if present
  useEffect(() => {
    try {
      const savedProds = localStorage.getItem("wow_products");
      if (savedProds) setProducts(JSON.parse(savedProds));

      const savedOrders = localStorage.getItem("wow_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedSettings = localStorage.getItem("wow_settings");
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addProduct = (prodData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("wow_products", JSON.stringify(updated));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    localStorage.setItem("wow_products", JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("wow_products", JSON.stringify(updated));
  };

  const placeOrder = (
    orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">
  ): Order => {
    const orderNum = `WOW-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem("wow_orders", JSON.stringify(updated));
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem("wow_orders", JSON.stringify(updated));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("wow_settings", JSON.stringify(updated));
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        settings,
        quickViewProduct,
        openQuickView: (product: Product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        addProduct,
        updateProduct,
        deleteProduct,
        placeOrder,
        updateOrderStatus,
        updateSettings,
        getProductById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
