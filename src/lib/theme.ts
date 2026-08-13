import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

export function getInitialTheme(): Theme {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem('sahajta-theme') as Theme;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  }
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('sahajta-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme };
}
