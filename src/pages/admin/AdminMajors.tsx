import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit2, Trash2, Award, Loader2, RefreshCw, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  fetchJurusan,
  addJurusan,
  editJurusan,
  removeJurusan,
} from '@/lib/schoolService';

// Preset berdasarkan Kurikulum Merdeka — SMA & SMK umum
const JURUSAN_PRESET = {
  SMA: [
    { kode: 'MIPA', nama: 'Matematika dan Ilmu Pengetahuan Alam' },
    { kode: 'IPS', nama: 'Ilmu Pengetahuan Sosial' },
    { kode: 'BHS', nama: 'Bahasa dan Budaya' },
  ],
  SMK: [
    { kode: 'RPL', nama: 'Rekayasa Perangkat Lunak' },
    { kode: 'TKJ', nama: 'Teknik Komputer dan Jaringan' },
    { kode: 'MM', nama: 'Multimedia' },
    { kode: 'AKL', nama: 'Akuntansi dan Keuangan Lembaga' },
    { kode: 'OTKP', nama: 'Otomatisasi Tata Kelola Perkantoran' },
    { kode: 'BDP', nama: 'Bisnis Daring dan Pemasaran' },
    { kode: 'TKR', nama: 'Teknik Kendaraan Ringan' },
    { kode: 'TPM', nama: 'Teknik Pemesinan' },
    { kode: 'FAR', nama: 'Farmasi Klinis dan Komunitas' },
    { kode: 'KUL', nama: 'Kuliner' },
  ],
};

