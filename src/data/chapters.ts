import { ChapterMetadata } from '../types/encyclopedia';

import plate01 from '../assets/images/chapter_01_cosmology_1794580992802.jpg';
import plate02 from '../assets/images/chapter_02_geology_1794580993511.jpg';
import plate03 from '../assets/images/chapter_03_oceans_1794580993708.jpg';
import plate04 from '../assets/images/chapter_04_weather_1794580994235.jpg';
import plate05 from '../assets/images/chapter_05_botany_1794580994893.jpg';
import plate06 from '../assets/images/chapter_06_zoology_1794580995283.jpg';
import plate07 from '../assets/images/chapter_07_human_biology_1794580995580.jpg';
import plate08 from '../assets/images/chapter_08_health_1794580995747.jpg';
import plate09 from '../assets/images/chapter_09_psychology_1794580996846.jpg';
import plate10 from '../assets/images/chapter_10_social_ethics_1794580996939.jpg';

export const CHAPTERS: ChapterMetadata[] = [
  {
    id: 'chapter-01',
    number: 1,
    paddedNumber: '01',
    slug: 'cosmology-and-space',
    title: 'Cosmology and Space',
    shortTitle: 'Cosmology & Space',
    plateLabel: 'Plate I',
    artworkSrc: plate01,
    artworkAlt: 'Classic astronomy artwork showing spiral galaxies, planetary orbits, and starry circles.',
    descriptionPlaceholder:
      'How the universe began and stretches outward, how stars shine, and how Sun and Moon orbits mark our days.',
    editorialScopePlaceholder:
      'Chapter 01 explores fifty space topics—from the early universe and starlight to lunar phases and Earth’s sky shield—alongside Qur’anic verses and classical commentaries.',
    expectedTopicCount: 50,
    themeKey: 'cosmology',
    theme: {
      accentHexDark: '#D4B46A',
      accentHexLight: '#8E6B23',
      atmosphereTintDark: 'rgba(14, 34, 48, 0.42)',
      atmosphereTintLight: 'rgba(218, 226, 232, 0.35)',
      disciplineLabel: 'Space, Stars & Orbits',
      motifType: 'astrolabe',
    },
  },
  {
    id: 'chapter-02',
    number: 2,
    paddedNumber: '02',
    slug: 'earths-geology-and-mountains',
    title: "Earth's Geology and Mountains",
    shortTitle: 'Geology & Mountains',
    plateLabel: 'Plate II',
    artworkSrc: plate02,
    artworkAlt: 'Geological cross-section artwork showing mountain peaks and deep underground rock layers.',
    descriptionPlaceholder:
      'Moving rocky plates, deep mountain roots, colourful rock layers, soil, iron, and earthquakes.',
    editorialScopePlaceholder:
      'Chapter 02 explores fifty Earth topics—from mountain roots and moving crust plates to mineral layers, soil, and earthquakes—alongside trusted geology and classical Qur’anic notes.',
    expectedTopicCount: 50,
    themeKey: 'geology',
    theme: {
      accentHexDark: '#C8A253',
      accentHexLight: '#7D5C1E',
      atmosphereTintDark: 'rgba(28, 36, 28, 0.42)',
      atmosphereTintLight: 'rgba(229, 223, 210, 0.42)',
      disciplineLabel: 'Earth, Rocks & Mountains',
      motifType: 'strata',
    },
  },
  {
    id: 'chapter-03',
    number: 3,
    paddedNumber: '03',
    slug: 'oceans-seas-and-water',
    title: 'Oceans, Seas and Water',
    shortTitle: 'Oceans & Water',
    plateLabel: 'Plate III',
    artworkSrc: plate03,
    artworkAlt: 'Ocean engraving showing deep sea currents, fading sunlight underwater, and sea life.',
    descriptionPlaceholder:
      'Ocean water layers, fresh-and-salty river boundaries, deep underwater waves, rain cycles, and floating ships.',
    editorialScopePlaceholder:
      'Chapter 03 explores fifty water and ocean topics—from why living cells need water and how rain circles Earth to dark ocean depths, hidden waves, and buoyancy.',
    expectedTopicCount: 50,
    themeKey: 'oceans',
    theme: {
      accentHexDark: '#7EB8AE',
      accentHexLight: '#175E54',
      atmosphereTintDark: 'rgba(8, 42, 46, 0.46)',
      atmosphereTintLight: 'rgba(212, 230, 228, 0.36)',
      disciplineLabel: 'Oceans, Rivers & Rain',
      motifType: 'wave',
    },
  },
  {
    id: 'chapter-04',
    number: 4,
    paddedNumber: '04',
    slug: 'weather-and-atmospheric-science',
    title: 'Weather and Atmospheric Science',
    shortTitle: 'Atmosphere & Weather',
    plateLabel: 'Plate IV',
    artworkSrc: plate04,
    artworkAlt: 'Weather illustration depicting sky layers, tall thunderclouds, and blowing winds.',
    descriptionPlaceholder:
      'Winds carrying rain and pollen, towering storm clouds, lightning, hailstones, and our upper air shield.',
    editorialScopePlaceholder:
      'Chapter 04 surveys fifty weather and sky topics—covering winds, cloud building, rain, hailstorms, lightning, and how the atmosphere protects life below.',
    expectedTopicCount: 50,
    themeKey: 'weather',
    theme: {
      accentHexDark: '#C4B38A',
      accentHexLight: '#475569',
      atmosphereTintDark: 'rgba(20, 34, 42, 0.44)',
      atmosphereTintLight: 'rgba(222, 228, 234, 0.38)',
      disciplineLabel: 'Winds, Clouds & Weather',
      motifType: 'barometric',
    },
  },
  {
    id: 'chapter-05',
    number: 5,
    paddedNumber: '05',
    slug: 'plants-agriculture-and-botany',
    title: 'Plants, Agriculture and Botany',
    shortTitle: 'Botany & Agriculture',
    plateLabel: 'Plate V',
    artworkSrc: plate05,
    artworkAlt: 'Botanical illustration of olive branch, date palm leaf, plant roots, and stem vessels.',
    descriptionPlaceholder:
      'How seeds wake up, how leaves make food from sunlight, wind and bee pollination, soil care, and harvests.',
    editorialScopePlaceholder:
      'Chapter 05 explores fifty plant and farming topics—from sprouting seeds and water pipes inside stems to pollination, varied fruits, and caring for soil.',
    expectedTopicCount: 50,
    themeKey: 'botany',
    theme: {
      accentHexDark: '#9BC18D',
      accentHexLight: '#28593A',
      atmosphereTintDark: 'rgba(13, 40, 26, 0.45)',
      atmosphereTintLight: 'rgba(218, 231, 219, 0.38)',
      disciplineLabel: 'Plants, Seeds & Farming',
      motifType: 'botanical',
    },
  },
  {
    id: 'chapter-06',
    number: 6,
    paddedNumber: '06',
    slug: 'animals-and-biological-systems',
    title: 'Animals and Biological Systems',
    shortTitle: 'Animals & Systems',
    plateLabel: 'Plate VI',
    artworkSrc: plate06,
    artworkAlt: 'Zoological engraving of bird wings in flight and hexagonal honeycomb cells.',
    descriptionPlaceholder:
      'How birds fly, how honeybees and ants work together, spider silk, cow milk, and desert camels.',
    editorialScopePlaceholder:
      'Chapter 06 investigates fifty animal topics—from bird flight and female worker bees to ant scent trails, cattle digestion, and how camels thrive in deserts.',
    expectedTopicCount: 50,
    themeKey: 'zoology',
    theme: {
      accentHexDark: '#D4B46A',
      accentHexLight: '#7E5D1A',
      atmosphereTintDark: 'rgba(26, 36, 22, 0.42)',
      atmosphereTintLight: 'rgba(232, 228, 212, 0.38)',
      disciplineLabel: 'Animals & Nature Systems',
      motifType: 'symmetry',
    },
  },
  {
    id: 'chapter-07',
    number: 7,
    paddedNumber: '07',
    slug: 'human-biology-and-embryology',
    title: 'Human Biology and Embryology',
    shortTitle: 'Biology & Embryology',
    plateLabel: 'Plate VII',
    artworkSrc: plate07,
    artworkAlt: 'Anatomical illustration showing blood vessels, human proportions, and microscopic cells.',
    descriptionPlaceholder:
      'How a baby grows in the womb, how heart, brain, eyes, and skin senses work, fingerprints, and growing older.',
    editorialScopePlaceholder:
      'Chapter 07 explores fifty human-body topics—from early growth inside the womb and the placenta lifeline to skin pain sensors, fingertips, and every stage of life.',
    expectedTopicCount: 50,
    themeKey: 'biology',
    theme: {
      accentHexDark: '#D9A773',
      accentHexLight: '#7C4D25',
      atmosphereTintDark: 'rgba(34, 26, 24, 0.42)',
      atmosphereTintLight: 'rgba(236, 226, 216, 0.4)',
      disciplineLabel: 'Human Body & Growth',
      motifType: 'vitruvian',
    },
  },
  {
    id: 'chapter-08',
    number: 8,
    paddedNumber: '08',
    slug: 'health-hygiene-nutrition-and-fasting',
    title: 'Health, Hygiene, Nutrition and Fasting',
    shortTitle: 'Health & Nutrition',
    plateLabel: 'Plate VIII',
    artworkSrc: plate08,
    artworkAlt: 'Classic health and daily rhythm plate showing sunlight hours, water vessels, and healing plants.',
    descriptionPlaceholder:
      'Handwashing and clean water, balanced eating, breastfeeding, honey research, and how Ramadan fasting affects the body.',
    editorialScopePlaceholder:
      'Chapter 08 evaluates fifty health topics across clean hygiene, safe drinking water, nutrition, honey limits, and fasting physiology with clear medical safety boundaries.',
    expectedTopicCount: 50,
    themeKey: 'health',
    theme: {
      accentHexDark: '#C8B06B',
      accentHexLight: '#2A5C45',
      atmosphereTintDark: 'rgba(14, 38, 30, 0.44)',
      atmosphereTintLight: 'rgba(224, 232, 224, 0.38)',
      disciplineLabel: 'Health, Food & Fasting',
      motifType: 'equilibrium',
    },
  },
  {
    id: 'chapter-09',
    number: 9,
    paddedNumber: '09',
    slug: 'human-psychology-and-behaviour',
    title: 'Human Psychology and Behaviour',
    shortTitle: 'Psychology & Behaviour',
    plateLabel: 'Plate IX',
    artworkSrc: plate09,
    artworkAlt: 'Mind and perception artwork depicting branching nerve connections and light prisms.',
    descriptionPlaceholder:
      'Handling stress, gratitude, calming anger, spotting false rumours, building good habits, and supporting others.',
    editorialScopePlaceholder:
      'Chapter 09 examines fifty topics in mind and behaviour—keeping spiritual hope and everyday psychology clear while highlighting caring mental-health safeguards.',
    expectedTopicCount: 50,
    themeKey: 'psychology',
    theme: {
      accentHexDark: '#B8A8D4',
      accentHexLight: '#493D6B',
      atmosphereTintDark: 'rgba(24, 24, 40, 0.42)',
      atmosphereTintLight: 'rgba(226, 224, 235, 0.36)',
      disciplineLabel: 'Mind, Feelings & Habits',
      motifType: 'neural',
    },
  },
  {
    id: 'chapter-10',
    number: 10,
    paddedNumber: '10',
    slug: 'social-life-ethics-and-everyday-practices',
    title: 'Social Life, Ethics and Everyday Practices',
    shortTitle: 'Social Life & Ethics',
    plateLabel: 'Plate X',
    artworkSrc: plate10,
    artworkAlt: 'Architectural illustration of a balanced courtyard, stone arches, and scales of fairness.',
    descriptionPlaceholder:
      'Fairness and honest weights, written agreements, family care, guarding privacy, stopping rumours, and community trust.',
    editorialScopePlaceholder:
      'Chapter 10 looks at fifty topics in community life and everyday ethics—connecting Qur’anic principles of fairness, honesty, and care with real-world social studies.',
    expectedTopicCount: 50,
    themeKey: 'social',
    theme: {
      accentHexDark: '#D4B46A',
      accentHexLight: '#785723',
      atmosphereTintDark: 'rgba(28, 30, 22, 0.42)',
      atmosphereTintLight: 'rgba(234, 227, 213, 0.42)',
      disciplineLabel: 'Community, Fairness & Ethics',
      motifType: 'tessellation',
    },
  },
];
