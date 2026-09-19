import React, { useState } from 'react';
import { useTailoring } from '../context/TailoringContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { brand } = useTailoring();
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    "Hello Nyota. Swerve. Closet, I'd like to book an appointment for a bespoke suit.",
    "Hi! I'm planning my wedding and need a groom & groomsmen quotation.",
    "Hello, do you offer urgent 4-day turnaround for a corporate event?",
    "Hi, I want to bring garments for precision alterations."
  ];

  const handleOpenWhatsApp = (text?: string) => {
    const defaultMsg = "Hello Nyota. Swerve. Closet, I would like to consult with a master tailor.";
    const message = text || defaultMsg;
    const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Inquiry Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-sm bg-[#FBF8F3] border border-[#BCAE97] shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-5 text-white animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#D6CBB8] mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-xs font-bold text-white flex items-center gap-1.5">
                  Nyota. Swerve. Closet Concierge
                  <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
                </h4>
                <span className="text-[12px] text-[#524C43]">Typically replies in 5 minutes</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-sm text-[#524C43] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#524C43] leading-relaxed mb-4 font-light">
            Welcome to Nyota. Swerve. Closet. Speak directly with our master cutting team in Kimbo, Ruiru. Select a quick inquiry:
          </p>

          <div className="space-y-2 mb-4">
            {quickMessages.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => handleOpenWhatsApp(msg)}
                className="w-full text-left p-2.5 rounded-sm bg-[#EDE7DC] hover:bg-[#E4DCCE] border border-[#D6CBB8] hover:border-[#BCAE97] text-xs text-[#2B2723] hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="line-clamp-1">{msg}</span>
                <Send className="w-3 h-3 text-[#6E5410] shrink-0 opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <button
            onClick={() => handleOpenWhatsApp()}
            className="w-full py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open Direct WhatsApp Chat</span>
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#FBF8F3] hover:bg-[#E4DCCE] border border-[#BCAE97] text-white shadow-[0_0_25px_rgba(0,0,0,0.7)] hover:border-[#6E5410] transition-all duration-300 cursor-pointer"
        aria-label="Contact via WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-[#25D366]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border border-[#171412] animate-ping" />
        </div>
        <span className="hidden sm:inline-block font-semibold text-xs uppercase tracking-wider pr-1 text-[#2B2723]">
          WhatsApp Master Tailor
        </span>
      </button>

    </div>
  );
};
