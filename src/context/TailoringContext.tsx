import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, GalleryItem, BookingSubmission } from '../types';
import { SERVICES_DATA, GALLERY_ITEMS } from '../data/tailoringData';

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
  resetToDefaults: () => void;
}

const DEFAULT_PRICING_RULES: PricingRules = {
  expressRushPercent: 25,
  super140KES: 12000,
  cashmereKES: 28000,
  linenKES: 8000,
};

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

  const resetToDefaults = () => {
    setServices(SERVICES_DATA);
    setGallery(GALLERY_ITEMS);
    setPricingRules(DEFAULT_PRICING_RULES);
    localStorage.removeItem('nyota_services_data');
    localStorage.removeItem('nyota_gallery_data');
    localStorage.removeItem('nyota_pricing_rules');
  };

  return (
    <TailoringContext.Provider
      value={{
        services,
        gallery,
        bookings,
        pricingRules,
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
