import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/tailoringData';
import { Testimonial } from '../types';
import { buildMailtoUrl, buildWhatsAppUrl, compose, openWhatsApp } from '../utils/enquiry';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Plus, 
  X, 
  Send 
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newSuitType, setNewSuitType] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const reviewText = () =>
    compose([
      'Hello Nyota. Swerve. Closet — I would like to submit a review for your website:',
      '',
      `• Name: ${newName}`,
      newRole && `• Role: ${newRole}`,
      newSuitType && `• Garment: ${newSuitType}`,
      '',
      'Review:',
      newQuote,
    ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newQuote) return;

    const newTestimonial: Testimonial = {
      id: `custom-${Date.now()}`,
      clientName: newName,
      role: newRole || 'Bespoke Client',
      suitType: newSuitType || 'Custom 3-Piece Suit',
      rating: 5,
      date: 'Just now',
      quote: newQuote,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      location: 'Nairobi, Kenya',
    };

    // Shown immediately as a preview to the author. It is not persisted and no
    // other visitor sees it — the review only reaches the atelier via WhatsApp,
    // where it is read and published manually.
    setTestimonials([newTestimonial, ...testimonials]);
    setPopupBlocked(!openWhatsApp(reviewText()));
    setSubmitted(true);
  };

  const closeModal = () => {
    setSubmitted(false);
    setPopupBlocked(false);
    setIsModalOpen(false);
    setNewName('');
    setNewRole('');
    setNewSuitType('');
    setNewQuote('');
  };

  return (
    <section id="testimonials" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D6CBB8] bg-[#FBF8F3] text-[#6E5410] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Quote className="w-3.5 h-3.5 text-[#6E5410]" />
            Client Testimonials
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171412] mb-4">
            Client Perspectives on Fit & Craft
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-[#524C43] text-base sm:text-lg font-light">
            Real experiences from leaders, grooms, and sartorial connoisseurs who commission Nyota Swerve.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#6E5410] transition-all duration-300 flex flex-col justify-between shadow-lg relative group"
            >
              <div>
                {/* Header with photo & client details */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.clientName}
                      className="w-14 h-14 rounded-sm object-cover border border-[#D6CBB8] group-hover:border-[#6E5410] transition-colors"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-bold text-[#171412]">
                          {t.clientName}
                        </h3>
                        <span title="Verified Bespoke Client">
                          <CheckCircle2 className="w-4 h-4 text-[#6E5410]" />
                        </span>
                      </div>
                      <p className="text-xs text-[#524C43]">{t.role}</p>
                      <span className="text-[12px] text-[#6B6459]">{t.location}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-[#6E5410]">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                {/* Quote body */}
                <p className="text-base sm:text-lg text-[#2B2723] italic leading-relaxed mb-6 font-editorial">
                  "{t.quote}"
                </p>
              </div>

              {/* Commissioned Outfit Info Tag */}
              <div className="pt-4 border-t border-[#D6CBB8] flex items-center justify-between text-xs">
                <span className="text-[#524C43] text-[12px] uppercase tracking-wider font-semibold">
                  Commission: <strong className="text-[#2B2723] font-medium">{t.suitType}</strong>
                </span>
                <span className="text-[#6B6459] text-[12px]">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Trigger */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-sm border border-[#D6CBB8] hover:border-[#6E5410] bg-[#FBF8F3] hover:bg-[#E4DCCE] text-[#2B2723] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#6E5410]" />
            <span>Submit Your Bespoke Experience</span>
          </button>
        </div>

      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171412]/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FBF8F3] rounded-sm border border-[#D6CBB8] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-[#524C43] hover:text-[#171412] rounded-sm bg-[#E4DCCE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-[#171412] mb-1">
              Share Your Nyota Experience
            </h3>
            <p className="text-xs text-[#524C43] mb-6">
              Your feedback guides our master cutters and fellow gentlemen.
            </p>

            {submitted ? (
              <div className="p-8 space-y-4">
                <div className="text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#6E5410] mx-auto" />
                  <h4 className="text-lg font-bold text-[#171412]">Thank You, Gentleman</h4>
                  <p className="text-xs text-[#524C43] leading-relaxed">
                    {popupBlocked
                      ? 'Your browser blocked the WhatsApp window. Send your review with a button below and we will add it to our wall once verified.'
                      : 'Press send in WhatsApp to submit your review. We add it to our wall once our team has verified the commission.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={buildWhatsAppUrl(reviewText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-[12px] uppercase tracking-widest transition-colors flex items-center justify-center"
                  >
                    {popupBlocked ? 'Send on WhatsApp' : 'Reopen WhatsApp'}
                  </a>
                  <a
                    href={buildMailtoUrl(`Client review — ${newName || 'New client'}`, reviewText())}
                    className="flex-1 py-2.5 px-3 rounded-sm border border-[#D6CBB8] hover:border-[#6E5410] text-[#524C43] hover:text-[#171412] text-[12px] font-semibold uppercase tracking-widest transition-colors flex items-center justify-center"
                  >
                    Email Instead
                  </a>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full text-[12px] text-[#524C43] hover:text-[#171412] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#524C43] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Dennis Omari"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#524C43] mb-1">
                      Profession / Role
                    </label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Managing Director"
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#524C43] mb-1">
                      Garment Commissioned
                    </label>
                    <input
                      type="text"
                      value={newSuitType}
                      onChange={(e) => setNewSuitType(e.target.value)}
                      placeholder="e.g. Super 140s Charcoal Tuxedo"
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#524C43] mb-1">
                    Your Sartorial Review *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    placeholder="Describe the fit, turnaround speed, and how the garment felt during your event..."
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-[#2B2723] text-xs focus:border-[#171412] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(20,18,15,0.10)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
