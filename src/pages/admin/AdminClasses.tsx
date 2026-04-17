import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function AdminClasses() {
  const [searchTerm, setSearchTerm] = useState('');

  const [classes, setClasses] = useState([
    { id: 1, name: 'X-A', level: '10', homeroom: 'Budi Santoso', students: 32 },
    { id: 2, name: 'X-B', level: '10', homeroom: 'Siti Aminah', students: 30 },
    { id: 3, name: 'XI-IPA-1', level: '11', homeroom: 'Agus Setiawan', students: 34 },
    { id: 4, name: 'XI-IPS-1', level: '11', homeroom: 'Rini Wulandari', students: 31 },
    { id: 5, name: 'XII-IPA-1', level: '12', homeroom: 'Joko Widodo', students: 35 },
  ]);

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cls.homeroom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Alert Dialog State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleOpenDialog = (cls: any = null) => {
    if (cls) {
      setEditingClass(cls);
      setFormData(cls);
    } else {
      setEditingClass(null);
      setFormData({
        name: '',
        level: '10',
        homeroom: '',
        students: 0
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveClass = () => {
    if (editingClass) {
      setClasses(classes.map(c => c.id === editingClass.id ? { ...formData, id: c.id } : c));
    } else {
      setClasses([...classes, { ...formData, id: Date.now() }]);
    }
    setIsDialogOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsAlertOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      setClasses(classes.filter(c => c.id !== deletingId));
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Kelas</h2>
          <p className="text-slate-500">Kelola data kelas dan wali kelas.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Kelas
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <CardTitle>Daftar Kelas</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari kelas atau wali kelas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nama Kelas</TableHead>
                  <TableHead>Tingkat</TableHead>
                  <TableHead>Wali Kelas</TableHead>
                  <TableHead>Jumlah Siswa</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <TableRow key={cls.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-blue-700">{cls.name}</TableCell>
                      <TableCell>Kelas {cls.level}</TableCell>
                      <TableCell>{cls.homeroom}</TableCell>
                      <TableCell>{cls.students} Siswa</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(cls)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(cls.id)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">Tidak ada data kelas ditemukan.</TableCell>
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
            <DialogTitle>{editingClass ? 'Edit Kelas' : 'Tambah Kelas'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nama Kelas</Label>
              <Input className="col-span-3" value={formData.name} placeholder="X-A, XI-IPA-1..." onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tingkat</Label>
              <Select value={formData.level} onValueChange={(val) => setFormData({...formData, level: val})}>
                <SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Tingkat" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Kelas 10</SelectItem>
                  <SelectItem value="11">Kelas 11</SelectItem>
                  <SelectItem value="12">Kelas 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Wali Kelas</Label>
              <Input className="col-span-3" value={formData.homeroom} placeholder="Nama Guru" onChange={(e) => setFormData({...formData, homeroom: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Jml Siswa</Label>
              <Input type="number" className="col-span-3" value={formData.students} onChange={(e) => setFormData({...formData, students: parseInt(e.target.value) || 0})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSaveClass} className="bg-blue-600 hover:bg-blue-700">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog Delete */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus kelas dari sistem. Pastikan memindahkan siswa terlebih dahulu.
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
