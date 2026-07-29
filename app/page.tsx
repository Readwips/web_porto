"use client";

import { useState } from "react";

const projects = [
  {
    index: "01",
    type: "PRODUCT DESIGN · WEB APP",
    name: "Ruang Kerja",
    description:
      "Workspace kolaboratif yang menyatukan tugas, percakapan, dan progres tim dalam satu alur yang tenang.",
    tags: ["Product thinking", "Next.js", "Design system"],
    variant: "workspace",
  },
  {
    index: "02",
    type: "FINTECH · DASHBOARD",
    name: "Saku Tumbuh",
    description:
      "Dasbor finansial yang menerjemahkan angka rumit menjadi keputusan kecil yang lebih mudah diambil.",
    tags: ["UX strategy", "Data visual", "Frontend"],
    variant: "finance",
  },
  {
    index: "03",
    type: "DISCOVERY · MOBILE WEB",
    name: "Arah Kota",
    description:
      "Pengalaman eksplorasi tempat lokal dengan kurasi yang personal, ringan, dan tidak terasa seperti direktori.",
    tags: ["Research", "Interaction", "Prototype"],
    variant: "city",
  },
];

const principles = [
  {
    number: "01",
    title: "Jernih sebelum indah",
    copy: "Struktur, pesan, dan alur harus masuk akal lebih dulu. Visual yang baik membuat semuanya terasa lebih mudah.",
  },
  {
    number: "02",
    title: "Cepat, bukan terburu-buru",
    copy: "Saya membangun fondasi yang sederhana, terukur, dan cukup lentur untuk berkembang bersama kebutuhan.",
  },
  {
    number: "03",
    title: "Detail adalah pengalaman",
    copy: "Jarak, respons, pesan kesalahan, dan momen kecil lain menentukan apakah sebuah produk terasa matang.",
  },
];

