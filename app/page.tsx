"use client";

import { useEffect, useMemo, useState } from "react";

const searchItems = [
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
    name: "IT Helpdesk & Manajemen Aset",
    status: "Terbaru",
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
    name: "Web Katalog Buku",
    status: "Project",
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
    name: "Tracking Barang & Kontainer",
    status: "Project",
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
  const [openProject, setOpenProject] = useState<number | null>(0);
  const [selectedTechnology, setSelectedTechnology] = useState("Laravel");

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

    ["top", "tentang", "pekerjaan", "proyek", "belajar"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

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
            <a className={activeSection === "top" ? "active" : ""} href="#top">
              Beranda
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

          <section className="side-widget">
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
            <div className="project-list">
              {projects.map((project, index) => {
                const isOpen = openProject === index;

                return (
                <article
                  className={`project-item ${isOpen ? "open" : ""}`}
                  key={project.name}
                >
                  <div className="project-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
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
                          onClick={() => setOpenProject(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          aria-controls={`project-details-${index}`}
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
                      id={`project-details-${index}`}
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
