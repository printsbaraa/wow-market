import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Jordanian Dinar (JOD / د.أ) with 3 decimal places
 * e.g., 2.5 -> "2.500 د.أ" or "2.500 JOD"
 */
export function formatPrice(price: number, locale: "ar" | "en" = "ar"): string {
  const formatted = price.toFixed(3);
  if (locale === "ar") {
    return `${formatted} د.أ`;
  }
  return `${formatted} JOD`;
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
