import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Award, Calendar, TrendingUp, CheckCircle, Users, ArrowUpRight, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SiswaProfile from './SiswaProfile';
import SiswaGrades from './SiswaGrades';
import SiswaSchedule from './SiswaSchedule';
import SiswaAchievements from './SiswaAchievements';

function SiswaOverview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const stats = [
    { title: 'Kelas', value: user?.className || 'X-MIPA-1', sub: 'Tahun Ajaran 2024/2025', icon: BookOpen, accent: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Rata-rata Nilai', value: '88.5', sub: 'Semester Aktif', icon: TrendingUp, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Kehadiran', value: '98%', sub: 'Tingkat Presensi', icon: CheckCircle, accent: 'text-violet-400', bg: 'bg-violet-500/10' },
    { title: 'Prestasi', value: '4', sub: 'Total Pencapaian', icon: Award, accent: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  const todaySchedule = [
    { time: '07:30', subject: 'Matematika Peminatan', teacher: 'Ibu Siti Aminah', room: 'R.302' },
    { time: '09:00', subject: 'Bahasa Inggris', teacher: 'Mr. James Wilson', room: 'Lab Bahasa' },
    { time: '10:30', subject: 'Fisika', teacher: 'Pak Bambang', room: 'R.302' },
    { time: '13:00', subject: 'Kimia', teacher: 'Ibu Rini', room: 'Lab IPA' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
        <span className="text-sm text-slate-500 font-medium">Memuat data...</span>
      </div>
    );
  }

  const firstName = user?.name?.split(' ')[0] || 'Siswa';

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">Selamat datang kembali 👋</p>
          <h2 className="text-2xl font-bold text-white">Halo, {firstName}!</h2>
          <p className="text-sm text-slate-500 mt-1">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 scola-card rounded-xl">
          <Calendar className="w-4 h-4 text-blue-400" />
          <div>
            <p className="text-[11px] text-slate-500 leading-none">Tahun Ajaran</p>
            <p className="text-sm font-semibold text-white mt-0.5">2024/2025 · Genap</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="scola-stat-card p-5">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-4 h-4 ${stat.accent}`} />
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">{stat.title}</p>
            <p className="text-[11px] text-slate-600 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Body Grid */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Today's Schedule */}
        <div className="lg:col-span-3 scola-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Jadwal Hari Ini</h3>
            </div>
            <Link to="schedule" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Semua jadwal <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {todaySchedule.map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-14 text-center flex-shrink-0">
                  <p className="text-sm font-semibold text-white">{s.time}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">WIB</p>
                </div>
                <div className="w-px h-10 bg-white/10 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white leading-tight">{s.subject}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{s.teacher}</p>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg flex-shrink-0">
                  {s.room}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="lg:col-span-2 scola-card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Akses Cepat</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Menu utama portal siswa</p>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: 'Lihat Nilai & Rapor', sub: 'Semester aktif', href: 'grades', icon: BookOpen, accent: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: 'Pencapaian Saya', sub: 'Sertifikat & Prestasi', href: 'achievements', icon: Award, accent: 'text-amber-400', bg: 'bg-amber-500/10' },
              { label: 'Profil Siswa', sub: 'Informasi pribadi', href: 'profile', icon: Users, accent: 'text-violet-400', bg: 'bg-violet-500/10' },
              { label: 'Jadwal Pelajaran', sub: 'Timeline mingguan', href: 'schedule', icon: Calendar, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            ].map((item, i) => (
              <Link key={i} to={item.href} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] transition-all group">
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-4 h-4 ${item.accent}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white leading-tight">{item.label}</p>
                  <p className="text-[11px] text-slate-500">{item.sub}</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Info card */}
          <div className="mx-4 mb-4 p-4 rounded-xl bg-blue-600/8 border border-blue-500/15">
            <p className="text-xs font-semibold text-blue-300">💡 Info Akademik</p>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Wali kelas: <span className="text-white font-medium">Drs. Sudirman</span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Semester Genap 2024/2025 sedang berjalan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SiswaDashboard() {
  return (
    <Routes>
      <Route path="/" element={<SiswaOverview />} />
      <Route path="/profile" element={<SiswaProfile />} />
      <Route path="/grades" element={<SiswaGrades />} />
      <Route path="/schedule" element={<SiswaSchedule />} />
      <Route path="/achievements" element={<SiswaAchievements />} />
    </Routes>
  );
}