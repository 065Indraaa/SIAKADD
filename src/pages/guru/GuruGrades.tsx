import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LookupSelect } from '@/components/ui/lookup-select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Save, Loader2, RefreshCw, CheckCircle2, Info, BookOpen, Calculator } from 'lucide-react';
import { fetchKelas, fetchMataPelajaran } from '@/lib/schoolService';
import { fetchSiswa } from '@/lib/userService';
import { upsertNilai, getNilaiByKelas } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

interface SiswaGrade {
  siswaId: string;
  nis: string;
  name: string;
  nilaiHarian: number | string;
  nilaiUts: number | string;
  nilaiUas: number | string;
  existingId?: string;
}

const SEMESTER = ['Ganjil', 'Genap'];

function generateTahunAjaran(): string {
  const now = new Date();
  const y = now.getFullYear();
  return now.getMonth() >= 6 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}

export default function GuruGrades() {
  const { add: addNotif } = useNotifications();
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [mapelList, setMapelList] = useState<any[]>([]);
  const [selectedKelasId, setSelectedKelasId] = useState('');
  const [selectedMapelId, setSelectedMapelId] = useState('');
  const [students, setStudents] = useState<SiswaGrade[]>([]);
  const [semester, setSemester] = useState('Ganjil');
  const [tahunAjaran, setTahunAjaran] = useState(generateTahunAjaran());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMetadata = useCallback(async () => {
    try {
      const [kelasData, mapelData] = await Promise.all([fetchKelas(), fetchMataPelajaran()]);
      setKelasList(kelasData);
      setMapelList(mapelData);
      if (kelasData.length > 0 && !selectedKelasId) setSelectedKelasId(kelasData[0].id);
      if (mapelData.length > 0 && !selectedMapelId) setSelectedMapelId(mapelData[0].id);
    } catch (e: any) {
      setError(e.message);
    }
  }, [selectedKelasId, selectedMapelId]);

  useEffect(() => { loadMetadata(); }, [loadMetadata]);

  const loadStudentsWithGrades = useCallback(async () => {
    if (!selectedKelasId || !selectedMapelId) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch students in this class
      const siswaData = await fetchSiswa(selectedKelasId);

      // 2. Fetch existing grades for this class + mapel
      const gradesRes = await getNilaiByKelas(dataConnect, {
        kelasId: selectedKelasId,
        mataPelajaranId: selectedMapelId,
      });
      const gradesMap = new Map<string, any>();
      gradesRes.data.nilais.forEach((n: any) => {
        // Match by NIS (since we don't have siswaId in the response of getNilaiByKelas)
        if (n.siswa?.nis) gradesMap.set(n.siswa.nis, n);
      });

      setStudents(siswaData.map(s => {
        const existing = s.nis ? gradesMap.get(s.nis) : null;
        return {
          siswaId: s.siswaId || s.id,
          nis: s.nis || '',
          name: s.name,
          nilaiHarian: existing?.nilaiHarian ?? '',
          nilaiUts: existing?.nilaiUts ?? '',
          nilaiUas: existing?.nilaiUas ?? '',
          existingId: existing?.id,
        };
      }));
    } catch (e: any) {
      setError(e.message || 'Gagal memuat siswa.');
    } finally {
      setLoading(false);
    }
  }, [selectedKelasId, selectedMapelId]);

  useEffect(() => { loadStudentsWithGrades(); }, [loadStudentsWithGrades]);

  useAutoRefresh(loadStudentsWithGrades, 20_000);

  const handleNilaiChange = (siswaId: string, field: keyof SiswaGrade, val: string) => {
    setStudents(prev => prev.map(s => s.siswaId === siswaId ? { ...s, [field]: val } : s));
    setSaved(false);
  };

  const calculateFinal = (s: SiswaGrade) => {
    const nh = parseFloat(String(s.nilaiHarian)) || 0;
    const uts = parseFloat(String(s.nilaiUts)) || 0;
    const uas = parseFloat(String(s.nilaiUas)) || 0;
    if (!nh && !uts && !uas) return 0;
    return nh * 0.3 + uts * 0.3 + uas * 0.4;
  };

  const handleSave = async () => {
    if (!selectedKelasId || !selectedMapelId) {
      setError('Pilih kelas dan mata pelajaran terlebih dahulu.');
      return;
    }
    setSaving(true);
    setError(null);
    let successCount = 0;
    const errors: string[] = [];
    try {
      for (const s of students) {
        const nh = parseFloat(String(s.nilaiHarian));
        const uts = parseFloat(String(s.nilaiUts));
        const uas = parseFloat(String(s.nilaiUas));
        // Skip if all empty
        if (isNaN(nh) && isNaN(uts) && isNaN(uas)) continue;

        try {
          await upsertNilai(dataConnect, {
            siswaId: s.siswaId,
            kelasId: selectedKelasId,
            mataPelajaranId: selectedMapelId,
            semester,
            tahunAjaran,
            nilaiHarian: isNaN(nh) ? null : nh,
            nilaiUts: isNaN(uts) ? null : uts,
            nilaiUas: isNaN(uas) ? null : uas,
          } as any);
          successCount++;
        } catch (e: any) {
          errors.push(`${s.name}: ${e.message}`);
        }
      }
      if (errors.length > 0) {
        setError(`${successCount} berhasil disimpan, ${errors.length} gagal. Detail: ${errors.slice(0, 3).join('; ')}`);
        addNotif({
          type: 'warning', kind: 'akademik',
          title: 'Penyimpanan Nilai Sebagian Gagal',
          body: `${successCount} nilai tersimpan, ${errors.length} gagal. Silakan periksa kembali.`,
        });
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        if (successCount > 0) {
          addNotif({
            type: 'success', kind: 'akademik',
            title: 'Nilai Tersimpan',
            body: `${successCount} nilai berhasil disimpan untuk ${selectedMapel?.nama || 'mata pelajaran ini'}.`,
          });
        }
      }
      await loadStudentsWithGrades();
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan nilai.');
    } finally {
      setSaving(false);
    }
  };

  const kelasItems = kelasList.map(k => ({ value: k.id, label: k.name, hint: `Kelas ${k.level}` }));
  const mapelItems = mapelList.map(m => ({ value: m.id, label: `${m.kode} — ${m.nama}`, hint: m.nama }));

  const selectedKelas = kelasList.find(k => k.id === selectedKelasId);
  const selectedMapel = mapelList.find(m => m.id === selectedMapelId);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Input Nilai Siswa</h2>
          <p className="text-slate-300 mt-1">Masukkan nilai harian, UTS, dan UAS. Nilai akhir dihitung otomatis.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadStudentsWithGrades} disabled={loading}
            className="h-11 w-11 rounded-xl border-white/10 bg-white/5 p-0">
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleSave} disabled={saving || students.length === 0}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-6 rounded-xl font-semibold text-white">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            {saved ? 'Tersimpan' : 'Simpan Semua'}
          </Button>
        </div>
      </div>

      {/* Filter */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Kelas</Label>
              <LookupSelect
                value={selectedKelasId}
                onChange={setSelectedKelasId}
                items={kelasItems}
                placeholder={kelasItems.length ? 'Pilih kelas' : 'Memuat...'}
                className="h-11 bg-slate-950 border-white/10 rounded-lg text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Mata Pelajaran</Label>
              <LookupSelect
                value={selectedMapelId}
                onChange={setSelectedMapelId}
                items={mapelItems}
                placeholder={mapelItems.length ? 'Pilih mata pelajaran' : 'Memuat...'}
                className="h-11 bg-slate-950 border-white/10 rounded-lg text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Semester</Label>
              <Select value={semester} onValueChange={(v) => setSemester(v || 'Ganjil')}>
                <SelectTrigger className="h-11 bg-slate-950 border-white/10 rounded-lg text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {SEMESTER.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Tahun Ajaran</Label>
              <Input value={tahunAjaran} onChange={(e) => setTahunAjaran(e.target.value)}
                placeholder="2024/2025"
                className="h-11 bg-slate-950 border-white/10 rounded-lg text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info banner */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-sm flex items-start gap-3">
        <Calculator className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-100">Pembobotan Nilai Akhir</p>
          <p className="mt-1 text-blue-200/90">
            <strong>Nilai Harian 30%</strong> + <strong>UTS 30%</strong> + <strong>UAS 40%</strong> = Nilai Akhir. KKM: 75.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
          <Info className="h-5 w-5 flex-shrink-0 mt-0.5" /> {error}
        </div>
      )}

      {/* Table */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-white/10">
          <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            {selectedKelas?.name || '—'} · {selectedMapel?.nama || '—'}
            <Badge className="ml-auto bg-blue-500/10 text-blue-300 border-blue-500/30">
              {students.length} siswa
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 pl-6">Siswa</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 text-center">Harian</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 text-center">UTS</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 text-center">UAS</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 text-right pr-6">Nilai Akhir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : students.length > 0 ? students.map((s) => {
                const final = calculateFinal(s);
                const color = final >= 85 ? 'text-emerald-400' : final >= 75 ? 'text-blue-400' : final >= 60 ? 'text-amber-400' : 'text-red-400';
                return (
                  <TableRow key={s.siswaId} className="border-white/10 hover:bg-white/5">
                    <TableCell className="py-4 pl-6">
                      <div className="font-semibold text-white">{s.name}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">NIS {s.nis}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto bg-slate-950 border-white/10 rounded-lg text-center font-semibold text-white"
                        value={s.nilaiHarian} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiHarian', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto bg-slate-950 border-white/10 rounded-lg text-center font-semibold text-white"
                        value={s.nilaiUts} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiUts', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto bg-slate-950 border-white/10 rounded-lg text-center font-semibold text-white"
                        value={s.nilaiUas} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiUas', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className={`text-xl font-bold tabular-nums ${color}`}>
                        {final > 0 ? final.toFixed(1) : '—'}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow><TableCell colSpan={5} className="h-32 text-center">
                  <BookOpen className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-300 font-semibold">Belum ada siswa</p>
                  <p className="text-sm text-slate-400">Pilih kelas yang memiliki siswa terdaftar.</p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
