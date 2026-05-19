import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Shield,
  Users,
  BookOpen,
  Target,
  Building2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Microscope,
  Dumbbell,
  Globe,
  MessageCircle,
  X,
  Sun,
  Moon,
  Menu,
  ArrowRight,
  Sparkles,
  LineChart,
  FileSpreadsheet,
  CalendarClock,
  Trophy,
  UserCog,
  Tablet,
  FileCheck2,
  Percent,
  Home,
  ClipboardList,
  Award,
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import { useTheme } from '@/contexts/ThemeContext';
import schoolHero from '../../photo_2026-05-18_06-40-38.jpg';

const SCHOOL = {
  name: 'SMAIT Nur Hidayah',
  fullName: 'SMA Islam Terpadu Nur Hidayah Sukoharjo',
  tagline: 'Membentuk Generasi Rabbani yang Berprestasi',
  founded: 2008,
  address: 'Jl. Pandawa No.10, Dusun III, Pucangan, Kec. Kartasura, Kab. Sukoharjo, Jawa Tengah 57168',
  phone: '+62 271 768 6521',
  ppdbPhone: '+62 813-2523-1515',
  ppdbWhatsapp: '+62 813 9367 8727',
  email: 'smaitnhsolo@gmail.com',
  website: 'https://smaitnh.sch.id',
  ppdbUrl: 'https://sis.smaitnh.sch.id/pendaftaran',
  accreditation: 'A',
  npsn: '20341554',
  yayasan: 'Yayasan Nur Hidayah Surakarta',
  jaringan: 'JSIT Indonesia',
};

const HERO_STATS = [
  { icon: Shield, label: 'Akreditasi', value: 'A' },
  { icon: Award, label: 'Alumni', value: '90% ke PT impian', note: 'Data angkatan 14, 2024' },
  { icon: Trophy, label: 'Ekstrakurikuler', value: '30+' },
  { icon: FileCheck2, label: 'PPDB', value: 'Jalur rapor dan reguler' },
];

const RUMPUNS = [
  {
    icon: Microscope,
    accent: 'blue',
    code: 'Rumpun A',
    title: 'Kelompok Kesehatan',
    desc: 'Mendalami Matematika, Fisika, Kimia, dan Biologi untuk jalur kedokteran, farmasi, keperawatan, dan bidang kesehatan lain.',
    tags: ['2 kelas', 'Matematika', 'Fisika', 'Kimia', 'Biologi'],
  },
  {
    icon: Globe,
    accent: 'emerald',
    code: 'Rumpun B',
    title: 'Kelompok Teknik',
    desc: 'Fokus pada Matematika Tingkat Lanjut, Fisika, Kimia, dan Biologi untuk arah teknik, informatika, sipil, dan rekayasa.',
    tags: ['1 kelas', 'Matematika Lanjut', 'Fisika', 'Kimia', 'Biologi'],
  },
  {
    icon: BookOpen,
    accent: 'amber',
    code: 'Rumpun C',
    title: 'Kelompok Sosial dan Humaniora',
    desc: 'Mendalami Ekonomi, Sosiologi, Geografi, dan Sejarah untuk jalur hukum, bisnis, komunikasi, dan dakwah.',
    tags: ['2 kelas', 'Ekonomi', 'Sosiologi', 'Geografi', 'Sejarah'],
  },
] as const;

const PPDB_PROGRAMS = [
  {
    icon: Percent,
    title: 'Jalur Rapor dan Beasiswa',
    desc: 'Rata-rata nilai mapel inti minimal 85. Tersedia beasiswa 75%, 50%, dan 25% untuk peringkat tertentu dari jalur rapor.',
  },
  {
    icon: FileCheck2,
    title: 'Jalur Reguler',
    desc: 'Seleksi akademik untuk Matematika, Bahasa Indonesia, dan Bahasa Inggris. Peringkat terbaik mendapat cashback.',
  },
  {
    icon: BookOpen,
    title: 'Program Tahfizhul Quran',
    desc: 'Tambahan hafalan minimal 15 juz selama sekolah, dengan seleksi wawancara dan syarat hafalan minimal 10 juz.',
  },
  {
    icon: Home,
    title: 'Wisma Santri',
    desc: 'Wisma Tahfizh menambah 10 juz dan Wisma Al Quran menambah 4 juz, didampingi musyrif dan musyifah.',
  },
] as const;

