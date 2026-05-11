import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter text-white font-heading leading-none">
            Nilai & Rapor
          </h2>
          <p className="text-slate-400 font-medium mt-4 text-lg max-w-xl">
            Pantau progres akademik Anda secara real-time. Data diperbarui secara otomatis oleh sistem.
          </p>
        </div>

        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl px-6 py-6 h-auto font-bold shadow-xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
          onClick={() => alert('Fitur unduh rapor sedang disiapkan...')}
        >
          <Download className="mr-2 h-5 w-5" /> Unduh Rapor PDF
        </Button>
      </div>

      <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-white font-heading font-black text-2xl italic leading-none">Rincian Semester</CardTitle>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Transkrip Nilai Akademik</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select value={tahunAjaran} onValueChange={(v) => { if (v) setTahunAjaran(v); }}>
                <SelectTrigger className="w-full sm:w-[160px] bg-slate-950/50 border-white/10 text-white rounded-2xl h-12 font-bold focus:ring-blue-600">
                  <SelectValue placeholder="Tahun Ajaran" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl overflow-hidden">
                  {tahunAjaranOptions.map(ta => (
                    <SelectItem key={ta} value={ta} className="focus:bg-blue-600">{ta}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={semester} onValueChange={(v) => { if (v) setSemester(v); }}>
                <SelectTrigger className="w-full sm:w-[160px] bg-slate-950/50 border-white/10 text-white rounded-2xl h-12 font-bold focus:ring-blue-600">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl overflow-hidden">
                  {SEMESTER_OPTIONS.map(s => (
                    <SelectItem key={s} value={s} className="focus:bg-blue-600">Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/20">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="py-6 px-8 text-slate-500 font-black uppercase tracking-widest text-[10px]">Mata Pelajaran</TableHead>
                  <TableHead className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">Harian</TableHead>
                  <TableHead className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">UTS</TableHead>
                  <TableHead className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">UAS</TableHead>
                  <TableHead className="text-right pr-8 text-slate-500 font-black uppercase tracking-widest text-[10px]">Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
                ) : grades.length > 0 ? (
                  grades.map((grade, idx) => (
                    <TableRow key={grade.id} className="border-white/5 hover:bg-white/[0.03] transition-all group">
                      <TableCell className="py-5 px-8">
                        <p className="font-black text-white text-lg tracking-tight group-hover:translate-x-1 transition-transform">{grade.mataPelajaran?.nama}</p>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Kategori Umum</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-slate-300 text-lg">{grade.nilaiHarian}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-slate-300 text-lg">{grade.nilaiUts}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-slate-300 text-lg">{grade.nilaiUas}</span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="inline-flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${calculateNilaiAkhir(grade) >= 80 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}></div>
                          <span className={`text-2xl font-black tracking-tighter ${calculateNilaiAkhir(grade) >= 80 ? 'text-emerald-400' : 'text-blue-400'}`}>
                            {calculateNilaiAkhir(grade).toFixed(1)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={5} className="text-center py-10 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Belum ada nilai terinput.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-8 bg-white/[0.01] border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rata-rata IPK</p>
                <p className="text-3xl font-black text-white tracking-tighter">{avgIpk} <span className="text-sm font-bold text-emerald-500 uppercase ml-2 tracking-widest">{parseFloat(avgIpk) >= 80 ? 'Sangat Baik' : 'Baik'}</span></p>
              </div>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 w-${i === 1 ? '8' : '2'} rounded-full bg-blue-600${i > 1 ? '/20' : ''}`}></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
