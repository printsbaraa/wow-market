"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  area: string;
  streetAddress: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Omit<User, "id" | "role"> & { password: string }) => Promise<{ success: boolean }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wow_user");
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // Default guest customer for seamless local ordering
        const defaultCustomer: User = {
          id: "usr-guest-zarqa",
          name: "عميل واو ماركت الزرقاء",
          email: "customer@zarqa.jo",
          phone: "0796767613",
          role: "customer",
          area: "الزرقاء الجديدة - شارع الكرامة",
          streetAddress: "بناية 14، قرب دوار الطيارة",
        };
        setUser(defaultCustomer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    if (email === "admin@wowmarket.net" && (pass === "admin123" || pass === "admin")) {
      const adminUser: User = {
        id: "usr-admin-1",
        name: "مدير واو ماركت",
        email: "admin@wowmarket.net",
        phone: "+962 7 9676 7613",
        role: "admin",
        area: "الزرقاء الجديدة",
        streetAddress: "الفرع الرئيسي - شارع الكرامة",
      };
      setUser(adminUser);
      localStorage.setItem("wow_user", JSON.stringify(adminUser));
      return { success: true };
    }

    if (email && pass) {
      const normalUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split("@")[0],
        email: email,
        phone: "0791234567",
        role: "customer",
        area: "الزرقاء الجديدة",
        streetAddress: "شارع الكرامة",
      };
      setUser(normalUser);
      localStorage.setItem("wow_user", JSON.stringify(normalUser));
      return { success: true };
    }

    return { success: false, error: "يرجى التحقق من البريد الإلكتروني أو كلمة المرور" };
  };

  const register = async (data: Omit<User, "id" | "role"> & { password: string }) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "customer",
      area: data.area,
      streetAddress: data.streetAddress,
    };
    setUser(newUser);
    localStorage.setItem("wow_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wow_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("wow_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
