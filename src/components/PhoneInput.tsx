'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRIES, flagEmoji } from '../data/countries';

interface PhoneInputProps {
  country: string;
  number: string;
  onCountryChange: (iso: string) => void;
  onNumberChange: (value: string) => void;
  required?: boolean;
}

/** Phone field with a tappable country picker (flag and dialling code) in front of the number. */
export const PhoneInput: React.FC<PhoneInputProps> = ({ country, number, onCountryChange, onNumberChange, required }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRIES.find((c) => c.iso === country) ?? COUNTRIES.find((c) => c.iso === 'US')!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, '');
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.replace('+', '').startsWith(q) || c.iso.toLowerCase() === q);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => searchRef.current?.focus(), 30);
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = (iso: string) => {
    onCountryChange(iso);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm hover:border-amber-400 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
          style={{ color: 'var(--text)' }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code, currently ${selected.name} ${selected.dial}`}
        >
          <span className="text-lg leading-none">{flagEmoji(selected.iso)}</span>
          <span className="font-mono">{selected.dial}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <input
          type="tel"
          inputMode="tel"
          required={required}
          value={number}
          onChange={(e) => onNumberChange(e.target.value.replace(/[^\d\s-]/g, ''))}
          placeholder="Phone number"
          autoComplete="tel-national"
          className="min-w-0 flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-colors font-sans"
          style={{ color: 'var(--text)' }}
        />
      </div>

      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden"
          style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2 px-3 py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
            <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: 'var(--text)' }}
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto overscroll-contain py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>No country found</li>
            )}
            {filtered.map((c) => (
              <li key={c.iso} role="option" aria-selected={c.iso === country}>
                <button
                  type="button"
                  onClick={() => pick(c.iso)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-amber-400/15 cursor-pointer ${c.iso === country ? 'bg-amber-400/10' : ''}`}
                  style={{ color: 'var(--text)' }}
                >
                  <span className="text-lg leading-none">{flagEmoji(c.iso)}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{c.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
