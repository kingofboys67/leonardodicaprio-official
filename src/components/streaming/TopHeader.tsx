import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Bookmark,
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Menu,
} from 'lucide-react';
import { STREAM_GENRES } from '../../data/content';

interface TopHeaderProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  isSidebarCollapsed: boolean;
  onToggleMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  selectedGenre,
  onSelectGenre,
  searchQuery,
  onSearchChange,
  watchlistCount,
  onOpenWatchlist,
  isAudioPlaying,
  onToggleAudio,
  isSidebarCollapsed,
  onToggleMobileMenu,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Global ⌘K hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: '1',
      title: 'Killers of the Flower Moon (4K HDR)',
      time: '15m ago',
      desc: 'Martin Scorsese’s masterpiece is now available in Dolby Atmos 4K.',
      unread: true,
    },
    {
      id: '2',
      title: 'New Re:wild Dispatch Released',
      time: '2h ago',
      desc: 'Exclusive footage from Galápagos Floreana Island restoration initiative.',
      unread: true,
    },
    {
      id: '3',
      title: 'Academy Awards Collection Remastered',
      time: '1d ago',
      desc: 'The Revenant & The Aviator director’s commentary audio track added.',
      unread: false,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-30 bg-[#080b11]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300 ${
        isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col gap-3">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-3">
          {/* Mobile menu button & brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onToggleMobileMenu}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 font-black text-sm tracking-wider text-white">
              CINE<span className="text-orange-500">STREAM</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search films, directors, genres, quotes (e.g. Scorsese, Inception)..."
                className="w-full bg-[#111625] text-slate-100 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-20 py-2.5 rounded-xl border border-slate-800 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-inner"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 rounded border border-slate-700/60 shadow-sm">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Atmosphere Drone */}
            <button
              onClick={onToggleAudio}
              title={isAudioPlaying ? 'Mute ambient sound' : 'Play ambient oceanic drone'}
              className={`p-2.5 rounded-xl border transition-all ${
                isAudioPlaying
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 shadow-md shadow-orange-950/40'
                  : 'bg-slate-800/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Watchlist Quick Button */}
            <button
              onClick={onOpenWatchlist}
              className="relative p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Open Watchlist"
            >
              <Bookmark className="w-4 h-4" />
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-orange-500/50">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* Notifications with Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setHasUnread(false);
                }}
                className="relative p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {hasUnread && (
                  <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-[#080b11]" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#111625] border border-slate-700/80 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Premieres & Updates
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-400 font-bold">
                        3 New
                      </span>
                    </div>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-orange-400 transition-colors">
                            {n.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* VIP Pass Button */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all cursor-pointer">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VIP Stream</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scroll Shelf) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          {STREAM_GENRES.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => onSelectGenre(genre)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold shadow-md shadow-orange-950/40'
                    : 'bg-[#111625] text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
