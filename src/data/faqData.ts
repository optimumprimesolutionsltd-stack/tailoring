import { FAQItem } from '../types';

export interface NairobiNeighborhood {
  name: string;
  subCounty: string;
  type: 'Flagship Atelier' | 'Home Concierge' | 'Office & Boardroom' | 'Diplomatic Suite';
  etaConcierge: string;
  travelFee: string;
  popularFor: string;
  description: string;
}

export const NAIROBI_NEIGHBORHOODS: NairobiNeighborhood[] = [
  {
    name: 'Kimbo & Ruiru',
    subCounty: 'Ruiru, Kiambu',
    type: 'Flagship Atelier',
    etaConcierge: 'Immediate / Walk-in & Private Lounge',
    travelFee: 'Free (Atelier Visit & Mobile)',
    popularFor: 'Ruiru atelier, private espresso fittings, full fabric library',
    description: 'Our primary design studio and master cutting tables are situated in Kimbo, Ruiru. Direct walk-ins and private suite reservations available.',
  },
  {
    name: 'Karen, Lang’ata & Hardy',
    subCounty: 'Lang’ata',
    type: 'Home Concierge',
    etaConcierge: 'Same-day or Scheduled 24h',
    travelFee: 'Complimentary for Bespoke Suits',
    popularFor: 'Private residence garden fittings, wedding party group measurements',
    description: 'Our master tailors travel directly to your private estate with portable measurement kits and fabric swatch books. Relax in the comfort of your home.',
  },
  {
    name: 'Runda, Gigiri & Rosslyn',
    subCounty: 'Westlands / Ruaraka',
    type: 'Diplomatic Suite',
    etaConcierge: 'Same-day or Scheduled 24h',
    travelFee: 'Complimentary for Bespoke Suits',
    popularFor: 'UN diplomatic corps, embassy officials, ambassadorial black-tie attire',
    description: 'Discreet and protocol-compliant mobile fitting visits directly to diplomatic compounds, UN Crescent residences, and private villas in Runda.',
  },
  {
    name: 'Muthaiga & Old Muthaiga',
    subCounty: 'Ruaraka',
    type: 'Home Concierge',
    etaConcierge: 'Within 2 hours or Scheduled',
    travelFee: 'Complimentary for Bespoke Suits',
    popularFor: 'Executive weekend wardrobe overhauls, bespoke gala tuxedos',
    description: 'In-home appointments providing personalized styling consultations, multiple baste fittings, and wardrobe curations.',
  },
  {
    name: 'Upper Hill & CBD Corporate',
    subCounty: 'Upper Hill / CBD',
    type: 'Office & Boardroom',
    etaConcierge: 'Same-day (Within 60-90 mins)',
    travelFee: 'Complimentary for Bespoke Suits',
    popularFor: 'Executive boardrooms, C-suite consultations, managing directors',
    description: 'Fit without leaving your desk. We conduct discrete 20-minute anatomical measurement sessions in your executive boardroom or private office.',
  },
  {
    name: 'Lavington, Kileleshwa & Kilimani',
    subCounty: 'Dagoretti North',
    type: 'Home Concierge',
    etaConcierge: 'Same-day (Within 45-60 mins)',
    travelFee: 'Complimentary for Bespoke Suits',
    popularFor: 'Contemporary tailored separates, bespoke safari jackets, smart casual',
    description: 'Rapid concierge dispatch to apartment penthouses and townhouses across Lavington, Riverside Drive, and Kilimani.',
  },
  {
    name: 'Spring Valley, Kyuna & Lower Kabete',
    subCounty: 'Westlands',
    type: 'Home Concierge',
    etaConcierge: 'Within 30-45 mins',
    travelFee: 'Complimentary for Bespoke Suits',
    popularFor: 'Family wedding fittings, morning coats, evening dinner jackets',
    description: 'Minutes away from our Ruiru atelier, offering flexible evening and early morning mobile fitting slots.',
  },
];

