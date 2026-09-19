import React from 'react';
import { useTailoring } from '../../context/TailoringContext';
import { AlertCircle, Phone, MapPin, Clock, Share2 } from 'lucide-react';

const FIELD =
  'w-full px-3 py-2 bg-[#FBF8F3] border border-[#D6CBB8] focus:border-[#6E5410] rounded-sm text-sm text-[#171412] focus:outline-none transition-colors';
const LABEL = 'block text-[12px] font-semibold uppercase tracking-wider text-[#524C43] mb-1';
const CARD = 'p-5 sm:p-6 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] space-y-4';
const HEADING = 'font-display text-lg font-bold text-[#171412] flex items-center gap-2';

/**
 * Brand and contact details.
 *
 * The WhatsApp number here is where every enquiry on the site is delivered, so
 * a typo silently sends business nowhere. That is why the number gets its own
 * warning and a live preview of the resulting wa.me link.
 */
export const BrandSettingsTab: React.FC = () => {
  const { brand, updateBrand, updateBrandHours, updateBrandSocial } = useTailoring();

  const digitsOnly = brand.whatsapp.replace(/\D/g, '');
  const whatsappLooksWrong = digitsOnly !== brand.whatsapp || !/^254\d{9}$/.test(digitsOnly);

  return (
    <div className="py-8 space-y-6">
      <div className="p-4 rounded-sm bg-[#E4DCCE] border border-[#D6CBB8] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#6E5410] shrink-0 mt-0.5" />
        <p className="text-[12px] text-[#524C43] leading-relaxed">
          These details drive the whole site — the WhatsApp button, every enquiry form,
          the footer, the contact page and the map. Changes apply to{' '}
          <strong className="text-[#171412]">this browser only</strong> until you export a
          backup and rebuild the site. See the Settings tab.
        </p>
      </div>

      {/* Contact */}
      <div className={CARD}>
        <h3 className={HEADING}>
          <Phone className="w-4 h-4 text-[#6E5410]" /> Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL} htmlFor="brand-name">Business name</label>
            <input
              id="brand-name"
              className={FIELD}
              value={brand.name}
              onChange={e => updateBrand({ name: e.target.value, shortName: e.target.value })}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="brand-phone">Phone (as displayed)</label>
            <input
              id="brand-phone"
              className={FIELD}
              value={brand.phone}
              onChange={e => updateBrand({ phone: e.target.value, displayPhone: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="brand-whatsapp">
              WhatsApp number — country code, digits only
            </label>
            <input
              id="brand-whatsapp"
              className={FIELD}
              value={brand.whatsapp}
              onChange={e => updateBrand({ whatsapp: e.target.value })}
              inputMode="numeric"
              aria-describedby="whatsapp-help"
            />
            <p id="whatsapp-help" className="text-[12px] mt-1.5 leading-relaxed">
              {whatsappLooksWrong ? (
                <span className="text-rose-700">
                  This does not look like a Kenyan WhatsApp number. Use the country code with
                  no “+”, spaces or dashes — for example <strong>254795216012</strong>.
                  Every enquiry goes here, so an invalid number means nothing reaches you.
                </span>
              ) : (
                <span className="text-[#524C43]">
                  Enquiries open{' '}
                  <code className="font-mono text-[#171412]">https://wa.me/{brand.whatsapp}</code>
                </span>
              )}
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="brand-email">Email</label>
            <input
              id="brand-email"
              type="email"
              className={FIELD}
              value={brand.email}
              onChange={e => updateBrand({ email: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className={CARD}>
        <h3 className={HEADING}>
          <MapPin className="w-4 h-4 text-[#6E5410]" /> Location
        </h3>

        <div>
          <label className={LABEL} htmlFor="brand-location">Address shown on the site</label>
          <input
            id="brand-location"
            className={FIELD}
            value={brand.location}
            onChange={e => updateBrand({ location: e.target.value })}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="brand-maps">Google Maps link</label>
          <input
            id="brand-maps"
            className={FIELD}
            value={brand.mapsUrl}
            onChange={e => updateBrand({ mapsUrl: e.target.value })}
            placeholder="https://maps.app.goo.gl/..."
          />
          <p className="text-[12px] text-[#524C43] mt-1.5">
            Paste the share link from your Google Business listing so directions land at
            your door rather than a general area search.
          </p>
        </div>
      </div>

      {/* Hours */}
      <div className={CARD}>
        <h3 className={HEADING}>
          <Clock className="w-4 h-4 text-[#6E5410]" /> Opening hours
        </h3>

        {([
          ['weekdays', 'Monday to Friday'],
          ['saturday', 'Saturday'],
          ['sunday', 'Sunday'],
        ] as const).map(([key, label]) => (
          <div key={key}>
            <label className={LABEL} htmlFor={`hours-${key}`}>{label}</label>
            <input
              id={`hours-${key}`}
              className={FIELD}
              value={brand.hours[key]}
              onChange={e => updateBrandHours({ [key]: e.target.value })}
            />
          </div>
        ))}
      </div>

      {/* Social */}
      <div className={CARD}>
        <h3 className={HEADING}>
          <Share2 className="w-4 h-4 text-[#6E5410]" /> Social channels
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            ['instagram', 'Instagram URL'],
            ['facebook', 'Facebook URL'],
            ['tiktok', 'TikTok URL'],
            ['linkedin', 'LinkedIn URL'],
          ] as const).map(([key, label]) => (
            <div key={key}>
              <label className={LABEL} htmlFor={`social-${key}`}>{label}</label>
              <input
                id={`social-${key}`}
                className={FIELD}
                value={brand.social[key]}
                onChange={e => updateBrandSocial({ [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
