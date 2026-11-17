import React from 'react';
import { ArrowRight, BookOpen, ExternalLink, Scale } from 'lucide-react';
import { CHAPTERS } from '../../data/chapters';
import {
  getVerifiedPassagesForRefs,
  getVerifiedQuranCorpusStats,
} from '../../data/quranVerification';
import { FolioType, RawChapterDataset } from '../../types/encyclopedia';
import { EditorialDivider } from '../ornaments/IslamicOrnaments';

interface EncyclopediaIntroductionProps {
  folioType: Extract<
    FolioType,
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
  >;
  datasetsByChapter: Record<string, RawChapterDataset | undefined>;
  onNavigateToSpread: (spreadId: string) => void;
}

const REFLECTION_PASSAGES = [
  {
    domain: 'The Sky & Outer Space',
    ref: '51:47',
  },
  {
    domain: 'Earth & Mountains',
    ref: '78:6-7',
  },
  {
    domain: 'Oceans & Living Water',
    ref: '21:30',
  },
  {
    domain: 'Animals & Nature',
    ref: '16:68-69',
  },
  {
    domain: 'How Humans Grow',
    ref: '23:12-14',
  },
  {
    domain: 'Living Together Kindly',
    ref: '49:13',
  },
];

export const EncyclopediaIntroduction: React.FC<
  EncyclopediaIntroductionProps
