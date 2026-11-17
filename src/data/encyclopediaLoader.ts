import { CHAPTERS } from './chapters';
import { ANIMALS_ENRICHMENT } from './animalsEnrichment';
import { COSMOLOGY_ENRICHMENT } from './cosmologyEnrichment';
import { GEOLOGY_ENRICHMENT } from './geologyEnrichment';
import { HEALTH_HYGIENE_ENRICHMENT } from './healthHygieneEnrichment';
import { HUMAN_BIOLOGY_ENRICHMENT } from './humanBiologyEnrichment';
import { HUMAN_PSYCHOLOGY_ENRICHMENT } from './humanPsychologyEnrichment';
import { OCEANS_ENRICHMENT } from './oceansEnrichment';
import { PLANTS_ENRICHMENT } from './plantsEnrichment';
import { enrichEntryWithVerifiedQuranAndTafsir } from './quranVerification';
import { SOCIAL_LIFE_ETHICS_ENRICHMENT } from './socialLifeEthicsEnrichment';
import { computeRelatedTopics } from './topicEvidenceBuilder';
import { WEATHER_ENRICHMENT } from './weatherEnrichment';
import {
  BookSpread,
  ChapterMetadata,
  EvidenceGradeLetter,
  RawAnimalsDataset,
  RawChapterDataset,
  RawDatasetEntry,
  RawEvidenceSource,
  RawGeologyDataset,
  RawHealthHygieneDataset,
  RawHumanBiologyDataset,
  RawHumanPsychologyDataset,
  RawOceansDataset,
  RawPlantsDataset,
  RawSocialLifeEthicsDataset,
  RawTafsirSource,
  RawWeatherDataset,
  ResearchTopic,
  SourceAuditClassification,
  TopicEnrichment,
} from '../types/encyclopedia';

const BASE_URL = import.meta.env?.BASE_URL ?? '/';

export const COSMOLOGY_DATASET_URL =
  `${BASE_URL}assets/aistudio/Cosmology_and_Space_Evidence_Upgrade_v2_0222c89c.json`;

export const GEOLOGY_DATASET_URL =
  `${BASE_URL}assets/aistudio/Earth_Geology_Mountains_Evidence_Upgrade_v2_d634fc41.json`;

export const OCEANS_DATASET_URL =
  `${BASE_URL}assets/aistudio/Oceans_Seas_Water_Evidence_Upgrade_v2_3698fbc4.json`;

export const WEATHER_DATASET_URL =
  `${BASE_URL}assets/aistudio/Weather_Atmospheric_Science_Evidence_Upgrade_v2_fbf20c79.json`;

export const PLANTS_DATASET_URL =
  `${BASE_URL}assets/aistudio/Plants_Agriculture_Botany_Evidence_Upgrade_v2_2c0ca341.json`;

export const ANIMALS_DATASET_URL =
  `${BASE_URL}assets/aistudio/Animals_Biological_Systems_Evidence_Upgrade_v3_Reference_Format_22acc770.json`;

export const HUMAN_BIOLOGY_DATASET_URL =
  `${BASE_URL}assets/aistudio/Human_Biology_Embryology_Evidence_Upgrade_v2_Reference_Format_3faa0ae1.json`;

export const HEALTH_HYGIENE_DATASET_URL =
  `${BASE_URL}assets/aistudio/Health_Hygiene_Nutrition_Fasting_Evidence_Upgrade_v2_Reference_Format_83ace184.json`;

export const HUMAN_PSYCHOLOGY_DATASET_URL =
  `${BASE_URL}assets/aistudio/Human_Psychology_Behaviour_Evidence_Upgrade_v2_Reference_Format_139d0582.json`;

export const SOCIAL_LIFE_ETHICS_DATASET_URL =
  `${BASE_URL}assets/aistudio/Social_Life_Ethics_Everyday_Practices_Evidence_Upgrade_v2_Reference_Format_25fe1bbf.json`;

/**
 * Enriches Chapter 01 (Cosmology and Space) with verified Quran.com Arabic text,
 * Saheeh International translations, and Tafsir Ibn Kathir while preserving every
 * original entry, grade, source, and Al-Tabari note verbatim.
 */
export function normalizeCosmologyDataset(
  raw: RawChapterDataset
): RawChapterDataset {
  return {
    ...raw,
    entries: raw.entries.map((entry) =>
      enrichEntryWithVerifiedQuranAndTafsir(entry)
    ),
  };
}

/**
 * Adapts the Chapter 02 (Earth, Geology and Mountains) JSON schema—which uses a
 * shared `source_catalog` and nested verification objects—into the unified
 * `RawChapterDataset` structure while preserving every original field verbatim.
 */
export function normalizeGeologyDataset(
  raw: RawGeologyDataset
): RawChapterDataset {
  const catalog = raw.source_catalog ?? {};

  const entries: RawDatasetEntry[] = raw.entries.map((entry) => {
    const tafsirSourceIds = entry.classical_tafsir_review.source_ids ?? [];
    const tafsirSources: RawTafsirSource[] = tafsirSourceIds
      .map((sid): RawTafsirSource | null => {
        const cat = catalog[sid];
        if (!cat) return null;
        return {
          scholar: cat.title,
          work: cat.publisher,
          summary: cat.supports,
          source_url: cat.url,
        };
      })
      .filter((item): item is RawTafsirSource => item !== null);

    const sciSourceIds = entry.scientific_evidence.source_ids ?? [];
    const evidenceSources: RawEvidenceSource[] = sciSourceIds
      .map((sid): RawEvidenceSource | null => {
        const cat = catalog[sid];
        if (!cat) return null;
        return {
          source_id: sid,
          title: cat.title,
          author_or_institution: cat.publisher,
          year: null,
          url: cat.url,
          what_it_supports: cat.supports,
        };
      })
      .filter((item): item is RawEvidenceSource => item !== null);

    return {
      id: entry.id,
      title: entry.title,
      quran_reference: entry.quran_reference,
      scientific_topic: entry.scientific_topic,
      scientific_finding: entry.scientific_finding,
      connection: entry.connection,
      limitations: entry.limitations,
      evidence_grade: entry.evidence_grade,
      research_status: entry.research_status,
      quranic_evidence: {
        references: [entry.quranic_evidence.reference],
        verse_text_arabic: entry.quranic_evidence.arabic_text,
        translation: entry.quranic_evidence.translation,
        translator: null,
        source_url: entry.quranic_evidence.quran_com_url,
        text_verification: `${entry.quranic_evidence.verification_status} ${entry.quranic_evidence.context_note}`.trim(),
      },
      classical_tafsir_review: {
        status: entry.classical_tafsir_review.status,
        notes: entry.classical_tafsir_review.note,
        sources: tafsirSources,
      },
      scientific_evidence: {
        finding: entry.scientific_evidence.summary,
        explanation: entry.scientific_evidence.source_scope_note,
        sources: sciSourceIds,
        consensus_note: entry.scientific_evidence.source_scope_note,
        limitations: entry.limitations,
      },
      connection_analysis: {
        relationship: entry.connection_analysis.assessment,
        connection_type: entry.connection_analysis.claim_strength,
        assessment: entry.connection_analysis.interpretive_limit,
      },
      evidence_sources: evidenceSources,
      verification_status: `${entry.verification_status.scientific_background} (publication_ready: ${String(entry.verification_status.publication_ready)})`,
      publication_warning: entry.connection_analysis.publication_caution,
    };
  });

  return {
    heading: raw.heading,
    category_id: raw.category_id,
    version: raw.version,
    description: raw.description,
    grading_guide: raw.grading_guide,
    entries,
  };
}

const DEFAULT_EVIDENCE_GRADING_GUIDE: Record<EvidenceGradeLetter, string> = {
  A: 'Strong and direct connection between the Qur’anic wording and an established scientific finding.',
  B: 'Good connection to an observable or established scientific phenomenon, with some interpretation.',
  C: 'Possible or debated connection that requires additional linguistic or historical interpretation.',
  D: 'No clear scientific connection, or a theological statement that cannot be scientifically tested.',
};

/**
 * Adapts the Chapter 03 (Oceans, Seas and Water) JSON schema—which uses array
 * `quran_reference` & `quran_com_links`, a dictionary `source_catalog`, and nested
 * verification fields—into the unified `RawChapterDataset` shape without altering
 * any original field, null verification state, grade, or limitation.
 */
export function normalizeOceansDataset(
  raw: RawOceansDataset
): RawChapterDataset {
  const catalog = raw.source_catalog ?? {};

  const entries: RawDatasetEntry[] = raw.entries.map((entry) => {
    const sciSourceIds = entry.scientific_evidence.source_ids ?? [];
    const evidenceSources: RawEvidenceSource[] = sciSourceIds
      .map((sid): RawEvidenceSource | null => {
        const cat = catalog[sid];
        if (!cat) return null;
        return {
          source_id: sid,
          title: cat.title,
          author_or_institution: cat.publisher,
          year: null,
          url: cat.url,
          what_it_supports: cat.supports,
        };
      })
      .filter((item): item is RawEvidenceSource => item !== null);

    const refs =
      entry.quranic_evidence.references?.length > 0
        ? entry.quranic_evidence.references
        : entry.quran_reference;
    const links = entry.quranic_evidence.quran_com_links ?? [];
    const sourceLinks = refs.map((ref, idx) => ({
      reference: ref,
      url: links[idx] ?? links[0] ?? 'https://quran.com/',
    }));

    const vs = entry.verification_status;
    const verificationSummary = [
      `Status: ${raw.status.replace(/_/g, ' ')}`,
      `Arabic: ${vs.verse_arabic}`,
      `Translation: ${vs.translation}`,
      `Classical tafsir: ${vs.classical_tafsir.replace(/_/g, ' ')}`,
      `Publication ready: ${String(vs.publication_ready)}`,
    ].join(' · ');

    return {
      id: entry.id,
      title: entry.title,
      quran_reference: entry.quran_reference.join(', '),
      scientific_topic: entry.scientific_topic,
      scientific_finding: entry.scientific_finding,
      connection: entry.connection,
      limitations: entry.limitations,
      evidence_grade: entry.evidence_grade,
      research_status: entry.research_status,
      quranic_evidence: {
        references: refs,
        verse_text_arabic: entry.quranic_evidence.arabic_text,
        translation: entry.quranic_evidence.translation,
        translator: null,
        source_url: links[0] ?? 'https://quran.com/',
        source_links: sourceLinks,
        text_verification: `${entry.quranic_evidence.verification_status} ${entry.quranic_evidence.context_note}`.trim(),
      },
      classical_tafsir_review: {
        status: entry.classical_tafsir_review.status,
        notes: entry.classical_tafsir_review.note,
        sources: [],
      },
      scientific_evidence: {
        finding: entry.scientific_evidence.summary,
        explanation: entry.scientific_evidence.source_scope_note,
        sources: sciSourceIds,
        consensus_note: entry.scientific_evidence.source_scope_note,
        limitations: entry.limitations,
      },
      connection_analysis: {
        relationship: entry.connection_analysis.assessment,
        connection_type: entry.connection_analysis.claim_strength,
        assessment: entry.connection_analysis.interpretive_limit,
      },
      evidence_sources: evidenceSources,
      verification_status: verificationSummary,
      publication_warning: entry.connection_analysis.publication_caution,
    };
  });

  return {
    heading: raw.heading,
    category_id: raw.category_id,
    version: raw.version,
    description: raw.description,
    grading_guide: DEFAULT_EVIDENCE_GRADING_GUIDE,
    entries,
  };
}

/**
 * Adapts Chapter 04 (Weather and Atmospheric Science) JSON schema into the
 * unified `RawChapterDataset` shape while preserving every original field,
 * null verification state, grade, interpretive limit, and publication caution.
 */
export function normalizeWeatherDataset(
  raw: RawWeatherDataset
): RawChapterDataset {
  return normalizeOceansDataset(raw);
}

const PLANTS_SOURCE_WARNINGS: Record<string, string> = {
  UMN_PHOTOSYNTHESIS:
    'Source title mismatch note: links to "Lighting for indoor plants and starting seeds" (general horticultural lighting guide rather than a dedicated photosynthesis biochemistry paper).',
  USDA_HONEYBEES:
    'Catalog URL note: raw URL contains a space ("...oc/br/ honeybees/") and is preserved verbatim; verify page availability manually before publication.',
  Kew_SCIENCE:
    'Scope note: broad institutional research portal rather than individually verified proof for every topic claim.',
  FAO_CROP_PRODUCTION:
    'Scope note: broad institutional agricultural portal rather than topic-specific validation for every entry.',
  RHS_PLANT_GROWTH:
    'Scope note: general horticultural overview rather than technical proof for individual botanical claims.',
};

