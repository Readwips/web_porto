import type { Metadata } from "next";
import Portfolio from "../portfolio";
import { getLatestProjects } from "../projects";

export const metadata: Metadata = {
  title: "Project | Setyo Agung Prabowo",
  description: "Pilihan proyek IT Support dan Manajemen Data Setyo Agung Prabowo.",
};

export default async function WorksPage() {
  const projects = await getLatestProjects();

  return <Portfolio view="works" projects={projects} />;
}
