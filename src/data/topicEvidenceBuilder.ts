import {
  ChapterMetadata,
  DiagramKind,
  RawDatasetEntry,
  RelatedTopicLink,
  TopicEnrichment,
} from '../types/encyclopedia';
import {
  formatConnectionTypeLabel,
  getPlainGradeDescription,
  sanitizePublicLimitationNote,
  sanitizeQuranVerificationContext,
  sanitizeScientificExplanation,
  sanitizeTafsirNotes,
} from './editorialPresentation';

export interface ScientificMethodologyBreakdown {
  observation: string;
  researchQuestion: string;
  methodology: string;
  instrumentsAndTech: string;
  evidenceSummary: string;
  independentConfirmation: string;
  consensusTier: string;
}

export interface QuranicConnectionBreakdown {
  exactPassages: string;
  wordingAndContext: string;
  classicalTafsirSummary: string;
  modernInterpretation: string;
  supportedAspect: string;
  interpretiveBoundary: string;
  alternativeReadings: string;
  relationshipClassification: string;
}

export interface EvidenceTrailStep {
  stepNumber: number;
  stage: string;
  detail: string;
}

export interface CompleteEvidenceSummary {
  whatScienceEstablished: string;
  howEstablished: string;
  whatQuranSays: string;
  whatTafsirExplains: string;
  proposedRelationship: string;
  importantLimitations: string;
  currentAssessment: string;
}

interface DomainMethodProfile {
  disciplineName: string;
  researchQuestionPrefix: string;
  defaultMethodology: string;
  defaultInstruments: string;
  defaultConfirmation: string;
}

