/**
 * Wedding Details and Master Configuration Data
 * Chi. Vighnesh × Chi. Sou. Rashmitha
 * Wedding Date: 26 November 2026
 */

export const WEDDING_DETAILS = {
  couple: {
    groom: {
      salutation: 'Chi.',
      salutationUpper: 'CHI.',
      name: 'Vighnesh',
      fullName: 'Chi. Vighnesh',
      kannada: 'ಚಿ. ವಿಘ್ನೇಶ್',
      description: 'The Groom',
      parentsRole: 'Son of',
      mother: 'Smt. Divya',
      father: 'Sri Dinesh Prabhu',
      hometown: 'UPPUNDA',
      district: 'Udupi',
    },
    bride: {
      salutation: 'Chi. Sou.',
      salutationUpper: 'CHI. SOU.',
      name: 'Rashmitha',
      fullName: 'Chi. Sou. Rashmitha',
      kannada: 'ಚಿ. ಸೌ. ರಶ್ಮಿತಾ',
      description: 'The Bride',
      parentsRole: 'Daughter of',
      mother: 'Smt. Jayanthi',
      father: 'Late Ramadas S. Pai',
      hometown: 'SANTHEKATTE',
      district: 'Udupi',
    },
    title: 'Chi. Vighnesh × Chi. Sou. Rashmitha',
    titleKannada: 'ಚಿ. ವಿಘ್ನೇಶ್ ಮತ್ತು ಚಿ. ಸೌ. ರಶ್ಮಿತಾ',
  },
  date: {
    display: '26 November 2026',
    day: 'Thursday',
    dayUpper: 'THURSDAY',
    dateNumber: '26',
    month: 'November',
    monthUpper: 'NOVEMBER',
    year: '2026',
    fullDateFormatted: 'Thursday, 26 November 2026',
    kannada: '೨೬ ನವೆಂಬರ್ ೨೦೨೬, ಗುರುವಾರ',
    muhurtham: '11:15 AM',
    muhurthamTitle: 'THE MUHURTHAM',
    lagnam: 'MAKARA LAGNAM',
    lagnamTitle: 'AUSPICIOUS LAGNAM',
    auspiciousDayLabel: 'THE AUSPICIOUS DAY',
  },
  venue: {
    sectionLabel: 'THE WEDDING VENUE',
    name: 'AMMANNI RAMANNA SHETTY MEMORIAL AUDITORIUM',
    nameLine1: 'AMMANNI RAMANNA SHETTY',
    nameLine2: 'MEMORIAL AUDITORIUM',
    city: 'CHITPADY',
    region: 'UDUPI, KARNATAKA',
    location: 'Chitpady, Udupi, Karnataka, India',
    address: 'Chitpady, Udupi, Karnataka, India',
    fullDisplay: 'Ammanni Ramanna Shetty Memorial Auditorium, Chitpady, Udupi, Karnataka, India',
    directionsLabel: 'GET DIRECTIONS',
    supportingNote: 'We look forward to welcoming you',
    // Draft Google Maps destination query — keep centralized until exact pin is confirmed by family
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Ammanni+Ramanna+Shetty+Memorial+Auditorium%2C+Chitpady%2C+Udupi',
    isPinVerified: false,
  },
  shlokas: {
    opening: '|| ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||',
    sanskritInvocation: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    varmalaShloka: 'माङ्गल्यं तन्तुनानेन लोकजीवनहेतुना। कण्ठे बध्नामि सुभगे सञ्जीव शरदः शतम्॥',
    blessingKannada: 'ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು | ಸಮಸ್ತ ಸನ್ಮಂಗಳಾನಿ ಭವಂತು',
  },
};

/**
 * Master Scene Timeline Configuration
 * Defines the normalized scroll ranges [start, end] for all 7 scenes.
 * These ranges represent percentages of total scroll progress [0, 1].
 */
