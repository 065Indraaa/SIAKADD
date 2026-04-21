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

export default function AdminSchedules() {
  const [kelasFilter, setKelasFilter] = useState('X IPA 1');
  const [hariFilter, setHariFilter] = useState('Senin');

  const [schedules, setSchedules] = useState([
    { id: 1, kelas: 'X IPA 1', hari: 'Senin', jam: '07:00 - 08:30', mapel: 'Matematika Wajib', guru: 'Budi Santoso, S.Pd', ruang: 'R.10' },
    { id: 2, kelas: 'X IPA 1', hari: 'Senin', jam: '08:30 - 10:00', mapel: 'Fisika', guru: 'Drs. Supandi', ruang: 'Lab. Fisika' },
    { id: 3, kelas: 'X IPA 1', hari: 'Senin', jam: '10:30 - 12:00', mapel: 'Bahasa Indonesia', guru: 'Siti Aminah, M.Pd', ruang: 'R.10' },
    { id: 4, kelas: 'XI IPS 1', hari: 'Selasa', jam: '07:00 - 08:30', mapel: 'Sosiologi', guru: 'Rini Wulandari, S.Pd', ruang: 'R.15' },
    { id: 5, kelas: 'XI IPS 1', hari: 'Selasa', jam: '08:30 - 10:00', mapel: 'Sejarah', guru: 'Ahmad Dahlan, S.Pd', ruang: 'R.15' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredSchedules = schedules.filter(s => s.kelas === kelasFilter && s.hari === hariFilter);

  const handleOpenDialog = (schedule: any = null) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setFormData(schedule);
    } else {
      setEditingSchedule(null);
      setFormData({ kelas: kelasFilter, hari: hariFilter, jam: '', mapel: '', guru: '', ruang: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSaveSchedule = () => {
    if (editingSchedule) {
      setSchedules(schedules.map(s => s.id === editingSchedule.id ? { ...formData, id: s.id } : s));
    } else {
      setSchedules([...schedules, { ...formData, id: Date.now() }]);
    }
    setIsDialogOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsAlertOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      setSchedules(schedules.filter(s => s.id !== deletingId));
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
        <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Buat Jadwal Baru
        </Button>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-4 border-b border-white/5">
          <CardTitle className="text-white">Filter Jadwal</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 bg-slate-950 p-4 rounded-xl border border-white/10">
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-slate-400">Pilih Kelas</label>
              <Select value={kelasFilter} onValueChange={setKelasFilter}>
                <SelectTrigger className="bg-slate-900 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="X IPA 1" className="hover:bg-slate-800 focus:bg-slate-800">X IPA 1</SelectItem>
                  <SelectItem value="X IPA 2" className="hover:bg-slate-800 focus:bg-slate-800">X IPA 2</SelectItem>
                  <SelectItem value="XI IPS 1" className="hover:bg-slate-800 focus:bg-slate-800">XI IPS 1</SelectItem>
                  <SelectItem value="XII IPA 1" className="hover:bg-slate-800 focus:bg-slate-800">XII IPA 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-slate-400">Pilih Hari</label>
              <Select value={hariFilter} onValueChange={setHariFilter}>
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
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-slate-300">{schedule.jam}</TableCell>
                      <TableCell className="font-semibold text-blue-400">{schedule.mapel}</TableCell>
                      <TableCell className="text-slate-300">{schedule.guru}</TableCell>
                      <TableCell className="text-slate-300">{schedule.ruang}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(schedule)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                            <Edit2 className="h-4 w-4" />
                          </Button>
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
                      Belum ada jadwal untuk kelas {kelasFilter} pada hari {hariFilter}.
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
            <DialogTitle>{editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Kelas</Label>
              <Select value={formData.kelas} onValueChange={(val) => setFormData({...formData, kelas: val})}>
                <SelectTrigger className="col-span-3 bg-slate-950 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="X IPA 1" className="hover:bg-slate-800">X IPA 1</SelectItem>
                  <SelectItem value="XI IPS 1" className="hover:bg-slate-800">XI IPS 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Jam</Label>
              <Input className="col-span-3 bg-slate-950 border-white/10 text-white" value={formData.jam} onChange={(e) => setFormData({...formData, jam: e.target.value})} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Mapel</Label>
              <Input className="col-span-3 bg-slate-950 border-white/10 text-white" value={formData.mapel} onChange={(e) => setFormData({...formData, mapel: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-slate-400">Batal</Button>
            <Button onClick={handleSaveSchedule} className="bg-blue-600 hover:bg-blue-500">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}