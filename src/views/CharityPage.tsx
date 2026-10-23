'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowDown, CheckCircle2, Globe2, HandHeart, Heart, Mail, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { submitForm } from '../lib/submitForm';
import {
  CHARITY_STATS,
  CHARITY_STORY,
  DONATE_AMOUNTS,
  FOCUS_AREAS,
  PLEDGE_ITEMS,
  WORK,
} from '../data/charity';

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-xs font-mono font-bold uppercase tracking-wider mb-3" style={{ color: '#6EE7B7' }}>
    {children}
  </div>
);

const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div role="heading" aria-level={2} className={`cinema-title text-3xl sm:text-5xl font-black tracking-tight ${className}`} style={{ color: '#FFFFFF' }}>
    {children}
  </div>
);

export const CharityPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [amount, setAmount] = useState('$50');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState<'idle' | 'sending' | 'sent' | 'error' | 'soon'>('idle');
  const [picked, setPicked] = useState<string[]>([]);
  const [pledgeName, setPledgeName] = useState('');
  const [pledged, setPledged] = useState(false);



  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Some browsers pause background video until asked; start it explicitly (muted autoplay is allowed).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const submitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sent === 'sending') return;
    setSent('sending');
    const result = await submitForm('donation', {
      amount,
      name: form.name,
      email: form.email,
      message: form.message || '(none provided)',
    });
    if (result.ok) setSent('sent');
    else setSent(result.reason === 'not-configured' ? 'soon' : 'error');
  };

  const submitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (picked.length === 0) return;
    setPledged(true);
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.7 }, colors: ['#10b981', '#34d399', '#fef08a', '#F28C28'] });
  };

  const toggle = (item: string) => setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen dark-scope bg-[#07090f]">
      {/* Hero with looping footage */}
      <div className="relative mt-20 h-[78vh] min-h-[520px] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover scale-110"
          src="/media/rewild_biodiversity.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-[#07090f]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 60% at 20% 55%, rgba(16,185,129,0.20) 0%, transparent 65%)' }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-6 border border-emerald-400/40 bg-black/40 backdrop-blur-md" style={{ color: '#6EE7B7' }}>
              <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span className="font-semibold uppercase tracking-widest text-[11px]">Conservation &amp; Climate</span>
            </div>
            <h1
              className="cinema-title text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]"
              style={{ color: '#FFFFFF', textShadow: '0 4px 28px rgba(0,0,0,0.6)' }}
            >
              Defending Earth&apos;s <span className="emerald-text-gradient">Wild Heart</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 2px 14px rgba(0,0,0,0.7)' }}>
              For more than twenty-five years, Leonardo DiCaprio has put his voice and his influence behind protecting the
              natural world. This is the work, and how you can stand with it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('donate')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-sm shadow-lg shadow-emerald-950/50 hover:scale-105 transition-all cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                <HandHeart className="w-4 h-4" />
                <span>Donate</span>
              </button>
              <button
                onClick={() => scrollTo('pledge')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm font-semibold text-sm transition-all cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                <span>Take the pledge</span>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute right-5 bottom-5 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer"
          style={{ color: '#FFFFFF' }}
          aria-label={muted ? 'Unmute background video' : 'Mute background video'}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <ArrowDown className="absolute left-1/2 -translate-x-1/2 bottom-5 z-10 w-5 h-5 animate-bounce" style={{ color: 'rgba(255,255,255,0.7)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Numbers */}
        <section className="py-16 sm:py-24">
          <div className="max-w-3xl mb-10">
            <Eyebrow>The impact so far</Eyebrow>
            <Title>What this work has <span className="emerald-text-gradient">achieved</span></Title>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {CHARITY_STATS.map((s) => (
              <div key={s.label} className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <div className="text-4xl sm:text-5xl font-black" style={{ color: '#34D399' }}>{s.value}</div>
                <div className="mt-2 text-sm font-bold" style={{ color: '#FFFFFF' }}>{s.label}</div>
                <div className="mt-1 text-xs" style={{ color: '#B9C1D0' }}>{s.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What we protect */}
        <section className="pb-16 sm:pb-24">
          <div className="max-w-3xl mb-10">
            <Eyebrow>What is at stake</Eyebrow>
            <Title>What we <span className="emerald-text-gradient">protect</span></Title>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOCUS_AREAS.map((f) => (
              <div key={f.title} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <img src={f.image} alt={f.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="text-xl font-black" style={{ color: '#FFFFFF' }}>{f.title}</div>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leonardo's story */}
        <section className="pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>His story</Eyebrow>
            <Title>A lifelong <span className="emerald-text-gradient">commitment</span></Title>
            <p className="mt-5 text-base leading-relaxed" style={{ color: '#B9C1D0' }}>
              Long before the awards, Leonardo was already speaking up for the planet. This is how that commitment has
              grown, from a young foundation to a worldwide network of conservation groups.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm" style={{ color: '#6EE7B7' }}>
              <Globe2 className="w-4 h-4" />
              <Link to="/legacy" className="font-bold hover:underline">Read his full story</Link>
            </div>
          </div>
          <ol className="lg:col-span-7 relative border-l-2 border-emerald-500/30 ml-3 space-y-5">
            {CHARITY_STORY.map((m) => (
              <li key={m.year} className="pl-7 relative">
                <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#07090f] border-2 border-emerald-400" />
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                  <div className="font-mono text-sm font-bold" style={{ color: '#34D399' }}>{m.year}</div>
                  <div className="mt-1 text-lg font-bold" style={{ color: '#FFFFFF' }}>{m.title}</div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: '#B9C1D0' }}>{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Where the work happens */}
        <section className="pb-16 sm:pb-24">
          <div className="max-w-3xl mb-10">
            <Eyebrow>On the ground</Eyebrow>
            <Title>Where the work <span className="emerald-text-gradient">happens</span></Title>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WORK.map((w) => (
              <div key={w.title} className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <Sparkles className="w-5 h-5 mb-3" style={{ color: '#34D399' }} />
                <div className="text-lg font-bold" style={{ color: '#FFFFFF' }}>{w.title}</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#B9C1D0' }}>{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Donate */}
        <section id="donate" className="pb-16 sm:pb-24 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-[#0b1d17] via-[#0c1a1f] to-[#0c101c] p-6 sm:p-12">
            <div className="lg:col-span-5">
              <Eyebrow>Stand with the work</Eyebrow>
              <Title>Make a <span className="emerald-text-gradient">donation</span></Title>
              <p className="mt-5 text-base leading-relaxed" style={{ color: '#B9C1D0' }}>
                Tell us how much you would like to give and we will reply with the details. Every gift helps defend
                wildlife, forests, oceans and the people who protect them.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm" style={{ color: '#B9C1D0' }}>
                <Mail className="w-4 h-4" style={{ color: '#34D399' }} />
                <span>Your message goes straight to our team. We do not take payments on this site.</span>
              </div>
            </div>

            <form onSubmit={submitDonation} className="lg:col-span-7 space-y-5">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: '#B9C1D0' }}>Amount you are considering</div>
                <div className="flex flex-wrap gap-2">
                  {DONATE_AMOUNTS.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                        amount === a ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md' : 'bg-white/5 hover:bg-white/10 border border-white/15'
                      }`}
                      style={{ color: '#FFFFFF' }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm outline-none focus:border-emerald-400 placeholder:text-slate-400"
                  style={{ color: '#FFFFFF' }}
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your email"
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm outline-none focus:border-emerald-400 placeholder:text-slate-400"
                  style={{ color: '#FFFFFF' }}
                />
              </div>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="A message (optional)"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm outline-none focus:border-emerald-400 placeholder:text-slate-400 resize-none"
                style={{ color: '#FFFFFF' }}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                <HandHeart className="w-4 h-4" />
                <span>{sent === 'sending' ? 'Sending…' : 'Send my donation message'}</span>
              </button>
              {sent === 'sent' && (
                <p className="text-sm" style={{ color: '#6EE7B7' }}>Thank you! Your message has been sent to our team, and we will reply with the details.</p>
              )}
              {sent === 'soon' && (
                <p className="text-sm" style={{ color: '#FCD34D' }}>Donations are opening soon. Please check back shortly.</p>
              )}
              {sent === 'error' && (
                <p className="text-sm" style={{ color: '#FCA5A5' }}>Sorry, something went wrong and your message was not sent. Please try again in a moment.</p>
              )}
            </form>
          </div>
        </section>

        {/* Pledge */}
        <section id="pledge" className="pb-24 scroll-mt-28">
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-12">
            <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: '#34D399' }} />
            <Title>Take the <span className="emerald-text-gradient">pledge</span></Title>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#B9C1D0' }}>
              Choose the promises you will keep. Small changes, made by many people, add up.
            </p>

            {pledged ? (
              <div className="mt-8">
                <CheckCircle2 className="w-12 h-12 mx-auto" style={{ color: '#34D399' }} />
                <div className="mt-3 text-2xl font-black" style={{ color: '#FFFFFF' }}>Thank you{pledgeName ? `, ${pledgeName}` : ''}.</div>
                <p className="mt-2 text-sm" style={{ color: '#B9C1D0' }}>You pledged to keep {picked.length} {picked.length === 1 ? 'promise' : 'promises'} for the planet.</p>
                <button
                  onClick={() => {
                    setPledged(false);
                    setPicked([]);
                  }}
                  className="mt-5 text-sm font-semibold underline cursor-pointer"
                  style={{ color: '#6EE7B7' }}
                >
                  Make another pledge
                </button>
              </div>
            ) : (
              <form onSubmit={submitPledge} className="mt-8 text-left">
                <div className="space-y-2">
                  {PLEDGE_ITEMS.map((item) => {
                    const on = picked.includes(item);
                    return (
                      <label
                        key={item}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${on ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25'}`}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggle(item)} className="w-4 h-4 accent-emerald-500" />
                        <span className="text-sm" style={{ color: '#FFFFFF' }}>{item}</span>
                      </label>
                    );
                  })}
                </div>
                <input
                  value={pledgeName}
                  onChange={(e) => setPledgeName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="mt-4 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm outline-none focus:border-emerald-400 placeholder:text-slate-400"
                  style={{ color: '#FFFFFF' }}
                />
                <div className="mt-5 text-center">
                  <button
                    type="submit"
                    disabled={picked.length === 0}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-sm shadow-lg enabled:hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    style={{ color: '#FFFFFF' }}
                  >
                    I pledge
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