/**
 * Adapts Chapter 05 (Plants, Agriculture and Botany) JSON schema into the
 * unified `RawChapterDataset` shape while preserving every original field,
 * null verification state, grade, interpretive limit, publication caution,
 * and all 13 `source_catalog` records (including unused records) with explicit
 * source-quality notes.
 */
export function normalizePlantsDataset(
  raw: RawPlantsDataset
): RawChapterDataset {
  const base = normalizeOceansDataset(raw);
  const usedIds = new Set<string>();

  const entries: RawDatasetEntry[] = base.entries.map((entry) => {
    const annotatedSources = entry.evidence_sources.map((src) => {
      usedIds.add(src.source_id);
      const warning = PLANTS_SOURCE_WARNINGS[src.source_id];
      return warning ? { ...src, source_warning: warning } : src;
    });

    return {
      ...entry,
      evidence_sources: annotatedSources,
    };
  });

  const preservedCatalog: NonNullable<RawChapterDataset['source_catalog']> = {};
  for (const [sid, cat] of Object.entries(raw.source_catalog ?? {})) {
    const warning = PLANTS_SOURCE_WARNINGS[sid];
    preservedCatalog[sid] = {
      ...cat,
      used_in_entries: usedIds.has(sid),
      ...(warning ? { source_warning: warning } : {}),
    };
  }

  return {
    ...base,
    entries,
    source_catalog: preservedCatalog,
  };
}

const ANIMALS_CATALOG_WARNINGS: Record<
  string,
  { audit_classification: SourceAuditClassification; source_warning?: string }
> = {
  'ANI-S01': {
    audit_classification: 'General scientific background',
    source_warning:
      'General biodiversity overview (Smithsonian NMNH); background material only, not topic-specific proof for individual zoological claims.',
  },
  'ANI-S02': {
    audit_classification: 'General scientific background',
    source_warning:
      'Broad ornithology portal (Cornell AllAboutBirds); individual species aerodynamics, hoopoe ecology, or migration claims require direct article verification.',
  },
  'ANI-S03': {
    audit_classification: 'Topic-specific source lead',
  },
  'ANI-S04': {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Scope is ant social neuroscience; mismatched when cited for general animal instinct/behaviour (ANI-044).',
  },
  'ANI-S05': {
    audit_classification: 'General scientific background',
    source_warning:
      'Broad institutional root portal (https://www.ars.usda.gov/); not a specific verified article supporting every honeybee navigation, honey chemistry, colour, or pollination claim.',
  },
  'ANI-S06': {
    audit_classification: 'Topic-specific source lead',
  },
  'ANI-S07': {
    audit_classification: 'Topic-specific source lead',
  },
  'ANI-S08': {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'CDC mosquito biology resource; source-scope mismatch when applied to houseflies/true flies (ANI-025).',
  },
  'ANI-S09': {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'CDC Aedes mosquito life-cycle page; source-scope mismatch when applied to flies in ANI-025.',
  },
  'ANI-S10': {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Scope is strictly ruminant gastrointestinal anatomy and microbial fermentation; insufficient for meat agriculture, endocrine lactation physiology, leather/hide structure, or wool fibre chemistry.',
  },
  'ANI-S11': {
    audit_classification: 'Topic-specific source lead',
  },
  'ANI-S12': {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Scope is strictly Camelus dromedarius foot structure and locomotion on sand; source-scope mismatch when cited for horse speed/biomechanics (ANI-035).',
  },
  'ANI-S13': {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'OpenStax Animal Reproduction & Development; mismatched when cited for animal instinct (ANI-044), dog companionship (ANI-047), fish biology (ANI-048), or animal nutrition (ANI-049).',
  },
  'ANI-S14': {
    audit_classification: 'Topic-specific source lead',
  },
  'ANI-S15': {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Scope is vertebrate parental care; mismatched when cited for dog companionship (ANI-047), fish aquatic biology (ANI-048), or animal nutrition (ANI-049).',
  },
  'ANI-S16': {
    audit_classification: 'Topic-specific source lead',
  },
};

function auditAnimalEntrySource(
  entryId: string,
  src: RawEvidenceSource
): RawEvidenceSource {
  const sid = src.source_id;
  const verification_pending_note =
    'Awaiting direct source verification (URL presence does not establish verification).';

  if (entryId === 'ANI-025' && (sid === 'ANI-S08' || sid === 'ANI-S09')) {
    return {
      ...src,
      audit_classification: 'Source-scope mismatch',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: CDC resource concerns mosquitoes (Culicidae), not true flies (Muscidae). A fly-specific entomology source is required before publication.',
    };
  }

  if (entryId === 'ANI-035' && sid === 'ANI-S12') {
    return {
      ...src,
      audit_classification: 'Source-scope mismatch',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: ANI-S12 studies camel locomotion (Camelus dromedarius), not horse biomechanics or equine speed.',
    };
  }

  if (sid === 'ANI-S01') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General biodiversity background (Smithsonian NMNH); not direct topic-specific proof for this claim.',
    };
  }

  if (sid === 'ANI-S02') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General ornithology portal lead (Cornell Lab); verify exact species/aerodynamics study before publication.',
    };
  }

  if (sid === 'ANI-S05') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'Broad institutional source lead (USDA ARS homepage); not a specific verified study for this honeybee claim.',
    };
  }

  if (sid === 'ANI-S10') {
    if (entryId === 'ANI-030') {
      return {
        ...src,
        audit_classification: 'Topic-specific source lead',
        verification_pending_note,
        source_warning:
          'Covers ruminant digestive anatomy and fermentation only; mammary milk synthesis still requires lactation-specific physiology sources.',
      };
    }
    return {
      ...src,
      audit_classification: 'Source-scope mismatch',
      verification_pending_note,
      source_warning:
        'Scope warning: ANI-S10 covers ruminant GI fermentation only, not meat agriculture, lactation endocrinology, leather structure, or wool fibre chemistry.',
    };
  }

  if (sid === 'ANI-S12') {
    return {
      ...src,
      audit_classification: 'Topic-specific source lead',
      verification_pending_note,
      source_warning:
        entryId === 'ANI-033' || entryId === 'ANI-034'
          ? 'Restricted to camel foot structure and sand locomotion; does not address dehydration tolerance or non-camel transport animals.'
          : 'Scope restricted to Camelus dromedarius foot structure, gait, and sand locomotion.',
    };
  }

  if (sid === 'ANI-S04' && entryId === 'ANI-044') {
    return {
      ...src,
      audit_classification: 'Source-scope mismatch',
      verification_pending_note,
      source_warning:
        'Scope mismatch: examines ant social neuroscience specifically rather than general animal instinct or ethology.',
    };
  }

  if (
    (sid === 'ANI-S13' || sid === 'ANI-S15') &&
    ['ANI-044', 'ANI-047', 'ANI-048', 'ANI-049'].includes(entryId)
  ) {
    return {
      ...src,
      audit_classification: 'Source-scope mismatch',
      verification_pending_note,
      source_warning:
        sid === 'ANI-S13'
          ? 'Scope mismatch: OpenStax Ch. 43 covers animal reproduction & development rather than this topic (instinct, dog domestication, fish anatomy, or nutrition).'
          : 'Scope mismatch: ANI-S15 examines vertebrate parental care rather than dog companionship, fish biology, or animal nutrition.',
    };
  }

  if (entryId === 'ANI-042' && (sid === 'ANI-S13' || sid === 'ANI-S14' || sid === 'ANI-S16')) {
    return {
      ...src,
      audit_classification: 'Topic-specific source lead',
      verification_pending_note,
      source_warning:
        'General comparative animal embryology background; Qur’an 23:12–14 primarily concerns human development rather than animal embryology.',
    };
  }

  if (sid === 'ANI-S13' && entryId === 'ANI-043') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
    };
  }

  return {
    ...src,
    audit_classification: 'Topic-specific source lead',
    verification_pending_note,
  };
}

/**
 * Adapts Chapter 06 (Animals and Biological Systems) v3 reference-format JSON
 * into the unified `RawChapterDataset` structure while preserving every original
 * field, null verification state, grade, classical tafsir caution, publication
 * warning, and all 16 `source_catalog` records with mandatory source-quality audits.
 */
export function normalizeAnimalsDataset(
  raw: RawAnimalsDataset
): RawChapterDataset {
  const catalog = raw.source_catalog ?? {};
  const usedIds = new Set<string>();

  const entries: RawDatasetEntry[] = raw.entries.map((entry) => {
    const rawSourcesById = new Map(
      (entry.evidence_sources ?? []).map((s) => [s.source_id, s])
    );

    const sciSourceIds = entry.scientific_evidence.sources ?? [];
    const evidenceSources: RawEvidenceSource[] = sciSourceIds
      .map((sid): RawEvidenceSource | null => {
        usedIds.add(sid);
        const embedded = rawSourcesById.get(sid);
        const cat = catalog[sid];
        if (!embedded && !cat) return null;
        const baseSource: RawEvidenceSource = embedded
          ? { ...embedded }
          : {
              source_id: sid,
              title: cat.title,
              author_or_institution: cat.institution,
              year: cat.year ?? null,
              url: cat.url,
              what_it_supports: cat.supports,
            };
        return auditAnimalEntrySource(entry.id, baseSource);
      })
      .filter((item): item is RawEvidenceSource => item !== null);

    const refs =
      entry.quranic_evidence.references?.length > 0
        ? entry.quranic_evidence.references
        : entry.quran_reference;

    const allUrls = [
      entry.quranic_evidence.source_url,
      ...(entry.quranic_evidence.additional_source_urls ?? []),
    ].filter(Boolean);

    const sourceLinks = refs.map((ref, idx) => ({
      reference: ref,
      url: allUrls[idx] ?? entry.quranic_evidence.source_url ?? 'https://quran.com/',
    }));

    return {
      id: entry.id,
      title: entry.title,
      quran_reference: entry.quran_reference.join(', '),
      scientific_topic: entry.scientific_topic,
      scientific_finding: entry.scientific_finding,
      connection: entry.connection,
      limitations: entry.limitations,
      evidence_grade: entry.evidence_grade,
      research_status: entry.research_status,
      quranic_evidence: {
        references: refs,
        verse_text_arabic: entry.quranic_evidence.verse_text_arabic,
        translation: entry.quranic_evidence.translation,
        translator: entry.quranic_evidence.translator,
        source_url: entry.quranic_evidence.source_url,
        source_links: sourceLinks,
        text_verification: entry.quranic_evidence.text_verification,
      },
      classical_tafsir_review: {
        status: entry.classical_tafsir_review.status,
        notes: entry.classical_tafsir_review.notes,
        ...(entry.classical_tafsir_review.specific_caution
          ? { specific_caution: entry.classical_tafsir_review.specific_caution }
          : {}),
        sources: entry.classical_tafsir_review.sources ?? [],
      },
      scientific_evidence: {
        finding: entry.scientific_evidence.finding,
        explanation: entry.scientific_evidence.explanation,
        sources: sciSourceIds,
        consensus_note: entry.scientific_evidence.consensus_note,
        limitations: entry.scientific_evidence.limitations,
      },
      connection_analysis: {
        relationship: entry.connection_analysis.relationship,
        connection_type: entry.connection_analysis.connection_type,
        assessment: entry.connection_analysis.assessment,
      },
      evidence_sources: evidenceSources,
      verification_status: `${entry.verification_status} · publication_ready: false`,
      publication_warning: entry.publication_warning,
    };
  });

  const preservedCatalog: NonNullable<RawChapterDataset['source_catalog']> = {};
  for (const [sid, cat] of Object.entries(catalog)) {
    const meta = ANIMALS_CATALOG_WARNINGS[sid];
    preservedCatalog[sid] = {
      ...cat,
      used_in_entries: usedIds.has(sid),
      audit_classification:
        meta?.audit_classification ?? 'Topic-specific source lead',
      verification_pending_note:
        'Awaiting direct source verification (URL presence does not establish verification).',
      ...(meta?.source_warning ? { source_warning: meta.source_warning } : {}),
    };
  }

  return {
    heading: raw.heading,
    category_id: raw.category_id,
    version: raw.version,
    description: raw.description,
    grading_guide: raw.grading_guide,
    entries,
    research_methodology: raw.research_methodology,
    source_catalog: preservedCatalog,
  };
}

const HUMAN_BIOLOGY_CATALOG_WARNINGS: Record<
  string,
  { audit_classification: SourceAuditClassification; source_warning?: string }
