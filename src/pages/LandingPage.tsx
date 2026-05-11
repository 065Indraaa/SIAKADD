import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  GraduationCap, Shield, Users, BookOpen, Target,
  Building2, MapPin, Phone, Mail, ChevronRight,
  Microscope, Dumbbell, Globe, MessageCircle, X,
  Sun, Moon, Menu, ArrowRight, Sparkles,
  LineChart, ClipboardList, FileSpreadsheet, CalendarClock,
  Trophy, UserCog, Tablet, FileCheck2, Info,
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import { useTheme } from '@/contexts/ThemeContext';

// Data sekolah — disusun berdasarkan wawancara dengan pihak SMAIT Nur Hidayah
// (Bapak Nur Suci Aprilianto S.Pd. Gr. — Wakasek Humas, 15 Maret 2026)
const SCHOOL = {
  name: 'SMAIT Nur Hidayah',
  fullName: 'Sekolah Menengah Atas Islam Terpadu Nur Hidayah',
  tagline: 'Membentuk Generasi Rabbani yang Berprestasi',
  founded: 2005,
  address: 'Jl. Pandawa No.10, Dusun III, Kel. Pucangan, Kec. Kartasura, Kab. Sukoharjo, Jawa Tengah 57168',
  phone: '(0271) 741-3222',
  email: 'info@smaitnurhidayah.sch.id',
  website: 'smaitnurhidayah.sch.id',
  accreditation: 'A (Unggul)',
  npsn: '20363244',
  yayasan: 'Yayasan Nur Hidayah Surakarta',
  jaringan: 'Jaringan Sekolah Islam Terpadu (JSIT) Indonesia',
};

const JURUSAN = [
  {
    icon: Microscope,
    kode: 'Rumpun A',
    nama: 'Kelompok Kesehatan',
    desc: 'Mendalami Matematika, Fisika, Kimia, dan Biologi. Diarahkan untuk jalur kedokteran, farmasi, keperawatan, dan ilmu kesehatan lainnya.',
    tags: ['Matematika', 'Fisika', 'Kimia', 'Biologi'],
    color: 'blue',
    kelas: '2 kelas',
  },
  {
    icon: Globe,
    kode: 'Rumpun B',
    nama: 'Kelompok Teknik',
    desc: 'Fokus pada Matematika Tingkat Lanjut, Fisika, Kimia, dan Biologi dengan orientasi teknik. Disiapkan untuk jalur teknik informatika, sipil, arsitektur, dan rekayasa industri.',
    tags: ['Matematika Lanjut', 'Fisika', 'Kimia', 'Biologi'],
    color: 'emerald',
    kelas: '1 kelas',
  },
  {
    icon: BookOpen,
    kode: 'Rumpun C',
    nama: 'Kelompok Sosial & Humaniora',
    desc: 'Mendalami Ekonomi, Sosiologi, Geografi, dan Sejarah. Diarahkan untuk jalur hukum, bisnis, hubungan internasional, komunikasi, dan dakwah.',
    tags: ['Ekonomi', 'Sosiologi', 'Geografi', 'Sejarah'],
    color: 'purple',
    kelas: '2 kelas',
  },
];

const FASILITAS = [
  { icon: Microscope, label: 'Laboratorium IPA', desc: 'Fisika, Kimia, dan Biologi' },
  { icon: BookOpen, label: 'Perpustakaan', desc: 'Buku, kitab, dan referensi digital' },
  { icon: Building2, label: 'Masjid Sekolah', desc: 'Ibadah harian dan kegiatan halaqah' },
  { icon: Dumbbell, label: 'Lapangan Olahraga', desc: 'Basket, futsal, voli, dan panahan' },
  { icon: Globe, label: 'Laboratorium Komputer', desc: 'Penunjang mata pelajaran Informatika' },
  { icon: Tablet, label: 'Akses Tablet', desc: 'Perangkat sekolah untuk mengakses portal' },
];

