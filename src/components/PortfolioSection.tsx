import React, { useMemo, useState, useEffect } from 'react';
import { useTailoring } from '../context/TailoringContext';
import { PortfolioPiece } from '../types';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { responsiveImage } from '../utils/images';

interface PortfolioSectionProps {
  onOpenBooking?: () => void;
}

const FILTERS: { id: 'all' | PortfolioPiece['category']; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'business', label: 'Business' },
  { id: 'atelier', label: 'In the atelier' },
  { id: 'editorial', label: 'Editorial' },
];

/**
 * Public portfolio of real client commissions.
 *
 * The photography is portrait, so the grid uses a fixed 3:4 tile and lets the
 * images fill it without distortion. The lightbox exists because a tailor's work
 * is judged on detail — drape, lapel roll, the line of a trouser — which a
 * thumbnail cannot carry.
 */
export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenBooking }) => {
  const { portfolio } = useTailoring();
  const [filter, setFilter] = useState<'all' | PortfolioPiece['category']>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const pieces = useMemo(
    () => (filter === 'all' ? portfolio : portfolio.filter(p => p.category === filter)),
    [filter, portfolio],
  );

  const active = lightboxIndex === null ? null : pieces[lightboxIndex] ?? null;

  const step = (delta: number) => {
    setLightboxIndex(i => (i === null ? null : (i + delta + pieces.length) % pieces.length));
  };

  // Keyboard control, and prevent the page scrolling behind the lightbox.
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [lightboxIndex, pieces.length]);

  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-[#EDE7DC] border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.3em] text-[#6E5410] font-semibold mb-3">
              <span className="w-8 h-px bg-[#D4AF37]" />
              Commissions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#171412] mb-3">
              Garments we have made
            </h2>
            <p className="text-[#524C43] text-sm sm:text-base font-light leading-relaxed">
              Real clients, real commissions, photographed as worn. Wedding parties,
              boardroom suits, and the work in progress at our machines.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => { setFilter(f.id); setLightboxIndex(null); }}
                  className={`px-4 py-2.5 rounded-sm text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#171412] text-[#FBF8F3] border-[#171412]'
                      : 'bg-[#FBF8F3] text-[#524C43] border-[#D6CBB8] hover:text-[#171412] hover:border-[#BCAE97]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {pieces.map((piece, i) => (
            <button
              key={piece.id}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#6E5410] transition-colors cursor-zoom-in text-left"
            >
              <img
                {...responsiveImage(piece.image, '(min-width:1024px) 22vw, (min-width:768px) 30vw, 45vw')}
                alt={piece.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-0 left-0 right-0 p-3 text-[12px] sm:text-xs text-[#FBF8F3] font-medium leading-snug drop-shadow">
                {piece.caption}
              </span>
            </button>
          ))}
        </div>

        {onOpenBooking && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span className="whitespace-nowrap">Commission yours</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-[#171412]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-3 text-[#524C43] hover:text-[#171412] bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {pieces.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); step(-1); }}
                className="absolute left-2 sm:left-6 p-3 text-[#524C43] hover:text-[#171412] bg-[#FBF8F3]/80 border border-[#D6CBB8] rounded-sm transition-colors cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); step(1); }}
                className="absolute right-2 sm:right-6 p-3 text-[#524C43] hover:text-[#171412] bg-[#FBF8F3]/80 border border-[#D6CBB8] rounded-sm transition-colors cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <figure className="max-w-[92vw] sm:max-w-3xl max-h-[86vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img
              src={active.image}
              alt={active.alt}
              className="max-h-[76vh] w-auto object-contain rounded-sm border border-[#D6CBB8]"
            />
            <figcaption className="mt-3 text-center">
              <span className="text-sm text-[#2B2723] font-medium">{active.caption}</span>
              <span className="block text-[12px] text-[#6B6459] mt-0.5 tabular-figures">
                {lightboxIndex! + 1} / {pieces.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};