export const CARE_RULES = [
  {
    ruleNumber: 1,
    title: 'Dry Clean Only 1–2 Times Per Year',
    shortAdvice: 'Chemical dry cleaning strips the natural lanolin oils from wool fibers, rendering cloth brittle.',
    fullDetails: 'Unless visibly soiled or stained, a high-twist wool suit naturally repels odors and dirt. Hang it in a well-ventilated room or a humid bathroom during a shower to let steam release creases naturally.',
    icon: 'Sparkles',
  },
  {
    ruleNumber: 2,
    title: 'Steam Upright — Never Direct Flat Iron',
    shortAdvice: 'Direct iron contact leaves an unsightly permanent shiny gloss on wool and damages the floating canvas.',
    fullDetails: 'Use a handheld or upright garment steamer held 1 to 2 inches away from the cloth. If you must iron, always place a damp 100% white cotton pressing cloth between the iron and your suit on medium heat.',
    icon: 'Flame',
  },
  {
    ruleNumber: 3,
    title: 'Allow 24–48 Hours Rest Between Wears',
    shortAdvice: 'Wool is a dynamic living fiber that requires recovery time to regain its natural crimp and drape.',
    fullDetails: 'Never wear the same bespoke suit two days consecutively. Resting the garment on a contoured hanger allows moisture to evaporate and micro-creases in the armholes, lapels, and knees to fall out naturally.',
    icon: 'Clock',
  },
  {
    ruleNumber: 4,
    title: 'Always Hang on Contoured Wooden Wishbones',
    shortAdvice: 'Wire and flimsy plastic hangers ruin the hand-shaped canvas shoulder pads and collar roll.',
    fullDetails: 'Nyota. Swerve. Closet provides every bespoke commission with a wide-shoulder contoured cedarwood hanger. The contoured 2.5-inch shoulder flares mirror human clavicle anatomy and prevent shoulder dimpling.',
    icon: 'ShieldCheck',
  },
  {
    ruleNumber: 5,
    title: 'Brush After Every Wear with Natural Horsehair',
    shortAdvice: 'A 30-second post-wear brushing removes atmospheric Nairobi dust before it embeds in the weave.',
    fullDetails: 'Use downward, gentle strokes with a 100% natural horsehair clothes brush. This restores the cloth nap, removes particulate dust, and prevents premature thread wear in high-friction seat and thigh areas.',
    icon: 'CheckCircle2',
  },
];

