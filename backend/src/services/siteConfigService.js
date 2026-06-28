const SiteConfig = require('../models/SiteConfig');

const defaultConfigs = [
  {
    sectionKey: 'hero',
    content: {
      tagline: 'SHOOT @ SIGHT // THE ART OF PRESERVATION',
      line1Main: "We Don't Just",
      line1Italic: 'Capture',
      line1End: 'Weddings.',
      line2Main: 'We Preserve',
      line2Highlight: 'Emotions',
      line2End: 'Forever.',
      videoUrl: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/Naveen%20%26%20Kate%204K%20Teaser.mp4',
      bgImage: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC2178_-_Copy.webp'
    }
  },
  {
    sectionKey: 'about_philosophy',
    content: {
      tagline: '01 // OUR PHILOSOPHY',
      titleMain: 'The Art',
      titleHighlight: 'Observing',
      pLead: 'We approach each wedding not as a checklist, but as a living, breathing narrative. Our lenses are drawn to the quiet glances, the unscripted laughter, and the fleeting tears.',
      pBody: "We believe the most profound moments aren't the ones directed, but the ones discovered. Our approach is quiet, immersive, and deeply intentional.",
      stat1Num: '10+',
      stat1Label: 'YEARS OF MASTERY',
      stat2Num: '500+',
      stat2Label: 'ETERNAL STORIES',
      img1: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/SYD08443%20(3).jpg.webp',
      img2: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/DSC_0347-_2_.jpg.webp',
      img3: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/NGD_5981-_1_.jpg.webp'
    }
  },
  {
    sectionKey: 'services',
    content: {
      tagline: 'CRAFT & MASTERY',
      titleMain: 'Our',
      titleHighlight: 'Signature',
      titleEnd: 'Services',
      list: [
        {
          num: '01',
          title: 'Wedding Photography',
          desc: 'Candid, emotional, and trend-forward photography that captures the soul of your celebration. We specialize in natural expressions, ethereal lighting, and storytelling frames that preserve your most intimate memories forever.',
          img: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/VIJ01478.jpg.webp'
        },
        {
          num: '02',
          title: 'Cinematic Wedding Films',
          desc: 'High-definition movies inspired by your unique love story. With artistic angles, cinematic drone perspectives, emotional pacing, and professional-grade color grading, we turn your wedding day into a timeless motion picture experience.',
          img: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/DSC_9199-2.jpg.webp'
        },
        {
          num: '03',
          title: 'Pre-Wedding & Engagement',
          desc: 'A bespoke, conceptual shoot that reflects the essence of your partnership. Whether urban, nature-focused, luxury, or minimalist aesthetic — we curate mood-driven visuals designed for your legacy and invites.',
          img: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/DSC00238-Edit%20(1).jpg.webp'
        },
        {
          num: '04',
          title: 'Drone & Aerial Coverage',
          desc: 'Sweeping aerial views that provide a grand perspective of your wedding story. From majestic heritage venues to scenic outdoor landscapes, our advanced drone cinematography adds a breathtaking dimension to your visuals.',
          img: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/DJI_20260429175238_0374_D-_1_.jpg.webp'
        }
      ]
    }
  },
  {
    sectionKey: 'experience',
    content: {
      tagline: '02 // THE EXPERIENCE',
      titleMain: 'How We',
      titleHighlight: 'Manifest',
      titleEnd: 'Magic',
      subtitle: 'Three deliberate phases, crafted to create timeless imagery.',
      phases: [
        {
          num: 'Phase 01 // Curation',
          heading: 'The Curation',
          desc: 'We begin by understanding the soul of your story, selecting the perfect aesthetic tone and light for your unique celebration.',
          tags: ['Moodboarding', 'Lighting Design', 'Styling Harmony'],
          img: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC4382.webp'
        },
        {
          num: 'Phase 02 // Capture',
          heading: 'The Capture',
          desc: 'Discreet, immersive, and refined. We capture the moments that feel like a whisper, and the ones that roar across time.',
          tags: ['Discreet Presence', 'Candid Emotion', 'Cinematic Framing'],
          img: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/KRP_9557.jpg.webp'
        },
        {
          num: 'Phase 03 // Heirloom',
          heading: 'The Heirloom',
          desc: 'Final delivery of high-fidelity, processed imagery designed to last for generations. Your legacy, preserved in light.',
          tags: ['Color Grading', 'Fine Art Prints', 'Digital Vault'],
          img: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/DSC_8454.jpg.webp'
        }
      ]
    }
  },
  {
    sectionKey: 'featured_film',
    content: {
      filmId: 'a94LGkUt3Pg',
      tagline: '03 // FEATURED FILMS',
      headingMain: 'Cinematic',
      headingHighlight: 'Poetry',
      description: 'Experience the raw emotion, the fleeting glances, and the symphony of love in motion.',
      buttonText: 'View Films'
    }
  },
  {
    sectionKey: 'cta',
    content: {
      headingMain: "Let's create",
      headingHighlight: 'eternal',
      subtext: 'Now booking luxury wedding experiences for 2026/27.',
      bgText: 'CONTACT',
      buttonText: 'Start a Conversation',
      bgImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070'
    }
  },
  {
    sectionKey: 'films_page',
    content: {
      tagline: '03 // FEATURED FILMS',
      headingMain: 'Cinematic',
      headingHighlight: 'Poetry',
      description: 'Experience the raw emotion, the fleeting glances, and the symphony of love in motion. Click any film to watch with full audio.',
      list: [
        {
          id: 'E6mpqvgMyUY',
          label: "DIRECTOR'S CUT",
          location: 'DUBAI',
          num: '01'
        },
        {
          id: 'wLqHwzM9ABo',
          label: 'CINEMATIC ESSENCE',
          location: 'INDIA',
          num: '02'
        },
        {
          id: 'a94LGkUt3Pg',
          label: 'THE SYMPHONY',
          location: 'INDIA',
          num: '03'
        },
        {
          id: 'b58Iizh8Dfg',
          label: 'ETERNAL NARRATIVE',
          location: 'INDIA',
          num: '04'
        }
      ]
    }
  },
  {
    sectionKey: 'about_page',
    content: {
      heroBg: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/DSC01641_-_Copy.webp',
      heroTitleMain: 'The Story Behind',
      heroTitleHighlight: 'The Light',
      heroTagline: 'SHOOT @ SIGHT // ARCHITECTS OF TIMELESS MEMORIES',
      founderImg: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/founder%20(1).webp',
      founderTagline: 'CREATIVE DIRECTOR // PAVITRA',
      founderName: 'Pavithra',
      founderSub: 'Lead Visual Director & Founder',
      founderQuote: 'We do not merely take photographs. We curate the timeless',
      founderQuoteHighlight: 'poetry',
      founderQuoteEnd: 'of your celebration.',
      founderBio1: 'As the visionary behind Shoot @ Sight, Pavithra has spent nearly a decade redefining high-end wedding storytelling. Merging the aesthetics of global fashion editorial with the deep emotion of candid photojournalism, she crafts a cinematic lookbook for couples who view their celebration as a living legacy.',
      founderBio2: 'Her signature methodology is marked by an intuitive anticipation of candid glances, true-to-life processing, and a mastery over natural, ethereal lighting. With camera in hand, Pavithra blends seamlessly into the architecture of your day, capturing whispers that would otherwise be lost to time.',
      pillar1Title: 'Cinematic Intuition',
      pillar1Desc: 'Reading the room, anticipating micro-moments, and capturing raw, unposed emotions.',
      pillar2Title: 'Editorial Polish',
      pillar2Desc: 'Crafting stylized, Vogue-ready portraits on-site that feel elegant and modern.',
      signatureTitle: 'FOUNDER // SHOOT @ SIGHT',
      studioTagline: '02 // THE STUDIO',
      studioTitleMain: 'Curating',
      studioTitleHighlight: 'Legacy',
      studioTitleEnd: 'Through Light.',
      studioDesc: 'Founded in 2018, Shoot @ Sight is a boutique photography studio specializing in high-end, editorial wedding narratives. We believe your story deserves to be told with the intentionality of fine art.',
      teamImg: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/team.webp',
      teamCaption: 'The Shoot @ Sight Creative Collective, 2026',
      philosophyBg: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/camera_lens_detail.webp',
      philosophyTagline: 'INTENTIONAL // TIMING // RAW',
      philosophyTitleMain: 'The',
      philosophyTitleHighlight: 'Philosophy',
      philosophyPillars: [
        {
          num: '01 /',
          title: 'Intentionality',
          desc: 'We do not believe in spray-and-pray. Every single frame is composed with meticulous purpose, ensuring a cohesive, editorial fine-art narrative throughout your entire collection.'
        },
        {
          num: '02 /',
          title: 'Fidelity',
          desc: 'Utilizing state-of-the-art lossless processing and color curation, we ensure that natural skin tones, fine fabric textures, and raw emotions remain true to life for generations.'
        },
        {
          num: '03 /',
          title: 'Timelessness',
          desc: 'We completely avoid fleeting, heavily-filtered coloring trends. Our classic, cinematic styling guarantees your gallery looks as breathtaking in fifty years as it does today.'
        }
      ],
      closingQuote: 'Photography is the only language that can be understood anywhere in the world.',
      closingSignature: 'Shoot @ Sight'
    }
  },
  {
    sectionKey: 'contact_page',
    content: {
      contactImg: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_3280.webp',
      tagline: '05 // THE INITIATION',
      heroTitleMain: 'For those who value',
      heroTitleHighlight: 'legacy over pixels.',
      pBold: 'We do not accommodate traditional wedding checklists. We do not manufacture fake poses.',
      pLight: 'We exist exclusively for couples who view their celebration as an uninhibited editorial work of art. Our visual signature is raw, cinematic, and unapologetic. We capture the high-fashion drama, the unscripted whispers, and the grand architectural scaling of your love.',
      pGold: 'If you are ready to move past standard imagery and immortalize your history as a living masterpiece, let’s begin.',
      verticalLabel: 'HIGH END EDITORIAL // RAW EMOTION',
      studioInfo: 'Bengaluru, India // Global Commissions',
      email: 'shootatsightweddings@gmail.com',
      phone: '+91 9900233338',
      formTitle: 'Start a Conversation',
      formSub: 'We accept limited bookings annually to protect our artistic devotion.'
    }
  }
];

const getSiteConfig = async () => {
  let configs = await SiteConfig.find().maxTimeMS(3000).lean();
  
  // Auto-seed database if empty
  if (configs.length === 0) {
    await SiteConfig.insertMany(defaultConfigs);
    configs = await SiteConfig.find().maxTimeMS(3000).lean();
  }

  // Format as a simple key-value map for the frontend to consume easily
  const configMap = {};
  configs.forEach(c => {
    configMap[c.sectionKey] = c.content;
  });
  
  return configMap;
};

const updateSectionConfig = async (sectionKey, updates) => {
  let doc = await SiteConfig.findOne({ sectionKey });
  if (!doc) {
    // If it doesn't exist, create it from default template
    const def = defaultConfigs.find(d => d.sectionKey === sectionKey);
    doc = new SiteConfig({
      sectionKey,
      content: def ? { ...def.content, ...updates } : updates
    });
  } else {
    // Update the Map contents in the document
    doc.content = { ...doc.content, ...updates };
  }
  return doc.save();
};

module.exports = {
  getSiteConfig,
  updateSectionConfig
};
