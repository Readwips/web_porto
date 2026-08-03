"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { useNavigationMotion } from "./navigation-motion-provider";

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

export type PortfolioView = "home" | "works" | "about";

export default function Portfolio({ view }: { view: PortfolioView }) {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const { navbarIntroPlayed, markNavbarIntroPlayed } = useNavigationMotion();
  const [navbarShouldAnimate] = useState(() => !navbarIntroPlayed);
  const pendingHref = useRef<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navbarVisibility, setNavbarVisibility] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openProject, setOpenProject] = useState<number | null>(0);
  const [selectedTechnology, setSelectedTechnology] = useState("Laravel");
  const [leavingPath, setLeavingPath] = useState<string | null>(null);
  const isPageLeaving = leavingPath === pathname;

  useEffect(() => {
    markNavbarIntroPlayed();
  }, [markNavbarIntroPlayed]);

  useEffect(() => {
    pendingHref.current = null;
  }, [pathname]);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      setNavbarVisibility(Math.max(0, 1 - window.scrollY / 160));
      setShowBackToTop(window.scrollY > 520);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const navigateToPage = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
    targetView: PortfolioView,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (targetView === view) {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      return;
    }

    if (pendingHref.current) return;

    pendingHref.current = href;
    setLeavingPath(pathname);
  };

  const completePageExit = () => {
    if (!isPageLeaving || !pendingHref.current) return;

    router.push(pendingHref.current, { scroll: true });
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches || !finePointer.matches) return;

    let targetScroll = window.scrollY;
    let frameId = 0;

    const animateScroll = () => {
      const distance = targetScroll - window.scrollY;

      if (Math.abs(distance) < 0.5) {
        window.scrollTo(0, targetScroll);
        frameId = 0;
        return;
      }

      window.scrollTo(0, window.scrollY + distance * 0.12);
      frameId = window.requestAnimationFrame(animateScroll);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.deltaY === 0 ||
        Math.abs(event.deltaY) < Math.abs(event.deltaX)
      ) {
        return;
      }

      event.preventDefault();

      const deltaScale =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 18
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );

      targetScroll = Math.min(
        Math.max(targetScroll + event.deltaY * deltaScale * 0.9, 0),
        maxScroll,
      );

      if (!frameId) {
        frameId = window.requestAnimationFrame(animateScroll);
      }
    };

    const syncTarget = () => {
      if (!frameId) targetScroll = window.scrollY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", syncTarget, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncTarget);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const selectedTechnologyData =
    technologies.find((technology) => technology.name === selectedTechnology) ??
    technologies[0];

  return (
    <main className="portfolio">
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <header
        className={`topbar ${navbarVisibility === 0 ? "topbar-hidden" : ""}`}
        style={{
          opacity: navbarVisibility,
          transform: `translate3d(0, ${-16 * (1 - navbarVisibility)}px, 0)`,
        }}
      >
        <motion.nav
          className="nav-menu"
          aria-label="Navigasi utama"
          initial={
            navbarShouldAnimate ? { opacity: 0, y: 32 } : false
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            reducedMotion
              ? { duration: 0.06 }
              : { duration: 0.3, ease: "easeOut" }
          }
        >
          <Link
            className={view === "home" ? "active" : ""}
            href="/"
            scroll={true}
            onClick={(event) => navigateToPage(event, "/", "home")}
            aria-current={view === "home" ? "page" : undefined}
          >
            Beranda
          </Link>
          <Link
            className={view === "works" ? "active" : ""}
            href="/karya"
            scroll={true}
            onClick={(event) => navigateToPage(event, "/karya", "works")}
            aria-current={view === "works" ? "page" : undefined}
          >
            Karya
          </Link>
          <Link
            className={view === "about" ? "active" : ""}
            href="/tentang"
            scroll={true}
            onClick={(event) => navigateToPage(event, "/tentang", "about")}
            aria-current={view === "about" ? "page" : undefined}
          >
            Tentang
          </Link>
        </motion.nav>
      </header>

      <section className="banner" id="top" aria-label="Sampul portofolio">
        <Image
          className="banner-image"
          src="/vivy-background.jpg"
          alt="Ilustrasi pegunungan hijau di atas hamparan awan"
          width={1240}
          height={2048}
          sizes="100vw"
          priority
        />
      </section>

      <div className="content-shell">
        <aside className="sidebar" aria-label="Profil dan keahlian">
          <section className="profile-card">
            <div className="avatar">
              <Image
                src="/vivy.jpg"
                alt="Avatar pixel art berambut biru"
                width={960}
                height={960}
                priority
              />
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
                <FaFacebookF aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/readwips/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Setyo Agung Prabowo"
                title="Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                href="https://github.com/Readwips"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Setyo Agung Prabowo"
                title="GitHub"
              >
                <FaGithub aria-hidden="true" />
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

        <AnimatePresence mode="wait" onExitComplete={completePageExit}>
          {!isPageLeaving && (
            <motion.article
              className="article-card"
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              exit={{
                opacity: 0,
                ...(reducedMotion ? {} : { y: -8 }),
                transition: { duration: 0.22, ease: "easeOut" },
              }}
            >
          {view !== "works" && (
            <>
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

            </>
          )}

          {view !== "about" && (
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

          )}

          {view === "home" && <hr />}

          {view !== "works" && (
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
          )}

            </motion.article>
          )}
        </AnimatePresence>
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