function ProjectVisual({ variant }: { variant: string }) {
  if (variant === "finance") {
    return (
      <div className="project-visual finance-visual" aria-hidden="true">
        <div className="finance-shell">
          <div className="mock-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="finance-number">18.4</div>
          <div className="finance-label">pertumbuhan bulan ini</div>
          <div className="finance-chart">
            {[38, 52, 44, 68, 61, 82, 92].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "city") {
    return (
      <div className="project-visual city-visual" aria-hidden="true">
        <div className="city-map">
          <span className="street street-one" />
          <span className="street street-two" />
          <span className="street street-three" />
          <span className="map-dot dot-one" />
          <span className="map-dot dot-two" />
          <span className="map-dot dot-three" />
        </div>
        <div className="place-card">
          <span className="place-kicker">PILIHAN HARI INI</span>
          <strong>Sudut Kota</strong>
          <span>6 menit dari sini</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual workspace-visual" aria-hidden="true">
      <div className="workspace-shell">
        <div className="workspace-sidebar">
          <span className="sidebar-mark" />
          <span />
          <span />
          <span />
        </div>
        <div className="workspace-content">
          <div className="mock-heading" />
          <div className="task-row">
            <i className="task-check" />
            <span />
            <b>Done</b>
          </div>
          <div className="task-row">
            <i className="task-check" />
            <span />
            <b>Review</b>
          </div>
          <div className="task-row">
            <i className="task-check" />
            <span />
            <b>Today</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <main className="portfolio" data-theme={theme}>
      <div className="page-grid" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kembali ke atas">
          <span className="brand-mark">N</span>
          <span className="brand-copy">
            <strong>NAMA ANDA</strong>
            <small>WEB DEVELOPER</small>
          </span>
        </a>

        <nav aria-label="Navigasi utama">
          <a href="#tentang">Tentang</a>
          <a href="#karya">Karya</a>
          <a href="#kontak">Kontak</a>
        </nav>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={
            theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap"
          }
          title={theme === "dark" ? "Tema terang" : "Tema gelap"}
        >
          <span>{theme === "dark" ? "☼" : "☾"}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            TERSEDIA UNTUK PROYEK TERPILIH
          </div>
          <p className="hero-index">PORTOFOLIO / 2026</p>
          <h1>
            Produk digital yang <em>tenang</em> di mata, kuat di balik layar.
          </h1>
          <p className="hero-intro">
            Saya seorang web developer di Indonesia yang menyatukan strategi,
            desain, dan kode untuk menciptakan pengalaman digital yang terasa
            jelas, cepat, dan manusiawi.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#karya">
              Lihat karya <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-ghost" href="#kontak">
              Mulai percakapan
            </a>
          </div>
        </div>

        <aside className="identity-card" aria-label="Ringkasan profil">
          <div className="identity-topline">
            <span>PROFILE / 001</span>
            <span>JKT — ID</span>
          </div>
          <div className="portrait">
            <span className="portrait-orbit orbit-one" />
            <span className="portrait-orbit orbit-two" />
            <span className="portrait-monogram">NA</span>
            <span className="portrait-caption">BUILDING WITH INTENT</span>
          </div>
          <div className="identity-name">
            <span className="identity-label">HALO, SAYA</span>
            <h2>Nama Anda.</h2>
            <p>Developer yang peduli pada logika dan rasa.</p>
          </div>
          <div className="identity-meta">
            <div>
              <span>FOKUS</span>
              <strong>Web & Product</strong>
            </div>
            <div>
              <span>PENDEKATAN</span>
              <strong>Think → Make → Refine</strong>
            </div>
          </div>
        </aside>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          <span>DESIGN SYSTEM</span>
          <i>✦</i>
          <span>FRONTEND CRAFT</span>
          <i>✦</i>
          <span>BACKEND THINKING</span>
          <i>✦</i>
          <span>PRODUCT SENSE</span>
          <i>✦</i>
          <span>DESIGN SYSTEM</span>
          <i>✦</i>
          <span>FRONTEND CRAFT</span>
        </div>
      </div>

      <section className="about section-shell" id="tentang">
        <div className="section-number">01 / TENTANG</div>
        <div className="about-heading">
          <p className="section-kicker">SEDIKIT TENTANG CARA SAYA BERPIKIR</p>
          <h2>
            Saya suka merapikan hal rumit menjadi sesuatu yang{" "}
            <span>mudah dipahami.</span>
          </h2>
        </div>
        <div className="about-body">
          <p>
            Bagi saya, produk yang baik bukan sekadar terlihat modern. Ia harus
            menjawab kebutuhan nyata, bergerak cepat, dan tetap nyaman digunakan
            ketika kompleksitas bertambah.
          </p>
          <p>
            Saya nyaman bekerja dari tahap eksplorasi, menyusun antarmuka,
            hingga membawa produk ke lingkungan produksi—dengan komunikasi yang
            terbuka di sepanjang proses.
          </p>
        </div>

        <div className="principles">
          {principles.map((item) => (
            <article className="principle-card" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-shell" id="karya">
        <div className="work-heading">
          <div>
            <div className="section-number">02 / KARYA PILIHAN</div>
            <h2>Konsep yang dibuat untuk menunjukkan cara berpikir.</h2>
          </div>
          <p>
            Tiga contoh arah proyek. Ganti nama, cerita, dan tautannya dengan
            karya asli Anda saat siap.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.index}>
              <div className="project-copy">
                <div className="project-meta">
                  <span>CONCEPT / {project.index}</span>
                  <span>{project.type}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul aria-label={`Keahlian untuk ${project.name}`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href="#kontak" className="project-link">
                  Bicarakan proyek serupa <span aria-hidden="true">↗</span>
                </a>
              </div>
              <ProjectVisual variant={project.variant} />
            </article>
          ))}
        </div>
      </section>

      <section className="process section-shell">
        <div className="section-number">03 / PROSES</div>
        <div className="process-layout">
          <div className="process-heading">
            <p className="section-kicker">RINGKAS, TERBUKA, TERARAH</p>
            <h2>Dari pertanyaan yang tepat menuju produk yang siap dipakai.</h2>
          </div>
          <ol className="process-list">
            <li>
              <span>01</span>
              <div>
                <h3>Temukan inti masalah</h3>
                <p>
                  Menyamakan konteks, pengguna, tujuan, dan batasan sebelum
                  memikirkan bentuk solusi.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Bentuk dan uji ide</h3>
                <p>
                  Menyusun alur, prototipe, dan sistem visual untuk menguji
                  keputusan sedini mungkin.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Bangun, ukur, rapikan</h3>
                <p>
                  Mengembangkan solusi, memeriksa kualitas, lalu memperhalus
                  detail berdasarkan penggunaan nyata.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="contact section-shell" id="kontak">
        <div className="contact-orbit" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="section-number">04 / KONTAK</div>
        <p className="section-kicker">PUNYA IDE YANG INGIN DIWUJUDKAN?</p>
        <h2>
          Mari membuat sesuatu yang <em>berarti.</em>
        </h2>
        <a className="contact-email" href="mailto:hello@domainanda.com">
          hello@domainanda.com <span aria-hidden="true">↗</span>
        </a>
        <div className="contact-footer">
          <p>
            Ceritakan singkat tentang proyek, tujuan, dan waktunya. Saya akan
            membalas dengan langkah berikutnya.
          </p>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href="#top">Kembali ke atas ↑</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 NAMA ANDA</span>
        <span>DIBUAT DENGAN RASA INGIN TAHU + KOPI</span>
      </footer>
    </main>
  );
}
