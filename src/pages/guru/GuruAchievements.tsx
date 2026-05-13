import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LookupSelect } from '@/components/ui/lookup-select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Search, Plus, Loader2, RefreshCw, Trophy, Info, Trash2, Award, Calendar, TextQuote, Star } from 'lucide-react';
import { addPrestasi } from '@/lib/schoolService';
import { fetchSiswa, UserListItem } from '@/lib/userService';
import { listPrestasi, deletePrestasi, listPrestasiRef } from '@uassiakad/connector';
import { executeQuery } from 'firebase/data-connect';
import { dataConnect } from '@/lib/userService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';

interface Prestasi {
  id: string;
  nama: string;
  tipe: string;
  tingkat: string;
  peringkat: string;
  tanggal: string;
  deskripsi?: string | null;
  siswaName?: string;
  siswaId?: string;
}

export default function GuruAchievements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [achievements, setAchievements] = useState<Prestasi[]>([]);
  const [allSiswa, setAllSiswa] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    siswaId: '',
    nama: '',
    tipe: 'Akademik',
    tingkat: '',
    peringkat: '',
    tanggal: new Date().toISOString().slice(0, 10),
    deskripsi: '',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [prestasiRes, siswaData] = await Promise.all([
        executeQuery(listPrestasiRef(dataConnect, {}), { fetchPolicy: 'SERVER_ONLY' }),
        fetchSiswa(),
      ]);
      setAllSiswa(siswaData);

      const mapped: Prestasi[] = (prestasiRes.data.prestasis || []).map((p: any) => ({
        id: p.id,
        nama: p.nama,
        tipe: p.tipe,
        tingkat: p.tingkat,
        peringkat: p.peringkat,
        tanggal: p.tanggal,
        deskripsi: p.deskripsi,
        // Ambil siswaId dan nama dari relasi siswa yang sudah di-join di query
        siswaId: p.siswa?.id,
        siswaName: p.siswa?.pengguna?.nama || 'Siswa Terhapus',
      }));
      setAchievements(mapped);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat prestasi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useAutoRefresh(loadData, 20_000);

  const [refreshing, refresh] = useManualRefresh(loadData);

  const handleOpenDialog = () => {
    // Reset form setiap kali dialog dibuka agar tidak ada sisa data sebelumnya
    setFormData({
      siswaId: '',
      nama: '',
      tipe: 'Akademik',
      tingkat: '',
      peringkat: '',
      tanggal: new Date().toISOString().slice(0, 10),
      deskripsi: '',
    });
    setError(null);
    setIsDialogOpen(true);
  };

  const filtered = achievements.filter(a =>
    a.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.siswaName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    if (!formData.siswaId || !formData.nama || !formData.tingkat || !formData.peringkat || !formData.tanggal) {
      setError('Harap isi semua field yang wajib diisi.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await addPrestasi({
        siswaId: formData.siswaId,
        nama: formData.nama,
        tipe: formData.tipe,
        tingkat: formData.tingkat,
        peringkat: formData.peringkat,
        tanggal: formData.tanggal,
        deskripsi: formData.deskripsi,
      });
      setIsDialogOpen(false);
      await loadData();
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan prestasi.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deletePrestasi(dataConnect, { id: deletingId });
      await loadData();
    } catch (e: any) {
      setError(e.message);
    }
    setIsDeleteOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-emerald-500 fill-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Daftar Prestasi</span>
           </div>
          <h2 className="text-4xl font-black tracking-tighter text-white font-heading underline decoration-emerald-600/30 underline-offset-8 italic">Prestasi Siswa</h2>
          <p className="text-slate-400 font-medium mt-3">Arsip penghargaan dan pencapaian luar biasa siswa SMA.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={refresh} disabled={refreshing}
            className="h-14 px-6 rounded-2xl border-white/5 bg-white/5 text-slate-300" title="Segarkan data">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleOpenDialog} className="bg-emerald-600 hover:bg-emerald-500 h-11 px-6 rounded-xl font-semibold text-white">
            <Plus className="mr-2 h-5 w-5" /> Catat Prestasi
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <CardTitle className="text-white font-heading text-2xl font-black italic">Log Pencapaian</CardTitle>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input placeholder="Cari prestasi atau nama..."
                className="pl-12 h-12 bg-slate-950/50 border-white/5 rounded-2xl text-white font-medium"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/5 h-16 text-[10px] uppercase font-black tracking-widest text-slate-500">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="p-8">Nama Prestasi</TableHead>
                <TableHead>Penerima (Siswa)</TableHead>
                <TableHead>Tingkat / Peringkat</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead className="text-right pr-10">Operasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-40"><Loader2 className="h-10 w-10 animate-spin text-emerald-500 mx-auto opacity-50" /></TableCell></TableRow>
              ) : filtered.length > 0 ? filtered.map((a) => (
                <TableRow key={a.id} className="border-white/5 hover:bg-white/5 group transition-all duration-300 h-24">
                  <TableCell className="p-8">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                          <Trophy className="h-6 w-6" />
                       </div>
                       <div>
                          <div className="text-white font-black tracking-tight text-lg leading-none mb-1">{a.nama}</div>
                          <Badge variant="outline" className="text-[10px] font-bold text-amber-500 border-amber-500/20 bg-amber-500/5">{a.tipe}</Badge>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-slate-300">{a.siswaName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                       <div className="text-white font-bold text-sm">{a.peringkat}</div>
                       <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-1">
                          <Award className="h-3 w-3" /> {a.tingkat}
                       </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="text-slate-400 font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 opacity-50" /> {new Date(a.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric'})}
                     </div>
                  </TableCell>
                  <TableCell className="text-right pr-10">
                     <Button variant="ghost" size="icon" onClick={() => { setDeletingId(a.id); setIsDeleteOpen(true); }}
                        className="h-12 w-12 rounded-2xl text-red-400 hover:text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 className="h-5 w-5" />
                     </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={5} className="text-center py-40">
                   <Trophy className="h-20 w-20 text-slate-800 mx-auto mb-6 opacity-20" />
                   <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Belum ada rekam prestasi</p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 max-w-lg rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
           <div className="p-8 border-b border-white/5 bg-gradient-to-br from-emerald-600/10 to-transparent">
              <DialogTitle className="text-2xl font-black tracking-tight text-white font-heading underline decoration-emerald-500/30 underline-offset-8">
                Pencatatan Baru
              </DialogTitle>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-3">Tambahkan sertifikasi atau juara siswa ke dalam sistem.</p>
           </div>
           
           <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Penerima Prestasi *</Label>
                <LookupSelect
                  value={formData.siswaId}
                  onChange={(v) => setFormData({ ...formData, siswaId: v })}
                  items={allSiswa
                    .filter(s => !!s.siswaId)
                    .map(s => ({
                      value: s.siswaId as string,
                      label: s.name,
                      hint: `NIS ${s.nis || '-'}${s.className ? ' · ' + s.className : ''}`,
                    }))}
                  placeholder={allSiswa.length ? 'Pilih Siswa' : 'Memuat daftar siswa...'}
                  className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nama Penghargaan / Lomba *</Label>
                <Input className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold"
                  value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} placeholder="Contoh: Juara 1 Olimpiade Fisika" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Tingkat *</Label>
                    <Select value={formData.tingkat} onValueChange={(v) => setFormData({...formData, tingkat: v})}>
                       <SelectTrigger className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold"><SelectValue placeholder="Nasional..." /></SelectTrigger>
                       <SelectContent className="bg-slate-900 border-white/10 rounded-2xl">
                          {['Sekolah', 'Kecamatan', 'Kota', 'Provinsi', 'Nasional', 'Internasional'].map(t => <SelectItem key={t} value={t} className="rounded-xl">{t}</SelectItem>)}
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Predikat / Peringkat *</Label>
                    <Input className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold"
                      value={formData.peringkat} onChange={(e) => setFormData({...formData, peringkat: e.target.value})} placeholder="Juara 1 / Emas" />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Kategori *</Label>
                    <Select value={formData.tipe} onValueChange={(v) => setFormData({...formData, tipe: v})}>
                       <SelectTrigger className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold"><SelectValue /></SelectTrigger>
                       <SelectContent className="bg-slate-900 border-white/10 rounded-2xl">
                          <SelectItem value="Akademik" className="rounded-xl">Akademik</SelectItem>
                          <SelectItem value="NonAkademik" className="rounded-xl">Non-Akademik (Olahraga, Seni, dll)</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Tanggal *</Label>
                    <Input type="date" className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white font-bold"
                      value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} />
                 </div>
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2"><TextQuote className="h-3 w-3" /> Deskripsi Singkat</Label>
                 <Input className="h-14 bg-slate-900 border-white/5 rounded-2xl text-white"
                   value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} placeholder="Catatan opsional..." />
              </div>
           </div>

           <div className="p-8 bg-white/5 border-t border-white/5 flex gap-3">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl text-slate-400 font-bold hover:text-white">Batal</Button>
              <Button onClick={handleSave} disabled={saving} className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-black shadow-xl shadow-emerald-600/20 text-white">
                {saving ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Finalisasi Data'}
              </Button>
           </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-950 border border-red-500/10 rounded-[2.5rem] shadow-2xl p-4">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-2xl font-black text-white font-heading">Hapus Rekam Jejak?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
               Data prestasi yang dihapus akan hilang dari Curriculum Vitae siswa secara <span className="text-red-400 font-bold">permanen</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="h-12 border-white/5 bg-white/5 text-slate-400 rounded-2xl px-6">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-12 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl px-6">Hapus Data</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}