const DOMAIN_PROFILES: Record<string, DomainMethodProfile> = {
  'chapter-01': {
    disciplineName: 'Space & Stars (Astronomy)',
    researchQuestionPrefix:
      'What do space telescopes and the laws of physics show us about',
    defaultMethodology:
      'Astronomers collect light from distant stars and galaxies, measure how their colours stretch as they move, and track how gravity shapes their orbits.',
    defaultInstruments:
      'Giant ground and space telescopes (like Hubble and Webb), rainbow light-splitters (spectrographs), and radio dishes.',
    defaultConfirmation:
      'Scientists around the world check these results using different telescopes, space probes, and physics measurements.',
  },
  'chapter-02': {
    disciplineName: 'Earth & Rocks (Geology)',
    researchQuestionPrefix:
      'How do underground sensors, rock layers, and Earth measurements explain',
    defaultMethodology:
      'Geologists track earthquake vibrations moving through the Earth, measure how fast continents drift, and inspect rock layers and minerals.',
    defaultInstruments:
      'Earthquake sensors (seismographs), space-based GPS trackers, rock-drilling equipment, and laboratory microscopes.',
    defaultConfirmation:
      'Teams in many countries compare earthquake tracks, ocean-floor cores, and rock samples to confirm the same patterns.',
  },
  'chapter-03': {
    disciplineName: 'Oceans & Water (Oceanography)',
    researchQuestionPrefix:
      'How do ocean sensors, water tests, and sea surveys explain',
    defaultMethodology:
      'Ocean scientists measure water temperature, salt levels, light brightness, and deep currents from the sea surface down to the dark floor.',
    defaultInstruments:
      'Floating ocean sensors (Argo floats), depth probes, underwater sound trackers, and weather satellites.',
    defaultConfirmation:
      'Research ships and thousands of drifting ocean robots collect matching measurements year after year.',
  },
  'chapter-04': {
    disciplineName: 'Weather & Sky (Meteorology)',
    researchQuestionPrefix:
      'How do weather satellites, radar, and sky measurements explain',
    defaultMethodology:
      'Weather scientists track warm rising air, storm clouds, tiny ice pellets, and electric charges inside moving storms.',
    defaultInstruments:
      'Weather radar, sky-watching satellites, weather balloons, and lightning sensors.',
    defaultConfirmation:
      'Weather stations, research aircraft, and satellites around the globe record the same storm patterns every day.',
  },
  'chapter-05': {
    disciplineName: 'Plants & Farming (Botany)',
    researchQuestionPrefix:
      'How do plant experiments, microscopes, and farm studies explain',
    defaultMethodology:
      'Plant scientists grow seeds under careful tests, look inside stems and leaves with microscopes, and study how soil, rain, and bees help crops grow.',
    defaultInstruments:
      'Microscopes, leaf light sensors, soil moisture testers, and outdoor garden or farm trials.',
    defaultConfirmation:
      'Botanists and farmers test these same growth steps in greenhouses and fields across different climates.',
  },
  'chapter-06': {
    disciplineName: 'Animals & Nature (Zoology)',
    researchQuestionPrefix:
      'How do close animal watching, body studies, and nature tests explain',
    defaultMethodology:
      'Animal scientists film fast movements in slow motion, inspect wings and organs, and watch how animals feed, signal, and work together in nature.',
    defaultInstruments:
      'High-speed cameras, scent detectors, sound recorders, and laboratory microscopes.',
    defaultConfirmation:
      'Field researchers and animal labs compare findings across many species and habitats to make sure they are accurate.',
  },
  'chapter-07': {
    disciplineName: 'Human Body & Growth (Biology)',
    researchQuestionPrefix:
      'How do safe medical scans, cell studies, and body measurements explain',
    defaultMethodology:
      'Doctors and biologists track how a tiny fertilised cell grows week by week, inspect healthy tissues, and map how nerves carry signals.',
    defaultInstruments:
      'Safe ultrasound scans, MRI medical imaging, and high-power microscopes.',
    defaultConfirmation:
      'Medical schools, hospitals, and biology labs worldwide see these same human growth steps every single day.',
  },
  'chapter-08': {
    disciplineName: 'Health, Food & Fasting',
    researchQuestionPrefix:
      'How do health studies, clean-water tests, and nutrition checks examine',
    defaultMethodology:
      'Health researchers compare groups of people over time, test drinking water for germs, and check how food or fasting changes blood sugar and energy.',
    defaultInstruments:
      'Blood sugar and nutrition tests, water-safety kits, and large medical surveys.',
    defaultConfirmation:
      'Doctors compare many careful health studies — remembering that what helps one person may need adjustments for someone who is ill or pregnant.',
  },
  'chapter-09': {
    disciplineName: 'Mind, Feelings & Habits (Psychology)',
    researchQuestionPrefix:
      'How do careful mind and behaviour studies explore',
    defaultMethodology:
      'Psychologists use honest surveys, thinking games, and long-term studies to see how people handle stress, form habits, and support each other.',
    defaultInstruments:
      'Thoughtful questionnaires, memory and reaction activities, and careful health interviews.',
    defaultConfirmation:
      'Researchers test ideas across different cultures and ages — remembering that every human mind and life story is unique.',
  },
  'chapter-10': {
    disciplineName: 'Community, Fairness & Ethics',
    researchQuestionPrefix:
      'How do community studies, history, and social research examine',
    defaultMethodology:
      'Social researchers compare laws, family support, honest markets, and community trust across towns and countries.',
    defaultInstruments:
      'Community surveys, public fairness records, and child-and-family support studies.',
    defaultConfirmation:
      'Studies across many societies show how fairness, trust, and clear rules help communities thrive, even though every culture has its own details.',
  },
};

