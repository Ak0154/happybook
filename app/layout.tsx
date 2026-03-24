import '../styles/globals.css';
import type { ReactNode } from 'react';
import { Lexend } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata = {
  title: 'Happy Book',
  description: 'Last-minute academic support.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexend.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
