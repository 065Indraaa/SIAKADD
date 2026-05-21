import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LookupSelect } from '@/components/ui/lookup-select';
import { Search, Save, CheckCircle2, Loader2, RefreshCw, MoveRight, Info, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { fetchSiswa } from '@/lib/userService';
import { fetchJurusan, savePeminatan } from '@/lib/schoolService';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';

interface StudentRow {
  siswaId: string;
  penggunaId: string;
  name: string;
  nis: string;
  className: string;
  gradeLevel: number | null;
  peminatanId: string; // current peminatan from DB
  peminatanName: string; // display name
  assigned: string; // pending assignment (what admin picked)
}

export default function AdminPenjuruan() {
  const { add: addNotif } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [students, setStudents] = useState<StudentRow[]>([]);
  const [jurusans, setJurusans] = useState<any[]>([]);
  const [tingkatFilter, setTingkatFilter] = useState<string>('semua');

  const loadData = async () => {
    setLoading(true);
    try {
      const [siswaData, jurusanData] = await Promise.all([fetchSiswa(), fetchJurusan()]);
      const mapped: StudentRow[] = siswaData.map(s => ({
        siswaId: s.siswaId!,
        penggunaId: s.id,
        name: s.name,
        nis: s.nis || '-',
        className: s.className || 'Belum ada kelas',
        gradeLevel: s.gradeLevel ?? null,
        peminatanId: s.peminatanId || '',
        peminatanName: s.peminatanName || '',
        assigned: s.peminatanId || '',
      }));
      setStudents(mapped);
      setJurusans(jurusanData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

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
          <p className="text-slate-300 mt-1">Tetapkan rumpun peminatan (A/B/C) untuk setiap siswa SMAIT Nur Hidayah.</p>
        </div>
        <div className="flex items-center gap-3">
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
          <p className="font-semibold text-blue-100">Panduan Penjurusan SMAIT Nur Hidayah</p>
          <p className="mt-1 text-blue-200/90">
            Siswa memilih rumpun peminatan mulai <strong>kelas 10 semester 2</strong>. Penempatan mengacu pada
            pilihan siswa, nilai tes dan rapor, serta kuota kelas: <strong>Rumpun A (Kesehatan) 2 kelas</strong>,
            <strong> Rumpun B (Teknik) 1 kelas</strong>, <strong>Rumpun C (Sosial) 2 kelas</strong>. Jika pilihan
            utama tidak tersedia, siswa dapat dialihkan ke rumpun alternatif.
          </p>
        </div>
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
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Peminatan Saat Ini</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Tetapkan Peminatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const hasChanged = student.assigned !== student.peminatanId;
                  const currentKode = getJurusanDisplay(student.peminatanId);
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
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center">
                    <Users className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-300 font-semibold">Tidak ada siswa ditemukan</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
