import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SiswaSchedule() {
  const schedule = [
    { time: '07:00 - 07:45', mon: 'Upacara', tue: 'Matematika', wed: 'Fisika', thu: 'Kimia', fri: 'Senam' },
    { time: '07:45 - 08:30', mon: 'Agama', tue: 'Matematika', wed: 'Fisika', thu: 'Kimia', fri: 'B. Inggris' },
    { time: '08:30 - 09:15', mon: 'Agama', tue: 'B. Indonesia', wed: 'Biologi', thu: 'Sejarah', fri: 'B. Inggris' },
    { time: '09:15 - 09:45', mon: 'ISTIRAHAT', tue: 'ISTIRAHAT', wed: 'ISTIRAHAT', thu: 'ISTIRAHAT', fri: 'ISTIRAHAT' },
    { time: '09:45 - 10:30', mon: 'PPKn', tue: 'B. Indonesia', wed: 'Biologi', thu: 'Sejarah', fri: 'Seni Budaya' },
    { time: '10:30 - 11:15', mon: 'PPKn', tue: 'PJOK', wed: 'Matematika P.', thu: 'Prakarya', fri: 'Seni Budaya' },
    { time: '11:15 - 12:00', mon: 'B. Inggris', tue: 'PJOK', wed: 'Matematika P.', thu: 'Prakarya', fri: 'Pulang' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Jadwal Pelajaran</h2>
        <p className="text-slate-500">Jadwal mingguan kelas XI-IPA-1.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semester Ganjil 2024/2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Waktu</TableHead>
                  <TableHead>Senin</TableHead>
                  <TableHead>Selasa</TableHead>
                  <TableHead>Rabu</TableHead>
                  <TableHead>Kamis</TableHead>
                  <TableHead>Jumat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row, index) => (
                  <TableRow key={index} className={row.mon === 'ISTIRAHAT' ? 'bg-slate-100' : ''}>
                    <TableCell className="font-medium">{row.time}</TableCell>
                    <TableCell className={row.mon === 'ISTIRAHAT' ? 'text-center font-bold text-slate-500' : ''}>{row.mon}</TableCell>
                    <TableCell className={row.tue === 'ISTIRAHAT' ? 'text-center font-bold text-slate-500' : ''}>{row.tue}</TableCell>
                    <TableCell className={row.wed === 'ISTIRAHAT' ? 'text-center font-bold text-slate-500' : ''}>{row.wed}</TableCell>
                    <TableCell className={row.thu === 'ISTIRAHAT' ? 'text-center font-bold text-slate-500' : ''}>{row.thu}</TableCell>
                    <TableCell className={row.fri === 'ISTIRAHAT' ? 'text-center font-bold text-slate-500' : ''}>{row.fri}</TableCell>
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
