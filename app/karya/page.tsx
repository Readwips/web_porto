import type { Metadata } from "next";
import Portfolio from "../portfolio";

export const metadata: Metadata = {
  title: "Project | Setyo Agung Prabowo",
  description: "Pilihan proyek IT Support dan Manajemen Data Setyo Agung Prabowo.",
};

export default function WorksPage() {
  return <Portfolio view="works" />;
}
