import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Zap, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchJadwalKelas } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

const SEMESTER_OPTIONS = ['Ganjil', 'Genap'];

function currentTahunAjaran(): string {
  const now = new Date();
  const y = now.getFullYear();
  return now.getMonth() >= 6 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}

function buildTahunAjaranOptions(): string[] {
  const now = new Date();
  const y = now.getFullYear();
  return [`${y - 2}/${y - 1}`, `${y - 1}/${y}`, `${y}/${y + 1}`, `${y + 1}/${y + 2}`];
}

export default function SiswaSchedule() {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [semester, setSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
  const [tahunAjaran, setTahunAjaran] = useState(currentTahunAjaran());
  const [clock, setClock] = useState(() => new Date());

  const tahunAjaranOptions = useMemo(() => buildTahunAjaranOptions(), []);

  const loadSchedule = useCallback(async () => {
    if (!user?.kelasId) {
      setSchedule([]);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchJadwalKelas(user.kelasId, tahunAjaran);
      const filtered = (data || []).filter((d: any) => !d.semester || d.semester === semester);
      const timeSlots = Array.from(new Set(filtered.map((d: any) => `${d.jamMulai} - ${d.jamSelesai}`))).sort();
      
      const gridData = timeSlots.map(time => {
        const row: any = { time };
        ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].forEach(day => {
          const item = filtered.find((d: any) =>
            `${d.jamMulai} - ${d.jamSelesai}` === time &&
            d.hari.toLowerCase() === day.toLowerCase()
          );
          row[day.toLowerCase().slice(0, 3)] = item ? item.mataPelajaran?.nama : '-';
        });
        return row;
      });
      setSchedule(gridData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user?.kelasId, semester, tahunAjaran]);

  useEffect(() => { loadSchedule(); }, [loadSchedule]);
  useAutoRefresh(loadSchedule, 20_000);

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = [
    { key: 'sen', label: 'Senin' },
    { key: 'sel', label: 'Selasa' },
    { key: 'rab', label: 'Rabu' },
    { key: 'kam', label: 'Kamis' },
    { key: 'jum', label: 'Jumat' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Jadwal Pelajaran
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
            Rencana pembelajaran mingguan untuk kelas <span className="text-slate-900 dark:text-white font-semibold">{user?.className || '—'}</span>.
          </p>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-sm">
          <Clock className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Jam saat ini</p>
            <p className="text-slate-900 dark:text-white text-sm font-semibold">
              {clock.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Card */}
      <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <CardHeader className="p-6 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-slate-900 dark:text-white text-lg font-bold">Semester {semester}</CardTitle>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Tahun Ajaran {tahunAjaran}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={semester} onValueChange={(v) => setSemester(v as 'Ganjil' | 'Genap')}>
              <SelectTrigger className="w-[130px] bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg h-10 text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg">
                {SEMESTER_OPTIONS.map(s => (
                  <SelectItem key={s} value={s} className="focus:bg-indigo-600 focus:text-white">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={tahunAjaran} onValueChange={(v) => { if (v) setTahunAjaran(v); }}>
              <SelectTrigger className="w-[140px] bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg h-10 text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg">
                {tahunAjaranOptions.map(ta => (
                  <SelectItem key={ta} value={ta} className="focus:bg-indigo-600 focus:text-white">{ta}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/40">
                <TableRow className="border-slate-200 dark:border-white/5 hover:bg-transparent">
                  <TableHead className="py-6 px-8 text-slate-500 font-black uppercase tracking-widest text-[10px] w-[180px]">Waktu</TableHead>
                  {days.map(day => (
                    <TableHead key={day.key} className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">{day.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20">
                      <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : schedule.length > 0 ? (
                  schedule.map((row, index) => (
                    <TableRow
                      key={index}
                      className={`border-slate-100 dark:border-white/5 transition-all ${
                        row.mon === 'ISTIRAHAT' || row.time === 'ISTIRAHAT' 
                        ? 'bg-indigo-50/50 dark:bg-indigo-600/5' 
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.03] group'
                      }`}
                    >
                      <TableCell className="py-6 px-8 font-black text-slate-700 dark:text-white text-sm tracking-tight border-r border-slate-100 dark:border-white/5">
                        {row.time}
                      </TableCell>

                      {row.mon === 'ISTIRAHAT' || row.time === 'ISTIRAHAT' ? (
                        <TableCell colSpan={5} className="py-6 text-center">
                          <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-100 dark:bg-indigo-600/20 rounded-full border border-indigo-200 dark:border-indigo-500/20">
                            <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
                            <span className="font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-[0.2em] text-[10px]">Waktu Istirahat</span>
                          </div>
                        </TableCell>
                      ) : (
                        days.map(day => (
                          <TableCell key={day.key} className="text-center py-6">
                            <span className="font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                              {row[day.key] || '-'}
                            </span>
                          </TableCell>
                        ))
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest text-xs">
                      {user?.kelasId
                        ? `Belum ada jadwal untuk semester ${semester} T.A. ${tahunAjaran}.`
                        : 'Kelas Anda belum ditentukan. Hubungi wali kelas atau admin.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-6 bg-slate-50/50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-xs text-slate-500">
              Data diperbarui otomatis. Konfirmasikan ke wali kelas jika jadwal belum sesuai.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}