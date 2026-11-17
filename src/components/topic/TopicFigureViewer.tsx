import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { EyeOff, Image as ImageIcon, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import {
  CLASSIFICATION_DISPLAY_LABELS,
  ILLUSTRATION_CATEGORY_LABELS,
} from '../../data/illustrationRegistry';
import { IllustrationRegistryEntry } from '../../types/encyclopedia';

interface TopicFigureViewerProps {
  record: IllustrationRegistryEntry;
  compactLandscape?: boolean;
}

export const TopicFigureViewer: React.FC<TopicFigureViewerProps> = ({
  record,
  compactLandscape = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [detailZoom, setDetailZoom] = useState(false);

  const naturalWidth = record.dimensions?.width ?? 1200;
  const naturalHeight = record.dimensions?.height ?? 896;

  // Reset loading/error state cleanly whenever navigation changes topic
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setIsZoomOpen(false);
    setDetailZoom(false);
  }, [record.topicId, record.assetPath]);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!isZoomOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isZoomOpen]);

  const showActualImage = record.assetExists && !imageError;
  const classificationLabel =
    CLASSIFICATION_DISPLAY_LABELS[record.classification];
  const categoryLabel = ILLUSTRATION_CATEGORY_LABELS[record.category];

  return (
    <figure
      aria-label={`Figure ${record.figureNumber}: ${record.title}`}
      className="my-1 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/65 rounded-[3px] overflow-hidden"
    >
      {/* Figure Plate Header Metadata */}
      <figcaption className="px-3.5 py-2.5 border-b border-[var(--hairline)] flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--accent-gold)] font-semibold tabular-nums">
            <span>Figure {record.figureNumber}</span>
            <span aria-hidden="true" className="text-[var(--page-muted)]">
              &middot;
            </span>
            <span className="font-normal text-[var(--page-muted)] normal-case tracking-normal">
              {classificationLabel}
            </span>
          </div>
          <h4 className="font-editorial text-[16px] sm:text-[17px] font-semibold text-[var(--page-ink)] leading-snug mt-0.5">
            {record.title}
          </h4>
        </div>
      </figcaption>

      {/* Visual Plate Stage (Locked 1200:896 native plate aspect ratio prevents scaling distortion) */}
      {showActualImage ? (
        <div
          className={`relative w-full mx-auto bg-[#f7f2e7] dark:bg-[#0c1b16] border-b border-[var(--hairline)] group ${
            compactLandscape ? 'max-w-[300px]' : ''
          }`}
          style={{ aspectRatio: `${naturalWidth} / ${naturalHeight}` }}
        >
          {!imageLoaded && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[var(--page-bg-secondary)] text-[var(--page-muted)]"
            >
              <ImageIcon className="w-5 h-5 text-[var(--accent-gold)] opacity-60" />
              <span className="text-[11px] tabular-nums">
                Loading Figure {record.figureNumber}&hellip;
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            aria-label={`Enlarge Figure ${record.figureNumber}: ${record.title}`}
            className="w-full h-full block cursor-zoom-in focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <img
              src={record.assetPath}
              alt={record.altText}
              width={naturalWidth}
              height={naturalHeight}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-contain transition-opacity duration-200 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => {
              setDetailZoom(false);
              setIsZoomOpen(true);
            }}
            aria-label={`Zoom Figure ${record.figureNumber}`}
            className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 min-h-[34px] px-2.5 py-1 text-[11px] font-medium bg-[var(--page-bg)] text-[var(--page-ink)] border border-[var(--gold-hairline)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] active:scale-[0.97] transition-all duration-150 rounded-[4px] shadow-[var(--shadow-elev-1)] cursor-pointer"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Zoom In</span>
          </button>
        </div>
      ) : (
        /* Neutral Missing / Pending Plate State (Never shows unrelated fallback asset) */
        <div
          role="region"
          aria-label={`Illustration guide for Figure ${record.figureNumber}`}
          className="p-3.5 border-b border-[var(--hairline)] bg-[var(--page-bg)]/55 space-y-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--page-ink)]">
              <EyeOff className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
              <span>
                {imageError
                  ? `Picture unavailable right now (${record.assetPath})`
                  : `Picture in progress (${record.topicId})`}
              </span>
            </span>
            <span className="text-[11px] text-[var(--page-muted)] tabular-nums">
              {categoryLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs leading-snug text-[var(--page-muted)] pt-1.5 border-t border-[var(--hairline)]">
            <div>
              <span className="font-semibold text-[var(--page-ink)] block">
                Main Subject
              </span>
              <span>{record.visualBrief.subject}</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--page-ink)] block">
                Camera View &amp; Labels
              </span>
              <span>
                {record.visualBrief.viewingAngle} (Labels:{' '}
                {record.visualBrief.keyLabels.join(', ')})
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Optional Ordered Scientific / Conceptual Process Stages */}
      {record.processStages && record.processStages.length > 0 && (
        <div className="px-3.5 py-2.5 border-b border-[var(--hairline)] bg-[var(--page-bg)]/35 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.13em] text-[var(--accent-gold)] font-semibold">
            <span>How It Happens Step by Step</span>
            <span className="font-normal normal-case tracking-normal text-[var(--page-muted)]">
              {record.isConceptualModel
                ? 'Helpful everyday model'
                : 'Order observed by science'}
            </span>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs leading-snug">
            {record.processStages.map((st, idx) => (
              <li
                key={st.stageNumber}
                className="p-2 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/55 rounded-[2px]"
              >
                <div className="font-semibold text-[var(--accent-gold)] tabular-nums text-[11px]">
                  {st.stageNumber}
                  {idx < record.processStages!.length - 1 ? ' →' : ''}
                </div>
                <div className="font-medium text-[var(--page-ink)]">
                  {st.label}
                </div>
                <p className="text-[var(--page-muted)] mt-0.5 text-[11.5px]">{st.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Figure Caption & Attribution Footer */}
      <div className="px-3.5 py-2.5 space-y-1 text-xs leading-relaxed">
        <p className="text-[var(--page-ink)]/92">
          <strong className="font-medium text-[var(--accent-gold)]">
            What you are looking at:
          </strong>{' '}
          {record.caption}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--page-muted)] pt-0.5">
          <span>{record.referenceAttribution}</span>
          <span className="tabular-nums">
            Topic {record.globalPaddedNumber} of 500
          </span>
        </div>
      </div>

      {/* Accessible Lightbox / Enlarged Modal rendered to document.body so book spine/sibling folio never overlaps */}
      {isZoomOpen && showActualImage && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged View: Figure ${record.figureNumber} — ${record.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/84 animate-fluent-backdrop"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92dvh] flex flex-col bg-[var(--page-bg)] text-[var(--page-ink)] border border-[var(--gold-hairline)] rounded-[4px] shadow-[var(--shadow-elev-2)] overflow-hidden animate-fluent-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-[var(--hairline)] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold tabular-nums">
                  Chapter {record.chapterPaddedNumber} &middot; Topic{' '}
                  {record.topicPaddedNumber} &middot; Figure{' '}
                  {record.figureNumber} ({record.illustrationId})
                </p>
                <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[var(--page-ink)] truncate">
                  {record.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setDetailZoom((z) => !z)}
                  aria-pressed={detailZoom}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs border border-[var(--hairline)] hover:border-[var(--accent-gold)] text-[var(--page-ink)] hover:text-[var(--accent-gold)] active:scale-[0.97] rounded-[4px] transition-all duration-150 cursor-pointer tabular-nums"
                >
                  {detailZoom ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>Fit Frame</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>Detail 1:1</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  aria-label="Close enlarged illustration"
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs border border-[var(--gold-hairline)] hover:border-[var(--accent-gold)] text-[var(--page-ink)] hover:text-[var(--accent-gold)] active:scale-[0.97] rounded-[4px] transition-all duration-150 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto folio-scroll p-4 flex flex-col gap-3">
              <div
                className={`w-full max-h-[68dvh] mx-auto bg-[#f7f2e7] dark:bg-[#0c1b16] border border-[var(--hairline)] rounded-[4px] ${
                  detailZoom
                    ? 'overflow-auto cursor-zoom-out'
                    : 'overflow-hidden flex items-center justify-center cursor-zoom-in'
                }`}
                style={{ aspectRatio: `${naturalWidth} / ${naturalHeight}` }}
                onClick={() => setDetailZoom((z) => !z)}
              >
                <img
                  src={record.assetPath}
                  alt={record.altText}
                  width={naturalWidth}
                  height={naturalHeight}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={
                    detailZoom
                      ? 'w-[1200px] max-w-none h-auto block'
                      : 'w-full h-full object-contain'
                  }
                />
              </div>

              <div className="space-y-1.5 text-xs leading-relaxed border-t border-[var(--hairline)] pt-3">
                <p className="text-[var(--page-ink)]">{record.caption}</p>
                <p className="text-[11px] text-[var(--page-muted)]">
                  <strong className="text-[var(--page-ink)]">
                    Classification:
                  </strong>{' '}
                  {classificationLabel} &middot;{' '}
                  <strong className="text-[var(--page-ink)]">Source:</strong>{' '}
                  {record.referenceAttribution}
                </p>
                <p className="text-[11px] text-[var(--page-muted)]">
                  <strong className="text-[var(--page-ink)]">
                    Accuracy Boundary:
                  </strong>{' '}
                  {record.visualBrief.mustNotShow}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </figure>
  );
};
