# SCOLA — Sistem Informasi Akademik SMAIT Nur Hidayah Sukoharjo

Portal akademik berbasis web untuk **SMAIT Nur Hidayah Sukoharjo**, dikembangkan berdasarkan hasil wawancara dengan Bapak Nur Suci Aprilianto S.Pd. Gr. (Wakasek Humas) pada 15 Maret 2026.

---

## Tech Stack

| Lapisan | Teknologi | Versi |
|---------|-----------|-------|
| **Frontend** | React + TypeScript | 19 / 5.8 |
| **Build Tool** | Vite | 6.x |
| **Styling** | Tailwind CSS v4 + shadcn/ui | 4.x |
| **Routing** | React Router DOM | 7.x |
| **Database** | Firebase Data Connect (Cloud SQL / PostgreSQL) | 12.x |
| **Query Language** | GraphQL SDL (schema + connector) | — |
| **AI Chatbot** | Groq API (Llama 3.3 70B) | — |
| **Export** | jsPDF + jspdf-autotable + SheetJS (xlsx) | — |
| **Import** | SheetJS (xlsx) | 0.18 |
| **Hosting** | Vercel (frontend) | — |
| **Icons** | Lucide React | 0.546 |
| **Form** | React Hook Form + Zod | — |

> **Tidak membutuhkan Firebase Blaze (berbayar).** Semua fitur berjalan di Firebase Spark (gratis) + Vercel free tier.

---

## Fitur Lengkap

### 👤 Manajemen Pengguna (Admin)
- Tambah pengguna manual (siswa / guru / admin)
- **Import massal via Excel** — upload file `.xlsx`, sistem buat akun otomatis
- Export daftar akun ke **Excel** atau **PDF**
- Edit data pengguna (nama, kontak, kelas, jabatan)
- Hapus pengguna beserta relasi role
- Tampilkan / sembunyikan password
- Buat Data Demo (seed 3 admin + 5 guru + 10 siswa + kelas + jurusan)
- Bersihkan seluruh database (reset)

### 🎓 Kelulusan Siswa
- Tombol **Luluskan** per siswa kelas 12 (ikon topi wisuda di baris tabel)
- Tombol **Proses Kelulusan** — luluskan semua siswa kelas 12 sekaligus
- Data siswa yang diluluskan otomatis masuk ke tabel Alumni
- Nilai, prestasi, dan histori akademik tetap tersimpan
- Tidak membutuhkan Cloud Functions (berjalan langsung di browser)

### 🏫 Manajemen Kelas
- Buat / edit / hapus kelas
- Kelas 10: X-1 s/d X-10 (campur, tanpa pemisahan gender)
- Kelas 11: XI-A (Kesehatan, 2 kls) · XI-B (Teknik, 1 kls) · XI-C (Sosial, 2 kls)
- Kelas 12: XII-A/B/C
- Assign wali kelas per kelas
- Tahun ajaran otomatis (berganti setiap Juli)

### 📚 Rumpun Peminatan
- Preset Rumpun A / B / C (satu klik tambah semua)
- Tambah / edit / hapus rumpun manual
- Siswa memilih rumpun mulai kelas 10 semester 2

### 📖 Mata Pelajaran
- Preset per rumpun (Umum, Rumpun A, B, C)
- Tambah / edit / hapus manual
- Dedup otomatis saat seed (MTK-L tidak dobel)

### 🗓️ Jadwal Pelajaran
- Buat jadwal per kelas, per hari, per semester
- Filter hari + semester + tahun ajaran
- Guru hanya bisa input nilai untuk kelas yang ada di jadwalnya
- Siswa melihat jadwal kelasnya sendiri (filter semester + tahun ajaran)

### 📊 Input Nilai (Guru)
- Dropdown kelas & mapel otomatis dari jadwal mengajar guru
- Input nilai Harian, UTS, UAS
- Nilai akhir dihitung otomatis: 30% Harian + 30% UTS + 40% UAS
- KKM 75
- Simpan semua sekaligus

### 📋 Rapot Online (Siswa)
- Lihat nilai per semester + tahun ajaran
- Rata-rata nilai akhir dengan label (sangat baik / baik / cukup)
- Tombol unduh rapot PDF (placeholder, belum generate)

### 🏆 Prestasi
- **Guru**: catat prestasi siswa (nama lomba, tingkat, peringkat, tanggal, kategori)
- **Siswa**: lihat daftar prestasi sendiri
- Null-safe — tidak crash jika field kosong

### 🎯 Penjurusan Siswa (Admin)
- Tetapkan rumpun peminatan per siswa
- Info panduan: kuota A=2 kls, B=1 kls, C=2 kls
- Filter per tingkat kelas

