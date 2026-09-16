export type PortfolioProject = {
  id: string;
  repo: string;
  displayName: string;
  shortDescription: string;
  technologies: string[];
  features: string[];
  featured: boolean;
  priority: number;
  repositoryUrl: string;
  demoUrl?: string;
  updatedAt?: string;
  language?: string;
  stars?: number;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "helpdesk",
    repo: "web_helpdesk-organisasi",
    displayName: "IT Helpdesk Ticket Analysis",
    shortDescription:
      "Aplikasi full-stack untuk mengelola tiket IT Support, memantau SLA, menganalisis data, dan mengekspor laporan operasional.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    features: [
      "Manajemen tiket dan akses berbasis peran",
      "Pemantauan SLA serta dashboard analitik",
      "Import dan export laporan Excel",
    ],
    featured: true,
    priority: 1,
    repositoryUrl: "https://github.com/Readwips/web_helpdesk-organisasi",
    demoUrl: "https://web-helpdesk-frontend.vercel.app",
  },
  {
    id: "deviceworth",
    repo: "apk_mmmmm",
    displayName: "DeviceWorth",
    shortDescription:
      "Aplikasi Android untuk menampilkan informasi perangkat, diagnostik hardware, baterai, thermal, sensor, serta simulasi estimasi harga perangkat.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt"],
    features: [
      "Diagnostik perangkat berbasis Android API",
      "Informasi baterai, thermal, dan sensor",
      "Simulasi estimasi harga dengan data mock",
    ],
    featured: true,
    priority: 2,
    repositoryUrl: "https://github.com/Readwips/apk_mmmmm",
  },
  {
    id: "careerpath",
    repo: "apk_CareerPath-readwips-",
    displayName: "CareerPath",
    shortDescription:
      "Aplikasi Android untuk mencatat dan memantau lamaran kerja secara manual atau melalui pemindaian email rekrutmen dari Gmail.",
    technologies: ["JavaScript", "Android", "Gmail API", "OAuth"],
    features: [
      "Dashboard status lamaran",
      "Deteksi email rekrutmen dari Gmail",
      "Filter, statistik, dan backup data JSON",
    ],
    featured: true,
    priority: 3,
    repositoryUrl: "https://github.com/Readwips/apk_CareerPath-readwips-",
  },
  {
    id: "logitrack",
    repo: "web_tracking_barang",
    displayName: "LogiTrack AI",
    shortDescription:
      "Aplikasi web untuk mengelola dan melacak perjalanan kontainer, status pengiriman, jadwal, serta catatan operasional.",
    technologies: ["Laravel", "PHP", "MySQL", "REST API", "Tailwind CSS"],
    features: [
      "Tracking publik dengan nomor kontainer",
      "Dashboard admin dan operator",
      "Notifikasi keterlambatan serta REST API",
    ],
    featured: true,
    priority: 4,
    repositoryUrl: "https://github.com/Readwips/web_tracking_barang",
    demoUrl: "https://readwips.github.io/web_tracking_barang/",
  },
];
