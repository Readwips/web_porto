import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
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
    title: "Nama Anda — Web Developer Portfolio",
    description:
      "Portofolio web developer Indonesia yang memadukan strategi, desain, dan teknologi untuk menciptakan pengalaman digital yang jernih.",
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: origin,
      title: "Nama Anda — Web Developer Portfolio",
      description:
        "Membangun pengalaman digital yang jernih, cepat, dan manusiawi.",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Portofolio 2026 — Membangun pengalaman digital yang jernih dan manusiawi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nama Anda — Web Developer Portfolio",
      description:
        "Membangun pengalaman digital yang jernih, cepat, dan manusiawi.",
      images: [`${origin}/og.png`],
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
        {children}
      </body>
    </html>
  );
}
