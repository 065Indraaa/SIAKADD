import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { fetchJurusan, savePeminatan, hitungRataRataKelas10 } from '@/lib/schoolService';
import {
  BookOpen, CheckCircle2, Loader2, Save, AlertCircle, TrendingUp, Lock
} from 'lucide-react';

export default function SiswaMajoring() {
  const { user } = useAuth();
  const [jurusans, setJurusans] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rataRata, setRataRata] = useState<number | null>(null);
  const [loadingRata, setLoadingRata] = useState(false);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const data = await fetchJurusan();
        setJurusans(data);
        const savedId = (user as any)?.peminatanId;
        if (savedId) setSelectedId(savedId);
      } catch (e: any) {
        setError(e.message || 'Gagal memuat data rumpun peminatan.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  // Hitung rata-rata kelas 10
  useEffect(() => {
    const calc = async () => {
      if (!user?.siswaId || !user?.tahunMasuk) return;
      setLoadingRata(true);
      try {
        const rata = await hitungRataRataKelas10(user.siswaId, user.tahunMasuk as any);
        setRataRata(rata);
      } catch {
        setRataRata(null);
      } finally {
        setLoadingRata(false);
      }
    };
    calc();
  }, [user?.siswaId, user?.tahunMasuk]);

  const handleSave = async () => {
    if (!user?.siswaId || !selectedId) return;
    setSaving(true);
    setError(null);
    try {
      await savePeminatan(user.siswaId, selectedId);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan pilihan rumpun peminatan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-sm text-muted-foreground">Memuat data rumpun peminatan...</span>
      </div>
    );
  }

  const currentJurusan = jurusans.find(j => j.id === selectedId);
  const layakA = rataRata !== null && rataRata >= 87;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Rumpun Peminatan</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Pilih rumpun peminatan (A/B/C) untuk kelas 11 berdasarkan rata-rata nilai kelas 10 Anda.
          </p>
        </div>
        {selectedId && (
          <Button onClick={handleSave} disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl h-11 font-semibold">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSuccess ? 'Tersimpan!' : 'Simpan Pilihan'}
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      {isSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          Pilihan rumpun berhasil disimpan. Admin akan memverifikasi berdasarkan kuota dan nilai.
        </div>
      )}

      {/* Info kriteria & rata-rata */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="scola-card rounded-2xl p-5 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Rata-rata Nilai Kelas 10</p>
              {loadingRata ? (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Menghitung...
                </p>
              ) : rataRata !== null ? (
                <>
                  <p className="text-2xl font-bold text-foreground mt-1">{rataRata.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dihitung dari semester Ganjil & Genap kelas 10.
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Data nilai kelas 10 belum tersedia.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={`scola-card rounded-2xl p-5 border-l-4 ${layakA ? 'border-emerald-500' : 'border-amber-500'}`}>
          <div className="flex items-start gap-3">
            {layakA ? <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" /> : <Lock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />}
            <div>
              <p className="text-sm font-semibold text-foreground">Status Kelayakan</p>
              {loadingRata ? (
                <p className="text-xs text-muted-foreground mt-1">Memuat...</p>
              ) : layakA ? (
                <>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    Anda memenuhi syarat memilih semua rumpun, termasuk Kesehatan.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rata-rata &ge; 87 memungkinkan Anda masuk Rumpun A (Kesehatan).
                  </p>
                </>
              ) : rataRata !== null ? (
                <>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-1 font-medium">
                    Anda hanya bisa memilih Rumpun B (Teknik) atau C (Sosial).
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rata-rata &lt; 87, sehingga Rumpun A (Kesehatan) memerlukan nilai lebih tinggi.
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Hubungi admin jika data nilai belum muncul.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Kriteria info */}
      <div className="p-4 rounded-xl bg-blue-500/8 border border-blue-500/15 text-sm">
        <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Kriteria Penjurusan Kelas 11</p>
        <ul className="space-y-1 text-muted-foreground list-disc list-inside">
          <li>Kriteria diambil dari <strong>rata-rata nilai kelas 10</strong> (semester Ganjil & Genap).</li>
          <li><strong>Rumpun A — Kesehatan</strong>: minimal rata-rata <strong>87</strong>.</li>
          <li><strong>Rumpun B — Teknik</strong> & <strong>C — Sosial</strong>: bebas memilih.</li>
          <li>Kuota: A = 2 kelas, B = 1 kelas, C = 2 kelas. Jika kuota penuh, siswa nilai terendah dipindah ke rumpun alternatif.</li>
        </ul>
      </div>

      {jurusans.length === 0 ? (
        <div className="text-center py-16 scola-card rounded-2xl">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-foreground font-semibold">Belum ada rumpun peminatan</p>
          <p className="text-sm text-muted-foreground mt-1">
            Hubungi admin untuk menambahkan rumpun peminatan.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {jurusans.map((j) => {
            const isSelected = selectedId === j.id;
            const isKesehatan = j.kode === 'A';
            const disabled = isKesehatan && !layakA && !loadingRata && rataRata !== null;
            return (
              <button
                key={j.id}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setSelectedId(j.id)}
                className={`text-left w-full transition-all duration-200 rounded-2xl p-6 border ${
                  disabled
                    ? 'opacity-50 cursor-not-allowed bg-muted/40 border-muted'
                    : isSelected
                    ? 'ring-2 ring-blue-500 bg-blue-500/5 border-blue-500/30'
                    : 'scola-card hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : disabled ? 'bg-muted text-muted-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <BookOpen className="h-5 w-5" />
                  </div>
                  {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                  {disabled && <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />}
                </div>

                <h3 className="text-base font-bold text-foreground mt-4 mb-1">{j.nama}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {j.kode ? `Kode: ${j.kode} · ` : ''}
                  {isKesehatan
                    ? 'Diarahkan untuk jalur kedokteran, farmasi, dan ilmu kesehatan. Memerlukan rata-rata kelas 10 minimal 87.'
                    : j.kode === 'B'
                    ? 'Diarahkan untuk jalur teknik dan teknologi. Terbuka untuk semua siswa kelas 10.'
                    : 'Diarahkan untuk jalur sosial, hukum, bisnis, dan humaniora. Terbuka untuk semua siswa kelas 10.'}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Konfirmasi pilihan */}
      {selectedId && currentJurusan && (
        <div className="scola-card rounded-2xl p-5 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Pilihan Anda: {currentJurusan.nama}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Pilihan ini akan diteruskan ke tim kurikulum & BK untuk diverifikasi.
                Penetapan akhir memperhatikan rata-rata nilai kelas 10, kuota kelas, dan kebijakan sekolah.
                Jika kuota pilihan utama penuh, Anda dapat dialihkan ke rumpun alternatif sesuai nilai.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
