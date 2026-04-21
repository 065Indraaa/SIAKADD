import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Save, Loader2, RefreshCw, CheckCircle2, Info, BookOpen, Calculator, Sparkles } from 'lucide-react';
import { fetchKelas } from '@/lib/schoolService';
import { fetchSiswa } from '@/lib/userService';
import { upsertNilai } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';

interface SiswaGrade {
  siswaId: string;
  nis: string;
  name: string;
  nilaiHarian: number | string;
  nilaiUts: number | string;
  nilaiUas: number | string;
}

export default function GuruGrades() {
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [selectedKelasId, setSelectedKelasId] = useState('');
  const [students, setStudents] = useState<SiswaGrade[]>([]);
  const [semester, setSemester] = useState('Ganjil');
  const [tahunAjaran, setTahunAjaran] = useState('2024/2025');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadKelas = useCallback(async () => {
    try {
      const data = await fetchKelas();
      setKelasList(data);
      if (data.length > 0 && !selectedKelasId) setSelectedKelasId(data[0].id);
    } catch (e: any) { setError(e.message); }
  }, [selectedKelasId]);

  useEffect(() => { loadKelas(); }, [loadKelas]);

  const loadStudents = useCallback(async () => {
    if (!selectedKelasId || selectedKelasId === 'none') return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSiswa(selectedKelasId);
      setStudents(data.map(s => ({
        siswaId: s.siswaId || s.id,
        nis: s.nis || '',
        name: s.name,
        nilaiHarian: '',
        nilaiUts: '',
        nilaiUas: '',
      })));
    } catch (e: any) {
      setError(e.message || 'Gagal memuat siswa.');
    } finally {
      setLoading(false);
    }
  }, [selectedKelasId]);

  useEffect(() => { loadStudents(); }, [loadStudents]);

  const handleNilaiChange = (siswaId: string, field: keyof SiswaGrade, val: string) => {
    setStudents(prev => prev.map(s => s.siswaId === siswaId ? { ...s, [field]: val } : s));
  };

  const calculateFinal = (s: SiswaGrade) => {
    const nh = parseFloat(String(s.nilaiHarian)) || 0;
    const uts = parseFloat(String(s.nilaiUts)) || 0;
    const uas = parseFloat(String(s.nilaiUas)) || 0;
    if (!nh && !uts && !uas) return '0.0';
    return (nh * 0.3 + uts * 0.3 + uas * 0.4).toFixed(1);
  };

  const handleSave = async () => {
    if (!selectedKelasId) return;
    setSaving(true);
    setError(null);
    try {
      for (const s of students) {
        const nh = parseFloat(String(s.nilaiHarian)) || 0;
        const uts = parseFloat(String(s.nilaiUts)) || 0;
        const uas = parseFloat(String(s.nilaiUas)) || 0;
        if (nh === 0 && uts === 0 && uas === 0) continue;
        
        await upsertNilai(dataConnect, {
          siswaId: s.siswaId,
          kelasId: selectedKelasId,
          mataPelajaranId: '00000000-0000-0000-0000-000000000001',
          semester,
          tahunAjaran,
          nilaiHarian: nh,
          nilaiUts: uts,
          nilaiUas: uas,
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan nilai.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-10 bg-blue-600 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Academic Assessment</span>
           </div>
          <h2 className="text-4xl font-black tracking-tighter text-white font-heading underline decoration-blue-600/30 underline-offset-8">Input Nilai Siswa</h2>
          <p className="text-slate-400 font-medium mt-3">Kalkulasi nilai otomatis berbasis pembobotan kurikulum 2024.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <Button variant="outline" onClick={loadStudents} className="h-14 px-6 rounded-2xl border-white/5 bg-white/5 text-slate-300">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
           </Button>
           <Button onClick={handleSave} disabled={saving || students.length === 0} 
              className="bg-blue-600 hover:bg-blue-500 h-14 px-10 rounded-2xl font-black shadow-xl shadow-blue-600/20 text-white flex-1 md:flex-none transition-all active:scale-95">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : saved ? <><CheckCircle2 className="mr-2 h-5 w-5" /> Tersimpan!</> : <><Save className="mr-2 h-5 w-5" /> Simpan Perubahan</>}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="lg:col-span-1 bg-slate-900 shadow-2xl border-white/5 rounded-[2.5rem] p-8 space-y-8">
            <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                    <BookOpen className="h-3 w-3" /> Fokus Kelas
                  </Label>
                  <Select value={selectedKelasId} onValueChange={(v) => setSelectedKelasId(v ?? '')}>
                    <SelectTrigger className="h-14 bg-slate-950 border-white/5 rounded-2xl text-white font-bold">
                      <SelectValue placeholder="Pilih Kelas" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 rounded-2xl">
                      {kelasList.map(k => (
                        <SelectItem key={k.id} value={k.id} className="rounded-xl h-12">{k.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Periode Semester</Label>
                  <Select value={semester} onValueChange={(v) => setSemester(v ?? 'Ganjil')}>
                    <SelectTrigger className="h-14 bg-slate-950 border-white/5 rounded-2xl text-white font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 rounded-2xl">
                      <SelectItem value="Ganjil" className="rounded-xl h-12">Ganjil (1)</SelectItem>
                      <SelectItem value="Genap" className="rounded-xl h-12">Genap (2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-blue-600/5 border border-blue-500/10 space-y-4">
               <h4 className="text-white font-black text-sm flex items-center gap-2 italic"><Calculator className="h-4 w-4" /> Bobot Nilai</h4>
               <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="bg-slate-950 p-2 rounded-lg border border-white/5">Harian 30%</div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-white/5">UTS 30%</div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-white/5 col-span-2 text-center text-blue-400">UAS 40%</div>
               </div>
            </div>
         </Card>

         <Card className="lg:col-span-3 bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
                <CardTitle className="text-white font-heading font-black text-2xl">Ledger Nilai Siswa</CardTitle>
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                   <Sparkles className="h-5 w-5 text-blue-400" />
                </div>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                 <TableHeader className="bg-white/5 h-16">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="p-8 text-slate-500 font-black uppercase tracking-widest text-[10px]">Identitas Siswa</TableHead>
                      <TableHead className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Harian</TableHead>
                      <TableHead className="text-slate-500 font-black uppercase tracking-widest text-[10px]">UTS</TableHead>
                      <TableHead className="text-slate-500 font-black uppercase tracking-widest text-[10px]">UAS</TableHead>
                      <TableHead className="text-right text-slate-500 font-black uppercase tracking-widest text-[10px] pr-10">Akhir</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                   {loading ? (
                     <TableRow><TableCell colSpan={5} className="text-center py-40"><Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto" /></TableCell></TableRow>
                   ) : students.length > 0 ? students.map((s) => (
                     <TableRow key={s.siswaId} className="border-white/5 hover:bg-white/5 group transition-colors h-20">
                        <TableCell className="p-8">
                           <div className="flex items-center gap-4">
                              <div className="text-white font-black text-lg tracking-tight leading-none">{s.name}</div>
                              <Badge variant="outline" className="text-[10px] text-slate-500 bg-white/5 border-white/5">{s.nis}</Badge>
                           </div>
                        </TableCell>
                        <TableCell>
                           <Input type="number" className="w-20 h-12 bg-slate-950 border-white/10 rounded-xl text-center font-bold text-white focus:ring-blue-500/20"
                             value={s.nilaiHarian} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiHarian', e.target.value)} />
                        </TableCell>
                        <TableCell>
                           <Input type="number" className="w-20 h-12 bg-slate-950 border-white/10 rounded-xl text-center font-bold text-white focus:ring-blue-500/20"
                             value={s.nilaiUts} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiUts', e.target.value)} />
                        </TableCell>
                        <TableCell>
                           <Input type="number" className="w-20 h-12 bg-slate-950 border-white/10 rounded-xl text-center font-bold text-white focus:ring-blue-500/20"
                             value={s.nilaiUas} onChange={(e) => handleNilaiChange(s.siswaId, 'nilaiUas', e.target.value)} />
                        </TableCell>
                        <TableCell className="text-right pr-10">
                           <span className={`text-2xl font-black tracking-tighter ${parseFloat(calculateFinal(s)) >= 75 ? 'text-emerald-400' : 'text-amber-500'}`}>
                              {calculateFinal(s)}
                           </span>
                        </TableCell>
                     </TableRow>
                   )) : (
                     <TableRow><TableCell colSpan={5} className="text-center py-40 text-slate-600 font-bold uppercase tracking-widest text-xs">Pilih kelas untuk mulai penilaian</TableCell></TableRow>
                   )}
                 </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}