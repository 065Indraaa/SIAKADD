import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Calendar, TrendingUp, Loader2, Zap, Sparkles, User, ArrowRight, Book } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SiswaProfile from './SiswaProfile';
import SiswaGrades from './SiswaGrades';
import SiswaSchedule from './SiswaSchedule';
import SiswaAchievements from './SiswaAchievements';
import { fetchPrestasiSiswa, fetchNilaiSiswa, fetchJadwalKelas } from '@/lib/schoolService';

function SiswaOverview() {
  const { user } = useAuth();
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
    if (user && user.role === 'siswa' && user.uid) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Mock loading delay for feel
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStats({
        className: user?.className || 'X-MIPA-1',
        homeroom: 'Drs. Sudirman',
        avgGrade: 88.5,
        achievementCount: 4,
        attendance: '98%',
      });

      // Mock schedule for visualization
      setTodaySchedule([
        { waktuMasuk: '07:30', mataPelajaran: 'Matematika Peminatan', guru: 'Ibu Siti Aminah', ruang: 'R.302' },
        { waktuMasuk: '09:00', mataPelajaran: 'Bahasa Inggris', guru: 'Mr. James Wilson', ruang: 'Lab Bhs' },
        { waktuMasuk: '10:30', mataPelajaran: 'Fisika', guru: 'Pak Bambang', ruang: 'R.302' },
      ]);

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="h-16 w-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Sinkronisasi Data Akademik...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Pusat Kecerdasan Siswa</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-white font-heading leading-none">
            Halo, {user?.name.split(' ')[0]}!
          </h2>
          <p className="text-slate-400 font-medium mt-4 text-lg max-w-xl">
             Selamat datang kembali. Berikut adalah ringkasan progres dan jadwal belajar Anda hari ini.
          </p>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center gap-4 backdrop-blur-2xl">
           <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Calendar className="h-6 w-6" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tahun Ajaran</p>
              <p className="text-white font-bold">2024/2025 • Genap</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Kelas", val: stats.className, sub: `Wali: ${stats.homeroom}`, icon: BookOpen, color: "text-blue-400" },
          { title: "IP Semester", val: stats.avgGrade.toString(), sub: "Performa Akademik", icon: TrendingUp, color: "text-emerald-400" },
          { title: "Presensi", val: stats.attendance, sub: "Tingkat Kehadiran", icon: Calendar, color: "text-rose-400" },
          { title: "Prestasi", val: stats.achievementCount.toString(), sub: "Total Pencapaian", icon: Award, color: "text-amber-400" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/40 border-white/5 rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <stat.icon className="h-20 w-20" />
            </div>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className={`text-3xl font-black tracking-tighter ${stat.color} mb-1`}>{stat.val}</div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest truncate">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        {/* Jadwal Hari Ini */}
        <Card className="col-span-4 bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
          <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-white font-heading font-black text-2xl italic">Jadwal Hari Ini</CardTitle>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Timeline Pembelajaran</p>
            </div>
            <Sparkles className="h-6 w-6 text-indigo-500 animate-pulse" />
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {todaySchedule.length === 0 ? (
              <div className="text-center py-20 bg-slate-950/30 rounded-[2rem] border border-dashed border-white/5">
                <div className="h-16 w-16 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center mb-4 opacity-30 italic font-black text-2xl">Zzz</div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Hari ini tidak ada jadwal belajar.</p>
              </div>
            ) : (
              todaySchedule.map((s, idx) => (
                <div key={idx} className="group relative flex items-center justify-between p-6 bg-slate-950/50 hover:bg-slate-900 border border-white/5 rounded-3xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                     <div className="h-14 w-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/10 flex flex-col items-center justify-center leading-none">
                        <span className="text-[10px] font-black text-indigo-500 uppercase">Jam</span>
                        <span className="text-lg font-black text-white">{idx + 1}</span>
                     </div>
                     <div>
                        <p className="font-black text-xl text-white tracking-tight">{s.mataPelajaran}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.waktuMasuk} — {s.guru}</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl text-indigo-400 tracking-tighter">{s.ruang}</p>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Ruangan</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Links / Navigation */}
        <Card className="col-span-3 bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden h-fit">
          <CardHeader className="p-8 border-b border-white/5">
            <CardTitle className="text-white font-heading font-black text-2xl italic">Alur Akademik</CardTitle>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Akses Cepat Siswa</p>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <Link to="grades" className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-950/50 hover:bg-indigo-600 border border-white/5 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-indigo-600/10 group-hover:bg-white/20 text-indigo-400 group-hover:text-white transition-colors">
                 <Book className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-black text-lg text-white group-hover:translate-x-1 transition-transform">Lihat Nilai</p>
                <p className="text-xs font-bold text-slate-500 group-hover:text-white/70 uppercase tracking-widest">Semester Aktif</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-all transform group-hover:rotate-[-45deg]" />
            </Link>
            
            <Link to="achievements" className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-950/50 hover:bg-amber-600 border border-white/5 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-amber-600/10 group-hover:bg-white/20 text-amber-400 group-hover:text-white transition-colors">
                 <Award className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-black text-lg text-white group-hover:translate-x-1 transition-transform">Prestasi Saya</p>
                <p className="text-xs font-bold text-slate-500 group-hover:text-white/70 uppercase tracking-widest">Sertifikat & Penghargaan</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-all transform group-hover:rotate-[-45deg]" />
            </Link>

            <Link to="profile" className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-950/50 hover:bg-slate-700 border border-white/5 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-slate-600/10 group-hover:bg-white/20 text-slate-400 group-hover:text-white transition-colors">
                 <User className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-black text-lg text-white group-hover:translate-x-1 transition-transform">Profil Siswa</p>
                <p className="text-xs font-bold text-slate-500 group-hover:text-white/70 uppercase tracking-widest">Informasi Pribadi</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-all transform group-hover:rotate-[-45deg]" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SiswaDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<SiswaOverview />} />
        <Route path="/profile" element={<SiswaProfile />} />
        <Route path="/grades" element={<SiswaGrades />} />
        <Route path="/schedule" element={<SiswaSchedule />} />
        <Route path="/achievements" element={<SiswaAchievements />} />
      </Routes>
    </div>
  );
}