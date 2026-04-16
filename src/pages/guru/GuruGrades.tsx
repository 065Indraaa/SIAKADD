import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';

export default function GuruGrades() {
  const [selectedClass, setSelectedClass] = useState('XI-IPA-1');
  const [selectedSubject, setSelectedSubject] = useState('Matematika');

  const students = [
    { id: 1, name: 'Ahmad Fauzi', nis: '1001', nh: 85, uts: 80, uas: 88 },
    { id: 2, name: 'Bela Safira', nis: '1002', nh: 90, uts: 85, uas: 92 },
    { id: 3, name: 'Ciko Jeriko', nis: '1003', nh: 78, uts: 75, uas: 80 },
    { id: 4, name: 'Dina Mariana', nis: '1004', nh: 95, uts: 92, uas: 96 },
  ];

  const calculateFinal = (nh: number, uts: number, uas: number) => {
    return (nh * 0.3 + uts * 0.3 + uas * 0.4).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Input Nilai</h2>
          <p className="text-slate-500">Masukkan nilai harian, UTS, dan UAS siswa.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" /> Simpan Nilai
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 w-full sm:w-48">
              <label className="text-sm font-medium">Pilih Kelas</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XI-IPA-1">XI-IPA-1</SelectItem>
                  <SelectItem value="XI-IPA-2">XI-IPA-2</SelectItem>
                  <SelectItem value="XI-IPS-1">XI-IPS-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full sm:w-48">
              <label className="text-sm font-medium">Mata Pelajaran</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Mapel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Matematika">Matematika Wajib</SelectItem>
                  <SelectItem value="Fisika">Fisika</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIS</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead className="w-24">Nilai Harian</TableHead>
                <TableHead className="w-24">UTS</TableHead>
                <TableHead className="w-24">UAS</TableHead>
                <TableHead className="text-right">Nilai Akhir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nis}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={student.nh} className="w-20" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={student.uts} className="w-20" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={student.uas} className="w-20" />
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {calculateFinal(student.nh, student.uts, student.uas)}
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
