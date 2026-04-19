import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function GuruAchievements() {
  const [searchTerm, setSearchTerm] = useState('');

  const achievements = [
    { id: 1, student: 'Ahmad Fauzi', class: 'XI-IPA-1', name: 'Olimpiade Matematika Nasional', type: 'Akademik', level: 'Nasional', rank: 'Juara 1', date: '2024-08-15' },
    { id: 2, student: 'Dina Mariana', class: 'XI-IPA-1', name: 'Lomba Pidato Bahasa Inggris', type: 'Non-Akademik', level: 'Provinsi', rank: 'Juara 2', date: '2024-09-10' },
  ];

  const filteredAchievements = achievements.filter(
    (ach) =>
      ach.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ach.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Prestasi Siswa</h2>
          <p className="text-slate-400">Catat dan kelola prestasi akademik dan non-akademik siswa.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Tambah Prestasi
        </Button>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="text-white">Daftar Prestasi</CardTitle>
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
                  <TableHead className="text-slate-400">Nama Siswa</TableHead>
                  <TableHead className="text-slate-400">Kelas</TableHead>
                  <TableHead className="text-slate-400">Nama Prestasi</TableHead>
                  <TableHead className="text-slate-400">Jenis</TableHead>
                  <TableHead className="text-slate-400">Tingkat</TableHead>
                  <TableHead className="text-slate-400">Peringkat</TableHead>
                  <TableHead className="text-slate-400 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAchievements.length > 0 ? (
                  filteredAchievements.map((ach) => (
                    <TableRow key={ach.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-white">{ach.student}</TableCell>
                      <TableCell className="text-slate-300">{ach.class}</TableCell>
                      <TableCell className="text-slate-300">{ach.name}</TableCell>
                      <TableCell>
                        <Badge className={ach.type === 'Akademik' ? 'bg-blue-600/20 text-blue-400 border-blue-500/20' : 'bg-orange-600/20 text-orange-400 border-orange-500/20'}>
                          {ach.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{ach.level}</TableCell>
                      <TableCell className="text-slate-300">{ach.rank}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-slate-500">Tidak ada data prestasi.</TableCell>
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