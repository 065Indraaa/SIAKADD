import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit2, Trash2, BookOpen, Loader2, RefreshCw, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  fetchMataPelajaran,
  addMataPelajaran,
  editMataPelajaran,
  removeMataPelajaran,
} from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';

// Daftar bawaan mata pelajaran Kurikulum Merdeka (disesuaikan dengan Rumpun A/B/C SMAIT Nur Hidayah)
const MAPEL_PRESET = {
  Umum: [
    { kode: 'PAI', nama: 'Pendidikan Agama dan Budi Pekerti' },
    { kode: 'PKN', nama: 'Pendidikan Pancasila' },
    { kode: 'BIN', nama: 'Bahasa Indonesia' },
    { kode: 'MTK', nama: 'Matematika' },
    { kode: 'BIG', nama: 'Bahasa Inggris' },
    { kode: 'PJOK', nama: 'Pendidikan Jasmani, Olahraga, dan Kesehatan' },
    { kode: 'SNB', nama: 'Seni Budaya' },
    { kode: 'INF', nama: 'Informatika' },
    { kode: 'SEJ', nama: 'Sejarah' },
  ],
  RumpunA: [
    { kode: 'MTK-L', nama: 'Matematika Tingkat Lanjut' },
    { kode: 'FIS', nama: 'Fisika' },
    { kode: 'KIM', nama: 'Kimia' },
    { kode: 'BIO', nama: 'Biologi' },
  ],
  RumpunB: [
    { kode: 'MTK-L', nama: 'Matematika Tingkat Lanjut' },
    { kode: 'FIS', nama: 'Fisika' },
    { kode: 'KIM', nama: 'Kimia' },
    { kode: 'BIO', nama: 'Biologi' },
  ],
  RumpunC: [
    { kode: 'EKO', nama: 'Ekonomi' },
    { kode: 'SOS', nama: 'Sosiologi' },
    { kode: 'GEO', nama: 'Geografi' },
    { kode: 'SEJ-L', nama: 'Sejarah Tingkat Lanjut' },
  ],
};

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [formData, setFormData] = useState({ kode: '', nama: '' });
  const [saving, setSaving] = useState(false);
  const [seedingCategory, setSeedingCategory] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMataPelajaran();
      setSubjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useAutoRefresh(loadData, 20_000);

  const [refreshing, refresh] = useManualRefresh(loadData);

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setFormData({ kode: '', nama: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (subject: any) => {
    setEditingSubject(subject);
    setFormData({ kode: subject.kode, nama: subject.nama });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.kode.trim() || !formData.nama.trim()) {
      alert('Kode dan nama mata pelajaran wajib diisi.');
      return;
    }
    setSaving(true);
    try {
      if (editingSubject) {
        await editMataPelajaran(editingSubject.id, formData);
      } else {
        await addMataPelajaran(formData);
      }
      setIsDialogOpen(false);
      await loadData();
    } catch (e: any) {
      alert('Gagal menyimpan: ' + (e.message || 'Kode mungkin sudah dipakai.'));
    } finally {
      setSaving(false);
    }
  };

  const handleSeedCategory = async (category: keyof typeof MAPEL_PRESET) => {
    setSeedingCategory(category);
    const preset = MAPEL_PRESET[category];
    const existing = new Set(subjects.map(s => s.kode));
    let added = 0, skipped = 0;
    for (const m of preset) {
      if (existing.has(m.kode)) { skipped++; continue; }
      try { await addMataPelajaran(m); added++; } catch { skipped++; }
    }
    setSeedingCategory(null);
    await loadData();
      alert(`Daftar bawaan ${category}: ${added} ditambahkan, ${skipped} dilewati.`);
  };

  const handleSeedAll = async () => {
    if (!confirm('Tambahkan semua mata pelajaran Kurikulum Merdeka (Umum + Rumpun A + Rumpun B + Rumpun C)?')) return;
    setSeedingCategory('ALL');
    // Gabung dan hilangkan duplikasi berdasarkan kode karena beberapa mata pelajaran dipakai lebih dari satu rumpun.
    const combined = [
      ...MAPEL_PRESET.Umum,
      ...MAPEL_PRESET.RumpunA,
      ...MAPEL_PRESET.RumpunB,
      ...MAPEL_PRESET.RumpunC,
    ];
    const uniqMap = new Map<string, { kode: string; nama: string }>();
    for (const m of combined) if (!uniqMap.has(m.kode)) uniqMap.set(m.kode, m);
    const all = Array.from(uniqMap.values());
    const existing = new Set(subjects.map(s => s.kode));
    let added = 0, skipped = 0;
    for (const m of all) {
      if (existing.has(m.kode)) { skipped++; continue; }
      try { await addMataPelajaran(m); added++; } catch { skipped++; }
    }
    setSeedingCategory(null);
    setIsPresetOpen(false);
    await loadData();
    alert(`Daftar bawaan lengkap: ${added} ditambahkan, ${skipped} dilewati.`);
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Hapus mata pelajaran "${nama}"? Jadwal yang menggunakan mata pelajaran ini akan bermasalah.`)) return;
    try {
      await removeMataPelajaran(id);
      await loadData();
    } catch (e: any) {
      alert('Gagal menghapus: ' + (e.message || 'Masih dipakai di jadwal/nilai.'));
    }
  };

  const filteredSubjects = subjects.filter(s =>
    s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Mata Pelajaran</h2>
          <p className="text-slate-300 mt-1">Kelola daftar mata pelajaran sesuai Kurikulum Merdeka.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh} disabled={refreshing}
            className="h-11 w-11 rounded-xl border-white/10 bg-white/5 p-0"
            title="Segarkan data">
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setIsPresetOpen(true)}
            className="bg-amber-600 hover:bg-amber-500 h-11 px-5 rounded-xl font-semibold text-white">
            <Zap className="mr-2 h-4 w-4" /> Daftar Bawaan
          </Button>
          <Button onClick={handleOpenAdd}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-5 rounded-xl font-semibold text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Mata Pelajaran
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/60 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="flex items-center gap-2 text-white text-lg font-bold">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Daftar Mata Pelajaran ({subjects.length})
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Cari kode atau nama mata pelajaran..."
                className="pl-10 h-11 bg-slate-950 border-white/10 text-white placeholder:text-slate-400 rounded-xl"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4 pl-6">Kode</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Nama Mata Pelajaran</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4 text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={3} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <TableRow key={subject.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="py-4 pl-6">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30 font-mono text-sm px-3 py-1">
                        {subject.kode}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-white text-base">{subject.nama}</TableCell>
                    <TableCell className="text-right py-4 pr-6">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(subject)}
                          className="h-9 w-9 text-blue-400 hover:text-white hover:bg-blue-600 rounded-lg">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(subject.id, subject.nama)}
                          className="h-9 w-9 text-red-400 hover:text-white hover:bg-red-600 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-32 text-center">
                    <BookOpen className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-300 font-semibold">Belum ada mata pelajaran</p>
                    <p className="text-sm text-slate-400">Gunakan preset atau tambah manual.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 text-white rounded-2xl p-0 overflow-hidden max-w-md">
          <DialogHeader className="p-6 bg-white/5 border-b border-white/10">
            <DialogTitle className="text-xl font-bold">
              {editingSubject ? 'Ubah Mata Pelajaran' : 'Tambah Mata Pelajaran'}
            </DialogTitle>
            <DialogDescription className="text-slate-300">Kode harus unik antar mata pelajaran.</DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-slate-200 text-xs font-semibold">Kode Mapel</Label>
              <Input
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
                placeholder="Contoh: MTK, FIS, BIN"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white placeholder:text-slate-500 font-mono uppercase"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-200 text-xs font-semibold">Nama Mata Pelajaran</Label>
              <Input
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Matematika"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white placeholder:text-slate-500"
              />
            </div>
          </div>
          <DialogFooter className="p-6 bg-slate-900/50 flex flex-row gap-3 border-t border-white/10">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}
              className="flex-1 h-11 rounded-lg text-slate-200 hover:bg-white/5">Batal</Button>
            <Button onClick={handleSave} disabled={saving}
              className="flex-1 h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingSubject ? 'Perbarui' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog daftar bawaan */}
      <Dialog open={isPresetOpen} onOpenChange={setIsPresetOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 text-white rounded-2xl p-0 overflow-hidden max-w-3xl">
          <DialogHeader className="p-6 border-b border-white/10 bg-gradient-to-br from-amber-600/10 to-transparent">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
               <Zap className="h-5 w-5 text-amber-400" /> Daftar Bawaan Mata Pelajaran Kurikulum Merdeka
            </DialogTitle>
             <DialogDescription className="text-slate-300 mt-1">Pilih kategori yang ingin ditambahkan. Mata pelajaran yang sudah ada akan dilewati.</DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <Button onClick={handleSeedAll} disabled={seedingCategory !== null}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold">
              {seedingCategory === 'ALL' ? <Loader2 className="h-5 w-5 animate-spin" /> : <>
                <Zap className="mr-2 h-5 w-5" /> Tambah Semua Mata Pelajaran Sekaligus
              </>}
            </Button>

            <div className="text-center text-xs text-slate-400 py-1">atau per kategori:</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(Object.keys(MAPEL_PRESET) as Array<keyof typeof MAPEL_PRESET>).map(cat => {
                const labelMap: Record<string, string> = {
                  Umum: 'Mata Pelajaran Umum',
                  RumpunA: 'Rumpun A — Kesehatan',
                  RumpunB: 'Rumpun B — Teknik',
                  RumpunC: 'Rumpun C — Sosial',
                };
                const label = labelMap[cat] || cat;
                return (
                  <div key={cat} className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-bold">{label}</h3>
                      <Badge variant="outline" className="text-xs text-slate-300 border-white/20">
                        {MAPEL_PRESET[cat].length} mata pelajaran
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs mb-3 max-h-32 overflow-y-auto">
                      {MAPEL_PRESET[cat].map(m => (
                        <div key={m.kode} className="flex items-center gap-2">
                          <span className="font-mono text-blue-300">{m.kode}</span>
                          <span className="text-slate-300">{m.nama}</span>
                        </div>
                      ))}
                    </div>
                    <Button onClick={() => handleSeedCategory(cat)} disabled={seedingCategory !== null}
                      className="w-full h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold">
                      {seedingCategory === cat ? <Loader2 className="h-4 w-4 animate-spin" /> : `Tambah ${label}`}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
