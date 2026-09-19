import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/tailoringData';
import { 
  CalendarCheck, 
  Compass, 
  Layers, 
  Receipt, 
  Ruler, 
  Scissors, 
  Sparkles, 
  CheckCircle, 
  PackageCheck, 
  ArrowRight 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  CalendarCheck: <CalendarCheck className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Receipt: <Receipt className="w-5 h-5" />,
  Ruler: <Ruler className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  PackageCheck: <PackageCheck className="w-5 h-5" />,
};

export const ProcessTimeline: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="process" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* No section header — PageHeader already titles this page. The
            turnaround banner is kept: it is a selling point, not a heading. */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FBF8F3] border border-[#D6CBB8] text-[#2B2723]">
            <span className="w-2 h-2 rounded-full bg-[#FBF8F3] animate-ping" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              Typical Turnaround: <strong className="text-[#171412]">4 Business Days</strong> (Express Service Available)
            </span>
          </div>
        </div>

        {/* 9-Step Interactive Grid / Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROCESS_STEPS.map((step) => {
            const isSelected = activeStep === step.stepNumber;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStep(step.stepNumber)}
                className={`p-6 rounded-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FBF8F3] border-[#171412] shadow-[0_4px_16px_rgba(20,18,15,0.10)]'
                    : 'bg-[#FBF8F3]/60 border-[#D6CBB8] hover:border-[#6E5410] hover:bg-[#FBF8F3]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-bold text-[#6B6459]">
                      0{step.stepNumber}
                    </span>
                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-[#171412] text-[#FBF8F3]' 
                        : 'bg-[#EDE7DC] text-[#524C43] border border-[#D6CBB8]'
                    }`}>
                      {iconMap[step.iconName] || <Scissors className="w-5 h-5" />}
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#171412] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#524C43] leading-relaxed mb-4">
                    {isSelected ? step.fullDesc : step.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D6CBB8] flex items-center justify-between text-xs">
                  <span className={`font-medium tracking-wider text-[12px] uppercase ${isSelected ? 'text-[#171412]' : 'text-[#524C43]'}`}>
                    {step.keyHighlight}
                  </span>
                  <span className="text-[#6B6459] text-[12px]">
                    {isSelected ? 'Active Step' : 'Click to inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Step Preview Summary Box */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] flex flex-col lg:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-2xl">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6E5410]">
              <span>Step 0{activeStep} Protocol</span>
              <span>•</span>
              <span>Sartorial Standard</span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#171412]">
              {PROCESS_STEPS[activeStep - 1]?.title}
            </h4>
            <p className="text-sm text-[#524C43] max-w-2xl leading-relaxed">
              {PROCESS_STEPS[activeStep - 1]?.fullDesc}
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-7 py-3.5 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(20,18,15,0.10)]"
          >
            <span>Start Step 1: Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
