import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

function getThemeByTime(): Theme {
  const hour = new Date().getHours();
  // Light: 06:00 - 17:59 | Dark: 18:00 - 05:59
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export function useTimeTheme() {
  const [theme, setTheme] = useState<Theme>(getThemeByTime);

  useEffect(() => {
    // Apply ke <html> class (kompatibel dengan Tailwind dark mode)
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    // Cek setiap menit
    const interval = setInterval(() => {
      setTheme(getThemeByTime());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return theme;
}