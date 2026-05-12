import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { fetchJurusan, savePeminatan } from '@/lib/schoolService';
import { BookOpen, CheckCircle2, Loader2, Save, AlertCircle } from 'lucide-react';

export default function SiswaMajoring() {
  const { user } = useAuth();
  const [jurusans, setJurusans] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const data = await fetchJurusan();
        setJurusans(data);
        // Gunakan peminatan yang sudah tersimpan jika ada
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

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Rumpun Peminatan</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Pilih rumpun peminatan (A/B/C) untuk dipertimbangkan dalam penetapan kelas 11.
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
          Pilihan rumpun berhasil disimpan. Tim kurikulum & BK akan mempertimbangkan pilihan Anda.
        </div>
      )}

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
            return (
              <button
                key={j.id}
                type="button"
                onClick={() => setSelectedId(j.id)}
                className={`text-left w-full transition-all duration-200 rounded-2xl p-6 border ${
                  isSelected
                    ? 'ring-2 ring-blue-500 bg-blue-500/5 border-blue-500/30'
                    : 'scola-card hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    <BookOpen className="h-5 w-5" />
                  </div>
                  {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                </div>

                <h3 className="text-base font-bold text-foreground mt-4 mb-1">{j.nama}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {/* Tampilkan kode rumpun jika ada */}
                  {j.kode ? `Kode: ${j.kode} · ` : ''}
                  Pilih rumpun ini jika sesuai dengan minat dan rencana studi lanjut Anda.
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
                Pilihan ini akan diteruskan ke tim kurikulum & BK untuk dipertimbangkan dalam penetapan kelas 11.
                Jika kuota rumpun pilihan utama penuh, sekolah dapat menawarkan rumpun alternatif.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
