export type AppearanceMode = 'dark' | 'light';

export type ChapterThemeKey =
  | 'cosmology'
  | 'geology'
  | 'oceans'
  | 'weather'
  | 'botany'
  | 'zoology'
  | 'biology'
  | 'health'
  | 'psychology'
  | 'social';

export type EvidenceGradeLetter = 'A' | 'B' | 'C' | 'D';

export type CosmologyDiagramKind =
  | 'big-bang-timeline'
  | 'cosmic-expansion'
  | 'early-plasma-recombination'
  | 'cosmic-hierarchy'
  | 'cosmic-fate-scenarios'
  | 'stellar-lifecycle'
  | 'celestial-navigation'
  | 'orbital-mechanics'
  | 'solar-galactic-motion'
  | 'sun-moon-comparison'
  | 'lunar-phases-eclipses'
  | 'earth-rotation-day-night'
  | 'atmosphere-shield'
  | 'scientific-observation';

export type GeologyDiagramKind =
  | 'earth-habitable-zones'
  | 'mountain-isostasy-roots'
  | 'plate-tectonics-collision'
  | 'mountain-mineral-strata'
  | 'mountain-passes-watersheds'
  | 'rock-excavation-weathering'
  | 'erosion-mass-wasting'
  | 'earthquake-fault-mechanics'
  | 'geologic-time-strata'
  | 'soil-hydrology-aquifer'
  | 'clay-weathering-ceramics'
  | 'iron-metallurgy'
  | 'earth-interior-layers';

export type OceansDiagramKind =
  | 'water-cellular-biology'
  | 'global-water-cycle'
  | 'rain-soil-vegetation'
  | 'groundwater-aquifer-springs'
  | 'river-drainage-basin'
  | 'rainwater-quality-hygiene'
  | 'freshwater-vs-seawater'
  | 'estuary-salinity-mixing'
  | 'ocean-photic-zones'
  | 'ocean-wave-systems'
  | 'storm-waves-surge-tsunami'
  | 'ship-buoyancy-displacement'
  | 'maritime-navigation-routes'
  | 'marine-food-web-fisheries'
  | 'pearl-nacre-deposition'
  | 'coral-reef-anatomy';

export type WeatherDiagramKind =
  | 'wind-cloud-transport'
  | 'cloud-formation-convection'
  | 'cloud-morphology-layers'
  | 'precipitation-coalescence'
  | 'cloud-droplet-microphysics'
  | 'atmospheric-water-budget'
  | 'soil-moisture-ecological-renewal'
  | 'moisture-transport-winds'
  | 'wind-pollination-aerosols'
  | 'atmospheric-circulation-belts'
  | 'lightning-charge-separation'
  | 'lightning-thunder-acoustics'
  | 'hail-updraft-growth'
  | 'cumulonimbus-storm-cell'
  | 'thunderstorm-lifecycle-hazards'
  | 'severe-wind-storms'
  | 'wet-deposition-water-quality'
  | 'atmosphere-layers-uv-protection'
  | 'cloud-radiative-energy-balance'
  | 'thermal-shelter-radiation'
  | 'rainfall-groundwater-replenishment';

export type PlantsDiagramKind =
  | 'plant-structure-organs'
  | 'xylem-phloem-water-transport'
  | 'photosynthesis-light-co2'
  | 'seed-anatomy-embryo'
  | 'seed-germination-stages'
  | 'plant-growth-requirements'
  | 'plant-reproductive-diversity'
  | 'fertilisation-seed-development'
  | 'wind-pollination-anemophily'
  | 'animal-assisted-pollination'
  | 'honeybee-biology-nesting'
  | 'fruit-formation-ripening'
  | 'fruit-diversity-traits'
  | 'date-palm-inflorescence'
  | 'cereal-grain-structures'
  | 'soil-layers-root-interaction'
  | 'plant-water-drought-stress'
  | 'crop-growth-stages'
  | 'plant-diversity-forms'
  | 'garden-orchard-ecosystem'
  | 'tree-canopy-ecosystem'
  | 'grassland-forage-senescence'
  | 'plant-pigments-light';

