import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { Link } from '../../../navigation';
import { LEGACY_ERAS } from '../../../data/legacy';
import { getBreadcrumbSchema, BASE_URL } from '../../../utils/schema';

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

  const shortTitle = era.title.length > 25 ? `${era.title.slice(0, 22)}...` : era.title;
  const title = `${shortTitle} (${era.years}) | Leo DiCaprio`;
  const rawDesc = era.summary;
  const description = rawDesc.length > 135 ? `${rawDesc.slice(0, 132)}...` : rawDesc;
  const img = era.images[0]?.src || '/photos/leo_portrait.jpg';

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
      images: [{ url: img, width: 1200, height: 630, alt: `${era.title} (${era.years})` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [img],
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

  return (
    <article className="min-h-screen pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
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
