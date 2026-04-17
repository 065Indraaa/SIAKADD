import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('siswa');
  const [tingkatFilter, setTingkatFilter] = useState('semua');
  const [jurusanFilter, setJurusanFilter] = useState('semua');

  const [users, setUsers] = useState([
    { id: 1, name: 'Budi Santoso', role: 'guru', email: 'budi@sma.sch.id', status: 'Aktif', nip: '198001012005011003', nisn: '', tingkat: '', jurusan: '', kelas: '' },
    { id: 2, name: 'Siti Aminah', role: 'guru', email: 'siti@sma.sch.id', status: 'Aktif', nip: '198203152008012001', nisn: '', tingkat: '', jurusan: '', kelas: '' },
    { id: 3, name: 'Ahmad Fauzi', role: 'siswa', email: 'ahmad@siswa.sma.sch.id', status: 'Aktif', nisn: '0051234567', nip: '', tingkat: '10', jurusan: 'IPA', kelas: 'X IPA 1' },
    { id: 4, name: 'Rina Lestari', role: 'siswa', email: 'rina@siswa.sma.sch.id', status: 'Aktif', nisn: '0057654321', nip: '', tingkat: '11', jurusan: 'IPS', kelas: 'XI IPS 2' },
    { id: 5, name: 'Dewi Saputri', role: 'siswa', email: 'dewi@siswa.sma.sch.id', status: 'Aktif', nisn: '0049876543', nip: '', tingkat: '12', jurusan: 'IPA', kelas: 'XII IPA 1' },
    { id: 6, name: 'Eko Prasetyo', role: 'admin', email: 'eko@sma.sch.id', status: 'Aktif', nip: '197508172000031002', nisn: '', tingkat: '', jurusan: '', kelas: '' },
  ]);

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Alert Dialog State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredUsers = users.filter(user => {
    if (roleFilter !== 'semua' && user.role !== roleFilter) return false;
    const searchLower = searchTerm.toLowerCase();
    if (searchTerm && !user.name.toLowerCase().includes(searchLower) && !user.email.toLowerCase().includes(searchLower)) return false;
    if (roleFilter === 'siswa') {
      if (tingkatFilter !== 'semua' && user.tingkat !== tingkatFilter) return false;
      if (jurusanFilter !== 'semua' && user.jurusan !== jurusanFilter) return false;
    }
    return true;
  });

  const handleOpenDialog = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        name: '', role: roleFilter === 'semua' ? 'siswa' : roleFilter, email: '', status: 'Aktif', nip: '', nisn: '', tingkat: '10', jurusan: 'IPA', kelas: 'X IPA 1'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: u.id } : u));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setIsDialogOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsAlertOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      setUsers(users.filter(u => u.id !== deletingId));
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Pengguna</h2>
          <p className="text-slate-500">Kelola akun dan data seluruh entitas sekolah.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Tambah {roleFilter === 'semua' ? 'Pengguna' : roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Tabs value={roleFilter} onValueChange={setRoleFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="semua">Semua</TabsTrigger>
                <TabsTrigger value="siswa">Siswa</TabsTrigger>
                <TabsTrigger value="guru">Guru</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-1 md:flex-none gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Cari nama atau email..."
                  className="pl-8 bg-slate-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {roleFilter === 'siswa' && (
            <div className="flex gap-4 mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Filter Siswa:</span>
              </div>
              <Select value={tingkatFilter} onValueChange={setTingkatFilter}>
                <SelectTrigger className="w-[150px] bg-white"><SelectValue placeholder="Semua Tingkat" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Tingkat</SelectItem>
                  <SelectItem value="10">Kelas 10</SelectItem>
                  <SelectItem value="11">Kelas 11</SelectItem>
                  <SelectItem value="12">Kelas 12</SelectItem>
                </SelectContent>
              </Select>
              <Select value={jurusanFilter} onValueChange={setJurusanFilter}>
                <SelectTrigger className="w-[150px] bg-white"><SelectValue placeholder="Semua Jurusan" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Jurusan</SelectItem>
                  <SelectItem value="IPA">IPA</SelectItem>
                  <SelectItem value="IPS">IPS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>Identitas</TableHead>
                  {roleFilter === 'siswa' && <TableHead>Kelas</TableHead>}
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        {roleFilter === 'semua' && <div className="text-xs text-slate-500 capitalize mt-0.5">{user.role}</div>}
                      </TableCell>
                      <TableCell className="text-slate-600">{user.role === 'siswa' ? `NISN: ${user.nisn}` : `NIP: ${user.nip}`}</TableCell>
                      {roleFilter === 'siswa' && (
                        <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{user.kelas}</Badge></TableCell>
                      )}
                      <TableCell className="text-slate-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Aktif' ? 'default' : 'secondary'} className={user.status === 'Aktif' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(user)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(user.id)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={roleFilter === 'siswa' ? 6 : 5} className="h-24 text-center text-slate-500">Tidak ada data pengguna.</TableCell>
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
            <DialogTitle>{editingUser ? 'Edit Pengguna' : 'Tambah Pengguna'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Peran</Label>
              <Select value={formData.role} onValueChange={(val) => setFormData({...formData, role: val})} disabled={!!editingUser}>
                <SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Peran" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="siswa">Siswa</SelectItem>
                  <SelectItem value="guru">Guru</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nama</Label>
              <Input className="col-span-3" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input className="col-span-3" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            
            {formData.role === 'siswa' ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">NISN</Label>
                  <Input className="col-span-3" value={formData.nisn} onChange={(e) => setFormData({...formData, nisn: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Kelas</Label>
                  <Input className="col-span-3" value={formData.kelas} placeholder="X IPA 1" onChange={(e) => setFormData({...formData, kelas: e.target.value})} />
                </div>
              </>
            ) : (
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">NIP</Label>
                  <Input className="col-span-3" value={formData.nip} onChange={(e) => setFormData({...formData, nip: e.target.value})} />
                </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                <SelectTrigger className="col-span-3"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSaveUser} className="bg-blue-600 hover:bg-blue-700">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog Delete */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data pengguna dari sistem secara permanen.
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
