import React, { useState, useEffect } from 'react';
import { useTailoring } from '../context/TailoringContext';
import { BRAND_INFO } from '../data/tailoringData';
import { buildMailtoUrl, buildWhatsAppUrl, openWhatsApp } from '../utils/enquiry';
import {
  Calendar,
  Calculator,
  CheckCircle,
  Clock,
  MessageCircle,
  MapPin,
  User,
  Sparkles,
  Mail
} from 'lucide-react';

interface BookingQuotationProps {
  initialServiceId?: string;
  currency: 'KES' | 'USD';
  selectedFabricPreference?: { fabricName: string; colorway: string; mill: string } | null;
}

export const BookingQuotationSection: React.FC<BookingQuotationProps> = ({ 
  initialServiceId, 
  currency,
  selectedFabricPreference 
}) => {
  const { services, pricingRules, addBooking } = useTailoring();
  const [activeTab, setActiveTab] = useState<'booking' | 'quotation'>('booking');

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || services[0]?.id || 'bespoke-suits');
  const [fabricGrade, setFabricGrade] = useState<'standard' | 'super140' | 'luxuryCashmere' | 'linenSilk'>('super140');
  const [piecesCount, setPiecesCount] = useState<number>(1);
  const [urgency, setUrgency] = useState<'standard' | 'express4day'>('express4day');
  const [fittingLocation, setFittingLocation] = useState<'boutique' | 'concierge'>('boutique');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('11:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (selectedFabricPreference) {
      setNotes(prev => {
        const fabricNote = `Fabric Selection: ${selectedFabricPreference.fabricName} in ${selectedFabricPreference.colorway} (${selectedFabricPreference.mill})`;
        if (!prev.includes(selectedFabricPreference.fabricName)) {
          return prev ? `${fabricNote}\n${prev}` : fabricNote;
        }
        return prev;
      });
    }
  }, [selectedFabricPreference]);

  // Confirmation State
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [popupBlocked, setPopupBlocked] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  const currentService = services.find(s => s.id === selectedServiceId) || services[0] || {
    id: 'bespoke-suits',
    title: "Custom-Made Men's Suits",
    startingPriceKES: 45000,
    startingPriceUSD: 350,
  };

  // Dynamic Price Calculation
  const calculateTotal = () => {
    let baseKES = currentService.startingPriceKES;
    let baseUSD = currentService.startingPriceUSD;

    // Fabric grade surcharge from pricing rules
    let fabricSurchargeKES = 0;
    if (fabricGrade === 'super140') fabricSurchargeKES = pricingRules.super140KES;
    if (fabricGrade === 'luxuryCashmere') fabricSurchargeKES = pricingRules.cashmereKES;
    if (fabricGrade === 'linenSilk') fabricSurchargeKES = pricingRules.linenKES;
    let fabricSurchargeUSD = Math.round(fabricSurchargeKES / 130);

    // Location fee
    let locationSurchargeKES = fittingLocation === 'concierge' ? 3500 : 0;
    let locationSurchargeUSD = fittingLocation === 'concierge' ? 25 : 0;

    // Express 4-day turnaround fee percentage
    const subtotalKES = (baseKES + fabricSurchargeKES) * piecesCount;
    const subtotalUSD = (baseUSD + fabricSurchargeUSD) * piecesCount;

    const expressMultiplier = urgency === 'express4day' ? (pricingRules.expressRushPercent / 100) : 0;
    const expressSurchargeKES = Math.round(subtotalKES * expressMultiplier);
    const expressSurchargeUSD = Math.round(subtotalUSD * expressMultiplier);

    const totalKES = Math.round(subtotalKES + locationSurchargeKES + expressSurchargeKES);
    const totalUSD = Math.round(subtotalUSD + locationSurchargeUSD + expressSurchargeUSD);

    return { totalKES, totalUSD };
  };

  const { totalKES, totalUSD } = calculateTotal();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Record into persistent context & localStorage
    const newRecord = addBooking({
      fullName: fullName.trim() || 'Gentleman Client',
      email: email.trim() || 'client@nyotaatelier.com',
      phone: phone.trim() || '+254 700 000 000',
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      fabricGrade,
      piecesCount,
      turnaroundOption: urgency,
      locationPreference: fittingLocation,
      preferredDate: preferredDate || 'Immediate Scheduling',
      preferredTime,
      estimatedPriceKES: totalKES,
      estimatedPriceUSD: totalUSD,
      notes: notes.trim(),
    });

    setConfirmedBookingId(newRecord.id);
    setBookingConfirmed(true);

    // The record above lives only in this visitor's browser. The booking only
    // reaches the atelier when WhatsApp actually opens, so track whether it did.
    setPopupBlocked(!openWhatsApp(generateWhatsAppMessage(newRecord.id)));
  };

  const generateWhatsAppMessage = (refId?: string) => {
    return `Hello Nyota. Swerve. Closet! I would like to book a bespoke tailoring appointment:
• Booking Ref: ${refId || confirmedBookingId || 'Inquiry'}
• Name: ${fullName || 'Gentleman Client'}
• Outfit: ${currentService.title} (${piecesCount} piece/set)
• Fabric Grade: ${fabricGrade.toUpperCase()}
• Measurement Date: ${preferredDate || 'To be scheduled'} at ${preferredTime}
• Location: ${fittingLocation === 'boutique' ? 'Ruiru Atelier Lounge' : 'Home/Office Mobile Concierge (Nairobi)'}
• Estimated Quote: ${currency === 'KES' ? `KES ${totalKES.toLocaleString()}` : `$${totalUSD.toLocaleString()}`}

Please confirm your earliest availability for fitting.`;
  };

  const generateWhatsAppURL = (refId?: string) =>
    buildWhatsAppUrl(generateWhatsAppMessage(refId));

  return (
    <section id="booking" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* No section header — PageHeader already titles this page. */}

        {/* Tab Switcher: Booking vs Quotation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8]">
            <button
              onClick={() => { setActiveTab('booking'); setBookingConfirmed(false); }}
              className={`px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'booking'
                  ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                  : 'text-[#524C43] hover:text-[#171412]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Private Fitting</span>
            </button>
            <button
              onClick={() => { setActiveTab('quotation'); setBookingConfirmed(false); }}
              className={`px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'quotation'
                  ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                  : 'text-[#524C43] hover:text-[#171412]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Instant Cost Estimator</span>
            </button>
          </div>
        </div>

        {/* Confirmation Screen */}
        {bookingConfirmed ? (
          <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-sm bg-[#FBF8F3] border border-[#171412]/40 shadow-[0_4px_16px_rgba(20,18,15,0.10)] text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FBF8F3]/10 border border-[#171412] flex items-center justify-center mx-auto text-[#171412]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#6E5410] block mb-1">
                {popupBlocked ? 'One Last Step Required' : 'Commission Prepared'}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#171412]">
                {popupBlocked
                  ? 'Send Your Request to Confirm'
                  : 'We Look Forward to Sculpting Your Silhouette'}
              </h3>
              <p className="text-xs tabular-figures text-[#524C43] mt-2">
                Booking Reference ID: <span className="text-[#171412] font-bold">{confirmedBookingId}</span>
              </p>
            </div>

            <div className="p-4 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm text-xs text-left space-y-2 text-[#524C43]">
              <div className="flex justify-between">
                <span>Selected Commission:</span>
                <span className="text-[#171412] font-medium">{currentService.title} ({piecesCount} item)</span>
              </div>
              <div className="flex justify-between">
                <span>Preferred Date & Time:</span>
                <span className="text-[#171412] font-medium">{preferredDate || 'Flexible Schedule'} at {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-[#171412] font-medium">{fittingLocation === 'boutique' ? 'Ruiru Atelier Lounge' : 'Mobile Concierge (Home / Office)'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#D6CBB8]">
                <span className="text-[#6E5410] font-semibold">Estimated Price:</span>
                <span className="text-[#171412] font-bold font-display text-sm">
                  {currency === 'KES' ? `KES ${totalKES.toLocaleString()}` : `$${totalUSD.toLocaleString()}`}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#524C43] leading-relaxed">
              {popupBlocked
                ? 'Your browser blocked the WhatsApp window. Your commission details are written out and ready — send them with a button below so our master tailor receives them.'
                : 'Your commission details are ready in WhatsApp. Press send there to reach our master tailor, and attach any reference images to the same chat.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={generateWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{popupBlocked ? 'Send on WhatsApp' : 'Reopen WhatsApp'}</span>
              </a>
              <a
                href={buildMailtoUrl(
                  `Fitting request ${confirmedBookingId} — ${fullName || 'New client'}`,
                  generateWhatsAppMessage(),
                )}
                className="w-full sm:w-auto px-6 py-4 rounded-sm border border-[#D6CBB8] hover:border-[#6E5410] bg-[#E4DCCE] text-[#2B2723] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                <span>Email Instead</span>
              </a>
            </div>

            <button
              onClick={() => { setBookingConfirmed(false); setPopupBlocked(false); }}
              className="text-xs text-[#524C43] hover:text-[#171412] transition-colors"
            >
              Start a new booking
            </button>
          </div>
        ) : (
          /* Main Interactive Form & Calculator Split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Form Controls */}
            <form onSubmit={handleBookingSubmit} className="lg:col-span-7 bg-[#FBF8F3] border border-[#D6CBB8] p-6 sm:p-8 rounded-sm space-y-6">
              
              {/* Active Fabric Selection Notice if routed from Fabric Library */}
              {selectedFabricPreference && (
                <div className="p-3 mb-6 rounded-sm bg-[#EDE7DC] border border-[#171412]/30 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FBF8F3] animate-pulse shrink-0" />
                    <div>
                      <span className="text-[12px] uppercase font-bold text-[#6E5410] tracking-wider block">
                        Fabric Swatch Attached
                      </span>
                      <span className="text-xs text-[#2B2723] font-semibold">
                        {selectedFabricPreference.fabricName} • {selectedFabricPreference.colorway} ({selectedFabricPreference.mill})
                      </span>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#524C43] tabular-figures">Preset</span>
                </div>
              )}

              {/* 1. Garment Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium mb-2">
                  1. Select Garment Silhouette / Offering
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-white text-xs sm:text-sm focus:border-[#171412] outline-none cursor-pointer"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} — from {currency === 'KES' ? `KES ${srv.startingPriceKES.toLocaleString()}` : `$${srv.startingPriceUSD}`} ({srv.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Fabric Grade Tier */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium mb-2">
                  2. Select Cloth Weight & Sourcing Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFabricGrade('standard')}
                    className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      fabricGrade === 'standard'
                        ? 'bg-[#E4DCCE] border-[#171412] text-[#171412]'
                        : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#2B2723] mb-0.5">Classic Super 110s Wool</div>
                    <div className="text-[12px] text-[#524C43]">Durable, structured all-year corporate drape.</div>
                    <div className="text-[12px] tabular-figures text-[#6E5410] mt-1">Included in base price</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFabricGrade('super140')}
                    className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      fabricGrade === 'super140'
                        ? 'bg-[#E4DCCE] border-[#171412] text-[#171412]'
                        : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#171412] mb-0.5">Italian Super 140s Wool (Recommended)</div>
                    <div className="text-[12px] text-[#524C43]">Silky hand-feel, rich drape, wrinkle recovery.</div>
                    <div className="text-[12px] tabular-figures text-[#6E5410] mt-1">+ KES {pricingRules.super140KES.toLocaleString()}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFabricGrade('luxuryCashmere')}
                    className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      fabricGrade === 'luxuryCashmere'
                        ? 'bg-[#E4DCCE] border-[#171412] text-[#171412]'
                        : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#2B2723] mb-0.5">Scabal / Loro Piana Cashmere & Silk</div>
                    <div className="text-[12px] text-[#524C43]">Exceptional matte sheen, ultra-soft luxury.</div>
                    <div className="text-[12px] tabular-figures text-[#6E5410] mt-1">+ KES {pricingRules.cashmereKES.toLocaleString()}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFabricGrade('linenSilk')}
                    className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      fabricGrade === 'linenSilk'
                        ? 'bg-[#E4DCCE] border-[#171412] text-[#171412]'
                        : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#2B2723] mb-0.5">Pure Irish Linen / Safari Cotton Blend</div>
                    <div className="text-[12px] text-[#524C43]">Breathable, textured weave for tropical Nairobi climates.</div>
                    <div className="text-[12px] tabular-figures text-[#6E5410] mt-1">+ KES {pricingRules.linenKES.toLocaleString()}</div>
                  </button>
                </div>
              </div>

              {/* 3. Number of Pieces & Turnaround */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium mb-2">
                    3. Number of Items / Outfits
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPiecesCount(num)}
                        className={`flex-1 py-2.5 rounded-sm border text-xs font-bold cursor-pointer transition-colors ${
                          piecesCount === num
                            ? 'bg-[#171412] text-[#FBF8F3] border-[#171412]'
                            : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                        }`}
                      >
                        {num} {num === 1 ? 'Piece' : 'Pieces'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium mb-2">
                    4. Completion Urgency
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUrgency('standard')}
                      className={`flex-1 py-2.5 rounded-sm border text-xs font-bold cursor-pointer transition-colors ${
                        urgency === 'standard'
                          ? 'bg-[#171412] text-[#FBF8F3] border-[#171412]'
                          : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                      }`}
                    >
                      Regular (7-10 Days)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('express4day')}
                      className={`flex-1 py-2.5 rounded-sm border text-xs font-bold cursor-pointer transition-colors ${
                        urgency === 'express4day'
                          ? 'bg-[#171412] text-[#FBF8F3] border-[#171412]'
                          : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                      }`}
                    >
                      ⚡ Express 4-Day
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Date & Time Selection (for Booking) */}
              {activeTab === 'booking' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium mb-2">
                      5. Preferred Fitting Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#171412] text-xs focus:border-[#171412] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium mb-2">
                      Fitting Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#171412] text-xs focus:border-[#171412] outline-none cursor-pointer"
                    >
                      <option value="09:00 AM">09:00 AM - Morning Fitting</option>
                      <option value="11:00 AM">11:00 AM - Mid-Day Fitting</option>
                      <option value="02:00 PM">02:00 PM - Afternoon Fitting</option>
                      <option value="04:30 PM">04:30 PM - Late Afternoon Fitting</option>
                      <option value="06:30 PM">06:30 PM - Evening Executive Fitting</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 6. Location Preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium mb-2">
                  {activeTab === 'booking' ? '6. Fitting Location' : '5. Fitting Preference'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFittingLocation('boutique')}
                    className={`p-3 rounded-sm border text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                      fittingLocation === 'boutique'
                        ? 'bg-[#E4DCCE] border-[#171412] text-[#171412]'
                        : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#6E5410] shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Ruiru Atelier Lounge</div>
                      <div className="text-[12px] text-[#524C43]">Kimbo, Ruiru</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFittingLocation('concierge')}
                    className={`p-3 rounded-sm border text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                      fittingLocation === 'concierge'
                        ? 'bg-[#E4DCCE] border-[#171412] text-[#171412]'
                        : 'bg-[#EDE7DC] border-[#D6CBB8] text-[#524C43] hover:border-[#BCAE97]'
                    }`}
                  >
                    <User className="w-4 h-4 text-[#6E5410] shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Mobile Concierge Tailor</div>
                      <div className="text-[12px] text-[#524C43]">We visit your home/office in Nairobi (+ KES 3,500)</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 7. Client Contact Information */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs uppercase tracking-wider text-[#524C43] font-medium">
                  {activeTab === 'booking' ? '7. Client Details' : '6. Contact for Itemized Quote'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number (+254...) *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none"
                />
                <textarea
                  rows={2}
                  placeholder="Specific posture notes, lapel preferences, wedding dates, or ceremonial requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_16px_rgba(20,18,15,0.10)] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{activeTab === 'booking' ? 'Confirm Atelier Appointment' : 'Generate & Lock Quote'}</span>
              </button>
            </form>

            {/* Right 5 Columns: Live Sartorial Receipt & Price Summary */}
            <div className="lg:col-span-5 bg-[#FBF8F3] border border-[#D6CBB8] p-6 sm:p-8 rounded-sm sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#D6CBB8] pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6E5410]" />
                  <span className="font-display text-base font-bold text-[#171412]">
                    Live Estimate Breakdown
                  </span>
                </div>
                <span className="text-[12px] uppercase tracking-wider text-[#524C43]">
                  VAT & Canvas Included
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#524C43]">
                  <span>Base Silhouette:</span>
                  <span className="text-[#171412] font-medium text-right max-w-[200px] truncate">{currentService.title}</span>
                </div>

                <div className="flex justify-between text-[#524C43]">
                  <span>Quantity:</span>
                  <span className="text-[#171412] font-medium">{piecesCount} {piecesCount === 1 ? 'garment' : 'garments'}</span>
                </div>

                <div className="flex justify-between text-[#524C43]">
                  <span>Fabric Tier:</span>
                  <span className="text-[#6E5410] font-medium">
                    {fabricGrade === 'standard' ? 'Super 110s Base' : fabricGrade === 'super140' ? 'Italian Super 140s' : fabricGrade === 'luxuryCashmere' ? 'Cashmere / Silk' : 'Irish Linen Blend'}
                  </span>
                </div>

                <div className="flex justify-between text-[#524C43]">
                  <span>Turnaround Speed:</span>
                  <span className="text-[#171412] font-medium">
                    {urgency === 'express4day' ? `⚡ 4-Day Express (+${pricingRules.expressRushPercent}%)` : 'Standard (7-10 Days)'}
                  </span>
                </div>

                <div className="flex justify-between text-[#524C43]">
                  <span>Fitting Mode:</span>
                  <span className="text-[#171412] font-medium">
                    {fittingLocation === 'boutique' ? 'Ruiru Lounge (Free)' : 'Concierge Nairobi (+3,500 KES)'}
                  </span>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="pt-4 border-t border-[#D6CBB8]">
                <span className="text-[12px] uppercase tracking-widest text-[#524C43] block mb-1">
                  Total Estimated Investment
                </span>
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#171412]">
                    {currency === 'KES' ? `KES ${totalKES.toLocaleString()}` : `$${totalUSD.toLocaleString()}`}
                  </div>
                  <span className="text-[12px] tabular-figures text-[#524C43]">
                    {currency === 'KES' ? `≈ $${totalUSD} USD` : `≈ KES ${totalKES.toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Quality Checklist */}
              <div className="p-4 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] space-y-2 text-[12px] text-[#524C43]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6E5410]" />
                  <span>30+ Individual anatomical measurement points</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6E5410]" />
                  <span>Floating horsehair canvas internal architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6E5410]" />
                  <span>Complimentary intermediate baste fitting included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6E5410]" />
                  <span>100% Lifetime fit guarantee on seams</span>
                </div>
              </div>

              {/* Direct WhatsApp Concierge Link */}
              <div className="pt-2">
                <a
                  href={generateWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-sm border border-[#D6CBB8] hover:border-[#6E5410] bg-[#FBF8F3] hover:bg-[#E4DCCE] text-[#2B2723] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#6E5410]" />
                  <span>Discuss Commission via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
