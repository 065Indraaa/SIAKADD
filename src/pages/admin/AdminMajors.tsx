import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Save } from 'lucide-react';

export default function AdminMajors() {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, name: 'Ahmad Fauzi', class: 'X-A', score: 88.5, interest: 'IPA', assigned: 'IPA' },
    { id: 2, name: 'Bela Safira', class: 'X-A', score: 82.0, interest: 'IPS', assigned: 'IPS' },
    { id: 3, name: 'Ciko Jeriko', class: 'X-B', score: 75.5, interest: 'IPA', assigned: 'IPS' },
    { id: 4, name: 'Dina Mariana', class: 'X-B', score: 91.0, interest: 'IPA', assigned: 'IPA' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Penjurusan Kelas 11</h2>
          <p className="text-slate-500">Proses penjurusan siswa kelas 10 ke kelas 11.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Siswa Kelas 10</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama siswa..."
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
                <TableHead>Kelas Asal</TableHead>
                <TableHead>Rata-rata Nilai</TableHead>
                <TableHead>Minat Siswa</TableHead>
                <TableHead>Penetapan Jurusan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.score}</TableCell>
                  <TableCell>{student.interest}</TableCell>
                  <TableCell>
                    <Select defaultValue={student.assigned}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Jurusan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IPA">Rumpun A (MIPA)</SelectItem>
                        <SelectItem value="IPS">Rumpun B (IPS)</SelectItem>
                        <SelectItem value="BAHASA">Rumpun C (Bahasa)</SelectItem>
                      </SelectContent>
                    </Select>
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