> = {
  NCBI_FERTILIZATION: {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Covers gamete union and zygote formation; source-scope mismatch when cited for elemental chemistry of clay (HUM-001).',
  },
  NCBI_WEEK1: {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Embryological Week 1 background only; does not determine classical Arabic lexical meaning or classical tafsīr.',
  },
  NCBI_WEEK2_3: {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Embryological Week 2–3 background only; does not determine Arabic lexical meaning of alaqah/mudghah or adjudicate 39:6 layers.',
  },
  NCBI_GASTRULATION: {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Germ-layer differentiation proceeds through overlapping developmental signalling rather than an isolated bone-then-muscle cutoff.',
  },
  NCBI_NEURAL_TUBE: {
    audit_classification: 'Topic-specific source lead',
  },
  MEDLINE_FETAL: {
    audit_classification: 'General scientific background',
    source_warning:
      'Accessible general overview of fetal growth; not a substitute for specialist cardiac or musculoskeletal embryology.',
  },
  MEDLINE_FETAL_HEALTH: {
    audit_classification: 'General scientific background',
    source_warning:
      'Prenatal pregnancy health resource; source-scope mismatch for postnatal breastfeeding/weaning (HUM-042–044) and lifespan/aging entries (HUM-046–050).',
  },
  ACOG_FETAL_GROWTH: {
    audit_classification: 'General scientific background',
    source_warning:
      'General obstetric FAQ; does not establish a single referent for 39:6 or explicit mention of placenta/umbilical cord in verses.',
  },
  OPENSTAX_AP: {
    audit_classification: 'General scientific background',
    source_warning:
      'General anatomy and physiology textbook; NOT a forensic fingerprint study (HUM-036) or specialist cardiac embryology timeline.',
  },
  OPENSTAX_BIOLOGY: {
    audit_classification: 'General scientific background',
    source_warning:
      'General biology textbook; source-scope mismatch for forensic fingerprint identification (HUM-036).',
  },
  WHO_BREASTFEEDING: {
    audit_classification: 'Topic-specific source lead',
    source_warning:
      'Principal public-health lead for infant feeding; distinguish general religious guidance from individualized pediatric medical advice.',
  },
  NCBI_PREGNANCY: {
    audit_classification: 'General scientific background',
    source_warning:
      'General maternal physiological adaptations; verify specific obstetric claims before publication.',
  },
  NCBI_REPRODUCTIVE: {
    audit_classification: 'General scientific background',
    source_warning:
      'General reproductive anatomy and physiology; do not retrofit modern genetics/DNA into verses or bypass debate around 86:6–7.',
  },
};

function auditHumanBiologyEntrySource(
  entryId: string,
  src: RawEvidenceSource
): RawEvidenceSource {
  const sid = src.source_id;
  const verification_pending_note =
    'Awaiting direct source verification (URL presence does not establish verification).';

  // HUM-001: Clay extract / elements vs. fertilization
  if (entryId === 'HUM-001') {
    if (sid === 'NCBI_FERTILIZATION') {
      return {
        ...src,
        audit_classification: 'Source-scope mismatch',
        verification_pending_note,
        source_warning:
          'Source-scope mismatch: Embryology, Fertilization covers gamete fusion and zygote formation, NOT the elemental chemistry of clay or human body composition. Preserve distinction between Adam’s creation and biological reproduction.',
      };
    }
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General biology chemistry context only; verses 23:12 and 32:7 include Adam’s creation and are not elemental composition assays.',
    };
  }

  // HUM-004: Small reproductive quantity
  if (entryId === 'HUM-004') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General fertilization and cell biology context; do not claim detailed verse-to-mitotic-cell-division correspondence.',
    };
  }

  // HUM-008 & HUM-009: Alaqah & Mudghah
  if (entryId === 'HUM-008' || entryId === 'HUM-009') {
    return {
      ...src,
      audit_classification: 'Topic-specific source lead',
      verification_pending_note,
      source_warning:
        entryId === 'HUM-008'
          ? 'Embryological background only: NCBI sources do NOT determine the Arabic lexical meaning of alaqah or classical tafsīr. Urgent lexical/tafsīr review required; never reduce alaqah to a single modern embryonic stage.'
          : 'Embryological background only: NCBI sources do NOT determine the meaning of mudghah or classical tafsīr. Do not treat superficial visual resemblance to somites as scientific proof.',
    };
  }

  // HUM-011 & HUM-012: Skeletal & musculoskeletal development
  if (entryId === 'HUM-011' || entryId === 'HUM-012') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'Developmental background note: cartilage, bone, and muscle arise from coordinated, overlapping embryonic processes—never claim all bone formation finishes before muscle development begins.',
    };
  }

  // HUM-017: Three darknesses (39:6)
  if (entryId === 'HUM-017') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General early embryology and fetal anatomy background; modern anatomy does not establish a single universally agreed referent for Qur’an 39:6 ("three darknesses").',
    };
  }

  // HUM-018 & HUM-019: Placenta & umbilical cord
  if (entryId === 'HUM-018' || entryId === 'HUM-019') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General obstetric exchange background; note Qur’an verses 23:13, 39:6, and 22:5 do not explicitly name the placenta or umbilical cord.',
    };
  }

  // HUM-022: Development of the human heart
  if (entryId === 'HUM-022') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'Broad fetal and anatomical overview only; not direct proof of a specific cardiac embryology timeline, and cited verses (23:14, 32:9) do not explicitly name the heart.',
    };
  }

  // HUM-026 & HUM-027: Brain & Heart
  if (entryId === 'HUM-026' || entryId === 'HUM-027') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General anatomy and biology background; never equate spiritual/moral senses of qalb with the anatomical heart or claim the Qur’an describes cortical brain networks.',
    };
  }

  // HUM-032 & HUM-033: Appearance diversity & proportion
  if (entryId === 'HUM-032' || entryId === 'HUM-033') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General anatomical and genetics background; cited verses do not explain genetic inheritance mechanisms.',
    };
  }

  // HUM-034 & HUM-035: Skin & pain sensation
  if (entryId === 'HUM-034' || entryId === 'HUM-035') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General integumentary and sensory overview; cited verses (4:56, 41:20–21) do not teach cutaneous nociceptors or sensory neuroscience.',
    };
  }

  // HUM-036: Fingerprints (75:3-4)
  if (entryId === 'HUM-036') {
    return {
      ...src,
      audit_classification: 'Source-scope mismatch',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: OpenStax textbooks are general anatomy/biology references, NOT forensic fingerprint studies; Qur’an 75:3–4 concerns bodily resurrection rather than forensic identification.',
    };
  }

  // HUM-037 to HUM-039: Human reproduction
  if (entryId === 'HUM-037' || entryId === 'HUM-038' || entryId === 'HUM-039') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        entryId === 'HUM-039'
          ? 'General reproductive biology background; do not retrofit DNA or chromosomes into verses, and preserve classical exegetical debate around 86:6–7.'
          : 'General reproductive biology background; do not retrofit DNA, chromosomes, or molecular genetics into verses without explicit textual grounds.',
    };
  }

  // HUM-042 to HUM-044: Breastfeeding & weaning
  if (entryId === 'HUM-042' || entryId === 'HUM-043' || entryId === 'HUM-044') {
    if (sid === 'WHO_BREASTFEEDING') {
      return {
        ...src,
        audit_classification: 'Topic-specific source lead',
        verification_pending_note,
        source_warning:
          'Principal public-health reference for infant feeding; distinguish general religious/family guidance from individualized pediatric medical advice.',
      };
    }
    return {
      ...src,
      audit_classification: 'Source-scope mismatch',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: MedlinePlus Fetal Health covers prenatal pregnancy care rather than postnatal breastfeeding, infant nutrition, or weaning.',
    };
  }

  // HUM-045: Maternal role
  if (entryId === 'HUM-045') {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General maternal-fetal pregnancy background; verses 31:14 and 46:15 are ethical reflections rather than clinical mechanism or risk-factor claims.',
    };
  }

  // HUM-046 to HUM-050: Lifespan, aging, nourishment, vulnerability, life cycle
  if (['HUM-046', 'HUM-047', 'HUM-048', 'HUM-049', 'HUM-050'].includes(entryId)) {
    if (sid === 'MEDLINE_FETAL_HEALTH') {
      return {
        ...src,
        audit_classification: 'Source-scope mismatch',
        verification_pending_note,
        source_warning:
          'Source-scope mismatch: MedlinePlus Fetal Health addresses prenatal pregnancy rather than adult aging, lifespan, nutrition, or vulnerability.',
      };
    }
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
      source_warning:
        'General human physiology background; verses on lifespan, aging, and weakness are theological/observational reflections rather than universal clinical timelines.',
    };
  }

  // Remaining entries: classify accurately by catalog type
  if (
    sid === 'MEDLINE_FETAL' ||
    sid === 'MEDLINE_FETAL_HEALTH' ||
    sid === 'ACOG_FETAL_GROWTH' ||
    sid === 'OPENSTAX_AP' ||
    sid === 'OPENSTAX_BIOLOGY' ||
    sid === 'NCBI_PREGNANCY' ||
    sid === 'NCBI_REPRODUCTIVE'
  ) {
    return {
      ...src,
      audit_classification: 'General scientific background',
      verification_pending_note,
    };
  }

  return {
    ...src,
    audit_classification: 'Topic-specific source lead',
    verification_pending_note,
  };
}

/**
 * Adapts Chapter 07 (Human Biology and Embryology) v2 reference-format JSON
 * into the unified `RawChapterDataset` structure while preserving every original
 * field, null Arabic/translation/translator state, grade, classical tafsīr
 * specific_caution, publication_warning, and all 13 `source_catalog` records with
 * strict source-scope audits.
 */
export function normalizeHumanBiologyDataset(
  raw: RawHumanBiologyDataset
): RawChapterDataset {
  const catalog = raw.source_catalog ?? {};
  const usedIds = new Set<string>();

  const entries: RawDatasetEntry[] = raw.entries.map((entry) => {
    const rawSourcesById = new Map(
      (entry.evidence_sources ?? []).map((s) => [s.source_id, s])
    );

    const sciSourceIds = entry.scientific_evidence.sources ?? [];
    const evidenceSources: RawEvidenceSource[] = sciSourceIds
      .map((sid): RawEvidenceSource | null => {
        usedIds.add(sid);
        const embedded = rawSourcesById.get(sid);
        const cat = catalog[sid];
        if (!embedded && !cat) return null;
        const baseSource: RawEvidenceSource = embedded
          ? { ...embedded }
          : {
              source_id: sid,
              title: cat.title,
              author_or_institution: cat.institution,
              year: cat.year ?? null,
              url: cat.url,
              what_it_supports: cat.supports,
            };
        return auditHumanBiologyEntrySource(entry.id, baseSource);
      })
      .filter((item): item is RawEvidenceSource => item !== null);

    const refs =
      entry.quranic_evidence.references?.length > 0
        ? entry.quranic_evidence.references
        : entry.quran_reference;

    const allUrls = [
      entry.quranic_evidence.source_url,
      ...(entry.quranic_evidence.additional_source_urls ?? []),
    ].filter(Boolean);

    const sourceLinks = refs.map((ref, idx) => ({
      reference: ref,
      url: allUrls[idx] ?? entry.quranic_evidence.source_url ?? 'https://quran.com/',
    }));

    return {
      id: entry.id,
      title: entry.title,
      quran_reference: entry.quran_reference.join(', '),
      scientific_topic: entry.scientific_topic,
      scientific_finding: entry.scientific_finding,
      connection: entry.connection,
      limitations: entry.limitations,
      evidence_grade: entry.evidence_grade,
      research_status: entry.research_status,
      quranic_evidence: {
        references: refs,
        verse_text_arabic: entry.quranic_evidence.verse_text_arabic,
        translation: entry.quranic_evidence.translation,
        translator: entry.quranic_evidence.translator,
        source_url: entry.quranic_evidence.source_url,
        source_links: sourceLinks,
        text_verification: entry.quranic_evidence.text_verification,
      },
      classical_tafsir_review: {
        status: entry.classical_tafsir_review.status,
        notes: entry.classical_tafsir_review.notes,
        ...(entry.classical_tafsir_review.specific_caution
          ? { specific_caution: entry.classical_tafsir_review.specific_caution }
          : {}),
        sources: entry.classical_tafsir_review.sources ?? [],
      },
      scientific_evidence: {
        finding: entry.scientific_evidence.finding,
        explanation: entry.scientific_evidence.explanation,
        sources: sciSourceIds,
        consensus_note: entry.scientific_evidence.consensus_note,
        limitations: entry.scientific_evidence.limitations,
      },
      connection_analysis: {
        relationship: entry.connection_analysis.relationship,
        connection_type: entry.connection_analysis.connection_type,
        assessment: entry.connection_analysis.assessment,
      },
      evidence_sources: evidenceSources,
      verification_status: `${entry.verification_status} · publication_ready: false`,
      publication_warning: entry.publication_warning,
    };
  });

  const preservedCatalog: NonNullable<RawChapterDataset['source_catalog']> = {};
  for (const [sid, cat] of Object.entries(catalog)) {
    const meta = HUMAN_BIOLOGY_CATALOG_WARNINGS[sid];
    preservedCatalog[sid] = {
      ...cat,
      used_in_entries: usedIds.has(sid),
      audit_classification:
        meta?.audit_classification ?? 'General scientific background',
      verification_pending_note:
        'Awaiting direct source verification (URL presence does not establish verification).',
      ...(meta?.source_warning ? { source_warning: meta.source_warning } : {}),
    };
  }

  return {
    heading: raw.heading,
    category_id: raw.category_id,
    version: raw.version,
    description: raw.description,
    grading_guide: raw.grading_guide,
    entries,
    research_methodology: raw.research_methodology,
    source_catalog: preservedCatalog,
  };
}

