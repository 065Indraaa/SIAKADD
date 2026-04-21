import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Save, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminMajors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmad Fauzi', class: 'X-A', score: 88.5, interest: 'IPA', assigned: 'IPA' },
    { id: 2, name: 'Bela Safira', class: 'X-A', score: 82.0, interest: 'IPS', assigned: 'IPS' },
    { id: 3, name: 'Ciko Jeriko', class: 'X-B', score: 75.5, interest: 'IPA', assigned: 'IPS' },
    { id: 4, name: 'Dina Mariana', class: 'X-B', score: 91.0, interest: 'IPA', assigned: 'IPA' },
  ]);

  const handleAssignmentChange = (id: number, newAssignment: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, assigned: newAssignment } : s));
    setIsSaved(false);
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = () => {
    setTimeout(() => {
      setIsSaved(true);
    }, 500);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Penjurusan Kelas 11</h2>
          <p className="text-slate-400">Proses penetapan jurusan untuk siswa yang naik ke kelas 11.</p>
        </div>
        <div className="flex items-center gap-3">
          {isSaved && (
            <Badge variant="outline" className="bg-emerald-600/20 text-emerald-400 border-emerald-500/20">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Tersimpan
            </Badge>
          )}
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="text-white">Daftar Calon Siswa Kelas 11</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama siswa..."
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
                  <TableHead className="text-slate-400">Kelas Asal</TableHead>
                  <TableHead className="text-slate-400 text-center">Rata-rata Nilai</TableHead>
                  <TableHead className="text-slate-400 text-center">Minat Siswa</TableHead>
                  <TableHead className="text-slate-400">Penetapan Jurusan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-white">{student.name}</TableCell>
                      <TableCell className="text-slate-300">{student.class}</TableCell>
                      <TableCell className="text-center font-medium text-slate-200">{student.score}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={student.interest === 'IPA' ? 'bg-blue-600/20 text-blue-400 border-blue-500/20' : 'bg-orange-600/20 text-orange-400 border-orange-500/20'}>
                          {student.interest}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select value={student.assigned} onValueChange={(val) => handleAssignmentChange(student.id, val)}>
                          {/* Tambahkan text-white di sini agar teks terpilih berwarna putih */}
                          <SelectTrigger className={`w-[180px] bg-slate-950 border-white/10 text-white ${student.assigned !== student.interest ? 'border-amber-500/50' : ''}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10 text-white">
                            <SelectItem value="IPA" className="text-white hover:bg-slate-800 focus:bg-slate-800 focus:text-white">Rumpun A (MIPA)</SelectItem>
                            <SelectItem value="IPS" className="text-white hover:bg-slate-800 focus:bg-slate-800 focus:text-white">Rumpun B (IPS)</SelectItem>
                            <SelectItem value="BAHASA" className="text-white hover:bg-slate-800 focus:bg-slate-800 focus:text-white">Rumpun C (Bahasa)</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">Tidak ada siswa ditemukan.</TableCell>
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