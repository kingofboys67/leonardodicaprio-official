'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../../data/content';

interface PhotoLightboxModalProps {
  photo: GalleryPhoto | null;
  allPhotos: GalleryPhoto[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photo,
  allPhotos,
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photo, allPhotos]);

  if (!isOpen || !photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    onSelectPhoto(allPhotos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    onSelectPhoto(allPhotos[prevIndex]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-400 text-xs font-mono font-bold border border-orange-500/30">
            {photo.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} of {allPhotos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md z-20 transition-all hover:scale-110"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md z-20 transition-all hover:scale-110"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Photo Image */}
      <div className="max-w-5xl max-h-[80vh] flex flex-col items-center justify-center">
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.title}
          className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
        />

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="text-base font-bold mb-1 cinema-title" style={{ color: '#FFFFFF' }}>
            {photo.title}{photo.year ? ` (${photo.year})` : ''}
          </div>
          <p className="text-xs text-slate-300 font-light">{photo.caption}</p>
          {photo.credit && (
            <p className="text-[11px] text-slate-400 mt-1">
              {photo.creditUrl ? (
                <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-400">
                  {photo.credit}
                </a>
              ) : (
                photo.credit
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
