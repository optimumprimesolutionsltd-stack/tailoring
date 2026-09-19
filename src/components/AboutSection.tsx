import React from 'react';
import { 
  Scissors, 
  Check, 
} from 'lucide-react';

export const AboutSection: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D6CBB8] bg-[#FBF8F3] text-[#6E5410] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBF8F3]" />
            Fabric & Structural Heritage
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171412] mb-4">
            Redefining African Sartorial Distinction
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-[#524C43] text-base sm:text-lg leading-relaxed font-light">
            Founded in Nairobi, <strong className="text-[#171412] font-medium">Nyota. Swerve. Closet</strong> merges Savile Row architectural tailoring with Italian softness and African prestige.
          </p>
        </div>

        {/* 2-Column Story & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Visual Showcase focusing closely on fabric and garment details */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-sm overflow-hidden border border-[#D6CBB8] shadow-2xl group bg-[#FBF8F3]">
              <img
                src="/clients/tailor-at-machine.jpg"
                alt="Master Cutter inspecting fabric grain at Nyota Swerve"
                className="w-full h-[450px] sm:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14120F]/45 via-transparent to-transparent opacity-90" />
              
              {/* Floating Quality Callout Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-sm bg-[#FBF8F3]/95 backdrop-blur-md border border-[#D6CBB8] shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[12px] tracking-[0.2em] uppercase text-[#6E5410] font-bold block">
                      Textile Engineering
                    </span>
                    <p className="text-sm font-semibold text-[#171412]">
                      Anatomically Drafted for Tropical Airflow & Natural Shoulder Drapes
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-[#E4DCCE] border border-[#D6CBB8] flex items-center justify-center shrink-0">
                    <Scissors className="w-5 h-5 text-[#6E5410]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative background accent box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-sm border border-[#D6CBB8] -z-0 hidden sm:block pointer-events-none" />
          </div>

          {/* Narrative & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8]">
              <h3 className="font-display text-xl font-bold text-[#171412] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                Our Foundational Mission
              </h3>
              <p className="text-sm sm:text-base text-[#524C43] leading-relaxed">
                To redefine men's fashion across Africa by engineering world-class, bespoke tailored garments that blend British structural discipline, Italian softness (sprezzatura), and authentic African prestige—delivered with unparalleled customer care.
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#524C43] leading-relaxed font-light">
              We reject the one-size-fits-all fallacy of mass-manufactured suits. Every client’s skeletal geometry, shoulder slope, and natural posture are unique. When you step into Nyota. Swerve. Closet, your pattern is drafted from scratch by master cutters with decades of collective sartorial mastery.
            </p>

            {/* Three Pillars List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#6E5410]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2B2723]">Bespoke Anatomical Drafting</h4>
                  <p className="text-xs text-[#524C43]">Each suit begins with 30+ body coordinates and a hand-cut paper pattern preserved in our archives for your future orders.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#6E5410]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2B2723]">Natural Floating Horsehair Canvas</h4>
                  <p className="text-xs text-[#524C43]">We avoid cheap heat-glued interlinings. Our floating chest pieces mold gracefully to your body heat over time.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#6E5410]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2B2723]">Kenya’s Fastest Luxury Turnaround (4 Days)</h4>
                  <p className="text-xs text-[#524C43]">Proprietary workshop coordination enables us to deliver ready-to-wear perfection in 4 business days when time is of the essence.</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2 shadow-[0_4px_16px_rgba(20,18,15,0.10)]"
              >
                <span>Experience the Nyota Standard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8]">
          <div className="text-center p-2 border-r border-[#D6CBB8] last:border-none">
            <span className="font-display text-2xl sm:text-4xl font-bold text-[#171412] block">
              1,500+
            </span>
            <span className="text-xs sm:text-sm text-[#524C43] mt-1 block">Bespoke Suits Handcrafted</span>
          </div>
          <div className="text-center p-2 md:border-r border-[#D6CBB8] last:border-none">
            <span className="font-display text-2xl sm:text-4xl font-bold text-[#171412] block">
              4 Days
            </span>
            <span className="text-xs sm:text-sm text-[#524C43] mt-1 block">Typical Turnaround Time</span>
          </div>
          <div className="text-center p-2 border-r border-[#D6CBB8] last:border-none">
            <span className="font-display text-2xl sm:text-4xl font-bold text-[#171412] block">
              2,000+
            </span>
            <span className="text-xs sm:text-sm text-[#524C43] mt-1 block">International Fine Cloths</span>
          </div>
          <div className="text-center p-2">
            <span className="font-display text-2xl sm:text-4xl font-bold text-[#171412] block">
              100%
            </span>
            <span className="text-xs sm:text-sm text-[#524C43] mt-1 block">Perfect Fit Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
};
