import type { Metadata } from 'next';
import React from 'react';
import { GalleryPage } from '../../views/GalleryPage';
import { getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Photo Gallery & Archive | Leonardo DiCaprio',
  description:
    'Exclusive archival photo collection of Leonardo DiCaprio: iconic film stills, red carpet portraits, rare behind-the-scenes moments, and field expeditions.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Photo Gallery & Archive | Leonardo DiCaprio',
    description:
      'Exclusive archival photo collection of Leonardo DiCaprio: iconic film stills, red carpet portraits, rare behind-the-scenes moments, and field expeditions.',
    url: `${BASE_URL}/gallery`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/photos/leo_hero.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Photo Gallery' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery & Archive | Leonardo DiCaprio',
    description:
      'Exclusive archival photo collection of Leonardo DiCaprio: iconic film stills, red carpet portraits, rare behind-the-scenes moments, and field expeditions.',
    images: ['/photos/leo_hero.jpg'],
  },
};

export default function GalleryRoute() {
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Photo Gallery', path: '/gallery' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <GalleryPage />
    </>
  );
}
