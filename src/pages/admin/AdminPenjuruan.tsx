import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LookupSelect } from '@/components/ui/lookup-select';
import {
  Search, Save, CheckCircle2, Loader2, RefreshCw, MoveRight, Info, Users, Calculator, X, ArrowUpCircle, AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { fetchSiswa } from '@/lib/userService';
import { fetchJurusan, savePeminatan, hitungRataRataKelas10, fetchKelas, approvePenjurusan } from '@/lib/schoolService';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';

/** Kuota per rumpun (jumlah siswa). */
const KUOTA: Record<string, number> = {
  A: 60,
  B: 30,
  C: 60,
};

interface StudentRow {
  siswaId: string;
  penggunaId: string;
  name: string;
  nis: string;
  className: string;
  gradeLevel: number | null;
  tahunMasuk: number | null;
  peminatanId: string;
  peminatanName: string;
  /** Jurusan RESMI siswa (kosong selama masih kelas 10 / belum di-ACC). */
  jurusanId: string;
  jurusanName: string;
  assigned: string;
  rataRata: number | null;
}

export default function AdminPenjuruan() {
  const { add: addNotif } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [showAutoModal, setShowAutoModal] = useState(false);

  const [students, setStudents] = useState<StudentRow[]>([]);
  const [jurusans, setJurusans] = useState<any[]>([]);
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [accId, setAccId] = useState<string | null>(null);
  const [tingkatFilter, setTingkatFilter] = useState<string>('10');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [siswaData, jurusanData, kelasData] = await Promise.all([fetchSiswa(), fetchJurusan(), fetchKelas()]);
      const mapped: StudentRow[] = siswaData.map(s => ({
        siswaId: s.siswaId!,
        penggunaId: s.id,
        name: s.name,
        nis: s.nis || '-',
        className: s.className || 'Belum ada kelas',
        gradeLevel: s.gradeLevel ?? null,
        tahunMasuk: s.tahunMasuk ?? null,
        peminatanId: s.peminatanId || '',
        peminatanName: s.peminatanName || '',
        jurusanId: s.jurusanId || '',
        jurusanName: s.jurusanName || '',
        assigned: s.peminatanId || '',
        rataRata: null,
      }));
      setStudents(mapped);
      setJurusans(jurusanData);
      setKelasList(kelasData);

      // Hitung rata-rata kelas 10 secara paralel (hanya untuk kelas 10).
      // tahunMasuk tidak lagi wajib: hitungRataRataKelas10 punya fallback ke
      // tahun ajaran berjalan bila tahunMasuk kosong/keliru.
      const kelas10 = mapped.filter(m => m.gradeLevel === 10);
      if (kelas10.length > 0) {
        setCalculating(true);
        const rataMap = new Map<string, number | null>();
        await Promise.all(
          kelas10.map(async (s) => {
            const rata = await hitungRataRataKelas10(s.siswaId, s.tahunMasuk);
            rataMap.set(s.siswaId, rata);
          })
        );
        setStudents(prev =>
          prev.map(s => ({
            ...s,
            rataRata: rataMap.get(s.siswaId) ?? s.rataRata,
          }))
        );
        setCalculating(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useAutoRefresh(loadData, 20_000);

  const [refreshing, refresh] = useManualRefresh(loadData);

  const handleAssignmentChange = (siswaId: string, newAssignment: string) => {
    setStudents(prev => prev.map(s => s.siswaId === siswaId ? { ...s, assigned: newAssignment } : s));
    setIsSaved(false);
  };

  const filteredStudents = students.filter(s => {
    const matchSearch = !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nis.includes(searchTerm);
    const matchTingkat = tingkatFilter === 'semua' || String(s.gradeLevel) === tingkatFilter;
    return matchSearch && matchTingkat;
  });

  const changedCount = students.filter(s => s.assigned !== s.peminatanId).length;

  const kodeOf = (id: string): 'A' | 'B' | 'C' | undefined =>
    jurusans.find(j => j.id === id)?.kode;

  // Okupansi kuota dihitung dari JURUSAN RESMI (siswa kelas 11 yang sudah di-ACC).
  const officialCounts: Record<string, number> = { A: 0, B: 0, C: 0 };
  students.forEach(s => {
    const k = kodeOf(s.jurusanId);
    if (k && officialCounts[k] !== undefined) officialCounts[k]++;
  });

  // Kelas target yang tersedia untuk sebuah rumpun sesuai tingkat siswa.
  const kelasTargetByJurusan = (jurusanId: string, level: number | null) =>
    kelasList.filter(k => k.level === (level && level >= 11 ? level : 11) && k.jurusanId === jurusanId);

  /** ACC satu siswa: tetapkan jurusan resmi + tempatkan ke kelas target rumpun terkait. */
  const handleAcc = async (student: StudentRow) => {
    const targetId = student.assigned || student.peminatanId;
    if (!targetId) {
      alert('Siswa belum memilih rumpun. Tetapkan rumpun pada kolom "Tetapkan Peminatan" terlebih dahulu.');
      return;
    }
    const kode = kodeOf(targetId);
    if (kode === 'A' && (student.rataRata ?? 0) < 87) {
      alert(`${student.name} belum memenuhi syarat Rumpun A (Kesehatan).\nRata-rata kelas 10 minimal 87 — saat ini ${student.rataRata != null ? student.rataRata.toFixed(1) : '—'}.`);
      return;
    }
    const alreadyThere = student.jurusanId === targetId;
    if (!alreadyThere && kode && officialCounts[kode] >= (KUOTA[kode] ?? Infinity)) {
      alert(`Kuota Rumpun ${kode} sudah penuh (${officialCounts[kode]}/${KUOTA[kode]}).\nPindahkan siswa lain atau pilih rumpun yang masih tersedia.`);
      return;
    }
    const jurusanNama = jurusans.find(j => j.id === targetId)?.nama || kode;
    const targetLevel = student.gradeLevel && student.gradeLevel >= 11 ? student.gradeLevel : 11;
    const isNaikKelas = student.gradeLevel === 10;
    const aksiText = isNaikKelas
      ? 'naik ke kelas 11'
      : student.jurusanId
      ? `pindah jurusan di kelas ${targetLevel}`
      : `tetapkan jurusan di kelas ${targetLevel}`;
    if (!confirm(`ACC ${student.name} ke Rumpun ${kode} — ${jurusanNama}?\nJurusan resmi & kelas siswa akan diperbarui (${aksiText}).`)) return;

    setAccId(student.siswaId);
    try {
      // Pilih kelas target rumpun terkait dengan anggota paling sedikit (distribusi merata).
      const kelasTarget = kelasTargetByJurusan(targetId, student.gradeLevel).map(k => ({
        id: k.id,
        name: k.name,
        n: students.filter(s => s.className === k.name).length,
      }));
      kelasTarget.sort((a, b) => a.n - b.n);
      const kelasId = kelasTarget[0]?.id;

      await approvePenjurusan({ siswaId: student.siswaId, jurusanId: targetId, kelasId });
      await new Promise(r => setTimeout(r, 400));
      await loadData();
      const notifAksi = isNaikKelas
        ? `${kelasId ? ` dan dinaikkan ke kelas ${kelasTarget[0].name}` : ` (kelas ${targetLevel} rumpun ini belum dibuat)`}`
        : `${kelasId ? ` di kelas ${kelasTarget[0].name}` : ` (kelas ${targetLevel} rumpun ini belum dibuat)`}`;
      addNotif({
        type: 'success', kind: 'akademik',
        title: 'Penjurusan Disetujui',
        body: `${student.name} ditetapkan ke Rumpun ${kode}${notifAksi}.`,
      });
    } catch (e: any) {
      alert('Gagal ACC penjurusan: ' + (e.message || 'Error'));
    } finally {
      setAccId(null);
    }
  };

  const handleSave = async () => {
    if (changedCount === 0) return;
    setSaving(true);
    try {
      let successCount = 0;
      const errors: string[] = [];
      for (const student of students) {
        if (student.assigned !== student.peminatanId) {
          try {
            await savePeminatan(student.siswaId, student.assigned || null);
            successCount++;
          } catch (e: any) {
            errors.push(`${student.name}: ${e.message}`);
          }
        }
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      await new Promise(r => setTimeout(r, 400));
      await loadData();
      addNotif({
        type: errors.length > 0 ? 'warning' : 'success',
        kind: 'akademik',
        title: 'Penjurusan Diperbarui',
        body: `${successCount} siswa berhasil ditetapkan peminatannya${errors.length > 0 ? `, ${errors.length} gagal` : ''}.`,
      });
      if (errors.length > 0) {
        alert(`${successCount} berhasil, ${errors.length} gagal:\n${errors.join('\n')}`);
      }
    } catch (e: any) {
      alert('Gagal menyimpan penjurusan: ' + (e.message || 'Error'));
    } finally {
      setSaving(false);
    }
  };

  /** Usulkan penjurusan otomatis berdasarkan rata-rata kelas 10 dan kuota. */
  const handleAutoAssign = () => {
    const k10 = students.filter(s => s.gradeLevel === 10);
    if (k10.length === 0) {
      alert('Tidak ada siswa kelas 10.');
      return;
    }

    const jurusanA = jurusans.find(j => j.kode === 'A');
    const jurusanB = jurusans.find(j => j.kode === 'B');
    const jurusanC = jurusans.find(j => j.kode === 'C');

    if (!jurusanA || !jurusanB || !jurusanC) {
      alert('Data jurusan A, B, C belum lengkap. Tambahkan jurusan terlebih dahulu di menu Jurusan.');
      setShowAutoModal(false);
      return;
    }

    // Urutkan nilai tertinggi ke terendah
    const sorted = [...k10].sort((a, b) => (b.rataRata ?? 0) - (a.rataRata ?? 0));

    let countA = 0;
    let countB = 0;
    let countC = 0;

    const newAssigned = new Map<string, string>();

    // Fase 1: assign berdasarkan kriteria & pilihan
    for (const s of sorted) {
      const nilai = s.rataRata ?? 0;
      const pilihan = s.peminatanId;
      const pilihanKode = jurusans.find(j => j.id === pilihan)?.kode;

      if (nilai >= 87 && pilihanKode === 'A' && countA < KUOTA.A) {
        newAssigned.set(s.siswaId, jurusanA?.id || '');
        countA++;
      } else if (nilai >= 87 && pilihanKode !== 'A' && countA < KUOTA.A) {
        // Jika nilai memenuhi syarat A tapi pilih B/C, hormati pilihan
        if (pilihanKode === 'B' && countB < KUOTA.B) {
          newAssigned.set(s.siswaId, jurusanB?.id || '');
          countB++;
        } else if (pilihanKode === 'C' && countC < KUOTA.C) {
          newAssigned.set(s.siswaId, jurusanC?.id || '');
          countC++;
        } else {
          // Pilihan penuh, fallback ke A (karena nilai cukup)
          newAssigned.set(s.siswaId, jurusanA?.id || '');
          countA++;
        }
      } else {
        // Nilai < 87 atau kuota A penuh → B / C
        if (pilihanKode === 'B' && countB < KUOTA.B) {
          newAssigned.set(s.siswaId, jurusanB?.id || '');
          countB++;
        } else if (pilihanKode === 'C' && countC < KUOTA.C) {
          newAssigned.set(s.siswaId, jurusanC?.id || '');
          countC++;
        } else if (countB < KUOTA.B) {
          newAssigned.set(s.siswaId, jurusanB?.id || '');
          countB++;
        } else if (countC < KUOTA.C) {
          newAssigned.set(s.siswaId, jurusanC?.id || '');
          countC++;
        } else {
          // Semua penuh, masukkan ke yang tersisa (tidak mungkin karena total kuota > siswa)
          newAssigned.set(s.siswaId, jurusanC?.id || '');
          countC++;
        }
      }
    }

    // Fase 2: rebalance B & C — jika melebihi kuota, pindahkan yang nilai terendah
    const rebalance = (fromKode: 'B' | 'C', toKode: 'B' | 'C', quota: number) => {
      const fromId = fromKode === 'B' ? jurusanB?.id : jurusanC?.id;
      const toId = toKode === 'B' ? jurusanB?.id : jurusanC?.id;
      let inFrom = sorted.filter(s => newAssigned.get(s.siswaId) === fromId);
      while (inFrom.length > quota) {
        // Ambil yang nilai terendah
        inFrom = inFrom.sort((a, b) => (a.rataRata ?? 0) - (b.rataRata ?? 0));
        const lowest = inFrom[0];
        newAssigned.set(lowest.siswaId, toId || '');
        inFrom = sorted.filter(s => newAssigned.get(s.siswaId) === fromId);
      }
    };

    rebalance('B', 'C', KUOTA.B);
    rebalance('C', 'B', KUOTA.C);

    setStudents(prev =>
      prev.map(s => {
        const assigned = newAssigned.get(s.siswaId);
        return assigned !== undefined ? { ...s, assigned } : s;
      })
    );
    setIsSaved(false);
    setShowAutoModal(false);
    addNotif({
      type: 'info',
      kind: 'akademik',
      title: 'Usulan Penjurusan Dibuat',
      body: 'Sistem telah mengusulkan penjurusan otomatis. Klik Simpan untuk menerapkan.',
    });
  };

  const jurusanItems = jurusans.map(j => ({
    value: j.id,
    label: `${j.kode} — ${j.nama}`,
    hint: j.nama,
  }));

  const getJurusanDisplay = (id: string) => {
    if (!id) return null;
    const j = jurusans.find(x => x.id === id);
    return j ? j.kode : null;
  };

  const getJurusanName = (id: string) => {
    if (!id) return null;
    const j = jurusans.find(x => x.id === id);
    return j ? j.nama : null;
  };

  const stats = {
    total: students.length,
    sudahPilih: students.filter(s => s.peminatanId).length,
    belumPilih: students.filter(s => !s.peminatanId).length,
    perubahan: changedCount,
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Penjurusan Siswa</h2>
          <p className="text-slate-300 mt-1">
            Tetapkan rumpun peminatan (A/B/C) berdasarkan rata-rata nilai kelas 10 dan kuota kelas.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {isSaved && (
            <Badge variant="outline" className="h-11 px-4 bg-emerald-600/20 text-emerald-300 border-emerald-500/30 rounded-xl">
              <CheckCircle2 className="mr-2 h-4 w-4" /> Tersimpan
            </Badge>
          )}
          <Button variant="outline" onClick={refresh} disabled={refreshing}
            className="h-11 w-11 rounded-xl border-white/10 bg-white/5 p-0"
            title="Segarkan data">
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline" onClick={() => setShowAutoModal(true)}
            className="h-11 px-4 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Calculator className="mr-2 h-4 w-4" /> Usulkan Otomatis
          </Button>
          <Button onClick={handleSave} disabled={saving || changedCount === 0}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-6 rounded-xl font-semibold text-white disabled:opacity-50">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan {changedCount > 0 && `(${changedCount})`}
          </Button>
        </div>
      </div>

      {/* Info banner */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-sm flex items-start gap-3">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-100">Kriteria Penjurusan SMAIT Nur Hidayah</p>
          <ul className="mt-1 space-y-1 text-blue-200/90 list-disc list-inside">
            <li>
              Kriteria diambil dari <strong>rata-rata nilai kelas 10</strong> (semester Ganjil & Genap).
            </li>
            <li>
              <strong>Rumpun A (Kesehatan)</strong>: hanya siswa dengan rata-rata minimal <strong>87</strong>.
            </li>
            <li>
              <strong>Rumpun B (Teknik)</strong> & <strong>Rumpun C (Sosial)</strong>: siswa bebas memilih.
            </li>
            <li>
              Kuota: <strong>A = 60 siswa</strong>, <strong>B = 30 siswa</strong>,{' '}
              <strong>C = 60 siswa</strong>. Jika kuota penuh, siswa dengan nilai terendah di rumpun
              tersebut dipindahkan ke rumpun alternatif yang masih tersedia.
            </li>
            <li>
              Selama <strong>kelas 10</strong> siswa hanya <em>memilih</em> rumpun (kelas tetap umum, tanpa jurusan).
              Saat admin menekan <strong>ACC</strong>, jurusan resmi ditetapkan dan siswa otomatis
              <strong> dinaikkan ke kelas 11</strong> sesuai rumpun — perubahan langsung tampil di dashboard siswa.
            </li>
          </ul>
        </div>
      </div>

      {/* Okupansi Kuota Rumpun (berdasarkan jurusan resmi kelas 11) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['A', 'B', 'C'] as const).map(kode => {
          const used = officialCounts[kode] || 0;
          const quota = KUOTA[kode];
          const pct = Math.min(100, Math.round((used / quota) * 100));
          const full = used >= quota;
          const label = kode === 'A' ? 'Kesehatan' : kode === 'B' ? 'Teknik' : 'Sosial';
          return (
            <Card key={kode} className="bg-slate-900/60 border-white/10 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white">Rumpun {kode} <span className="text-slate-400 font-normal">· {label}</span></p>
                  <span className={`text-xs font-semibold ${full ? 'text-red-400' : 'text-emerald-400'}`}>
                    {used} / {quota}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${full ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${pct}%` }} />
                </div>
                {full && (
                  <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Kuota penuh
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Siswa', val: stats.total, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Sudah Ditetapkan', val: stats.sudahPilih, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Belum Ditetapkan', val: stats.belumPilih, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Perubahan Tertunda', val: stats.perubahan, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((s, i) => (
          <Card key={i} className="bg-slate-900/60 border-white/10 rounded-xl">
            <CardContent className="p-4">
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${s.color}`}>{s.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{s.val}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main table */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" /> Daftar Siswa
            </CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-white/10">
                {[
                  { v: 'semua', label: 'Semua' },
                  { v: '10', label: 'Kls 10' },
                  { v: '11', label: 'Kls 11' },
                  { v: '12', label: 'Kls 12' },
                ].map(opt => (
                  <button key={opt.v} onClick={() => setTingkatFilter(opt.v)}
                    className={`px-3 h-9 rounded-md text-xs font-semibold transition-colors ${
                      tingkatFilter === opt.v
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Cari nama atau NIS..."
                  className="pl-10 h-11 bg-slate-950 border-white/10 text-white placeholder:text-slate-400 rounded-xl"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4 pl-6">Nama & NIS</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Kelas</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Rata-rata Kls 10</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Peminatan Saat Ini</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Tetapkan Peminatan</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4 text-center">ACC / Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const hasChanged = student.assigned !== student.peminatanId;
                  const currentKode = getJurusanDisplay(student.peminatanId);
                  const nilai = student.rataRata;
                  const layakA = nilai !== null && nilai >= 87;
                  return (
                    <TableRow key={student.siswaId} className="border-white/10 hover:bg-white/5">
                      <TableCell className="py-4 pl-6">
                        <div className="font-semibold text-white">{student.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 font-mono">NIS {student.nis}</div>
                      </TableCell>
                      <TableCell className="text-slate-200 text-sm font-medium">
                        {student.className}
                        {student.gradeLevel && <span className="text-slate-400 text-xs ml-1">(Kls {student.gradeLevel})</span>}
                      </TableCell>
                      <TableCell>
                        {calculating && student.gradeLevel === 10 && nilai === null ? (
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" /> Menghitung...
                          </span>
                        ) : nilai !== null ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{nilai.toFixed(1)}</span>
                            {layakA ? (
                              <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                                Layak A
                              </Badge>
                            ) : student.gradeLevel === 10 ? (
                              <Badge className="bg-amber-600/20 text-amber-300 border-amber-500/30 text-[10px]">
                                B / C
                              </Badge>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {student.peminatanId ? (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-600/20 text-blue-200 border-blue-500/30 font-mono text-xs">
                              {currentKode}
                            </Badge>
                            <span className="text-slate-300 text-xs">{student.peminatanName}</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-white/10">
                            Belum dipilih
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <LookupSelect
                            value={student.assigned}
                            onChange={(v) => handleAssignmentChange(student.siswaId, v)}
                            items={jurusanItems}
                            placeholder="Pilih rumpun A/B/C..."
                            allowEmpty
                            emptyLabel="— Tanpa Peminatan —"
                            className={`w-60 h-11 bg-slate-950 border-white/10 text-white rounded-lg ${
                              hasChanged ? 'border-amber-500/60 ring-1 ring-amber-500/20' : ''
                            }`}
                          />
                          {hasChanged && (
                            <span className="text-[10px] font-semibold text-amber-400 uppercase">
                              <MoveRight className="h-3 w-3 inline" /> Berubah
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {(() => {
                          const targetId = student.assigned || student.peminatanId;
                          const targetKode = getJurusanDisplay(targetId);
                          const sudahResmi = !!student.jurusanId && student.jurusanId === targetId;
                          const accendingThis = accId === student.siswaId;
                          if (sudahResmi) {
                            return (
                              <div className="inline-flex items-center gap-1.5">
                                <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30 text-[11px]">
                                  <CheckCircle2 className="mr-1 h-3 w-3" /> {targetKode} · {student.className}
                                </Badge>
                                {(student.gradeLevel === 11 || student.gradeLevel === 12) && (
                                  <button
                                    onClick={() => alert(`${student.name} (${student.nis})\nRumpun: ${targetKode} — ${student.jurusanName}\nKelas: ${student.className}\nStatus: Sudah ditetapkan`)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                                    title="Lihat detail penjurusan"
                                  >
                                    <Info className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </div>
                            );
                          }
                          const isNaikKelas = student.gradeLevel === 10;
                          const accTitle = !targetId
                            ? 'Tetapkan rumpun dulu'
                            : isNaikKelas
                            ? `Setujui & naikkan ke kelas 11 (Rumpun ${targetKode})`
                            : student.jurusanId
                            ? `Pindah ke Rumpun ${targetKode}`
                            : `Tetapkan jurusan (Rumpun ${targetKode})`;
                          return (
                            <Button
                              size="sm"
                              disabled={!targetId || accendingThis || !!accId}
                              onClick={() => handleAcc(student)}
                              className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40"
                              title={accTitle}
                            >
                              {accendingThis
                                ? <Loader2 className="h-4 w-4 animate-spin" />
                                : <><ArrowUpCircle className="mr-1.5 h-4 w-4" /> ACC</>}
                            </Button>
                          );
                        })()}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Users className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-300 font-semibold">Tidak ada siswa ditemukan</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal konfirmasi auto assign */}
      {showAutoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Usulkan Penjurusan Otomatis</h3>
              <button onClick={() => setShowAutoModal(false)}
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sistem akan mengusulkan penjurusan untuk siswa <strong>kelas 10</strong> berdasarkan kriteria berikut:
            </p>
            <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
              <li>Rata-rata nilai kelas 10 &ge; 87 → bisa masuk <strong>Rumpun A (Kesehatan)</strong>.</li>
              <li>Rata-rata nilai kelas 10 &lt; 87 → hanya <strong>Rumpun B (Teknik)</strong> atau <strong>C (Sosial)</strong>.</li>
              <li>Kuota: A = {KUOTA.A} siswa, B = {KUOTA.B} siswa, C = {KUOTA.C} siswa.</li>
              <li>Jika kuota penuh, siswa nilai terendah dipindah ke rumpun alternatif.</li>
            </ul>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowAutoModal(false)}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl">
                Batal
              </Button>
              <Button onClick={handleAutoAssign}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                <Calculator className="mr-2 h-4 w-4" /> Buat Usulan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
