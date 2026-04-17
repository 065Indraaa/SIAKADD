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

export default function AdminAlumni() {
  const [searchTerm, setSearchTerm] = useState('');

  const [alumni, setAlumni] = useState([
    { id: 1, name: 'Andi Saputra', year: 2023, status: 'Kuliah', institution: 'Universitas Indonesia', major: 'Teknik Informatika' },
    { id: 2, name: 'Bunga Citra', year: 2022, status: 'Kerja', institution: 'PT Telkom', major: 'Software Engineer' },
    { id: 3, name: 'Candra Wijaya', year: 2023, status: 'Kuliah', institution: 'ITB', major: 'Teknik Mesin' },
    { id: 4, name: 'Dina Mariana', year: 2021, status: 'Kerja', institution: 'Bank Mandiri', major: 'Teller' },
  ]);

  const filteredAlumni = alumni.filter(alum => 
    alum.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    alum.year.toString().includes(searchTerm)
  );

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Alert Dialog State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleOpenDialog = (alum: any = null) => {
    if (alum) {
      setEditingAlumni(alum);
      setFormData(alum);
    } else {
      setEditingAlumni(null);
      setFormData({
        name: '',
        year: new Date().getFullYear(),
        status: 'Kuliah',
        institution: '',
        major: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveAlumni = () => {
    if (editingAlumni) {
      setAlumni(alumni.map(a => a.id === editingAlumni.id ? { ...formData, id: a.id } : a));
    } else {
      setAlumni([...alumni, { ...formData, id: Date.now() }]);
    }
    setIsDialogOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsAlertOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      setAlumni(alumni.filter(a => a.id !== deletingId));
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Alumni</h2>
          <p className="text-slate-500">Kelola data alumni dan penelusuran lulusan.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Alumni
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
            <CardTitle>Daftar Alumni</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama atau tahun lulus..."
                className="pl-8 bg-slate-50"
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
                  <TableHead>Nama</TableHead>
                  <TableHead>Tahun Lulus</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Institusi/Perusahaan</TableHead>
                  <TableHead>Jurusan/Jabatan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlumni.length > 0 ? (
                  filteredAlumni.map((alum) => (
                    <TableRow key={alum.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-900">{alum.name}</TableCell>
                      <TableCell>{alum.year}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={alum.status === 'Kuliah' ? 'default' : 'secondary'}
                          className={alum.status === 'Kuliah' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : alum.status === 'Kerja' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-slate-100 text-slate-800'}
                        >
                          {alum.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{alum.institution}</TableCell>
                      <TableCell>{alum.major}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(alum)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(alum.id)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-slate-500">Tidak ada data alumni ditemukan.</TableCell>
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
            <DialogTitle>{editingAlumni ? 'Edit Alumni' : 'Tambah Alumni'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nama</Label>
              <Input className="col-span-3" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tahun</Label>
              <Input type="number" className="col-span-3" value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || new Date().getFullYear()})} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                <SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kuliah">Kuliah</SelectItem>
                  <SelectItem value="Kerja">Kerja</SelectItem>
                  <SelectItem value="Wirausaha">Wirausaha</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Institusi</Label>
              <Input className="col-span-3" value={formData.institution} placeholder="Nama Universitas / PT" onChange={(e) => setFormData({...formData, institution: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Jurusan / Posisi</Label>
              <Input className="col-span-3" value={formData.major} onChange={(e) => setFormData({...formData, major: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSaveAlumni} className="bg-blue-600 hover:bg-blue-700">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog Delete */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data alumni dari sistem.
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
