import React, { useState } from 'react';
import { useTailoring } from '../context/TailoringContext';
import { ServiceItem } from '../types';
import { responsiveImage } from '../utils/images';
import { 
  Clock, 
  Check, 
  Info, 
  ArrowRight, 
  X 
} from 'lucide-react';

interface OfferingsProps {
  currency: 'KES' | 'USD';
  onSelectService: (serviceId: string) => void;
}

export const OfferingsSection: React.FC<OfferingsProps> = ({ currency, onSelectService }) => {
  const { services } = useTailoring();
  const [activeCategory, setActiveCategory] = useState<'all' | 'bespoke' | 'alterations' | 'accessories'>('bespoke');
  const [selectedItemForModal, setSelectedItemForModal] = useState<ServiceItem | null>(null);

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const bespokeCount = services.filter(s => s.category === 'bespoke').length;
  const alterationsCount = services.filter(s => s.category === 'alterations').length;
  const accessoriesCount = services.filter(s => s.category === 'accessories').length;

  const formatPrice = (kes: number, usd: number) => {
    if (currency === 'KES') {
      return `KES ${kes.toLocaleString()}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  return (
    <section id="offerings" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* No section header: PageHeader in App.tsx already titles this page.
            A second heading here made every page open with two near-identical
            titles and subtitles before any content. */}

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('bespoke')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
              activeCategory === 'bespoke'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-[0_4px_16px_rgba(20,18,15,0.10)]'
                : 'bg-[#FBF8F3] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8] hover:border-[#BCAE97]'
            }`}
          >
            Bespoke Tailoring ({bespokeCount})
          </button>

          <button
            onClick={() => setActiveCategory('alterations')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
              activeCategory === 'alterations'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-[0_4px_16px_rgba(20,18,15,0.10)]'
                : 'bg-[#FBF8F3] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8] hover:border-[#BCAE97]'
            }`}
          >
            Alterations & Repairs ({alterationsCount})
          </button>

          <button
            onClick={() => setActiveCategory('accessories')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
              activeCategory === 'accessories'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-[0_4px_16px_rgba(20,18,15,0.10)]'
                : 'bg-[#FBF8F3] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8] hover:border-[#BCAE97]'
            }`}
          >
            Luxury Accessories ({accessoriesCount})
          </button>

          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-[0_4px_16px_rgba(20,18,15,0.10)]'
                : 'bg-[#FBF8F3] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8] hover:border-[#BCAE97]'
            }`}
          >
            View All ({services.length})
          </button>
        </div>

        {/* Garment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] overflow-hidden flex flex-col hover:border-[#BCAE97] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
            >
              {/* Image Container with tag */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#EDE7DC]">
                <img
                  {...responsiveImage(service.image, '(min-width:1024px) 30vw, (min-width:768px) 45vw, 92vw')}
                  alt={service.title}
                  className="w-full h-full object-cover object-[center_38%] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FBF8F3] via-[#FBF8F3]/25 to-transparent opacity-90" />

                {/* Optional Tag */}
                {service.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-[#D4AF37] text-[#171412] text-[12px] font-bold uppercase tracking-wider shadow-md">
                    {service.tag}
                  </span>
                )}

                {/* Turnaround Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-[#EDE7DC]/90 backdrop-blur-md border border-[#D6CBB8] text-[#2B2723] text-[12px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#6E5410]" />
                  <span>{typeof service.turnaroundDays === 'number' ? `${service.turnaroundDays} Days` : service.turnaroundDays}</span>
                </div>

                {/* Category small pill */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#524C43]">
                    {service.category === 'bespoke' ? 'Bespoke Tailoring' : service.category === 'alterations' ? 'Alteration & Repair' : 'Handcrafted Accessory'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#171412] mb-2 group-hover:text-[#6E5410] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#524C43] line-clamp-2 mb-4">
                    {service.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-1.5 mb-5 border-t border-[#D6CBB8] pt-3">
                    {service.details.slice(0, 2).map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#524C43]">
                        <Check className="w-3.5 h-3.5 text-[#6E5410] shrink-0 mt-0.5" />
                        <span className="line-clamp-1 text-[#6E5410]">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action Row */}
                <div className="pt-3 border-t border-[#D6CBB8] flex items-center justify-between">
                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-[#524C43] block">
                      Starting From
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-[#171412]">
                      {formatPrice(service.startingPriceKES, service.startingPriceUSD)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItemForModal(service)}
                      className="p-2 rounded-sm border border-[#D6CBB8] hover:border-[#6E5410] text-[#524C43] hover:text-[#171412] transition-colors cursor-pointer"
                      title="View specifications"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="px-3.5 py-2 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer shadow-sm hover:shadow-[0_4px_16px_rgba(20,18,15,0.10)]"
                    >
                      <span>Book Fit</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Design Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-display text-lg sm:text-xl font-bold text-[#171412] mb-1">
              Have a Custom Silhouette or Ceremonial Request?
            </h4>
            <p className="text-xs sm:text-sm text-[#524C43]">
              We cut custom African safari jackets, hand-embroidered dinner coats, and private diplomat commissions.
            </p>
          </div>
          <button
            onClick={() => onSelectService('bespoke-suits')}
            className="shrink-0 px-6 py-3 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg shadow-[#14120F]/10"
          >
            Custom Commission
          </button>
        </div>

      </div>

      {/* Detail Specification Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171412]/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#FBF8F3] rounded-sm border border-[#D6CBB8] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-4 right-4 p-2 text-[#524C43] hover:text-[#171412] rounded-sm bg-[#E4DCCE] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-sm text-[12px] font-bold uppercase tracking-wider bg-[#E4DCCE] text-[#171412] border border-[#D6CBB8]">
                {selectedItemForModal.category.toUpperCase()}
              </span>
              <span className="text-xs text-[#524C43] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#6E5410]" />
                Turnaround: {typeof selectedItemForModal.turnaroundDays === 'number' ? `${selectedItemForModal.turnaroundDays} Days` : selectedItemForModal.turnaroundDays}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-[#171412] mb-2">
              {selectedItemForModal.title}
            </h3>
            <p className="text-sm text-[#524C43] leading-relaxed mb-6">
              {selectedItemForModal.description}
            </p>

            <div className="mb-6 p-4 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#2B2723] mb-3">
                Fabric & Tailoring Specifications
              </h4>
              <ul className="space-y-2 text-sm text-[#524C43]">
                {selectedItemForModal.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#6E5410] shrink-0 mt-0.5" />
                    <span className="text-[#2B2723]">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#D6CBB8]">
              <div>
                <span className="text-xs uppercase text-[#524C43] block">Starting Estimate</span>
                <span className="font-display text-xl font-bold text-[#171412]">
                  {formatPrice(selectedItemForModal.startingPriceKES, selectedItemForModal.startingPriceUSD)}
                </span>
              </div>
              <button
                onClick={() => {
                  const id = selectedItemForModal.id;
                  setSelectedItemForModal(null);
                  onSelectService(id);
                }}
                className="px-6 py-3 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg shadow-[#14120F]/10"
              >
                Proceed to Book This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
