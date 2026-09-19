import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, GalleryItem, BookingSubmission, PortfolioPiece, Testimonial } from '../types';
import { SERVICES_DATA, GALLERY_ITEMS, BRAND_INFO, CLIENT_PORTFOLIO, TESTIMONIALS } from '../data/tailoringData';
import { setLiveBrand } from '../data/liveBrand';

/** Everything in BRAND_INFO is editable, so the shape follows it exactly. */
export type BrandInfo = typeof BRAND_INFO;

interface PricingRules {
  expressRushPercent: number;
  super140KES: number;
  cashmereKES: number;
  linenKES: number;
}

interface TailoringContextType {
  services: ServiceItem[];
  gallery: GalleryItem[];
  bookings: BookingSubmission[];
  pricingRules: PricingRules;
  brand: BrandInfo;
  portfolio: PortfolioPiece[];
  testimonials: Testimonial[];
  updateServicePrice: (serviceId: string, priceKES: number, priceUSD: number) => void;
  updateServiceImage: (serviceId: string, newImageUrl: string) => void;
  updateServiceDetails: (serviceId: string, updates: Partial<ServiceItem>) => void;
  addService: (newService: ServiceItem) => void;
  deleteService: (serviceId: string) => void;
  addGalleryPhoto: (photo: GalleryItem) => void;
  deleteGalleryPhoto: (id: string) => void;
  updatePricingRules: (newRules: Partial<PricingRules>) => void;
  addBooking: (bookingData: Omit<BookingSubmission, 'id' | 'createdAt' | 'status'>) => BookingSubmission;
  updateBookingStatus: (id: string, status: BookingSubmission['status']) => void;
  deleteBooking: (id: string) => void;

  updateBrand: (updates: Partial<BrandInfo>) => void;
  updateBrandHours: (updates: Partial<BrandInfo['hours']>) => void;
  updateBrandSocial: (updates: Partial<BrandInfo['social']>) => void;

  addPortfolioPiece: (piece: PortfolioPiece) => void;
  updatePortfolioPiece: (id: string, updates: Partial<PortfolioPiece>) => void;
  deletePortfolioPiece: (id: string) => void;
  reorderPortfolioPiece: (id: string, direction: -1 | 1) => void;

  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  /** Replace every editable collection at once, from an exported backup. */
  importAll: (payload: unknown) => { ok: true; applied: string[] } | { ok: false; error: string };
  resetToDefaults: () => void;
}

const DEFAULT_PRICING_RULES: PricingRules = {
  expressRushPercent: 25,
  super140KES: 12000,
  cashmereKES: 28000,
  linenKES: 8000,
};


/**
 * State that survives a reload, persisted to localStorage.
 *
 * Note this is per-browser: what the owner edits here is not what a visitor
 * sees. Publishing means exporting a backup and rebuilding the site — see the
 * admin Settings tab and the README.
 */
function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed !== null && parsed !== undefined) return parsed as T;
      }
    } catch (e) {
      console.warn(`Could not read ${key} from localStorage`, e);
    }
    return fallback;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Quota or private mode: edits still work for this session.
      console.error(`Could not persist ${key}`, e);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

const TailoringContext = createContext<TailoringContextType | undefined>(undefined);