export default function AdminMajors() {
  const [majors, setMajors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [editingMajor, setEditingMajor] = useState<any>(null);
  const [formData, setFormData] = useState({ kode: '', nama: '' });
  const [saving, setSaving] = useState(false);
  const [seedingPreset, setSeedingPreset] = useState<'SMA' | 'SMK' | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchJurusan();
      setMajors(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleOpenAdd = () => {
    setEditingMajor(null);
    setFormData({ kode: '', nama: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (major: any) => {
    setEditingMajor(major);
    setFormData({ kode: major.kode, nama: major.nama });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.kode.trim() || !formData.nama.trim()) {
      alert('Kode dan nama jurusan wajib diisi.');
      return;
    }
    setSaving(true);
    try {
      if (editingMajor) {
        await editJurusan(editingMajor.id, formData);
      } else {
        await addJurusan(formData);
      }
      setIsDialogOpen(false);
      await loadData();
    } catch (e: any) {
      alert('Gagal menyimpan: ' + (e.message || 'Mungkin kode jurusan sudah dipakai.'));
    } finally {
      setSaving(false);
    }
  };

  const handleSeedPreset = async (type: 'SMA' | 'SMK') => {
    setSeedingPreset(type);
    const preset = JURUSAN_PRESET[type];
    const existingKodes = new Set(majors.map(m => m.kode));
    let added = 0;
    let skipped = 0;
    for (const p of preset) {
      if (existingKodes.has(p.kode)) { skipped++; continue; }
      try {
        await addJurusan(p);
        added++;
      } catch { skipped++; }
    }
    setSeedingPreset(null);
    setIsPresetOpen(false);
    await loadData();
    alert(`Preset ${type} diterapkan.\n${added} jurusan ditambahkan, ${skipped} dilewati (sudah ada).`);
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Hapus jurusan "${nama}"? Siswa/kelas yang menggunakan jurusan ini perlu di-update.`)) return;
    try {
      await removeJurusan(id);
      await loadData();
    } catch (e: any) {
      alert('Gagal menghapus: ' + (e.message || 'Masih dipakai oleh siswa/kelas.'));
    }
  };

  const filteredMajors = majors.filter(m =>
    m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Manajemen Jurusan</h2>
          <p className="text-slate-300 mt-1">Kelola daftar jurusan dan program keahlian sesuai Kurikulum Merdeka.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData}
            className="h-11 w-11 rounded-xl border-white/10 bg-white/5 p-0">
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setIsPresetOpen(true)}
            className="bg-amber-600 hover:bg-amber-500 h-11 px-5 rounded-xl font-semibold text-white">
            <Zap className="mr-2 h-4 w-4" /> Preset Kurikulum Merdeka
          </Button>
          <Button onClick={handleOpenAdd}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-5 rounded-xl font-semibold text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Jurusan
          </Button>
        </div>
      </div>

      {/* Main card */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="flex items-center gap-2 text-white text-lg font-bold">
              <Award className="h-5 w-5 text-amber-400" /> Daftar Jurusan ({majors.length})
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Cari kode atau nama jurusan..."
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
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4">Nama Jurusan</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider py-4 text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={3} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : filteredMajors.length > 0 ? (
                filteredMajors.map((major) => (
                  <TableRow key={major.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="py-4 pl-6">
                      <Badge variant="outline" className="bg-slate-800 text-white border-white/20 font-mono text-sm px-3 py-1">
                        {major.kode}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-white text-base">{major.nama}</TableCell>
                    <TableCell className="text-right py-4 pr-6">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(major)}
                          className="h-9 w-9 text-blue-400 hover:text-white hover:bg-blue-600 rounded-lg">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(major.id, major.nama)}
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
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                      <Award className="h-10 w-10 opacity-40" />
                      <p className="font-semibold text-slate-200">Belum ada jurusan</p>
                      <p className="text-sm">Gunakan preset atau tambah manual.</p>
                    </div>
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
              {editingMajor ? 'Ubah Jurusan' : 'Tambah Jurusan'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="kode" className="text-slate-200 text-xs font-semibold">Kode Jurusan</Label>
              <Input
                id="kode"
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
                placeholder="Contoh: MIPA, RPL, TKJ"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white placeholder:text-slate-500 font-mono uppercase"
              />
              <p className="text-[10px] text-slate-400">Kode singkat berupa huruf besar (3-6 karakter).</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nama" className="text-slate-200 text-xs font-semibold">Nama Lengkap</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Rekayasa Perangkat Lunak"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white placeholder:text-slate-500"
              />
            </div>
          </div>
          <DialogFooter className="p-6 bg-slate-900/50 flex flex-row gap-3 border-t border-white/10">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}
              className="flex-1 h-11 rounded-lg text-slate-200 hover:bg-white/5">Batal</Button>
            <Button onClick={handleSave} disabled={saving}
              className="flex-1 h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingMajor ? 'Perbarui' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preset Dialog */}
      <Dialog open={isPresetOpen} onOpenChange={setIsPresetOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 text-white rounded-2xl p-0 overflow-hidden max-w-2xl">
          <DialogHeader className="p-6 border-b border-white/10 bg-gradient-to-br from-amber-600/10 to-transparent">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" /> Preset Jurusan Kurikulum Merdeka
            </DialogTitle>
            <p className="text-sm text-slate-300 mt-1">Tambahkan jurusan standar sesuai Kurikulum Merdeka. Jurusan yang sudah ada akan dilewati.</p>
          </DialogHeader>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SMA Preset */}
            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-3">
              <div>
                <h3 className="text-white font-bold text-lg">SMA</h3>
                <p className="text-xs text-slate-300">Sekolah Menengah Atas — 3 peminatan</p>
              </div>
              <div className="space-y-1.5 text-sm">
                {JURUSAN_PRESET.SMA.map(j => (
                  <div key={j.kode} className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-lg">
                    <Badge className="bg-blue-600 text-white text-xs font-mono">{j.kode}</Badge>
                    <span className="text-slate-200">{j.nama}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => handleSeedPreset('SMA')} disabled={seedingPreset !== null}
                className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                {seedingPreset === 'SMA' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Terapkan Preset SMA'}
              </Button>
            </div>

            {/* SMK Preset */}
            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
              <div>
                <h3 className="text-white font-bold text-lg">SMK</h3>
                <p className="text-xs text-slate-300">Sekolah Menengah Kejuruan — 10 kompetensi keahlian</p>
              </div>
              <div className="space-y-1.5 text-sm max-h-60 overflow-y-auto">
                {JURUSAN_PRESET.SMK.map(j => (
                  <div key={j.kode} className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-lg">
                    <Badge className="bg-emerald-600 text-white text-xs font-mono">{j.kode}</Badge>
                    <span className="text-slate-200 text-xs">{j.nama}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => handleSeedPreset('SMK')} disabled={seedingPreset !== null}
                className="w-full h-11 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                {seedingPreset === 'SMK' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Terapkan Preset SMK'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
