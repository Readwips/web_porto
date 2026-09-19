import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/", redirect = "manual") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
      redirect,
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function section(html, id) {
  return html.match(
    new RegExp(`<section\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/section>`),
  )?.[1];
}

test("server-renders the complete single-page portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="id"/i);
  assert.match(html, /Setyo Agung Prabowo/);
  assert.match(html, /IT Support &amp; Data Management/);
  assert.match(html, /Lulusan Sistem Informasi/);
  assert.match(html, /href="#projects"[^>]*>Lihat Project</);
  assert.match(html, /href="\/CV_Setyo_Agung_Prabowo\.pdf"[^>]*download/);
  assert.match(html, /mailto:setyoagungprab@gmail\.com/);
  assert.match(
    html,
    /https:\/\/www\.linkedin\.com\/in\/setyo-agung-prabowo-75b542395/,
  );
  assert.match(html, /https:\/\/github\.com\/Readwips/);

  const ids = [
    "about",
    "projects",
    "experience",
    "skills",
    "certificates",
    "learning",
    "contact",
  ];
  let previousIndex = 0;
  for (const id of ids) {
    const currentIndex = html.indexOf(`id="${id}"`);
    assert.ok(currentIndex > previousIndex, `${id} order`);
    previousIndex = currentIndex;
  }
});

test("uses accessible anchor navigation and a mobile menu", async () => {
  const html = await (await render()).text();
  const nav = html.match(
    /<nav\b[^>]*aria-label="Navigasi utama"[^>]*>([\s\S]*?)<\/nav>/,
  )?.[1];

  assert.ok(nav);
  for (const [label, href] of [
    ["Tentang", "#about"],
    ["Project", "#projects"],
    ["Pengalaman", "#experience"],
    ["Skills", "#skills"],
    ["Sertifikat", "#certificates"],
    ["Kontak", "#contact"],
  ]) {
    assert.match(nav, new RegExp(`href="${href}"[^>]*>${label}<`));
  }
  assert.match(html, /aria-controls="primary-navigation"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /Lewati ke konten utama/);
  assert.doesNotMatch(nav, /href="\/(?:tentang|project|pendalaman)"/);
});

test("renders curated featured projects independently of repository names", async () => {
  const projects = await (await render()).text();
  const projectData = await readFile(
    new URL("../app/project-data.ts", import.meta.url),
    "utf8",
  );
  const names = [
    "IT Helpdesk Ticket Analysis",
    "DeviceWorth",
    "CareerPath",
    "LogiTrack AI",
  ];
  for (const name of names) {
    assert.ok(projects.includes(name), `${name} rendered`);
  }
  assert.equal((projects.match(/class="project-card"/g) ?? []).length, 4);

  assert.doesNotMatch(projects, /<h3>Apk Mmmmm<\/h3>/i);
  assert.match(projectData, /priority: 1/);
  assert.match(projectData, /priority: 2/);
  assert.match(projectData, /priority: 3/);
  assert.match(projectData, /priority: 4/);
  assert.match(projects, /Kotlin/);
  assert.match(projects, /Jetpack Compose/);
  assert.match(projects, /GitHub/);
  assert.match(projects, /Demo/);
  assert.match(projects, /More on GitHub/i);
});

