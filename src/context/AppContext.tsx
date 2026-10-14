'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TRAILERS } from '../data/trailers';
import {
  Movie,
  GalleryPhoto,
  ReelItem,
  GALLERY_PHOTOS,
} from '../data/content';

interface AppContextType {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Audio Atmosphere Drone
  isAudioPlaying: boolean;
  toggleAudio: () => void;

  // Movie Detail Modal
  selectedMovieForDetail: Movie | null;
  openMovieDetail: (movie: Movie) => void;
  closeMovieDetail: () => void;

  // Video Player Modal
  activePlayer: {
    isOpen: boolean;
    videoSrc: string;
    title: string;
    subtitle?: string;
    quality?: string;
  };
  playMovie: (movie: Movie) => void;
  playTrailerById: (id: string, title: string, subtitle?: string) => boolean;
  activeTrailer: { youtubeId: string; title: string; subtitle?: string } | null;
  closeTrailer: () => void;
  playReel: (reel: ReelItem) => void;
  closePlayer: () => void;

  // Photo Lightbox Modal
  activeLightbox: {
    isOpen: boolean;
    photo: GalleryPhoto | null;
    allPhotos: GalleryPhoto[];
  };
  openLightbox: (photo: GalleryPhoto, allPhotos?: GalleryPhoto[]) => void;
  selectLightboxPhoto: (photo: GalleryPhoto) => void;
  closeLightbox: () => void;

  // Quote Card Modal
  activeQuoteCard: {
    isOpen: boolean;
    quote: { id?: string; text: string; source: string; context?: string } | null;
  };
  openQuoteCard: (quote: { id?: string; text: string; source: string; context?: string }) => void;
  closeQuoteCard: () => void;

  // Watchlist
  watchlist: string[];
  toggleWatchlist: (movieId: string) => void;
  isMovieSaved: (movieId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme') || localStorage.getItem('leo_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch (e) {}
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('leo_theme', theme);
    } catch (e) {}
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Audio Atmosphere Drone
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (oscillatorNodeRef.current && audioCtxRef.current) {
        try {
          oscillatorNodeRef.current.gain.gain.linearRampToValueAtTime(
            0.001,
            audioCtxRef.current.currentTime + 0.5
          );
          setTimeout(() => {
            oscillatorNodeRef.current?.osc1.stop();
            oscillatorNodeRef.current?.osc2.stop();
            oscillatorNodeRef.current = null;
          }, 500);
        } catch (e) {
          console.error(e);
        }
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, ctx.currentTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(162, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        oscillatorNodeRef.current = { osc1, osc2, gain };
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('Web Audio error:', err);
      }
    }
  };

  // Movie Detail Modal
  const [selectedMovieForDetail, setSelectedMovieForDetail] = useState<Movie | null>(null);
  const openMovieDetail = (movie: Movie) => setSelectedMovieForDetail(movie);
  const closeMovieDetail = () => setSelectedMovieForDetail(null);

  // Video Player Modal
  const [activePlayer, setActivePlayer] = useState<{
    isOpen: boolean;
    videoSrc: string;
    title: string;
    subtitle?: string;
    quality?: string;
  }>({
    isOpen: false,
    videoSrc: '',
    title: '',
  });

  const [activeTrailer, setActiveTrailer] = useState<{ youtubeId: string; title: string; subtitle?: string } | null>(null);
  const closeTrailer = () => setActiveTrailer(null);

  // Opens the official trailer for any film id that has one. Returns false when there is none.
  const playTrailerById = (id: string, title: string, subtitle?: string) => {
    const youtubeId = TRAILERS[id];
    if (!youtubeId) return false;
    setActiveTrailer({ youtubeId, title: `${title} — Official Trailer`, subtitle });
    return true;
  };

  // Movies with an official YouTube trailer open it; anything else falls back to the local reel.
  const playMovie = (movie: Movie) => {
    const youtubeId = TRAILERS[movie.id];
    if (youtubeId) {
      setActiveTrailer({
        youtubeId,
        title: `${movie.title} — Official Trailer`,
        subtitle: `${movie.year} • Directed by ${movie.director}`,
      });
      return;
    }
    setActivePlayer({
      isOpen: true,
      videoSrc: movie.videoSrc || '/media/climate_action.mp4',
      title: movie.title,
      subtitle: `${movie.year} • Dir. ${movie.director} • ${movie.duration}`,
      quality: movie.quality,
    });
  };

  const playReel = (reel: ReelItem) => {
    if (reel.youtubeId) {
      setActiveTrailer({
        youtubeId: reel.youtubeId,
        title: reel.title,
        subtitle: reel.source ? `${reel.category} · via ${reel.source} on YouTube` : reel.category,
      });
      return;
    }
    setActivePlayer({
      isOpen: true,
      videoSrc: reel.videoSrc,
      title: reel.title,
      subtitle: `${reel.category} Dispatch • ${reel.date}`,
      quality: '1080p HD',
    });
  };

  const closePlayer = () => {
    setActivePlayer((prev) => ({ ...prev, isOpen: false }));
  };

  // Photo Lightbox Modal
  const [activeLightbox, setActiveLightbox] = useState<{
    isOpen: boolean;
    photo: GalleryPhoto | null;
    allPhotos: GalleryPhoto[];
  }>({
    isOpen: false,
    photo: null,
    allPhotos: GALLERY_PHOTOS,
  });

  const openLightbox = (photo: GalleryPhoto, allPhotos?: GalleryPhoto[]) => {
    setActiveLightbox({
      isOpen: true,
      photo,
      allPhotos: allPhotos || GALLERY_PHOTOS,
    });
  };

  const selectLightboxPhoto = (photo: GalleryPhoto) => {
    setActiveLightbox((prev) => ({ ...prev, photo }));
  };

  const closeLightbox = () => {
    setActiveLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  // Watchlist
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('leo_watchlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['killers-of-the-flower-moon', 'inception', 'the-revenant'];
  });

  const toggleWatchlist = (movieId: string) => {
    setWatchlist((prev) => {
      const updated = prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId];
      try {
        localStorage.setItem('leo_watchlist', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isMovieSaved = (movieId: string) => watchlist.includes(movieId);

  // Quote Card Modal
  const [activeQuoteCard, setActiveQuoteCard] = useState<{
    isOpen: boolean;
    quote: { id?: string; text: string; source: string; context?: string } | null;
  }>({
    isOpen: false,
    quote: null,
  });

  const openQuoteCard = (quote: { id?: string; text: string; source: string; context?: string }) => {
    setActiveQuoteCard({
      isOpen: true,
      quote,
    });
  };

  const closeQuoteCard = () => {
    setActiveQuoteCard((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        isAudioPlaying,
        toggleAudio,
        selectedMovieForDetail,
        openMovieDetail,
        closeMovieDetail,
        activePlayer,
        playMovie,
        playTrailerById,
        activeTrailer,
        closeTrailer,
        playReel,
        closePlayer,
        activeLightbox,
        openLightbox,
        selectLightboxPhoto,
        closeLightbox,
        activeQuoteCard,
        openQuoteCard,
        closeQuoteCard,
        watchlist,
        toggleWatchlist,
        isMovieSaved,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
