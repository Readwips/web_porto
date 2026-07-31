"use client";

import { useEffect, useMemo, useState } from "react";

const searchItems = [
  {
    label: "Dashboard",
    description: "Ringkasan proyek, teknologi, dan fokus karier.",
    href: "#dashboard",
  },
  {
    label: "About Me",
    description: "Latar belakang dan fokus karier saya.",
    href: "#tentang",
  },
  {
    label: "What I Do",
    description: "Aktivitas dan kemampuan yang sedang saya kembangkan.",
    href: "#pekerjaan",
  },
  {
    label: "Latest Works",
    description: "Proyek terbaru yang tersedia di GitHub.",
    href: "#proyek",
  },
  {
    label: "Currently Learning",
    description: "Keahlian yang sedang saya perdalam.",
    href: "#belajar",
  },
];

const projects = [
  {
    id: "helpdesk",
    name: "IT Helpdesk & Manajemen Aset",
    status: "Terbaru",
    categories: ["IT Support", "Data"],
    description:
      "Aplikasi Laravel untuk mengelola workflow tiket dukungan IT, inventaris perangkat, penugasan aset, riwayat perbaikan, knowledge base, dashboard, dan laporan.",
    stack: "Laravel · MySQL · Tailwind CSS · Chart.js",
    href: "https://github.com/Readwips/web_helpdesk",
    details: [
      "Workflow tiket dan pembagian hak akses berdasarkan role",
      "Inventaris, penugasan, serta riwayat perbaikan aset TI",
      "Dashboard operasional, knowledge base, dan laporan",
    ],
  },
  {
    id: "katalog-buku",
    name: "Web Katalog Buku",
    status: "Project",
    categories: ["Data", "Web"],
    description:
      "Aplikasi katalog yang membantu pengunjung mencari buku berdasarkan judul, penulis, ISBN, atau penerbit serta melihat stok dan lokasi rak.",
    stack: "Laravel · PHP · Blade · Database",
    href: "https://github.com/Readwips/Web_Katalog_Buku",
    details: [
      "Pencarian berdasarkan judul, penulis, ISBN, atau penerbit",
      "Informasi stok dan lokasi rak",
      "Antarmuka sederhana yang dapat digunakan tanpa login",
    ],
  },
  {
    id: "tracking-barang",
    name: "Tracking Barang & Kontainer",
    status: "Project",
    categories: ["Data", "API"],
    description:
      "Sistem tracking logistik untuk memantau barang dan kontainer dengan dukungan dashboard, REST API, serta visualisasi data operasional.",
    stack: "Laravel · MySQL · REST API · Chart.js",
    href: "https://github.com/Readwips/web_tracking_barang",
    details: [
      "Pencatatan dan pemantauan data barang serta kontainer",
      "Integrasi data melalui REST API",
      "Dashboard dan visualisasi data operasional",
    ],
  },
];

const projectFilters = ["Semua", "IT Support", "Data", "Web", "API"];

const focusAreas = [
  {
    id: "support",
    label: "IT Support",
    number: "01",
    title: "Dukungan teknis yang terstruktur",
    description:
      "Berfokus membantu pengguna, menelusuri masalah, dan mendokumentasikan solusi agar kendala serupa lebih cepat diselesaikan.",
    activities: [
      "Troubleshooting perangkat dan aplikasi",
      "Pengelolaan tiket serta dokumentasi solusi",
      "Inventaris dan pemeliharaan aset TI",
    ],
  },
  {
    id: "data",
    label: "Data Management",
    number: "02",
    title: "Data yang rapi dan mudah digunakan",
    description:
      "Mengelola data operasional agar konsisten, mudah dicari, dan dapat diolah menjadi laporan yang membantu pengambilan keputusan.",
    activities: [
      "Perancangan database relasional",
      "Validasi, pencatatan, dan perapian data",
      "Dashboard serta laporan operasional",
    ],
  },
  {
    id: "development",
    label: "Development",
    number: "03",
    title: "Aplikasi internal yang praktis",
    description:
      "Membangun alat bantu berbasis web untuk menyederhanakan alur kerja IT Support dan pengelolaan data.",
    activities: [
      "Aplikasi internal dengan Laravel",
      "Integrasi REST API dan Google Sheets",
      "Version control menggunakan GitHub",
    ],
  },
];

