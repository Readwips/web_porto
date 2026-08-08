import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { NavigationMotionProvider } from "./navigation-motion-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Setyo Agung Prabowo — IT Support & Data Management",
    description:
      "Portofolio Setyo Agung Prabowo, lulusan Sistem Informasi yang berfokus pada IT Support, manajemen data, dan pengembangan aplikasi internal.",
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: origin,
      title: "Setyo Agung Prabowo — IT Support & Data Management",
      description:
        "Portofolio proyek IT Support, manajemen data, dan pengembangan aplikasi internal.",
      images: [
        {
          url: `${origin}/portfolio-gfx-header-v2.png`,
          width: 1600,
          height: 800,
          alt: "Portofolio Setyo Agung Prabowo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Setyo Agung Prabowo — IT Support & Data Management",
      description:
        "Portofolio proyek IT Support, manajemen data, dan pengembangan aplikasi internal.",
      images: [`${origin}/portfolio-gfx-header-v2.png`],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavigationMotionProvider>{children}</NavigationMotionProvider>
      </body>
    </html>
  );
}
