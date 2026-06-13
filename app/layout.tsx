import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import SessionProvider from '@/components/providers/SessionProvider';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com'),
  title: {
    default: 'Alex Johnson — Full Stack Engineer & AI Enthusiast',
    template: '%s | Alex Johnson',
  },
  description:
    'Portfolio of Alex Johnson — Full Stack Engineer specializing in React, Next.js, Node.js, and AI/ML integration. Building premium web experiences.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'AI', 'Portfolio'],
  authors: [{ name: 'Alex Johnson' }],
  creator: 'Alex Johnson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com',
    title: 'Alex Johnson — Full Stack Engineer',
    description: 'Building premium web experiences with React, Next.js, and cutting-edge technologies.',
    siteName: 'Alex Johnson Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Alex Johnson Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Johnson — Full Stack Engineer',
    description: 'Building premium web experiences with modern technologies.',
    creator: '@alexjohnson',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-[#06060a] text-white antialiased`}>
        <SessionProvider>
          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          {/* Ambient light glow */}
          <div className="ambient-light" aria-hidden="true" />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#13131d',
                color: '#f8fafc',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                fontSize: '0.875rem',
              },
              success: {
                iconTheme: { primary: '#7c3aed', secondary: '#f8fafc' },
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
