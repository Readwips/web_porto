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
  },
  {
    name: "Web Katalog Buku",
    status: "Project",
    description:
      "Aplikasi katalog yang membantu pengunjung mencari buku berdasarkan judul, penulis, ISBN, atau penerbit serta melihat stok dan lokasi rak.",
    stack: "Laravel · PHP · Blade · Database",
    href: "https://github.com/Readwips/Web_Katalog_Buku",
  },
  {
    name: "Tracking Barang & Kontainer",
    status: "Project",
    description:
      "Sistem tracking logistik untuk memantau barang dan kontainer dengan dukungan dashboard, REST API, serta visualisasi data operasional.",
    stack: "Laravel · MySQL · REST API · Chart.js",
    href: "https://github.com/Readwips/web_tracking_barang",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
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

  return (
    <main className="portfolio" data-theme={theme}>
      <header className="topbar">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="Kembali ke atas">
            <span className="brand-icon" aria-hidden="true">
              ⌂
            </span>
            <strong>Setyo Agung</strong>
          </a>

          <nav aria-label="Navigasi utama">
            <a href="#top">Beranda</a>
            <a href="#proyek">Karya</a>
            <a href="#tentang">Tentang</a>
            <a href="#kontak">Kontak</a>
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
                aria-expanded={searchOpen}
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
                href="https://github.com/Readwips"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                href="https://www.instagram.com/readwips/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                IN
              </a>
              <a href="mailto:hello@domainanda.com" aria-label="Email">
                @
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
              {[
                "Laravel",
                "PHP",
                "MySQL",
                "REST API",
                "Chart.js",
                "Google Sheets",
                "Troubleshooting",
              ].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
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
              {projects.map((project) => (
                <article className="project-item" key={project.name}>
                  <div className="project-number" aria-hidden="true">
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
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
                      <span>{project.status}</span>
                    </div>
                    <p>{project.description}</p>
                    <small>{project.stack}</small>
                  </div>
                </article>
              ))}
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

          <blockquote>
            “Produk yang baik membuat hal rumit terasa biasa.”
          </blockquote>

          <section className="contact-card" id="kontak">
            <div>
              <span>TERBUKA UNTUK KOLABORASI</span>
              <h2>Punya ide yang ingin diwujudkan?</h2>
              <p>
                Ceritakan tujuan, kebutuhan, dan waktu proyek Anda. Mari lihat
                bagaimana saya dapat membantu.
              </p>
            </div>
            <a href="mailto:hello@domainanda.com">
              Kirim email <span aria-hidden="true">↗</span>
            </a>
          </section>
        </article>
      </div>

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
