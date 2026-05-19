import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchNilaiSiswa } from '@/lib/schoolService';
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
  return [`${y - 2}/${y - 1}`, `${y - 1}/${y}`, `${y}/${y + 1}`];
}

export default function SiswaGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [semester, setSemester] = useState('Ganjil');
  const [tahunAjaran, setTahunAjaran] = useState(currentTahunAjaran());

  const tahunAjaranOptions = useMemo(() => buildTahunAjaranOptions(), []);

  const loadGrades = useCallback(async () => {
    if (!user?.siswaId) {
      setGrades([]);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchNilaiSiswa(user.siswaId, semester, tahunAjaran);
      setGrades(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user?.siswaId, semester, tahunAjaran]);

  useEffect(() => { loadGrades(); }, [loadGrades]);

  useAutoRefresh(loadGrades, 20_000);

  const calculateNilaiAkhir = (g: any) => {
    const nh = g.nilaiHarian || 0;
    const uts = g.nilaiUts || 0;
    const uas = g.nilaiUas || 0;
    if (!nh && !uts && !uas) return 0;
    return nh * 0.3 + uts * 0.3 + uas * 0.4;
  };

  const avgIpk = grades.length > 0 
    ? (grades.reduce((acc, curr) => acc + calculateNilaiAkhir(curr), 0) / grades.length).toFixed(2)
    : '0.00';

  return (
<<<<<<< HEAD
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Nilai & Rapor
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Lihat hasil evaluasi belajar Anda.</p>
        </div>
        <Button
          variant="outline"
          className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-gray-300"
          onClick={() => alert('Fitur unduh rapor belum tersedia')}
        >
          <Download className="mr-2 h-4 w-4" /> Unduh Rapor
        </Button>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-white/10 dark:shadow-xl dark:backdrop-blur-md">
        <CardHeader className="pb-3 border-b border-slate-200 dark:border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-slate-900 dark:text-white">Rapor Semester</CardTitle>
            <div className="flex space-x-2">
              <Select defaultValue="2024-1">
                <SelectTrigger className="w-[180px] bg-white border-slate-300 text-slate-900 dark:bg-slate-950 dark:border-white/10 dark:text-white">
                  <SelectValue placeholder="Pilih Semester" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-white/10 dark:text-white">
                  <SelectItem value="2024-1">2024/2025 - Ganjil</SelectItem>
                  <SelectItem value="2023-2">2023/2024 - Genap</SelectItem>
                  <SelectItem value="2023-1">2023/2024 - Ganjil</SelectItem>
=======
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Nilai & Rapor
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Nilai semester yang telah diinput guru mata pelajaran. Rapot final akan terbuka setelah administrasi lunas.
          </p>
        </div>

        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-500 text-white border-none rounded-xl px-5 h-11 font-semibold text-sm"
          onClick={() => alert('Fitur unduh rapor sedang disiapkan.')}
        >
          <Download className="mr-2 h-4 w-4" /> Unduh rapor (PDF)
        </Button>
      </div>

      <Card className="bg-slate-900/40 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-white text-lg font-bold">Rincian Semester {semester}</CardTitle>
                <p className="text-slate-500 text-xs mt-0.5">Tahun Ajaran {tahunAjaran}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={tahunAjaran} onValueChange={(v) => { if (v) setTahunAjaran(v); }}>
                <SelectTrigger className="w-full sm:w-[140px] bg-slate-950 border-white/10 text-white rounded-lg h-10 text-sm font-medium">
                  <SelectValue placeholder="Tahun Ajaran" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white rounded-lg">
                  {tahunAjaranOptions.map(ta => (
                    <SelectItem key={ta} value={ta} className="focus:bg-blue-600">{ta}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={semester} onValueChange={(v) => { if (v) setSemester(v); }}>
                <SelectTrigger className="w-full sm:w-[130px] bg-slate-950 border-white/10 text-white rounded-lg h-10 text-sm font-medium">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white rounded-lg">
                  {SEMESTER_OPTIONS.map(s => (
                    <SelectItem key={s} value={s} className="focus:bg-blue-600">Semester {s}</SelectItem>
                  ))}
>>>>>>> 75ba1c482785795b5c0a639ee927110c79e258f9
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
<<<<<<< HEAD
        <CardContent className="pt-6">
          <div className="rounded-lg border border-slate-200 overflow-hidden dark:border-white/10">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 hover:bg-transparent dark:border-white/10">
                  <TableHead className="text-slate-500 dark:text-slate-400">Mata Pelajaran</TableHead>
                  <TableHead className="text-center text-slate-500 dark:text-slate-400">Nilai Harian</TableHead>
                  <TableHead className="text-center text-slate-500 dark:text-slate-400">UTS</TableHead>
                  <TableHead className="text-center text-slate-500 dark:text-slate-400">UAS</TableHead>
                  <TableHead className="text-right text-slate-500 dark:text-slate-400">Nilai Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow
                    key={grade.id}
                    className="border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="font-medium text-slate-900 dark:text-white">
                      {grade.subject}
                    </TableCell>
                    <TableCell className="text-center text-slate-700 dark:text-slate-200">
                      {grade.nh}
                    </TableCell>
                    <TableCell className="text-center text-slate-700 dark:text-slate-200">
                      {grade.uts}
                    </TableCell>
                    <TableCell className="text-center text-slate-700 dark:text-slate-200">
                      {grade.uas}
                    </TableCell>
                    <TableCell className="text-right font-bold text-blue-600 dark:text-blue-400">
                      {grade.final}
=======

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/30">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="py-4 pl-6 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">Mata Pelajaran</TableHead>
                  <TableHead className="text-center text-slate-300 font-semibold uppercase tracking-wider text-[11px]">Harian</TableHead>
                  <TableHead className="text-center text-slate-300 font-semibold uppercase tracking-wider text-[11px]">UTS</TableHead>
                  <TableHead className="text-center text-slate-300 font-semibold uppercase tracking-wider text-[11px]">UAS</TableHead>
                  <TableHead className="text-right pr-6 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
                ) : grades.length > 0 ? (
                  grades.map((grade) => {
                    const akhir = calculateNilaiAkhir(grade);
                    const color = akhir >= 85 ? 'text-emerald-400' : akhir >= 75 ? 'text-blue-400' : akhir >= 60 ? 'text-amber-400' : 'text-red-400';
                    return (
                      <TableRow key={grade.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="py-4 pl-6">
                          <p className="font-semibold text-white">{grade.mataPelajaran?.nama || '-'}</p>
                          {grade.mataPelajaran?.kode && (
                            <p className="text-[11px] text-slate-500 font-mono mt-0.5">{grade.mataPelajaran.kode}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-center text-slate-300 font-medium tabular-nums">{grade.nilaiHarian ?? '—'}</TableCell>
                        <TableCell className="text-center text-slate-300 font-medium tabular-nums">{grade.nilaiUts ?? '—'}</TableCell>
                        <TableCell className="text-center text-slate-300 font-medium tabular-nums">{grade.nilaiUas ?? '—'}</TableCell>
                        <TableCell className="text-right pr-6">
                          <span className={`text-lg font-bold tabular-nums ${color}`}>
                            {akhir > 0 ? akhir.toFixed(1) : '—'}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-slate-500 text-sm">
                      Belum ada nilai untuk Semester {semester} T.A. {tahunAjaran}.
>>>>>>> 75ba1c482785795b5c0a639ee927110c79e258f9
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-6 bg-white/[0.02] border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Rata-rata nilai akhir</p>
                <p className="text-2xl font-bold text-white tabular-nums">
                  {avgIpk}
                  <span className={`text-xs font-semibold uppercase ml-2 tracking-wider ${
                    parseFloat(avgIpk) >= 85 ? 'text-emerald-400'
                      : parseFloat(avgIpk) >= 75 ? 'text-blue-400'
                      : parseFloat(avgIpk) >= 60 ? 'text-amber-400'
                      : 'text-slate-500'
                  }`}>
                    {parseFloat(avgIpk) >= 85 ? 'sangat baik'
                      : parseFloat(avgIpk) >= 75 ? 'baik'
                      : parseFloat(avgIpk) >= 60 ? 'cukup'
                      : 'belum terinput'}
                  </span>
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              Nilai akhir dihitung 30% harian + 30% UTS + 40% UAS. KKM sekolah 75.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