const HEALTH_HYGIENE_CATALOG_WARNINGS: Record<
  string,
  {
    audit_classification: SourceAuditClassification;
    source_warning?: string;
  }
> = {
  QURAN_COM: {
    audit_classification: "Qur'anic or classical-tafsir reference resource",
    source_warning:
      'Preserved scriptural lookup portal (unused in scientific_evidence.sources); individual Arabic wording, translation, and verse context require checking.',
  },
  QURANIC_CORPUS: {
    audit_classification: "Qur'anic or classical-tafsir reference resource",
    source_warning:
      'Preserved lexical and morphological lookup portal (unused in scientific_evidence.sources); not a substitute for classical tafsir.',
  },
  ALTAFSIR: {
    audit_classification: "Qur'anic or classical-tafsir reference resource",
    source_warning:
      'Preserved classical tafsir lookup resource (unused in scientific_evidence.sources); exact scholar commentaries must be recorded per verse.',
  },
  WHO_HEALTHY_DIET: {
    audit_classification: 'General scientific or public-health background',
    source_warning:
      'General WHO dietary pattern guidance; does not substantiate specific outcomes for dates in childbirth (HLT-049) or equate religious food categories with a complete balanced diet.',
  },
  CDC_HANDWASHING: {
    audit_classification: 'General scientific or public-health background',
    source_warning:
      'Covers clinical/everyday soap-and-water hand hygiene; does not automatically validate ritual washing (wudu/ghusl), dry soil ablution (tayammum), laundry hygiene, worship spaces, or menstrual rules.',
  },
  WHO_DRINKING_WATER: {
    audit_classification: 'General scientific or public-health background',
    source_warning:
      'Covers safe drinking-water access and contamination control; does not substantiate ritual ablution, garment purification, or physical ocean/river barrier dynamics.',
  },
  WHO_FOOD_SAFETY: {
    audit_classification: 'General scientific or public-health background',
    source_warning:
      'Covers foodborne hazards and safe food handling; religious prohibitions on specific items and devotional purification have distinct theological scope.',
  },
  WHO_ALCOHOL: {
    audit_classification: 'Topic-specific institutional or scientific source',
    source_warning:
      'Documents public-health harms of alcohol consumption; not a theological rationale for scriptural prohibition.',
  },
  PUBMED_RAMADAN_META: {
    audit_classification: 'Topic-specific institutional or scientific source',
    source_warning:
      'Systematic review/meta-analysis record on Ramadan fasting and body-composition outcomes; distinguish dry daylight Ramadan fasting from other intermittent-fasting protocols and inspect full-text limitations.',
  },
  ADA_STANDARDS_2026: {
    audit_classification: 'General scientific or public-health background',
    source_warning:
      'Clinical diabetes care standards; verify exact Ramadan section and never present as individualized medical advice.',
  },
  COCHRANE_RAMADAN_DIABETES: {
    audit_classification: 'Topic-specific institutional or scientific source',
    source_warning:
      'Cochrane systematic-review summary on interventions for adults with type 2 diabetes fasting during Ramadan; check certainty ratings and clinical eligibility.',
  },
  NCBI_DIABETES_RAMADAN: {
    audit_classification: 'Topic-specific institutional or scientific source',
    source_warning:
      'Clinical overview for diabetes management during Ramadan; requires physician-guided assessment and is not individualized medical advice.',
  },
  PUBMED_PREGNANCY_RAMADAN: {
    audit_classification: 'Topic-specific institutional or scientific source',
    source_warning:
      'Review record on Ramadan fasting during pregnancy; check full-text outcomes and certainty—do not dispense clinical advice.',
  },
  PUBMED: {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'Biomedical literature search portal—not itself primary clinical evidence, a clinical trial, or proof for a specific claim.',
  },
  COCHRANE_LIBRARY: {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'Systematic-review database portal—individual review records must be selected and verified for claim-specific support.',
  },
  WHO_INFANT_FEEDING: {
    audit_classification: 'General scientific or public-health background',
    source_warning:
      'Human infant and young child feeding guidance; mismatched when attached to livestock mammary physiology (HLT-020).',
  },
  CDC_FOOD_SAFETY: {
    audit_classification: 'Topic-specific institutional or scientific source',
    source_warning:
      'Public-health foodborne-illness prevention guidance; religious dietary law and food-safety inspection operate under distinct frameworks.',
  },
  WHO_PHYSICAL_ACTIVITY: {
    audit_classification: 'General scientific or public-health background',
    source_warning:
      'General WHO physical-activity recommendations; not a Ramadan-specific exercise protocol.',
  },
};

function auditHealthHygieneEntrySource(
  entryId: string,
  src: RawEvidenceSource
): RawEvidenceSource {
  const sid = src.source_id;
  const verification_pending_note =
    'Awaiting claim-specific source verification (a URL or database link is not standalone proof).';

  // Literature-search portals are ALWAYS flagged wherever used
  if (sid === 'PUBMED' || sid === 'COCHRANE_LIBRARY') {
    const portalNoteByEntry: Record<string, string> = {
      'HLT-020':
        'Literature-search portal only—does not constitute primary evidence on ruminant mammary gland physiology or milk synthesis.',
      'HLT-022':
        'Literature-search portal only—not a primary study of honey antimicrobial mechanisms; activity varies by floral source, concentration, and processing.',
      'HLT-023':
        'Literature-search portal only—clinical wound care studies typically test standardized medical-grade honey, not unstandardized dietary honey.',
      'HLT-024':
        'Literature-search portal only—does not establish broad digestive cure claims for honey across populations.',
      'HLT-025':
        'Literature-search portal only—broad biomedical database link, not proof that every remedy succeeds or that healing verses prescribe a clinical protocol.',
      'HLT-026':
        'Literature-search portal only—broad database link, not clinical evidence for a specific medical intervention.',
      'HLT-037':
        'Literature-search portal only—does not establish that travel always harms health or substantiate a specific physiological threshold for the travel concession.',
      'HLT-042':
        'Literature-search portal only—does not establish a single uniform sleep-architecture outcome across all Ramadan contexts.',
      'HLT-049':
        'Literature-search portal only—does not establish that eating dates guarantees a specific labor or childbirth outcome.',
    };
    return {
      ...src,
      audit_classification: 'Research database or literature-search portal',
      verification_pending_note,
      source_warning:
        portalNoteByEntry[entryId] ??
        'Research database or literature-search portal—not primary clinical evidence; an individual study or systematic review must be inspected directly.',
    };
  }

  // HLT-001 to HLT-008: Ritual purification, garments, worship spaces, tayammum, menstruation, contamination
  if (['HLT-001', 'HLT-002', 'HLT-005', 'HLT-008'].includes(entryId)) {
    return {
      ...src,
      audit_classification: 'General scientific or public-health background',
      verification_pending_note,
      source_warning:
        'CDC handwashing, WHO drinking-water, and WHO food-safety provide general hygiene background only; they do not automatically validate ritual washing rules or equate devotional purification with clinical infection control.',
    };
  }
  if (['HLT-003', 'HLT-004', 'HLT-006', 'HLT-007'].includes(entryId)) {
    const mismatchNotes: Record<string, string> = {
      'HLT-003':
        'Source-scope mismatch: CDC handwashing and WHO water/food-safety sheets do not address garment laundering or textile disinfection.',
      'HLT-004':
        'Source-scope mismatch: CDC handwashing and WHO water/food-safety sheets are not building-sanitation or indoor-air standards for places of worship.',
      'HLT-006':
        'Source-scope mismatch: CDC handwashing and WHO water/food-safety sheets address water/soap hygiene and food safety, not dry ablution (tayammum) with earth when water is unavailable.',
      'HLT-007':
        'Source-scope mismatch: CDC handwashing and WHO water/food-safety sheets do not specifically evaluate ritual purification after menstruation.',
    };
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning: mismatchNotes[entryId],
    };
  }

  // HLT-018: Fresh and salty water
  if (entryId === 'HLT-018') {
    return {
      ...src,
      audit_classification: 'General scientific or public-health background',
      verification_pending_note,
      source_warning:
        'WHO drinking-water fact sheet covers potable water safety rather than hydrological salinity gradients or marine-freshwater boundaries.',
    };
  }

  // HLT-019: Milk as nourishment
  if (entryId === 'HLT-019') {
    return {
      ...src,
      audit_classification: 'General scientific or public-health background',
      verification_pending_note,
      source_warning:
        'WHO infant-feeding guidance focuses on human breastfeeding and complementary feeding; dairy intake suitability varies with lactose tolerance and age.',
    };
  }

  // HLT-020: Milk production in livestock
  if (entryId === 'HLT-020' && sid === 'WHO_INFANT_FEEDING') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: WHO Infant and Young Child Feeding addresses human breastfeeding and pediatric nutrition rather than livestock digestion or ruminant mammary physiology.',
    };
  }

  // HLT-027 to HLT-035: Ramadan fasting vs non-Ramadan intermittent fasting
  if (
    [
      'HLT-027',
      'HLT-028',
      'HLT-029',
      'HLT-030',
      'HLT-031',
      'HLT-032',
      'HLT-033',
      'HLT-034',
      'HLT-035',
    ].includes(entryId)
  ) {
    return {
      ...src,
      audit_classification: 'Topic-specific institutional or scientific source',
      verification_pending_note,
      source_warning:
        'Ramadan dry dawn-to-sunset fasting must be distinguished from other intermittent-fasting protocols allowing water; outcomes vary by daylight duration, climate, diet, sleep, and baseline health, and dehydration carries real risks.',
    };
  }

  // HLT-037: Concession for travellers
  if (entryId === 'HLT-037' && sid === 'PUBMED_RAMADAN_META') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: a Ramadan fasting body-composition meta-analysis does not establish that travel always harms health or test travel-concession outcomes.',
    };
  }

  // HLT-036, HLT-038, HLT-039: Illness concession, individualized assessment, diabetes
  if (['HLT-036', 'HLT-038', 'HLT-039'].includes(entryId)) {
    if (sid === 'ADA_STANDARDS_2026') {
      return {
        ...src,
        audit_classification: 'General scientific or public-health background',
        verification_pending_note,
        source_warning:
          'Clinical standards for diabetes care; verify the specific Ramadan section and consult clinicians—never treat as individualized medical advice.',
      };
    }
    return {
      ...src,
      audit_classification: 'Topic-specific institutional or scientific source',
      verification_pending_note,
      source_warning:
        'Clinical guidance on diabetes and Ramadan fasting emphasizes individualized medical risk assessment; fasting can pose serious hypoglycemia or dehydration risks without clinical supervision.',
    };
  }

  // HLT-040: Pregnancy
  if (entryId === 'HLT-040') {
    return {
      ...src,
      audit_classification: 'Topic-specific institutional or scientific source',
      verification_pending_note,
      source_warning:
        'Review evidence and limitations on Ramadan fasting during pregnancy must be inspected directly; pregnancy fasting decisions require individualized obstetric guidance.',
    };
  }

  // HLT-041: Physical activity
  if (entryId === 'HLT-041') {
    return {
      ...src,
      audit_classification:
        sid === 'WHO_PHYSICAL_ACTIVITY'
          ? 'General scientific or public-health background'
          : 'Topic-specific institutional or scientific source',
      verification_pending_note,
      source_warning:
        sid === 'WHO_PHYSICAL_ACTIVITY'
          ? 'General WHO activity guidance does not specify a Ramadan-specific exercise protocol.'
          : 'Outcomes of physical activity during dry fasting depend on timing, intensity, heat exposure, and hydration window.',
    };
  }

  // HLT-042: Sleep patterns
  if (entryId === 'HLT-042' && sid === 'PUBMED_RAMADAN_META') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: this PubMed meta-analysis evaluates body composition rather than proving a universal sleep-pattern outcome during Ramadan.',
    };
  }

  // HLT-049: Nutritional role of dates
  if (entryId === 'HLT-049' && sid === 'WHO_HEALTHY_DIET') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: general WHO healthy-diet guidance covers fruit and nutrient intake, not childbirth outcomes or 19:25–26 narrative claims.',
    };
  }

  // Remaining nutrition, dietary law, food safety, and gratitude entries
  if (
    [
      'WHO_ALCOHOL',
      'WHO_DRINKING_WATER',
      'WHO_HEALTHY_DIET',
      'WHO_FOOD_SAFETY',
      'CDC_FOOD_SAFETY',
    ].includes(sid)
  ) {
    const isGeneralOnly =
      entryId === 'HLT-048' || entryId === 'HLT-050' || sid === 'WHO_FOOD_SAFETY';
    return {
      ...src,
      audit_classification: isGeneralOnly
        ? 'General scientific or public-health background'
        : 'Topic-specific institutional or scientific source',
      verification_pending_note,
      ...(entryId === 'HLT-010' || entryId === 'HLT-046'
        ? {
            source_warning:
              'Religious dietary status (halal/lawful) is distinct from nutritional balance or clinical safety inspection.',
          }
        : {}),
    };
  }

  return {
    ...src,
    audit_classification: 'General scientific or public-health background',
    verification_pending_note,
  };
}

