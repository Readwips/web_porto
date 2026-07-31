import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("keeps portfolio metadata and starter cleanup in place", async () => {
  const [page, layout, packageJson, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-label="Navigasi utama"/);
  assert.match(page, /className="nav-menu"/);
  assert.match(page, /className="banner-image"/);
  assert.match(page, /FaFacebookF/);
  assert.match(page, /FaInstagram/);
  assert.match(page, /FaGithub/);
  assert.match(page, /src="\/vivy-background\.jpg"/);
  assert.match(page, /aria-current=/);
  assert.doesNotMatch(page, /portfolio-theme|searchOpen|theme-toggle/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /navbarVisibility/);
  assert.match(page, /1 - window\.scrollY \/ 160/);
  assert.match(page, /translate3d/);
  assert.match(page, /requestAnimationFrame/);
  assert.match(page, /passive:\s*false/);
  assert.match(page, /prefers-reduced-motion:\s*reduce/);
  assert.match(page, /pointer:\s*fine/);
  assert.match(page, /event\.ctrlKey/);
  assert.match(page, /aria-expanded=\{isOpen\}/);
  assert.match(page, /selectedTechnology/);
  assert.match(page, /reading-progress/);
  assert.match(page, /back-to-top/);
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
