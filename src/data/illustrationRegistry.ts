import { ANIMALS_ENRICHMENT } from './animalsEnrichment';
import { CHAPTERS } from './chapters';
import { COSMOLOGY_ENRICHMENT } from './cosmologyEnrichment';
import { formatEditorialVerificationSummary } from './editorialPresentation';
import { GEOLOGY_ENRICHMENT } from './geologyEnrichment';
import { HEALTH_HYGIENE_ENRICHMENT } from './healthHygieneEnrichment';
import { HUMAN_BIOLOGY_ENRICHMENT } from './humanBiologyEnrichment';
import { HUMAN_PSYCHOLOGY_ENRICHMENT } from './humanPsychologyEnrichment';
import {
  ILLUSTRATION_ASSET_MANIFEST,
  SCIENTIFICALLY_REVIEWED_TOPICS,
  VISUALLY_INSPECTED_TOPICS,
} from './illustrationAssetManifest';
import { OCEANS_ENRICHMENT } from './oceansEnrichment';
import { PLANTS_ENRICHMENT } from './plantsEnrichment';
import { SOCIAL_LIFE_ETHICS_ENRICHMENT } from './socialLifeEthicsEnrichment';
import { WEATHER_ENRICHMENT } from './weatherEnrichment';
import {
  ChapterMetadata,
  IllustrationCategory,
  IllustrationClassification,
  IllustrationProcessStage,
  IllustrationRegistryEntry,
  IllustrationVerificationState,
  RawChapterDataset,
  RawDatasetEntry,
  TopicEnrichment,
  VisualBrief,
} from '../types/encyclopedia';

export const CHAPTER_ILLUSTRATION_CATEGORY_MAP: Record<
  string,
  IllustrationCategory
> = {
  'chapter-01': 'cosmology',
  'chapter-02': 'geology',
  'chapter-03': 'oceans',
  'chapter-04': 'atmosphere',
  'chapter-05': 'plants',
  'chapter-06': 'animals',
  'chapter-07': 'human-biology',
  'chapter-08': 'health',
  'chapter-09': 'psychology',
  'chapter-10': 'social-ethics',
};

export const ILLUSTRATION_CATEGORY_LABELS: Record<
  IllustrationCategory,
  string
> = {
  cosmology: 'Cosmology & Space',
  geology: "Earth's Geology & Mountains",
  oceans: 'Oceans, Seas & Water',
  atmosphere: 'Weather & Atmospheric Science',
  plants: 'Plants, Agriculture & Botany',
  animals: 'Animals & Biological Systems',
  'human-biology': 'Human Biology & Embryology',
  health: 'Health, Hygiene, Nutrition & Fasting',
  psychology: 'Human Psychology & Behaviour',
  'social-ethics': 'Social Life, Ethics & Everyday Practices',
};

export const CLASSIFICATION_DISPLAY_LABELS: Record<
  IllustrationClassification,
  string
> = {
  measured: 'Measured Science Chart',
  anatomical: 'Clear Structure Diagram',
  observational: 'Nature Observation Plate',
  schematic: 'Step-by-Step Science Diagram',
  conceptual: 'Visual Idea Model',
};

function getChapterEnrichmentMap(
  chapterId: string
): Record<string, TopicEnrichment> {
  switch (chapterId) {
    case 'chapter-01':
      return COSMOLOGY_ENRICHMENT;
    case 'chapter-02':
      return GEOLOGY_ENRICHMENT;
    case 'chapter-03':
      return OCEANS_ENRICHMENT;
    case 'chapter-04':
      return WEATHER_ENRICHMENT;
    case 'chapter-05':
      return PLANTS_ENRICHMENT;
    case 'chapter-06':
      return ANIMALS_ENRICHMENT;
    case 'chapter-07':
      return HUMAN_BIOLOGY_ENRICHMENT;
    case 'chapter-08':
      return HEALTH_HYGIENE_ENRICHMENT;
    case 'chapter-09':
      return HUMAN_PSYCHOLOGY_ENRICHMENT;
    case 'chapter-10':
      return SOCIAL_LIFE_ETHICS_ENRICHMENT;
    default:
      return {};
  }
}

