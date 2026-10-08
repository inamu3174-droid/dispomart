import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import MobileBottomNav from "@/components/MobileBottomNav";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "DispoMart | Wedding Supplies, Traem & Custom Tokri – Anantnag, Kashmir",
    template: "%s | DispoMart Anantnag",
  },
  description:
    "DispoMart – Your trusted destination in Mattan Chowk, Anantnag for wedding Traem, custom Tokri, disposable supplies, dry fruits, bags and everyday essentials. Everything you need, under one roof. Since 2026.",
  keywords: [
    "DispoMart Anantnag",
    "DISPOMART Anantnag",
    "Wedding supplies Anantnag",
    "Wedding disposable items Kashmir",
    "Traem Kashmir",
    "Wedding Traem Anantnag",
    "Mahraaz Traem",
    "Disposable cups plates bowls Anantnag",
    "Dry fruits Anantnag",
    "Wedding baskets Kashmir",
    "Custom wedding baskets Kashmir",
    "Tokri Kashmir",
    "Wedding packaging Anantnag",
  ],
  icons: {
    icon: [
      { url: "/api/brand/favicon", sizes: "32x32", type: "image/png" },
      { url: "/api/brand/icon-192", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/api/brand/icon-192", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "DispoMart | Everything You Need, Under One Roof",
    description:
      "Wedding Traem, custom Tokri, disposables, dry fruits & more – serving Anantnag & Kashmir. Since 2026.",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/api/brand/logo",
        width: 280,
        height: 224,
        alt: "DispoMart – Since 2026",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
