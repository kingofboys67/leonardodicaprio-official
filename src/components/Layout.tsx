'use client';

import React from 'react';
import { Header } from './official/Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { PageTransition } from './PageTransition';
import { VideoPlayerModal } from './streaming/VideoPlayerModal';
import { TrailerModal } from './streaming/TrailerModal';
import { MovieDetailModal } from './streaming/MovieDetailModal';
import { PhotoLightboxModal } from './official/PhotoLightboxModal';
import { SearchModal } from './SearchModal';
import { QuoteCardModal } from './QuoteCardModal';
import { useApp } from '../context/AppContext';

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const {
    activePlayer,
    closePlayer,
    selectedMovieForDetail,
    closeMovieDetail,
    playMovie,
    activeTrailer,
    closeTrailer,
    watchlist,
    toggleWatchlist,
    activeLightbox,
    closeLightbox,
    selectLightboxPhoto,
    activeQuoteCard,
    closeQuoteCard,
  } = useApp();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-250 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Auto scroll-to-top on route navigation */}
      <ScrollToTop />

      {/* Shared Header Navigation */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      {/* Shared Global Footer */}
      <Footer />

      {/* Global Modals (accessible across every page) */}
      <VideoPlayerModal
        isOpen={activePlayer.isOpen}
        onClose={closePlayer}
        videoSrc={activePlayer.videoSrc}
        title={activePlayer.title}
        subtitle={activePlayer.subtitle}
        quality={activePlayer.quality}
      />

      <TrailerModal
        isOpen={!!activeTrailer}
        onClose={closeTrailer}
        youtubeId={activeTrailer?.youtubeId ?? ''}
        title={activeTrailer?.title ?? ''}
        subtitle={activeTrailer?.subtitle}
      />

      <MovieDetailModal
        movie={selectedMovieForDetail}
        isOpen={!!selectedMovieForDetail}
        onClose={closeMovieDetail}
        onPlayMovie={playMovie}
        isSaved={selectedMovieForDetail ? watchlist.includes(selectedMovieForDetail.id) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      <PhotoLightboxModal
        isOpen={activeLightbox.isOpen}
        photo={activeLightbox.photo}
        allPhotos={activeLightbox.allPhotos}
        onClose={closeLightbox}
        onSelectPhoto={selectLightboxPhoto}
      />

      <SearchModal />
      <QuoteCardModal
        isOpen={activeQuoteCard.isOpen}
        onClose={closeQuoteCard}
        quote={activeQuoteCard.quote}
      />
    </div>
  );
};
