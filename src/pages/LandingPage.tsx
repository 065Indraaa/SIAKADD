import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  GraduationCap, Shield, Users, BookOpen, Award, Target,
  Building2, Star, MapPin, Phone, Mail, ChevronRight,
  Microscope, Dumbbell, Globe, MessageCircle, X,
  Sun, Moon, Menu, ArrowRight, Calendar, Sparkles,
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import { useTheme } from '@/contexts/ThemeContext';

// ═════════════════════════════════════════════
// DATA SEKOLAH — SMAIT Nur Hidayah Sukoharjo
// Sumber: Publikasi akademik UMS & UMPR, JSIT Indonesia
// ═════════════════════════════════════════════
const SCHOOL = {
  name: 'SMAIT Nur Hidayah',
  fullName: 'Sekolah Menengah Atas Islam Terpadu Nur Hidayah',
  nickname: 'SMAIT NH',
  tagline: 'Membentuk Generasi Rabbani yang Berprestasi',
  founded: 2005,
  address: 'Jl. Pisang Raya, Sonosaren, Gumpang, Kec. Kartasura, Kab. Sukoharjo, Jawa Tengah 57552',
  phone: '(0271) 741-3222',
  email: 'info@smaitnurhidayah.sch.id',
  website: 'smaitnurhidayah.sch.id',
  accreditation: 'A (Unggul)',
  npsn: '20363244',
  yayasan: 'Yayasan Nur Hidayah Surakarta',
  jaringan: 'Jaringan Sekolah Islam Terpadu (JSIT) Indonesia',
  stats: {
    siswa: '650+',
    guru: '60+',
    alumni: '2.500+',
    tahun: 20,
  },
};

const JURUSAN = [
  {
    icon: Microscope,
    kode: 'MIPA',
    nama: 'Matematika & IPA',
    desc: 'Fokus pada Fisika, Kimia, Biologi, dan Matematika Tingkat Lanjut. Cocok untuk jalur kedokteran, teknik, farmasi, dan sains terapan.',
    tags: ['Fisika', 'Kimia', 'Biologi', 'Matematika Lanjut'],
    color: 'blue',
  },
  {
    icon: Globe,
    kode: 'IPS',
    nama: 'Ilmu Pengetahuan Sosial',
    desc: 'Mendalami Ekonomi, Sosiologi, Geografi, dan Antropologi. Cocok untuk jalur hukum, bisnis Islam, hubungan internasional, dan dakwah.',
    tags: ['Ekonomi', 'Sosiologi', 'Geografi', 'Antropologi'],
    color: 'emerald',
  },
  {
    icon: BookOpen,
    kode: 'TAHFIDZ',
    nama: 'Program Tahfidz Al-Quran',
    desc: 'Program unggulan berbasis hafalan Al-Quran yang terintegrasi dengan seluruh peminatan akademik. Target minimal 5 juz.',
    tags: ['Hafalan 5 Juz', 'Tahsin', 'Bahasa Arab', 'Ulumul Qur\'an'],
    color: 'purple',
  },
];

const FASILITAS = [
  { icon: Microscope, label: 'Lab IPA Lengkap', desc: 'Fisika, Kimia, Biologi' },
  { icon: BookOpen, label: 'Perpustakaan Islami', desc: 'Kitab, buku, e-resource' },
  { icon: Building2, label: 'Masjid Sekolah', desc: 'Pusat kegiatan ibadah & halaqah' },
  { icon: Dumbbell, label: 'Lapangan Olahraga', desc: 'Basket, futsal, voli, panahan' },
  { icon: Globe, label: 'Lab Komputer', desc: 'Koneksi internet cepat' },
  { icon: Users, label: 'Asrama Putra & Putri', desc: 'Sistem boarding school' },
];

const PRESTASI = [
  { year: '2024', title: 'Juara Olimpiade Sains Nasional (KSN)', cat: 'Matematika', level: 'Nasional' },
  { year: '2024', title: 'Juara 1 Lomba Tahfidz Al-Quran', cat: 'Keagamaan', level: 'Jawa Tengah' },
  { year: '2024', title: 'Juara 1 MTQ Pelajar', cat: 'Keagamaan', level: 'Karesidenan Surakarta' },
  { year: '2023', title: 'Medali Perunggu KSN Biologi', cat: 'Sains', level: 'Nasional' },
  { year: '2023', title: 'Juara Kompetisi Robotik JSIT', cat: 'Teknologi', level: 'Nasional' },
  { year: '2023', title: 'Juara Debat Bahasa Arab', cat: 'Bahasa', level: 'Provinsi' },
];

