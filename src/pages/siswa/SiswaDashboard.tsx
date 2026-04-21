import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SiswaProfile from './SiswaProfile';
import SiswaGrades from './SiswaGrades';
import SiswaSchedule from './SiswaSchedule';
import SiswaAchievements from './SiswaAchievements';

function SiswaOverview() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Halo, {user?.name}</h2>
        <p className="text-slate-400">Selamat datang di portal akademik Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Kelas Card */}
        <Card className="bg-blue-600/20 border-blue-500/30 text-white backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">Kelas Saat Ini</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">XI-IPA-1</div>
            <p className="text-xs text-blue-200 mt-1">Wali Kelas: Bpk. Ahmad</p>
          </CardContent>
        </Card>

        {/* Nilai Card */}
        <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Rata-rata Nilai</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">88.5</div>
            <p className="text-xs text-emerald-400 font-medium mt-1">+2.4 dari semester lalu</p>
          </CardContent>
        </Card>

        {/* Prestasi Card */}
        <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Prestasi</CardTitle>
            <Award className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-slate-400 mt-1">Tingkat Kota/Provinsi</p>
          </CardContent>
        </Card>

        {/* Kehadiran Card */}
        <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Kehadiran</CardTitle>
            <Calendar className="h-4 w-4 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">98%</div>
            <p className="text-xs text-slate-400 mt-1">Semester Ganjil</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Jadwal Hari Ini */}
        <Card className="col-span-4 bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-l-4 border-blue-600 bg-slate-950/50 rounded-r-lg">
                <div>
                  <p className="font-bold text-white">07:00 - 08:30</p>
                  <p className="text-sm font-medium text-slate-300">Fisika</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Ibu Siti</p>
                  <p className="text-sm text-slate-400">Ruang Lab Fisika</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-l-4 border-emerald-600 bg-slate-950/50 rounded-r-lg">
                <div>
                  <p className="font-bold text-white">08:30 - 10:00</p>
                  <p className="text-sm font-medium text-slate-300">Matematika Wajib</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Bpk. Budi</p>
                  <p className="text-sm text-slate-400">Ruang 204</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pengumuman */}
        <Card className="col-span-3 bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
              <p className="font-medium text-blue-400">Ujian Tengah Semester</p>
              <p className="text-sm text-slate-300 mt-1">UTS akan dilaksanakan mulai tanggal 15 Oktober.</p>
              <p className="text-xs text-slate-500 mt-2">2 hari yang lalu</p>
            </div>
          </CardContent>
        </Card>
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