export type AnimalsDiagramKind =
  | 'animal-biodiversity-classification'
  | 'animal-habitat-diversity'
  | 'animal-body-water-biology'
  | 'terrestrial-locomotion-forms'
  | 'bird-wing-anatomy'
  | 'bird-flight-aerodynamics'
  | 'bird-flocking-formations'
  | 'bird-vocal-communication'
  | 'ant-colony-organisation'
  | 'ant-chemical-signalling'
  | 'social-insect-collective-defence'
  | 'honeybee-colony-castes'
  | 'honeybee-foraging-navigation'
  | 'bee-flower-pollination'
  | 'honey-enzymatic-formation'
  | 'spider-silk-web-architecture'
  | 'fly-vs-mosquito-biology'
  | 'ruminant-digestive-compartments'
  | 'mammalian-lactation-synthesis'
  | 'camel-foot-sand-locomotion'
  | 'camel-water-conservation'
  | 'animal-reproductive-diversity'
  | 'fertilisation-early-embryogenesis'
  | 'parental-care-food-webs';

export type HumanBiologyDiagramKind =
  | 'human-elemental-composition'
  | 'gametes-fertilization-zygote'
  | 'uterine-implantation-early'
  | 'embryonic-sequential-stages'
  | 'alaqah-terminology-caution'
  | 'mudghah-terminology-caution'
  | 'gastrulation-germ-layers'
  | 'musculoskeletal-overlap'
  | 'organogenesis-body-plan'
  | 'three-darknesses-membranes'
  | 'placenta-maternal-exchange'
  | 'umbilical-cord-circulation'
  | 'neural-tube-neurulation'
  | 'cardiac-embryology-overview'
  | 'sensory-systems-development'
  | 'brain-heart-distinction'
  | 'lifespan-weakness-strength-decline'
  | 'human-variation-proportion'
  | 'skin-sensory-nociception'
  | 'fingerprint-friction-ridges'
  | 'reproductive-anatomy-contribution'
  | 'pregnancy-childbirth-maternal'
  | 'lactation-weaning-nutrition'
  | 'nourishment-vulnerability-dependence';

export type HealthHygieneDiagramKind =
  | 'wudu-purification-areas'
  | 'skin-barrier-hygiene'
  | 'water-purification-contamination'
  | 'clean-vs-contaminated-water'
  | 'food-safety-contamination'
  | 'food-production-to-consumption'
  | 'dietary-diversity-moderation'
  | 'fruits-vegetables-nutrients'
  | 'cereal-grain-structure'
  | 'mammalian-lactation-overview'
  | 'honey-composition-floral'
  | 'honey-lab-vs-clinical'
  | 'honey-medical-vs-kitchen'
  | 'spiritual-vs-medical-healing'
  | 'ramadan-daily-fasting-timeline'
  | 'ramadan-vs-intermittent-fasting'
  | 'fasting-metabolic-adaptation'
  | 'blood-glucose-regulation-overview'
  | 'hydration-fluid-balance'
  | 'suhoor-iftar-meal-timing'
  | 'fasting-sleep-routine-travel'
  | 'diabetes-fasting-considerations'
  | 'pregnancy-fasting-uncertainty'
  | 'alcohol-general-health-effects'
  | 'dates-nutritional-components';

export type HumanPsychologyDiagramKind =
  | 'emotional-wellbeing-meaning'
  | 'hope-adversity-coping'
  | 'stress-coping-strategies'
  | 'gratitude-wellbeing'
  | 'emotion-regulation-anger'
  | 'forgiveness-boundaries'
  | 'social-cognition-suspicion'
  | 'gossip-trust-reputation'
  | 'information-verification-credibility'
  | 'self-awareness-reflection'
  | 'impulse-control-self-regulation'
  | 'moral-self-discipline'
  | 'humility-social-interaction'
  | 'grief-emotional-responses'
  | 'fear-uncertainty-coping'
  | 'decision-making-consultation'
  | 'habit-formation-reinforcement'
  | 'social-companionship-influence'
  | 'social-support-cooperation'
  | 'reconciliation-conflict-resolution'
  | 'compassion-helping-behaviour'
  | 'delayed-gratification'
  | 'deception-and-trust'
  | 'human-differences-perception';

