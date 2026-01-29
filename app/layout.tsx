import '../styles/globals.css';
import type { ReactNode } from 'react';
import { Lexend } from 'next/font/google';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata = {
  title: 'Happy Book',
  description: 'Last-minute academic support.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
  );
}