function refineInstrumentsByDiagramKind(
  diagramKind: DiagramKind | undefined,
  fallback: DomainMethodProfile
): { methodology: string; instruments: string } {
  if (!diagramKind) {
    return {
      methodology: fallback.defaultMethodology,
      instruments: fallback.defaultInstruments,
    };
  }
  const kind = String(diagramKind);
  if (kind.includes('expansion') || kind.includes('big-bang') || kind.includes('recombination')) {
    return {
      methodology:
        'Scientists measure how fast faraway galaxies are moving apart and map faint leftover heat light from the early universe.',
      instruments:
        'Space microwave telescopes (like Planck), deep-space telescopes (Hubble and Webb), and star-brightness sensors.',
    };
  }
  if (kind.includes('orbital') || kind.includes('lunar') || kind.includes('rotation') || kind.includes('solar')) {
    return {
      methodology:
        'Scientists track the exact paths of the Sun, Earth, and Moon over years and calculate how gravity pulls them along.',
      instruments:
        'Space sun-watching satellites, laser beams bounced off Moon mirrors, atomic clocks, and sky telescopes.',
    };
  }
  if (kind.includes('earthquake') || kind.includes('tectonic') || kind.includes('isostasy')) {
    return {
      methodology:
        'Scientists time earthquake ripples passing beneath mountains and measure tiny shifts in Earth’s pull and surface height.',
      instruments:
        'Earthquake sensors (seismographs), gravity meters, GPS ground markers, and radar satellites.',
    };
  }
  if (kind.includes('estuary') || kind.includes('photic') || kind.includes('wave') || kind.includes('water-cycle')) {
    return {
      methodology:
        'Scientists test water saltiness and temperature at different depths, measure underwater sunlight, and track global rain and evaporation.',
      instruments:
        'Ocean depth probes, drifting ocean floats, underwater light meters, and Earth satellites.',
    };
  }
  if (kind.includes('lightning') || kind.includes('hail') || kind.includes('cloud') || kind.includes('wind')) {
    return {
      methodology:
        'Scientists scan inside storm clouds with radar, send up weather balloons, and measure electric charges that spark lightning.',
      instruments:
        'Storm Doppler radar, weather balloons, research airplanes, and lightning trackers.',
    };
  }
  if (kind.includes('fasting') || kind.includes('glucose') || kind.includes('diabetes') || kind.includes('hydration')) {
    return {
      methodology:
        'Doctors follow healthy volunteers and patients during fasting hours to measure blood sugar, body energy, and water balance safely.',
      instruments:
        'Simple blood sugar tests, hydration checks, and careful health reviews.',
    };
  }
  if (kind.includes('embry') || kind.includes('placenta') || kind.includes('neural') || kind.includes('cardiac') || kind.includes('alaqah') || kind.includes('mudghah')) {
    return {
      methodology:
        'Doctors use safe ultrasound waves and detailed microscopes to watch how a tiny embryo grows organs step by step.',
      instruments:
        'Pregnancy ultrasound scanners, medical MRI, and high-power microscopes.',
    };
  }
  return {
    methodology: fallback.defaultMethodology,
    instruments: fallback.defaultInstruments,
  };
}

function classifyConsensusTier(consensusNote: string, hasPortalLeadsOnly: boolean): string {
  const lower = (consensusNote || '').toLowerCase();
  if (hasPortalLeadsOnly) {
    return 'General science idea is well-known; links below let curious readers look up specific studies.';
  }
  if (lower.includes('well-established') || lower.includes('well established') || lower.includes('established')) {
    return 'Well-established by scientists around the world (kept separate from religious interpretation).';
  }
  if (lower.includes('supported')) {
    return 'Supported by trusted science and health research, with practical limits to keep in mind.';
  }
  if (lower.includes('active') || lower.includes('preliminary') || lower.includes('debated')) {
    return 'Scientists are still actively studying this and learning new details.';
  }
  return consensusNote || 'Supported by established scientific study.';
}

export function buildScientificMethodology(
  chapter: ChapterMetadata,
  entry: RawDatasetEntry,
  enrichment?: TopicEnrichment
): ScientificMethodologyBreakdown {
  const profile = DOMAIN_PROFILES[chapter.id] ?? DOMAIN_PROFILES['chapter-01'];
  const refined = refineInstrumentsByDiagramKind(enrichment?.diagramKind, profile);

  const sourceList = entry.evidence_sources ?? [];
  const hasPortalLeadsOnly =
    sourceList.length > 0 &&
    sourceList.every(
      (s) =>
        s.audit_classification === 'Research database or literature-search portal' ||
        s.audit_classification === 'Academic discovery portal (Google Scholar)' ||
        s.audit_classification === 'General institutional homepage or topic directory' ||
        s.audit_classification === 'Broad institutional research and policy resource'
    );

  const cleanExplanation = sanitizeScientificExplanation(
    entry.scientific_evidence.explanation,
    entry.scientific_evidence.finding
  );

  const linkedSourceNames = sourceList
    .slice(0, 3)
    .map((s) => `${s.author_or_institution}`)
    .filter((v, i, arr) => Boolean(v) && arr.indexOf(v) === i)
    .join(', ');

  const evidenceSummary = linkedSourceNames
    ? `${cleanExplanation} (See sources from ${linkedSourceNames} below.)`
    : cleanExplanation;

  return {
    observation: entry.scientific_evidence.finding,
    researchQuestion: `${profile.researchQuestionPrefix} ${entry.scientific_topic.toLowerCase()}?`,
    methodology: refined.methodology,
    instrumentsAndTech: refined.instruments,
    evidenceSummary,
    independentConfirmation: profile.defaultConfirmation,
    consensusTier: classifyConsensusTier(
      entry.scientific_evidence.consensus_note,
      hasPortalLeadsOnly
    ),
  };
}

