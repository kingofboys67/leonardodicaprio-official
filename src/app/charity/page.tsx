import type { Metadata } from 'next';
import React from 'react';
import { CharityPage } from '../../views/CharityPage';
import { getProfilePageSchema, getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Re:wild & Conservation | Leonardo DiCaprio',
  description:
    'Leonardo DiCaprio\'s global environmental activism: over $100M in grants, Re:wild partnerships, and frontline biodiversity conservation initiatives.',
  alternates: {
    canonical: '/charity',
  },
  openGraph: {
    title: 'Re:wild & Conservation | Leonardo DiCaprio',
    description:
      'Leonardo DiCaprio\'s global environmental activism: over $100M in grants, Re:wild partnerships, and frontline biodiversity conservation initiatives.',
    url: `${BASE_URL}/charity`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/photos/leo_portrait.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Conservation' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Re:wild & Conservation | Leonardo DiCaprio',
    description:
      'Leonardo DiCaprio\'s global environmental activism: over $100M in grants, Re:wild partnerships, and frontline biodiversity conservation initiatives.',
    images: ['/photos/leo_portrait.jpg'],
  },
};

export default function CharityRoute() {
  const profileSchema = getProfilePageSchema('/charity');
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Conservation & Charity', path: '/charity' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([profileSchema, breadcrumbsSchema]),
        }}
      />
      <CharityPage />
    </>
  );
}
