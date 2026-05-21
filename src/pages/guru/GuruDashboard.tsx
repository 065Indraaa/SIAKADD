import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Award, CheckCircle, Loader2, Calendar, ArrowRight } from 'lucide-react';
import GuruGrades from './GuruGrades';
import GuruAchievements from './GuruAchievements';
import GuruStudents from './GuruStudents';
import { useAuth } from '../../contexts/AuthContext';
import { fetchJadwalGuru } from '@/lib/schoolService';
import { currentTahunAjaran, currentSemester } from '@/lib/tahunAjaran';
import { listPrestasi } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';

function GuruOverview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [stats, setStats] = useState({
    kelasDiajar: 0,
    totalSiswa: 0,
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
      const myGuruId = user?.guruId;

      if (myGuruId) {
        const jadwal = await fetchJadwalGuru(myGuruId, currentTahunAjaran());
        const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
        const jadwalHariIni = jadwal.filter((j: any) => j.hari.toLowerCase() === hariIni.toLowerCase());
        setTodaySchedule(jadwalHariIni);

        // Count unique classes from schedule
        const uniqueClasses = new Set(jadwal.map((j: any) => j.kelas?.nama).filter(Boolean));
        setStats(prev => ({
          ...prev,
          kelasDiajar: uniqueClasses.size || 0,
        }));
      }

      // Fetch prestasi count
      try {
        const prestasiRes = await listPrestasi(dataConnect, {});
        setStats(prev => ({
          ...prev,
          prestasiDicatat: prestasiRes.data.prestasis?.length || 0,
        }));
      } catch { /* ignore */ }

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Halo, {user?.name.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl">
            Berikut ringkasan kelas yang Anda ampu.
          </p>
        </div>
        <div className="scola-card px-4 py-2.5 flex items-center gap-3 rounded-xl">
          <Calendar className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-[11px] text-muted-foreground leading-none">Tahun Ajaran</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{currentTahunAjaran()} · {currentSemester()}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Mata Pelajaran", val: user?.specialization || "Umum", sub: "Spesialisasi terdaftar", icon: BookOpen, color: "text-blue-500" },
          { title: "Kelas Diampu", val: stats.kelasDiajar.toString(), sub: "Dari jadwal aktif", icon: Users, color: "text-purple-500" },
          { title: "Jabatan", val: user?.jabatan || "Guru", sub: "Status struktural", icon: CheckCircle, color: "text-emerald-500" },
          { title: "Prestasi Dicatat", val: stats.prestasiDicatat.toString(), sub: "Total di sistem", icon: Award, color: "text-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="scola-stat-card p-5">
            <div className={`w-9 h-9 rounded-xl bg-muted flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-xl font-bold text-foreground">{stat.val}</p>
            <p className="text-xs font-medium text-muted-foreground mt-0.5">{stat.title}</p>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Jadwal hari ini */}
        <div className="col-span-4 scola-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Jadwal Hari Ini</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {todaySchedule.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">Tidak ada jadwal mengajar hari ini.</p>
              </div>
            ) : (
              todaySchedule.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-accent transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.mataPelajaran?.nama || 'Sesi Belajar'}</p>
                      <p className="text-[11px] text-muted-foreground">{s.jamMulai} — {s.jamSelesai}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{s.kelas?.nama}</p>
                    <p className="text-[11px] text-muted-foreground">{s.ruangan || '—'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Akses cepat */}
        <div className="col-span-3 scola-card p-0 overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Akses Cepat</h3>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: 'Pengisian Nilai', sub: 'Harian · UTS · UAS', href: 'grades', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Catat Prestasi', sub: 'Sertifikasi · Lomba', href: 'achievements', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { label: 'Data Murid', sub: 'Profil · Kehadiran', href: 'students', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((item, i) => (
              <Link key={i} to={item.href} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-all group">
                <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuruDashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<GuruOverview />} />
        <Route path="/students" element={<GuruStudents />} />
        <Route path="/grades" element={<GuruGrades />} />
        <Route path="/achievements" element={<GuruAchievements />} />
      </Routes>
    </div>
  );
}