export type SocialLifeEthicsDiagramKind =
  | 'justice-fairness-framework'
  | 'impartial-judgment-bias'
  | 'institutional-trust-accountability'
  | 'agreements-responsibility-cycle'
  | 'honest-measurement-exchange'
  | 'fraud-consumer-protection'
  | 'mutual-consent-transactions'
  | 'written-debt-record'
  | 'documentation-witness-framework'
  | 'charity-social-support'
  | 'responsible-resource-use'
  | 'family-consultation-process'
  | 'child-welfare-protection'
  | 'orphan-property-protection'
  | 'neighbourhood-support-network'
  | 'privacy-personal-boundaries'
  | 'permission-respectful-access'
  | 'verification-before-sharing'
  | 'rumour-vs-verified-reporting'
  | 'conflict-resolution-reconciliation'
  | 'beneficial-vs-harmful-cooperation'
  | 'human-dignity-diversity'
  | 'consultation-responsible-leadership'
  | 'shared-resource-stewardship';

export type DiagramKind =
  | CosmologyDiagramKind
  | GeologyDiagramKind
  | OceansDiagramKind
  | WeatherDiagramKind
  | PlantsDiagramKind
  | AnimalsDiagramKind
  | HumanBiologyDiagramKind
  | HealthHygieneDiagramKind
  | HumanPsychologyDiagramKind
  | SocialLifeEthicsDiagramKind;

export interface VerifiedScientificFact {
  id: string;
  label: string;
  value: string;
  epistemicStatus: 'Measured' | 'Exact Definition' | 'Model Estimate';
  uncertaintyOrContext?: string;
  sourceInstitution: string;
  sourceTitle: string;
  sourceUrl: string;
}

export interface ScienceGlossaryWord {
  term: string;
  meaning: string;
}

export interface TopicEnrichment {
  topicId: string;
  introExplanation: string;
  whatItMeans: string;
  diagramKind: DiagramKind;
  diagramTitle: string;
  diagramCaption: string;
  factIds: string[];
  everydayExample?: string;
  quranSimpleMeaning?: string;
  rememberPoints?: string[];
  keyScienceWords?: ScienceGlossaryWord[];
  psychologicalConcept?: string;
  quranicEthicalConnection?: string;
  findingsVsInterpretation?: string;
  takeaway?: string;
  tags?: string[];
}

export interface VerifiedVersePassage {
  reference: string;
  surahNumber: number;
  surahNameSimple: string;
  surahNameArabic: string;
  surahTranslatedName: string;
  revelationPlace: string;
  verseNumbers: string;
  arabicText: string;
  translationText: string;
  translator: string;
  translationSource: string;
  sourceUrl: string;
}

export interface RawTafsirSource {
  scholar: string;
  work: string;
  summary: string;
  source_url: string;
  covered_verses?: string;
  verification_note?: string;
}

export type SourceAuditClassification =
  | 'General scientific background'
  | 'Topic-specific source lead'
  | 'Source-scope mismatch'
  | 'Awaiting direct source verification'
  | 'Topic-specific institutional or scientific source'
  | 'General scientific or public-health background'
  | 'Research database or literature-search portal'
  | 'Source-scope mismatch or insufficiently specific source'
  | "Qur'anic or classical-tafsir reference resource"
  | 'Topic-specific peer-reviewed research or systematic review'
  | 'Authoritative mental-health or psychology institutional background'
  | 'Psychology dictionary or conceptual reference'
  | 'Broad research-informed educational resource'
  | 'General institutional homepage or topic directory'
  | 'Broad institutional research and policy resource'
  | 'International framework and data resource'
  | 'Academic discovery portal (Google Scholar)'
  | 'Compiled datasets and research summaries';

