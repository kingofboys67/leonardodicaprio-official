'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Film, Sliders, Eye, RefreshCw } from 'lucide-react';

interface HeroMotionProps {
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
}

export const HeroMotion: React.FC<HeroMotionProps> = ({ onNavigate, onOpenSearch }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 3D Parallax Tilt state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothTilt, setSmoothTilt] = useState({ rx: 0, ry: 0 });
  const [waveMode, setWaveMode] = useState<'liquid' | 'aurora' | 'pulse'>('liquid');
  const [selectedPhoto, setSelectedPhoto] = useState<string>('/leo_hero.jpg');
  const [isPhotoSwitched, setIsPhotoSwitched] = useState(false);

  // Available hero photos to switch between
  const heroOptions = [
    { name: 'Turned Back (Cinematic)', src: '/leo_hero.jpg', tag: 'Dribbble Motion Focus' },
    { name: 'Green Carpet Gala', src: '/media/leo_greencarpet.jpg', tag: 'Activism Gala' },
    { name: 'Killers of the Flower Moon', src: '/media/killers_flower_moon.jpg', tag: 'Scorsese Feature' },
    { name: 'UN Climate COP26', src: '/media/leo_cop26.jpg', tag: 'Summit Address' },
  ];

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Smooth interpolation for 3D tilt
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setSmoothTilt((prev) => ({
        rx: prev.rx + (mousePos.y * -14 - prev.rx) * 0.08,
        ry: prev.ry + (mousePos.x * 18 - prev.ry) * 0.08,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Fluid Wave Canvas Animation (Sphere / Wave effect from Dribbble UI)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;
    let animId: number;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5 + mousePos.x * 40;
      const centerY = height * 0.45 + mousePos.y * 30;
      const baseRadius = Math.min(width, height) * 0.28;

      // Draw concentric liquid glass wave rings (like Dribbble Sphere)
      const ringCount = waveMode === 'liquid' ? 8 : waveMode === 'aurora' ? 12 : 5;

      for (let i = ringCount; i >= 1; i--) {
        ctx.beginPath();
        const progress = i / ringCount;
        const currentRadius = baseRadius * (0.5 + progress * 0.9);

        // Deformed circular wave path
        const points = 36;
        for (let p = 0; p <= points; p++) {
          const angle = (p / points) * Math.PI * 2;
          const waveOffset1 = Math.sin(angle * 3 + t * 2 + i * 0.8) * 16 * (1 - progress * 0.4);
          const waveOffset2 = Math.cos(angle * 5 - t * 1.5 + i * 0.5) * 10 * progress;
          const mouseDisplace = (mousePos.x * Math.cos(angle) + mousePos.y * Math.sin(angle)) * 25;

          const r = currentRadius + waveOffset1 + waveOffset2 + mouseDisplace;
          const px = centerX + Math.cos(angle) * r;
          const py = centerY + Math.sin(angle) * r;

          if (p === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        // Wave gradient styling
        if (waveMode === 'liquid') {
          const grad = ctx.createRadialGradient(centerX, centerY, baseRadius * 0.2, centerX, centerY, currentRadius * 1.3);
          grad.addColorStop(0, `rgba(6, 182, 212, ${0.18 / i})`);
          grad.addColorStop(0.5, `rgba(16, 185, 129, ${0.14 / i})`);
          grad.addColorStop(1, 'rgba(6, 9, 14, 0)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.strokeStyle = `rgba(110, 231, 183, ${0.25 - progress * 0.18})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (waveMode === 'aurora') {
          ctx.strokeStyle = `hsla(${(t * 40 + i * 25) % 360}, 75%, 65%, ${0.35 - progress * 0.22})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          // Pulse mode
          const pulseAlpha = (Math.sin(t * 3 - i * 0.6) + 1) * 0.12;
          ctx.fillStyle = `rgba(212, 175, 55, ${pulseAlpha})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(251, 191, 36, ${0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw floating luminous particle specks
      for (let p = 0; p < 18; p++) {
        const pAngle = t * 0.4 + p * (Math.PI * 2 / 18);
        const pDist = baseRadius * 1.05 + Math.sin(t * 2 + p) * 35;
        const pX = centerX + Math.cos(pAngle) * pDist;
        const pY = centerY + Math.sin(pAngle) * pDist;

        ctx.beginPath();
        ctx.arc(pX, pY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 ? 'rgba(52, 211, 153, 0.7)' : 'rgba(253, 224, 71, 0.6)';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mousePos, waveMode]);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#06090e] via-[#090e18] to-[#06090e]"
    >
      {/* Background Ambient Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Decorative Grid Light Lines */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full flex flex-col items-center">
        
        {/* Top Floating Telemetry Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-xs font-medium text-emerald-300 mb-8 animate-fadeIn shadow-lg shadow-emerald-950/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="tracking-widest uppercase text-[11px] font-mono">
            Official Sphere Motion Experience
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">UN Messenger of Peace</span>
        </div>

        {/* Central Kinetic Visual & Title Split Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Bio Intro */}
          <div className="lg:col-span-4 text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-emerald-400 font-mono mb-2">
              The Official Archive
            </h2>
            <h1 className="cinema-title text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-4">
              LEONARDO <br />
              <span className="gold-text-gradient">DiCAPRIO</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-light">
              Actor, visionary producer, and lifelong environmental activist. Dedicated to the craft of transformative cinema and the defense of Earth's most critical wild ecosystems.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900/80 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Academy Award Winner
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                Co-Founder Re:wild
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <button
                onClick={() => onNavigate('charity')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Support Re:wild Charity</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('movies')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-panel hover:bg-slate-800/80 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all border border-slate-700/80"
              >
                <Film className="w-4 h-4 text-amber-300" />
                <span>Explore Filmography</span>
              </button>
            </div>
          </div>

          {/* Center Column: The Kinetic Leonardo Motion Portrait (Turned Back with Wave Aura) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <div
              className="relative group cursor-pointer"
              style={{
                perspective: '1200px',
              }}
            >
              {/* Outer Luminous Sphere Wave Ring Aura */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-emerald-500/30 via-cyan-500/20 to-amber-400/20 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow pointer-events-none" />

              {/* Glassmorphic Concentric Orbit Rings */}
              <div className="absolute -inset-10 rounded-full border border-emerald-500/20 border-dashed animate-spin-slow pointer-events-none" />
              <div className="absolute -inset-16 rounded-full border border-cyan-500/10 pointer-events-none" />

              {/* 3D Motion Card with Fluid Wave Distortion */}
              <div
                className="relative w-72 sm:w-84 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden glass-panel border border-slate-700/70 shadow-2xl transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${smoothTilt.rx}deg) rotateY(${smoothTilt.ry}deg) translateZ(20px)`,
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(16, 185, 129, 0.25)',
                }}
              >
                {/* Leonardo DiCaprio Hero Portrait */}
                <img
                  src={selectedPhoto}
                  alt="Leonardo DiCaprio — Official Hero Motion Portrait"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Fluid Wave Refraction Overlay Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-transparent opacity-80" />
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${50 + mousePos.x * 40}% ${50 + mousePos.y * 40}%, rgba(16, 185, 129, 0.6) 0%, rgba(6, 182, 212, 0.3) 40%, transparent 80%)`,
                  }}
                />

                {/* Subtle Kinetic Scanning Line */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent h-20 w-full animate-float pointer-events-none" />

                {/* Overlay Badge at Bottom of Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass-panel border border-white/10 backdrop-blur-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider block">
                      Visual Wave Tracking
                    </span>
                    <span className="text-xs font-semibold text-white">
                      Leonardo DiCaprio
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900/90 text-amber-300 border border-amber-500/30">
                    Live Parallax
                  </span>
                </div>
              </div>

              {/* Interactive Photo Swapper Trigger */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Portrait Perspective:</span>
                <div className="flex gap-1.5">
                  {heroOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhoto(opt.src)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all ${
                        selectedPhoto === opt.src
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                      title={opt.tag}
                    >
                      {idx === 0 ? 'Back (Sphere Motion)' : `Angle ${idx + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Wave Controls & Live Metrics */}
          <div className="lg:col-span-3 flex flex-col gap-4 order-3">
            
            {/* Wave Mode Selector (Sphere Motion Design) */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono flex items-center gap-1.5 text-emerald-400">
                  <Sliders className="w-3.5 h-3.5" />
                  Sphere Wave Dynamics
                </span>
                <span className="text-[10px] font-mono text-slate-500">Dribbble Mode</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {(['liquid', 'aurora', 'pulse'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setWaveMode(mode)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-mono capitalize transition-all text-center ${
                      waveMode === mode
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Impact Metric Card */}
            <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-950/15 flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                Philanthropic Landmark
              </span>
              <div className="flex items-baseline gap-2">
                <span className="cinema-title text-2xl font-black text-white">$100M+</span>
                <span className="text-xs text-slate-300">committed</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct funding across 80+ nations for forest conservation, ocean sanctuaries, and indigenous land protection.
              </p>
              <button
                onClick={() => onNavigate('charity')}
                className="mt-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors self-start"
              >
                <span>Read Charity Manifesto</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Reel Highlight Card */}
            <div
              onClick={() => onNavigate('reels')}
              className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 cursor-pointer transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  Media Reel Archive
                </span>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate block">
                  170+ Archival Video Clips
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 transition-colors" />
            </div>

            {/* Search Launcher Card */}
            <button
              onClick={onOpenSearch}
              className="p-3.5 rounded-2xl glass-panel hover:bg-slate-800/60 border border-slate-800 text-left transition-all flex items-center justify-between text-xs text-slate-300 group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Search Films, Quotes & Charites</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-slate-900 text-slate-400 rounded border border-slate-800">
                ⌘K
              </kbd>
            </button>

          </div>

        </div>

      </div>

      {/* Live Status Marquee Ticker */}
      <div className="mt-16 w-full border-y border-slate-800/80 bg-slate-950/60 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-8 items-center text-xs font-mono uppercase tracking-widest text-slate-400">
          <span className="text-emerald-400 font-semibold">★ ACADEMY AWARD WINNER</span>
          <span>•</span>
          <span>CO-FOUNDER, RE:WILD</span>
          <span>•</span>
          <span className="text-amber-300 font-semibold">UN MESSENGER OF PEACE</span>
          <span>•</span>
          <span>OVER $100M PHILANTHROPIC GRANTS</span>
          <span>•</span>
          <span className="text-cyan-400">100M+ ACRES WILDERNESS PROTECTED</span>
          <span>•</span>
          <span>6 COLLABORATIONS WITH MARTIN SCORSESE</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">★ ACADEMY AWARD WINNER</span>
          <span>•</span>
          <span>CO-FOUNDER, RE:WILD</span>
          <span>•</span>
          <span className="text-amber-300 font-semibold">UN MESSENGER OF PEACE</span>
          <span>•</span>
          <span>OVER $100M PHILANTHROPIC GRANTS</span>
        </div>
      </div>
    </section>
  );
};
