import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { StoreProvider } from "@/context/StoreContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#168447",
};

export const metadata: Metadata = {
  title: "واو ماركت | WoW Market — سوبرماركت الزرقاء الجديدة للتسوق والتوصيل أونلاين",
  description: "المتجر الإلكتروني الرسمي لواو ماركت في الزرقاء الجديدة ومدينة الشرق، الأردن. خضار وفواكه طازجة، مواد غذائية، ألبان، ومستلزمات منزلية مع التوصيل حتى باب بيتك. تأسس عام 2017.",
  keywords: [
    "واو ماركت",
    "WoW Market",
    "سوبرماركت الزرقاء",
    "توصيل بقالة الزرقاء الجديدة",
    "خضار وفواكه الزرقاء",
    "مدينة الشرق الزرقاء",
    "شارع الكرامة الزرقاء",
    "بقالة أونلاين الأردن",
    "سوبرماركت الأردن",
    "Talabat WoW Market"
  ],
  authors: [{ name: "WoW Market" }],
  openGraph: {
    title: "واو ماركت | WoW Market — سوبرماركت الزرقاء الجديدة",
    description: "كل احتياجات بيتك بمكان واحد! خضار وفواكه طازجة، تموين وألبان مع التوصيل في الزرقاء الجديدة.",
    url: "https://wowmarket.net",
    siteName: "WoW Market Jordan",
    locale: "ar_JO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAFBF8] text-[#18251D]">
        <LanguageProvider>
          <AuthProvider>
            <StoreProvider>
              <CartProvider>
                <WishlistProvider>
                  <AnnouncementBar />
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                  <CartDrawer />
                  <QuickViewModal />
                  <MobileBottomNav />
                </WishlistProvider>
              </CartProvider>
            </StoreProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