export const TailoringProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Services State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('nyota_services_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved services', e);
    }
    return SERVICES_DATA;
  });

  // 2. Gallery State
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('nyota_gallery_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved gallery', e);
    }
    return GALLERY_ITEMS;
  });

  // 3. Bookings State
  const [bookings, setBookings] = useState<BookingSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('nyota_bookings_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved bookings', e);
    }
    // Seed with two demo bookings for realistic preview if empty
    return [
      {
        id: 'book-101',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        fullName: 'Marcus Ochieng',
        email: 'marcus.ochieng@consulting.co.ke',
        phone: '+254 722 458 910',
        serviceId: 'bespoke-suits',
        serviceTitle: "Custom-Made Men's Suits",
        fabricGrade: 'super140',
        piecesCount: 2,
        turnaroundOption: 'express4day',
        locationPreference: 'boutique',
        preferredDate: '2026-09-22',
        preferredTime: '11:00 AM',
        estimatedPriceKES: 58000,
        estimatedPriceUSD: 445,
        notes: 'Needs two-piece navy chalk stripe suit for quarterly board meeting.',
        status: 'confirmed',
      },
      {
        id: 'book-102',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        fullName: 'David Kariuki',
        email: 'david.k@gmail.com',
        phone: '+254 710 334 892',
        serviceId: 'tuxedos',
        serviceTitle: 'Black-Tie Tuxedos',
        fabricGrade: 'standard',
        piecesCount: 1,
        turnaroundOption: 'standard',
        locationPreference: 'concierge',
        preferredDate: '2026-09-26',
        preferredTime: '03:30 PM',
        estimatedPriceKES: 52000,
        estimatedPriceUSD: 400,
        notes: 'Karen residence concierge fitting for diplomatic gala dinner.',
        status: 'new',
      }
    ];
  });

  // 5. Brand, portfolio and testimonials — all editable from the admin panel.
  const [brand, setBrand] = usePersistentState('nyota_brand_info', BRAND_INFO);
  const [portfolio, setPortfolio] = usePersistentState('nyota_portfolio', CLIENT_PORTFOLIO);
  const [testimonials, setTestimonials] = usePersistentState('nyota_testimonials', TESTIMONIALS);

  // 4. Pricing Rules State
  const [pricingRules, setPricingRules] = useState<PricingRules>(() => {
    try {
      const saved = localStorage.getItem('nyota_pricing_rules');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse pricing rules', e);
    }
    return DEFAULT_PRICING_RULES;
  });

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nyota_services_data', JSON.stringify(services));
    } catch (e) {
      console.error('Error saving services to localStorage', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('nyota_gallery_data', JSON.stringify(gallery));
    } catch (e) {
      console.error('Error saving gallery to localStorage', e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem('nyota_bookings_data', JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('nyota_pricing_rules', JSON.stringify(pricingRules));
    } catch (e) {
      console.error('Error saving pricing rules to localStorage', e);
    }
  }, [pricingRules]);

  // Mutations
  const updateServicePrice = (serviceId: string, priceKES: number, priceUSD: number) => {
    setServices(prev =>
      prev.map(srv =>
        srv.id === serviceId
          ? { ...srv, startingPriceKES: Math.max(0, priceKES), startingPriceUSD: Math.max(0, priceUSD) }
          : srv
      )
    );
  };

  const updateServiceImage = (serviceId: string, newImageUrl: string) => {
    setServices(prev =>
      prev.map(srv =>
        srv.id === serviceId ? { ...srv, image: newImageUrl } : srv
      )
    );
  };

  const updateServiceDetails = (serviceId: string, updates: Partial<ServiceItem>) => {
    setServices(prev =>
      prev.map(srv => (srv.id === serviceId ? { ...srv, ...updates } : srv))
    );
  };

  const addService = (newService: ServiceItem) => {
    setServices(prev => [newService, ...prev]);
  };

  const deleteService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const addGalleryPhoto = (photo: GalleryItem) => {
    setGallery(prev => [photo, ...prev]);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGallery(prev => prev.filter(p => p.id !== id));
  };

  const updatePricingRules = (newRules: Partial<PricingRules>) => {
    setPricingRules(prev => ({ ...prev, ...newRules }));
  };

  const addBooking = (bookingData: Omit<BookingSubmission, 'id' | 'createdAt' | 'status'>): BookingSubmission => {
    const newBooking: BookingSubmission = {
      ...bookingData,
      id: `book-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingSubmission['status']) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };


  // Publish contact details to non-React code (enquiry URL builders).
  useEffect(() => {
    setLiveBrand(brand);
  }, [brand]);

  // --- Brand & contact -------------------------------------------------
  // Every enquiry routes to the WhatsApp number held here, so this is the most
  // consequential thing in the panel: get it wrong and nothing reaches the
  // atelier.
  const updateBrand = (updates: Partial<BrandInfo>) =>
    setBrand(prev => ({ ...prev, ...updates }));

  const updateBrandHours = (updates: Partial<BrandInfo['hours']>) =>
    setBrand(prev => ({ ...prev, hours: { ...prev.hours, ...updates } }));

  const updateBrandSocial = (updates: Partial<BrandInfo['social']>) =>
    setBrand(prev => ({ ...prev, social: { ...prev.social, ...updates } }));

  // --- Portfolio --------------------------------------------------------
  const addPortfolioPiece = (piece: PortfolioPiece) =>
    setPortfolio(prev => [piece, ...prev]);

  const updatePortfolioPiece = (id: string, updates: Partial<PortfolioPiece>) =>
    setPortfolio(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));

  const deletePortfolioPiece = (id: string) =>
    setPortfolio(prev => prev.filter(p => p.id !== id));

  /** Move a piece one slot earlier (-1) or later (+1); order is display order. */
  const reorderPortfolioPiece = (id: string, direction: -1 | 1) =>
    setPortfolio(prev => {
      const i = prev.findIndex(p => p.id === id);
      const j = i + direction;
      if (i === -1 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  // --- Testimonials -----------------------------------------------------
  const addTestimonial = (t: Testimonial) => setTestimonials(prev => [t, ...prev]);

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) =>
    setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));

  const deleteTestimonial = (id: string) =>
    setTestimonials(prev => prev.filter(t => t.id !== id));

  // --- Import -----------------------------------------------------------
  /**
   * Restore from an exported backup. Each collection is applied only if it is
   * present and the right shape, so a partial or older export still works
   * rather than wiping the fields it does not mention.
   */
  const importAll: TailoringContextType['importAll'] = (payload) => {
    if (!payload || typeof payload !== 'object') {
      return { ok: false, error: 'That file is not a valid backup.' };
    }
    const data = payload as Record<string, unknown>;
    const applied: string[] = [];

    if (Array.isArray(data.services) && data.services.length) {
      setServices(data.services as ServiceItem[]); applied.push('garments');
    }
    if (Array.isArray(data.gallery)) { setGallery(data.gallery as GalleryItem[]); applied.push('gallery'); }
    if (Array.isArray(data.portfolio)) { setPortfolio(data.portfolio as PortfolioPiece[]); applied.push('portfolio'); }
    if (Array.isArray(data.testimonials)) { setTestimonials(data.testimonials as Testimonial[]); applied.push('testimonials'); }
    if (Array.isArray(data.bookings)) { setBookings(data.bookings as BookingSubmission[]); applied.push('bookings'); }
    if (data.pricingRules && typeof data.pricingRules === 'object') {
      setPricingRules(prev => ({ ...prev, ...(data.pricingRules as Partial<PricingRules>) }));
      applied.push('pricing rules');
    }
    if (data.brand && typeof data.brand === 'object') {
      setBrand(prev => ({ ...prev, ...(data.brand as Partial<BrandInfo>) }));
      applied.push('brand & contact');
    }

    return applied.length
      ? { ok: true, applied }
      : { ok: false, error: 'The file contained nothing recognisable.' };
  };

  const resetToDefaults = () => {
    setServices(SERVICES_DATA);
    setGallery(GALLERY_ITEMS);
    setPricingRules(DEFAULT_PRICING_RULES);
    setBrand(BRAND_INFO);
    setPortfolio(CLIENT_PORTFOLIO);
    setTestimonials(TESTIMONIALS);
    localStorage.removeItem('nyota_services_data');
    localStorage.removeItem('nyota_gallery_data');
    localStorage.removeItem('nyota_pricing_rules');
    localStorage.removeItem('nyota_brand_info');
    localStorage.removeItem('nyota_portfolio');
    localStorage.removeItem('nyota_testimonials');
  };

  return (
    <TailoringContext.Provider
      value={{
        services,
        gallery,
        bookings,
        pricingRules,
        brand,
        portfolio,
        testimonials,
        updateServicePrice,
        updateServiceImage,
        updateServiceDetails,
        addService,
        deleteService,
        addGalleryPhoto,
        deleteGalleryPhoto,
        updatePricingRules,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        updateBrand,
        updateBrandHours,
        updateBrandSocial,
        addPortfolioPiece,
        updatePortfolioPiece,
        deletePortfolioPiece,
        reorderPortfolioPiece,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        importAll,
        resetToDefaults,
      }}
    >
      {children}
    </TailoringContext.Provider>
  );
};

export const useTailoring = () => {
  const context = useContext(TailoringContext);
  if (!context) {
    throw new Error('useTailoring must be used within a TailoringProvider');
  }
  return context;
};
