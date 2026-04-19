import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function SiswaGrades() {
  const grades = [
    { id: 1, subject: 'Pendidikan Agama', nh: 85, uts: 88, uas: 90, final: 88.3 },
    { id: 2, subject: 'PPKn', nh: 90, uts: 85, uas: 88, final: 87.7 },
    { id: 3, subject: 'Bahasa Indonesia', nh: 88, uts: 90, uas: 85, final: 87.4 },
    { id: 4, subject: 'Matematika Wajib', nh: 95, uts: 92, uas: 96, final: 94.5 },
    { id: 5, subject: 'Sejarah Indonesia', nh: 82, uts: 80, uas: 85, final: 82.6 },
    { id: 6, subject: 'Bahasa Inggris', nh: 88, uts: 92, uas: 90, final: 90.0 },
    { id: 7, subject: 'Seni Budaya', nh: 90, uts: 88, uas: 92, final: 90.2 },
    { id: 8, subject: 'PJOK', nh: 95, uts: 90, uas: 95, final: 93.5 },
    { id: 9, subject: 'Prakarya', nh: 85, uts: 88, uas: 90, final: 87.9 },
    { id: 10, subject: 'Matematika Peminatan', nh: 92, uts: 88, uas: 94, final: 91.6 },
    { id: 11, subject: 'Fisika', nh: 88, uts: 85, uas: 90, final: 87.9 },
    { id: 12, subject: 'Kimia', nh: 85, uts: 82, uas: 88, final: 85.3 },
    { id: 13, subject: 'Biologi', nh: 90, uts: 88, uas: 92, final: 90.2 },
  ];

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Nilai & Rapor</h2>
          <p className="text-slate-400">Lihat hasil evaluasi belajar Anda.</p>
        </div>
        <Button variant="outline" className="border-white/10 hover:bg-slate-800 text-black hover:text-gray-300" onClick={() => alert('Fitur unduh rapor belum tersedia')}>
          <Download className="mr-2 h-4 w-4" /> Unduh Rapor
        </Button>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-white">Rapor Semester</CardTitle>
            <div className="flex space-x-2">
              <Select defaultValue="2024-1">
                <SelectTrigger className="w-[180px] bg-slate-950 border-white/10 text-white">
                  <SelectValue placeholder="Pilih Semester" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="2024-1">2024/2025 - Ganjil</SelectItem>
                  <SelectItem value="2023-2">2023/2024 - Genap</SelectItem>
                  <SelectItem value="2023-1">2023/2024 - Ganjil</SelectItem>
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
                  <TableHead className="text-slate-400">Mata Pelajaran</TableHead>
                  <TableHead className="text-center text-slate-400">Nilai Harian</TableHead>
                  <TableHead className="text-center text-slate-400">UTS</TableHead>
                  <TableHead className="text-center text-slate-400">UAS</TableHead>
                  <TableHead className="text-right text-slate-400">Nilai Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-white">{grade.subject}</TableCell>
                    <TableCell className="text-center text-slate-200">{grade.nh}</TableCell>
                    <TableCell className="text-center text-slate-200">{grade.uts}</TableCell>
                    <TableCell className="text-center text-slate-200">{grade.uas}</TableCell>
                    <TableCell className="text-right font-bold text-blue-400">{grade.final}</TableCell>
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