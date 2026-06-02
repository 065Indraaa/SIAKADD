import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { LookupSelect } from '@/components/ui/lookup-select';
import { Calendar, Check, X, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { fetchSiswa } from '@/lib/userService';
import { fetchKelas, fetchKehadiranByKelas, saveKehadiran, removeKehadiran } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';
import { currentSemester, currentTahunAjaran } from '@/lib/tahunAjaran';

const STATUS_OPTIONS = [
  { value: 'Hadir', label: 'Hadir', color: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-600/20 dark:text-emerald-300 dark:border-emerald-600/30' },
  { value: 'Izin', label: 'Izin', color: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-600/20 dark:text-blue-300 dark:border-blue-600/30' },
  { value: 'Sakit', label: 'Sakit', color: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-600/20 dark:text-amber-300 dark:border-amber-600/30' },
  { value: 'Alpa', label: 'Alpa', color: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-600/20 dark:text-red-300 dark:border-red-600/30' },
];

export default function GuruAttendance() {
  const { user } = useAuth();
  const { add: addNotif } = useNotifications();

  const [kelasList, setKelasList] = useState<any[]>([]);
  const [selectedKelasId, setSelectedKelasId] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const loadData = useCallback(async () => {
    if (!selectedKelasId || !tanggal) return;
    setLoading(true);
    setError(null);
    try {
      const [siswaData, kehadiranData] = await Promise.all([
        fetchSiswa(selectedKelasId),
        fetchKehadiranByKelas(selectedKelasId, tanggal),
      ]);
      setStudents(siswaData);
      const map: Record<string, string> = {};
      kehadiranData.forEach((k: any) => {
        if (k.siswa?.id) map[k.siswa.id] = k.id + '|' + k.status;
      });
      setAttendanceMap(map);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat data.');
    } finally {
      setLoading(false);
    }
  }, [selectedKelasId, tanggal]);

  useEffect(() => { loadData(); }, [loadData]);
  useAutoRefresh(loadData, 20_000);

  const [refreshing, refresh] = useManualRefresh(loadData);

  const handleStatusChange = async (siswaId: string, status: string) => {
    if (!selectedKelasId || !tanggal) return;
    setSaving(true);
    try {
      const existing = attendanceMap[siswaId];
      if (existing) {
        const [recordId] = existing.split('|');
        await removeKehadiran(recordId);
      }
      if (status) {
        await saveKehadiran({
          siswaId,
          kelasId: selectedKelasId,
          tanggal,
          status,
          catatan: null,
        });
      }
      await loadData();
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan kehadiran.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    // Tidak perlu save all karena setiap klik sudah auto-save
    addNotif({
      type: 'success',
      kind: 'akademik',
      targetRoles: ['guru'],
      title: 'Kehadiran Tersimpan',
      body: `Data kehadiran ${tanggal} telah diperbarui.`,
    });
  };

  const getStatusForSiswa = (siswaId: string) => {
    const val = attendanceMap[siswaId];
    if (!val) return '';
    return val.split('|')[1] || '';
  };

  const kelasItems = kelasList.map(k => ({ value: k.id, label: k.name, hint: `Kelas ${k.level}` }));

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Absensi Siswa</h2>
          <p className="text-muted-foreground mt-1">Catat kehadiran siswa per pertemuan.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh} disabled={refreshing}
            className="h-11 w-11 rounded-xl p-0">
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
        </div>
      )}

      <Card className="rounded-2xl">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Kelas</Label>
              <LookupSelect
                value={selectedKelasId}
                onChange={setSelectedKelasId}
                items={kelasItems}
                placeholder={kelasItems.length ? 'Pilih kelas' : 'Memuat...'}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Tanggal</Label>
              <Input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Semester</Label>
              <div className="h-11 flex items-center px-4 rounded-xl bg-muted text-sm font-medium">
                {currentSemester()} · {currentTahunAjaran()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-border">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Daftar Kehadiran {tanggal}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 pl-6">Siswa</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right pr-6">Aksi Cepat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={3} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                </TableCell></TableRow>
              ) : students.length > 0 ? students.map((s) => {
                const siswaId = s.siswaId;
                const currentStatus = getStatusForSiswa(siswaId);
                return (
                  <TableRow key={siswaId}>
                    <TableCell className="py-4 pl-6">
                      <div className="font-semibold text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">NIS {s.nis || '-'}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      {currentStatus ? (
                        <Badge variant="outline" className={STATUS_OPTIONS.find(o => o.value === currentStatus)?.color || ''}>
                          {currentStatus}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Belum diisi</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        {STATUS_OPTIONS.map((opt) => (
                          <Button
                            key={opt.value}
                            variant="outline"
                            size="sm"
                            disabled={saving}
                            onClick={() => handleStatusChange(siswaId, opt.value)}
                            className={`h-8 px-2 text-xs rounded-lg ${currentStatus === opt.value ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
                          >
                            {opt.value === 'Hadir' ? <Check className="h-3 w-3 mr-1" /> : opt.value === 'Alpa' ? <X className="h-3 w-3 mr-1" /> : null}
                            {opt.label}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow><TableCell colSpan={3} className="h-32 text-center">
                  <p className="text-muted-foreground font-semibold">Belum ada siswa</p>
                  <p className="text-sm text-muted-foreground">Pilih kelas terlebih dahulu.</p>
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
