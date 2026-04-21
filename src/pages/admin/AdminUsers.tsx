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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
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
      setFormData({ name: '', role: roleFilter === 'semua' ? 'siswa' : roleFilter, email: '', status: 'Aktif', nip: '', nisn: '', tingkat: '10', jurusan: 'IPA', kelas: 'X IPA 1' });
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
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Manajemen Pengguna</h2>
          <p className="text-slate-400">Kelola akun dan data seluruh entitas sekolah.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
        </Button>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-4 border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Tabs value={roleFilter} onValueChange={setRoleFilter} className="w-full md:w-auto">
<TabsList className="bg-slate-950 border border-white/10">
  <TabsTrigger 
    value="semua" 
    className="text-slate-400 hover:text-white data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-colors"
  >
    Semua
  </TabsTrigger>
  <TabsTrigger 
    value="siswa" 
    className="text-slate-400 hover:text-white data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-colors"
  >
    Siswa
  </TabsTrigger>
  <TabsTrigger 
    value="guru" 
    className="text-slate-400 hover:text-white data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-colors"
  >
    Guru
  </TabsTrigger>
  <TabsTrigger 
    value="admin" 
    className="text-slate-400 hover:text-white data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-colors"
  >
    Admin
  </TabsTrigger>
</TabsList>
            </Tabs>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari..."
                className="pl-8 bg-slate-950 border-white/10 text-white placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {roleFilter === 'siswa' && (
            <div className="flex gap-4 mt-4 p-4 bg-slate-950/50 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-400">Filter:</span>
              </div>
              <Select value={tingkatFilter} onValueChange={setTingkatFilter}>
                <SelectTrigger className="w-[150px] bg-slate-900 border-white/10 text-white"><SelectValue placeholder="Tingkat" /></SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="semua" className="text-white hover:bg-slate-800 focus:bg-slate-800">Semua</SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-slate-800 focus:bg-slate-800">Kelas 10</SelectItem>
                  <SelectItem value="11" className="text-white hover:bg-slate-800 focus:bg-slate-800">Kelas 11</SelectItem>
                  <SelectItem value="12" className="text-white hover:bg-slate-800 focus:bg-slate-800">Kelas 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-6">
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-950/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">Nama Lengkap</TableHead>
                  <TableHead className="text-slate-400">Identitas</TableHead>
                  {roleFilter === 'siswa' && <TableHead className="text-slate-400">Kelas</TableHead>}
                  <TableHead className="text-slate-400">Email</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-slate-500 capitalize">{user.role}</div>
                      </TableCell>
                      <TableCell className="text-slate-300">{user.role === 'siswa' ? `NISN: ${user.nisn}` : `NIP: ${user.nip}`}</TableCell>
                      {roleFilter === 'siswa' && (
                        <TableCell><Badge className="bg-blue-600/20 text-blue-400 border-blue-500/20">{user.kelas}</Badge></TableCell>
                      )}
                      <TableCell className="text-slate-300">{user.email}</TableCell>
                      <TableCell>
                        <Badge className={user.status === 'Aktif' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(user)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"><Edit2 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(user.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="text-center text-slate-500 py-10">Tidak ada data.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Dialog & Alert Dialog logic (remains consistent with dark theme) */}
    </div>
  );
}