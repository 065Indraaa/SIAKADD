import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, Award, Clock, ArrowUpRight, TrendingUp, Book, MoveRight, Loader2 } from 'lucide-react';
import AdminUsers from './AdminUsers';
import AdminClasses from './AdminClasses';
import AdminAlumni from './AdminAlumni';
import AdminMajors from './AdminMajors';
import AdminPenjuruan from './AdminPenjuruan';
import AdminSchedules from './AdminSchedules';
import AdminSubjects from './AdminSubjects';
import { fetchSiswa, fetchGuru } from '@/lib/userService';
import { fetchKelas, fetchAlumni } from '@/lib/schoolService';

function AdminOverview() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({
    siswa: 0,
    guru: 0,
    kelas: 0,
    alumni: 0
  });

  const [recentGuru, setRecentGuru] = React.useState<any[]>([]);
  const [recentSiswa, setRecentSiswa] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadStats = async () => {
      try {
        const [s, g, k, a] = await Promise.all([
          fetchSiswa(),
          fetchGuru(),
          fetchKelas(),
          fetchAlumni()
        ]);
        setData({
          siswa: s.length,
          guru: g.length,
          kelas: k.length,
          alumni: a.length
        });
        // Store recent entries for display
        setRecentGuru(g.slice(0, 3));
        setRecentSiswa(s.slice(0, 3));
      } catch (e) {
        console.error("Failed to load dashboard stats:", e);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statsList = [
    {
      title: 'Total Siswa',
      value: loading ? '...' : data.siswa.toLocaleString(),
      change: '+12%',
      trend: 'up',
      sub: 'dari database',
      icon: Users,
      accent: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Total Guru',
      value: loading ? '...' : data.guru.toLocaleString(),
      change: '+2',
      trend: 'up',
      sub: 'pengajar aktif',
      icon: Users,
      accent: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Total Kelas',
      value: loading ? '...' : data.kelas.toLocaleString(),
      change: '12',
      trend: 'neutral',
      sub: 'ruang belajar',
      icon: BookOpen,
      accent: 'text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      title: 'Alumni Terdaftar',
      value: loading ? '...' : data.alumni.toLocaleString(),
      change: '+320',
      trend: 'up',
      sub: 'lulusan terekam',
      icon: Award,
      accent: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Page Header */}
      <div className="scola-page-header">
        <h2>Panel Administrator</h2>
        <p>Ringkasan sistem informasi akademik — {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsList.map((stat, i) => (
          <div key={i} className="scola-stat-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.accent}`} />
              </div>
              {loading ? <Loader2 className="w-3 h-3 animate-spin text-slate-500" /> : (
                stat.trend === 'up' && (
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> {stat.change}
                  </span>
                )
              )}
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.title}</p>
            <p className="text-[11px] text-slate-600 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Two Column */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Recent Users (Real Data) */}
        <div className="lg:col-span-3 scola-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Pengguna Terdaftar Terbaru</h3>
            </div>
            <Link to="/admin/users" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Lihat semua <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {[...recentGuru.map(g => ({ name: g.name, role: 'Guru', detail: g.nip || '-', email: g.email })),
              ...recentSiswa.map(s => ({ name: s.name, role: 'Siswa', detail: s.nis || '-', email: s.email }))
            ].slice(0, 6).map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-8 h-8 rounded-xl bg-slate-700/50 flex items-center justify-center text-slate-300 text-xs font-semibold flex-shrink-0">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium leading-snug">
                    <span className="font-semibold">{item.name}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.email}</p>
                </div>
                <div className="text-[11px] text-slate-600 flex items-center gap-1 flex-shrink-0 font-medium bg-white/5 px-2 py-1 rounded-lg">
                  {item.role} • {item.detail}
                </div>
              </div>
            ))}
            {recentGuru.length === 0 && recentSiswa.length === 0 && !loading && (
              <div className="py-8 text-center text-slate-500 text-sm">Belum ada pengguna terdaftar.</div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 scola-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Ringkasan Data</h3>
            <span className="text-[11px] font-semibold bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full">
              {data.siswa + data.guru} pengguna
            </span>
          </div>
          <div className="p-4 space-y-3">
            {[
              { label: `${data.guru} Guru Terdaftar`, detail: 'Pengajar aktif', icon: Users },
              { label: `${data.siswa} Siswa Terdaftar`, detail: 'Peserta didik', icon: GraduationCap },
              { label: `${data.kelas} Kelas Aktif`, detail: 'Ruang belajar', icon: BookOpen },
              { label: `${data.alumni} Alumni`, detail: 'Lulusan terekam', icon: Award },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">{item.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="px-4 pb-4 space-y-2">
            <p className="section-label px-1">Akses Cepat</p>
            {[
              { label: 'Kelola Pengguna', href: '/admin/users', icon: Users },
              { label: 'Manajemen Kelas', href: '/admin/classes', icon: BookOpen },
              { label: 'Mata Pelajaran', href: '/admin/subjects', icon: Book },
              { label: 'Data Jurusan', href: '/admin/majors', icon: Award },
              { label: 'Penjuruan Siswa', href: '/admin/penjuruan', icon: MoveRight },
              { label: 'Data Alumni', href: '/admin/alumni', icon: GraduationCap },
            ].map((link, i) => (
              <Link key={i} to={link.href} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] text-slate-400 hover:text-slate-200 transition-colors group">
                <link.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<AdminOverview />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/classes" element={<AdminClasses />} />
      <Route path="/schedules" element={<AdminSchedules />} />
      <Route path="/majors" element={<AdminMajors />} />
      <Route path="/penjuruan" element={<AdminPenjuruan />} />
      <Route path="/alumni" element={<AdminAlumni />} />
      <Route path="/subjects" element={<AdminSubjects />} />
      <Route path="/settings" element={
        <div className="p-8">
          <div className="scola-card p-8 text-slate-400 text-sm">
            Halaman Pengaturan — Segera hadir.
          </div>
        </div>
      } />
    </Routes>
  );
}