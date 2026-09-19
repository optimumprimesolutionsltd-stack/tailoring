import React, { useState } from 'react';
import { BRAND_INFO } from '../data/tailoringData';
import { buildMailtoUrl, buildWhatsAppUrl, compose, openWhatsApp } from '../utils/enquiry';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Mail
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  const enquiryText = () =>
    compose([
      `Hello ${BRAND_INFO.name} — a direct enquiry from your website:`,
      '',
      `• Name: ${senderName}`,
      `• Phone / WhatsApp: ${senderPhone}`,
      senderEmail && `• Email: ${senderEmail}`,
      '',
      'Enquiry:',
      senderMessage,
    ]);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend: the enquiry only reaches the atelier once WhatsApp opens.
    const opened = openWhatsApp(enquiryText());
    setPopupBlocked(!opened);
    setFormSent(true);
  };

  const resetForm = () => {
    setFormSent(false);
    setPopupBlocked(false);
    setSenderName('');
    setSenderPhone('');
    setSenderEmail('');
    setSenderMessage('');
  };

  return (
    <section id="contact" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* No section header — PageHeader already titles this page. */}

        {/* 2-Column Contact Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#BCAE97] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] flex items-center justify-center text-[#6E5410] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#171412] mb-1">
                    Physical Boutique Location
                  </h3>
                  <p className="text-xs sm:text-sm text-[#524C43] leading-relaxed font-light">
                    {BRAND_INFO.location}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <a
                      href={BRAND_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#6E5410] hover:underline font-semibold inline-flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View Atelier on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-[12px] text-[#524C43] mt-1.5 block">
                    Secure private parking & elevator access available
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Lines Card */}
            <div className="p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#BCAE97] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] flex items-center justify-center text-[#6E5410] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#171412] mb-0.5">
                      Nyota. Swerve. Closet
                    </h3>
                    <span className="text-[12px] text-[#6E5410] font-medium block">Direct Atelier Concierge</span>
                  </div>

                  <div>
                    <span className="text-[12px] text-[#524C43] uppercase block">Contact / Telephone:</span>
                    <a href={`tel:${BRAND_INFO.phone}`} className="text-base text-[#171412] hover:text-[#6E5410] font-semibold transition-colors">
                      {BRAND_INFO.phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-[12px] text-[#524C43] uppercase block">WhatsApp:</span>
                    <a 
                      href={`https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent("Hello Nyota. Swerve. Closet, I would like to inquire about bespoke tailoring.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#6E5410] hover:underline font-medium transition-colors"
                    >
                      +254 795 216 012 (Chat Directly)
                    </a>
                  </div>

                  <div>
                    <span className="text-[12px] text-[#524C43] uppercase block">E-mail:</span>
                    <a href={`mailto:${BRAND_INFO.email}`} className="text-sm text-[#171412] hover:text-[#6E5410] font-medium transition-colors">
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#BCAE97] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] flex items-center justify-center text-[#6E5410] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-[#171412] mb-1">
                    Boutique & Fitting Hours
                  </h3>
                  <p className="text-xs text-[#524C43]">{BRAND_INFO.hours.weekdays}</p>
                  <p className="text-xs text-[#524C43]">{BRAND_INFO.hours.saturday}</p>
                  <p className="text-xs text-[#2B2723] font-medium">{BRAND_INFO.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8]">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#171412] mb-3">
                Official Social Channels
              </h3>
              <div className="space-y-2.5">
                <a
                  href={BRAND_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-sm bg-[#EDE7DC] hover:bg-[#E4DCCE] text-[#2B2723] text-xs font-semibold flex items-center justify-between border border-[#D6CBB8] hover:border-[#6E5410] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#6E5410] font-bold uppercase text-[12px]">Instagram:</span>
                    <span className="text-[#2B2723] group-hover:text-[#6E5410]">Nyota. Swerve. Closet</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#524C43] group-hover:text-[#6E5410]" />
                </a>

                <a
                  href={BRAND_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-sm bg-[#EDE7DC] hover:bg-[#E4DCCE] text-[#2B2723] text-xs font-semibold flex items-center justify-between border border-[#D6CBB8] hover:border-[#6E5410] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#6E5410] font-bold uppercase text-[12px]">Facebook:</span>
                    <span className="text-[#2B2723] group-hover:text-[#6E5410]">Nyota. Swerve. Closet</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#524C43] group-hover:text-[#6E5410]" />
                </a>

                <a
                  href={BRAND_INFO.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-sm bg-[#EDE7DC] hover:bg-[#E4DCCE] text-[#2B2723] text-xs font-semibold flex items-center justify-between border border-[#D6CBB8] hover:border-[#6E5410] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#6E5410] font-bold uppercase text-[12px]">TikTok:</span>
                    <span className="text-[#2B2723] group-hover:text-[#6E5410]">Nyota. Swerve. Closet</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#524C43] group-hover:text-[#6E5410]" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Frame & Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Maps Integration Frame */}
            <div className="rounded-sm overflow-hidden border border-[#D6CBB8] bg-[#FBF8F3] shadow-xl relative h-72 sm:h-80">
              <iframe
                title="Nyota. Swerve. Closet Nairobi Location"
                src="https://www.google.com/maps?q=Kimbo,+Ruiru,+Kiambu+County,+Kenya&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Location Pin Card */}
              <div className="absolute top-4 left-4 p-3 rounded-sm bg-[#EDE7DC]/90 backdrop-blur-md border border-[#BCAE97] text-xs shadow-xl pointer-events-none">
                <div className="flex items-center gap-2 text-[#2B2723] font-bold">
                  <MapPin className="w-4 h-4 text-[#6E5410]" />
                  <span>Nyota. Swerve. Closet Atelier</span>
                </div>
                <p className="text-[12px] text-[#524C43] mt-0.5">Kimbo, Ruiru</p>
              </div>

              {/* Get Directions Link */}
              <a
                href={BRAND_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-3.5 py-2 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-[12px] uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Direct Inquiry Form */}
            <div className="p-6 sm:p-8 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8]">
              <h3 className="font-display text-lg font-bold text-[#171412] mb-1">
                Send a Direct Inquiry to the Atelier
              </h3>
              <p className="text-xs text-[#524C43] mb-4 font-light">
                Have questions regarding wedding timelines, group appointments, or cloth availability? Write directly to our concierge.
              </p>

              {formSent ? (
                <div className="p-6 rounded-sm bg-[#E4DCCE] border border-[#6E5410] space-y-3">
                  <div className="text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-[#6E5410] mx-auto" />
                    <h4 className="text-sm font-bold text-[#171412]">
                      {popupBlocked ? 'One Last Step' : 'WhatsApp Opened'}
                    </h4>
                    <p className="text-xs text-[#524C43] leading-relaxed">
                      {popupBlocked
                        ? 'Your browser blocked the WhatsApp window. Use a button below to send your enquiry — it is already written out for you.'
                        : 'Your enquiry is ready in WhatsApp. Press send there and our concierge replies within 2 hours during atelier hours.'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <a
                      href={buildWhatsAppUrl(enquiryText())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-[12px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{popupBlocked ? 'Send on WhatsApp' : 'Reopen WhatsApp'}</span>
                    </a>
                    <a
                      href={buildMailtoUrl(
                        `Website enquiry — ${senderName || 'New client'}`,
                        enquiryText(),
                      )}
                      className="flex-1 py-2.5 px-3 rounded-sm border border-[#BCAE97] hover:border-[#6E5410] text-[#524C43] hover:text-[#171412] text-[12px] font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Instead</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full text-[12px] text-[#524C43] hover:text-[#171412] transition-colors pt-1"
                  >
                    Write another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-white text-xs focus:border-[#6E5410] outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone or WhatsApp *"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-white text-xs focus:border-[#6E5410] outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-white text-xs focus:border-[#6E5410] outline-none"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Your inquiry details..."
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-white text-xs focus:border-[#6E5410] outline-none resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(122,93,18,0.16)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Atelier</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
