import React, { useState, useMemo } from 'react';
import { BLOG_POSTS } from '../data/tailoringData';
import { BlogPost } from '../types';
import { 
  Clock, 
  ArrowRight, 
  X,
  Search,
  Tag,
  Sparkles,
  RotateCcw
} from 'lucide-react';

const FILTER_TAGS = [
  'All',
  'Suit Etiquette',
  'Fabric Guide',
  'Weddings',
  'Style Guide',
  'Grooming Tips',
  'Business Dress Codes',
];

export const StyleJournalSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Filter posts based on active search query and tag selection
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // 1. Tag matching
      const matchesTag = (() => {
        if (selectedTag === 'All') return true;
        const normTag = selectedTag.toLowerCase().replace(/s$/, ''); // normalize plural
        const inCategory = post.category.toLowerCase().includes(normTag);
        const inTags = post.tags?.some((t) => t.toLowerCase().includes(normTag));
        return inCategory || inTags;
      })();

      // 2. Search query matching
      const matchesSearch = (() => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const inTitle = post.title.toLowerCase().includes(q);
        const inExcerpt = post.excerpt.toLowerCase().includes(q);
        const inCategory = post.category.toLowerCase().includes(q);
        const inAuthor = post.author.name.toLowerCase().includes(q);
        const inTags = post.tags?.some((t) => t.toLowerCase().includes(q));
        const inContent = post.content.some((p) => p.toLowerCase().includes(q));
        return inTitle || inExcerpt || inCategory || inAuthor || inTags || inContent;
      })();

      return matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedTag]);

  // Compute count for each filter tag
  const getTagCount = (tag: string) => {
    if (tag === 'All') return BLOG_POSTS.length;
    const normTag = tag.toLowerCase().replace(/s$/, '');
    return BLOG_POSTS.filter((post) => {
      const inCategory = post.category.toLowerCase().includes(normTag);
      const inTags = post.tags?.some((t) => t.toLowerCase().includes(normTag));
      return inCategory || inTags;
    }).length;
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTag('All');
  };

  return (
    <section id="journal" className="py-24 bg-[#EDE7DC] relative border-t border-[#D6CBB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* No section header — PageHeader already titles this page. */}

        {/* Search & Tag Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          {/* Real-time Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#524C43]">
              <Search className="w-4 h-4 text-[#6E5410]" />
            </div>
            <input
              id="journal-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by keyword (e.g., buttoning, dry cleaning, Karen wedding, Super 150s)..."
              className="w-full pl-11 pr-24 py-3.5 rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#BCAE97] focus:border-[#6E5410] focus:ring-1 focus:ring-[#D4AF37] text-sm text-[#171412] placeholder-[#6B6459] transition-colors outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-12 pr-2 flex items-center text-[#524C43] hover:text-[#171412] cursor-pointer"
                title="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-[12px] tabular-figures text-[#6B6459] bg-[#EDE7DC] px-2 py-1 rounded border border-[#D6CBB8]">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
          </div>

          {/* Quick-Filter Tag Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs text-[#524C43] pr-2 shrink-0">
              <Tag className="w-3.5 h-3.5 text-[#6E5410]" />
              <span className="font-semibold uppercase tracking-wider text-[12px]">Filter by Tag:</span>
            </div>
            {FILTER_TAGS.map((tag) => {
              const isSelected = selectedTag === tag;
              const count = getTagCount(tag);
              return (
                <button
                  key={tag}
                  id={`journal-filter-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#171412] shadow-[0_4px_16px_rgba(122,93,18,0.16)] border border-[#6E5410]'
                      : 'bg-[#FBF8F3] text-[#524C43] hover:text-[#171412] border border-[#D6CBB8] hover:border-[#BCAE97]'
                  }`}
                >
                  <span>{tag}</span>
                  <span
                    className={`text-[12px] px-1.5 py-0.2 rounded-full tabular-figures ${ isSelected ? 'bg-white/20 text-white' : 'bg-[#EDE7DC] text-[#6B6459]' }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Indicator / Reset */}
          {(searchQuery || selectedTag !== 'All') && (
            <div className="flex items-center justify-between pt-1 text-xs text-[#524C43]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#6E5410]" />
                <span>
                  Showing results for{' '}
                  {selectedTag !== 'All' && (
                    <strong className="text-[#2B2723] font-semibold">"{selectedTag}"</strong>
                  )}
                  {searchQuery && (
                    <span>
                      {selectedTag !== 'All' ? ' matching ' : ''}
                      <strong className="text-[#2B2723] font-semibold">"{searchQuery}"</strong>
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[#6E5410] hover:text-[#2B2723] flex items-center gap-1 hover:underline cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] hover:border-[#BCAE97] overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  {/* Featured Thumbnail */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-[#EDE7DC]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FBF8F3] via-transparent to-transparent opacity-85" />

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-sm bg-[#EDE7DC]/90 backdrop-blur-md border border-[#BCAE97] text-[#2B2723] text-[12px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>

                    {/* Read Time */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-[#EDE7DC]/80 border border-[#D6CBB8] text-white text-[12px] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#6E5410]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Article Info */}
                  <div className="p-6">
                    <span className="text-[12px] text-[#524C43] block mb-2 font-medium">
                      {post.date}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#171412] mb-3 group-hover:text-[#6E5410] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#524C43] leading-relaxed line-clamp-3 mb-4 font-light">
                      {post.excerpt}
                    </p>

                    {/* Interactive Tag Badges on the Card */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.map((t) => (
                          <button
                            key={t}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(t);
                            }}
                            className={`px-2 py-0.5 text-[12px] rounded-sm transition-colors border cursor-pointer ${
                              selectedTag === t
                                ? 'bg-[#D4AF37] text-[#171412] border-[#6E5410]'
                                : 'bg-[#EDE7DC]/60 hover:bg-[#E4DCCE] text-[#524C43] hover:text-[#2B2723] border-[#D6CBB8]'
                            }`}
                            title={`Filter by tag: ${t}`}
                          >
                            #{t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Author & Read Action Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-[#D6CBB8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-sm object-cover border border-[#BCAE97]"
                      loading="lazy"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#171412] block leading-tight">
                        {post.author.name}
                      </span>
                      <span className="text-[12px] text-[#524C43] block">
                        {post.author.title}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold uppercase tracking-wider text-[#6E5410] hover:text-[#2B2723] flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-sm bg-[#FBF8F3] border border-[#D6CBB8] max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EDE7DC] border border-[#BCAE97] flex items-center justify-center text-[#524C43] mx-auto">
              <Search className="w-6 h-6 text-[#6E5410]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#171412]">
              No Sartorial Guides Found
            </h3>
            <p className="text-xs sm:text-sm text-[#524C43] leading-relaxed font-light">
              We couldn't find any articles matching your search query{' '}
              {searchQuery && <strong className="text-[#2B2723]">"{searchQuery}"</strong>}
              {selectedTag !== 'All' && <span> under tag <strong className="text-[#2B2723]">"{selectedTag}"</strong></span>}.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Guides</span>
            </button>
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-[#FBF8F3] rounded-sm border border-[#BCAE97] p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 text-[#524C43] hover:text-[#171412] rounded-sm bg-[#E4DCCE] transition-colors cursor-pointer"
              title="Close reader"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-sm text-[12px] font-bold uppercase tracking-wider bg-[#E4DCCE] text-[#6E5410] border border-[#BCAE97]">
                {selectedPost.category}
              </span>
              <span className="text-xs text-[#524C43] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#6E5410]" />
                {selectedPost.readTime}
              </span>
              <span className="text-xs text-[#BCAE97]">•</span>
              <span className="text-xs text-[#524C43]">{selectedPost.date}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#171412] mb-4 leading-tight">
              {selectedPost.title}
            </h2>

            {/* Tags Pill Row inside Modal */}
            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-6">
                <span className="text-[12px] text-[#524C43] font-medium mr-1">Tags:</span>
                {selectedPost.tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTag(t);
                      setSelectedPost(null);
                    }}
                    className="px-2.5 py-0.5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] hover:border-[#6E5410] text-[12px] text-[#524C43] hover:text-[#6E5410] transition-colors cursor-pointer"
                    title={`View more ${t} guides`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            )}

            {/* Featured Image in Modal */}
            <div className="relative h-64 sm:h-72 rounded-sm overflow-hidden mb-8 border border-[#D6CBB8]">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Author Credit */}
            <div className="flex items-center gap-3 p-4 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] mb-8">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                className="w-11 h-11 rounded-sm object-cover border border-[#BCAE97]"
              />
              <div>
                <span className="text-xs font-bold text-[#171412] block">
                  Written by {selectedPost.author.name}
                </span>
                <span className="text-[12px] text-[#6E5410] block">
                  {selectedPost.author.title} • Nyota. Swerve. Closet Nairobi
                </span>
              </div>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#2B2723] leading-relaxed font-light">
              {selectedPost.content.map((para, idx) => (
                <p key={idx} className="font-editorial text-lg text-[#2B2723]">
                  {para}
                </p>
              ))}
            </div>

            {/* Tailoring Advice Note */}
            <div className="mt-8 p-5 rounded-sm bg-[#EDE7DC] border border-[#D6CBB8] text-xs text-[#524C43]">
              <strong className="block mb-1 uppercase tracking-wider font-bold text-[#6E5410]">
                The Nyota. Swerve. Closet Standard:
              </strong>
              <span>
                "True style is not about ostentation; it is about self-respect and quiet confidence. A suit cut precisely to your anatomy speaks before you utter a word."
              </span>
            </div>

            {/* Close / Inquire Footer */}
            <div className="mt-8 pt-6 border-t border-[#D6CBB8] flex items-center justify-between">
              <span className="text-xs text-[#524C43]">Nyota. Swerve. Closet Journal Edition</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#171412] font-bold text-xs uppercase tracking-widest cursor-pointer shadow-[0_4px_16px_rgba(122,93,18,0.16)]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
