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
    // Di sini seharusnya memanggil API
    setTimeout(() => {
      setIsSaved(true);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Penjurusan Kelas 11</h2>
          <p className="text-slate-500">Proses penetapan jurusan untuk siswa yang naik ke kelas 11.</p>
        </div>
        <div className="flex items-center gap-3">
          {isSaved && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle2 className="mr-1 h-3 w-3"/> Tersimpan</Badge>}
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle>Daftar Calon Siswa Kelas 11</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama siswa..."
                className="pl-8 bg-slate-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas Asal</TableHead>
                  <TableHead className="text-center">Rata-rata Nilai</TableHead>
                  <TableHead className="text-center">Minat Siswa</TableHead>
                  <TableHead>Penetapan Jurusan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                      <TableCell className="text-slate-600">{student.class}</TableCell>
                      <TableCell className="text-center font-medium">{student.score}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={student.interest === 'IPA' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}>
                          {student.interest}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select value={student.assigned} onValueChange={(val) => handleAssignmentChange(student.id, val)}>
                          <SelectTrigger className={`w-[180px] bg-white ${student.assigned !== student.interest ? 'border-amber-400 focus:ring-amber-400' : ''}`}>
                            <SelectValue placeholder="Pilih Jurusan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IPA">Rumpun A (MIPA)</SelectItem>
                            <SelectItem value="IPS">Rumpun B (IPS)</SelectItem>
                            <SelectItem value="BAHASA">Rumpun C (Bahasa)</SelectItem>
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
