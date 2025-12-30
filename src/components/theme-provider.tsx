'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const AccentThemeContext = React.createContext<{
  accentTheme: string;
  setAccentTheme: (theme: string) => void;
} | undefined>(undefined);


export function AccentThemeProvider({ children }: { children: React.ReactNode }) {
  const [accentTheme, setAccentThemeState] = React.useState('blue');

  React.useEffect(() => {
    const storedTheme = localStorage.getItem('accent-theme');
    if (storedTheme) {
      setAccentThemeState(storedTheme);
    }
  }, []);

  const setAccentTheme = (theme: string) => {
    setAccentThemeState(theme);
    document.documentElement.setAttribute('data-accent-theme', theme);
    localStorage.setItem('accent-theme', theme);
  }

  React.useEffect(() => {
    document.documentElement.setAttribute('data-accent-theme', accentTheme);
  }, [accentTheme]);


  return (
    <AccentThemeContext.Provider value={{ accentTheme, setAccentTheme }}>
        {children}
    </AccentThemeContext.Provider>
  )
}

export const useTheme = () => {
    const context = React.useContext(AccentThemeContext);
    const nextThemeContext = useNextTheme();
    if (context === undefined || nextThemeContext === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider and AccentThemeProvider');
    }
    return {
        ...nextThemeContext,
        ...context,
    };
}
