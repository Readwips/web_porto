import type { ProjectCollection } from "../projects";
import {
  certificates,
  experiences,
  expertise,
  learningItems,
  profile,
  skillGroups,
} from "../portfolio-data";

function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
}: {
  eyebrow: string;
  title: string;
  titleId?: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <SectionHeading
          eyebrow=""
          title="About Me"
          titleId="about-title"
        />
        <div className="about-copy">
          <p>
            Saya merupakan lulusan S1 Sistem Informasi yang berfokus pada IT
            Support dan Data Management. Pengalaman akademik, magang, dan proyek
            mandiri membentuk kemampuan saya dalam troubleshooting perangkat,
            mengolah serta memvalidasi data, menyusun dokumentasi, dan membangun
            aplikasi untuk kebutuhan operasional. Saya menikmati proses memahami
            masalah, merapikan alur kerja, lalu menerjemahkannya menjadi solusi
            digital yang jelas, terukur, dan mudah digunakan.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ExpertiseSection() {
  return (
    <section className="section section-surface" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeading
          eyebrow=""
          title="What I Do"
          titleId="expertise-title"
          description="Tiga area yang menjadi fokus pekerjaan dan pengembangan saya."
        />
        <div className="card-grid expertise-grid">
          {expertise.map((item, index) => (
            <article className="card expertise-card" key={item.title}>
              <span className="card-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul className="inline-list" aria-label={`Cakupan ${item.title}`}>
                {item.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({
  featuredProjects,
  otherProjects,
  githubAvailable,
}: ProjectCollection) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          eyebrow=""
          title="Featured Projects"
          titleId="projects-title"
          description="Pilihan project yang mewakili kemampuan dalam IT support, data, dan pengembangan aplikasi."
        />
        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <article className="project-card" key={project.id}>
              <div className={`project-visual project-visual-${(index % 4) + 1}`}>
                <span>{project.displayName}</span>
                <small>{project.technologies[0]}</small>
              </div>
              <div className="project-content">
                <div className="project-title-row">
                  <h3>{project.displayName}</h3>
                  <span>0{index + 1}</span>
                </div>
                <p>{project.shortDescription}</p>
                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <ul className="tag-list" aria-label={`Teknologi ${project.displayName}`}>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                {(project.updatedAt || project.language) && (
                  <p className="github-meta">
                    {project.language && <span>{project.language}</span>}
                    {project.updatedAt && <span>Diperbarui {project.updatedAt}</span>}
                    {typeof project.stars === "number" && (
                      <span>{project.stars} stars</span>
                    )}
                  </p>
                )}
                <div className="card-actions">
                  <a
                    className="text-link"
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                  {project.demoUrl && (
                    <a
                      className="text-link"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Demo <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="other-projects">
          <div>
            <p className="eyebrow">MORE ON GITHUB</p>
            <h3>Project lainnya</h3>
          </div>
          {otherProjects.length > 0 ? (
            <ul>
              {otherProjects.map((project) => (
                <li key={project.url}>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    <strong>{project.name}</strong>
                    <span>
                      {project.language ?? "Repository"} · {project.updatedAt}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">
              {githubAvailable
                ? "Belum ada repository lain untuk ditampilkan."
                : "Informasi GitHub tambahan sedang tidak tersedia."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section
      className="section section-surface"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow=""
          title="Experience"
          titleId="experience-title"
        />
        <div className="timeline">
          {experiences.map((experience) => (
            <article className="timeline-item" key={experience.role}>
              <div className="timeline-period">
                <time dateTime={experience.startDate}>September 2024</time>
                <span aria-hidden="true">—</span>
                <time dateTime={experience.endDate}>Oktober 2024</time>
              </div>
              <div>
                <h3>{experience.role}</h3>
                <p className="company">{experience.company}</p>
                <p className="location">{experience.location}</p>
                <ul className="responsibility-list">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          eyebrow=""
          title="Skills & Technologies"
          titleId="skills-title"
          description="Dikelompokkan berdasarkan area kerja agar kemampuan utama mudah dipindai."
        />
        <div className="card-grid skills-grid">
          {skillGroups.map((group) => (
            <article className="card skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="skill-list" aria-label={`Skill ${group.title}`}>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificatesSection() {
  return (
    <section
      className="section section-surface"
      id="certificates"
      aria-labelledby="certificates-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow=""
          title="Certificates"
          titleId="certificates-title"
        />
        <div className="certificate-list">
          {certificates.map((certificate) => (
            <article className="certificate-card" key={certificate.name}>
              <div>
                <span>{certificate.year}</span>
                <h3>{certificate.name}</h3>
                <p className="company">{certificate.issuer}</p>
              </div>
              <p>{certificate.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LearningSection() {
  return (
    <section className="section" id="learning" aria-labelledby="learning-title">
      <div className="container">
        <SectionHeading
          eyebrow=""
          title="Currently Learning"
          titleId="learning-title"
          description="Area yang sedang saya perdalam untuk memperkuat kemampuan operasional dan teknis."
        />
        <div className="card-grid learning-grid">
          {learningItems.map((item) => (
            <article className="card learning-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">KONTAK</p>
          <h2 id="contact-title">Mari Terhubung</h2>
          <p>
            Saya terbuka untuk kesempatan di bidang IT Support, Data Management,
            dan posisi terkait teknologi informasi.
          </p>
        </div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>Readwips ↗</strong>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            <strong>Setyo Agung Prabowo ↗</strong>
          </a>
          <a href={profile.cv} download>
            <span>Curriculum Vitae</span>
            <strong>Download CV ↓</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
