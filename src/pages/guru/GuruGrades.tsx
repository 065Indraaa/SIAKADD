import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LookupSelect } from '@/components/ui/lookup-select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Save, Loader2, RefreshCw, CheckCircle2, Info, BookOpen, Calculator, AlertTriangle, Trash2, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchJadwalGuru, fetchKelas, fetchMataPelajaran, fetchBobotNilai, setBobotNilai, updateNilaiData, fetchTugasHarianByKelas, addTugasHarian } from '@/lib/schoolService';
import { fetchSiswa } from '@/lib/userService';
import { getGuruByPengguna, upsertNilai, getNilaiByKelasRef, deleteNilai } from '@uassiakad/connector';
import { executeQuery } from 'firebase/data-connect';
import { dataConnect } from '@/lib/userService';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';
import { currentTahunAjaran, currentSemester } from '@/lib/tahunAjaran';

interface SiswaGrade {
  siswaId: string;
  nis: string;
  name: string;
  nilaiHarian: number | string;
  nilaiUts: number | string;
  nilaiUas: number | string;
  nilaiRemedialUts: number | string;
  nilaiRemedialUas: number | string;
  existingId?: string;
  tugas: Record<number, number | string>;
}

interface TeachingAssignment {
  key: string;
  kelasId: string;
  kelasNama: string;
  kelasLevel?: number | string;
  mataPelajaranId: string;
  mataPelajaranKode: string;
  mataPelajaranNama: string;
}

interface Bobot {
  bobotKehadiran: number;
  bobotHarian: number;
  bobotUts: number;
  bobotUas: number;
  kkm: number;
}

const SEMESTER = ['Ganjil', 'Genap'];
const DEFAULT_BOBOT: Bobot = { bobotKehadiran: 0, bobotHarian: 30, bobotUts: 30, bobotUas: 40, kkm: 75 };

