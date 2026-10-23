import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { Link } from '../../../navigation';
import { LEGACY_ERAS } from '../../../data/legacy';
import { getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../../utils/schema';

interface PageProps {
  params: Promise<{ eraId: string }>;
}

export async function generateStaticParams() {
  return LEGACY_ERAS.map((era) => ({
    eraId: era.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eraId } = await params;
  const era = LEGACY_ERAS.find((e) => e.id === eraId);
  if (!era) return { title: 'Career Period Not Found' };

  const fullTitle = `${era.title} (${era.years}) | Leonardo DiCaprio`;
  const title = fullTitle.length > 62 ? `${era.title} (${era.years})` : fullTitle;
  const rawDesc = `${era.summary} Explore the ${era.years} chapter of Leonardo DiCaprio's career, key films, awards, and milestones.`;
  const description = rawDesc.length > 150 ? `${rawDesc.slice(0, 147).trimEnd()}...` : rawDesc;

  return {
    title,
    description,
    alternates: {
      canonical: `/legacy/${eraId}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/legacy/${eraId}`,
      siteName: 'Leonardo DiCaprio Official',
      images: [
        {
          url: '/og/leonardo-dicaprio-1200x630.jpg',
          width: 1200,
          height: 630,
          alt: `${era.title} (${era.years})`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/leonardo-dicaprio-1200x630.jpg'],
    },
  };
}

export default async function EraPage({ params }: PageProps) {
  const { eraId } = await params;
  const era = LEGACY_ERAS.find((e) => e.id === eraId);
  if (!era) notFound();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Legacy & Biography', path: '/legacy' },
    { name: `${era.title} (${era.years})`, path: `/legacy/${era.id}` },
  ]);

  const pageSchema = getWebPageSchema({
    path: `/legacy/${era.id}`,
    name: `${era.title} (${era.years})`,
    description: era.summary,
    type: 'ItemPage',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });

  return (
    <article className="min-h-screen pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pageSchema, breadcrumbsSchema]) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/legacy"
          className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Full Career Biography</span>
        </Link>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border border-orange-500/30 bg-orange-500/10 text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Era · {era.years}</span>
          </div>

          <h1 className="cinema-title text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {era.title}
          </h1>

          <p className="text-xl italic font-serif text-orange-400/90 mb-6">
            {era.summary}
          </p>

          {/* Factual 2-3 sentence summary answering who/what/when */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1322] text-slate-200 text-base leading-relaxed">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2">
              Factual Summary
            </span>
            During the <strong>{era.years}</strong> era, Leonardo DiCaprio progressed through a formative milestone in his cinematic career with <em>{era.title}</em>. This period was defined by landmark screen performances and collaborations that permanently altered his artistic trajectory in Hollywood. Today, this era represents an essential chapter within his comprehensive 30+ year body of work.
          </div>
        </header>

        <div className="my-10 space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed">
          {era.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {era.images.length > 0 && (
          <section aria-label="Era Photography" className="my-12">
            <h2 className="cinema-title text-2xl font-bold text-white mb-6">
              Archival Stills &amp; Moments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {era.images.map((img, i) => (
                <figure
                  key={i}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 group"
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: img.focus || '50% 50%' }}
                  />
                  <figcaption className="p-4 text-xs sm:text-sm text-slate-300 bg-[#0c1220]">
                    {img.caption}
                    {img.credit && (
                      <span className="block mt-1 text-[11px] text-slate-400">
                        {img.credit}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span>Last updated: October 13, 2026</span>
          </div>
          <Link href="/filmography" className="text-orange-400 hover:underline">
            View Related Films in Catalog →
          </Link>
        </footer>
      </div>
    </article>
  );
}