export interface RawEvidenceSource {
  source_id: string;
  title: string;
  author_or_institution: string;
  year: number | null;
  url: string;
  what_it_supports: string;
  source_warning?: string;
  audit_classification?: SourceAuditClassification;
  verification_pending_note?: string;
}

/**
 * Unified chapter dataset shape rendered by FolioRenderer.
 * Preserves all original scholarship, grades, and limitations verbatim.
 */
export interface RawDatasetEntry {
  id: string;
  title: string;
  quran_reference: string;
  scientific_topic: string;
  scientific_finding: string;
  connection: string;
  limitations: string;
  evidence_grade: EvidenceGradeLetter;
  research_status: string;
  quranic_evidence: {
    references: string[];
    verse_text_arabic: string | null;
    translation: string | null;
    translator: string | null;
    translation_source?: string;
    source_url: string;
    source_links?: { reference: string; url: string }[];
    text_verification: string;
    verified_passages?: VerifiedVersePassage[];
  };
  classical_tafsir_review: {
    status: string;
    notes: string;
    specific_caution?: string;
    sources: RawTafsirSource[];
  };
  scientific_evidence: {
    finding: string;
    explanation: string;
    sources: string[];
    consensus_note: string;
    limitations: string;
  };
  connection_analysis: {
    relationship: string;
    connection_type: string;
    assessment: string;
  };
  evidence_sources: RawEvidenceSource[];
  verification_status: string;
  publication_warning: string;
  editorial_review_warning?: string;
}

export interface RawChapterDataset {
  heading: string;
  category_id: string;
  version: string;
  description: string;
  grading_guide: Record<EvidenceGradeLetter, string>;
  entries: RawDatasetEntry[];
  research_methodology?: {
    standard: string;
    evidence_grade_meaning: Record<EvidenceGradeLetter, string>;
    verification_policy: string[];
  };
  chapter_safeguards?: {
    title: string;
    verification_notice?: string;
    pillars: string[];
    terminology_caution: string;
    clinical_disclaimer: string;
  };
  raw_root_traceability?: {
    raw_status?: string;
    raw_source_policy?: unknown;
    raw_research_methodology?: unknown;
    raw_quality_control_summary?: unknown;
    correction_note: string;
  };
  source_catalog?: Record<
    string,
    {
      title: string;
      publisher?: string;
      institution?: string;
      year?: number | null;
      url: string;
      supports: string;
      used_in_entries?: boolean;
      source_warning?: string;
      audit_classification?: SourceAuditClassification;
      verification_pending_note?: string;
    }
  >;
}

/**
 * Exact raw shape of Earth_Geology_Mountains_Evidence_Upgrade_v2_d634fc41.json
 */
export interface RawGeologySourceCatalogEntry {
  title: string;
  publisher: string;
  url: string;
  supports: string;
}

export interface RawGeologyEntry {
  id: string;
  title: string;
  quran_reference: string;
  scientific_topic: string;
  scientific_finding: string;
  connection: string;
  limitations: string;
  evidence_grade: EvidenceGradeLetter;
  research_status: string;
  quranic_evidence: {
    reference: string;
    quran_com_url: string;
    arabic_text: string | null;
    translation: string | null;
    verification_status: string;
    context_note: string;
  };
  classical_tafsir_review: {
    status: string;
    note: string;
    source_ids?: string[];
  };
  scientific_evidence: {
    summary: string;
    source_ids: string[];
    source_scope_note: string;
  };
  connection_analysis: {
    assessment: string;
    interpretive_limit: string;
    claim_strength: string;
    publication_caution: string;
  };
  verification_status: {
    scientific_background: string;
    verse_arabic: string;
    translation: string;
    verse_context: string;
    classical_tafsir: string;
    peer_reviewed_topic_literature: string;
    publication_ready: boolean;
  };
}

