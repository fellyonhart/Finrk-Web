# Pinnaz — Ruang Kenangan Kita

Website personal satu halaman (single page) bertema romantis untuk menyimpan cerita, momen foto, dan surat untuk pasangan. Dibangun murni dengan HTML, CSS, dan JavaScript (tanpa framework/build tool).

## ✨ Fitur

- **Mode terang/gelap** — otomatis mengikuti preferensi sistem, bisa diubah manual lewat tombol di navbar, dan tersimpan di `localStorage`.
- **Smooth scroll** dengan [Lenis](https://github.com/darkroomengineering/lenis), dilengkapi indikator progres scroll.
- **Animasi scroll** memakai [GSAP](https://gsap.com/) + ScrollTrigger (lini masa cerita, marquee, dll).
- **Lini masa cerita** ("Cerita kita") dengan garis progres yang mengikuti scroll.
- **Galeri momen** berbentuk marquee foto berjalan dua arah, bisa diklik untuk membuka **lightbox** (navigasi prev/next, keyboard, dan focus-trap untuk aksesibilitas).
- **Surat amplop interaktif** — dua amplop yang bisa dibuka/tutup untuk menampilkan isi surat.
- **Ikon** memakai [Font Awesome](https://fontawesome.com/) (tanpa emoji).
- **Preloader** halaman dan animasi kelopak bunga (petals) dekoratif.
- **Menghormati `prefers-reduced-motion`** — animasi non-esensial otomatis dimatikan.
- Terintegrasi dengan **Vercel Analytics & Speed Insights** (otomatis aktif saat di-deploy ke Vercel).

## 📁 Struktur Proyek

```
.
├── index.html      # Struktur & konten halaman (semua teks dalam Bahasa Indonesia)
├── styles.css      # Seluruh styling, termasuk tema terang/gelap via CSS variables
├── script.js       # Logika interaktif: tema, scroll, lightbox, amplop, marquee, dll
└── src/            # Folder gambar (perlu kamu siapkan sendiri — lihat di bawah)
```


Buat folder `src/` di root proyek lalu masukkan foto-foto kamu dengan nama file yang sama (atau ubah `src="..."` di `index.html` bagian `#momen` sesuai nama file kamu). Format `.webp` disarankan untuk ukuran file yang ringan.

## 🎨 Kustomisasi

**Warna & tema** — semua warna diatur lewat CSS variables di `styles.css`, di bagian paling atas:

```css
:root { --cream: ...; --rose: ...; --ink: ...; ... }
[data-theme="dark"] { ... }
```

Ubah nilai-nilai ini untuk mengganti palet warna terang maupun gelap sekaligus.

**Teks & konten** — semua teks (cerita, surat, label) langsung ada di `index.html`, tinggal disunting sesuai kebutuhan.

**Kontak** — ganti email dan tautan sosial media di bagian `#kontak`:

```html
<a href="mailto:namamu@email.com" class="btn-primary">Kirim Email</a>
<a href="https://www.instagram.com/username/">Instagram</a>
<a href="https://github.com/username">github</a>
```

## 📦 Dependensi Eksternal (via CDN)

| Library | Kegunaan |
|---|---|
| [GSAP](https://gsap.com/) + ScrollTrigger | Animasi berbasis scroll |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth scrolling |
| [Font Awesome 7](https://fontawesome.com/) | Ikon (bulan/matahari, hati, silang, panah) |
| Google Fonts — Cormorant Garamond & Jost | Tipografi |
| Vercel Analytics & Speed Insights | Statistik pengunjung (aktif otomatis di Vercel) |

Semua dimuat lewat CDN — tidak perlu `npm install`.

## ♿ Aksesibilitas

- Semua tombol ikon (tema, tutup, navigasi lightbox, menu mobile) punya `aria-label`.
- Ikon dekoratif ditandai `aria-hidden="true"` agar tidak dibaca screen reader.
- Lightbox mendukung navigasi keyboard (`Esc`, panah kiri/kanan, `Tab` untuk focus-trap).
- Animasi otomatis nonaktif jika pengguna mengaktifkan `prefers-reduced-motion`.

