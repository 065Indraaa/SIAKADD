import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Briefcase, Building2, Search, Loader2, AlertCircle } from 'lucide-react';
import { fetchAlumni } from '@/lib/schoolService';
import { buildTahunLulusOptions } from '@/lib/tahunAjaran';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

export default function SiswaAlumni() {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tahunFilter, setTahunFilter] = useState<'semua' | number>('semua');
  const [statusFilter, setStatusFilter] = useState<'semua' | 'Kuliah' | 'Kerja'>('semua');

  const tahunOptions = useMemo(() => buildTahunLulusOptions(new Date(), { past: 5 }), []);

  const loadAlumni = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchAlumni(tahunFilter === 'semua' ? undefined : tahunFilter);
      // Hanya tampilkan alumni yang sudah ada data institusi/jabatan
      // (alumni yang belum diisi tidak ditampilkan ke siswa)
      const withData = data.filter(a =>
        (a.status === 'Kuliah' || a.status === 'Kerja') &&
        (a.institution || a.position)
      );
      setAlumni(withData);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat data alumni.');
    } finally {
      setLoading(false);
    }
  }, [tahunFilter]);

  useEffect(() => { loadAlumni(); }, [loadAlumni]);
  useAutoRefresh(loadAlumni, 30_000);

  const filtered = alumni.filter(a => {
    if (statusFilter !== 'semua' && a.status !== statusFilter) return false;
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      (a.name || '').toLowerCase().includes(q) ||
      (a.institution || '').toLowerCase().includes(q) ||
      (a.position || '').toLowerCase().includes(q) ||
      String(a.gradYear || '').includes(q)
    );
  });

  const stats = useMemo(() => ({
    kuliah: alumni.filter(a => a.status === 'Kuliah').length,
    kerja: alumni.filter(a => a.status === 'Kerja').length,
  }), [alumni]);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Jejak Alumni</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Informasi lulusan SMAIT Nur Hidayah yang sudah melanjutkan studi atau berkarir.
          Gunakan ini sebagai referensi untuk merencanakan masa depanmu.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="scola-stat-card p-5">
          <div className="h-9 w-9 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
            <Building2 className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.kuliah}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Sedang Kuliah</p>
        </div>
        <div className="scola-stat-card p-5">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
            <Briefcase className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.kerja}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Sudah Bekerja</p>
        </div>
      </div>

      {/* Filter */}
      <div className="scola-card rounded-2xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Cari</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nama, universitas, atau perusahaan..."
                className="pl-10 h-11 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Tahun Lulus</Label>
            <Select
              value={String(tahunFilter)}
              onValueChange={(v) => {
                if (!v) return;
                setTahunFilter(v === 'semua' ? 'semua' : parseInt(v, 10));
              }}
            >
              <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Tahun</SelectItem>
                {tahunOptions.map(y => (
                  <SelectItem key={y} value={String(y)}>Tahun {y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Status</Label>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Kuliah & Kerja</SelectItem>
                <SelectItem value="Kuliah">Kuliah</SelectItem>
                <SelectItem value="Kerja">Bekerja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 scola-card rounded-2xl">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <p className="text-foreground font-semibold">Belum ada data alumni</p>
          <p className="text-sm text-muted-foreground mt-1">
            Data alumni akan muncul setelah admin mengisi informasi institusi/pekerjaan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a) => (
            <div key={a.id} className="scola-card rounded-2xl p-5">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                  a.status === 'Kuliah' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}>
                  {(a.name || '?').charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground">{a.name}</p>
                    <Badge variant="outline" className={
                      a.status === 'Kuliah'
                        ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30 text-[10px]'
                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-[10px]'
                    }>
                      {a.status}
                    </Badge>
                    {a.gradYear && (
                      <span className="text-[10px] text-muted-foreground">Lulus {a.gradYear}</span>
                    )}
                  </div>

                  {a.institution && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-foreground font-medium truncate">{a.institution}</p>
                    </div>
                  )}

                  {a.position && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {a.status === 'Kerja'
                        ? <Briefcase className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        : <GraduationCap className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      }
                      <p className="text-sm text-muted-foreground truncate">{a.position}</p>
                    </div>
                  )}

                  {a.achievements && (
                    <p className="text-xs text-muted-foreground mt-1.5 italic line-clamp-1">
                      {a.achievements}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center pb-2">
        Data alumni diperbarui oleh admin sekolah. Hanya alumni dengan informasi lengkap yang ditampilkan.
      </p>
    </div>
  );
}
