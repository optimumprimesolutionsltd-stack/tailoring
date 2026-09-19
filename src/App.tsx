/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { applyPageMeta, legacyHashToPage, pageToPath, pathToPage } from './routes';
import { Navbar } from './components/Navbar';
import { PageHeader } from './components/PageHeader';
import { Hero } from './components/Hero';
import { SectionDirectory } from './components/SectionDirectory';
import { AboutSection } from './components/AboutSection';
import { OfferingsSection } from './components/OfferingsSection';
import { FabricSwatchLibrary } from './components/FabricSwatchLibrary';
import { ProcessTimeline } from './components/ProcessTimeline';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PortfolioSection } from './components/PortfolioSection';
// Hidden until real client reviews exist — see the note beside its usage below.
// import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingQuotationSection } from './components/BookingQuotationSection';
import { StyleJournalSection } from './components/StyleJournalSection';
import { FutureExpansionSection } from './components/FutureExpansionSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(
    () => pathToPage(window.location.pathname) ?? 'home',
  );
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [targetServiceForBooking, setTargetServiceForBooking] = useState<string>('bespoke-suits');
  const [selectedFabric, setSelectedFabric] = useState<{ fabricName: string; colorway: string; mill: string } | null>(null);

  // Keep React state, the address bar and the document head in step.
  useEffect(() => {
    // Old shared links still carry `#booking`; translate once, then clean up.
    const legacy = legacyHashToPage(window.location.hash);
    if (legacy) {
      setCurrentPage(legacy);
      window.history.replaceState({}, '', pageToPath(legacy));
    }

    const onPopState = () => {
      setCurrentPage(pathToPage(window.location.pathname) ?? 'home');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Title, description and canonical follow the route, so each page is
  // indexable in its own right rather than sharing the home page's metadata.
  useEffect(() => {
    applyPageMeta(currentPage);
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    if (window.location.pathname !== pageToPath(page)) {
      window.history.pushState({}, '', pageToPath(page));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCurrency = () => {
    setCurrency(prev => (prev === 'KES' ? 'USD' : 'KES'));
  };

  const handleNavigateToBooking = (serviceId?: string) => {
    if (serviceId) {
      setTargetServiceForBooking(serviceId);
    }
    navigateTo('booking');
  };

  const handleFabricSelectedForBooking = (fabricInfo: { fabricName: string; colorway: string; mill: string }) => {
    setSelectedFabric(fabricInfo);
    handleNavigateToBooking('bespoke-suits');
  };

  return (
    <div className="min-h-screen bg-[#EDE7DC] text-[#2B2723] relative selection:bg-[#FBF8F3] selection:text-[#171412] flex flex-col justify-between">
      
      {/* Fixed Luxury Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        currency={currency} 
        onToggleCurrency={handleToggleCurrency} 
      />

      {/* Main Multi-Page Container with Motion Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* ================= PAGE 1: HOME ================= */}
          {currentPage === 'home' && (
            <motion.div
              key="page-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section with Pure Typographic Brand Identity */}
              <Hero 
                onNavigate={navigateTo}
                onOpenBooking={() => handleNavigateToBooking()} 
                onOpenQuotation={() => handleNavigateToBooking()} 
              />

              {/* Dedicated Department Directory - Explore each section as a separate page */}
              <SectionDirectory onNavigate={navigateTo} />

              {/* Heritage & Mission About Section */}
              <AboutSection 
                onOpenBooking={() => handleNavigateToBooking()} 
              />

              {/* Core Sartorial Pillars */}
              <WhyChooseUs />

              {/* Real client commissions — the portfolio that replaces the
                  fabricated testimonials. */}
              <PortfolioSection onOpenBooking={() => handleNavigateToBooking()} />

              {/* Client Testimonials — hidden until real reviews exist.
                  TESTIMONIALS in src/data/tailoringData.ts is invented sample
                  content shown with "Verified Bespoke Client" badges, so it must
                  not be published as genuine. Replace that array with real,
                  consented reviews, then uncomment this and the copy on the
                  Craft & Process page. */}
              {/* <TestimonialsSection /> */}
            </motion.div>
          )}

          {/* ================= PAGE 2: OFFERINGS ================= */}
          {currentPage === 'offerings' && (
            <motion.div
              key="page-offerings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PageHeader
                title="Bespoke Garments & Repertoire"
                subtitle="From sculpted two-piece executive suits to velvet black-tie dinner jackets, explore our anatomical garments hand-tailored in Nairobi."
                pageId="offerings"
                departmentNumber="Department 01"
                onNavigate={navigateTo}
                actionButton={{
                  label: "Book Garment Fitting",
                  onClick: () => handleNavigateToBooking(),
                }}
              />
              <OfferingsSection 
                currency={currency} 
                onSelectService={(serviceId) => handleNavigateToBooking(serviceId)} 
              />
            </motion.div>
          )}

          {/* ================= PAGE 3: FABRIC LIBRARY ================= */}
          {currentPage === 'fabrics' && (
            <motion.div
              key="page-fabrics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PageHeader
                title="European Fabric Swatch Library"
                subtitle="Browse mill authenticity certifications from Scabal, Loro Piana, Dormeuil, and Holland & Sherry with our interactive drape visualizer."
                pageId="fabrics"
                departmentNumber="Department 02"
                onNavigate={navigateTo}
                actionButton={{
                  label: "Request Fabric Samples",
                  onClick: () => handleNavigateToBooking(),
                }}
              />
              <FabricSwatchLibrary 
                onSelectForBooking={handleFabricSelectedForBooking}
              />
            </motion.div>
          )}

          {/* ================= PAGE 4: CRAFT & PROCESS ================= */}
          {currentPage === 'process' && (
            <motion.div
              key="page-process"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PageHeader
                title="The 6-Step Bespoke Journey"
                subtitle="From the 38 anatomical posture measurements to the baste fitting and hand-finishing, discover how every Nyota garment is sculpted."
                pageId="process"
                departmentNumber="Department 03"
                onNavigate={navigateTo}
                actionButton={{
                  label: "Schedule Consultation",
                  onClick: () => handleNavigateToBooking(),
                }}
              />
              <ProcessTimeline 
                onOpenBooking={() => handleNavigateToBooking()} 
              />
              <WhyChooseUs />
              <PortfolioSection onOpenBooking={() => handleNavigateToBooking()} />
              {/* Hidden until real reviews exist — see the note on the home page. */}
              {/* <TestimonialsSection /> */}
            </motion.div>
          )}

          {/* ================= PAGE 5: STYLE JOURNAL ================= */}
          {currentPage === 'journal' && (
            <motion.div
              key="page-journal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PageHeader
                title="Sartorial Style Journal"
                subtitle="Authoritative editorial guidance on Nairobi climate dressing, black-tie etiquette, wedding color palettes, and garment preservation."
                pageId="journal"
                departmentNumber="Department 04"
                onNavigate={navigateTo}
                actionButton={{
                  label: "Consult Master Stylist",
                  onClick: () => handleNavigateToBooking(),
                }}
              />
              <StyleJournalSection />
            </motion.div>
          )}

          {/* ================= PAGE 6: LIVE QUOTATION & BOOKING ================= */}
          {currentPage === 'booking' && (
            <motion.div
              key="page-booking"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PageHeader
                title="Live Quotation & Fitting Scheduler"
                subtitle="Calculate your commission price in real time with currency toggle in KES or USD, and select your preferred fitting at our Ruiru atelier or estate concierge."
                pageId="booking"
                departmentNumber="Department 05"
                onNavigate={navigateTo}
              />
              <BookingQuotationSection 
                initialServiceId={targetServiceForBooking} 
                currency={currency} 
                selectedFabricPreference={selectedFabric}
              />
            </motion.div>
          )}

          {/* ================= PAGE 7: FAQ & CARE ================= */}
          {currentPage === 'faq' && (
            <motion.div
              key="page-faq"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PageHeader
                title="Knowledge Base & Nairobi Concierge"
                subtitle="Detailed answers regarding 4-day rush turnaround, luxury fabric care, complimentary restyling, and our private estate concierge coverage across Nairobi."
                pageId="faq"
                departmentNumber="Department 06"
                onNavigate={navigateTo}
                actionButton={{
                  label: "Book Concierge Visit",
                  onClick: () => handleNavigateToBooking(),
                }}
              />
              <FAQSection 
                onOpenBooking={(serviceId) => handleNavigateToBooking(serviceId)} 
              />
              <FutureExpansionSection />
            </motion.div>
          )}

          {/* ================= PAGE 8: ATELIER & CONTACT ================= */}
          {currentPage === 'contact' && (
            <motion.div
              key="page-contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PageHeader
                title="Ruiru Atelier & Contact"
                subtitle="Experience private fitting salons in Kimbo, Ruiru. Open Monday through Saturday with dedicated valet parking."
                pageId="contact"
                departmentNumber="Department 07"
                onNavigate={navigateTo}
                actionButton={{
                  label: "Book Appointment",
                  onClick: () => handleNavigateToBooking(),
                }}
              />
              <ContactSection />
            </motion.div>
          )}

          {/* ================= PAGE 9: ADMIN PANEL ================= */}
          {currentPage === 'admin' && (
            <motion.div
              key="page-admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel onNavigate={navigateTo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Sticky WhatsApp Concierge Button */}
      <FloatingWhatsApp />

      {/* Luxury Brand Footer with Multi-Page Navigation */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
