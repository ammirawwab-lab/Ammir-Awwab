import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  BookOpen,
  Check,
  ChevronRight,
  Trash2,
  X,
} from 'lucide-react';
import { CHAPTERS } from '../../data/chapters';
import { BookmarkEntry, RawChapterDataset } from '../../types/encyclopedia';
import { ChapterMotifIcon } from '../ornaments/IslamicOrnaments';

interface IndexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpreadId: string;
  focusedTopicId: string | null;
  datasetsByChapter: Record<string, RawChapterDataset | undefined>;
  exploredTopicIds: ReadonlySet<string>;
  currentPositionLabel: string;
  onNavigate: (spreadId: string) => void;
  onNavigateToTopic: (topicId: string) => void;
  onReturnToCover: () => void;
  bookmarks: BookmarkEntry[];
  onRemoveBookmark: (spreadId: string) => void;
}

export const IndexDrawer: React.FC<IndexDrawerProps> = React.memo(({
  isOpen,
  onClose,
  currentSpreadId,
  focusedTopicId,
  datasetsByChapter,
  exploredTopicIds,
  currentPositionLabel,
  onNavigate,
  onNavigateToTopic,
  onReturnToCover,
  bookmarks,
  onRemoveBookmark,
}) => {
  const activeChapterFromSpread =
    CHAPTERS.find((c) => currentSpreadId.startsWith(c.id))?.id ?? 'chapter-01';

  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(
    activeChapterFromSpread
  );

  useEffect(() => {
    if (isOpen) {
      setExpandedChapterId(activeChapterFromSpread);
    }
  }, [isOpen, activeChapterFromSpread]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalLoadedTopics = CHAPTERS.reduce(
    (acc, c) => acc + (datasetsByChapter[c.id]?.entries.length ?? 0),
    0
  );

  const handleSelect = (spreadId: string) => {
    onNavigate(spreadId);
    onClose();
  };

  const handleSelectTopic = (topicId: string) => {
    onNavigateToTopic(topicId);
    onClose();
  };

  const exploredRatio = Math.min(
    1,
    Math.max(0, totalLoadedTopics > 0 ? exploredTopicIds.size / totalLoadedTopics : 0)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/65 animate-fluent-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Numbered Table of Contents and Bookmarks"
    >
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      <aside className="w-full max-w-md h-full bg-[var(--page-bg)] text-[var(--page-ink)] border-l border-[var(--gold-hairline)] shadow-[var(--shadow-elev-2)] flex flex-col animate-fluent-drawer">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--hairline)]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-gold)]">
              Numbered Table of Contents
            </p>
            <h2 className="font-editorial text-2xl font-semibold">
              Volume Navigation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close table of contents"
            className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] border border-[var(--hairline)] hover:border-[var(--accent-gold)] text-[var(--page-ink)] hover:text-[var(--accent-gold)] active:scale-[0.96] transition-all duration-150 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto folio-scroll px-6 py-5 space-y-6">
          {/* Reading Location vs Explored Progress Summary */}
          <section
            aria-label="Reading progress overview"
            className="p-3.5 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/70 rounded-[4px] space-y-1.5 text-xs"
          >
            <div className="flex items-center justify-between gap-2 text-[10.5px] uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
              <span>Current Location &amp; Progress</span>
              <span className="tabular-nums">
                {exploredTopicIds.size} / {totalLoadedTopics || 500} Explored
              </span>
            </div>
            <p className="font-medium text-[var(--page-ink)] tabular-nums">
              {currentPositionLabel}
            </p>
            <div className="w-full h-[3px] rounded-full bg-[var(--hairline)] overflow-hidden">
              <div
                className="h-full w-full origin-left bg-[var(--accent-gold)] transition-transform duration-300 ease-[var(--ease-fluent)]"
                style={{ transform: `scaleX(${exploredRatio})` }}
              />
            </div>
          </section>

          {/* Opening & Methodology Sections */}
          <section className="space-y-2">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)] font-semibold">
              00. Front Matter &amp; Methodology
            </h3>
            <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)] rounded-sm">
              <button
                type="button"
                onClick={() => {
                  onReturnToCover();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm hover:bg-[var(--page-bg-secondary)] transition-colors text-left cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Closed Hardcover</span>
                </span>
                <span className="text-[11px] text-[var(--page-muted)]">
                  Cover
                </span>
              </button>
              {[
                {
                  id: 'intro-welcome',
                  label: '01. Welcome & Why This Book Exists',
                  folios: 'Folios 001–002',
                },
                {
                  id: 'intro-reflection',
                  label: '02–03. Looking Around & Clear Science',
                  folios: 'Folios 003–004',
                },
                {
                  id: 'intro-methodology',
                  label: '04–05. How to Use & Check Topics',
                  folios: 'Folios 005–006',
                },
                {
                  id: 'intro-grading',
                  label: '06–07. Grades (A–D) & Trusted Sources',
                  folios: 'Folios 007–008',
                },
                {
                  id: 'intro-responsibility',
                  label: '08–09. Honesty, Care & Thank You',
                  folios: 'Folios 009–010',
                },
                {
                  id: 'intro-invitation',
                  label: '10. Start Exploring & 10-Chapter Map',
                  folios: 'Folios 011–012',
                },
                {
                  id: 'table-of-contents',
                  label: 'Complete Table of Contents',
                  folios: 'Folios 013–014',
                },
              ].map((item) => {
                const active = currentSpreadId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    aria-current={active ? 'location' : undefined}
                    className={`relative w-full flex items-center justify-between px-3.5 py-2 text-sm hover:bg-[var(--page-bg-secondary)] transition-colors duration-150 text-left cursor-pointer ${
                      active
                        ? 'bg-[var(--page-bg-secondary)] text-[var(--accent-gold)] font-semibold'
                        : ''
                    }`}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-[var(--accent-gold)]"
                      />
                    )}
                    <span className="truncate">
                      {active ? `Active · ${item.label}` : item.label}
                    </span>
                    <span className="text-[11px] text-[var(--page-muted)] tabular-nums shrink-0 ml-2">
                      {item.folios}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Saved Ribbon Bookmarks */}
          <section className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)] font-semibold">
                Ribbon Bookmarks
              </h3>
              <span className="text-[11px] text-[var(--page-muted)] tabular-nums">
                {bookmarks.length} Saved
              </span>
            </div>
            {bookmarks.length === 0 ? (
              <p className="text-xs text-[var(--page-muted)] py-3 px-3.5 border border-[var(--hairline)] rounded-sm">
                No folios bookmarked yet. Select the silk ribbon at the top edge
                of any open spread to save your place.
              </p>
            ) : (
              <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)] rounded-sm">
                {bookmarks.map((bm) => (
                  <div
                    key={bm.spreadId}
                    className="flex items-center justify-between gap-2 px-3.5 py-2.5 hover:bg-[var(--page-bg-secondary)] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(bm.spreadId)}
                      className="flex-1 flex items-center gap-2.5 text-left min-w-0 cursor-pointer"
                    >
                      <Bookmark
                        className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0"
                        fill="currentColor"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {bm.title}
                        </div>
                        <div className="text-[11px] text-[var(--page-muted)] truncate">
                          {bm.sectionLabel}
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(bm.spreadId)}
                      aria-label={`Remove bookmark for ${bm.title}`}
                      className="p-1.5 text-[var(--page-muted)] hover:text-[var(--page-ink)] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Ten Chapters (Expandable to all 50 ordered topics) */}
          <section className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)] font-semibold">
                Chapters 01 &ndash; 10
              </h3>
              <span className="text-[11px] text-[var(--page-muted)] tabular-nums">
                {totalLoadedTopics} Topics
              </span>
            </div>

            <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)] rounded-sm">
              {CHAPTERS.map((chapter) => {
                const dataset = datasetsByChapter[chapter.id];
                const isActive = currentSpreadId.startsWith(chapter.id);
                const isExpanded = expandedChapterId === chapter.id;

                return (
                  <div key={chapter.id}>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleSelect(`${chapter.id}-opening`)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`relative flex-1 flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-[var(--page-bg-secondary)] transition-colors duration-150 cursor-pointer min-w-0 ${
                          isActive ? 'bg-[var(--page-bg-secondary)]' : ''
                        }`}
                      >
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute left-1 top-2 bottom-2 w-[2.5px] rounded-full bg-[var(--accent-gold)]"
                          />
                        )}
                        <span className="text-xs font-semibold text-[var(--accent-gold)] tabular-nums shrink-0">
                          {chapter.paddedNumber}
                        </span>
                        <span className="text-[var(--accent-gold)] shrink-0">
                          <ChapterMotifIcon
                            motif={chapter.theme.motifType}
                            className="w-4 h-4"
                          />
                        </span>
                        <span
                          className={`flex-1 text-sm truncate ${
                            isActive
                              ? 'text-[var(--accent-gold)] font-semibold'
                              : ''
                          }`}
                        >
                          {chapter.title}
                        </span>
                        {isActive && (
                          <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--accent-gold)] font-medium shrink-0">
                            Active
                          </span>
                        )}
                      </button>

                      {dataset && dataset.entries.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedChapterId(isExpanded ? null : chapter.id)
                          }
                          aria-expanded={isExpanded}
                          aria-label={`Toggle Chapter ${chapter.paddedNumber} (${chapter.title}) 50-topic list`}
                          className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
                        >
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ease-[var(--ease-fluent)] ${
                              isExpanded ? 'rotate-90 text-[var(--accent-gold)]' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {dataset && isExpanded && (
                      <div className="bg-[var(--page-bg-secondary)]/55 border-t border-[var(--hairline)] max-h-72 overflow-y-auto folio-scroll divide-y divide-[var(--hairline)]">
                        <div className="px-4 py-2 flex items-center justify-between text-[11px] bg-[var(--page-bg)]/50">
                          <button
                            type="button"
                            onClick={() =>
                              handleSelect(`${chapter.id}-opening`)
                            }
                            className="text-[var(--accent-gold)] font-medium hover:underline cursor-pointer"
                          >
                            Chapter {chapter.paddedNumber} Directory (50) &rarr;
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelect(`${chapter.id}-introduction`)
                            }
                            className="text-[var(--page-muted)] hover:text-[var(--accent-gold)] cursor-pointer"
                          >
                            Chapter Intro
                          </button>
                        </div>

                        {dataset.entries.map((entry, idx) => {
                          const topicNum = String(idx + 1).padStart(2, '0');
                          const isCurrent = focusedTopicId === entry.id;
                          const isExplored = exploredTopicIds.has(entry.id);
                          return (
                            <button
                              key={entry.id}
                              type="button"
                              onClick={() => handleSelectTopic(entry.id)}
                              aria-current={isCurrent ? 'page' : undefined}
                              className={`relative w-full flex items-center justify-between gap-2 pl-6 pr-3.5 py-2 text-left text-xs hover:bg-[var(--page-bg)] transition-colors duration-150 cursor-pointer ${
                                isCurrent
                                  ? 'text-[var(--accent-gold)] font-semibold bg-[var(--page-bg)]'
                                  : 'text-[var(--page-muted)]'
                              }`}
                            >
                              {isCurrent && (
                                <span
                                  aria-hidden="true"
                                  className="absolute left-1.5 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-[var(--accent-gold)]"
                                />
                              )}
                              <span className="truncate">
                                <span className="text-[var(--accent-gold)] tabular-nums mr-1.5 font-medium">
                                  Topic {topicNum} ({entry.id})
                                </span>
                                <span className="text-[var(--page-ink)]">
                                  {entry.title}
                                </span>
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-[10px] tabular-nums shrink-0">
                                {isCurrent && (
                                  <span className="text-[var(--accent-gold)] font-semibold">
                                    Reading
                                  </span>
                                )}
                                {isExplored && !isCurrent && (
                                  <Check
                                    aria-label="Explored"
                                    className="w-3 h-3 text-[var(--accent-gold)]"
                                  />
                                )}
                                <span>
                                  Fig. {chapter.paddedNumber}.{topicNum}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
});

IndexDrawer.displayName = 'IndexDrawer';
