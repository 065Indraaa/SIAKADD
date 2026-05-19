import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Award, Calendar, TrendingUp, CheckCircle, Users, ArrowUpRight, Clock, GraduationCap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchJadwalKelas, fetchNilaiSiswa, fetchPrestasiSiswa } from '@/lib/schoolService';
import { currentTahunAjaran, currentSemester } from '@/lib/tahunAjaran';
import SiswaProfile from './SiswaProfile';
import SiswaGrades from './SiswaGrades';
import SiswaSchedule from './SiswaSchedule';
import SiswaAchievements from './SiswaAchievements';
import SiswaMajoring from './SiswaMajoring';
import SiswaAlumni from './SiswaAlumni';

function SiswaOverview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [stats, setStats] = useState({
    rataNilai: '0',
    kehadiran: '100%',
    prestasi: 0
  });

  const statsCard = [
    { title: 'Kelas', value: user?.className || 'Belum Diatur', sub: 'Tahun Ajaran Aktif', icon: BookOpen, accent: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Rata-rata Nilai', value: stats.rataNilai, sub: 'Semester Aktif', icon: TrendingUp, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Kehadiran', value: stats.kehadiran, sub: 'Tingkat Presensi', icon: CheckCircle, accent: 'text-violet-400', bg: 'bg-violet-500/10' },
    { title: 'Prestasi', value: stats.prestasi.toString(), sub: 'Total Pencapaian', icon: Award, accent: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (user?.siswaId) {
          // Fetch data from Firebase Data Connect
          const [jadwal, nilai, prestasi] = await Promise.all([
            user.kelasId ? fetchJadwalKelas(user.kelasId) : Promise.resolve([]),
            fetchNilaiSiswa(user.siswaId, currentSemester(), currentTahunAjaran()),
            fetchPrestasiSiswa(user.siswaId)
          ]);
          
          const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
          const jadwalHariIni = jadwal.filter((j: any) => j.hari.toLowerCase() === hariIni.toLowerCase());
          setTodaySchedule(jadwalHariIni.slice(0, 4));

          let avg = 0;
          if (nilai && nilai.length > 0) {
            const sum = nilai.reduce((acc: number, cur: any) => acc + (cur.nilaiUas || 0), 0);
            avg = sum / nilai.length;
          }

          setStats({
            rataNilai: avg > 0 ? avg.toFixed(1) : '0',
            kehadiran: '100%', // Placeholder for now
            prestasi: prestasi ? prestasi.length : 0
          });
        }
      } catch (error) {
        console.error('Failed to load siswa dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user.role === 'siswa') {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

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
<<<<<<< HEAD
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Halo, {user?.name}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Selamat datang di portal akademik Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Kelas Card */}
        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-600/20 dark:border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-200">
              Kelas Saat Ini
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-white">XI-IPA-1</div>
            <p className="text-xs text-blue-600 dark:text-blue-200 mt-1">Wali Kelas: Bpk. Ahmad</p>
          </CardContent>
        </Card>

        {/* Nilai Card */}
        <Card className="bg-white border-slate-200 dark:bg-slate-900/50 dark:border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Rata-rata Nilai
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">88.5</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              +2.4 dari semester lalu
            </p>
          </CardContent>
        </Card>

        {/* Prestasi Card */}
        <Card className="bg-white border-slate-200 dark:bg-slate-900/50 dark:border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Prestasi
            </CardTitle>
            <Award className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tingkat Kota/Provinsi</p>
          </CardContent>
        </Card>

        {/* Kehadiran Card */}
        <Card className="bg-white border-slate-200 dark:bg-slate-900/50 dark:border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Kehadiran
            </CardTitle>
            <Calendar className="h-4 w-4 text-rose-500 dark:text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">98%</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Semester Ganjil</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Jadwal Hari Ini */}
        <Card className="col-span-4 bg-white border-slate-200 dark:bg-slate-900/50 dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-slate-950/50 rounded-r-lg">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">07:00 - 08:30</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Fisika</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Ibu Siti</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Ruang Lab Fisika</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-slate-950/50 rounded-r-lg">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">08:30 - 10:00</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Matematika Wajib</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Bpk. Budi</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Ruang 204</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pengumuman */}
        <Card className="col-span-3 bg-white border-slate-200 dark:bg-slate-900/50 dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 border border-blue-200 dark:bg-blue-600/10 dark:border-blue-500/20 rounded-lg">
              <p className="font-medium text-blue-700 dark:text-blue-400">Ujian Tengah Semester</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                UTS akan dilaksanakan mulai tanggal 15 Oktober.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">2 hari yang lalu</p>
=======
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Selamat datang kembali 👋</p>
          <h2 className="text-2xl font-bold text-foreground">Halo, {firstName}!</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 scola-card rounded-xl">
          <Calendar className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-[11px] text-muted-foreground leading-none">Tahun Ajaran</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{currentTahunAjaran()} · {currentSemester()}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCard.map((stat, i) => (
          <div key={i} className="scola-stat-card p-5">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-4 h-4 ${stat.accent}`} />
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs font-medium text-muted-foreground mt-0.5">{stat.title}</p>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Body Grid */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Today's Schedule */}
        <div className="lg:col-span-3 scola-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-foreground">Jadwal Hari Ini</h3>
>>>>>>> 75ba1c482785795b5c0a639ee927110c79e258f9
            </div>
            <Link to="schedule" className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1">
              Semua jadwal <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {todaySchedule.length > 0 ? todaySchedule.map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-accent transition-colors">
                <div className="w-14 text-center flex-shrink-0">
                  <p className="text-sm font-semibold text-foreground">{s.jamMulai || '07:30'}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">WIB</p>
                </div>
                <div className="w-px h-10 bg-border flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{s.mataPelajaran?.nama || s.subject}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.guru?.pengguna?.nama || s.teacher}</p>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-lg flex-shrink-0">
                  {s.ruangan || s.room || '—'}
                </span>
              </div>
            )) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">Tidak ada jadwal hari ini</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Access */}
        <div className="lg:col-span-2 scola-card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Akses Cepat</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Menu utama portal siswa</p>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: 'Lihat Nilai & Rapor', sub: 'Semester aktif', href: 'grades', icon: BookOpen, accent: 'text-blue-500', bg: 'bg-blue-500/10' },
              ...(user?.className?.includes('10') || user?.className?.includes('X') ? [
                { label: 'Peminatan Jurusan', sub: 'Pilih rumpun kelas 11', href: 'majoring', icon: TrendingUp, accent: 'text-amber-500', bg: 'bg-amber-500/10' }
              ] : []),
              { label: 'Pencapaian Saya', sub: 'Sertifikat & Prestasi', href: 'achievements', icon: Award, accent: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { label: 'Profil Siswa', sub: 'Informasi pribadi', href: 'profile', icon: Users, accent: 'text-violet-500', bg: 'bg-violet-500/10' },
              { label: 'Jadwal Pelajaran', sub: 'Timeline mingguan', href: 'schedule', icon: Calendar, accent: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { label: 'Jejak Alumni', sub: 'Referensi lulusan', href: 'alumni', icon: GraduationCap, accent: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((item, i) => (
              <Link key={i} to={item.href} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-all group">
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-4 h-4 ${item.accent}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>

          {/* Info card */}
          <div className="mx-4 mb-4 p-4 rounded-xl bg-blue-500/8 border border-blue-500/15">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Info Akademik</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Kelas: <span className="text-foreground font-medium">{user?.className || 'Belum diatur'}</span>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Semester {currentSemester()} T.A. {currentTahunAjaran()} sedang berjalan.
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
      <Route path="/majoring" element={<SiswaMajoring />} />
      <Route path="/alumni" element={<SiswaAlumni />} />
    </Routes>
  );
}