function classifyTopicIllustration(
  chapterId: string,
  entry: RawDatasetEntry
): IllustrationClassification {
  if (chapterId === 'chapter-09' || chapterId === 'chapter-10') {
    return 'conceptual';
  }
  const haystack =
    `${entry.title} ${entry.scientific_topic} ${entry.scientific_evidence.finding}`.toLowerCase();

  if (
    chapterId === 'chapter-07' &&
    /(embryo|placenta|umbilical|heart|skeleton|skin|neuron|brain|fingerprint|gamete|uter|anatom|organ|fetal|musc|bone)/.test(
      haystack
    )
  ) {
    return 'anatomical';
  }
  if (
    chapterId === 'chapter-06' &&
    /(wing|feather|anatomy|digest|ruminant|stomach|honeybee|ant|spider|camel|foot|silk|organ|morphology)/.test(
      haystack
    )
  ) {
    return 'anatomical';
  }
  if (
    chapterId === 'chapter-05' &&
    /(xylem|phloem|root|leaf|stomata|seed|flower|pistil|stamen|embryo|fruit|grain|cell)/.test(
      haystack
    )
  ) {
    return 'anatomical';
  }
  if (
    /(timeline|epoch|redshift|wavelength|budget|salinity|density|temperature|pressure|altitude|scale|distribution|circulation|isostas|strata)/.test(
      haystack
    )
  ) {
    return 'measured';
  }
  if (
    chapterId === 'chapter-01' ||
    chapterId === 'chapter-03' ||
    chapterId === 'chapter-04'
  ) {
    if (
      /(eschatolog|last day|rolled|splitting|folding|sign|reflection|canopy|balance)/.test(
        haystack
      )
    ) {
      return 'conceptual';
    }
    return 'observational';
  }
  if (chapterId === 'chapter-08') {
    if (/(spiritual|patience|trust|charity|modesty)/.test(haystack)) {
      return 'conceptual';
    }
    return 'schematic';
  }
  return 'schematic';
}

function buildAccuracyGuardrail(chapterId: string, entry: RawDatasetEntry): string {
  switch (chapterId) {
    case 'chapter-01':
      return 'Space did not explode into an empty room; space itself stretched outward. Future end-of-time verses belong to faith rather than telescope forecasts.';
    case 'chapter-02':
      return 'Mountains form in different ways across Earth, not just from one single process.';
    case 'chapter-03':
      return 'Where rivers and seas meet, fresh and salty water mix gradually across a changing zone rather than hitting a solid wall.';
    case 'chapter-04':
      return 'Daily weather is different from long-term climate, lightning is electricity while thunder is sound, and storm waves are different from earthquake tsunamis.';
    case 'chapter-05':
      return 'Different plant groups grow seeds, flowers, or spores in their own ways rather than all using one single method.';
    case 'chapter-06':
      return 'Each animal has its own unique body parts and habits; we should never mix up traits from different species.';
    case 'chapter-07':
      return 'Human growth before birth follows natural overlapping stages rather than sudden hour-by-hour jumps.';
    case 'chapter-08':
      return 'These health diagrams help explain everyday body care and nutrition — always check with a real doctor for personal medical care.';
    case 'chapter-09':
      return 'This picture shows how thoughts, feelings, and habits connect — spiritual qualities like patience or trust are much richer than any single brain chart.';
    case 'chapter-10':
      return 'This visual maps fairness and community trust as helpful ideas rather than strict laboratory equations.';
    default:
      return entry.limitations;
  }
}

function deriveViewingAngle(
  chapterId: string,
  classification: IllustrationClassification,
  entry: RawDatasetEntry
): string {
  const txt = `${entry.title} ${entry.scientific_topic}`.toLowerCase();
  if (classification === 'conceptual') {
    return 'Clear step-by-step diagram showing how ideas and choices connect';
  }
  if (/(strata|layer|core|interior|soil|aquifer|crust|root|skin|leaf|placenta)/.test(txt)) {
    return 'Side slice-through view showing the hidden layers inside';
  }
  if (/(orbit|solar|lunar|eclipse|rotation|galaxy|cosmic|circulation|wind belt)/.test(txt)) {
    return 'Wide space or Earth view showing curved paths and movement arrows';
  }
  if (/(embryo|cell|stoma|pollen|fingerprint|micro|neuron)/.test(txt)) {
    return 'Close-up magnified view showing tiny structures clearly';
  }
  if (chapterId === 'chapter-02' || chapterId === 'chapter-03') {
    return '3D cutaway view showing both the top surface and what happens underneath';
  }
  return 'Multi-part learning picture combining clear parts, labels, and movement arrows';
}

