import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { CHAPTERS } from '../../data/chapters';
import { VERIFIED_ANIMALS_FACTS } from '../../data/animalsEnrichment';
import { VERIFIED_COSMOLOGY_FACTS } from '../../data/cosmologyEnrichment';
import { VERIFIED_GEOLOGY_FACTS } from '../../data/geologyEnrichment';
import { HEALTH_HYGIENE_REFERENCE_FACTS } from '../../data/healthHygieneEnrichment';
import { HUMAN_BIOLOGY_REFERENCE_FACTS } from '../../data/humanBiologyEnrichment';
import { HUMAN_PSYCHOLOGY_REFERENCE_FACTS } from '../../data/humanPsychologyEnrichment';
import { VERIFIED_OCEANS_FACTS } from '../../data/oceansEnrichment';
import { VERIFIED_BOTANY_FACTS } from '../../data/plantsEnrichment';
import { SOCIAL_LIFE_ETHICS_REFERENCE_FACTS } from '../../data/socialLifeEthicsEnrichment';
import {
  buildCompleteEvidenceSummary,
  buildEvidenceTrail,
  buildQuranicConnectionBreakdown,
  buildRememberPoints,
  buildScientificMethodology,
} from '../../data/topicEvidenceBuilder';
import { VERIFIED_WEATHER_FACTS } from '../../data/weatherEnrichment';
import {
  BookFolio,
  ChapterMetadata,
  EvidenceGradeLetter,
  IllustrationRegistryEntry,
  RawChapterDataset,
} from '../../types/encyclopedia';
import { ChapterIntroduction } from './ChapterIntroduction';
import { EncyclopediaIntroduction } from './EncyclopediaIntroduction';
import {
  ChapterMotifIcon,
  EditorialDivider,
  GeometricRosette,
} from '../ornaments/IslamicOrnaments';
import {
  BeCarefulSection,
  ConnectionSection,
  DiscoverSection,
  ExploreEvidenceSection,
  IllustrationSection,
  QuranSection,
  RememberSection,
  ScienceSection,
} from '../topic/TopicSections';

const FACT_CATALOG_BY_CHAPTER: Record<
  string,
  Record<string, import('../../types/encyclopedia').VerifiedScientificFact>
> = {
  'chapter-01': VERIFIED_COSMOLOGY_FACTS,
  'chapter-02': VERIFIED_GEOLOGY_FACTS,
  'chapter-03': VERIFIED_OCEANS_FACTS,
  'chapter-04': VERIFIED_WEATHER_FACTS,
  'chapter-05': VERIFIED_BOTANY_FACTS,
  'chapter-06': VERIFIED_ANIMALS_FACTS,
  'chapter-07': HUMAN_BIOLOGY_REFERENCE_FACTS,
  'chapter-08': HEALTH_HYGIENE_REFERENCE_FACTS,
  'chapter-09': HUMAN_PSYCHOLOGY_REFERENCE_FACTS,
  'chapter-10': SOCIAL_LIFE_ETHICS_REFERENCE_FACTS,
};

const CHAPTER_BY_NUMBER: Record<number, ChapterMetadata> = Object.fromEntries(
  CHAPTERS.map((c) => [c.number, c])
);

interface FolioRendererProps {
  folio: BookFolio;
  datasetsByChapter: Record<string, RawChapterDataset | undefined>;
  illustrationByTopicId?: Record<string, IllustrationRegistryEntry>;
  focusedTopicId?: string | null;
  exploredTopicIds?: ReadonlySet<string>;
  isCompactLandscape?: boolean;
  onToggleExploredTopic?: (topicId: string) => void;
  onNavigateToSpread: (spreadId: string) => void;
  onNavigateToTopic: (topicId: string) => void;
}