export const FAQ_DATA: FAQItem[] = [
  // 1. FABRIC SOURCING & MILLS
  {
    id: 'faq-fabric-sourcing-origins',
    category: 'sourcing',
    question: 'Where do you source your fabrics, and how can I verify their authenticity?',
    answer: 'Every piece of cloth in our atelier is directly imported from heritage textile mills in Biella (Italy), Huddersfield & Yorkshire (United Kingdom), County Antrim (Northern Ireland), and the Nile Delta (Egypt). We work exclusively with certified international houses including Scabal, Vitale Barberis Canonico (VBC), Loro Piana, Holland & Sherry, Dormeuil, and Baird McNutt.',
    keyTakeaway: 'All cloths feature woven selvedge identification edges and mill authenticity verification tags directly from Europe.',
    bulletPoints: [
      'Woven Selvedge Edge: Every cut of cloth displays the woven mill logo, Super number (e.g. Super 150s), and origin along its continuous selvedge border.',
      'Certificate of Authenticity: High-end Scabal and Loro Piana lengths include numbered mill guarantee cards.',
      'Direct Mill Importation: No intermediary clearing stock or synthetic counterfeit blends.',
    ],
    tags: ['Fabric Origin', 'Italian Wool', 'British Mills', 'Selvedge', 'Scabal', 'Loro Piana'],
    relatedAction: {
      label: 'Explore Fabric Swatches',
      actionType: 'swatches',
      target: '#swatches',
    },
  },
  {
    id: 'faq-fabric-nairobi-climate',
    category: 'sourcing',
    question: 'Which fabrics perform best in Nairobi’s equatorial elevation and fluctuating temperatures?',
    answer: 'Nairobi sits at 1,795 meters above sea level, producing brisk mornings (14°C), intense equatorial midday sun (25–28°C), and breezy evenings. We recommend high-twist tropical wools (240–280 GSM), open-weave fresco wools, and Irish linen-wool-silk blends.',
    keyTakeaway: 'High-twist tropical wool allows rapid body heat dissipation while resisting creasing during Nairobi traffic and long boardroom sessions.',
    bulletPoints: [
      'Tropical High-Twist Merino (240-260 GSM): Highly breathable, crisp drape, natural bounceback that resists seat creasing.',
      'Wool-Silk-Linen Blends: The breathability of pure linen softened with the drape of wool and luster of natural silk.',
      '100% Baird McNutt Irish Linen (300 GSM): Ideal for daytime weddings, outdoor garden receptions, and safari events.',
      'Zero Polyester Lining: We line all bespoke jackets with 100% Bemberg Cupro—a breathable cellulosic fiber that prevents sweat buildup.',
    ],
    tags: ['Nairobi Climate', 'Tropical Wool', 'Breathability', 'Bemberg Cupro', 'Linen'],
    relatedAction: {
      label: 'View Climate Recommendations',
      actionType: 'swatches',
      target: '#swatches',
    },
  },
  {
    id: 'faq-fabric-bring-your-own',
    category: 'sourcing',
    question: 'Can I bring my own fabric (BYOF / CMT) to Nyota. Swerve. Closet for bespoke tailoring?',
    answer: 'Yes, we provide Cut, Make & Trim (CMT) services for clients who have acquired their own cloth while traveling to London, Milan, or the Gulf, or who have inherited vintage textiles. Before cutting, our master tailor will perform a complimentary cloth inspection to verify yardage, fiber integrity, weave alignment, and warp stability.',
    keyTakeaway: 'We verify your fabric’s weight, yardage, and fiber content before drafting your custom anatomical pattern.',
    bulletPoints: [
      'Required Yardage: Typically 3.5 to 3.8 meters (double-width 150cm) for a standard two-piece suit, or 4.2 meters for a three-piece suit.',
      'Inspection Guarantee: If the fabric has structural flaws, shrinkage risk, or weave distortions, we notify you prior to pattern cutting.',
      'Includes Premium Trimmings: We provide genuine horn buttons, pure Bemberg cupro linings, and hand-basted horsehair canvas.',
    ],
    tags: ['Bring Your Own Fabric', 'CMT Tailoring', 'Custom Yardage', 'Cloth Inspection'],
    relatedAction: {
      label: 'Book CMT Inspection',
      actionType: 'booking',
      target: 'bespoke-suits',
    },
  },
  {
    id: 'faq-fabric-ethics-sustainability',
    category: 'sourcing',
    question: 'Are your wools and linens ethically and sustainably produced?',
    answer: 'Sustainability and animal welfare are central to our mill curation. We partner solely with mills that adhere to the Responsible Wool Standard (RWS), guaranteeing 100% non-mulesed merino sheep farming in Australia and New Zealand. Our Irish linens use unbleached dew-retted flax certified by OEKO-TEX Standard 100.',
    keyTakeaway: '100% non-mulesed wool, biodegradable natural horn buttons, and OEKO-TEX certified flax.',
    bulletPoints: [
      'Zero Synthetic Microfibers: Pure natural protein fibers (wool, cashmere, silk) and cellulose fibers (flax linen, cotton, Bemberg).',
      'Zero Waste Cloth Algorithm: Our digital pattern-nesting software maximizes cloth yield, and scrap offcuts are donated to local Kenyan textile apprentices.',
      'Natural Accents: Corozo nut or water buffalo horn buttons rather than plastic synthetics.',
    ],
    tags: ['Ethical Wool', 'Mulesing-Free', 'Sustainability', 'OEKO-TEX', 'Horn Buttons'],
  },

  // 2. GARMENT CARE & LONGEVITY
  {
    id: 'faq-care-dry-cleaning-frequency',
    category: 'care',
    question: 'How frequently should I dry clean my bespoke Nyota. Swerve. Closet suit?',
    answer: 'A bespoke suit should be dry cleaned no more than 1 to 2 times per year, and only when visibly soiled. Standard commercial dry cleaning immersion uses harsh perchlorethylene solvents that strip the natural lanolin oils from merino wool fibers, leaving the cloth brittle, lifeless, and shiny.',
    keyTakeaway: 'Dry clean only 1–2 times annually. Routine care should rely on horsehair brushing and gentle vertical steaming.',
    bulletPoints: [
      'Spot Cleaning: Dab minor liquid spills immediately with cold water and a clean white microfiber cloth.',
      'Natural Airing: Hang your suit in an airy room for 24 hours after wearing to allow ambient air to neutralize body warmth.',
      'Steam Refreshing: Hang your suit in the bathroom while taking a hot shower—the ambient humidity releases wrinkles gently without chemicals.',
    ],
    tags: ['Dry Cleaning', 'Lanolin Oils', 'Wool Care', 'Spot Cleaning'],
  },
  {
    id: 'faq-care-steaming-vs-ironing',
    category: 'care',
    question: 'Why should I steam my suit instead of ironing it at home?',
    answer: 'Direct contact with a hot flat iron crushes the delicate wool fibers and produces an irreversible shiny, glazed appearance on lapels and seams. Furthermore, excessive direct heat can distort the hand-basted horsehair floating canvas inside the jacket chest.',
    keyTakeaway: 'Always use a vertical handheld garment steamer held 1-2 inches away. Never place a hot metal iron plate directly onto fine wool.',
    bulletPoints: [
      'Vertical Steaming: Keep the steamer nozzle 1 to 2 inches from the fabric, allowing the steam to relax wool wrinkles.',
      'Pressing Cloth Essential: If pressing trousers, always lay a damp white 100% cotton tea towel or muslin pressing cloth between the iron and the cloth.',
      'Atelier Steam Service: Nyota. Swerve. Closet clients receive complimentary steam and lapel re-rolling at our Ruiru studio before major events.',
    ],
    tags: ['Steaming', 'No Direct Iron', 'Floating Canvas', 'Pressing Cloth'],
  },
  {
    id: 'faq-care-storage-and-hangers',
    category: 'care',
    question: 'How should I store my suit, and what type of hanger is required?',
    answer: 'Every bespoke suit from Nyota. Swerve. Closet comes equipped with a custom wide-shoulder contoured cedarwood hanger and a breathable 100% cotton canvas garment bag. Storing a bespoke suit on wire or narrow plastic hangers causes the shoulder pads to break down and creates permanent shoulder nipple dimples.',
    keyTakeaway: 'Use 2-inch to 2.5-inch contoured wooden wishbone hangers and breathable cotton garment bags. Avoid airtight plastic covers.',
    bulletPoints: [
      'Contoured Shoulder Flares: Distributes jacket weight across 2.5 inches of curved wood, maintaining the hand-padded shoulder roll.',
      'Natural Cedarwood: Emits natural aromatic oils that deter moths and absorbs ambient closet moisture.',
      'Breathable Canvas Bags: Never leave garments in dry cleaner plastic bags, which trap moisture and cause yellowing.',
    ],
    tags: ['Cedar Hangers', 'Suit Storage', 'Moth Protection', 'Breathable Garment Bag'],
  },
  {
    id: 'faq-care-repairs-adjustments',
    category: 'care',
    question: 'What happens if I lose or gain weight? Do you offer alteration and repair services?',
    answer: 'All Nyota. Swerve. Closet bespoke jackets and trousers are engineered with generous internal inlay fabric allowances (up to 1.5 inches / 4 cm) hidden within the side seams, center back seam, and trouser seat. This allows your suit to be let out or taken in up to two full dress sizes throughout your life.',
    keyTakeaway: 'Every bespoke suit has 1.5 inches of internal inlay allowance and includes 12 months of complimentary structural adjustments.',
    bulletPoints: [
      '12-Month Complimentary Fit Guarantee: Free waist, seat, and sleeve length adjustments during your first full year of ownership.',
      'Lifetime Seam Maintenance: Complimentary button re-anchoring, lining stitch reinforcement, and emergency pressing.',
      'Wardrobe Refurbishment: Inquire about our periodic full-service suit de-pilling, brushing, and steam-sculpting overhaul.',
    ],
    tags: ['Weight Fluctuations', 'Inlay Allowances', 'Lifetime Guarantee', 'Alterations'],
    relatedAction: {
      label: 'Book Fit Adjustment',
      actionType: 'booking',
      target: 'suit-restyling',
    },
  },

  // 3. SERVICE LOCATIONS & NAIROBI CONCIERGE
  {
    id: 'faq-location-westlands-atelier',
    category: 'locations',
    question: 'Where is your atelier, and do I need an appointment?',
    answer: 'Our bespoke styling atelier and master cutting lounge is in Kimbo, Ruiru, Kiambu County. We welcome walk-in visitors during regular hours; however, we strongly recommend booking a private appointment to guarantee dedicated 1-on-1 time with our master tailor in our private fitting suite.',
    keyTakeaway: 'Kimbo, Ruiru. Dedicated private styling lounge, espresso bar, and secure parking.',
    bulletPoints: [
      'Location: Kimbo, Ruiru, Kiambu County.',
      'Hours: Monday to Friday 8:30 AM – 7:00 PM; Saturday 9:00 AM – 6:00 PM; Sunday by appointment.',
      'Amenities: Dedicated underground client parking, biometric private lounge, and a curated library of over 1,200 cloth bolts.',
    ],
    tags: ['Ruiru Atelier', 'Kimbo', 'Kimbo, Ruiru', 'Appointments', 'Parking'],
    relatedAction: {
      label: 'View Atelier on Map',
      actionType: 'locations',
      target: '#contact',
    },
  },
  {
    id: 'faq-location-mobile-concierge-coverage',
    category: 'locations',
    question: 'Which specific estates and business districts in Nairobi are covered by your Mobile Tailor Concierge?',
    answer: 'We provide door-to-door VIP mobile measurement and fitting visits throughout Greater Nairobi. Our master tailors arrive in our equipped concierge vehicle with portable measurement kits, anatomical posture gauges, and complete fabric swatch books.',
    keyTakeaway: 'Complimentary home and office concierge across Karen, Runda, Muthaiga, Lavington, Upper Hill, Westlands, Kilimani, and Gigiri.',
    bulletPoints: [
      'Karen, Lang’ata & Hardy: Private home fittings, garden wedding parties, and residential estates.',
      'Runda, Gigiri, Rosslyn & UN Crescent: Diplomatic compounds, embassies, and expat residences.',
      'Muthaiga & Old Muthaiga: Private estates and exclusive residences.',
      'Upper Hill & CBD: Executive corporate boardrooms, banks, and private equity office visits.',
      'Lavington, Kileleshwa, Riverside & Kilimani: Penthouses, corporate suites, and residential apartments.',
      'Spring Valley, Kyuna & Lower Kabete: Rapid 30-minute concierge dispatch.',
    ],
    tags: ['Mobile Concierge', 'Karen', 'Runda', 'Upper Hill', 'Muthaiga', 'Lavington', 'Doorstep Fitting'],
    relatedAction: {
      label: 'Request Concierge Visit',
      actionType: 'booking',
      target: 'bespoke-suits',
    },
  },
  {
    id: 'faq-location-concierge-fees',
    category: 'locations',
    question: 'Is there an additional charge for the Mobile Tailor Concierge to visit my home or office in Nairobi?',
    answer: 'Our mobile concierge service is completely complimentary within Nairobi for all clients commissioning full bespoke suits, wedding matrimonial packages, or orders totaling KES 35,000 and above. For standalone minor alteration inquiries or single shirt fittings, a nominal KES 1,500 travel deposit is requested, which is 100% credited toward your final garment balance upon confirmation.',
    keyTakeaway: 'Free mobile concierge across Nairobi for all bespoke suit orders. No hidden travel surcharges within city limits.',
    bulletPoints: [
      'Bespoke Suits & Tuxedos: 100% Complimentary home or boardroom fitting visit.',
      'Wedding Parties (Groom & Groomsmen): Complimentary group fitting sessions at your chosen location.',
      'Full In-Person Kit: We bring full bolt swatches, sample silhouettes, lining books, button options, and accurate digital record-keeping.',
    ],
    tags: ['Concierge Fees', 'Complimentary Fitting', 'Boardroom Visit', 'Wedding Fittings'],
  },
  {
    id: 'faq-location-outside-nairobi-delivery',
    category: 'locations',
    question: 'Do you cater to clients outside Nairobi (e.g. Mombasa, Kisumu, Nakuru, Eldoret) or the international diaspora?',
    answer: 'Yes! We actively serve clients across Kenya and the international African diaspora. For clients in Mombasa, Nakuru, Kisumu, Eldoret, and Nanyuki, we provide priority courier dispatch in protective custom wardrobe trunks with door-to-door insurance.',
    keyTakeaway: 'Nationwide tracked courier across Kenya within 24 hours of completion; virtual video sizing for international clients.',
    bulletPoints: [
      'Nationwide Tracked Dispatch: Safely shipped via dedicated secure courier (Fargo Courier / G4S) within 24 hours of final inspection.',
      'Coast & Western Kenya Trunk Shows: Our master tailors host seasonal fitting weekends in Mombasa (Nyali) and Kisumu.',
      'International Diaspora: Virtual video measurement consultations for clients in the UK, USA, UAE, and across the African continent.',
    ],
    tags: ['Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Diaspora', 'Nationwide Delivery'],
  },

  // 4. ORDERS & TURNAROUND
  {
    id: 'faq-turnaround-standard-express',
    category: 'turnaround',
    question: 'What is your standard turnaround time, and do you offer emergency express tailoring in Nairobi?',
    answer: 'Our standard turnaround for a full hand-canvassed bespoke two-piece suit is 4 business days in Nairobi, inclusive of an initial baste fitting. For urgent diplomatic banquets, unexpected funeral attire, or last-minute wedding emergencies, we offer an Express 48-Hour White-Glove VIP Service.',
    keyTakeaway: 'Standard 4 business days. 48-Hour VIP Express service available for urgent events with dedicated workshop overtime.',
    bulletPoints: [
      'Standard Timeline: 4 business days from first measurement to final hand-finished garment delivery.',
      '48-Hour VIP Express: Available with dedicated master tailor priority scheduling (modest express fee applies).',
      'Wedding Timeline Recommendation: We recommend booking matrimonial wedding parties 3 to 4 weeks in advance for leisurely group styling.',
    ],
    tags: ['Turnaround Time', '4 Business Days', '48 Hour Express', 'Wedding Timeline'],
    relatedAction: {
      label: 'Book Express Fitting',
      actionType: 'booking',
      target: 'bespoke-suits',
    },
  },
];
