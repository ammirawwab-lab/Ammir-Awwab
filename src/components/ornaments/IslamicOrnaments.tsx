import React from 'react';
import { ChapterThemeConfig } from '../../types/encyclopedia';

// Precomputed exact 8-fold radial astrolabe tick coordinates (every 15 degrees)
const DEGREE_TICKS = Array.from({ length: 24 }, (_, idx) => {
  const rad = (idx * 15 * Math.PI) / 180;
  const isMajor = idx % 3 === 0;
  const r1 = isMajor ? 85.5 : 87.5;
  const r2 = 91.5;
  return {
    x1: Number((100 + r1 * Math.cos(rad)).toFixed(2)),
    y1: Number((100 + r1 * Math.sin(rad)).toFixed(2)),
    x2: Number((100 + r2 * Math.cos(rad)).toFixed(2)),
    y2: Number((100 + r2 * Math.sin(rad)).toFixed(2)),
    isMajor,
  };
});

// Exact Khatam 8-pointed star polygon (outer R=52, inner valley r=21.54 for collinear facets)
const KHATAM_STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const rad = (i * 22.5 * Math.PI) / 180 - Math.PI / 2;
  const r = i % 2 === 0 ? 52 : 21.54;
  return `${(100 + r * Math.cos(rad)).toFixed(2)},${(100 + r * Math.sin(rad)).toFixed(2)}`;
}).join(' ');

const KHATAM_SECONDARY_POINTS = Array.from({ length: 16 }, (_, i) => {
  const rad = (i * 22.5 * Math.PI) / 180 - Math.PI / 2 + Math.PI / 8;
  const r = i % 2 === 0 ? 44 : 21.54;
  return `${(100 + r * Math.cos(rad)).toFixed(2)},${(100 + r * Math.sin(rad)).toFixed(2)}`;
}).join(' ');

export const GeometricRosette: React.FC<{ className?: string }> = ({
  className = 'w-28 h-28',
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    shapeRendering="geometricPrecision"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer astrolabe calibrated degree rings */}
    <circle
      cx="100"
      cy="100"
      r="92"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeOpacity="0.58"
    />
    <circle
      cx="100"
      cy="100"
      r="85"
      stroke="currentColor"
      strokeWidth="0.95"
      strokeOpacity="0.44"
    />
    {DEGREE_TICKS.map((t, i) => (
      <line
        key={i}
        x1={t.x1}
        y1={t.y1}
        x2={t.x2}
        y2={t.y2}
        stroke="currentColor"
        strokeWidth={t.isMajor ? '1.15' : '0.85'}
        strokeOpacity={t.isMajor ? '0.72' : '0.45'}
        strokeLinecap="round"
      />
    ))}

    {/* Eight-pointed Khatam square lattice (corner distance = 58 * sqrt(2) = 82.02 < r=85) */}
    <rect
      x="42"
      y="42"
      width="116"
      height="116"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeOpacity="0.78"
      strokeLinejoin="miter"
    />
    <rect
      x="42"
      y="42"
      width="116"
      height="116"
      transform="rotate(45 100 100)"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeOpacity="0.78"
      strokeLinejoin="miter"
    />

    {/* Inner geometric circle & exact trigonometric 8-fold star */}
    <circle
      cx="100"
      cy="100"
      r="56"
      stroke="currentColor"
      strokeWidth="1.05"
      strokeOpacity="0.56"
    />
    <polygon
      points={KHATAM_STAR_POINTS}
      stroke="currentColor"
      strokeWidth="1.25"
      strokeOpacity="0.88"
      strokeLinejoin="miter"
    />
    <polygon
      points={KHATAM_SECONDARY_POINTS}
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.58"
      strokeLinejoin="miter"
    />
    <circle
      cx="100"
      cy="100"
      r="13.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.88"
    />
    <circle cx="100" cy="100" r="3.4" fill="currentColor" />
  </svg>
);