export interface RawGeologyDataset {
  heading: string;
  category_id: string;
  version: string;
  description: string;
  grading_guide: Record<EvidenceGradeLetter, string>;
  entries: RawGeologyEntry[];
  source_catalog: Record<string, RawGeologySourceCatalogEntry>;
}

/**
 * Exact raw shape of Oceans_Seas_Water_Evidence_Upgrade_v2_3698fbc4.json
 */
export interface RawOceansSourceCatalogEntry {
  title: string;
  publisher: string;
  url: string;
  supports: string;
}

export interface RawOceansEntry {
  id: string;
  title: string;
  quran_reference: string[];
  scientific_topic: string;
  scientific_finding: string;
  connection: string;
  limitations: string;
  evidence_grade: EvidenceGradeLetter;
  research_status: string;
  quranic_evidence: {
    references: string[];
    quran_com_links: string[];
    arabic_text: string | null;
    translation: string | null;
    verification_status: string;
    context_note: string;
  };
  classical_tafsir_review: {
    status: string;
    note: string;
  };
  scientific_evidence: {
    summary: string;
    source_ids: string[];
    source_scope_note: string;
  };
  connection_analysis: {
    assessment: string;
    interpretive_limit: string;
    claim_strength: string;
    publication_caution: string;
  };
  verification_status: {
    scientific_background: string;
    verse_arabic: string;
    translation: string;
    verse_context: string;
    classical_tafsir: string;
    peer_reviewed_topic_literature: string;
    publication_ready: boolean;
  };
}

export interface RawOceansDataset {
  category_id: string;
  heading: string;
  version: string;
  status: string;
  description: string;
  entries: RawOceansEntry[];
  recommended_sources?: {
    quran_and_language?: { name: string; url: string }[];
    scientific_sources?: { name: string; url: string }[];
  };
  research_rules?: string[];
  research_scope?: {
    purpose: string;
    method: string;
    grading_note: string;
    interpretive_rule: string;
  };
  source_catalog: Record<string, RawOceansSourceCatalogEntry>;
  quality_control_summary?: Record<string, unknown>;
}

/**
 * Exact raw shape of Weather_Atmospheric_Science_Evidence_Upgrade_v2_fbf20c79.json
 */
export type RawWeatherSourceCatalogEntry = RawOceansSourceCatalogEntry;
export type RawWeatherEntry = RawOceansEntry;
export type RawWeatherDataset = RawOceansDataset;

/**
 * Exact raw shape of Plants_Agriculture_Botany_Evidence_Upgrade_v2_2c0ca341.json
 */
export type RawPlantsSourceCatalogEntry = RawOceansSourceCatalogEntry;
export type RawPlantsEntry = RawOceansEntry;
export type RawPlantsDataset = RawOceansDataset;

/**
 * Exact raw shape of Animals_Biological_Systems_Evidence_Upgrade_v3_Reference_Format_22acc770.json
 */
export interface RawAnimalsSourceCatalogEntry {
  title: string;
  institution: string;
  year: number | null;
  url: string;
  supports: string;
}

export interface RawAnimalsEntry {
  id: string;
  title: string;
  quran_reference: string[];
  scientific_topic: string;
  scientific_finding: string;
  connection: string;
  limitations: string;
  evidence_grade: EvidenceGradeLetter;
  research_status: string;
  quranic_evidence: {
    references: string[];
    verse_text_arabic: string | null;
    translation: string | null;
    translator: string | null;
    source_url: string;
    additional_source_urls: string[];
    text_verification: string;
  };
  classical_tafsir_review: {
    status: string;
    notes: string;
    specific_caution?: string;
    sources: RawTafsirSource[];
  };
  scientific_evidence: {
    finding: string;
    explanation: string;
    sources: string[];
    consensus_note: string;
    limitations: string;
  };
  connection_analysis: {
    relationship: string;
    connection_type: string;
    assessment: string;
  };
  verification_status: string;
  evidence_sources: RawEvidenceSource[];
  publication_warning: string;
}

