# SCOLA — Sistem Informasi Akademik SMAIT Nur Hidayah Sukoharjo

Portal akademik berbasis web untuk **SMAIT Nur Hidayah Sukoharjo**. Mengintegrasikan
administrasi kelas, input nilai oleh guru, rapot online siswa, pencatatan prestasi,
pelanggaran, bimbingan konseling, dan data alumni.

Dikembangkan berdasarkan hasil wawancara Bapak **Nur Suci Aprilianto S.Pd. Gr.**
(Wakil Kepala Bidang Kehumasan) pada 15 Maret 2026.

## Fitur Utama

- **Multi-role login** — Admin, Guru, dan Siswa.
- **Manajemen kelas** — Kelas 10 dipisah putra (1–5) dan putri (6–10); kelas 11
  dibagi menurut rumpun peminatan (A/B/C).
- **Rumpun peminatan** — Rumpun A Kesehatan (2 kls), Rumpun B Teknik (1 kls),
  Rumpun C Sosial (2 kls) — dipilih siswa mulai kelas 10 semester 2.
- **Input nilai terintegrasi** — Guru menginput, wali kelas memverifikasi, siswa
  melihat rapot online setiap semester.
- **Pencatatan prestasi & BK** — Termasuk pelanggaran dan keanggotaan
  ekstrakurikuler.
- **Penjadwalan anti-bentrok** — Penjadwalan otomatis antar guru dan antar kelas.
- **Chatbot AI** — Menjawab pertanyaan tentang sekolah (Groq + Llama 3.3).
- **Impor & ekspor** — Impor siswa/guru dari Excel, ekspor akun ke PDF/Excel.
- **Data alumni** — Pencatatan track record lulusan (mulai angkatan 2023).

## Prasyarat

- Node.js 18+
- Firebase project dengan Firebase Data Connect aktif
- API key Groq untuk chatbot (opsional)

## Menjalankan Secara Lokal

1. Install dependencies
   ```cmd
   npm install
   ```
2. Salin `.env.example` menjadi `.env` lalu isi nilai yang diperlukan:
   - Konfigurasi Firebase (project id, api key, dll)
   - `VITE_GROQ_API_KEY` untuk chatbot
3. Jalankan dev server
   ```cmd
   npm run dev
   ```
   Aplikasi tersedia di http://localhost:3000.

## Build Production

```cmd
npm run build
npm run preview
```

## Membuat Data Demo

Setelah login sebagai admin, buka menu **Pengguna** lalu klik **Buat Data Demo**
untuk mengisi database dengan akun admin/guru/siswa, rumpun A/B/C, kelas, dan mata
pelajaran siap pakai.

Akun demo default (pasca seed):

| Role  | Email           | Password    |
| ----- | --------------- | ----------- |
| Admin | admin@demo.com  | Admin@123   |
| Guru  | guru@demo.com   | Guru@123    |
| Siswa | siswa@demo.com  | Siswa@123   |

## Catatan

- Akun khusus orang tua belum tersedia; komunikasi dengan orang tua masih ditangani
  wali kelas secara langsung, telepon, WhatsApp, atau kunjungan.
- Sesuai kebijakan sekolah, siswa mengakses portal dari tablet resmi saat berada di
  sekolah, atau perangkat pribadi di luar jam sekolah.
