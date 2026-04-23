import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Save, CheckCircle2, MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { fetchSiswa, updateSiswaData } from '@/lib/userService';
import { fetchJurusan } from '@/lib/schoolService';
import { Loader2, RefreshCw } from 'lucide-react';

export default function AdminPenjuruan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [students, setStudents] = useState<any[]>([]);
  const [jurusans, setJurusans] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const siswaData = await fetchSiswa();
      // Filter only 10th or 11th graders or just everyone for the demo
      setStudents(siswaData.map(s => ({ 
        ...s, 
        assigned: (s as any).jurusanId || '',
        peminatanName: (s as any).peminatanName 
      })));
      const data = await fetchJurusan();
      setJurusans(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleAssignmentChange = (id: string, newAssignment: string) => {
    setStudents(students.map(s => s.siswaId === id ? { ...s, assigned: newAssignment } : s));
    setIsSaved(false);
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const student of students) {
        if (student.assigned !== student.jurusanId) {
          await updateSiswaData(student.id, student.siswaId, {
            majorId: student.assigned || undefined
          });
        }
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      await loadData();
    } catch (e) {
      console.error(e);
      alert("Gagal menyimpan penjurusan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Penjuruan Siswa</h2>
          <p className="text-slate-400">Proses penetapan jurusan resmi untuk siswa.</p>
        </div>
        <div className="flex items-center gap-3">
          {isSaved && (
            <Badge variant="outline" className="bg-emerald-600/20 text-emerald-400 border-emerald-500/20">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Tersimpan
            </Badge>
          )}
          <Button variant="outline" onClick={loadData} className="bg-white/5 border-white/10">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Simpan Perubahan
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="text-white">Daftar Siswa & Peminatan</CardTitle>
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
                  <TableHead className="text-slate-400">Kelas</TableHead>
                  <TableHead className="text-slate-400 text-center">Pilihan Siswa</TableHead>
                  <TableHead className="text-slate-400">Penetapan Jurusan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
                ) : filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.siswaId} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-white">{student.name}</TableCell>
                      <TableCell className="text-slate-300">{student.className || 'Belum ada kelas'}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={student.peminatanName ? "bg-blue-600/20 text-blue-400 border-blue-500/20" : "bg-slate-800 text-slate-400 border-white/10"}>
                          {student.peminatanName || 'Belum Memilih'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select value={student.assigned} onValueChange={(val) => handleAssignmentChange(student.siswaId, val === 'none' ? '' : val)}>
                          <SelectTrigger className={`w-[180px] bg-slate-950 border-white/10 text-white ${student.assigned !== student.jurusanId ? 'border-amber-500/50' : ''}`}>
                            <SelectValue placeholder="Pilih Jurusan" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10 text-white">
                            <SelectItem value="none" className="text-slate-400">Tidak ada (Umum)</SelectItem>
                            {jurusans.map(j => (
                              <SelectItem key={j.id} value={j.id} className="text-white hover:bg-slate-800 focus:bg-slate-800 focus:text-white">{j.nama}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-slate-500">Tidak ada siswa ditemukan.</TableCell>
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
