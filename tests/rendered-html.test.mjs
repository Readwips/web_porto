import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
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

test("server-renders the complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="id"/i);
  assert.match(html, /Setyo Agung Prabowo — IT Support &amp; Data Management/);
  assert.match(html, />Beranda</);
  assert.match(html, />Karya</);
  assert.match(html, />Tentang</);
  assert.match(html, /About Me/);
  assert.match(html, /What I Do/);
  assert.match(html, /IT Helpdesk &amp; Manajemen Aset/);
  assert.match(html, /Web Katalog Buku/);
  assert.match(html, /Tracking Barang &amp; Kontainer/);
  assert.match(html, /vivy\.jpg/);
  assert.doesNotMatch(html, /banner-sun|banner-hill|banner-grid/);
  assert.match(html, /Avatar pixel art berambut biru/);
  assert.doesNotMatch(html, /Placeholder foto profil/);
  assert.match(html, /https:\/\/www\.facebook\.com\/loempers/);
  assert.match(html, /https:\/\/www\.instagram\.com\/readwips\//);
  assert.match(html, /https:\/\/github\.com\/Readwips/);
  assert.doesNotMatch(html, /Cari bagian portofolio|Gunakan tema/);
  assert.doesNotMatch(html, /hello@domainanda\.com/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders Karya and Tentang as focused pages", async () => {
  const [worksResponse, aboutResponse] = await Promise.all([
    render("/karya"),
    render("/tentang"),
  ]);

  assert.equal(worksResponse.status, 200);
  assert.equal(aboutResponse.status, 200);

  const [worksHtml, aboutHtml] = await Promise.all([
    worksResponse.text(),
    aboutResponse.text(),
  ]);

  assert.match(worksHtml, /Latest Works/);
  assert.match(worksHtml, /IT Helpdesk &amp; Manajemen Aset/);
  assert.doesNotMatch(worksHtml, /About Me|What I Do|Currently Learning/);

  assert.match(aboutHtml, /About Me/);
  assert.match(aboutHtml, /What I Do/);
  assert.match(aboutHtml, /Currently Learning/);
  assert.doesNotMatch(aboutHtml, /Latest Works|Web Katalog Buku/);
});

test("keeps portfolio metadata and starter cleanup in place", async () => {
  const [page, portfolio, worksPage, aboutPage, layout, packageJson, styles] =
    await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/karya/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/tentang/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    ]);

  assert.match(page, /Portfolio view="home"/);
  assert.match(worksPage, /Portfolio view="works"/);
  assert.match(aboutPage, /Portfolio view="about"/);
  assert.match(portfolio, /aria-label="Navigasi utama"/);
  assert.match(portfolio, /className="nav-menu"/);
  assert.match(portfolio, /href="\/karya"/);
  assert.match(portfolio, /href="\/tentang"/);
  assert.match(portfolio, /scroll=\{true\}/);
  assert.match(portfolio, /view !== "works"/);
  assert.match(portfolio, /view !== "about"/);
  assert.match(portfolio, /className="banner-image"/);
  assert.match(portfolio, /FaFacebookF/);
  assert.match(portfolio, /FaInstagram/);
  assert.match(portfolio, /FaGithub/);
  assert.match(portfolio, /src="\/vivy-background\.jpg"/);
  assert.match(portfolio, /aria-current=/);
  assert.doesNotMatch(portfolio, /portfolio-theme|searchOpen|theme-toggle/);
  assert.match(portfolio, /navbarVisibility/);
  assert.match(portfolio, /1 - window\.scrollY \/ 160/);
  assert.match(portfolio, /translate3d/);
  assert.match(portfolio, /requestAnimationFrame/);
  assert.match(portfolio, /passive:\s*false/);
  assert.match(portfolio, /prefers-reduced-motion:\s*reduce/);
  assert.match(portfolio, /pointer:\s*fine/);
  assert.match(portfolio, /event\.ctrlKey/);
  assert.match(portfolio, /aria-expanded=\{isOpen\}/);
  assert.match(portfolio, /selectedTechnology/);
  assert.match(portfolio, /reading-progress/);
  assert.match(portfolio, /back-to-top/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /\/og\.png/);
  assert.match(styles, /\.nav-menu a\[aria-current="page"\]/);
  assert.match(styles, /\.banner-image\s*\{[^}]*object-fit:\s*cover/s);
  assert.match(styles, /\.banner-image\s*\{[^}]*object-position:\s*center 56%/s);
  assert.match(styles, /\.social-row svg\s*\{[^}]*width:\s*13px/s);
  assert.doesNotMatch(styles, /\.banner::(?:before|after)/);
  assert.doesNotMatch(styles, /filter:\s*brightness/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const navMenuRule = styles.match(/\.nav-menu\s*\{([^}]*)\}/)?.[1] ?? "";
  const topbarRule = styles.match(/\.topbar\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.match(navMenuRule, /width:\s*fit-content/);
  assert.match(navMenuRule, /margin:\s*0 auto/);
  assert.match(navMenuRule, /border-radius:\s*14px/);
  assert.match(navMenuRule, /background:\s*#080b10/);
  assert.doesNotMatch(
    navMenuRule,
    /width:\s*(?:100%|100vw)|(?:left|right):\s*0/,
  );
  assert.match(topbarRule, /background:\s*transparent/);
  assert.match(topbarRule, /position:\s*fixed/);
  assert.match(topbarRule, /inset-inline:\s*0/);
  assert.match(styles, /will-change:\s*opacity, transform/);
  assert.match(styles, /\.topbar-hidden\s*\{[^}]*visibility:\s*hidden/s);
  assert.match(styles, /\.view-enter\s*\{[^}]*animation:\s*view-enter/s);

  await assert.rejects(
    access(
      new URL(
        "app/_sites-preview/SkeletonPreview.tsx",
        templateRoot,
      ),
    ),
  );
  await assert.rejects(access(new URL("public/favicon.svg", templateRoot)));
  await access(new URL("public/vivy.jpg", templateRoot));
  await access(new URL("public/vivy-background.jpg", templateRoot));
});
