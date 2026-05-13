import { useEffect, useRef } from 'react';

/**
 * Auto-refresh data dengan 3 strategi:
 * 1. Polling berkala (interval ms)
 * 2. Refresh saat tab/window kembali aktif (focus)
 * 3. Refresh saat koneksi internet kembali (online)
 *
 * Contoh pakai:
 *   useAutoRefresh(fetchUsers, 30_000);
 */
export function useAutoRefresh(
  refresh: () => void | Promise<void>,
  intervalMs: number = 30_000,
) {
  // Simpan callback di ref agar efek tidak restart saat callback berubah
  const refreshRef = useRef(refresh);
  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);

  useEffect(() => {
    let isActive = true;

    const run = () => {
      if (isActive && document.visibilityState === 'visible') {
        refreshRef.current();
      }
    };

    // Polling
    const timer = setInterval(run, intervalMs);

    // Refresh saat tab fokus kembali
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refreshRef.current();
    };
    const onOnline = () => refreshRef.current();
    const onFocus = () => refreshRef.current();

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('online', onOnline);
    window.addEventListener('focus', onFocus);

    return () => {
      isActive = false;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('focus', onFocus);
    };
  }, [intervalMs]);
}
