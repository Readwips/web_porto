import type { Metadata } from "next";
import Portfolio from "../portfolio";

export const metadata: Metadata = {
  title: "Tentang | Setyo Agung Prabowo",
  description: "Profil, fokus, dan hal yang sedang dipelajari Setyo Agung Prabowo.",
};

export default function AboutPage() {
  return <Portfolio view="about" />;
}
