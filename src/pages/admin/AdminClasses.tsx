import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function AdminClasses() {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    { id: 1, name: 'X-A', level: '10', homeroom: 'Budi Santoso', students: 32 },
    { id: 2, name: 'X-B', level: '10', homeroom: 'Siti Aminah', students: 30 },
    { id: 3, name: 'XI-IPA-1', level: '11', homeroom: 'Agus Setiawan', students: 34 },
    { id: 4, name: 'XI-IPS-1', level: '11', homeroom: 'Rini Wulandari', students: 31 },
    { id: 5, name: 'XII-IPA-1', level: '12', homeroom: 'Joko Widodo', students: 35 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Kelas</h2>
          <p className="text-slate-500">Kelola data kelas dan wali kelas.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Kelas
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Kelas</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari kelas..."
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
                <TableHead>Nama Kelas</TableHead>
                <TableHead>Tingkat</TableHead>
                <TableHead>Wali Kelas</TableHead>
                <TableHead>Jumlah Siswa</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>Kelas {cls.level}</TableCell>
                  <TableCell>{cls.homeroom}</TableCell>
                  <TableCell>{cls.students} Siswa</TableCell>
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
