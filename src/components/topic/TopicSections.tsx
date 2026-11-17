import React, { useMemo } from 'react';
import {
  AlertCircle,
  BookMarked,
  BookOpen,
  Compass,
  ExternalLink,
  FileText,
  FlaskConical,
  GitBranch,
  GraduationCap,
  HelpCircle,
  Link2,
  ListChecks,
  Microscope,
  Scale,
} from 'lucide-react';
import {
  formatConnectionTypeLabel,
  formatEditorialVerificationSummary,
  formatSourceRoleNote,
  formatTafsirStatusBadge,
  getPlainGradeDescription,
  isConceptualDomainChapter,
  sanitizePublicLimitationNote,
  sanitizeQuranVerificationContext,
  sanitizeScientificExplanation,
  sanitizeTafsirNotes,
} from '../../data/editorialPresentation';
import { extractKeyScienceWordsForTopic } from '../../data/scienceGlossary';
import {
  CompleteEvidenceSummary,
  EvidenceTrailStep,
  QuranicConnectionBreakdown,
  ScientificMethodologyBreakdown,
} from '../../data/topicEvidenceBuilder';
import {
  ChapterMetadata,
  IllustrationRegistryEntry,
  RawDatasetEntry,
  RelatedTopicLink,
  TopicEnrichment,
  VerifiedScientificFact,
  VerifiedVersePassage,
} from '../../types/encyclopedia';
import { CornerFiligree } from '../ornaments/IslamicOrnaments';
import { TopicFigureViewer } from './TopicFigureViewer';

const SectionHeading: React.FC<{
  number: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}> = ({ number, title, subtitle, icon }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-1.5 border-b border-[var(--hairline)]">
    <h3 className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)] tabular-nums">
      {icon}
      <span>
        {number}. {title}
      </span>
    </h3>
    {subtitle && (
      <span className="text-[11px] text-[var(--page-muted)]">{subtitle}</span>
    )}
  </div>
);

/* 1. Discover the Topic */
export const DiscoverSection: React.FC<{
  entry: RawDatasetEntry;
  enrichment?: TopicEnrichment;
}> = React.memo(({ entry, enrichment }) => {
  const opener =
    enrichment?.introExplanation?.trim() ||
    sanitizeScientificExplanation(
      entry.scientific_evidence.explanation,
      entry.scientific_evidence.finding
    );

  return (
    <section aria-label="1. Discover the Topic" className="space-y-1.5">
      <SectionHeading
        number="1"
        title="Discover the Topic"
        subtitle={enrichment?.psychologicalConcept ?? entry.scientific_topic}
        icon={<Compass className="w-3.5 h-3.5" />}
      />
      <p className="text-[13.5px] leading-[1.68] text-[var(--page-ink)]/94">
        {opener}
      </p>
    </section>
  );
});

