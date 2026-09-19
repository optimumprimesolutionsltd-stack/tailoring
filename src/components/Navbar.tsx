import React, { useState, useEffect } from 'react';
import { useTailoring } from '../context/TailoringContext';
import { PageId } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  Menu, 
  X, 
  Sparkles, 
  Phone, 
  Calendar, 
  ArrowUpRight, 
  MessageCircle,
  Sliders
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currency: 'KES' | 'USD';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  currency, 
  onToggleCurrency 
}) => {
  const { brand } = useTailoring();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'offerings', label: 'Offerings' },
    { id: 'fabrics', label: 'Fabric Library' },
    { id: 'process', label: 'Craft & Process' },
    { id: 'journal', label: 'Style Journal' },
    { id: 'booking', label: 'Book & Quote' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Atelier' },
    { id: 'admin', label: 'Admin Portal' },
  ];

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#EDE7DC]/95 backdrop-blur-md border-b border-[#D6CBB8] shadow-2xl py-2.5' 
          : 'bg-gradient-to-b from-[#EDE7DC]/95 via-[#EDE7DC]/85 to-transparent py-3 sm:py-4'
      }`}
    >
      {/* Top micro bar for Sartorial announcement */}
      <div className="hidden lg:block border-b border-[#D6CBB8]/80 pb-2 mb-2 text-xs text-[#524C43]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#171412] font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#6E5410]" />
              Express 4-Day Bespoke Tailoring in Nairobi
            </span>
            <span className="text-[#BCAE97]">•</span>
            <span className="text-[#524C43]">Atelier: Kimbo, Ruiru</span>
          </div>
          <div className="flex items-center gap-5">
            <button 
              onClick={onToggleCurrency}
              className="flex items-center gap-1 text-[#2B2723] hover:text-[#171412] transition-colors cursor-pointer px-2 py-0.5 rounded border border-[#D6CBB8] hover:border-[#6E5410] bg-[#FBF8F3]"
              title="Toggle currency display"
            >
              <span className="font-semibold text-white">{currency}</span>
              <span className="text-[12px] text-[#524C43]">({currency === 'KES' ? 'USD' : 'KES'})</span>
            </button>
            <a 
              href={`tel:${brand.phone}`} 
              className="flex items-center gap-1 text-[#524C43] hover:text-[#171412] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#6E5410]" />
              {brand.phone}
            </a>
            <a 
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("Hello Nyota. Swerve. Closet, I'd like to inquire about bespoke tailoring.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#524C43] hover:text-[#171412] flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#6E5410]" />
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Pure Wordmark (No icon) */}
        <div 
          onClick={() => handleLinkClick('home')} 
          className="cursor-pointer"
        >
          <BrandLogo variant="horizontal" color="silver" />
        </div>

        {/* Desktop Page Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 lg:gap-6 text-xs lg:text-sm font-medium tracking-wide">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const isAdmin = item.id === 'admin';

            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`transition-all relative py-1 cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isActive 
                    ? 'text-[#171412] font-semibold' 
                    : isAdmin 
                      ? 'text-[#6E5410] hover:text-[#171412] px-2 py-0.5 rounded border border-[#D6CBB8] hover:border-[#6E5410] bg-[#E4DCCE]'
                      : 'text-[#524C43] hover:text-[#171412]'
                }`}
              >
                {isAdmin && <Sliders className="w-3 h-3 text-[#524C43]" />}
                <span>{item.label}</span>
                {isActive && !isAdmin && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FBF8F3] shadow-[0_4px_16px_rgba(20,18,15,0.10)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            onClick={onToggleCurrency}
            className="xl:hidden text-xs text-[#2B2723] px-2.5 py-1.5 rounded border border-[#D6CBB8] bg-[#FBF8F3] font-semibold cursor-pointer"
          >
            {currency}
          </button>
          
          <button
            onClick={() => handleLinkClick('booking')}
            className={`group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer ${
              currentPage === 'booking'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-[0_4px_16px_rgba(20,18,15,0.10)]'
                : 'bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] shadow-[0_4px_16px_rgba(20,18,15,0.10)] hover:shadow-[0_4px_16px_rgba(20,18,15,0.10)]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Fitting</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-[#2B2723] hover:text-[#171412] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FBF8F3] border-b border-[#D6CBB8] px-6 py-6 mt-3 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#D6CBB8]">
            <span className="text-xs uppercase tracking-widest text-[#524C43]">Currency Display:</span>
            <button
              onClick={onToggleCurrency}
              className="text-xs text-[#2B2723] font-bold px-3 py-1 rounded border border-[#D6CBB8] bg-[#EDE7DC] cursor-pointer"
            >
              {currency} (Tap to toggle)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isAdmin = item.id === 'admin';

              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`py-2.5 px-3 rounded text-left transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#E4DCCE] text-[#171412] font-bold border-l-2 border-[#171412]'
                      : 'hover:bg-[#E4DCCE] text-[#524C43] hover:text-[#171412]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isAdmin && <Sliders className="w-3 h-3 text-[#524C43]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#D6CBB8] space-y-2">
            <button
              onClick={() => handleLinkClick('booking')}
              className="w-full py-3 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment or Quotation
            </button>
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("Hello Nyota. Swerve. Closet, I would like to consult with a master tailor.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-sm border border-[#D6CBB8] hover:border-[#6E5410] text-[#2B2723] bg-[#EDE7DC] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#6E5410]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
