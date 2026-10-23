'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Film,
  Camera,
  Video,
  Trophy,
  Heart,
  Users,
  ArrowRight,
  Play,
} from 'lucide-react';
import { HeroSection } from '../components/official/HeroSection';
import {
  Movie,
  MOVIES_DATA,
  GALLERY_PHOTOS,
  REELS_DATA,
  ACHIEVEMENTS_DATA,
} from '../data/content';
import { PlanetarySection } from '../components/PlanetarySection';
import { useApp } from '../context/AppContext';

// Films shown in Featured Masterworks, in display order.
// Covers are read from /assets/posters/<id>.jpg (portrait 2:3); until a cover
// file exists the card falls back to a typeset title card.
const FEATURED_IDS = [
  'titanic',
  'the-departed',
  'inception',
  'the-revenant',
  'the-wolf-of-wall-street',
  'killers-of-the-flower-moon',
];

const PosterCard: React.FC<{
  movie: Movie;
  onPlay: (m: Movie) => void;
}> = ({ movie, onPlay }) => {
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const href = `/film/${movie.id}`;
  return (
    <div className="group flex flex-col">
      <div
        onClick={() => navigate(href)}
        className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-[var(--border)] shadow-md group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:border-[#F28C28]/60 transition-all duration-300 cursor-pointer bg-[#0c101c]"
      >
        {!failed ? (
          <img
            src={`/assets/posters/${movie.id}.jpg`}
            alt={`${movie.title} cover`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center text-center p-5"
            style={{ background: 'linear-gradient(160deg, #111622 0%, #1a2233 45%, #4a210d 100%)' }}
          >
            <Film className="w-6 h-6 text-[#F28C28] mb-3" />
            <span className="cinema-title text-white text-base sm:text-lg font-black leading-tight">
              {movie.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay(movie);
          }}
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-[#F28C28] text-white flex items-center justify-center shadow-lg shadow-orange-500/40 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
          aria-label={`Play trailer for ${movie.title}`}
        >
          <Play className="w-4 h-4 fill-white ml-0.5" />
        </button>
      </div>
      <div className="pt-3 px-1 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base font-bold text-[#141414] dark:text-white leading-snug">
          <Link to={href} className="hover:text-[#F28C28] transition-colors">
            {movie.title}
          </Link>
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-1">{movie.year}</p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Directed by <span className="font-semibold text-[#141414] dark:text-white">{movie.director}</span>
        </p>
        <p className="text-xs text-[#F28C28] mt-0.5">Leonardo as {movie.role}</p>
        <Link
          to={href}
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#F28C28] hover:underline"
        >
          Impact &amp; full story <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { playMovie, openMovieDetail, openLightbox, playReel } = useApp();

  // Curated 3 featured movies
  const featuredMovies = MOVIES_DATA.filter((m) =>
    FEATURED_IDS.includes(m.id)
  ).sort((x, y) => FEATURED_IDS.indexOf(x.id) - FEATURED_IDS.indexOf(y.id));

  // Curated 3 featured photos
  const featuredPhotos = GALLERY_PHOTOS.slice(0, 3);

  // Curated 3 featured reels
  const featuredReels = ['oscars-best-actor', 'revenant-bear', 'paris-fans']
    .map((id) => REELS_DATA.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => !!r);

  // Curated 3 featured achievements
  const featuredAchievements = ACHIEVEMENTS_DATA.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Cinema Showcase */}
      <HeroSection
        movies={MOVIES_DATA}
        onPlayMovie={playMovie}
        onOpenMovieDetail={openMovieDetail}
        onNavigate={(sectionId) => {
          if (sectionId === 'movies' || sectionId === 'filmography') navigate('/filmography');
          else if (sectionId === 'gallery') navigate('/gallery');
          else if (sectionId === 'about' || sectionId === 'legacy') navigate('/legacy');
          else if (sectionId === 'reels') navigate('/reels');
          else if (sectionId === 'achievements') navigate('/achievements');
          else if (sectionId === 'charity') navigate('/charity');
          else if (sectionId === 'fanclub' || sectionId === 'fan-club') navigate('/fan-club');
          else navigate('/');
        }}
      />

      {/* 1b. Meet Leonardo: short personal introduction */}
      <section className="py-14 sm:py-20 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden border border-[var(--border)] shadow-xl">
              <img
                src="/photos/leo_portrait.jpg"
                alt="Leonardo DiCaprio"
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ objectPosition: "55% 30%" }}
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-[#F28C28] mb-3 border border-[#F28C28]/30">
              <Heart className="w-3.5 h-3.5" />
              <span>MEET LEONARDO</span>
            </div>
            <h2 className="cinema-title text-2xl sm:text-4xl font-black text-[#141414] dark:text-white tracking-tight mb-5">
              The Man Behind the <span className="gold-text-gradient">Roles</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
              <p>
                Leonardo Wilhelm DiCaprio was born in Los Angeles on November 11, 1974. He was named
                after Leonardo da Vinci, the story goes, because he first kicked while his mother stood
                before a da Vinci painting in Florence. He grew up in Hollywood, raised by his mother,
                Irmelin, and supported by his father, George, an underground comics creator.
              </p>
              <p>
                Off screen, he is a curious, private and deeply loyal person: a lifelong lover of nature,
                art and history, happiest outdoors, and fiercely protective of the people and places he
                cares about. He picks his roles carefully and his causes even more carefully, treating
                both as a promise to see them through.
              </p>
              <p>
                To his fans, he is an actor who never stopped pushing himself. To the planet, he is a
                voice that never stopped speaking up for it.
              </p>
            </div>
            <Link
              to="/legacy"
              className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 transition-colors group"
            >
              <span>Read the full story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Filmography Preview */}
      <section className="py-16 sm:py-20 border-t border-[var(--border)] bg-[var(--surface-light)]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-[#F28C28] mb-3 border border-[#F28C28]/30">
                <Film className="w-3.5 h-3.5" />
                <span>OFFICIAL FILMOGRAPHY</span>
              </div>
              <h2 className="cinema-title text-2xl sm:text-4xl font-black text-[#141414] dark:text-white tracking-tight">
                Featured <span className="gold-text-gradient">Masterworks</span>
              </h2>
            </div>
            <Link
              to="/filmography"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 transition-colors group shrink-0"
            >
              <span>View All 25+ Films & Streaming</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
            {featuredMovies.map((movie) => (
              <PosterCard key={movie.id} movie={movie} onPlay={playMovie} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Archival Gallery Preview */}
      <section className="py-16 sm:py-20 border-t border-[var(--border)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-orange-400 mb-3 border border-orange-500/20">
                <Camera className="w-3.5 h-3.5" />
                <span>ARCHIVAL PHOTO VAULT</span>
              </div>
              <h2 className="cinema-title text-2xl sm:text-4xl font-black text-[#141414] dark:text-white tracking-tight">
                Candid <span className="gold-text-gradient">Moments</span> & Portraits
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 transition-colors group shrink-0"
            >
              <span>Browse Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo, GALLERY_PHOTOS)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/10 border border-[var(--border)] shadow-md hover:border-[#F28C28]/60 cursor-pointer transition-all duration-300"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: photo.focus }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-xs font-mono text-[#F28C28] font-bold">{photo.category}</span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{photo.title}</h3>
                  <p className="text-[11px] text-white/80 line-clamp-2">{photo.caption}</p>
                  {photo.credit && <p className="text-[10px] text-white/60 mt-1 line-clamp-1">{photo.credit}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Video Reels Preview */}
      <section className="py-16 sm:py-20 border-t border-[var(--border)] bg-[var(--surface-light)]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-orange-400 mb-3 border border-orange-500/20">
                <Video className="w-3.5 h-3.5" />
                <span>VIDEO REELS</span>
              </div>
              <h2 className="cinema-title text-2xl sm:text-4xl font-black text-[#141414] dark:text-white tracking-tight">
                Leonardo <span className="gold-text-gradient">on Camera</span>
              </h2>
            </div>
            <Link
              to="/reels"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 transition-colors group shrink-0"
            >
              <span>Watch All Video Reels</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredReels.map((reel) => (
              <div
                key={reel.id}
                onClick={() => playReel(reel)}
                className="group relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-md hover:border-[#F28C28]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-black/20">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#F28C28] text-white flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/70 text-white">
                    {reel.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-mono uppercase text-[#F28C28] font-bold">
                    {reel.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#141414] dark:text-white line-clamp-1 mt-0.5">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">
                    {reel.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Planetary defense: climate awareness and call to action */}
      <PlanetarySection />

      {/* 7. Achievements & Fan Club Double Row */}
      <section className="py-16 sm:py-20 border-t border-[var(--border)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Achievements Card */}
            <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-semibold mb-4">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>HALL OF ACCLAIM</span>
                </div>
                <h3 className="cinema-title text-2xl font-black text-[#141414] dark:text-white mb-2">
                  Academy Honors & <span className="gold-text-gradient">Legacy</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                  Celebrating historic Academy Award, BAFTA, and Golden Globe honors, alongside the Clinton Global Citizen Award.
                </p>
                <div className="space-y-2 mb-6">
                  {featuredAchievements.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-xs">
                      <span className="font-semibold text-[#141414] dark:text-white">{item.title}</span>
                      <span className="font-mono text-[#F28C28] font-bold">{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/achievements"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 transition-colors group"
              >
                <span>View All Honors & Lifetime Acclaim</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Fan Club Card */}
            <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-400 font-semibold mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span>OFFICIAL SOCIETY</span>
                </div>
                <h3 className="cinema-title text-2xl font-black text-[#141414] dark:text-white mb-2">
                  Fan Club & <span className="gold-text-gradient">Oscar Trivia</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                  Claim your personal digital fan card with his photo on it, test your knowledge in the trivia challenge, and tell us why you love Leonardo DiCaprio.
                </p>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-[#F28C28]/20 mb-6">
                  <div className="text-xs font-mono font-bold text-[#F28C28] mb-1">YOUR DIGITAL FAN CARD</div>
                  <div className="text-xs text-[var(--text-muted)]">Add your name, share why you are a fan, and get a card to keep.</div>
                </div>
              </div>
              <Link
                to="/fan-club"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 transition-colors group"
              >
                <span>Claim Your Fan Card & Join</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
