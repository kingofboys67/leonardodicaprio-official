'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { LEO_FAQS } from '../data/faq';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section aria-labelledby="faq-heading" className="my-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-orange-400 uppercase mb-3">
          <HelpCircle className="w-4 h-4 text-orange-400" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 id="faq-heading" className="cinema-title text-3xl sm:text-4xl font-black text-white mb-4">
          Common Questions About Leonardo DiCaprio
        </h2>
        <p className="text-base text-slate-300 leading-relaxed mb-8">
          Factual answers to the most frequently searched queries regarding Leonardo DiCaprio&apos;s acting honors, iconic films, collaborations, and environmental advocacy.
        </p>

        <div className="space-y-3">
          {LEO_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-[#0c1220] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-orange-400 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
