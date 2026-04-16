import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Halo, {user?.name}</h2>
        <p className="text-slate-500">Selamat datang di portal akademik Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-600 text-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Kelas Saat Ini</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">XI-IPA-1</div>
            <p className="text-xs text-blue-200 mt-1">Wali Kelas: Bpk. Ahmad</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.5</div>
            <p className="text-xs text-green-600 font-medium mt-1">+2.4 dari semester lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prestasi</CardTitle>
            <Award className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-slate-500 mt-1">Tingkat Kota/Provinsi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-slate-500 mt-1">Semester Ganjil</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-l-4 border-blue-600 bg-slate-50 rounded-r-lg">
                <div>
                  <p className="font-bold text-slate-900">07:00 - 08:30</p>
                  <p className="text-sm font-medium">Fisika</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Ibu Siti</p>
                  <p className="text-sm text-slate-500">Ruang Lab Fisika</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-l-4 border-green-600 bg-slate-50 rounded-r-lg">
                <div>
                  <p className="font-bold text-slate-900">08:30 - 10:00</p>
                  <p className="text-sm font-medium">Matematika Wajib</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Bpk. Budi</p>
                  <p className="text-sm text-slate-500">Ruang 204</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="font-medium text-slate-900">Ujian Tengah Semester</p>
                <p className="text-sm text-slate-500 mt-1">UTS akan dilaksanakan mulai tanggal 15 Oktober. Jadwal lengkap dapat dilihat di menu Jadwal.</p>
                <p className="text-xs text-slate-400 mt-2">2 hari yang lalu</p>
              </div>
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
