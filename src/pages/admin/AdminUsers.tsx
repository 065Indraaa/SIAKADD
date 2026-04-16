import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Budi Santoso', role: 'Guru', email: 'budi@sma.sch.id', status: 'Aktif' },
    { id: 2, name: 'Siti Aminah', role: 'Guru', email: 'siti@sma.sch.id', status: 'Pending' },
    { id: 3, name: 'Ahmad Fauzi', role: 'Siswa', email: 'ahmad@siswa.sma.sch.id', status: 'Aktif' },
    { id: 4, name: 'Rina Lestari', role: 'Siswa', email: 'rina@siswa.sma.sch.id', status: 'Nonaktif' },
    { id: 5, name: 'Eko Prasetyo', role: 'Admin', email: 'eko@sma.sch.id', status: 'Aktif' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Pengguna</h2>
          <p className="text-slate-500">Kelola akun guru, siswa, dan admin.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Pengguna</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama atau email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'Aktif' ? 'default' : user.status === 'Pending' ? 'secondary' : 'destructive'}
                      className={user.status === 'Aktif' ? 'bg-green-100 text-green-800 hover:bg-green-100' : user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