export function buildQuranicConnectionBreakdown(
  entry: RawDatasetEntry,
  enrichment?: TopicEnrichment
): QuranicConnectionBreakdown {
  const passages = entry.quranic_evidence.verified_passages ?? [];
  const exactPassages =
    passages.length > 0
      ? passages
          .map(
            (p) =>
              `Surah ${p.surahNameSimple} (${p.surahNumber}:${p.verseNumbers})`
          )
          .join(', ')
      : `Qur'an ${entry.quran_reference}`;

  const tafsirSources = entry.classical_tafsir_review.sources ?? [];
  const rawTafsirSummary =
    tafsirSources.length > 0
      ? `${tafsirSources[0].scholar} (${tafsirSources[0].work}): ${tafsirSources[0].summary}`
      : sanitizeTafsirNotes(entry.classical_tafsir_review.notes, tafsirSources);

  const connTypeReadable = formatConnectionTypeLabel(
    entry.connection_analysis.connection_type
  );

  const relationshipClassification = `${getPlainGradeDescription(entry.evidence_grade)} (${connTypeReadable})`;

  const verifiedContextNote = sanitizeQuranVerificationContext(
    entry.quranic_evidence.text_verification
  );

  return {
    exactPassages,
    wordingAndContext:
      enrichment?.quranSimpleMeaning ??
      (passages.length > 0
        ? `Revealed during the ${passages[0].revelationPlace} period (${exactPassages}). ${verifiedContextNote}`
        : verifiedContextNote),
    classicalTafsirSummary: rawTafsirSummary,
    modernInterpretation:
      enrichment?.quranicEthicalConnection ?? entry.connection_analysis.relationship,
    supportedAspect:
      enrichment?.findingsVsInterpretation ?? entry.scientific_evidence.finding,
    interpretiveBoundary: sanitizePublicLimitationNote(
      entry.connection_analysis.assessment
    ),
    alternativeReadings: sanitizePublicLimitationNote(entry.limitations),
    relationshipClassification,
  };
}

export function buildRememberPoints(
  entry: RawDatasetEntry,
  enrichment?: TopicEnrichment
): string[] {
  if (enrichment?.rememberPoints && enrichment.rememberPoints.length >= 3) {
    return enrichment.rememberPoints.slice(0, 5);
  }

  const points: string[] = [];
  if (entry.scientific_evidence.finding) {
    points.push(`Science shows: ${entry.scientific_evidence.finding}`);
  }
  if (enrichment?.quranSimpleMeaning) {
    points.push(`The verse reminds us: ${enrichment.quranSimpleMeaning}`);
  } else if (entry.connection_analysis.relationship) {
    points.push(`Qur’anic connection: ${entry.connection_analysis.relationship}`);
  }
  if (enrichment?.takeaway) {
    points.push(enrichment.takeaway);
  } else if (enrichment?.whatItMeans) {
    points.push(enrichment.whatItMeans);
  }
  const cleanLimit = sanitizePublicLimitationNote(entry.limitations);
  if (cleanLimit && points.length < 4) {
    points.push(`Keep in mind: ${cleanLimit}`);
  }

  return points.slice(0, 4);
}