> = ({ folioType, datasetsByChapter, onNavigateToSpread }) => {
  const corpusStats = getVerifiedQuranCorpusStats();

  switch (folioType) {
    /* Page 1: Welcome to Science of Creation */
    case 'intro-welcome':
      return (
        <div className="flex flex-col justify-between h-full gap-4 max-w-prose">
          <div className="space-y-4">
            <header className="pb-3.5 border-b border-[var(--hairline)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
                Introduction &middot; Page 1 of 10
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--page-ink)] text-balance">
                Welcome to Science of Creation
              </h2>
            </header>

            <section className="space-y-3">
              <p className="text-sm sm:text-[15px] leading-[1.75] text-[var(--page-ink)]/92 first-letter:text-5xl first-letter:font-editorial first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-0.5 first-letter:leading-[0.85] first-letter:text-[var(--accent-gold)]">
                Science of Creation is an illustrated digital book with 10
                chapters and 500 topics. It helps curious readers explore how the
                natural world works, what the Qur&rsquo;an teaches about creation
                and human life, and how modern science connects with those signs.
              </p>
              <p className="text-sm leading-[1.7] text-[var(--page-muted)]">
                People sometimes think faith and science have to argue. This
                encyclopedia takes a calmer path: it respects the Qur&rsquo;an as
                a book of spiritual guidance while also trusting honest scientific
                tests, real measurements, and clear evidence.
              </p>
            </section>

            <EditorialDivider className="my-1" />

            <section className="space-y-2">
              <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[var(--page-ink)]">
                Why This Book Exists
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[var(--page-ink)]/88">
                Instead of repeating rushed claims or calling everything a
                &ldquo;scientific miracle,&rdquo; every single topic lets you see
                the Qur&rsquo;anic verse clearly, learn what early scholars said,
                read simple scientific facts with a custom picture, and check
                honest limits side-by-side.
              </p>
            </section>

            <p className="text-[11px] leading-relaxed text-[var(--page-muted)] pt-2 border-t border-[var(--hairline)]">
              <strong className="text-[var(--page-ink)]">
                Independent Educational Book:
              </strong>{' '}
              Created for free learning and exploration. All Arabic Qur&rsquo;an
              verses and translations carry clear credits, with no commercial
              publisher or miracle claims attached.
            </p>
          </div>

          <div className="pt-2.5 border-t border-[var(--hairline)] flex items-center justify-between text-[11px] text-[var(--page-muted)]">
            <span>10 Chapters &middot; 500 Illustrated Topics</span>
            <button
              type="button"
              onClick={() => onNavigateToSpread('table-of-contents')}
              className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline cursor-pointer"
            >
              <span>Skip to Contents</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      );

    /* Page 2: The Qur'anic Invitation to Reflect */
    case 'intro-reflection': {
      const verifiedExamples = REFLECTION_PASSAGES.map((item) => ({
        ...item,
        passage: getVerifiedPassagesForRefs([item.ref])[0],
      }));

      return (
        <div className="flex flex-col gap-3 max-w-prose">
          <header className="pb-2.5 border-b border-[var(--hairline)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
              Introduction &middot; Page 2 of 10
            </p>
            <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
              Why the Qur&rsquo;an Invites Us to Look Around
            </h2>
          </header>

          <p className="text-xs sm:text-[13px] leading-relaxed text-[var(--page-ink)]/90">
            Again and again, the Qur&rsquo;an asks people to slow down and notice
            signs (<em>ayat</em>) in the world around us—from stars and mountains
            to bees, human babies, and kindness between neighbours:
          </p>

          <div className="divide-y divide-[var(--hairline)] border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[4px]">
            {verifiedExamples.map(({ domain, ref, passage }) => (
              <div key={ref} className="p-2.5 space-y-1">
                <div className="flex items-center justify-between gap-2 text-[10.5px]">
                  <span className="font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold)]">
                    {domain}
                  </span>
                  {passage && (
                    <a
                      href={passage.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline tabular-nums shrink-0"
                    >
                      <span>
                        Surah {passage.surahNameSimple} ({passage.reference})
                      </span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                {passage && (
                  <>
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-base sm:text-[17px] leading-[1.85] text-right text-[var(--page-ink)]"
                    >
                      {passage.arabicText}
                    </p>
                    <p className="text-[11px] leading-snug text-[var(--page-ink)]/85">
                      &ldquo;{passage.translationText}&rdquo;{' '}
                      <span className="text-[var(--page-muted)]">
                        &mdash; {passage.translator}
                      </span>
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    /* Page 3: How Faith and Science Work Together Respectfully */
    case 'intro-faith-science':
      return (
        <div className="flex flex-col gap-3.5 max-w-prose">
          <header className="pb-3 border-b border-[var(--hairline)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
              Introduction &middot; Page 3 of 10
            </p>
            <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
              How Science &amp; Faith Answer Different Questions
            </h2>
          </header>

          <p className="text-xs sm:text-[13px] leading-relaxed text-[var(--page-ink)]/90">
            Studying science and reading the Qur&rsquo;an become much clearer once
            we know what each one is meant to do:
          </p>

          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)] text-xs">
            {[
              {
                term: 'What the Qur’an & Faith Teach',
                desc: 'The Qur’an gives spiritual guidance, moral purpose, and reminders to notice the beauty of creation. Scholars interpret its verses through classic Arabic language and history (called tafsir)—and human understanding is always open to careful learning.',
              },
              {
                term: 'How Scientists Look for Answers',
                desc: 'Science looks closely at how things work physically. Scientists ask questions, measure things with instruments (like telescopes, microscopes, and sensors), run fair tests, and double-check one another’s results.',
              },
              {
                term: 'What a Scientific Model Is',
                desc: 'In science, a big idea like moving Earth plates isn’t a wild guess—it is a strong explanation tested against thousands of real measurements from all over the world.',
              },
              {
                term: 'What Scientists Know vs. Are Still Exploring',
                desc: 'Some facts (like how rain forms) are super clear, while newer mysteries (like dark matter in space) are still being studied—and science happily updates as tools improve.',
              },
              {
                term: 'Keeping Them Both Honest',
                desc: 'A science test shows how nature works, not whether a faith belief is true—and loving a verse never replaces checking real scientific facts carefully.',
              },
            ].map((item) => (
              <div key={item.term} className="py-2.5 space-y-0.5">
                <h3 className="font-semibold text-[var(--accent-gold)] text-[11.5px] uppercase tracking-wider">
                  {item.term}
                </h3>
                <p className="text-[11.5px] leading-relaxed text-[var(--page-muted)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    /* Page 4: How to Read This Encyclopedia */
    case 'intro-guide':
      return (
        <div className="flex flex-col justify-between h-full gap-3 max-w-prose">
          <div className="space-y-3">
            <header className="pb-3 border-b border-[var(--hairline)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
                Introduction &middot; Page 4 of 10
              </p>
              <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
                How to Use This Book
              </h2>
            </header>

            <p className="text-xs leading-relaxed text-[var(--page-ink)]/90">
              This digital book has 10 chapters and 500 single-page topics. Every
              single topic page follows the same simple 8-part guide so you always
              know where to look:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] leading-snug">
              {[
                {
                  title: '1. Discover & 2. Qur’an Verse',
                  body: 'A welcoming opener, then the exact Surah, Arabic text, English meaning, "In Simple Words," and what early scholars said.',
                },
                {
                  title: '3. What Science Tells Us',
                  body: 'Clear explanation of how nature works, an everyday example you know, trusted facts, and "Key Science Words."',
                },
                {
                  title: '4. How Are They Connected?',
                  body: 'Four clear lines separating what the verse says, what early scholars said, what science found, and how people connect them.',
                },
                {
                  title: '5. Illustration Guide',
                  body: 'Every topic includes its own custom-made visual diagram with step-by-step boxes and zoom view.',
                },
                {
                  title: '6. Remember & 7. Be Careful',
                  body: '3–4 quick takeaways to remember plus calm, honest notes about what the topic does NOT claim.',
                },
                {
                  title: '8. Explore the Evidence',
                  body: 'How scientists studied it, the topic’s Grade (A–D), trusted website links, and next related topics.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-2.5 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/40 rounded-[4px]"
                >
                  <span className="font-semibold text-[var(--page-ink)] block mb-0.5">
                    {card.title}
                  </span>
                  <span className="text-[var(--page-muted)]">{card.body}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2.5 border-t border-[var(--hairline)] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[var(--page-muted)]">
              Tap the red silk ribbon at the top anytime to save your page.
            </span>
            <button
              type="button"
              onClick={() => onNavigateToSpread('chapter-01-opening')}
              className="text-[var(--accent-gold)] hover:underline cursor-pointer font-medium"
            >
              Jump to Chapter 01 &rarr;
            </button>
          </div>
        </div>
      );

    /* Page 5: How Connections Are Evaluated */
    case 'intro-methodology':
      return (
        <div className="flex flex-col gap-3.5 max-w-prose">
          <header className="pb-3 border-b border-[var(--hairline)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
              Introduction &middot; Page 5 of 10
            </p>
            <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
              How Each Topic Is Checked Carefully
            </h2>
          </header>

          <p className="text-xs leading-relaxed text-[var(--page-ink)]/90">
            To avoid mixing up ideas, every topic keeps four things cleanly apart:
          </p>

          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)] text-[11.5px]">
            {[
              {
                label: '1. What Science Measured',
                text: 'Clear facts backed by observatories, labs, hospitals, or respected scientific agencies.',
              },
              {
                label: '2. What Early Scholars Understood',
                text: 'How classic scholars read the Arabic words in their own time—long before modern telescopes or microscopes existed.',
              },
              {
                label: '3. Modern Reflection & Discussion',
                text: 'Thoughtful links readers make today between verses and science—always shared as ideas to reflect on, never forced rules.',
              },
              {
                label: '4. Type of Connection',
                text: 'Every topic notes whether the link is an observable nature sign, healthy lifestyle advice, shared big-picture theme, or open discussion.',
              },
            ].map((row) => (
              <div key={row.label} className="py-2.5 space-y-0.5">
                <span className="font-semibold text-[var(--accent-gold)] block">
                  {row.label}
                </span>
                <p className="text-[var(--page-muted)] leading-relaxed">
                  {row.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    /* Page 6: Understanding Evidence Grades */
    case 'intro-grading':
      return (
        <div className="flex flex-col gap-3.5 max-w-prose">
          <header className="pb-3 border-b border-[var(--hairline)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
              Introduction &middot; Page 6 of 10
            </p>
            <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
              What Do Grades A, B, C &amp; D Mean?
            </h2>
          </header>

          <p className="text-xs leading-relaxed text-[var(--page-ink)]/90">
            Every topic has a letter grade from A to D. These grades do NOT measure
            how sacred a verse is—every verse is equally honoured. They simply tell
            you how close and direct the scientific connection is:
          </p>

          <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[4px]">
            {[
              {
                grade: 'Grade A',
                label: 'Clear, Direct Match',
                desc: 'There is a clear, direct link between what the verse describes and what science knows well—though we still read the verse carefully rather than calling it a lab textbook.',
              },
              {
                grade: 'Grade B',
                label: 'Good Helpful Connection',
                desc: 'A sensible, helpful link with observable nature, health, mind, or community life—where context and thoughtful reading matter.',
              },
              {
                grade: 'Grade C',
                label: 'Open to Discussion',
                desc: 'The science itself is clear, while connecting it to that specific verse is broader or understood in more than one valid way.',
              },
              {
                grade: 'Grade D',
                label: 'Pure Faith & Spiritual Meaning',
                desc: 'Topics about belief, the afterlife, or morals that belong to faith and reflection rather than laboratory testing.',
              },
            ].map((item) => (
              <div key={item.grade} className="p-2.5">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">
                    <Scale className="w-3.5 h-3.5" />
                    <span>{item.grade}</span>
                  </span>
                  <span className="text-[11px] text-[var(--page-ink)] font-medium">
                    {item.label}
                  </span>
                </div>
                <p className="text-[11.5px] text-[var(--page-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    /* Page 7: Sources, References & Checking */
    case 'intro-verification':
      return (
        <div className="flex flex-col gap-3 max-w-prose">
          <header className="pb-3 border-b border-[var(--hairline)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
              Introduction &middot; Page 7 of 10
            </p>
            <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
              Where Our Verses &amp; Science Facts Come From
            </h2>
          </header>

          <p className="text-xs leading-relaxed text-[var(--page-ink)]/90">
            Every chapter uses open, trusted sources so teachers, students, and
            families can double-check anything themselves:
          </p>

          <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)] text-[11.5px] leading-relaxed text-[var(--page-muted)]">
            <li className="py-2.5">
              <strong className="text-[var(--page-ink)] block">
                Qur&rsquo;an Arabic Text &amp; Translations:
              </strong>
              All {corpusStats.uniqueAyahsVerified} unique verse passages across the
              500 topics are matched to verified Uthmani script and the{' '}
              {corpusStats.translator} English translation via Quran.com (
              {corpusStats.verifiedAt}), with direct links on every page.
            </li>
            <li className="py-2.5">
              <strong className="text-[var(--page-ink)] block">
                Early Muslim Scholars (Classical Tafsir):
              </strong>
              Notes from <em>Tafsir Ibn Kathir</em> (Quran.com) appear across topics
              alongside well-known commentators like <em>al-Tabari</em> and{' '}
              <em>al-Qurtubi</em> where recorded.
            </li>
            <li className="py-2.5">
              <strong className="text-[var(--page-ink)] block">
                Trusted Science &amp; Health Institutions:
              </strong>
              Links point to open agencies and science libraries—such as NASA, ESA,
              NOAA, USGS, USDA, WHO, UNICEF, OECD, and the U.S. National Library of
              Medicine (PubMed).
            </li>
          </ul>
        </div>
      );

    /* Page 8: Editorial Principles and Responsibility */
    case 'intro-responsibility':
      return (
        <div className="flex flex-col gap-3.5 max-w-prose">
          <header className="pb-3 border-b border-[var(--hairline)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
              Introduction &middot; Page 8 of 10
            </p>
            <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
              Our Promise of Honesty &amp; Care
            </h2>
          </header>

          <p className="text-xs sm:text-[13px] leading-[1.7] text-[var(--page-ink)]/90">
            Being honest means never exaggerating a loose idea into certainty, and
            never making health or legal promises a study website should not make.
          </p>

          <div className="space-y-2.5 text-[11.5px] leading-relaxed text-[var(--page-muted)]">
            <div className="p-2.5 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[4px]">
              <strong className="text-[var(--accent-gold)] block mb-0.5">
                Respecting Classic Arabic Meanings
              </strong>
              Arabic words like <em>sama&rsquo;</em> (sky), <em>barzakh</em>{' '}
              (barrier), <em>&lsquo;alaqah</em> (clinging form), or{' '}
              <em>qalb</em> (heart) have rich meanings in everyday 7th-century
              Arabic. We never squeeze a single ancient word into sounding like a
              brand-new lab dictionary term.
            </div>
            <div className="py-2 border-t border-[var(--hairline)]">
              <strong className="text-[var(--page-ink)] block mb-0.5">
                Never Replaces a Real Doctor or Counsellor
              </strong>
              Topics about fasting, honey, mental health, or family fairness are
              for learning only—never a replacement for visiting a doctor, nurse,
              therapist, or safe support adult.
            </div>
            <div className="py-2 border-t border-[var(--hairline)]">
              <strong className="text-[var(--page-ink)] block mb-0.5">
                Science Keeps Learning
              </strong>
              As telescopes and microscopes get better, scientists keep refining
              what they know. Keeping faith free from changing scientific guesses
              protects both faith and science.
            </div>
          </div>
        </div>
      );

    /* Page 9: Acknowledgements */
    case 'intro-acknowledgements':
      return (
        <div className="flex flex-col justify-between h-full gap-4 max-w-prose">
          <div className="space-y-3.5">
            <header className="pb-3 border-b border-[var(--hairline)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
                Introduction &middot; Page 9 of 10
              </p>
              <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
                Thank You &amp; Acknowledgements
              </h2>
            </header>

            <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[var(--page-ink)]/90">
              Science of Creation was made possible by open libraries of Qur&rsquo;an
              scholarship, public science agencies, and patient human review.
            </p>

            <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)] text-[11.5px] leading-relaxed text-[var(--page-muted)]">
              <p className="py-2.5">
                <strong className="text-[var(--page-ink)] block">
                  Qur&rsquo;an &amp; Classical Scholar Libraries:
                </strong>
                Special thanks to Quran.com and its open maintainers for sharing
                accurate Uthmani script, the Saheeh International translation, and
                classic tafsir editions for everyone to read freely.
              </p>
              <p className="py-2.5">
                <strong className="text-[var(--page-ink)] block">
                  Science &amp; Public Knowledge Agencies:
                </strong>
                Science explanations and reference numbers draw from public agencies
                such as NASA, ESA, NOAA, USGS, USDA, WHO, UNICEF, OECD, and the
                U.S. National Library of Medicine (PubMed).
              </p>
              <p className="py-2.5">
                <strong className="text-[var(--page-ink)] block">
                  Review &amp; Careful Refinement:
                </strong>
                Gratitude goes to the human reviewers (the developer&rsquo;s father
                and local mosque imam) and digital checking workflow that helped
                organise these 500 topics clearly.
              </p>
            </div>
          </div>

          <p className="text-[11px] italic text-[var(--page-muted)] border-t border-[var(--hairline)] pt-2.5">
            Visit &ldquo;About Dev&rdquo; in the top bar anytime to read the
            creator&rsquo;s full story.
          </p>
        </div>
      );

    /* Page 10: An Invitation to Reflect */
    case 'intro-invitation':
      return (
        <div className="flex flex-col justify-between h-full gap-4 max-w-prose">
          <div className="space-y-4">
            <header className="pb-3 border-b border-[var(--hairline)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
                Introduction &middot; Page 10 of 10
              </p>
              <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)] text-balance">
                Ready to Start Exploring?
              </h2>
            </header>

            <p className="text-sm leading-[1.75] text-[var(--page-ink)]/92 first-letter:text-4xl first-letter:font-editorial first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-0.5 first-letter:leading-[0.85] first-letter:text-[var(--accent-gold)]">
              Whether you start with a stretching universe, deep mountain roots,
              sunlight fading into deep oceans, hail growing inside storm clouds,
              or a tiny seed waking up in damp soil—every page invites wonder and
              thoughtful questions.
            </p>

            <p className="text-xs sm:text-[13px] leading-[1.7] text-[var(--page-muted)]">
              Take your time as you turn each page. Read the verse first, look at
              what science has discovered, zoom into the illustration, check the
              &ldquo;What Should We Be Careful About?&rdquo; notes, and enjoy
              learning step by step.
            </p>

            <EditorialDivider className="my-1" />

            <blockquote className="p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[4px] text-center space-y-1">
              <p className="font-editorial italic text-sm text-[var(--page-ink)]">
                &ldquo;Read with curiosity, reflect with wonder, and stay honest
                with the evidence.&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="pt-2.5 border-t border-[var(--hairline)] flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => onNavigateToSpread('table-of-contents')}
              className="inline-flex items-center gap-1.5 text-[var(--accent-gold)] font-medium hover:underline cursor-pointer"
            >
              <span>Open Table of Contents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateToSpread('chapter-01-opening')}
              className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
            >
              Jump to Chapter 01
            </button>
          </div>
        </div>
      );

    /* Facing Folio alongside Page 10: Complete Volume Overview */
    case 'intro-overview': {
      const loadedCount = CHAPTERS.filter((c) =>
        Boolean(datasetsByChapter[c.id]?.entries.length)
      ).length;
      const totalTopics = CHAPTERS.reduce(
        (acc, c) => acc + (datasetsByChapter[c.id]?.entries.length ?? 0),
        0
      );

      return (
        <div className="flex flex-col justify-between h-full gap-3">
          <div className="space-y-3">
            <header className="pb-3 border-b border-[var(--hairline)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-medium mb-1">
                Complete Encyclopedia Map
              </p>
              <h2 className="font-editorial text-2xl sm:text-[26px] font-semibold text-[var(--page-ink)]">
                All 10 Chapters at a Glance
              </h2>
            </header>

            <p className="text-xs leading-relaxed text-[var(--page-muted)]">
              Explore all {loadedCount} chapters and {totalTopics} illustrated
              topics—moving from outer space, Earth, water, and weather to plants,
              animals, the human body, health, feelings, and fair communities.
            </p>

            <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)] rounded-[4px]">
              {CHAPTERS.map((ch) => {
                const count = datasetsByChapter[ch.id]?.entries.length ?? 0;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => onNavigateToSpread(`${ch.id}-opening`)}
                    className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 text-left text-xs hover:bg-[var(--page-bg-secondary)] transition-colors cursor-pointer"
                  >
                    <span className="truncate">
                      <span className="text-[var(--accent-gold)] font-medium tabular-nums mr-2">
                        {ch.paddedNumber}.
                      </span>
                      <span className="text-[var(--page-ink)]">{ch.title}</span>
                    </span>
                    <span className="text-[10.5px] text-[var(--page-muted)] tabular-nums shrink-0">
                      {count} Topics
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2.5 border-t border-[var(--hairline)] flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--page-muted)]">
              <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>10 Chapters &middot; 500 Complete Topics</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToSpread('table-of-contents')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] border border-[var(--gold-hairline)] text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
            >
              <span>Open Contents</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      );
    }
  }
};
