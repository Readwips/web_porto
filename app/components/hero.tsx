import { profile } from "../portfolio-data";
import HeroPhoto from "./hero-photo";

export default function Hero() {
  return (
    <section className="hero section" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">PEKENALAN</p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-summary">
            Lulusan Sistem Informasi dengan minat pada troubleshooting,
            pengelolaan data, digitalisasi proses, dan pengembangan aplikasi
            yang membantu pekerjaan operasional.
          </p>
          <div className="hero-actions">
            <a className="button hero-action-split-left" href="#projects">
              Lihat Project
            </a>
            <a
              className="button button-secondary hero-action-split-right"
              href={profile.cv}
              download
            >
              Download CV
            </a>
          </div>
          <div className="social-links" aria-label="Tautan profesional">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
        <HeroPhoto />
      </div>
    </section>
  );
}