/**
 * Adapts Chapter 08 (Health, Hygiene, Nutrition and Fasting) v2 reference-format JSON
 * into the unified `RawChapterDataset` structure while preserving every original
 * field, null Arabic/translation/translator state, grade, classical tafsīr
 * specific_caution, publication_warning, and all 18 `source_catalog` records with
 * strict source-scope audits.
 */
export function normalizeHealthHygieneDataset(
  raw: RawHealthHygieneDataset
): RawChapterDataset {
  const catalog = raw.source_catalog ?? {};
  const usedIds = new Set<string>();

  const entries: RawDatasetEntry[] = raw.entries.map((entry) => {
    const rawSourcesById = new Map(
      (entry.evidence_sources ?? []).map((s) => [s.source_id, s])
    );

    const sciSourceIds = entry.scientific_evidence.sources ?? [];
    const evidenceSources: RawEvidenceSource[] = sciSourceIds
      .map((sid): RawEvidenceSource | null => {
        usedIds.add(sid);
        const embedded = rawSourcesById.get(sid);
        const cat = catalog[sid];
        if (!embedded && !cat) return null;
        const baseSource: RawEvidenceSource = embedded
          ? { ...embedded }
          : {
              source_id: sid,
              title: cat.title,
              author_or_institution: cat.institution,
              year: cat.year ?? null,
              url: cat.url,
              what_it_supports: cat.supports,
            };
        return auditHealthHygieneEntrySource(entry.id, baseSource);
      })
      .filter((item): item is RawEvidenceSource => item !== null);

    const refs =
      entry.quranic_evidence.references?.length > 0
        ? entry.quranic_evidence.references
        : entry.quran_reference;

    const allUrls = [
      entry.quranic_evidence.source_url,
      ...(entry.quranic_evidence.additional_source_urls ?? []),
    ].filter(Boolean);

    const sourceLinks = refs.map((ref, idx) => ({
      reference: ref,
      url: allUrls[idx] ?? entry.quranic_evidence.source_url ?? 'https://quran.com/',
    }));

    return {
      id: entry.id,
      title: entry.title,
      quran_reference: entry.quran_reference.join(', '),
      scientific_topic: entry.scientific_topic,
      scientific_finding: entry.scientific_finding,
      connection: entry.connection,
      limitations: entry.limitations,
      evidence_grade: entry.evidence_grade,
      research_status: entry.research_status,
      quranic_evidence: {
        references: refs,
        verse_text_arabic: entry.quranic_evidence.verse_text_arabic,
        translation: entry.quranic_evidence.translation,
        translator: entry.quranic_evidence.translator,
        source_url: entry.quranic_evidence.source_url,
        source_links: sourceLinks,
        text_verification: entry.quranic_evidence.text_verification,
      },
      classical_tafsir_review: {
        status: entry.classical_tafsir_review.status,
        notes: entry.classical_tafsir_review.notes,
        ...(entry.classical_tafsir_review.specific_caution
          ? { specific_caution: entry.classical_tafsir_review.specific_caution }
          : {}),
        sources: entry.classical_tafsir_review.sources ?? [],
      },
      scientific_evidence: {
        finding: entry.scientific_evidence.finding,
        explanation: entry.scientific_evidence.explanation,
        sources: sciSourceIds,
        consensus_note: entry.scientific_evidence.consensus_note,
        limitations: entry.scientific_evidence.limitations,
      },
      connection_analysis: {
        relationship: entry.connection_analysis.relationship,
        connection_type: entry.connection_analysis.connection_type,
        assessment: entry.connection_analysis.assessment,
      },
      evidence_sources: evidenceSources,
      verification_status: `${entry.verification_status} · publication_ready: false`,
      publication_warning: entry.publication_warning,
    };
  });

  const preservedCatalog: NonNullable<RawChapterDataset['source_catalog']> = {};
  for (const [sid, cat] of Object.entries(catalog)) {
    const meta = HEALTH_HYGIENE_CATALOG_WARNINGS[sid];
    preservedCatalog[sid] = {
      ...cat,
      used_in_entries: usedIds.has(sid),
      audit_classification:
        meta?.audit_classification ?? 'General scientific or public-health background',
      verification_pending_note:
        'Awaiting claim-specific verification (URL or portal presence does not establish proof).',
      ...(meta?.source_warning ? { source_warning: meta.source_warning } : {}),
    };
  }

  return {
    heading: raw.heading,
    category_id: raw.category_id,
    version: raw.version,
    description: raw.description,
    grading_guide: raw.grading_guide,
    entries,
    research_methodology: raw.research_methodology,
    source_catalog: preservedCatalog,
  };
}

const HUMAN_PSYCHOLOGY_CATALOG_AUDIT: Record<
  string,
  {
    audit_classification: SourceAuditClassification;
    source_warning?: string;
  }
> = {
  'PSY-S01': {
    audit_classification: 'Psychology dictionary or conceptual reference',
    source_warning:
      'APA Dictionary defines psychological terminology conceptually; a dictionary is not primary empirical evidence.',
  },
  'PSY-S02': {
    audit_classification:
      'Authoritative mental-health or psychology institutional background',
    source_warning:
      'NIMH provides authoritative mental-health background; institutional overview pages do not prove individual topic claims or substitute for clinical care.',
  },
  'PSY-S03': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); findings on religion and mental health are heterogeneous—inspect specific peer-reviewed studies directly.',
  },
  'PSY-S04': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); locate and inspect specific studies on stress, coping, and resilience directly.',
  },
  'PSY-S05': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); locate and inspect specific studies on emotion regulation and self-control directly.',
  },
  'PSY-S06': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); locate and inspect specific studies on gratitude, compassion, and wellbeing directly.',
  },
  'PSY-S07': {
    audit_classification: 'Broad research-informed educational resource',
    source_warning:
      'Greater Good Science Center offers research-informed educational summaries rather than primary peer-reviewed clinical trials.',
  },
  'PSY-S08': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); inspect specific cognitive and decision-making studies directly.',
  },
  'PSY-S09': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); inspect specific studies on misinformation and source credibility directly.',
  },
  'PSY-S10': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); inspect specific studies on social support and relationships directly.',
  },
  'PSY-S11': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); inspect specific studies on prejudice, bias, and intergroup relations directly.',
  },
  'PSY-S12': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only); inspect specific studies on habit formation and behaviour change directly.',
  },
  'PSY-S13': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'Preserved catalog record (unused across PSY-001–PSY-050): PubMed sleep & psychological functioning search portal retained in source_catalog without altering entry links.',
  },
  'PSY-S14': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'Preserved catalog record (unused across PSY-001–PSY-050): Cochrane Library homepage retained in source_catalog; individual systematic reviews must be located per claim.',
  },
  'PSY-S15': {
    audit_classification: 'General institutional homepage or topic directory',
    source_warning:
      'APA Topics directory provides broad professional overviews rather than claim-by-claim empirical proof.',
  },
  'PSY-S16': {
    audit_classification: 'General institutional homepage or topic directory',
    source_warning:
      'Association for Psychological Science homepage; inspect specific peer-reviewed articles directly before treating a claim as verified.',
  },
};

function auditHumanPsychologyEntrySource(
  entryId: string,
  src: RawEvidenceSource
): RawEvidenceSource {
  const sid = src.source_id;
  const baseAudit = HUMAN_PSYCHOLOGY_CATALOG_AUDIT[sid];
  const verification_pending_note =
    'Awaiting claim-specific verification (literature-search portal or overview link is a research lead, not empirical proof).';

  // PSY-043: NIMH Mental Health Information is a scope mismatch for avoiding wasteful spending
  if (entryId === 'PSY-043' && sid === 'PSY-S02') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: NIMH Mental Health Information addresses clinical mental-health conditions rather than consumer spending moderation or wealth ethics.',
    };
  }

  // PSY-017 & PSY-018: Greater Good Science Center is too broad / off-scope for worldly competition & wealth attachment
  if ((entryId === 'PSY-017' || entryId === 'PSY-018') && sid === 'PSY-S07') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: Greater Good Science Center focuses broadly on empathy, gratitude, and social connection rather than directly investigating worldly rivalry or wealth attachment.',
    };
  }

  // PSY-017 & PSY-018: PSY-S11 (prejudice/intergroup bias PubMed search) has narrow relevance to materialism/rivalry
  if ((entryId === 'PSY-017' || entryId === 'PSY-018') && sid === 'PSY-S11') {
    return {
      ...src,
      audit_classification: 'Research database or literature-search portal',
      verification_pending_note,
      source_warning:
        'Scope caution: this PubMed search covers prejudice and intergroup bias rather than materialism or financial rivalry; inspect specific consumer/motivational psychology studies directly.',
    };
  }

  return {
    ...src,
    audit_classification:
      baseAudit?.audit_classification ??
      'General institutional homepage or topic directory',
    verification_pending_note,
    ...(baseAudit?.source_warning ? { source_warning: baseAudit.source_warning } : {}),
  };
}

const HUMAN_PSYCHOLOGY_EDITORIAL_METHODOLOGY: NonNullable<
  RawChapterDataset['research_methodology']
> = {
  standard:
    "Separate five distinct layers in Chapter 09: (1) Qur'anic wording and classical tafsir context, (2) classical moral/spiritual concepts (nafs, qalb, sabr, shukr, taqwa, tazkiyah), (3) contemporary psychological constructs (emotion regulation, coping, cognition, social behaviour), (4) claim-specific empirical findings vs research leads, and (5) ethical/thematic harmony vs empirical proof.",
  evidence_grade_meaning: {
    A: 'Strong and direct thematic/cognitive connection between the verse principle and established psychological research (still not a claim of a scientific miracle).',
    B: 'Good conceptual or behavioural connection, where psychological context and careful interpretation are required.',
    C: 'Possible, broad, or debated thematic connection; findings vary widely across individuals, cultures, and study designs.',
    D: 'No demonstrable empirical connection or primarily theological/spiritual in nature.',
  },
  verification_policy: [
    "Arabic text, English translation, and classical tafsir are pending individual verification across all 50 candidate entries (PSY-001 to PSY-050).",
    "Do not equate Qur'anic terms such as nafs, qalb, sabr, shukr, taqwa, or tazkiyah with a single modern psychological construct without linguistic and exegetical justification.",
    'Distinguish scientific research leads (PubMed literature-search portals, APA Dictionary, NIMH overviews, GGSC educational articles, APA/APS directories) from inspected claim-specific peer-reviewed primary studies.',
    'Recognise individual, cultural, and contextual variation; never generalize group-level associations as universal causation.',
    'Note: Supplied raw dataset root metadata carried legacy template notes from Chapter 01 and has been superseded here with psychology-specific editorial methodology while remaining archived internally for traceability.',
  ],
};

const HUMAN_PSYCHOLOGY_SAFEGUARDS: NonNullable<
  RawChapterDataset['chapter_safeguards']
> = {
  title: 'Mental-Health, Relational & Conceptual Safeguards',
  pillars: [
    'Faith, dhikr, prayer, repentance, and patience are spiritual and devotional resources—not substitutes for clinical assessment, medical diagnosis, psychotherapy, or psychiatric care when a reader faces severe depression, trauma, panic, grief, or psychological crisis.',
    'Encouragements toward sabr (patience) and forgiveness must never justify staying in abusive, violent, or coercive relationships; self-protection, accountability, and safe boundaries are coherent with ethics.',
    'Experiencing prolonged sorrow, grief, or clinical anxiety does not signify weak faith (e.g., Prophet Ya‘qub’s deep grief in 12:84).',
    'Clearly distinguish envy/hasad (wishing harm or loss upon another) from clinical or relational jealousy and insecurity.',
    'Clearly distinguish malicious gossip/backbiting (ghibah) from legitimate safeguarding, truth-telling, whistleblowing, and abuse or crime reporting.',
  ],
  terminology_caution:
    "Avoid equating qalb (heart), nafs (self/soul), sabr (patient perseverance), shukr (gratitude), taqwa (God-consciousness/restraint), or tazkiyah (purification) one-for-one with a single psychometric scale.",
  clinical_disclaimer:
    'Educational & research synthesis only. Not a diagnostic instrument, psychological assessment, risk calculator, or clinical treatment guide.',
};

