import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function GuruStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('XI-IPA-1');

  const students = [
    { id: 1, name: 'Ahmad Fauzi', nis: '1001', gender: 'L', phone: '081234567890' },
    { id: 2, name: 'Bela Safira', nis: '1002', gender: 'P', phone: '081234567891' },
    { id: 3, name: 'Ciko Jeriko', nis: '1003', gender: 'L', phone: '081234567892' },
    { id: 4, name: 'Dina Mariana', nis: '1004', gender: 'P', phone: '081234567893' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Siswa</h2>
        <p className="text-slate-500">Lihat profil siswa di kelas yang Anda ajar.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XI-IPA-1">XI-IPA-1</SelectItem>
                  <SelectItem value="XI-IPA-2">XI-IPA-2</SelectItem>
                  <SelectItem value="XI-IPS-1">XI-IPS-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama atau NIS..."
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
                <TableHead>NIS</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>L/P</TableHead>
                <TableHead>No. Telepon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nis}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
