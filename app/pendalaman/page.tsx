import type { Metadata } from "next";
import Portfolio from "../portfolio";

export const metadata: Metadata = {
  title: "Pendalaman | Setyo Agung Prabowo",
  description:
    "Fokus pembelajaran Setyo Agung Prabowo dalam IT Support, manajemen data, Laravel, dan automasi.",
};

export default function LearningPage() {
  return <Portfolio view="learning" />;
}
