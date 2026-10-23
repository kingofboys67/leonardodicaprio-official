import React, { useState } from 'react';
import { Globe, Play, ExternalLink } from 'lucide-react';
import { CHARITY_PROJECTS, REELS_DATA, IMPACT_METRICS, ReelItem } from '../../data/content';

interface DocuStreamSectionProps {
  onPlayReel: (reel: ReelItem) => void;
}

export const DocuStreamSection: React.FC<DocuStreamSectionProps> = ({ onPlayReel }) => {
  const [activeTab, setActiveTab] = useState<'dispatches' | 'initiatives'>('dispatches');

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Conservation <span className="emerald-text-gradient">Dispatches & Originals</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-world planet defense: Re:wild, Earth Alliance, and frontline indigenous dispatches
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111625] border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('dispatches')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'dispatches'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Video Dispatches ({REELS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'initiatives'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Global Missions ({CHARITY_PROJECTS.length})
          </button>
        </div>
      </div>

      {/* Impact Stat Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {IMPACT_METRICS.map((metric, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-[#111625]/90 border border-emerald-500/20 backdrop-blur-md relative overflow-hidden"
          >
            <div className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">
              {metric.value}
            </div>
            <div className="text-xs font-semibold text-emerald-400 mb-0.5">{metric.label}</div>
            <div className="text-[10px] text-slate-400 leading-tight">{metric.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'dispatches' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REELS_DATA.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onPlayReel(reel)}
              className="group relative rounded-2xl overflow-hidden bg-[#111625] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer flex flex-col justify-between"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <video
                  src={reel.videoSrc}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  muted
                  playsInline
                  preload="metadata"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-black/40 to-transparent" />

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/90 group-hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/80 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white border border-white/10">
                  {reel.duration}
                </div>

                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  {reel.category}
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-3.5">
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mb-1">
                  {reel.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {reel.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHARITY_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl overflow-hidden bg-[#111625] border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                  {proj.organization}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{proj.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{proj.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-emerald-400">{proj.impactMetric}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">{proj.impactLabel}</div>
                  </div>

                  <a
                    href={proj.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white text-xs font-bold transition-all border border-emerald-500/30"
                  >
                    <span>Support</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