/**
 * Adapts Chapter 09 (Human Psychology and Behaviour) v2 reference-format JSON
 * into the unified `RawChapterDataset` structure while preserving all 50 candidate
 * entries, null Arabic/translation/translator fields, 16 source_catalog records,
 * and replacing stale root cosmology metadata with psychology methodology & safeguards.
 */
export function normalizeHumanPsychologyDataset(
  raw: RawHumanPsychologyDataset
): RawChapterDataset {
  const catalog = raw.source_catalog ?? {};
  const usedIds = new Set<string>();

  const entries: RawDatasetEntry[] = raw.entries.map((entry) => {
    const rawSourcesById = new Map(
      (entry.evidence_sources ?? []).map((s) => [s.source_id, s])
    );

    const sciSourceIds = entry.scientific_evidence.sources ?? [];
    const evidenceSources: RawEvidenceSource[] = sciSourceIds
      .map((sid): RawEvidenceSource | null => {
        usedIds.add(sid);
        const embedded = rawSourcesById.get(sid);
        const cat = catalog[sid];
        if (!embedded && !cat) return null;
        const baseSource: RawEvidenceSource = embedded
          ? { ...embedded }
          : {
              source_id: sid,
              title: cat.title,
              author_or_institution: cat.institution,
              year: cat.year ?? null,
              url: cat.url,
              what_it_supports: cat.supports,
            };
        return auditHumanPsychologyEntrySource(entry.id, baseSource);
      })
      .filter((item): item is RawEvidenceSource => item !== null);

    const refs =
      entry.quranic_evidence.references?.length > 0
        ? entry.quranic_evidence.references
        : entry.quran_reference;

    const allUrls = [
      entry.quranic_evidence.source_url,
      ...(entry.quranic_evidence.additional_source_urls ?? []),
    ].filter(Boolean);

    const sourceLinks = refs.map((ref, idx) => ({
      reference: ref,
      url: allUrls[idx] ?? entry.quranic_evidence.source_url ?? 'https://quran.com/',
    }));

    return {
      id: entry.id,
      title: entry.title,
      quran_reference: entry.quran_reference.join(', '),
      scientific_topic: entry.scientific_topic,
      scientific_finding: entry.scientific_finding,
      connection: entry.connection,
      limitations: entry.limitations,
      evidence_grade: entry.evidence_grade,
      research_status: entry.research_status,
      quranic_evidence: {
        references: refs,
        verse_text_arabic: entry.quranic_evidence.verse_text_arabic,
        translation: entry.quranic_evidence.translation,
        translator: entry.quranic_evidence.translator,
        source_url: entry.quranic_evidence.source_url,
        source_links: sourceLinks,
        text_verification: entry.quranic_evidence.text_verification,
      },
      classical_tafsir_review: {
        status: entry.classical_tafsir_review.status,
        notes: entry.classical_tafsir_review.notes,
        ...(entry.classical_tafsir_review.specific_caution
          ? { specific_caution: entry.classical_tafsir_review.specific_caution }
          : {}),
        sources: entry.classical_tafsir_review.sources ?? [],
      },
      scientific_evidence: {
        finding: entry.scientific_evidence.finding,
        explanation: entry.scientific_evidence.explanation,
        sources: sciSourceIds,
        consensus_note: entry.scientific_evidence.consensus_note,
        limitations: entry.scientific_evidence.limitations,
      },
      connection_analysis: {
        relationship: entry.connection_analysis.relationship,
        connection_type: entry.connection_analysis.connection_type,
        assessment: entry.connection_analysis.assessment,
      },
      evidence_sources: evidenceSources,
      verification_status: `${entry.verification_status} · publication_ready: false`,
      publication_warning: entry.publication_warning,
    };
  });

  const preservedCatalog: NonNullable<RawChapterDataset['source_catalog']> = {};
  for (const [sid, cat] of Object.entries(catalog)) {
    const meta = HUMAN_PSYCHOLOGY_CATALOG_AUDIT[sid];
    preservedCatalog[sid] = {
      ...cat,
      used_in_entries: usedIds.has(sid),
      audit_classification:
        meta?.audit_classification ??
        'General institutional homepage or topic directory',
      verification_pending_note:
        'Awaiting claim-specific verification (search portal or institutional overview is a lead, not proof).',
      ...(meta?.source_warning ? { source_warning: meta.source_warning } : {}),
    };
  }

  return {
    heading: raw.heading,
    category_id: raw.category_id,
    version: raw.version,
    description: raw.description,
    grading_guide: raw.grading_guide,
    entries,
    research_methodology: HUMAN_PSYCHOLOGY_EDITORIAL_METHODOLOGY,
    chapter_safeguards: HUMAN_PSYCHOLOGY_SAFEGUARDS,
    raw_root_traceability: {
      raw_status: raw.status,
      raw_source_policy: raw.source_policy,
      raw_research_methodology: raw.research_methodology,
      raw_quality_control_summary: raw.quality_control_summary,
      correction_note:
        'Raw JSON root source_policy and research_methodology contained legacy cosmology template fields; superseded in UI by Chapter 09 psychological methodology and safeguards while kept here for traceability.',
    },
    source_catalog: preservedCatalog,
  };
}

const SOCIAL_LIFE_ETHICS_CATALOG_AUDIT: Record<
  string,
  {
    audit_classification: SourceAuditClassification;
    source_warning?: string;
  }
> = {
  'SOC-S01': {
    audit_classification: 'Broad institutional research and policy resource',
    source_warning:
      'World Bank policy research portal (research lead only); inspect specific empirical governance, poverty, or institutional studies directly.',
  },
  'SOC-S02': {
    audit_classification: 'Broad institutional research and policy resource',
    source_warning:
      'OECD governance and trust portal (research lead only); institutional frameworks do not verify individual ethical or social claims without claim-specific citations.',
  },
  'SOC-S03': {
    audit_classification: 'International framework and data resource',
    source_warning:
      'UN Sustainable Development Goals framework (international policy and indicator portal; not a primary empirical study).',
  },
  'SOC-S04': {
    audit_classification: 'Broad institutional research and policy resource',
    source_warning:
      'UNODC corruption and economic crime portal (institutional policy and legal lead; inspect specific empirical studies directly).',
  },
  'SOC-S05': {
    audit_classification: 'Broad institutional research and policy resource',
    source_warning:
      'International Labour Organization labour-rights portal (international standards and policy resource, not an individual empirical study).',
  },
  'SOC-S06': {
    audit_classification: 'Broad institutional research and policy resource',
    source_warning:
      'UNICEF child protection portal (institutional framework and child-welfare resource; inspect claim-specific research directly).',
  },
  'SOC-S07': {
    audit_classification: 'Broad institutional research and policy resource',
    source_warning:
      'WHO social determinants of health portal (broad public-health framework, not an individual study).',
  },
  'SOC-S08': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only, not an individual peer-reviewed study); inspect specific social-support studies directly.',
  },
  'SOC-S09': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only, not an individual peer-reviewed study); inspect specific procedural-justice and trust studies directly.',
  },
  'SOC-S10': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only, not an individual peer-reviewed study); inspect specific prosocial-behaviour studies directly.',
  },
  'SOC-S11': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only, not an individual peer-reviewed study); inspect specific family and child-development studies directly.',
  },
  'SOC-S12': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only, not an individual peer-reviewed study); inspect specific conflict-resolution and cooperation studies directly.',
  },
  'SOC-S13': {
    audit_classification: 'Research database or literature-search portal',
    source_warning:
      'PubMed literature-search portal (research lead only, not an individual peer-reviewed study); inspect specific market-trust and consumer-protection studies directly.',
  },
  'SOC-S14': {
    audit_classification: 'Broad institutional research and policy resource',
    source_warning:
      'UNEP resource-efficiency portal (broad environmental policy resource; check topic-level relevance where applied outside environmental stewardship).',
  },
  'SOC-S15': {
    audit_classification: 'Academic discovery portal (Google Scholar)',
    source_warning:
      'Google Scholar academic discovery portal (search lead only, not a specific peer-reviewed paper or verified citation).',
  },
  'SOC-S16': {
    audit_classification: 'Compiled datasets and research summaries',
    source_warning:
      'Preserved catalog record (unused across SOC-001–SOC-050): Our World in Data retained in source_catalog without attaching it to any entry.',
  },
};

const SOC_UNEP_SCOPE_MISMATCH_IDS = new Set([
  'SOC-011',
  'SOC-015',
  'SOC-032',
  'SOC-033',
  'SOC-048',
  'SOC-049',
]);

const SOC_GRADE_A_CAUTION_IDS = new Set([
  'SOC-001',
  'SOC-006',
  'SOC-009',
  'SOC-031',
]);

function auditSocialLifeEthicsEntrySource(
  entryId: string,
  src: RawEvidenceSource
): RawEvidenceSource {
  const sid = src.source_id;
  const baseAudit = SOCIAL_LIFE_ETHICS_CATALOG_AUDIT[sid];
  const verification_pending_note =
    'Awaiting claim-specific verification (institutional policy portal, UN framework, PubMed search, or Google Scholar portal is a research lead, not verified empirical proof).';

  // SOC-S14 (UNEP resource efficiency) attached to non-environmental entries
  if (SOC_UNEP_SCOPE_MISMATCH_IDS.has(entryId) && sid === 'SOC-S14') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: UNEP Resource Efficiency addresses environmental resource flows rather than poverty charity, household budgeting, social unity, anti-bribery, or civic courtesy.',
    };
  }

  // SOC-S06 (UNICEF child protection) attached to adult neighbourhood cohesion
  if (entryId === 'SOC-024' && sid === 'SOC-S06') {
    return {
      ...src,
      audit_classification:
        'Source-scope mismatch or insufficiently specific source',
      verification_pending_note,
      source_warning:
        'Source-scope mismatch: UNICEF Child Protection focuses on safeguarding children rather than adult neighbourhood relations and general neighbour rights.',
    };
  }

  // SOC-S13 (PubMed consumer fraud search) attached to broad impartiality/peaceful coexistence entries
  if ((entryId === 'SOC-002' || entryId === 'SOC-046') && sid === 'SOC-S13') {
    return {
      ...src,
      audit_classification: 'Research database or literature-search portal',
      verification_pending_note,
      source_warning:
        'PubMed literature-search portal (scope caution): search query targets consumer protection and fraud rather than impartial conflict-of-interest judgment or peaceful intergroup relations; locate topic-specific studies directly.',
    };
  }

  return {
    ...src,
    audit_classification:
      baseAudit?.audit_classification ??
      'Broad institutional research and policy resource',
    verification_pending_note,
    ...(baseAudit?.source_warning ? { source_warning: baseAudit.source_warning } : {}),
  };
}

export const SOCIAL_LIFE_ETHICS_EDITORIAL_METHODOLOGY: NonNullable<
  RawChapterDataset['research_methodology']
> = {
  standard:
    "Separate five distinct layers in Chapter 10: (1) Qur'anic wording and historical revelation/tafsir context, (2) classical moral, civic, and legal principles (‘adl justice, amanah trust, sulh reconciliation, shura consultation, rahmah mercy, zakah/sadaqah social responsibility, adab civic etiquette), (3) modern sociology, governance, economics, law, family psychology, and public-health frameworks, (4) claim-specific empirical findings vs research leads (World Bank, OECD, UN SDGs, UNODC, ILO, UNICEF, WHO, UNEP portals, PubMed searches, Google Scholar), and (5) ethical/social compatibility vs empirical prediction or scientific miracle claims.",
  evidence_grade_meaning: {
    A: 'Strong thematic or institutional alignment between a concrete social/ethical practice (justice, honest weights, written debt records, verifying reports) and well-documented social-science principles; does NOT prove a scientific prediction or miracle.',
    B: 'Good conceptual or civic-social alignment, where historical, legal, institutional, and cultural context is required.',
    C: 'Broad, interpretive, or context-dependent social/ethical connection across diverse societies and eras.',
    D: 'No demonstrable empirical connection or primarily devotional, normative, or theological in nature.',
  },
  verification_policy: [
    'All 50 entries (SOC-001 to SOC-050) are candidate drafts (publication_ready: false) with null Arabic verse text, English translation, and translator fields awaiting verse-by-verse verification.',
    'All 50 entries carry unverified classical tafsir review (not_yet_individually_verified) and verification_status research_leads_added_claim_specific_verification_pending.',
    'Grade A entries (SOC-001, SOC-006, SOC-009, SOC-031) retain their supplied Grade A with explicit editorial review warnings clarifying that ethical/social compatibility does not establish a scientific prediction or miracle.',
    'PubMed (SOC-S08–SOC-S13) and Google Scholar (SOC-S15) are research discovery portals, not individual peer-reviewed studies; Our World in Data (SOC-S16) is preserved in source_catalog with zero entry links.',
    'Supplied raw JSON root source_policy and research_methodology contained legacy Chapter 01 cosmology template strings and are superseded here by social-ethics methodology while archived internally for traceability.',
  ],
};

