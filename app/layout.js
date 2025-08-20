import { Geist, Geist_Mono, Raleway } from 'next/font/google';
import './globals.css';
import ReduxProvider from './ReduxProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Next Noticias',
  description: 'El diario de Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable}`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
