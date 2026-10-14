'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Film,
  Image as ImageIcon,
  Video,
  Trophy,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  MOVIES_DATA,
  GALLERY_PHOTOS,
  REELS_DATA,
  ACHIEVEMENTS_DATA,
  Movie,
  GalleryPhoto,
  ReelItem,
} from '../data/content';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const navigate = useNavigate();
  const {
    isSearchOpen,
    setIsSearchOpen,
    openMovieDetail,
    openLightbox,
    playReel,
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'gallery' | 'reels' | 'achievements'>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const normalized = query.toLowerCase().trim();

  // Search across Films
  const movieResults = MOVIES_DATA.filter(
    (m) =>
      !normalized ||
      m.title.toLowerCase().includes(normalized) ||
      m.director.toLowerCase().includes(normalized) ||
      m.role.toLowerCase().includes(normalized) ||
      m.quote.toLowerCase().includes(normalized) ||
      m.genres.some((g) => g.toLowerCase().includes(normalized)) ||
      m.awards.some((a) => a.toLowerCase().includes(normalized))
  );

  // Search across Gallery
  const galleryResults = GALLERY_PHOTOS.filter(
    (g) =>
      !normalized ||
      g.title.toLowerCase().includes(normalized) ||
      g.caption.toLowerCase().includes(normalized) ||
      g.category.toLowerCase().includes(normalized) ||
      g.year.includes(normalized)
  );

  // Search across Reels
  const reelResults = REELS_DATA.filter(
    (r) =>
      !normalized ||
      r.title.toLowerCase().includes(normalized) ||
      r.caption.toLowerCase().includes(normalized) ||
      r.category.toLowerCase().includes(normalized)
  );

  // Search across Achievements
  const achievementResults = ACHIEVEMENTS_DATA.filter(
    (a) =>
      !normalized ||
      a.title.toLowerCase().includes(normalized) ||
      a.organization.toLowerCase().includes(normalized) ||
      a.description.toLowerCase().includes(normalized) ||
      a.year.includes(normalized) ||
      a.category.toLowerCase().includes(normalized)
  );

  const totalResults =
    movieResults.length + galleryResults.length + reelResults.length + achievementResults.length;

  const handleSelectMovie = (movie: Movie) => {
    setIsSearchOpen(false);
    navigate('/filmography');
    setTimeout(() => openMovieDetail(movie), 100);
  };

  const handleSelectPhoto = (photo: GalleryPhoto) => {
    setIsSearchOpen(false);
    navigate('/gallery');
    setTimeout(() => openLightbox(photo, GALLERY_PHOTOS), 100);
  };

  const handleSelectReel = (reel: ReelItem) => {
    setIsSearchOpen(false);
    navigate('/reels');
    setTimeout(() => playReel(reel), 100);
  };

  const handleSelectAchievement = () => {
    setIsSearchOpen(false);
    navigate('/achievements');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSearchOpen(false);
      }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl rounded-3xl border border-[var(--border)] shadow-2xl bg-[var(--surface)] text-[var(--text)] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[var(--border)] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#F28C28] shrink-0" />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search films, gallery, reels, achievements..."
            className="w-full bg-transparent text-sm sm:text-base text-[var(--text)] placeholder-[var(--text-subtle)] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[var(--text-subtle)] hover:text-[var(--text)]"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-[var(--text-subtle)] hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-4 py-2.5 bg-[var(--surface-light)] border-b border-[var(--border)] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${totalResults})` },
            { id: 'movies', label: `Films (${movieResults.length})` },
            { id: 'gallery', label: `Gallery (${galleryResults.length})` },
            { id: 'reels', label: `Reels (${reelResults.length})` },
            { id: 'achievements', label: `Achievements (${achievementResults.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#F28C28]/20 text-[#F28C28] font-bold border border-[#F28C28]/40 shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {totalResults === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-8 h-8 text-[var(--text-subtle)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-muted)] font-medium">No results found for “{query}”</p>
              <p className="text-xs text-[var(--text-subtle)] mt-1 font-light">
                Try searching for 'Titanic', 'Inception', 'Scorsese', 'Oscar', or 'Revenant'.
              </p>
            </div>
          ) : (
            <>
              {/* Movies Results */}
              {(activeTab === 'all' || activeTab === 'movies') && movieResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F28C28] mb-2.5 uppercase tracking-wider font-semibold">
                    <Film className="w-3.5 h-3.5" />
                    <span>Films & Cinema ({movieResults.length})</span>
                  </div>
                  <div className="space-y-2">
                    {movieResults.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleSelectMovie(m)}
                        className="group flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#F28C28]/10 border border-[var(--border)] hover:border-[#F28C28]/40 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={m.image}
                            alt={m.title}
                            className="w-10 h-14 object-cover rounded-lg shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[#F28C28] transition-colors truncate">
                              {m.title}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)] truncate">
                              {m.year} • Dir. {m.director} • as {m.role}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-[#F28C28] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Results */}
              {(activeTab === 'all' || activeTab === 'gallery') && galleryResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F28C28] mb-2.5 uppercase tracking-wider font-semibold">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Photo Archive ({galleryResults.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {galleryResults.slice(0, 4).map((g) => (
                      <div
                        key={g.id}
                        onClick={() => handleSelectPhoto(g)}
                        className="group flex items-center gap-2.5 p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#F28C28]/10 border border-[var(--border)] hover:border-[#F28C28]/40 cursor-pointer transition-all"
                      >
                        <img
                          src={g.src}
                          alt={g.title}
                          className="w-12 h-12 object-cover rounded-lg shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[var(--text)] group-hover:text-[#F28C28] truncate">
                            {g.title}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)] truncate">
                            {g.category} • {g.year}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reels Results */}
              {(activeTab === 'all' || activeTab === 'reels') && reelResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F28C28] mb-2.5 uppercase tracking-wider font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Reels & Dispatches ({reelResults.length})</span>
                  </div>
                  <div className="space-y-2">
                    {reelResults.slice(0, 3).map((r) => (
                      <div
                        key={r.id}
                        onClick={() => handleSelectReel(r)}
                        className="group flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#F28C28]/10 border border-[var(--border)] hover:border-[#F28C28]/40 cursor-pointer transition-all"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[var(--text)] group-hover:text-[#F28C28] truncate">
                            {r.title}
                          </h4>
                          <p className="text-[11px] text-[var(--text-muted)] truncate">
                            {r.category} • {r.duration} • {r.date}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-[#F28C28] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements Results */}
              {(activeTab === 'all' || activeTab === 'achievements') && achievementResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F28C28] mb-2.5 uppercase tracking-wider font-semibold">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Honors & Academy Awards ({achievementResults.length})</span>
                  </div>
                  <div className="space-y-2">
                    {achievementResults.slice(0, 3).map((a) => (
                      <div
                        key={a.id}
                        onClick={handleSelectAchievement}
                        className="group flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#F28C28]/10 border border-[var(--border)] hover:border-[#F28C28]/40 cursor-pointer transition-all"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-[var(--text)] group-hover:text-amber-500 truncate">
                              {a.title}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-500/20 text-amber-500 font-bold">
                              {a.year}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                            {a.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-amber-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-[var(--surface-light)] border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 border border-[var(--border)]">ESC</kbd> to close</span>
            <span className="hidden sm:inline">Navigate directly to items</span>
          </div>
          <span className="text-[#F28C28] font-bold">Leonardo DiCaprio Official</span>
        </div>
      </div>
    </div>
  );
};