const SOCIAL_LIFE_ETHICS_SAFEGUARDS: NonNullable<
  RawChapterDataset['chapter_safeguards']
> = {
  title: 'Social, Legal, Relational & Safeguard Boundaries',
  verification_notice:
    'Verification & Editorial Notice: All 50 Chapter 10 entries are candidate drafts awaiting verified Arabic verses, English translations, translator attributions, classical tafsir reviews, and claim-specific primary social-science citations. Normative ethics are distinguished from empirical causation, and raw template cosmology notes have been superseded.',
  pillars: [
    '1. Marriage & Spousal Relations (SOC-016): Mutual affection and mercy never justify domestic abuse, coercion, or denying legal recourse, safety, or divorce protections.',
    '2. Family Care & Honouring Parents (SOC-017, SOC-018): Respecting parents and maintaining kinship ties does not override personal safety or require obedience to unlawful, abusive, or harmful conduct.',
    '3. Care & Kindness Toward Children (SOC-019): Nurturing family warmth aligns with child-protection principles and rejects emotional neglect or violence against minors.',
    '4. Orphans, Poverty & Vulnerable People (SOC-011, SOC-012, SOC-013, SOC-020, SOC-021, SOC-022): Charity and hospitality complement—and must never replace—enforceable legal protections, fair wages, guardianship accountability, and public social safety nets.',
    '5. Privacy, Dignity & Non-Intrusion (SOC-026, SOC-027, SOC-029): Rejecting spying and protecting privacy must never shield abuse, fraud, child harm, or mandatory safeguarding disclosures.',
    '6. Speech, Gossip & Backbiting (SOC-029, SOC-030, SOC-031): Restraint against slander and rumour complements legitimate whistleblowing, victim testimony, journalism, and formal reporting of misconduct.',
    '7. Reconciliation & Peacemaking (SOC-005, SOC-035, SOC-036): Fair mediation requires safety, accountability, and equal voice—never pressuring vulnerable parties or victims into unsafe silence.',
    '8. Cooperation & Civic Responsibility (SOC-032, SOC-033, SOC-034, SOC-049): Shared civic action respects voluntary conscience and peaceful civic pluralism rather than coercive conformity.',
    '9. Human Dignity & Equality (SOC-037, SOC-038, SOC-039, SOC-040): Universal dignity, fair labour, and equal legal standing apply across race, nationality, gender, age, ability, and socio-economic status.',
    '10. Respecting Religious Difference (SOC-045, SOC-046, SOC-047): Non-compulsion and peaceful coexistence oppose prejudice, sectarian hostility, and discrimination.',
    '11. Violence, Conflict & Public Safety (SOC-043, SOC-044, SOC-045): Rejecting aggression and upholding proportionality support public safety and due process rather than private vigilantism.',
    '12. Shared Resources, Anti-Corruption & Public Trust (SOC-006–SOC-009, SOC-014, SOC-041, SOC-042, SOC-048): Ethical stewardship complements enforceable auditing, public transparency, and environmental governance.',
  ],
  terminology_caution:
    "Avoid reducing rich Qur'anic ethical terms (‘adl justice, amanah trust, sulh reconciliation, shura consultation, rahmah mercy, ghibah backbiting, tajassus spying) to a single contemporary policy indicator or legal code without exegetical and historical analysis.",
  clinical_disclaimer:
    'Educational & research synthesis only. Not legal advice, clinical or psychological counselling, domestic-violence intervention guidance, financial auditing advice, or a religious legal verdict (fatwa).',
};

/**
 * Adapts Chapter 10 (Social Life, Ethics and Everyday Practices) v2 reference-format JSON
 * into the unified `RawChapterDataset` structure while preserving all 50 candidate entries,
 * null Arabic/translation/translator fields, 16 source_catalog records (`SOC-S16` unused),
 * Grade A caution notices, and replacing stale root cosmology metadata with social-ethics
 * methodology and 12-domain safeguards.
 */
export function normalizeSocialLifeEthicsDataset(
  raw: RawSocialLifeEthicsDataset
): RawChapterDataset {
  const catalog = raw.source_catalog ?? {};
  const usedIds = new Set<string>();

  const entries: RawDatasetEntry[] = raw.entries.map((entry) => {
    const rawSourcesById = new Map(
      (entry.evidence_sources ?? []).map((s) => [s.source_id, s])
    );

    const sciSourceIds = entry.scientific_evidence.sources ?? [];
    const evidenceSources: RawEvidenceSource[] = sciSourceIds
      .map((sid): RawEvidenceSource | null => {
        usedIds.add(sid);
        const embedded = rawSourcesById.get(sid);
        const cat = catalog[sid];
        if (!embedded && !cat) return null;
        const baseSource: RawEvidenceSource = embedded
          ? { ...embedded }
          : {
              source_id: sid,
              title: cat.title,
              author_or_institution: cat.institution,
              year: cat.year ?? null,
              url: cat.url,
              what_it_supports: cat.supports,
            };
        return auditSocialLifeEthicsEntrySource(entry.id, baseSource);
      })
      .filter((item): item is RawEvidenceSource => item !== null);

    const refs =
      entry.quranic_evidence.references?.length > 0
        ? entry.quranic_evidence.references
        : entry.quran_reference;

    const allUrls = [
      entry.quranic_evidence.source_url,
      ...(entry.quranic_evidence.additional_source_urls ?? []),
    ].filter(Boolean);

    const sourceLinks = refs.map((ref, idx) => ({
      reference: ref,
      url: allUrls[idx] ?? entry.quranic_evidence.source_url ?? 'https://quran.com/',
    }));

    return {
      id: entry.id,
      title: entry.title,
      quran_reference: entry.quran_reference.join(', '),
      scientific_topic: entry.scientific_topic,
      scientific_finding: entry.scientific_finding,
      connection: entry.connection,
      limitations: entry.limitations,
      evidence_grade: entry.evidence_grade,
      research_status: entry.research_status,
      quranic_evidence: {
        references: refs,
        verse_text_arabic: entry.quranic_evidence.verse_text_arabic,
        translation: entry.quranic_evidence.translation,
        translator: entry.quranic_evidence.translator,
        source_url: entry.quranic_evidence.source_url,
        source_links: sourceLinks,
        text_verification: entry.quranic_evidence.text_verification,
      },
      classical_tafsir_review: {
        status: entry.classical_tafsir_review.status,
        notes: entry.classical_tafsir_review.notes,
        ...(entry.classical_tafsir_review.specific_caution
          ? { specific_caution: entry.classical_tafsir_review.specific_caution }
          : {}),
        sources: entry.classical_tafsir_review.sources ?? [],
      },
      scientific_evidence: {
        finding: entry.scientific_evidence.finding,
        explanation: entry.scientific_evidence.explanation,
        sources: sciSourceIds,
        consensus_note: entry.scientific_evidence.consensus_note,
        limitations: entry.scientific_evidence.limitations,
      },
      connection_analysis: {
        relationship: entry.connection_analysis.relationship,
        connection_type: entry.connection_analysis.connection_type,
        assessment: entry.connection_analysis.assessment,
      },
      evidence_sources: evidenceSources,
      verification_status: `${entry.verification_status} · publication_ready: false`,
      publication_warning: entry.publication_warning,
      ...(SOC_GRADE_A_CAUTION_IDS.has(entry.id) || entry.evidence_grade === 'A'
        ? {
            editorial_review_warning:
              'Editorial Review Caution (Supplied Grade A): Grade A is preserved from the supplied dataset, but a strong ethical or social alignment does not automatically establish a scientific prediction or empirical miracle claim. Claim-specific social-science verification remains pending.',
          }
        : {}),
    };
  });

  const preservedCatalog: NonNullable<RawChapterDataset['source_catalog']> = {};
  for (const [sid, cat] of Object.entries(catalog)) {
    const meta = SOCIAL_LIFE_ETHICS_CATALOG_AUDIT[sid];
    preservedCatalog[sid] = {
      ...cat,
      used_in_entries: usedIds.has(sid),
      audit_classification:
        meta?.audit_classification ??
        'Broad institutional research and policy resource',
      verification_pending_note:
        'Awaiting claim-specific verification (institutional overview, search portal, or compiled data summary is a research lead, not verified empirical proof).',
      ...(meta?.source_warning ? { source_warning: meta.source_warning } : {}),
    };
  }

  return {
    heading: raw.heading,
    category_id: raw.category_id,
    version: raw.version,
    description: raw.description,
    grading_guide: raw.grading_guide,
    entries,
    research_methodology: SOCIAL_LIFE_ETHICS_EDITORIAL_METHODOLOGY,
    chapter_safeguards: SOCIAL_LIFE_ETHICS_SAFEGUARDS,
    raw_root_traceability: {
      raw_status: raw.status,
      raw_source_policy: raw.source_policy,
      raw_research_methodology: raw.research_methodology,
      raw_quality_control_summary: raw.quality_control_summary,
      correction_note:
        'Raw JSON root source_policy and research_methodology contained legacy cosmology template fields; superseded in UI by Chapter 10 social-ethics methodology and 12-domain safeguards while kept here for traceability.',
    },
    source_catalog: preservedCatalog,
  };
}

/**
 * Generates a clearly marked structural template topic for chapters whose
 * JSON datasets have not yet been supplied. Zero claims or verses are fabricated.
 */
export function createPlaceholderTopic(
  chapter: ChapterMetadata,
  index = 1
): ResearchTopic {
  const paddedTopic = String(index).padStart(2, '0');
  const topicCode = `${chapter.paddedNumber}.${paddedTopic}`;

  return {
    id: `${chapter.id}-topic-${paddedTopic}-template`,
    chapterId: chapter.id,
    topicNumber: topicCode,
    title: `[Template Placeholder] Research Topic ${topicCode} — ${chapter.shortTitle}`,
    quranicReference: `[Placeholder: Surah Name : Verse Number — ${chapter.paddedNumber}_topics.json]`,
    arabicVerse: `﴿ نَصُّ الآيَةِ الكَرِيمَةِ — قَيْدُ الإِعْدَادِ ﴾`,
    translation:
      '[Placeholder: Verified English Qur’anic translation will be populated here directly from the supplied JSON dataset, preserving exact wording and punctuation.]',
    translator: '[Placeholder: Translator Attribution]',
    scientificTopic: `[Placeholder: Core Scientific Domain within ${chapter.title}]`,
    scientificFinding:
      '[Placeholder: Concise summary of the peer-reviewed scientific finding or observational consensus associated with this topic ID.]',
    scientificExplanation:
      '[Placeholder: Detailed, accessible scientific explanation outlining physical, biological, or empirical mechanisms without overstatement.]',
    diagramPlaceholderCaption: `Fig. ${topicCode} — [Placeholder: Scientific diagram / cross-sectional illustration slot reserved for JSON figure asset or specification]`,
    connectionAnalysis:
      '[Placeholder: Methodological synthesis examining points of linguistic resonance, thematic alignment, and epistemological boundaries between the Qur’anic text and the scientific record.]',
    connectionType: '[Placeholder: Connection Classification]',
    limitationsAndCautions:
      '[Placeholder: Explicit scholarly cautions, methodological limitations, distinction between established empirical consensus and tentative scientific hypotheses, and avoidance of forced concordism.]',
    evidenceGrade: '[Placeholder: Evidence Grade]',
    classicalTafsirReview:
      '[Placeholder: Survey of classical exegetical scholarship (Tafsir) establishing how pre-modern scholars understood the wording and context independently of modern scientific frameworks.]',
    scientificEvidenceSources: [
      {
        id: 'src-1',
        citation:
          '[Placeholder: Primary peer-reviewed journal citation, monograph, or institutional scientific observatory report]',
        identifier: 'DOI / Catalog Reference Placeholder',
      },
    ],
    additionalReferences: [
      {
        id: 'ref-1',
        citation:
          '[Placeholder: Classical Tafsir edition, volume, and page reference or lexicographical source]',
      },
    ],
    isPlaceholder: true,
  };
}

const CHAPTER_ENRICHMENT_BY_ID: Record<
  string,
  Record<string, TopicEnrichment>
