import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, TrendingUp, Loader2, Calculator } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchNilaiSiswa, fetchBobotNilaiByKelas, fetchKehadiranBySiswa, hitungSkorKehadiran, hitungNilaiAkhirBobot } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { currentTahunAjaran, currentSemester, buildTahunAjaranOptions } from '@/lib/tahunAjaran';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SEMESTER_OPTIONS = ['Ganjil', 'Genap'];
const DEFAULT_BOBOT = { bobotKehadiran: 0, bobotHarian: 30, bobotUts: 30, bobotUas: 40, kkm: 75 };

export default function SiswaGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [semester, setSemester] = useState(currentSemester());
  const [tahunAjaran, setTahunAjaran] = useState(currentTahunAjaran());
  const [bobotMap, setBobotMap] = useState<Record<string, any>>({});
  const [skorKehadiran, setSkorKehadiran] = useState<number | null>(null);

  const tahunAjaranOptions = useMemo(() => buildTahunAjaranOptions(), []);

  const loadGrades = useCallback(async () => {
    if (!user?.siswaId) {
      setGrades([]);
      return;
    }
    setLoading(true);
    try {
      const [data, bobotData, kehadiranData] = await Promise.all([
        fetchNilaiSiswa(user.siswaId, semester, tahunAjaran),
        user?.kelasId ? fetchBobotNilaiByKelas(user.kelasId, semester, tahunAjaran) : Promise.resolve([]),
        fetchKehadiranBySiswa(user.siswaId).catch(() => []),
      ]);
      setGrades(data || []);
      const map: Record<string, any> = {};
      (bobotData || []).forEach((b: any) => {
        if (b.mataPelajaran?.id) {
          map[b.mataPelajaran.id] = b;
        }
      });
      setBobotMap(map);
      setSkorKehadiran(hitungSkorKehadiran(kehadiranData));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user?.siswaId, user?.kelasId, semester, tahunAjaran]);

  useEffect(() => { loadGrades(); }, [loadGrades]);
  useAutoRefresh(loadGrades, 20_000);

  const calculateNilaiAkhir = (g: any) => {
    const bobot = bobotMap[g.mataPelajaran?.id] || DEFAULT_BOBOT;
    return hitungNilaiAkhirBobot(g, bobot, skorKehadiran);
  };

  const avgIpk = grades.length > 0
    ? (grades.reduce((acc, curr) => acc + calculateNilaiAkhir(curr), 0) / grades.length).toFixed(2)
    : '0.00';

  const predikat = (n: number) =>
    n >= 90 ? 'A' : n >= 80 ? 'B' : n >= 70 ? 'C' : n >= 60 ? 'D' : 'E';

  const handleDownloadRapor = () => {
    if (grades.length === 0) {
      alert('Belum ada nilai untuk diunduh pada semester & tahun ajaran ini.');
      return;
    }
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();

    // Kop
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN HASIL BELAJAR SISWA', pageW / 2, 16, { align: 'center' });
    doc.setFontSize(11);
    doc.text('SMAIT Nur Hidayah Sukoharjo', pageW / 2, 23, { align: 'center' });
    doc.setDrawColor(180);
    doc.line(14, 27, pageW - 14, 27);

    // Identitas siswa
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const idLeft: [string, string][] = [
      ['Nama', user?.name || '-'],
      ['NIS', user?.nis || '-'],
    ];
    const idRight: [string, string][] = [
      ['Kelas', user?.className || '-'],
      ['Tahun Ajaran', `${tahunAjaran} — Semester ${semester}`],
    ];
    let y = 35;
    idLeft.forEach(([k, v], i) => {
      doc.text(`${k}`, 14, y + i * 6);
      doc.text(`: ${v}`, 40, y + i * 6);
    });
    idRight.forEach(([k, v], i) => {
      doc.text(`${k}`, pageW / 2, y + i * 6);
      doc.text(`: ${v}`, pageW / 2 + 30, y + i * 6);
    });

    // Tabel nilai
    autoTable(doc, {
      startY: y + 14,
      head: [['No', 'Mata Pelajaran', 'Harian', 'UTS', 'UAS', 'Akhir', 'Predikat']],
      body: grades.map((g, i) => {
        const akhir = calculateNilaiAkhir(g);
        return [
          String(i + 1),
          g.mataPelajaran?.nama || '-',
          g.nilaiHarian ?? '-',
          Math.max(g.nilaiUts || 0, g.nilaiRemedialUts || 0) || '-',
          Math.max(g.nilaiUas || 0, g.nilaiRemedialUas || 0) || '-',
          akhir > 0 ? akhir.toFixed(1) : '-',
          akhir > 0 ? predikat(akhir) : '-',
        ];
      }),
      styles: { fontSize: 9, cellPadding: 2.5 },
      headStyles: { fillColor: [37, 99, 235], halign: 'center' },
      columnStyles: {
        0: { halign: 'center', cellWidth: 12 },
        2: { halign: 'center' }, 3: { halign: 'center' },
        4: { halign: 'center' }, 5: { halign: 'center' }, 6: { halign: 'center' },
      },
    });

    // Ringkasan
    const afterTable = (doc as any).lastAutoTable?.finalY ?? y + 14;
    let ry = afterTable + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Rata-rata Nilai Akhir : ${avgIpk}`, 14, ry);
    if (skorKehadiran != null) {
      ry += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`Skor Kehadiran : ${skorKehadiran.toFixed(0)} / 100`, 14, ry);
    }

    // Tanda tangan
    ry += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Mengetahui,', pageW - 70, ry);
    doc.text('Wali Kelas', pageW - 70, ry + 5);
    doc.text('(________________________)', pageW - 70, ry + 28);

    doc.setFontSize(8);
    doc.setTextColor(130);
    doc.text(
      'Dokumen ini dicetak otomatis dari portal SCOLA. Rapor resmi diserahkan melalui wali kelas.',
      14, doc.internal.pageSize.getHeight() - 10,
    );

    const safeName = (user?.name || 'siswa').replace(/\s+/g, '_');
    doc.save(`rapor_${safeName}_${semester}_${tahunAjaran.replace('/', '-')}.pdf`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Nilai & Rapor
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl">
            Nilai semester yang telah diisi guru mata pelajaran. Rapor akhir terbuka setelah administrasi lunas.
          </p>
        </div>
        <Button
          variant="outline"
          disabled={loading || grades.length === 0}
          className="bg-blue-600 hover:bg-blue-500 text-white border-none rounded-xl px-5 h-11 font-semibold text-sm disabled:opacity-50"
          onClick={handleDownloadRapor}
          title={grades.length === 0 ? 'Belum ada nilai untuk diunduh' : 'Unduh rapor sebagai PDF'}
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
                    Rem UTS
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    UAS
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    Rem UAS
                  </TableHead>
                  <TableHead className="text-right pr-6 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    Akhir
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
                    </TableCell>
                  </TableRow>
                ) : grades.length > 0 ? (
                  grades.map((grade) => {
                    const bobot = bobotMap[grade.mataPelajaran?.id] || DEFAULT_BOBOT;
                    const akhir = calculateNilaiAkhir(grade);
                    const color = akhir >= (bobot.kkm || 75) + 10
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : akhir >= (bobot.kkm || 75)
                      ? 'text-blue-600 dark:text-blue-400'
                      : akhir >= (bobot.kkm || 75) - 15
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
                          {grade.nilaiRemedialUts ?? '—'}
                        </TableCell>
                        <TableCell className="text-center text-foreground font-medium tabular-nums">
                          {grade.nilaiUas ?? '—'}
                        </TableCell>
                        <TableCell className="text-center text-foreground font-medium tabular-nums">
                          {grade.nilaiRemedialUas ?? '—'}
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
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                      Belum ada nilai untuk Semester {semester} tahun ajaran {tahunAjaran}.
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
              Nilai akhir dihitung berdasarkan bobot yang ditentukan guru masing-masing mata pelajaran
              {skorKehadiran != null && <>, termasuk komponen kehadiran (skor kehadiranmu: <strong className="text-foreground">{skorKehadiran.toFixed(0)}</strong>)</>}.
              KKM: 75. Remedial mengambil nilai tertinggi.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
