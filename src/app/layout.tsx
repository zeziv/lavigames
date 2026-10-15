import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import LionBackground from "@/components/LionBackground";
import SiteFooter from "@/components/SiteFooter";
import { company } from "@/data/company";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-2934267618765553";

const display = localFont({
  src: "./fonts/bebas-neue-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [
    {
      path: "./fonts/source-sans-3-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/source-sans-3-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/source-sans-3-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lavi Games",
  description:
    "Lavi Games — a studio hub for competitive games including Poll Warrior and Territory Conquest.",
  metadataBase: new URL(company.website),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <LionBackground />
        <div className="shell">
          {children}
          <SiteFooter />
        </div>
        <AccessibilityMenu />
      </body>
    </html>
  );
}
