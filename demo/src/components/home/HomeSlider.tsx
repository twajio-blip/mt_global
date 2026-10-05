import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { slides } from '../../data/slides';

export function HomeSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const go = (next: number) => setIndex((next + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Association image slider"
      className="relative overflow-hidden rounded-mcaa border border-mcaa-border bg-white">
      
      <div className="relative h-[210px] sm:h-[300px] lg:h-[356px]">
        {slides.map((item, itemIndex) =>
        <img
          key={item.id}
          src={item.image}
          alt={item.caption}
          aria-hidden={itemIndex !== index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          itemIndex === index ? 'opacity-100' : 'opacity-0'}`
          } />

        )}

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-mcaa bg-black/45 text-white hover:bg-black/65">
          
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-mcaa bg-black/45 text-white hover:bg-black/65">
          
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="absolute bottom-[38px] right-3 flex gap-1.5">
          {slides.map((item, itemIndex) =>
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(itemIndex)}
            aria-label={`Go to slide ${itemIndex + 1}`}
            aria-current={itemIndex === index}
            className={`h-2.5 w-2.5 rounded-full border border-white/70 ${
            itemIndex === index ? 'bg-mcaa-gold' : 'bg-white/40'}`
            } />

          )}
        </div>
      </div>

      <div className="bg-mcaa-navy px-3 py-2">
        <p className="truncate text-[14px] text-white">{slide.caption}</p>
      </div>
    </section>);

}