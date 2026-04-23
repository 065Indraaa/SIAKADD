import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, BookOpen, Sparkles, Zap, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchJadwalKelas } from '@/lib/schoolService';

export default function SiswaSchedule() {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSchedule = async () => {
      if (!user?.kelasId) return;
      setLoading(true);
      try {
        const data = await fetchJadwalKelas(user.kelasId);
        
        // Process data into grid
        const timeSlots = Array.from(new Set(data.map((d: any) => `${d.jamMulai} - ${d.jamSelesai}`))).sort();
        
        const gridData = timeSlots.map(time => {
          const row: any = { time };
          ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].forEach(day => {
            const item = data.find((d: any) => `${d.jamMulai} - ${d.jamSelesai}` === time && d.hari.toLowerCase() === day.toLowerCase());
            row[day.toLowerCase().slice(0, 3)] = item ? item.mataPelajaran?.nama : '-';
          });
          return row;
        });

        // insert break
        if (gridData.length > 3) {
          gridData.splice(3, 0, { time: 'ISTIRAHAT', sen: 'ISTIRAHAT', sel: 'ISTIRAHAT', rab: 'ISTIRAHAT', kam: 'ISTIRAHAT', jum: 'ISTIRAHAT' });
        }

        setSchedule(gridData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, [user?.kelasId]);

  const days = [
    { key: 'sen', label: 'Senin' },
    { key: 'sel', label: 'Selasa' },
    { key: 'rab', label: 'Rabu' },
    { key: 'kam', label: 'Kamis' },
    { key: 'jum', label: 'Jumat' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter text-white font-heading leading-none">
            Jadwal Pelajaran
          </h2>
          <p className="text-slate-400 font-medium mt-4 text-lg max-w-xl">
            Rencana pembelajaran mingguan untuk kelas XI-IPA-1. Pastikan Anda hadir tepat waktu.
          </p>
        </div>

        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center gap-4 backdrop-blur-2xl">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Waktu Server</p>
            <p className="text-white font-bold">07:24 Western Indonesia</p>
          </div>
        </div>
      </div>

      <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white font-heading font-black text-2xl italic leading-none">Semester Ganjil</CardTitle>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Tahun Ajaran 2024/2025</p>
          </div>
          <Sparkles className="h-6 w-6 text-indigo-500" />
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/40">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="py-6 px-8 text-slate-500 font-black uppercase tracking-widest text-[10px] w-[180px]">Waktu</TableHead>
                  {days.map(day => (
                    <TableHead key={day.key} className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">{day.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-20"><Loader2 className="h-10 w-10 animate-spin text-indigo-500 mx-auto" /></TableCell></TableRow>
                ) : schedule.length > 0 ? schedule.map((row, index) => (
                  <TableRow
                    key={index}
                    className={`border-white/5 transition-all ${row.time === 'ISTIRAHAT' ? 'bg-indigo-600/5' : 'hover:bg-white/[0.03] group'}`}
                  >
                    <TableCell className="py-6 px-8 font-black text-white text-sm tracking-tight border-r border-white/5">
                      {row.time}
                    </TableCell>

                    {row.time === 'ISTIRAHAT' ? (
                      <TableCell colSpan={5} className="py-6 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-600/20 rounded-full border border-indigo-500/20">
                          <Zap className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                          <span className="font-black text-indigo-300 uppercase tracking-[0.2em] text-[10px]">Break Session — Istirahat</span>
                        </div>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell className="text-center py-6">
                          <span className={`font-bold transition-colors ${row.sen === 'Upacara' || row.sen === 'Agama' ? 'text-blue-400 group-hover:text-blue-300' : 'text-slate-300 group-hover:text-white'}`}>{row.sen}</span>
                        </TableCell>
                        <TableCell className="text-center py-6">
                          <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{row.sel}</span>
                        </TableCell>
                        <TableCell className="text-center py-6">
                          <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{row.rab}</span>
                        </TableCell>
                        <TableCell className="text-center py-6">
                          <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{row.kam}</span>
                        </TableCell>
                        <TableCell className="text-center py-6">
                          <span className={`font-bold transition-colors ${row.jum === 'Pulang' ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-slate-300 group-hover:text-white'}`}>{row.jum}</span>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest text-xs">Belum ada jadwal.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-8 bg-white/[0.01] border-t border-white/5 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sistem sinkronisasi otomatis aktif • {new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
