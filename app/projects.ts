export type Project = {
  name: string;
  description: string;
  stack: string[];
  href: string;
  details: string[];
};

type GitHubRepository = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

const fallbackProjects: Project[] = [
  {
    name: "IT Helpdesk & Manajemen Aset",
    description:
      "Aplikasi Laravel untuk mengelola workflow tiket dukungan IT, inventaris perangkat, penugasan aset, riwayat perbaikan, knowledge base, dashboard, dan laporan.",
    stack: ["Laravel", "MySQL", "Tailwind CSS", "Chart.js"],
    href: "https://github.com/Readwips/web_helpdesk",
    details: [
      "Workflow tiket dan pembagian hak akses berdasarkan role",
      "Inventaris, penugasan, serta riwayat perbaikan aset TI",
      "Dashboard operasional, knowledge base, dan laporan",
    ],
  },
  {
    name: "Web Katalog Buku",
    description:
      "Aplikasi katalog yang membantu pengunjung mencari buku berdasarkan judul, penulis, ISBN, atau penerbit serta melihat stok dan lokasi rak.",
    stack: ["Laravel", "PHP", "Blade", "Database"],
    href: "https://github.com/Readwips/Web_Katalog_Buku",
    details: [
      "Pencarian berdasarkan judul, penulis, ISBN, atau penerbit",
      "Informasi stok dan lokasi rak",
      "Antarmuka sederhana yang dapat digunakan tanpa login",
    ],
  },
  {
    name: "Tracking Barang & Kontainer",
    description:
      "Sistem tracking logistik untuk memantau barang dan kontainer dengan dukungan dashboard, REST API, serta visualisasi data operasional.",
    stack: ["Laravel", "MySQL", "REST API", "Chart.js"],
    href: "https://github.com/Readwips/web_tracking_barang",
    details: [
      "Pencatatan dan pemantauan data barang serta kontainer",
      "Integrasi data melalui REST API",
      "Dashboard dan visualisasi data operasional",
    ],
  },
];

function formatName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function normalizeRepository(repository: GitHubRepository): Project {
  const stack = [repository.language, ...repository.topics]
    .filter((item): item is string => Boolean(item))
    .slice(0, 5);
  const updatedAt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date(repository.updated_at));

  return {
    name: formatName(repository.name),
    description:
      repository.description ?? "Proyek publik terbaru dari GitHub Readwips.",
    stack: stack.length > 0 ? stack : ["GitHub"],
    href: repository.html_url,
    details: [
      `Terakhir diperbarui ${updatedAt}`,
      `Repositori publik ${repository.name}`,
      repository.homepage
        ? `Demo tersedia di ${repository.homepage}`
        : "Kode sumber tersedia di GitHub",
    ],
  };
}

export async function getLatestProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      "https://api.github.com/users/Readwips/repos?sort=updated&direction=desc&per_page=20",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Readwips-portfolio",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return fallbackProjects;
    }

    const repositories = (await response.json()) as GitHubRepository[];
    const projects = repositories
      .filter(
        (repository) =>
          !repository.fork &&
          !repository.archived &&
          repository.name.toLowerCase() !== "web_porto",
      )
      .slice(0, 3)
      .map(normalizeRepository);

    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}
