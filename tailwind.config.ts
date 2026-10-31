import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "#FAFBF8",
        foreground: "#18251D",
        primary: {
          DEFAULT: "#168447",
          dark: "#105B34",
          light: "#E7F6ED",
          accent: "#B9E8C7",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#168447",
          600: "#105B34",
          700: "#0b4124",
          800: "#072a18",
          900: "#03150c",
        },
        cream: "#F7F5EE",
        surface: "#FFFFFF",
        muted: {
          DEFAULT: "#78847B",
          light: "#9CA89F",
          bg: "#F2F5F3",
        },
        border: "#E5ECE7",
        gold: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
        },
        danger: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-tajawal)", "system-ui", "sans-serif"],
        arabic: ["var(--font-tajawal)", "system-ui", "sans-serif"],
        latin: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(24, 37, 29, 0.05), 0 1px 2px -1px rgba(24, 37, 29, 0.05)",
        card: "0 4px 12px -2px rgba(24, 37, 29, 0.06), 0 2px 6px -2px rgba(24, 37, 29, 0.04)",
        hover: "0 10px 25px -5px rgba(22, 132, 71, 0.12), 0 8px 10px -6px rgba(22, 132, 71, 0.08)",
        floating: "0 20px 35px -10px rgba(16, 91, 52, 0.18)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "pulse-subtle": "pulseSubtle 2.5s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