function buildProcessStages(
  chapterId: string,
  entry: RawDatasetEntry,
  enrichment?: TopicEnrichment
): IllustrationProcessStage[] | undefined {
  const txt =
    `${entry.title} ${entry.scientific_topic} ${entry.scientific_evidence.finding}`.toLowerCase();
  const isProcess =
    /(cycle|stage|process|formation|development|pathway|transport|evolution|timeline|germination|digestion|fasting|metabolism|reconciliation|decision|habit|circulation)/.test(
      txt
    );

  if (!isProcess) return undefined;

  if (chapterId === 'chapter-01' && /(origin|big bang|expansion)/.test(txt)) {
    return [
      {
        stageNumber: 'Step 01',
        label: 'Hot Packed Beginning',
        detail: 'Space began extremely hot and tightly packed.',
      },
      {
        stageNumber: 'Step 02',
        label: 'First Clear Light (~380,000 yr)',
        detail: 'Space cooled enough for atoms to form and light to travel freely.',
      },
      {
        stageNumber: 'Step 03',
        label: 'First Stars & Galaxies',
        detail: 'Gravity pulled giant gas clouds together to light up the first stars.',
      },
      {
        stageNumber: 'Step 04',
        label: 'Expanding Universe Today',
        detail: 'Galaxies continue spreading farther apart as space keeps stretching.',
      },
    ];
  }

  if (chapterId === 'chapter-09' || chapterId === 'chapter-10') {
    return [
      {
        stageNumber: 'Step 01',
        label: 'Everyday Situation',
        detail: `A real-life moment connected to ${entry.scientific_topic.toLowerCase()}.`,
      },
      {
        stageNumber: 'Step 02',
        label: 'Pause & Think',
        detail: 'Noticing our feelings, checking facts, and weighing fair choices.',
      },
      {
        stageNumber: 'Step 03',
        label: 'Helpful Action',
        detail:
          enrichment?.takeaway ??
          'Practising healthier habits and kinder behaviour in daily life.',
      },
    ];
  }

  return [
    {
      stageNumber: 'Step 01',
      label: 'Starting Ingredients',
      detail: `Natural conditions needed for ${entry.scientific_topic.toLowerCase()}.`,
    },
    {
      stageNumber: 'Step 02',
      label: 'What Happens',
      detail: entry.scientific_evidence.finding,
    },
    {
      stageNumber: 'Step 03',
      label: 'Result We See',
      detail:
        enrichment?.whatItMeans ??
        'The natural result scientists observe in creation.',
    },
  ];
}

function buildTopicVisualBrief(
  chapter: ChapterMetadata,
  entry: RawDatasetEntry,
  classification: IllustrationClassification,
  enrichment?: TopicEnrichment
): VisualBrief {
  const structures = [
    entry.scientific_topic,
    ...(enrichment?.tags ?? []).slice(0, 3),
  ].filter(Boolean);

  return {
    subject: `${entry.title} — ${entry.scientific_topic}`,
    structuresAndProcesses: structures,
    viewingAngle: deriveViewingAngle(chapter.id, classification, entry),
    keyLabels: [
      entry.scientific_topic,
      ...(enrichment?.tags?.slice(0, 3) ?? []),
      'Orientation / Conceptual Key',
    ],
    scaleAndProportions:
      classification === 'conceptual'
        ? 'Conceptual relational proportions (non-metric schematic nodes)'
        : 'Textbook-accurate anatomical or physical structural proportions without invented numerical ticks',
    composition:
      enrichment?.diagramCaption ??
      `Clear textbook plate illustrating ${entry.scientific_topic} with clean leader lines and neutral background readability for dark and light modes.`,
    mustNotShow: buildAccuracyGuardrail(chapter.id, entry),
  };
}

