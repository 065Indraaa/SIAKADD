import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LookupSelect } from '@/components/ui/lookup-select';
import { Plus, Trash2, Loader2, RefreshCw, Calendar, Clock, MapPin, BookOpen, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { fetchKelas, fetchJadwalKelas, addJadwalData, removeJadwalData, fetchMataPelajaran } from '@/lib/schoolService';
import { fetchGuru } from '@/lib/userService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';

const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const SEMESTER = ['Ganjil', 'Genap'];

function generateTahunAjaran(): string {
  const now = new Date();
  const y = now.getFullYear();
  // Semester Ganjil: Juli-Desember, Genap: Januari-Juni
  return now.getMonth() >= 6 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}

export default function AdminSchedules() {
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [guruList, setGuruList] = useState<any[]>([]);
  const [mapelList, setMapelList] = useState<any[]>([]);
  const [kelasFilter, setKelasFilter] = useState('');
  const [hariFilter, setHariFilter] = useState<'semua' | string>('semua');
  const [semesterFilter, setSemesterFilter] = useState('Ganjil');
  const [tahunAjaran, setTahunAjaran] = useState(generateTahunAjaran());

  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadMetadata = useCallback(async () => {
    try {
      const [kelasData, guruData, mapelData] = await Promise.all([
        fetchKelas(), fetchGuru(), fetchMataPelajaran(),
      ]);
      setKelasList(kelasData);
      setGuruList(guruData);
      setMapelList(mapelData);
      if (kelasData.length > 0 && !kelasFilter) {
        setKelasFilter(kelasData[0].id);
      }
    } catch (e: any) {
      setError(e.message || 'Gagal memuat data dasar.');
    }
  }, [kelasFilter]);

  useEffect(() => { loadMetadata(); }, [loadMetadata]);

  const loadSchedules = useCallback(async () => {
    if (!kelasFilter) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJadwalKelas(kelasFilter, tahunAjaran);
      setSchedules(data);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat jadwal.');
    } finally {
      setLoading(false);
    }
  }, [kelasFilter, tahunAjaran]);

  useEffect(() => { loadSchedules(); }, [loadSchedules]);

  useAutoRefresh(loadSchedules, 20_000);

  const [refreshing, refreshAll] = useManualRefresh(loadMetadata, loadSchedules);

  const filteredSchedules = schedules
    .filter(s => hariFilter === 'semua' || s.hari.toLowerCase() === hariFilter.toLowerCase())
    .filter(s => semesterFilter === 'semua' || s.semester === semesterFilter)
    .sort((a, b) => {
      const hariOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const hariDiff = hariOrder.indexOf(a.hari) - hariOrder.indexOf(b.hari);
      if (hariDiff !== 0) return hariDiff;
      return (a.jamMulai || '').localeCompare(b.jamMulai || '');
    });

  const handleOpenDialog = () => {
    setFormData({
      kelasId: kelasFilter,
      hari: hariFilter === 'semua' ? 'Senin' : hariFilter,
      jamMulai: '07:00',
      jamSelesai: '08:30',
      mataPelajaranId: '',
      guruId: '',
      ruangan: '',
      semester: semesterFilter === 'semua' ? 'Ganjil' : semesterFilter,
      tahunAjaran,
    });
    setError(null);
    setIsDialogOpen(true);
  };

  const handleSaveSchedule = async () => {
    if (!formData.kelasId || !formData.mataPelajaranId || !formData.guruId) {
      setError('Kelas, mata pelajaran, dan guru wajib dipilih.');
      return;
    }
    if (!formData.jamMulai || !formData.jamSelesai) {
      setError('Jam mulai dan selesai wajib diisi.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await addJadwalData(formData);
      setIsDialogOpen(false);
      await loadSchedules();
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan jadwal.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => { setDeletingId(id); setIsAlertOpen(true); };
  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await removeJadwalData(deletingId);
      await loadSchedules();
    } catch (e: any) {
      alert('Gagal menghapus: ' + (e.message || 'Error'));
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  const currentKelasName = kelasList.find(k => k.id === kelasFilter)?.name || '-';

  const kelasItems = kelasList.map(k => ({ value: k.id, label: k.name, hint: `Kelas ${k.level}` }));
  const mapelItems = mapelList.map(m => ({ value: m.id, label: `${m.kode} — ${m.nama}`, hint: m.nama }));
  const guruItems = guruList.map(g => ({
    value: g.guruId!,
    label: g.name,
    hint: g.specialization ? `${g.specialization}` : (g.nip ? `NIP ${g.nip}` : undefined),
  }));

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Jadwal Pelajaran</h2>
          <p className="text-slate-300 mt-1">Susun jadwal mingguan per kelas, per semester, dan per tahun ajaran.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshAll} disabled={refreshing}
            className="h-11 w-11 rounded-xl border-white/10 bg-white/5 p-0"
            title="Segarkan data">
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleOpenDialog} disabled={!kelasFilter}
            className="bg-blue-600 hover:bg-blue-500 h-11 px-5 rounded-xl font-semibold text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Jadwal
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Kelas</Label>
              <LookupSelect
                value={kelasFilter}
                onChange={setKelasFilter}
                items={kelasItems}
                placeholder={kelasItems.length ? 'Pilih kelas' : 'Memuat...'}
                className="h-11 bg-slate-950 border-white/10 rounded-lg text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Hari</Label>
              <Select value={hariFilter} onValueChange={(v) => setHariFilter(v || 'semua')}>
                <SelectTrigger className="h-11 bg-slate-950 border-white/10 rounded-lg text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="semua">Semua Hari</SelectItem>
                  {HARI.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Semester</Label>
              <Select value={semesterFilter} onValueChange={(v) => setSemesterFilter(v || 'Ganjil')}>
                <SelectTrigger className="h-11 bg-slate-950 border-white/10 rounded-lg text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {SEMESTER.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">Tahun Ajaran</Label>
              <Input value={tahunAjaran} onChange={(e) => setTahunAjaran(e.target.value)}
                placeholder="2024/2025"
                className="h-11 bg-slate-950 border-white/10 rounded-lg text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
          <Info className="h-5 w-5 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Table */}
      <Card className="bg-slate-900/60 border-white/10 rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-white/10">
          <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Jadwal {currentKelasName} · {semesterFilter} {tahunAjaran}
            <Badge className="ml-auto bg-blue-500/10 text-blue-300 border-blue-500/30">
              {filteredSchedules.length} sesi
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 pl-6">Hari & Jam</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4">Mata Pelajaran</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4">Guru Pengajar</TableHead>
                <TableHead className="text-slate-200 text-xs uppercase tracking-wider font-semibold py-4">Ruangan</TableHead>
                <TableHead className="text-right text-slate-200 text-xs uppercase tracking-wider font-semibold py-4 pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : filteredSchedules.length > 0 ? (
                filteredSchedules.map((schedule) => (
                  <TableRow key={schedule.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="py-4 pl-6">
                      <div className="flex flex-col gap-1">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 w-fit font-semibold">
                          {schedule.hari}
                        </Badge>
                        <span className="text-slate-300 text-sm font-mono flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.jamMulai} – {schedule.jamSelesai}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-400" />
                        <span className="font-semibold text-white">{schedule.mataPelajaran?.nama || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-200">
                      {schedule.guru?.pengguna?.nama || '-'}
                      {schedule.guru?.nip && (
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">NIP {schedule.guru.nip}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-200">
                      {schedule.ruangan ? (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          {schedule.ruangan}
                        </div>
                      ) : <span className="text-slate-500 italic text-sm">Belum diatur</span>}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="icon" onClick={() => confirmDelete(schedule.id)}
                        className="h-9 w-9 text-red-400 hover:text-white hover:bg-red-600 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <Calendar className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-300 font-semibold">Belum ada jadwal</p>
                    <p className="text-sm text-slate-400">
                      Klik "Tambah Jadwal" untuk membuat jadwal baru.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) setError(null); }}>
        <DialogContent className="bg-slate-950 border border-white/10 text-white rounded-2xl p-0 overflow-hidden max-w-lg">
          <div className="p-6 border-b border-white/10 bg-white/5">
            <DialogTitle className="text-xl font-bold">Tambah Jadwal Baru</DialogTitle>
            <p className="text-slate-300 text-xs mt-1">Untuk kelas {currentKelasName}, T.A. {tahunAjaran}.</p>
          </div>
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1.5">
              <Label className="text-slate-200 text-xs font-semibold">Mata Pelajaran *</Label>
              <LookupSelect
                value={formData.mataPelajaranId || ''}
                onChange={(v) => setFormData({ ...formData, mataPelajaranId: v })}
                items={mapelItems}
                placeholder="Pilih mata pelajaran"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-200 text-xs font-semibold">Guru Pengajar *</Label>
              <LookupSelect
                value={formData.guruId || ''}
                onChange={(v) => setFormData({ ...formData, guruId: v })}
                items={guruItems}
                placeholder="Pilih guru"
                className="h-11 bg-slate-900 border-white/10 rounded-lg text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-slate-200 text-xs font-semibold">Hari *</Label>
                <Select value={formData.hari || 'Senin'} onValueChange={(v) => setFormData({ ...formData, hari: v || 'Senin' })}>
                  <SelectTrigger className="h-11 bg-slate-900 border-white/10 rounded-lg text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    {HARI.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-200 text-xs font-semibold">Jam Mulai *</Label>
                <Input type="time" value={formData.jamMulai || ''} onChange={(e) => setFormData({ ...formData, jamMulai: e.target.value })}
                  className="h-11 bg-slate-900 border-white/10 rounded-lg text-white [color-scheme:dark]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-200 text-xs font-semibold">Jam Selesai *</Label>
                <Input type="time" value={formData.jamSelesai || ''} onChange={(e) => setFormData({ ...formData, jamSelesai: e.target.value })}
                  className="h-11 bg-slate-900 border-white/10 rounded-lg text-white [color-scheme:dark]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-slate-200 text-xs font-semibold">Semester</Label>
                <Select value={formData.semester || 'Ganjil'} onValueChange={(v) => setFormData({ ...formData, semester: v || 'Ganjil' })}>
                  <SelectTrigger className="h-11 bg-slate-900 border-white/10 rounded-lg text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    {SEMESTER.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-200 text-xs font-semibold">Ruangan</Label>
                <Input value={formData.ruangan || ''} onChange={(e) => setFormData({ ...formData, ruangan: e.target.value })}
                  placeholder="Contoh: Lab Komputer"
                  className="h-11 bg-slate-900 border-white/10 rounded-lg text-white placeholder:text-slate-500" />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
          <div className="p-6 bg-white/5 border-t border-white/10 flex gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}
              className="flex-1 h-11 rounded-lg text-slate-200 hover:bg-white/5">Batal</Button>
            <Button onClick={handleSaveSchedule} disabled={saving}
              className="flex-1 h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Simpan Jadwal'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-slate-950 border border-red-500/20 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl font-bold">Hapus Jadwal?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Jadwal yang dihapus tidak dapat dikembalikan. Siswa tidak akan melihat jadwal ini lagi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="h-11 border-white/10 bg-white/5 text-slate-200 rounded-lg px-5">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-11 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg px-5">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
