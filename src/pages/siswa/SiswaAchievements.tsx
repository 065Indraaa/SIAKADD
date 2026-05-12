import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Trophy, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchPrestasiSiswa } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

export default function SiswaAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAchievements = useCallback(async () => {
    if (!user?.siswaId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPrestasiSiswa(user.siswaId);
      setAchievements(data || []);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Gagal memuat data prestasi.');
    } finally {
      setLoading(false);
    }
  }, [user?.siswaId]);

  useEffect(() => { loadAchievements(); }, [loadAchievements]);
  useAutoRefresh(loadAchievements, 20_000);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Prestasi Saya</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Catatan penghargaan dan pencapaian yang telah diinput oleh guru.
          </p>
        </div>
        <div className="scola-card px-4 py-2.5 flex items-center gap-3 rounded-xl">
          <Trophy className="h-4 w-4 text-amber-500" />
          <div>
            <p className="text-[11px] text-muted-foreground leading-none">Total Prestasi</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{achievements.length} catatan</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      ) : achievements.length === 0 ? (
        <div className="text-center py-20 scola-card rounded-2xl">
          <Award className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <p className="text-foreground font-semibold">Belum ada catatan prestasi</p>
          <p className="text-sm text-muted-foreground mt-1">Prestasi akan muncul setelah diinput oleh guru.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((ach) => {
            // Null-safe — semua field bisa null dari DB
            const peringkat = ach.peringkat ?? '-';
            const nama = ach.nama ?? 'Prestasi';
            const tipe = ach.tipe ?? '-';
            const tingkat = ach.tingkat ?? '-';
            const tanggal = ach.tanggal
              ? new Date(ach.tanggal).toLocaleDateString('id-ID', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })
              : '-';
            const isGold =
              typeof peringkat === 'string' &&
              (peringkat.includes('1') ||
                peringkat.toLowerCase().includes('emas') ||
                peringkat.toLowerCase().includes('juara 1'));

            return (
              <div key={ach.id} className="scola-card rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Icon */}
                  <div className="sm:w-20 flex items-center justify-center p-5 bg-muted/50 border-b sm:border-b-0 sm:border-r border-border">
                    {isGold ? (
                      <Trophy className="h-9 w-9 text-amber-500" />
                    ) : (
                      <Award className="h-9 w-9 text-blue-500" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline" className={
                        tipe === 'Akademik'
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30'
                          : 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30'
                      }>
                        {tipe}
                      </Badge>
                      <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                        Tingkat {tingkat}
                      </Badge>
                      <Badge variant="outline" className={
                        isGold
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                          : 'bg-slate-500/10 text-muted-foreground border-border'
                      }>
                        {peringkat}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-foreground">{nama}</h3>

                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {tanggal}
                    </div>

                    {ach.deskripsi && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-l-2 border-blue-500/40 pl-3">
                        {ach.deskripsi}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
