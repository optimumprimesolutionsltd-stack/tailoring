import React, { useState, useMemo } from 'react';
import { FABRIC_SWATCHES, FABRIC_CATEGORIES } from '../data/fabricSwatches';
import { FabricSwatch, FabricColorway, FabricCategory } from '../types';
import { BRAND_INFO } from '../data/tailoringData';
import { buildMailtoUrl, buildWhatsAppUrl, compose, openWhatsApp } from '../utils/enquiry';
import { 
  Layers, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  Sun, 
  Moon, 
  Wind, 
  ShieldCheck, 
  Scissors, 
  MessageCircle, 
  Calendar, 
  Columns, 
  X, 
  Search,
  Award,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface FabricSwatchLibraryProps {
  onSelectForBooking?: (fabricInfo: { fabricName: string; colorway: string; mill: string }) => void;
}

type SilhouetteType = 'suit' | 'safari' | 'tuxedo' | 'trousers';
type LightingMode = 'daylight' | 'evening' | 'studio';

export const FabricSwatchLibrary: React.FC<FabricSwatchLibraryProps> = ({ onSelectForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Active selected fabric
  const [activeFabric, setActiveFabric] = useState<FabricSwatch>(FABRIC_SWATCHES[0]);
  // Active colorway within that fabric
  const [activeColorway, setActiveColorway] = useState<FabricColorway>(FABRIC_SWATCHES[0].colors[0]);

  // Visualizer settings
  const [visualizerMode, setVisualizerMode] = useState<'swatch' | 'silhouette'>('silhouette');
  const [silhouette, setSilhouette] = useState<SilhouetteType>('suit');
  const [lighting, setLighting] = useState<LightingMode>('daylight');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Comparison Tray
  const [comparisonList, setComparisonList] = useState<FabricSwatch[]>([FABRIC_SWATCHES[0], FABRIC_SWATCHES[1]]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  // Swatch Box Request Modal
  const [isSampleBoxModalOpen, setIsSampleBoxModalOpen] = useState<boolean>(false);
  const [sampleRequestSent, setSampleRequestSent] = useState<boolean>(false);
  const [samplePopupBlocked, setSamplePopupBlocked] = useState<boolean>(false);
  const [sampleName, setSampleName] = useState<string>('');
  const [samplePhone, setSamplePhone] = useState<string>('');
  const [sampleDeliveryArea, setSampleDeliveryArea] = useState<string>('Ruiru / Kimbo');

  // Filter fabrics based on category and search query
  const filteredFabrics = useMemo(() => {
    return FABRIC_SWATCHES.filter(fabric => {
      const matchesCategory = selectedCategory === 'all' || fabric.category === selectedCategory;
      const matchesSearch = 
        fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fabric.mill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fabric.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fabric.colors.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle selecting a fabric
  const handleSelectFabric = (fabric: FabricSwatch) => {
    setActiveFabric(fabric);
    setActiveColorway(fabric.colors[0]);
    setIsZoomed(false);
  };

  // Toggle fabric in comparison tray
  const toggleComparison = (fabric: FabricSwatch, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparisonList.some(item => item.id === fabric.id)) {
      setComparisonList(prev => prev.filter(item => item.id !== fabric.id));
    } else {
      if (comparisonList.length >= 3) {
        // limit to 3 for clean side-by-side
        setComparisonList(prev => [...prev.slice(1), fabric]);
      } else {
        setComparisonList(prev => [...prev, fabric]);
      }
    }
  };

  // Handle Proceed to Booking
  const handleProceedToBooking = () => {
    if (onSelectForBooking) {
      onSelectForBooking({
        fabricName: activeFabric.name,
        colorway: activeColorway.name,
        mill: activeFabric.mill
      });
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // WhatsApp link with prefilled fabric configuration
  const getWhatsAppInquiryUrl = () => {
    const message = `Hello Nyota Swerve Atelier, I explored your Fabric Swatch Library and I am interested in tailoring a bespoke piece with:
• Fabric: ${activeFabric.name} (${activeFabric.mill})
• Colorway: ${activeColorway.name} (${activeColorway.hex})
• Weave: ${activeFabric.weave} (${activeFabric.weightGsm} GSM)
• Recommended Cut: ${activeFabric.recommendedGarments[0]}

Could you advise on cloth availability for an atelier fitting in Ruiru?`;
    return `https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const sampleRequestText = () =>
    compose([
      `Hello Nyota. Swerve. Closet! I would like to request a physical swatch packet:`,
      '',
      `• Name: ${sampleName}`,
      `• Phone / WhatsApp: ${samplePhone}`,
      `• Cloth: ${activeFabric?.name ?? 'Selected cloth'}`,
      `• Colourway: ${activeColorway?.name ?? '—'}`,
      activeFabric?.mill && `• Mill: ${activeFabric.mill}`,
      `• Pickup / Courier: ${sampleDeliveryArea}`,
      '',
      'Please confirm dispatch or pickup timing.',
    ]);

  const handleSampleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend: the request only reaches the atelier once WhatsApp opens.
    setSamplePopupBlocked(!openWhatsApp(sampleRequestText()));
    setSampleRequestSent(true);
  };

  // Lighting overlay styling
  const getLightingOverlayClass = () => {
    switch (lighting) {
      case 'evening':
        return 'mix-blend-color bg-amber-600/15';
      case 'studio':
        return 'mix-blend-overlay bg-blue-400/10';
      case 'daylight':
      default:
        return 'mix-blend-normal bg-transparent';
    }
  };

  return (
    <section id="swatches" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D6CBB8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* No section header — PageHeader already titles this page. */}

        {/* Category Filter Pills & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#D6CBB8]">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {FABRIC_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#171412] text-[#FBF8F3] border-[#6E5410] shadow-[0_4px_16px_rgba(122,93,18,0.16)]'
                      : 'bg-[#FBF8F3] text-[#524C43] border-[#D6CBB8] hover:border-[#BCAE97] hover:text-[#2B2723]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#524C43] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by mill, texture, tone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] text-xs text-[#171412] placeholder-[#6B6459] focus:border-[#6E5410] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#524C43] hover:text-[#171412]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main 2-Column Workstation: Left Swatch Selector | Right Interactive Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Swatch Catalog Selection (5 cols) */}
          <div className="lg:col-span-5 space-y-4 max-h-[820px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-[#BCAE97] scrollbar-track-[#E4DCCE]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-[#524C43] font-semibold">
                Available Textiles ({filteredFabrics.length})
              </span>
              <span className="text-[12px] text-[#6E5410]">
                Click swatch card to inspect
              </span>
            </div>

            {filteredFabrics.length === 0 ? (
              <div className="p-8 text-center rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] text-[#524C43]">
                <p className="text-sm">No textiles matched your search query.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-3 text-xs text-[#6E5410] font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredFabrics.map((fabric) => {
                const isCurrentActive = activeFabric.id === fabric.id;
                const isInComparison = comparisonList.some(item => item.id === fabric.id);

                return (
                  <div
                    key={fabric.id}
                    onClick={() => handleSelectFabric(fabric)}
                    className={`p-4 rounded-sm transition-all duration-200 cursor-pointer border relative group ${
                      isCurrentActive
                        ? 'bg-[#FBF8F3] border-[#6E5410] shadow-[0_4px_16px_rgba(122,93,18,0.16)] ring-1 ring-[#D4AF37]'
                        : 'bg-[#FBF8F3]/70 border-[#D6CBB8] hover:border-[#BCAE97] hover:bg-[#FBF8F3]'
                    }`}
                  >
                    {/* Header line with Mill & Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-[#6E5410] uppercase tracking-wider">
                          {fabric.mill}
                        </span>
                        <span className="text-[#BCAE97]">•</span>
                        <span className="text-[12px] text-[#524C43]">{fabric.origin}</span>
                      </div>
                      {fabric.tag && (
                        <span className="text-[12px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723]">
                          {fabric.tag}
                        </span>
                      )}
                    </div>

                    {/* Fabric Name */}
                    <h3 className="font-display text-base font-bold text-[#171412] group-hover:text-[#6E5410] transition-colors mb-1">
                      {fabric.name}
                    </h3>

                    {/* Composition & Spec Chips */}
                    <p className="text-xs text-[#524C43] font-light mb-3 line-clamp-1">
                      {fabric.composition}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#2B2723] mb-3">
                      <span className="px-2 py-0.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8]">
                        {fabric.weave}
                      </span>
                      <span className="px-2 py-0.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8]">
                        {fabric.weightGsm} g/m² ({fabric.weightOz})
                      </span>
                      <span className="px-2 py-0.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#524C43]">
                        {fabric.season}
                      </span>
                    </div>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#D6CBB8]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] text-[#524C43] mr-1">Shades:</span>
                        {fabric.colors.map((col) => {
                          const isColorSelected = isCurrentActive && activeColorway.id === col.id;
                          return (
                            <button
                              key={col.id}
                              title={col.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveFabric(fabric);
                                setActiveColorway(col);
                              }}
                              className={`w-4 h-4 rounded-full border transition-all ${
                                isColorSelected
                                  ? 'ring-2 ring-[#D4AF37] ring-offset-1 ring-offset-[#EDE7DC] scale-110'
                                  : 'border-[#BCAE97] hover:scale-110'
                              }`}
                              style={{ backgroundColor: col.hex }}
                            />
                          );
                        })}
                      </div>

                      {/* Compare toggle button */}
                      <button
                        onClick={(e) => toggleComparison(fabric, e)}
                        className={`text-[12px] font-medium px-2 py-0.5 rounded-sm border transition-colors ${
                          isInComparison
                            ? 'border-[#6E5410] text-[#6E5410] bg-[#D4AF37]/10'
                            : 'border-[#D6CBB8] text-[#524C43] hover:text-[#171412]'
                        }`}
                      >
                        {isInComparison ? '✓ In Compare' : '+ Compare'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Interactive Visualizer & Drapery Simulator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Main Visualizer Stage Card */}
            <div className="rounded-sm bg-[#FBF8F3] border border-[#BCAE97] p-6 shadow-2xl relative">
              
              {/* Top Controls Bar: Visualizer Mode Toggle & Lighting Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#D6CBB8]">
                
                {/* Mode Selector: Macro Weave Swatch vs Garment Silhouette */}
                <div className="inline-flex rounded-sm bg-[#EDE7DC] p-0.5 border border-[#D6CBB8]">
                  <button
                    onClick={() => setVisualizerMode('silhouette')}
                    className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      visualizerMode === 'silhouette'
                        ? 'bg-[#171412] text-[#FBF8F3] shadow-sm'
                        : 'text-[#524C43] hover:text-[#171412]'
                    }`}
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Garment Silhouette</span>
                  </button>
                  <button
                    onClick={() => setVisualizerMode('swatch')}
                    className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      visualizerMode === 'swatch'
                        ? 'bg-[#171412] text-[#FBF8F3] shadow-sm'
                        : 'text-[#524C43] hover:text-[#171412]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Macro Weave</span>
                  </button>
                </div>

                {/* Lighting Atmosphere Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] uppercase tracking-wider text-[#524C43] hidden sm:inline-block font-semibold">
                    Lighting:
                  </span>
                  <div className="inline-flex rounded-sm bg-[#EDE7DC] p-0.5 border border-[#D6CBB8]">
                    <button
                      onClick={() => setLighting('daylight')}
                      title="Nairobi Daylight (Natural Sun)"
                      className={`p-1.5 rounded-sm text-xs transition-all ${
                        lighting === 'daylight'
                          ? 'bg-[#171412] text-[#FBF8F3]'
                          : 'text-[#524C43] hover:text-[#171412]'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLighting('evening')}
                      title="Evening Chandelier / Gala (Warm Light)"
                      className={`p-1.5 rounded-sm text-xs transition-all ${
                        lighting === 'evening'
                          ? 'bg-[#171412] text-[#FBF8F3]'
                          : 'text-[#524C43] hover:text-[#171412]'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLighting('studio')}
                      title="Studio Executive / Boardroom (High-Contrast Neutral)"
                      className={`p-1.5 rounded-sm text-xs transition-all ${
                        lighting === 'studio'
                          ? 'bg-[#171412] text-[#FBF8F3]'
                          : 'text-[#524C43] hover:text-[#171412]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Sub-bar when in Silhouette Mode: Silhouette Silhouette Choice */}
              {visualizerMode === 'silhouette' && (
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                  <span className="text-[12px] text-[#524C43] whitespace-nowrap">Silhouette Model:</span>
                  {[
                    { id: 'suit', label: 'Executive Two-Piece' },
                    { id: 'tuxedo', label: 'Black-Tie Tuxedo' },
                    { id: 'safari', label: 'Safari Overjacket' },
                    { id: 'trousers', label: 'Tailored Trousers' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSilhouette(s.id as SilhouetteType)}
                      className={`px-2.5 py-1 rounded-sm text-xs transition-colors whitespace-nowrap border ${
                        silhouette === s.id
                          ? 'bg-[#EDE7DC] border-[#6E5410] text-[#171412] font-semibold'
                          : 'border-[#D6CBB8] text-[#524C43] hover:text-[#171412] bg-[#EDE7DC]/50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {/* VISUALIZER CANVAS DISPLAY */}
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] overflow-hidden flex items-center justify-center shadow-inner">
                
                {/* Atmospheric Lighting Overlay Filter */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-500 z-20 ${getLightingOverlayClass()}`} />

                {/* MODE 1: MACRO WEAVE SWATCH */}
                {visualizerMode === 'swatch' && (
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    {/* High-res swatch image with zoom scale */}
                    <div 
                      className={`relative w-full h-full rounded-sm overflow-hidden border border-[#BCAE97] transition-transform duration-500 ${
                        isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <img
                        src={activeColorway.swatchImage}
                        alt={`${activeFabric.name} in ${activeColorway.name}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />

                      {/* Color tint blend overlay using activeColorway hex */}
                      <div 
                        className="absolute inset-0 mix-blend-color transition-colors duration-500 opacity-60 pointer-events-none"
                        style={{ backgroundColor: activeColorway.hex }}
                      />

                      {/* Weave pattern simulation grid overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none opacity-40" />

                      {/* Zoom Indicator Badge */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-sm bg-[#EDE7DC]/80 backdrop-blur-md border border-[#BCAE97] text-[12px] text-[#171412] flex items-center gap-1.5 pointer-events-none">
                        {isZoomed ? <ZoomOut className="w-3 h-3 text-[#6E5410]" /> : <ZoomIn className="w-3 h-3 text-[#6E5410]" />}
                        <span>{isZoomed ? '2.5x Macro Magnification' : 'Click to Magnify Weave'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 2: GARMENT SILHOUETTE DRAPERY VISUALIZER */}
                {visualizerMode === 'silhouette' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                    
                    {/* SVG Anatomical Silhouette Render */}
                    <div className="relative w-72 sm:w-80 h-full flex items-center justify-center">
                      
                      {/* SVG Pattern Definitions for Fabric Weave simulation */}
                      <svg className="absolute w-0 h-0">
                        <defs>
                          <pattern id="fabric-twill" width="6" height="6" patternUnits="userSpaceOnUse">
                            <path d="M0 6 L6 0 M0 0 L6 6" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                          </pattern>
                          <pattern id="fabric-slub" width="12" height="12" patternUnits="userSpaceOnUse">
                            <path d="M0 3 Q6 4 12 3 M0 9 Q6 8 12 9" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
                          </pattern>
                          <pattern id="fabric-herringbone" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M0 0 L5 5 L10 0 M0 5 L5 10 L10 5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
                          </pattern>
                          <linearGradient id="lighting-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                            <stop offset="35%" stopColor="rgba(255,255,255,0.05)" />
                            <stop offset="70%" stopColor="rgba(0,0,0,0.15)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Render Suit Silhouette */}
                      {silhouette === 'suit' && (
                        <svg viewBox="0 0 200 240" className="w-56 sm:w-64 h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                          {/* Inner Shirt Collar (white) */}
                          <polygon points="85,32 100,55 115,32 108,24 92,24" fill="#f8fafc" />
                          <polygon points="100,55 96,95 104,95" fill="#1e293b" />
                          {/* Left Jacket Body */}
                          <path
                            d="M60,40 L90,32 L95,115 L62,210 L35,200 L42,100 Z"
                            fill={activeColorway.hex}
                          />
                          {/* Right Jacket Body */}
                          <path
                            d="M140,40 L110,32 L105,115 L138,210 L165,200 L158,100 Z"
                            fill={activeColorway.hex}
                          />
                          {/* Centre Overlap & Front Panels */}
                          <path
                            d="M90,32 L100,115 L108,210 L92,210 L95,115 Z"
                            fill={activeColorway.hex}
                            fillOpacity="0.9"
                          />
                          {/* Lapels with subtle darker shade */}
                          <polygon points="70,40 100,115 88,115 62,60" fill={activeColorway.secondaryHex || activeColorway.hex} />
                          <polygon points="130,40 100,115 112,115 138,60" fill={activeColorway.secondaryHex || activeColorway.hex} />
                          {/* Weave Pattern Overlay */}
                          <path
                            d="M42,40 L158,40 L165,200 L35,200 Z"
                            fill={activeFabric.weave.includes('Slub') ? 'url(#fabric-slub)' : activeFabric.weave.includes('Herringbone') ? 'url(#fabric-herringbone)' : 'url(#fabric-twill)'}
                            opacity="0.85"
                          />
                          {/* Sheen & Fold Highlights */}
                          <path d="M42,40 L158,40 L165,200 L35,200 Z" fill="url(#lighting-sheen)" opacity="0.65" />
                          {/* Pick Stitching Lapel Line */}
                          <line x1="69" y1="42" x2="98" y2="114" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="1,1" />
                          <line x1="131" y1="42" x2="102" y2="114" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="1,1" />
                          {/* Horn Buttons */}
                          <circle cx="102" cy="125" r="2.5" fill="#1c1917" stroke="#44403c" strokeWidth="0.5" />
                          <circle cx="102" cy="148" r="2.5" fill="#1c1917" stroke="#44403c" strokeWidth="0.5" />
                          {/* Breast Welt Pocket */}
                          <line x1="68" y1="90" x2="84" y2="88" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                          {/* Flap Pockets */}
                          <rect x="52" y="155" width="28" height="5" rx="1" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <rect x="120" y="155" width="28" height="5" rx="1" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                        </svg>
                      )}

                      {/* Render Tuxedo Silhouette */}
                      {silhouette === 'tuxedo' && (
                        <svg viewBox="0 0 200 240" className="w-56 sm:w-64 h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                          {/* Marcella Pleated Tuxedo Shirt (white) */}
                          <polygon points="85,32 100,55 115,32 108,24 92,24" fill="#f8fafc" />
                          {/* Black Silk Bowtie */}
                          <polygon points="90,44 100,48 90,52" fill="#09090b" />
                          <polygon points="110,44 100,48 110,52" fill="#09090b" />
                          <circle cx="100" cy="48" r="2" fill="#18181b" />
                          {/* Tuxedo Body Panels */}
                          <path
                            d="M60,40 L90,32 L95,120 L62,210 L35,200 L42,100 Z"
                            fill={activeColorway.hex}
                          />
                          <path
                            d="M140,40 L110,32 L105,120 L138,210 L165,200 L158,100 Z"
                            fill={activeColorway.hex}
                          />
                          {/* Peak Satin Silk Lapels (Obsidian Black Silk Sheen) */}
                          <path d="M68,40 L100,120 L84,120 L58,75 L68,75 Z" fill="#09090b" stroke="#27272a" strokeWidth="0.5" />
                          <path d="M132,40 L100,120 L116,120 L142,75 L132,75 Z" fill="#09090b" stroke="#27272a" strokeWidth="0.5" />
                          {/* Weave Pattern Overlay */}
                          <path
                            d="M42,40 L158,40 L165,200 L35,200 Z"
                            fill={activeFabric.weave.includes('Slub') ? 'url(#fabric-slub)' : activeFabric.weave.includes('Herringbone') ? 'url(#fabric-herringbone)' : 'url(#fabric-twill)'}
                            opacity="0.85"
                          />
                          <path d="M42,40 L158,40 L165,200 L35,200 Z" fill="url(#lighting-sheen)" opacity="0.65" />
                          {/* Satin Fabric Covered Button */}
                          <circle cx="100" cy="132" r="3.2" fill="#09090b" stroke="#52525b" strokeWidth="0.8" />
                          {/* Silk Pocket Square in Welt */}
                          <polygon points="72,88 78,78 84,88" fill="#ffffff" />
                          <line x1="70" y1="88" x2="86" y2="88" stroke="#09090b" strokeWidth="2" />
                        </svg>
                      )}

                      {/* Render Safari Overjacket Silhouette */}
                      {silhouette === 'safari' && (
                        <svg viewBox="0 0 200 240" className="w-56 sm:w-64 h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                          {/* Camp Collar & Placket */}
                          <path d="M75,35 L100,50 L125,35 L118,24 L82,24 Z" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          {/* Field Jacket Body */}
                          <path
                            d="M55,38 L145,38 L152,215 L48,215 Z"
                            fill={activeColorway.hex}
                          />
                          {/* 4 Iconic Gusseted Safari Cargo Pockets */}
                          {/* Chest Pockets */}
                          <rect x="62" y="70" width="26" height="26" rx="2" fill={activeColorway.secondaryHex || activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <polygon points="62,70 75,76 88,70" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <circle cx="75" cy="74" r="1.5" fill="#44403c" />

                          <rect x="112" y="70" width="26" height="26" rx="2" fill={activeColorway.secondaryHex || activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <polygon points="112,70 125,76 138,70" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <circle cx="125" cy="74" r="1.5" fill="#44403c" />

                          {/* Waist Cargo Pockets */}
                          <rect x="58" y="135" width="32" height="34" rx="2" fill={activeColorway.secondaryHex || activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <polygon points="58,135 74,142 90,135" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <circle cx="74" cy="140" r="1.5" fill="#44403c" />

                          <rect x="110" y="135" width="32" height="34" rx="2" fill={activeColorway.secondaryHex || activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <polygon points="110,135 126,142 142,135" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <circle cx="126" cy="140" r="1.5" fill="#44403c" />

                          {/* Centre Safari Belt Waist Tunnel */}
                          <rect x="50" y="112" width="100" height="12" fill={activeColorway.secondaryHex || activeColorway.hex} opacity="0.6" stroke="#0A0A0C" strokeWidth="0.5" />
                          <rect x="94" y="110" width="12" height="16" rx="1" fill="none" stroke="#d4af37" strokeWidth="1" />

                          {/* Weave Pattern Overlay */}
                          <path
                            d="M50,35 L150,35 L152,215 L48,215 Z"
                            fill={activeFabric.weave.includes('Slub') ? 'url(#fabric-slub)' : activeFabric.weave.includes('Herringbone') ? 'url(#fabric-herringbone)' : 'url(#fabric-twill)'}
                            opacity="0.85"
                          />
                          <path d="M50,35 L150,35 L152,215 L48,215 Z" fill="url(#lighting-sheen)" opacity="0.55" />
                        </svg>
                      )}

                      {/* Render Tailored Trousers Silhouette */}
                      {silhouette === 'trousers' && (
                        <svg viewBox="0 0 200 240" className="w-56 sm:w-64 h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                          {/* Extended Hollywood Waistband */}
                          <path d="M65,30 L135,30 L134,45 L66,45 Z" fill={activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          {/* Brass Side Adjusters */}
                          <rect x="63" y="34" width="4" height="6" rx="1" fill="#d4af37" />
                          <rect x="133" y="34" width="4" height="6" rx="1" fill="#d4af37" />
                          {/* Left Leg with Center Crease */}
                          <polygon points="66,45 100,55 94,220 72,220" fill={activeColorway.hex} />
                          {/* Right Leg with Center Crease */}
                          <polygon points="100,55 134,45 128,220 106,220" fill={activeColorway.hex} />
                          {/* Weave Pattern Overlay */}
                          <polygon points="66,45 134,45 128,220 72,220" fill={activeFabric.weave.includes('Slub') ? 'url(#fabric-slub)' : activeFabric.weave.includes('Herringbone') ? 'url(#fabric-herringbone)' : 'url(#fabric-twill)'} opacity="0.85" />
                          <polygon points="66,45 134,45 128,220 72,220" fill="url(#lighting-sheen)" opacity="0.6" />
                          {/* Knife-edge permanent iron creases */}
                          <line x1="83" y1="52" x2="83" y2="220" stroke="#ffffff" strokeWidth="0.6" opacity="0.4" />
                          <line x1="117" y1="52" x2="117" y2="220" stroke="#ffffff" strokeWidth="0.6" opacity="0.4" />
                          {/* Single forward pleats */}
                          <line x1="80" y1="45" x2="82" y2="65" stroke="#0A0A0C" strokeWidth="0.8" />
                          <line x1="120" y1="45" x2="118" y2="65" stroke="#0A0A0C" strokeWidth="0.8" />
                          {/* 2-inch Cuffs */}
                          <rect x="71" y="212" width="24" height="8" fill={activeColorway.secondaryHex || activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                          <rect x="105" y="212" width="24" height="8" fill={activeColorway.secondaryHex || activeColorway.hex} stroke="#0A0A0C" strokeWidth="0.5" />
                        </svg>
                      )}

                    </div>

                    {/* Silhouette Floating Info Tag */}
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-sm bg-[#EDE7DC]/85 backdrop-blur-md border border-[#BCAE97] text-xs">
                      <span className="text-[#6E5410] font-bold block text-[12px] uppercase tracking-wider">
                        Virtual Drape Engine
                      </span>
                      <span className="text-[#171412] font-medium text-[12px]">
                        {activeColorway.name} • {activeFabric.weave}
                      </span>
                    </div>

                  </div>
                )}

              </div>

              {/* ACTIVE COLORWAY PALETTE ROW */}
              <div className="mt-5 pt-4 border-t border-[#D6CBB8]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#524C43] font-semibold block">
                      Colorways for {activeFabric.name}
                    </span>
                    <span className="text-xs text-[#2B2723] font-medium">
                      Active: <span className="text-[#6E5410] font-semibold">{activeColorway.name}</span>
                    </span>
                  </div>
                  <span className="text-[12px] text-[#524C43] font-light italic">
                    {activeColorway.toneDescription}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {activeFabric.colors.map((color) => {
                    const isSelected = activeColorway.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setActiveColorway(color)}
                        className={`p-2 rounded-sm text-left transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#EDE7DC] border-[#6E5410] ring-1 ring-[#D4AF37] shadow-md'
                            : 'bg-[#EDE7DC]/60 border-[#D6CBB8] hover:border-[#BCAE97]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div
                            className="w-5 h-5 rounded-full border border-[#BCAE97] shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#6E5410]" />}
                        </div>
                        <span className="text-[12px] font-semibold text-[#171412] block truncate">
                          {color.name}
                        </span>
                        <span className="text-[12px] text-[#524C43] uppercase">
                          {color.hex}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TECHNICAL SPECIFICATIONS GRID */}
              <div className="mt-6 pt-5 border-t border-[#D6CBB8] grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                {/* Mill & Origin */}
                <div className="p-3 rounded-sm bg-[#EDE7DC]/60 border border-[#D6CBB8]">
                  <span className="text-[12px] text-[#524C43] uppercase tracking-wider block font-semibold mb-0.5">
                    Cloth Provenance
                  </span>
                  <p className="text-xs font-bold text-[#171412]">{activeFabric.mill}</p>
                  <span className="text-[12px] text-[#524C43]">{activeFabric.origin}</span>
                </div>

                {/* Weight & Season */}
                <div className="p-3 rounded-sm bg-[#EDE7DC]/60 border border-[#D6CBB8]">
                  <span className="text-[12px] text-[#524C43] uppercase tracking-wider block font-semibold mb-0.5">
                    Weight / Season
                  </span>
                  <p className="text-xs font-bold text-[#171412]">{activeFabric.weightGsm} g/m²</p>
                  <span className="text-[12px] text-[#524C43]">{activeFabric.season}</span>
                </div>

                {/* Breathability Score */}
                <div className="p-3 rounded-sm bg-[#EDE7DC]/60 border border-[#D6CBB8]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[12px] text-[#524C43] uppercase tracking-wider font-semibold">
                      Breathability
                    </span>
                    <Wind className="w-3 h-3 text-[#6E5410]" />
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`h-1.5 flex-1 rounded-sm ${
                          star <= activeFabric.breathability ? 'bg-[#D4AF37]' : 'bg-[#E4DCCE]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#524C43] mt-1 block">
                    {activeFabric.breathability >= 4 ? 'Tropical Cooling' : 'Insulating Body'}
                  </span>
                </div>

                {/* Wrinkle Resistance Score */}
                <div className="p-3 rounded-sm bg-[#EDE7DC]/60 border border-[#D6CBB8]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[12px] text-[#524C43] uppercase tracking-wider font-semibold">
                      Crease Memory
                    </span>
                    <ShieldCheck className="w-3 h-3 text-[#6E5410]" />
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`h-1.5 flex-1 rounded-sm ${
                          star <= activeFabric.wrinkleResistance ? 'bg-[#D4AF37]' : 'bg-[#E4DCCE]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#524C43] mt-1 block">
                    {activeFabric.wrinkleResistance >= 4 ? 'High Travel Recovery' : 'Artisanal Natural Fold'}
                  </span>
                </div>

              </div>

              {/* Kenyan Climate Commentary */}
              <div className="mt-4 p-3 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-xs text-[#524C43] flex items-start gap-2.5 font-light">
                <Award className="w-4 h-4 text-[#6E5410] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#2B2723] font-medium">Nairobi Master Tailor Recommendation: </span>
                  {activeFabric.climateSuitability}
                </div>
              </div>

              {/* Action Callouts */}
              <div className="mt-6 pt-5 border-t border-[#D6CBB8] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => { setSampleRequestSent(false); setSamplePopupBlocked(false); setIsSampleBoxModalOpen(true); }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-sm border border-[#BCAE97] hover:border-[#6E5410] text-[#2B2723] bg-[#EDE7DC] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Request Swatch Sample Card
                  </button>
                  <a
                    href={getWhatsAppInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-sm border border-[#BCAE97] hover:border-[#25D366] text-[#524C43] hover:text-[#25D366] bg-[#EDE7DC] text-xs transition-colors flex items-center gap-1.5"
                    title="Inquire about this cloth on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="hidden md:inline">WhatsApp Tailor</span>
                  </a>
                </div>

                <button
                  onClick={handleProceedToBooking}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] text-xs font-bold uppercase tracking-widest transition-all shadow-[0_4px_16px_rgba(122,93,18,0.16)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Select for My Bespoke Fitting</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM COMPARISON DRAWER BAR */}
        {comparisonList.length > 0 && (
          <div className="p-4 sm:p-5 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] flex items-center justify-center text-[#6E5410]">
                <Columns className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#171412] uppercase tracking-wider">
                  Fabric Comparison Tray ({comparisonList.length}/3 selected)
                </h4>
                <p className="text-[12px] text-[#524C43]">
                  Compare fiber weights, drape stiffness, and yarn origins side-by-side.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="hidden md:flex items-center gap-2">
                {comparisonList.map((item) => (
                  <span
                    key={item.id}
                    className="text-[12px] px-2.5 py-1 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span>{item.name}</span>
                    <button
                      onClick={(e) => toggleComparison(item, e)}
                      className="text-[#524C43] hover:text-[#171412] ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <button
                onClick={() => setShowComparisonModal(true)}
                className="w-full sm:w-auto px-4 py-2 rounded-sm bg-[#EDE7DC] hover:bg-[#E4DCCE] border border-[#BCAE97] hover:border-[#6E5410] text-[#171412] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Compare Side-by-Side
              </button>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: SIDE-BY-SIDE COMPARISON MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171412]/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#FBF8F3] rounded-sm border border-[#BCAE97] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowComparisonModal(false)}
              className="absolute top-4 right-4 p-2 text-[#524C43] hover:text-[#171412] rounded-sm bg-[#E4DCCE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[12px] uppercase tracking-widest text-[#6E5410] font-bold block mb-1">
                Comparative Textile Matrix
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#171412]">
                Side-by-Side Cloth Evaluation
              </h3>
              <p className="text-xs text-[#524C43]">
                Examine technical yarn attributes, drape behaviors, and Kenyan microclimate suitabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisonList.map((fabric) => (
                <div key={fabric.id} className="p-5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] flex flex-col justify-between">
                  <div>
                    <span className="text-[12px] font-bold text-[#6E5410] uppercase tracking-wider block mb-1">
                      {fabric.mill} • {fabric.origin}
                    </span>
                    <h4 className="font-display text-base font-bold text-[#171412] mb-2">
                      {fabric.name}
                    </h4>
                    <p className="text-xs text-[#524C43] mb-4 font-light leading-relaxed">
                      {fabric.textureDescription}
                    </p>

                    <div className="space-y-2.5 text-xs border-t border-[#D6CBB8] pt-3">
                      <div>
                        <span className="text-[12px] text-[#524C43] uppercase block">Composition:</span>
                        <span className="text-[#2B2723] font-medium">{fabric.composition}</span>
                      </div>
                      <div>
                        <span className="text-[12px] text-[#524C43] uppercase block">Weight & Weave:</span>
                        <span className="text-[#2B2723] font-medium">{fabric.weightGsm} g/m² • {fabric.weave}</span>
                      </div>
                      <div>
                        <span className="text-[12px] text-[#524C43] uppercase block">Drape Quality:</span>
                        <span className="text-[#6E5410] font-medium">{fabric.drapePersonality}</span>
                      </div>
                      <div>
                        <span className="text-[12px] text-[#524C43] uppercase block">Breathability Rating:</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`h-1.5 w-5 rounded-sm ${i <= fabric.breathability ? 'bg-[#D4AF37]' : 'bg-[#E4DCCE]'}`} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[12px] text-[#524C43] uppercase block">Wrinkle Resilience:</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`h-1.5 w-5 rounded-sm ${i <= fabric.wrinkleResistance ? 'bg-[#D4AF37]' : 'bg-[#E4DCCE]'}`} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[12px] text-[#524C43] uppercase block">Recommended Silhouette:</span>
                        <span className="text-[#2B2723]">{fabric.recommendedGarments[0]}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleSelectFabric(fabric);
                      setShowComparisonModal(false);
                    }}
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#FBF8F3] hover:bg-[#D4AF37] hover:text-[#171412] border border-[#D6CBB8] text-xs font-semibold uppercase tracking-wider text-[#2B2723] transition-all text-center"
                  >
                    View in Virtual Visualizer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REQUEST PHYSICAL SWATCH CARD MODAL */}
      {isSampleBoxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171412]/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#FBF8F3] rounded-sm border border-[#BCAE97] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => { setIsSampleBoxModalOpen(false); setSampleRequestSent(false); setSamplePopupBlocked(false); }}
              className="absolute top-4 right-4 p-2 text-[#524C43] hover:text-[#171412] rounded-sm bg-[#E4DCCE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[12px] uppercase tracking-widest text-[#6E5410] font-bold block mb-1">
              Atelier Swatch Concierge
            </span>
            <h3 className="font-display text-xl font-bold text-[#171412] mb-2">
              Request Physical Cloth Swatch Card
            </h3>
            <p className="text-xs text-[#524C43] leading-relaxed mb-6 font-light">
              We will prepare an official tactile swatch packet of <strong className="text-[#171412]">{activeFabric.name}</strong> in <strong className="text-[#6E5410]">{activeColorway.name}</strong> alongside 3 complementary mill cuttings.
            </p>

            {sampleRequestSent ? (
              <div className="py-6 space-y-4">
                <div className="text-center space-y-2">
                  <Check className="w-10 h-10 text-[#6E5410] mx-auto" />
                  <h4 className="text-base font-bold text-[#171412]">
                    {samplePopupBlocked ? 'One Last Step' : 'Request Ready in WhatsApp'}
                  </h4>
                  <p className="text-xs text-[#524C43] leading-relaxed">
                    {samplePopupBlocked
                      ? 'Your browser blocked the WhatsApp window. Your swatch request is written out — send it with a button below.'
                      : 'Press send in WhatsApp and our Ruiru concierge will arrange dispatch or pickup.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={buildWhatsAppUrl(sampleRequestText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-[12px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{samplePopupBlocked ? 'Send on WhatsApp' : 'Reopen WhatsApp'}</span>
                  </a>
                  <a
                    href={buildMailtoUrl(
                      `Swatch packet request — ${sampleName || 'New client'}`,
                      sampleRequestText(),
                    )}
                    className="flex-1 py-2.5 px-3 rounded-sm border border-[#D6CBB8] hover:border-[#6E5410] text-[#524C43] hover:text-[#171412] text-[12px] font-semibold uppercase tracking-widest transition-colors flex items-center justify-center"
                  >
                    Email Instead
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSampleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2B2723] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={sampleName}
                    onChange={(e) => setSampleName(e.target.value)}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#171412] text-xs focus:border-[#6E5410] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2723] mb-1">Phone or WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={samplePhone}
                    onChange={(e) => setSamplePhone(e.target.value)}
                    placeholder="+254 7..."
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#171412] text-xs focus:border-[#6E5410] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2723] mb-1">Pickup or Courier Area</label>
                  <select
                    value={sampleDeliveryArea}
                    onChange={(e) => setSampleDeliveryArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#171412] text-xs focus:border-[#6E5410] outline-none"
                  >
                    <option value="Ruiru / Kimbo">Ruiru Atelier Pickup (Kimbo, Ruiru)</option>
                    <option value="Nairobi CBD / Upper Hill">Courier to Upper Hill / Kilimani / CBD</option>
                    <option value="Karen / Gigiri / Runda">Courier to Karen / Gigiri / Runda</option>
                    <option value="Rest of Kenya / Coast">Courier to Mombasa / Kisumu / Eldoret</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-xs uppercase tracking-widest cursor-pointer shadow-[0_4px_16px_rgba(122,93,18,0.16)] transition-all"
                >
                  Confirm Swatch Packet Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
