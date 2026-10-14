'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // The page may still be rendering or fading in, so try a few times to jump to the anchor.
      const jump = () => {
        const el = document.getElementById(hash.slice(1));
        if (!el) return false;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, left: 0, behavior: 'auto' });
        return true;
      };
      const timers = [350, 800, 1400].map((ms) => window.setTimeout(jump, ms));
      return () => timers.forEach((t) => window.clearTimeout(t));
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname, hash]);

  return null;
};
