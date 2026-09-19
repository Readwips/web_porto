import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Setyo Agung Prabowo — IT Support & Data Management";
const description =
  "Portfolio Setyo Agung Prabowo, lulusan Sistem Informasi dengan fokus pada IT Support, Data Management, troubleshooting, dan pengembangan aplikasi.";

export const metadata: Metadata = {
  metadataBase: new URL("https://setyoagung.is-a.dev"),
  title,
  description,
  authors: [{ name: "Setyo Agung Prabowo" }],
  creator: "Setyo Agung Prabowo",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Portfolio Setyo Agung Prabowo",
    title,
    description,
    images: [
      {
        url: "/portfolio-gfx-header-v2.png",
        width: 1600,
        height: 800,
        alt: "Portfolio Setyo Agung Prabowo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio-gfx-header-v2.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1016",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" style={{ scrollBehavior: "smooth" }}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <SmoothScroll />
          {children}
        </body>
    </html>
  );
}
