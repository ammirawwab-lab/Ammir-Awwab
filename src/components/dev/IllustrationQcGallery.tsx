import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  EyeOff,
  FileWarning,
  Layers,
} from 'lucide-react';
import {
  CLASSIFICATION_DISPLAY_LABELS,
  getIllustrationRegistryStats,
} from '../../data/illustrationRegistry';
import { IllustrationRegistryEntry } from '../../types/encyclopedia';

interface IllustrationQcGalleryProps {
  records: IllustrationRegistryEntry[];
  onNavigateToTopic: (topicId: string) => void;
  onExitGallery: () => void;
}

type StatusFilter =
  | 'ALL'
  | 'created'
  | 'missing'
  | 'visually_inspected'
  | 'flagged';

export const IllustrationQcGallery: React.FC<IllustrationQcGalleryProps> = ({
  records,
  onNavigateToTopic,
  onExitGallery,
}) => {
  const [chapterFilter, setChapterFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const stats = useMemo(() => getIllustrationRegistryStats(records), [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      if (chapterFilter !== 'ALL' && rec.chapterId !== chapterFilter) {
        return false;
      }
      if (statusFilter === 'created' && !rec.assetExists) return false;
      if (statusFilter === 'missing' && rec.assetExists) return false;
      if (
        statusFilter === 'visually_inspected' &&
        rec.verificationState !== 'visually_inspected' &&
        rec.verificationState !== 'scientifically_reviewed'
      ) {
        return false;
      }
      if (statusFilter === 'flagged' && !rec.duplicateFlag) return false;
      return true;
    });
  }, [records, chapterFilter, statusFilter]);

  return (
    <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 py-6 space-y-6 text-[var(--page-ink)]">
      {/* Header & Exit Control */}
      <header className="pb-4 border-b border-[var(--hairline)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-semibold">
            Internal Developer Quality-Control Gallery (Hidden from Reader Nav)
          </p>
          <h1 className="font-editorial text-2xl sm:text-3xl font-semibold mt-0.5">
            Textbook Illustration Registry &amp; Asset Verification
          </h1>
        </div>
        <button
          type="button"
          onClick={onExitGallery}
          className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] border border-[var(--gold-hairline)] hover:border-[var(--accent-gold)] text-[var(--page-ink)] hover:text-[var(--accent-gold)] rounded-[2px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Encyclopedia</span>
        </button>
      </header>

      {/* Honest Completion Breakdown */}
      <section
        aria-label="Illustration completion summary"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {[
          { label: 'Topics Registered', value: `${stats.totalTopics} / 500` },
          { label: 'Assets Created (.webp)', value: `${stats.createdCount} / 500` },
          { label: 'Missing / Pending', value: `${stats.missingCount}` },
          {
            label: 'Visually Inspected',
            value: `${stats.visuallyInspectedCount}`,
          },
          {
            label: 'Scientifically Reviewed',
            value: `${stats.scientificallyReviewedCount}`,
          },
          {
            label: 'Duplicate Hash/Path Flags',
            value: `${stats.duplicateFlagCount}`,
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="p-3 border border-[var(--hairline)] bg-[var(--page-bg)] rounded-[2px]"
          >
            <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--page-muted)]">
              {metric.label}
            </div>
            <div className="text-xl font-semibold text-[var(--accent-gold)] tabular-nums mt-1">
              {metric.value}
            </div>
          </div>
        ))}
      </section>

      {/* Chapter-by-Chapter Progress Table */}
      <section
        aria-label="Chapter illustration completion breakdown"
        className="border border-[var(--hairline)] bg-[var(--page-bg)] rounded-[2px] overflow-hidden"
      >
        <div className="px-4 py-2.5 border-b border-[var(--hairline)] flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-gold)]">
          <Layers className="w-4 h-4" />
          <span>Chapter-by-Chapter Completion Status</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse tabular-nums">
            <thead>
              <tr className="border-b border-[var(--hairline)] text-[var(--page-muted)] text-[11px]">
                <th className="py-2 px-3">Chapter</th>
                <th className="py-2 px-3">Directory</th>
                <th className="py-2 px-3 text-right">Topics</th>
                <th className="py-2 px-3 text-right">Created</th>
                <th className="py-2 px-3 text-right">Missing</th>
                <th className="py-2 px-3 text-right">Inspected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {stats.byChapter.map((row) => (
                <tr
                  key={row.chapterId}
                  className="hover:bg-[var(--page-bg-secondary)]/50"
                >
                  <td className="py-2 px-3 font-medium">
                    Chapter {row.paddedNumber} &mdash; {row.title}
                  </td>
                  <td className="py-2 px-3 text-[var(--page-muted)]">
                    /assets/illustrations/{row.category}/
                  </td>
                  <td className="py-2 px-3 text-right">{row.total}</td>
                  <td className="py-2 px-3 text-right text-[var(--accent-gold)] font-semibold">
                    {row.created}
                  </td>
                  <td className="py-2 px-3 text-right">{row.missing}</td>
                  <td className="py-2 px-3 text-right">
                    {row.visuallyInspected}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Filter Controls (Buttons, zero pills) */}
      <section className="flex flex-wrap items-center justify-between gap-3 py-2 border-y border-[var(--hairline)]">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => setChapterFilter('ALL')}
            className={`px-2.5 py-1.5 text-xs border rounded-[2px] cursor-pointer ${
              chapterFilter === 'ALL'
                ? 'border-[var(--accent-gold)] bg-[var(--page-bg)] text-[var(--accent-gold)] font-semibold'
                : 'border-[var(--hairline)] text-[var(--page-muted)]'
            }`}
          >
            All Chapters ({records.length})
          </button>
          {stats.byChapter.map((ch) => (
            <button
              key={ch.chapterId}
              type="button"
              onClick={() => setChapterFilter(ch.chapterId)}
              className={`px-2 py-1.5 text-xs tabular-nums border rounded-[2px] cursor-pointer ${
                chapterFilter === ch.chapterId
                  ? 'border-[var(--accent-gold)] bg-[var(--page-bg)] text-[var(--accent-gold)] font-semibold'
                  : 'border-[var(--hairline)] text-[var(--page-muted)]'
              }`}
            >
              Ch {ch.paddedNumber} ({ch.created}/{ch.total})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {(
            [
              { key: 'ALL', label: 'All Statuses' },
              { key: 'created', label: `Created (${stats.createdCount})` },
              { key: 'missing', label: `Missing (${stats.missingCount})` },
              {
                key: 'visually_inspected',
                label: `Inspected (${stats.visuallyInspectedCount})`,
              },
              {
                key: 'flagged',
                label: `Duplicates (${stats.duplicateFlagCount})`,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`px-2.5 py-1.5 text-xs border rounded-[2px] cursor-pointer ${
                statusFilter === tab.key
                  ? 'border-[var(--accent-gold)] bg-[var(--page-bg)] text-[var(--accent-gold)] font-semibold'
                  : 'border-[var(--hairline)] text-[var(--page-muted)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Ordered Registry Inspection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRecords.map((rec) => (
          <article
            key={rec.illustrationId}
            className="border border-[var(--hairline)] bg-[var(--page-bg)] rounded-[3px] flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="px-3.5 py-2.5 border-b border-[var(--hairline)] space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--accent-gold)] font-semibold tabular-nums">
                  <span>
                    Ch {rec.chapterPaddedNumber} &middot; Topic{' '}
                    {rec.topicPaddedNumber} &middot; {rec.globalPaddedNumber}/500
                  </span>
                  <span>Figure {rec.figureNumber}</span>
                </div>
                <h2 className="font-editorial text-lg font-semibold text-[var(--page-ink)] leading-snug">
                  {rec.title}
                </h2>
                <div className="text-[11px] text-[var(--page-muted)] tabular-nums">
                  Topic: {rec.topicId} &middot; Illustration:{' '}
                  {rec.illustrationId}
                </div>
              </div>

              {rec.assetExists ? (
                <div className="aspect-[4/3] bg-[#f7f2e7] dark:bg-[#0c1b16] border-b border-[var(--hairline)]">
                  <img
                    src={rec.assetPath}
                    alt={rec.altText}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] p-4 bg-[var(--page-bg-secondary)]/45 border-b border-[var(--hairline)] flex flex-col justify-center gap-2 text-xs text-[var(--page-muted)]">
                  <div className="inline-flex items-center gap-1.5 font-semibold text-[var(--page-ink)]">
                    <EyeOff className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>Asset Not Yet Generated</span>
                  </div>
                  <p className="tabular-nums text-[11px]">{rec.assetPath}</p>
                  <p className="text-[11px] leading-relaxed">
                    <strong>Brief:</strong> {rec.visualBrief.viewingAngle}
                  </p>
                </div>
              )}

              <div className="p-3.5 space-y-1.5 text-[11px] leading-relaxed">
                <p className="text-[var(--page-ink)]/90">{rec.caption}</p>
                <p className="text-[var(--page-muted)]">
                  <strong>Classification:</strong>{' '}
                  {CLASSIFICATION_DISPLAY_LABELS[rec.classification]} &middot;{' '}
                  <strong>State:</strong> {rec.verificationState}
                </p>
                {rec.duplicateFlag && (
                  <p className="text-red-600 dark:text-red-400 font-medium inline-flex items-center gap-1">
                    <FileWarning className="w-3.5 h-3.5" />
                    <span>{rec.duplicateFlag}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[var(--hairline)] flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1 text-[var(--page-muted)]">
                {rec.assetExists ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                )}
                <span>
                  {rec.assetExists
                    ? `${Math.round((rec.fileSizeBytes ?? 0) / 1024)} KB`
                    : 'Missing .webp'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => onNavigateToTopic(rec.topicId)}
                className="text-[var(--accent-gold)] font-medium hover:underline cursor-pointer"
              >
                Open {rec.topicId} Page &rarr;
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
