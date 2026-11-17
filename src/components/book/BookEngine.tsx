import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  List,
} from 'lucide-react';
import { findTopicLocation } from '../../data/encyclopediaLoader';
import {
  BookSpread,
  IllustrationRegistryEntry,
  RawChapterDataset,
} from '../../types/encyclopedia';
import { FolioRenderer } from './FolioRenderer';

interface BookEngineProps {
  spreads: BookSpread[];
  datasetsByChapter: Record<string, RawChapterDataset | undefined>;
  illustrationByTopicId: Record<string, IllustrationRegistryEntry>;
  exploredTopicIds: ReadonlySet<string>;
  onToggleExploredTopic: (topicId: string) => void;
  currentSpreadIndex: number;
  focusedTopicId: string | null;
  focusedSideHint: 'left' | 'right' | null;
  onChangeSpread: (index: number) => void;
  onNavigateToSpreadId: (spreadId: string) => void;
  onNavigateToTopic: (topicId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenIndex: () => void;
  justOpened: boolean;
  isMobileLandscape?: boolean;
}

interface FlipMeta {
  direction: 'next' | 'prev';
  fromIndex: number;
  toIndex: number;
}

export const BookEngine: React.FC<BookEngineProps> = React.memo(({
  spreads,
  datasetsByChapter,
  illustrationByTopicId,
  exploredTopicIds,
  onToggleExploredTopic,
  currentSpreadIndex,
  focusedTopicId,
  focusedSideHint,
  onChangeSpread,
  onNavigateToSpreadId,
  onNavigateToTopic,
  isBookmarked,
  onToggleBookmark,
  onOpenIndex,
  justOpened,
  isMobileLandscape = false,
}) => {
  const [mobileSide, setMobileSide] = useState<'left' | 'right'>('left');
  const [mobileTurnDir, setMobileTurnDir] = useState<'next' | 'prev' | null>(null);
  const [mobileTurnKey, setMobileTurnKey] = useState<number>(0);
  // React state holds only flip start/end metadata — never per-frame progress!
  const [flip, setFlip] = useState<FlipMeta | null>(null);
  const [hoverCorner, setHoverCorner] = useState<'left' | 'right' | null>(null);
  const [coverRevealOpacity, setCoverRevealOpacity] = useState(justOpened ? 1 : 0);

  const bookContainerRef = useRef<HTMLDivElement>(null);
  const flipLeafRef = useRef<HTMLDivElement>(null);
  const flipCastShadowRef = useRef<HTMLDivElement>(null);
  const flipFrontShadeRef = useRef<HTMLDivElement>(null);
  const flipBackShadeRef = useRef<HTMLDivElement>(null);
  const flipHighlightCrestRef = useRef<HTMLDivElement>(null);
  const mobileFolioFrameRef = useRef<HTMLDivElement>(null);
  const preloadedUrlsRef = useRef<Set<string>>(new Set());

  const animFrameRef = useRef<number | null>(null);
  const flipProgressRef = useRef<number>(0);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    direction: 'next' | 'prev';
    width: number;
    fromIndex: number;
    toIndex: number;
  } | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Silently preload adjacent spread plates (±1 spread) so page turns display plates instantaneously
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const neighborIndices = [currentSpreadIndex - 1, currentSpreadIndex + 1];
    for (const idx of neighborIndices) {
      const sp = spreads[idx];
      if (!sp) continue;
      for (const sideFolio of [sp.left, sp.right]) {
        const topicId = sideFolio.rawEntry?.id;
        if (!topicId) continue;
        const rec = illustrationByTopicId[topicId];
        if (rec?.assetExists && rec.assetPath && !preloadedUrlsRef.current.has(rec.assetPath)) {
          preloadedUrlsRef.current.add(rec.assetPath);
          const img = new window.Image();
          img.decoding = 'async';
          img.src = rec.assetPath;
        }
      }
    }
  }, [currentSpreadIndex, illustrationByTopicId, spreads]);

  // Apply curved 3D paper turn transform & lighting directly to compositor DOM nodes (60 FPS, zero React re-renders)
  const applyFlipVisuals = useCallback(
    (progress: number, direction: 'next' | 'prev') => {
      flipProgressRef.current = progress;
      const p = Math.max(0, Math.min(1, progress));
      const arc = Math.sin(p * Math.PI);
      const angle = direction === 'next' ? -p * 180 : p * 180;
      const liftZ = arc * 24;
      const tiltX = arc * 1.25;
      const bowY = 1 + arc * 0.011;
      const skewY = (direction === 'next' ? -1 : 1) * arc * 1.5;

      if (flipLeafRef.current) {
        flipLeafRef.current.style.transform = `translate3d(0, 0, ${liftZ.toFixed(1)}px) rotateY(${angle.toFixed(2)}deg) rotateX(${tiltX.toFixed(2)}deg) skewY(${skewY.toFixed(2)}deg) scaleY(${bowY.toFixed(4)})`;
      }

      if (flipCastShadowRef.current) {
        const isFirstHalf = p < 0.5;
        const opacity = (0.3 * arc).toFixed(3);
        const midOpacity = (0.09 * arc).toFixed(3);
        const sideRightToLeft =
          (direction === 'next' && isFirstHalf) ||
          (direction === 'prev' && !isFirstHalf);
        flipCastShadowRef.current.style.left = isFirstHalf
          ? direction === 'next'
            ? '50%'
            : '0%'
          : direction === 'next'
          ? '0%'
          : '50%';
        flipCastShadowRef.current.style.background = sideRightToLeft
          ? `linear-gradient(to right, rgba(0,0,0,${opacity}), rgba(0,0,0,${midOpacity}) 42%, transparent 90%)`
          : `linear-gradient(to left, rgba(0,0,0,${opacity}), rgba(0,0,0,${midOpacity}) 42%, transparent 90%)`;
      }

      if (flipFrontShadeRef.current) {
        flipFrontShadeRef.current.style.background = `linear-gradient(${
          direction === 'next' ? 'to left' : 'to right'
        }, rgba(255,255,255,${(0.11 * arc).toFixed(
          3
        )}) 0%, transparent 40%, rgba(0,0,0,${(0.24 * p).toFixed(3)}) 100%)`;
      }

      if (flipBackShadeRef.current) {
        flipBackShadeRef.current.style.background = `linear-gradient(${
          direction === 'next' ? 'to right' : 'to left'
        }, rgba(255,255,255,${(0.09 * arc).toFixed(
          3
        )}) 0%, transparent 42%, rgba(0,0,0,${(0.24 * (1 - p)).toFixed(
          3
        )}) 100%)`;
      }

      if (flipHighlightCrestRef.current) {
        const crestPos = direction === 'next' ? 100 - p * 100 : p * 100;
        flipHighlightCrestRef.current.style.opacity = (0.68 * arc).toFixed(3);
        flipHighlightCrestRef.current.style.background = `linear-gradient(90deg, transparent ${Math.max(
          0,
          crestPos - 18
        ).toFixed(1)}%, rgba(255,250,235,0.28) ${crestPos.toFixed(
          1
        )}%, transparent ${Math.min(100, crestPos + 18).toFixed(1)}%)`;
      }
    },
    []
  );

  // Sync mobile side when jumping directly to a topic on left or right folio
  useEffect(() => {
    if (focusedSideHint) {
      setMobileSide(focusedSideHint);
    }
  }, [focusedSideHint, focusedTopicId]);

  useEffect(() => {
    if (!justOpened) return;
    setCoverRevealOpacity(1);
    const t = window.setTimeout(() => setCoverRevealOpacity(0), 620);
    return () => window.clearTimeout(t);
  }, [justOpened]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const animateFlipProgress = useCallback(
    (
      direction: 'next' | 'prev',
      fromIndex: number,
      toIndex: number,
      startProgress: number,
      targetProgress: number,
      durationMs: number,
      onComplete: () => void
    ) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (prefersReducedMotion) {
        onComplete();
        return;
      }

      setFlip({ direction, fromIndex, toIndex });
      flipProgressRef.current = startProgress;

      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / durationMs);
        // Fluent deceleration with soft spring-like tail settle
        const eased =
          t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const current = startProgress + (targetProgress - startProgress) * eased;

        applyFlipVisuals(current, direction);

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          setFlip(null);
          onComplete();
        }
      };

      // Initialize visuals on first mounted frame
      animFrameRef.current = requestAnimationFrame(() => {
        applyFlipVisuals(startProgress, direction);
        animFrameRef.current = requestAnimationFrame(step);
      });
    },
    [applyFlipVisuals, prefersReducedMotion]
  );

  const turnToIndex = useCallback(
    (targetIdx: number) => {
      if (flip) return;
      if (targetIdx < 0 || targetIdx >= spreads.length) return;
      if (targetIdx === currentSpreadIndex) return;

      const direction: 'next' | 'prev' =
        targetIdx > currentSpreadIndex ? 'next' : 'prev';

      if (prefersReducedMotion) {
        onChangeSpread(targetIdx);
        return;
      }

      animateFlipProgress(
        direction,
        currentSpreadIndex,
        targetIdx,
        0,
        1,
        580,
        () => {
          onChangeSpread(targetIdx);
        }
      );
    },
    [
      animateFlipProgress,
      currentSpreadIndex,
      flip,
      onChangeSpread,
      prefersReducedMotion,
      spreads.length,
    ]
  );

  const handleTopicStep = useCallback(
    (topicId: string) => {
      const loc = findTopicLocation(spreads, topicId);
      if (!loc) return;
      if (loc.spreadIndex !== currentSpreadIndex) {
        if (window.innerWidth >= 1024) {
          turnToIndex(loc.spreadIndex);
        } else {
          onNavigateToTopic(topicId);
        }
      }
      onNavigateToTopic(topicId);
    },
    [currentSpreadIndex, onNavigateToTopic, spreads, turnToIndex]
  );

  const handleNextDesktop = useCallback(() => {
    if (currentSpreadIndex < spreads.length - 1) {
      turnToIndex(currentSpreadIndex + 1);
    }
  }, [currentSpreadIndex, spreads.length, turnToIndex]);

  const handlePrevDesktop = useCallback(() => {
    if (currentSpreadIndex > 0) {
      turnToIndex(currentSpreadIndex - 1);
    }
  }, [currentSpreadIndex, turnToIndex]);

  const handleNextMobile = useCallback(() => {
    if (mobileSide === 'left') {
      setMobileTurnDir('next');
      setMobileTurnKey((k) => k + 1);
      setMobileSide('right');
    } else if (currentSpreadIndex < spreads.length - 1) {
      setMobileTurnDir('next');
      setMobileTurnKey((k) => k + 1);
      onChangeSpread(currentSpreadIndex + 1);
      setMobileSide('left');
    }
  }, [currentSpreadIndex, mobileSide, onChangeSpread, spreads.length]);

  const handlePrevMobile = useCallback(() => {
    if (mobileSide === 'right') {
      setMobileTurnDir('prev');
      setMobileTurnKey((k) => k + 1);
      setMobileSide('left');
    } else if (currentSpreadIndex > 0) {
      setMobileTurnDir('prev');
      setMobileTurnKey((k) => k + 1);
      onChangeSpread(currentSpreadIndex - 1);
      setMobileSide('right');
    }
  }, [currentSpreadIndex, mobileSide, onChangeSpread]);

  const prevSpreadRef = useRef(currentSpreadIndex);
  useEffect(() => {
    if (Math.abs(currentSpreadIndex - prevSpreadRef.current) > 1 && !focusedSideHint) {
      setMobileSide('left');
    }
    prevSpreadRef.current = currentSpreadIndex;
  }, [currentSpreadIndex, focusedSideHint]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (window.innerWidth < 1024) {
          handleNextMobile();
        } else {
          handleNextDesktop();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (window.innerWidth < 1024) {
          handlePrevMobile();
        } else {
          handlePrevDesktop();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNextDesktop, handleNextMobile, handlePrevDesktop, handlePrevMobile]);

  const handleCornerPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    direction: 'next' | 'prev'
  ) => {
    if (flip) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    // Selection-safe & interactive-element guard
    if (
      typeof window !== 'undefined' &&
      window.getSelection &&
      (window.getSelection()?.toString().length ?? 0) > 0
    ) {
      return;
    }
    const target = e.target as HTMLElement | null;
    if (target?.closest('a, button, summary, input, details')) {
      return;
    }

    if (direction === 'next' && currentSpreadIndex >= spreads.length - 1) return;
    if (direction === 'prev' && currentSpreadIndex <= 0) return;

    const rect = bookContainerRef.current?.getBoundingClientRect();
    const halfWidth = rect ? rect.width / 2 : 580;
    const targetIdx =
      direction === 'next' ? currentSpreadIndex + 1 : currentSpreadIndex - 1;

    dragRef.current = {
      active: true,
      startX: e.clientX,
      direction,
      width: halfWidth,
      fromIndex: currentSpreadIndex,
      toIndex: targetIdx,
    };

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFlip({
      direction,
      fromIndex: currentSpreadIndex,
      toIndex: targetIdx,
    });
    flipProgressRef.current = 0.02;
    requestAnimationFrame(() => applyFlipVisuals(0.02, direction));
  };

  const handleCornerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current?.active) return;
    const { startX, direction, width } = dragRef.current;
    const delta = direction === 'next' ? startX - e.clientX : e.clientX - startX;
    const rawProgress = Math.max(0.01, Math.min(0.99, delta / (width * 0.85)));
    applyFlipVisuals(rawProgress, direction);
  };

  const handleCornerPointerUp = () => {
    if (!dragRef.current?.active) return;
    const { direction, fromIndex, toIndex } = dragRef.current;
    const currentProgress = flipProgressRef.current;
    dragRef.current = null;

    if (currentProgress > 0.25) {
      animateFlipProgress(
        direction,
        fromIndex,
        toIndex,
        currentProgress,
        1,
        300,
        () => {
          onChangeSpread(toIndex);
        }
      );
    } else if (currentProgress < 0.05) {
      // Quick click on the page corner completes the page turn smoothly
      animateFlipProgress(
        direction,
        fromIndex,
        toIndex,
        currentProgress,
        1,
        500,
        () => {
          onChangeSpread(toIndex);
        }
      );
    } else {
      animateFlipProgress(
        direction,
        fromIndex,
        toIndex,
        currentProgress,
        0,
        240,
        () => {
          setFlip(null);
        }
      );
    }
  };

  const touchStartRef = useRef<{ x: number; y: number; active: boolean } | null>(
    null
  );
  const handleMobileTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      active: true,
    };
    if (mobileFolioFrameRef.current) {
      mobileFolioFrameRef.current.style.willChange = 'transform';
      mobileFolioFrameRef.current.style.transition = 'none';
    }
  };

  const handleMobileTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current?.active || prefersReducedMotion) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) * 1.15 && Math.abs(dx) > 10) {
      const clampedDx = Math.max(-72, Math.min(72, dx * 0.35));
      const rotY = (clampedDx / 72) * -4.2;
      if (mobileFolioFrameRef.current) {
        mobileFolioFrameRef.current.style.transform = `translate3d(${clampedDx.toFixed(
          1
        )}px, 0, 0) rotateY(${rotY.toFixed(2)}deg)`;
      }
    }
  };

  const handleMobileTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (mobileFolioFrameRef.current) {
      mobileFolioFrameRef.current.style.transition =
        'transform 220ms var(--ease-fluent)';
      mobileFolioFrameRef.current.style.transform = '';
      mobileFolioFrameRef.current.style.willChange = 'auto';
    }
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.35) {
      if (dx < 0) handleNextMobile();
      else handlePrevMobile();
    }
  };

  const activeSpread = spreads[currentSpreadIndex];
  if (!activeSpread) return null;

  const staticLeftFolio =
    flip && flip.direction === 'prev'
      ? spreads[flip.toIndex].left
      : spreads[currentSpreadIndex].left;

  const staticRightFolio =
    flip && flip.direction === 'next'
      ? spreads[flip.toIndex].right
      : spreads[currentSpreadIndex].right;

  const flippingFrontFolio = flip
    ? flip.direction === 'next'
      ? spreads[flip.fromIndex].right
      : spreads[flip.fromIndex].left
    : null;

  const flippingBackFolio = flip
    ? flip.direction === 'next'
      ? spreads[flip.toIndex].left
      : spreads[flip.toIndex].right
    : null;

  const mobileFolio =
    mobileSide === 'left' ? activeSpread.left : activeSpread.right;

  // Derive active reading folio for accurate breadcrumbs and topic/global progress indicators
  const activeFocusFolio =
    focusedTopicId && activeSpread.right.rawEntry?.id === focusedTopicId
      ? activeSpread.right
      : focusedTopicId && activeSpread.left.rawEntry?.id === focusedTopicId
      ? activeSpread.left
      : activeSpread.left.rawEntry
      ? activeSpread.left
      : activeSpread.right;

  const activeChapter = activeFocusFolio.chapter ?? activeSpread.left.chapter;
  const activeTopicEntry = activeFocusFolio.rawEntry;
  const activeTopicNum = activeFocusFolio.topicIndexInChapter;
  const activeTotalInChapter = activeFocusFolio.totalTopicsInChapter ?? 50;
  const activeGlobalPos = activeFocusFolio.globalTopicNumber;
  const activeTotalGlobal = activeFocusFolio.totalGlobalTopics ?? 500;

  const progressRatio = Math.min(
    1,
    Math.max(
      0,
      activeGlobalPos
        ? activeGlobalPos / Math.max(1, activeTotalGlobal)
        : (currentSpreadIndex + 1) / spreads.length
    )
  );

  const chapterProgressLabel = activeChapter
    ? activeTopicNum
      ? `Chapter ${activeChapter.paddedNumber}: Topic ${String(activeTopicNum).padStart(2, '0')} of ${activeTotalInChapter}`
      : `Chapter ${activeChapter.paddedNumber}: ${activeChapter.title}`
    : activeSpread.sectionLabel;

  const globalProgressLabel = activeGlobalPos
    ? `Complete encyclopedia: ${String(activeGlobalPos).padStart(3, '0')} of ${activeTotalGlobal} topics`
    : `Spread ${currentSpreadIndex + 1} of ${spreads.length}`;

  const canGoPrevDesktop = currentSpreadIndex > 0;
  const canGoNextDesktop = currentSpreadIndex < spreads.length - 1;
  const canGoPrevMobile = currentSpreadIndex > 0 || mobileSide === 'right';
  const canGoNextMobile =
    currentSpreadIndex < spreads.length - 1 || mobileSide === 'left';

  return (
    <div className="w-full flex flex-col items-center">
      {/* ================================================================= */}
      {/* CLICKABLE BREADCRUMB & POSITION BAR (DESKTOP & TABLET)            */}
      {/* ================================================================= */}
      <nav
        aria-label="Reading location breadcrumb"
        className={
          isMobileLandscape
            ? 'hidden'
            : 'w-full max-w-[1360px] px-3 sm:px-5 pb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] text-[var(--page-muted)]'
        }
      >
        <ol className="flex flex-wrap items-center gap-1.5 min-w-0">
          <li>
            <button
              type="button"
              onClick={() => onNavigateToSpreadId('table-of-contents')}
              className="font-medium text-[var(--page-ink)] hover:text-[var(--accent-gold)] transition-colors duration-150 cursor-pointer"
            >
              Science of Creation
            </button>
          </li>

          {activeChapter ? (
            <>
              <li aria-hidden="true">&rsaquo;</li>
              <li className="min-w-0">
                <button
                  type="button"
                  onClick={() =>
                    onNavigateToSpreadId(`${activeChapter.id}-opening`)
                  }
                  className="hover:text-[var(--accent-gold)] transition-colors duration-150 truncate max-w-[260px] sm:max-w-xs block cursor-pointer tabular-nums"
                >
                  Chapter {activeChapter.paddedNumber}: {activeChapter.title}
                </button>
              </li>
            </>
          ) : (
            <>
              <li aria-hidden="true">&rsaquo;</li>
              <li className="text-[var(--accent-gold)] font-medium">
                {activeSpread.title}
              </li>
            </>
          )}

          {activeTopicEntry && activeTopicNum && (
            <>
              <li aria-hidden="true">&rsaquo;</li>
              <li className="text-[var(--accent-gold)] font-medium truncate max-w-[260px] sm:max-w-sm tabular-nums">
                Topic {String(activeTopicNum).padStart(2, '0')} (
                {activeTopicEntry.id}): {activeTopicEntry.title}
              </li>
            </>
          )}
        </ol>

        <div className="flex items-center gap-2.5 text-[11px] tabular-nums shrink-0">
          {activeGlobalPos && (
            <span>
              {String(activeGlobalPos).padStart(3, '0')} / {activeTotalGlobal}
            </span>
          )}
          <span aria-hidden="true">&middot;</span>
          <span>{exploredTopicIds.size} Explored</span>
        </div>
      </nav>

      {/* ================================================================= */}
      {/* ENLARGED DESKTOP TWO-PAGE PHYSICAL BOOK SPREAD (lg+)               */}
      {/* ================================================================= */}
      <div className="hidden lg:flex flex-col items-center w-full max-w-[1360px] px-4">
        <div
          ref={bookContainerRef}
          data-book-spread
          className="relative mx-auto book-stage select-none"
          style={{
            width: 'min(100%, calc(74dvh * 1.44))',
            aspectRatio: '1.44 / 1',
          }}
        >
          {/* Outer Hardcover Leather Binding Board */}
          <div
            className="absolute inset-0 rounded-[6px] p-2.5 xl:p-3 leather-grain border border-[#C8A253]/42 shadow-[0_32px_70px_-14px_rgba(0,0,0,0.65)] dark:shadow-[0_38px_85px_-12px_rgba(0,0,0,0.88)]"
            style={{
              background:
                'linear-gradient(135deg, #0E3428 0%, #061A14 50%, #03100C 100%)',
            }}
          >
            {/* Woven Top & Bottom Binding Headbands at Center Spine */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[6px] left-1/2 -translate-x-1/2 w-10 h-[4px] z-30 rounded-t-[2px] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(90deg, #C8A253 0px, #C8A253 3px, #123D2F 3px, #123D2F 6px)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[6px] left-1/2 -translate-x-1/2 w-10 h-[4px] z-30 rounded-b-[2px] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(90deg, #C8A253 0px, #C8A253 3px, #123D2F 3px, #123D2F 6px)',
              }}
            />

            {/* Silk Ribbon Bookmark */}
            <button
              type="button"
              onClick={onToggleBookmark}
              title={
                isBookmarked ? 'Remove ribbon bookmark' : 'Place ribbon bookmark'
              }
              aria-label={
                isBookmarked ? 'Remove ribbon bookmark' : 'Place ribbon bookmark'
              }
              className={`group absolute left-1/2 -translate-x-1/2 z-40 w-6 transition-all duration-300 ease-[var(--ease-fluent)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFC99B] ${
                isBookmarked ? '-top-2 h-14' : '-top-1 h-9 hover:h-11'
              }`}
            >
              <div
                className={`w-full h-full shadow-md transition-colors duration-200 ${
                  isBookmarked
                    ? 'bg-gradient-to-b from-[#9E2A2B] to-[#6E1718]'
                    : 'bg-gradient-to-b from-[#C8A253]/88 to-[#8C6D2E]/92 opacity-85 group-hover:opacity-100'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
                }}
              />
            </button>

            {/* Stacked Paper Edge Depth & Gilt Edges (book-3d-preserve ONLY during active 3D flip for crisp resting text!) */}
            <div
              className={`relative w-full h-full rounded-[3px] flex ${
                flip ? 'book-3d-preserve' : ''
              }`}
              style={{
                boxShadow:
                  '-3px 0 0 0 rgba(226, 214, 190, 0.45), -6px 0 0 0 rgba(201, 184, 150, 0.3), -9px 0 0 0 rgba(168, 146, 102, 0.22), 3px 0 0 0 rgba(226, 214, 190, 0.45), 6px 0 0 0 rgba(201, 184, 150, 0.3), 9px 0 0 0 rgba(168, 146, 102, 0.22), 0 6px 20px rgba(0, 0, 0, 0.36)',
              }}
            >
              {/* LEFT PAGE (VERSO) */}
              <div className="relative w-1/2 h-full overflow-hidden rounded-l-[3px] border-r border-[var(--hairline)]">
                <FolioRenderer
                  folio={staticLeftFolio}
                  datasetsByChapter={datasetsByChapter}
                  illustrationByTopicId={illustrationByTopicId}
                  focusedTopicId={focusedTopicId}
                  exploredTopicIds={exploredTopicIds}
                  onToggleExploredTopic={onToggleExploredTopic}
                  onNavigateToSpread={onNavigateToSpreadId}
                  onNavigateToTopic={handleTopicStep}
                />

                {/* Outer verso gilt hairline edge highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-r from-[#C8A253]/25 to-transparent"
                />

                {/* Authentic curved spine gutter lighting & depth on right margin of left page */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-14"
                  style={{
                    background:
                      'linear-gradient(to left, rgba(0,0,0,0.20) 0px, rgba(0,0,0,0.08) 12px, rgba(255,248,230,0.05) 26px, transparent 56px)',
                  }}
                />

                {canGoPrevDesktop && !flip && (
                  <div
                    role="button"
                    tabIndex={-1}
                    aria-label="Drag or click to turn to previous page"
                    onMouseEnter={() => setHoverCorner('left')}
                    onMouseLeave={() => setHoverCorner(null)}
                    onPointerDown={(e) => handleCornerPointerDown(e, 'prev')}
                    onPointerMove={handleCornerPointerMove}
                    onPointerUp={handleCornerPointerUp}
                    onPointerCancel={handleCornerPointerUp}
                    className="absolute inset-y-0 left-0 w-12 z-20 cursor-w-resize"
                  >
                    <div
                      className={`absolute bottom-0 left-0 w-10 h-10 transition-all duration-200 ease-[var(--ease-fluent)] pointer-events-none origin-bottom-left ${
                        hoverCorner === 'left'
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-75'
                      }`}
                      style={{
                        background:
                          'linear-gradient(45deg, transparent 50%, rgba(200,162,83,0.3) 51%, rgba(255,250,235,0.24) 100%)',
                        boxShadow: '2px -2px 8px rgba(0,0,0,0.22)',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* RIGHT PAGE (RECTO) */}
              <div className="relative w-1/2 h-full overflow-hidden rounded-r-[3px]">
                <FolioRenderer
                  folio={staticRightFolio}
                  datasetsByChapter={datasetsByChapter}
                  illustrationByTopicId={illustrationByTopicId}
                  focusedTopicId={focusedTopicId}
                  exploredTopicIds={exploredTopicIds}
                  onToggleExploredTopic={onToggleExploredTopic}
                  onNavigateToSpread={onNavigateToSpreadId}
                  onNavigateToTopic={handleTopicStep}
                />

                {/* Outer recto gilt hairline edge highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-[3px] bg-gradient-to-l from-[#C8A253]/25 to-transparent"
                />

                {/* Authentic curved spine gutter lighting & depth on left margin of right page */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-14"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(0,0,0,0.20) 0px, rgba(0,0,0,0.08) 12px, rgba(255,248,230,0.05) 26px, transparent 56px)',
                  }}
                />

                {canGoNextDesktop && !flip && (
                  <div
                    role="button"
                    tabIndex={-1}
                    aria-label="Drag or click to turn to next page"
                    onMouseEnter={() => setHoverCorner('right')}
                    onMouseLeave={() => setHoverCorner(null)}
                    onPointerDown={(e) => handleCornerPointerDown(e, 'next')}
                    onPointerMove={handleCornerPointerMove}
                    onPointerUp={handleCornerPointerUp}
                    onPointerCancel={handleCornerPointerUp}
                    className="absolute inset-y-0 right-0 w-12 z-20 cursor-e-resize"
                  >
                    <div
                      className={`absolute bottom-0 right-0 w-10 h-10 transition-all duration-200 ease-[var(--ease-fluent)] pointer-events-none origin-bottom-right ${
                        hoverCorner === 'right'
                          ? 'opacity-100 scale-100'
                          : 'opacity-40 scale-90'
                      }`}
                      style={{
                        background:
                          'linear-gradient(-45deg, transparent 50%, rgba(200,162,83,0.3) 51%, rgba(255,250,235,0.24) 100%)',
                        boxShadow: '-2px -2px 8px rgba(0,0,0,0.22)',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Subtle stitched center spine crease line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] z-20 bg-gradient-to-r from-black/25 via-black/50 to-black/25 opacity-65 dark:opacity-90"
              />

              {/* 60 FPS REF-DRIVEN 3D FLIPPING LEAF OVERLAY */}
              {flip && flippingFrontFolio && flippingBackFolio && (
                <>
                  {/* Soft Underneath Paper Cast Shadow */}
                  <div
                    ref={flipCastShadowRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 z-20 w-1/2"
                  />

                  {/* Curved Rotating Leaf */}
                  <div
                    ref={flipLeafRef}
                    className={`absolute top-0 bottom-0 w-1/2 z-30 book-3d-preserve pointer-events-none will-change-transform ${
                      flip.direction === 'next' ? 'left-1/2' : 'left-0'
                    }`}
                    style={{
                      transformOrigin:
                        flip.direction === 'next'
                          ? 'left center'
                          : 'right center',
                    }}
                  >
                    {/* Front Face */}
                    <div className="absolute inset-0 backface-hidden overflow-hidden rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.36)]">
                      <FolioRenderer
                        folio={flippingFrontFolio}
                        datasetsByChapter={datasetsByChapter}
                        illustrationByTopicId={illustrationByTopicId}
                        focusedTopicId={focusedTopicId}
                        exploredTopicIds={exploredTopicIds}
                        onToggleExploredTopic={onToggleExploredTopic}
                        onNavigateToSpread={onNavigateToSpreadId}
                        onNavigateToTopic={handleTopicStep}
                      />
                      <div
                        ref={flipFrontShadeRef}
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                      />
                      <div
                        ref={flipHighlightCrestRef}
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                      />
                    </div>

                    {/* Back Face */}
                    <div
                      className="absolute inset-0 backface-hidden overflow-hidden rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.36)]"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <FolioRenderer
                        folio={flippingBackFolio}
                        datasetsByChapter={datasetsByChapter}
                        illustrationByTopicId={illustrationByTopicId}
                        focusedTopicId={focusedTopicId}
                        exploredTopicIds={exploredTopicIds}
                        onToggleExploredTopic={onToggleExploredTopic}
                        onNavigateToSpread={onNavigateToSpreadId}
                        onNavigateToTopic={handleTopicStep}
                      />
                      <div
                        ref={flipBackShadeRef}
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {coverRevealOpacity > 0 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-40 bg-[#04120D] transition-opacity duration-600 ease-[var(--ease-fluent)]"
                  style={{ opacity: coverRevealOpacity * 0.6 }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Desktop Reading Control Bar & GPU ScaleX Progress Indicator */}
        <div className="w-full mt-3 flex items-center justify-between gap-6 px-2">
          <button
            type="button"
            onClick={handlePrevDesktop}
            disabled={!canGoPrevDesktop || Boolean(flip)}
            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] border border-[var(--gold-hairline)] bg-[var(--page-bg)] text-[var(--page-ink)] disabled:opacity-35 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.985] transition-all duration-150 ease-[var(--ease-fluent)] cursor-pointer disabled:cursor-not-allowed whitespace-nowrap shadow-[var(--shadow-elev-1)]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Spread</span>
          </button>

          <div className="flex-1 max-w-xl flex flex-col items-center gap-1.5">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--page-muted)] tabular-nums">
              <span className="font-medium text-[var(--page-ink)]">
                {chapterProgressLabel}
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>{globalProgressLabel}</span>
              <span aria-hidden="true">&middot;</span>
              <span>
                Spread {currentSpreadIndex + 1} / {spreads.length}
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Overall reading position"
              aria-valuenow={Math.round(progressRatio * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="w-full h-[3px] rounded-full bg-[var(--hairline)] overflow-hidden"
            >
              <div
                className="h-full w-full origin-left bg-[var(--accent-gold)] transition-transform duration-300 ease-[var(--ease-fluent)]"
                style={{ transform: `scaleX(${progressRatio})` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextDesktop}
            disabled={!canGoNextDesktop || Boolean(flip)}
            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] border border-[var(--gold-hairline)] bg-[var(--page-bg)] text-[var(--page-ink)] disabled:opacity-35 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.985] transition-all duration-150 ease-[var(--ease-fluent)] cursor-pointer disabled:cursor-not-allowed whitespace-nowrap shadow-[var(--shadow-elev-1)]"
          >
            <span>Next Spread</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* ENLARGED MOBILE LANDSCAPE & TABLET SINGLE-FOLIO VIEW (< lg)       */}
      {/* ================================================================= */}
      {isMobileLandscape ? (
        <div
          className="flex lg:hidden items-center justify-center w-full max-w-[840px] px-1.5 gap-1.5 book-stage"
          onTouchStart={handleMobileTouchStart}
          onTouchMove={handleMobileTouchMove}
          onTouchEnd={handleMobileTouchEnd}
        >
          <button
            type="button"
            onClick={handlePrevMobile}
            disabled={!canGoPrevMobile}
            aria-label="Previous folio page"
            className="inline-flex flex-col items-center justify-center min-w-[44px] h-[64px] shrink-0 rounded-[4px] border border-[var(--gold-hairline)] bg-[var(--page-bg)]/95 text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.96] transition-all duration-150 disabled:opacity-30 cursor-pointer shadow-[var(--shadow-elev-1)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={mobileFolioFrameRef}
            className="relative flex-1 min-w-0 h-[calc(100dvh-3.5rem)] max-h-[520px] rounded-[6px] p-1.5 leather-grain border border-[var(--gold-hairline)] shadow-[0_18px_40px_-10px_rgba(0,0,0,0.62)] bg-[#072018]"
          >
            {/* Slim top 2px progress line integrated along bezel */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-2 right-2 h-[2px] bg-[var(--hairline)] overflow-hidden rounded-full z-20"
            >
              <div
                className="h-full w-full origin-left bg-[var(--accent-gold)] transition-transform duration-300 ease-[var(--ease-fluent)]"
                style={{ transform: `scaleX(${progressRatio})` }}
              />
            </div>

            <div
              key={`${activeSpread.id}-${mobileSide}-${mobileFolio.folioNumber}-${mobileTurnKey}`}
              className={`w-full h-full rounded-[3px] overflow-hidden bg-[var(--page-bg)] ${
                mobileTurnDir === 'next'
                  ? 'animate-mobile-next'
                  : mobileTurnDir === 'prev'
                  ? 'animate-mobile-prev'
                  : ''
              }`}
            >
              <FolioRenderer
                folio={mobileFolio}
                datasetsByChapter={datasetsByChapter}
                illustrationByTopicId={illustrationByTopicId}
                focusedTopicId={focusedTopicId}
                exploredTopicIds={exploredTopicIds}
                isCompactLandscape
                onToggleExploredTopic={onToggleExploredTopic}
                onNavigateToSpread={onNavigateToSpreadId}
                onNavigateToTopic={handleTopicStep}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextMobile}
            disabled={!canGoNextMobile}
            aria-label="Next folio page"
            className="inline-flex flex-col items-center justify-center min-w-[44px] h-[64px] shrink-0 rounded-[4px] border border-[var(--gold-hairline)] bg-[var(--page-bg)]/95 text-[var(--page-ink)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.96] transition-all duration-150 disabled:opacity-30 cursor-pointer shadow-[var(--shadow-elev-1)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          className="flex lg:hidden flex-col items-center w-full max-w-2xl px-2.5 pb-16 book-stage"
          onTouchStart={handleMobileTouchStart}
          onTouchMove={handleMobileTouchMove}
          onTouchEnd={handleMobileTouchEnd}
        >
          <div
            ref={mobileFolioFrameRef}
            className="relative w-full h-[calc(100dvh-10.25rem)] max-h-[820px] rounded-[6px] p-1.5 leather-grain border border-[var(--gold-hairline)] shadow-[0_20px_48px_-12px_rgba(0,0,0,0.55)] bg-[#072018]"
          >
            <div
              key={`${activeSpread.id}-${mobileSide}-${mobileFolio.folioNumber}-${mobileTurnKey}`}
              className={`w-full h-full rounded-[3px] overflow-hidden bg-[var(--page-bg)] ${
                mobileTurnDir === 'next'
                  ? 'animate-mobile-next'
                  : mobileTurnDir === 'prev'
                  ? 'animate-mobile-prev'
                  : ''
              }`}
            >
              <FolioRenderer
                folio={mobileFolio}
                datasetsByChapter={datasetsByChapter}
                illustrationByTopicId={illustrationByTopicId}
                focusedTopicId={focusedTopicId}
                exploredTopicIds={exploredTopicIds}
                onToggleExploredTopic={onToggleExploredTopic}
                onNavigateToSpread={onNavigateToSpreadId}
                onNavigateToTopic={handleTopicStep}
              />
            </div>
          </div>

          {/* Fixed Compact Tablet Navigation Dock */}
          <div className="fixed bottom-0 inset-x-0 z-30 h-14 px-3 bg-[var(--page-bg)] border-t border-[var(--gold-hairline)] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2">
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--hairline)] overflow-hidden"
            >
              <div
                className="h-full w-full origin-left bg-[var(--accent-gold)] transition-transform duration-300 ease-[var(--ease-fluent)]"
                style={{ transform: `scaleX(${progressRatio})` }}
              />
            </div>
            <button
              type="button"
              onClick={handlePrevMobile}
              disabled={!canGoPrevMobile}
              aria-label="Previous folio page"
              className="inline-flex items-center gap-1 min-h-[44px] px-3 rounded-[4px] text-xs font-medium text-[var(--page-ink)] hover:text-[var(--accent-gold)] active:scale-[0.97] transition-all duration-150 disabled:opacity-35 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={onOpenIndex}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2.5 rounded-[4px] text-xs font-medium text-[var(--accent-gold)] active:scale-[0.98] transition-transform truncate cursor-pointer tabular-nums"
              >
                <List className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {mobileFolio.rawEntry
                    ? `T${String(mobileFolio.topicIndexInChapter ?? 1).padStart(2, '0')} · ${mobileFolio.rawEntry.id}`
                    : `Folio ${String(mobileFolio.folioNumber).padStart(3, '0')}`}
                </span>
              </button>
              <button
                type="button"
                onClick={onToggleBookmark}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark page'}
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-[4px] text-[var(--accent-gold)] active:scale-[0.95] transition-transform cursor-pointer"
              >
                <Bookmark
                  className="w-4 h-4"
                  fill={isBookmarked ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextMobile}
              disabled={!canGoNextMobile}
              aria-label="Next folio page"
              className="inline-flex items-center gap-1 min-h-[44px] px-3 rounded-[4px] text-xs font-medium text-[var(--page-ink)] hover:text-[var(--accent-gold)] active:scale-[0.97] transition-all duration-150 disabled:opacity-35 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

BookEngine.displayName = 'BookEngine';
