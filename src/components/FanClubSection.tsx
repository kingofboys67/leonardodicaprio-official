'use client';

import React, { useState } from 'react';
import { Sparkles, Award, CheckCircle, ArrowRight, Download, HelpCircle, Mail, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRIVIA_QUESTIONS } from '../data/content';
import { submitForm } from '../lib/submitForm';
import { PhoneInput } from './PhoneInput';
import { COUNTRIES, guessCountry } from '../data/countries';

export const FanClubSection: React.FC = () => {
  // Membership Card Customization
  const [memberName, setMemberName] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [memberPhone, setMemberPhone] = useState<string>('');
  const [phoneCountry, setPhoneCountry] = useState<string>(() => guessCountry());
  const [memberReason, setMemberReason] = useState<string>('');
  const [memberAddress, setMemberAddress] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'soon'>('idle');

  // Trivia State
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'soon'>('idle');

  // Claim the fan card and send the member's details straight to the management inbox
  const handleClaimPass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendStatus === 'sending') return;
    setSendStatus('sending');
    const dialCode = COUNTRIES.find((c) => c.iso === phoneCountry)?.dial ?? '';
    const result = await submitForm('fanclub', {
      name: memberName,
      email: memberEmail,
      phone: `${dialCode} ${memberPhone}`.trim(),
      address: memberAddress,
      reason: memberReason || '(none provided)',
    });
    if (result.ok) {
      setIsClaimed(true);
      setSendStatus('sent');
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#fef08a', '#d4af37', '#10b981', '#06b6d4'] });
    } else if (result.reason === 'not-configured') {
      setIsClaimed(true);
      setSendStatus('soon');
    } else {
      setSendStatus('error');
    }
  };

  // Trivia Answer Select
  const handleOptionSelect = (index: number) => {
    if (showAnswer) return;
    setSelectedOption(index);
    setShowAnswer(true);

    if (index === TRIVIA_QUESTIONS[currentQuestion].correct) {
      setTriviaScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setTriviaScore(0);
    setQuizFinished(false);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterStatus === 'sending') return;
    setNewsletterStatus('sending');
    const result = await submitForm('newsletter', { email: newsletterEmail });
    if (result.ok) {
      setNewsletterStatus('sent');
      confetti({ particleCount: 60, spread: 50 });
    } else {
      setNewsletterStatus(result.reason === 'not-configured' ? 'soon' : 'error');
    }
  };

  return (
    <section id="fanclub" className="relative py-24 sm:py-32 bg-[#080b12] text-slate-100 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-xs font-mono text-amber-300 mb-4 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL FAN CLUB</span>
          </div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Join the Global <span className="gold-text-gradient">Circle</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Gain verified membership to the official community, test your knowledge on Leonardo's cinema and conservation, and receive direct dispatches.
          </p>
        </div>

        {/* Two-Column Showcase: Fan card & Trivia Challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          
          {/* Left Column: Personalized digital fan card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/20 shadow-2xl flex flex-col items-center">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-4">
                Personalized Digital Member Pass
              </span>

              {/* Digital fan card with his photo */}
              <div className="w-full max-w-sm aspect-[1.58/1] rounded-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#101726] to-[#0a0f1d] border border-amber-400/40 shadow-2xl group transition-all duration-500 hover:scale-105">
                {/* His photo, filling the right side of the card */}
                <div
                  className="absolute inset-y-0 right-0 w-[62%]"
                  style={{
                    backgroundImage: "url('/assets/portraits/studio-portrait.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 16%',
                    WebkitMaskImage: 'linear-gradient(to left, #000 45%, transparent 100%)',
                    maskImage: 'linear-gradient(to left, #000 45%, transparent 100%)',
                  }}
                />
                {/* Shimmer and warm glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-transparent to-cyan-400/10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 p-[1px]">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-black cinema-title text-amber-300">LD</span>
                      </div>
                    </div>
                    <span className="cinema-title text-xs font-bold tracking-wider text-slate-100">LEONARDO DiCAPRIO</span>
                  </div>

                  {/* Member name */}
                  <div className="max-w-[58%]">
                    <span className="text-[9px] font-mono uppercase text-amber-300/90 tracking-wider block">Official Fan Club</span>
                    <div className="cinema-title text-lg sm:text-xl font-black text-white tracking-wide leading-tight break-words" style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                      {memberName || 'Your Name'}
                    </div>
                    <span className="mt-1 text-[9px] font-mono text-slate-300 block">Member since {new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>

              {/* Member details */}
              <form onSubmit={handleClaimPass} className="w-full max-w-sm mt-6 flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 text-left">Your name</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Enter your name"
                    maxLength={26}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-colors font-sans"
                    style={{ color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 text-left">Your email</label>
                  <input
                    type="email"
                    required
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-colors font-sans"
                    style={{ color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 text-left">Your phone number</label>
                  <PhoneInput
                    required
                    country={phoneCountry}
                    number={memberPhone}
                    onCountryChange={setPhoneCountry}
                    onNumberChange={setMemberPhone}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 text-left">Your postal address (to send your physical fan card)</label>
                  <textarea
                    required
                    value={memberAddress}
                    onChange={(e) => setMemberAddress(e.target.value)}
                    placeholder="Street, city, postcode, country"
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-colors font-sans resize-none"
                    style={{ color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 text-left">Why do you love Leonardo DiCaprio?</label>
                  <textarea
                    required
                    value={memberReason}
                    onChange={(e) => setMemberReason(e.target.value)}
                    placeholder="Tell us in a few words"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-colors font-sans resize-none"
                    style={{ color: 'var(--text)' }}
                  />
                </div>
                <label className="flex items-start gap-2 text-[11px] text-slate-400 text-left leading-snug cursor-pointer">
                  <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-amber-400" />
                  <span>I agree that my details can be used to contact me about the fan club.</span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {isClaimed ? <Heart className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{sendStatus === 'sending' ? 'Sending…' : isClaimed ? 'Fan card claimed!' : 'Claim my fan card'}</span>
                </button>

                {sendStatus === 'sent' && (
                  <p className="text-[11px] text-emerald-400 text-left">Thank you! Your details have been sent to the fan club team. Welcome to the fan club!</p>
                )}
                {sendStatus === 'soon' && (
                  <p className="text-[11px] text-amber-300 text-left">Your card is ready. Fan club sign-ups are opening soon, so we have not received your details yet.</p>
                )}
                {sendStatus === 'error' && (
                  <p className="text-[11px] text-red-400 text-left">Sorry, something went wrong and your details were not sent. Please try again in a moment.</p>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Career & Climate Trivia Challenge */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    Interactive Trivia Challenge
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-800">
                    Question {currentQuestion + 1} of {TRIVIA_QUESTIONS.length}
                  </span>
                </div>

                {!quizFinished ? (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-snug">
                      {TRIVIA_QUESTIONS[currentQuestion].question}
                    </h3>

                    {/* Options */}
                    <div className="flex flex-col gap-2.5 mb-6">
                      {TRIVIA_QUESTIONS[currentQuestion].options.map((opt, idx) => {
                        const isCorrect = idx === TRIVIA_QUESTIONS[currentQuestion].correct;
                        const isChosen = selectedOption === idx;

                        let btnStyle = 'border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300';
                        if (showAnswer) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-semibold';
                          } else if (isChosen) {
                            btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={showAnswer}
                            className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {showAnswer && isCorrect && (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after answering */}
                    {showAnswer && (
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mb-6 text-xs text-slate-300 animate-fadeIn font-light">
                        <strong className="text-emerald-400 block mb-1">Did you know?</strong>
                        {TRIVIA_QUESTIONS[currentQuestion].explanation}
                      </div>
                    )}

                    {showAnswer && (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 self-end"
                      >
                        <span>{currentQuestion < TRIVIA_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 animate-fadeIn">
                    <Award className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <h4 className="cinema-title text-2xl font-bold text-white mb-2">
                      Challenge Completed!
                    </h4>
                    <p className="text-sm text-slate-300 mb-4">
                      You scored <strong className="text-amber-300 text-lg">{triviaScore}</strong> out of {TRIVIA_QUESTIONS.length}!
                    </p>
                    <p className="text-xs text-slate-400 font-light max-w-md mx-auto mb-6">
                      {triviaScore >= 3
                        ? 'Master-tier knowledge of Leonardo’s cinema and global conservation.'
                        : 'Good effort! Explore the movies and charity sections to discover more.'}
                    </p>
                    <button
                      onClick={handleResetQuiz}
                      className="px-6 py-2.5 rounded-full glass-panel hover:bg-slate-800 text-amber-300 text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified Leo Trivia</span>
                <span>Updated 2026</span>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter Subscription Banner */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-amber-500/20 bg-gradient-to-r from-slate-900 via-[#0d1422] to-slate-900 max-w-3xl mx-auto text-center">
          <Mail className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="cinema-title text-xl sm:text-2xl font-bold text-white mb-2">
            The Official Dispatch Newsletter
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto mb-6">
            Receive exclusive updates on upcoming film releases, film festival premieres, and urgent Re:wild conservation campaigns.
          </p>

          {newsletterStatus === 'sent' || newsletterStatus === 'soon' ? (
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 font-mono animate-fadeIn">
              {newsletterStatus === 'sent'
                ? 'You are signed up. Thank you!'
                : 'Newsletter sign-ups are opening soon, so we have not saved your email yet. Please check back shortly.'}
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
