import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { Calendar } from 'lucide-react';
import { FILMOGRAPHY } from '../../../data/filmography';
import { MOVIES_DATA } from '../../../data/content';
import { FilmPage } from '../../../views/FilmPage';
import {
  getMovieSchema,
  getBreadcrumbSchema,
  BASE_URL,
} from '../../../utils/schema';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return FILMOGRAPHY.map((film) => ({
    id: film.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const film = FILMOGRAPHY.find((f) => f.id === id);
  if (!film) return { title: 'Film Not Found' };

  const rawTitle = `${film.title} (${film.year}) | Leo DiCaprio`;
  const title = rawTitle.length > 60 ? `${film.title.slice(0, 33)} (${film.year}) | Leo` : rawTitle;

  const rawDesc = `${film.title} (${film.year}), directed by ${film.director}. Leonardo DiCaprio stars as ${film.role}. Synopsis, cast, and trailer archive.`;
  const description = rawDesc.length > 155 ? `${rawDesc.slice(0, 151)}...` : rawDesc;

  const poster = film.poster || `/assets/posters/${film.id}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `/film/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/film/${id}`,
      type: 'video.movie',
      images: [
        {
          url: poster,
          width: 1200,
          height: 630,
          alt: `${film.title} starring Leonardo DiCaprio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [poster],
    },
  };
}

export default async function FilmRoutePage({ params }: PageProps) {
  const { id } = await params;
  const film = FILMOGRAPHY.find((f) => f.id === id);
  if (!film) notFound();

  const movieData = MOVIES_DATA.find((m) => m.id === id);
  const movieSchema = getMovieSchema({
    id: film.id,
    title: film.title,
    year: film.year,
    director: film.director,
    role: film.role,
    synopsis: film.synopsis || movieData?.synopsis || `Leonardo DiCaprio stars as ${film.role} in ${film.title}.`,
    image: film.poster || `/assets/posters/${film.id}.jpg`,
    genres: film.genres,
    duration: film.runtime,
    releaseDate: film.release,
    trailerYoutubeId: film.trailer || undefined,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Filmography', path: '/filmography' },
    { name: `${film.title} (${film.year})`, path: `/film/${film.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([movieSchema, breadcrumbsSchema]),
        }}
      />
      {/* Hidden semantic summary for crawlers and AI parsing directly in the HTML */}
      <div className="sr-only" aria-hidden="false">
        <h2>{film.title} ({film.year}) starring Leonardo DiCaprio</h2>
        <p>
          {film.title} is a {film.year} {film.kind} directed by {film.director}, starring Leonardo DiCaprio in the role of {film.role}.
          Released in {film.year}, the project features {film.cast.slice(0, 4).map((c) => c.name).join(', ')}.
          {film.synopsis}
        </p>
        <div>Last updated: October 13, 2026</div>
      </div>

      <FilmPage />
    </>
  );
}
