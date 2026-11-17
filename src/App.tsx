import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Bookmark, List, Moon, Sun, UserRound } from 'lucide-react';
import { BookEngine } from './components/book/BookEngine';
import { LuxuryBookCover } from './components/book/LuxuryBookCover';
import { MobileRotatePrompt } from './components/book/MobileRotatePrompt';
import { IndexDrawer } from './components/navigation/IndexDrawer';
import { useMobileOrientation } from './hooks/useMobileOrientation';

const AboutDevPage = React.lazy(() =>
  import('./components/about/AboutDevPage').then((m) => ({
    default: m.AboutDevPage,
  }))
);
const IllustrationQcGallery = React.lazy(() =>
  import('./components/dev/IllustrationQcGallery').then((m) => ({
    default: m.IllustrationQcGallery,
  }))
);
import {
  ANIMALS_DATASET_URL,
  buildBookSpreads,
  COSMOLOGY_DATASET_URL,
  findTopicLocation,
  GEOLOGY_DATASET_URL,
  HEALTH_HYGIENE_DATASET_URL,
  HUMAN_BIOLOGY_DATASET_URL,
  HUMAN_PSYCHOLOGY_DATASET_URL,
  normalizeAnimalsDataset,
  normalizeCosmologyDataset,
  normalizeGeologyDataset,
  normalizeHealthHygieneDataset,
  normalizeHumanBiologyDataset,
  normalizeHumanPsychologyDataset,
  normalizeOceansDataset,
  normalizePlantsDataset,
  normalizeSocialLifeEthicsDataset,
  normalizeWeatherDataset,
  OCEANS_DATASET_URL,
  PLANTS_DATASET_URL,
  SOCIAL_LIFE_ETHICS_DATASET_URL,
  WEATHER_DATASET_URL,
} from './data/encyclopediaLoader';
import { buildIllustrationRegistry } from './data/illustrationRegistry';
import {
  AppearanceMode,
  BookmarkEntry,
  IllustrationRegistryEntry,
  RawAnimalsDataset,
  RawChapterDataset,
  RawGeologyDataset,
  RawHealthHygieneDataset,
  RawHumanBiologyDataset,
  RawHumanPsychologyDataset,
  RawOceansDataset,
  RawPlantsDataset,
  RawSocialLifeEthicsDataset,
  RawWeatherDataset,
} from './types/encyclopedia';

type BookPhase = 'cover' | 'opening' | 'open' | 'closing';

const BOOKMARKS_STORAGE_KEY = 'science_of_creation_bookmarks_v1';
const EXPLORED_STORAGE_KEY = 'science_of_creation_explored_v1';
const THEME_STORAGE_KEY = 'science_of_creation_theme_v1';
const INTERNAL_QC_HASH = '__internal-qc-illustrations';
const ABOUT_DEV_HASH = 'about-dev';