const SYSTEM_FEATURES = [
  {
    icon: FileSpreadsheet,
    title: 'Input nilai terintegrasi',
    desc: 'Guru mata pelajaran menginput nilai langsung ke sistem, lalu wali kelas memantau dan memverifikasi.',
  },
  {
    icon: LineChart,
    title: 'Rapot online semesteran',
    desc: 'Siswa bisa melihat nilai, tren perkembangan, dan rekap semester dari portal yang sama.',
  },
  {
    icon: CalendarClock,
    title: 'Jadwal pelajaran terpusat',
    desc: 'Jadwal tersusun per kelas, guru, semester, dan tahun ajaran untuk menghindari bentrok.',
  },
  {
    icon: UserCog,
    title: 'Penjurusan A, B, C',
    desc: 'Penempatan kelas 10 dan peminatan kelas 11 dikelola berdasarkan pilihan, nilai, dan kuota.',
  },
  {
    icon: Trophy,
    title: 'Prestasi dan alumni',
    desc: 'Catatan prestasi siswa dan data alumni tersimpan dalam satu alur yang saling terhubung.',
  },
  {
    icon: MessageCircle,
    title: 'Chatbot dan notifikasi',
    desc: 'Asisten virtual dan notifikasi internal membantu pengguna menavigasi informasi akademik.',
  },
] as const;

