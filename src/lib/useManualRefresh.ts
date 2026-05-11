import { useCallback, useRef, useState } from 'react';

/**
 * Hook untuk tombol refresh manual yang reliable.
 *
 * - Memaksa durasi minimum spin (default 500ms) supaya feedback visual ke user
 *   tetap kelihatan meski data selesai di-fetch dalam waktu sangat cepat.
 * - Menerima satu atau banyak async fetcher sekaligus.
 * - Mengabaikan klik berulang saat refresh sedang berjalan.
 *
 * Contoh:
 *   const [refreshing, refresh] = useManualRefresh(loadData);
 *   <Button onClick={refresh} disabled={refreshing}>...</Button>
 *
 *   // atau untuk banyak fetcher sekaligus:
 *   const [refreshing, refresh] = useManualRefresh(loadMetadata, loadAssignments);
 */
export function useManualRefresh(
  ...fetchers: Array<() => void | Promise<void>>
): [boolean, () => Promise<void>] {
  const [refreshing, setRefreshing] = useState(false);
  const busyRef = useRef(false);
  // Simpan fetchers terbaru di ref supaya closure tidak stale.
  const fetchersRef = useRef(fetchers);
  fetchersRef.current = fetchers;

  const refresh = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setRefreshing(true);
    const start = Date.now();
    try {
      await Promise.all(
        fetchersRef.current.map(fn => {
          try {
            const r = fn();
            return r instanceof Promise ? r : Promise.resolve();
          } catch (e) {
            return Promise.reject(e);
          }
        }),
      );
    } catch (e) {
      console.error('[useManualRefresh] gagal:', e);
    } finally {
      const elapsed = Date.now() - start;
      const minSpin = 500;
      if (elapsed < minSpin) {
        await new Promise(res => setTimeout(res, minSpin - elapsed));
      }
      busyRef.current = false;
      setRefreshing(false);
    }
  }, []);

  return [refreshing, refresh];
}
