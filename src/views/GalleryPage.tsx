'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';
import { PhotoGallerySection } from '../components/official/PhotoGallerySection';
import { useApp } from '../context/AppContext';

export const GalleryPage: React.FC = () => {
  const { openLightbox } = useApp();

  return (
    <div className="min-h-screen">
      <PageBanner
        badge="Archival Photo Vault"
        badgeIcon={<Camera className="w-3.5 h-3.5 text-orange-400" />}
        title="Official Photo Gallery & Candid Archive"
        highlightWord="Archive"
        description="Exclusive high-resolution portraits, red carpet moments, rare on-set stills, and environmental field expeditions across the globe."
        bgGradient="from-orange-600/15 via-amber-500/5 to-transparent"
      />
      <PhotoGallerySection onOpenPhotoLightbox={openLightbox} />
    </div>
  );
};
