import React from 'react';
import { BRAND_INFO } from '../data/tailoringData';
import { PageId } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ArrowUp, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
      scrollToTop();
    }
  };

  return (
    <footer className="bg-[#EDE7DC] border-t border-[#D6CBB8] text-[#524C43] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#D6CBB8]">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => handleNav('home')} 
              className="cursor-pointer"
            >
              <BrandLogo variant="horizontal" color="silver" />
            </div>

            <p className="text-xs text-[#524C43] leading-relaxed font-light">
              Engineering bespoke custom-made suits, tuxedos, and wedding attire with sharp anatomical precision and European fabric mills.
            </p>

            {/* Social Media Channels Directly Displayed */}
            <div className="pt-2 space-y-1.5 text-xs">
              <span className="text-[12px] uppercase font-bold tracking-wider text-[#2B2723] block">
                Official Social Channels
              </span>
              <div className="flex flex-col gap-1.5 text-[12px] text-[#6E5410]">
                <a 
                  href={BRAND_INFO.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#6E5410] transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <span className="text-[#6E5410] font-bold">Instagram:</span>
                  <span>Nyota. Swerve. Closet</span>
                </a>
                <a 
                  href={BRAND_INFO.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#6E5410] transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <span className="text-[#6E5410] font-bold">Facebook:</span>
                  <span>Nyota. Swerve. Closet</span>
                </a>
                <a 
                  href={BRAND_INFO.social.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#6E5410] transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <span className="text-[#6E5410] font-bold">TikTok:</span>
                  <span>Nyota. Swerve. Closet</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-[#2B2723] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Turnaround Standard: 4 Business Days in Nairobi</span>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#171412]">
              Atelier Pages
            </h4>
            <ul className="space-y-0.5 text-xs">
              <li><button onClick={() => handleNav('home')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Home Overview</button></li>
              <li><button onClick={() => handleNav('offerings')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Garment Offerings</button></li>
              <li><button onClick={() => handleNav('fabrics')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Fabric Swatches</button></li>
              <li><button onClick={() => handleNav('process')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Our Master Process</button></li>
              <li><button onClick={() => handleNav('journal')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Style Journal</button></li>
              <li><button onClick={() => handleNav('booking')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Live Quotation & Booking</button></li>
              <li><button onClick={() => handleNav('faq')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">FAQ & Care</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Ruiru Atelier</button></li>
            </ul>
          </div>

          {/* Repertoire Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#171412]">
              Bespoke Repertoire
            </h4>
            <ul className="space-y-0.5 text-xs">
              <li><button onClick={() => handleNav('offerings')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Custom-Made Men's Suits</button></li>
              <li><button onClick={() => handleNav('offerings')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Wedding & Matrimonial Attire</button></li>
              <li><button onClick={() => handleNav('booking')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Groom & Groomsmen Packages</button></li>
              <li><button onClick={() => handleNav('offerings')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Diplomatic & Corporate Suits</button></li>
              <li><button onClick={() => handleNav('offerings')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Black-Tie Dinner Tuxedos</button></li>
              <li><button onClick={() => handleNav('booking')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Master Alterations & Adjustments</button></li>
              <li><button onClick={() => handleNav('offerings')} className="hover:text-[#6E5410] transition-colors cursor-pointer text-left py-2 block w-full min-h-[44px] flex items-center">Handmade Silk Ties & Accessories</button></li>
            </ul>
          </div>

          {/* Atelier Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#171412]">
              Atelier & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#524C43]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6E5410] shrink-0 mt-0.5" />
                <a
                  href={BRAND_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#171412] transition-colors"
                >
                  Kimbo, Ruiru, Kiambu County
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#6E5410] shrink-0" />
                <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-[#171412] text-[#2B2723] font-medium transition-colors inline-flex items-center min-h-[44px]">
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#6E5410] shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-[#171412] text-[#2B2723] transition-colors inline-flex items-center min-h-[44px] break-all">
                  {BRAND_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#6E5410] shrink-0" />
                <span>Mon - Sat: 8:30 AM – 7:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#524C43]">
            © {new Date().getFullYear()} Nyota. Swerve. Closet Bespoke Tailoring. All rights reserved. Handcrafted with pride in Nairobi, Kenya.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#524C43] hover:text-[#6E5410] transition-colors cursor-pointer min-h-[44px] px-2"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

