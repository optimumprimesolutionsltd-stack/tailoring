import React from 'react';
import { responsiveImage } from '../utils/images';
import { PageId } from '../types';
import { 
  Scissors, 
  Layers, 
  Compass, 
  BookOpen, 
  Calendar, 
  HelpCircle, 
  MapPin, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

interface SectionDirectoryProps {
  onNavigate: (page: PageId) => void;
}

export const SectionDirectory: React.FC<SectionDirectoryProps> = ({ onNavigate }) => {
  const sections: {
    id: PageId;
    title: string;
    department: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    image: string;
    highlights: string[];
    cta: string;
  }[] = [
    {
      id: 'offerings',
      title: 'Bespoke Garments & Attire',
      department: 'Dept 01',
      subtitle: 'Sculpted Silhouette Collection',
      description: 'Handcrafted two-piece & three-piece suits, black-tie tuxedos, wedding attire, safari jackets, and bespoke overcoats with full canvas architecture.',
      icon: <Scissors className="w-5 h-5 text-[#6E5410]" />,
      image: '/clients/brown-db-wide.jpg',
      highlights: ['Full Floating Canvas', 'Hand-Rolled Lapels', 'Genuine Horn Buttons'],
      cta: 'Explore All Garments',
    },
    {
      id: 'fabrics',
      title: 'European Fabric Library',
      department: 'Dept 02',
      subtitle: 'Mill Provenance & Visualizer',
      description: 'Explore over 2,000 authentic fabrics sourced directly from Scabal (England), Loro Piana (Italy), Dormeuil (France), and Holland & Sherry (Savile Row).',
      icon: <Layers className="w-5 h-5 text-[#6E5410]" />,
      image: '/clients/tailor-at-machine.jpg',
      highlights: ['Super 130s–180s Wools', 'Irish Linens & Silks', 'Virtual Drape Visualizer'],
      cta: 'Browse Fabric Catalog',
    },
    {
      id: 'process',
      title: 'The Master Craft & Journey',
      department: 'Dept 03',
      subtitle: '38 Anatomical Measurements',
      description: 'Understand the rigorous 6-step artisanal tailoring progression from initial paper pattern drafting to the baste fitting and hand-finishing in Nairobi.',
      icon: <Compass className="w-5 h-5 text-[#6E5410]" />,
      image: '/clients/tailor-umbrella-full.jpg',
      highlights: ['38 Anatomical Points', 'Baste Fitting Iteration', 'Complimentary Lifetime Alterations'],
      cta: 'View The 6-Step Journey',
    },
    {
      id: 'journal',
      title: 'Sartorial Style Journal',
      department: 'Dept 04',
      subtitle: 'Editorial Guides & Nairobi Codes',
      description: 'Authoritative sartorial advice on Nairobi climate styling, Black-Tie dress codes, wedding fabric selection, and master garment preservation.',
      icon: <BookOpen className="w-5 h-5 text-[#6E5410]" />,
      image: '/clients/corporate-pinstripe-walk.jpg',
      highlights: ['Black-Tie Etiquette', 'Nairobi Climate Styling', 'Luxury Fabric Care'],
      cta: 'Read Style Journal',
    },
    {
      id: 'booking',
      title: 'Live Quotation & Booking',
      department: 'Dept 05',
      subtitle: 'Transparent Pricing Estimator',
      description: 'Configure your bespoke commission in real time with our live price estimator in KES and USD, and schedule a private fitting at our atelier or your estate.',
      icon: <Calendar className="w-5 h-5 text-[#6E5410]" />,
      image: '/clients/wedding-party-group.jpg',
      highlights: ['Real-Time KES/USD Estimator', 'Express 4-Day Rush Option', 'Estate Concierge Visit'],
      cta: 'Estimate & Book Fitting',
    },
    {
      id: 'faq',
      title: 'Knowledge Base & Concierge',
      department: 'Dept 06',
      subtitle: 'Client Advisory & Nairobi Coverage',
      description: 'Essential answers on lead times, fabric sourcing authenticity, private estate fittings across Karen, Muthaiga, Runda, and our suit restyling program.',
      icon: <HelpCircle className="w-5 h-5 text-[#6E5410]" />,
      image: '/clients/service-couple-wide.jpg',
      highlights: ['Express 4-Day Turnaround', 'Nairobi Neighborhood Concierge', 'Complimentary Pressing'],
      cta: 'Browse Knowledge Base',
    },
    {
      id: 'contact',
      title: 'Ruiru Atelier & Directions',
      department: 'Dept 07',
      subtitle: 'Kimbo, Ruiru, Kimbo',
      description: 'Visit our flagship atelier in Kimbo, Ruiru. Access interactive Google Maps navigation, atelier operating hours, and direct master tailor WhatsApp.',
      icon: <MapPin className="w-5 h-5 text-[#6E5410]" />,
      image: '/clients/brown-db-signing.jpg',
      highlights: ['Private Fitting Salons', 'Valet & Secure Parking', 'Direct Google Maps Route'],
      cta: 'Get Directions & Contact',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#EDE7DC] border-t border-[#D6CBB8] relative overflow-hidden">
      <div className="absolute inset-0 fabric-grid-pattern opacity-20 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] text-[#6E5410] text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Atelier Departments</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171412] mb-4">
            Explore Each Sartorial Page
          </h2>
          <p className="text-sm sm:text-base text-[#524C43] font-light leading-relaxed">
            Navigate directly into each dedicated department of Nyota. Swerve. Closet — from our comprehensive garment showcase and fabric library to our interactive price calculator and Ruiru atelier.
          </p>
        </div>

        {/* Bento Grid of Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, index) => (
            <div
              key={sec.id}
              onClick={() => {
                onNavigate(sec.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group relative bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#6E5410] rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.06)] flex flex-col justify-between cursor-pointer ${
                index === 6 ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              {/* Card Top Image Thumbnail banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  {...responsiveImage(sec.image, '(min-width:1024px) 32vw, (min-width:768px) 48vw, 92vw')}
                  alt={sec.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/60 to-transparent" />
                
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-sm bg-[#EDE7DC]/90 border border-[#D6CBB8] text-[12px] tracking-widest text-[#6E5410] uppercase">
                    {sec.department}
                  </span>
                  <div className="w-8 h-8 rounded-sm bg-[#EDE7DC]/90 border border-[#D6CBB8] flex items-center justify-center group-hover:border-[#6E5410] transition-colors">
                    {sec.icon}
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#E7E1D6]">
                    {sec.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#FBF8F3] group-hover:text-[#6E5410] transition-colors">
                    {sec.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#524C43] leading-relaxed mb-4">
                  {sec.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {sec.highlights.map((h, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[12px] text-[#524C43] font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Card Action Link */}
                <div className="pt-3 border-t border-[#D6CBB8] flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#171412] group-hover:text-[#6E5410]">
                  <span>{sec.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
