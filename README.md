# Personal Portfolio

Portofolio satu halaman untuk web developer dengan layout blog yang sederhana,
tema gelap dan terang, navigasi pencarian, serta kartu Open Graph khusus.

## Menjalankan proyek

Gunakan Node.js `>=22.13.0`, lalu:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Untuk memeriksa build produksi:

```bash
npm run build
npm test
```

## Mengganti identitas dan isi

Semua konten utama berada di `app/page.tsx`.

- Identitas Setyo Agung Prabowo dan deskripsi profesional berada langsung di
  komponen halaman.
- Proyek aktual beserta tautan GitHub berada pada konstanta `projects`.
- Ganti alamat `hello@domainanda.com`.
- Ganti tautan GitHub dan LinkedIn di bagian kontak.
- Sesuaikan palet, tipografi, serta jarak di `app/globals.css`.

Metadata pencarian dan social preview berada di `app/layout.tsx`. Gambar
pratinjau sosial tersedia di `public/og.png`.

## Struktur penting

```text
app/
  globals.css       # seluruh sistem visual dan responsive layout
  layout.tsx        # metadata, social card, dan font
  page.tsx          # konten dan interaksi portofolio
public/
  og.png            # kartu pratinjau saat tautan dibagikan
tests/
  rendered-html.test.mjs
```

## Teknologi

- React dan Next.js
- vinext dan Vite
- Cloudflare Workers-compatible output
- CSS responsif tanpa UI framework tambahan