> = {
  'chapter-01': COSMOLOGY_ENRICHMENT,
  'chapter-02': GEOLOGY_ENRICHMENT,
  'chapter-03': OCEANS_ENRICHMENT,
  'chapter-04': WEATHER_ENRICHMENT,
  'chapter-05': PLANTS_ENRICHMENT,
  'chapter-06': ANIMALS_ENRICHMENT,
  'chapter-07': HUMAN_BIOLOGY_ENRICHMENT,
  'chapter-08': HEALTH_HYGIENE_ENRICHMENT,
  'chapter-09': HUMAN_PSYCHOLOGY_ENRICHMENT,
  'chapter-10': SOCIAL_LIFE_ETHICS_ENRICHMENT,
};

/**
 * Compiles the entire encyclopedia into ordered two-page spreads.
 * Every research topic occupies EXACTLY ONE dedicated folio (page), never two.
 */
export function buildBookSpreads(
  datasetsByChapter: Record<string, RawChapterDataset | undefined> = {}
): BookSpread[] {
  const spreads: BookSpread[] = [];
  let folioCounter = 1;
  const nextFolioNumber = () => folioCounter++;

  // Spread 0: Frontispiece & Intro Page 1 (Welcome)
  spreads.push({
    id: 'intro-welcome',
    index: spreads.length,
    title: 'Welcome & Purpose',
    sectionLabel: 'Introduction',
    left: {
      folioNumber: nextFolioNumber(),
      side: 'left',
      type: 'frontispiece',
      sectionLabel: 'Title Folio',
    },
    right: {
      folioNumber: nextFolioNumber(),
      side: 'right',
      type: 'intro-welcome',
      sectionLabel: 'Intro · Page 1',
    },
  });

  // Spread 1: Intro Pages 2 & 3 (Qur'anic Invitation to Reflect & Faith vs. Scientific Inquiry)
  spreads.push({
    id: 'intro-reflection',
    index: spreads.length,
    title: 'Reflection & Scientific Inquiry',
    sectionLabel: 'Introduction',
    left: {
      folioNumber: nextFolioNumber(),
      side: 'left',
      type: 'intro-reflection',
      sectionLabel: 'Intro · Page 2',
    },
    right: {
      folioNumber: nextFolioNumber(),
      side: 'right',
      type: 'intro-faith-science',
      sectionLabel: 'Intro · Page 3',
    },
  });

  // Spread 2: Intro Pages 4 & 5 (How to Read & Evidence Evaluation Methodology)
  spreads.push({
    id: 'intro-methodology',
    index: spreads.length,
    title: 'Reader Guide & Methodology',
    sectionLabel: 'Introduction',
    left: {
      folioNumber: nextFolioNumber(),
      side: 'left',
      type: 'intro-guide',
      sectionLabel: 'Intro · Page 4',
    },
    right: {
      folioNumber: nextFolioNumber(),
      side: 'right',
      type: 'intro-methodology',
      sectionLabel: 'Intro · Page 5',
    },
  });

  // Spread 3: Intro Pages 6 & 7 (Evidence Grades & Research Verification Process)
  spreads.push({
    id: 'intro-grading',
    index: spreads.length,
    title: 'Evidence Grades & Verification',
    sectionLabel: 'Introduction',
    left: {
      folioNumber: nextFolioNumber(),
      side: 'left',
      type: 'intro-grading',
      sectionLabel: 'Intro · Page 6',
    },
    right: {
      folioNumber: nextFolioNumber(),
      side: 'right',
      type: 'intro-verification',
      sectionLabel: 'Intro · Page 7',
    },
  });

  // Spread 4: Intro Pages 8 & 9 (Editorial Responsibility & Acknowledgements)
  spreads.push({
    id: 'intro-responsibility',
    index: spreads.length,
    title: 'Responsibility & Acknowledgements',
    sectionLabel: 'Introduction',
    left: {
      folioNumber: nextFolioNumber(),
      side: 'left',
      type: 'intro-responsibility',
      sectionLabel: 'Intro · Page 8',
    },
    right: {
      folioNumber: nextFolioNumber(),
      side: 'right',
      type: 'intro-acknowledgements',
      sectionLabel: 'Intro · Page 9',
    },
  });

  // Spread 5: Intro Page 10 (An Invitation to Reflect) & Complete Volume Atlas
  spreads.push({
    id: 'intro-invitation',
    index: spreads.length,
    title: 'An Invitation to Reflect',
    sectionLabel: 'Introduction',
    left: {
      folioNumber: nextFolioNumber(),
      side: 'left',
      type: 'intro-invitation',
      sectionLabel: 'Intro · Page 10',
    },
    right: {
      folioNumber: nextFolioNumber(),
      side: 'right',
      type: 'intro-overview',
      sectionLabel: 'Volume Atlas',
    },
  });

  // Spread 6: Table of Contents (Chapters 01–05 Left, 06–10 Right)
  spreads.push({
    id: 'table-of-contents',
    index: spreads.length,
    title: 'Table of Contents',
    sectionLabel: 'Table of Contents',
    left: {
      folioNumber: nextFolioNumber(),
      side: 'left',
      type: 'toc-part-1',
      sectionLabel: 'Contents · I–V',
    },
    right: {
      folioNumber: nextFolioNumber(),
      side: 'right',
      type: 'toc-part-2',
      sectionLabel: 'Contents · VI–X',
    },
  });

  const totalGlobalTopics = CHAPTERS.reduce(
    (sum, ch) => sum + (datasetsByChapter[ch.id]?.entries.length ?? 0),
    0
  );
  let globalTopicCounter = 0;

  // Chapters 01–10
  for (let cIdx = 0; cIdx < CHAPTERS.length; cIdx++) {
    const chapter = CHAPTERS[cIdx];
    const dataset = datasetsByChapter[chapter.id];

    // Chapter Opening Spread: Plate on Left, Chapter Directory & Source Catalogue on Right
    spreads.push({
      id: `${chapter.id}-opening`,
      index: spreads.length,
      title: `${chapter.paddedNumber}. ${chapter.title}`,
      sectionLabel: `Chapter ${chapter.paddedNumber}`,
      chapterId: chapter.id,
      left: {
        folioNumber: nextFolioNumber(),
        side: 'left',
        type: 'chapter-plate',
        sectionLabel: `${chapter.plateLabel} · ${chapter.shortTitle}`,
        chapter,
      },
      right: {
        folioNumber: nextFolioNumber(),
        side: 'right',
        type: 'chapter-index',
        sectionLabel: `Chapter ${chapter.paddedNumber} · Directory`,
        chapter,
      },
    });

    // Dedicated Chapter Introduction Spread immediately before topic pages
    spreads.push({
      id: `${chapter.id}-introduction`,
      index: spreads.length,
      title: `${chapter.paddedNumber}. Chapter Introduction`,
      sectionLabel: `Chapter ${chapter.paddedNumber} Intro`,
      chapterId: chapter.id,
      left: {
        folioNumber: nextFolioNumber(),
        side: 'left',
        type: 'chapter-intro',
        sectionLabel: `Chapter ${chapter.paddedNumber} · Overview`,
        chapter,
      },
      right: {
        folioNumber: nextFolioNumber(),
        side: 'right',
        type: 'chapter-intro-methods',
        sectionLabel: `Chapter ${chapter.paddedNumber} · Methods & Cautions`,
        chapter,
      },
    });

    if (dataset && dataset.entries.length > 0) {
      const entries: RawDatasetEntry[] = dataset.entries.map((entry) =>
        entry.quranic_evidence.verified_passages
          ? entry
          : enrichEntryWithVerifiedQuranAndTafsir(entry)
      );
      const chapterEnrichment = CHAPTER_ENRICHMENT_BY_ID[chapter.id];

      // Pair topics 2-by-2 onto physical spreads so EVERY topic occupies EXACTLY ONE folio!
      for (let i = 0; i < entries.length; i += 2) {
        const leftEntry = entries[i];
        const rightEntry = entries[i + 1];

        const leftGlobalNumber = ++globalTopicCounter;
        const rightGlobalNumber = rightEntry ? ++globalTopicCounter : undefined;

        const leftPrevEntry = i > 0 ? entries[i - 1] : undefined;
        const leftNextEntry = rightEntry ? rightEntry : undefined;

        const rightPrevEntry = leftEntry;
        const rightNextEntry =
          i + 2 < entries.length ? entries[i + 2] : undefined;

        const spreadTitle = rightEntry
          ? `Topic ${String(i + 1).padStart(2, '0')} (${leftEntry.id}) & Topic ${String(i + 2).padStart(2, '0')} (${rightEntry.id})`
          : `Topic ${String(i + 1).padStart(2, '0')} (${leftEntry.id})`;

        spreads.push({
          id: `${chapter.id}-topics-${leftEntry.id}`,
          index: spreads.length,
          title: spreadTitle,
          sectionLabel: `Chapter ${chapter.paddedNumber} · ${chapter.shortTitle}`,
          chapterId: chapter.id,
          left: {
            folioNumber: nextFolioNumber(),
            side: 'left',
            type: 'topic-single',
            sectionLabel: `Topic ${String(i + 1).padStart(2, '0')} · ${leftEntry.id}`,
            chapter,
            rawEntry: leftEntry,
            enrichment: chapterEnrichment?.[leftEntry.id],
            gradingGuide: dataset.grading_guide,
            topicIndexInChapter: i + 1,
            totalTopicsInChapter: entries.length,
            globalTopicNumber: leftGlobalNumber,
            totalGlobalTopics,
            figureNumber: `${chapter.paddedNumber}.${String(i + 1).padStart(2, '0')}`,
            prevTopicId: leftPrevEntry?.id,
            prevTopicTitle: leftPrevEntry?.title,
            nextTopicId: leftNextEntry?.id,
            nextTopicTitle: leftNextEntry?.title,
            relatedTopics: computeRelatedTopics(
              leftEntry,
              entries,
              chapterEnrichment
            ),
          },
          right: rightEntry
            ? {
                folioNumber: nextFolioNumber(),
                side: 'right',
                type: 'topic-single',
                sectionLabel: `Topic ${String(i + 2).padStart(2, '0')} · ${rightEntry.id}`,
                chapter,
                rawEntry: rightEntry,
                enrichment: chapterEnrichment?.[rightEntry.id],
                gradingGuide: dataset.grading_guide,
                topicIndexInChapter: i + 2,
                totalTopicsInChapter: entries.length,
                globalTopicNumber: rightGlobalNumber,
                totalGlobalTopics,
                figureNumber: `${chapter.paddedNumber}.${String(i + 2).padStart(2, '0')}`,
                prevTopicId: rightPrevEntry.id,
                prevTopicTitle: rightPrevEntry.title,
                nextTopicId: rightNextEntry?.id,
                nextTopicTitle: rightNextEntry?.title,
                relatedTopics: computeRelatedTopics(
                  rightEntry,
                  entries,
                  chapterEnrichment
                ),
              }
            : {
                folioNumber: nextFolioNumber(),
                side: 'right',
                type: 'chapter-epilogue',
                sectionLabel: `End of Chapter ${chapter.paddedNumber}`,
                chapter,
              },
        });
      }
    } else {
      // Single-page template foundation for chapters awaiting JSON datasets
      const placeholder = createPlaceholderTopic(chapter, 1);
      spreads.push({
        id: `${chapter.id}-template`,
        index: spreads.length,
        title: `Topic ${placeholder.topicNumber} (Template)`,
        sectionLabel: `Chapter ${chapter.paddedNumber} · Template`,
        chapterId: chapter.id,
        left: {
          folioNumber: nextFolioNumber(),
          side: 'left',
          type: 'topic-template-single',
          sectionLabel: `Chapter ${chapter.paddedNumber} · Topic ${placeholder.topicNumber}`,
          chapter,
          templateTopic: placeholder,
          topicIndexInChapter: 1,
          totalTopicsInChapter: chapter.expectedTopicCount,
        },
        right: {
          folioNumber: nextFolioNumber(),
          side: 'right',
          type: 'chapter-epilogue',
          sectionLabel: `Chapter ${chapter.paddedNumber} · Dataset Pending`,
          chapter,
        },
      });
    }
  }

  return spreads;
}

const topicLocationCache = new WeakMap<
  BookSpread[],
  Map<string, { spreadIndex: number; side: 'left' | 'right' }>
>();

export function findTopicLocation(
  spreads: BookSpread[],
  topicId: string
): { spreadIndex: number; side: 'left' | 'right' } | null {
  let indexMap = topicLocationCache.get(spreads);
  if (!indexMap) {
    indexMap = new Map();
    for (let i = 0; i < spreads.length; i++) {
      const s = spreads[i];
      if (s.left.rawEntry?.id) {
        indexMap.set(s.left.rawEntry.id, { spreadIndex: i, side: 'left' });
      }
      if (s.right.rawEntry?.id) {
        indexMap.set(s.right.rawEntry.id, { spreadIndex: i, side: 'right' });
      }
    }
    topicLocationCache.set(spreads, indexMap);
  }
  return indexMap.get(topicId) ?? null;
}