test("keeps local projects when GitHub enrichment is unavailable", async () => {
  const source = await readFile(new URL("../app/projects.ts", import.meta.url), "utf8");
  const projectData = await readFile(
    new URL("../app/project-data.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /const featuredProjects = enrichProjects\(\[\]\)/);
  assert.match(
    source,
    /catch\s*\{\s*return \{ featuredProjects, otherProjects: \[\], githubAvailable: false \}/,
  );
  assert.match(projectData, /repo: "apk_mmmmm"/);
  assert.match(projectData, /displayName: "DeviceWorth"/);
  assert.match(projectData, /priority: 1/);
  assert.match(projectData, /priority: 4/);
});

test("renders detailed experience, categorized skills, certificates, and contact", async () => {
  const html = await (await render()).text();
  const experience = section(html, "experience");
  const skills = section(html, "skills");
  const certificates = section(html, "certificates");
  const contact = section(html, "contact");

  assert.ok(experience);
  assert.match(experience, /Magang — Sekretariat/);
  assert.match(experience, /Dinas Perhubungan Kabupaten Bojonegoro/);
  assert.match(experience, /Mengelola dan melakukan validasi data operasional/);
  assert.match(experience, /Membantu penyusunan laporan/);
  assert.match(experience, /Mendukung kegiatan administrasi/);

  assert.ok(skills);
  assert.match(skills, /IT Support/);
  assert.match(skills, /Data/);
  assert.match(skills, /Development/);
  assert.match(skills, /Hardware Troubleshooting/);
  assert.match(skills, /Excel/);
  assert.match(skills, /Laravel/);

  assert.ok(certificates);
  assert.equal((certificates.match(/<article\b/g) ?? []).length, 4);
  assert.match(certificates, /SQL for Data Science/);
  assert.match(certificates, /Data Analytics Essentials/);
  assert.match(certificates, /Computer Hardware Basics/);
  assert.match(certificates, /Networking Basics/);

  assert.ok(contact);
  assert.match(contact, /Mari Terhubung/);
  assert.match(contact, /setyoagungprab@gmail\.com/);
  assert.match(contact, /LinkedIn/);
  assert.match(contact, /Download CV/);
});

test("cycles profile artwork and reveals sections on scroll", async () => {
  const [html, heroPhoto, scrollReveal, styles] = await Promise.all([
    render().then((response) => response.text()),
    readFile(new URL("../app/components/hero-photo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/scroll-reveal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(html, /vivy\.jpg/);
  assert.match(html, /setyo-profile\.jpg/);
  assert.match(heroPhoto, /window\.setInterval/);
  assert.match(heroPhoto, /window\.clearInterval/);
  assert.match(heroPhoto, /}, 4000\)/);
  assert.doesNotMatch(heroPhoto, /is-revealing/);
  assert.doesNotMatch(heroPhoto, /window\.setTimeout/);
  assert.doesNotMatch(heroPhoto, /prefers-reduced-motion: reduce/);
  assert.match(scrollReveal, /IntersectionObserver/);
  assert.match(scrollReveal, /observer\.disconnect\(\)/);
  assert.match(scrollReveal, /prefers-reduced-motion: reduce/);
  assert.match(styles, /\.hero-photo-layer/);
  assert.match(styles, /aspect-ratio:\s*5 \/ 6/);
  assert.match(styles, /swap-layer-in 800ms/);
  assert.match(styles, /swap-img-in 800ms/);
  assert.match(styles, /swap-img-out 800ms/);
  assert.match(styles, /scale\(1\.15\)/);
  assert.match(styles, /scale\(1\.08\)/);
  assert.match(styles, /image-rendering:\s*pixelated/);
  assert.doesNotMatch(styles, /\.is-revealing/);
  assert.match(styles, /@keyframes hero-title-reveal/);
  assert.match(styles, /@keyframes hero-role-reveal/);
  assert.match(
    styles,
    /\.hero-role\s*\{[^}]*animation:\s*hero-role-reveal 1500ms[^}]*animation-delay:\s*600ms/s,
  );
  assert.match(
    styles,
    /@keyframes hero-role-reveal[\s\S]*clip-path:\s*inset\(-10% -10% 100% -10%\)/,
  );
  assert.match(
    styles,
    /\.hero-summary\s*\{[^}]*animation:\s*hero-role-reveal 1500ms[^}]*animation-delay:\s*1000ms/s,
  );
  assert.doesNotMatch(
    styles,
    /\.hero h1,[\s\S]*animation:\s*none !important/,
  );
  assert.match(styles, /\.reveal-ready/);
  assert.match(styles, /\.is-visible/);

  await access(new URL("../public/vivy.jpg", import.meta.url));
});

test("reveals hero actions using soft illumination reveal", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(styles, /\.site-header/);
  assert.match(styles, /@keyframes navbar-reveal/);
});

test("redirects legacy pages to their homepage sections", async () => {
  for (const [path, destination] of [
    ["/tentang", "/#about"],
    ["/project", "/#projects"],
    ["/pendalaman", "/#learning"],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 308, path);
    assert.equal(new URL(response.headers.get("location")).pathname, "/");
    assert.equal(new URL(response.headers.get("location")).hash, destination.slice(1));
  }
});

test("configures SEO, responsive styles, assets, and worker bindings", async () => {
  const [layout, styles, viteConfig, workerConfig] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../dist/server/wrangler.json", import.meta.url), "utf8"),
  ]);
  const parsedWorkerConfig = JSON.parse(workerConfig);

  assert.match(layout, /https:\/\/setyoagung\.is-a\.dev/);
  assert.match(layout, /alternates: \{ canonical: "\/" \}/);
  assert.match(layout, /Portfolio Setyo Agung Prabowo/);
  assert.match(styles, /scroll-behavior:\s*smooth/);
  assert.match(styles, /scroll-margin-top:\s*80px/);
  assert.match(styles, /@media \(max-width: 1024px\)/);
  assert.match(styles, /@media \(max-width: 768px\)/);
  assert.match(styles, /@media \(max-width: 480px\)/);
  assert.match(styles, /overflow-x:\s*hidden/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /:focus-visible/);
  assert.match(viteConfig, /assets:\s*\{\s*binding:\s*"ASSETS"\s*\}/);
  assert.match(viteConfig, /images:\s*\{\s*binding:\s*"IMAGES"\s*\}/);
  assert.equal(parsedWorkerConfig.assets.binding, "ASSETS");
  assert.equal(parsedWorkerConfig.images.binding, "IMAGES");

  await access(new URL("../public/CV_Setyo_Agung_Prabowo.pdf", import.meta.url));
  await access(new URL("../public/setyo-profile.jpg", import.meta.url));
  await access(new URL("../public/portfolio-gfx-header-v2.png", import.meta.url));
  await access(new URL("../app/robots.ts", import.meta.url));
  await access(new URL("../app/sitemap.ts", import.meta.url));
  await assert.rejects(
    access(new URL("app/navigation-motion-provider.tsx", templateRoot)),
  );
});
