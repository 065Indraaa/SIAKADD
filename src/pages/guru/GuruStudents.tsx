import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { LookupSelect } from '@/components/ui/lookup-select';
import { Search, Loader2, Phone, MapPin, RefreshCw, User, Info, Users } from 'lucide-react';
import { fetchSiswa, UserListItem } from '@/lib/userService';
import { fetchKelas } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

export default function GuruStudents() {
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
    if (!selectedKelasId) return;
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

  useAutoRefresh(loadStudents, 20_000);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.nis || '').includes(searchTerm)
  );

  const kelasItems = kelasList.map(k => ({ value: k.id, label: k.name, hint: `Kelas ${k.level}` }));
  const currentKelas = kelasList.find(k => k.id === selectedKelasId);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Data Siswa</h2>
          <p className="text-slate-300 mt-1">Monitoring profil dan kontak peserta didik per kelas.</p>
        </div>
        <Button variant="outline" onClick={loadStudents} disabled={loading}
          className="h-11 border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 rounded-xl">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Segarkan
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
          <Info className="h-5 w-5" /> {error}
        </div>
      )}

      {/* Filter */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Kelas</Label>
              <LookupSelect
                value={selectedKelasId}
                onChange={setSelectedKelasId}
                items={kelasItems}
                placeholder={kelasItems.length ? 'Pilih kelas' : 'Memuat...'}
                className="h-11 bg-slate-950 border-white/10 rounded-lg text-white"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Cari Siswa</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Cari nama atau NIS..."
                  className="pl-10 h-11 bg-slate-950 border-white/10 rounded-lg text-white placeholder:text-slate-400"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-white/10">
          <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            {currentKelas?.name || 'Pilih kelas'}
            <Badge className="ml-auto bg-blue-500/10 text-blue-300 border-blue-500/30">
              {filtered.length} siswa
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 pl-6">Nama & NIS</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4">Gender</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4">Kontak</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4">Alamat</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : filtered.length > 0 ? filtered.map((s) => (
                <TableRow key={s.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm">
                        {s.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{s.name}</div>
                        <div className="text-xs text-slate-400 font-mono">NIS {s.nis || '-'}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-medium ${
                      s.gender === 'L' ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-pink-500/10 text-pink-300 border-pink-500/30'
                    }`}>
                      {s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-200">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {s.phone || <span className="text-slate-500 italic">-</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1.5 text-sm text-slate-200 max-w-xs">
                      <MapPin className="h-3 w-3 text-slate-400 mt-1 flex-shrink-0" />
                      <span className="line-clamp-2">{s.address || <span className="text-slate-500 italic">-</span>}</span>
                    </div>
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-400">Aktif</span>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={5} className="h-32 text-center">
                  <User className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-300 font-semibold">Tidak ada siswa ditemukan</p>
                  <p className="text-sm text-slate-400">Pilih kelas lain atau ubah kata kunci pencarian.</p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
