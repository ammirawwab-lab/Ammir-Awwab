import React, { useEffect, useRef, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { CornerFiligree, GeometricRosette } from '../ornaments/IslamicOrnaments';

interface LuxuryBookCoverProps {
  onOpenBook: () => void;
  isOpening: boolean;
  isClosing?: boolean;
}

export const LuxuryBookCover: React.FC<LuxuryBookCoverProps> = React.memo(({
  onOpenBook,
  isOpening,
  isClosing = false,
}) => {
  const volumeRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const tiltRafRef = useRef<number | null>(null);
  const [isTilting, setIsTilting] = useState(false);

  useEffect(() => {
    return () => {
      if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOpening || isClosing || e.pointerType === 'touch') return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const el = volumeRef.current;
    if (!el) return;
    if (!isTilting) setIsTilting(true);
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
    const rotY = nx * 4.5;
    const rotX = -ny * 3.6;
    const sheenX = 50 + nx * 36;
    const sheenY = 40 + ny * 36;

    if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);
    tiltRafRef.current = requestAnimationFrame(() => {
      if (volumeRef.current) {
        volumeRef.current.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`;
      }
      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(circle at ${sheenX.toFixed(1)}% ${sheenY.toFixed(1)}%, rgba(223,201,155,0.14) 0%, rgba(200,162,83,0.04) 36%, transparent 66%)`;
      }
    });
  };

  const handlePointerLeave = () => {
    if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);
    setIsTilting(false);
    if (volumeRef.current && !isOpening && !isClosing) {
      volumeRef.current.style.transform = '';
    }
    if (sheenRef.current) {
      sheenRef.current.style.background =
        'radial-gradient(circle at 55% 32%, rgba(223,201,155,0.08) 0%, transparent 62%)';
    }
  };

  const isTransforming = isTilting || isOpening || isClosing;
  const interactiveTransform = isOpening
    ? 'rotateY(-18deg) translateZ(14px) scale(1.02)'
    : isClosing
    ? 'rotateY(-6deg) translateZ(4px) scale(0.99)'
    : undefined;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full py-5 sm:py-6 px-4 select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Grounded cast shadow & rotatable hardcover assembly */}
      <div
        ref={volumeRef}
        className={`relative w-full max-w-[430px] sm:max-w-[465px] aspect-[3/4.25] transition-transform duration-500 ease-[var(--ease-fluent)] ${
          isTransforming ? 'book-3d-preserve will-change-transform' : ''
        }`}
        style={{
          transform: interactiveTransform,
        }}
      >
        {/* Back cover & grounded desk cast shadow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-r-[6px] rounded-l-[3px] translate-x-3 translate-y-2.5 bg-[#03100C] shadow-[0_32px_72px_-14px_rgba(0,0,0,0.78)] dark:shadow-[0_38px_86px_-12px_rgba(0,0,0,0.92)]"
        />

        {/* Stacked gilt page block edges visible on right & bottom */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-1 right-[-10px] w-3 rounded-r-[3px] border-y border-r border-[#B89446]/60"
          style={{
            background:
              'repeating-linear-gradient(to right, #e5d8bc 0px, #e5d8bc 1px, #b89e68 1px, #9f834e 2px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-4 right-[-8px] bottom-[-9px] h-2.5 rounded-b-[3px] border-b border-r border-[#B89446]/55"
          style={{
            background:
              'repeating-linear-gradient(to bottom, #ddd0b3 0px, #ddd0b3 1px, #ac915a 1px, #987d48 2px)',
          }}
        />

        {/* Front Hardcover Board */}
        <div
          className="relative w-full h-full rounded-r-[6px] rounded-l-[3px] overflow-hidden leather-grain border border-[#C8A253]/45 shadow-[inset_0_1px_0_rgba(255,235,180,0.18),inset_-2px_0_14px_rgba(0,0,0,0.58),0_22px_48px_rgba(0,0,0,0.52)]"
          style={{
            background:
              'radial-gradient(circle at 55% 32%, #113C2E 0%, #072119 54%, #03120D 100%)',
          }}
        >
          {/* Specular pointer sheen overlay */}
          <div
            ref={sheenRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at 55% 32%, rgba(223,201,155,0.08) 0%, transparent 62%)',
            }}
          />

          {/* Left Spine Binding Gutter & Raised Leather Spine Ribs */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-7 sm:w-8 border-r border-[#C8A253]/30"
            style={{
              background:
                'linear-gradient(90deg, #020A07 0%, #0A291F 45%, #041510 85%, #020B08 100%)',
            }}
          >
            {/* 5 Gold-tooled Spine Bands */}
            {[14, 31, 50, 69, 86].map((topPct) => (
              <div
                key={topPct}
                className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-[#8E6C27]/50 via-[#DFC99B]/90 to-[#8E6C27]/50 shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
                style={{ top: `${topPct}%` }}
              />
            ))}
          </div>

          {/* Subtle embossed geometric lattice watermark inside leather */}
          <div
            aria-hidden="true"
            className="absolute inset-0 left-7 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(223,201,155,0.45) 0 1px, transparent 1px 16px), repeating-linear-gradient(-45deg, rgba(223,201,155,0.45) 0 1px, transparent 1px 16px)',
            }}
          />

          {/* Recessed Double Gold Rule Frame */}
          <div className="relative h-full pl-11 pr-6 sm:pl-14 sm:pr-8 py-6 sm:py-8 flex flex-col justify-between">
            <div className="relative flex-1 border border-[#C8A253]/52 p-1.5">
              <div className="relative h-full w-full border border-[#C8A253]/30 px-5 py-7 sm:px-7 sm:py-9 flex flex-col items-center justify-between text-center">
                {/* Four Antique-Gold Corner Filigree Brackets */}
                <CornerFiligree
                  position="tl"
                  className="absolute top-1.5 left-1.5 w-8 h-8 text-[#C8A253]"
                />
                <CornerFiligree
                  position="tr"
                  className="absolute top-1.5 right-1.5 w-8 h-8 text-[#C8A253]"
                />
                <CornerFiligree
                  position="bl"
                  className="absolute bottom-1.5 left-1.5 w-8 h-8 text-[#C8A253]"
                />
                <CornerFiligree
                  position="br"
                  className="absolute bottom-1.5 right-1.5 w-8 h-8 text-[#C8A253]"
                />

                {/* Top Edition Identifier */}
                <div className="pt-1">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#DFC99B]/90 font-medium">
                    Illustrated Digital Encyclopedia
                  </p>
                </div>

                {/* Central Emblem + Title Lockup */}
                <div className="flex flex-col items-center my-auto py-3">
                  <div className="mb-5 text-[#D0AA5A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                    <GeometricRosette className="w-24 h-24 sm:w-28 sm:h-28" />
                  </div>

                  <h1 className="font-editorial text-3xl sm:text-[2.55rem] font-semibold tracking-[0.06em] uppercase leading-[1.08] text-[#F3EDE2] text-balance">
                    Science of Creation
                  </h1>

                  <div className="w-16 h-px bg-[#C8A253]/70 my-4" />

                  <p className="font-editorial italic text-base sm:text-lg text-[#DFC99B]/92 leading-snug max-w-[28ch] text-balance">
                    &ldquo;Exploring the Signs of Creation Through Faith and Clear Science.&rdquo;
                  </p>
                </div>

                {/* Single Primary Action */}
                <div className="w-full flex flex-col items-center gap-4 pb-1">
                  <button
                    type="button"
                    onClick={onOpenBook}
                    disabled={isOpening || isClosing}
                    className="group relative inline-flex items-center justify-center gap-2.5 min-h-[44px] px-7 py-2.5 rounded-[4px] bg-[#C8A253]/20 hover:bg-[#C8A253]/30 active:scale-[0.985] border border-[#C8A253]/78 text-[#F3EDE2] text-xs sm:text-[13px] font-medium uppercase tracking-[0.2em] transition-all duration-200 ease-[var(--ease-fluent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DFC99B] cursor-pointer whitespace-nowrap disabled:opacity-60"
                  >
                    <BookOpen className="w-4 h-4 text-[#DFC99B] transition-transform duration-200 group-hover:scale-105" />
                    <span>Open the Book</span>
                  </button>

                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#DFC99B]/70 tabular-nums">
                    Ten Chapters &middot; Five Hundred Illustrated Topics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LuxuryBookCover.displayName = 'LuxuryBookCover';
