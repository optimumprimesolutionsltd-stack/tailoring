import React from 'react';
import { WHY_CHOOSE_US } from '../data/tailoringData';
import { 
  ShieldCheck, 
  Award, 
  Crosshair, 
  Flame, 
  Clock, 
  Coins, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Crosshair: <Crosshair className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Coins: <Coins className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D6CBB8] bg-[#FBF8F3] text-[#6E5410] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#6E5410]" />
            The Nyota Distinction
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171412] mb-4">
            Why Discerning Clients Choose Us
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-[#524C43] text-base sm:text-lg font-light">
            We engineer bespoke armor for executives, wedding parties, diplomats, and innovators across Africa.
          </p>
        </div>

        {/* 7 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={item.id}
              className={`p-7 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#6E5410] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${
                idx === 6 ? 'md:col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] flex items-center justify-center text-[#6E5410] mb-5 group-hover:bg-[#FBF8F3] group-hover:text-[#FBF8F3] transition-colors">
                {iconMap[item.icon] || <ShieldCheck className="w-5 h-5" />}
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-[#171412] mb-2 group-hover:text-[#6E5410] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#524C43] leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
