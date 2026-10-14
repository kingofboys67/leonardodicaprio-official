import React from 'react';
import { Sparkles } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';
import { LegacyStory } from '../components/LegacyStory';

export const LegacyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageBanner
        badge="Legacy"
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
        title="His Life, His Work, His Legacy"
        highlightWord="Legacy"
        description="Where he came from, how he became who he is, what he gave to Hollywood, what he believes, and what he will be remembered for."
        metaTitle="Legacy & Biography | Leonardo DiCaprio Official"
        metaDescription="Explore Leonardo DiCaprio's 30+ year artistic journey, the iconic Martin Scorsese partnership, and his lifelong devotion to environmental preservation."
        bgGradient="from-emerald-950/20 via-amber-500/5 to-transparent"
      />
      <LegacyStory />
    </div>
  );
};
