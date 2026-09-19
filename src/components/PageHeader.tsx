import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { PageId } from '../types';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  pageId: PageId;
  departmentNumber?: string;
  onNavigate: (page: PageId) => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  pageId,
  departmentNumber,
  onNavigate,
  actionButton,
}) => {
  return (
    <section className="relative pt-32 pb-12 sm:pb-16 bg-[#EDE7DC] border-b border-[#D6CBB8] overflow-hidden">
      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 fabric-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs text-[#524C43]">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 hover:text-[#171412] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#BCAE97]" />
            <span className="text-[#2B2723] font-semibold tracking-wide capitalize">
              {title}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#D6CBB8] hover:border-[#6E5410] bg-[#FBF8F3] text-xs text-[#524C43] hover:text-[#171412] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#6E5410]" />
              <span>Return to Overview</span>
            </button>

            {departmentNumber && (
              <span className="hidden sm:inline-block px-3 py-1 rounded bg-[#FBF8F3] border border-[#D6CBB8] text-[12px] tracking-widest text-[#6E5410] uppercase">
                {departmentNumber}
              </span>
            )}
          </div>
        </div>

        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#6E5410] font-semibold">
                Nyota. Swerve. Closet
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171412] leading-tight mb-4">
              {title}
            </h1>
            
            <p className="text-sm sm:text-base text-[#524C43] leading-relaxed max-w-2xl font-light">
              {subtitle}
            </p>
          </div>

          {actionButton && (
            <div className="shrink-0">
              <button
                onClick={actionButton.onClick}
                className="px-6 py-3.5 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#14120F]/10 flex items-center gap-2 cursor-pointer"
              >
                {actionButton.icon}
                <span>{actionButton.label}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
