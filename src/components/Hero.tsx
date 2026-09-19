import React from 'react';
import { PageId } from '../types';
import {
  ArrowRight,
  Clock,
  Ruler,
  ShieldCheck,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenQuotation: () => void;
}

const PILLARS = [
  { icon: Clock, value: '4 Days', label: 'Typical turnaround' },
  { icon: Ruler, value: '30+ Points', label: 'Anatomical drafting' },
  { icon: Layers, value: '2,000+', label: 'Super 110s–180s cloths' },
  { icon: ShieldCheck, value: '100%', label: 'Precision fit guarantee' },
];

/** Real client work, used with the client's permission. */
const HERO_IMAGE = '/clients/wedding-party-jump.jpg';
const HERO_ALT =
  'A Nyota bride with her groomsmen in custom olive and gold suits, mid-jump';

/**
 * Full-bleed editorial hero.
 *
 * The photography is portrait (3:4). A single full-width image would crop to a
 * shallow horizontal band on desktop and decapitate the subjects, so the frame
 * is handled per breakpoint:
 *
 *   - phone/tablet: portrait source on a portrait screen, so it fills the
 *     viewport as a background with a bottom-up scrim under the copy.
 *   - desktop: the image holds the right of the frame at close to its native
 *     aspect and bleeds off three edges, with a gradient dissolving its left
 *     edge into the dark where the copy sits. No hard seam, no lost heads.
 *
 * There is deliberately no brand lockup: the navbar already carries the
 * wordmark a few hundred pixels above. The headline leads instead.
 */
export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBooking, onOpenQuotation }) => {
  return (
    <section className="relative lg:min-h-[100svh] flex flex-col lg:justify-end overflow-hidden bg-[#EDE7DC]">
      {/* Phone / tablet: the photograph is the top of the page, copy sits on
          bone beneath it. Overlaying dark text on a busy photo is unreliable at
          this width, so the two are separated instead. */}
      <div className="lg:hidden relative w-full h-[52svh] min-h-[320px]">
        <img
          src={HERO_IMAGE}
          alt={HERO_ALT}
          className="w-full h-full object-cover object-[55%_18%]"
          fetchPriority="high"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#EDE7DC] to-transparent" />
      </div>

      {/* Desktop: photograph bleeds off the right, bone panel carries the copy.
          Its inner edge dissolves into the page so there is no hard seam. */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[46%] xl:w-[48%] z-0">
        <img
          src={HERO_IMAGE}
          alt={HERO_ALT}
          className="w-full h-full object-cover object-[52%_20%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EDE7DC] via-[#EDE7DC]/25 to-transparent" />
      </div>

      {/* Copy, anchored low-left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-8 lg:pt-32 pb-10 sm:pb-12">
        <div className="max-w-4xl lg:max-w-[560px] xl:max-w-[620px]">
          <span className="inline-flex items-center gap-2.5 text-[12px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-[#6E5410] font-semibold mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#D4AF37]" />
            Bespoke Atelier · Kimbo, Ruiru
          </span>

          {/* Sized so the second line never breaks mid-word on "hand-stitched" */}
          <h1 className="font-display text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[2.9rem] xl:text-[3.25rem] font-bold tracking-tight text-[#171412] mb-5 sm:mb-6">
            Architectural precision
            <span className="block text-[#2B2723]">
              in every <span className="whitespace-nowrap">hand-stitched</span> fiber
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#2B2723] font-normal leading-relaxed mb-8 sm:mb-10 max-w-xl">
            A suit sculpted exclusively to your posture — floating horsehair canvas,
            hand-rolled lapels, cloth from the world's most venerable mills. Cut and
            finished in Nairobi in as little as four days.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_6px_20px_rgba(20,18,15,0.18)] hover:shadow-[0_8px_28px_rgba(20,18,15,0.26)] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span className="whitespace-nowrap">Book a private fitting</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenQuotation}
              className="w-full sm:w-auto px-8 py-4 rounded-sm border border-[#BCAE97] hover:border-[#6E5410] bg-[#EDE7DC]/60 backdrop-blur-sm hover:bg-[#E4DCCE] text-[#2B2723] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center cursor-pointer"
            >
              <span className="whitespace-nowrap">Instant price estimator</span>
            </button>

            <button
              onClick={() => onNavigate('offerings')}
              className="w-full sm:w-auto px-2 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#6E5410] hover:text-[#171412] transition-colors cursor-pointer text-center sm:text-left"
            >
              <span className="whitespace-nowrap">Explore garments</span>
            </button>
          </div>
        </div>
      </div>

      {/* Credentials rail */}
      <div className="relative z-10 w-full border-t border-[#D6CBB8] bg-[#EDE7DC]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D6CBB8]">
          {PILLARS.map(({ icon: Icon, value, label }) => (
            <div key={value} className="py-4 sm:py-5 px-3 sm:px-5 first:pl-0 md:last:pr-0">
              <div className="flex items-center gap-2 mb-0.5">
                <Icon className="w-3.5 h-3.5 text-[#6E5410] shrink-0" />
                <span className="font-display text-base sm:text-lg font-bold text-[#171412]">
                  {value}
                </span>
              </div>
              <p className="text-[12px] sm:text-xs text-[#524C43] leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue — decorative, so hidden where vertical space is tight */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="hidden 2xl:flex absolute left-8 bottom-32 z-10 text-[#524C43] hover:text-[#171412] transition-colors flex-col items-center gap-1.5 cursor-pointer"
        aria-label="Scroll down to inspect craftsmanship"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
          Inspect craftsmanship
        </span>
        <ChevronDown className="w-4 h-4 text-[#6E5410]" />
      </button>
    </section>
  );
};
