import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AccentThemeProvider, ThemeProvider } from '@/components/theme-provider';
import { ExitDialogProvider } from '@/components/exit-dialog-provider';

// Optimize font loading with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  // Only load the weights we actually use
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'EasyDist',
  description: 'Accelerate your software distribution',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1f23' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external image domains for faster loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AccentThemeProvider>
            <ExitDialogProvider>
              {children}
              <Toaster />
            </ExitDialogProvider>
          </AccentThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
