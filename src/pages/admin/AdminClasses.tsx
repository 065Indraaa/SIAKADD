import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit2, Trash2, Info, RefreshCw, Loader2, Users, School, Layers } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LookupSelect } from '@/components/ui/lookup-select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { fetchKelas, addKelas, editKelas, fetchJurusan } from '@/lib/schoolService';
import { fetchGuru, UserListItem } from '@/lib/userService';
import { deleteKelas } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';

// Kurikulum Merdeka — Fase E (Kelas 10), Fase F (Kelas 11-12)
const TINGKAT_OPTIONS = [
  { value: '10', label: 'Kelas 10 — Fase E', hint: 'Kurikulum Merdeka' },
  { value: '11', label: 'Kelas 11 — Fase F', hint: 'Kurikulum Merdeka' },
  { value: '12', label: 'Kelas 12 — Fase F', hint: 'Kurikulum Merdeka' },
];

function generateTahunAjaran(): string[] {
  const now = new Date();
  const y = now.getFullYear();
  return [`${y - 1}/${y}`, `${y}/${y + 1}`, `${y + 1}/${y + 2}`];
}

// Generate class name suggestions based on level + jurusan code
function suggestKelasName(level: string, jurusanKode: string, roman: boolean = true) {
  const romanMap: Record<string, string> = { '10': 'X', '11': 'XI', '12': 'XII' };
  const prefix = roman ? romanMap[level] : level;
  if (!jurusanKode) return `${prefix}-`;
  return `${prefix}-${jurusanKode}-`;
}

