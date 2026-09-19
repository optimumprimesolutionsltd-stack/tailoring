import React, { useState } from 'react';
import { useTailoring } from '../context/TailoringContext';
import { PageId, ServiceItem, GalleryItem, BookingSubmission } from '../types';
import { attemptsRemaining, isAdminConfigured, verifyPasscode } from '../utils/adminAuth';
import { BrandSettingsTab } from './admin/BrandSettingsTab';
import { PortfolioTab } from './admin/PortfolioTab';
import { 
  DollarSign, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  Upload, 
  RefreshCw, 
  Calendar, 
  Phone, 
  Mail, 
  ExternalLink, 
  Scissors, 
  Layers, 
  Lock, 
  ArrowLeft,
  AlertCircle,
  Eye,
  Sliders,
  Download
} from 'lucide-react';

interface AdminPanelProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const {
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
    updateBookingStatus,
    deleteBooking,
    resetToDefaults,
    brand,
    portfolio,
    testimonials,
    importAll,
  } = useTailoring();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nyota_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [checkingPasscode, setCheckingPasscode] = useState(false);

  // Active Tab — brand first: contact details are the most consequential thing here.
  const [activeTab, setActiveTab] = useState<'brand' | 'prices' | 'photos' | 'catalog' | 'portfolio' | 'bookings' | 'settings'>('brand');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Price Editing Local Buffer
  const [priceEdits, setPriceEdits] = useState<{ [id: string]: { kes: number; usd: number } }>(() => {
    const initial: { [id: string]: { kes: number; usd: number } } = {};
    services.forEach(s => {
      initial[s.id] = { kes: s.startingPriceKES, usd: s.startingPriceUSD };
    });
    return initial;
  });

  // Photo Upload State
  const [newPhotoTarget, setNewPhotoTarget] = useState<'garment' | 'gallery'>('garment');
  const [selectedServiceForPhoto, setSelectedServiceForPhoto] = useState<string>(services[0]?.id || '');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'wedding' | 'business' | 'tuxedo' | 'transformation' | 'client'>('wedding');
  const [galleryFabric, setGalleryFabric] = useState('Scabal Super 140s Wool');
  const [galleryOccasion, setGalleryOccasion] = useState('Bespoke Matrimonial Ceremony');

  // New Garment State
  const [newGarmentTitle, setNewGarmentTitle] = useState('');
  const [newGarmentCategory, setNewGarmentCategory] = useState<'bespoke' | 'alterations' | 'accessories'>('bespoke');
  const [newGarmentDesc, setNewGarmentDesc] = useState('');
  const [newGarmentPriceKES, setNewGarmentPriceKES] = useState(35000);
  const [newGarmentPriceUSD, setNewGarmentPriceUSD] = useState(270);
  const [newGarmentTurnaround, setNewGarmentTurnaround] = useState('4');
  const [newGarmentImage, setNewGarmentImage] = useState('');
  const [newGarmentHighlights, setNewGarmentHighlights] = useState('Floating horsehair canvas, Hand-rolled lapels, Horn buttons');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkingPasscode) return;

    setCheckingPasscode(true);
    const result = await verifyPasscode(passcode);
    setCheckingPasscode(false);
    setPasscode('');

    if (result.ok) {
      setIsAuthenticated(true);
      sessionStorage.setItem('nyota_admin_auth', 'true');
      setAuthError('');
      showToast('Authenticated as Master Atelier Administrator');
      return;
    }

    if (result.reason === 'unconfigured') {
      setAuthError('No passcode has been set. Run "npm run set-passcode", then rebuild.');
    } else if (result.reason === 'locked') {
      const seconds = Math.ceil((result.retryInMs ?? 0) / 1000);
      setAuthError(`Too many attempts. Try again in ${seconds} second${seconds === 1 ? '' : 's'}.`);
    } else {
      const left = attemptsRemaining();
      setAuthError(
        left > 0
          ? `Incorrect passcode. ${left} attempt${left === 1 ? '' : 's'} remaining.`
          : 'Incorrect passcode.',
      );
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nyota_admin_auth');
  };

  // Price Management Handlers
  const handlePriceChange = (id: string, field: 'kes' | 'usd', value: number) => {
    setPriceEdits(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: Math.max(0, value),
      }
    }));
  };

  const handleAutoConvertUSD = (id: string) => {
    const currentKES = priceEdits[id]?.kes || 0;
    const computedUSD = Math.round(currentKES / 130);
    handlePriceChange(id, 'usd', computedUSD);
    showToast(`Converted: KES ${currentKES.toLocaleString()} ≈ USD $${computedUSD}`);
  };

  const handleSaveSinglePrice = (id: string) => {
    const current = priceEdits[id];
    if (current) {
      updateServicePrice(id, current.kes, current.usd);
      const service = services.find(s => s.id === id);
      showToast(`Updated price for ${service?.title || 'Garment'}!`);
    }
  };

  const handleSaveAllPrices = () => {
    Object.entries(priceEdits).forEach(([id, prices]) => {
      updateServicePrice(id, prices.kes, prices.usd);
    });
    showToast('All garment prices updated successfully in live store!');
  };

  // Photo Upload Handler (FileReader for local device file upload)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        setPhotoUrlInput(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = photoPreview || photoUrlInput.trim();
    if (!finalUrl) {
      alert('Please select a photo file or enter an image URL.');
      return;
    }

    if (newPhotoTarget === 'garment') {
      if (!selectedServiceForPhoto) {
        alert('Please choose which garment offering to update.');
        return;
      }
      updateServiceImage(selectedServiceForPhoto, finalUrl);
      const srv = services.find(s => s.id === selectedServiceForPhoto);
      showToast(`Photo updated for "${srv?.title || 'Garment'}"!`);
    } else {
      // Add to gallery
      const newGalleryItem: GalleryItem = {
        id: `photo-${Date.now()}`,
        title: galleryTitle || 'Bespoke Atelier Commission',
        category: galleryCategory,
        image: finalUrl,
        caption: 'Handcrafted anatomical masterpiece sculpted at Nyota. Swerve. Closet atelier.',
        details: {
          fabric: galleryFabric,
          cut: 'Bespoke Full Canvas Architecture',
          occasion: galleryOccasion,
        }
      };
      addGalleryPhoto(newGalleryItem);
      showToast('Added photo to Bespoke Client Portfolio!');
    }

    // Reset inputs
    setPhotoUrlInput('');
    setPhotoPreview(null);
    setGalleryTitle('');
  };

  // Add Garment Handler
  const handleCreateGarment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGarmentTitle.trim()) {
      alert('Please provide a garment title.');
      return;
    }

    const detailsArray = newGarmentHighlights
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const fallbackImg = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80';

    const newGarment: ServiceItem = {
      id: `custom-${Date.now()}`,
      category: newGarmentCategory,
      title: newGarmentTitle.trim(),
      description: newGarmentDesc.trim() || 'Custom bespoke garment tailored from anatomical measurements.',
      details: detailsArray.length > 0 ? detailsArray : ['Individually drafted paper pattern', 'Full canvas structure', 'Horn buttons'],
      startingPriceKES: newGarmentPriceKES,
      startingPriceUSD: newGarmentPriceUSD,
      turnaroundDays: newGarmentTurnaround || 4,
      image: newGarmentImage.trim() || fallbackImg,
      tag: 'New Atelier Offering',
    };

    addService(newGarment);
    setPriceEdits(prev => ({
      ...prev,
      [newGarment.id]: { kes: newGarment.startingPriceKES, usd: newGarment.startingPriceUSD }
    }));

    showToast(`Created new offering "${newGarment.title}"!`);
    // Reset form
    setNewGarmentTitle('');
    setNewGarmentDesc('');
    setNewGarmentImage('');
  };

  // Export Data JSON

  // Restore from an exported backup.
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(reader.result as string);
      } catch {
        showToast('That file is not valid JSON.');
        return;
      }
      const result = importAll(parsed);
      showToast(result.ok ? `Restored: ${result.applied.join(', ')}.` : result.error);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportData = () => {
    // Everything editable, so a backup can fully restore this browser — and so
    // the export can be used to publish changes to the live site.
    const data = {
      exportedAt: new Date().toISOString(),
      version: 2,
      brand,
      services,
      gallery,
      portfolio,
      testimonials,
      bookings,
      pricingRules,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nyota-atelier-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Catalog & Pricing configuration downloaded!');
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 bg-[#EDE7DC] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#E4DCCE] via-[#EDE7DC] to-[#EDE7DC] opacity-70 pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#FBF8F3] border border-[#D6CBB8] p-8 sm:p-10 rounded-sm shadow-2xl text-center">
          <div className="w-14 h-14 mx-auto rounded-sm bg-[#E4DCCE] border border-[#BCAE97] flex items-center justify-center mb-6 text-[#171412]">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[12px] uppercase tracking-[0.3em] text-[#524C43]">
            Staff Atelier Portal
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#171412] mt-1 mb-3">
            Atelier Management
          </h2>
          <p className="text-xs text-[#524C43] leading-relaxed mb-6 font-light">
            Enter the master passcode to manage garment prices, upload photos, and review bookings recorded on this device.
          </p>

          {!isAdminConfigured() && (
            <div className="mb-6 p-3 rounded-sm bg-amber-500/10 border border-amber-500/30 text-left">
              <p className="text-[12px] text-amber-200/90 leading-relaxed">
                <strong className="font-semibold">Passcode not configured.</strong> Run{' '}
                <code className="font-mono text-amber-100">npm run set-passcode</code> in the
                project folder, then rebuild the site.
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                autoComplete="current-password"
                disabled={checkingPasscode}
                className="w-full px-4 py-3 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] placeholder:text-[#6B6459] focus:outline-none transition-colors text-center tracking-wider"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 py-1.5 px-3 rounded border border-rose-500/20">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={checkingPasscode}
              className="w-full py-3.5 bg-[#171412] hover:bg-[#332C25] disabled:opacity-60 disabled:cursor-not-allowed text-[#FBF8F3] font-bold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg shadow-[#14120F]/10"
            >
              {checkingPasscode ? 'Checking…' : 'Sign In to Management'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#D6CBB8] flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs text-[#524C43] hover:text-[#171412] transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Atelier</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN ADMIN CONSOLE
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#EDE7DC] text-[#2B2723]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171412] text-[#FBF8F3] px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3 text-xs font-semibold uppercase tracking-wider animate-bounce">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Management Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#D6CBB8]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#524C43]">
                Atelier Control Panel • Live Sync
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#171412]">
              Master Atelier Management
            </h1>
            <p className="text-xs sm:text-sm text-[#524C43] font-light mt-1">
              Update garment prices, upload and assign photos, manage catalogue items, and review client bookings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2 rounded-sm bg-[#E4DCCE] hover:bg-[#E4DCCE] border border-[#D6CBB8] text-xs text-[#6E5410] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </button>

            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-sm bg-[#E4DCCE] hover:bg-rose-950/40 border border-[#D6CBB8] hover:border-rose-500/50 text-xs text-rose-300 transition-all cursor-pointer"
            >
              Lock / Sign Out
            </button>
          </div>
        </div>

        {/* Quick Statistics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
          <div className="p-4 bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm">
            <span className="text-[12px] uppercase tracking-wider text-[#524C43] block">Garments Active</span>
            <span className="font-display text-2xl font-bold text-[#171412]">{services.length}</span>
            <span className="text-[12px] text-[#6B6459] block mt-1">All live on storefront</span>
          </div>

          <div className="p-4 bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm">
            <span className="text-[12px] uppercase tracking-wider text-[#524C43] block">Portfolio Photos</span>
            <span className="font-display text-2xl font-bold text-[#171412]">{gallery.length + services.length}</span>
            <span className="text-[12px] text-[#6B6459] block mt-1">High-res bespoke imagery</span>
          </div>

          <div className="p-4 bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm">
            <span className="text-[12px] uppercase tracking-wider text-[#524C43] block">Local Quote Records</span>
            <span className="font-display text-2xl font-bold text-[#171412]">{bookings.length}</span>
            <span className="text-[12px] text-emerald-400 block mt-1">{bookings.filter(b => b.status === 'new').length} pending review</span>
          </div>

          <div className="p-4 bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm">
            <span className="text-[12px] uppercase tracking-wider text-[#524C43] block">Rush Guarantee</span>
            <span className="font-display text-2xl font-bold text-[#171412]">4 Days</span>
            <span className="text-[12px] text-[#6B6459] block mt-1">Express turnaround surcharge {pricingRules.expressRushPercent}%</span>
          </div>
        </div>

        {/* Console Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#D6CBB8] scrollbar-none">
          <button
            onClick={() => setActiveTab('brand')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'brand'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                : 'bg-[#E4DCCE] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Brand &amp; Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'prices'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                : 'bg-[#E4DCCE] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>1. Edit Prices ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                : 'bg-[#E4DCCE] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>2. Add & Update Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                : 'bg-[#E4DCCE] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>3. Garment Catalogue</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                : 'bg-[#E4DCCE] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                : 'bg-[#E4DCCE] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>4. Local Quote Records ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#171412] text-[#FBF8F3] shadow-md'
                : 'bg-[#E4DCCE] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>5. Global Pricing & Reset</span>
          </button>
        </div>

        {/* TAB 1: EDIT PRICES */}
        {activeTab === 'brand' && <BrandSettingsTab />}

        {activeTab === 'portfolio' && <PortfolioTab />}

        {activeTab === 'prices' && (
          <div className="py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#E4DCCE] p-5 rounded-sm border border-[#D6CBB8]">
              <div>
                <h3 className="font-display text-lg font-bold text-[#171412]">
                  Live Garment Pricing Matrix
                </h3>
                <p className="text-xs text-[#524C43] mt-1">
                  Adjust baseline pricing in Kenyan Shillings (KES) and US Dollars (USD). Changes immediately propagate to the Offerings catalogue, Instant Calculator, and Bookings engine.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleSaveAllPrices}
                  className="px-5 py-2.5 bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 shadow-lg shadow-[#14120F]/10 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Prices</span>
                </button>
              </div>
            </div>

            {/* Price Table / Cards */}
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm overflow-hidden divide-y divide-[#D6CBB8]">
              {services.map((srv) => {
                const edits = priceEdits[srv.id] || { kes: srv.startingPriceKES, usd: srv.startingPriceUSD };
                const isModified = edits.kes !== srv.startingPriceKES || edits.usd !== srv.startingPriceUSD;

                return (
                  <div 
                    key={srv.id} 
                    className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                      isModified ? 'bg-[#E4DCCE]' : 'hover:bg-[#16161D]'
                    }`}
                  >
                    {/* Garment Identification */}
                    <div className="flex items-center gap-4 min-w-[280px]">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-14 h-14 object-cover rounded-sm border border-[#D6CBB8] shrink-0"
                      />
                      <div>
                        <span className="text-[12px] uppercase tracking-wider text-[#524C43]">
                          {srv.category}
                        </span>
                        <h4 className="font-display text-base font-bold text-[#171412]">
                          {srv.title}
                        </h4>
                        <span className="text-[12px] text-[#6B6459]">
                          Turnaround: {srv.turnaroundDays} Days
                        </span>
                      </div>
                    </div>

                    {/* Price Inputs */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      {/* KES Input */}
                      <div className="flex flex-col">
                        <label className="text-[12px] uppercase tracking-wider text-[#524C43] font-medium mb-1">
                          Starting Price (KES)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs tabular-figures text-[#6B6459]">
                            KES
                          </span>
                          <input
                            type="number"
                            step="500"
                            value={edits.kes}
                            onChange={(e) => handlePriceChange(srv.id, 'kes', Number(e.target.value))}
                            className="w-36 pl-12 pr-3 py-1.5 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm tabular-figures text-[#171412] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Auto convert USD helper */}
                      <button
                        type="button"
                        onClick={() => handleAutoConvertUSD(srv.id)}
                        className="self-end mb-1 px-2.5 py-1.5 bg-[#1C1C24] hover:bg-[#D6CBB8] border border-[#BCAE97] rounded text-[12px] text-[#6E5410] transition-colors cursor-pointer"
                        title="Auto-calculate USD based on current KES"
                      >
                        Auto USD
                      </button>

                      {/* USD Input */}
                      <div className="flex flex-col">
                        <label className="text-[12px] uppercase tracking-wider text-[#524C43] font-medium mb-1">
                          Starting Price (USD)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs tabular-figures text-[#6B6459]">
                            $
                          </span>
                          <input
                            type="number"
                            step="5"
                            value={edits.usd}
                            onChange={(e) => handlePriceChange(srv.id, 'usd', Number(e.target.value))}
                            className="w-28 pl-7 pr-3 py-1.5 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm tabular-figures text-[#171412] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="self-end mb-0.5">
                        <button
                          onClick={() => handleSaveSinglePrice(srv.id)}
                          disabled={!isModified}
                          className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                            isModified
                              ? 'bg-[#171412] text-[#FBF8F3] hover:bg-[#E2E8F0] shadow-md'
                              : 'bg-[#E4DCCE] text-[#52525E] cursor-not-allowed'
                          }`}
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isModified ? 'Update' : 'Saved'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ADD & UPDATE PHOTOS */}
        {activeTab === 'photos' && (
          <div className="py-8 space-y-8">
            {/* Upload Box */}
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] p-6 sm:p-8 rounded-sm">
              <div className="max-w-2xl mb-6">
                <h3 className="font-display text-xl font-bold text-[#171412]">
                  Add or Replace Garment Photos
                </h3>
                <p className="text-xs text-[#524C43] mt-1 font-light">
                  Upload a photo from your local computer or smartphone, or paste a high-resolution image link. You can assign the photo to any bespoke garment offering or publish it to the client portfolio.
                </p>
              </div>

              <form onSubmit={handleSavePhoto} className="space-y-6">
                {/* Target Type Selector */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="photoTarget"
                      checked={newPhotoTarget === 'garment'}
                      onChange={() => setNewPhotoTarget('garment')}
                      className="accent-white"
                    />
                    <span className="text-xs text-[#171412] font-medium">
                      Replace / Set Primary Photo for a Garment Offering
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="photoTarget"
                      checked={newPhotoTarget === 'gallery'}
                      onChange={() => setNewPhotoTarget('gallery')}
                      className="accent-white"
                    />
                    <span className="text-xs text-[#171412] font-medium">
                      Add to Bespoke Client Portfolio / Repertoire Gallery
                    </span>
                  </label>
                </div>

                {/* Conditional Garment Selection */}
                {newPhotoTarget === 'garment' ? (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-2 font-medium">
                      Select Garment to Update
                    </label>
                    <select
                      value={selectedServiceForPhoto}
                      onChange={(e) => setSelectedServiceForPhoto(e.target.value)}
                      className="w-full max-w-md px-3 py-2.5 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.category})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                        Portfolio Title
                      </label>
                      <input
                        type="text"
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="e.g. Midnight Shawl Tuxedo at Villa Rosa"
                        className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                        Portfolio Category
                      </label>
                      <select
                        value={galleryCategory}
                        onChange={(e) => setGalleryCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                      >
                        <option value="wedding">Wedding & Matrimonial</option>
                        <option value="tuxedo">Black-Tie Dinner Gala</option>
                        <option value="business">Corporate & Executive</option>
                        <option value="transformation">Bespoke Restyling</option>
                        <option value="client">Client Feature</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Upload Inputs (File Upload & URL) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Option A: Direct Device File Upload */}
                  <div className="p-5 border-2 border-dashed border-[#BCAE97] hover:border-[#171412] rounded-sm bg-[#EDE7DC] transition-colors flex flex-col items-center justify-center text-center">
                    <Upload className="w-8 h-8 text-[#524C43] mb-2" />
                    <span className="text-xs text-[#171412] font-semibold mb-1">
                      Upload from Device
                    </span>
                    <span className="text-[12px] text-[#6B6459] mb-3">
                      PNG, JPG, WEBP from your laptop or phone
                    </span>
                    <label className="px-4 py-2 bg-[#E4DCCE] hover:bg-[#D6CBB8] border border-[#BCAE97] text-xs text-[#171412] font-medium rounded-sm transition-colors cursor-pointer">
                      <span>Choose Local File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Option B: Image URL */}
                  <div className="p-5 border border-[#D6CBB8] rounded-sm bg-[#EDE7DC] flex flex-col justify-center">
                    <span className="text-xs text-[#171412] font-semibold mb-1">
                      Or Paste Image Web Link
                    </span>
                    <span className="text-[12px] text-[#6B6459] mb-3">
                      Direct HTTPS image URL from Unsplash, Cloudinary, etc.
                    </span>
                    <input
                      type="url"
                      value={photoUrlInput}
                      onChange={(e) => {
                        setPhotoUrlInput(e.target.value);
                        setPhotoPreview(e.target.value);
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-[#FBF8F3] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-xs text-[#171412] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Image Preview */}
                {photoPreview && (
                  <div className="p-4 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm flex items-center gap-4">
                    <img
                      src={photoPreview}
                      alt="Selected Preview"
                      className="w-20 h-20 object-cover rounded-sm border border-[#BCAE97]"
                    />
                    <div>
                      <span className="text-[12px] uppercase tracking-wider text-emerald-400 block">
                        ✓ Photo Ready to Apply
                      </span>
                      <span className="text-xs text-[#6E5410]">
                        Target: {newPhotoTarget === 'garment' ? `Garment "${services.find(s => s.id === selectedServiceForPhoto)?.title}"` : 'Portfolio Gallery'}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#14120F]/10"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Publish Photo</span>
                </button>
              </form>
            </div>

            {/* Active Garments Photo Gallery */}
            <div>
              <h3 className="font-display text-lg font-bold text-[#171412] mb-4">
                Current Garment Primary Photos
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="group bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm overflow-hidden flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#FBF8F3] via-transparent to-transparent opacity-80" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#EDE7DC]/90 text-[12px] tabular-figures text-[#524C43]">
                        {srv.category}
                      </span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display text-xs font-bold text-[#171412] line-clamp-1">
                          {srv.title}
                        </h4>
                        <span className="text-[12px] text-[#524C43] block mt-0.5">
                          KES {srv.startingPriceKES.toLocaleString()} / ${srv.startingPriceUSD}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setNewPhotoTarget('garment');
                          setSelectedServiceForPhoto(srv.id);
                          window.scrollTo({ top: 200, behavior: 'smooth' });
                          showToast(`Ready to change photo for "${srv.title}"`);
                        }}
                        className="mt-3 w-full py-1.5 bg-[#E4DCCE] hover:bg-[#D6CBB8] border border-[#BCAE97] text-[12px] uppercase font-semibold text-[#171412] rounded transition-colors cursor-pointer"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Portfolio Photos */}
            <div>
              <h3 className="font-display text-lg font-bold text-[#171412] mb-4">
                Client Portfolio Gallery Photos ({gallery.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="relative group bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm overflow-hidden flex flex-col">
                    <div className="h-44 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#171412] truncate pr-2">
                        {item.title}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(`Remove photo "${item.title}"?`)) {
                            deleteGalleryPhoto(item.id);
                            showToast('Photo removed from portfolio');
                          }
                        }}
                        className="p-1 text-[#6B6459] hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GARMENT CATALOGUE */}
        {activeTab === 'catalog' && (
          <div className="py-8 space-y-8">
            {/* Add New Garment Offering */}
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] p-6 sm:p-8 rounded-sm">
              <h3 className="font-display text-xl font-bold text-[#171412] mb-2">
                Create New Bespoke Offering
              </h3>
              <p className="text-xs text-[#524C43] mb-6 font-light">
                Add a new garment silhouette, matrimonial package, or tailored accessory to the permanent boutique collection.
              </p>

              <form onSubmit={handleCreateGarment} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Garment Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGarmentTitle}
                    onChange={(e) => setNewGarmentTitle(e.target.value)}
                    placeholder="e.g. Double-Breasted Silk-Linen Blazer"
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={newGarmentCategory}
                    onChange={(e) => setNewGarmentCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                  >
                    <option value="bespoke">Bespoke Tailoring</option>
                    <option value="alterations">Alterations & Restyling</option>
                    <option value="accessories">Accessories & Accents</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Garment Description
                  </label>
                  <textarea
                    rows={2}
                    value={newGarmentDesc}
                    onChange={(e) => setNewGarmentDesc(e.target.value)}
                    placeholder="Brief description of the anatomical silhouette, drape personality, and styling context."
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Starting Price (KES)
                  </label>
                  <input
                    type="number"
                    value={newGarmentPriceKES}
                    onChange={(e) => setNewGarmentPriceKES(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm tabular-figures text-[#171412] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Starting Price (USD)
                  </label>
                  <input
                    type="number"
                    value={newGarmentPriceUSD}
                    onChange={(e) => setNewGarmentPriceUSD(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm tabular-figures text-[#171412] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Turnaround Lead Time (Days)
                  </label>
                  <input
                    type="text"
                    value={newGarmentTurnaround}
                    onChange={(e) => setNewGarmentTurnaround(e.target.value)}
                    placeholder="4 or 4 - 7"
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newGarmentImage}
                    onChange={(e) => setNewGarmentImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Craft Highlights (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newGarmentHighlights}
                    onChange={(e) => setNewGarmentHighlights(e.target.value)}
                    placeholder="Full floating canvas, Hand-rolled lapels, Horn buttons, 38 Anatomical points"
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] focus:border-[#171412] rounded-sm text-sm text-[#171412] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#14120F]/10"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Repertoire</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List Existing Garments with Delete option */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-[#171412]">
                Active Catalog Garments ({services.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="p-4 bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm flex items-start gap-4">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-16 h-16 object-cover rounded-sm border border-[#D6CBB8] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] uppercase text-[#524C43]">{srv.category}</span>
                        {services.length > 3 && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove "${srv.title}"?`)) {
                                deleteService(srv.id);
                                showToast(`Removed "${srv.title}"`);
                              }
                            }}
                            className="text-[#6B6459] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            title="Delete Offering"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#171412] truncate">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-[#524C43] line-clamp-1 mt-0.5">
                        {srv.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs tabular-figures text-[#171412]">
                        <span>KES {srv.startingPriceKES.toLocaleString()}</span>
                        <span className="text-[#6B6459]">•</span>
                        <span>USD ${srv.startingPriceUSD}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INBOUND BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between bg-[#E4DCCE] p-5 rounded-sm border border-[#D6CBB8]">
              <div>
                <h3 className="font-display text-lg font-bold text-[#171412]">
                  Bookings Recorded On This Device
                </h3>
                <p className="text-xs text-[#524C43] mt-1">
                  Quotations built in this browser. Client bookings arrive on WhatsApp, not here.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#E4DCCE] text-xs tabular-figures text-[#171412] rounded border border-[#BCAE97]">
                {bookings.length} On This Device
              </span>
            </div>

            <div className="p-4 rounded-sm bg-[#E4DCCE] border border-[#BCAE97] flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[12px] text-[#524C43] leading-relaxed">
                This site has no server, so a quotation a client builds on their own phone is
                saved in <em>their</em> browser and never reaches this list. Their enquiry comes
                through to you on WhatsApp instead. Treat this tab as a local scratchpad for
                quotes you prepare yourself, not as an inbox.
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="p-12 text-center bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm text-[#524C43]">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-[#6B6459]" />
                <p className="text-sm">No client bookings recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const cleanPhone = booking.phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${booking.fullName}, thank you for contacting Nyota. Swerve. Closet regarding your ${booking.serviceTitle} commission. We would like to confirm your fitting.`
                  )}`;

                  return (
                    <div 
                      key={booking.id}
                      className="p-5 bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#BCAE97] rounded-sm transition-colors space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E1E26] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-base font-bold text-[#171412]">
                              {booking.fullName}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-[12px] font-semibold uppercase tracking-wider ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : booking.status === 'completed'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <span className="text-[12px] text-[#6B6459] tabular-figures">
                            Submitted: {new Date(booking.createdAt).toLocaleString()}
                          </span>
                        </div>

                        {/* Estimated Price Tag */}
                        <div className="text-right">
                          <span className="text-[12px] text-[#524C43] uppercase tracking-wider block">Estimated Commission</span>
                          <span className="tabular-figures text-sm font-bold text-[#171412]">
                            KES {booking.estimatedPriceKES.toLocaleString()} / ${booking.estimatedPriceUSD}
                          </span>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-[#6B6459] block text-[12px] uppercase">Service</span>
                          <span className="text-[#171412] font-medium">{booking.serviceTitle}</span>
                        </div>
                        <div>
                          <span className="text-[#6B6459] block text-[12px] uppercase">Fabric Tier</span>
                          <span className="text-[#171412] font-medium capitalize">{booking.fabricGrade}</span>
                        </div>
                        <div>
                          <span className="text-[#6B6459] block text-[12px] uppercase">Fitting Date</span>
                          <span className="text-[#171412] font-medium">{booking.preferredDate || 'TBD'} at {booking.preferredTime || 'Anytime'}</span>
                        </div>
                        <div>
                          <span className="text-[#6B6459] block text-[12px] uppercase">Location Preference</span>
                          <span className="text-[#171412] font-medium capitalize">{booking.locationPreference}</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="p-3 bg-[#EDE7DC] rounded border border-[#1E1E26] text-xs text-[#6E5410]">
                          <span className="text-[#6B6459] block text-[12px] uppercase mb-1">Client Notes:</span>
                          "{booking.notes}"
                        </div>
                      )}

                      {/* Contact & Status Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-4 text-xs text-[#524C43]">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            {booking.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            {booking.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#E4DCCE] hover:bg-[#2A2A36] border border-[#BCAE97] rounded text-xs text-[#171412] flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>WhatsApp Client</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                            className="px-2.5 py-1.5 bg-[#EDE7DC] border border-[#D6CBB8] rounded text-xs text-[#171412] focus:outline-none"
                          >
                            <option value="new">Mark New</option>
                            <option value="contacted">Mark Contacted</option>
                            <option value="confirmed">Mark Confirmed</option>
                            <option value="completed">Mark Completed</option>
                          </select>

                          <button
                            onClick={() => {
                              if (confirm('Delete this booking record?')) {
                                deleteBooking(booking.id);
                                showToast('Booking record deleted');
                              }
                            }}
                            className="p-1.5 text-[#6B6459] hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: GLOBAL PRICING & SETTINGS */}
        {activeTab === 'settings' && (
          <div className="py-8 space-y-8 max-w-3xl">
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] p-6 rounded-sm space-y-6">
              <h3 className="font-display text-lg font-bold text-[#171412]">
                Global Surcharges & Fabric Pricing Tiers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Express 4-Day Rush Surcharge (%)
                  </label>
                  <input
                    type="number"
                    value={pricingRules.expressRushPercent}
                    onChange={(e) => updatePricingRules({ expressRushPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm text-sm tabular-figures text-[#171412]"
                  />
                  <span className="text-[12px] text-[#6B6459] mt-0.5 block">Applied when client requests 4-day rush</span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Super 140s Wool Surcharge (KES)
                  </label>
                  <input
                    type="number"
                    value={pricingRules.super140KES}
                    onChange={(e) => updatePricingRules({ super140KES: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm text-sm tabular-figures text-[#171412]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Luxury Cashmere & Silk Surcharge (KES)
                  </label>
                  <input
                    type="number"
                    value={pricingRules.cashmereKES}
                    onChange={(e) => updatePricingRules({ cashmereKES: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm text-sm tabular-figures text-[#171412]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#524C43] mb-1 font-medium">
                    Pure Irish Linen Surcharge (KES)
                  </label>
                  <input
                    type="number"
                    value={pricingRules.linenKES}
                    onChange={(e) => updatePricingRules({ linenKES: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#EDE7DC] border border-[#D6CBB8] rounded-sm text-sm tabular-figures text-[#171412]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D6CBB8]">
                <button
                  onClick={() => showToast('Global surcharge rules saved!')}
                  className="px-5 py-2.5 bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer"
                >
                  Save Surcharge Settings
                </button>
              </div>
            </div>

            {/* Backup and Restore */}
            <div className="bg-[#FBF8F3] border border-[#D6CBB8] p-6 rounded-sm space-y-4">
              <h3 className="font-display text-lg font-bold text-[#171412]">
                Data Backup & System Reset
              </h3>
              <p className="text-xs text-[#524C43] font-light">
                Download a full JSON backup of all prices, uploaded photos, and inbound booking records, or revert the catalogue to original default values.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleExportData}
                  className="px-4 py-2.5 bg-[#E4DCCE] hover:bg-[#D6CBB8] border border-[#BCAE97] text-xs text-[#171412] rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Backup (JSON)</span>
                </button>

                <label className="px-4 py-2.5 bg-[#E4DCCE] hover:bg-[#D6CBB8] border border-[#BCAE97] text-xs text-[#171412] rounded-sm flex items-center gap-2 transition-colors cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore From Backup</span>
                  <input type="file" accept="application/json,.json" onChange={handleImportData} className="hidden" />
                </label>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all prices and catalogue items to default? Any custom photos will be reset.')) {
                      resetToDefaults();
                      showToast('Catalogue reset to factory defaults');
                    }
                  }}
                  className="px-4 py-2.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