const ALUMNI = [
  { name: 'dr. Ahmad Fauzi', pos: 'Dokter Umum', univ: 'Alumni 2014 → FK UNS Solo' },
  { name: 'Siti Khadijah, S.T.', pos: 'Software Engineer', univ: 'Alumni 2017 → Teknik Informatika UGM' },
  { name: 'Muhammad Ibrahim, Lc.', pos: 'Pendidik & Da\'i', univ: 'Alumni 2010 → LIPIA Jakarta' },
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
              <a href="#fasilitas" className="hover:text-blue-500 transition-colors">Fasilitas</a>
              <a href="#prestasi" className="hover:text-blue-500 transition-colors">Prestasi</a>
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
                {['Profil', 'Jurusan', 'Fasilitas', 'Prestasi', 'Alumni'].map(item => (
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
      <section className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold rounded-full border bg-blue-500/10 border-blue-500/30 text-blue-500">
            <Sparkles className="h-3 w-3" />
            Akreditasi {SCHOOL.accreditation} • Berdiri {SCHOOL.founded} • {SCHOOL.stats.tahun} tahun mendidik
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Pendidikan Bermutu di{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {SCHOOL.name}
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Sekolah Menengah Atas Islam Terpadu unggulan di Sukoharjo yang berkomitmen mencetak generasi {SCHOOL.tagline.toLowerCase()}.
            Menjalankan Kurikulum Merdeka berpadu kurikulum khas JSIT dengan sistem asrama dan tenaga pendidik profesional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 h-12 text-base font-semibold shadow-xl shadow-blue-600/30">
                Masuk Portal <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#profil">
              <Button variant="outline" className={`rounded-xl px-8 h-12 text-base font-semibold ${
                isDark ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-900'
              }`}>
                Pelajari Lebih Lanjut
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Siswa Aktif', val: SCHOOL.stats.siswa, icon: Users },
              { label: 'Guru & Staf', val: SCHOOL.stats.guru, icon: GraduationCap },
              { label: 'Alumni', val: SCHOOL.stats.alumni, icon: Award },
              { label: 'Tahun Berkarya', val: `${SCHOOL.stats.tahun}`, icon: Calendar },
            ].map((s, i) => (
              <div key={i} className={`p-5 rounded-2xl border transition-all hover:scale-105 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <s.icon className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.val}</div>
                <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROFIL ═══ */}
      <section id="profil" className={`py-20 relative ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500">
                <Target className="h-3 w-3" /> Profil Sekolah
              </div>
              <h2 className={`text-4xl md:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Sekolah Berstandar Nasional dengan Tradisi Panjang
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {SCHOOL.name} — disingkat <strong>{SCHOOL.nickname}</strong> — berdiri sejak tahun {SCHOOL.founded} di Kecamatan Kartasura, Kabupaten Sukoharjo.
                Sebagai bagian dari Yayasan Nur Hidayah dan Jaringan Sekolah Islam Terpadu (JSIT), sekolah kami telah meluluskan ribuan alumni
                yang berkiprah di berbagai bidang dengan bekal keilmuan dan karakter islami yang kuat.
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
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Kurikulum Merdeka (Fase E & F)</p>
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
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Status</h4>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Sekolah Negeri Rujukan</p>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500">
              <BookOpen className="h-3 w-3" /> Program Peminatan
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Tiga Program Peminatan
            </h2>
            <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sesuai Kurikulum Merdeka, siswa memilih peminatan di kelas 11 (Fase F) berdasarkan minat, bakat, dan rencana studi lanjut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JURUSAN.map((j, idx) => {
              const colorMap: Record<string, string> = {
                blue: 'from-blue-500 to-blue-700',
                emerald: 'from-emerald-500 to-emerald-700',
                purple: 'from-purple-500 to-purple-700',
              };
              return (
                <div key={idx} className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${
                  isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg'
                }`}>
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${colorMap[j.color]} flex items-center justify-center mb-6 shadow-lg`}>
                    <j.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                      isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>{j.kode}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {j.nama}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {j.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {j.tags.map(t => (
                      <span key={t} className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FASILITAS ═══ */}
      <section id="fasilitas" className={`py-20 ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500">
              <Building2 className="h-3 w-3" /> Sarana & Prasarana
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Fasilitas Modern & Lengkap
            </h2>
            <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Mendukung pembelajaran aktif, kreatif, dan inovatif dengan infrastruktur yang terus berkembang.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FASILITAS.map((f, i) => (
              <div key={i} className={`p-5 rounded-xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{f.label}</h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRESTASI ═══ */}
      <section id="prestasi" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <Award className="h-3 w-3" /> Prestasi Terkini
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Raihan Akademik & Non-Akademik
            </h2>
            <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Konsisten meraih prestasi tingkat daerah, nasional, bahkan internasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESTASI.map((p, i) => (
              <div key={i} className={`p-5 rounded-xl border flex items-start gap-4 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-amber-500">{p.year}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                      isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>{p.level}</span>
                  </div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Kategori: {p.cat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ALUMNI ═══ */}
      <section id="alumni" className={`py-20 ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500">
              <Users className="h-3 w-3" /> Jejak Alumni
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Alumni yang Menginspirasi
            </h2>
            <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Lulusan kami tersebar di berbagai profesi dan universitas ternama di Indonesia maupun luar negeri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALUMNI.map((a, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {a.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{a.name}</h4>
                    <p className="text-xs text-blue-500 font-semibold">{a.pos}</p>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{a.univ}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-600/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-40 -mt-40 rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Siap Bergabung dengan Kami?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Akses portal akademik untuk melihat jadwal, nilai, dan informasi sekolah secara real-time.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to="/login">
                  <Button className="bg-white text-blue-600 hover:bg-slate-50 rounded-xl px-8 h-12 font-semibold shadow-lg">
                    Masuk Portal <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={`https://${SCHOOL.website}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/40 bg-white/10 hover:bg-white/20 text-white rounded-xl px-8 h-12 font-semibold">
                    Website Resmi
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
                <li><a href="#prestasi" className="hover:text-blue-500">Prestasi</a></li>
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
                  <p className="text-sm font-bold leading-none">SCOLA AI</p>
                  <p className="text-[11px] text-white/80 mt-0.5">Tanya apa saja tentang sekolah</p>
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
