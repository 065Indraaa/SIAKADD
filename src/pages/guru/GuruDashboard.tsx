import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Award, CheckCircle, Clock } from 'lucide-react';
import GuruGrades from './GuruGrades';
import GuruAchievements from './GuruAchievements';
import GuruStudents from './GuruStudents';

function GuruOverview() {
  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard Guru</h2>
        <p className="text-slate-400">Selamat datang kembali. Berikut ringkasan kelas Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Kelas Diajar", val: "4", sub: "Matematika Wajib", icon: BookOpen },
          { title: "Total Siswa", val: "142", sub: "Di 4 kelas", icon: Users },
          { title: "Nilai Diinput", val: "85%", sub: "UTS Semester Ganjil", icon: CheckCircle },
          { title: "Prestasi Dicatat", val: "12", sub: "Semester ini", icon: Award },
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
        {/* Jadwal Mengajar */}
        <Card className="col-span-4 bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Jadwal Mengajar Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/50 border-l-4 border-blue-500 rounded-r-xl border-y border-r border-white/5">
              <div>
                <p className="font-bold text-white">07:00 - 08:30</p>
                <p className="text-sm font-medium text-slate-300">Matematika Wajib</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">XI-IPA-1</p>
                <p className="text-sm text-slate-400">Ruang 204</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/50 border-l-4 border-emerald-500 rounded-r-xl border-y border-r border-white/5">
              <div>
                <p className="font-bold text-white">09:00 - 10:30</p>
                <p className="text-sm font-medium text-slate-300">Matematika Wajib</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">XI-IPA-2</p>
                <p className="text-sm text-slate-400">Ruang 205</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tugas Pending */}
        <Card className="col-span-3 bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Tugas Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-950/30 border border-orange-500/20 rounded-xl">
                <div>
                  <p className="font-medium text-orange-200">Input Nilai UTS</p>
                  <p className="text-sm text-orange-400">Kelas XI-IPS-1 belum selesai</p>
                </div>
                <Link to="/guru/grades" className="text-sm font-medium text-orange-300 hover:text-white hover:underline">Input</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GuruDashboard() {
  return (
    <Routes>
      <Route path="/" element={<GuruOverview />} />
      <Route path="/grades" element={<GuruGrades />} />
      <Route path="/achievements" element={<GuruAchievements />} />
      <Route path="/students" element={<GuruStudents />} />
    </Routes>
  );
}