import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Garv Mittal — Independent Creative & Engineer',
  description: 'I design and build digital experiences where technology meets visual culture.',
  openGraph: {
    title: 'Garv Mittal',
    description: 'I design and build digital experiences where technology meets visual culture.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = 'theme-paper';
                  localStorage.setItem('theme', theme);
                }
                if (theme !== 'theme-carbon') {
                  document.documentElement.classList.add(theme);
                }
                if (theme === 'theme-carbon') {
                  document.documentElement.classList.add('theme-carbon');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground font-body antialiased selection:bg-foreground selection:text-background cursor-none overflow-x-hidden transition-colors duration-700" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
