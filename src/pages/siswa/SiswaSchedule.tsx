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

  const tahunAjaranOptions = useMemo(() => buildTahunAjaranOptions(), []);

  const loadSchedule = useCallback(async () => {
    if (!user?.kelasId) {
      setSchedule([]);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchJadwalKelas(user.kelasId, tahunAjaran);
      // Filter by semester di client (fetchJadwalKelas belum filter by semester).
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

  const days = [
    { key: 'sen', label: 'Senin' },
    { key: 'sel', label: 'Selasa' },
    { key: 'rab', label: 'Rabu' },
    { key: 'kam', label: 'Kamis' },
    { key: 'jum', label: 'Jumat' },
  ];

  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
<<<<<<< HEAD
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Jadwal Pelajaran
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Jadwal mingguan kelas XI-IPA-1.</p>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm dark:bg-slate-900/50 dark:backdrop-blur-md dark:border-white/10 dark:shadow-xl">
        <CardHeader className="border-b border-slate-200 dark:border-white/5">
          <CardTitle className="text-slate-900 dark:text-white">Semester Ganjil 2024/2025</CardTitle>
=======
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Jadwal Pelajaran
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Rencana pembelajaran mingguan untuk kelas <span className="text-white font-semibold">{user?.className || '—'}</span>.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-3">
          <Clock className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Jam saat ini</p>
            <p className="text-white text-sm font-semibold">{clock.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
          </div>
        </div>
      </div>

      <Card className="bg-slate-900/40 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-white text-lg font-bold">Semester {semester}</CardTitle>
            <p className="text-slate-400 text-xs mt-0.5">Tahun Ajaran {tahunAjaran}</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={semester} onValueChange={(v) => { if (v === 'Ganjil' || v === 'Genap') setSemester(v); }}>
              <SelectTrigger className="w-[130px] bg-slate-950 border-white/10 text-white rounded-lg h-10 text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white rounded-lg">
                {SEMESTER_OPTIONS.map(s => (
                  <SelectItem key={s} value={s} className="focus:bg-blue-600">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tahunAjaran} onValueChange={(v) => { if (v) setTahunAjaran(v); }}>
              <SelectTrigger className="w-[140px] bg-slate-950 border-white/10 text-white rounded-lg h-10 text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white rounded-lg">
                {tahunAjaranOptions.map(ta => (
                  <SelectItem key={ta} value={ta} className="focus:bg-blue-600">{ta}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
>>>>>>> 75ba1c482785795b5c0a639ee927110c79e258f9
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
<<<<<<< HEAD
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 hover:bg-transparent dark:border-white/10">
                  <TableHead className="text-slate-500 dark:text-slate-400 w-[150px]">Waktu</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Senin</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Selasa</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Rabu</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Kamis</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Jumat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row, index) => (
                  <TableRow
                    key={index}
                    className={`border-slate-100 dark:border-white/5 ${
                      row.mon === 'ISTIRAHAT'
                        ? 'bg-slate-100/80 dark:bg-slate-800/30'
                        : 'hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <TableCell className="font-medium text-slate-600 dark:text-slate-300">
                      {row.time}
                    </TableCell>

                    {row.mon === 'ISTIRAHAT' ? (
                      <TableCell
                        colSpan={5}
                        className="text-center font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest"
                      >
                        ISTIRAHAT
                      </TableCell>
                    ) : (
                      <>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.mon}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.tue}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.wed}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.thu}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.fri}</TableCell>
                      </>
=======
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
                          <span className="font-black text-indigo-300 uppercase tracking-[0.2em] text-[10px]">Waktu Istirahat</span>
                        </div>
                      </TableCell>
                    ) : (
                      days.map(day => (
                        <TableCell key={day.key} className="text-center py-6">
                          <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{row[day.key] || '-'}</span>
                        </TableCell>
                      ))
>>>>>>> 75ba1c482785795b5c0a639ee927110c79e258f9
                    )}
                  </TableRow>
                )) : (
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

          <div className="p-6 bg-white/[0.02] border-t border-white/10 flex items-center gap-3">
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
