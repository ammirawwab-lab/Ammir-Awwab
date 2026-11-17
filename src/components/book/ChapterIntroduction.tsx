import React from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Compass,
  ExternalLink,
  FlaskConical,
  Scale,
} from 'lucide-react';
import { CHAPTER_INTRODUCTIONS } from '../../data/chapterIntroductions';
import { getVerifiedPassagesForRefs } from '../../data/quranVerification';
import { ChapterMetadata, RawChapterDataset } from '../../types/encyclopedia';
import { ChapterMotifIcon } from '../ornaments/IslamicOrnaments';

interface ChapterIntroductionProps {
  mode: 'overview' | 'methods';
  chapter: ChapterMetadata;
  dataset?: RawChapterDataset;
  onNavigateToSpread: (spreadId: string) => void;
  onNavigateToTopic: (topicId: string) => void;
}

export const ChapterIntroduction: React.FC<ChapterIntroductionProps> = ({
  mode,
  chapter,
  dataset,
  onNavigateToSpread,
  onNavigateToTopic,
}) => {
  const intro = CHAPTER_INTRODUCTIONS[chapter.id];
  if (!intro) return null;

  const firstTopicId = dataset?.entries[0]?.id;

  if (mode === 'overview') {
    const keyPassages = getVerifiedPassagesForRefs(
      intro.quranicThemesAndReferences.keyReferences.slice(0, 2)
    );

    return (
      <div className="flex flex-col justify-between h-full gap-3">
        <div className="space-y-3">
          <header className="pb-2.5 border-b border-[var(--hairline)]">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-medium">
                Chapter {chapter.paddedNumber} Introduction &middot; Part I
              </span>
              <span className="text-[var(--accent-gold)]">
                <ChapterMotifIcon motif={chapter.theme.motifType} />
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] leading-tight text-balance">
              {chapter.title}
            </h2>
            <p className="text-[12px] text-[var(--page-muted)] mt-1">
              {intro.subtitle}
            </p>
          </header>

          <p className="text-xs sm:text-[13px] leading-[1.68] text-[var(--page-ink)]/92">
            {intro.introduction}
          </p>

          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            <section className="py-2 space-y-1">
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
                What This Chapter Explores
              </h3>
              <p className="text-[12px] leading-relaxed text-[var(--page-muted)]">
                {intro.whatItInvestigates}
              </p>
            </section>

            <section className="py-2 space-y-1">
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
                Why This Science Matters
              </h3>
              <p className="text-[12px] leading-relaxed text-[var(--page-muted)]">
                {intro.whyItMattersScientifically}
              </p>
            </section>
          </div>

          <section className="p-2.5 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[4px] space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
                Qur&rsquo;an Verses in This Chapter
              </span>
              <span className="text-[var(--page-muted)] tabular-nums">
                {intro.quranicThemesAndReferences.keyReferences.join(' · ')}
              </span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-[var(--page-ink)]/90">
              {intro.quranicThemesAndReferences.summary}
            </p>
            {keyPassages.length > 0 && (
              <div className="pt-1.5 border-t border-[var(--hairline)] space-y-1">
                <div className="flex items-center justify-between text-[10.5px] text-[var(--accent-gold)]">
                  <span>
                    Surah {keyPassages[0].surahNameSimple} ({keyPassages[0].reference})
                  </span>
                  <a
                    href={keyPassages[0].sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Quran.com</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-base leading-[1.8] text-right text-[var(--page-ink)]"
                >
                  {keyPassages[0].arabicText}
                </p>
                <p className="text-[11px] italic text-[var(--page-muted)] leading-snug">
                  &ldquo;{keyPassages[0].translationText}&rdquo; &mdash;{' '}
                  {keyPassages[0].translator}
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between text-[11px]">
          <button
            type="button"
            onClick={() => onNavigateToSpread(`${chapter.id}-opening`)}
            className="inline-flex items-center gap-1 text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Chapter {chapter.paddedNumber} Topic List</span>
          </button>
          <span className="text-[var(--page-muted)]">
            Continued on facing page &rarr;
          </span>
        </div>
      </div>
    );
  }

  /* mode === 'methods' (Right folio immediately preceding Topic 01) */
  return (
    <div className="flex flex-col justify-between h-full gap-3">
      <div className="space-y-3">
        <header className="pb-2.5 border-b border-[var(--hairline)]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-medium mb-1">
            Chapter {chapter.paddedNumber} Introduction &middot; Part II
          </p>
          <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[var(--page-ink)] leading-snug">
            How Scientists Study This &amp; Things to Keep in Mind
          </h2>
        </header>

        <section className="space-y-1.5">
          <h3 className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
            <Compass className="w-3.5 h-3.5" />
            <span>Branches of Science Used Here</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11.5px] text-[var(--page-ink)]/90">
            {intro.scientificDisciplines.map((disc) => (
              <li
                key={disc}
                className="px-2.5 py-1.5 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/40 rounded-[4px]"
              >
                {disc}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-1">
          <h3 className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>How Scientists Check &amp; Measure This</span>
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-[var(--page-muted)] leading-snug">
            {intro.researchMethods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </section>

        <section className="py-2 border-t border-[var(--hairline)] space-y-1">
          <h3 className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
            <Scale className="w-3.5 h-3.5" />
            <span>How Topics Are Checked in Chapter {chapter.paddedNumber}</span>
          </h3>
          <p className="text-[11.5px] leading-relaxed text-[var(--page-ink)]/90">
            {intro.evidenceEvaluationApproach}
          </p>
        </section>

        <section className="p-2.5 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[4px] space-y-1">
          <h3 className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--accent-gold)]">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Important Cautions Before Reading</span>
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-[11px] text-[var(--page-muted)] leading-snug">
            {intro.limitationsAndCautions.map((caution) => (
              <li key={caution}>{caution}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => onNavigateToSpread(`${chapter.id}-opening`)}
          className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
        >
          50-Topic List
        </button>
        {firstTopicId && (
          <button
            type="button"
            onClick={() => onNavigateToTopic(firstTopicId)}
            className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-gold)] hover:underline cursor-pointer"
          >
            <span>Start Reading at {firstTopicId}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