export default function AdminClasses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState<any[]>([]);
  const [guruList, setGuruList] = useState<UserListItem[]>([]);
  const [jurusanList, setJurusanList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [kelasData, guruData, jurusanData] = await Promise.all([
        fetchKelas(),
        fetchGuru(),
        fetchJurusan(),
      ]);
      setClasses(kelasData);
      setGuruList(guruData);
      setJurusanList(jurusanData);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat data kelas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.homeroom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cls.jurusan || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (cls: any = null) => {
    setError(null);
    if (cls) {
      setFormData({
        id: cls.id,
        name: cls.name,
        level: String(cls.level),
        waliKelasId: cls.homeroomId || '',
        jurusanId: cls.jurusanId || '',
        tahunAjaran: cls.tahunAjaran || generateTahunAjaran()[1],
      });
    } else {
      setFormData({
        name: '',
        level: '10',
        waliKelasId: '',
        jurusanId: '',
        tahunAjaran: generateTahunAjaran()[1],
      });
    }
    setIsDialogOpen(true);
  };

  // Auto-suggest name when level/jurusan changes
  const updateName = (level: string, jurusanId: string) => {
    const jurusan = jurusanList.find(j => j.id === jurusanId);
    const suggestion = suggestKelasName(level, jurusan?.kode || '');
    setFormData((prev: any) => ({ ...prev, level, jurusanId, name: suggestion }));
  };

  const handleSaveClass = async () => {
    if (!formData.name || !formData.level) {
      setError('Nama kelas dan tingkat wajib diisi.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: formData.name,
        level: formData.level,
        waliKelasId: formData.waliKelasId || undefined,
        jurusanId: formData.jurusanId || undefined,
      };
      if (formData.id) {
        await editKelas(formData.id, payload);
      } else {
        await addKelas(payload);
      }
      setIsDialogOpen(false);
      await loadData();
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan kelas.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => { setDeletingId(id); setIsAlertOpen(true); };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteKelas(dataConnect, { id: deletingId });
      await loadData();
    } catch (e: any) {
      setError(e.message || 'Gagal menghapus kelas.');
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  const jurusanItems = jurusanList.map(j => ({
    value: j.id,
    label: `${j.kode} — ${j.nama}`,
    hint: j.nama,
  }));

  const guruItems = guruList.map(g => ({
    value: g.guruId!,
    label: g.name,
    hint: g.nip ? `NIP ${g.nip}` : undefined,
  }));

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Manajemen Kelas</h2>
          <p className="text-slate-300 mt-1">Kelola ruang belajar dan penugasan wali kelas sesuai Kurikulum Merdeka.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={loadData} disabled={loading}
            className="h-11 w-11 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 p-0">
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => handleOpenDialog()}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-6 rounded-xl font-semibold text-white">
            <Plus className="mr-2 h-5 w-5" /> Buat Kelas
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Kelas', val: classes.length, icon: School, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Tingkat Aktif', val: [...new Set(classes.map(c => c.level))].sort().join(', ') || '-', icon: Layers, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Wali Kelas Ter-assign', val: classes.filter(c => c.homeroomId).length, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/60 border-white/10 rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-0.5">{stat.val}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
          <Info className="h-5 w-5 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Table */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CardTitle className="text-white text-lg font-bold">Daftar Kelas Aktif</CardTitle>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Cari nama kelas, wali, atau jurusan..."
                className="pl-10 h-11 bg-slate-950 border-white/10 rounded-xl text-white placeholder:text-slate-400"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="p-5 text-slate-200 font-semibold text-xs uppercase tracking-wider">Nama Kelas</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider">Tingkat / Fase</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider">Jurusan</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider">Wali Kelas</TableHead>
                <TableHead className="text-slate-200 font-semibold text-xs uppercase tracking-wider">Tahun Ajaran</TableHead>
                <TableHead className="text-right text-slate-200 font-semibold text-xs uppercase tracking-wider pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                </TableCell></TableRow>
              ) : filteredClasses.length > 0 ? filteredClasses.map((cls) => {
                const faseLabel = cls.level === '10' ? 'Fase E' : (cls.level === '11' || cls.level === '12') ? 'Fase F' : '-';
                return (
                  <TableRow key={cls.id} className="border-white/10 hover:bg-white/5 group">
                    <TableCell className="p-5">
                      <span className="font-bold text-lg text-blue-300">{cls.name}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="h-6 px-2 bg-white/5 border-white/20 text-white rounded-md font-semibold w-fit">
                          Kelas {cls.level}
                        </Badge>
                        <span className="text-[11px] text-slate-400 font-medium">{faseLabel}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-200 font-medium">
                      {cls.jurusan || <span className="text-slate-500 italic text-sm">Belum diatur</span>}
                    </TableCell>
                    <TableCell>
                      {cls.homeroom && cls.homeroom !== 'Belum Diatur' ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-slate-200 font-medium">{cls.homeroom}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic text-sm">Belum ditugaskan</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm font-medium">
                      {cls.tahunAjaran || '-'}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(cls)}
                          className="h-9 w-9 text-blue-400 hover:text-white hover:bg-blue-600 rounded-lg">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => confirmDelete(cls.id)}
                          className="h-9 w-9 text-red-400 hover:text-white hover:bg-red-600 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow><TableCell colSpan={6} className="text-center py-16">
                  <School className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-300 font-semibold">Belum ada kelas terdaftar</p>
                  <p className="text-slate-400 text-sm mt-1">Klik "Buat Kelas" untuk menambahkan kelas baru.</p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) setError(null); }}>
        <DialogContent className="bg-slate-950 border border-white/10 max-w-md rounded-2xl p-0 overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-white/5">
            <DialogTitle className="text-xl font-bold text-white">
              {formData.id ? 'Ubah Kelas' : 'Buat Kelas Baru'}
            </DialogTitle>
            <p className="text-slate-300 text-xs mt-1">Sesuai Kurikulum Merdeka: Kelas 10 = Fase E, Kelas 11–12 = Fase F.</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-slate-200 text-xs font-semibold">Tingkat / Fase</Label>
                <Select value={formData.level || '10'} onValueChange={(v) => updateName(v || '10', formData.jurusanId || '')}>
                  <SelectTrigger className="h-11 bg-slate-900 border-white/10 rounded-lg text-white">
                    <SelectValue>
                      {(v: any) => {
                        const opt = TINGKAT_OPTIONS.find(o => o.value === v);
                        return opt?.label || 'Pilih tingkat';
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    {TINGKAT_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value} className="text-white">
                        <div className="flex flex-col">
                          <span className="font-medium">{opt.label}</span>
                          <span className="text-[10px] text-slate-400">{opt.hint}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-200 text-xs font-semibold">Jurusan</Label>
                <LookupSelect
                  value={formData.jurusanId || ''}
                  onChange={(v) => updateName(formData.level || '10', v)}
                  items={jurusanItems}
                  placeholder={jurusanItems.length ? 'Pilih jurusan' : 'Memuat...'}
                  allowEmpty
                  emptyLabel="Tanpa Jurusan"
                  className="h-11 bg-slate-900 border-white/10 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-200 text-xs font-semibold">Nama Kelas</Label>
              <Input
                placeholder="Contoh: X-MIPA-1"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white placeholder:text-slate-500"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <p className="text-[10px] text-slate-400">
                Format umum: [Tingkat]-[Jurusan]-[No]. Contoh: X-MIPA-1, XI-IPS-2.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-200 text-xs font-semibold">Tahun Ajaran</Label>
              <Select value={formData.tahunAjaran || generateTahunAjaran()[1]} onValueChange={(v) => setFormData({ ...formData, tahunAjaran: v || generateTahunAjaran()[1] })}>
                <SelectTrigger className="h-11 bg-slate-900 border-white/10 rounded-lg text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {generateTahunAjaran().map(ta => (
                    <SelectItem key={ta} value={ta} className="text-white">{ta}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-200 text-xs font-semibold">Wali Kelas</Label>
              <LookupSelect
                value={formData.waliKelasId || ''}
                onChange={(v) => setFormData({ ...formData, waliKelasId: v })}
                items={guruItems}
                placeholder={guruItems.length ? 'Pilih guru' : 'Belum ada guru'}
                allowEmpty
                emptyLabel="Belum Ditentukan"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10 flex gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}
              className="flex-1 h-11 rounded-lg text-slate-200 hover:bg-white/5">Batal</Button>
            <Button onClick={handleSaveClass} disabled={saving}
              className="flex-1 h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : formData.id ? 'Simpan Perubahan' : 'Buat Kelas'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-slate-950 border border-red-500/20 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-white">Hapus Kelas?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Menghapus kelas akan memutus relasi semua siswa di dalamnya. Pastikan siswa sudah dipindahkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="h-11 border-white/10 bg-white/5 text-slate-200 rounded-lg px-5">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-11 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg px-5">Konfirmasi Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
