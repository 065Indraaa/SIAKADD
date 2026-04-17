import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, MoreHorizontal, Filter } from 'lucide-react';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('siswa');
  const [tingkatFilter, setTingkatFilter] = useState('semua');
  const [jurusanFilter, setJurusanFilter] = useState('semua');

  const mockUsers = [
    { id: 1, name: 'Budi Santoso', role: 'guru', email: 'budi@sma.sch.id', status: 'Aktif', nip: '198001012005011003' },
    { id: 2, name: 'Siti Aminah', role: 'guru', email: 'siti@sma.sch.id', status: 'Aktif', nip: '198203152008012001' },
    { id: 3, name: 'Ahmad Fauzi', role: 'siswa', email: 'ahmad@siswa.sma.sch.id', status: 'Aktif', nisn: '0051234567', tingkat: '10', jurusan: 'IPA', kelas: 'X IPA 1' },
    { id: 4, name: 'Rina Lestari', role: 'siswa', email: 'rina@siswa.sma.sch.id', status: 'Aktif', nisn: '0057654321', tingkat: '11', jurusan: 'IPS', kelas: 'XI IPS 2' },
    { id: 5, name: 'Dewi Saputri', role: 'siswa', email: 'dewi@siswa.sma.sch.id', status: 'Aktif', nisn: '0049876543', tingkat: '12', jurusan: 'IPA', kelas: 'XII IPA 1' },
    { id: 6, name: 'Eko Prasetyo', role: 'admin', email: 'eko@sma.sch.id', status: 'Aktif', nip: '197508172000031002' },
  ];

  const filteredUsers = mockUsers.filter(user => {
    // 1. Role Filter
    if (roleFilter !== 'semua' && user.role !== roleFilter) return false;
    
    // 2. Search Filter
    const searchLower = searchTerm.toLowerCase();
    if (searchTerm && !user.name.toLowerCase().includes(searchLower) && !user.email.toLowerCase().includes(searchLower)) {
      return false;
    }

    // 3. Siswa Specific Filters
    if (roleFilter === 'siswa') {
      if (tingkatFilter !== 'semua' && user.tingkat !== tingkatFilter) return false;
      if (jurusanFilter !== 'semua' && user.jurusan !== jurusanFilter) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Pengguna</h2>
          <p className="text-slate-500">Kelola akun dan data seluruh entitas sekolah.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
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

          {/* Kolom Filter Tambahan Khusus Siswa */}
          {roleFilter === 'siswa' && (
            <div className="flex gap-4 mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Filter Siswa:</span>
              </div>
              <Select value={tingkatFilter} onValueChange={setTingkatFilter}>
                <SelectTrigger className="w-[150px] bg-white">
                  <SelectValue placeholder="Semua Tingkat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Tingkat</SelectItem>
                  <SelectItem value="10">Kelas 10</SelectItem>
                  <SelectItem value="11">Kelas 11</SelectItem>
                  <SelectItem value="12">Kelas 12</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={jurusanFilter} onValueChange={setJurusanFilter}>
                <SelectTrigger className="w-[150px] bg-white">
                  <SelectValue placeholder="Semua Jurusan" />
                </SelectTrigger>
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
                        {roleFilter === 'semua' && (
                          <div className="text-xs text-slate-500 capitalize mt-0.5">{user.role}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {user.role === 'siswa' ? `NISN: ${user.nisn}` : `NIP: ${user.nip}`}
                      </TableCell>
                      {roleFilter === 'siswa' && (
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {user.kelas}
                          </Badge>
                        </TableCell>
                      )}
                      <TableCell className="text-slate-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.status === 'Aktif' ? 'default' : 'secondary'}
                          className={user.status === 'Aktif' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-500">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={roleFilter === 'siswa' ? 6 : 5} className="h-24 text-center text-slate-500">
                      Tidak ada data pengguna yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
