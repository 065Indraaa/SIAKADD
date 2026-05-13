import { useCallback, useRef, useState } from 'react';

/**
 * Hook untuk tombol refresh manual yang reliable.
 *
 * Cara kerja:
 * - Terima satu atau lebih fetcher sebagai argumen
 * - Klik refresh → panggil semua fetcher + tampilkan spinner
 * - Fetcher disimpan di ref agar tidak perlu masuk ke deps useCallback
 * - Minimum spin 600ms agar feedback visual terlihat
 *
 * Contoh:
 *   const [refreshing, refresh] = useManualRefresh(loadData);
 *   <Button onClick={refresh} disabled={refreshing}>Refresh</Button>
 */
export function useManualRefresh(
  ...fetchers: Array<() => void | Promise<void>>
): [boolean, () => Promise<void>] {
  const [refreshing, setRefreshing] = useState(false);
  const busyRef = useRef(false);
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
            console.error('[useManualRefresh]', e);
            return Promise.resolve();
          }
        }),
      );
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < 600) {
        await new Promise(res => setTimeout(res, 600 - elapsed));
      }
      busyRef.current = false;
      setRefreshing(false);
    }
  }, []);

  return [refreshing, refresh];
}
