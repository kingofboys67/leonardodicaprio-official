'use client';

import React from 'react';
import { Film } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';
import { FilmographyBrowser } from '../components/FilmographyBrowser';

export const FilmographyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageBanner
        badge="Official Filmography"
        badgeIcon={<Film className="w-3.5 h-3.5 text-[#F28C28]" />}
        title="Complete Filmography & Masterpieces"
        highlightWord="Masterpieces"
        description="Every film, series and documentary Leonardo DiCaprio has acted in, with his ten most loved films ranked by fans."
        bgGradient="from-amber-600/15 via-[#F28C28]/5 to-transparent"
      />
      <FilmographyBrowser />
    </div>
  );
};
