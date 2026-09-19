import { FabricSwatch } from '../types';

export const FABRIC_CATEGORIES = [
  { id: 'all', label: 'All Textiles', description: 'Explore our complete international cloth library' },
  { id: 'wool', label: 'Wool & Worsted', description: 'Super 120s to 160s, tropical worsteds & flannels' },
  { id: 'linen', label: 'Pure Irish Linen', description: 'Breathable European flax with natural slub & character' },
  { id: 'cotton', label: 'Giza & Luxury Cotton', description: 'Long-staple Egyptian & Sea Island cottons' },
  { id: 'silk-velvet', label: 'Silk, Velvet & Jacquard', description: 'Ceremonial, tuxedo lapels & wedding attire' },
  { id: 'cashmere', label: 'Cashmere Blends', description: 'Ultra-soft, insulating luxury fibers' },
] as const;

export const FABRIC_SWATCHES: FabricSwatch[] = [
  // 1. Super 150s Merino Worsted (Wool)
  {
    id: 'merino-super-150',
    name: 'Super 150s Merino Worsted',
    mill: 'Loro Piana',
    origin: 'Quarona, Italy',
    category: 'wool',
    composition: '100% Super 150s Australian Extra-Fine Merino Wool',
    weightGsm: 260,
    weightOz: '7.6 oz / yd²',
    season: 'All-Season',
    weave: '2/2 High-Twist Twill',
    textureDescription: 'Subtle natural lustre with buttery hand-feel, resilient micro-crimp, and immaculate sharp crease retention.',
    breathability: 4,
    wrinkleResistance: 5,
    drapePersonality: 'Crisp & Fluid Sculptural Drape',
    recommendedGarments: ['Two-Piece Executive Suit', 'Double-Breasted Boardroom Blazer', 'Formal Trousers'],
    climateSuitability: 'Exceptional year-round in Nairobi (18°C – 28°C); resists tropical humidity while holding architectural drape.',
    tag: 'Executive Bestseller',
    colors: [
      {
        id: 'merino-150-midnight-navy',
        name: 'Midnight Navy',
        hex: '#0d1b2a',
        secondaryHex: '#1b263b',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Deep, commanding oceanic blue with subtle twill light reflection.'
      },
      {
        id: 'merino-150-charcoal-melange',
        name: 'Charcoal Melange',
        hex: '#212529',
        secondaryHex: '#343a40',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Sophisticated heathered graphite that flatters any lighting from dawn to dusk.'
      },
      {
        id: 'merino-150-royal-cobalt',
        name: 'Royal Cobalt',
        hex: '#1e3a8a',
        secondaryHex: '#2563eb',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Vibrant diplomatic sapphire blue that stands out in televised addresses and celebrations.'
      },
      {
        id: 'merino-150-obsidian-black',
        name: 'Obsidian Black',
        hex: '#0a0a0a',
        secondaryHex: '#18181b',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Deep light-absorbing pitch black engineered for black-tie authority and formal galas.'
      },
      {
        id: 'merino-150-forest-green',
        name: 'Deep Forest Pine',
        hex: '#14362a',
        secondaryHex: '#1e4d3b',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Subtle understated equestrian pine green that reveals its rich depth under direct daylight.'
      },
      {
        id: 'merino-150-rich-burgundy',
        name: 'Imperial Oxblood',
        hex: '#4a1525',
        secondaryHex: '#5e1b2f',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Refined deep garnet tone ideal for statement celebratory attire.'
      }
    ]
  },

  // 2. Pure Irish Slub Linen (Linen)
  {
    id: 'pure-irish-linen',
    name: 'Baird McNutt Pure Irish Linen',
    mill: 'Baird McNutt',
    origin: 'Ballymena, Northern Ireland',
    category: 'linen',
    composition: '100% Heritage European Flax Linen',
    weightGsm: 285,
    weightOz: '8.4 oz / yd²',
    season: 'Tropical Light',
    weave: 'Open Plain Slub Weave',
    textureDescription: 'Distinctive natural slub irregularities, cooling tactile grain, softening into luxurious vintage drape with every wear.',
    breathability: 5,
    wrinkleResistance: 2,
    drapePersonality: 'Relaxed Sculptural Linen Drape',
    recommendedGarments: ['Safari Safari Jacket', 'Summer Wedding Suit', 'Riviera Unlined Blazer', 'Bespoke Chinos'],
    climateSuitability: 'Unrivaled cooling for coastal Mombasa (32°C), Naivasha getaways, or warm Nairobi afternoons.',
    tag: 'Summer & Safari Essential',
    colors: [
      {
        id: 'irish-linen-desert-sand',
        name: 'Safari Ecru & Sand',
        hex: '#d4c5b9',
        secondaryHex: '#bfae9e',
        patternType: 'slub',
        swatchImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Authentic bleached sand tone echoing the Great Rift Valley landscape.'
      },
      {
        id: 'irish-linen-olive-drab',
        name: 'Savannah Olive',
        hex: '#4b5320',
        secondaryHex: '#5f6929',
        patternType: 'slub',
        swatchImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Understated military-inspired olive drab with organic earthy variations.'
      },
      {
        id: 'irish-linen-aegean-blue',
        name: 'Aegean Sea Blue',
        hex: '#2b5876',
        secondaryHex: '#3b7ea1',
        patternType: 'slub',
        swatchImage: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Sun-washed Mediterranean blue with visible linen cross-weave.'
      },
      {
        id: 'irish-linen-terracotta',
        name: 'Kilifi Terracotta',
        hex: '#a2593b',
        secondaryHex: '#b96c4b',
        patternType: 'slub',
        swatchImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Rich clay red inspired by Kenyan coastal pottery and sunset glow.'
      },
      {
        id: 'irish-linen-tobacco-brown',
        name: 'Cuban Tobacco',
        hex: '#583f2e',
        secondaryHex: '#6f503c',
        patternType: 'slub',
        swatchImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Warm cigar brown with exquisite natural light refraction in the yarn.'
      }
    ]
  },

  // 3. Egyptian Giza Cotton Twill (Cotton)
  {
    id: 'egyptian-giza-cotton',
    name: 'Giza 87 Extra-Long Staple Cotton',
    mill: 'Albini 1876',
    origin: 'Bergamo, Italy / Nile Delta, Egypt',
    category: 'cotton',
    composition: '100% Giza 87 Egyptian Extra-Long Staple Cotton',
    weightGsm: 290,
    weightOz: '8.5 oz / yd²',
    season: 'All-Season',
    weave: '3/1 Compact Gabardine Twill',
    textureDescription: 'Dense yet featherlight handle, silky yarn density with mirror-smooth drape and high tensile strength.',
    breathability: 4,
    wrinkleResistance: 4,
    drapePersonality: 'Structured, Crisp Tailored Line',
    recommendedGarments: ['Tailored Safari Suit', 'Unstructured Smart Blazer', 'Custom Chinos & Trousers', 'Bespoke Trench Coat'],
    climateSuitability: 'Optimized for high-humidity and dry warmth; absorbs perspiration without cling.',
    tag: 'Artisanal Cotton',
    colors: [
      {
        id: 'giza-cotton-british-khaki',
        name: 'British Khaki',
        hex: '#968165',
        secondaryHex: '#a99375',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'The definitive colonial khaki tone with high-density gabardine twill ridge.'
      },
      {
        id: 'giza-cotton-pure-white',
        name: 'Alabaster White',
        hex: '#f4f4f2',
        secondaryHex: '#e5e5e0',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Pristine optic white with zero yellowness, perfect for tropical formal wear.'
      },
      {
        id: 'giza-cotton-slate-navy',
        name: 'Nautical Navy',
        hex: '#16222f',
        secondaryHex: '#223244',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Deep maritime navy that retains its crispness over hundreds of dry-cleanings.'
      },
      {
        id: 'giza-cotton-sage-mist',
        name: 'Sage Mist',
        hex: '#778170',
        secondaryHex: '#899581',
        patternType: 'twill',
        swatchImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Modern muted green with cool mineral undertones.'
      }
    ]
  },

  // 4. Black-Tie Royal Velvet & Silk (Silk & Velvet)
  {
    id: 'black-tie-velvet',
    name: 'Royal Silk-Cotton Velvet',
    mill: 'Scabal',
    origin: 'Huddersfield, England',
    category: 'silk-velvet',
    composition: '82% Cotton Pile, 18% Mulberry Silk Foundation',
    weightGsm: 360,
    weightOz: '10.6 oz / yd²',
    season: 'Autumn / Winter',
    weave: 'Dense Cut-Pile Velvet',
    textureDescription: 'Plush, dense micro-pile with dramatic two-way optical pile direction that catches evening chandelier light.',
    breathability: 2,
    wrinkleResistance: 4,
    drapePersonality: 'Voluptuous, Weighted Evening Drape',
    recommendedGarments: ['Red Carpet Dinner Jacket', 'Double-Breasted Tuxedo', 'Groom Matrimonial Blazer', 'Smoking Jacket'],
    climateSuitability: 'Engineered for air-conditioned five-star gala ballrooms, diplomat state banquets, and cool Nairobi evenings.',
    tag: 'Black-Tie Distinction',
    colors: [
      {
        id: 'velvet-midnight-black',
        name: 'Nocturne Black',
        hex: '#050505',
        secondaryHex: '#121212',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'True infinite black with deep velvet pile light absorption.'
      },
      {
        id: 'velvet-royal-emerald',
        name: 'Imperial Emerald',
        hex: '#08331d',
        secondaryHex: '#0c4728',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Hypnotic jewel-toned emerald green favored by grooms and dignitary hosts.'
      },
      {
        id: 'velvet-regal-burgundy',
        name: 'Baron Burgundy',
        hex: '#3b0d18',
        secondaryHex: '#4d1220',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Opulent vintage wine hue with shimmering highlights along fold lines.'
      },
      {
        id: 'velvet-sapphire-night',
        name: 'Deep Sapphire',
        hex: '#0d1f3d',
        secondaryHex: '#142d55',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Regal navy-blue velvet with an electrifying cobalt shimmer when in motion.'
      }
    ]
  },

  // 5. English Tweed & Wool Herringbone (Wool)
  {
    id: 'english-herringbone-tweed',
    name: 'Shetland Wool Herringbone',
    mill: 'Holland & Sherry',
    origin: 'Peebles, Scotland',
    category: 'wool',
    composition: '100% Pure Virgin Shetland Wool',
    weightGsm: 340,
    weightOz: '10.0 oz / yd²',
    season: 'Autumn / Winter',
    weave: 'Classic Chevron Herringbone',
    textureDescription: 'Substantial rustic yarn with tactile heather flecks, robust natural spring, and exceptional thermal protection.',
    breathability: 3,
    wrinkleResistance: 5,
    drapePersonality: 'Heavy Tailored Architectural Silhouette',
    recommendedGarments: ['Country Blazer', 'Three-Piece Heritage Suit', 'Overcoat', 'Bespoke Waistcoat'],
    climateSuitability: 'Ideal for Highland Nairobi evenings, Mount Kenya and Aberdares excursions, and international travel.',
    tag: 'Heritage Tweed',
    colors: [
      {
        id: 'tweed-grey-herringbone',
        name: 'Charcoal & Silver Chevron',
        hex: '#3d4043',
        secondaryHex: '#606468',
        patternType: 'herringbone',
        swatchImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Classic interlocking grey and chalk-silver chevron weave.'
      },
      {
        id: 'tweed-peat-moss-green',
        name: 'Peat Moss & Olive',
        hex: '#343828',
        secondaryHex: '#4a5038',
        patternType: 'herringbone',
        swatchImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Earthy Scottish woodland green peppered with golden ochre flecks.'
      },
      {
        id: 'tweed-oatmeal-tan',
        name: 'Highland Oatmeal',
        hex: '#b4a28d',
        secondaryHex: '#93816c',
        patternType: 'herringbone',
        swatchImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Warm neutral oatmeal with distinct woven zigzag geometry.'
      }
    ]
  },

  // 6. Italian Cashmere & Silk Flannel (Cashmere)
  {
    id: 'italian-cashmere-flannel',
    name: 'Cashmere & Merino Luxury Flannel',
    mill: 'Ermenegildo Zegna',
    origin: 'Trivero, Italy',
    category: 'cashmere',
    composition: '90% Super 160s Merino Wool, 10% Mongolian Cashmere',
    weightGsm: 295,
    weightOz: '8.7 oz / yd²',
    season: 'All-Season',
    weave: 'Milled Brushed Flannel',
    textureDescription: 'Decadently cloud-soft napped surface, gentle warmth without bulk, and a rich, matte, powdery drape.',
    breathability: 3,
    wrinkleResistance: 4,
    drapePersonality: 'Ultra-Soft, Supple Melting Drape',
    recommendedGarments: ['Luxury Executive Suit', 'Separate Winter Blazer', 'Cuffed Flannel Trousers'],
    climateSuitability: 'Supreme comfort for climate-controlled executive offices, boardroom presentations, and overseas diplomatic travel.',
    tag: 'Prestige Cashmere',
    colors: [
      {
        id: 'cashmere-charcoal-flannel',
        name: 'Graphite Cashmere',
        hex: '#1f2428',
        secondaryHex: '#2d333b',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Deep flannel charcoal with characteristic brushed cashmere halo.'
      },
      {
        id: 'cashmere-camel-tan',
        name: 'Saharan Camel',
        hex: '#ad8762',
        secondaryHex: '#c29b74',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'The quintessential luxury camel hair hue with warm honey undertones.'
      },
      {
        id: 'cashmere-navy-twilight',
        name: 'Twilight Navy Melange',
        hex: '#121e2d',
        secondaryHex: '#1e2c3e',
        patternType: 'solid',
        swatchImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        garmentPreviewImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        toneDescription: 'Dark nautical navy with soft diffused flannel surface.'
      }
    ]
  }
];
