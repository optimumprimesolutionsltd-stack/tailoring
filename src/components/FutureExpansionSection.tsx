import React, { useState } from 'react';
import { FUTURE_EXPANSION_ITEMS } from '../data/tailoringData';
import { FutureExpansionItem } from '../types';
import { buildMailtoUrl, buildWhatsAppUrl, compose } from '../utils/enquiry';
import { 
  Compass, 
  ShoppingBag, 
  CreditCard, 
  Scan, 
  Video, 
  GraduationCap, 
  Globe, 
  Briefcase, 
  ArrowRight, 
  X, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  Scan: <Scan className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
};

export const FutureExpansionSection: React.FC = () => {
  const [selectedExpansion, setSelectedExpansion] = useState<FutureExpansionItem | null>(null);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const inquiryText = () =>
    compose([
      `Hello Nyota. Swerve. Closet — I would like to register interest in an upcoming capability:`,
      '',
      `• Capability: ${selectedExpansion?.title ?? 'Future roadmap'}`,
      selectedExpansion?.status && `• Status: ${selectedExpansion.status}`,
      `• Name: ${partnerName || '—'}`,
      `• Email: ${partnerEmail}`,
      '',
      'Please send beta access details or partnership documentation.',
    ]);

  const inquirySubject = () =>
    `Beta / partnership interest — ${selectedExpansion?.title ?? 'Roadmap'}`;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerEmail) return;
    // No backend. Unlike the WhatsApp forms this does not auto-navigate: sending
    // the browser to a mailto: would pull the visitor out of the page into a mail
    // client uninvited, so the enquiry is presented ready to send instead.
    setInquirySuccess(true);
  };

  const resetInquiry = () => {
    setInquirySuccess(false);
    setSelectedExpansion(null);
    setPartnerEmail('');
    setPartnerName('');
  };

  return (
    <section id="expansion" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BCAE97] bg-[#FBF8F3] text-[#524C43] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-[#6E5410]" />
            Strategic Horizons
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171412] mb-4">
            Future Expansion Roadmap
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-[#524C43] text-base sm:text-lg font-light">
            Building digital and physical capabilities for Pan-African bespoke tailoring: from M-Pesa STK checkouts to 3D body scans and regional atelier hubs.
          </p>
        </div>

        {/* Expansion Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FUTURE_EXPANSION_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#BCAE97] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] flex items-center justify-center text-[#6E5410] group-hover:bg-[#D4AF37] group-hover:text-[#FBF8F3] transition-colors">
                    {iconMap[item.icon] || <Sparkles className="w-5 h-5" />}
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#6E5410]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#171412] mb-2 group-hover:text-[#6E5410] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#524C43] leading-relaxed mb-4 font-light">
                  {item.description}
                </p>

                {/* Key features */}
                <ul className="space-y-1.5 border-t border-[#D6CBB8] pt-3 mb-4">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="text-[12px] text-[#2B2723] flex items-center gap-2 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#D6CBB8] flex items-center justify-between">
                <span className="text-[12px] text-[#524C43] uppercase tracking-wider font-medium">
                  Status: {item.status}
                </span>
                <button
                  onClick={() => setSelectedExpansion(item)}
                  className="text-xs font-semibold text-[#6E5410] hover:text-[#171412] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Register Interest</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Note */}
        <div className="p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] max-w-3xl mx-auto text-center text-xs text-[#524C43]">
          <span className="text-[#6E5410] font-semibold block mb-1">
            Enterprise Architecture Readiness
          </span>
          Decoupled API endpoints for headless e-commerce, Safaricom Daraja M-Pesa STK push, WebGL 3D body measurements, and enterprise bulk contracts.
        </div>

      </div>

      {/* Early Access / Partnership Registration Modal */}
      {selectedExpansion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171412]/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#FBF8F3] rounded-sm border border-[#BCAE97] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={resetInquiry}
              className="absolute top-4 right-4 p-2 text-[#524C43] hover:text-[#171412] rounded-sm bg-[#E4DCCE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[12px] font-bold uppercase tracking-widest text-[#6E5410] block mb-1">
              {selectedExpansion.badge}
            </span>
            <h3 className="font-display text-xl font-bold text-[#171412] mb-2">
              {selectedExpansion.title}
            </h3>
            <p className="text-xs text-[#524C43] leading-relaxed mb-6 font-light">
              Be among the first to access this capability upon deployment or initiate partnership discussions with our Nairobi executive directors.
            </p>

            {inquirySuccess ? (
              <div className="py-6 space-y-4">
                <div className="text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#6E5410] mx-auto" />
                  <h4 className="text-base font-bold text-[#171412]">Your Enquiry Is Ready</h4>
                  <p className="text-xs text-[#524C43] leading-relaxed">
                    Choose how to send it. We reply with beta access and partnership documentation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={buildMailtoUrl(inquirySubject(), inquiryText())}
                    className="flex-1 py-2.5 px-3 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-[12px] uppercase tracking-widest transition-colors flex items-center justify-center"
                  >
                    Send by Email
                  </a>
                  <a
                    href={buildWhatsAppUrl(inquiryText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-sm border border-[#BCAE97] hover:border-[#6E5410] text-[#524C43] hover:text-[#171412] text-[12px] font-semibold uppercase tracking-widest transition-colors flex items-center justify-center"
                  >
                    WhatsApp Instead
                  </a>
                </div>

                <button
                  type="button"
                  onClick={resetInquiry}
                  className="w-full text-[12px] text-[#524C43] hover:text-[#171412] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2B2723] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="e.g. Victor Mwangi"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#171412] text-xs focus:border-[#6E5410] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2723] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="victor@example.com"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#171412] text-xs focus:border-[#6E5410] outline-none"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-xs uppercase tracking-widest cursor-pointer shadow-[0_4px_16px_rgba(122,93,18,0.16)]"
                  >
                    Join Priority Waitlist
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
