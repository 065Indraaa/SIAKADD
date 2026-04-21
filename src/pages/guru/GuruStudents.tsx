import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2, GraduationCap, Phone, MapPin, RefreshCw, User, Info, ArrowRightCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchSiswa, UserListItem } from '@/lib/userService';
import { fetchKelas } from '@/lib/schoolService';

export default function GuruStudents() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKelasId, setSelectedKelasId] = useState<string>('');
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [students, setStudents] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadKelas = useCallback(async () => {
    try {
      const data = await fetchKelas();
      setKelasList(data);
      if (data.length > 0 && !selectedKelasId) {
        setSelectedKelasId(data[0].id);
      }
    } catch (e: any) {
      setError(e.message);
    }
  }, [selectedKelasId]);

  useEffect(() => { loadKelas(); }, [loadKelas]);

  const loadStudents = useCallback(async () => {
    if (!selectedKelasId || selectedKelasId === 'none') return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSiswa(selectedKelasId);
      setStudents(data);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat data siswa.');
    } finally {
      setLoading(false);
    }
  }, [selectedKelasId]);

  useEffect(() => { loadStudents(); }, [loadStudents]);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.nis || '').includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white font-heading italic">Monitoring Siswa</h2>
          <p className="text-slate-400 font-medium">Informasi mendalam mengenai profil dan data administratif peserta didik.</p>
        </div>
        <Button variant="outline" onClick={loadStudents} disabled={loading}
          className="h-12 border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 rounded-2xl active:scale-95 transition-all">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Sinkronkan
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-900/20 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
          <Info className="h-5 w-5" /> {error}
        </div>
      )}

      <Card className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 border-b border-white/5">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="space-y-2 w-full sm:w-60">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ml-1">Fokus Ruang Kelas</label>
                <Select value={selectedKelasId} onValueChange={(v) => setSelectedKelasId(v ?? '')}>
                  <SelectTrigger className="h-14 bg-slate-950 border-white/5 rounded-2xl text-white font-bold text-lg">
                    <SelectValue placeholder="Pilih kelas..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl shadow-2xl">
                    {kelasList.map(k => (
                      <SelectItem key={k.id} value={k.id} className="focus:bg-slate-800 rounded-xl h-12">
                         {k.name} <span className="text-slate-500 text-xs ml-1 font-normal opacity-50">{k.level}</span>
                      </SelectItem>
                    ))}
                    {kelasList.length === 0 && (
                      <SelectItem value="none" disabled className="text-slate-500">Belum ada kelas</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              {selectedKelasId && (
                <div className="flex gap-2">
                   <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/10 h-14 px-6 rounded-2xl flex flex-col items-start justify-center gap-0">
                      <span className="text-[10px] uppercase font-bold opacity-60">Total</span>
                      <span className="text-xl font-black leading-none">{students.length}</span>
                   </Badge>
                </div>
              )}
            </div>
            
            <div className="relative w-full lg:w-96 flex items-end">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input placeholder="Cari nama atau NIS siswa..."
                  className="pl-12 h-14 bg-slate-950/50 border-white/5 rounded-2xl text-white placeholder:text-slate-600 font-medium"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/5">
              <TableRow className="border-white/5 hover:bg-transparent h-16">
                <TableHead className="p-8 text-slate-500 font-bold uppercase tracking-wider text-[11px]">Identitas Siswa</TableHead>
                <TableHead className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Nomor Induk (NIS)</TableHead>
                <TableHead className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Informasi Kontak</TableHead>
                <TableHead className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Status</TableHead>
                <TableHead className="text-right text-slate-500 font-bold uppercase tracking-wider text-[11px] pr-10">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-40">
                  <div className="relative h-12 w-12 mx-auto">
                     <Loader2 className="h-12 w-12 animate-spin text-blue-500 absolute" />
                     <div className="h-12 w-12 rounded-full border-4 border-white/5"></div>
                  </div>
                  <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Sinkronisasi Identitas...</p>
                </TableCell></TableRow>
              ) : filtered.length > 0 ? filtered.map((s) => (
                <TableRow key={s.id} className="border-white/5 hover:bg-white/5 group transition-all duration-300">
                  <TableCell className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center font-black text-xl text-blue-400 group-hover:scale-110 transition-transform">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-xl text-white tracking-tight leading-tight">{s.name}</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 flex items-center gap-2">
                           <User className="h-3 w-3" /> {s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-sm px-4 py-1.5 bg-blue-400/5 text-blue-400 border-blue-400/10 rounded-xl">
                      {s.nis}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                       <div className="text-white font-medium flex items-center gap-2"><Phone className="h-3 w-3 text-slate-500" /> {s.phone || '-'}</div>
                       <div className="text-slate-500 text-xs truncate max-w-[200px] flex items-center gap-2"><MapPin className="h-3 w-3" /> {s.address || '-'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400">Sis Aktif</span>
                     </div>
                  </TableCell>
                  <TableCell className="text-right pr-10">
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRightCircle className="h-6 w-6" />
                     </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={5} className="text-center py-40">
                  <div className="h-24 w-24 bg-slate-950/50 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-6 opacity-20 grayscale">🎓</div>
                  <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Akses Terbatas • Tidak ada siswa ditemukan</p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}