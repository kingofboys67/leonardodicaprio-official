'use client';

import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Download, Sparkles } from 'lucide-react';

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: {
    id?: string;
    text: string;
    source: string;
    context?: string;
  } | null;
}

export const QuoteCardModal: React.FC<QuoteCardModalProps> = ({ isOpen, onClose, quote }) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !quote) return null;

  const quoteId = quote.id || 'oscar-2016';
  const ogImageUrl = `/api/og?id=${encodeURIComponent(quoteId)}&text=${encodeURIComponent(quote.text)}&source=${encodeURIComponent(quote.source)}`;
  const shareText = `“${quote.text}” — Leonardo DiCaprio (${quote.source})`;
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/legacy?quote=${encodeURIComponent(quoteId)}` : 'https://leonardodicaprioofficial.com';

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTwitterShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `“${quote.text.slice(0, 180)}...” — @LeoDiCaprio`
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Leonardo DiCaprio Quote Card',
          text: shareText,
          url: shareUrl,
        });
      } catch (e) {
        // User cancelled or share failed
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c101c] border border-orange-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span id="quote-modal-title" className="font-bold uppercase tracking-wider">
              Shareable Quote Card · Auto-Generated OG
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quote modal"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Visual Preview */}
        <div
          className="relative rounded-2xl p-6 sm:p-8 mb-6 border border-white/15 overflow-hidden shadow-inner"
          style={{
            background: 'radial-gradient(circle at 10% 20%, #1a2233 0%, #0d121f 50%, #1c0e07 100%)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center text-[10px] font-black text-white">
              LD
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/80 font-bold">
              LEONARDO DiCAPRIO · OFFICIAL
            </span>
          </div>

          <blockquote className="text-lg sm:text-xl font-serif italic text-white leading-relaxed mb-4">
            “{quote.text}”
          </blockquote>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-400">
            <span>— {quote.source}</span>
            {quote.context && (
              <>
                <span className="text-white/30">·</span>
                <span className="text-white/60 font-normal text-xs">{quote.context}</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={handleTwitterShare}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Post on X</span>
          </button>

          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Quote'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <a
            href={ogImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 hover:scale-[1.02] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>OG Card</span>
          </a>
        </div>
      </div>
    </div>
  );
};
