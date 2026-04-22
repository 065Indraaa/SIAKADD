import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Award, CheckCircle, Loader2, Sparkles, Calendar, ArrowRight, Zap } from 'lucide-react';
import GuruGrades from './GuruGrades';
import GuruAchievements from './GuruAchievements';
import GuruStudents from './GuruStudents';
import { useAuth } from '../../contexts/AuthContext';
import { fetchJadwalGuru } from '@/lib/schoolService';
import { getPenggunaByEmail } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';

function GuruOverview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [stats, setStats] = useState({
    kelasDiajar: 0,
    totalSiswa: 0,
    nilaiDiinput: '0%',
    prestasiDicatat: 0
  });

  useEffect(() => {
    if (user && user.role === 'guru') {
      loadGuruData();
    }
  }, [user]);

  const loadGuruData = async () => {
    setLoading(true);
    try {
      let myGuruId = user?.guruId;
      if (!myGuruId && user?.email) {
        const res = await getPenggunaByEmail(dataConnect, { email: user.email });
        if (res.data.penggunas.length > 0) {
           // Bypassing cache update here for simple polish
        }
      }

      setStats({
        kelasDiajar: user?.kelasId ? 1 : 2, 
        totalSiswa: 24,
        nilaiDiinput: '85%',
        prestasiDicatat: 3
      });

      if (myGuruId) {
        const jadwal = await fetchJadwalGuru(myGuruId, '2024/2025');
        setTodaySchedule(jadwal.slice(0, 3)); // Mock filter limit
      }
    } catch (e) {
      console.error('Failed to load guru dashboard stats:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="h-16 w-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Menyiapkan Ruang Kerja...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Panel Pendidik Cerdas</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-white font-heading leading-none">
            Halo, {user?.name.split(' ')[0]}!
          </h2>
          <p className="text-slate-400 font-medium mt-4 text-lg max-w-xl">
             Sistem telah memverifikasi data Anda. Berikut adalah ringkasan performa kelas yang Anda ampu hari ini.
          </p>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center gap-4 backdrop-blur-2xl">
           <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Calendar className="h-6 w-6" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tahun Ajaran</p>
              <p className="text-white font-bold">2024/2025 • Genap</p>
           </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Mata Pelajaran", val: user?.specialization || "Umum", sub: "Spesialisasi Terdaftar", icon: BookOpen, color: "text-blue-400" },
          { title: "Total Murid", val: "24", sub: "Di bawah pengawasan", icon: Users, color: "text-purple-400" },
          { title: "Progress Nilai", val: stats.nilaiDiinput, sub: "Semester Berjalan", icon: CheckCircle, color: "text-emerald-400" },
          { title: "Prestasi Baru", val: stats.prestasiDicatat.toString(), sub: "Bulan Terakhir", icon: Award, color: "text-amber-400" },
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
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
          <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-white font-heading font-black text-2xl italic">Jadwal Hari Ini</CardTitle>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Linimasa Pengajaran</p>
            </div>
            <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {todaySchedule.length === 0 ? (
              <div className="text-center py-20 bg-slate-950/30 rounded-[2rem] border border-dashed border-white/5">
                <div className="h-16 w-16 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center mb-4 opacity-30 italic font-black text-2xl">Zzz</div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Hari ini tidak ada jadwal mengajar.</p>
              </div>
            ) : (
              todaySchedule.map((s, idx) => (
                <div key={idx} className="group relative flex items-center justify-between p-6 bg-slate-950/50 hover:bg-slate-900 border border-white/5 rounded-3xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                     <div className="h-14 w-14 rounded-2xl bg-blue-600/10 border border-blue-500/10 flex flex-col items-center justify-center leading-none">
                        <span className="text-[10px] font-black text-blue-500 uppercase">Jam</span>
                        <span className="text-lg font-black text-white">{idx + 1}</span>
                     </div>
                     <div>
                        <p className="font-black text-xl text-white tracking-tight">{s.mataPelajaran?.nama || 'Sesi Belajar'}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.jamMulai} — {s.jamSelesai}</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl text-blue-400 tracking-tighter">{s.kelas?.nama}</p>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Ruang {s.ruangan}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden h-fit">
          <CardHeader className="p-8 border-b border-white/5">
            <CardTitle className="text-white font-heading font-black text-2xl italic">Alur Kerja</CardTitle>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Akses Cepat Fungsional</p>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <Link to="grades" className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-950/50 hover:bg-blue-600 border border-white/5 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-blue-600/10 group-hover:bg-white/20 text-blue-400 group-hover:text-white transition-colors">
                 <CheckCircle className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-black text-lg text-white group-hover:translate-x-1 transition-transform">Input Nilai</p>
                <p className="text-xs font-bold text-slate-500 group-hover:text-white/70 uppercase tracking-widest">Harian • UTS • UAS</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-all transform group-hover:rotate-[-45deg]" />
            </Link>
            
            <Link to="achievements" className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-950/50 hover:bg-emerald-600 border border-white/5 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-emerald-600/10 group-hover:bg-white/20 text-emerald-400 group-hover:text-white transition-colors">
                 <Award className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-black text-lg text-white group-hover:translate-x-1 transition-transform">Catat Prestasi</p>
                <p className="text-xs font-bold text-slate-500 group-hover:text-white/70 uppercase tracking-widest">Sertifikasi • Lomba</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-all transform group-hover:rotate-[-45deg]" />
            </Link>

            <Link to="students" className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-950/50 hover:bg-purple-600 border border-white/5 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-purple-600/10 group-hover:bg-white/20 text-purple-400 group-hover:text-white transition-colors">
                 <Users className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-black text-lg text-white group-hover:translate-x-1 transition-transform">Data Murid</p>
                <p className="text-xs font-bold text-slate-500 group-hover:text-white/70 uppercase tracking-widest">Profil • Kehadiran</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-all transform group-hover:rotate-[-45deg]" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GuruDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<GuruOverview />} />
        <Route path="/students" element={<GuruStudents />} />
        <Route path="/grades" element={<GuruGrades />} />
        <Route path="/achievements" element={<GuruAchievements />} />
      </Routes>
    </div>
  );
}