export const CornerFiligree: React.FC<{
  className?: string;
  position: 'tl' | 'tr' | 'bl' | 'br';
}> = ({ className = 'w-10 h-10', position }) => {
  const rotationMap = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  };

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      shapeRendering="geometricPrecision"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationMap[position]}`}
      aria-hidden="true"
    >
      <path
        d="M2.5 45.5V12.5C2.5 6.977 6.977 2.5 12.5 2.5H45.5"
        stroke="currentColor"
        strokeWidth="1.35"
        vectorEffect="non-scaling-stroke"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />
      <path
        d="M7.5 41.5V15.5C7.5 11.082 11.082 7.5 15.5 7.5H41.5"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        strokeOpacity="0.48"
        strokeLinecap="round"
      />
      <path
        d="M2.5 22L12.25 12.25L22 2.5"
        stroke="currentColor"
        strokeWidth="1.05"
        vectorEffect="non-scaling-stroke"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      <circle cx="12.25" cy="12.25" r="2.1" fill="currentColor" fillOpacity="0.82" />
    </svg>
  );
};

export const EditorialDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div
    className={`flex items-center justify-center gap-3 ${className}`}
    aria-hidden="true"
  >
    <span className="h-px flex-1 bg-[var(--gold-hairline)]" />
    <svg
      viewBox="0 0 32 18"
      fill="none"
      shapeRendering="geometricPrecision"
      className="w-7 h-4 text-[var(--accent-gold)] shrink-0"
    >
      <path
        d="M16 1.5L22.5 9L16 16.5L9.5 9L16 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="miter"
      />
      <circle cx="16" cy="9" r="1.8" fill="currentColor" />
      <circle cx="3.5" cy="9" r="1.2" fill="currentColor" fillOpacity="0.68" />
      <circle cx="28.5" cy="9" r="1.2" fill="currentColor" fillOpacity="0.68" />
    </svg>
    <span className="h-px flex-1 bg-[var(--gold-hairline)]" />
  </div>
);

export const ChapterMotifIcon: React.FC<{
  motif: ChapterThemeConfig['motifType'];
  className?: string;
}> = ({ motif, className = 'w-5 h-5' }) => {
  switch (motif) {
    case 'astrolabe':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.35" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(-25 12 12)" stroke="currentColor" strokeWidth="1.15" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'strata':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <path d="M3 16L9 7L14 13L17 9L21 16H3Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M3 19.5H21" stroke="currentColor" strokeWidth="1.15" strokeOpacity="0.78" strokeLinecap="round" />
        </svg>
      );
    case 'wave':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <path d="M3 10C5.5 7.5 8.5 7.5 11 10C13.5 12.5 16.5 12.5 21 10" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
          <path d="M3 15C5.5 12.5 8.5 12.5 11 15C13.5 17.5 16.5 17.5 21 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.78" />
        </svg>
      );
    case 'barometric':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <path d="M4 13.5C4 11 6 9 8.5 9C9.3 6.6 11.6 5 14.2 5C17.4 5 20 7.6 20 10.8C20 13.7 17.8 16 14.9 16H7.2C5.4 16 4 14.9 4 13.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M7 19H17" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeOpacity="0.78" />
        </svg>
      );
    case 'botanical':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <path d="M12 20V6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
          <path d="M12 13C8 13 6 10 6 6C10 6 12 8.5 12 13Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M12 10C16 10 18 7.5 18 4C14 4 12 6.5 12 10Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        </svg>
      );
    case 'symmetry':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <polygon points="12,3 19.79,7.5 19.79,16.5 12,21 4.21,16.5 4.21,7.5" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
          <polygon points="12,7 16.33,9.5 16.33,14.5 12,17 7.67,14.5 7.67,9.5" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.78" strokeLinejoin="round" />
        </svg>
      );
    case 'vitruvian':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="6" y="6" width="12" height="12" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.78" />
          <circle cx="12" cy="12" r="2.1" stroke="currentColor" strokeWidth="1.15" />
        </svg>
      );
    case 'equilibrium':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.35" />
          <path d="M12 3.5V20.5M3.5 12H20.5" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.78" />
          <circle cx="12" cy="12" r="2.3" fill="currentColor" />
        </svg>
      );
    case 'neural':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M12 9.4V4M14.2 13.2L19 16M9.8 13.2L5 16M14 10.5L18.5 7M10 10.5L5.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <circle cx="12" cy="4" r="1.25" fill="currentColor" />
          <circle cx="19" cy="16" r="1.25" fill="currentColor" />
          <circle cx="5" cy="16" r="1.25" fill="currentColor" />
        </svg>
      );
    case 'tessellation':
      return (
        <svg viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" className={className} aria-hidden="true">
          <rect x="5.5" y="5.5" width="13" height="13" stroke="currentColor" strokeWidth="1.25" />
          <rect x="5.5" y="5.5" width="13" height="13" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
  }
};