const ChapterPlateImage: React.FC<{
  chapter: ChapterMetadata;
  compact?: boolean;
}> = ({ chapter, compact = false }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[var(--page-bg-secondary)] border border-[var(--gold-hairline)] text-center">
        <ChapterMotifIcon
          motif={chapter.theme.motifType}
          className="w-8 h-8 text-[var(--accent-gold)] mb-2"
        />
        <span className="font-editorial text-xs text-[var(--page-muted)]">
          {chapter.plateLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={chapter.artworkSrc}
      alt={chapter.artworkAlt}
      loading={compact ? 'lazy' : 'eager'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className="w-full h-full object-cover"
    />
  );
};

export const FolioRenderer: React.FC<FolioRendererProps> = React.memo(({
  folio,
  datasetsByChapter,
  illustrationByTopicId,
  focusedTopicId,
  exploredTopicIds,
  isCompactLandscape = false,
  onToggleExploredTopic,
  onNavigateToSpread,
  onNavigateToTopic,
}) => {
  const [gradeFilter, setGradeFilter] = useState<'ALL' | EvidenceGradeLetter>('ALL');
  const [expandedTocChapterId, setExpandedTocChapterId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setGradeFilter('ALL');
  }, [folio.chapter?.id]);

  const chapterIndexMeta = useMemo(() => {
    if (folio.type !== 'chapter-index' || !folio.chapter) return null;
    const dataset = datasetsByChapter[folio.chapter.id];
    if (!dataset || dataset.entries.length === 0) return null;
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    const indexById = new Map<string, number>();
    for (let i = 0; i < dataset.entries.length; i++) {
      const e = dataset.entries[i];
      indexById.set(e.id, i + 1);
      if (e.evidence_grade in counts) {
        counts[e.evidence_grade as keyof typeof counts]++;
      }
    }
    return { counts, indexById };
  }, [datasetsByChapter, folio.chapter, folio.type]);

  const topicDerived = useMemo(() => {
    if (folio.type !== 'topic-single' || !folio.rawEntry || !folio.chapter) {
      return null;
    }
    const { rawEntry: entry, enrichment, chapter } = folio;
    const factCatalog =
      FACT_CATALOG_BY_CHAPTER[chapter.id] ?? VERIFIED_COSMOLOGY_FACTS;
    const verifiedFacts = (enrichment?.factIds ?? [])
      .map((fid) => factCatalog[fid])
      .filter(Boolean);
    const nextChapter = CHAPTER_BY_NUMBER[chapter.number + 1];
    const methodologyBreakdown = buildScientificMethodology(
      chapter,
      entry,
      enrichment
    );
    const quranConnection = buildQuranicConnectionBreakdown(entry, enrichment);
    const evidenceTrail = buildEvidenceTrail(
      chapter,
      entry,
      methodologyBreakdown,
      quranConnection
    );
    const evidenceSummary = buildCompleteEvidenceSummary(
      entry,
      methodologyBreakdown,
      quranConnection
    );
    const rememberPoints = buildRememberPoints(entry, enrichment);
    return {
      verifiedFacts,
      nextChapter,
      methodologyBreakdown,
      quranConnection,
      evidenceTrail,
      evidenceSummary,
      rememberPoints,
    };
  }, [folio]);

  const renderChapterTocRow = (chapter: ChapterMetadata) => {
    const dataset = datasetsByChapter[chapter.id];
    const countLabel = dataset
      ? `${dataset.entries.length} Topics`
      : `${chapter.expectedTopicCount} Topics`;
    const isExpanded = expandedTocChapterId === chapter.id;

    return (
      <div key={chapter.id} className="py-1.5">
        <div className="flex items-start gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateToSpread(`${chapter.id}-opening`)}
            className="group flex-1 flex items-start gap-3 py-1.5 text-left transition-all duration-150 hover:bg-[var(--page-bg-secondary)]/85 px-2 -mx-2 rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] min-w-0"
          >
            <div className="w-9 h-[48px] shrink-0 overflow-hidden border border-[var(--gold-hairline)] rounded-[3px]">
              <ChapterPlateImage chapter={chapter} compact />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-gold)] tabular-nums font-medium">
                  Chapter {chapter.paddedNumber}
                </span>
                <span
                  className={`text-[11px] tabular-nums ${
                    dataset
                      ? 'text-[var(--accent-gold)] font-medium'
                      : 'text-[var(--page-muted)]'
                  }`}
                >
                  {countLabel}
                </span>
              </div>
              <h3 className="font-editorial text-base font-semibold text-[var(--page-ink)] group-hover:text-[var(--accent-gold)] transition-colors truncate">
                {chapter.paddedNumber}. {chapter.title}
              </h3>
              <p className="text-[11px] text-[var(--page-muted)] line-clamp-1 mt-0.5">
                {dataset ? dataset.description : chapter.descriptionPlaceholder}
              </p>
            </div>
          </button>

          {dataset && dataset.entries.length > 0 && (
            <button
              type="button"
              onClick={() =>
                setExpandedTocChapterId(isExpanded ? null : chapter.id)
              }
              aria-expanded={isExpanded}
              aria-label={`Expand topics for Chapter ${chapter.paddedNumber}: ${chapter.title}`}
              className="mt-2 inline-flex items-center justify-center min-w-[34px] min-h-[34px] border border-[var(--hairline)] hover:border-[var(--accent-gold)] text-[var(--page-muted)] hover:text-[var(--accent-gold)] active:scale-[0.96] transition-all duration-150 rounded-[4px] cursor-pointer shrink-0"
            >
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform duration-200 ease-[var(--ease-fluent)] ${
                  isExpanded ? 'rotate-90 text-[var(--accent-gold)]' : ''
                }`}
              />
            </button>
          )}
        </div>

        {dataset && isExpanded && (
          <div className="mt-1.5 mb-1 pl-3 pr-1 border-t border-[var(--hairline)] bg-[var(--page-bg-secondary)]/45 max-h-48 overflow-y-auto folio-scroll divide-y divide-[var(--hairline)]">
            <div className="py-1.5 flex items-center justify-between text-[10.5px]">
              <button
                type="button"
                onClick={() => onNavigateToSpread(`${chapter.id}-opening`)}
                className="text-[var(--accent-gold)] hover:underline font-medium cursor-pointer"
              >
                Open Chapter {chapter.paddedNumber} Directory &rarr;
              </button>
              <button
                type="button"
                onClick={() => onNavigateToSpread(`${chapter.id}-introduction`)}
                className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
              >
                Chapter Introduction
              </button>
            </div>
            {dataset.entries.map((entry, idx) => {
              const tNum = String(idx + 1).padStart(2, '0');
              const isSelected = focusedTopicId === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => onNavigateToTopic(entry.id)}
                  className={`w-full flex items-center justify-between gap-2 py-1.5 text-left text-[11px] hover:text-[var(--accent-gold)] transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[var(--accent-gold)] font-semibold'
                      : 'text-[var(--page-ink)]'
                  }`}
                >
                  <span className="truncate">
                    <span className="text-[var(--accent-gold)] tabular-nums mr-1.5">
                      Topic {tNum} ({entry.id})
                    </span>
                    <span>&mdash; {entry.title}</span>
                  </span>
                  <span className="text-[10px] text-[var(--page-muted)] tabular-nums shrink-0">
                    Fig. {chapter.paddedNumber}.{tNum}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (folio.type) {
      /* ------------------------------------------------------------------ */
      /* 1. FRONTISPIECE                                                    */
      /* ------------------------------------------------------------------ */
      case 'frontispiece':
        return (
          <div className="h-full flex flex-col justify-between items-center text-center py-3 sm:py-4 px-2">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--page-muted)] font-medium">
              Illustrated Digital Encyclopedia
            </div>

            <div className="flex flex-col items-center my-auto max-w-sm">
              <div className="text-[var(--accent-gold)] mb-5 sm:mb-6">
                <GeometricRosette className="w-24 h-24 sm:w-28 sm:h-28" />
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-[0.04em] text-[var(--page-ink)] text-balance">
                Science of Creation
              </h2>

              <EditorialDivider className="w-40 my-4" />

              <p className="font-editorial italic text-base sm:text-lg text-[var(--page-muted)] leading-relaxed text-balance">
                &ldquo;Exploring the Signs of Creation Through Faith and Clear Science.&rdquo;
              </p>
            </div>

            <div className="w-full pt-3.5 border-t border-[var(--hairline)] flex flex-col gap-1 text-[11px] text-[var(--page-muted)]">
              <span className="uppercase tracking-[0.18em] font-medium">
                Ten Chapters · Five Hundred Topic Pages
              </span>
              <span className="tabular-nums text-[11px]">
                {(() => {
                  const loadedCount = CHAPTERS.filter(
                    (c) => Boolean(datasetsByChapter[c.id]?.entries.length)
                  ).length;
                  const totalTopics = CHAPTERS.reduce(
                    (acc, c) => acc + (datasetsByChapter[c.id]?.entries.length ?? 0),
                    0
                  );
                  return `${loadedCount} Chapters · ${totalTopics} Illustrated Topics · Independent Educational Guide`;
                })()}
              </span>
            </div>
          </div>
        );

      /* ------------------------------------------------------------------ */
      /* 2–12. COMPLETE 10-PAGE ENCYCLOPEDIA INTRODUCTION & VOLUME ATLAS    */
      /* ------------------------------------------------------------------ */
      case 'intro-welcome':
      case 'intro-reflection':
      case 'intro-faith-science':
      case 'intro-guide':
      case 'intro-methodology':
      case 'intro-grading':
      case 'intro-verification':
      case 'intro-responsibility':
      case 'intro-acknowledgements':
      case 'intro-invitation':
      case 'intro-overview':
        return (
          <EncyclopediaIntroduction
            folioType={folio.type}
            datasetsByChapter={datasetsByChapter}
            onNavigateToSpread={onNavigateToSpread}
          />
        );

      /* ------------------------------------------------------------------ */
      /* 5. TABLE OF CONTENTS — PART 1                                      */
      /* ------------------------------------------------------------------ */
      case 'toc-part-1':
        return (
          <div className="flex flex-col h-full">
            <header className="pb-3.5 mb-3 border-b border-[var(--hairline)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
                Table of Contents · Volume Index
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--page-ink)]">
                Chapters I &ndash; V
              </h2>
            </header>

            <div className="flex-1 flex flex-col divide-y divide-[var(--hairline)]">
              {CHAPTERS.slice(0, 5).map(renderChapterTocRow)}
            </div>
          </div>
        );

      /* ------------------------------------------------------------------ */
      /* 6. TABLE OF CONTENTS — PART 2                                      */
      /* ------------------------------------------------------------------ */
      case 'toc-part-2':
        return (
          <div className="flex flex-col h-full justify-between">
            <div>
              <header className="pb-3.5 mb-3 border-b border-[var(--hairline)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
                  Table of Contents · Continued
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--page-ink)]">
                  Chapters VI &ndash; X
                </h2>
              </header>

              <div className="flex flex-col divide-y divide-[var(--hairline)]">
                {CHAPTERS.slice(5, 10).map(renderChapterTocRow)}
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-[var(--hairline)] flex items-center justify-between text-[11px] text-[var(--page-muted)]">
              {(() => {
                const loadedCount = CHAPTERS.filter(
                  (c) => Boolean(datasetsByChapter[c.id]?.entries.length)
                ).length;
                const totalTopics = CHAPTERS.reduce(
                  (acc, c) => acc + (datasetsByChapter[c.id]?.entries.length ?? 0),
                  0
                );
                const reservedCount = CHAPTERS.length - loadedCount;
                return (
                  <>
                    <span className="tabular-nums">
                      {loadedCount} {loadedCount === 1 ? 'Chapter' : 'Chapters'} ({totalTopics} Topics)
                    </span>
                    <span className="tabular-nums">
                      {reservedCount === 0
                        ? 'Complete Ten-Volume Edition'
                        : 'Loading Chapter Volumes…'}
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
        );

      /* ------------------------------------------------------------------ */
      /* 7. CHAPTER OPENING — LEFT PLATE                                    */
      /* ------------------------------------------------------------------ */
      case 'chapter-plate': {
        const chapter = folio.chapter;
        if (!chapter) return null;

        return (
          <div className="relative h-full flex flex-col justify-between">
            <div
              aria-hidden="true"
              className="absolute -inset-4 pointer-events-none rounded-sm opacity-60 dark:opacity-80"
              style={{
                background: `radial-gradient(circle at 50% 45%, var(--chapter-tint), transparent 72%)`,
                ['--chapter-tint' as string]: chapter.theme.atmosphereTintDark,
              }}
            />

            <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[var(--page-muted)] pb-2">
              <span>{chapter.plateLabel}</span>
              <span>{chapter.theme.disciplineLabel}</span>
            </div>

            <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center py-1">
              <div className="relative h-full max-w-full aspect-[3/4] overflow-hidden border border-[var(--gold-hairline)] shadow-[0_14px_34px_rgba(0,0,0,0.35)] bg-[#061511]">
                <ChapterPlateImage chapter={chapter} />
                <div className="pointer-events-none absolute inset-2 border border-[#DFC99B]/25" />
              </div>
            </div>

            <p className="relative z-10 pt-2 text-center font-editorial italic text-xs text-[var(--page-muted)]">
              {chapter.plateLabel} &mdash; Opening Artwork for Chapter{' '}
              {chapter.paddedNumber}
            </p>
          </div>
        );
      }

      /* ------------------------------------------------------------------ */
      /* 8. CHAPTER OPENING — RIGHT INDEX (50-TOPIC DIRECTORY WHEN LOADED)  */
      /* ------------------------------------------------------------------ */
      case 'chapter-index': {
        const chapter = folio.chapter;
        if (!chapter) return null;
        const dataset = datasetsByChapter[chapter.id];

        if (dataset && dataset.entries.length > 0 && chapterIndexMeta) {
          const filteredEntries =
            gradeFilter === 'ALL'
              ? dataset.entries
              : dataset.entries.filter((e) => e.evidence_grade === gradeFilter);

          const { counts, indexById } = chapterIndexMeta;
          const showAllGrades =
            chapter.id === 'chapter-09' || chapter.id === 'chapter-10';

          return (
            <div className="flex flex-col h-full gap-3">
              <header className="pb-3 border-b border-[var(--hairline)] shrink-0">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium tabular-nums">
                    Chapter {chapter.paddedNumber} · {dataset.entries.length} Topics
                  </span>
                  <span className="text-[var(--accent-gold)]">
                    <ChapterMotifIcon motif={chapter.theme.motifType} />
                  </span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--page-ink)] leading-tight text-balance">
                  {chapter.title}
                </h2>
                <p className="text-xs text-[var(--page-muted)] leading-relaxed mt-1.5">
                  {dataset.description}
                </p>
              </header>

              {/* Functional Grade Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--page-muted)]">
                  Topic Directory
                </span>
                <div className="flex items-center gap-1 p-0.5 border border-[var(--hairline)] bg-[var(--page-bg-secondary)] rounded-[4px]">
                  {(
                    [
                      { key: 'ALL', label: `All (${dataset.entries.length})` },
                      ...(showAllGrades || counts.A > 0
                        ? [{ key: 'A' as const, label: `A (${counts.A})` }]
                        : []),
                      ...(showAllGrades || counts.B > 0
                        ? [{ key: 'B' as const, label: `B (${counts.B})` }]
                        : []),
                      ...(showAllGrades || counts.C > 0
                        ? [{ key: 'C' as const, label: `C (${counts.C})` }]
                        : []),
                      ...(showAllGrades || counts.D > 0
                        ? [{ key: 'D' as const, label: `D (${counts.D})` }]
                        : []),
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setGradeFilter(tab.key)}
                      className={`px-2 py-1 text-[11px] tabular-nums transition-all duration-150 rounded-[3px] cursor-pointer whitespace-nowrap ${
                        gradeFilter === tab.key
                          ? 'bg-[var(--page-bg)] text-[var(--accent-gold)] font-semibold shadow-xs'
                          : 'text-[var(--page-muted)] hover:text-[var(--page-ink)]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable 50-Topic Directory */}
              <div className="flex-1 min-h-0 overflow-y-auto folio-scroll pr-1 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
                {filteredEntries.length === 0 ? (
                  <div className="py-6 px-2 text-center text-xs text-[var(--page-muted)]">
                    No topics carry Evidence Grade {gradeFilter} in this chapter.
                  </div>
                ) : (
                  filteredEntries.map((entry) => {
                    const origIndex = indexById.get(entry.id) ?? 1;
                    const paddedTopic = String(origIndex).padStart(2, '0');
                    const isExplored = exploredTopicIds?.has(entry.id) ?? false;
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => onNavigateToTopic(entry.id)}
                        className="w-full group flex items-center justify-between gap-3 py-2 px-1.5 hover:bg-[var(--page-bg-secondary)]/80 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-baseline gap-2 min-w-0">
                          <span className="text-[11px] font-medium text-[var(--accent-gold)] tabular-nums shrink-0">
                            Topic {paddedTopic} &middot; {entry.id}
                          </span>
                          <span className="text-xs sm:text-[13px] text-[var(--page-ink)] group-hover:text-[var(--accent-gold)] transition-colors truncate">
                            {entry.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10.5px] text-[var(--page-muted)] shrink-0 tabular-nums">
                          {isExplored && (
                            <span className="text-[var(--accent-gold)] font-medium">
                              Explored
                            </span>
                          )}
                          <span>
                            Fig. {chapter.paddedNumber}.{paddedTopic}
                          </span>
                          <span aria-hidden="true">&middot;</span>
                          <span className="font-medium text-[var(--page-ink)]">
                            Grade {entry.evidence_grade}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {dataset.chapter_safeguards && (
                <details className="shrink-0 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/45 rounded-sm px-2.5 py-1.5 text-[11px]">
                  <summary className="cursor-pointer select-none font-medium text-[var(--accent-gold)] flex items-center justify-between gap-2">
                    <span>{dataset.chapter_safeguards.title}</span>
                    <span className="text-[10px] text-[var(--page-muted)] font-normal">
                      {chapter.id === 'chapter-10'
                        ? 'Good to keep in mind before reading'
                        : 'Health & study boundaries'}
                    </span>
                  </summary>
                  <div className="mt-2 max-h-36 overflow-y-auto folio-scroll space-y-2 pr-1 border-t border-[var(--hairline)] pt-2 text-[10.5px] leading-snug">
                    {dataset.chapter_safeguards.verification_notice && (
                      <p className="text-[var(--accent-gold)] font-medium">
                        {chapter.id === 'chapter-10'
                          ? 'Study note: This chapter presents Qur’anic moral guidance alongside trusted social studies clearly and separately.'
                          : dataset.chapter_safeguards.verification_notice}
                      </p>
                    )}
                    <p className="font-medium text-[var(--page-ink)]">
                      {dataset.chapter_safeguards.clinical_disclaimer}
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-[var(--page-muted)]">
                      {dataset.chapter_safeguards.pillars.map((pillar, idx) => (
                        <li key={idx}>{pillar}</li>
                      ))}
                    </ul>
                    <p className="text-[var(--page-ink)]/90">
                      <span className="font-medium text-[var(--accent-gold)]">
                        Word care:
                      </span>{' '}
                      {dataset.chapter_safeguards.terminology_caution}
                    </p>
                    {dataset.research_methodology && (
                      <p className="text-[var(--page-muted)] border-t border-[var(--hairline)] pt-1.5">
                        <span className="font-medium text-[var(--page-ink)]">
                          How topics are graded:
                        </span>{' '}
                        {dataset.research_methodology.standard}
                      </p>
                    )}
                  </div>
                </details>
              )}

              {dataset.source_catalog && Object.keys(dataset.source_catalog).length > 0 && (
                <details className="shrink-0 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/45 rounded-sm px-2.5 py-1.5 text-[11px]">
                  <summary className="cursor-pointer select-none font-medium text-[var(--accent-gold)] flex items-center justify-between gap-2">
                    <span>
                      Chapter Bibliography ({Object.keys(dataset.source_catalog).length} Institutional &amp; Literature Sources)
                    </span>
                    <span className="text-[10px] text-[var(--page-muted)] font-normal">
                      Reference overview
                    </span>
                  </summary>
                  <div className="mt-2 max-h-36 overflow-y-auto folio-scroll space-y-2 pr-1 border-t border-[var(--hairline)] pt-2">
                    {Object.entries(dataset.source_catalog).map(([sid, cat]) => {
                      const cleanUrl = cat.url.trim();
                      const hasValidUrl = Boolean(cleanUrl) && !/\s/.test(cleanUrl);
                      return (
                        <div key={sid} className="space-y-0.5 text-[10.5px] leading-snug">
                          <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                            <span className="font-semibold text-[var(--page-ink)]">
                              {cat.institution ?? cat.publisher ?? 'Institutional Source'}
                            </span>
                            {cat.audit_classification && (
                              <span className="text-[10px] text-[var(--page-muted)]">
                                {cat.audit_classification}
                              </span>
                            )}
                          </div>
                          <div className="text-[var(--page-ink)]/90">
                            {cat.title} &mdash;{' '}
                            <span className="text-[var(--page-muted)]">{cat.supports}</span>
                          </div>
                          {hasValidUrl && (
                            <a
                              href={cleanUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline break-all"
                            >
                              <span>{cleanUrl}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </a>
                          )}
                          {cat.source_warning && (
                            <div className="text-[10px] text-[var(--accent-gold)]/90">
                              Scope guidance: {cat.source_warning}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </details>
              )}

              <div className="pt-2 flex items-center justify-between gap-2 shrink-0 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigateToSpread('table-of-contents')}
                  className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
                >
                  &larr; Table of Contents
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigateToSpread(`${chapter.id}-introduction`)}
                    className="text-[var(--page-ink)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
                  >
                    Chapter Intro
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateToTopic(dataset.entries[0].id)}
                    className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-gold)] hover:underline cursor-pointer"
                  >
                    <span>Begin at {dataset.entries[0].id}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        }

        // Fallback while chapter volume finishes loading
        return (
          <div className="flex flex-col justify-between h-full gap-4">
            <div className="space-y-4">
              <header className="pb-4 border-b border-[var(--hairline)]">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium tabular-nums">
                    Chapter {chapter.paddedNumber} of 10
                  </span>
                  <span className="text-[var(--accent-gold)]">
                    <ChapterMotifIcon motif={chapter.theme.motifType} />
                  </span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--page-ink)] leading-tight text-balance">
                  {chapter.title}
                </h2>
                <p className="text-xs text-[var(--page-muted)] mt-1.5">
                  {chapter.theme.disciplineLabel}
                </p>
              </header>

              <p className="text-sm leading-[1.7] text-[var(--page-ink)]/90">
                {chapter.editorialScopePlaceholder}
              </p>

              <div className="p-3.5 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/60 rounded-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-[0.16em] font-semibold text-[var(--accent-gold)]">
                    Preparing Chapter Directory
                  </span>
                  <span className="tabular-nums text-[var(--page-muted)]">
                    {chapter.expectedTopicCount} Topic Folios
                  </span>
                </div>
                <p className="text-xs text-[var(--page-muted)] leading-relaxed">
                  Loading chapter entries and illustrations into the reading spread.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--hairline)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigateToSpread('table-of-contents')}
                className="text-xs text-[var(--page-muted)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
              >
                &larr; Return to Table of Contents
              </button>
              <button
                type="button"
                onClick={() => onNavigateToSpread(`${chapter.id}-introduction`)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-gold)] hover:underline cursor-pointer"
              >
                <span>Read Chapter Introduction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      }

      /* ------------------------------------------------------------------ */
      /* 8b. DEDICATED CHAPTER INTRODUCTION (9-PART CHAPTER OPENING)        */
      /* ------------------------------------------------------------------ */
      case 'chapter-intro':
      case 'chapter-intro-methods': {
        const chapter = folio.chapter;
        if (!chapter) return null;
        return (
          <ChapterIntroduction
            mode={folio.type === 'chapter-intro' ? 'overview' : 'methods'}
            chapter={chapter}
            dataset={datasetsByChapter[chapter.id]}
            onNavigateToSpread={onNavigateToSpread}
            onNavigateToTopic={onNavigateToTopic}
          />
        );
      }

      /* ------------------------------------------------------------------ */
      /* 9. UNIFIED 8-SECTION SINGLE-PAGE TOPIC FOLIO                       */
      /* ------------------------------------------------------------------ */
      case 'topic-single': {
        const {
          rawEntry: entry,
          enrichment,
          chapter,
          topicIndexInChapter,
          totalTopicsInChapter,
          prevTopicId,
          nextTopicId,
          relatedTopics,
        } = folio;
        if (!entry || !chapter || !topicDerived) return null;

        const isFocused = focusedTopicId === entry.id;
        const {
          verifiedFacts,
          nextChapter,
          methodologyBreakdown,
          quranConnection,
          evidenceTrail,
          evidenceSummary,
          rememberPoints,
        } = topicDerived;

        const illustrationRecord = illustrationByTopicId?.[entry.id];
        const paddedTopicNum = String(topicIndexInChapter ?? 1).padStart(
          2,
          '0'
        );
        const totalInChap = totalTopicsInChapter ?? 50;
        const globalPos = folio.globalTopicNumber ?? topicIndexInChapter ?? 1;
        const totalGlobal = folio.totalGlobalTopics ?? 500;
        const paddedGlobalPos = String(globalPos).padStart(3, '0');
        const figureNumber =
          folio.figureNumber ?? `${chapter.paddedNumber}.${paddedTopicNum}`;
        const isExplored = exploredTopicIds?.has(entry.id) ?? false;

        return (
          <article
            aria-label={`Chapter ${chapter.paddedNumber}, Topic ${paddedTopicNum} (${entry.id}): ${entry.title}`}
            className={`flex flex-col gap-3.5 pb-2 transition-colors ${
              isFocused
                ? 'ring-1 ring-[var(--accent-gold)]/55 rounded-sm p-2 -m-2 bg-[var(--page-bg-secondary)]/25'
                : ''
            }`}
          >
            {/* Topic Header & Explicit Numbering Sequence */}
            <header className="pb-2.5 border-b border-[var(--hairline)] space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--page-muted)]">
                <span className="uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold tabular-nums">
                  Chapter {chapter.paddedNumber} &middot; Topic {paddedTopicNum}{' '}
                  &middot; {entry.id}
                </span>
                <span className="tabular-nums">
                  {paddedGlobalPos} / {totalGlobal} &middot; Figure{' '}
                  {figureNumber} &middot; Grade {entry.evidence_grade}
                </span>
              </div>

              <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[var(--page-ink)] leading-snug text-balance">
                Topic {paddedTopicNum} &mdash; {entry.title}
              </h2>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[var(--page-muted)]">
                {enrichment?.tags && enrichment.tags.length > 0 ? (
                  <span className="uppercase tracking-[0.13em]">
                    {enrichment.tags.join(' · ')}
                  </span>
                ) : (
                  <span>{entry.scientific_topic}</span>
                )}

                {onToggleExploredTopic && (
                  <button
                    type="button"
                    onClick={() => onToggleExploredTopic(entry.id)}
                    aria-pressed={isExplored}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] border rounded-[2px] transition-colors cursor-pointer ${
                      isExplored
                        ? 'border-[var(--accent-gold)] text-[var(--accent-gold)] bg-[var(--page-bg-secondary)] font-medium'
                        : 'border-[var(--hairline)] text-[var(--page-muted)] hover:border-[var(--accent-gold)] hover:text-[var(--page-ink)]'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>
                      {isExplored ? 'Explored' : 'Mark Topic Read'}
                    </span>
                  </button>
                )}
              </div>
            </header>

            {/* 1. Discover the Topic */}
            <DiscoverSection entry={entry} enrichment={enrichment} />

            {/* 2. What Does the Qur'an Say? */}
            <QuranSection entry={entry} enrichment={enrichment} />

            {/* 3. What Does Science Tell Us? */}
            <ScienceSection
              chapter={chapter}
              entry={entry}
              enrichment={enrichment}
              verifiedFacts={verifiedFacts}
            />

            {/* 4. How Are They Connected? */}
            <ConnectionSection entry={entry} connection={quranConnection} />

            {/* 5. Understand It Through an Illustration */}
            <IllustrationSection
              chapter={chapter}
              illustrationRecord={illustrationRecord}
              compactLandscape={isCompactLandscape}
            />

            {/* 6. What Should We Remember? */}
            <RememberSection points={rememberPoints} />

            {/* 7. What Should We Be Careful About? */}
            <BeCarefulSection
              entry={entry}
              enrichment={enrichment}
              connection={quranConnection}
            />

            {/* 8. Explore the Evidence */}
            <ExploreEvidenceSection
              entry={entry}
              methodology={methodologyBreakdown}
              trail={evidenceTrail}
              summary={evidenceSummary}
              relatedTopics={relatedTopics}
              onNavigateToTopic={onNavigateToTopic}
            />

            {/* EXPLICIT PREVIOUS / CURRENT / NEXT TOPIC NAVIGATION */}
            <nav
              aria-label="Topic navigation"
              className="pt-3 mt-1 border-t border-[var(--hairline)] space-y-2 text-[11px]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[var(--page-muted)] tabular-nums">
                <span>
                  {prevTopicId
                    ? `Previous: Topic ${String((topicIndexInChapter ?? 1) - 1).padStart(2, '0')} / ${totalInChap}`
                    : `Previous: Chapter ${chapter.paddedNumber} Intro`}
                </span>
                <span className="font-medium text-[var(--page-ink)]">
                  Current: Topic {paddedTopicNum} / {totalInChap} &middot;{' '}
                  {paddedGlobalPos} / {totalGlobal}
                </span>
                <span>
                  {nextTopicId
                    ? `Next: Topic ${String((topicIndexInChapter ?? 1) + 1).padStart(2, '0')} / ${totalInChap}`
                    : nextChapter
                    ? `Next: Chapter ${nextChapter.paddedNumber}`
                    : 'End of Volume'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                {prevTopicId ? (
                  <button
                    type="button"
                    onClick={() => onNavigateToTopic(prevTopicId)}
                    title={folio.prevTopicTitle}
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 border border-[var(--hairline)] hover:border-[var(--accent-gold)] text-[var(--page-ink)] hover:text-[var(--accent-gold)] active:scale-[0.985] rounded-[4px] transition-all duration-150 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="tabular-nums">
                      Previous Topic ({prevTopicId})
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onNavigateToSpread(`${chapter.id}-introduction`)
                    }
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 border border-[var(--hairline)] hover:border-[var(--accent-gold)] text-[var(--page-muted)] hover:text-[var(--accent-gold)] active:scale-[0.985] rounded-[4px] transition-all duration-150 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Chapter {chapter.paddedNumber} Intro</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onNavigateToSpread(`${chapter.id}-opening`)}
                  className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] transition-colors duration-150 cursor-pointer px-2 py-1"
                >
                  Chapter {chapter.paddedNumber} Directory ({totalInChap})
                </button>

                {nextTopicId ? (
                  <button
                    type="button"
                    onClick={() => onNavigateToTopic(nextTopicId)}
                    title={folio.nextTopicTitle}
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 border border-[var(--gold-hairline)] text-[var(--accent-gold)] font-medium hover:border-[var(--accent-gold)] active:scale-[0.985] rounded-[4px] transition-all duration-150 cursor-pointer"
                  >
                    <span className="tabular-nums">
                      Next Topic ({nextTopicId})
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : nextChapter ? (
                  <button
                    type="button"
                    onClick={() =>
                      onNavigateToSpread(`${nextChapter.id}-opening`)
                    }
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 border border-[var(--gold-hairline)] text-[var(--accent-gold)] font-medium hover:border-[var(--accent-gold)] active:scale-[0.985] rounded-[4px] transition-all duration-150 cursor-pointer"
                  >
                    <span>
                      Chapter {nextChapter.paddedNumber}: {nextChapter.shortTitle}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigateToSpread('table-of-contents')}
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 border border-[var(--gold-hairline)] text-[var(--accent-gold)] font-medium hover:border-[var(--accent-gold)] active:scale-[0.985] rounded-[4px] transition-all duration-150 cursor-pointer"
                  >
                    <span>Table of Contents</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </nav>
          </article>
        );
      }

      /* ------------------------------------------------------------------ */
      /* 10. SINGLE-PAGE TEMPLATE FOLIO FOR CHAPTERS 02–10                  */
      /* ------------------------------------------------------------------ */
      case 'topic-template-single': {
        const { templateTopic: topic, chapter } = folio;
        if (!topic || !chapter) return null;

        return (
          <div className="flex flex-col justify-between h-full gap-4">
            <div className="space-y-3.5">
              <header className="pb-2.5 border-b border-[var(--hairline)]">
                <div className="flex items-center justify-between text-[11px] text-[var(--page-muted)] mb-1">
                  <span className="uppercase tracking-[0.18em] text-[var(--accent-gold)] font-semibold tabular-nums">
                    Topic {topic.topicNumber} · Single-Page Layout Template
                  </span>
                  <span>{topic.evidenceGrade}</span>
                </div>
                <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[var(--page-ink)] leading-snug">
                  {topic.title}
                </h2>
              </header>

              <div className="p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/65 rounded-sm">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent-gold)] mb-1">
                  {topic.quranicReference}
                </div>
                <p dir="rtl" lang="ar" className="font-arabic text-lg text-center my-1">
                  {topic.arabicVerse}
                </p>
                <p className="text-xs italic text-[var(--page-muted)] text-center">
                  {topic.translation}
                </p>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div>
                  <span className="uppercase tracking-[0.14em] text-[var(--accent-gold)] font-semibold block">
                    Scientific Observation &amp; Diagram Slot
                  </span>
                  <p className="text-[var(--page-muted)] mt-0.5">
                    {topic.scientificFinding}
                  </p>
                </div>
                <div className="p-2.5 border border-[var(--hairline)] rounded-sm">
                  <span className="uppercase tracking-[0.14em] text-[var(--accent-gold)] font-semibold block">
                    Analysis, Tafsir &amp; Limitations
                  </span>
                  <p className="text-[var(--page-muted)] mt-0.5">
                    {topic.limitationsAndCautions}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[var(--hairline)] flex items-center justify-between text-[11px]">
              <button
                type="button"
                onClick={() => onNavigateToSpread(`${chapter.id}-opening`)}
                className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
              >
                &larr; Chapter {chapter.paddedNumber}
              </button>
              <button
                type="button"
                onClick={() => onNavigateToSpread('table-of-contents')}
                className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
              >
                Table of Contents
              </button>
            </div>
          </div>
        );
      }

      /* ------------------------------------------------------------------ */
      /* 11. CHAPTER EPILOGUE / TRANSITION FOLIO                            */
      /* ------------------------------------------------------------------ */
      case 'chapter-epilogue': {
        const chapter = folio.chapter;
        if (!chapter) return null;
        const nextChapter = CHAPTER_BY_NUMBER[chapter.number + 1];

        return (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 gap-4">
            <div className="text-[var(--accent-gold)]">
              <ChapterMotifIcon
                motif={chapter.theme.motifType}
                className="w-10 h-10"
              />
            </div>
            <div className="space-y-2 max-w-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                Chapter {chapter.paddedNumber} Foundation
              </p>
              <h3 className="font-editorial text-2xl font-semibold text-[var(--page-ink)]">
                {chapter.title}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--page-muted)]">
                Fifty easy-to-follow illustrated topic pages follow this chapter opening.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigateToSpread('table-of-contents')}
                className="px-4 py-2 text-xs uppercase tracking-[0.14em] border border-[var(--hairline)] hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
              >
                Contents
              </button>
              {nextChapter && (
                <button
                  type="button"
                  onClick={() => onNavigateToSpread(`${nextChapter.id}-opening`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.14em] border border-[var(--gold-hairline)] text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
                >
                  <span>Next: Chapter {nextChapter.paddedNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div
      className={`relative h-full w-full flex flex-col justify-between paper-surface text-[var(--page-ink)] ${
        isCompactLandscape
          ? 'px-4 py-2.5 sm:px-6 sm:py-3'
          : 'px-5 py-4 sm:px-7 sm:py-6'
      }`}
    >
      {/* Subtle Inner Editorial Folio Hairline Border */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute border border-[var(--gold-hairline)]/35 rounded-[2px] ${
          isCompactLandscape ? 'inset-1.5' : 'inset-2 sm:inset-2.5'
        }`}
      />

      {/* Running Header */}
      <div
        className={`relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)] shrink-0 ${
          isCompactLandscape ? 'pb-1.5' : 'pb-2.5'
        }`}
      >
        <span className="truncate font-medium">
          {folio.side === 'left' ? 'Science of Creation' : folio.sectionLabel}
        </span>
        <span className="tabular-nums shrink-0">
          {folio.side === 'left' ? folio.sectionLabel : 'Collector’s Folio'}
        </span>
      </div>

      {/* Scrollable Inner Folio Content */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto folio-scroll pr-1.5">
        {renderContent()}
      </div>

      {/* Running Footer with Unambiguous Physical Folio Numeral */}
      <div
        className={`relative z-10 flex items-center justify-between border-t border-[var(--hairline)] text-[11px] text-[var(--page-muted)] shrink-0 ${
          isCompactLandscape ? 'pt-1.5 mt-1' : 'pt-2.5 mt-1'
        }`}
      >
        {folio.side === 'left' ? (
          <>
            <span className="tabular-nums font-editorial text-sm font-medium text-[var(--accent-gold)]">
              Folio {String(folio.folioNumber).padStart(3, '0')}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums">
              {folio.figureNumber
                ? `Verso · Fig. ${folio.figureNumber}`
                : 'Verso'}
            </span>
          </>
        ) : (
          <>
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums">
              {folio.figureNumber
                ? `Fig. ${folio.figureNumber} · Recto`
                : 'Recto'}
            </span>
            <span className="tabular-nums font-editorial text-sm font-medium text-[var(--accent-gold)]">
              Folio {String(folio.folioNumber).padStart(3, '0')}
            </span>
          </>
        )}
      </div>
    </div>
  );
});

FolioRenderer.displayName = 'FolioRenderer';
