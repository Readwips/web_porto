"use client";

import { useEffect, useMemo, useState } from "react";

const searchItems = [
  {
    label: "Tentang Saya",
    description: "Perkenalan singkat dan cara saya bekerja.",
    href: "#tentang",
  },
  {
    label: "Yang Saya Kerjakan",
    description: "Fokus layanan dan kemampuan utama.",
    href: "#pekerjaan",
  },
  {
    label: "Proyek Pilihan",
    description: "Contoh arah proyek digital.",
    href: "#proyek",
  },
  {
    label: "Sedang Dipelajari",
    description: "Topik yang sedang saya dalami.",
    href: "#belajar",
  },
];

const projects = [
  {
    name: "Ruang Kerja",
    status: "Konsep",
    description:
      "Workspace kolaboratif untuk menyatukan tugas, percakapan, dan progres tim dalam satu tempat.",
    stack: "Next.js · Product Design",
  },
  {
    name: "Saku Tumbuh",
    status: "Konsep",
    description:
      "Dasbor finansial yang membantu pengguna memahami arus uang tanpa grafik yang membingungkan.",
    stack: "React · Data Visualization",
  },
  {
    name: "Arah Kota",
    status: "Konsep",
    description:
      "Pengalaman eksplorasi tempat lokal dengan rekomendasi yang ringkas dan terasa personal.",
    stack: "UX Research · Prototype",
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
            <strong>Nama Anda</strong>
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
              <span>NA</span>
            </div>
            <h1>Nama Anda</h1>
            <p className="profile-role">Web Developer · Indonesia</p>
            <span className="profile-rule" />
            <p className="profile-tagline">
              Membuat pengalaman digital yang jernih, cepat, dan nyaman
              digunakan.
            </p>
            <div className="social-row">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
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
                <span>Frontend Development</span>
                <b>01</b>
              </li>
              <li>
                <span>Backend & API</span>
                <b>02</b>
              </li>
              <li>
                <span>Product Design</span>
                <b>03</b>
              </li>
            </ul>
          </section>

          <section className="side-widget">
            <h2>Teknologi</h2>
            <div className="tag-cloud">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "API",
                "UI/UX",
                "Cloudflare",
              ].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        </aside>

        <article className="article-card">
          <div className="article-heading" id="tentang">
            <span className="article-kicker">PROFIL / 2026</span>
            <h2>Tentang Saya</h2>
            <p className="article-lead">
              Halo! Saya <strong>Nama Anda</strong>, seorang web developer yang
              senang mengubah kebutuhan yang rumit menjadi produk digital yang
              sederhana dan berguna.
            </p>
            <p>
              Saya menikmati proses dari memahami masalah, menyusun alur,
              membangun antarmuka, sampai memastikan produk berjalan dengan
              baik. Tujuan saya sederhana: membuat teknologi terasa lebih mudah
              bagi orang yang menggunakannya.
            </p>
          </div>

          <hr />

          <section className="article-section" id="pekerjaan">
            <h2>
              <span aria-hidden="true">💡</span> Yang Saya Kerjakan
            </h2>
            <p>Sebagian besar waktu saya digunakan untuk:</p>
            <ul className="work-list">
              <li>
                Membangun aplikasi web yang <strong>responsif dan cepat</strong>
              </li>
              <li>
                Menyusun API dan alur data yang{" "}
                <strong>rapi serta mudah dirawat</strong>
              </li>
              <li>
                Merancang antarmuka dengan{" "}
                <strong>hierarki yang mudah dipahami</strong>
              </li>
              <li>
                Berkolaborasi dari tahap ide hingga{" "}
                <strong>produk siap digunakan</strong>
              </li>
            </ul>
          </section>

          <hr />

          <section className="article-section" id="proyek">
            <div className="section-title-row">
              <h2>
                <span aria-hidden="true">🛠</span> Proyek Pilihan
              </h2>
              <span className="small-note">CONTOH KONTEN</span>
            </div>
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-item" key={project.name}>
                  <div className="project-number" aria-hidden="true">
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="project-title">
                      <h3>{project.name}</h3>
                      <span>{project.status}</span>
                    </div>
                    <p>{project.description}</p>
                    <small>{project.stack}</small>
                  </div>
                </article>
              ))}
            </div>
            <p className="content-hint">
              Tiga proyek di atas adalah contoh. Anda dapat menggantinya dengan
              karya asli beserta tautan demo dan repositori.
            </p>
          </section>

          <hr />

          <section className="article-section" id="belajar">
            <h2>
              <span aria-hidden="true">🌱</span> Sedang Dipelajari
            </h2>
            <div className="learning-grid">
              <div>
                <span>01</span>
                <strong>System Design</strong>
                <p>Menyusun sistem yang tetap sederhana saat skala bertambah.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Product Strategy</strong>
                <p>Menghubungkan kebutuhan pengguna dan tujuan bisnis.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Performance</strong>
                <p>Membuat pengalaman web yang terasa ringan di berbagai perangkat.</p>
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
          <span>© 2026 Nama Anda.</span>
          <span>Web Developer Portfolio</span>
        </div>
        <a href="#top">Kembali ke atas ↑</a>
      </footer>
    </main>
  );
}
