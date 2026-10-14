import type { Metadata } from 'next';
import React from 'react';
import { FilmographyPage } from '../../views/FilmographyPage';
import { getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Complete Filmography | Leonardo DiCaprio',
  description:
    'Complete catalog of Leonardo DiCaprio filmography: 38+ feature films, television roles, documentaries, synopsis, cast details, and official trailers.',
  alternates: {
    canonical: '/filmography',
  },
  openGraph: {
    title: 'Complete Filmography | Leonardo DiCaprio',
    description:
      'Complete catalog of Leonardo DiCaprio filmography: 38+ feature films, television roles, documentaries, synopsis, cast details, and official trailers.',
    url: `${BASE_URL}/filmography`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/photos/leo_hero.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Filmography' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Filmography | Leonardo DiCaprio',
    description:
      'Complete catalog of Leonardo DiCaprio filmography: 38+ feature films, television roles, documentaries, synopsis, cast details, and official trailers.',
    images: ['/photos/leo_hero.jpg'],
  },
};

export default function FilmographyRoute() {
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Filmography', path: '/filmography' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <FilmographyPage />
    </>
  );
}
