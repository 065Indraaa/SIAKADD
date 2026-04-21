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

  // Contoh data (Dalam implementasi asli, ini nanti akan berupa state agar perhitungan real-time bisa jalan)
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
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Input Nilai</h2>
          <p className="text-slate-400">Masukkan nilai harian, UTS, dan UAS siswa.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Save className="mr-2 h-4 w-4" /> Simpan Nilai
        </Button>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-1 w-full sm:w-48">
              <label className="text-sm font-medium text-slate-400">Pilih Kelas</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="bg-slate-950 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="XI-IPA-1" className="hover:bg-slate-800">XI-IPA-1</SelectItem>
                  <SelectItem value="XI-IPA-2" className="hover:bg-slate-800">XI-IPA-2</SelectItem>
                  <SelectItem value="XI-IPS-1" className="hover:bg-slate-800">XI-IPS-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 w-full sm:w-48">
              <label className="text-sm font-medium text-slate-400">Mata Pelajaran</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-slate-950 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="Matematika" className="hover:bg-slate-800">Matematika Wajib</SelectItem>
                  <SelectItem value="Fisika" className="hover:bg-slate-800">Fisika</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead className="text-slate-400 w-24">Nilai Harian</TableHead>
                  <TableHead className="text-slate-400 w-24">UTS</TableHead>
                  <TableHead className="text-slate-400 w-24">UAS</TableHead>
                  <TableHead className="text-slate-400 text-right">Nilai Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="text-slate-300">{student.nis}</TableCell>
                    <TableCell className="font-medium text-white">{student.name}</TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={student.nh} className="w-20 bg-slate-950 border-white/10 text-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={student.uts} className="w-20 bg-slate-950 border-white/10 text-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue={student.uas} className="w-20 bg-slate-950 border-white/10 text-white" />
                    </TableCell>
                    <TableCell className="text-right font-bold text-blue-400">
                      {calculateFinal(student.nh, student.uts, student.uas)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}