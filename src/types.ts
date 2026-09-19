export interface ServiceItem {
  id: string;
  category: 'bespoke' | 'alterations' | 'accessories';
  title: string;
  description: string;
  details: string[];
  startingPriceKES: number;
  startingPriceUSD: number;
  turnaroundDays: number | string;
  image: string;
  tag?: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  keyHighlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'wedding' | 'business' | 'tuxedo' | 'transformation' | 'client' | 'behind-the-scenes';
  image: string;
  caption: string;
  details: {
    fabric: string;
    cut: string;
    occasion: string;
  };
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
  suitType: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

export interface QuotationState {
  serviceId: string;
  fabricGrade: 'standard' | 'super140' | 'luxuryCashmere' | 'linenSilk';
  piecesCount: number;
  turnaroundOption: 'standard' | 'express4day';
  locationPreference: 'boutique' | 'concierge';
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface FutureExpansionItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
  status: 'In Development' | 'Coming Soon' | 'Beta Register';
  icon: string;
}

export type FabricCategory = 'wool' | 'linen' | 'cotton' | 'silk-velvet' | 'cashmere';

export interface FabricColorway {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
  patternType: 'solid' | 'twill' | 'herringbone' | 'slub' | 'chalkstripe' | 'glen-check' | 'birdseye' | 'satin';
  swatchImage: string;
  garmentPreviewImage: string;
  toneDescription: string;
}

export interface FabricSwatch {
  id: string;
  name: string;
  mill: string;
  origin: string;
  category: FabricCategory;
  composition: string;
  weightGsm: number;
  weightOz: string;
  season: 'All-Season' | 'Spring / Summer' | 'Autumn / Winter' | 'Tropical Light';
  weave: string;
  textureDescription: string;
  breathability: 1 | 2 | 3 | 4 | 5;
  wrinkleResistance: 1 | 2 | 3 | 4 | 5;
  drapePersonality: string;
  recommendedGarments: string[];
  climateSuitability: string;
  colors: FabricColorway[];
  tag?: string;
}

export type FAQCategory = 'all' | 'sourcing' | 'care' | 'locations' | 'turnaround';

export interface FAQItem {
  id: string;
  category: 'sourcing' | 'care' | 'locations' | 'turnaround';
  question: string;
  answer: string;
  keyTakeaway?: string;
  bulletPoints?: string[];
  tags: string[];
  relatedAction?: {
    label: string;
    actionType: 'booking' | 'whatsapp' | 'swatches' | 'locations';
    target?: string;
  };
}

export type PageId = 
  | 'home'
  | 'offerings'
  | 'fabrics'
  | 'process'
  | 'journal'
  | 'booking'
  | 'faq'
  | 'contact'
  | 'admin';

export interface BookingSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceTitle: string;
  fabricGrade: string;
  piecesCount: number;
  turnaroundOption: 'standard' | 'express4day';
  locationPreference: 'boutique' | 'concierge';
  preferredDate: string;
  preferredTime: string;
  estimatedPriceKES: number;
  estimatedPriceUSD: number;
  notes: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed';
}

export interface PhotoUploadRecord {
  id: string;
  url: string;
  title: string;
  targetType: 'garment' | 'gallery';
  targetId?: string;
  category?: string;
  caption?: string;
  uploadedAt: string;
}

export interface NavigationItem {
  id: PageId;
  label: string;
  shortLabel?: string;
  description?: string;
}

/**
 * A photograph of real client work, shown in the public portfolio.
 *
 * Deliberately lean: captions describe only what is visible in the frame. There
 * are no fabric, price or provenance fields, because inventing those details for
 * a real commission would misrepresent the client's garment.
 */
export interface PortfolioPiece {
  id: string;
  image: string;
  alt: string;
  caption: string;
  category: 'weddings' | 'business' | 'atelier' | 'editorial';
}
