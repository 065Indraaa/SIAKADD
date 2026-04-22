import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, Search, Filter, Sparkles, FileText, TrendingUp } from 'lucide-react';

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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter text-white font-heading leading-none">
            Nilai & Rapor
          </h2>
          <p className="text-slate-400 font-medium mt-4 text-lg max-w-xl">
            Pantau progres akademik Anda secara real-time. Data diperbarui secara otomatis oleh sistem.
          </p>
        </div>

        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl px-6 py-6 h-auto font-bold shadow-xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
          onClick={() => alert('Fitur unduh rapor sedang disiapkan...')}
        >
          <Download className="mr-2 h-5 w-5" /> Unduh Rapor PDF
        </Button>
      </div>

      <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-white font-heading font-black text-2xl italic leading-none">Rincian Semester</CardTitle>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Transkrip Nilai Akademik</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select defaultValue="2024-1">
                <SelectTrigger className="w-full sm:w-[220px] bg-slate-950/50 border-white/10 text-white rounded-2xl h-12 font-bold focus:ring-blue-600">
                  <SelectValue placeholder="Pilih Semester" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl overflow-hidden">
                  <SelectItem value="2024-1" className="focus:bg-blue-600">2024/2025 • Ganjil</SelectItem>
                  <SelectItem value="2023-2" className="focus:bg-blue-600">2023/2024 • Genap</SelectItem>
                  <SelectItem value="2023-1" className="focus:bg-blue-600">2023/2024 • Ganjil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/20">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="py-6 px-8 text-slate-500 font-black uppercase tracking-widest text-[10px]">Mata Pelajaran</TableHead>
                  <TableHead className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">Harian</TableHead>
                  <TableHead className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">UTS</TableHead>
                  <TableHead className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px]">UAS</TableHead>
                  <TableHead className="text-right pr-8 text-slate-500 font-black uppercase tracking-widest text-[10px]">Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade, idx) => (
                  <TableRow key={grade.id} className="border-white/5 hover:bg-white/[0.03] transition-all group">
                    <TableCell className="py-5 px-8">
                      <p className="font-black text-white text-lg tracking-tight group-hover:translate-x-1 transition-transform">{grade.subject}</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Kategori Umum</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-bold text-slate-300 text-lg">{grade.nh}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-bold text-slate-300 text-lg">{grade.uts}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-bold text-slate-300 text-lg">{grade.uas}</span>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="inline-flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${grade.final >= 80 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}></div>
                        <span className={`text-2xl font-black tracking-tighter ${grade.final >= 80 ? 'text-emerald-400' : 'text-blue-400'}`}>
                          {grade.final.toFixed(1)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-8 bg-white/[0.01] border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rata-rata IPK</p>
                <p className="text-3xl font-black text-white tracking-tighter">88.52 <span className="text-sm font-bold text-emerald-500 uppercase ml-2 tracking-widest">Excellent</span></p>
              </div>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 w-${i === 1 ? '8' : '2'} rounded-full bg-blue-600${i > 1 ? '/20' : ''}`}></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