export function buildEvidenceTrail(
  chapter: ChapterMetadata,
  entry: RawDatasetEntry,
  methodology: ScientificMethodologyBreakdown,
  connection: QuranicConnectionBreakdown
): EvidenceTrailStep[] {
  const tafsirCount = entry.classical_tafsir_review.sources?.length ?? 0;
  return [
    {
      stepNumber: 1,
      stage: 'What scientists wondered',
      detail: `${chapter.theme.disciplineLabel}: ${methodology.researchQuestion}`,
    },
    {
      stepNumber: 2,
      stage: 'Tools & tests used',
      detail: `${methodology.methodology} (${methodology.instrumentsAndTech})`,
    },
    {
      stepNumber: 3,
      stage: 'What science discovered',
      detail: `${entry.scientific_evidence.finding} — ${methodology.consensusTier}`,
    },
    {
      stepNumber: 4,
      stage: 'What the verse & early scholars say',
      detail:
        tafsirCount > 0
          ? `${connection.exactPassages}: ${connection.classicalTafsirSummary}`
          : `${connection.exactPassages}: Early scholars read these words with humility and careful attention to Arabic meaning.`,
    },
    {
      stepNumber: 5,
      stage: 'Honest summary',
      detail: `${connection.relationshipClassification} ${connection.interpretiveBoundary}`,
    },
  ];
}

export function buildCompleteEvidenceSummary(
  entry: RawDatasetEntry,
  methodology: ScientificMethodologyBreakdown,
  connection: QuranicConnectionBreakdown
): CompleteEvidenceSummary {
  const passages = entry.quranic_evidence.verified_passages ?? [];
  const verseQuote =
    passages.length > 0
      ? `${connection.exactPassages}: "${passages[0].translationText.slice(0, 175)}${passages[0].translationText.length > 175 ? '…' : ''}"`
      : entry.connection_analysis.relationship;

  return {
    whatScienceEstablished: entry.scientific_evidence.finding,
    howEstablished: methodology.methodology,
    whatQuranSays: verseQuote,
    whatTafsirExplains: connection.classicalTafsirSummary,
    proposedRelationship: entry.connection_analysis.relationship,
    importantLimitations: connection.alternativeReadings,
    currentAssessment: `Grade ${entry.evidence_grade} — ${getPlainGradeDescription(entry.evidence_grade)}`,
  };
}

export function computeRelatedTopics(
  current: RawDatasetEntry,
  chapterEntries: RawDatasetEntry[],
  enrichmentMap?: Record<string, TopicEnrichment>
): RelatedTopicLink[] {
  const currentEnr = enrichmentMap?.[current.id];
  const currentRefs = new Set(current.quranic_evidence.references ?? []);
  const currentTags = new Set(currentEnr?.tags ?? []);

  const scored = chapterEntries
    .filter((other) => other.id !== current.id)
    .map((other) => {
      const otherEnr = enrichmentMap?.[other.id];
      let score = 0;
      if (currentEnr?.diagramKind && otherEnr?.diagramKind === currentEnr.diagramKind) {
        score += 4;
      }
      for (const r of other.quranic_evidence.references ?? []) {
        if (currentRefs.has(r)) score += 3;
      }
      for (const t of otherEnr?.tags ?? []) {
        if (currentTags.has(t)) score += 2;
      }
      if (other.scientific_topic === current.scientific_topic) {
        score += 3;
      }
      return { other, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length >= 3) {
    return scored.slice(0, 3).map(({ other }) => ({
      id: other.id,
      title: other.title,
      evidenceGrade: other.evidence_grade,
    }));
  }

  const idx = chapterEntries.findIndex((e) => e.id === current.id);
  const picked = new Map<string, RelatedTopicLink>();
  for (const { other } of scored) {
    picked.set(other.id, {
      id: other.id,
      title: other.title,
      evidenceGrade: other.evidence_grade,
    });
  }
  const neighbourIndices = [idx - 1, idx + 1, idx + 2, idx - 2];
  for (const ni of neighbourIndices) {
    if (picked.size >= 3) break;
    const cand = chapterEntries[ni];
    if (cand && cand.id !== current.id && !picked.has(cand.id)) {
      picked.set(cand.id, {
        id: cand.id,
        title: cand.title,
        evidenceGrade: cand.evidence_grade,
      });
    }
  }
  return Array.from(picked.values()).slice(0, 3);
}