const FACILITIES = [
  { icon: Building2, label: 'Masjid sekolah', desc: 'Ibadah harian dan kegiatan halaqah.' },
  { icon: Microscope, label: 'Laboratorium IPA', desc: 'Fisika, Kimia, dan Biologi.' },
  { icon: Globe, label: 'Laboratorium komputer', desc: 'Informatika dan pembelajaran digital.' },
  { icon: BookOpen, label: 'Perpustakaan', desc: 'Buku, referensi, dan ruang baca.' },
  { icon: Dumbbell, label: 'Lapangan olahraga', desc: 'Basket, futsal, voli, dan panahan.' },
  { icon: Home, label: 'Wisma tahfizh', desc: 'Tempat tinggal siswa dari dalam dan luar kota.' },
] as const;

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
};

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  const shellClass = isDark
    ? 'bg-slate-950 text-slate-100'
    : 'bg-slate-50 text-slate-900';

  const surfaceClass = isDark
    ? 'bg-white/5 border-white/10'
    : 'bg-white border-slate-200';

  const mutedSurfaceClass = isDark
    ? 'bg-slate-900/70 border-white/10'
    : 'bg-white/90 border-slate-200';

  return (
    <div className={`min-h-screen overflow-x-hidden ${shellClass}`} style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl ${isDark ? 'bg-slate-950/85 border-white/10' : 'bg-white/85 border-slate-200'}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold leading-none text-white">SCOLA</div>
              <div className="mt-0.5 text-[11px] text-slate-400">SMAIT Nur Hidayah Sukoharjo</div>
            </div>
          </div>

          <nav className={`hidden items-center gap-8 text-sm font-medium md:flex ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <a href="#profil" className="hover:text-blue-500">Profil</a>
            <a href="#jurusan" className="hover:text-blue-500">Jurusan</a>
            <a href="#ppdb" className="hover:text-blue-500">PPDB</a>
            <a href="#sistem" className="hover:text-blue-500">Sistem</a>
            <a href="#fasilitas" className="hover:text-blue-500">Fasilitas</a>
            <a href="#alumni" className="hover:text-blue-500">Alumni</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isDark ? 'bg-white/5 text-slate-200 hover:bg-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              aria-label="Ubah tema"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/login" className="hidden sm:block">
              <Button className="h-10 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-500">
                Portal Akademik <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl md:hidden ${isDark ? 'bg-white/5 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
              aria-label="Buka menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`border-t px-4 py-4 md:hidden ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex flex-col gap-3">
              {['Profil', 'Jurusan', 'PPDB', 'Sistem', 'Fasilitas', 'Alumni'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  {item}
                </a>
              ))}
              <Link to="/login" className="w-full">
                <Button className="h-10 w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-500">
                  Portal Akademik
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="relative isolate overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src={schoolHero} alt="SMAIT Nur Hidayah" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl py-20 lg:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200">
              <Sparkles className="h-3 w-3 text-blue-300" />
              Akreditasi A | Berdiri 2008 | 15+ tahun pengalaman
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              SMAIT Nur Hidayah
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Portal akademik SCOLA untuk nilai, jadwal, penjurusan, prestasi, alumni, dan layanan belajar
              yang terhubung langsung dengan kebutuhan sekolah.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/login">
                <Button className="h-11 rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-500">
                  Masuk Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#ppdb">
                <Button
                  variant="outline"
                  className={`h-11 rounded-xl px-6 font-semibold ${isDark ? 'border-white/15 bg-transparent text-white hover:bg-white/5' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                >
                  Lihat PPDB
                </Button>
              </a>
              <a href={SCHOOL.website} target="_blank" rel="noreferrer">
                <Button
                  variant="outline"
                  className={`h-11 rounded-xl px-6 font-semibold ${isDark ? 'border-white/15 bg-transparent text-white hover:bg-white/5' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                >
                  Website Sekolah
                </Button>
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {HERO_STATS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label}>
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      <Icon className="h-3.5 w-3.5" />
                      {item.label}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                    {'note' in item && item.note ? <p className="mt-1 text-[11px] text-slate-400">{item.note}</p> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="profil" className={`py-20 ${isDark ? 'bg-slate-900/30' : 'bg-slate-100/70'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                <Target className="h-3 w-3" />
                Profil Sekolah
              </div>
              <div className="space-y-4">
                <h2 className={`text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Sekolah Islam Terpadu di Kartasura, Sukoharjo
                </h2>
                <p className={`max-w-2xl text-base leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {SCHOOL.name} berdiri sejak {SCHOOL.founded} di bawah {SCHOOL.yayasan} dan tergabung dalam
                  {` ${SCHOOL.jaringan}.`} Kurikulum Merdeka dijalankan bersama penguatan keislaman, tahfizh,
                  dan pembinaan karakter.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Shield, title: 'Akreditasi', value: `${SCHOOL.accreditation} (Unggul)` },
                  { icon: BookOpen, title: 'Kurikulum', value: 'Kurikulum Merdeka' },
                  { icon: MapPin, title: 'Alamat', value: SCHOOL.address },
                  { icon: Users, title: 'NPSN', value: SCHOOL.npsn },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className={`rounded-2xl border p-4 ${surfaceClass}`}>
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-blue-500" />
                        <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                      </div>
                      <p className={`text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`overflow-hidden rounded-3xl border ${mutedSurfaceClass}`}>
              <img src={schoolHero} alt="Lingkungan SMAIT Nur Hidayah" className="h-72 w-full object-cover sm:h-96" />
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {[
                  { icon: Building2, title: 'Yayasan', value: SCHOOL.yayasan },
                  { icon: Phone, title: 'Telepon', value: SCHOOL.phone },
                  { icon: Mail, title: 'Email', value: SCHOOL.email },
                  { icon: Globe, title: 'Website', value: 'smaitnh.sch.id' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.title}
                        </p>
                        <p className={`mt-1 text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="jurusan" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              <BookOpen className="h-3 w-3" />
              Rumpun Peminatan
            </div>
            <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Tiga rumpun peminatan di kelas 11
            </h2>
            <p className={`mt-4 text-base leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Siswa memilih rumpun peminatan mulai kelas 10 semester 2 berdasarkan minat, bakat, nilai rapor,
              dan kuota tiap rumpun.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {RUMPUNS.map((rumpun) => {
              const Icon = rumpun.icon;
              return (
                <article key={rumpun.code} className={`rounded-3xl border p-6 ${surfaceClass}`}>
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${colorClasses[rumpun.accent]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                      {rumpun.code}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-400">
                      {rumpun.tags[0]}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{rumpun.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{rumpun.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {rumpun.tags.slice(1).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md border px-2 py-1 text-[11px] font-medium ${isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className={`mt-6 rounded-2xl border p-4 text-sm leading-7 ${surfaceClass} ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Penempatan kelas 10 mengacu pada hasil tes dan rapor. Saat masuk kelas 11, siswa diarahkan ke rumpun A,
            B, atau C sesuai pilihan dan kuota sekolah.
          </div>
        </div>
      </section>

      <section id="ppdb" className={`py-20 ${isDark ? 'bg-slate-900/30' : 'bg-slate-100/70'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              <FileCheck2 className="h-3 w-3" />
              PPDB
            </div>
            <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Jalur masuk dan program unggulan
            </h2>
            <p className={`mt-4 text-base leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Referensi resmi PPDB menonjolkan jalur rapor, jalur reguler, program tahfizh, wisma, dan beasiswa
              untuk murid baru.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PPDB_PROGRAMS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={`rounded-3xl border p-6 ${surfaceClass}`}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.desc}</p>
                </article>
              );
            })}
          </div>

          <div className={`mt-6 rounded-3xl border p-6 ${surfaceClass}`}>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Alur pendaftaran
                </p>
                <h3 className={`mt-2 text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  isi formulir, unggah berkas, lalu ikuti seleksi
                </h3>
                <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Pendaftaran dibuka melalui <a href={SCHOOL.ppdbUrl} className="text-blue-500 hover:underline">{SCHOOL.ppdbUrl.replace('https://', '')}</a>.
                  Biaya pendaftaran tercantum Rp355.000 pada brosur resmi.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className={`rounded-2xl border p-4 ${isDark ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-200 bg-blue-50'}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-500">Kontak PPDB</p>
                  <p className={`mt-2 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{SCHOOL.ppdbPhone}</p>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{SCHOOL.ppdbWhatsapp}</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isDark ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-emerald-200 bg-emerald-50'}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-500">Hotline sekolah</p>
                  <p className={`mt-2 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{SCHOOL.phone}</p>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{SCHOOL.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sistem" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              <FileSpreadsheet className="h-3 w-3" />
              Sistem Akademik
            </div>
            <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Aktivitas akademik dalam satu sistem
            </h2>
            <p className={`mt-4 text-base leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Administrasi guru, penjadwalan, penjurusan, prestasi, dan alumni terhubung dalam satu portal untuk
              tiga role utama: admin, guru, dan siswa.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SYSTEM_FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={`rounded-3xl border p-6 ${surfaceClass}`}>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.desc}</p>
                </article>
              );
            })}
          </div>

          <div className={`mt-6 rounded-2xl border p-5 ${isDark ? 'border-amber-500/20 bg-amber-500/10' : 'border-amber-200 bg-amber-50'}`}>
            <div className="flex items-start gap-3">
              <Tablet className={`mt-0.5 h-5 w-5 flex-shrink-0 ${isDark ? 'text-amber-300' : 'text-amber-600'}`} />
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Akses portal di sekolah</p>
                <p className={`mt-1 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Portal dipakai untuk mendukung pembelajaran berbasis tablet sekolah saat jam sekolah, sementara
                  akses pribadi tetap tersedia di luar jam sekolah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fasilitas" className={`py-20 ${isDark ? 'bg-slate-900/30' : 'bg-slate-100/70'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              <Building2 className="h-3 w-3" />
              Sarana dan Prasarana
            </div>
            <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fasilitas sekolah
            </h2>
            <p className={`mt-4 text-base leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sarana pendukung kegiatan belajar, ibadah, olahraga, dan pengembangan diri murid.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {FACILITIES.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className={`flex items-center gap-4 rounded-2xl border p-5 ${surfaceClass}`}>
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</h3>
                    <p className={`mt-1 text-xs leading-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="alumni" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              <Users className="h-3 w-3" />
              Jejak Alumni
            </div>
            <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Alumni sebagai referensi dan arah belajar
            </h2>
            <p className={`mt-4 text-base leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Rekam jejak alumni dirapikan untuk membantu siswa aktif melihat arah studi lanjut dan karier.
              Di brosur resmi, 90% alumni angkatan 14 tahun 2024 masuk perguruan tinggi impian.
            </p>
          </div>

          <div className={`rounded-3xl border p-6 ${surfaceClass}`}>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Periode data
                </p>
                <div className={`mt-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Sejak 2023</div>
                <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Data alumni lama sedang dirapikan dari arsip ke sistem.
                </p>
              </div>
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Fokus data
                </p>
                <div className={`mt-2 text-base font-semibold leading-7 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Lanjut studi, profesi, dan kontak alumni untuk bimbingan karier siswa aktif.
                </div>
              </div>
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Akses data
                </p>
                <div className={`mt-2 text-base font-semibold leading-7 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Admin, BK, dan pihak sekolah
                </div>
                <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Data pribadi alumni tetap dijaga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl border p-8 md:p-12 ${surfaceClass}`}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className={`text-2xl font-bold md:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Masuk ke portal akademik
                </h2>
                <p className={`mt-3 text-sm leading-7 md:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Akun dibuat oleh admin sekolah. Gunakan email dan kata sandi yang sudah diberikan untuk masuk ke
                  dashboard masing-masing role.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/login">
                  <Button className="h-11 rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-500">
                    Masuk Portal <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href={SCHOOL.ppdbUrl} target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    className={`h-11 rounded-xl px-6 font-semibold ${isDark ? 'border-white/15 bg-transparent text-white hover:bg-white/5' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                  >
                    Daftar PPDB
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`border-t py-12 ${isDark ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>SCOLA</div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Sistem Informasi Akademik
                  </div>
                </div>
              </div>
              <p className={`max-w-sm text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {SCHOOL.name} adalah portal akademik untuk mendukung layanan nilai, jadwal, penjurusan, alumni,
                dan komunikasi sekolah.
              </p>
            </div>

            <div>
              <h4 className={`mb-3 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Kontak</h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                  <span className="text-xs leading-6">{SCHOOL.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-blue-500" />
                  <span className="text-xs">{SCHOOL.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-blue-500" />
                  <span className="text-xs">{SCHOOL.email}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`mb-3 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Tautan</h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li><a href="#profil" className="hover:text-blue-500">Profil Sekolah</a></li>
                <li><a href="#jurusan" className="hover:text-blue-500">Rumpun Peminatan</a></li>
                <li><a href="#ppdb" className="hover:text-blue-500">PPDB</a></li>
                <li><a href="#sistem" className="hover:text-blue-500">Fitur Portal</a></li>
                <li><Link to="/login" className="hover:text-blue-500">Portal Akademik</Link></li>
              </ul>
            </div>
          </div>

          <div className={`flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs md:flex-row ${isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
            <p>(c) 2026 SCOLA | Digunakan oleh {SCHOOL.name}</p>
            <p>NPSN: {SCHOOL.npsn} | Akreditasi {SCHOOL.accreditation}</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className={`flex h-[560px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl ${isDark ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">Asisten SCOLA</p>
                  <p className="mt-0.5 text-[11px] text-white/80">Tanya seputar sekolah dan portal</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/20"
                aria-label="Tutup chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot context="public" />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/40 transition-all hover:scale-105 active:scale-95"
          aria-label="Buka chatbot"
        >
          {isChatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