export default function GuruGrades() {
  const { user } = useAuth();
  const { add: addNotif } = useNotifications();

  const [semester, setSemester] = useState(currentSemester());
  const [tahunAjaran, setTahunAjaran] = useState(currentTahunAjaran());

  const [assignments, setAssignments] = useState<TeachingAssignment[]>([]);
  const [selectedKey, setSelectedKey] = useState('');
  const [students, setStudents] = useState<SiswaGrade[]>([]);

  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bobot, setBobot] = useState<Bobot>(DEFAULT_BOBOT);
  const [bobotLoading, setBobotLoading] = useState(false);
  const [showBobot, setShowBobot] = useState(false);

  const [jumlahTugas, setJumlahTugas] = useState(10);
  const [tugasMap, setTugasMap] = useState<Record<string, Record<number, { id?: string; nilai?: number }>>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const hasChangesRef = useRef(hasChanges);
  useEffect(() => { hasChangesRef.current = hasChanges; }, [hasChanges]);

  const loadAssignments = useCallback(async () => {
    setLoadingAssignments(true);
    setError(null);
    try {
      let guruId = user?.guruId;
      if (!guruId && user?.penggunaId) {
        const lookup = await getGuruByPengguna(dataConnect, { penggunaId: user.penggunaId });
        guruId = lookup.data.gurus[0]?.id;
      }
      if (!guruId) {
        setAssignments([]);
        setSelectedKey('');
        return;
      }

      const [jadwalData, kelasData, mapelData] = await Promise.all([
        fetchJadwalGuru(guruId, tahunAjaran),
        fetchKelas(),
        fetchMataPelajaran(),
      ]);
      const kelasByName = new Map(kelasData.map((k: any) => [String(k.name).toLowerCase(), k]));
      const mapelByName = new Map(mapelData.map((m: any) => [String(m.nama).toLowerCase(), m]));
      const filtered = (jadwalData || []).filter((j: any) => !j.semester || j.semester === semester);
      const uniq = new Map<string, TeachingAssignment>();
      filtered.forEach((j: any) => {
        const kelasFallback = j.kelas?.nama ? kelasByName.get(String(j.kelas.nama).toLowerCase()) : null;
        const mapelFallback = j.mataPelajaran?.nama ? mapelByName.get(String(j.mataPelajaran.nama).toLowerCase()) : null;
        const kelasId = j.kelas?.id || kelasFallback?.id;
        const mapelId = j.mataPelajaran?.id || mapelFallback?.id;
        if (!kelasId || !mapelId) return;
        const key = `${kelasId}__${mapelId}`;
        if (!uniq.has(key)) {
          uniq.set(key, {
            key,
            kelasId,
            kelasNama: j.kelas?.nama || kelasFallback?.name || '-',
            kelasLevel: j.kelas?.tingkat || kelasFallback?.level,
            mataPelajaranId: mapelId,
            mataPelajaranKode: j.mataPelajaran?.kode || mapelFallback?.kode || '',
            mataPelajaranNama: j.mataPelajaran?.nama || mapelFallback?.nama || '-',
          });
        }
      });
      const list = Array.from(uniq.values()).sort((a, b) =>
        a.kelasNama.localeCompare(b.kelasNama) || a.mataPelajaranNama.localeCompare(b.mataPelajaranNama),
      );
      setAssignments(list);
      setSelectedKey(prev => {
        if (list.length === 0) return '';
        if (list.find(a => a.key === prev)) return prev;
        return list[0].key;
      });
    } catch (e: any) {
      setError(e.message || 'Gagal memuat daftar kelas dan mata pelajaran yang Anda ampu.');
    } finally {
      setLoadingAssignments(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.guruId, user?.penggunaId, semester, tahunAjaran]);

  useEffect(() => {
    if (user && user.role === 'guru') {
      loadAssignments();
    }
  }, [loadAssignments, user]);

  const selectedAssignment = useMemo(
    () => assignments.find(a => a.key === selectedKey) || null,
    [assignments, selectedKey],
  );

  const loadBobot = useCallback(async () => {
    if (!selectedAssignment) return;
    setBobotLoading(true);
    try {
      const data = await fetchBobotNilai(
        selectedAssignment.kelasId,
        selectedAssignment.mataPelajaranId,
        semester,
        tahunAjaran
      );
      if (data) {
        setBobot({
          bobotKehadiran: data.bobotKehadiran ?? 0,
          bobotHarian: data.bobotHarian ?? 30,
          bobotUts: data.bobotUts ?? 30,
          bobotUas: data.bobotUas ?? 40,
          kkm: data.kkm ?? 75,
        });
      } else {
        setBobot(DEFAULT_BOBOT);
      }
    } catch { /* ignore */ } finally {
      setBobotLoading(false);
    }
  }, [selectedAssignment, semester, tahunAjaran]);

  useEffect(() => { loadBobot(); }, [loadBobot]);

  const loadStudentsWithGrades = useCallback(async () => {
    if (!selectedAssignment) {
      setStudents([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { kelasId, mataPelajaranId } = selectedAssignment;
      const [siswaData, gradesRes, tugasRes] = await Promise.all([
        fetchSiswa(kelasId),
        executeQuery(getNilaiByKelasRef(dataConnect, {
          kelasId,
          mataPelajaranId,
          semester,
          tahunAjaran,
        }), { fetchPolicy: 'SERVER_ONLY' }),
        fetchTugasHarianByKelas(kelasId, mataPelajaranId, semester, tahunAjaran),
      ]);

      const gradesMap = new Map<string, any>();
      gradesRes.data.nilais.forEach((n: any) => {
        if (n.siswa?.id) gradesMap.set(n.siswa.id, n);
        if (n.siswa?.nis) gradesMap.set(n.siswa.nis, n);
      });

      const tugasBySiswa: Record<string, Record<number, { id?: string; nilai?: number }>> = {};
      let maxTugas = 0;
      tugasRes.forEach((t: any) => {
        const sid = t.siswa?.id;
        if (!sid) return;
        if (!tugasBySiswa[sid]) tugasBySiswa[sid] = {};
        tugasBySiswa[sid][t.pertemuanKe] = { id: t.id, nilai: t.nilai };
        if (t.pertemuanKe > maxTugas) maxTugas = t.pertemuanKe;
      });

      // Ambil jumlahTugasHarian dari salah satu record nilai jika ada
      let jumlahTugasHarian = 10;
      gradesRes.data.nilais.forEach((n: any) => {
        if (n.jumlahTugasHarian && n.jumlahTugasHarian > jumlahTugasHarian) {
          jumlahTugasHarian = n.jumlahTugasHarian;
        }
      });
      if (maxTugas > jumlahTugasHarian) jumlahTugasHarian = maxTugas;
      // Jangan override jumlahTugas jika user sedang mengedit (belum disimpan)
      if (!hasChangesRef.current) {
        setJumlahTugas(jumlahTugasHarian);
      }
      setTugasMap(tugasBySiswa);

      setStudents(siswaData.map(s => {
        const sid = s.siswaId || s.id;
        const existing = (s.siswaId ? gradesMap.get(s.siswaId) : null) || (s.nis ? gradesMap.get(s.nis) : null);
        const tugasSiswa = tugasBySiswa[sid] || {};
        const tugasObj: Record<number, number | string> = {};
        for (let i = 1; i <= jumlahTugasHarian; i++) {
          tugasObj[i] = tugasSiswa[i]?.nilai ?? '';
        }
        return {
          siswaId: sid,
          nis: s.nis || '',
          name: s.name,
          nilaiHarian: existing?.nilaiHarian ?? '',
          nilaiUts: existing?.nilaiUts ?? '',
          nilaiUas: existing?.nilaiUas ?? '',
          nilaiRemedialUts: existing?.nilaiRemedialUts ?? '',
          nilaiRemedialUas: existing?.nilaiRemedialUas ?? '',
          existingId: existing?.id,
          tugas: tugasObj,
        };
      }));
    } catch (e: any) {
      setError(e.message || 'Gagal memuat siswa.');
    } finally {
      setLoading(false);
    }
  }, [selectedAssignment, semester, tahunAjaran]);

  useEffect(() => { loadStudentsWithGrades(); }, [loadStudentsWithGrades]);
  useAutoRefresh(loadStudentsWithGrades, 20_000, !hasChanges);

  // Reset dirty flag saat ganti assignment agar jumlah tugas dari DB di-load
  useEffect(() => {
    setHasChanges(false);
  }, [selectedAssignment?.key]);

  const [refreshing, refresh] = useManualRefresh(loadAssignments, loadStudentsWithGrades);

  const handleNilaiChange = (siswaId: string, field: keyof Omit<SiswaGrade, 'tugas'>, val: string) => {
    setStudents(prev => prev.map(s => s.siswaId === siswaId ? { ...s, [field]: val } : s));
    setSaved(false);
    setHasChanges(true);
  };

  const handleTugasChange = (siswaId: string, pertemuan: number, val: string) => {
    setStudents(prev => prev.map(s => {
      if (s.siswaId !== siswaId) return s;
      return { ...s, tugas: { ...s.tugas, [pertemuan]: val } };
    }));
    setSaved(false);
    setHasChanges(true);
  };

  const effectiveUts = (s: SiswaGrade) => {
    const uts = parseFloat(String(s.nilaiUts)) || 0;
    const rem = parseFloat(String(s.nilaiRemedialUts)) || 0;
    return rem > uts ? rem : uts;
  };

  const effectiveUas = (s: SiswaGrade) => {
    const uas = parseFloat(String(s.nilaiUas)) || 0;
    const rem = parseFloat(String(s.nilaiRemedialUas)) || 0;
    return rem > uas ? rem : uas;
  };

  const avgTugas = (s: SiswaGrade) => {
    const vals = Object.values(s.tugas).map(v => parseFloat(String(v))).filter(v => !isNaN(v));
    if (vals.length === 0) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const calculateFinal = (s: SiswaGrade) => {
    const nh = parseFloat(String(s.nilaiHarian)) || avgTugas(s) || 0;
    const uts = effectiveUts(s);
    const uas = effectiveUas(s);
    if (!nh && !uts && !uas) return 0;
    const totalBobot = bobot.bobotHarian + bobot.bobotUts + bobot.bobotUas;
    if (totalBobot === 0) return 0;
    return (nh * bobot.bobotHarian + uts * bobot.bobotUts + uas * bobot.bobotUas) / totalBobot;
  };

  const handleSave = async () => {
    if (!selectedAssignment) {
      setError('Pilih kelas dan mata pelajaran yang Anda ampu terlebih dahulu.');
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
        const remUts = parseFloat(String(s.nilaiRemedialUts));
        const remUas = parseFloat(String(s.nilaiRemedialUas));
        const hasNilai = !isNaN(nh) || !isNaN(uts) || !isNaN(uas) || !isNaN(remUts) || !isNaN(remUas);
        if (!hasNilai && !s.existingId) continue;

        try {
          if (s.existingId) {
            await updateNilaiData(s.existingId, {
              nilaiHarian: isNaN(nh) ? null : nh,
              nilaiUts: isNaN(uts) ? null : uts,
              nilaiUas: isNaN(uas) ? null : uas,
              nilaiRemedialUts: isNaN(remUts) ? null : remUts,
              nilaiRemedialUas: isNaN(remUas) ? null : remUas,
              jumlahTugasHarian: jumlahTugas,
            });
          } else {
            await upsertNilai(dataConnect, {
              siswaId: s.siswaId,
              kelasId: selectedAssignment.kelasId,
              mataPelajaranId: selectedAssignment.mataPelajaranId,
              semester,
              tahunAjaran,
              nilaiHarian: isNaN(nh) ? null : nh,
              nilaiUts: isNaN(uts) ? null : uts,
              nilaiUas: isNaN(uas) ? null : uas,
              nilaiRemedialUts: isNaN(remUts) ? null : remUts,
              nilaiRemedialUas: isNaN(remUas) ? null : remUas,
              jumlahTugasHarian: jumlahTugas,
            } as any);
          }
          successCount++;
        } catch (e: any) {
          errors.push(`${s.name}: ${e.message}`);
        }
      }

      // Simpan tugas harian per siswa
      for (const s of students) {
        for (let i = 1; i <= jumlahTugas; i++) {
          const val = parseFloat(String(s.tugas[i]));
          if (isNaN(val)) continue;
          try {
            await addTugasHarian({
              siswaId: s.siswaId,
              kelasId: selectedAssignment.kelasId,
              mataPelajaranId: selectedAssignment.mataPelajaranId,
              semester,
              tahunAjaran,
              pertemuanKe: i,
              nilai: val,
            });
          } catch { /* ignore duplicate key conflicts */ }
        }
      }

      if (errors.length > 0) {
        setError(`${successCount} berhasil disimpan, ${errors.length} gagal. Detail: ${errors.slice(0, 3).join('; ')}`);
      } else {
        setSaved(true);
        setHasChanges(false);
        setTimeout(() => setSaved(false), 3000);
        if (successCount > 0) {
          addNotif({
            type: 'success', kind: 'akademik',
            targetRoles: ['guru'],
            title: 'Nilai Tersimpan',
            body: `${successCount} nilai berhasil disimpan untuk ${selectedAssignment.mataPelajaranNama} (${selectedAssignment.kelasNama}).`,
          });
        }
      }
      await new Promise(r => setTimeout(r, 400));
      await loadStudentsWithGrades();
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan nilai.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNilai = async (siswa: SiswaGrade) => {
    if (!siswa.existingId) return;
    if (!confirm(`Hapus nilai untuk ${siswa.name}?`)) return;
    try {
      await deleteNilai(dataConnect, { id: siswa.existingId });
      await loadStudentsWithGrades();
      addNotif({
        type: 'success', kind: 'akademik',
        targetRoles: ['guru'],
        title: 'Nilai Dihapus',
        body: `Nilai ${siswa.name} telah dihapus.`,
      });
    } catch (e: any) {
      setError(`Gagal menghapus nilai ${siswa.name}: ${e.message}`);
    }
  };

  const handleSaveBobot = async () => {
    if (!selectedAssignment) return;
    setBobotLoading(true);
    try {
      await setBobotNilai({
        kelasId: selectedAssignment.kelasId,
        mataPelajaranId: selectedAssignment.mataPelajaranId,
        semester,
        tahunAjaran,
        ...bobot,
      });
      addNotif({
        type: 'success', kind: 'akademik',
        targetRoles: ['guru'],
        title: 'Bobot Nilai Tersimpan',
        body: `Bobot nilai untuk ${selectedAssignment.mataPelajaranNama} (${selectedAssignment.kelasNama}) telah diperbarui.`,
      });
    } catch (e: any) {
      setError(`Gagal menyimpan bobot nilai: ${e.message}`);
    } finally {
      setBobotLoading(false);
    }
  };

  const assignmentItems = assignments.map(a => ({
    value: a.key,
    label: `${a.kelasNama} — ${a.mataPelajaranNama}`,
    hint: `${a.mataPelajaranKode}${a.kelasLevel ? ` · Kelas ${a.kelasLevel}` : ''}`,
  }));

  const tugasHeaders = Array.from({ length: jumlahTugas }, (_, i) => i + 1);

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Pengisian Nilai Siswa</h2>
          <p className="text-muted-foreground mt-1">Masukkan nilai harian, UTS, UAS, dan remedial. Nilai akhir dihitung otomatis berdasarkan bobot.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowBobot(prev => !prev)} className="h-11 px-4 rounded-xl">
            <Settings className="h-4 w-4 mr-2" />
            Bobot Nilai
          </Button>
          <Button variant="outline" onClick={refresh} disabled={refreshing}
            className="h-11 w-11 rounded-xl p-0" title="Segarkan data">
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleSave} disabled={saving || students.length === 0}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-6 rounded-xl font-semibold text-white">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            {saved ? 'Tersimpan' : 'Simpan Semua'}
          </Button>
        </div>
      </div>

      {/* Filter */}
      <Card className="rounded-2xl">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 md:col-span-1">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                Kelas & Mata Pelajaran
              </Label>
              <LookupSelect
                value={selectedKey}
                onChange={setSelectedKey}
                items={assignmentItems}
                placeholder={
                  loadingAssignments
                    ? 'Memuat jadwal mengajar...'
                    : assignmentItems.length
                      ? 'Pilih kelas dan mata pelajaran'
                      : 'Belum ada jadwal mengajar'
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Semester</Label>
              <Select value={semester} onValueChange={(v) => setSemester(v || 'Ganjil')}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTER.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Tahun Ajaran</Label>
              <Input value={tahunAjaran} onChange={(e) => setTahunAjaran(e.target.value)}
                placeholder={currentTahunAjaran()} className="h-11 rounded-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bobot Nilai Panel */}
      {showBobot && (
        <Card className="rounded-2xl border-blue-500/20">
          <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Calculator className="h-4 w-4 text-blue-500" />
              Pengaturan Bobot Nilai & KKM
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowBobot(false)} className="h-8 w-8 p-0 rounded-lg">
              <ChevronUp className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Kehadiran (%)</Label>
                <Input type="number" min={0} max={100} value={bobot.bobotKehadiran}
                  onChange={(e) => setBobot(prev => ({ ...prev, bobotKehadiran: parseFloat(e.target.value) || 0 }))}
                  className="h-11 rounded-xl text-center" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Harian (%)</Label>
                <Input type="number" min={0} max={100} value={bobot.bobotHarian}
                  onChange={(e) => setBobot(prev => ({ ...prev, bobotHarian: parseFloat(e.target.value) || 0 }))}
                  className="h-11 rounded-xl text-center" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">UTS (%)</Label>
                <Input type="number" min={0} max={100} value={bobot.bobotUts}
                  onChange={(e) => setBobot(prev => ({ ...prev, bobotUts: parseFloat(e.target.value) || 0 }))}
                  className="h-11 rounded-xl text-center" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">UAS (%)</Label>
                <Input type="number" min={0} max={100} value={bobot.bobotUas}
                  onChange={(e) => setBobot(prev => ({ ...prev, bobotUas: parseFloat(e.target.value) || 0 }))}
                  className="h-11 rounded-xl text-center" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">KKM</Label>
                <Input type="number" min={0} max={100} value={bobot.kkm}
                  onChange={(e) => setBobot(prev => ({ ...prev, kkm: parseFloat(e.target.value) || 75 }))}
                  className="h-11 rounded-xl text-center" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveBobot} disabled={bobotLoading} className="rounded-xl">
                {bobotLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Simpan Bobot
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Total bobot sebaiknya 100%. KKM default untuk semua mata pelajaran adalah <strong>75</strong>.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Kosongan */}
      {!loadingAssignments && assignments.length === 0 && (
        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-sm flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Belum ada jadwal mengajar untuk Anda</p>
            <p className="mt-1 text-amber-700/80 dark:text-amber-300/80">
              Pengisian nilai hanya tersedia untuk kelas dan mata pelajaran yang tercantum di jadwal mengajar.
              Silakan hubungi administrator agar jadwal mengajar Anda dibuat terlebih dahulu untuk semester {semester} tahun ajaran {tahunAjaran}.
            </p>
          </div>
        </div>
      )}

      {/* Info banner */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm flex items-start gap-3">
        <Calculator className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Pembobotan Nilai Akhir</p>
          <p className="mt-1">
            Harian <strong>{bobot.bobotHarian}%</strong> + UTS <strong>{bobot.bobotUts}%</strong> + UAS <strong>{bobot.bobotUas}%</strong> = Nilai Akhir. KKM: <strong>{bobot.kkm}</strong>. Remedial mengambil nilai tertinggi.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
          <Info className="h-5 w-5 flex-shrink-0 mt-0.5" /> {error}
        </div>
      )}

      {/* Jumlah Tugas Harian */}
      <Card className="rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="space-y-1.5 flex-1">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Jumlah Tugas Harian per Semester</Label>
              <Input type="number" min={1} max={50} value={jumlahTugas}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value) || 1);
                  setJumlahTugas(val);
                  setHasChanges(true);
                }}
                className="h-11 w-32 rounded-xl text-center" />
            </div>
            <p className="text-xs text-muted-foreground max-w-md">
              Tentukan berapa banyak tugas harian yang akan diberikan dalam satu semester. Kolom tugas akan muncul otomatis di tabel.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-border">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            {selectedAssignment ? `${selectedAssignment.kelasNama} · ${selectedAssignment.mataPelajaranNama}` : '—'}
            <Badge className="ml-auto bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20">
              {students.length} siswa
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 pl-6 sticky left-0 bg-background z-10">Siswa</TableHead>
                {tugasHeaders.map(i => (
                  <TableHead key={`th${i}`} className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-center min-w-[60px]">Tugas {i}</TableHead>
                ))}
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-center">Harian</TableHead>
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-center">UTS</TableHead>
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-center">Rem UTS</TableHead>
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-center">UAS</TableHead>
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-center">Rem UAS</TableHead>
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-right pr-6">Akhir</TableHead>
                <TableHead className="text-foreground text-xs uppercase tracking-wider font-semibold py-4 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={8 + tugasHeaders.length} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : students.length > 0 ? students.map((s) => {
                const final = calculateFinal(s);
                const color = final >= bobot.kkm + 10 ? 'text-emerald-600 dark:text-emerald-400' : final >= bobot.kkm ? 'text-blue-600 dark:text-blue-400' : final >= bobot.kkm - 15 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
                return (
                  <TableRow key={s.siswaId}>
                    <TableCell className="py-4 pl-6 sticky left-0 bg-background z-10">
                      <div className="font-semibold text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">NIS {s.nis}</div>
                    </TableCell>
                    {tugasHeaders.map(i => (
                      <TableCell key={`t${i}`} className="text-center">
                        <Input type="number" min={0} max={100} step={0.5}
                          className="w-16 h-9 mx-auto text-center text-sm"
                          value={s.tugas[i] ?? ''}
                          onChange={(e) => handleTugasChange(s.siswaId, i, e.target.value)} />
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto text-center font-semibold"
                        value={s.nilaiHarian} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiHarian', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto text-center font-semibold"
                        value={s.nilaiUts} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiUts', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto text-center font-semibold"
                        value={s.nilaiRemedialUts} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiRemedialUts', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto text-center font-semibold"
                        value={s.nilaiUas} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiUas', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input type="number" min={0} max={100} step={0.5}
                        className="w-20 h-10 mx-auto text-center font-semibold"
                        value={s.nilaiRemedialUas} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiRemedialUas', e.target.value)} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className={`text-xl font-bold tabular-nums ${color}`}>
                        {final > 0 ? final.toFixed(1) : '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {s.existingId ? (
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteNilai(s)}
                          className="h-8 px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow><TableCell colSpan={8 + tugasHeaders.length} className="h-32 text-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground font-semibold">Belum ada siswa</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAssignment
                      ? 'Kelas ini belum memiliki siswa terdaftar.'
                      : 'Pilih kelas dan mata pelajaran yang Anda ampu terlebih dahulu.'}
                  </p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
