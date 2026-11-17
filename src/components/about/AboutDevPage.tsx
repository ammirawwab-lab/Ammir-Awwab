import React, { useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  Layers,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { CHAPTERS } from '../../data/chapters';
import { getIllustrationRegistryStats } from '../../data/illustrationRegistry';
import {
  EvidenceGradeLetter,
  IllustrationRegistryEntry,
  RawChapterDataset,
} from '../../types/encyclopedia';
import {
  ChapterMotifIcon,
  CornerFiligree,
  EditorialDivider,
  GeometricRosette,
} from '../ornaments/IslamicOrnaments';

interface AboutDevPageProps {
  datasetsByChapter: Record<string, RawChapterDataset | undefined>;
  illustrationRecords: IllustrationRegistryEntry[];
  onReturnToBook: () => void;
  onOpenChapter: (chapterId: string) => void;
  onOpenTopic: (topicId: string) => void;
}

const RESEARCH_RECORD_FIELDS = [
  'Topic title',
  "Qur'an reference",
  'Science topic',
  'Main science discovery',
  'How they relate (clearly explained)',
  'Limits & things to be careful about',
  'Evidence grade (A–D)',
  'Trusted science links',
  'Arabic verse & English meaning',
  'Early scholar notes (Tafsir)',
  'Fact-checking notes',
] as const;

const BUILD_STAGES = [
  {
    step: '01',
    title: 'Planning the encyclopedia',
    body: 'The book was planned from day one around 10 big areas of nature and human life—from outer space and rocks to animals, health, and fairness—with 50 topics in every chapter.',
  },
  {
    step: '02',
    title: 'Building a clear page layout',
    body: 'Instead of long, confusing essays, every topic follows the same clear template so readers can always tell scientific facts, Qur’anic verses, early scholar notes, and cautions apart.',
  },
  {
    step: '03',
    title: 'Organising all 500 topics',
    body: 'Every one of the 500 topics has its own numbered page and custom illustration rather than just a short list of big slogans.',
  },
  {
    step: '04',
    title: 'Gathering trusted facts & verses',
    body: 'Science links, verified Arabic Qur’an verses, Saheeh International translations, and Tafsir Ibn Kathir notes were carefully matched to each numbered topic.',
  },
  {
    step: '05',
    title: 'AI-assisted screening',
    body: 'Draft records were screened with help from AI systems—including DeepSeek, Gemini, and Grok—to spot formatting issues and cross-check drafts. These tools helped check drafts only and never replace real scientists or Islamic scholars.',
  },
  {
    step: '06',
    title: 'Human scholarly review',
    body: 'The material was also reviewed in person by two trusted human reviewers: the developer’s father and the imam of his mosque. That forms part of our family and community review without claiming official university certification.',
  },
  {
    step: '07',
    title: 'Building the digital book',
    body: 'Google AI Studio Build was used to turn the 500 topics into a realistic digital hardcover book with smooth page-turning, bookmarks, reading progress, and zoomable diagrams.',
  },
  {
    step: '08',
    title: 'Continuous improvement',
    body: 'Science of Creation keeps getting clearer—simplifying language for young readers and curious students while carefully guarding factual accuracy.',
  },
] as const;

const EVIDENCE_DISTINCTIONS = [
  {
    num: '01',
    label: 'What science measured',
    detail:
      'Real observations and experiments from trusted astronomy, Earth, health, and social science institutions.',
  },
  {
    num: '02',
    label: "Qur'anic wording in context",
    detail:
      'The complete Arabic passage read together with the verses right before and after it.',
  },
  {
    num: '03',
    label: 'What early scholars said (Tafsir)',
    detail:
      'Classic explanations by scholars like Ibn Kathir, reading the Arabic within its original history.',
  },
  {
    num: '04',
    label: 'Modern thoughtful connections',
    detail:
      'How readers today reflect on natural wonders alongside Qur’anic verses—always presented calmly and openly.',
  },
  {
    num: '05',
    label: 'Honest limits & cautions',
    detail:
      'Clear reminders about what a verse does not say, or what science is still working out.',
  },
] as const;

const EVIDENCE_GRADE_DEFINITIONS: {
  grade: EvidenceGradeLetter;
  title: string;
  description: string;
}[] = [
  {
    grade: 'A',
    title: 'Grade A — Clear, Direct Link',
    description:
      'Strong scientific facts alongside a very direct textual link, still read carefully in context.',
  },
  {
    grade: 'B',
    title: 'Grade B — Good General Link',
    description:
      'Solid science paired with a helpful theme in the verse where thoughtful context helps.',
  },
  {
    grade: 'C',
    title: 'Grade C — Open Discussion',
    description:
      'Solid science paired with a broader comparison or verse open to more than one careful meaning.',
  },
  {
    grade: 'D',
    title: 'Grade D — Faith & Reflection Domain',
    description:
      'Spiritual truths, ethics, or afterlife teachings that belong to faith rather than science lab experiments.',
  },
];

const ENCYCLOPEDIA_FEATURES = [
  '10 organised chapters across nature & life',
  '500 numbered study topics',
  'Clear 8-section layout on every topic page',
  'Verified Arabic verses & translations',
  'Classic scholar notes (Tafsir Ibn Kathir)',
  'Simple science words mini-glossary',
  'All 500 custom topic illustrations',
  'Real science agency links (NASA, NOAA, WHO & more)',
  'Calm "How Are They Connected?" explanations',
  'Clear A–D evidence grades',
  'Honest limits & health/safety cautions',
  'Interactive page-turning digital book',
  'Easy chapter & topic search lists',
  'Matching topic & figure numbers',
  'Saved reading progress & silk ribbon bookmarks',
  'Comfortable dark & light reading modes',
  'Desktop spread & phone landscape reading mode',
] as const;

const ILLUSTRATION_CATEGORIES = [
  'Space & stars',
  'Earth & mountains',
  'Oceans & water',
  'Weather & sky',
  'Plants & farming',
  'Animals & insects',
  'Human body & growth',
  'Health, food & fasting',
  'Mind & feelings',
  'Community & ethics',
] as const;

const DEVELOPER_PRINCIPLES = [
  'I wanted to build something organised and trustworthy instead of random internet claims.',
  'I wanted every topic to have its own clear page and honest source trail.',
  'I wanted science explained in plain English so anyone around age 12 or older can enjoy it.',
  "I wanted Qur'anic verses treated with deep respect and never twisted out of context.",
  'I wanted early Islamic scholarship and modern science kept clearly separate.',
  'I wanted limits and uncertainties shown openly rather than hidden.',
  'I wanted ordinary students, families, and teachers to feel welcomed on every page.',
  'I wanted reading the website to feel like opening a treasured collector’s book.',
] as const;

const SAMPLE_ILLUSTRATION_IDS = ['COS-001', 'GEO-001', 'WAT-005'] as const;

export const AboutDevPage: React.FC<AboutDevPageProps> = ({
  datasetsByChapter,
  illustrationRecords,
  onReturnToBook,
  onOpenChapter,
  onOpenTopic,
}) => {
  const { totalTopics, gradeCounts } = useMemo(() => {
    const counts: Record<EvidenceGradeLetter, number> = { A: 0, B: 0, C: 0, D: 0 };
    let topicCount = 0;

    for (const chapter of CHAPTERS) {
      const ds = datasetsByChapter[chapter.id];
      if (!ds) continue;
      for (const entry of ds.entries) {
        topicCount += 1;
        const g = entry.evidence_grade;
        if (g === 'A' || g === 'B' || g === 'C' || g === 'D') {
          counts[g] += 1;
        }
      }
    }

    return {
      totalTopics: topicCount > 0 ? topicCount : 500,
      gradeCounts: counts,
    };
  }, [datasetsByChapter]);

  const illustrationStats = useMemo(
    () => getIllustrationRegistryStats(illustrationRecords),
    [illustrationRecords]
  );

  const samplePlates = useMemo(() => {
    return SAMPLE_ILLUSTRATION_IDS.map((id) =>
      illustrationRecords.find((r) => r.topicId === id && r.assetExists)
    ).filter((r): r is IllustrationRegistryEntry => Boolean(r));
  }, [illustrationRecords]);

  return (
    <div
      id="about-dev-view"
      className="w-full max-w-[1180px] mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16 text-[var(--page-ink)] animate-fluent-view"
    >
      {/* Top Return Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--hairline)]">
        <button
          type="button"
          onClick={onReturnToBook}
          className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] border border-[var(--gold-hairline)] bg-[var(--page-bg)] text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.985] transition-all duration-150 rounded-[4px] shadow-[var(--shadow-elev-1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
        >
          <ArrowLeft className="w-4 h-4 text-[var(--accent-gold)]" />
          <span>Return to Encyclopedia</span>
        </button>

        <div className="text-xs text-[var(--page-muted)] tracking-[0.1em] uppercase tabular-nums">
          About the Creator &middot; 10 Chapters &middot; {totalTopics} Topics
        </div>
      </div>

      {/* PART 2 — HERO DEVELOPER PROFILE */}
      <section
        aria-labelledby="about-dev-hero-heading"
        className="relative border border-[var(--gold-hairline)] bg-[var(--page-bg)] paper-grain rounded-[4px] shadow-[var(--shadow-elev-1)] px-5 py-8 sm:px-10 sm:py-12 overflow-hidden"
      >
        <CornerFiligree
          position="tl"
          className="w-8 h-8 text-[var(--accent-gold)]/70 absolute top-2.5 left-2.5 pointer-events-none"
        />
        <CornerFiligree
          position="tr"
          className="w-8 h-8 text-[var(--accent-gold)]/70 absolute top-2.5 right-2.5 pointer-events-none"
        />
        <CornerFiligree
          position="bl"
          className="w-8 h-8 text-[var(--accent-gold)]/70 absolute bottom-2.5 left-2.5 pointer-events-none"
        />
        <CornerFiligree
          position="br"
          className="w-8 h-8 text-[var(--accent-gold)]/70 absolute bottom-2.5 right-2.5 pointer-events-none"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
              <span>About the Developer</span>
              <span aria-hidden="true">&middot;</span>
              <span>Science of Creation</span>
            </div>

            <div className="space-y-2">
              <h1
                id="about-dev-hero-heading"
                className="font-editorial text-4xl sm:text-5xl font-semibold tracking-[0.01em] text-[var(--page-ink)] leading-[1.12] [text-wrap:balance]"
              >
                Ammir Awwab
              </h1>
              <p className="font-editorial text-xl sm:text-2xl italic text-[var(--accent-gold)]">
                Creator and developer of Science of Creation.
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--page-ink)]/90 max-w-2xl">
              Science of Creation was built as an independent educational book
              for curious readers, students, and families—bringing together
              Qur&rsquo;anic verses, everyday science, and honest explanations
              inside a calm interactive digital book.
            </p>

            <div className="pt-2 border-t border-[var(--hairline)] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--page-muted)] tabular-nums">
              <span>Independent Educational Project</span>
              <span aria-hidden="true">&middot;</span>
              <span>10 Subject Chapters</span>
              <span aria-hidden="true">&middot;</span>
              <span>{totalTopics} Illustrated Topics</span>
              <span aria-hidden="true">&middot;</span>
              <span>
                {illustrationStats.createdCount} / 500 Custom Illustrations Live
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center border-t lg:border-t-0 lg:border-l border-[var(--hairline)] pt-6 lg:pt-0 lg:pl-8 space-y-3">
            <GeometricRosette className="w-24 h-24 sm:w-28 sm:h-28 text-[var(--accent-gold)]" />
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-xl text-[var(--accent-gold)] leading-loose"
            >
              سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ
            </p>
            <p className="text-xs text-[var(--page-muted)] leading-relaxed max-w-[26ch]">
              &ldquo;We will show them Our signs in the horizons and within
              themselves.&rdquo; (Qur&rsquo;an 41:53)
            </p>
          </div>
        </div>
      </section>

      {/* PART 3 — THE STORY BEHIND SCIENCE OF CREATION */}
      <section aria-labelledby="story-heading" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
            Project Purpose &amp; Vision
          </p>
          <h2
            id="story-heading"
            className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)] [text-wrap:balance]"
          >
            The Story Behind Science of Creation
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-[var(--page-ink)]/90 max-w-prose">
            <p>
              Science of Creation was created to give readers an easy-to-follow
              place where they can learn how the natural world works, read clear
              science facts, and explore Qur&rsquo;anic verses thoughtfully.
            </p>
            <p>
              Online posts about faith and science often exaggerate wild claims
              or dismiss reflection altogether. This book takes a balanced
              middle path: encouraging wonder, curiosity, and honesty while never
              forcing science jargon into verses or hiding real uncertainties.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            <div className="border border-[var(--hairline)] bg-[var(--page-bg)] p-5 space-y-1.5 rounded-[4px]">
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold tabular-nums">
                Area 01 &middot; Exploring Nature
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[var(--page-ink)]">
                How the natural world works
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--page-muted)]">
                Clear explanations of space, Earth, water, weather, plants,
                animals, health, mind, and fairness backed by trusted institutions.
              </p>
            </div>

            <div className="border border-[var(--hairline)] bg-[var(--page-bg)] p-5 space-y-1.5 rounded-[4px]">
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold tabular-nums">
                Area 02 &middot; Reading with Care
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[var(--page-ink)]">
                Qur&rsquo;anic reflection and early scholars
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--page-muted)]">
                Reading verses alongside early Islamic commentaries (tafsir),
                always keeping classic wording and modern science clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EditorialDivider />

      {/* PART 4 — HOW THE DEVELOPER BUILT THE ENCYCLOPEDIA */}
      <section aria-labelledby="how-built-heading" className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
            Development Process &amp; Workflow
          </p>
          <h2
            id="how-built-heading"
            className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)] [text-wrap:balance]"
          >
            How I Built Science of Creation
          </h2>
          <p className="text-sm sm:text-base text-[var(--page-muted)] max-w-3xl leading-relaxed">
            Creating this encyclopedia took step-by-step organisation: structured
            records, AI draft screening, family and community review, interactive
            book design, and careful simplification for readers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BUILD_STAGES.map((stage) => (
            <article
              key={stage.step}
              className="border border-[var(--hairline)] bg-[var(--page-bg)] rounded-[4px] p-5 sm:p-6 space-y-3 transition-colors duration-200 hover:border-[var(--gold-hairline)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--hairline)] pb-2.5">
                <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[var(--page-ink)]">
                  {stage.step}. {stage.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent-gold)] tabular-nums shrink-0">
                  Step {stage.step}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--page-ink)]/85">
                {stage.body}
              </p>
              {stage.step === '02' && (
                <dl className="pt-2 border-t border-[var(--hairline)] grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[var(--page-muted)]">
                  {RESEARCH_RECORD_FIELDS.map((field, idx) => (
                    <div key={field} className="flex items-baseline gap-2">
                      <dt className="text-[var(--accent-gold)] font-semibold tabular-nums">
                        {String(idx + 1).padStart(2, '0')}.
                      </dt>
                      <dd>{field}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          ))}
        </div>
      </section>

      <EditorialDivider />

      {/* PART 5 — THE 10 CHAPTERS INSIDE THE BOOK */}
      <section aria-labelledby="chapters-heading" className="space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--hairline)] pb-4">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
              Complete Encyclopedia Map
            </p>
            <h2
              id="chapters-heading"
              className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)]"
            >
              The 10 Chapters Inside the Book
            </h2>
          </div>

          <div className="text-sm font-medium text-[var(--accent-gold)] tracking-[0.1em] uppercase tabular-nums">
            10 Chapters &middot; {totalTopics} Topics
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {CHAPTERS.map((chapter) => {
            const loadedEntriesCount =
              datasetsByChapter[chapter.id]?.entries.length ??
              chapter.expectedTopicCount;

            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => onOpenChapter(chapter.id)}
                className="group text-left border border-[var(--hairline)] hover:border-[var(--accent-gold)] bg-[var(--page-bg)] rounded-[4px] hover:-translate-y-[1px] hover:shadow-[var(--shadow-elev-1)] active:scale-[0.995] transition-all duration-200 ease-[var(--ease-fluent)] overflow-hidden flex flex-col sm:flex-row cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
              >
                <div className="sm:w-44 md:w-48 shrink-0 aspect-[16/10] sm:aspect-auto relative overflow-hidden bg-[var(--page-bg-secondary)] border-b sm:border-b-0 sm:border-r border-[var(--hairline)]">
                  <img
                    src={chapter.artworkSrc}
                    alt={chapter.artworkAlt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none"
                  />
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#F1EBE0] tabular-nums">
                    <ChapterMotifIcon
                      motif={chapter.theme.motifType}
                      className="w-3.5 h-3.5 text-[#D4B46A]"
                    />
                    <span>{chapter.plateLabel}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-xs text-[var(--page-muted)] tabular-nums">
                      <span className="uppercase tracking-[0.14em] text-[var(--accent-gold)] font-semibold">
                        Chapter {chapter.paddedNumber}
                      </span>
                      <span>{loadedEntriesCount} Topics</span>
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[var(--page-ink)] group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                      {chapter.paddedNumber} &mdash; {chapter.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--page-muted)]">
                      {chapter.descriptionPlaceholder}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between text-xs text-[var(--accent-gold)] font-medium">
                    <span>Open Chapter {chapter.paddedNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <EditorialDivider />

      {/* PART 6 — HOW THE EVIDENCE IS APPROACHED */}
      <section aria-labelledby="evidence-heading" className="space-y-8">
        <div className="space-y-2 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
            Clear Thinking &amp; Grading
          </p>
          <h2
            id="evidence-heading"
            className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)]"
          >
            How We Examine Each Topic
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--page-ink)]/90">
            This book keeps science tests and Qur&rsquo;an reading clearly
            separate. Noticing that science matches a theme in a verse does not
            automatically prove the verse was written as a textbook prediction.
          </p>
        </div>

        {/* 5 Analytical Distinctions */}
        <div className="border border-[var(--hairline)] bg-[var(--page-bg)] divide-y divide-[var(--hairline)] rounded-[4px]">
          {EVIDENCE_DISTINCTIONS.map((item) => (
            <div
              key={item.num}
              className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
            >
              <div className="sm:w-72 shrink-0 flex items-baseline gap-3">
                <span className="text-xs font-semibold text-[var(--accent-gold)] tabular-nums">
                  {item.num}.
                </span>
                <span className="font-editorial text-lg font-semibold text-[var(--page-ink)]">
                  {item.label}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--page-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Evidence Grades A–D */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-editorial text-2xl font-semibold text-[var(--page-ink)]">
              Evidence Grades (A&ndash;D) Explained Simply
            </h3>
            <p className="text-xs text-[var(--page-muted)]">
              Grades tell you how direct the science link is—never how special
              or sacred a verse is.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EVIDENCE_GRADE_DEFINITIONS.map((item) => {
              const count = gradeCounts[item.grade];
              return (
                <div
                  key={item.grade}
                  className="border border-[var(--hairline)] bg-[var(--page-bg)] p-5 space-y-2 rounded-[4px]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-editorial text-xl font-semibold text-[var(--accent-gold)]">
                      {item.title}
                    </span>
                    <span className="text-xs text-[var(--page-muted)] tabular-nums shrink-0">
                      {count > 0 ? `${count} Topics` : 'Defined Grade'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--page-ink)]/85">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Transparency Box */}
        <div className="border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/70 p-5 sm:p-6 space-y-2 rounded-[4px]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
            <Scale className="w-4 h-4" />
            <span>Being Honest About What Is Verified</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-[var(--page-ink)]/90">
            Science of Creation never claims all 500 topics are proven
            scientific miracles. AI checking tools helped check formatting and
            wording only—they are not university science peer review. Where
            topics need careful reading or have open questions, those notes sit
            right on the page.
          </p>
        </div>
      </section>

      <EditorialDivider />

      {/* PART 7 — WHAT MAKES THIS ENCYCLOPEDIA DIFFERENT */}
      <section aria-labelledby="different-heading" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
            Features Inside the Book
          </p>
          <h2
            id="different-heading"
            className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)]"
          >
            What Makes This Encyclopedia Different?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {ENCYCLOPEDIA_FEATURES.map((feature, index) => (
            <div
              key={feature}
              className="border border-[var(--hairline)] bg-[var(--page-bg)] px-4 py-3.5 flex items-baseline gap-3 rounded-[4px]"
            >
              <span className="text-xs font-semibold text-[var(--accent-gold)] tabular-nums shrink-0">
                {String(index + 1).padStart(2, '0')}.
              </span>
              <span className="text-xs sm:text-sm text-[var(--page-ink)]/90 leading-snug">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </section>

      <EditorialDivider />

      {/* PART 8 — THE 500 ILLUSTRATIONS */}
      <section aria-labelledby="illustrations-heading" className="space-y-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
              Visual Learning System
            </p>
            <h2
              id="illustrations-heading"
              className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)]"
            >
              The 500 Custom Illustrations
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--page-ink)]/90 max-w-prose">
              Every single one of the 500 topics includes its own visual picture
              so tricky ideas—from deep underwater waves and mountain roots to
              growing cells and storm hail—are much easier to picture in your
              head.
            </p>
            <p className="text-sm leading-relaxed text-[var(--page-muted)] max-w-prose">
              <strong>Current Illustration Status:</strong> All{' '}
              <span className="text-[var(--page-ink)] font-semibold tabular-nums">
                {illustrationStats.createdCount} of 500
              </span>{' '}
              topic illustrations across Chapters 01&ndash;10 are completed and
              live inside the book—complete with step-by-step boxes and zoomable
              viewing.
            </p>
          </div>

          <div className="lg:col-span-5 border border-[var(--hairline)] bg-[var(--page-bg)] p-5 space-y-4 rounded-[4px]">
            <div className="flex items-center justify-between gap-2 border-b border-[var(--hairline)] pb-2.5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[var(--accent-gold)]">
                <Layers className="w-4 h-4" />
                <span>Ten Subject Areas</span>
              </div>
              <span className="text-xs text-[var(--page-muted)] tabular-nums">
                {illustrationStats.createdCount} / 500 Live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm text-[var(--page-ink)]/90">
              {ILLUSTRATION_CATEGORIES.map((cat, idx) => (
                <div key={cat} className="flex items-baseline gap-2">
                  <span className="text-[var(--accent-gold)] font-semibold tabular-nums text-xs">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completed Sample Textbook Plates */}
        {samplePlates.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--page-muted)]">
              Sample Topic Pictures &middot; Click any card to jump to that topic
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {samplePlates.map((plate) => (
                <button
                  key={plate.illustrationId}
                  type="button"
                  onClick={() => onOpenTopic(plate.topicId)}
                  className="group text-left border border-[var(--hairline)] hover:border-[var(--accent-gold)] bg-[var(--page-bg)] rounded-[4px] hover:-translate-y-[1px] hover:shadow-[var(--shadow-elev-1)] active:scale-[0.995] transition-all duration-200 ease-[var(--ease-fluent)] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
                >
                  <div className="aspect-[4/3] bg-[#F8F4EA] border-b border-[var(--hairline)] overflow-hidden">
                    <img
                      src={plate.assetPath}
                      alt={plate.altText}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-3.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[var(--accent-gold)] font-semibold tabular-nums">
                      <span>Figure {plate.figureNumber}</span>
                      <span>{plate.topicId}</span>
                    </div>
                    <div className="font-editorial text-base font-semibold text-[var(--page-ink)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {plate.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <EditorialDivider />

      {/* PART 9 — THE DEVELOPER'S WORKING PHILOSOPHY */}
      <section aria-labelledby="philosophy-heading" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
            A Note from Ammir Awwab
          </p>
          <h2
            id="philosophy-heading"
            className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)]"
          >
            My Approach to This Project
          </h2>
        </div>

        <div className="border border-[var(--gold-hairline)] bg-[var(--page-bg)] p-6 sm:p-8 space-y-6 rounded-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {DEVELOPER_PRINCIPLES.map((statement, idx) => (
              <div
                key={statement}
                className="flex items-baseline gap-3.5 pb-3 border-b border-[var(--hairline)]"
              >
                <span className="font-editorial text-lg font-semibold text-[var(--accent-gold)] tabular-nums shrink-0">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--page-ink)]/90">
                  {statement}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--page-muted)]">
            <span className="font-editorial italic text-base text-[var(--page-ink)]">
              &mdash; Ammir Awwab, Creator &amp; Developer of Science of
              Creation
            </span>
            <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.14em] text-[var(--accent-gold)]">
              <Compass className="w-3.5 h-3.5" />
              <span>Honesty &amp; Clarity First</span>
            </span>
          </div>
        </div>
      </section>

      <EditorialDivider />

      {/* PART 10 — PROJECT TRANSPARENCY */}
      <section aria-labelledby="transparency-heading" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
            Scope &amp; Boundaries
          </p>
          <h2
            id="transparency-heading"
            className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--page-ink)]"
          >
            Checking Facts &amp; Being Responsible
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 border border-[var(--hairline)] bg-[var(--page-bg)] p-6 space-y-3 rounded-[4px]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>How the Project Was Checked</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-[var(--page-ink)]/90">
              <li>
                <strong>Complete 500-topic collection:</strong> Every topic is
                organised cleanly with verse links, science sources, and
                practical cautions.
              </li>
              <li>
                <strong>Multi-system AI checking:</strong> Tools such as
                DeepSeek, Gemini, and Grok helped check structure and drafts,
                never replacing human scholars or science peer review.
              </li>
              <li>
                <strong>Human family &amp; community review:</strong> Reviewed by
                the developer&rsquo;s father and mosque imam for thoughtful
                care and accuracy.
              </li>
              <li>
                <strong>Clear boundaries:</strong> Scientific facts and religious
                commentaries are presented side-by-side in separate sections so
                readers always see both clearly.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 border border-[var(--hairline)] bg-[var(--page-bg)] p-6 space-y-3 rounded-[4px]">
            <h3 className="font-editorial text-xl font-semibold text-[var(--page-ink)]">
              Important Note &mdash; What This Site Does Not Replace
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--page-muted)]">
              Science of Creation is a friendly educational guide and never
              replaces:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--page-ink)]/90 border-t border-[var(--hairline)] pt-3">
              <li>01. Qualified Islamic teachers and scholars.</li>
              <li>02. School textbooks or university scientific studies.</li>
              <li>03. Advice from a doctor, nurse, or mental-health counsellor.</li>
              <li>04. Lawyers, financial advisers, or safety adults.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PART 11 — PROJECT ACKNOWLEDGEMENT */}
      <section
        aria-labelledby="acknowledgement-heading"
        className="border border-[var(--hairline)] bg-[var(--page-bg)] p-6 sm:p-8 space-y-5 rounded-[4px]"
      >
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] font-medium">
            Acknowledgements
          </p>
          <h2
            id="acknowledgement-heading"
            className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--page-ink)]"
          >
            With Gratitude &amp; Appreciation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm leading-relaxed text-[var(--page-muted)]">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-[var(--page-ink)]">
              Human Reviewers
            </h3>
            <p>
              Deep gratitude to the developer&rsquo;s father and the imam of his
              mosque for reading the topics carefully and sharing thoughtful
              guidance.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-semibold text-[var(--page-ink)]">
              Review &amp; Build Tools
            </h3>
            <p>
              Thanks for the software tools that assisted with draft screening
              and interactive building—including DeepSeek, Gemini, Grok, and
              Google AI Studio Build.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-semibold text-[var(--page-ink)]">
              Open Knowledge Archives
            </h3>
            <p>
              Gratitude to Quran.com and public scientific institutions whose open
              articles and data help students explore all 500 topics freely.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onReturnToBook}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] bg-[var(--accent-emerald)] text-[#F1EBE0] border border-[var(--gold-hairline)] hover:border-[var(--accent-gold)] active:scale-[0.985] transition-all duration-150 rounded-[4px] shadow-[var(--shadow-elev-1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <BookOpen className="w-4 h-4 text-[#D4B46A]" />
            <span>Return to the Encyclopedia</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenChapter('chapter-01')}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] border border-[var(--gold-hairline)] text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.985] transition-all duration-150 rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <span>Start Reading Chapter 01</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          </button>
        </div>
      </section>
    </div>
  );
};
