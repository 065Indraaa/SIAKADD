import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { fetchAlumni, addAlumniData, editAlumniData, removeAlumniData } from '@/lib/schoolService';
import { Loader2, RefreshCw } from 'lucide-react';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';

export default function AdminAlumni() {
  const [searchTerm, setSearchTerm] = useState('');
  const [alumni, setAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAlumni();
      setAlumni(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  useAutoRefresh(loadData, 20_000);

  const [refreshing, refreshAll] = useManualRefresh(loadData);

  const filteredAlumni = alumni.filter(alum => 
    alum.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (alum.gradYear || '').toString().includes(searchTerm)
  );

  const handleOpenDialog = (alum: any = null) => {
    if (alum) {
      setEditingAlumni(alum);
      // Normalize field names for the form
      setFormData({
        ...alum,
        year: alum.gradYear,
        major: alum.position,
      });
    } else {
      setEditingAlumni(null);
      setFormData({ name: '', year: new Date().getFullYear(), status: 'Kuliah', institution: '', major: '', nis: '' });
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
    if (deletingId) {
      try {
        await removeAlumniData(deletingId);
        setTimeout(() => {
          loadData();
        }, 500);
      } catch (e) {
        console.error(e);
        alert('Gagal menghapus alumni');
      }
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Data Alumni</h2>
          <p className="text-slate-400">Penelusuran lulusan SMAIT Nur Hidayah. Data terekam mulai angkatan 2023.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshAll} disabled={refreshing}
            className="bg-white/5 border-white/10" title="Segarkan data">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Plus className="mr-2 h-4 w-4" /> Tambah Alumni
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
            <CardTitle className="text-white">Daftar Alumni</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari..."
                className="pl-8 bg-slate-950 border-white/10 text-white placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-950/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">Nama</TableHead>
                  <TableHead className="text-slate-400">Tahun Lulus</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Institusi/Perusahaan</TableHead>
                  <TableHead className="text-slate-400">Jurusan/Jabatan</TableHead>
                  <TableHead className="text-right text-slate-400">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
                ) : filteredAlumni.length > 0 ? (
                  filteredAlumni.map((alum) => (
                    <TableRow key={alum.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-white">{alum.name}</TableCell>
                      <TableCell className="text-slate-300">{alum.gradYear}</TableCell>
                      <TableCell>
                        <Badge className={
                          alum.status === 'Kuliah' ? 'bg-blue-600/20 text-blue-400 border-blue-500/20' :
                          alum.status === 'Kerja' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/20' :
                          'bg-slate-600/20 text-slate-400 border-slate-500/20'
                        }>
                          {alum.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{alum.institution || '-'}</TableCell>
                      <TableCell className="text-slate-300">{alum.position || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(alum)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(alum.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="text-center text-slate-500 py-10">Tidak ada data.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent className="bg-slate-900 border border-white/10 text-white sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="text-white">
        {editingAlumni ? 'Ubah Alumni' : 'Tambah Alumni'}
      </DialogTitle>
    </DialogHeader>

    <div className="flex flex-col gap-3 py-4">
      {/* Nama */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-400 text-sm">Nama Lengkap</Label>
        <Input
          className="bg-slate-950 border-white/10 text-white"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!!editingAlumni}
        />
      </div>

      {/* NIS */}
      {!editingAlumni && (
        <div className="flex flex-col gap-1.5">
          <Label className="text-slate-400 text-sm">NIS (opsional)</Label>
          <Input
            className="bg-slate-950 border-white/10 text-white"
            placeholder="Kosongkan untuk auto-generate"
            value={formData.nis || ''}
            onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
          />
        </div>
      )}

      {/* Tahun */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-400 text-sm">Tahun Lulus</Label>
        <Input
          type="number"
          className="bg-slate-950 border-white/10 text-white"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
          disabled={!!editingAlumni}
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-400 text-sm">Status Saat Ini</Label>
        <Select
          value={formData.status}
          onValueChange={(val) => setFormData({ ...formData, status: val })}
        >
          <SelectTrigger className="bg-slate-950 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-white/10 text-white">
            <SelectItem value="Kuliah" className="text-white hover:bg-slate-800">Kuliah</SelectItem>
            <SelectItem value="Kerja" className="text-white hover:bg-slate-800">Kerja</SelectItem>
            <SelectItem value="Lainnya" className="text-white hover:bg-slate-800">Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Institusi */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-400 text-sm">
          {formData.status === 'Kerja' ? 'Nama Perusahaan/Instansi' : 'Nama Universitas/Institusi'}
        </Label>
        <Input
          className="bg-slate-950 border-white/10 text-white"
          placeholder={formData.status === 'Kerja' ? 'Contoh: PT. Astra International' : 'Contoh: Universitas Gadjah Mada'}
          value={formData.institution || ''}
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
        />
      </div>

      {/* Jurusan/Jabatan */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-400 text-sm">
          {formData.status === 'Kerja' ? 'Jabatan / Posisi' : 'Program Studi / Jurusan'}
        </Label>
        <Input
          className="bg-slate-950 border-white/10 text-white"
          placeholder={formData.status === 'Kerja' ? 'Contoh: Software Engineer' : 'Contoh: Pendidikan Dokter'}
          value={formData.major || ''}
          onChange={(e) => setFormData({ ...formData, major: e.target.value })}
        />
      </div>

      {/* Prestasi */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-400 text-sm">Catatan Prestasi (opsional)</Label>
        <Input
          className="bg-slate-950 border-white/10 text-white"
          placeholder="Contoh: Beasiswa Bidikmisi, Juara KSN"
          value={formData.achievements || ''}
          onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
        />
      </div>
    </div>

    <DialogFooter className="flex flex-row justify-end gap-2 pt-2 border-t border-white/10 bg-slate-900">
      <Button
        variant="outline"
        onClick={() => setIsDialogOpen(false)}
        className="border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 bg-transparent"
      >
        Batal
      </Button>
      <Button
        onClick={handleSaveAlumni}
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-500 text-white"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan'}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-slate-900 border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Alumni?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Data yang dihapus tidak dapat dikembalikan. Lanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-slate-800 text-slate-300">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}