const technologies = [
  {
    name: "Laravel",
    description:
      "Framework utama yang digunakan untuk membangun aplikasi helpdesk, katalog, dan tracking.",
  },
  {
    name: "PHP",
    description:
      "Bahasa backend yang digunakan pada proyek aplikasi internal berbasis web.",
  },
  {
    name: "MySQL",
    description:
      "Basis data relasional untuk tiket, inventaris, katalog, tracking, dan laporan.",
  },
  {
    name: "SQLite",
    description:
      "Basis data ringan untuk pengembangan, pengujian, dan aplikasi dengan kebutuhan sederhana.",
  },
  {
    name: "REST API",
    description:
      "Digunakan untuk pertukaran data antarsistem pada proyek tracking dan aplikasi internal.",
  },
  {
    name: "Chart.js",
    description:
      "Visualisasi data pada dashboard agar informasi operasional lebih mudah dipahami.",
  },
  {
    name: "Google Sheets API",
    description:
      "Integrasi untuk mencatat data terstruktur secara otomatis ke Google Sheets.",
  },
  {
    name: "Node.js",
    description:
      "Runtime yang digunakan pada proyek automasi pesan WhatsApp ke Google Sheets.",
  },
  {
    name: "Git & GitHub",
    description:
      "Digunakan untuk version control, dokumentasi perubahan, dan publikasi proyek.",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>("helpdesk");
  const [selectedTechnology, setSelectedTechnology] = useState("Laravel");
  const [selectedFocus, setSelectedFocus] = useState("support");
  const [projectFilter, setProjectFilter] = useState("Semua");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const preferredTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    const frame = window.requestAnimationFrame(() => setTheme(preferredTheme));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      setShowBackToTop(window.scrollY > 520);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.05, 0.25, 0.5],
      },
    );

    ["top", "dashboard", "tentang", "pekerjaan", "proyek", "belajar"].forEach(
      (id) => {
        const section = document.getElementById(id);
        if (section) sectionObserver.observe(section);
      },
    );

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      sectionObserver.disconnect();
    };
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return searchItems;

    return searchItems.filter((item) =>
      `${item.label} ${item.description}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const selectedTechnologyData =
    technologies.find((technology) => technology.name === selectedTechnology) ??
    technologies[0];
  const selectedFocusData =
    focusAreas.find((focus) => focus.id === selectedFocus) ?? focusAreas[0];
  const filteredProjects = projects.filter(
    (project) =>
      projectFilter === "Semua" || project.categories.includes(projectFilter),
  );

  const changeProjectFilter = (filter: string) => {
    setProjectFilter(filter);
    const firstMatchingProject = projects.find(
      (project) =>
        filter === "Semua" || project.categories.includes(filter),
    );
    setOpenProject(firstMatchingProject?.id ?? null);
  };

  return (
    <main className="portfolio" data-theme={theme}>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <header className="topbar">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="Kembali ke atas">
            <span className="brand-icon" aria-hidden="true">
              ⌂
            </span>
            <strong>Setyo Agung</strong>
          </a>

          <nav aria-label="Navigasi utama">
            <a
              className={
                ["top", "dashboard"].includes(activeSection) ? "active" : ""
              }
              href="#dashboard"
            >
              Dashboard
            </a>
            <a
              className={activeSection === "proyek" ? "active" : ""}
              href="#proyek"
            >
              Karya
            </a>
            <a
              className={
                ["tentang", "pekerjaan", "belajar"].includes(activeSection)
                  ? "active"
                  : ""
              }
              href="#tentang"
            >
              Tentang
            </a>
          </nav>

          <div className="nav-tools">
            <div className="search">
              <span className="search-icon" aria-hidden="true">
                ⌕
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Cari"
                aria-label="Cari bagian portofolio"
              />
              {searchOpen && (
                <div className="search-results">
                  <div className="search-result-head">
                    <span>LOMPAT KE BAGIAN</span>
                    <button type="button" onClick={closeSearch}>
                      Tutup
                    </button>
                  </div>
                  {results.length > 0 ? (
                    results.map((item) => (
                      <a href={item.href} key={item.href} onClick={closeSearch}>
                        <strong>{item.label}</strong>
                        <span>{item.description}</span>
                      </a>
                    ))
                  ) : (
                    <p>Tidak ada bagian yang cocok.</p>
                  )}
                </div>
              )}
            </div>
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap"
              }
              aria-pressed={theme === "light"}
              title={theme === "dark" ? "Tema terang" : "Tema gelap"}
            >
              {theme === "dark" ? "☼" : "☾"}
            </button>
          </div>
        </div>
      </header>

      <section className="banner" id="top" aria-label="Sampul portofolio">
        <div className="banner-scene" aria-hidden="true">
          <span className="banner-sun" />
          <span className="banner-hill hill-one" />
          <span className="banner-hill hill-two" />
          <span className="banner-grid" />
        </div>
      </section>

      <div className="content-shell">
        <aside className="sidebar" aria-label="Profil dan keahlian">
          <section className="profile-card">
            <div className="avatar" aria-label="Placeholder foto profil">
              <span>SA</span>
            </div>
            <h1>Setyo Agung Prabowo</h1>
            <p className="profile-role">IT Support · Data Management</p>
            <span className="profile-rule" />
            <p className="profile-tagline">
              Lulusan S1 Sistem Informasi yang berfokus pada dukungan teknologi
              dan pengelolaan data.
            </p>
            <div className="social-row">
              <a
                href="https://www.facebook.com/loempers"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Setyo Agung Prabowo"
                title="Facebook"
              >
                FB
              </a>
              <a
                href="https://www.instagram.com/readwips/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Setyo Agung Prabowo"
                title="Instagram"
              >
                IG
              </a>
              <a
                href="https://github.com/Readwips"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Setyo Agung Prabowo"
                title="GitHub"
              >
                GH
              </a>
            </div>
          </section>

          <section className="side-widget">
            <h2>Fokus</h2>
            <ul className="focus-list">
              <li>
                <span>IT Support & Troubleshooting</span>
                <b>01</b>
              </li>
              <li>
                <span>Data Management & Reporting</span>
                <b>02</b>
              </li>
              <li>
                <span>IT Asset Management</span>
                <b>03</b>
              </li>
            </ul>
          </section>

          <section className="side-widget" id="teknologi">
            <h2>Teknologi</h2>
            <div className="tag-cloud">
              {technologies.map((technology) => (
                <button
                  className={
                    selectedTechnology === technology.name ? "active" : ""
                  }
                  key={technology.name}
                  type="button"
                  onClick={() => setSelectedTechnology(technology.name)}
                  aria-pressed={selectedTechnology === technology.name}
                >
                  {technology.name}
                </button>
              ))}
            </div>
            <div className="technology-detail" aria-live="polite">
              <strong>{selectedTechnologyData.name}</strong>
              <p>{selectedTechnologyData.description}</p>
            </div>
          </section>
        </aside>

        <article className="article-card">
          <section
            className="dashboard-overview"
            id="dashboard"
            aria-labelledby="dashboard-title"
          >
            <div className="dashboard-header">
              <div>
                <span className="article-kicker">DASHBOARD / OVERVIEW</span>
                <h2 id="dashboard-title">Ringkasan Portfolio</h2>
              </div>
              <span className="availability-status">
                <i aria-hidden="true" />
                Terbuka untuk peluang kerja
              </span>
            </div>

            <div className="dashboard-stats">
              <a className="stat-card" href="#proyek">
                <span>Proyek publik</span>
                <strong>{projects.length}</strong>
                <small>Lihat karya <b aria-hidden="true">↓</b></small>
              </a>
              <a className="stat-card" href="#teknologi">
                <span>Teknologi</span>
                <strong>{technologies.length}</strong>
                <small>Jelajahi kemampuan <b aria-hidden="true">←</b></small>
              </a>
              <a className="stat-card" href="#belajar">
                <span>Fokus karier</span>
                <strong>{focusAreas.length}</strong>
                <small>Lihat pembelajaran <b aria-hidden="true">↓</b></small>
              </a>
            </div>

            <div className="focus-dashboard">
              <div className="focus-tabs" role="tablist" aria-label="Fokus kerja">
                {focusAreas.map((focus) => (
                  <button
                    className={selectedFocus === focus.id ? "active" : ""}
                    key={focus.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedFocus === focus.id}
                    aria-controls="focus-panel"
                    onClick={() => setSelectedFocus(focus.id)}
                  >
                    <span>{focus.number}</span>
                    {focus.label}
                  </button>
                ))}
              </div>
              <div
                className="focus-panel"
                id="focus-panel"
                role="tabpanel"
                aria-live="polite"
              >
                <div>
                  <span className="focus-panel-label">FOKUS AKTIF</span>
                  <h3>{selectedFocusData.title}</h3>
                  <p>{selectedFocusData.description}</p>
                </div>
                <ul>
                  {selectedFocusData.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <hr />

          <div className="article-heading" id="tentang">
            <span className="article-kicker">PROFIL / 2026</span>
            <h2>About Me</h2>
            <p className="article-lead">
              Halo! Saya <strong>Setyo Agung Prabowo</strong>, lulusan S1 Sistem
              Informasi yang sedang membangun karier di bidang{" "}
              <strong>IT Support dan Manajemen Data</strong>.
            </p>
            <p>
              Saya terus mengembangkan kemampuan melalui berbagai proyek untuk
              memperoleh pengalaman praktis, memperdalam pemahaman tentang
              pengelolaan sistem dan data, serta mempersiapkan diri memberikan
              dukungan teknologi yang andal bagi organisasi.
            </p>
          </div>

          <hr />

          <section className="article-section" id="pekerjaan">
            <h2>
              <span aria-hidden="true">💡</span> What I Do
            </h2>
            <p>Sebagian besar waktu saya digunakan untuk:</p>
            <ul className="work-list">
              <li>
                Mempelajari alur <strong>IT helpdesk</strong>, pencatatan tiket,
                troubleshooting, dan pengelolaan aset TI
              </li>
              <li>
                Merancang serta mengelola <strong>database relasional</strong>{" "}
                untuk inventaris, laporan, dan kebutuhan operasional
              </li>
              <li>
                Membangun aplikasi internal menggunakan{" "}
                <strong>Laravel, PHP, MySQL, dan REST API</strong>
              </li>
              <li>
                Membuat dashboard, visualisasi, dan{" "}
                <strong>automasi pencatatan data</strong> ke Google Sheets
              </li>
            </ul>
          </section>

          <hr />

          <section className="article-section" id="proyek">
            <div className="section-title-row">
              <h2>
                <span aria-hidden="true">🛠</span> Latest Works
              </h2>
              <span className="small-note">GITHUB PROJECTS</span>
            </div>
            <div className="project-toolbar">
              <div className="project-filters" aria-label="Filter proyek">
                {projectFilters.map((filter) => (
                  <button
                    className={projectFilter === filter ? "active" : ""}
                    key={filter}
                    type="button"
                    onClick={() => changeProjectFilter(filter)}
                    aria-pressed={projectFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span aria-live="polite">
                {filteredProjects.length} dari {projects.length} proyek
              </span>
            </div>
            <div className="project-list" aria-live="polite">
              {filteredProjects.map((project) => {
                const isOpen = openProject === project.id;
                const projectNumber = projects.findIndex(
                  (item) => item.id === project.id,
                );

                return (
                <article
                  className={`project-item ${isOpen ? "open" : ""}`}
                  key={project.name}
                >
                  <div className="project-number" aria-hidden="true">
                    {String(projectNumber + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="project-title">
                      <h3>
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {project.name} <span aria-hidden="true">↗</span>
                        </a>
                      </h3>
                      <div className="project-actions">
                        <span>{project.status}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenProject(isOpen ? null : project.id)
                          }
                          aria-expanded={isOpen}
                          aria-controls={`project-details-${project.id}`}
                        >
                          {isOpen ? "Tutup" : "Detail"}
                          <span aria-hidden="true">⌄</span>
                        </button>
                      </div>
                    </div>
                    <p>{project.description}</p>
                    <small>{project.stack}</small>
                    <div
                      className="project-details"
                      id={`project-details-${project.id}`}
                      aria-hidden={!isOpen}
                    >
                      <div>
                        <strong>Fitur utama</strong>
                        <ul>
                          {project.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
            <a
              className="content-hint"
              href="https://github.com/Readwips?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              Lihat seluruh proyek publik saya di GitHub ↗
            </a>
          </section>

          <hr />

          <section className="article-section" id="belajar">
            <h2>
              <span aria-hidden="true">🌱</span> Currently Learning
            </h2>
            <div className="learning-grid">
              <div>
                <span>01</span>
                <strong>IT Support Operations</strong>
                <p>
                  Troubleshooting, workflow tiket, dokumentasi solusi, dan
                  pengelolaan inventaris perangkat.
                </p>
              </div>
              <div>
                <span>02</span>
                <strong>Database & Data Management</strong>
                <p>
                  Perancangan database relasional, kualitas data, transaksi,
                  pelaporan, dan visualisasi informasi.
                </p>
              </div>
              <div>
                <span>03</span>
                <strong>Laravel & Automation</strong>
                <p>
                  Pengembangan aplikasi internal, REST API, pengujian, keamanan,
                  serta integrasi data dengan Google Sheets.
                </p>
              </div>
            </div>
          </section>

        </article>
      </div>

      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Kembali ke bagian atas"
        tabIndex={showBackToTop ? 0 : -1}
      >
        ↑
      </button>

      <footer className="footer">
        <div>
          <span>© 2026 Setyo Agung Prabowo.</span>
          <span>IT Support & Data Management Portfolio</span>
        </div>
        <a href="#top">Kembali ke atas ↑</a>
      </footer>
    </main>
  );
}