export interface RawAnimalsDataset {
  heading: string;
  category_id: string;
  version: string;
  description: string;
  grading_guide: Record<EvidenceGradeLetter, string>;
  entries: RawAnimalsEntry[];
  source_policy?: {
    quran_sources?: string[];
    tafsir_sources?: string[];
    science_sources?: string[];
    rules?: string[];
  };
  status?: string;
  research_methodology?: {
    standard: string;
    evidence_grade_meaning: Record<EvidenceGradeLetter, string>;
    verification_policy: string[];
  };
  source_catalog: Record<string, RawAnimalsSourceCatalogEntry>;
  quality_control_summary?: Record<string, unknown>;
}

/**
 * Exact raw shape of Human_Biology_Embryology_Evidence_Upgrade_v2_Reference_Format_3faa0ae1.json
 */
export type RawHumanBiologySourceCatalogEntry = RawAnimalsSourceCatalogEntry;
export type RawHumanBiologyEntry = RawAnimalsEntry;
export type RawHumanBiologyDataset = RawAnimalsDataset;

/**
 * Exact raw shape of Health_Hygiene_Nutrition_Fasting_Evidence_Upgrade_v2_Reference_Format_83ace184.json
 */
export type RawHealthHygieneSourceCatalogEntry = RawAnimalsSourceCatalogEntry;
export type RawHealthHygieneEntry = RawAnimalsEntry;
export type RawHealthHygieneDataset = RawAnimalsDataset;

/**
 * Exact raw shape of Human_Psychology_Behaviour_Evidence_Upgrade_v2_Reference_Format_139d0582.json
 */
export type RawHumanPsychologySourceCatalogEntry = RawAnimalsSourceCatalogEntry;
export type RawHumanPsychologyEntry = RawAnimalsEntry;
export type RawHumanPsychologyDataset = RawAnimalsDataset;

/**
 * Exact raw shape of Social_Life_Ethics_Everyday_Practices_Evidence_Upgrade_v2_Reference_Format_25fe1bbf.json
 */
export type RawSocialLifeEthicsSourceCatalogEntry = RawAnimalsSourceCatalogEntry;
export type RawSocialLifeEthicsEntry = RawAnimalsEntry;
export type RawSocialLifeEthicsDataset = RawAnimalsDataset;

export interface SourceReference {
  id: string;
  citation: string;
  identifier?: string;
  note?: string;
}

export interface ResearchTopic {
  id: string;
  chapterId: string;
  topicNumber: string;
  title: string;
  quranicReference: string;
  arabicVerse: string;
  translation: string;
  translator: string;
  scientificTopic: string;
  scientificFinding: string;
  scientificExplanation: string;
  diagramPlaceholderCaption?: string;
  connectionAnalysis: string;
  connectionType: string;
  limitationsAndCautions: string;
  evidenceGrade: string;
  classicalTafsirReview: string;
  scientificEvidenceSources: SourceReference[];
  additionalReferences: SourceReference[];
  isPlaceholder?: boolean;
}

export interface ChapterThemeConfig {
  accentHexDark: string;
  accentHexLight: string;
  atmosphereTintDark: string;
  atmosphereTintLight: string;
  disciplineLabel: string;
  motifType:
    | 'astrolabe'
    | 'strata'
    | 'wave'
    | 'barometric'
    | 'botanical'
    | 'symmetry'
    | 'vitruvian'
    | 'equilibrium'
    | 'neural'
    | 'tessellation';
}

export interface ChapterMetadata {
  id: string;
  number: number;
  paddedNumber: string;
  slug: string;
  title: string;
  shortTitle: string;
  plateLabel: string;
  artworkSrc: string;
  artworkAlt: string;
  descriptionPlaceholder: string;
  editorialScopePlaceholder: string;
  expectedTopicCount: number;
  themeKey: ChapterThemeKey;
  theme: ChapterThemeConfig;
}