export const SCENE_CONFIG = [
  {
    id: 'opening',
    number: 1,
    name: 'Sacred Invitation',
    title: 'Invitation Opening',
    range: [0.0, 0.12],
    rangePercent: '0% – 12%',
    description: 'Auspicious invocation and grand reveal of the couple',
  },
  {
    id: 'varmala',
    number: 2,
    name: 'Varmala Ceremony',
    title: 'Exchange of Garlands',
    range: [0.12, 0.34],
    rangePercent: '12% – 34%',
    description: 'The sacred union and exchange of floral garlands',
  },
  {
    id: 'groom',
    number: 3,
    name: 'Groom Introduction',
    title: 'Chi. Vighnesh',
    range: [0.34, 0.45],
    rangePercent: '34% – 45%',
    description: 'Introduction and celebration of the groom',
  },
  {
    id: 'bride',
    number: 4,
    name: 'Bride Introduction',
    title: 'Chi. Sou. Rashmitha',
    range: [0.45, 0.56],
    rangePercent: '45% – 56%',
    description: 'Introduction and celebration of the bride',
  },
  {
    id: 'muhurtham',
    number: 5,
    name: 'Auspicious Muhurtham',
    title: 'Wedding Date & Lagnam',
    range: [0.56, 0.70],
    rangePercent: '56% – 70%',
    description: 'Sacred timing, planetary alignments, and Muhurtham',
  },
  {
    id: 'venue',
    number: 6,
    name: 'The Celebration Venue',
    title: 'Venue & Directions',
    range: [0.70, 0.85],
    rangePercent: '70% – 85%',
    description: 'Mandap location and interactive directions',
  },
  {
    id: 'blessings',
    number: 7,
    name: 'Family Blessings',
    title: 'Blessings & Gratitude',
    range: [0.85, 1.0],
    rangePercent: '85% – 100%',
    description: 'Warmest wishes from families and elders',
  },
];

/**
 * Scroll track & Authoritative Cinematic Playhead Controller configuration
 *
 * The visitor controls direction and intention through scrolling, while raw scroll
 * distance is regulated so aggressive wheel/trackpad/touch gestures cannot blast
 * past multiple scenes or erase readable wedding details.
 */
export const SCROLL_SETTINGS = {
  totalScrollTrackVh: 700,
  controller: {
    // Baseline & scene-calibrated constant cruise playback velocities (progress/sec)
    cruiseVelocity: 0.048,
    transitionBridgeVelocity: 0.082,
    cruiseVelocityByScene: {
      opening: 0.056,
      varmala: 0.058,
      groom: 0.044,
      bride: 0.044,
      muhurtham: 0.048,
      venue: 0.050,
      blessings: 0.058,
    },
    // Smooth acceleration & braking envelope (eliminates abrupt starts/stops or exit dashes)
    accelerationPerSec2: 0.26,
    decelerationPerSec2: 0.26,
    settleSmoothing: 13.0,
    // Reverse playback speed (progress/sec): responsive backward scrolling without trapping
    maxReverseVelocity: 0.54,
    // Controlled velocity for explicit direct jumps (Home / End / native scrollbar drag)
    directNavVelocity: 1.25,
    // Lenis wheel / trackpad normalization (2 comfortable wheel scrolls move smoothly to next scene)
    lenisDuration: 0.36,
    wheelSensitivity: 1.72,
    maxInputPerEventPx: 680,
    softKneeInputPx: 260,
    // Max queued lead per isolated aggressive wheel/touch burst (~1.4 scenes ahead)
    maxSingleGestureAdvance: 0.18,
    // Ordered post-reveal readability milestones per scene
    // minReadableMs begins counting ONLY after localProgress >= atLocal (100% visibility)
    // and completes strictly before exit crossfade (gateLocal < 0.88 / 0.918).
    scenes: {
      opening: {
        milestones: [
          { id: 'opening-card', atLocal: 0.35, gateLocal: 0.70, minReadableMs: 1000 },
        ],
      },
      varmala: {
        milestones: [
          { id: 'varmala-garlands', atLocal: 0.56, gateLocal: 0.64, minReadableMs: 800 },
          { id: 'varmala-couple-names', atLocal: 0.87, gateLocal: 0.90, minReadableMs: 1650 },
        ],
      },
      groom: {
        milestones: [
          { id: 'groom-hometown-udupi', atLocal: 0.80, gateLocal: 0.855, minReadableMs: 1700 },
        ],
      },
      bride: {
        milestones: [
          { id: 'bride-hometown-udupi', atLocal: 0.80, gateLocal: 0.855, minReadableMs: 1700 },
        ],
      },
      muhurtham: {
        milestones: [
          { id: 'muhurtham-full-schedule', atLocal: 0.85, gateLocal: 0.868, minReadableMs: 1700 },
        ],
      },
      venue: {
        milestones: [
          { id: 'venue-full-directions', atLocal: 0.84, gateLocal: 0.865, minReadableMs: 1700 },
        ],
      },
      blessings: {
        milestones: [],
      },
    },
  },
};

