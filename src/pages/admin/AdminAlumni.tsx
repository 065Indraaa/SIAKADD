import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit2, Trash2, Loader2, RefreshCw, GraduationCap, Briefcase, Building2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { fetchAlumni, addAlumniData, editAlumniData, removeAlumniData } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';
import { buildTahunLulusOptions, currentGraduationYear } from '@/lib/tahunAjaran';

const STATUS_OPTIONS = ['Kuliah', 'Kerja', 'Lainnya'] as const;
type StatusFilter = 'semua' | typeof STATUS_OPTIONS[number];

export default function AdminAlumni() {
  const tahunLulusOptions = useMemo(() => buildTahunLulusOptions(new Date(), { past: 5 }), []);

  const [searchTerm, setSearchTerm] = useState('');
  const [tahunFilter, setTahunFilter] = useState<'semua' | number>('semua');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('semua');

  const [alumni, setAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAlumni(tahunFilter === 'semua' ? undefined : tahunFilter);
      setAlumni(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [tahunFilter]);

  useEffect(() => { loadData(); }, [loadData]);
  useAutoRefresh(loadData, 20_000);
  const [refreshing, refresh] = useManualRefresh(loadData);

  const filteredAlumni = alumni.filter(alum => {
    if (statusFilter !== 'semua' && alum.status !== statusFilter) return false;
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      (alum.name || '').toLowerCase().includes(q) ||
      (alum.nis || '').toLowerCase().includes(q) ||
      (alum.institution || '').toLowerCase().includes(q) ||
      (alum.position || '').toLowerCase().includes(q) ||
      String(alum.gradYear || '').includes(q)
    );
  });

  // Statistik berdasarkan status
  const stats = useMemo(() => ({
    total: alumni.length,
    kuliah: alumni.filter(a => a.status === 'Kuliah').length,
    kerja: alumni.filter(a => a.status === 'Kerja').length,
    lainnya: alumni.filter(a => a.status === 'Lainnya').length,
  }), [alumni]);

  const handleOpenDialog = (alum: any = null) => {
    if (alum) {
      setEditingAlumni(alum);
      setFormData({
        ...alum,
        year: alum.gradYear,
        major: alum.position,
      });
    } else {
      setEditingAlumni(null);
      setFormData({
        name: '',
        year: currentGraduationYear(),
        status: 'Kuliah',
        institution: '',
        major: '',
        nis: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveAlumni = async () => {
    if (!formData.name?.trim()) { alert('Nama wajib diisi.'); return; }
    setSaving(true);
    try {
      if (editingAlumni) {
        await editAlumniData(editingAlumni.id, {
          status: formData.status,
          institution: formData.institution,
          position: formData.major,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          achievements: formData.achievements,
        });
      } else {
        await addAlumniData({
          name: formData.name,
          nis: formData.nis || `ALM-${Date.now().toString().slice(-6)}`,
          gradYear: formData.year,
          status: formData.status,
          institution: formData.institution,
          position: formData.major,
        });
      }
      setIsDialogOpen(false);
      await loadData();
    } catch (e: any) {
      console.error(e);
      alert('Gagal menyimpan alumni: ' + (e.message || 'Error'));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await removeAlumniData(deletingId);
      await loadData();
    } catch (e) {
      console.error(e);
      alert('Gagal menghapus alumni.');
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  const statusBadgeColor = (s: string) => {
    switch (s) {
      case 'Kuliah': return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'Kerja': return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      default: return 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Data Alumni</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track record lulusan SMAIT Nur Hidayah — dipisah berdasarkan tahun lulus dan status terkini.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh} disabled={refreshing}
            className="h-11 w-11 rounded-xl p-0" title="Segarkan data">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => handleOpenDialog()}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-5 rounded-xl font-semibold text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Alumni
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Alumni', val: stats.total, icon: GraduationCap, bg: 'bg-blue-500/10', color: 'text-blue-500' },
          { label: 'Sedang Kuliah', val: stats.kuliah, icon: Building2, bg: 'bg-indigo-500/10', color: 'text-indigo-500' },
          { label: 'Sudah Bekerja', val: stats.kerja, icon: Briefcase, bg: 'bg-emerald-500/10', color: 'text-emerald-500' },
          { label: 'Lainnya', val: stats.lainnya, icon: GraduationCap, bg: 'bg-amber-500/10', color: 'text-amber-500' },
        ].map((s, i) => (
          <div key={i} className="scola-stat-card p-5">
            <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.val}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <Card className="scola-card">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Cari</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nama, NIS, institusi, atau tahun..."
                  className="pl-10 h-11 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Tahun Lulus</Label>
              <Select
                value={String(tahunFilter)}
                onValueChange={(v) => {
                  if (!v) return;
                  setTahunFilter(v === 'semua' ? 'semua' : parseInt(v, 10));
                }}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Tahun</SelectItem>
                  {tahunLulusOptions.map(y => (
                    <SelectItem key={y} value={String(y)}>Tahun {y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Status</Label>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Status</SelectItem>
                  {STATUS_OPTIONS.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="scola-card overflow-hidden">
        <CardHeader className="p-5 border-b">
          <CardTitle className="text-foreground text-lg font-bold flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            Daftar Alumni
            <Badge variant="outline" className="ml-auto text-xs font-medium">
              {filteredAlumni.length} dari {alumni.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-4 pl-6 text-muted-foreground text-xs uppercase tracking-wider font-semibold">Nama & NIS</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Tahun Lulus</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Status</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Institusi / Perusahaan</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Jurusan / Jabatan</TableHead>
                  <TableHead className="text-right pr-6 text-muted-foreground text-xs uppercase tracking-wider font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
                  </TableCell></TableRow>
                ) : filteredAlumni.length > 0 ? filteredAlumni.map((alum) => (
                  <TableRow key={alum.id}>
                    <TableCell className="py-4 pl-6">
                      <p className="font-semibold text-foreground">{alum.name}</p>
                      <p className="text-[11px] text-muted-foreground font-mono mt-0.5">NIS {alum.nis}</p>
                    </TableCell>
                    <TableCell className="text-foreground font-medium">{alum.gradYear || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${statusBadgeColor(alum.status)}`}>
                        {alum.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {alum.institution || <span className="text-muted-foreground italic">Belum diisi</span>}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {alum.position || <span className="text-muted-foreground italic">Belum diisi</span>}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(alum)}
                          className="h-9 w-9 rounded-lg text-blue-500 hover:text-white hover:bg-blue-600">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => confirmDelete(alum.id)}
                          className="h-9 w-9 rounded-lg text-red-500 hover:text-white hover:bg-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <GraduationCap className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-foreground font-semibold">Belum ada alumni</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tahunFilter !== 'semua'
                          ? `Tidak ada lulusan tahun ${tahunFilter}.`
                          : 'Tambah manual atau luluskan siswa kelas 12 melalui menu Pengguna.'}
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog tambah/edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAlumni ? 'Ubah Data Alumni' : 'Tambah Alumni'}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold">Nama Lengkap</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!!editingAlumni}
                placeholder="Nama lengkap alumni"
              />
            </div>

            {!editingAlumni && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold">NIS (opsional)</Label>
                <Input
                  placeholder="Kosongkan untuk auto-generate"
                  value={formData.nis || ''}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold">Tahun Lulus</Label>
              <Input
                type="number"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) })}
                disabled={!!editingAlumni}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold">Status Saat Ini</Label>
              <Select
                value={formData.status || 'Kuliah'}
                onValueChange={(val) => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold">
                {formData.status === 'Kerja' ? 'Nama Perusahaan / Instansi' : 'Nama Universitas / Institusi'}
              </Label>
              <Input
                placeholder={formData.status === 'Kerja' ? 'Contoh: PT. Astra International' : 'Contoh: Universitas Gadjah Mada'}
                value={formData.institution || ''}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold">
                {formData.status === 'Kerja' ? 'Jabatan / Posisi' : 'Program Studi / Jurusan'}
              </Label>
              <Input
                placeholder={formData.status === 'Kerja' ? 'Contoh: Software Engineer' : 'Contoh: Pendidikan Dokter'}
                value={formData.major || ''}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold">Catatan Prestasi (opsional)</Label>
              <Input
                placeholder="Contoh: Beasiswa Bidikmisi, Juara KSN"
                value={formData.achievements || ''}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSaveAlumni} disabled={saving}
              className="bg-blue-600 hover:bg-blue-500 text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Alumni?</AlertDialogTitle>
            <AlertDialogDescription>
              Data yang dihapus tidak dapat dikembalikan. Lanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
