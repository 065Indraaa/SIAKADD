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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cls.homeroom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (cls: any = null) => {
    if (cls) {
      setEditingClass(cls);
      setFormData(cls);
    } else {
      setEditingClass(null);
      setFormData({ name: '', level: '10', homeroom: '', students: 0 });
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
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Manajemen Kelas</h2>
          <p className="text-slate-400">Kelola data kelas dan wali kelas.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Tambah Kelas
        </Button>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
            <CardTitle className="text-white">Daftar Kelas</CardTitle>
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
                  <TableHead className="text-slate-400">Nama Kelas</TableHead>
                  <TableHead className="text-slate-400">Tingkat</TableHead>
                  <TableHead className="text-slate-400">Wali Kelas</TableHead>
                  <TableHead className="text-slate-400">Jumlah Siswa</TableHead>
                  <TableHead className="text-right text-slate-400">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <TableRow key={cls.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-bold text-blue-400">{cls.name}</TableCell>
                      <TableCell className="text-slate-300">Kelas {cls.level}</TableCell>
                      <TableCell className="text-slate-300">{cls.homeroom}</TableCell>
                      <TableCell className="text-slate-300">{cls.students} Siswa</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(cls)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(cls.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={5} className="text-center text-slate-500 py-10">Tidak ada data kelas ditemukan.</TableCell></TableRow>
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
            <DialogTitle>{editingClass ? 'Edit Kelas' : 'Tambah Kelas'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Nama Kelas</Label>
              <Input className="col-span-3 bg-slate-950 border-white/10" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Tingkat</Label>
              <Select value={formData.level} onValueChange={(val) => setFormData({...formData, level: val})}>
                <SelectTrigger className="col-span-3 bg-slate-950 border-white/10"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="10">Kelas 10</SelectItem>
                  <SelectItem value="11">Kelas 11</SelectItem>
                  <SelectItem value="12">Kelas 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-400">Wali Kelas</Label>
              <Input className="col-span-3 bg-slate-950 border-white/10" value={formData.homeroom} onChange={(e) => setFormData({...formData, homeroom: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-slate-400">Batal</Button>
            <Button onClick={handleSaveClass} className="bg-blue-600 hover:bg-blue-500">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}