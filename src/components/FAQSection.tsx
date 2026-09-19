import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Layers, 
  ExternalLink, 
  PhoneCall, 
  MessageSquare, 
  Navigation,
  Compass,
  FileText,
  X
} from 'lucide-react';
import { FAQCategory, FAQItem } from '../types';
import { FAQ_DATA, NAIROBI_NEIGHBORHOODS, CARE_RULES } from '../data/faqData';
import { BRAND_INFO } from '../data/tailoringData';

interface FAQSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-fabric-sourcing-origins');
  const [activeViewMode, setActiveViewMode] = useState<'faq' | 'neighborhoods' | 'care-guide'>('faq');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(NAIROBI_NEIGHBORHOODS[0].name);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (item.keyTakeaway && item.keyTakeaway.toLowerCase().includes(query))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedFaqId(prev => (prev === id ? null : id));
  };

  const handleActionClick = (action: FAQItem['relatedAction']) => {
    if (!action) return;
    if (action.actionType === 'booking') {
      onOpenBooking(action.target);
    } else if (action.actionType === 'swatches') {
      const elem = document.querySelector('#swatches');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else if (action.actionType === 'locations') {
      const elem = document.querySelector('#contact');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else if (action.actionType === 'whatsapp') {
      window.open(`https://wa.me/${BRAND_INFO.whatsapp}?text=Hello%20Nyota%20Swerve%2C%20I%20have%20an%20inquiry%20regarding%20bespoke%20services.`, '_blank');
    }
  };

  const currentNeighborhoodData = useMemo(() => {
    return NAIROBI_NEIGHBORHOODS.find(n => n.name === selectedNeighborhood) || NAIROBI_NEIGHBORHOODS[0];
  }, [selectedNeighborhood]);

  const categoriesList: { id: FAQCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length },
    { id: 'sourcing', label: 'Fabric Sourcing & Mills', count: FAQ_DATA.filter(f => f.category === 'sourcing').length },
    { id: 'care', label: 'Garment Care & Longevity', count: FAQ_DATA.filter(f => f.category === 'care').length },
    { id: 'locations', label: 'Nairobi Locations & Concierge', count: FAQ_DATA.filter(f => f.category === 'locations').length },
    { id: 'turnaround', label: 'Orders & Turnaround', count: FAQ_DATA.filter(f => f.category === 'turnaround').length },
  ];

  return (
    <section id="faq" className="py-24 bg-[#E4DCCE] border-b border-[#D6CBB8] relative overflow-hidden">
      
      {/* Subtle Background Geometric Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#1e293b]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* No section header — PageHeader already titles this page. */}

        {/* View Switcher: FAQs / Interactive Nairobi Neighborhoods / 5 Golden Care Rules */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveViewMode('faq')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider transition-all flex items-center gap-2 border ${
              activeViewMode === 'faq'
                ? 'bg-[#D4AF37] text-[#171412] border-[#6E5410] shadow-lg shadow-[#D4AF37]/20'
                : 'bg-[#FBF8F3] text-[#524C43] border-[#D6CBB8] hover:text-[#171412] hover:border-[#BCAE97]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Searchable FAQ Knowledge Base</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode('neighborhoods')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider transition-all flex items-center gap-2 border ${
              activeViewMode === 'neighborhoods'
                ? 'bg-[#D4AF37] text-[#171412] border-[#6E5410] shadow-lg shadow-[#D4AF37]/20'
                : 'bg-[#FBF8F3] text-[#524C43] border-[#D6CBB8] hover:text-[#171412] hover:border-[#BCAE97]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Nairobi Service Locations & Concierge</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode('care-guide')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider transition-all flex items-center gap-2 border ${
              activeViewMode === 'care-guide'
                ? 'bg-[#D4AF37] text-[#171412] border-[#6E5410] shadow-lg shadow-[#D4AF37]/20'
                : 'bg-[#FBF8F3] text-[#524C43] border-[#D6CBB8] hover:text-[#171412] hover:border-[#BCAE97]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>5 Golden Rules of Garment Care</span>
          </button>
        </div>

        {/* ========================================================================================= */}
        {/* VIEW 1: SEARCHABLE ACCORDION FAQ */}
        {/* ========================================================================================= */}
        {activeViewMode === 'faq' && (
          <div className="space-y-8">
            
            {/* Search and Category Filter Bar */}
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] p-4 sm:p-6 rounded-sm shadow-xl space-y-5">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 text-[#524C43] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., 'Karen concierge', 'dry cleaning', 'Loro Piana', 'steaming', 'CMT')..."
                  className="w-full pl-11 pr-10 py-3 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm text-sm text-[#2B2723] placeholder:text-[#6B6459] focus:outline-none focus:border-[#6E5410] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#524C43] hover:text-[#171412] p-1"
                    aria-label="Clear search query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#D6CBB8]">
                {categoriesList.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3.5 py-1.5 rounded-sm text-xs font-medium transition-all flex items-center gap-1.5 ${
                      activeCategory === category.id
                        ? 'bg-[#D4AF37] text-[#171412] shadow-sm font-semibold'
                        : 'bg-[#EDE7DC] text-[#524C43] border border-[#D6CBB8] hover:text-[#171412] hover:border-[#BCAE97]'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className={`text-[12px] px-1.5 py-0.2 rounded-full ${
                      activeCategory === category.id 
                        ? 'bg-[#D6CBB8] text-[#171412]' 
                        : 'bg-[#E4DCCE] text-[#524C43]'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter & Reset */}
            <div className="flex items-center justify-between text-xs text-[#524C43] px-1">
              <span>
                Showing <strong className="text-[#2B2723]">{filteredFaqs.length}</strong> of {FAQ_DATA.length} questions
                {searchQuery && <span> matching "{searchQuery}"</span>}
              </span>
              {(searchQuery || activeCategory !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-[#6E5410] hover:underline font-medium"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Accordion Questions List */}
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-sm transition-all duration-200 overflow-hidden ${
                        isExpanded 
                          ? 'bg-[#FBF8F3] border-[#6E5410] shadow-xl shadow-[#D4AF37]/5' 
                          : 'bg-[#FBF8F3]/70 border-[#D6CBB8] hover:border-[#BCAE97]'
                      }`}
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        type="button"
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                        aria-expanded={isExpanded}
                      >
                        <div className="space-y-1.5 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#6E5410]">
                              {faq.category === 'sourcing' && 'Fabric Sourcing'}
                              {faq.category === 'care' && 'Garment Care'}
                              {faq.category === 'locations' && 'Nairobi Locations'}
                              {faq.category === 'turnaround' && 'Turnaround & Orders'}
                            </span>
                          </div>
                          
                          <h3 className="font-display text-base sm:text-lg font-semibold text-[#2B2723] leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div className={`w-8 h-8 rounded-full border border-[#D6CBB8] flex items-center justify-center shrink-0 transition-transform duration-300 mt-1 ${
                          isExpanded ? 'bg-[#D4AF37] text-[#171412] rotate-180 border-[#6E5410]' : 'bg-[#EDE7DC] text-[#524C43]'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Accordion Collapsible Body */}
                      {isExpanded && (
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 border-t border-[#D6CBB8]/70 space-y-4 text-sm text-[#524C43] font-light leading-relaxed">
                          
                          {/* Main Detailed Answer */}
                          <p className="text-[#2B2723] leading-relaxed">
                            {faq.answer}
                          </p>

                          {/* Highlight Key Takeaway Box */}
                          {faq.keyTakeaway && (
                            <div className="p-3.5 bg-[#EDE7DC] border-l-2 border-[#6E5410] rounded-r-sm text-xs text-[#2B2723] flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#6E5410] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-[#171412] block mb-0.5">Sartorial Takeaway</span>
                                <span className="text-[#6E5410]">{faq.keyTakeaway}</span>
                              </div>
                            </div>
                          )}

                          {/* Bullet Points if provided */}
                          {faq.bulletPoints && faq.bulletPoints.length > 0 && (
                            <div className="space-y-2 pt-1">
                              <span className="text-xs uppercase tracking-wider text-[#2B2723] font-semibold block">
                                Key Specifics:
                              </span>
                              <ul className="space-y-1.5 pl-1">
                                {faq.bulletPoints.map((bullet, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-[#6E5410]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1.5" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tags & Action Row */}
                          <div className="pt-3 border-t border-[#D6CBB8] flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {faq.tags.map((tag, idx) => (
                                <span 
                                  key={idx} 
                                  className="text-[12px] px-2 py-0.5 rounded-sm bg-[#EDE7DC] text-[#524C43] border border-[#D6CBB8]"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {faq.relatedAction && (
                              <button
                                type="button"
                                onClick={() => handleActionClick(faq.relatedAction)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E5410] hover:text-[#F3E0A2] transition-colors"
                              >
                                <span>{faq.relatedAction.label}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm p-12 text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-[#6B6459] mx-auto" />
                <h4 className="font-display text-lg text-[#2B2723] font-semibold">No questions matched your search</h4>
                <p className="text-xs text-[#524C43] max-w-md mx-auto">
                  We could not find any FAQ entries containing "{searchQuery}". You can clear your filters or reach out directly to our master tailors.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="px-4 py-2 bg-[#E4DCCE] text-xs text-[#2B2723] rounded-sm hover:bg-[#374151] transition-colors"
                  >
                    Clear Search
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="px-4 py-2 bg-[#D4AF37] text-xs text-[#171412] rounded-sm font-bold hover:bg-[#E2E8F0] transition-colors"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================================= */}
        {/* VIEW 2: INTERACTIVE NAIROBI SERVICE LOCATIONS & CONCIERGE COVERAGE */}
        {/* ========================================================================================= */}
        {activeViewMode === 'neighborhoods' && (
          <div className="space-y-8">
            
            {/* Introductory Location Banner */}
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] p-6 rounded-sm shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs uppercase font-bold text-[#10B981] tracking-wider">
                    Full Nairobi Coverage & Mobile Concierge Active
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#171412]">
                  Where We Service Across Nairobi & Beyond
                </h3>
                <p className="text-xs sm:text-sm text-[#524C43] font-light leading-relaxed">
                  Experience bespoke tailoring with zero commute. Whether you visit our flagship private styling suite in Kimbo, Ruiru, or book our mobile master tailor to measure you in Karen, Runda, Muthaiga, or Upper Hill, you receive uncompromising Savile Row craftsmanship.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href="#contact"
                  className="px-4 py-3 bg-[#EDE7DC] border border-[#6E5410] text-xs font-semibold text-[#2B2723] rounded-sm hover:bg-[#D4AF37] hover:text-[#171412] transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#6E5410]" />
                  <span>View Ruiru Atelier on Map</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenBooking('bespoke-suits')}
                  className="px-4 py-3 bg-[#D4AF37] text-xs font-bold text-[#171412] rounded-sm hover:bg-[#E2E8F0] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Request Concierge to Your Estate</span>
                </button>
              </div>
            </div>

            {/* Interactive Neighborhood Selector & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Neighborhood Selector List (5 Cols) */}
              <div className="lg:col-span-5 bg-[#FBF8F3] border border-[#D6CBB8] p-5 rounded-sm space-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-[#D6CBB8]">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#171412]">
                    Select Your Area in Nairobi
                  </span>
                  <span className="text-[12px] text-[#6E5410] font-semibold">
                    {NAIROBI_NEIGHBORHOODS.length} Key Hubs
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {NAIROBI_NEIGHBORHOODS.map((hood) => {
                    const isSelected = hood.name === selectedNeighborhood;
                    return (
                      <button
                        key={hood.name}
                        type="button"
                        onClick={() => setSelectedNeighborhood(hood.name)}
                        className={`w-full text-left p-3 rounded-sm transition-all flex items-center justify-between gap-3 border ${
                          isSelected 
                            ? 'bg-[#EDE7DC] border-[#6E5410] text-[#171412] shadow-md' 
                            : 'bg-[#EDE7DC]/40 border-transparent text-[#524C43] hover:bg-[#EDE7DC]/80 hover:text-[#171412]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold block text-[#2B2723]">
                            {hood.name}
                          </span>
                          <span className="text-[12px] text-[#6B6459]">
                            {hood.subCounty} • {hood.type}
                          </span>
                        </div>
                        
                        <span className={`text-[12px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${
                          hood.type === 'Flagship Atelier' 
                            ? 'bg-[#D4AF37]/20 text-[#F3E0A2] border border-[#6E5410]/40'
                            : 'bg-[#E4DCCE] text-[#524C43]'
                        }`}>
                          {hood.etaConcierge.includes('Immediate') ? 'HQ Atelier' : 'Mobile'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Neighborhood Spotlight Card (7 Cols) */}
              <div className="lg:col-span-7 bg-[#FBF8F3] border border-[#D6CBB8] p-6 sm:p-8 rounded-sm shadow-xl flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6CBB8] pb-4">
                    <div>
                      <span className="text-[12px] uppercase font-bold tracking-widest text-[#6E5410]">
                        {currentNeighborhoodData.subCounty} Sub-County
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-[#171412] mt-0.5">
                        {currentNeighborhoodData.name}
                      </h4>
                    </div>

                    <span className="px-3 py-1 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-xs font-semibold text-[#2B2723]">
                      {currentNeighborhoodData.type}
                    </span>
                  </div>

                  <p className="text-sm text-[#2B2723] font-light leading-relaxed">
                    {currentNeighborhoodData.description}
                  </p>

                  {/* Specification Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#524C43]">
                        <Clock className="w-3.5 h-3.5 text-[#6E5410]" />
                        <span className="uppercase text-[12px] font-bold tracking-wider">Arrival Time / Availability</span>
                      </div>
                      <span className="text-xs font-bold text-[#2B2723] block">
                        {currentNeighborhoodData.etaConcierge}
                      </span>
                    </div>

                    <div className="p-3.5 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#524C43]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="uppercase text-[12px] font-bold tracking-wider">Travel & Fitting Fee</span>
                      </div>
                      <span className="text-xs font-bold text-[#10B981] block">
                        {currentNeighborhoodData.travelFee}
                      </span>
                    </div>
                  </div>

                  {/* Popular For */}
                  <div className="p-4 bg-[#EDE7DC]/60 border border-[#D6CBB8] rounded-sm text-xs space-y-1">
                    <span className="uppercase tracking-wider text-[12px] font-bold text-[#6E5410] block">
                      Common Services in this Area
                    </span>
                    <span className="text-[#6E5410]">
                      {currentNeighborhoodData.popularFor}
                    </span>
                  </div>
                </div>

                {/* Direct Action Row */}
                <div className="pt-4 border-t border-[#D6CBB8] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#524C43]">
                    Ready to schedule your appointment in {currentNeighborhoodData.name}?
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenBooking('bespoke-suits')}
                    className="px-5 py-2.5 bg-[#D4AF37] text-xs font-bold text-[#171412] rounded-sm hover:bg-[#E2E8F0] transition-colors flex items-center gap-2"
                  >
                    <span>Book Fitting in {currentNeighborhoodData.name.split(',')[0]}</span>
                    <Compass className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Outside Nairobi & Regional Shipping Card */}
            <div className="p-5 sm:p-6 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#2B2723] flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#6E5410]" />
                  Reside outside Nairobi (Mombasa, Kisumu, Nakuru, Eldoret, Nanyuki)?
                </span>
                <p className="text-xs text-[#524C43] font-light max-w-2xl">
                  We securely dispatch finished bespoke garments nationwide via insured priority courier within 24 hours of final inspection. Video measurement consultations available for international clients in the African diaspora.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleActionClick({ label: 'WhatsApp Concierge', actionType: 'whatsapp' })}
                className="px-4 py-2 bg-[#FBF8F3] border border-[#D6CBB8] text-xs font-semibold text-[#2B2723] hover:text-[#171412] hover:border-[#6E5410] rounded-sm shrink-0 flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Inquire on Nationwide Dispatch</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================================= */}
        {/* VIEW 3: THE 5 GOLDEN RULES OF GARMENT CARE */}
        {/* ========================================================================================= */}
        {activeViewMode === 'care-guide' && (
          <div className="space-y-8">
            
            {/* Guide Introduction Header */}
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] p-6 rounded-sm shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6E5410]" />
                  <span className="text-xs uppercase font-bold text-[#6E5410] tracking-wider">
                    Preserving Hand-Canvassed Masterpieces
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#171412]">
                  The 5 Golden Rules of Bespoke Suit Maintenance
                </h3>
                <p className="text-xs sm:text-sm text-[#524C43] font-light max-w-3xl leading-relaxed">
                  A bespoke suit crafted from Super 130s to Super 180s wool and pure Irish linen is a living garment. Follow these 5 essential guidelines established by our master tailors to preserve the hand-shaped chest canvas, natural fiber luster, and drape for decades.
                </p>
              </div>

              <div className="p-4 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm text-center shrink-0 w-full md:w-auto">
                <span className="text-2xl font-bold font-display text-[#6E5410] block">12 Months</span>
                <span className="text-[12px] uppercase font-bold text-[#2B2723] tracking-wider block">
                  Complimentary Fit & Repair
                </span>
                <span className="text-[12px] text-[#524C43]">Included with all bespoke suits</span>
              </div>
            </div>

            {/* The 5 Rules Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CARE_RULES.map((rule) => {
                return (
                  <div
                    key={rule.ruleNumber}
                    className="bg-[#FBF8F3] border border-[#D6CBB8] p-6 rounded-sm shadow-lg space-y-4 flex flex-col justify-between hover:border-[#6E5410]/50 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Rule Number & Icon Header */}
                      <div className="flex items-center justify-between border-b border-[#D6CBB8] pb-3">
                        <span className="font-display text-xs font-bold text-[#6E5410] tracking-widest uppercase">
                          Rule #{rule.ruleNumber}
                        </span>
                        
                        <div className="w-8 h-8 rounded-full bg-[#EDE7DC] border border-[#D6CBB8] flex items-center justify-center text-[#6E5410] group-hover:border-[#6E5410] transition-colors">
                          {rule.icon === 'Sparkles' && <Sparkles className="w-4 h-4" />}
                          {rule.icon === 'Flame' && <Flame className="w-4 h-4" />}
                          {rule.icon === 'Clock' && <Clock className="w-4 h-4" />}
                          {rule.icon === 'ShieldCheck' && <ShieldCheck className="w-4 h-4" />}
                          {rule.icon === 'CheckCircle2' && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>

                      <h4 className="font-display text-base font-semibold text-[#171412] leading-snug">
                        {rule.title}
                      </h4>

                      <p className="text-xs font-medium text-[#F3E0A2] leading-relaxed">
                        {rule.shortAdvice}
                      </p>

                      <p className="text-xs text-[#2B2723] font-light leading-relaxed">
                        {rule.fullDetails}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D6CBB8] text-[12px] text-[#524C43] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Nyota Swerve Atelier Master Tailor Standard</span>
                    </div>
                  </div>
                );
              })}

              {/* Atelier Steam & Inspection Service Card */}
              <div className="bg-[#EDE7DC] border border-[#6E5410]/60 p-6 rounded-sm shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[12px] uppercase font-bold tracking-widest text-[#6E5410] block">
                    Exclusive Atelier Benefit
                  </span>
                  
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#171412]">
                    Complimentary Event Steam & Lapel Re-rolling
                  </h4>

                  <p className="text-xs text-[#2B2723] font-light leading-relaxed">
                    Have an upcoming state dinner, boardroom keynote, or wedding? Drop your Nyota Swerve suit at our Ruiru atelier 24 hours prior for a complimentary master-tailor steam, lapel roll restoration, and button check.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBooking('suit-restyling')}
                  className="w-full py-2.5 bg-[#D4AF37] text-xs font-bold text-[#171412] rounded-sm hover:bg-[#E2E8F0] transition-colors text-center"
                >
                  Book Complimentary Press & Inspection
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Bottom Direct Tailor Assistance Bar */}
        <div className="mt-14 p-6 sm:p-8 bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display text-lg sm:text-xl font-bold text-[#171412]">
              Have a Question That Isn’t Addressed Here?
            </h4>
            <p className="text-xs text-[#524C43] font-light max-w-xl">
              Our master cutting team and head bespoke stylist are readily accessible via direct phone or WhatsApp to assist with fabric choices, custom designs, and rapid appointments.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="px-4 py-2.5 bg-[#EDE7DC] border border-[#D6CBB8] hover:border-[#6E5410] text-xs font-semibold text-[#2B2723] rounded-sm flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#6E5410]" />
              <span>{BRAND_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/${BRAND_INFO.whatsapp}?text=Hello%20Nyota%20Swerve%2C%20I%20have%20a%20question%20regarding%20fabric%20sourcing%2C%20care%2C%20or%20Nairobi%20fitting%20locations.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-xs font-semibold text-[#171412] rounded-sm flex items-center gap-2 transition-all shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
