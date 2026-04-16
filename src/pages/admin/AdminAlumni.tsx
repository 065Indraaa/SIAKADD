import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function AdminAlumni() {
  const [searchTerm, setSearchTerm] = useState('');

  const alumni = [
    { id: 1, name: 'Andi Saputra', year: 2023, status: 'Kuliah', institution: 'Universitas Indonesia', major: 'Teknik Informatika' },
    { id: 2, name: 'Bunga Citra', year: 2022, status: 'Kerja', institution: 'PT Telkom', major: 'Software Engineer' },
    { id: 3, name: 'Candra Wijaya', year: 2023, status: 'Kuliah', institution: 'ITB', major: 'Teknik Mesin' },
    { id: 4, name: 'Dina Mariana', year: 2021, status: 'Kerja', institution: 'Bank Mandiri', major: 'Teller' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Alumni</h2>
          <p className="text-slate-500">Kelola data alumni dan penelusuran lulusan.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Alumni
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Alumni</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama atau tahun lulus..."
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
                <TableHead>Tahun Lulus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Institusi/Perusahaan</TableHead>
                <TableHead>Jurusan/Jabatan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alumni.map((alum) => (
                <TableRow key={alum.id}>
                  <TableCell className="font-medium">{alum.name}</TableCell>
                  <TableCell>{alum.year}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={alum.status === 'Kuliah' ? 'default' : 'secondary'}
                      className={alum.status === 'Kuliah' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 'bg-green-100 text-green-800 hover:bg-green-100'}
                    >
                      {alum.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{alum.institution}</TableCell>
                  <TableCell>{alum.major}</TableCell>
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
