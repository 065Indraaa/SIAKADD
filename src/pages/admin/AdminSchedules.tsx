import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
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

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Alert Dialog State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredSchedules = schedules.filter(s => s.kelas === kelasFilter && s.hari === hariFilter);

  const handleOpenDialog = (schedule: any = null) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setFormData(schedule);
    } else {
      setEditingSchedule(null);
      setFormData({
        kelas: kelasFilter,
        hari: hariFilter,
        jam: '',
        mapel: '',
        guru: '',
        ruang: ''
      });
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Jadwal Pelajaran</h2>
          <p className="text-slate-500">Atur penjadwalan mata pelajaran untuk masing-masing kelas.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Buat Jadwal Baru
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle>Filter Jadwal</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-slate-700">Pilih Kelas</label>
              <Select value={kelasFilter} onValueChange={setKelasFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                  <SelectItem value="X IPA 2">X IPA 2</SelectItem>
                  <SelectItem value="XI IPS 1">XI IPS 1</SelectItem>
                  <SelectItem value="XII IPA 1">XII IPA 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-slate-700">Pilih Hari</label>
              <Select value={hariFilter} onValueChange={setHariFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Pilih Hari" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senin">Senin</SelectItem>
                  <SelectItem value="Selasa">Selasa</SelectItem>
                  <SelectItem value="Rabu">Rabu</SelectItem>
                  <SelectItem value="Kamis">Kamis</SelectItem>
                  <SelectItem value="Jumat">Jumat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[100px]">Jam</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead>Guru Pengajar</TableHead>
                  <TableHead>Ruang</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-900">{schedule.jam}</TableCell>
                      <TableCell className="font-semibold text-blue-700">{schedule.mapel}</TableCell>
                      <TableCell>{schedule.guru}</TableCell>
                      <TableCell>{schedule.ruang}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(schedule)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(schedule.id)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
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

      {/* Dialog for Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Kelas</Label>
              <Select value={formData.kelas} onValueChange={(val) => setFormData({...formData, kelas: val})}>
                <SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Kelas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                  <SelectItem value="X IPA 2">X IPA 2</SelectItem>
                  <SelectItem value="XI IPS 1">XI IPS 1</SelectItem>
                  <SelectItem value="XII IPA 1">XII IPA 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Hari</Label>
              <Select value={formData.hari} onValueChange={(val) => setFormData({...formData, hari: val})}>
                <SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Hari" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senin">Senin</SelectItem>
                  <SelectItem value="Selasa">Selasa</SelectItem>
                  <SelectItem value="Rabu">Rabu</SelectItem>
                  <SelectItem value="Kamis">Kamis</SelectItem>
                  <SelectItem value="Jumat">Jumat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Jam</Label>
              <Input className="col-span-3" value={formData.jam} placeholder="07:00 - 08:30" onChange={(e) => setFormData({...formData, jam: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Mata Pelajaran</Label>
              <Input className="col-span-3" value={formData.mapel} onChange={(e) => setFormData({...formData, mapel: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Guru</Label>
              <Input className="col-span-3" value={formData.guru} onChange={(e) => setFormData({...formData, guru: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ruangan</Label>
              <Input className="col-span-3" value={formData.ruang} onChange={(e) => setFormData({...formData, ruang: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSaveSchedule} className="bg-blue-600 hover:bg-blue-700">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog Delete */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus jadwal pelajaran dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
