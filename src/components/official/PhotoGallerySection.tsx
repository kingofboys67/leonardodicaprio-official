'use client';

import React, { useState } from 'react';
import {
  Maximize2,
  Camera,
} from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../../data/content';

interface PhotoGallerySectionProps {
  onOpenPhotoLightbox: (photo: GalleryPhoto, allPhotos: GalleryPhoto[]) => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  onOpenPhotoLightbox,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(36);

  const categories = [
    'All',
    'Red Carpet & Premieres',
    'With Co-Stars & Directors',
    'Portraits',
    'Film Stills',
    'Movie Covers',
    'People',
    'Nature & Wildlife',
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'All') return true;
    return photo.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>OFFICIAL ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight cinema-title">
              Photos & <span className="text-orange-500">Candid Archive</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Red carpets, portraits, moments with co-stars and directors, film stills, movie posters, and more.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span className="text-orange-400 font-bold">{filteredPhotos.length}</span> photos
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(36);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-950/40'
                    : 'bg-[#111625] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {filteredPhotos.slice(0, visibleCount).map((photo) => (
            <div
              key={photo.id}
              onClick={() => onOpenPhotoLightbox(photo, filteredPhotos)}
              className="group relative rounded-2xl overflow-hidden bg-[#111625] border border-slate-800 hover:border-orange-500/60 transition-all duration-300 shadow-xl cursor-pointer break-inside-avoid mb-5"
            >
              {/* Photo Image */}
              <div className="relative overflow-hidden bg-slate-900">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Top Year Badge */}
                {photo.year && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md border border-white/10" style={{ color: '#E2E8F0' }}>
                    {photo.year}
                  </div>
                )}

                {/* Center Hover Magnifier */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-950/60 scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3.5">
                  <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block mb-0.5">
                    {photo.category}
                  </span>
                  <div className="text-sm font-bold group-hover:text-orange-200 transition-colors line-clamp-1 mb-1" style={{ color: '#FFFFFF' }}>
                    {photo.title}
                  </div>
                  <p className="text-[11px] line-clamp-2 leading-relaxed font-light" style={{ color: '#CBD5E1' }}>
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredPhotos.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + 36)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              Show more photos ({filteredPhotos.length - visibleCount} left)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
