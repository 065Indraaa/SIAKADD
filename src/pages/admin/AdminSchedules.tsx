import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { fetchKelas, fetchJadwalKelas, addJadwalData, removeJadwalData, fetchMataPelajaran } from '@/lib/schoolService';
import { fetchGuru } from '@/lib/userService';
import { Loader2, RefreshCw } from 'lucide-react';

export default function AdminSchedules() {
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [guruList, setGuruList] = useState<any[]>([]);
  const [mapelList, setMapelList] = useState<any[]>([]);
  const [kelasFilter, setKelasFilter] = useState('');
  const [hariFilter, setHariFilter] = useState('Senin');

  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadInitialData = async () => {
    try {
      const [kelasData, guruData, mapelData] = await Promise.all([fetchKelas(), fetchGuru(), fetchMataPelajaran()]);
      setKelasList(kelasData);
      setGuruList(guruData);
      setMapelList(mapelData);
      if (kelasData.length > 0) {
        setKelasFilter(kelasData[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    loadInitialData();
  }, []);

  const loadSchedules = async () => {
    if (!kelasFilter) return;
    setLoading(true);
    try {
      const data = await fetchJadwalKelas(kelasFilter);
      setSchedules(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadSchedules();
  }, [kelasFilter]);

  const filteredSchedules = schedules.filter(s => s.hari.toLowerCase() === hariFilter.toLowerCase());

  const handleOpenDialog = () => {
    setFormData({ kelasId: kelasFilter, hari: hariFilter, jamMulai: '', jamSelesai: '', mataPelajaranId: '', guruId: '', ruang: '' });
    setIsDialogOpen(true);
  };

  const handleSaveSchedule = async () => {
    setSaving(true);
    try {
      await addJadwalData(formData);
      setIsDialogOpen(false);
      setTimeout(() => {
        loadSchedules();
      }, 500);
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan jadwal');
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
        await removeJadwalData(deletingId);
        setTimeout(() => {
          loadSchedules();
        }, 500);
      } catch (e) {
        console.error(e);
        alert('Gagal menghapus jadwal');
      }
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Jadwal Pelajaran</h2>
          <p className="text-slate-400">Atur penjadwalan mata pelajaran untuk masing-masing kelas.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSchedules} disabled={loading} className="bg-slate-900 border-white/10 text-slate-400 hover:text-white">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Plus className="mr-2 h-4 w-4" /> Buat Jadwal Baru
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-4 border-b border-white/5">
          <CardTitle className="text-white">Filter Jadwal</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 bg-slate-950 p-4 rounded-xl border border-white/10">
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-slate-400">Pilih Kelas</label>
              <Select key={`filter-kelas-${kelasList.length}`} value={kelasFilter} onValueChange={(val) => setKelasFilter(val || '')}>
                <SelectTrigger className="bg-slate-900 border-white/10 text-white">
                  <SelectValue placeholder={kelasList.length > 0 ? "Pilih Kelas" : "Memuat Kelas..."} />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  {kelasList.map(k => (
                    <SelectItem key={k.id} value={k.id} className="hover:bg-slate-800 focus:bg-slate-800">{k.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-slate-400">Pilih Hari</label>
              <Select value={hariFilter} onValueChange={(val) => setHariFilter(val || 'Senin')}>
                <SelectTrigger className="bg-slate-900 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map(h => (
                    <SelectItem key={h} value={h} className="hover:bg-slate-800 focus:bg-slate-800">{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-950/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">Jam</TableHead>
                  <TableHead className="text-slate-400">Mata Pelajaran</TableHead>
                  <TableHead className="text-slate-400">Guru Pengajar</TableHead>
                  <TableHead className="text-slate-400">Ruang</TableHead>
                  <TableHead className="text-slate-400 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
                ) : filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-slate-300">{schedule.jamMulai} - {schedule.jamSelesai}</TableCell>
                      <TableCell className="font-semibold text-blue-400">{schedule.mataPelajaran?.nama}</TableCell>
                      <TableCell className="text-slate-300">{schedule.guru?.pengguna?.nama}</TableCell>
                      <TableCell className="text-slate-300">{schedule.ruangan}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(schedule.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                      Belum ada jadwal untuk kelas ini pada hari {hariFilter}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Tambah Jadwal Baru</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Jam Mulai</Label>
              <Input className="col-span-3 bg-slate-950 border-white/10 text-white" value={formData.jamMulai} onChange={(e) => setFormData({...formData, jamMulai: e.target.value})} placeholder="07:00" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Jam Selesai</Label>
              <Input className="col-span-3 bg-slate-950 border-white/10 text-white" value={formData.jamSelesai} onChange={(e) => setFormData({...formData, jamSelesai: e.target.value})} placeholder="08:30" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Mata Pelajaran</Label>
              <Select key={`mapel-select-${mapelList.length}`} value={formData.mataPelajaranId} onValueChange={(val) => setFormData({...formData, mataPelajaranId: val})}>
                <SelectTrigger className="col-span-3 bg-slate-950 border-white/10 text-white">
                  <SelectValue placeholder={mapelList.length > 0 ? "Pilih Mata Pelajaran" : "Memuat..."} />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white max-h-48">
                  {mapelList.map(m => <SelectItem key={m.id} value={m.id}>{m.nama}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Guru</Label>
              <Select key={`guru-select-${guruList.length}`} value={formData.guruId} onValueChange={(val) => setFormData({...formData, guruId: val})}>
                <SelectTrigger className="col-span-3 bg-slate-950 border-white/10 text-white">
                  <SelectValue placeholder={guruList.length > 0 ? "Pilih Guru" : "Memuat..."} />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white max-h-48">
                  {guruList.map(g => <SelectItem key={g.guruId} value={g.guruId}>{g.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Ruang</Label>
              <Input className="col-span-3 bg-slate-950 border-white/10 text-white" value={formData.ruangan} onChange={(e) => setFormData({...formData, ruangan: e.target.value})} placeholder="Lab. Bahasa" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-slate-400">Batal</Button>
            <Button onClick={handleSaveSchedule} disabled={saving} className="bg-blue-600 hover:bg-blue-500">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-slate-900 border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Jadwal?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Jadwal yang dihapus tidak dapat dikembalikan. Lanjutkan?
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