// Fitur portal akademik, menyelaraskan dengan kebutuhan yang disampaikan pihak sekolah.
const FITUR_SISTEM = [
  {
    icon: FileSpreadsheet,
    title: 'Input Nilai Terintegrasi',
    desc: 'Guru mata pelajaran menginput nilai langsung ke sistem. Wali kelas memantau dan memverifikasi tanpa perlu setoran file manual.',
  },
  {
    icon: LineChart,
    title: 'Rapot Online Semesteran',
    desc: 'Siswa mengakses nilai dan tren perkembangan setiap semester. Rapot online terbuka setelah administrasi lunas.',
  },
  {
    icon: Trophy,
    title: 'Prestasi, BK, & Ekstrakurikuler',
    desc: 'Satu tempat untuk catatan prestasi, pelanggaran, kunjungan BK, dan keanggotaan ekstrakurikuler.',
  },
  {
    icon: UserCog,
    title: 'Pembagian Kelas & Peminatan',
    desc: 'Penempatan kelas 10 berdasarkan nilai tes dan rapot. Kelas 11 dikelompokkan menurut rumpun A, B, atau C.',
  },
  {
    icon: CalendarClock,
    title: 'Jadwal Pelajaran Terpusat',
    desc: 'Penyusunan jadwal terpusat untuk menghindari bentrok guru maupun ruang kelas.',
  },
  {
    icon: ClipboardList,
    title: 'Pantauan Seleksi Perguruan Tinggi',
    desc: 'Siswa dapat melihat peta persaingan nilai dengan siswa lain yang menargetkan kampus dan jurusan serupa.',
  },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-slate-950 text-slate-100'
        : 'bg-white text-slate-900'
    }`} style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Background ambience */}
      <div className="fixed inset-0 pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/15 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-400/15 blur-[120px] rounded-full" />
          </>
        )}
      </div>

      {/* ═══ HEADER ═══ */}
      <header className={`fixed w-full top-0 z-50 backdrop-blur-xl border-b transition-all ${
        isDark ? 'bg-slate-950/80 border-white/10' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-600/30">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className={`text-lg font-bold leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SCOLA</div>
                <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  SMAIT Nur Hidayah Sukoharjo
                </div>
              </div>
            </div>

            {/* Desktop nav */}
            <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <a href="#profil" className="hover:text-blue-500 transition-colors">Profil</a>
              <a href="#jurusan" className="hover:text-blue-500 transition-colors">Jurusan</a>
              <a href="#sistem" className="hover:text-blue-500 transition-colors">Sistem</a>
              <a href="#fasilitas" className="hover:text-blue-500 transition-colors">Fasilitas</a>
              <a href="#alumni" className="hover:text-blue-500 transition-colors">Alumni</a>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme}
                className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                  isDark ? 'bg-white/5 hover:bg-white/10 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                aria-label="Toggle theme">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <Link to="/login" className="hidden sm:block">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 h-10 font-semibold shadow-lg shadow-blue-600/20">
                  Portal Akademik <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden h-10 w-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-white/5 text-slate-200' : 'bg-slate-100 text-slate-700'
                }`}>
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="flex flex-col gap-3">
                {['Profil', 'Jurusan', 'Sistem', 'Fasilitas', 'Alumni'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item}
                  </a>
                ))}
                <Link to="/login" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-10">
                    Portal Akademik
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[72vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border ${
            isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            Akreditasi {SCHOOL.accreditation} · Berdiri {SCHOOL.founded} · NPSN {SCHOOL.npsn}
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Portal akademik resmi {SCHOOL.name}
          </h1>

          <p className={`text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Satu tempat untuk mengakses nilai, jadwal pelajaran, catatan prestasi, bimbingan konseling, dan ekstrakurikuler.
            Dapat diakses siswa, guru, dan staf administrasi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-7 h-11 text-sm font-semibold">
                Masuk Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#profil">
              <Button variant="outline" className={`rounded-xl px-7 h-11 text-sm font-semibold ${
                isDark ? 'border-white/15 bg-transparent text-white hover:bg-white/5' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
              }`}>
                Pelajari sekolah
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ PROFIL ═══ */}
      <section id="profil" className={`py-20 relative ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${
                isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-white text-slate-600 border border-slate-200'
              }`}>
                <Target className="h-3 w-3" /> Profil Sekolah
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Sekolah Islam Terpadu di Kartasura, Sukoharjo
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {SCHOOL.name} berdiri sejak tahun {SCHOOL.founded} di Kecamatan Kartasura, Kabupaten Sukoharjo.
                Berada di bawah {SCHOOL.yayasan} dan tergabung dalam {SCHOOL.jaringan}, sekolah menyelenggarakan
                pendidikan tingkat SMA dengan pendekatan akademik dan keislaman yang terintegrasi.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Akreditasi</h4>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Unggul (A) oleh BAN-S/M</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Kurikulum</h4>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Kurikulum Merdeka — Fase E & F</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-rose-500" />
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>NPSN</h4>
                  </div>
                  <p className={`text-sm font-mono ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{SCHOOL.npsn}</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-amber-500" />
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Struktur Kelas</h4>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>10 kelas per angkatan · ±30 siswa/kelas</p>
                </div>
              </div>
            </div>

            {/* Image card */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl shadow-blue-600/30 relative">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                  alt="Gedung Sekolah"
                  className="w-full h-full object-cover opacity-90 mix-blend-overlay"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-xs font-bold rounded-full bg-white/20 backdrop-blur-md text-white">
                    <Building2 className="h-3 w-3" /> Gedung Utama
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {SCHOOL.address.split(',')[0]}
                  </h3>
                  <p className="text-sm text-white/80">Kartasura, Sukoharjo, Jawa Tengah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ JURUSAN ═══ */}
      <section id="jurusan" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium rounded-full ${
              isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-white text-slate-600 border border-slate-200'
            }`}>
              <BookOpen className="h-3 w-3" /> Rumpun Peminatan
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Tiga rumpun peminatan di kelas 11
            </h2>
            <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Siswa memilih rumpun peminatan mulai kelas 10 semester 2 berdasarkan minat, bakat, dan target kampus.
              Penempatan mempertimbangkan pilihan, nilai, dan kuota tiap rumpun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JURUSAN.map((j, idx) => {
              const colorMap: Record<string, string> = {
                blue: isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-600',
                emerald: isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-600',
                purple: isDark ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-50 text-purple-600',
              };
              return (
                <div key={idx} className={`p-7 rounded-2xl border transition-colors ${
                  isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}>
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-5 ${colorMap[j.color]}`}>
                    <j.icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[11px] font-semibold font-mono px-2 py-0.5 rounded-md ${
                      isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>{j.kode}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-600'
                    }`}>{j.kelas}</span>
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {j.nama}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {j.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {j.tags.map(t => (
                      <span key={t} className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}>{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SISTEM AKADEMIK ═══ */}
      <section id="sistem" className={`py-20 ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium rounded-full ${
              isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-white text-slate-600 border border-slate-200'
            }`}>
              <FileCheck2 className="h-3 w-3" /> Fitur Portal Akademik
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Aktivitas akademik dalam satu sistem
            </h2>
            <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Administrasi guru, pembagian kelas, bimbingan konseling, dan kesiswaan terhubung dalam satu portal.
              Siswa, guru, dan admin mengakses data yang sama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FITUR_SISTEM.map((f, i) => (
              <div key={i} className={`p-6 rounded-2xl border transition-colors ${
                isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {f.title}
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Catatan kebijakan akses sistem */}
          <div className={`mt-10 p-5 rounded-xl border flex flex-col md:flex-row items-start gap-4 ${
            isDark ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200'
          }`}>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-600'
            }`}>
              <Tablet className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h5 className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Akses terbatas di lingkungan sekolah
              </h5>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Siswa tidak diperkenankan membawa ponsel atau laptop pribadi ke sekolah. Portal dapat diakses melalui
                tablet sekolah pada jam sekolah, atau perangkat pribadi di luar jam sekolah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FASILITAS ═══ */}
      <section id="fasilitas" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium rounded-full ${
              isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-white text-slate-600 border border-slate-200'
            }`}>
              <Building2 className="h-3 w-3" /> Sarana & Prasarana
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Fasilitas sekolah
            </h2>
            <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sarana pendukung kegiatan belajar, ibadah, olahraga, dan kegiatan ekstrakurikuler.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FASILITAS.map((f, i) => (
              <div key={i} className={`p-5 rounded-xl border flex items-center gap-4 transition-colors ${
                isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-600'
                }`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{f.label}</h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ALUMNI ═══ */}
      <section id="alumni" className={`py-20 ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium rounded-full ${
              isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-white text-slate-600 border border-slate-200'
            }`}>
              <Users className="h-3 w-3" /> Jejak Alumni
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Pendataan alumni
            </h2>
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Data track record alumni mulai dirapikan sejak angkatan 2023. Sekolah mendata ke mana alumni
              melanjutkan studi atau berkarir, untuk kepentingan bimbingan karir siswa aktif.
            </p>
          </div>

          <div className={`rounded-2xl border p-6 md:p-8 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className={`text-xs font-medium uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Periode Data</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Sejak 2023
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Data angkatan sebelumnya sedang diarsipkan.
                </p>
              </div>
              <div>
                <div className={`text-xs font-medium uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Jenis Data</div>
                <div className={`text-base font-semibold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Institusi studi lanjut, profesi, dan kontak alumni
                </div>
              </div>
              <div>
                <div className={`text-xs font-medium uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Akses</div>
                <div className={`text-base font-semibold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Hanya admin & BK sekolah
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Data pribadi alumni tidak dipublikasikan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl p-8 md:p-12 border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Masuk ke portal akademik
                </h2>
                <p className={`text-sm md:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Akun dibuat oleh admin sekolah. Gunakan email dan kata sandi yang sudah diberikan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link to="/login" className="w-full sm:w-auto">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 h-11 text-sm font-semibold">
                    Masuk portal <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href={`https://${SCHOOL.website}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button variant="outline" className={`w-full rounded-xl px-6 h-11 text-sm font-semibold ${
                    isDark ? 'border-white/15 bg-transparent text-white hover:bg-white/5' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
                  }`}>
                    Website resmi
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={`border-t py-12 ${isDark ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    SCOLA
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Sistem Informasi Akademik
                  </div>
                </div>
              </div>
              <p className={`text-sm leading-relaxed max-w-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {SCHOOL.name} — Mendidik generasi unggul sejak {SCHOOL.founded}.
              </p>
            </div>

            <div>
              <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Kontak</h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span className="text-xs">{SCHOOL.address}</span>
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
              <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Tautan</h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li><a href="#profil" className="hover:text-blue-500">Profil Sekolah</a></li>
                <li><a href="#jurusan" className="hover:text-blue-500">Jurusan</a></li>
                <li><a href="#sistem" className="hover:text-blue-500">Fitur Portal</a></li>
                <li><a href="#alumni" className="hover:text-blue-500">Alumni</a></li>
                <li><Link to="/login" className="hover:text-blue-500">Portal Akademik</Link></li>
              </ul>
            </div>
          </div>

          <div className={`pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-3 text-xs ${
            isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            <p>© 2026 SCOLA · Digunakan oleh {SCHOOL.name}</p>
            <p>NPSN: {SCHOOL.npsn} · Akreditasi {SCHOOL.accreditation}</p>
          </div>
        </div>
      </footer>

      {/* Chatbot FAB */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className={`w-[380px] max-w-[calc(100vw-3rem)] h-[560px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border animate-in slide-in-from-bottom-5 duration-300 ${
            isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">Asisten SCOLA</p>
                  <p className="text-[11px] text-white/80 mt-0.5">Tanya seputar sekolah & portal</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot context="public" />
            </div>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl shadow-xl shadow-blue-600/40 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
          {isChatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
