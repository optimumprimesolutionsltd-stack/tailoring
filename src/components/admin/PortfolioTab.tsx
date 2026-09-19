import React, { useState } from 'react';
import { useTailoring } from '../../context/TailoringContext';
import { PortfolioPiece } from '../../types';
import { Plus, Trash2, ArrowUp, ArrowDown, Upload, AlertCircle } from 'lucide-react';

const FIELD =
  'w-full px-3 py-2 bg-[#FBF8F3] border border-[#D6CBB8] focus:border-[#6E5410] rounded-sm text-sm text-[#171412] focus:outline-none transition-colors';
const LABEL = 'block text-[12px] font-semibold uppercase tracking-wider text-[#524C43] mb-1';

const CATEGORIES: PortfolioPiece['category'][] = ['weddings', 'business', 'atelier', 'editorial'];

/**
 * Manage the public portfolio.
 *
 * Captions and alt text are edited per piece because both are published: the
 * caption sits on the tile, and the alt text is what a screen reader and Google
 * read. Neither should assert a fabric, price or date the atelier has not
 * confirmed — these are real clients' garments.
 */
export const PortfolioTab: React.FC = () => {
  const {
    portfolio,
    addPortfolioPiece,
    updatePortfolioPiece,
    deletePortfolioPiece,
    reorderPortfolioPiece,
  } = useTailoring();

  const [draft, setDraft] = useState({
    image: '',
    caption: '',
    alt: '',
    category: 'weddings' as PortfolioPiece['category'],
  });
  const [error, setError] = useState('');

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setDraft(d => ({ ...d, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.image.trim()) return setError('Choose a photo or paste an image URL.');
    if (!draft.caption.trim()) return setError('Add a caption — it appears on the tile.');
    if (!draft.alt.trim()) return setError('Add alt text — screen readers and Google use it.');

    addPortfolioPiece({
      id: `p-${Date.now()}`,
      image: draft.image.trim(),
      caption: draft.caption.trim(),
      alt: draft.alt.trim(),
      category: draft.category,
    });
    setDraft({ image: '', caption: '', alt: '', category: 'weddings' });
    setError('');
  };

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between bg-[#E4DCCE] p-5 rounded-sm border border-[#D6CBB8]">
        <div>
          <h3 className="font-display text-lg font-bold text-[#171412]">Portfolio</h3>
          <p className="text-xs text-[#524C43] mt-1">
            The “Garments we have made” grid on the home and Craft &amp; Process pages.
          </p>
        </div>
        <span className="px-3 py-1 bg-[#FBF8F3] text-xs tabular-figures text-[#171412] rounded border border-[#D6CBB8]">
          {portfolio.length} pieces
        </span>
      </div>

      {/* Add */}
      <form onSubmit={handleAdd} className="p-5 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] space-y-4">
        <h4 className="font-display text-base font-bold text-[#171412] flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#6E5410]" /> Add a piece
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL} htmlFor="pf-file">Upload from this device</label>
            <input
              id="pf-file"
              type="file"
              accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) readFile(f); }}
              className="w-full text-xs text-[#524C43] file:mr-3 file:px-3 file:py-2 file:rounded-sm file:border-0 file:bg-[#171412] file:text-[#FBF8F3] file:text-xs file:font-semibold file:cursor-pointer"
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="pf-url">…or an image path / URL</label>
            <input
              id="pf-url"
              className={FIELD}
              value={draft.image.startsWith('data:') ? '(uploaded file)' : draft.image}
              onChange={e => setDraft(d => ({ ...d, image: e.target.value }))}
              placeholder="/clients/your-photo.jpg"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="pf-caption">Caption (shown on the tile)</label>
            <input
              id="pf-caption"
              className={FIELD}
              value={draft.caption}
              onChange={e => setDraft(d => ({ ...d, caption: e.target.value }))}
              placeholder="Double-breasted chalk stripe"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="pf-category">Category</label>
            <select
              id="pf-category"
              className={FIELD}
              value={draft.category}
              onChange={e => setDraft(d => ({ ...d, category: e.target.value as PortfolioPiece['category'] }))}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="pf-alt">
              Alt text — describe the garment for anyone who cannot see the photo
            </label>
            <input
              id="pf-alt"
              className={FIELD}
              value={draft.alt}
              onChange={e => setDraft(d => ({ ...d, alt: e.target.value }))}
              placeholder="A client in a brown chalk-stripe double-breasted suit"
            />
          </div>
        </div>

        {draft.image && (
          <div className="flex items-center gap-3">
            <img src={draft.image} alt="" className="w-20 h-26 object-cover rounded-sm border border-[#D6CBB8]" />
            <span className="text-[12px] text-[#524C43]">Preview</span>
          </div>
        )}

        {error && (
          <p className="text-xs text-rose-700 bg-rose-500/10 py-1.5 px-3 rounded border border-rose-500/20 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
          </p>
        )}

        <button
          type="submit"
          className="px-5 py-2.5 rounded-sm bg-[#171412] hover:bg-[#332C25] text-[#FBF8F3] text-xs font-bold uppercase tracking-widest cursor-pointer inline-flex items-center gap-2"
        >
          <Upload className="w-3.5 h-3.5" /> Add to portfolio
        </button>
      </form>

      {/* Existing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {portfolio.map((piece, i) => (
          <div key={piece.id} className="p-4 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] flex gap-4">
            <img
              src={piece.image}
              alt={piece.alt}
              className="w-20 h-28 object-cover rounded-sm border border-[#D6CBB8] shrink-0"
            />

            <div className="flex-1 min-w-0 space-y-2">
              <input
                aria-label="Caption"
                className={FIELD}
                value={piece.caption}
                onChange={e => updatePortfolioPiece(piece.id, { caption: e.target.value })}
              />
              <input
                aria-label="Alt text"
                className={`${FIELD} text-xs`}
                value={piece.alt}
                onChange={e => updatePortfolioPiece(piece.id, { alt: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <select
                  aria-label="Category"
                  className={`${FIELD} text-xs py-1.5`}
                  value={piece.category}
                  onChange={e => updatePortfolioPiece(piece.id, { category: e.target.value as PortfolioPiece['category'] })}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <button
                  onClick={() => reorderPortfolioPiece(piece.id, -1)}
                  disabled={i === 0}
                  aria-label="Move earlier"
                  className="p-2 rounded-sm border border-[#D6CBB8] text-[#524C43] hover:text-[#171412] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => reorderPortfolioPiece(piece.id, 1)}
                  disabled={i === portfolio.length - 1}
                  aria-label="Move later"
                  className="p-2 rounded-sm border border-[#D6CBB8] text-[#524C43] hover:text-[#171412] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { if (confirm(`Remove “${piece.caption}” from the portfolio?`)) deletePortfolioPiece(piece.id); }}
                  aria-label="Remove"
                  className="p-2 rounded-sm border border-rose-500/30 text-rose-700 hover:bg-rose-500/10 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {portfolio.length === 0 && (
        <div className="p-12 text-center bg-[#FBF8F3] border border-[#D6CBB8] rounded-sm text-[#524C43]">
          <p className="text-sm">No portfolio pieces. The section is hidden while it is empty.</p>
        </div>
      )}
    </div>
  );
};