### 🎯 Pilih Rumpun (Siswa)
- Siswa kelas 10 memilih rumpun A/B/C
- Konfirmasi pilihan + info kuota
- Tersimpan ke database

### 👨‍🎓 Data Alumni (Admin)
- Filter tahun lulus + status (Kuliah/Kerja/Lainnya)
- Pencarian nama, NIS, institusi
- Edit institusi/jabatan kapan saja (update saat alumni pindah kerja/kuliah)
- Stat card: total, kuliah, kerja, lainnya

### 👀 Jejak Alumni (Siswa)
- Hanya tampilkan alumni yang sudah ada data institusi/jabatan
- Filter tahun lulus + status
- Referensi untuk perencanaan studi lanjut

### 🔔 Notifikasi
- Per-role: notif admin tidak muncul di guru/siswa
- Storage per-user (tidak bocor antar akun)
- Tandai baca / hapus / bersihkan semua

### 🤖 Chatbot AI
- Powered by Groq (Llama 3.3 70B) — gratis
- Context berbeda per role (admin/guru/siswa/publik)
- Sapaan pakai nama login
- Knowledge base: info sekolah, rumpun, sistem akademik

### 🌙 Light / Dark Mode
- Toggle di topbar
- Tersimpan di localStorage
- Semua halaman responsif light/dark

### 📱 Responsive
- Mobile-friendly dengan sidebar collapsible
- Tabel dengan horizontal scroll di layar kecil

---

## Fitur yang Belum Selesai / Placeholder

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Unduh Rapot PDF | ⚠️ Placeholder | Tombol ada, belum generate PDF dari data nilai |
| Absensi Siswa | ❌ Belum ada | Schema `Kehadiran` sudah ada di DB, belum ada UI |
| Pengumuman | ❌ Belum ada | Schema `Pengumuman` sudah ada di DB, belum ada UI |
| Halaman Settings | ❌ Placeholder | Menampilkan "Segera hadir" |
| Kehadiran di dashboard siswa | ⚠️ Hardcoded | Nilai `100%` hardcoded, belum dari data nyata |
| Groq API Key di frontend | ⚠️ Risiko | Key ada di bundle JS — bisa dilihat di DevTools |

---

## Prasyarat

