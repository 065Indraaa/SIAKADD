import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, Award, Activity, Clock } from 'lucide-react';
import AdminUsers from './AdminUsers';
import AdminClasses from './AdminClasses';
import AdminMajors from './AdminMajors';
import AdminAlumni from './AdminAlumni';
import AdminSchedules from './AdminSchedules';

function AdminOverview() {
  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard Admin</h2>
        <p className="text-slate-400">Ringkasan sistem informasi akademik hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Siswa", val: "1,245", sub: "+12% dari tahun lalu", icon: Users },
          { title: "Total Guru", val: "84", sub: "2 guru baru bulan ini", icon: Users },
          { title: "Total Kelas", val: "36", sub: "12 kelas per angkatan", icon: BookOpen },
          { title: "Alumni Terdaftar", val: "4,520", sub: "+320 lulusan tahun ini", icon: Award },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-blue-500/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.val}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Aktivitas Terkini */}
        <Card className="col-span-4 bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" /> Aktivitas Terkini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">Guru Budi menginput nilai Matematika</p>
                    <p className="text-xs text-slate-400">Kelas XI-IPA-1</p>
                  </div>
                  <div className="ml-auto flex items-center text-xs text-slate-500">
                    <Clock className="h-3 w-3 mr-1" /> {i * 10} menit lalu
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Persetujuan Pending */}
        <Card className="col-span-3 bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Persetujuan Akun Pending</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-white/5 rounded-xl">
              <div>
                <p className="font-medium text-white">Siti Aminah</p>
                <p className="text-sm text-slate-400">Guru Sejarah</p>
              </div>
              <Link to="/admin/users" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">Review</Link>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-white/5 rounded-xl">
              <div>
                <p className="font-medium text-white">Ahmad Fauzi</p>
                <p className="text-sm text-slate-400">Siswa Pindahan</p>
              </div>
              <Link to="/admin/users" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">Review</Link>
            </div>
          </CardContent>
        </Card>
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
      <Route path="/settings" element={<div className="p-4 bg-slate-900/50 text-white rounded-xl border border-white/10">Pengaturan (WIP)</div>} />
    </Routes>
  );
}