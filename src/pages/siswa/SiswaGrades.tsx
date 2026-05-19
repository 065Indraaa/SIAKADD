import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchNilaiSiswa } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { currentTahunAjaran, currentSemester, buildTahunAjaranOptions } from '@/lib/tahunAjaran';

const SEMESTER_OPTIONS = ['Ganjil', 'Genap'];

export default function SiswaGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [semester, setSemester] = useState(currentSemester());
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Nilai & Rapor
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl">
            Nilai semester yang telah diinput guru mata pelajaran. Rapot final terbuka setelah administrasi lunas.
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

      <Card className="scola-card rounded-2xl overflow-hidden">
        <CardHeader className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-foreground text-lg font-bold">
                  Rincian Semester {semester}
                </CardTitle>
                <p className="text-muted-foreground text-xs mt-0.5">Tahun Ajaran {tahunAjaran}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={tahunAjaran} onValueChange={(v) => { if (v) setTahunAjaran(v); }}>
                <SelectTrigger className="w-full sm:w-[140px] h-10 text-sm font-medium rounded-lg">
                  <SelectValue placeholder="Tahun Ajaran" />
                </SelectTrigger>
                <SelectContent>
                  {tahunAjaranOptions.map(ta => (
                    <SelectItem key={ta} value={ta}>{ta}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={semester} onValueChange={(v) => { if (v) setSemester(v); }}>
                <SelectTrigger className="w-full sm:w-[130px] h-10 text-sm font-medium rounded-lg">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTER_OPTIONS.map(s => (
                    <SelectItem key={s} value={s}>Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-4 pl-6 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    Mata Pelajaran
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    Harian
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    UTS
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    UAS
                  </TableHead>
                  <TableHead className="text-right pr-6 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    Akhir
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
                    </TableCell>
                  </TableRow>
                ) : grades.length > 0 ? (
                  grades.map((grade) => {
                    const akhir = calculateNilaiAkhir(grade);
                    const color = akhir >= 85
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : akhir >= 75
                      ? 'text-blue-600 dark:text-blue-400'
                      : akhir >= 60
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-400';
                    return (
                      <TableRow key={grade.id}>
                        <TableCell className="py-4 pl-6">
                          <p className="font-semibold text-foreground">
                            {grade.mataPelajaran?.nama || '-'}
                          </p>
                          {grade.mataPelajaran?.kode && (
                            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                              {grade.mataPelajaran.kode}
                            </p>
                          )}
                        </TableCell>
                        <TableCell className="text-center text-foreground font-medium tabular-nums">
                          {grade.nilaiHarian ?? '—'}
                        </TableCell>
                        <TableCell className="text-center text-foreground font-medium tabular-nums">
                          {grade.nilaiUts ?? '—'}
                        </TableCell>
                        <TableCell className="text-center text-foreground font-medium tabular-nums">
                          {grade.nilaiUas ?? '—'}
                        </TableCell>
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
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground text-sm">
                      Belum ada nilai untuk Semester {semester} T.A. {tahunAjaran}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-6 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Rata-rata nilai akhir
                </p>
                <p className="text-2xl font-bold text-foreground tabular-nums">
                  {avgIpk}
                  <span className={`text-xs font-semibold uppercase ml-2 tracking-wider ${
                    parseFloat(avgIpk) >= 85 ? 'text-emerald-600 dark:text-emerald-400'
                      : parseFloat(avgIpk) >= 75 ? 'text-blue-600 dark:text-blue-400'
                      : parseFloat(avgIpk) >= 60 ? 'text-amber-600 dark:text-amber-400'
                      : 'text-muted-foreground'
                  }`}>
                    {parseFloat(avgIpk) >= 85 ? 'sangat baik'
                      : parseFloat(avgIpk) >= 75 ? 'baik'
                      : parseFloat(avgIpk) >= 60 ? 'cukup'
                      : 'belum terinput'}
                  </span>
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              Nilai akhir dihitung 30% harian + 30% UTS + 40% UAS. KKM sekolah 75.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
