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

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nis.includes(searchTerm)
  );

  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Data Siswa</h2>
        <p className="text-slate-400">Lihat profil siswa di kelas yang Anda ajar.</p>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px] bg-slate-950 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="XI-IPA-1" className="hover:bg-slate-800">XI-IPA-1</SelectItem>
                  <SelectItem value="XI-IPA-2" className="hover:bg-slate-800">XI-IPA-2</SelectItem>
                  <SelectItem value="XI-IPS-1" className="hover:bg-slate-800">XI-IPS-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari..."
                className="pl-8 bg-slate-950 border-white/10 text-white placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-950/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">NIS</TableHead>
                  <TableHead className="text-slate-400">Nama Siswa</TableHead>
                  <TableHead className="text-slate-400">L/P</TableHead>
                  <TableHead className="text-slate-400">No. Telepon</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="text-slate-300">{student.nis}</TableCell>
                      <TableCell className="font-medium text-white">{student.name}</TableCell>
                      <TableCell className="text-slate-300">{student.gender}</TableCell>
                      <TableCell className="text-slate-300">{student.phone}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-slate-500">Tidak ada data siswa ditemukan.</TableCell>
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