export default function App() {
  const [datasetsByChapter, setDatasetsByChapter] = useState<
    Record<string, RawChapterDataset | undefined>
  >({});
  const [datasetsSettled, setDatasetsSettled] = useState(false);

  // Preserve cold-boot URL hash (#COS-001, #chapter-01-opening, etc.) until datasets finish loading
  const pendingInitialHashRef = useRef<string | null>(
    typeof window !== 'undefined' ? window.location.hash.slice(1) || null : null
  );

  // Load Chapters 01–10 (Cosmology through Social Life, Ethics and Everyday Practices)
  useEffect(() => {
    let cancelled = false;

    const loadCosmology = fetch(COSMOLOGY_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Cosmology dataset');
        return res.json() as Promise<RawChapterDataset>;
      })
      .then((raw) => normalizeCosmologyDataset(raw))
      .catch((err) => {
        console.error('Could not load Cosmology dataset:', err);
        return undefined;
      });

    const loadGeology = fetch(GEOLOGY_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Geology dataset');
        return res.json() as Promise<RawGeologyDataset>;
      })
      .then((raw) => normalizeGeologyDataset(raw))
      .catch((err) => {
        console.error('Could not load Geology dataset:', err);
        return undefined;
      });

    const loadOceans = fetch(OCEANS_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Oceans dataset');
        return res.json() as Promise<RawOceansDataset>;
      })
      .then((raw) => normalizeOceansDataset(raw))
      .catch((err) => {
        console.error('Could not load Oceans dataset:', err);
        return undefined;
      });

    const loadWeather = fetch(WEATHER_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Weather dataset');
        return res.json() as Promise<RawWeatherDataset>;
      })
      .then((raw) => normalizeWeatherDataset(raw))
      .catch((err) => {
        console.error('Could not load Weather dataset:', err);
        return undefined;
      });

    const loadPlants = fetch(PLANTS_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Plants dataset');
        return res.json() as Promise<RawPlantsDataset>;
      })
      .then((raw) => normalizePlantsDataset(raw))
      .catch((err) => {
        console.error('Could not load Plants dataset:', err);
        return undefined;
      });

    const loadAnimals = fetch(ANIMALS_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Animals dataset');
        return res.json() as Promise<RawAnimalsDataset>;
      })
      .then((raw) => normalizeAnimalsDataset(raw))
      .catch((err) => {
        console.error('Could not load Animals dataset:', err);
        return undefined;
      });

    const loadHumanBiology = fetch(HUMAN_BIOLOGY_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Human Biology dataset');
        return res.json() as Promise<RawHumanBiologyDataset>;
      })
      .then((raw) => normalizeHumanBiologyDataset(raw))
      .catch((err) => {
        console.error('Could not load Human Biology dataset:', err);
        return undefined;
      });

    const loadHealthHygiene = fetch(HEALTH_HYGIENE_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Health & Hygiene dataset');
        return res.json() as Promise<RawHealthHygieneDataset>;
      })
      .then((raw) => normalizeHealthHygieneDataset(raw))
      .catch((err) => {
        console.error('Could not load Health & Hygiene dataset:', err);
        return undefined;
      });

    const loadHumanPsychology = fetch(HUMAN_PSYCHOLOGY_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Human Psychology dataset');
        return res.json() as Promise<RawHumanPsychologyDataset>;
      })
      .then((raw) => normalizeHumanPsychologyDataset(raw))
      .catch((err) => {
        console.error('Could not load Human Psychology dataset:', err);
        return undefined;
      });

    const loadSocialLifeEthics = fetch(SOCIAL_LIFE_ETHICS_DATASET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Social Life & Ethics dataset');
        return res.json() as Promise<RawSocialLifeEthicsDataset>;
      })
      .then((raw) => normalizeSocialLifeEthicsDataset(raw))
      .catch((err) => {
        console.error('Could not load Social Life & Ethics dataset:', err);
        return undefined;
      });

    Promise.all([
      loadCosmology,
      loadGeology,
      loadOceans,
      loadWeather,
      loadPlants,
      loadAnimals,
      loadHumanBiology,
      loadHealthHygiene,
      loadHumanPsychology,
      loadSocialLifeEthics,
    ]).then(
      ([
        cosmology,
        geology,
        oceans,
        weather,
        plants,
        animals,
        humanBiology,
        healthHygiene,
        humanPsychology,
        socialLifeEthics,
      ]) => {
        if (cancelled) return;
        setDatasetsByChapter((prev) => ({
          ...prev,
          ...(cosmology ? { 'chapter-01': cosmology } : {}),
          ...(geology ? { 'chapter-02': geology } : {}),
          ...(oceans ? { 'chapter-03': oceans } : {}),
          ...(weather ? { 'chapter-04': weather } : {}),
          ...(plants ? { 'chapter-05': plants } : {}),
          ...(animals ? { 'chapter-06': animals } : {}),
          ...(humanBiology ? { 'chapter-07': humanBiology } : {}),
          ...(healthHygiene ? { 'chapter-08': healthHygiene } : {}),
          ...(humanPsychology ? { 'chapter-09': humanPsychology } : {}),
          ...(socialLifeEthics ? { 'chapter-10': socialLifeEthics } : {}),
        }));
        setDatasetsSettled(true);
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const spreads = useMemo(
    () => buildBookSpreads(datasetsByChapter),
    [datasetsByChapter]
  );

  const spreadIndexById = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 0; i < spreads.length; i++) {
      map.set(spreads[i].id, i);
    }
    return map;
  }, [spreads]);

  const illustrationRecords = useMemo(
    () => buildIllustrationRegistry(datasetsByChapter),
    [datasetsByChapter]
  );

  const illustrationByTopicId = useMemo(() => {
    const map: Record<string, IllustrationRegistryEntry> = {};
    for (const rec of illustrationRecords) {
      map[rec.topicId] = rec;
    }
    return map;
  }, [illustrationRecords]);

  // Appearance Mode
  const [appearance, setAppearance] = useState<AppearanceMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (appearance === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, appearance);
  }, [appearance]);

  const [isQcGalleryRoute, setIsQcGalleryRoute] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash.slice(1) === INTERNAL_QC_HASH;
  });

  const [isAboutDevOpen, setIsAboutDevOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash.slice(1) === ABOUT_DEV_HASH;
  });

  const [bookPhase, setBookPhase] = useState<BookPhase>('cover');
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState<number>(0);
  const [focusedTopicId, setFocusedTopicId] = useState<string | null>(null);
  const [focusedSideHint, setFocusedSideHint] = useState<'left' | 'right' | null>(
    null
  );
  const [justOpened, setJustOpened] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  const applyHashNavigation = useCallback(
    (hashId: string, options?: { allowCoverReset?: boolean }) => {
      if (!hashId) {
        pendingInitialHashRef.current = null;
        setIsQcGalleryRoute(false);
        setIsAboutDevOpen(false);
        if (options?.allowCoverReset) {
          setBookPhase('cover');
        }
        return true;
      }
      if (hashId === INTERNAL_QC_HASH) {
        pendingInitialHashRef.current = null;
        setIsAboutDevOpen(false);
        setIsQcGalleryRoute(true);
        return true;
      }
      if (hashId === ABOUT_DEV_HASH) {
        pendingInitialHashRef.current = null;
        setIsQcGalleryRoute(false);
        setIsAboutDevOpen(true);
        return true;
      }
      const spreadIdx = spreadIndexById.get(hashId);
      if (spreadIdx !== undefined) {
        pendingInitialHashRef.current = null;
        setIsQcGalleryRoute(false);
        setIsAboutDevOpen(false);
        setFocusedTopicId(null);
        setFocusedSideHint(null);
        setCurrentSpreadIndex(spreadIdx);
        setBookPhase('open');
        return true;
      }
      const topicLoc = findTopicLocation(spreads, hashId);
      if (topicLoc) {
        pendingInitialHashRef.current = null;
        setIsQcGalleryRoute(false);
        setIsAboutDevOpen(false);
        setCurrentSpreadIndex(topicLoc.spreadIndex);
        setFocusedTopicId(hashId);
        setFocusedSideHint(topicLoc.side);
        setBookPhase('open');
        return true;
      }
      return false;
    },
    [spreadIndexById, spreads]
  );

  // Sync live URL hash changes (topics, chapters, spreads, #about-dev, QC route)
  useEffect(() => {
    const onHashChange = () => {
      pendingInitialHashRef.current = null;
      applyHashNavigation(window.location.hash.slice(1), {
        allowCoverReset: true,
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [applyHashNavigation]);

  // Resolve initial/deep-link URL hash once dataset spreads load
  useEffect(() => {
    const rawHash = window.location.hash.slice(1);
    if (!rawHash) {
      pendingInitialHashRef.current = null;
      return;
    }
    const matched = applyHashNavigation(rawHash);
    if (!matched && datasetsSettled) {
      pendingInitialHashRef.current = null;
    }
  }, [applyHashNavigation, datasetsSettled]);

  // Saved Ribbon Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as BookmarkEntry[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        BOOKMARKS_STORAGE_KEY,
        JSON.stringify(bookmarks)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarks]);

  // Explicitly Explored Topics (separate from Reading Position)
  const [exploredTopicIds, setExploredTopicIds] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = window.localStorage.getItem(EXPLORED_STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      return Array.isArray(parsed)
        ? new Set(parsed.filter((v): v is string => typeof v === 'string'))
        : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        EXPLORED_STORAGE_KEY,
        JSON.stringify(Array.from(exploredTopicIds))
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [exploredTopicIds]);

  const handleToggleExploredTopic = useCallback((topicId: string) => {
    setExploredTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (isQcGalleryRoute) return;
    if (isAboutDevOpen) {
      window.history.replaceState(null, '', `#${ABOUT_DEV_HASH}`);
      return;
    }
    if (bookPhase === 'open' && spreads[currentSpreadIndex]) {
      const targetHash = focusedTopicId || spreads[currentSpreadIndex].id;
      window.history.replaceState(null, '', `#${targetHash}`);
    } else if (
      bookPhase === 'cover' &&
      !pendingInitialHashRef.current &&
      window.location.hash
    ) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [
    isQcGalleryRoute,
    isAboutDevOpen,
    bookPhase,
    currentSpreadIndex,
    focusedTopicId,
    spreads,
  ]);

  const phaseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (phaseTimerRef.current) window.clearTimeout(phaseTimerRef.current);
    };
  }, []);

  const handleOpenBook = useCallback(() => {
    if (bookPhase !== 'cover') return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')
      .matches;

    if (reduced) {
      setCurrentSpreadIndex(0);
      setBookPhase('open');
      setJustOpened(false);
      return;
    }

    if (phaseTimerRef.current) window.clearTimeout(phaseTimerRef.current);
    setBookPhase('opening');
    phaseTimerRef.current = window.setTimeout(() => {
      setCurrentSpreadIndex(0);
      setJustOpened(true);
      setBookPhase('open');
    }, 640);
  }, [bookPhase]);

  const handleReturnToCover = useCallback(() => {
    pendingInitialHashRef.current = null;
    setIsQcGalleryRoute(false);
    setIsAboutDevOpen(false);
    setJustOpened(false);
    setFocusedTopicId(null);
    setFocusedSideHint(null);
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')
      .matches;
    if (reduced || bookPhase === 'cover') {
      setBookPhase('cover');
      return;
    }

    if (phaseTimerRef.current) window.clearTimeout(phaseTimerRef.current);
    setBookPhase('closing');
    phaseTimerRef.current = window.setTimeout(() => {
      setBookPhase('cover');
    }, 300);
  }, [bookPhase]);

  const handleChangeSpread = useCallback((index: number) => {
    setIsQcGalleryRoute(false);
    setIsAboutDevOpen(false);
    setFocusedTopicId(null);
    setFocusedSideHint(null);
    setCurrentSpreadIndex(index);
  }, []);

  const handleNavigateToSpreadId = useCallback(
    (spreadId: string) => {
      const idx = spreadIndexById.get(spreadId);
      if (idx !== undefined) {
        setIsQcGalleryRoute(false);
        setIsAboutDevOpen(false);
        setFocusedTopicId(null);
        setFocusedSideHint(null);
        setCurrentSpreadIndex(idx);
        if (bookPhase === 'cover') {
          setJustOpened(true);
          setBookPhase('open');
        }
      }
    },
    [bookPhase, spreadIndexById]
  );

  const handleNavigateToTopic = useCallback(
    (topicId: string) => {
      const loc = findTopicLocation(spreads, topicId);
      if (!loc) return;
      setIsQcGalleryRoute(false);
      setIsAboutDevOpen(false);
      setCurrentSpreadIndex(loc.spreadIndex);
      setFocusedTopicId(topicId);
      setFocusedSideHint(loc.side);
      if (bookPhase === 'cover') {
        setJustOpened(true);
        setBookPhase('open');
      }
    },
    [bookPhase, spreads]
  );

  const handleToggleAboutDev = useCallback(() => {
    setIsQcGalleryRoute(false);
    setIsIndexOpen(false);
    setIsAboutDevOpen((prev) => {
      const next = !prev;
      if (next && typeof window !== 'undefined') {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')
          .matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }
      return next;
    });
  }, []);

  const handleOpenChapterFromAbout = useCallback(
    (chapterId: string) => {
      handleNavigateToSpreadId(`${chapterId}-opening`);
    },
    [handleNavigateToSpreadId]
  );

  const activeSpread = spreads[currentSpreadIndex];

  const currentPositionLabel = useMemo(() => {
    if (bookPhase !== 'open' || !activeSpread) {
      return 'Hardcover Frontispiece';
    }
    const focusFolio =
      focusedTopicId && activeSpread.right.rawEntry?.id === focusedTopicId
        ? activeSpread.right
        : focusedTopicId && activeSpread.left.rawEntry?.id === focusedTopicId
        ? activeSpread.left
        : activeSpread.left.rawEntry
        ? activeSpread.left
        : activeSpread.right;

    if (
      focusFolio.rawEntry &&
      focusFolio.chapter &&
      focusFolio.topicIndexInChapter &&
      focusFolio.globalTopicNumber
    ) {
      return `Chapter ${focusFolio.chapter.paddedNumber} · Topic ${String(
        focusFolio.topicIndexInChapter
      ).padStart(2, '0')} (${focusFolio.rawEntry.id}) · ${String(
        focusFolio.globalTopicNumber
      ).padStart(3, '0')} / ${focusFolio.totalGlobalTopics ?? 500}`;
    }
    return `${activeSpread.sectionLabel} · ${activeSpread.title}`;
  }, [activeSpread, bookPhase, focusedTopicId]);
  const isCurrentBookmarked = useMemo(
    () =>
      Boolean(
        activeSpread && bookmarks.some((b) => b.spreadId === activeSpread.id)
      ),
    [activeSpread, bookmarks]
  );

  const handleToggleBookmark = useCallback(() => {
    if (!activeSpread) return;
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.spreadId === activeSpread.id);
      if (exists) {
        return prev.filter((b) => b.spreadId !== activeSpread.id);
      }
      return [
        {
          spreadId: activeSpread.id,
          title: activeSpread.title,
          sectionLabel: activeSpread.sectionLabel,
          savedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  }, [activeSpread]);

  const handleRemoveBookmark = useCallback((spreadId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.spreadId !== spreadId));
  }, []);

  const toggleAppearance = useCallback(() => {
    setAppearance((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleOpenIndex = useCallback(() => {
    setIsIndexOpen(true);
  }, []);

  const handleCloseIndex = useCallback(() => {
    setIsIndexOpen(false);
  }, []);

  const handleExitQcGallery = useCallback(() => {
    setIsQcGalleryRoute(false);
  }, []);

  const handleCloseAboutDev = useCallback(() => {
    setIsAboutDevOpen(false);
  }, []);

  const { isPortrait, isLandscape, isMobilePhone } = useMobileOrientation();
  const isReadingBookActive =
    bookPhase === 'open' && !isAboutDevOpen && !isQcGalleryRoute;
  const isMobileReadingLandscape =
    isReadingBookActive && isMobilePhone && isLandscape;
  const showRotatePrompt =
    isReadingBookActive && isMobilePhone && isPortrait;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--desk-bg)] text-[var(--page-ink)] relative overflow-x-hidden">
      {/* Subtle museum desk radial spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            appearance === 'dark'
              ? 'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(16, 56, 44, 0.34) 0%, rgba(4, 11, 9, 0.92) 78%)'
              : 'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(255, 252, 245, 0.55) 0%, rgba(224, 215, 198, 0.72) 82%)',
        }}
      />

      {/* TOP BAR CONTRACT (3 Zones: Wordmark — 4 Nav Links — Top-Right Controls; Slim Chrome in Mobile Landscape Reading) */}
      <header
        className={`relative z-20 w-full max-w-[1400px] mx-auto flex items-center justify-between border-b border-[var(--hairline)] ${
          isMobileReadingLandscape
            ? 'h-10 px-2.5 gap-2'
            : 'h-14 px-3 md:px-5 lg:px-8 gap-2 md:gap-4 lg:gap-8'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={handleReturnToCover}
            className={`font-editorial font-semibold tracking-[0.03em] sm:tracking-[0.04em] text-[var(--page-ink)] hover:text-[var(--accent-gold)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] ${
              isMobileReadingLandscape ? 'text-sm' : 'text-base md:text-lg lg:text-xl'
            }`}
          >
            Science of Creation
          </button>

          {isMobileReadingLandscape && activeSpread && (
            <span className="hidden sm:inline-block truncate max-w-[200px] text-[11px] text-[var(--accent-gold)] font-medium tabular-nums pl-2 border-l border-[var(--hairline)]">
              {focusedTopicId
                ? `${focusedTopicId}`
                : activeSpread.sectionLabel}
            </span>
          )}
        </div>

        <nav
          aria-label="Primary encyclopedia navigation"
          className={
            isMobilePhone && isLandscape
              ? 'hidden'
              : 'hidden lg:flex items-center gap-6 xl:gap-7 text-xs uppercase tracking-[0.14em] lg:tracking-[0.16em] font-medium text-[var(--page-muted)]'
          }
        >
          <button
            type="button"
            onClick={() => handleNavigateToSpreadId('intro-welcome')}
            className={`relative hover:text-[var(--page-ink)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5 ${
              bookPhase === 'open' && !isAboutDevOpen && activeSpread?.id.startsWith('intro-')
                ? 'text-[var(--accent-gold)] font-semibold'
                : ''
            }`}
          >
            <span>Introduction</span>
            {bookPhase === 'open' && !isAboutDevOpen && activeSpread?.id.startsWith('intro-') && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[var(--accent-gold)]"
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleNavigateToSpreadId('table-of-contents')}
            className={`relative hover:text-[var(--page-ink)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5 ${
              bookPhase === 'open' && !isAboutDevOpen && activeSpread?.id === 'table-of-contents'
                ? 'text-[var(--accent-gold)] font-semibold'
                : ''
            }`}
          >
            <span>Contents</span>
            {bookPhase === 'open' && !isAboutDevOpen && activeSpread?.id === 'table-of-contents' && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[var(--accent-gold)]"
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAboutDevOpen(false);
              setIsIndexOpen(true);
            }}
            className={`relative hover:text-[var(--page-ink)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5 ${
              bookPhase === 'open' &&
              !isAboutDevOpen &&
              Boolean(activeSpread?.id.startsWith('chapter-'))
                ? 'text-[var(--accent-gold)] font-semibold'
                : ''
            }`}
          >
            <span>Chapters</span>
            {bookPhase === 'open' &&
              !isAboutDevOpen &&
              Boolean(activeSpread?.id.startsWith('chapter-')) && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[var(--accent-gold)]"
                />
              )}
          </button>
          <button
            type="button"
            onClick={handleReturnToCover}
            className={`relative hover:text-[var(--page-ink)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5 ${
              bookPhase === 'cover' && !isAboutDevOpen
                ? 'text-[var(--accent-gold)] font-semibold'
                : ''
            }`}
          >
            <span>Cover</span>
            {bookPhase === 'cover' && !isAboutDevOpen && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[var(--accent-gold)]"
              />
            )}
          </button>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {isMobileReadingLandscape && (
            <>
              <button
                type="button"
                onClick={handleOpenIndex}
                aria-label="Open encyclopedia contents index"
                className="inline-flex items-center gap-1 min-h-[34px] px-2.5 py-1 rounded-[4px] text-[11px] font-medium uppercase tracking-[0.1em] border border-[var(--gold-hairline)] text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
              >
                <List className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span>Index</span>
              </button>
              <button
                type="button"
                onClick={handleToggleBookmark}
                aria-label={isCurrentBookmarked ? 'Remove bookmark' : 'Bookmark page'}
                className="inline-flex items-center justify-center min-w-[34px] min-h-[34px] rounded-[4px] border border-[var(--gold-hairline)] text-[var(--accent-gold)] hover:border-[var(--accent-gold)] active:scale-[0.96] transition-all duration-150 cursor-pointer"
              >
                <Bookmark
                  className="w-3.5 h-3.5"
                  fill={isCurrentBookmarked ? 'currentColor' : 'none'}
                />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleToggleAboutDev}
            aria-pressed={isAboutDevOpen}
            aria-label="About the Developer — Ammir Awwab"
            className={`inline-flex items-center gap-1.5 lg:gap-2 rounded-[4px] text-[11px] lg:text-xs font-medium uppercase tracking-[0.1em] lg:tracking-[0.14em] border active:scale-[0.98] transition-all duration-150 ease-[var(--ease-fluent)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] ${
              isMobileReadingLandscape
                ? 'min-h-[34px] px-2 py-1'
                : 'min-h-[38px] px-2.5 lg:px-4 py-1.5'
            } ${
              isAboutDevOpen
                ? 'border-[var(--accent-gold)] bg-[var(--accent-emerald)] text-[#F1EBE0] shadow-[var(--shadow-elev-1)]'
                : 'border-[var(--gold-hairline)] text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]'
            }`}
          >
            <UserRound
              className={`w-3.5 h-3.5 shrink-0 ${
                isAboutDevOpen
                  ? 'text-[#D4B46A]'
                  : 'text-[var(--accent-gold)]'
              }`}
            />
            <span>ABOUT DEV</span>
          </button>

          <button
            type="button"
            onClick={toggleAppearance}
            aria-label={
              appearance === 'dark'
                ? 'Switch to light parchment appearance'
                : 'Switch to dark midnight emerald appearance'
            }
            className={`inline-flex items-center gap-1.5 lg:gap-2 rounded-[4px] text-[11px] lg:text-xs font-medium uppercase tracking-[0.1em] lg:tracking-[0.14em] border border-[var(--gold-hairline)] text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.98] transition-all duration-150 ease-[var(--ease-fluent)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] ${
              isMobileReadingLandscape
                ? 'min-h-[34px] px-2 py-1'
                : 'min-h-[38px] px-2.5 lg:px-4 py-1.5'
            }`}
          >
            {appearance === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                {!isMobileReadingLandscape && (
                  <span className="hidden sm:inline">Light</span>
                )}
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                {!isMobileReadingLandscape && (
                  <span className="hidden sm:inline">Dark</span>
                )}
              </>
            )}
          </button>
        </div>
      </header>

      {/* MAIN READING DESK STAGE */}
      <main
        className={`relative z-10 flex-1 flex flex-col items-center justify-center ${
          isMobileReadingLandscape ? 'py-1' : 'py-2 sm:py-3'
        }`}
      >
        {isQcGalleryRoute ? (
          <Suspense
            fallback={
              <div className="py-16 text-xs uppercase tracking-[0.18em] text-[var(--page-muted)]">
                Loading Illustration QC Gallery&hellip;
              </div>
            }
          >
            <IllustrationQcGallery
              records={illustrationRecords}
              onNavigateToTopic={handleNavigateToTopic}
              onExitGallery={handleExitQcGallery}
            />
          </Suspense>
        ) : isAboutDevOpen ? (
          <Suspense
            fallback={
              <div className="py-16 text-xs uppercase tracking-[0.18em] text-[var(--page-muted)]">
                Loading Developer Profile&hellip;
              </div>
            }
          >
            <AboutDevPage
              datasetsByChapter={datasetsByChapter}
              illustrationRecords={illustrationRecords}
              onReturnToBook={handleCloseAboutDev}
              onOpenChapter={handleOpenChapterFromAbout}
              onOpenTopic={handleNavigateToTopic}
            />
          </Suspense>
        ) : bookPhase !== 'open' ? (
          <div className="relative w-full flex items-center justify-center book-stage">
            <div
              className={`w-full flex justify-center transition-all duration-600 ease-[var(--ease-fluent)] ${
                bookPhase === 'opening' || bookPhase === 'closing'
                  ? 'will-change-transform'
                  : ''
              }`}
              style={{
                transformOrigin: 'left center',
                transform:
                  bookPhase === 'opening'
                    ? 'translateX(12%) rotateY(-104deg) scale(1.04)'
                    : bookPhase === 'closing'
                    ? 'translateX(4%) rotateY(-14deg) scale(0.985)'
                    : undefined,
                opacity: bookPhase === 'opening' ? 0.14 : 1,
              }}
            >
              <LuxuryBookCover
                onOpenBook={handleOpenBook}
                isOpening={bookPhase === 'opening'}
                isClosing={bookPhase === 'closing'}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Keep BookEngine continuously mounted so mobile orientation switches never lose spread, folio, or scroll state */}
            <div
              aria-hidden={showRotatePrompt}
              className={
                showRotatePrompt
                  ? 'invisible pointer-events-none fixed inset-0 overflow-hidden opacity-0'
                  : 'w-full flex flex-col items-center'
              }
            >
              <BookEngine
                spreads={spreads}
                datasetsByChapter={datasetsByChapter}
                illustrationByTopicId={illustrationByTopicId}
                exploredTopicIds={exploredTopicIds}
                onToggleExploredTopic={handleToggleExploredTopic}
                currentSpreadIndex={currentSpreadIndex}
                focusedTopicId={focusedTopicId}
                focusedSideHint={focusedSideHint}
                onChangeSpread={handleChangeSpread}
                onNavigateToSpreadId={handleNavigateToSpreadId}
                onNavigateToTopic={handleNavigateToTopic}
                isBookmarked={isCurrentBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onOpenIndex={handleOpenIndex}
                justOpened={justOpened}
                isMobileLandscape={isMobileReadingLandscape}
              />
            </div>

            {isMobilePhone && (
              <MobileRotatePrompt
                visible={showRotatePrompt}
                currentPositionLabel={currentPositionLabel}
                onReturnToCover={handleReturnToCover}
                onOpenIndex={handleOpenIndex}
              />
            )}
          </>
        )}
      </main>

      <IndexDrawer
        isOpen={isIndexOpen}
        onClose={handleCloseIndex}
        currentSpreadId={activeSpread?.id ?? ''}
        focusedTopicId={focusedTopicId}
        datasetsByChapter={datasetsByChapter}
        exploredTopicIds={exploredTopicIds}
        currentPositionLabel={currentPositionLabel}
        onNavigate={handleNavigateToSpreadId}
        onNavigateToTopic={handleNavigateToTopic}
        onReturnToCover={handleReturnToCover}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
      />
    </div>
  );
}
