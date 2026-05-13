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
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Jadwal Pelajaran
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Jadwal mingguan kelas XI-IPA-1.</p>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm dark:bg-slate-900/50 dark:backdrop-blur-md dark:border-white/10 dark:shadow-xl">
        <CardHeader className="border-b border-slate-200 dark:border-white/5">
          <CardTitle className="text-slate-900 dark:text-white">Semester Ganjil 2024/2025</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 hover:bg-transparent dark:border-white/10">
                  <TableHead className="text-slate-500 dark:text-slate-400 w-[150px]">Waktu</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Senin</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Selasa</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Rabu</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Kamis</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center">Jumat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row, index) => (
                  <TableRow
                    key={index}
                    className={`border-slate-100 dark:border-white/5 ${
                      row.mon === 'ISTIRAHAT'
                        ? 'bg-slate-100/80 dark:bg-slate-800/30'
                        : 'hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <TableCell className="font-medium text-slate-600 dark:text-slate-300">
                      {row.time}
                    </TableCell>

                    {row.mon === 'ISTIRAHAT' ? (
                      <TableCell
                        colSpan={5}
                        className="text-center font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest"
                      >
                        ISTIRAHAT
                      </TableCell>
                    ) : (
                      <>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.mon}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.tue}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.wed}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.thu}</TableCell>
                        <TableCell className="text-center text-slate-700 dark:text-slate-200">{row.fri}</TableCell>
                      </>
                    )}
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