function buildUniqueFigureTitle(
  entry: RawDatasetEntry,
  enrichment: TopicEnrichment | undefined,
  usedTitles: Set<string>
): string {
  const cleanTopicTitle = entry.title.trim();
  const baseDiagramTitle = enrichment?.diagramTitle?.trim();

  if (
    baseDiagramTitle &&
    !usedTitles.has(baseDiagramTitle.toLowerCase()) &&
    baseDiagramTitle.toLowerCase().includes(cleanTopicTitle.toLowerCase().slice(0, 12))
  ) {
    usedTitles.add(baseDiagramTitle.toLowerCase());
    return baseDiagramTitle;
  }

  const candidate =
    baseDiagramTitle &&
    baseDiagramTitle.toLowerCase() !== cleanTopicTitle.toLowerCase()
      ? `${cleanTopicTitle}: ${baseDiagramTitle}`
      : `${cleanTopicTitle} — ${entry.scientific_topic}`;

  if (!usedTitles.has(candidate.toLowerCase())) {
    usedTitles.add(candidate.toLowerCase());
    return candidate;
  }

  const fallback = `${cleanTopicTitle} (${entry.id})`;
  usedTitles.add(fallback.toLowerCase());
  return fallback;
}

function buildReferenceAttribution(entry: RawDatasetEntry): string {
  if (entry.evidence_sources && entry.evidence_sources.length > 0) {
    const institutions = Array.from(
      new Set(
        entry.evidence_sources
          .map((s) => s.author_or_institution)
          .filter(Boolean)
      )
    ).slice(0, 2);
    if (institutions.length > 0) {
      return `Informed by ${institutions.join(' & ')} (${entry.id}).`;
    }
  }
  const { editorialStatusLabel } = formatEditorialVerificationSummary(entry);
  return `${editorialStatusLabel} (${entry.id}).`;
}

/**
 * Dynamically builds the unified 500-topic Central Illustration Registry from
 * the live loaded chapter datasets while guaranteeing 1:1 unique assignments,
 * honest disk asset verification status, and exact 001–500 global indexing.
 */