export interface ChapterIntroductionData {
  chapterId: string;
  subtitle: string;
  introduction: string;
  whatItInvestigates: string;
  whyItMattersScientifically: string;
  quranicThemesAndReferences: {
    summary: string;
    keyReferences: string[];
  };
  scientificDisciplines: string[];
  researchMethods: string[];
  evidenceEvaluationApproach: string;
  limitationsAndCautions: string[];
}

export interface RelatedTopicLink {
  id: string;
  title: string;
  evidenceGrade: EvidenceGradeLetter;
}

export type FolioType =
  | 'frontispiece'
  | 'intro-welcome'
  | 'intro-reflection'
  | 'intro-faith-science'
  | 'intro-guide'
  | 'intro-methodology'
  | 'intro-grading'
  | 'intro-verification'
  | 'intro-responsibility'
  | 'intro-acknowledgements'
  | 'intro-invitation'
  | 'intro-overview'
  | 'toc-part-1'
  | 'toc-part-2'
  | 'chapter-plate'
  | 'chapter-index'
  | 'chapter-intro'
  | 'chapter-intro-methods'
  | 'topic-single'
  | 'topic-template-single'
  | 'chapter-epilogue';

export type IllustrationCategory =
  | 'cosmology'
  | 'geology'
  | 'oceans'
  | 'atmosphere'
  | 'plants'
  | 'animals'
  | 'human-biology'
  | 'health'
  | 'psychology'
  | 'social-ethics';

export type IllustrationClassification =
  | 'measured'
  | 'anatomical'
  | 'observational'
  | 'schematic'
  | 'conceptual';

export type IllustrationVerificationState =
  | 'created'
  | 'missing'
  | 'visually_inspected'
  | 'scientifically_reviewed';

export interface IllustrationProcessStage {
  stageNumber: string;
  label: string;
  detail: string;
}

export interface VisualBrief {
  subject: string;
  structuresAndProcesses: string[];
  viewingAngle: string;
  keyLabels: string[];
  scaleAndProportions: string;
  composition: string;
  mustNotShow: string;
}

export interface IllustrationAssetStatus {
  exists: boolean;
  fileSizeBytes: number;
  sha256: string;
  width: number;
  height: number;
}

export interface IllustrationRegistryEntry {
  topicId: string;
  illustrationId: string;
  assetPath: string;
  assetExists: boolean;
  fileSizeBytes?: number;
  sha256?: string;
  dimensions?: { width: number; height: number };
  title: string;
  caption: string;
  altText: string;
  category: IllustrationCategory;
  classification: IllustrationClassification;
  referenceAttribution: string;
  verificationState: IllustrationVerificationState;
  chapterId: string;
  chapterTitle: string;
  chapterNumber: number;
  chapterPaddedNumber: string;
  topicNumber: number;
  topicPaddedNumber: string;
  globalTopicNumber: number;
  globalPaddedNumber: string;
  figureNumber: string;
  isConceptualModel: boolean;
  visualBrief: VisualBrief;
  processStages?: IllustrationProcessStage[];
  duplicateFlag?: string;
}

export interface BookFolio {
  folioNumber: number;
  side: 'left' | 'right';
  type: FolioType;
  sectionLabel: string;
  chapter?: ChapterMetadata;
  rawEntry?: RawDatasetEntry;
  enrichment?: TopicEnrichment;
  gradingGuide?: Record<EvidenceGradeLetter, string>;
  templateTopic?: ResearchTopic;
  topicIndexInChapter?: number;
  totalTopicsInChapter?: number;
  globalTopicNumber?: number;
  totalGlobalTopics?: number;
  figureNumber?: string;
  prevTopicId?: string;
  prevTopicTitle?: string;
  nextTopicId?: string;
  nextTopicTitle?: string;
  relatedTopics?: RelatedTopicLink[];
}

export interface BookSpread {
  id: string;
  index: number;
  title: string;
  sectionLabel: string;
  chapterId?: string;
  left: BookFolio;
  right: BookFolio;
}

export interface BookmarkEntry {
  spreadId: string;
  title: string;
  sectionLabel: string;
  savedAt: string;
}