- **Node.js** 18+
- **Firebase project** dengan Firebase Data Connect aktif (Spark/gratis)
- **Akun Groq** untuk chatbot (gratis di [console.groq.com](https://console.groq.com))

---

## Menjalankan Secara Lokal

```cmd
# 1. Install dependencies
npm install

# 2. Salin .env.example → .env dan isi nilainya
copy .env.example .env

# 3. Jalankan dev server
npm run dev
```

Buka http://localhost:3000

---

## Konfigurasi `.env`

```env
# Firebase — ambil dari Firebase Console → Project Settings → Your apps
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Groq AI — daftar gratis di https://console.groq.com
VITE_GROQ_API_KEY=
```

---

## Deploy ke Vercel

```cmd
# Build production
npm run build

# Deploy via Vercel CLI
vercel --prod
```

Atau push ke GitHub dan connect ke Vercel — auto-deploy setiap push.

**Environment variables** di Vercel: tambahkan semua key dari `.env` di dashboard Vercel → Settings → Environment Variables.

---

## Membuat Data Demo

1. Login sebagai admin
2. Buka menu **Pengguna**
3. Klik **Buat Data Demo**

Akun yang dibuat:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@demo.com` | `Admin@123` |
| Guru | `guru@demo.com` | `Guru@123` |
| Siswa | `siswa@demo.com` | `Siswa@123` |

---

## Format Import Excel

### Template Siswa

Download template dari menu **Pengguna → Impor Excel → Unduh Templat Siswa**.

| Kolom | Contoh | Wajib |
|-------|--------|-------|
| Nama Lengkap | Ahmad Fauzi | ✅ |
| Jenis Kelamin (L/P) | L | ✅ |
| Tempat Lahir | Jakarta | — |
| Tanggal Lahir (YYYY-MM-DD) | 2008-05-15 | — |
| Alamat | Jl. Merdeka No. 1 | — |
| Telepon | 081234567890 | — |
| Tahun Masuk | 2024 | — |

**Hasil**: sistem otomatis generate NIS dan email (`NIS{tahun}{urutan}@siswa.sma.sch.id`) + password default `Siswa@{6-digit-NIS}`.

### Template Guru

| Kolom | Contoh | Wajib |
|-------|--------|-------|
| Nama Lengkap | Siti Aminah, S.Pd | ✅ |
| Jenis Kelamin (L/P) | P | ✅ |
| NIP (kosongkan untuk auto) | 198807102012032004 | — |
| Jabatan | Guru | — |
| Spesialisasi | Matematika | — |
| Tempat Lahir | Bandung | — |
| Tanggal Lahir (YYYY-MM-DD) | 1985-03-20 | — |
| Telepon | 081298765432 | — |
| Alamat | Jl. Pendidikan No. 5 | — |

**Nilai Jabatan yang valid**: `Guru` · `WaliKelas` · `Kepsek` · `WakilKepsek` · `BK`

**Hasil**: sistem otomatis generate NIP (jika kosong) dan email + password default `Guru@{5-digit-NIP}`.

### Aturan Umum Import
- Format file: `.xlsx` (Excel 2007+)
- Baris pertama = header (otomatis dilewati)
- Baris kosong dilewati otomatis
- Jika ada baris yang gagal, baris lain tetap diproses
- Setelah import, download hasil akun (email + password) dalam format Excel atau PDF

---

## Struktur Database (GraphQL SDL)

```
Pengguna (email, nama, peran: admin|guru|siswa)
├── Guru (nip, jabatan, spesialisasi)
└── Siswa (nis, kelas, jurusan, peminatan, tahunMasuk)

Kelas (nama, tingkat, tahunAjaran, waliKelas, jurusan)
Jurusan (kode, nama)  ← Rumpun A/B/C
MataPelajaran (kode, nama)

Jadwal (kelas, mataPelajaran, guru, hari, jam, semester, tahunAjaran)
Nilai (siswa, mataPelajaran, kelas, semester, tahunAjaran, harian, uts, uas)
Prestasi (siswa, nama, tipe, tingkat, peringkat, tanggal)
Alumni (nis, nama, tahunLulus, status, institusi, jabatanAtauJurusan)
Pengumuman (judul, konten, penulis, isPenting)
Kehadiran (siswa, kelas, tanggal, status: Hadir|Izin|Sakit|Alpa)
```

---

## Tahun Ajaran Otomatis

Sistem menggunakan `src/lib/tahunAjaran.ts`:

- **Tahun ajaran** berganti otomatis setiap **1 Juli**
- Contoh: akses di bulan Agustus 2026 → tahun ajaran `2026/2027`
- Semester Ganjil: Juli–Desember · Semester Genap: Januari–Juni
- Semua halaman (jadwal, nilai, kelas) menggunakan tahun ajaran aktif secara otomatis

---

## Proses Kelulusan (Tanpa Cloud Functions)

Karena menggunakan Firebase Spark (gratis), kelulusan diproses langsung dari browser:

1. Admin buka menu **Pengguna**
2. Klik **Proses Kelulusan** (tombol hijau)
3. Sistem ambil semua siswa kelas 12 → insert ke tabel Alumni
4. Siswa yang NIS-nya sudah ada di alumni dilewati (tidak duplikat)
5. Status default alumni: `Lainnya` — admin update ke `Kuliah`/`Kerja` dari menu Alumni

Atau luluskan satu per satu: klik ikon 🎓 di baris siswa kelas 12.

---

## Catatan Keamanan

- **Firebase API Key** — aman di-expose di frontend (ini desain resmi Google, keamanan diatur via Firebase Security Rules)
- **Groq API Key** — saat ini ada di bundle JS frontend (bisa dilihat di DevTools). Untuk produksi, pindahkan ke Vercel Edge Function sebagai proxy
- **Password akun** — disimpan sebagai plain text di database (untuk kemudahan demo). Untuk produksi, gunakan Firebase Authentication

---

## Struktur Folder

```
src/
├── components/
│   ├── Chatbot.tsx          # AI chatbot (Groq)
│   ├── Layout.tsx           # Sidebar + topbar
│   └── NotificationBell.tsx # Notifikasi per-role
├── contexts/
│   ├── AuthContext.tsx       # Login state
│   ├── NotificationContext.tsx
│   └── ThemeContext.tsx
├── lib/
│   ├── firebase.ts          # Firebase init
│   ├── schoolService.ts     # Query kelas, jadwal, nilai, alumni
│   ├── userService.ts       # Query pengguna, guru, siswa
│   ├── tahunAjaran.ts       # Utility tahun ajaran otomatis
│   ├── useAutoRefresh.ts    # Auto-refresh setiap N detik
│   └── useManualRefresh.ts  # Tombol refresh (bypass cache)
├── pages/
│   ├── admin/               # Dashboard, Users, Classes, dll
│   ├── guru/                # Dashboard, Grades, Achievements, Students
│   └── siswa/               # Dashboard, Grades, Schedule, Profile, dll
└── index.css                # Design tokens + light/dark override
```
