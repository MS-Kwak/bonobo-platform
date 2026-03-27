'use client';

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = 'admin-theme';

let themeListeners: (() => void)[] = [];

function subscribeTheme(cb: () => void) {
  themeListeners = [...themeListeners, cb];
  return () => {
    themeListeners = themeListeners.filter((l) => l !== cb);
  };
}

function getThemeSnapshot(): Theme {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'light' ? 'light' : 'dark';
}

function getThemeServerSnapshot(): Theme {
  return 'dark';
}

function emitThemeChange() {
  themeListeners.forEach((l) => l());
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem(STORAGE_KEY, t);
    emitThemeChange();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={mounted && theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