export function buildIllustrationRegistry(
  datasetsByChapter: Record<string, RawChapterDataset | undefined>
): IllustrationRegistryEntry[] {
  const records: IllustrationRegistryEntry[] = [];
  const usedTitles = new Set<string>();
  let globalCounter = 0;

  for (const chapter of CHAPTERS) {
    const dataset = datasetsByChapter[chapter.id];
    const entries = dataset?.entries ?? [];
    const category =
      CHAPTER_ILLUSTRATION_CATEGORY_MAP[chapter.id] ?? 'cosmology';
    const enrichmentMap = getChapterEnrichmentMap(chapter.id);

    for (let idx = 0; idx < entries.length; idx++) {
      globalCounter += 1;
      const entry = entries[idx];
      const enrichment = enrichmentMap[entry.id];
      const topicNumber = idx + 1;
      const topicPaddedNumber = String(topicNumber).padStart(2, '0');
      const globalPaddedNumber = String(globalCounter).padStart(3, '0');
      const figureNumber = `${chapter.paddedNumber}.${topicPaddedNumber}`;
      const illustrationId = `${entry.id}-ILLUSTRATION`;
      const baseUrl = import.meta.env?.BASE_URL ?? '/';
      const assetPath = `${baseUrl}assets/illustrations/${category}/${entry.id}.webp`;
      const manifestStatus = ILLUSTRATION_ASSET_MANIFEST[entry.id];
      const assetExists = Boolean(manifestStatus?.exists);

      let verificationState: IllustrationVerificationState = 'missing';
      if (assetExists) {
        if (SCIENTIFICALLY_REVIEWED_TOPICS.has(entry.id)) {
          verificationState = 'scientifically_reviewed';
        } else if (VISUALLY_INSPECTED_TOPICS.has(entry.id)) {
          verificationState = 'visually_inspected';
        } else {
          verificationState = 'created';
        }
      }

      const classification = classifyTopicIllustration(chapter.id, entry);
      const isConceptualModel =
        classification === 'conceptual' ||
        chapter.id === 'chapter-09' ||
        chapter.id === 'chapter-10';
      const title = buildUniqueFigureTitle(entry, enrichment, usedTitles);
      const caption =
        enrichment?.diagramCaption &&
        enrichment.diagramCaption.length > 18
          ? enrichment.diagramCaption
          : `${entry.title}: ${entry.scientific_evidence.finding}`;

      const altText = `Illustration Figure ${figureNumber} for ${entry.title}: clear educational drawing showing ${entry.scientific_topic.toLowerCase()}.`;

      records.push({
        topicId: entry.id,
        illustrationId,
        assetPath,
        assetExists,
        fileSizeBytes: manifestStatus?.fileSizeBytes,
        sha256: manifestStatus?.sha256,
        dimensions:
          manifestStatus && manifestStatus.width > 0
            ? { width: manifestStatus.width, height: manifestStatus.height }
            : undefined,
        title,
        caption,
        altText,
        category,
        classification,
        referenceAttribution: buildReferenceAttribution(entry),
        verificationState,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterNumber: chapter.number,
        chapterPaddedNumber: chapter.paddedNumber,
        topicNumber,
        topicPaddedNumber,
        globalTopicNumber: globalCounter,
        globalPaddedNumber,
        figureNumber,
        isConceptualModel,
        visualBrief: buildTopicVisualBrief(
          chapter,
          entry,
          classification,
          enrichment
        ),
        processStages: buildProcessStages(chapter.id, entry, enrichment),
      });
    }
  }

  // Flag any accidental duplicate SHA-256 hashes or asset paths dynamically
  const seenHashes = new Map<string, string>();
  const seenPaths = new Map<string, string>();
  for (const rec of records) {
    if (seenPaths.has(rec.assetPath)) {
      rec.duplicateFlag = `Duplicate asset path shared with ${seenPaths.get(rec.assetPath)}`;
    } else {
      seenPaths.set(rec.assetPath, rec.topicId);
    }

    if (rec.assetExists && rec.sha256) {
      if (seenHashes.has(rec.sha256)) {
        rec.duplicateFlag = `Identical file hash shared with ${seenHashes.get(rec.sha256)}`;
      } else {
        seenHashes.set(rec.sha256, rec.topicId);
      }
    }
  }

  return records;
}

export interface IllustrationRegistryStats {
  totalTopics: number;
  createdCount: number;
  missingCount: number;
  visuallyInspectedCount: number;
  scientificallyReviewedCount: number;
  duplicateFlagCount: number;
  byChapter: {
    chapterId: string;
    paddedNumber: string;
    title: string;
    category: IllustrationCategory;
    total: number;
    created: number;
    missing: number;
    visuallyInspected: number;
  }[];
}

export function getIllustrationRegistryStats(
  records: IllustrationRegistryEntry[]
): IllustrationRegistryStats {
  const byChapter = CHAPTERS.map((ch) => {
    const chRecs = records.filter((r) => r.chapterId === ch.id);
    const created = chRecs.filter((r) => r.assetExists).length;
    const visuallyInspected = chRecs.filter(
      (r) =>
        r.verificationState === 'visually_inspected' ||
        r.verificationState === 'scientifically_reviewed'
    ).length;
    return {
      chapterId: ch.id,
      paddedNumber: ch.paddedNumber,
      title: ch.title,
      category: CHAPTER_ILLUSTRATION_CATEGORY_MAP[ch.id] ?? 'cosmology',
      total: chRecs.length,
      created,
      missing: chRecs.length - created,
      visuallyInspected,
    };
  });

  const createdCount = records.filter((r) => r.assetExists).length;
  return {
    totalTopics: records.length,
    createdCount,
    missingCount: records.length - createdCount,
    visuallyInspectedCount: records.filter(
      (r) =>
        r.verificationState === 'visually_inspected' ||
        r.verificationState === 'scientifically_reviewed'
    ).length,
    scientificallyReviewedCount: records.filter(
      (r) => r.verificationState === 'scientifically_reviewed'
    ).length,
    duplicateFlagCount: records.filter((r) => Boolean(r.duplicateFlag)).length,
    byChapter,
  };
}
