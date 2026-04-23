import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit2, Trash2, CheckCircle2, Info, RefreshCw, Loader2, Users, School, Layers } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { fetchKelas, addKelas, editKelas, fetchJurusan } from '@/lib/schoolService';
import { fetchGuru, UserListItem } from '@/lib/userService';
import { deleteKelas } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';

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
        fetchJurusan()
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
    cls.jurusan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (cls: any = null) => {
    setError(null);
    if (cls) {
      setFormData({
        id: cls.id,
        name: cls.name,
        level: String(cls.level),
        waliKelasId: cls.homeroomId || '',
        jurusanId: cls.jurusanId || ''
      });
    } else {
      setFormData({ name: '', level: '10', waliKelasId: '', jurusanId: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSaveClass = async () => {
    if (!formData.name || !formData.level) {
      setError("Nama kelas dan tingkat wajib diisi.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (formData.id) {
        await editKelas(formData.id, {
          name: formData.name,
          level: formData.level,
          waliKelasId: formData.waliKelasId || undefined,
          jurusanId: formData.jurusanId || undefined,
        });
      } else {
        await addKelas({
          name: formData.name,
          level: formData.level,
          waliKelasId: formData.waliKelasId || undefined,
          jurusanId: formData.jurusanId || undefined,
        });
      }
      setIsDialogOpen(false);
      setTimeout(() => {
        loadData();
      }, 500);
    } catch (e: any) {
      setError(e.message || "Gagal menyimpan kelas.");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => { setDeletingId(id); setIsAlertOpen(true); };
  
  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteKelas(dataConnect, { id: deletingId });
      setTimeout(() => {
        loadData();
      }, 500);
    } catch (e: any) {
      setError(e.message || "Gagal menghapus kelas.");
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white font-heading">Struktur Kelas</h2>
          <p className="text-slate-400 font-medium tracking-tight">Manajemen ruang lingkup belajar dan penugasan wali kelas.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={loadData} disabled={loading}
            className="w-12 h-12 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-all active:scale-95">
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-500 h-12 px-6 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-white flex-1 md:flex-none">
            <Plus className="mr-2 h-5 w-5" /> Buat Kelas
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Kelas', val: classes.length, icon: School, color: 'text-blue-400' },
           { label: 'Tingkat Aktif', val: '10, 11, 12', icon: Layers, color: 'text-emerald-400' },
           { label: 'Guru Wali', val: classes.filter(c => c.homeroomId).length, icon: Users, color: 'text-purple-400' },
         ].map((stat, i) => (
           <Card key={i} className="bg-slate-900/40 border-white/5 rounded-3xl shadow-xl overflow-hidden relative group">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 -mr-10 -mt-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
              <CardContent className="p-6 flex items-center gap-5">
                 <div className={`h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-7 w-7" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black text-white tracking-tight">{stat.val}</p>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-900/20 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in slide-in-from-top-2">
          <Info className="h-5 w-5 flex-shrink-0" /> {error}
        </div>
      )}

      <Card className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <CardTitle className="text-white font-heading text-2xl font-black">Daftar Inventaris Ruang</CardTitle>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input placeholder="Cari nama kelas atau wali..."
                className="pl-12 h-12 bg-slate-950/50 border-white/5 rounded-2xl text-white placeholder:text-slate-600"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="p-6 text-slate-500 font-bold">Nama Kelas</TableHead>
                <TableHead className="text-slate-500 font-bold">Klasifikasi</TableHead>
                <TableHead className="text-slate-500 font-bold">Jurusan</TableHead>
                <TableHead className="text-slate-500 font-bold">Penugasan Wali</TableHead>
                <TableHead className="text-right text-slate-500 font-bold pr-8">Operasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-32"><Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto opacity-50" /></TableCell></TableRow>
              ) : filteredClasses.length > 0 ? filteredClasses.map((cls) => (
                <TableRow key={cls.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                  <TableCell className="p-6">
                    <span className="font-black text-xl text-blue-400 tracking-tighter">{cls.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="h-7 px-3 bg-white/5 border-white/10 text-slate-300 rounded-lg font-bold">
                       Grade {cls.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300 font-medium">
                    {cls.jurusan || <span className="text-slate-600 text-[10px] uppercase font-bold tracking-widest italic">General</span>}
                  </TableCell>
                  <TableCell>
                    {cls.homeroom !== 'Belum Diatur' ? (
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-slate-300 font-medium">{cls.homeroom}</span>
                      </div>
                    ) : (
                      <span className="text-slate-600 text-xs font-medium">Belum ditugaskan</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(cls)} className="h-10 w-10 text-blue-400 hover:text-white hover:bg-blue-600 rounded-xl">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => confirmDelete(cls.id)} className="h-10 w-10 text-red-400 hover:text-white hover:bg-red-600 rounded-xl">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={5} className="text-center py-40">
                  <div className="h-24 w-24 bg-slate-900 rounded-[2rem] mx-auto flex items-center justify-center text-4xl mb-6 opacity-30">🏫</div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Kosong • Tidak ada ruang kelas ditemukan</p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if(!o) setError(null); }}>
        <DialogContent className="bg-slate-950 border border-white/10 max-w-md rounded-[2.5rem] p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
           <div className="p-8 border-b border-white/5 bg-white/5">
              <DialogTitle className="text-2xl font-black tracking-tight text-white font-heading">
                {formData.id ? 'Modifikasi Ruang' : 'Buat Ruang Baru'}
              </DialogTitle>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Definisikan atribut dasar kelas akademik Anda.</p>
           </div>
           
           <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ml-1">Nama Identitas Kelas</Label>
                <Input placeholder="Contoh: XII-MIPA-1" className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold text-lg" 
                  value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ml-1">Grade / Tingkat</Label>
                  <Select value={formData.level} onValueChange={(val) => setFormData({...formData, level: val})}>
                    <SelectTrigger className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      <SelectItem value="10">Kelas 10</SelectItem>
                      <SelectItem value="11">Kelas 11</SelectItem>
                      <SelectItem value="12">Kelas 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ml-1">Jurusan / Kompetensi Keahlian</Label>
                  <Select key={`jurusan-${formData.id}-${jurusanList.length}`} value={formData.jurusanId || 'none'} onValueChange={(val) => setFormData({...formData, jurusanId: val === 'none' ? '' : val})}>
                    <SelectTrigger className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold">
                      <SelectValue placeholder="Pilih..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      <SelectItem value="none" className="text-slate-500">General</SelectItem>
                      {jurusanList.map(j => <SelectItem key={j.id} value={j.id}>{j.nama}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ml-1">Wali Kelas Penanggung Jawab</Label>
                <Select key={`guru-${formData.id}-${guruList.length}`} value={formData.waliKelasId || 'none'} onValueChange={(val) => setFormData({...formData, waliKelasId: val === 'none' ? '' : val})}>
                  <SelectTrigger className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold">
                    <SelectValue placeholder={guruList.length > 0 ? "Pilih Pengajar" : "Memuat..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 max-h-48">
                    <SelectItem value="none" className="text-slate-500">-- Biarkan Kosong --</SelectItem>
                    {guruList.map(g => (
                      <SelectItem key={g.guruId} value={g.guruId!} className="focus:bg-slate-800 rounded-xl h-12">
                        {g.name} {g.nip ? `(NIP ${g.nip.slice(-4)})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
           </div>

           <div className="p-8 bg-white/5 border-t border-white/5 flex gap-3">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl text-slate-400 font-bold hover:text-white">Batal</Button>
              <Button onClick={handleSaveClass} disabled={saving} className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold shadow-xl shadow-blue-600/20 text-white">
                {saving ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Selesaikan'}
              </Button>
           </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-slate-950 border border-red-500/10 rounded-[2.5rem] shadow-2xl p-4">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-2xl font-black text-white font-heading">Terminasi Kelas?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Menghapus entitas kelas akan memutus relasi <span className="text-red-400 font-bold">seluruh siswa</span> di dalamnya. Data historis mungkin akan terpengaruh.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="h-12 border-white/5 bg-white/5 text-slate-400 rounded-2xl px-6">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-12 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl px-6 shadow-xl shadow-red-600/20">Konfirmasi Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}