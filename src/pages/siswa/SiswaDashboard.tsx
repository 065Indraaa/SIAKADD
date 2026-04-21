import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SiswaProfile from './SiswaProfile';
import SiswaGrades from './SiswaGrades';
import SiswaSchedule from './SiswaSchedule';
import SiswaAchievements from './SiswaAchievements';
import { fetchPrestasiSiswa, fetchNilaiSiswa, fetchJadwalKelas } from '@/lib/schoolService';

function SiswaOverview() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    className: '--',
    homeroom: '--',
    avgGrade: 0,
    achievementCount: 0,
    attendance: '0%',
  });
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);

  useEffect(() => {
    if (user && userData?.role === 'siswa' && userData?.id) {
      loadDashboardData();
    }
  }, [user, userData]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const siswaId = userData?.siswaId; // Membutuhkan siswaId dari context auth

      // Jika kita mengimplementasi fetch semua:
      // const prestasi = await fetchPrestasiSiswa(siswaId);
      // const nilai = await fetchNilaiSiswa(siswaId, 'Ganjil', '2023/2024');

      setStats({
        className: userData?.className || 'Belum Masuk Kelas',
        homeroom: 'Wali Kelas Default',
        avgGrade: 0,
        achievementCount: 0,
        attendance: '100%',
      });

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

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
            <div className="text-3xl font-bold">{stats.className}</div>
            <p className="text-xs text-blue-200 mt-1">Wali Kelas: {stats.homeroom}</p>
          </CardContent>
        </Card>

        {/* Nilai Card */}
        <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Rata-rata Nilai</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.avgGrade.toFixed(2)}</div>
            <p className="text-xs text-emerald-400 font-medium mt-1">Terbaru</p>
          </CardContent>
        </Card>

        {/* Prestasi Card */}
        <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Prestasi</CardTitle>
            <Award className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.achievementCount}</div>
            <p className="text-xs text-slate-400 mt-1">Sertifikat/Piala</p>
          </CardContent>
        </Card>

        {/* Kehadiran Card */}
        <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Kehadiran</CardTitle>
            <Calendar className="h-4 w-4 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.attendance}</div>
            <p className="text-xs text-slate-400 mt-1">Kehadiran Baik</p>
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
              {todaySchedule.length === 0 ? (
                <div className="text-center text-slate-400 py-6">Hari ini tidak ada jadwal atau jadwal belum dimuat.</div>
              ) : (
                todaySchedule.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-l-4 border-blue-600 bg-slate-950/50 rounded-r-lg">
                    <div>
                      <p className="font-bold text-white">{s.waktuMasuk}</p>
                      <p className="text-sm font-medium text-slate-300">{s.mataPelajaran}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">{s.guru}</p>
                      <p className="text-sm text-slate-400">{s.ruang}</p>
                    </div>
                  </div>
                ))
              )}
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