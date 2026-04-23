import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit2, Trash2, BookOpen, Loader2, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  fetchMataPelajaran, 
  addMataPelajaran, 
  editMataPelajaran, 
  removeMataPelajaran 
} from '@/lib/schoolService';

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [formData, setFormData] = useState({ kode: '', nama: '' });
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    loadData();
  }, [loadData]);

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
    if (!formData.kode || !formData.nama) return;
    setSaving(true);
    try {
      if (editingSubject) {
        await editMataPelajaran(editingSubject.id, formData);
      } else {
        await addMataPelajaran(formData);
      }
      setIsDialogOpen(false);
      loadData();
    } catch (e) {
      console.error(e);
      alert("Gagal menyimpan mata pelajaran.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus mata pelajaran ini? Jadwal yang menggunakan mapel ini mungkin akan bermasalah.")) return;
    try {
      await removeMataPelajaran(id);
      loadData();
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus mata pelajaran.");
    }
  };

  const filteredSubjects = subjects.filter(s => 
    s.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Manajemen Mata Pelajaran</h2>
          <p className="text-slate-400">Kelola daftar kurikulum dan mata pelajaran sekolah.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} disabled={loading} className="bg-slate-900 border-white/10 text-slate-400 hover:text-white">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Plus className="mr-2 h-4 w-4" /> Tambah Mapel
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-white/5 bg-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Daftar Mata Pelajaran
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari mapel atau kode..."
                className="pl-8 bg-slate-950 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-xl border border-white/5 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-950/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] py-4">Kode Mapel</TableHead>
                  <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] py-4">Nama Mata Pelajaran</TableHead>
                  <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] py-4 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-20"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
                ) : filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <TableRow key={subject.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                      <TableCell className="py-4">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-mono">
                          {subject.kode}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-white text-lg">{subject.nama}</TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(subject)} className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(subject.id)} className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                        <BookOpen className="h-10 w-10 opacity-20" />
                        <p className="font-medium">Tidak ada mata pelajaran ditemukan.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 text-white rounded-[2rem] p-0 overflow-hidden shadow-2xl max-w-md">
          <DialogHeader className="p-8 bg-white/5 border-b border-white/5">
            <DialogTitle className="text-2xl font-black italic tracking-tighter">
              {editingSubject ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">Pastikan kode mata pelajaran bersifat unik.</DialogDescription>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="kode" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Kode Mapel</Label>
              <Input
                id="kode"
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
                placeholder="CONTOH: MAT-X"
                className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nama" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Nama Mapel</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Matematika Wajib"
                className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
          <DialogFooter className="p-8 bg-slate-900/50 flex flex-row gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 rounded-2xl border-white/5 text-slate-400 hover:text-white hover:bg-white/5">
              Batal
            </Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingSubject ? 'Update' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
