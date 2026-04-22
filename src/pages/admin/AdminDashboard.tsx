import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, Award, Activity, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';
import AdminUsers from './AdminUsers';
import AdminClasses from './AdminClasses';
import AdminMajors from './AdminMajors';
import AdminAlumni from './AdminAlumni';
import AdminSchedules from './AdminSchedules';

const stats = [
  {
    title: 'Total Siswa',
    value: '1.245',
    change: '+12%',
    trend: 'up',
    sub: 'dari tahun lalu',
    icon: Users,
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Total Guru',
    value: '84',
    change: '+2',
    trend: 'up',
    sub: 'guru baru bulan ini',
    icon: Users,
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'Total Kelas',
    value: '36',
    change: '12',
    trend: 'neutral',
    sub: 'kelas per angkatan',
    icon: BookOpen,
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    title: 'Alumni Terdaftar',
    value: '4.520',
    change: '+320',
    trend: 'up',
    sub: 'lulusan tahun ini',
    icon: Award,
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
];

const recentActivity = [
  { name: 'Budi Santoso', action: 'menginput nilai Matematika', class: 'XI-IPA-1', time: '10 mnt lalu' },
  { name: 'Sari Dewi', action: 'memperbarui jadwal kelas', class: 'X-RPL-2', time: '24 mnt lalu' },
  { name: 'Ahmad Fauzi', action: 'menambahkan data prestasi', class: 'XII-IPA-3', time: '45 mnt lalu' },
  { name: 'Indah Permata', action: 'mendaftarkan siswa baru', class: 'X-MIPA-1', time: '1 jam lalu' },
  { name: 'Rizky Pratama', action: 'mengekspor data alumni', class: '-', time: '2 jam lalu' },
];

const pendingAccounts = [
  { name: 'Siti Aminah', role: 'Guru Sejarah', time: '2 jam lalu' },
  { name: 'Ahmad Fauzi', role: 'Siswa Pindahan', time: '5 jam lalu' },
  { name: 'Mega Wulandari', role: 'Guru Matematika', time: '1 hari lalu' },
];

function AdminOverview() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Page Header */}
      <div className="scola-page-header">
        <h2>Panel Administrator</h2>
        <p>Ringkasan sistem informasi akademik — {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="scola-stat-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.accent}`} />
              </div>
              {stat.trend === 'up' && (
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> {stat.change}
                </span>
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

        {/* Recent Activity */}
        <div className="lg:col-span-3 scola-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Aktivitas Terkini</h3>
            </div>
            <Link to="/admin/users" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Lihat semua <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-8 h-8 rounded-xl bg-slate-700/50 flex items-center justify-center text-slate-300 text-xs font-semibold flex-shrink-0">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium leading-snug">
                    <span className="font-semibold">{item.name}</span>{' '}
                    <span className="text-slate-400 font-normal">{item.action}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.class}</p>
                </div>
                <div className="text-[11px] text-slate-600 flex items-center gap-1 flex-shrink-0 font-medium">
                  <Clock className="w-3 h-3" /> {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="lg:col-span-2 scola-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Persetujuan Akun</h3>
            <span className="text-[11px] font-semibold bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full">
              {pendingAccounts.length} tertunda
            </span>
          </div>
          <div className="p-4 space-y-3">
            {pendingAccounts.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">{item.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.role}</p>
                </div>
                <Link to="/admin/users" className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/15 transition-colors whitespace-nowrap">
                  Tinjau
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="px-4 pb-4 space-y-2">
            <p className="section-label px-1">Akses Cepat</p>
            {[
              { label: 'Kelola Pengguna', href: '/admin/users', icon: Users },
              { label: 'Manajemen Kelas', href: '/admin/classes', icon: BookOpen },
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
      <Route path="/alumni" element={<AdminAlumni />} />
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