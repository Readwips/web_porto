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
  assert.match(html, /Ringkasan Portfolio/);
  assert.match(html, /Terbuka untuk peluang kerja/);
  assert.match(html, /IT Support/);
  assert.match(html, /Data Management/);
  assert.match(html, /About Me/);
  assert.match(html, /What I Do/);
  assert.match(html, /IT Helpdesk &amp; Manajemen Aset/);
  assert.match(html, /Web Katalog Buku/);
  assert.match(html, /Tracking Barang &amp; Kontainer/);
  assert.match(html, /https:\/\/www\.facebook\.com\/loempers/);
  assert.match(html, /https:\/\/www\.instagram\.com\/readwips\//);
  assert.match(html, /https:\/\/github\.com\/Readwips/);
  assert.doesNotMatch(html, /hello@domainanda\.com/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps portfolio metadata and starter cleanup in place", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /portfolio-theme/);
  assert.match(page, /aria-label="Navigasi utama"/);
  assert.match(page, /prefers-color-scheme: light/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /aria-expanded=\{isOpen\}/);
  assert.match(page, /selectedTechnology/);
  assert.match(page, /selectedFocus/);
  assert.match(page, /projectFilter/);
  assert.match(page, /role="tablist"/);
  assert.match(page, /Filter proyek/);
  assert.match(page, /reading-progress/);
  assert.match(page, /back-to-top/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(
    access(
      new URL(
        "app/_sites-preview/SkeletonPreview.tsx",
        templateRoot,
      ),
    ),
  );
  await assert.rejects(access(new URL("public/favicon.svg", templateRoot)));
});
