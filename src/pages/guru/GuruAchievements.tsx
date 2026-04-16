import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function GuruAchievements() {
  const [searchTerm, setSearchTerm] = useState('');

  const achievements = [
    { id: 1, student: 'Ahmad Fauzi', class: 'XI-IPA-1', name: 'Olimpiade Matematika Nasional', type: 'Akademik', level: 'Nasional', rank: 'Juara 1', date: '2024-08-15' },
    { id: 2, student: 'Dina Mariana', class: 'XI-IPA-1', name: 'Lomba Pidato Bahasa Inggris', type: 'Non-Akademik', level: 'Provinsi', rank: 'Juara 2', date: '2024-09-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Prestasi Siswa</h2>
          <p className="text-slate-500">Catat dan kelola prestasi akademik dan non-akademik siswa.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Prestasi
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Prestasi</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama siswa atau prestasi..."
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
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Nama Prestasi</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tingkat</TableHead>
                <TableHead>Peringkat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((ach) => (
                <TableRow key={ach.id}>
                  <TableCell className="font-medium">{ach.student}</TableCell>
                  <TableCell>{ach.class}</TableCell>
                  <TableCell>{ach.name}</TableCell>
                  <TableCell>
                    <Badge variant={ach.type === 'Akademik' ? 'default' : 'secondary'}>
                      {ach.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{ach.level}</TableCell>
                  <TableCell>{ach.rank}</TableCell>
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