/* Verse Block Helper */
export const QuranicVerseDisplay: React.FC<{
  passage: VerifiedVersePassage;
  compact?: boolean;
}> = ({ passage, compact = false }) => (
  <div className="space-y-1.5 pt-2 first:pt-0 first:border-t-0 border-t border-[var(--hairline)]">
    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
      <span className="font-medium text-[var(--page-ink)] tabular-nums">
        Surah {passage.surahNameSimple} ({passage.surahNumber}:
        {passage.verseNumbers}) &middot; {passage.surahTranslatedName} &middot;{' '}
        {passage.revelationPlace}
      </span>
      <a
        href={passage.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline shrink-0"
      >
        <span>Quran.com ({passage.reference})</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </a>
    </div>

    <p
      dir="rtl"
      lang="ar"
      className={`font-arabic text-right text-[var(--page-ink)] py-1 my-0.5 ${
        compact ? 'text-[19px] leading-[1.95]' : 'text-[21px] sm:text-[22px] leading-[2.05]'
      }`}
    >
      {passage.arabicText}
    </p>

    <p className="font-editorial italic text-[13.5px] leading-relaxed text-[var(--page-ink)]/94">
      &ldquo;{passage.translationText}&rdquo;
    </p>
    <p className="text-[11px] text-[var(--page-muted)]">
      Translator:{' '}
      <span className="text-[var(--page-ink)] font-medium">
        {passage.translator}
      </span>{' '}
      &middot; Source: {passage.translationSource}
    </p>
  </div>
);

/* 2. What Does the Qur'an Say? */
export const QuranSection: React.FC<{
  entry: RawDatasetEntry;
  enrichment?: TopicEnrichment;
}> = React.memo(({ entry, enrichment }) => {
  const passages = entry.quranic_evidence.verified_passages ?? [];
  const tafsirSources = entry.classical_tafsir_review.sources;
  const cleanNotes = sanitizeTafsirNotes(
    entry.classical_tafsir_review.notes,
    tafsirSources
  );

  return (
    <section
      aria-label="2. What Does the Qur'an Say?"
      className="relative p-3 sm:p-3.5 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[4px] space-y-2.5"
    >
      <CornerFiligree
        position="tl"
        className="absolute top-1 left-1 w-3.5 h-3.5 text-[var(--accent-gold)] opacity-55 pointer-events-none"
      />
      <CornerFiligree
        position="br"
        className="absolute bottom-1 right-1 w-3.5 h-3.5 text-[var(--accent-gold)] opacity-55 pointer-events-none"
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)] tabular-nums">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            2. What Does the Qur&rsquo;an Say? &middot; {entry.quran_reference}
          </span>
        </span>
        {entry.quranic_evidence.source_links &&
        entry.quranic_evidence.source_links.length > 1 ? (
          <div className="flex flex-wrap items-center gap-2">
            {entry.quranic_evidence.source_links.map((link) => (
              <a
                key={`${link.reference}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline tabular-nums"
              >
                <span>{link.reference}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        ) : (
          <a
            href={entry.quranic_evidence.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline"
          >
            <span>Read on Quran.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {passages.length > 0 ? (
        <div className="space-y-2">
          {passages.map((p) => (
            <QuranicVerseDisplay
              key={p.reference}
              passage={p}
              compact={passages.length > 1}
            />
          ))}
        </div>
      ) : entry.quranic_evidence.verse_text_arabic ? (
        <div className="space-y-1.5">
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-[21px] sm:text-[22px] leading-[2.05] py-1 text-right text-[var(--page-ink)]"
          >
            {entry.quranic_evidence.verse_text_arabic}
          </p>
          {entry.quranic_evidence.translation && (
            <p className="font-editorial italic text-sm text-[var(--page-ink)]/92">
              {entry.quranic_evidence.translation}
              {entry.quranic_evidence.translator
                ? ` — ${entry.quranic_evidence.translator}`
                : ''}
            </p>
          )}
        </div>
      ) : (
        <p className="text-xs text-[var(--page-muted)]">
          Arabic verse text and translation are linked above on Quran.com.
        </p>
      )}

      {enrichment?.quranSimpleMeaning && (
        <p className="text-[12px] leading-relaxed text-[var(--page-ink)]/92 pt-1.5 border-t border-[var(--hairline)]">
          <span className="font-semibold text-[var(--accent-gold)]">
            In simple words:
          </span>{' '}
          {enrichment.quranSimpleMeaning}
        </p>
      )}

      {/* Early Muslim Scholars (Classical Tafsir) */}
      <div className="pt-2 border-t border-[var(--hairline)] space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--page-ink)]">
            <BookMarked className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>What Early Scholars Said (Tafsir)</span>
          </span>
          <span className="text-[10.5px] text-[var(--page-muted)]">
            {formatTafsirStatusBadge(tafsirSources)}
          </span>
        </div>

        {cleanNotes && (
          <p className="text-[11.5px] leading-relaxed text-[var(--page-muted)]">
            {cleanNotes}
          </p>
        )}

        {tafsirSources.length > 0 && (
          <div className="space-y-1.5 pt-1">
            {tafsirSources.map((ts, idx) => (
              <div key={idx} className="text-[11px] space-y-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 font-medium text-[var(--page-ink)]">
                  <span>
                    {ts.scholar} &mdash; {ts.work}
                    {ts.covered_verses ? ` (${ts.covered_verses})` : ''}
                  </span>
                  <a
                    href={ts.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline shrink-0"
                  >
                    <span>Tafsir Source</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <p className="text-[var(--page-muted)] leading-relaxed">
                  {ts.summary}
                </p>
              </div>
            ))}
          </div>
        )}

        {entry.classical_tafsir_review.specific_caution && (
          <p className="text-[11px] leading-relaxed text-[var(--page-ink)]/88">
            <span className="font-medium text-[var(--accent-gold)]">
              Reading care:
            </span>{' '}
            {entry.classical_tafsir_review.specific_caution}
          </p>
        )}

        <details className="pt-1 text-[11px] text-[var(--page-muted)]">
          <summary className="cursor-pointer select-none font-medium text-[var(--page-ink)]/85 hover:text-[var(--accent-gold)]">
            Verse &amp; Translation Verification Note
          </summary>
          <p className="mt-1 leading-relaxed">
            {sanitizeQuranVerificationContext(
              entry.quranic_evidence.text_verification
            )}
          </p>
        </details>
      </div>
    </section>
  );
});

/* 3. What Does Science Tell Us? (with Everyday Example + Key Science Words Mini-Glossary) */
export const ScienceSection: React.FC<{
  chapter: ChapterMetadata;
  entry: RawDatasetEntry;
  enrichment?: TopicEnrichment;
  verifiedFacts: VerifiedScientificFact[];
}> = React.memo(({ chapter, entry, enrichment, verifiedFacts }) => {
  const whatItMeans = enrichment?.whatItMeans?.trim();
  const cleanScienceFallback = sanitizeScientificExplanation(
    entry.scientific_evidence.explanation,
    ''
  );

  const keyWords = useMemo(() => {
    const combinedForGlossary = [
      entry.title,
      entry.scientific_topic,
      entry.scientific_evidence.finding,
      enrichment?.introExplanation ?? '',
      whatItMeans ?? '',
      cleanScienceFallback,
    ].join(' ');

    return extractKeyScienceWordsForTopic(
      combinedForGlossary,
      enrichment?.keyScienceWords,
      4
    );
  }, [
    cleanScienceFallback,
    enrichment?.introExplanation,
    enrichment?.keyScienceWords,
    entry.scientific_evidence.finding,
    entry.scientific_topic,
    entry.title,
    whatItMeans,
  ]);

  return (
    <section aria-label="3. What Does Science Tell Us?" className="space-y-2.5">
      <SectionHeading
        number="3"
        title="What Does Science Tell Us?"
        subtitle={chapter.theme.disciplineLabel}
        icon={<Microscope className="w-3.5 h-3.5" />}
      />

      <div className="space-y-2">
        <p className="text-[13px] font-medium text-[var(--page-ink)] leading-relaxed">
          {entry.scientific_evidence.finding}
        </p>

        {whatItMeans ? (
          <p className="text-[12.5px] leading-[1.68] text-[var(--page-ink)]/88">
            {whatItMeans}
          </p>
        ) : (
          cleanScienceFallback &&
          cleanScienceFallback !== entry.scientific_evidence.finding && (
            <p className="text-[12.5px] leading-[1.68] text-[var(--page-ink)]/88">
              {cleanScienceFallback}
            </p>
          )
        )}

        {enrichment?.everydayExample && (
          <p className="text-[12px] leading-relaxed text-[var(--page-ink)]/92 pt-1.5 border-t border-[var(--hairline)]">
            <span className="font-semibold text-[var(--accent-gold)]">
              Everyday example:
            </span>{' '}
            {enrichment.everydayExample}
          </p>
        )}
      </div>

      {/* Key Numbers & Trusted Reference Measurements */}
      {verifiedFacts.length > 0 && (
        <div className="pt-1.5 border-t border-[var(--hairline)] space-y-1">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="font-semibold text-[var(--page-ink)]">
              {chapter.id === 'chapter-09' || chapter.id === 'chapter-10'
                ? 'Helpful Facts & Real-World Context'
                : 'Trusted Science Facts & Measurements'}
            </span>
          </div>
          <div className="divide-y divide-[var(--hairline)]">
            {verifiedFacts.map((fact) => (
              <div key={fact.id} className="py-1.5 text-[11px]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span className="font-medium text-[var(--page-ink)]">
                    {fact.label}
                  </span>
                  <span className="font-semibold text-[var(--accent-gold)] tabular-nums">
                    {fact.value}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[var(--page-muted)] mt-0.5">
                  <span>
                    {fact.uncertaintyOrContext || fact.epistemicStatus}
                  </span>
                  <a
                    href={fact.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline shrink-0"
                  >
                    <span>{fact.sourceInstitution}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Science Words Mini-Glossary (shown cleanly when matches exist) */}
      {keyWords.length > 0 && (
        <div className="pt-2 border-t border-[var(--hairline)] space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent-gold)]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Key Science Words Made Simple</span>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] leading-snug">
            {keyWords.map((item) => (
              <div key={item.term}>
                <dt className="font-semibold text-[var(--page-ink)] inline">
                  {item.term}:{' '}
                </dt>
                <dd className="inline text-[var(--page-muted)]">
                  {item.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
});

/* 4. How Are They Connected? */
export const ConnectionSection: React.FC<{
  entry: RawDatasetEntry;
  connection: QuranicConnectionBreakdown;
}> = React.memo(({ entry, connection }) => (
  <section aria-label="4. How Are They Connected?" className="space-y-2">
    <SectionHeading
      number="4"
      title="How Are They Connected?"
      subtitle={formatConnectionTypeLabel(entry.connection_analysis.connection_type)}
      icon={<HelpCircle className="w-3.5 h-3.5" />}
    />

    <div className="divide-y divide-[var(--hairline)] text-[12px] leading-relaxed">
      <div className="py-1.5">
        <span className="font-semibold text-[var(--page-ink)]">
          What the verse says ({connection.exactPassages}):{' '}
        </span>
        <span className="text-[var(--page-ink)]/88">
          {connection.wordingAndContext}
        </span>
      </div>
      <div className="py-1.5">
        <span className="font-semibold text-[var(--page-ink)]">
          What early scholars explained:{' '}
        </span>
        <span className="text-[var(--page-muted)]">
          {connection.classicalTafsirSummary}
        </span>
      </div>
      <div className="py-1.5">
        <span className="font-semibold text-[var(--page-ink)]">
          What science discovered:{' '}
        </span>
        <span className="text-[var(--page-ink)]/88">
          {connection.supportedAspect}
        </span>
      </div>
      <div className="py-1.5">
        <span className="font-semibold text-[var(--accent-gold)]">
          How people connect them today:{' '}
        </span>
        <span className="text-[var(--page-ink)]/92">
          {connection.modernInterpretation}
        </span>
      </div>
    </div>
  </section>
));

/* 5. Understand It Through an Illustration */
export const IllustrationSection: React.FC<{
  chapter: ChapterMetadata;
  illustrationRecord?: IllustrationRegistryEntry;
  compactLandscape?: boolean;
}> = React.memo(({ chapter, illustrationRecord, compactLandscape = false }) => {
  if (!illustrationRecord) return null;

  const isConceptual = isConceptualDomainChapter(chapter.id);

  return (
    <section
      aria-label="5. Understand It Through an Illustration"
      className="space-y-1.5"
    >
      <SectionHeading
        number="5"
        title="Understand It Through an Illustration"
        subtitle={`Figure ${illustrationRecord.figureNumber} · ${
          isConceptual ? 'Concept Map' : 'Science Illustration'
        }`}
      />
      <TopicFigureViewer
        record={illustrationRecord}
        compactLandscape={compactLandscape}
      />
    </section>
  );
});

/* 6. What Should We Remember? */
export const RememberSection: React.FC<{
  points: string[];
}> = React.memo(({ points }) => {
  if (!points || points.length === 0) return null;

  return (
    <section
      aria-label="6. What Should We Remember?"
      className="p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/50 rounded-[4px] space-y-1.5"
    >
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
        <ListChecks className="w-3.5 h-3.5" />
        <span>6. What Should We Remember?</span>
      </div>
      <ul className="list-disc pl-4 space-y-1 text-[12px] leading-relaxed text-[var(--page-ink)]/92">
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </section>
  );
});

/* 7. What Should We Be Careful About? */
export const BeCarefulSection: React.FC<{
  entry: RawDatasetEntry;
  enrichment?: TopicEnrichment;
  connection: QuranicConnectionBreakdown;
}> = React.memo(({ entry, enrichment, connection }) => {
  const mainCaution = sanitizePublicLimitationNote(entry.limitations);
  const boundaryNote = sanitizePublicLimitationNote(
    entry.publication_warning
  );
  const gradeNote = entry.editorial_review_warning
    ? sanitizePublicLimitationNote(entry.editorial_review_warning)
    : null;

  return (
    <section
      aria-label="7. What Should We Be Careful About?"
      className="space-y-1.5 pt-1"
    >
      <SectionHeading
        number="7"
        title="What Should We Be Careful About?"
        subtitle="Honest Limits & Reading Care"
        icon={<AlertCircle className="w-3.5 h-3.5" />}
      />

      <div className="space-y-1.5 text-[12px] leading-relaxed text-[var(--page-ink)]/90">
        {mainCaution && <p>{mainCaution}</p>}
        {connection.interpretiveBoundary &&
          connection.interpretiveBoundary !== mainCaution && (
            <p className="text-[var(--page-muted)]">
              <strong className="text-[var(--page-ink)]">
                Where interpretation starts:
              </strong>{' '}
              {connection.interpretiveBoundary}
            </p>
          )}
        {enrichment?.takeaway && (
          <p className="text-[var(--page-ink)]/88">
            <strong className="text-[var(--accent-gold)]">
              Practical note:
            </strong>{' '}
            {enrichment.takeaway}
          </p>
        )}
        {gradeNote && (
          <p className="text-[11.5px] text-[var(--accent-gold)]">{gradeNote}</p>
        )}
        {boundaryNote && boundaryNote !== mainCaution && (
          <p className="text-[11px] text-[var(--page-muted)]">{boundaryNote}</p>
        )}
      </div>
    </section>
  );
});

/* 8. Explore the Evidence (How Scientists Studied This + Grade + Sources + Related Topics) */
export const ExploreEvidenceSection: React.FC<{
  entry: RawDatasetEntry;
  methodology: ScientificMethodologyBreakdown;
  trail: EvidenceTrailStep[];
  summary: CompleteEvidenceSummary;
  relatedTopics?: RelatedTopicLink[];
  onNavigateToTopic: (topicId: string) => void;
}> = React.memo(({
  entry,
  methodology,
  trail,
  summary,
  relatedTopics,
  onNavigateToTopic,
}) => {
  const { editorialStatusLabel, verificationSummary } =
    formatEditorialVerificationSummary(entry);
  const plainGradeDesc = getPlainGradeDescription(entry.evidence_grade);

  return (
    <section
      aria-label="8. Explore the Evidence"
      className="space-y-3 pt-1 border-t border-[var(--hairline)]"
    >
      <SectionHeading
        number="8"
        title="Explore the Evidence"
        subtitle={`Evidence Grade ${entry.evidence_grade}`}
        icon={<FlaskConical className="w-3.5 h-3.5" />}
      />

      {/* Simple 3-part How Scientists Studied This */}
      <div className="space-y-1 text-[11.5px] leading-relaxed text-[var(--page-muted)]">
        <p>
          <strong className="text-[var(--page-ink)]">Question asked:</strong>{' '}
          {methodology.researchQuestion}
        </p>
        <p>
          <strong className="text-[var(--page-ink)]">Tools &amp; method:</strong>{' '}
          {methodology.methodology}{' '}
          <span className="text-[var(--page-ink)]/85">
            Common tools: {methodology.instrumentsAndTech}
          </span>
        </p>
        <p>
          <strong className="text-[var(--page-ink)]">
            What scientists agree on:
          </strong>{' '}
          {methodology.consensusTier}
        </p>
      </div>

      {/* Evidence Grade Meaning */}
      <div className="p-2.5 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/45 rounded-[4px] space-y-1 text-[11.5px]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--page-ink)] tabular-nums">
            <Scale className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Evidence Grade {entry.evidence_grade}</span>
          </span>
          <span className="text-[11px] text-[var(--accent-gold)]">
            {editorialStatusLabel}
          </span>
        </div>
        <p className="text-[var(--page-muted)] leading-snug">{plainGradeDesc}</p>
        <p className="text-[10.5px] text-[var(--page-muted)] pt-1 border-t border-[var(--hairline)]">
          {verificationSummary}
        </p>
      </div>

      {/* Expandable 5-Step Trail & Quick Checklist */}
      <details className="border border-[var(--hairline)] rounded-[4px] px-2.5 py-1.5 text-[11px]">
        <summary className="cursor-pointer select-none font-semibold text-[var(--accent-gold)] flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Step-by-Step Evidence Path (5 Steps)</span>
          </span>
          <span className="text-[10px] text-[var(--page-muted)] font-normal">
            Open for study notes
          </span>
        </summary>
        <div className="mt-2 pt-1.5 border-t border-[var(--hairline)] space-y-2 text-[11px] leading-snug text-[var(--page-muted)]">
          <ol className="space-y-1">
            {trail.map((step) => (
              <li key={step.stepNumber}>
                <span className="font-semibold text-[var(--page-ink)] tabular-nums">
                  {step.stepNumber}. {step.stage}:
                </span>{' '}
                {step.detail}
              </li>
            ))}
          </ol>
          <p className="pt-1 border-t border-[var(--hairline)] text-[var(--page-ink)]/88">
            <strong className="text-[var(--accent-gold)]">Quick recap:</strong>{' '}
            {summary.currentAssessment}
          </p>
        </div>
      </details>

      {/* Trusted Scientific & Educational References */}
      {entry.evidence_sources && entry.evidence_sources.length > 0 && (
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--page-ink)]">
            <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Where You Can Read More (Trusted Sources)</span>
          </div>
          <ol className="space-y-1.5 text-[11px] text-[var(--page-muted)]">
            {entry.evidence_sources.map((src, idx) => {
              const { classificationLabel, detailNote } = formatSourceRoleNote(src);
              const paddedIndex = String(idx + 1).padStart(2, '0');
              return (
                <li
                  key={`${src.source_id}-${idx}`}
                  className="flex gap-2 leading-snug"
                >
                  <span className="tabular-nums text-[var(--accent-gold)] font-medium shrink-0">
                    {paddedIndex}.
                  </span>
                  <div className="min-w-0">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--page-ink)] hover:text-[var(--accent-gold)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{src.title}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                    <span className="block opacity-90">
                      {src.author_or_institution}
                      {src.year ? ` (${src.year})` : ''} &mdash;{' '}
                      {src.what_it_supports}
                    </span>
                    {(classificationLabel || detailNote) && (
                      <span className="block text-[10.5px] text-[var(--page-muted)] mt-0.5">
                        {classificationLabel && (
                          <span className="font-medium text-[var(--page-ink)]">
                            {classificationLabel}
                          </span>
                        )}
                        {detailNote
                          ? `${classificationLabel ? ' · ' : ''}${detailNote}`
                          : ''}
                      </span>
                    )}
                    {src.source_warning && (
                      <span className="block text-[10.5px] text-[var(--accent-gold)]/95 mt-0.5">
                        Note: {src.source_warning}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* Related Topics */}
      <RelatedTopicsSection
        relatedTopics={relatedTopics}
        onNavigateToTopic={onNavigateToTopic}
      />
    </section>
  );
});

export const RelatedTopicsSection: React.FC<{
  relatedTopics?: RelatedTopicLink[];
  onNavigateToTopic: (topicId: string) => void;
}> = React.memo(({ relatedTopics, onNavigateToTopic }) => {
  if (!relatedTopics || relatedTopics.length === 0) return null;

  return (
    <div className="pt-1.5 border-t border-[var(--hairline)] space-y-1">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent-gold)]">
        <Link2 className="w-3 h-3" />
        <span>Next Related Topics to Explore</span>
      </div>
      <div className="grid grid-cols-1 gap-1">
        {relatedTopics.map((rel) => (
          <button
            key={rel.id}
            type="button"
            onClick={() => onNavigateToTopic(rel.id)}
            className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 text-left text-[11px] border border-[var(--hairline)] hover:border-[var(--accent-gold)] bg-[var(--page-bg-secondary)]/45 hover:bg-[var(--page-bg-secondary)] active:scale-[0.99] rounded-[4px] transition-all duration-150 cursor-pointer"
          >
            <span className="truncate">
              <span className="text-[var(--accent-gold)] font-medium tabular-nums mr-1.5">
                {rel.id}
              </span>
              <span className="text-[var(--page-ink)]">{rel.title}</span>
            </span>
            <span className="text-[11px] text-[var(--page-muted)] tabular-nums shrink-0">
              Grade {rel.evidenceGrade}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});
