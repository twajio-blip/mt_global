import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';

export function FloatingScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 520);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Go to top"
      className={`fixed bottom-24 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-800 text-white shadow-lift transition-[opacity,transform,background-color] duration-200 ease-out hover:bg-brand-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 md:bottom-8 md:right-8 ${
      visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`
      }>
      
      <ArrowUpIcon className="h-5 w-5" aria-hidden />
    </button>);

}
