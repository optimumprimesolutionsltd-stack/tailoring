import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'mark' | 'compact' | 'horizontal';
  className?: string;
  color?: 'silver' | 'light' | 'dark' | 'currentColor';
  showTagline?: boolean;
  onClick?: () => void;
}

/**
 * The tuxedo lapels, bow tie and studs from the Nyota. Swerve. Closet identity.
 *
 * Inline SVG rather than <img src="/logo.svg"> so the mark inherits
 * `currentColor` — it has to sit on bone, on white cards and on dark buttons,
 * and a flat raster of the logo would carry its own background into each.
 */
const TuxedoMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 150"
    className={className}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    {/* Left lapel */}
    <path d="M56 8 C50 26 38 44 22 54 L46 62 C38 92 58 128 66 146 L70 96 L58 70 L48 58 L60 42 Z" />
    {/* Right lapel */}
    <path d="M84 8 C90 26 102 44 118 54 L94 62 C102 92 82 128 74 146 L70 96 L82 70 L92 58 L80 42 Z" />
    {/* Bow tie */}
    <rect x="64" y="26" width="12" height="16" rx="3" />
    <path d="M64 28 L38 18 C34 17 32 20 32 24 L32 44 C32 48 34 51 38 50 L64 40 Z" />
    <path d="M76 28 L102 18 C106 17 108 20 108 24 L108 44 C108 48 106 51 102 50 L76 40 Z" />
    {/* Studs */}
    <circle cx="52" cy="112" r="6" />
    <circle cx="88" cy="112" r="6" />
  </svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
  color = 'silver',
  showTagline = true,
  onClick,
}) => {
  if (variant === 'horizontal') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        <div className="flex items-center gap-2.5">
          {/* The tuxedo-and-bow-tie mark from the brand identity. Inline SVG
              rather than an <img> so it inherits currentColor and stays crisp. */}
          <TuxedoMark className="w-5 h-5 sm:w-6 sm:h-6 text-[#171412] group-hover:text-[#6E5410] transition-colors shrink-0" />
          <span className="font-wordmark text-lg sm:text-xl font-bold tracking-[0.28em] text-[#171412] group-hover:text-[#6E5410] transition-colors leading-none">
            NYOTA
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-3 h-px bg-[#E2E8F0]/40" />
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-[#524C43] font-medium group-hover:text-[#2B2723] transition-colors">
              SWERVE CLOSET
            </span>
            <span className="w-3 h-px bg-[#E2E8F0]/40" />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex flex-col text-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <span className="font-wordmark text-base font-bold tracking-[0.25em] text-[#171412]">
          NYOTA
        </span>
        <span className="text-[8px] uppercase tracking-[0.25em] text-[#524C43]">
          SWERVE CLOSET
        </span>
      </div>
    );
  }

  // Full variant (Hero, Header, Footer) - Architectural Wordmark without any suit/tuxedo icon
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Top Sartorial Fine Line */}
      <div className="flex items-center justify-center gap-3 w-48 sm:w-64 mb-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]/80" />
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#6E5410] font-semibold">
          BESPOKE ATELIER
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]/80" />
      </div>

      {/* Main Brand Wordmark */}
      <h1 className="font-wordmark text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] text-[#171412] drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)] leading-none my-1">
        NYOTA
      </h1>

      {/* Tagline Framing */}
      {showTagline && (
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2.5 w-full max-w-xs sm:max-w-sm">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-[#D4AF37]/60" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#524C43] font-medium group-hover:text-[#171412] transition-colors">
            SWERVE CLOSET
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/30 to-[#D4AF37]/60" />
        </div>
      )}

      {/* Origin descriptor */}
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#6B6459] mt-2">
        KIMBO • RUIRU
      </span>
    </div>
  );
};
